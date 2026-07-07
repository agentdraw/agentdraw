# How AgentDraw's Visual Strategy Evolved

At first, AgentDraw experimented with direct JSON generation. The board was editable, but quality
was fragile. Text alignment, connector endpoints, duplicated frames, and viewport bugs created too
much cleanup work.

The second phase used Excalidraw more carefully. Repair and validation improved the output, but the
model still struggled to produce attractive layouts from raw board JSON.

The third phase shifted to SVG as the authoring source. SVG gave the model a simpler coordinate
system and made alignment more reliable. Importing SVG into AgentDraw preserved editability while
making the first draft cleaner.

The fourth phase separated provider choice from style. Mermaid became the path for formal diagram
grammar such as flowcharts and sequence diagrams. SVG became the path for explanatory visuals,
architecture boards, article images, and review visuals.

The current phase adds layout systems. Themes alone were not enough. Agents need named composition
recipes such as statement grids, poster ledgers, reading-room indexes, quadrants, timelines, and
roadmap terraces.

The next phase should test those recipes through evals. The goal is not unlimited creativity. The
goal is a repeatable path to boards that are useful, editable, and visually strong enough to share.
