---
version: 1.0
name: Espresso Paper
provider: agentdraw
description: >
  A warm executive-paper system with almond surfaces and espresso ink. It is premium, calm,
  text-first, and useful for strategy maps, operating models, and decision one-pagers.
---

# Espresso Paper

## Intent

Use when the diagram should feel mature and editorial without becoming decorative. It should read
like a high-quality executive brief: warm paper, confident type, compact panels, and quiet rules.

## Palette

- Canvas: `#EDE7DD` almond paper.
- Ink: `#25211B` espresso.
- Card surface: `#F8F3EA`.
- Secondary rule/text: `#6E6558`.
- Soft fill: `#D2C6B7`.
- Deep caption: `#403B32`.

Do not introduce bright accent colors. Contrast should come from ink density and panel placement.

## Typography

- Font family: `Inter, Arial, Noto Sans SC, sans-serif`.
- Title: 36-44px, weight 760-820.
- Section heading: 20-24px, weight 700.
- Body: 16-18px, line height 1.25-1.35.
- Small labels: 12-14px, muted, weight 650.

Use sentence case. Avoid oversized novelty type and handwritten fonts.

## SVG Source Rules

- Generate restricted SVG first, then convert with `agentdraw import-svg`.
- Use only `svg`, `g`, `rect`, `circle`, `ellipse`, `line`, `polyline`, `polygon`, `text`, `tspan`, `defs`, and `marker`.
- Use `text-anchor="middle"` and `dominant-baseline="middle"` for centered labels.
- Use `tspan` with explicit `x` and `dy` values for multiline labels.
- Connector endpoints must touch shape edges or sit 2-6px outside; never start arrows inside card bodies.
- Avoid `foreignObject`, `image`, `clipPath`, `mask`, `filter`, gradients, arbitrary paths, and text outlines.

## Components

- **Executive masthead:** title at top-left, with a thin horizontal rule extending across the board.
- **Warm panel:** almond card with 4-7px radius, 1.5px espresso stroke, 18-24px padding.
- **Muted metric tile:** soft-fill rectangle for numbers, scores, or one-word status.
- **Decision band:** horizontal deep-caption strip with white/almond text; use once for final recommendation.
- **Comparison table:** low-contrast rows with rule lines, not heavy boxes.
- **Outer frame:** one rectangular frame, radius 2-6px. Avoid double frames.

## Layout

- Best composition is a calm one-pager: masthead, 2-3 content columns, bottom decision band.
- Major gaps: 28-44px. Inner padding: 18-24px.
- Keep repeated tiles equal size and baseline-aligned.
- Let negative space carry the premium feel; do not overfill.
- Rounded corners must stay subtle. Avoid large radii that turn cards into capsules.

## Connector Rules

- Use connectors sparingly. This style prefers adjacency, tables, and numbered sequence.
- When arrows are needed, use straight or elbow strokes in secondary rule color.
- Use plain lines for separators, timeline rails, and table rules.
- Connector labels should sit above the route, never on top of the stroke.

## Best For

Executive summaries, build/buy/partner decisions, strategy maps, board updates, calm operating
models, prioritization views, and financial or business-model diagrams.

## Avoid

- Bright accent inserts.
- Sticker-like notes, emoji, and hand-drawn effects.
- More than one decision band.
- Large border radii, floating shadows, or noisy connector paths.

## Self-Check

Before importing, verify:

- The board reads as an executive one-pager, not a flowchart wall.
- Repeated metric tiles are identical in size and aligned.
- All cards keep 18-24px inner padding.
- There is exactly one outer frame if framing is used.
- Rounded corners are subtle: 2-7px for panels, never pill-like.
