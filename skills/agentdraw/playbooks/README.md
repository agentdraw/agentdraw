# AgentDraw Scene Playbooks

Scene playbooks describe how to organize information. Design styles describe how the board looks.
AgentDraw has two reliable directions:

- structured diagrams, routed to Mermaid;
- explanatory visuals, routed to restricted SVG.

Choose provider first, then layout system, then design style. Formal structures use
`../method/layout-styles.md`; article/review/concept visuals that should feel more memorable use
`../method/editorial-layouts.md`.

## Available Playbooks

- `technical-flowchart.md`: Mermaid-first structured processes, flows, decisions, and retry loops.
- `article-visual.md`: SVG-first article, document, review, and idea visuals.
- `layered-architecture.md`: SVG-first architecture, structure, and responsibility maps.
- `ppt-visual.md`: SVG-first slide-like single-page visuals.

## Routing Rules

- If the user asks for a flowchart, sequence diagram, class diagram, state diagram, ER diagram,
  journey, or timeline, use Mermaid and the closest structured playbook.
- If the user asks for a good image for an article, document, technical note, or review brief, use
  SVG and `article-visual.md`.
- If the user asks for architecture, structure, layers, capability map, or system explanation, use
  SVG and `layered-architecture.md` unless Mermaid clearly fits better.
- If the user asks for a slide-like single visual, use SVG and `ppt-visual.md`.

If two playbooks fit, choose the one that best matches the provider decision. Do not route into
freehand education/sketch-note work; that is outside the current reliable scope.

## Required Method Files

For important boards, read these before generating:

- `../method/provider-routing.md`: Mermaid vs SVG decision rules.
- `../method/layout-styles.md`: reusable layout styles such as contrast split, layered stack,
  hero evidence, bento brief, and decision ladder.
- `../method/editorial-layouts.md`: magazine-like article, review, and concept visual recipes such
  as big-number editorials, statement grids, sidebars, poster ledgers, and reading-room indexes.
- `../method/quality-levels.md`: P0/P1/P2/P3 gates and self-report format.

## Provider Bias

- Prefer restricted SVG for article visuals, architecture explainers, mechanism maps, and custom
  editable layouts.
- Prefer Mermaid for standard flowcharts, sequence diagrams, or state diagrams.
- Avoid HTML/page design unless the user explicitly says the output does not need to be editable as
  a drawing.
- Avoid hand-drawn teaching/sketch-note scenarios for now.
