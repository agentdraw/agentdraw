import { mkdir, writeFile } from "node:fs/promises";

let seed = 1000;

const palettes = {
  "system-formal": {
    canvas: "#FFFFFF",
    ink: "#172033",
    panel: "#F7F9FC",
    accent: "#2563EB",
    accent2: "#D8E5FF",
    accent3: "#64748B",
  },
  boardroom: {
    canvas: "#FFFFFF",
    ink: "#182230",
    panel: "#F8FAFC",
    accent: "#4053D6",
    accent2: "#E7EEF8",
    accent3: "#667085",
  },
  "blueprint-formal": {
    canvas: "#F8FBFF",
    ink: "#163B68",
    panel: "#FFFFFF",
    accent: "#0B63CE",
    accent2: "#DBEAFE",
    accent3: "#5B708A",
  },
  "riso-brut": {
    canvas: "#EFE9D9",
    ink: "#1E1B16",
    panel: "#FFF8E8",
    accent: "#1F8A4C",
    accent2: "#F06CA8",
    accent3: "#E85A1F",
  },
  grove: {
    canvas: "#E8E4D6",
    ink: "#192B1B",
    panel: "#F4EFE2",
    accent: "#192B1B",
    accent2: "#C8524A",
    accent3: "#766C58",
  },
  "mint-brut": {
    canvas: "#D0FDE4",
    ink: "#000000",
    panel: "#FFFFFF",
    accent: "#F888C8",
    accent2: "#A7E7FF",
    accent3: "#6DD89E",
  },
  coral: {
    canvas: "#F5F0E8",
    ink: "#1A1A1A",
    panel: "#FFFFFF",
    accent: "#E85D5D",
    accent2: "#F4B1A3",
    accent3: "#6B5248",
  },
  "violet-marker": {
    canvas: "#FFFFFF",
    ink: "#171717",
    panel: "#F8F4FF",
    accent: "#C5A1FF",
    accent2: "#CFEE30",
    accent3: "#5E4A88",
  },
};

const examples = [
  ["examples/theme-agentdraw-os.agentdraw.json", buildAgentDrawOs],
  ["examples/theme-incident-command.agentdraw.json", buildIncidentCommand],
  ["examples/theme-message-bus.agentdraw.json", buildMessageBus],
  ["examples/theme-launch-room.agentdraw.json", buildLaunchRoom],
  ["examples/theme-strategy-grove.agentdraw.json", buildStrategyGrove],
  ["examples/theme-roadmap-mint.agentdraw.json", buildRoadmapMint],
  ["examples/theme-customer-journey.agentdraw.json", buildCustomerJourney],
  ["examples/theme-research-synthesis.agentdraw.json", buildResearchSynthesis],
];

await mkdir("examples", { recursive: true });

for (const [file, build] of examples) {
  const scene = build();
  await writeFile(file, `${JSON.stringify(scene, null, 2)}\n`, "utf8");
}

function buildAgentDrawOs() {
  const p = palettes["system-formal"];
  const elements = [
    text("title", 64, 52, 620, 42, "AgentDraw Operating System", 34, p.ink),
    text("subtitle", 66, 102, 720, 24, "A local loop for agent-made diagrams, validation, replay, and human editing.", 17, p.accent3),
    rect("canvas", 44, 34, 1188, 650, "transparent", p.accent2, 2),
    rect("top-band", 66, 150, 1120, 50, p.accent, p.accent, 0),
    text("top-band-label", 92, 165, 980, 20, "prompt -> semantic scene -> provider adapter -> editable canvas", 17, "#FFFFFF"),
  ];

  const modules = [
    ["Agent", "Reads task\nand files", 92, 248],
    ["Builder", "Chooses layout\nand style", 352, 248],
    ["Validator", "Checks text\nand routes", 612, 248],
    ["Editor", "Replay, edit\nand export", 872, 248],
  ];

  modules.forEach(([title, body, x, y], index) => {
    elements.push(
      rect(`module-${index}`, x, y, 210, 136, index % 2 ? p.accent2 : p.panel, p.ink, 2),
      text(`module-title-${index}`, x + 22, y + 24, 166, 26, title, 24, p.ink, "center", "middle"),
      text(`module-body-${index}`, x + 26, y + 70, 158, 48, body, 16, p.accent3, "center", "middle"),
    );
    if (index < modules.length - 1) {
      elements.push(elbow(`module-flow-${index}`, x + 210, y + 68, 50, 0, p.accent));
    }
  });

  const rows = [
    ["Storage", ".agentdraw.json", "portable scene envelope"],
    ["Provider", "Excalidraw", "editable primitives"],
    ["Quality", "validate", "repair before opening"],
  ];
  elements.push(rect("table", 92, 468, 1040, 136, p.panel, p.ink, 2));
  rows.forEach((row, index) => {
    const y = 468 + index * 45;
    elements.push(
      rect(`row-${index}`, 92, y, 1040, 45, index === 0 ? p.accent2 : "transparent", p.ink, index === 0 ? 0 : 1),
      text(`row-a-${index}`, 122, y + 13, 180, 20, row[0], 16, p.ink),
      text(`row-b-${index}`, 360, y + 13, 220, 20, row[1], 16, p.accent),
      text(`row-c-${index}`, 640, y + 13, 420, 20, row[2], 16, p.accent3),
    );
  });

  return scene("AgentDraw Operating System", "system-formal", elements);
}

function buildIncidentCommand() {
  const p = palettes.boardroom;
  const elements = [
    text("title", 72, 54, 520, 40, "Incident Command Center", 34, p.ink),
    text("subtitle", 74, 104, 650, 24, "A command board for severity, owners, recovery windows, and learning loops.", 17, p.accent3),
    rect("frame", 44, 36, 1188, 650, "transparent", p.accent2, 2),
    rect("status", 78, 158, 292, 404, p.ink, p.ink, 0),
    text("status-title", 104, 184, 230, 44, "SEV-1", 32, "#FFFFFF", "center", "middle"),
    text("status-body", 110, 252, 228, 96, "Payments degraded\nOwner: infra lead\nETA: 24 min", 22, "#FFFFFF", "center", "middle"),
    rect("status-chip", 118, 438, 180, 46, p.accent, p.accent, 0),
    text("status-chip-text", 142, 451, 132, 20, "Mitigating", 18, "#FFFFFF", "center", "middle"),
  ];

  const cards = [
    ["Detect", "alert spike", "logs"],
    ["Triage", "blast radius", "owner"],
    ["Mitigate", "rollback", "patch"],
    ["Review", "timeline", "actions"],
  ];
  cards.forEach((card, index) => {
    const x = 434 + (index % 2) * 330;
    const y = 168 + Math.floor(index / 2) * 174;
    elements.push(
      rect(`incident-${index}`, x, y, 260, 116, index === 2 ? p.accent2 : p.panel, p.ink, 2),
      text(`incident-title-${index}`, x + 24, y + 20, 210, 24, card[0], 22, p.ink),
      text(`incident-body-${index}`, x + 24, y + 58, 210, 42, `${card[1]}\n${card[2]}`, 16, p.accent3),
    );
  });
  elements.push(
    elbow("route-a", 370, 260, 64, -34, p.accent),
    elbow("route-b", 694, 226, 70, 0, p.accent),
    elbow("route-c", 564, 284, 0, 58, p.accent),
    elbow("route-d", 694, 400, 70, 0, p.accent),
    rect("timeline", 434, 520, 590, 56, p.panel, p.ink, 2),
    text("timeline-text", 462, 538, 530, 20, "00:04 detect   00:11 owner   00:19 rollback   00:31 stable", 16, p.ink, "center", "middle"),
  );

  return scene("Incident Command Center", "boardroom", elements);
}

function buildMessageBus() {
  const p = palettes["blueprint-formal"];
  const elements = [
    text("title", 70, 54, 520, 40, "Multi-Agent Message Bus", 34, p.ink),
    text("subtitle", 72, 104, 650, 24, "A formal blueprint for coordinating specialist agents through shared events.", 17, p.accent3),
    rect("frame", 44, 36, 1188, 650, "transparent", p.accent2, 2),
    rect("bus", 154, 338, 900, 64, p.accent, p.accent, 0),
    text("bus-label", 220, 360, 760, 20, "EVENT BACKBONE · requests · tool results · validation facts · memory writes", 18, "#FFFFFF", "center", "middle"),
  ];

  const agents = [
    ["Planner", "goals\nroutes", 122, 196],
    ["Worker A", "code\ntools", 382, 196],
    ["Verifier", "checks\ndiffs", 642, 196],
    ["Memory", "facts\nstate", 902, 196],
  ];
  agents.forEach(([title, body, x, y], index) => {
    elements.push(
      rect(`agent-${index}`, x, y, 168, 104, p.panel, p.ink, 2),
      text(`agent-title-${index}`, x + 20, y + 18, 128, 22, title, 20, p.ink, "center", "middle"),
      text(`agent-body-${index}`, x + 28, y + 56, 112, 36, body, 15, p.accent3, "center", "middle"),
      elbow(`agent-down-${index}`, x + 84, y + 104, 0, 38, p.accent),
    );
  });
  const stores = [
    ["Scene File", 212, 470],
    ["Browser", 522, 500],
    ["Export", 832, 470],
  ];
  stores.forEach(([label, x, y], index) => {
    elements.push(
      rect(`store-${index}`, x, y, 190, 72, index === 1 ? p.accent2 : p.panel, p.ink, 2),
      text(`store-label-${index}`, x + 24, y + 26, 142, 20, label, 18, p.ink, "center", "middle"),
      elbow(`store-up-${index}`, x + 95, y, 0, -68, p.accent),
    );
  });

  return scene("Multi-Agent Message Bus", "blueprint-formal", elements);
}

function buildLaunchRoom() {
  const p = palettes["riso-brut"];
  const elements = [
    text("title", 70, 54, 500, 48, "Launch Room Loop", 42, p.ink),
    text("subtitle", 74, 112, 640, 24, "Chunky editorial blocks for campaign bets and learning cycles.", 18, p.ink),
    rect("frame", 44, 36, 1188, 650, "transparent", p.ink, 4),
    rect("poster-band", 760, 56, 350, 72, p.accent2, p.ink, 4),
    text("poster-band-text", 790, 78, 290, 26, "SHIP / LEARN", 26, p.ink, "center", "middle"),
  ];

  const blocks = [
    ["01", "Audience", "pain\nsegment", 110, 204, p.accent],
    ["02", "Promise", "story\noffer", 382, 236, p.panel],
    ["03", "Surface", "page\nasset", 654, 204, p.accent2],
    ["04", "Signal", "traffic\nreply", 926, 236, p.accent3],
  ];
  blocks.forEach(([num, title, body, x, y, fill], index) => {
    shadow(`shadow-${index}`, elements, x, y, 202, 148, index === 3 ? p.accent : p.ink);
    elements.push(
      rect(`block-${index}`, x, y, 202, 148, fill, p.ink, 4),
      rect(`num-${index}`, x + 18, y + 18, 44, 36, p.panel, p.ink, 3),
      text(`num-text-${index}`, x + 28, y + 26, 24, 16, num, 16, p.ink, "center", "middle"),
      text(`block-title-${index}`, x + 24, y + 66, 154, 28, title, 27, p.ink, "center", "middle"),
      text(`block-body-${index}`, x + 34, y + 98, 134, 44, body, 16, p.ink, "center", "middle"),
    );
    if (index < blocks.length - 1) {
      elements.push(arrow(`brut-flow-${index}`, x + 214, y + 76, 54, index % 2 ? -30 : 30, p.ink, 4));
    }
  });
  elements.push(
    rect("learning-strip", 132, 520, 930, 58, p.panel, p.ink, 4),
    text("learning-strip-text", 164, 538, 866, 22, "Every loop returns with one stronger message, one clearer audience, and one cleaner surface.", 18, p.ink, "center", "middle"),
  );

  return scene("Launch Room Loop", "riso-brut", elements, { roughness: 0, roundness: "sharp" });
}

function buildStrategyGrove() {
  const p = palettes.grove;
  const elements = [
    text("title", 72, 56, 540, 42, "Quarterly Strategy Map", 38, p.ink),
    text("subtitle", 76, 108, 600, 24, "A quiet editorial board for bets, constraints, and operating cadence.", 17, p.accent3),
    rect("frame", 44, 36, 1188, 650, "transparent", p.accent3, 2),
    rect("thesis", 88, 176, 426, 332, p.accent, p.accent, 0),
    text("thesis-label", 126, 218, 336, 26, "NORTH STAR", 19, p.panel, "center", "middle"),
    text("thesis-main", 128, 258, 334, 136, "Improve creator\nconfidence before\nteam expansion", 32, p.panel, "center", "middle"),
    rect("coral-rule", 156, 422, 220, 8, p.accent2, p.accent2, 0),
  ];

  const cards = [
    ["Bets", "Template system\nReplay polish", 574, 178],
    ["Constraints", "Local first\nEditable output", 846, 178],
    ["Rituals", "Weekly review\nDesign QA", 574, 384],
    ["Signals", "Share rate\nRepair count", 846, 384],
  ];
  cards.forEach(([title, body, x, y], index) => {
    elements.push(
      rect(`grove-card-${index}`, x, y, 226, 126, p.panel, p.panel, 0),
      text(`grove-card-title-${index}`, x + 26, y + 22, 174, 24, title, 22, p.ink),
      text(`grove-card-body-${index}`, x + 26, y + 62, 174, 42, body, 17, p.accent3),
    );
  });
  elements.push(
    arrow("grove-a", 514, 276, 60, -34, p.accent2, 3),
    arrow("grove-b", 514, 364, 60, 84, p.accent2, 3),
    rect("footer-note", 130, 566, 918, 44, "transparent", p.accent2, 0),
    text("footer-note-text", 132, 574, 914, 20, "One coral accent only. Let the parchment carry the calm.", 17, p.accent2, "center", "middle"),
  );

  return scene("Quarterly Strategy Map", "grove", elements, { roundness: "sharp" });
}

function buildRoadmapMint() {
  const p = palettes["mint-brut"];
  const elements = [
    text("title", 70, 54, 490, 44, "Creator Tool Roadmap", 38, p.ink),
    text("subtitle", 74, 106, 630, 24, "A playful product map with stacked cards, bright chips, and visible depth.", 17, p.ink),
    rect("frame", 44, 36, 1188, 650, "transparent", p.ink, 3),
  ];

  const cards = [
    ["NOW", "Sketch\nReplay", 126, 188, p.panel],
    ["NEXT", "Comments\nShare", 370, 250, p.accent2],
    ["LATER", "Templates\nTeams", 616, 188, p.accent],
    ["SCALE", "Agents\nGallery", 860, 250, p.panel],
  ];
  cards.forEach(([stage, body, x, y, fill], index) => {
    shadow(`mint-shadow-${index}`, elements, x, y, 202, 142, index % 2 ? p.accent : p.accent3, 14);
    elements.push(
      rect(`mint-card-${index}`, x, y, 202, 142, fill, p.ink, 3, { roundness: true }),
      rect(`mint-chip-${index}`, x + 24, y + 18, 86, 34, index % 2 ? p.panel : p.accent2, p.ink, 2, { roundness: true }),
      text(`mint-stage-${index}`, x + 34, y + 27, 66, 14, stage, 14, p.ink, "center", "middle"),
      text(`mint-body-${index}`, x + 36, y + 62, 130, 64, body, 24, p.ink, "center", "middle"),
    );
    if (index < cards.length - 1) {
      elements.push(arrow(`mint-flow-${index}`, x + 208, y + 72, 38, index % 2 ? -48 : 48, p.ink, 3));
    }
  });
  elements.push(
    rect("mint-base", 174, 536, 826, 54, p.accent2, p.ink, 3, { roundness: true }),
    text("mint-base-text", 208, 552, 758, 20, "Manual edits stay first-class. Agents generate the draft, humans keep control.", 17, p.ink, "center", "middle"),
  );

  return scene("Creator Tool Roadmap", "mint-brut", elements, { roughness: 1, fontFamily: 1 });
}

function buildCustomerJourney() {
  const p = palettes.coral;
  const elements = [
    text("title", 70, 54, 520, 42, "Customer Journey Signals", 36, p.ink),
    text("subtitle", 74, 106, 720, 24, "A warm journey board connecting user moments to measurable product signals.", 17, p.accent3),
    rect("frame", 44, 36, 1188, 650, "transparent", p.accent2, 2),
    rect("journey-band", 94, 234, 1000, 86, p.accent2, p.accent2, 0, { roundness: true, customData: { role: "decoration" } }),
  ];

  const steps = [
    ["Discover", "source\nintent", 132, 196],
    ["Activate", "aha\nsetup", 386, 304],
    ["Adopt", "habit\nvalue", 640, 196],
    ["Expand", "invite\nupgrade", 894, 304],
  ];
  steps.forEach(([title, body, x, y], index) => {
    elements.push(
      ellipse(`journey-dot-${index}`, x + 70, y + 170, 26, 26, p.accent, p.accent, 0),
      rect(`journey-card-${index}`, x, y, 184, 122, p.panel, p.ink, 2, { roundness: true }),
      text(`journey-title-${index}`, x + 24, y + 24, 136, 22, title, 22, p.ink, "center", "middle"),
      text(`journey-body-${index}`, x + 32, y + 66, 120, 38, body, 16, p.accent3, "center", "middle"),
    );
    if (index < steps.length - 1) {
      elements.push(arrow(`journey-flow-${index}`, x + 184, y + 64, 70, index % 2 ? -86 : 86, p.accent, 3));
    }
  });
  elements.push(
    rect("signal-panel", 176, 530, 828, 58, p.ink, p.ink, 0),
    text("signal-panel-text", 214, 548, 752, 20, "Each stage owns one human moment and one metric, never a wall of copy.", 17, "#FFFFFF", "center", "middle"),
  );

  return scene("Customer Journey Signals", "coral", elements);
}

function buildResearchSynthesis() {
  const p = palettes["violet-marker"];
  const elements = [
    text("title", 70, 54, 530, 42, "Research Synthesis Wall", 36, p.ink),
    text("subtitle", 74, 106, 680, 24, "A bright clustering board for turning interview notes into decisions.", 17, p.accent3),
    rect("frame", 44, 36, 1188, 650, "transparent", p.accent2, 2),
  ];

  const clusters = [
    ["Notes", ["slow setup", "unclear export", "likes replay"], 104, 184, p.panel],
    ["Themes", ["trust", "speed", "control"], 414, 212, p.accent],
    ["Insights", ["editability wins", "preview matters", "style rules help"], 724, 184, p.accent2],
  ];
  clusters.forEach(([title, notes, x, y, fill], clusterIndex) => {
    elements.push(
      rect(`cluster-${clusterIndex}`, x, y, 246, 260, "transparent", p.accent3, 2),
      text(`cluster-title-${clusterIndex}`, x + 28, y + 20, 188, 24, title, 24, p.ink, "center", "middle"),
    );
    notes.forEach((note, noteIndex) => {
      const nx = x + 26 + (noteIndex % 2) * 42;
      const ny = y + 72 + noteIndex * 48;
      shadow(`note-shadow-${clusterIndex}-${noteIndex}`, elements, nx, ny, 154, 38, noteIndex % 2 ? p.accent2 : p.accent3, 8);
      elements.push(
        rect(`note-${clusterIndex}-${noteIndex}`, nx, ny, 154, 38, fill, p.ink, 2, { roundness: true }),
        text(`note-text-${clusterIndex}-${noteIndex}`, nx + 14, ny + 11, 126, 14, note, 14, p.ink, "center", "middle"),
      );
    });
  });
  elements.push(
    arrow("research-a", 350, 314, 64, 0, p.ink, 3),
    arrow("research-b", 660, 314, 64, 0, p.ink, 3),
    rect("decision", 300, 522, 610, 54, p.accent2, p.ink, 2, { roundness: true }),
    text("decision-text", 334, 538, 542, 20, "Decision: ship design systems before adding more providers.", 17, p.ink, "center", "middle"),
  );

  return scene("Research Synthesis Wall", "violet-marker", elements, { roughness: 1 });
}

function scene(title, styleId, elements, overrides = {}) {
  const p = palettes[styleId];
  return {
    type: "agentdraw/scene",
    version: 1,
    id: `theme-${styleId}`,
    title,
    styleId,
    providerId: "excalidraw",
    updatedAt: new Date().toISOString(),
    elements,
    appState: {
      viewBackgroundColor: p.canvas,
      currentItemStrokeColor: p.ink,
      currentItemBackgroundColor: p.panel,
      currentItemFillStyle: "solid",
      currentItemStrokeWidth: 2,
      currentItemStrokeStyle: "solid",
      currentItemRoughness: overrides.roughness ?? 0,
      currentItemFontFamily: overrides.fontFamily ?? 2,
      currentItemRoundness: overrides.roundness ?? "round",
      currentItemArrowType: "sharp",
      currentItemStartArrowhead: null,
      currentItemEndArrowhead: "arrow",
      scrollX: 80,
      scrollY: 28,
      zoom: { value: 0.78 },
    },
    files: {},
  };
}

function shadow(id, elements, x, y, width, height, color, offset = 12) {
  elements.push(
    rect(id, x + offset, y + offset, width, height, color, color, 0, {
      customData: { role: "shadow" },
    }),
  );
}

function rect(id, x, y, width, height, backgroundColor, strokeColor, strokeWidth, extra = {}) {
  return base(id, "rectangle", x, y, width, height, {
    strokeColor,
    backgroundColor,
    fillStyle: "solid",
    strokeWidth,
    strokeStyle: "solid",
    roughness: 0,
    roundness: extra.roundness ? { type: 3 } : null,
    customData: extra.customData,
  });
}

function ellipse(id, x, y, width, height, backgroundColor, strokeColor, strokeWidth) {
  return base(id, "ellipse", x, y, width, height, {
    strokeColor,
    backgroundColor,
    fillStyle: "solid",
    strokeWidth,
    strokeStyle: "solid",
    roughness: 0,
    roundness: null,
  });
}

function text(id, x, y, width, height, value, fontSize, strokeColor, textAlign = "left", verticalAlign = "top") {
  return base(id, "text", x, y, width, height, {
    strokeColor,
    backgroundColor: "transparent",
    fillStyle: "solid",
    strokeWidth: 2,
    strokeStyle: "solid",
    roughness: 0,
    text: value,
    fontSize,
    fontFamily: 2,
    textAlign,
    verticalAlign,
    containerId: null,
    originalText: value,
    lineHeight: 1.25,
  });
}

function arrow(id, x, y, width, height, strokeColor, strokeWidth = 2) {
  return base(id, "arrow", x, y, width, height, {
    strokeColor,
    backgroundColor: "transparent",
    fillStyle: "solid",
    strokeWidth,
    strokeStyle: "solid",
    roughness: 0,
    points: [
      [0, 0],
      [width, height],
    ],
    lastCommittedPoint: null,
    startBinding: null,
    endBinding: null,
    startArrowhead: null,
    endArrowhead: "arrow",
    elbowed: false,
  });
}

function elbow(id, x, y, width, height, strokeColor, strokeWidth = 2) {
  return base(id, "arrow", x, y, width, height, {
    strokeColor,
    backgroundColor: "transparent",
    fillStyle: "solid",
    strokeWidth,
    strokeStyle: "solid",
    roughness: 0,
    points: [
      [0, 0],
      [width * 0.5, 0],
      [width * 0.5, height],
      [width, height],
    ],
    lastCommittedPoint: null,
    startBinding: null,
    endBinding: null,
    startArrowhead: null,
    endArrowhead: "arrow",
    elbowed: true,
  });
}

function base(id, type, x, y, width, height, extra) {
  seed += 1;
  return {
    id,
    type,
    x,
    y,
    width,
    height,
    angle: 0,
    opacity: 100,
    groupIds: [],
    frameId: null,
    seed,
    version: 1,
    versionNonce: seed + 1,
    isDeleted: false,
    boundElements: null,
    updated: 1,
    link: null,
    locked: false,
    ...extra,
  };
}
