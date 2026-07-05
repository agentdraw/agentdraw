# Playbook: Teaching Board

Use this for real-time explanation, tutoring, conceptual walkthroughs, classroom-like diagrams, and
step-by-step reasoning.

## Communication Job

Help the reader learn by following a staged explanation, not by seeing a finished dense system map.

## Information Model

Extract:

- The misconception or starting intuition.
- The concept being taught.
- 3-5 progressive steps.
- One worked example or analogy.
- A final rule of thumb.

## Layout Recipes

### Progressive Canvas

```text
Left: starting mental model
Middle: transformation steps 1 -> 2 -> 3
Right: final mental model
Bottom: rule of thumb
```

### Chalkboard Blocks

```text
Top: question
Left column: simple example
Right column: generalized rule
Bottom: common mistake
```

### Annotated Mechanism

```text
Center: main mechanism drawing
Callouts: short explanations around it
Bottom: "remember this" strip
```

## Recommended Styles

- `crayon-stack`: playful teaching and live workshop energy.
- `pin-and-paper`: informal explanation and workshop boards.
- `riso-brut`: energetic educational explainer.
- `manual-cream`: structured tutorial or procedural lesson.
- `soft-pop`: friendly non-technical education.

## Example Plan

```text
Scene: teaching-board
Audience: developers learning cache invalidation
Reader question: Why does prefix caching fail after a small change?
Main message: A tiny early-token change invalidates every downstream cached token.
Reading path: left-to-right staged example
Regions:
- Left: "what you expect" stable prefix
- Middle: one changed token highlighted
- Right: downstream cache miss cascade
- Bottom: rule of thumb
Connectors: simple arrows between stages, callout arrow to changed token
Style: crayon-stack because this is a teaching explainer
Risks: do not over-formalize into an architecture diagram
```

## Mini SVG Skeleton

```svg
<svg width="1200" height="760" viewBox="0 0 1200 760" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="760" fill="#FFF9ED"/>
  <text x="72" y="92" font-family="Inter, Arial" font-size="40" font-weight="760" fill="#20242C">Why one small change breaks the cache</text>
  <rect x="72" y="170" width="300" height="300" rx="14" fill="#FFFFFF" stroke="#20242C" stroke-width="3"/>
  <text x="222" y="222" text-anchor="middle" dominant-baseline="middle" font-family="Inter, Arial" font-size="24" font-weight="700" fill="#20242C">1. Stable prefix</text>
  <text x="222" y="320" text-anchor="middle" dominant-baseline="middle" font-family="Inter, Arial" font-size="18" fill="#5B6472">A B C D E</text>
  <rect x="450" y="170" width="300" height="300" rx="14" fill="#FFE7A8" stroke="#20242C" stroke-width="3"/>
  <text x="600" y="222" text-anchor="middle" dominant-baseline="middle" font-family="Inter, Arial" font-size="24" font-weight="700" fill="#20242C">2. Early token changes</text>
  <text x="600" y="320" text-anchor="middle" dominant-baseline="middle" font-family="Inter, Arial" font-size="18" fill="#20242C">A B X D E</text>
  <rect x="828" y="170" width="300" height="300" rx="14" fill="#FFD7D7" stroke="#20242C" stroke-width="3"/>
  <text x="978" y="222" text-anchor="middle" dominant-baseline="middle" font-family="Inter, Arial" font-size="24" font-weight="700" fill="#20242C">3. Downstream misses</text>
  <text x="978" y="320" text-anchor="middle" dominant-baseline="middle" font-family="Inter, Arial" font-size="18" fill="#20242C">D and E no longer match</text>
  <rect x="72" y="560" width="1056" height="82" rx="12" fill="#20242C"/>
  <text x="600" y="602" text-anchor="middle" dominant-baseline="middle" font-family="Inter, Arial" font-size="23" font-weight="720" fill="#FFFFFF">Rule: keep shared prompts stable before the first variable token.</text>
</svg>
```

## Anti-Patterns

- Full production architecture when the user asked for an explanation.
- Too many steps on one board.
- Small technical labels that make the board feel like a spec.
- Polished executive style when the goal is live learning.
- Hiding the misconception; good teaching often starts with the wrong intuition.

## Quality Checklist

- The board has a clear learning question.
- Steps are numbered or staged.
- The most important change is visually highlighted.
- The final rule of thumb is obvious.
- The board feels teachable, not merely decorative.

