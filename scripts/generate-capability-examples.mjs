import { mkdir, readFile, writeFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";

const outputDir = "examples";
const sourceDir = "examples/source";

await mkdir(outputDir, { recursive: true });
await mkdir(sourceDir, { recursive: true });

const examples = [
  {
    id: "capability-flowchart",
    title: "Agent Runtime Flowchart",
    styleId: "blueprint-formal",
    svg: flowchartSvg(),
  },
  {
    id: "capability-sequence",
    title: "SVG Import Sequence",
    styleId: "boardroom",
    svg: sequenceSvg(),
  },
  {
    id: "capability-class-map",
    title: "AgentDraw Module Map",
    styleId: "raw-grid",
    svg: classMapSvg(),
  },
];

for (const example of examples) {
  const svgPath = `${sourceDir}/${example.id}.svg`;
  const scenePath = `${outputDir}/${example.id}.agentdraw.json`;
  await writeFile(svgPath, `${example.svg}\n`, "utf8");
  run("node", [
    "packages/cli/dist/index.js",
    "import-svg",
    svgPath,
    "--out",
    scenePath,
    "--style",
    example.styleId,
    "--title",
    example.title,
    "--format",
    "json",
  ]);
  run("node", [
    "packages/cli/dist/index.js",
    "repair",
    scenePath,
    "--style",
    example.styleId,
    "--write",
    "--format",
    "json",
  ]);
  const scene = JSON.parse(await readFile(scenePath, "utf8"));
  scene.id = example.id;
  scene.updatedAt = "2026-07-04T00:00:00.000Z";
  scene.appState = {
    ...scene.appState,
    viewBackgroundColor: palette(example.styleId).canvas,
  };
  await writeFile(scenePath, `${JSON.stringify(scene, null, 2)}\n`, "utf8");
}

function run(command, args) {
  const result = spawnSync(command, args, {
    cwd: process.cwd(),
    stdio: "inherit",
    encoding: "utf8",
  });
  if (result.status !== 0) {
    throw new Error(`Command failed: ${command} ${args.join(" ")}`);
  }
}

function flowchartSvg() {
  const p = palette("blueprint-formal");
  return svg(1180, 720, p, [
    frame(52, 52, 1076, 600, p.canvas, p.ink, 2, 0),
    text(86, 110, "AgentDraw Generation Flow", 38, 760, p.ink),
    text(88, 148, "Professional flowchart with terminators, process blocks, decisions, and rework loops", 16, 500, p.muted),
    marker(p.accent),
    terminator(470, 178, 240, 54, "Start", p),
    arrow(590, 232, 590, 268, p.accent),
    processBox(430, 268, 320, 84, "Choose design system", "Load design.md and contract", p),
    arrow(590, 352, 590, 370, p.accent),
    processBox(430, 370, 320, 84, "Draft restricted SVG", "Use editable shapes and real text", p),
    arrow(590, 454, 590, 472, p.accent),
    decisionDiamond(590, 520, 180, 96, "Preview passes?", p),
    text(718, 488, "Yes", 15, 700, p.ink),
    text(430, 496, "No", 15, 700, p.ink),
    arrow(590, 568, 590, 602, p.accent),
    terminator(470, 602, 240, 54, "Open editable board", p),
    polyline("500,520 292,520 292,403 430,403", p.accent),
    processBox(800, 370, 250, 84, "import-svg", "Convert to board objects", p),
    arrow(750, 412, 800, 412, p.accent),
    processBox(800, 472, 250, 84, "repair + validate", "Normalize and gate quality", p),
    arrow(925, 454, 925, 472, p.accent),
    arrow(800, 505, 680, 505, p.accent),
    rect(108, 250, 286, 230, p.accent2, p.line, 2, 0),
    text(130, 286, "Flowchart conventions", 20, 760, p.ink),
    text(130, 326, "Oval = start / end", 16, 600, p.ink),
    text(130, 362, "Rectangle = process", 16, 600, p.ink),
    text(130, 398, "Diamond = decision", 16, 600, p.ink),
    text(130, 434, "Loop = revise source", 16, 600, p.ink),
  ]);
}

function sequenceSvg() {
  const p = palette("boardroom");
  const actors = [
    [140, "User"],
    [340, "Agent"],
    [560, "SVG File"],
    [780, "AgentDraw CLI"],
    [1010, "Browser Editor"],
  ];
  const rows = [
    [286, 140, 340, "request diagram"],
    [346, 340, 560, "write restricted SVG"],
    [406, 340, 780, "agentdraw import-svg"],
    [466, 780, 1010, "open local editor"],
    [526, 1010, 140, "review and edit"],
    [586, 1010, 780, "autosave scene"],
  ];
  return svg(1180, 720, p, [
    frame(52, 52, 1076, 600, p.canvas, p.ink, 2, 6),
    text(84, 110, "AgentDraw Sequence Diagram", 36, 760, p.ink),
    text(86, 146, "Messages align to participant lifelines with long horizontal arrows and return flow", 16, 500, p.muted),
    marker(p.accent),
    ...actors.flatMap(([x, label]) => [
      rect(x - 82, 186, 164, 48, p.panel, p.line, 2, 4),
      centerText(x, 210, label, 17, 750, p.ink),
      line(x, 234, x, 616, p.line, 1),
    ]),
    rect(334, 276, 12, 168, p.accent2, p.accent, 1, 2),
    rect(774, 396, 12, 202, p.accent2, p.accent, 1, 2),
    rect(1004, 456, 12, 144, p.accent2, p.accent, 1, 2),
    ...rows.flatMap(([y, x1, x2, label]) => message(y, x1, x2, label, p)),
    rect(84, 628, 1010, 34, p.accent2, p.line, 1, 4),
    centerText(589, 645, "The final board remains editable; the generated SVG stays inspectable.", 15, 700, p.ink),
  ]);
}

function classMapSvg() {
  const p = palette("raw-grid");
  return svg(1180, 720, p, [
    frame(52, 52, 1076, 600, p.canvas, p.ink, 2, 0),
    text(84, 110, "AgentDraw Class Diagram", 38, 800, p.ink),
    text(86, 148, "UML-style compartments with attributes, operations, associations, and dependencies", 16, 500, p.muted),
    marker(p.ink),
    umlClass(94, 210, 278, "AgentDrawScene", ["+ elements: Element[]", "+ appState: AppState", "+ files: BinaryFiles"], ["+ snapshot(): Scene", "+ merge(input): Scene"], p),
    umlClass(452, 210, 278, "SvgImporter", ["- parser: XMLParser", "- styleId: string"], ["+ import(svg): AgentDrawScene", "+ warn(issue): void"], p),
    umlClass(810, 210, 278, "SceneValidator", ["- contract: DesignContract", "- rules: Rule[]"], ["+ validate(scene): Issue[]", "+ quality(scene): Score"], p),
    umlClass(452, 472, 278, "LocalServer", ["- filePath: string", "- baseUpdatedAt: string"], ["+ GET /api/scene", "+ POST /api/scene"], p),
    umlClass(810, 472, 278, "WebEditor", ["- provider: Excalidraw", "- saveState: SaveState"], ["+ open(scene): void", "+ export(format): Blob"], p),
    relation(372, 304, 452, 304, "creates", p),
    relation(730, 304, 810, 304, "checks", p),
    relation(591, 410, 591, 472, "serves", p),
    relation(730, 566, 810, 566, "opens", p),
    arrow(949, 472, 949, 412, p.ink),
    text(962, 446, "reports issues", 15, 600, p.muted),
  ]);
}

function palette(styleId) {
  const palettes = {
    "blueprint-formal": {
      canvas: "#F8FBFF",
      ink: "#163B68",
      panel: "#FFFFFF",
      accent: "#0B63CE",
      accent2: "#DBEAFE",
      muted: "#5B708A",
      line: "#B9C5D5",
    },
    boardroom: {
      canvas: "#FFFFFF",
      ink: "#182230",
      panel: "#F8FAFC",
      accent: "#4053D6",
      accent2: "#E7EEF8",
      muted: "#667085",
      line: "#BEC1C5",
    },
    "raw-grid": {
      canvas: "#FFFFFF",
      ink: "#0A0A0A",
      panel: "#F8F8F8",
      accent: "#0A0A0A",
      accent2: "#F2D4CF",
      muted: "#5B5B5B",
      line: "#0A0A0A",
    },
  };
  return palettes[styleId];
}

function svg(width, height, p, children) {
  return [
    `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">`,
    `<rect width="${width}" height="${height}" fill="${p.canvas}" />`,
    ...children,
    "</svg>",
  ].join("\n");
}

function grid(p) {
  const lines = [];
  for (let x = 60; x <= 1120; x += 80) {
    lines.push(`<line x1="${x}" y1="60" x2="${x}" y2="650" stroke="${p.line}" stroke-width="1" opacity="0.3" />`);
  }
  for (let y = 70; y <= 630; y += 80) {
    lines.push(`<line x1="60" y1="${y}" x2="1120" y2="${y}" stroke="${p.line}" stroke-width="1" opacity="0.3" />`);
  }
  return lines.join("\n");
}

function marker(color) {
  return [
    "<defs>",
    `<marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto" markerUnits="strokeWidth">`,
    `<path d="M 0 0 L 10 5 L 0 10 z" fill="${color}" />`,
    "</marker>",
    "</defs>",
  ].join("");
}

function frame(x, y, width, height, fill, stroke, strokeWidth, rx) {
  return rect(x, y, width, height, fill, stroke, strokeWidth, rx, "frame");
}

function terminator(x, y, width, height, value, p) {
  return [
    `<ellipse cx="${x + width / 2}" cy="${y + height / 2}" rx="${width / 2}" ry="${height / 2}" fill="${p.panel}" stroke="${p.accent}" stroke-width="2" />`,
    centerText(x + width / 2, y + height / 2, value, 18, 760, p.ink),
  ].join("\n");
}

function processBox(x, y, width, height, title, body, p) {
  return [
    rect(x, y, width, height, p.panel, p.accent, 2, 0),
    centerText(x + width / 2, y + 24, title, 18, 760, p.ink),
    centerText(x + width / 2, y + 58, body, 15, 500, p.muted),
  ].join("\n");
}

function decisionDiamond(cx, cy, width, height, value, p) {
  return [
    diamond(cx, cy, width, height, p.panel, p.accent, 2),
    multiText(cx, cy + 2, value.split("\n"), 16, 760, p.ink),
  ].join("\n");
}

function diamond(cx, cy, width, height, fill, stroke, strokeWidth) {
  const points = [
    [cx, cy - height / 2],
    [cx + width / 2, cy],
    [cx, cy + height / 2],
    [cx - width / 2, cy],
  ]
    .map((point) => point.join(","))
    .join(" ");
  return `<polygon points="${points}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}" />`;
}

function rect(x, y, width, height, fill, stroke, strokeWidth, rx, role) {
  const roleAttr = role ? ` data-agentdraw-role="${role}"` : "";
  return `<rect x="${x}" y="${y}" width="${width}" height="${height}" rx="${rx}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}"${roleAttr} />`;
}

function text(x, y, value, size, weight, fill) {
  return `<text x="${x}" y="${y}" font-family="Inter, Arial, Noto Sans SC, sans-serif" font-size="${size}" font-weight="${weight}" fill="${fill}">${escapeXml(value)}</text>`;
}

function centerText(x, y, value, size, weight, fill) {
  return `<text x="${x}" y="${y}" text-anchor="middle" dominant-baseline="middle" font-family="Inter, Arial, Noto Sans SC, sans-serif" font-size="${size}" font-weight="${weight}" fill="${fill}">${escapeXml(value)}</text>`;
}

function multiText(x, y, lines, size, weight, fill) {
  return `<text x="${x}" y="${y}" text-anchor="middle" dominant-baseline="middle" font-family="Inter, Arial, Noto Sans SC, sans-serif" font-size="${size}" font-weight="${weight}" fill="${fill}">${lines.map((line, index) => `<tspan x="${x}" dy="${index === 0 ? "-0.6em" : "1.2em"}">${escapeXml(line)}</tspan>`).join("")}</text>`;
}

function message(y, x1, x2, label, p) {
  const mid = (x1 + x2) / 2;
  const labelX = x1 < x2 ? mid - 80 : mid + 18;
  return [
    arrow(x1, y, x2, y, p.accent),
    text(labelX, y - 16, label, 15, 650, p.ink),
  ].join("\n");
}

function umlClass(x, y, width, name, attributes, operations, p) {
  const attrHeight = 30 + attributes.length * 24;
  const opHeight = 30 + operations.length * 24;
  const height = 46 + attrHeight + opHeight;
  const attrY = y + 46;
  const opY = attrY + attrHeight;
  return [
    rect(x, y, width, height, p.panel, p.ink, 2, 0),
    rect(x, y, width, 46, p.ink, p.ink, 2, 0),
    centerText(x + width / 2, y + 23, name, 18, 800, p.canvas),
    line(x, attrY, x + width, attrY, p.ink, 2),
    ...attributes.map((item, index) => text(x + 16, attrY + 30 + index * 24, item, 15, 600, p.ink)),
    line(x, opY, x + width, opY, p.ink, 2),
    ...operations.map((item, index) => text(x + 16, opY + 30 + index * 24, item, 15, 600, p.ink)),
  ].join("\n");
}

function relation(x1, y1, x2, y2, label, p) {
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;
  const labelX = x1 === x2 ? midX + 14 : midX - 26;
  const labelY = x1 === x2 ? midY : midY - 12;
  return [
    arrow(x1, y1, x2, y2, p.ink),
    text(labelX, labelY, label, 15, 600, p.muted),
  ].join("\n");
}

function line(x1, y1, x2, y2, stroke, strokeWidth) {
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${strokeWidth}" />`;
}

function arrow(x1, y1, x2, y2, stroke, strokeWidth = 2) {
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${strokeWidth}" marker-end="url(#arrow)" />`;
}

function polyline(points, stroke, strokeWidth = 2) {
  return `<polyline points="${points}" fill="none" stroke="${stroke}" stroke-width="${strokeWidth}" marker-end="url(#arrow)" />`;
}

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
