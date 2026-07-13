# Engineering Memory

Cursor-first **Engineering Memory**: durable project knowledge (Memory Store) plus agent habits (Memory Loop).

## Package layout

| Path | Role |
|------|------|
| `rules/engineering-memory.mdc` | User-global always-on rule (Store Sync, Architecture Bias, `/tdd`) |
| `skills/memory-install/` | Memory Install skill + templates + CLI |
| `skills/improve-codebase-architecture/` | Architecture Review (evolved in place) |
| `skills/tdd/` | Dependency — TDD habit (always overwrite on Install) |
| `skills/codebase-design/` | Dependency — deep-module vocabulary |
| `skills/domain-modeling/` | Dependency — glossary + ADRs |
| `skills/grilling/` | Dependency — Architecture Review interview |
| `skills/DEPENDENCIES.md` | Closed dependency set + ownership rule |
| `CONTEXT.md` | Domain glossary for this package repo |

## Install into a brownfield Cursor repo

From this package root:

```bash
node skills/memory-install/scripts/memory-install.mjs --project /path/to/target-repo
```

Every invoke:

1. **Always replaces** user-global artifacts from this package:
   - `~/.cursor/rules/engineering-memory.mdc`
   - Loop skills: `memory-install`, `improve-codebase-architecture`
   - Core-four deps: `tdd`, `codebase-design`, `domain-modeling`, `grilling`
   - Package mirror: `~/.agents/engineering-memory/`
2. Preflights the project Store; creates missing paths; skips `ours`; fails on conflict and offers interactive merge

Re-run is idempotent when the Store is already installed. Project Store files are never auto-upgraded from newer stubs. Dependency skills are package-owned globals — living project docs are not.

## Tests

```bash
npm test
```
