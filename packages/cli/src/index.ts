#!/usr/bin/env node
import { spawn } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  normalizeScenePath,
  readOrCreateSceneFile,
  readSceneFile,
  validateScene,
  type SceneValidationIssue,
} from "@agentdraw/scene";
import { startAgentDrawServer } from "@agentdraw/server";

const VERSION = readPackageVersion();
const DEFAULT_PORT = 3927;
const DEFAULT_HOST = "127.0.0.1";
const DEFAULT_SCENE = ".agentdraw/untitled.agentdraw.json";
const EXIT_GENERAL_ERROR = 1;
const EXIT_USAGE_ERROR = 2;

type OutputFormat = "json" | "text";

type GlobalOptions = {
  cwd: string;
  format?: OutputFormat;
  noColor: boolean;
};

type CommandContext = {
  argv: string[];
  globals: GlobalOptions;
};

type OpenOptions = GlobalOptions & {
  filePath: string;
  host: string;
  port: number;
  openBrowser: boolean;
};

type InitOptions = GlobalOptions & {
  filePath: string;
};

type ValidateOptions = GlobalOptions & {
  filePaths: string[];
};

type DoctorOptions = GlobalOptions;

type SchemaOptions = GlobalOptions & {
  commandPath: string[];
};

type ValidationSummary = {
  filePath: string;
  ok: boolean;
  errorCount: number;
  warningCount: number;
  issues: SceneValidationIssue[];
};

type AgentDrawErrorPayload = {
  error: string;
  message: string;
  suggestion: string;
  retryable: boolean;
  input?: unknown;
};

class CliError extends Error {
  readonly code: string;
  readonly exitCode: number;
  readonly suggestion: string;
  readonly retryable: boolean;
  readonly input?: unknown;

  constructor(
    code: string,
    message: string,
    options: {
      exitCode?: number;
      suggestion: string;
      retryable?: boolean;
      input?: unknown;
    },
  ) {
    super(message);
    this.name = "CliError";
    this.code = code;
    this.exitCode = options.exitCode ?? EXIT_GENERAL_ERROR;
    this.suggestion = options.suggestion;
    this.retryable = options.retryable ?? false;
    this.input = options.input;
  }
}

const main = async () => {
  const context = parseGlobalOptions(process.argv.slice(2));
  const [command = "help", ...args] = context.argv;

  if (command === "-h" || command === "--help" || command === "help") {
    printHelp(args[0], context.globals);
    return;
  }

  if (command === "-v" || command === "--version" || command === "version") {
    writeOutput({ version: VERSION }, `agentdraw ${VERSION}`, context.globals);
    return;
  }

  if (args.includes("-h") || args.includes("--help")) {
    printHelp(command, context.globals);
    return;
  }

  switch (command) {
    case "open":
      await openCommand(parseOpenOptions(args, context.globals));
      return;
    case "init":
      await initCommand(parseInitOptions(args, context.globals));
      return;
    case "validate":
      await validateCommand(parseValidateOptions(args, context.globals));
      return;
    case "doctor":
      await doctorCommand(parseDoctorOptions(args, context.globals));
      return;
    case "schema":
      await schemaCommand(parseSchemaOptions(args, context.globals));
      return;
    default:
      throw new CliError("unknown_command", `Unknown command: ${command}`, {
        exitCode: EXIT_USAGE_ERROR,
        suggestion: "Run: agentdraw --help",
        input: { command },
      });
  }
};

const openCommand = async (options: OpenOptions) => {
  const filePath = resolveScenePath(options.filePath, options.cwd);
  await readOrCreateSceneFile(filePath);

  const server = await startAgentDrawServer({
    host: options.host,
    port: options.port,
    cwd: options.cwd,
  });
  const url = `${server.url}/?file=${encodeURIComponent(filePath)}`;

  writeOutput(
    {
      ok: true,
      command: "open",
      filePath,
      url,
      host: server.host,
      port: server.port,
      browserOpened: options.openBrowser,
      message: "AgentDraw server is running. Press Ctrl+C to stop it.",
    },
    [
      `AgentDraw ${VERSION}`,
      `File: ${filePath}`,
      `URL: ${url}`,
      "Press Ctrl+C to stop the server.",
    ].join("\n"),
    options,
  );

  if (options.openBrowser) {
    openSystemBrowser(url);
  }

  await waitForShutdown(server.close);
};

const initCommand = async (options: InitOptions) => {
  const filePath = resolveScenePath(options.filePath, options.cwd);
  const scene = await readOrCreateSceneFile(filePath);
  writeOutput(
    {
      ok: true,
      command: "init",
      filePath,
      sceneId: scene.id,
      title: scene.title,
      createdOrExists: true,
    },
    `Initialized AgentDraw scene: ${filePath}`,
    options,
  );
};

const validateCommand = async (options: ValidateOptions) => {
  if (options.filePaths.length === 0) {
    throw new CliError("missing_argument", "Scene file path is required.", {
      exitCode: EXIT_USAGE_ERROR,
      suggestion: "Run: agentdraw validate <file...>",
    });
  }

  const results: ValidationSummary[] = [];
  for (const inputPath of options.filePaths) {
    const filePath = resolveScenePath(inputPath, options.cwd);
    const scene = await readSceneFile(filePath);
    const result = validateScene(scene);
    results.push({
      filePath,
      ok: result.errorCount === 0,
      errorCount: result.errorCount,
      warningCount: result.warningCount,
      issues: result.issues,
    });
  }

  const errorCount = results.reduce((sum, result) => sum + result.errorCount, 0);
  const warningCount = results.reduce((sum, result) => sum + result.warningCount, 0);
  const payload = {
    ok: errorCount === 0,
    command: "validate",
    fileCount: results.length,
    errorCount,
    warningCount,
    results,
  };

  writeOutput(payload, formatValidationText(results, errorCount, warningCount), options);

  if (errorCount > 0) {
    process.exitCode = EXIT_GENERAL_ERROR;
  }
};

const doctorCommand = async (options: DoctorOptions) => {
  const checks = [
    {
      name: "node_version",
      ok: Number(process.versions.node.split(".")[0]) >= 20,
      value: process.versions.node,
      suggestion: "Use Node.js 20 or newer.",
    },
    {
      name: "platform",
      ok: true,
      value: `${process.platform}/${process.arch}`,
      suggestion: "",
    },
    {
      name: "cwd",
      ok: true,
      value: options.cwd,
      suggestion: "",
    },
    {
      name: "browser_open_command",
      ok: true,
      value: browserCommand().command,
      suggestion: "Use --no-open on remote hosts or WSL when no GUI browser is available.",
    },
  ];
  const payload = {
    ok: checks.every((check) => check.ok),
    command: "doctor",
    version: VERSION,
    checks,
  };
  writeOutput(payload, formatDoctorText(payload), options);

  if (!payload.ok) {
    process.exitCode = EXIT_GENERAL_ERROR;
  }
};

const schemaCommand = async (options: SchemaOptions) => {
  const schema = commandSchema(options.commandPath);
  writeOutput(schema, formatSchemaText(schema), options);
};

const parseGlobalOptions = (argv: string[]): CommandContext => {
  const globals: GlobalOptions = {
    cwd: process.env.INIT_CWD ?? process.cwd(),
    noColor: Boolean(process.env.NO_COLOR) || process.env.TERM === "dumb",
  };
  const rest: string[] = [];

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--") {
      continue;
    }
    if (arg === "--json") {
      globals.format = "json";
      continue;
    }
    if (arg === "--format") {
      globals.format = readFormat(argv[++index], "--format");
      continue;
    }
    if (arg.startsWith("--format=")) {
      globals.format = readFormat(arg.slice("--format=".length), "--format");
      continue;
    }
    if (arg === "--cwd") {
      globals.cwd = readCwd(argv[++index]);
      continue;
    }
    if (arg.startsWith("--cwd=")) {
      globals.cwd = readCwd(arg.slice("--cwd=".length));
      continue;
    }
    if (arg === "--no-color") {
      globals.noColor = true;
      continue;
    }
    rest.push(arg);
  }

  return { argv: rest, globals };
};

const parseOpenOptions = (args: string[], globals: GlobalOptions): OpenOptions => {
  const values = parseCommandFlags(args, {
    booleanFlags: ["--no-open", "--open"],
    valueFlags: ["--host", "--port"],
  });
  assertNoUnknownFlags(values.unknownFlags, "open");
  if (values.positionals.length > 1) {
    throw new CliError("too_many_arguments", "The open command accepts at most one file.", {
      exitCode: EXIT_USAGE_ERROR,
      suggestion: "Run: agentdraw open [file] --help",
      input: { args },
    });
  }
  return {
    ...globals,
    filePath: values.positionals[0] ?? DEFAULT_SCENE,
    host: values.valueFlags["--host"] ?? DEFAULT_HOST,
    port: readPort(values.valueFlags["--port"] ?? String(DEFAULT_PORT)),
    openBrowser: values.booleanFlags.has("--no-open")
      ? false
      : values.booleanFlags.has("--open")
        ? true
        : process.stdout.isTTY,
  };
};

const parseInitOptions = (args: string[], globals: GlobalOptions): InitOptions => {
  const values = parseCommandFlags(args, { booleanFlags: [], valueFlags: [] });
  assertNoUnknownFlags(values.unknownFlags, "init");
  if (values.positionals.length > 1) {
    throw new CliError("too_many_arguments", "The init command accepts at most one file.", {
      exitCode: EXIT_USAGE_ERROR,
      suggestion: "Run: agentdraw init [file] --help",
      input: { args },
    });
  }
  return {
    ...globals,
    filePath: values.positionals[0] ?? DEFAULT_SCENE,
  };
};

const parseValidateOptions = (
  args: string[],
  globals: GlobalOptions,
): ValidateOptions => {
  const values = parseCommandFlags(args, { booleanFlags: [], valueFlags: [] });
  assertNoUnknownFlags(values.unknownFlags, "validate");
  return {
    ...globals,
    filePaths: values.positionals,
  };
};

const parseDoctorOptions = (args: string[], globals: GlobalOptions): DoctorOptions => {
  const values = parseCommandFlags(args, { booleanFlags: [], valueFlags: [] });
  assertNoUnknownFlags(values.unknownFlags, "doctor");
  if (values.positionals.length > 0) {
    throw new CliError("too_many_arguments", "The doctor command does not accept files.", {
      exitCode: EXIT_USAGE_ERROR,
      suggestion: "Run: agentdraw doctor --help",
      input: { args },
    });
  }
  return globals;
};

const parseSchemaOptions = (args: string[], globals: GlobalOptions): SchemaOptions => {
  const values = parseCommandFlags(args, { booleanFlags: [], valueFlags: [] });
  assertNoUnknownFlags(values.unknownFlags, "schema");
  return {
    ...globals,
    commandPath: values.positionals,
  };
};

const parseCommandFlags = (
  args: string[],
  config: { booleanFlags: string[]; valueFlags: string[] },
) => {
  const booleanFlags = new Set<string>();
  const valueFlags: Record<string, string> = {};
  const positionals: string[] = [];
  const unknownFlags: string[] = [];

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (!arg.startsWith("-")) {
      positionals.push(arg);
      continue;
    }

    const [flag, inlineValue] = arg.split("=", 2);
    if (config.booleanFlags.includes(flag)) {
      if (inlineValue !== undefined) {
        unknownFlags.push(arg);
        continue;
      }
      booleanFlags.add(flag);
      continue;
    }
    if (config.valueFlags.includes(flag)) {
      const value = inlineValue ?? args[++index];
      if (!value || value.startsWith("-")) {
        throw new CliError("missing_flag_value", `Missing value for ${flag}.`, {
          exitCode: EXIT_USAGE_ERROR,
          suggestion: `Run: agentdraw help ${inferCommandFromFlags(config)}`,
          input: { flag },
        });
      }
      valueFlags[flag] = value;
      continue;
    }
    unknownFlags.push(flag);
  }

  return { booleanFlags, valueFlags, positionals, unknownFlags };
};

const assertNoUnknownFlags = (flags: string[], command: string) => {
  if (flags.length === 0) {
    return;
  }
  throw new CliError("unknown_flag", `Unknown flag: ${flags.join(", ")}`, {
    exitCode: EXIT_USAGE_ERROR,
    suggestion: `Run: agentdraw help ${command}`,
    input: { flags },
  });
};

const readFormat = (value: string | undefined, flag: string): OutputFormat => {
  if (value === "json" || value === "text") {
    return value;
  }
  throw new CliError("invalid_format", `${flag} must be json or text.`, {
    exitCode: EXIT_USAGE_ERROR,
    suggestion: "Use --format json or --format text.",
    input: { value },
  });
};

const readCwd = (value: string | undefined) => {
  if (!value) {
    throw new CliError("missing_flag_value", "Missing value for --cwd.", {
      exitCode: EXIT_USAGE_ERROR,
      suggestion: "Use --cwd <directory>.",
      input: { flag: "--cwd" },
    });
  }
  return path.resolve(value);
};

const readPort = (value: string) => {
  const port = Number(value);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new CliError("invalid_port", "--port must be an integer from 1 to 65535.", {
      exitCode: EXIT_USAGE_ERROR,
      suggestion: `Use --port ${DEFAULT_PORT} or another free TCP port.`,
      input: { port: value },
    });
  }
  return port;
};

const resolveScenePath = (inputPath: string, cwd: string) => {
  const filePath = normalizeScenePath(inputPath, cwd);
  assertSafePath(filePath);
  return filePath;
};

const assertSafePath = (filePath: string) => {
  const segments = filePath.split(path.sep).filter(Boolean);
  const blocked = new Set([".ssh", ".gnupg", ".aws", ".config"]);
  const blockedSegment = segments.find((segment) => blocked.has(segment));
  if (blockedSegment) {
    throw new CliError("unsafe_path", `Refusing to use a path inside ${blockedSegment}.`, {
      exitCode: EXIT_USAGE_ERROR,
      suggestion: "Use a project-local .agentdraw/*.agentdraw.json file.",
      input: { filePath },
    });
  }
};

const writeOutput = (json: unknown, text: string, options: GlobalOptions) => {
  if (outputFormat(options) === "json") {
    console.log(JSON.stringify(json, null, 2));
    return;
  }
  console.log(text);
};

const outputFormat = (options: GlobalOptions): OutputFormat =>
  options.format ?? (process.stdout.isTTY ? "text" : "json");

const formatValidationText = (
  results: ValidationSummary[],
  errorCount: number,
  warningCount: number,
) => {
  if (errorCount === 0 && warningCount === 0) {
    return `Scene validation passed: ${results.length} file(s)`;
  }

  const lines = [
    `Scene validation found ${errorCount} error(s), ${warningCount} warning(s).`,
  ];
  for (const result of results) {
    if (result.issues.length === 0) {
      lines.push(`[ok] ${result.filePath}`);
      continue;
    }
    lines.push(`[${result.ok ? "warning" : "error"}] ${result.filePath}`);
    for (const issue of result.issues) {
      const ids = issue.elementIds.length > 0 ? ` (${issue.elementIds.join(", ")})` : "";
      lines.push(`  [${issue.severity}] ${issue.code}: ${issue.message}${ids}`);
    }
  }
  return lines.join("\n");
};

const formatDoctorText = (payload: {
  ok: boolean;
  version: string;
  checks: Array<{ name: string; ok: boolean; value: string; suggestion: string }>;
}) =>
  [
    `AgentDraw ${payload.version}`,
    ...payload.checks.map((check) => {
      const status = check.ok ? "ok" : "fail";
      const suffix = check.suggestion ? ` - ${check.suggestion}` : "";
      return `[${status}] ${check.name}: ${check.value}${suffix}`;
    }),
  ].join("\n");

const formatSchemaText = (schema: unknown) => JSON.stringify(schema, null, 2);

const printHelp = (command: string | undefined, options: GlobalOptions) => {
  const text = helpText(command);
  if (outputFormat({ ...options, format: options.format ?? "text" }) === "json") {
    console.log(JSON.stringify(commandSchema(command ? [command] : []), null, 2));
    return;
  }
  console.log(text);
};

const helpText = (command: string | undefined) => {
  switch (command) {
    case undefined:
    case "":
      return [
        "AgentDraw - local editable whiteboard workspace for coding agents.",
        "",
        "Examples:",
        "  agentdraw open board.agentdraw.json --no-open",
        "  agentdraw validate board.agentdraw.json --format json",
        "  agentdraw schema open --format json",
        "",
        "Commands:",
        "  open       Start the local editor for a scene file.",
        "  init       Create a scene file without starting the editor.",
        "  validate   Validate one or more scene files.",
        "  doctor     Check local runtime details.",
        "  schema     Print command schemas for agents.",
        "  help       Show help for a command.",
        "  version    Print the CLI version.",
        "",
        "Global flags:",
        "  --format json|text   Output format for command results. Non-TTY defaults to json.",
        "  --json               Shortcut for --format json.",
        "  --cwd <directory>    Resolve scene paths from this directory.",
        "  --no-color           Disable colored output. Currently reserved for compatibility.",
        "  -h, --help           Show help.",
        "  -v, --version        Show version.",
        "",
        "Exit codes:",
        "  0 success, 1 runtime or validation error, 2 invalid arguments.",
      ].join("\n");
    case "open":
      return [
        "Start the local AgentDraw editor for a scene file.",
        "",
        "Examples:",
        "  agentdraw open board.agentdraw.json --no-open",
        "  agentdraw open .agentdraw/current.agentdraw.json --host 0.0.0.0 --port 3927",
        "  agentdraw open --json --no-open",
        "",
        "Usage:",
        "  agentdraw open [file] [--host <host>] [--port <port>] [--open|--no-open]",
        "",
        "Arguments:",
        `  file                Optional scene path. Default: ${DEFAULT_SCENE}`,
        "",
        "Flags:",
        `  --host <host>       Bind host. Default: ${DEFAULT_HOST}`,
        `  --port <port>       TCP port. Default: ${DEFAULT_PORT}`,
        "  --open              Launch the system browser.",
        "  --no-open           Do not launch the system browser.",
        "  --format json|text  Output format.",
        "  --json              Shortcut for --format json.",
      ].join("\n");
    case "init":
      return [
        "Create an AgentDraw scene file if it does not already exist.",
        "",
        "Examples:",
        "  agentdraw init .agentdraw/board.agentdraw.json",
        "  agentdraw init --json",
        "",
        "Usage:",
        "  agentdraw init [file]",
        "",
        "Arguments:",
        `  file                Optional scene path. Default: ${DEFAULT_SCENE}`,
      ].join("\n");
    case "validate":
      return [
        "Validate AgentDraw scene files for generated-diagram layout issues.",
        "",
        "Examples:",
        "  agentdraw validate board.agentdraw.json",
        "  agentdraw validate examples/*.agentdraw.json --format json",
        "",
        "Usage:",
        "  agentdraw validate <file...>",
        "",
        "Arguments:",
        "  file                Required scene path. Repeat for multiple files.",
        "",
        "Exit codes:",
        "  0 all files passed, 1 validation/runtime error, 2 invalid arguments.",
      ].join("\n");
    case "doctor":
      return [
        "Check AgentDraw CLI runtime details.",
        "",
        "Examples:",
        "  agentdraw doctor",
        "  agentdraw doctor --json",
        "",
        "Usage:",
        "  agentdraw doctor",
      ].join("\n");
    case "schema":
      return [
        "Print machine-readable command schemas for agents.",
        "",
        "Examples:",
        "  agentdraw schema",
        "  agentdraw schema open --json",
        "",
        "Usage:",
        "  agentdraw schema [command]",
      ].join("\n");
    default:
      throw new CliError("unknown_command", `No help available for: ${command}`, {
        exitCode: EXIT_USAGE_ERROR,
        suggestion: "Run: agentdraw --help",
        input: { command },
      });
  }
};

const commandSchema = (commandPath: string[]) => {
  const commands = {
    open: {
      description: "Start the local editor for a scene file.",
      usage: "agentdraw open [file] [--host <host>] [--port <port>] [--no-open]",
      arguments: [{ name: "file", required: false, default: DEFAULT_SCENE }],
      flags: [
        { name: "--host", type: "string", required: false, default: DEFAULT_HOST },
        { name: "--port", type: "integer", required: false, default: DEFAULT_PORT },
        { name: "--open", type: "boolean", required: false },
        { name: "--no-open", type: "boolean", required: false },
        { name: "--format", type: "enum", values: ["json", "text"], required: false },
        { name: "--json", type: "boolean", required: false },
      ],
      examples: [
        "agentdraw open board.agentdraw.json --no-open",
        "agentdraw open .agentdraw/current.agentdraw.json --host 0.0.0.0 --port 3927",
      ],
    },
    init: {
      description: "Create a scene file if missing.",
      usage: "agentdraw init [file]",
      arguments: [{ name: "file", required: false, default: DEFAULT_SCENE }],
      flags: [
        { name: "--format", type: "enum", values: ["json", "text"], required: false },
        { name: "--json", type: "boolean", required: false },
      ],
      examples: ["agentdraw init .agentdraw/board.agentdraw.json --json"],
    },
    validate: {
      description: "Validate one or more scene files.",
      usage: "agentdraw validate <file...>",
      arguments: [{ name: "file", required: true, repeatable: true }],
      flags: [
        { name: "--format", type: "enum", values: ["json", "text"], required: false },
        { name: "--json", type: "boolean", required: false },
      ],
      examples: [
        "agentdraw validate board.agentdraw.json",
        "agentdraw validate examples/*.agentdraw.json --format json",
      ],
    },
    doctor: {
      description: "Check local runtime details.",
      usage: "agentdraw doctor",
      arguments: [],
      flags: [
        { name: "--format", type: "enum", values: ["json", "text"], required: false },
        { name: "--json", type: "boolean", required: false },
      ],
      examples: ["agentdraw doctor --json"],
    },
    schema: {
      description: "Print command schemas for agents.",
      usage: "agentdraw schema [command]",
      arguments: [{ name: "command", required: false }],
      flags: [
        { name: "--format", type: "enum", values: ["json", "text"], required: false },
        { name: "--json", type: "boolean", required: false },
      ],
      examples: ["agentdraw schema", "agentdraw schema open --json"],
    },
  };

  if (commandPath.length === 0) {
    return {
      name: "agentdraw",
      version: VERSION,
      description: "Local editable whiteboard workspace for coding agents.",
      commands,
      globalFlags: [
        { name: "--format", type: "enum", values: ["json", "text"] },
        { name: "--json", type: "boolean" },
        { name: "--cwd", type: "string" },
        { name: "--no-color", type: "boolean" },
        { name: "--help", type: "boolean" },
        { name: "--version", type: "boolean" },
      ],
      exitCodes: {
        "0": "success",
        "1": "runtime or validation error",
        "2": "invalid arguments",
      },
    };
  }

  const [command] = commandPath;
  if (!(command in commands)) {
    throw new CliError("unknown_command", `Unknown command schema: ${command}`, {
      exitCode: EXIT_USAGE_ERROR,
      suggestion: "Run: agentdraw schema",
      input: { command },
    });
  }

  return {
    name: `agentdraw ${command}`,
    version: VERSION,
    ...commands[command as keyof typeof commands],
  };
};

const waitForShutdown = async (close: () => Promise<void>) => {
  await new Promise<void>((resolve) => {
    const shutdown = async () => {
      try {
        await close();
      } finally {
        resolve();
      }
    };
    process.once("SIGINT", shutdown);
    process.once("SIGTERM", shutdown);
  });
};

const openSystemBrowser = (url: string) => {
  const { command, args } = browserCommand(url);
  const child = spawn(command, args, {
    stdio: "ignore",
    detached: true,
  });
  child.unref();
};

const browserCommand = (url = "") => {
  if (process.platform === "darwin") {
    return { command: "open", args: [url].filter(Boolean) };
  }
  if (process.platform === "win32") {
    return { command: "cmd", args: ["/c", "start", "", url].filter(Boolean) };
  }
  return { command: "xdg-open", args: [url].filter(Boolean) };
};

const inferCommandFromFlags = (config: { valueFlags: string[] }) =>
  config.valueFlags.includes("--port") || config.valueFlags.includes("--host")
    ? "open"
    : "";

const errorPayload = (error: unknown): AgentDrawErrorPayload => {
  if (error instanceof CliError) {
    return {
      error: error.code,
      message: error.message,
      suggestion: error.suggestion,
      retryable: error.retryable,
      ...(error.input === undefined ? {} : { input: error.input }),
    };
  }

  if (error instanceof Error) {
    return {
      error: error.name === "SyntaxError" ? "invalid_json" : "runtime_error",
      message: error.message,
      suggestion:
        error.name === "SyntaxError"
          ? "Fix the scene JSON, then run: agentdraw validate <file>"
          : "Run: agentdraw doctor",
      retryable: false,
    };
  }

  return {
    error: "runtime_error",
    message: String(error),
    suggestion: "Run: agentdraw doctor",
    retryable: false,
  };
};

const errorExitCode = (error: unknown) =>
  error instanceof CliError ? error.exitCode : EXIT_GENERAL_ERROR;

function readPackageVersion() {
  const packageJsonPath = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    "../package.json",
  );
  try {
    const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf8")) as {
      version?: unknown;
    };
    return typeof packageJson.version === "string" ? packageJson.version : "0.0.0";
  } catch {
    return "0.0.0";
  }
}

main().catch((error) => {
  const payload = errorPayload(error);
  const shouldUseJson = !process.stderr.isTTY;
  if (shouldUseJson) {
    console.error(JSON.stringify(payload, null, 2));
  } else {
    console.error(`${payload.error}: ${payload.message}`);
    console.error(`Suggestion: ${payload.suggestion}`);
  }
  process.exit(errorExitCode(error));
});
