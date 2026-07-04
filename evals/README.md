# AgentDraw Evals

This folder defines the first evaluation surface for the AgentDraw skill.

The goal is not to prove that a generated board is perfect. The goal is to catch regressions and
make quality discussable: task fit, structure, visual design, readability, connector quality, and
validation.

## How To Run A Manual Eval

1. Start from a clean working directory.
2. Install the current skill and CLI:

```bash
npm install -g @aidraw/agentdraw
npx skills add chenhg5/agentdraw --skill agentdraw -p -a codex -y
```

3. Pick one prompt from [`prompts.md`](./prompts.md).
4. Ask an agent to create the board using AgentDraw.
5. Run validation:

```bash
agentdraw validate path/to/output.agentdraw.json --style <style-id> --format json
agentdraw quality path/to/output.agentdraw.json --style <style-id> --format json
```

6. Score the output with [`rubric.md`](./rubric.md). Use `agentdraw quality` as preflight evidence,
   but still review task fit against the original prompt.

## Pass Criteria

A generated board passes this first eval if:

- `agentdraw validate` reports zero errors;
- `agentdraw quality` returns `verdict: "pass"` or every remaining weakness is explicitly accepted;
- the score is at least 20 out of 24;
- no single rubric dimension scores below 3;
- the scene remains editable `.agentdraw.json`, not a screenshot or static image.

## Evidence To Save

For each eval run, save:

- the prompt id;
- the generated `.agentdraw.json`;
- the validation JSON;
- a rendered preview or screenshot;
- the rubric scores and one short note on the biggest weakness.
