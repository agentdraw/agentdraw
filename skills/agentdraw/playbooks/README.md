# AgentDraw Scene Playbooks

Playbooks describe **content strategy and scene routing**. They do not define visual style.

Keep the responsibilities separate:

- **Content**: what the board must say, what to omit, what the reader should remember.
- **Provider**: Mermaid for standard grammar diagrams; restricted SVG for editable explanatory visuals.
- **Layout**: composition, reading path, focal point, proportion, and hierarchy.
- **Design style**: palette, typography, stroke, mood, and theme constraints.

For explanatory/document/article/review visuals, a polished magazine-like composition is the default
quality bar even if the user does not ask for it. Do not wait for words such as "好看", "有设计感",
or "像杂志".

## Available Playbooks

- `technical-flowchart.md`: process logic, decisions, branches, loops. Usually Mermaid.
- `article-visual.md`: article, document, review, newsletter, concept, and argument visuals. Usually SVG.
- `layered-architecture.md`: systems, layers, responsibilities, boundaries, and capability maps. Usually SVG.
- `ppt-visual.md`: one-page presentation, executive summary, strategy page, or board-update visual. Usually SVG.

## Routing

1. If the source is a formal flowchart, sequence diagram, class diagram, state diagram, ER diagram,
   journey, or other Mermaid-supported grammar, choose Mermaid.
2. If the source is an article, document, review brief, concept explanation, architecture explainer,
   or presentation-style visual, choose restricted SVG.
3. If the source has sections or numbered ideas but is really conceptual or argumentative, do not
   route to Mermaid just because it has an order. Extract the claim and design an explanatory SVG.

## Required Method Files

Read only what is needed:

- `../method/provider-routing.md`: provider decision.
- `../method/editorial-layouts.md`: default for explanatory/document/article/review visuals.
- `../method/layout-styles.md`: formal structures, architecture maps, mechanisms, matrices, and pipelines.
- `../method/quality-levels.md`: validation and self-review gates.

## Non-Negotiables

- Always choose both a layout system and a design style.
- A theme is not a layout. `boardroom` does not mean "make ordinary cards blue".
- Explanatory boards must have one obvious focal point and one clear takeaway.
- Avoid generic equal-card walls unless the content is genuinely a peer comparison.
- Use fewer, stronger elements rather than copying every paragraph.
