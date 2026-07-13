---
name: memory-install
description: >-
  Memory Install — sole updater of user-global Engineering Memory Loop artifacts;
  full-scaffold or merge-preflight the project-local Memory Store and AGENTS.md
  Engineering Memory section. Use when installing or refreshing Engineering Memory.
disable-model-invocation: true
---

# Memory Install

Lay down or refresh **Engineering Memory** in a Cursor repo.

**Hybrid packaging:**

1. **Always** replace user-global Loop artifacts with packaged latest (package-owned — no global merge).
2. **Then** preflight / merge the **project-local** Memory Store + `## Engineering Memory` in AGENTS.md.

Project Store docs are never auto-upgraded just because stubs advanced (`ours` → skip).

## Process

### 1. Refresh globals

From this package root (repo containing `rules/` + `skills/`), run:

```bash
node skills/memory-install/scripts/memory-install.mjs --project <target-repo>
```

Or, when this skill is already installed under `~/.agents/skills/memory-install`, prefer invoking the script from the **package checkout** (source of truth). If only the global skill is available, run the script from that skill directory with `--package` pointing at a package root that still contains `rules/` and sibling `skills/`.

Globals written every invoke:

| Artifact | Destination |
|----------|-------------|
| Always-on rule `engineering-memory` | `~/.cursor/rules/engineering-memory.mdc` (`alwaysApply: true`) |
| Architecture Review | `~/.agents/skills/improve-codebase-architecture/` |
| Memory Install (self) | `~/.agents/skills/memory-install/` |
| Package mirror (for later refreshes) | `~/.agents/engineering-memory/` (`rules/` + `skills/`) |

### 2. Project preflight

The CLI classifies every Install path as **missing**, **ours**, or **conflict**:

| Path | Ours when |
|------|-----------|
| `CONTEXT.md`, `docs/product.md`, `docs/architecture.md`, `docs/conventions.md`, `docs/adr/README.md`, `docs/architecture/README.md` | `<!-- engineering-memory:install -->` in first 20 lines |
| `docs/adr/`, `docs/architecture/` | directory exists |
| `AGENTS.md` § Engineering Memory | heading `## Engineering Memory` present |

- **Any conflict** → write **nothing**, list all conflicts, exit 2. **Offer** in-session AI-guided interactive merge; proceed only on explicit yes.
- **Clean** (missing + ours only) → create missing paths; fully installed → success no-op.

Non-canonical architecture docs (`ARCHITECTURE.md`, etc.) are **warnings only**, not conflicts. Still create `docs/architecture.md` when missing. Never auto-move/overwrite alternates.

### 3. Interactive merge (only after explicit yes)

| Path | Rule |
|------|------|
| `AGENTS.md` | Section append/update only; never whole-file replace; diff + confirm |
| `CONTEXT.md` | Preserve glossary; no term rewrites; optional pointer if no EM linkage |
| `docs/product.md` | Add missing required template H2s only; never delete prose; confirm |
| `docs/architecture.md` | Add missing required template sections only; never delete prose; confirm |
| `docs/conventions.md` | Add missing seed sections only; preserve existing conventions; confirm |
| Type mismatch | Ask — no auto rename/delete |

After merge clears a path, re-run the CLI (or create that path from `skills/memory-install/templates/`).

### 4. Done

Tell the user:

- Globals refreshed (rule + skills paths)
- Project status: installed / no-op / conflicts + merge offer
- Any non-canonical architecture warnings

Remind them the always-on rule covers Store Sync, Architecture Bias (ordinary vs plan-sized), and the `/tdd` habit — no optional sync skill.

## Templates

Project drops live under [templates/](templates/) (Install marker kept; PROTOTYPE banners stripped).
