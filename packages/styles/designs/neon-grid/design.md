---
version: 1.0
name: Neon Grid
provider: agentdraw
description: >
  A dark cybernetic system-map design with navy panels, cyan rails, magenta highlights, and strict
  grid composition. Use sparingly for high-energy technical dashboards.
---

# Neon Grid

## Intent

Use for event streams, observability maps, AI runtime pipelines, security flows, and futuristic
technical boards where high contrast is appropriate.

## Palette

- Canvas: `#051423`.
- Ink: `#D9FBFF`.
- Panel: `#071B2C`.
- Cyan: `#00F2FF`.
- Magenta: `#FF4FD8`.
- Violet: `#C77DFF`.
- Green: `#7CE38B`.
- Muted rail: `#235064`.

## Typography

- Font family: `Inter, Arial, Noto Sans SC, sans-serif`.
- Title: 34-44px, weight 800.
- Section heading: 19-24px, weight 750.
- Body: 15-18px.
- System labels: 12-14px, uppercase, cyan or muted rail.

## SVG Source Rules

- Generate restricted SVG first, then convert with `agentdraw import-svg`.
- Use only editable primitive SVG tags supported by AgentDraw.
- Do not use SVG filters or glow effects. Simulate emphasis with duplicate thin rails or solid accent bands.
- Keep text real and editable.
- Connector endpoints must sit on card edges.

## Components

- **Grid frame:** dark navy outer frame with cyan rail.
- **Node panel:** dark card, cyan 2px stroke, subtle inner rail.
- **Signal rail:** cyan or muted line connecting nodes.
- **Alert chip:** magenta small label for anomaly or human approval.
- **Telemetry strip:** bottom row of small metrics.

## Layout Affinity

- Use strict grid and circuit-like routes.
- Major gaps 28-42px. Keep enough negative dark space.
- Prefer horizontal pipelines and stacked telemetry rows.
- Avoid filling every panel with neon.

## Connector Rules

- Cyan connectors for primary flow.
- Magenta connectors only for exception paths.
- Use plain lines for rails; arrowheads only at actual direction changes or data handoffs.

## Avoid

- Glow filters, gradients, or transparency.
- Too many neon colors at equal intensity.
- Decorative sci-fi shapes that cannot be edited.
- Small low-contrast body text.

## Self-Check

- Is cyan the main structure and magenta rare?
- Are all nodes aligned to a grid?
- Are rails plain lines unless they indicate direction?
- Is text readable on dark panels?
