# Playbook: Article Visual

Use this for public articles, newsletters, blog posts, social graphics, explainers, and concept
illustrations. The goal is not to document every detail; the goal is to make an idea memorable.

## Communication Job

Help a reader quickly grasp the article's core insight and remember the structure.

## Information Model

Extract:

- One headline insight.
- 3-5 supporting ideas.
- Tension, contrast, or before/after state.
- A memorable metaphor if the source supports it.
- One takeaway or implication.

## Layout Recipes

### Big Claim Plus Evidence Cards

```text
Large headline
Subclaim

[Evidence 1] [Evidence 2] [Evidence 3]

Takeaway strip
```

### Before / After

```text
Left: old mental model
Center: shift / mechanism
Right: new mental model
Bottom: why it matters
```

### Concept Map

```text
Center: core idea
Around: 4 forces / causes / practices
Bottom: reader takeaway
```

## Recommended Styles

- `soft-editorial`: polished long-form article visuals.
- `editorial-forest`: thoughtful analysis and knowledge work.
- `riso-brut`: energetic public explainers.
- `bold-poster`: strong social graphic with a clear claim.
- `cut-bloom`: friendly product/agent articles.
- `archive-shelf`: research synthesis and reading-room tone.

## Example Plan

```text
Scene: article-visual
Audience: technical newsletter readers
Reader question: Why do agent diagrams still look weak?
Main message: Output quality depends on expression strategy, not just visual style.
Reading path: headline -> contrast -> 3-part loop -> takeaway
Regions:
- Header: "Style is not strategy"
- Left panel: weak approach, "theme-only"
- Right panel: strong approach, "playbook + style + validation"
- Middle bridge: arrow labeled "expression strategy"
- Bottom: three reusable practices
Connectors: one central contrast arrow, no dense network
Style: soft-editorial because the board supports an article argument
Risks: avoid making it look like a technical architecture diagram
```

## Mini SVG Skeleton

```svg
<svg width="1280" height="760" viewBox="0 0 1280 760" xmlns="http://www.w3.org/2000/svg">
  <rect width="1280" height="760" fill="#FFFDF8"/>
  <text x="80" y="104" font-family="Inter, Arial" font-size="44" font-weight="750" fill="#1F2937">Style is not strategy</text>
  <text x="82" y="145" font-family="Inter, Arial" font-size="19" fill="#5B6472">Better diagrams start with expression patterns, then visual design.</text>
  <rect x="80" y="210" width="500" height="300" rx="12" fill="#F5F1E8" stroke="#1F2937" stroke-width="2"/>
  <text x="120" y="270" font-family="Inter, Arial" font-size="28" font-weight="700" fill="#1F2937">Theme-only output</text>
  <text x="120" y="324" font-family="Inter, Arial" font-size="18" fill="#5B6472">Same boxes, new colors</text>
  <text x="120" y="360" font-family="Inter, Arial" font-size="18" fill="#5B6472">No reading path</text>
  <text x="120" y="396" font-family="Inter, Arial" font-size="18" fill="#5B6472">Weak alignment discipline</text>
  <rect x="700" y="210" width="500" height="300" rx="12" fill="#EAF2FF" stroke="#1F2937" stroke-width="2"/>
  <text x="740" y="270" font-family="Inter, Arial" font-size="28" font-weight="700" fill="#1F2937">Playbook-led output</text>
  <text x="740" y="324" font-family="Inter, Arial" font-size="18" fill="#5B6472">Scene structure first</text>
  <text x="740" y="360" font-family="Inter, Arial" font-size="18" fill="#5B6472">Style supports intent</text>
  <text x="740" y="396" font-family="Inter, Arial" font-size="18" fill="#5B6472">Validation closes the loop</text>
  <rect x="80" y="588" width="1120" height="76" rx="10" fill="#1F2937"/>
  <text x="640" y="626" text-anchor="middle" dominant-baseline="middle" font-family="Inter, Arial" font-size="22" font-weight="700" fill="#FFFFFF">Choose the scene playbook before choosing the style.</text>
</svg>
```

## Anti-Patterns

- Trying to include every paragraph from the source.
- Dense tables unless the article is explicitly data-heavy.
- Decorative icons that do not carry meaning.
- Vague labels such as "Step 1" and "Step 2" instead of reader-facing ideas.
- A generic architecture layout for an opinion or explanatory article.

## Quality Checklist

- The board has one sharp headline or central claim.
- It contains 3-5 supporting ideas, not 12.
- It is legible as a thumbnail.
- The visual metaphor or contrast supports the article argument.
- The takeaway is visible without reading every card.

