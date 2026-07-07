---
version: 1.0
name: Boardroom
provider: agentdraw
description: >
  A precise executive command-board style for incidents, operating reviews, and decision maps.
  Quiet surfaces, strong hierarchy, and status panels that read quickly.
---

# Boardroom

Use this style when the audience needs to scan priority, ownership, status, and next action quickly.

## Palette

- `canvas`: `#FFFFFF`.
- `ink`: `#182230` for primary text and major structure.
- `panel`: `#F8FAFC` for operational cards.
- `accent`: `#4053D6` for active status and routed flow.
- `accent2`: `#E7EEF8` for selected cards or timeline surfaces.
- `muted`: `#667085` for timestamps, labels, and secondary facts.

## Typography

- Font family: in source SVG use `Inter, Arial, Noto Sans SC, sans-serif` or the closest available system sans. Keep text as real `<text>`/`<tspan>` and avoid handwritten fonts unless the user explicitly asks for them.

- Title: 34-44px, bold, direct.
- Status headline: 28-36px, bold, short.
- Card title: 20-26px.
- Fact rows: 16-18px for Chinese or multilingual boards; never shrink below 15px.
- Use sentence case. Avoid playful copy.
- Do not introduce generic success green, warning orange, or danger red unless the user explicitly asks for status semantics.

## SVG Source Rules

- Generate this style as restricted SVG first, then convert with `agentdraw import-svg`.
- Use only `svg`, `g`, `rect`, `circle`, `ellipse`, `line`, `polyline`, `polygon`, `text`, `tspan`, `defs`, and `marker` for editable boards.
- Use `text-anchor="middle"` and `dominant-baseline="middle"` for centered labels. Use `tspan` with explicit `x` and `dy` values for multiline labels.
- Put connector endpoints on the edge of shapes or just outside them. Do not start or end arrows deep inside cards.
- Avoid `foreignObject`, `image`, `clipPath`, `mask`, `filter`, gradients, arbitrary `path` geometry, and text converted to outlines.

## Components

- Use an outer frame, titled canvas boundary, or large enclosing region for architecture, operating-model, and layered diagrams.

- `command-panel`: dark ink fill, white text, one primary status chip. Every Boardroom board should include at least one dark command panel, dominant statement block, or bottom decision strip. Without this contrast block, the result reads like a generic light card grid rather than Boardroom.
- `decision-card`: light panel, 2px border, title plus two fact lines.
- `timeline`: one compact horizontal row with timestamps.
- `route`: elbow or straight connector, accent stroke, no crossing status text.

## Layout Affinity

This section describes how Boardroom applies to an already chosen layout system. It is not a
replacement for `method/layout-styles.md` or `method/editorial-layouts.md`.

Boardroom works best when the chosen layout has a decisive focal region, clear evidence/support
regions, and a final action or decision surface. For document visuals and executive summaries,
prefer applying Boardroom to these layout systems:

- `E03 Swiss Statement Grid`: large dark/ink statement or decision block plus compact proof grid.
- `E07 Strategic Quadrant`: four equal analysis quadrants plus a dark recommendation strip.
- `E09 Roadmap Terrace`: stepped plan with a dark target-state or decision strip.
- `E10 Decision Scoreboard`: scored options plus a dark recommendation strip.

Avoid using Boardroom as a light-blue palette on ordinary rows. Boardroom needs a visible contrast move: dark command panel, dark decision strip, or dominant statement block.

When the chosen layout contains comparison panels or lanes, apply Boardroom with matched card
widths, consistent rhythm, and deliberate use of available space. Avoid small centered cards
floating in a wide lane; use about 70-85% of the lane width unless the layout intentionally uses
small chips.

## Avoid

- decorative shadows;
- bright multi-accent fills;
- dense paragraphs;
- connectors through titles;
- light-only card walls with no dark command panel, statement block, or decision strip.
