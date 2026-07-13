# Engineering Memory

Cursor-first **Engineering Memory**: durable project knowledge (Memory Store) plus agent habits (Memory Loop).

## Package layout

| Path | Role |
|------|------|
| `rules/engineering-memory.mdc` | User-global always-on rule (Store Sync, Architecture Bias, `/tdd`) |
| `skills/memory-install/` | Memory Install skill + templates + CLI |
| `skills/improve-codebase-architecture/` | Architecture Review (evolved in place) |
| `skills/auto-build/` | One-shot autonomous orchestrator |
| `skills/wayfinder/` | Planning maps (outside Memory Store) |
| `skills/to-tickets/` | Spec → vertical-slice tickets |
| `skills/drain-tickets/` | Frontier → implement loop |
| `skills/grill-me/` / `grill-with-docs/` | Thin aliases → grilling (+ domain-modeling) |
| `skills/tdd/` | Dependency — TDD habit (always overwrite on Install) |
| `skills/codebase-design/` | Dependency — deep-module vocabulary |
| `skills/domain-modeling/` | Dependency — glossary + ADRs |
| `skills/grilling/` | Dependency — Architecture Review interview |
| `skills/DEPENDENCIES.md` | Closed dependency set + ownership rule |
| `AUTO-BUILD.md` | Auto-build product brief (not Memory Store) |
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
   - Package-owned deps: core-four + auto-build pipeline (`auto-build`, `wayfinder`, `grill-me`, `grill-with-docs`, `to-tickets`, `drain-tickets`, …) — see `skills/DEPENDENCIES.md`
   - Package mirror: `~/.agents/engineering-memory/`
2. Preflights the project Store; creates missing paths; skips `ours`; fails on conflict and offers interactive merge

Re-run is idempotent when the Store is already installed. Project Store files are never auto-upgraded from newer stubs. Dependency skills are package-owned globals — living project docs are not. Wayfinder maps stay outside the Memory Store; `/auto-build` is a Loop skill, not Store content.

## Tests

```bash
npm test
```
