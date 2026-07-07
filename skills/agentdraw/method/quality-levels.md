# Quality Levels

Use this checklist after import, repair, validate, quality scoring, and preview export.

Treat P0 and P1 issues as blockers. Revise the Mermaid or SVG source before delivery.

## P0 Blockers

Fix before showing the result:

- wrong provider: SVG used for a grammar-heavy flow/sequence/class/state/ER diagram, or Mermaid used
  for a custom article/architecture visual that needs composition;
- import failed or unsupported SVG tags remain;
- validation reports errors;
- text is clipped, unreadable, or overlaps major shapes;
- major elements overlap unintentionally;
- connector endpoints sit deep inside nodes or cross important labels;
- Mermaid syntax uses the wrong diagram type;
- output is a screenshot/static raster when the user expects an editable board.

## P1 Structural Issues

Fix before delivery unless the user explicitly accepts:

- layout style does not match the source's communication job;
- design read or board dials are missing for an important board;
- no clear title, main message, or reading path;
- SVG explanatory visual becomes a generic card wall;
- board shows a common AgentDraw AI tell: theme-as-palette-swap, tiny floating cards, random
  alignment drift, connector clutter, or text-as-afterthought;
- multi-board set has unrelated styles, title scales, margins, or typography without a stated
  scene/audience reason;
- same-rank cards or lanes have visibly inconsistent dimensions;
- too much whitespace inside large panels while inner cards are tiny;
- architecture diagram lacks a clear boundary or layer structure;
- flowchart lacks start/end, decision nodes, branch labels, or meaningful retry loops;
- selected design style is only a palette swap.

## P2 Polish Issues

Fix when time allows, especially for shareable visuals:

- spacing rhythm is uneven but understandable;
- label wording is verbose;
- color accents are overused;
- connector routes are functional but not elegant;
- title is slightly too small or too long;
- the board reads well up close but weakly at thumbnail size.

## P3 Nice-To-Have

Improve only after P0-P2 are handled:

- alternate wording for punchier headline;
- minor visual balance tweaks;
- optional secondary callout;
- alternate style variant for user preference.

## Required Self-Report

In notes, include:

```text
Quality levels:
- P0: pass/fail and fixes made
- P1: pass/fail and fixes made
- P2/P3: accepted weaknesses
```

## Preview Inspection Order

1. Zoom out: does the board have a clear structure?
2. Read the title and main message: is the point obvious?
3. Check provider fit: Mermaid for structured grammar, SVG for custom explanation.
4. Check layout style: does it match the source?
5. Check design read and board dials: does the preview match the intended audience, density,
   composition variance, and editability strictness?
6. Check AI tells: generic card wall, palette-swap theme, tiny floating cards, random drift,
   connector clutter, text-as-afterthought, or unrelated styles across a set.
7. Check text fit, overlaps, and connector endpoints.
8. Check style contract drift: colors, typography, geometry, and spacing.
