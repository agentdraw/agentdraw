---
version: 1.0
name: Manual Cream
provider: agentdraw
description: >
  A retro instruction-manual design system with cream paper, dark brown ink, squared panels,
  numbered steps, and confident ruled diagrams.
---

# Manual Cream

## Intent

Use for runbooks, operational procedures, install guides, troubleshooting trees, and diagrams that
should feel like a precise printed manual.

## Palette

- Canvas: `#EDE8DC`.
- Ink: `#2C2416`.
- Panel: `#F5F1E8`.
- Secondary surface: `#E8DCC8`.
- Tertiary surface: `#DFD3C3`.
- Muted text: `#5A4A38`.
- Alert accent: `#B85C38` for one warning or step marker.

## Typography

- Font family: `Inter, Arial, Noto Sans SC, sans-serif`.
- Title: 36-46px, weight 820.
- Section heading: 20-26px, weight 760, often uppercase.
- Body: 16-18px, weight 500-650.
- Step numbers: 18-24px, weight 800.

## SVG Source Rules

- Generate restricted SVG first, then convert with `agentdraw import-svg`.
- Use only editable primitive SVG tags supported by AgentDraw.
- Use `text-anchor="middle"` and `dominant-baseline="middle"` for numbered badges and card labels.
- Keep connector endpoints on panel edges.
- Avoid gradients, filters, images, masks, arbitrary paths, and outlined text.

## Components

- **Manual frame:** one dark rectangular outer frame, 2-3px stroke, radius 0-2px.
- **Instruction card:** squared cream panel with dark 2px stroke.
- **Step badge:** small dark square or circle with cream text.
- **Rule table:** thick header row, thin internal rules.
- **Warning stamp:** muted rust accent, used once.

## Layout

- Prefer numbered rows or left-to-right procedure lanes.
- Use strong alignment and consistent card dimensions.
- Major gaps 24-34px. Inner padding 16-22px.
- Leave margins like a printed page.

## Connector Rules

- Use straight or elbow dark brown connectors.
- Use plain rules for tables and dividers.
- Arrows should be functional and sparse.

## Avoid

- Rounded bubbly cards.
- Soft shadows.
- Bright modern SaaS colors.
- More than one alert accent area.

## Self-Check

- Does it feel like a printed manual page?
- Are step numbers aligned?
- Are repeated panels identical in size?
- Are dividers plain lines without arrowheads?
