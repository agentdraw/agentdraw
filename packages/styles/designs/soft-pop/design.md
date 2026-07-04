---
version: 1.0
name: Soft Pop
provider: agentdraw
description: >
  A friendly product-board design system with pale gray canvas, teal panels, yellow highlights,
  and rounded but disciplined cards.
---

# Soft Pop

## Intent

Use for product roadmaps, onboarding flows, journey maps, team plans, and approachable technical
explainers that should feel optimistic without becoming childish.

## Palette

- Canvas: `#EFF1F5`.
- Ink: `#2D3748`.
- Panel: `#FFFFFF`.
- Teal: `#73D1C8`.
- Yellow: `#FCD34D`.
- Slate line: `#566573`.
- Soft gray: `#DCE2EA`.
- Muted text: `#5D6D7E`.

## Typography

- Font family: `Inter, Arial, Noto Sans SC, sans-serif`.
- Title: 36-46px, weight 800.
- Section heading: 20-26px, weight 730.
- Body: 16-18px.
- Label chips: 13-15px, weight 700.

## SVG Source Rules

- Generate restricted SVG first, then convert with `agentdraw import-svg`.
- Use editable primitive SVG tags only.
- Center labels with `text-anchor="middle"` and `dominant-baseline="middle"`.
- Use explicit multiline `tspan` values for wrapped labels.
- Avoid gradients, filters, images, masks, arbitrary paths, and outlined text.

## Components

- **Rounded card:** white or teal card, 6-10px radius, slate 1.5-2px stroke.
- **Highlight tile:** yellow card for priority or "next" action; use at most two.
- **Progress chip:** small rounded label, teal or yellow fill.
- **Journey lane:** soft gray horizontal band behind cards.
- **Decision footer:** wide white panel with one clear recommendation.

## Layout

- Use friendly but aligned composition: lanes, cards, and chips.
- Major gaps 24-36px. Inner padding 18-24px.
- Repeated cards should share size. Playfulness comes from color and small offsets, not ragged layout.

## Connector Rules

- Use slate or teal connectors, 2px.
- Keep connectors simple and outside text.
- Plain lines for lane rails; arrows for step transitions.

## Avoid

- Overlapping sticker chaos.
- Too many yellow blocks.
- Emoji.
- Text smaller than 16px in body cards.

## Self-Check

- Is the board friendly but still aligned?
- Are yellow highlights rare and meaningful?
- Do repeated cards share dimensions?
- Are connector routes simple?
