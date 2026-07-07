---
version: 1.0
name: Inkline
provider: agentdraw
description: >
  A severe black-and-cream information design system for specs, governance diagrams, matrices,
  and plain-language architecture boards. Hierarchy comes from rules, alignment, and type weight.
---

# Inkline

## Intent

Use when clarity, seriousness, and editability matter more than visual personality. Inkline should
look like an excellent technical memo or standards sheet, not a generic monochrome palette swap.

## Palette

- Canvas: `#FAFADF` pale cream.
- Ink: `#1A1A16` near black.
- Surface: `#FFFFFF` white cards.
- Rule/muted text: `#5E5E54`.
- Pale fill: `#E7E7C8`.
- Deep note: `#3D3D36`.

Use no chromatic accent. If emphasis is needed, change weight, fill density, or border thickness.

## Typography

- Font family: `Inter, Arial, Noto Sans SC, sans-serif`.
- Title: 34-42px, weight 800.
- Section labels: 18-22px, weight 750.
- Body: 16-18px, weight 450-550.
- Table labels: 12-14px, weight 700, uppercase only for short labels.

Keep type scale disciplined: 3 sizes per board is ideal, 4 maximum.

## SVG Source Rules

- Generate restricted SVG first, then convert with `agentdraw import-svg`.
- Use only `svg`, `g`, `rect`, `circle`, `ellipse`, `line`, `polyline`, `polygon`, `text`, `tspan`, `defs`, and `marker`.
- Use `text-anchor="middle"` and `dominant-baseline="middle"` for centered labels.
- Use `tspan` with explicit `x` and `dy` values for multiline text.
- Keep connector endpoints on shape edges or 2-6px outside.
- Avoid `foreignObject`, `image`, `clipPath`, `mask`, `filter`, gradients, arbitrary paths, and outlined text.

## Components

- **Rule grid:** thin 1-1.5px lines divide sections. Dividers are plain lines, never arrows.
- **Spec card:** white rectangle, 240-320px wide, 90-140px tall, radius 0-3px.
- **Decision table:** rows 42-56px high with one pale-fill header row.
- **Number rail:** left-side vertical rail with numbered blocks aligned to content rows.
- **Callout block:** deep note fill with white text, used once for the conclusion or selected answer.
- **Outer frame:** single 1.5-2px rectangular frame, radius 0-2px.

## Layout Affinity

- Use a strict 12px or 16px grid.
- Prefer columns, rows, matrices, and stepped sequences.
- Align all x positions in a row; avoid casual offsets.
- Major gaps: 24-36px. Inner padding: 16-22px.
- Repeated cards must share width and height unless the difference encodes meaning.

## Connector Rules

- Use elbow or straight arrows for flow; stroke 1.8-2.2px.
- Keep arrow routes orthogonal and outside text zones.
- Use plain lines for grouping, dividers, and measurement rails.
- Arrowheads should sit just outside the destination edge, not in the middle of the destination card.

## Best For

Specs, governance maps, decision records, audit flows, engineering checklists, risk matrices, and
plain architecture diagrams.

## Avoid

- Decorative color.
- Large rounded cards or pill shapes.
- Shadow, texture, and playful markers.
- Misaligned repeated cards; this style is unforgiving.

## Self-Check

Before importing, verify:

- At least 80% of major shapes align to shared x/y grid lines.
- Repeated cards differ by no more than 8px in width/height.
- No more than one deep note block exists.
- Body text has 16-22px padding and is vertically centered when it is a label.
- Plain lines do not carry arrow markers.
