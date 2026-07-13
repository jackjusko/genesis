# Engineering Memory

Cursor-first **Engineering Memory**: durable project knowledge (Memory Store) plus agent habits (Memory Loop).

## Package layout

| Path | Role |
|------|------|
| `rules/engineering-memory.mdc` | User-global always-on rule (Store Sync, Architecture Bias, `/tdd`) |
| `skills/memory-install/` | Memory Install skill + templates + CLI |
| `skills/improve-codebase-architecture/` | Architecture Review (evolved in place) |
| `CONTEXT.md` | Domain glossary for this package repo |

## Install into a brownfield Cursor repo

From this package root:

```bash
node skills/memory-install/scripts/memory-install.mjs --project /path/to/target-repo
```

Every invoke:

1. Replaces user-global Loop artifacts (`~/.cursor/rules/engineering-memory.mdc`, `~/.agents/skills/memory-install`, `~/.agents/skills/improve-codebase-architecture`)
2. Preflights the project Store; creates missing paths; skips `ours`; fails on conflict and offers interactive merge

Re-run is idempotent when the Store is already installed. Project Store files are never auto-upgraded from newer stubs.

## Tests

```bash
npm test
```
