---
version: 1.0
name: Incident Dark
provider: agentdraw
description: >
  A dark operational incident-report design system for root-cause analysis, timeline evidence,
  production/test comparisons, and action plans. It uses tabs, verdict panels, status colors,
  metric cards, and diff blocks.
---

# Incident Dark

## Intent

Use when the board should feel like a serious engineering incident report or root-cause dashboard.
It should be analytical, evidence-heavy, and operational. The mood is GitHub-like dark UI: crisp
panels, measured status colors, and clear escalation hierarchy.

## Palette

- Canvas: `#0D1117` deep dark.
- Panel: `#161B22`.
- Raised panel: `#1C2330`.
- Rule: `#2A3340`.
- Text: `#E6EDF3`.
- Muted text: `#9AA7B4`.
- Blue accent: `#58A6FF`.
- Green: `#3FB950` for healthy/confirmed recovery.
- Red: `#F85149` for culprit, failure, or critical regression.
- Amber: `#D29922` for warning, suspect, or transition state.
- Purple: `#BC8CFF` for production/environment contrast.

Use status colors as meaning, not decoration. Red must be rare and reserved for the actual fault or
critical line.

## Typography

- Font family: `Inter, Arial, Noto Sans SC, sans-serif`.
- Title: 30-38px, weight 760-820.
- Section heading: 20-24px, weight 750, often with a blue left rule.
- Card heading: 16-19px, weight 700.
- Body: 15-17px, line height 1.3-1.45.
- Metric numbers: 22-30px, weight 780, optionally mono-looking but still editable text.
- Code/diff lines: 13-15px.

For Chinese incident boards, keep body text at least 15px and avoid cramming full paragraphs into cards.

## SVG Source Rules

- Generate restricted SVG first, then convert with `agentdraw import-svg`.
- Use only `svg`, `g`, `rect`, `circle`, `ellipse`, `line`, `polyline`, `polygon`, `text`, `tspan`, `defs`, and `marker`.
- Use `text-anchor="middle"` and `dominant-baseline="middle"` for centered tabs, badges, and metric labels.
- Use `tspan` with explicit `x` and `dy` for multiline text.
- Connector endpoints must touch panel/card edges or sit 2-6px outside.
- Avoid `foreignObject`, `image`, `clipPath`, `mask`, `filter`, gradients, arbitrary paths, and outlined text.

## Components

- **Sticky tab row:** top row of pill-like tabs, 110-180px wide, 34-42px high. Active tab uses blue border/fill.
- **Verdict panel:** prominent raised panel with blue border or red culprit badge. Use once near the top.
- **Environment card:** paired cards for test/prod or before/after, with amber/purple/green/red top border.
- **Metric moment:** large timestamp or percentage number inside a card.
- **Timeline step:** row card with a numbered square/circle at left.
- **Diff block:** dark code panel with red removed line and green added line.
- **Action item:** numbered card with green or amber marker, aligned in a vertical list.
- **Outer frame:** optional single dark frame. Avoid double borders.

## Layout Affinity

- Use a dashboard-report composition: title, tabs, verdict, evidence cards, then action steps.
- 2-column evidence grids work well; keep columns equal width.
- Major gaps: 18-28px. Inner padding: 14-22px.
- Keep all panels aligned to a 12px grid.
- Use section headers with a short blue left rule when the board has multiple analysis sections.

## Connector Rules

- Prefer numbered steps and timeline rails over many arrows.
- Use arrows only for causal transitions or before/after relationships.
- Timeline rails are plain lines with no arrowhead unless direction is essential.
- Keep connectors muted blue or rule color; do not use red arrows unless the arrow itself is the failure.

## Best For

Root-cause analysis, incident response summaries, model/provider comparison failures, cache
regression analysis, release timelines, mitigation plans, and postmortem action boards.

## Avoid

- Decorative gradients and glow effects.
- Using all status colors at equal intensity.
- Red as a general accent.
- Huge rounded capsules.
- Long prose paragraphs; convert prose to verdict, evidence, and actions.
- Emoji and playful icons.

## Self-Check

Before importing, verify:

- There is one clear verdict panel near the top.
- Red identifies the culprit/failure, not generic decoration.
- Evidence cards align in equal-width columns.
- Timeline rails and table rules are plain lines without arrowheads.
- Body text remains readable on dark panels and has enough contrast.
