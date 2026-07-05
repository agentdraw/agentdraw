# AgentDraw Drawing Method

Use this method before choosing a visual style. A design style controls how the board looks; a
playbook controls how the information is organized.

## Decision Order

1. Identify the user's communication job.
2. Select one scene playbook.
3. Select one design style that fits the audience and tone.
4. Plan the layout before writing SVG or Mermaid.
5. Generate restricted SVG or Mermaid.
6. Convert, repair, validate, export, inspect, and revise.

Never skip from prompt directly to a style. If the scene type is wrong, a beautiful style will still
produce a weak board.

## Scene Intent Classes

- Explain a system: use `layered-architecture.md` or `technical-flowchart.md`.
- Explain a sequence or process: use `technical-flowchart.md`.
- Teach a concept live or step by step: use `teaching-board.md`.
- Support a slide deck or executive narrative: use `ppt-visual.md`.
- Support a public article, newsletter, or social post: use `article-visual.md`.
- Compare choices, before/after states, or tradeoffs: use `comparison-map.md` when available; until
  then, adapt `article-visual.md` or `ppt-visual.md`.

## Layout Planning Template

Before writing SVG, write a short plan:

```text
Scene: <playbook id>
Audience: <engineers / executives / learners / broad readers>
Reader question: <what should the reader understand in 5 seconds?>
Main message: <one sentence>
Reading path: <top-down / left-right / hub-spoke / before-after / timeline>
Regions:
- <region name>: <purpose>, <approx width/height>, <items>
- <region name>: <purpose>, <approx width/height>, <items>
Connectors: <main flows only; avoid secondary clutter>
Style: <style id> because <reason>
Risks: <likely layout failure to avoid>
```

## Universal Composition Rules

- Use one primary reading path. A board with multiple competing paths feels scattered.
- Use visible regions for groups: lanes, bands, columns, panels, or a system boundary.
- Keep equal-rank objects equal in size unless size encodes importance.
- Align cards to shared x/y coordinates and repeat spacing rhythm.
- Use whitespace as structure. Related items sit closer together; unrelated items need stronger
  separation.
- Choose one visual emphasis: color, size, weight, or enclosure. Do not use all four on the same
  idea.
- Keep connector lines sparse. A reader should understand the diagram before tracing every arrow.
- Prefer direct labels over icons. Avoid emoji unless the user explicitly asks for a playful board.
- Use 4/8/16px coordinate rhythm for SVG. Random drift is visible.
- Write text as edit-friendly labels. Avoid long paragraphs inside cards.

## SVG Layout Heuristics

- Canvas: start around 1200x800 for article and architecture boards; 1280x720 for slide-like boards;
  1000x1000 for dense teaching boards.
- Outer margins: 48-80px.
- Section gaps: 28-48px.
- Card padding: 16-24px.
- Card text: headings 18-24px, body 14-18px, title 34-44px.
- Chinese or multilingual boards usually need larger body text and wider cards than English boards.
- Use `text-anchor="middle"` and `dominant-baseline="middle"` only for short labels. Use left-aligned
  multiline text for explanatory cards.

## Revision Checklist

Ask these questions after exporting a PNG:

- Can the reader state the main message in 5 seconds?
- Does the board still look organized when zoomed out?
- Are same-rank objects aligned and similarly sized?
- Are connectors attached to shape edges and free of label collisions?
- Is any card floating in a huge container with excessive empty space?
- Does any text touch the top edge or overflow its container?
- Does the selected style affect layout, typography, geometry, and connectors, not only colors?
- Would a user want to manually edit this, or is it a static poster pretending to be a board?

