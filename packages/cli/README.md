# agentdraw

Local-first editable whiteboard workspace for coding agents.

```bash
npm install -g @aidraw/agentdraw
agentdraw open board.agentdraw.json --no-open
```

Or run without installing:

```bash
npx @aidraw/agentdraw open board.agentdraw.json --no-open
```

Commands:

```bash
agentdraw --help
agentdraw open [file] [--host 127.0.0.1] [--port 3927] [--open|--no-open]
agentdraw init [file]
agentdraw validate <file...> [--format json|text]
agentdraw schema [command] [--json]
agentdraw doctor
```

AgentDraw opens a local Excalidraw-based editor, saves back to `.agentdraw.json`, and validates common generated-diagram issues before users inspect the board.

For agents, prefer `--format json` or `--json`. Non-TTY command results default to JSON.

Repository: https://github.com/chenhg5/agentdraw
