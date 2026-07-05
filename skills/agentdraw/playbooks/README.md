# AgentDraw Scene Playbooks

Scene playbooks describe how to organize information. Design styles describe how the board looks.
Choose one playbook before choosing a style.

## Available Playbooks

- `layered-architecture.md`: systems, platforms, runtimes, product architecture, capability maps.
- `technical-flowchart.md`: process logic, decisions, validation, retry loops, operational runbooks.
- `article-visual.md`: blog posts, newsletters, self-media visuals, public concept explainers.
- `ppt-visual.md`: slide-like boards, executive summaries, strategy decks, leadership narratives.
- `teaching-board.md`: step-by-step lessons, tutoring, live education, concept walkthroughs.

## Routing Rules

- If the user asks "how does this system work?", start with `layered-architecture.md`.
- If the user asks for a process, start with `technical-flowchart.md`.
- If the user asks for an article image or social visual, start with `article-visual.md`.
- If the user asks for a slide, deck, or leadership visual, start with `ppt-visual.md`.
- If the user asks to teach or explain a concept to beginners, start with `teaching-board.md`.

If two playbooks fit, choose the one that best matches the audience's reading context. For example,
"explain cache invalidation in a technical blog" may use `article-visual.md`, while "teach cache
invalidation to junior engineers" should use `teaching-board.md`.

