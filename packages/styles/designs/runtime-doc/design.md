---
version: 1.0
name: Runtime Doc
provider: agentdraw
description: >
  A warm product-documentation design system for explaining runtimes, plugin systems, SDK flows,
  and implementation guides. It uses document shells, table-of-contents rails, cards, tags, and
  callouts instead of generic diagram boxes.
---

# Runtime Doc

## Intent

Use when the board should feel like a polished internal technical explainer: readable, calm,
product-minded, and useful to engineers. It is best for architecture explanations, runtime
responsibilities, plugin lifecycle maps, API guides, and "how this works" documents.

## Palette

- Canvas: `#FBFAF7` warm off-white.
- Ink: `#202124` document ink.
- Panel: `#FFFFFF`.
- Soft surface: `#F4F1EA`.
- TOC surface: `#F2EFE8`.
- Rule: `#E2DFD8`.
- Blue accent: `#275CAD` for primary concepts and links.
- Green accent: `#1E7B58` for successful/active states.
- Amber accent: `#946200` for caution or pending states.
- Red accent: `#B42318` only for failure callouts.

Use mostly neutral panels. Accent colors should appear as tags, left borders, small headers, or
status markers, not as full-page decoration.

## Typography

- Font family: `Inter, Arial, Noto Sans SC, sans-serif`.
- Title: 36-46px, weight 780-830.
- Section heading: 21-26px, weight 750.
- Card heading: 17-20px, weight 700.
- Body: 16-18px, line height 1.3-1.45.
- Tags and metadata: 12-14px, weight 700.
- Code labels: use a mono-style visual sparingly, but keep SVG text editable with the same sans stack unless monospace is essential.

Chinese text should be at least 16px in body cards. Avoid tiny footnote walls.

## SVG Source Rules

- Generate restricted SVG first, then convert with `agentdraw import-svg`.
- Use only `svg`, `g`, `rect`, `circle`, `ellipse`, `line`, `polyline`, `polygon`, `text`, `tspan`, `defs`, and `marker`.
- Use `text-anchor="middle"` and `dominant-baseline="middle"` for centered tags and card labels.
- Use `tspan` with explicit `x` and `dy` for multiline body text.
- Connector endpoints must sit on card edges or 2-6px outside.
- Avoid `foreignObject`, `image`, `clipPath`, `mask`, `filter`, gradients, arbitrary paths, and outlined text.

## Components

- **Document shell:** one outer frame with warm background, radius 4-8px.
- **TOC rail:** left column, 180-230px wide, soft beige fill, stacked navigation rows.
- **Content section:** white panel with 8px radius, 1.5px warm rule, generous padding.
- **Info card:** soft surface card, 180-280px wide, 90-140px tall.
- **Status tag:** small rounded rectangle with tinted fill and colored text; use blue, green, or amber.
- **Callout:** white or pale blue panel with a 4-6px blue left rule. Use amber/red variants only for warnings.
- **Code chip:** small inline rounded rectangle, dark text on pale warm fill.

## Layout

- Prefer a document-like composition: left rail plus right content panels.
- Keep top header outside cards: eyebrow, title, subtitle.
- Use a 12px grid. Major gaps: 24-36px. Inner padding: 18-28px.
- Content panels should align vertically; tags should align to the same baseline.
- When explaining runtime pipelines, use a horizontal row of cards plus a lower callout or lifecycle table.

## Connector Rules

- Use arrows for lifecycle flow only.
- Use plain lines for section dividers, TOC separators, and callout left rules.
- Keep arrows outside card text. Routes should be simple and document-like, not sketchy.

## Best For

Plugin runtime explainers, SDK architecture, API capability maps, local-agent workflows,
implementation notes, and onboarding diagrams for engineers.

## Avoid

- Dark backgrounds.
- Large decorative blobs.
- More than one red failure block.
- Dense paragraphs inside SVG cards; summarize into short editable lines.
- Emoji and pictograms.

## Self-Check

Before importing, verify:

- The board reads as a document explainer, not a slide deck.
- The left rail and content panels align on a consistent vertical grid.
- Tags are small and consistent; they do not become main content.
- Callouts use a left rule and do not compete with the title.
- Body text has at least 16px size and 18-28px card padding.
