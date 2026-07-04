# npm Release Notes

AgentDraw is prepared as three npm packages:

- `@agentdraw/scene`: scene IO and validation.
- `@agentdraw/server`: local HTTP server plus bundled web editor assets.
- `agentdraw`: user-facing CLI with the `agentdraw` binary.

Build and create local tarballs:

```bash
pnpm npm:pack
```

Publish order:

```bash
pnpm --filter @agentdraw/scene publish --access public
pnpm --filter @agentdraw/server publish --access public
pnpm --filter agentdraw publish --access public
```

Smoke-test the packed CLI tarball:

```bash
npm install -g ./npm/agentdraw-0.1.0.tgz
agentdraw open examples/getting-started.agentdraw.json --no-open
```

Before publishing, ensure the version is bumped consistently in:

- `packages/scene/package.json`
- `packages/server/package.json`
- `packages/cli/package.json`
