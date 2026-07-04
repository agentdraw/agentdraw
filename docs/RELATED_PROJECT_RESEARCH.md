# Related Project Research

This document records adjacent projects worth watching for AgentDraw. The goal is not to label
every project as a direct competitor. The useful question is narrower: what user job does each
project solve, where does it overlap with AgentDraw, and what should AgentDraw learn or avoid?

## AgentDraw Position

AgentDraw should not compete only on "AI can make a pretty diagram." Static SVG/HTML generators can
often make polished one-shot visuals. AgentDraw's sharper position is:

- local-first diagram tooling for coding agents;
- source-first generation with editable Excalidraw output;
- agent-readable design systems rather than palette swaps;
- validation, repair, quality scoring, preview export, and browser editing in one loop;
- SVG-first for high-design boards and Mermaid import for conventional flowcharts.

The broader target should be closer to `open-design`: an agent visual output runtime, not just an
SVG-to-Excalidraw converter. SVG, Mermaid, HTML, and `.agentdraw.json` are different source or
delivery forms for the same larger job: helping agents produce high-quality, inspectable,
revisable, and shippable visual artifacts.

Useful product layers:

- Source layer: SVG for high-design boards, Mermaid for standard diagrams, HTML for reports and
  interactive documents, and future DSLs or React/canvas surfaces where appropriate.
- Quality layer: style guides, design contracts, preview rendering, validation, repair, and visual
  self-review loops.
- Delivery layer: editable whiteboards, SVG/PNG images, standalone HTML reports, and eventually PDF
  or document embeds.

HTML should be treated as a first-class output path for scenarios where visual quality,
responsiveness, and shareability matter more than manual object-level editing. Editable AgentDraw
boards remain the better fit when users need to drag, adjust, annotate, and keep iterating.

## fireworks-tech-graph

URL: https://github.com/yizhiyanhua-ai/fireworks-tech-graph

### What It Is

`fireworks-tech-graph` is a Claude skill and npm-distributed diagram generator focused on polished
technical diagrams. It turns natural language into SVG and PNG. Its README emphasizes:

- multiple visual styles;
- UML support;
- AI/Agent domain patterns such as RAG, Agentic Search, Mem0, multi-agent systems, and tool calls;
- semantic shape vocabulary;
- semantic arrow colors and line styles;
- product icons;
- swim lane grouping;
- renderer choices such as cairosvg, rsvg-convert, and Puppeteer.

### Competition Level

High for static technical diagram generation.

It overlaps with AgentDraw when the user wants "describe a system and get a polished technical
diagram." It is especially strong for AI infrastructure diagrams because it encodes domain patterns
and diagram recipes.

It is less direct competition when the user wants a local editable whiteboard, iterative repair,
theme gallery selection, validation, or browser-based manual editing.

### What To Learn

- Build a stronger semantic vocabulary for technical systems: Agent, LLM, Gateway, Tool Runtime,
  Memory Store, Vector DB, Graph DB, Queue, Event Bus, Evaluator, Policy Guardrail, Observability.
- Add semantic connector roles: read, write, control, async, retry, feedback, evaluation,
  escalation.
- Provide stable prompt recipes for each strong style and each common diagram family.
- Make examples regression-like: each style should have one or two canonical prompts known to
  produce good outputs.
- Document renderer tradeoffs clearly. AgentDraw already exports SVG/PNG; the docs should explain
  when to use each and what fidelity limitations exist.

### What Not To Copy Blindly

- Static SVG/PNG output is not enough for AgentDraw's core promise.
- A small set of fixed diagram recipes can improve stability, but AgentDraw should preserve the
  user's ability to create custom boards.

## architecture-diagram-generator

URL: https://github.com/Cocoon-AI/architecture-diagram-generator

### What It Is

This is a Claude skill for generating standalone HTML architecture diagrams. It targets a simple
user workflow: describe an architecture, receive a beautiful dark-themed single HTML file, open it
in a browser, and use built-in Copy / PNG / PDF controls.

### Competition Level

Medium for architecture-diagram presentation.

It competes when the user's real need is "give me a nice architecture visual I can share." It is
less direct competition for editable diagrams because it does not appear to focus on Excalidraw
editing, source contracts, CLI workflows, or validation.

### What To Learn

- Single-file HTML export is valuable for users who do not need editing.
- Built-in export buttons inside the output reduce friction.
- Summary cards and metadata can make architecture diagrams feel more like useful reports.
- The onboarding is clear: install skill, describe architecture, open output.

### AgentDraw Implication

AgentDraw should consider an HTML export mode. This should not replace editable `.agentdraw.json`,
but it can serve a separate job: "share this board as a polished standalone report."

## awesome-copilot excalidraw-diagram-generator

URL: https://github.com/github/awesome-copilot/blob/main/skills/excalidraw-diagram-generator/SKILL.md

### What It Is

This is a GitHub Copilot skill that instructs an agent to generate `.excalidraw` JSON directly. It
defines supported diagram types, JSON output expectations, validation checklist items, and optional
Excalidraw library usage for cloud/provider icons.

### Competition Level

Medium for editable Excalidraw output.

It overlaps with AgentDraw because it outputs editable Excalidraw files. It is weaker as a product
surface: it is mainly a skill prompt, not a local CLI + web app + validation loop + theme system.

### What To Learn

- Icon libraries matter. Splitting `.excalidrawlib` files into individual reusable icon elements is
  a practical way to support AWS/GCP/Azure/Kubernetes diagrams without overwhelming model context.
- A concise validation checklist is useful, even if a tool later enforces it.
- Output summaries should include element counts and opening instructions.

### What Not To Copy Blindly

- Hand-writing Excalidraw JSON as the primary generation path is fragile. AgentDraw moved toward
  source-first generation because SVG and Mermaid are easier for models to reason about.
- Excalidraw's default hand-drawn style is not enough for users who want formal, polished diagrams.

## ai-excalidraw

URL: https://github.com/co-pine/ai-excalidraw

### What It Is

`ai-excalidraw` is a React/Vite web app for natural-language Excalidraw generation. It provides:

- chat-driven diagram generation;
- streaming response with live rendering;
- multiple chat sessions;
- local browser storage for canvas and chat history;
- OpenAI-compatible API configuration;
- Excalidraw as the drawing surface.

### Competition Level

Medium-high for the interactive product surface.

This overlaps with one of AgentDraw's possible product directions: left-side chat and right-side
editable canvas. It is not just a skill; it is an actual app. It likely feels natural for users who
want to type a prompt and watch the canvas update.

It is less direct competition for agent workflows because it does not appear to provide a CLI,
installable skill, design-system contract, validation/repair loop, or source-first SVG/Mermaid
pipeline.

### What To Learn

- Streaming canvas updates are compelling for product feel, but they must not hurt stability.
- Multi-session chat history is useful if AgentDraw grows beyond a CLI-opened editor into a
  long-running app.
- OpenAI-compatible provider configuration is table stakes for a user-facing AI drawing app.
- Local browser storage is useful for standalone app usage, but AgentDraw's file-first model is
  better for coding agents and reproducibility.

### AgentDraw Implication

AgentDraw can learn from the interaction model, but should be careful not to become only another
"AI chat + Excalidraw" app. The stronger angle is agent-native generation:

- files on disk;
- reproducible commands;
- source artifacts that agents can revise;
- validation and repair;
- theme contracts;
- export/open workflow.

## Priority Follow-Ups

1. Add a technical-diagram semantic vocabulary document and make it available through `agentdraw guide`.
2. Add connector-role conventions and validation hints for read/write/control/async/error arrows.
3. Explore an Excalidraw library import pipeline for cloud and product icons.
4. Add a small set of canonical prompt recipes per high-value style.
5. Treat HTML generation/export as a first-class delivery path, not only a fallback preview format.
6. Consider `agentdraw export --format html` for standalone shareable reports.
7. Keep Mermaid import focused on standard flowcharts. Do not let it replace SVG-first high-design
   boards.
