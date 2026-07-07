# Playbook: Technical Flowchart

Use this for process logic, decisions, branches, retries, operational runbooks, user journeys, and
engineering workflows when Mermaid supports the grammar.

## Content Job

Help the reader follow one process and understand where it branches.

Extract:

- one start state;
- sequential actions;
- decision points;
- branch labels such as yes/no, pass/fail, hit/miss;
- loops and retry targets;
- fallback/error paths;
- final output or handoff.

Omit:

- conceptual commentary that is not part of the process;
- unlabeled branch arrows;
- every edge case if it hides the happy path;
- custom composition when a standard flowchart is enough.

## Provider

Prefer Mermaid. Use SVG only when the user needs a custom explanatory composition beyond Mermaid's
diagram grammar.

## Layout

Use Mermaid layout first. Keep the flow professional:

- top-down for most process diagrams;
- split lanes for actor/system/ops separation;
- exception rail for fallback paths;
- left-to-right only when the flow is short and linear.

Do not use editorial layouts for formal flowcharts. If the user wants a more designed article image
about a process, switch to `article-visual.md` and SVG.

## Style

Recommended styles: `system-formal`, `blueprint-formal`, `inkline`, `raw-grid`, `manual-cream`.

## Quality Checklist

- Start/end nodes are visually distinct.
- Decision nodes are diamonds.
- Every branch is labeled near the connector.
- Loops return to meaningful previous steps.
- The happy path remains visually obvious.
- Connectors attach to node edges and do not cross text.
