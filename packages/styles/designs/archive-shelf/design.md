---
version: 1.0
name: Archive Shelf
provider: agentdraw
description: >
  A quiet research-library design system for knowledge maps, reading notes, evidence boards,
  and calm strategy summaries. It uses shelf rows, catalog cards, and editorial annotations
  instead of generic floating boxes.
---

# Archive Shelf

## Intent

Use when the board should feel thoughtful, archival, and quietly authoritative. The output should
look like a well-indexed research room: shelves, catalog numbers, source cards, and margin notes.

## Palette

- Canvas: `#F6EBD8` warm reading-paper.
- Ink: `#2A231C` dark walnut.
- Surface: `#FFF7EA` note-card ivory.
- Accent: `#DE916A` clay highlight for key findings.
- Secondary accent: `#D6C7CC` dusty mauve for quoted evidence.
- Muted text/rules: `#6C5C4B`.

Use the clay accent sparingly: one header shelf, one key finding, or small index tabs. Do not turn
the whole board orange.

## Typography

- Font family: use `Inter, Arial, Noto Sans SC, sans-serif` for editable SVG text. Avoid handwritten fonts.
- Title: 36-44px, weight 750-800, dark walnut.
- Section labels: 19-23px, weight 700, often placed on a narrow shelf rail.
- Body: 16-18px, line height 1.25-1.35.
- Metadata/index labels: 12-14px, uppercase optional, muted walnut.

Chinese text should use the same sans stack and stay at least 16px in exported PNG previews.

## SVG Source Rules

- Generate restricted SVG first, then convert with `agentdraw import-svg`.
- Use only `svg`, `g`, `rect`, `circle`, `ellipse`, `line`, `polyline`, `polygon`, `text`, `tspan`, `defs`, and `marker`.
- Use `text-anchor="middle"` and `dominant-baseline="middle"` for centered card labels.
- Use `tspan` with explicit `x` and `dy` values for multiline labels.
- Connector endpoints must touch card edges or sit 2-6px outside them. Never start arrows inside a card body.
- Avoid `foreignObject`, `image`, `clipPath`, `mask`, `filter`, gradients, arbitrary paths, and outlined text.

## Components

- **Shelf header:** full-width or column-width rectangle, 32-44px high, clay or dark walnut fill.
- **Catalog card:** ivory rectangle, 220-300px wide, 96-150px tall, corner radius 2-5px, 1.5px walnut stroke.
- **Index tab:** small clay or mauve rectangle attached to a card edge. Use for category numbers, not decoration.
- **Evidence strip:** low mauve band containing short quoted findings or constraints.
- **Margin note:** narrow ivory card aligned to the outer edge, connected with a plain line rather than an arrow.
- **Outer frame:** one thin rectangular frame only, radius 0-4px. Do not add a second decorative border.

## Layout Affinity

- Prefer two or three vertical shelves with consistent column widths.
- Align card tops and shelf rails on a 12px grid.
- Major gaps: 28-40px between shelves; 18-24px inside shelf groups.
- Cards in the same row should share height unless one is clearly a margin annotation.
- Use negative space as a design feature; do not fill every corner.

## Connector Rules

- Use arrows only for causal flow or sequence.
- Use plain lines for evidence references, dividers, shelf rails, and grouping brackets.
- Keep routes short and mostly horizontal/vertical. If a route crosses a shelf header, reroute it.
- Never place arrowheads over text or inside a card.

## Best For

Research synthesis, literature reviews, decision records, knowledge organization, meeting notes,
source maps, and boards that need to feel trusted rather than flashy.

## Avoid

- Bright badges, emoji, sticker motifs, and noisy brainstorm clusters.
- Large rounded pill cards.
- More than two accent fills in a single shelf.
- Centering every object independently; the shelf grid should organize the board.

## Self-Check

Before importing, verify:

- The board reads as shelves or catalog groups, not unrelated cards.
- Every card in a row has aligned top edges.
- Body text is at least 16px and has 16-24px inner padding.
- There is exactly one outer frame when a frame is used.
- Plain dividers have no `marker-end`; only true flow connectors have arrow markers.
