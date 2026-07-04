---
version: 1.0
name: Slate Notes
provider: agentdraw
description: >
  A clean note-taking and product-spec design system with slate panels, soft borders, calm blue and
  green accents, and compact document hierarchy.
---

# Slate Notes

## Intent

Use for product specs, planning diagrams, decision notes, lightweight architecture maps, and docs
that should feel clean, modern, and easy to scan.

## Palette

- Canvas: `#FFFFFF`.
- Ink: `#334155`.
- Panel: `#F8FAFC`.
- Rule: `#CBD5E1`.
- Blue accent: `#6B8CAE`.
- Green accent: `#73A78D`.
- Warm accent: `#CB9B7A`.
- Muted text: `#64748B`.

## Typography

- Font family: `Inter, Arial, Noto Sans SC, sans-serif`.
- Title: 34-44px, weight 760-820.
- Section heading: 20-25px, weight 700.
- Body: 16-18px, line height 1.25-1.35.
- Metadata labels: 13-14px, muted, weight 650.

## SVG Source Rules

- Generate restricted SVG first, then convert with `agentdraw import-svg`.
- Use only `svg`, `g`, `rect`, `circle`, `ellipse`, `line`, `polyline`, `polygon`, `text`, `tspan`, `defs`, and `marker`.
- Use centered labels with `text-anchor="middle"` and `dominant-baseline="middle"`.
- Use explicit `tspan` line breaks. Keep connector endpoints on shape edges.
- Avoid `foreignObject`, `image`, `clipPath`, `mask`, `filter`, gradients, arbitrary paths, and outlined text.

## Components

- **Document panel:** pale slate rectangle, 4-6px radius, 1.5px rule.
- **Note card:** white or slate card, compact padding, short text.
- **Status chip:** small blue/green/warm label with subtle fill.
- **Decision strip:** low-contrast full-width band for the conclusion.
- **Grouped region:** dashed or light bordered region, never heavy black.

## Layout

- Use product-doc rhythm: title, short subtitle, 2-3 columns, then decision strip.
- Align repeated cards to a strict 12px grid.
- Keep major gaps 24-36px and inner padding 16-24px.
- Prefer understated grouping over heavy frames.

## Connector Rules

- Use thin muted slate connectors.
- Use arrows only for dependency or flow. Use plain lines for grouping and dividers.
- Route around text and headers.

## Avoid

- Loud accent blocks.
- Dark backgrounds.
- Oversized rounded pills.
- Decorative emoji.

## Self-Check

- Does the board read like a clean spec page?
- Are cards aligned by row and column?
- Are accent colors used as signals, not decoration?
- Are labels large enough and vertically centered?
