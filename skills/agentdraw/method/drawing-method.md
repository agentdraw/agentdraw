# AgentDraw Drawing Method

Use this method before choosing a visual style. Keep the layers separate:

- a playbook controls content strategy: what to say, what to omit, and what the reader should
  remember;
- a layout system controls composition: reading path, focal point, proportion, grouping, and
  alignment;
- a design style controls visual language: palette, typography, stroke, geometry, components, and
  signature motifs.

AgentDraw's reliable scope has two directions:

- **Structured diagrams:** use Mermaid when the requested diagram type has clear grammar and
  Mermaid supports it. This is about diagram grammar, not whether the document itself is organized.
- **Explanatory visuals:** use restricted SVG when the output is a designed article image,
  architecture/structure explanation, mechanism map, comparison, matrix, or slide-like single-page
  visual.

For document配图, concept explanation, opinion/thinking pieces, and review material, start from the
explanatory visual direction unless the user explicitly asks for a formal flowchart, sequence
diagram, class diagram, ER diagram, state diagram, timeline, or similar notation.

Do not treat AgentDraw as a general-purpose poster, web page, slide deck, freehand sketch-note, or
hand-drawn education board generator.

## Decision Order

1. Write the design read: what the board is for, who reads it, and what visual language fits.
2. Set the board dials: composition variance, information density, and editability strictness.
3. Identify the type direction: structured diagram or explanatory visual.
4. Choose the provider: Mermaid or SVG.
5. Select one scene playbook.
6. Select one layout system:
   - formal explanatory structures use `layout-styles.md`;
   - article/review/concept visuals that should feel memorable use `editorial-layouts.md`.
7. Select one design style that fits the audience, tone, and recommended styles for the selected
   layout.
8. Plan the layout before writing Mermaid or SVG.
9. Generate Mermaid or restricted SVG.
10. Convert, repair, validate, export, inspect, and revise.

Never skip from prompt directly to a style. If the provider or layout style is wrong, a beautiful
theme will still produce a weak board.

## Design Read And Dials

Before choosing layout or style, state one concise design read. This is not a long explanation; it
is a guard against defaulting to the same generic board every time.

```text
Reading this as: <scene intent> for <audience>, with <tone>, using <provider direction> because <reason>.
```

Examples:

- `Reading this as: article visual for broad technical readers, with an editorial explanation tone, using SVG because the source needs hierarchy and emphasis rather than strict diagram grammar.`
- `Reading this as: flowchart for product reviewers, with a formal process tone, using Mermaid because branches and retry paths are the main content.`
- `Reading this as: data whiteboard for engineers, with a workshop explanation tone, using SVG because the board needs readable lineage lanes and annotations.`

Then set three board dials. These are decision aids, not user-facing settings:

| Dial | Low | High | Use |
| --- | --- | --- | --- |
| `COMPOSITION_VARIANCE` | quiet grid, strict alignment | editorial asymmetry, overlap, strong focal device | Raise for article/review visuals; lower for flowcharts and regulated technical diagrams. |
| `INFORMATION_DENSITY` | one idea, large type, sparse labels | many regions, compact labels, reference-like | Raise for knowledge maps and architecture; lower for shareable article images. |
| `EDITABILITY_STRICTNESS` | expressive composition | regular shapes, sparse connectors, easy manual editing | Keep high when the user will edit the board; lower only when visual impact matters more. |

Default to `COMPOSITION_VARIANCE 6`, `INFORMATION_DENSITY 5`, `EDITABILITY_STRICTNESS 8`.
Adjust them based on the source and state the adjustment in the layout plan. Do not randomize these
values; choose them because the task demands it.

For multi-board deliverables, decide the visual series before planning individual boards. The set
should feel like one article package, review pack, or whiteboard collection:

- keep one primary design style unless the user asks for style exploration;
- reuse the same type family, title scale, outer margins, stroke width, and palette family;
- vary layout systems to fit the content job of each board;
- only switch to a different style when the scene type or audience truly changes, and keep shared
  tokens so the set does not feel random.

## Provider Selection

See `provider-routing.md` for the full routing rules and ambiguous cases.

### Mermaid Provider

Use Mermaid when the user asks for, or the content's main job naturally is:

- flowchart;
- sequence diagram;
- class diagram;
- state diagram;
- ER diagram;
- journey diagram;
- timeline;
- simple C4/architecture diagram that Mermaid can express cleanly.

Mermaid is better for these because it enforces diagram grammar, connections, node types, and
structural consistency. Do not hand-author these as SVG unless the user explicitly needs a custom
designed composition.

Do not choose Mermaid for an article simply because it has a hierarchy, a list of principles, or a
sequence of reasoning. Use SVG for concept maps, argument maps, mental models, comparisons, and
designed document illustrations.

### SVG Provider

Use restricted SVG when the output is:

- article/blog/document/review visual;
- concept visual, argument map, or thinking model;
- architecture or structure explanation that needs custom composition;
- mechanism map;
- concept map;
- comparison or tradeoff matrix;
- layered stack;
- loop/flywheel;
- slide-like single-page visual.

SVG is better for these because it gives control over composition, hierarchy, visual rhythm, and
design style.

## Layout Systems

Pick one locked layout system before drawing SVG. For Mermaid, pick the appropriate Mermaid diagram
type instead of forcing a custom layout.

Use `layout-styles.md` for formal explanatory structures, architecture maps, process-like custom
SVG, matrices, timelines, and operating models.

Common SVG layout styles:

- `L01 Contrast Split`
- `L02 Center Mechanism`
- `L03 Layered Stack`
- `L04 Pipeline`
- `L05 Loop / Flywheel`
- `L06 Matrix`
- `L07 Timeline`
- `L08 Orbit Map`
- `L09 Assertion Pillars`
- `L10 Hero Evidence`
- `L11 Bento Brief`
- `L12 Decision Ladder`

Do not default to three equal cards. Three pillars are acceptable only when the source genuinely has
three parallel supports.

Use `editorial-layouts.md` when the user wants a document配图, article image, public review visual,
thinking note, strategy one-pager, or a board that should feel less generic and more magazine-like.

Common editorial layouts:

- `E01 Monochrome Big Number`
- `E02 Reading Room Overlap`
- `E03 Swiss Statement Grid`
- `E04 Editorial Sidebar`
- `E05 Poster Ledger`
- `E06 Reading Room Index`
- `E07 Strategic Quadrant`
- `E08 Editorial Timeline`
- `E09 Roadmap Terrace`
- `E10 Decision Scoreboard`
- `E11 Ecosystem Orbit`
- `E12 Pyramid Stack`

These are layout recipes, not just example screenshots. Each recipe binds a composition device,
recommended styles, structural regions, and anti-patterns. When a normal layout would become a wall
of similar cards, switch to an editorial layout before changing colors.

## Scene Intent Classes

- Structured flow/process/decision: use Mermaid and `technical-flowchart.md`.
- Sequence/class/state/ER/timeline/journey: use Mermaid; adapt `technical-flowchart.md` for process
  discipline and quality expectations.
- Article/doc/review/concept/thinking visual: use SVG and `article-visual.md`.
- Architecture/structure explanation: use SVG and `layered-architecture.md`, unless Mermaid can
  express the requested architecture cleanly.
- Slide-like single visual: use SVG and `ppt-visual.md`.
- Compare choices, before/after states, or tradeoffs: use `comparison-map.md` when available; until
  then, adapt `article-visual.md`.

## Layout Planning Template

Before writing SVG, write a short plan:

```text
Design read: <one sentence>
Board dials: COMPOSITION_VARIANCE <1-10>, INFORMATION_DENSITY <1-10>, EDITABILITY_STRICTNESS <1-10>
Scene: <playbook id>
Provider: <Mermaid / SVG> because <reason>
Audience: <engineers / executives / learners / broad readers>
Reader question: <what should the reader understand in 5 seconds?>
Main message: <one sentence>
Layout style: <Lxx name from layout-styles.md>
Editorial layout: <E01-E12 name, if using editorial-layouts.md>
Composition device: <giant number / statement grid / asymmetric sidebar / poster ledger / index>
Reading path: <top-down / left-right / hub-spoke / before-after / timeline>
Regions:
- <region name>: <purpose>, <approx width/height>, <items>
- <region name>: <purpose>, <approx width/height>, <items>
Connectors: <main flows only; avoid secondary clutter>
Style: <style id> because <reason>
Risks: <likely layout failure to avoid>
```

For two or more boards, add a series plan before the per-board plans:

```text
Series: <article package / review pack / architecture set / data whiteboard set>
Shared design direction: <primary style id> because <audience and tone>
Shared tokens: <font family, title scale, palette family, stroke width, radius, margins>
Allowed variation: <layout systems may vary by board; theme stays fixed or closely related>
Boards:
- <board 1>: <provider>, <layout>, <message>
- <board 2>: <provider>, <layout>, <message>
Style exceptions: <none, or board-specific exception with reason>
```

## Universal Composition Rules

- Match provider to diagram type before styling.
- Make one idea memorable. A good explanatory visual has a point of view, not just labeled boxes.
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
- Do not make every output a three-card row. Three cards are acceptable only when the article's
  argument is genuinely three parallel pillars.
- For article, concept, review, and slide-like visuals, make one composition device visible at
  thumbnail size: giant number, asymmetric sidebar, poster ledger, reading-room index, field-guide
  modules, Swiss statement grid, quadrant, timeline rail, roadmap terrace, scoreboard, orbit,
  or pyramid.
- When producing multiple boards for one user request, maintain series continuity. Vary the
  composition device when needed, but keep the visual language coherent.

## AgentDraw AI Tells

These are common model defaults that make a board feel generic or unfinished. If any appears in the
preview, revise the source instead of only changing colors:

- A generic card wall: many same-size rectangles with no dominant idea or composition device.
- Theme as palette swap: the selected style is visible only in colors, not typography, geometry,
  connector treatment, or signature motifs.
- Repeated default style: every task silently uses `system-formal` or `boardroom` without a reason.
- Weak series continuity: multiple boards in one request use unrelated themes, title scales, or
  margins.
- Tiny floating cards: inner content occupies a small island inside a large panel.
- Random drift: equal-rank objects have different widths, x positions, y positions, or spacing for
  no semantic reason.
- Over-connector clutter: arrows cross labels, run through sections, or describe secondary details
  the layout could imply.
- Text-as-afterthought: labels touch borders, sit too high in shapes, or are too small to read at a
  normal preview scale.
- Decorative noise: icons, emoji, badges, and accent colors appear without helping the reader
  understand the source.
- Missing whole-board frame or boundary for architecture/review visuals where an enclosing context
  would make the result feel complete.

## Mermaid Layout Heuristics

- Use `flowchart TD` for most professional process diagrams; use `LR` only when horizontal scanning
  is clearly better.
- Use real decision nodes for branches, not rectangle labels pretending to be decisions.
- Label branches close to the branch edge.
- Keep retry loops compact and secondary to the happy path.
- Prefer Mermaid-native sequence/class/state/ER syntax over approximating those diagrams as SVG.

## SVG Layout Heuristics

- Canvas: start around 1200x800 for article, structure, and architecture boards; 1280x720 for
  slide-like single-page visuals.
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
- Is Mermaid used for grammar-heavy structured diagrams and SVG used for custom explanatory visuals?
- Does the board reveal the source's insight, not merely list its sections?
- Does the board still look organized when zoomed out?
- If this is one board in a set, does it visibly belong to the same series as the other boards?
- Does it avoid the AgentDraw AI tells above?
- Are same-rank objects aligned and similarly sized?
- Are connectors attached to shape edges and free of label collisions?
- Is any card floating in a huge container with excessive empty space?
- Does any text touch the top edge or overflow its container?
- Is the selected design style visibly applied to the chosen layout through typography, geometry,
  components, connector treatment, and signature motifs, not only colors?
- If this is an article/review/concept visual, did it use an editorial layout or another clearly
  justified non-generic composition?
- Would a user want to manually edit this, or is it a static poster pretending to be a board?
- Have all P0/P1 issues from `quality-levels.md` been fixed?
