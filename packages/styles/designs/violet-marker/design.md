---
version: 1.0
name: Violet Marker
provider: agentdraw
description: >
  A bright synthesis-wall style with clustered notes, marker colors, offset note shadows,
  and an explicit decision strip.
---

# Violet Marker

Use this style for research synthesis, interview clustering, brainstorm cleanup, and insight walls.

## Palette

- `canvas`: `#FFFFFF`.
- `ink`: `#171717`.
- `panel`: `#F8F4FF`.
- `violet`: `#C5A1FF`.
- `lime`: `#CFEE30`.
- `muted`: `#5E4A88`.

## Typography

- Font family: use Excalidraw sans (`fontFamily: 2`) for readable multilingual text; avoid Virgil/handwritten text unless the user explicitly asks for it.

- Title: 34-38px.
- Cluster title: 22-25px.
- Sticky note text: 13-15px, short phrases only.
- Decision strip: 16-18px.

## Components

- `cluster-frame`: thin violet frame around a group.
- `sticky-note`: compact rounded note with hard colored shadow.
- `synthesis-arrow`: bold black arrow between clusters.
- `decision-strip`: final takeaway in a lime rounded panel.

## Layout

Use three clusters left to right: raw notes, themes, insights. Stagger notes inside the cluster, but keep them fully inside the frame.

## Connector Rules

Use style-matched connectors with enough clearance from labels and headers. Keep routes simple; reroute rather than crossing text.

## Avoid

- full paragraphs in sticky notes;
- notes extending outside their cluster;
- arrows crossing note text;
- using every bright color on every note.
