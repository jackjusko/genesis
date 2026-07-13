# How does Memory Install merge into an existing repo?

Type: grilling  
Status: resolved  
Parent: [Engineering Memory design](../map.md)  
Blocked by: 02

## Question

When the target already has `AGENTS.md`, `CONTEXT.md`, ADRs, or architecture docs, what does Memory Install do (merge, skip, rename, fail)? Define conflict rules so install is safe on brownfield Cursor repos.

## Prior answer (earlier pass - re-resolve; do not rubber-stamp)

**Default posture:** Fail on any conflict. **Preflight first** - scan every path Install would create; if any conflict remains, write **nothing**, print the full conflict list, exit non-zero, and **offer** an in-session "continue with AI-guided interactive merge?" (proceed only on explicit yes). Interactive merge is never entered silently.

**Conflict vs skip vs create:**

| Classification | Meaning |
|----------------|---------|
| **missing** | Path absent -> create after clean preflight (or after merge clears conflicts) |
| **ours** | Path exists and is recognized as an Engineering Memory Install artifact (canonical path + Memory markers / known stub shape) -> **skip**, not a conflict |
| **conflict** | Path exists and is not "ours"; or file<->directory type mismatch |

**Directory rules:** Existing `docs/adr/` or `docs/architecture/` is **not** a conflict. Existing ADRs and deep-dives are left alone. A *new file* Install would drop inside those dirs (e.g. pointer README) conflicts only if that file already exists and isn't "ours."

**Interactive merge (per path):**

| Path | Behavior |
|------|----------|
| `AGENTS.md` | Append or update an Engineering Memory **section only**; never replace the whole file; show diff and confirm. Same spirit for other project Loop wiring Install touches. |
| `CONTEXT.md` | Keep existing glossary; don't rewrite terms; optional short pointer only if zero EM linkage |
| `docs/architecture.md` | Diff vs template; propose adding **missing required sections**; never delete existing prose; confirm each change |
| `docs/conventions.md` | Add missing seed sections only; preserve existing project conventions; confirm |
| Type mismatch | Stop and ask - no automatic rename/delete |

**Non-canonical architecture docs** (`ARCHITECTURE.md`, etc.): not a conflict; Install may create `docs/architecture.md`. Summary **warns** with paths found; do not auto-move or overwrite. Fold-in later via Store Sync / Architecture Review.

**Idempotent re-run:** Fully installed repo (all required paths missing or "ours") -> success no-op. Exact "ours" marker shape deferred to Install stub / artifact tickets.

Detail in [spec.md section Memory Install](../spec.md).

## Answer

Re-resolved against ticket 02's closed Install file set + `AGENTS.md` Loop section. Compared fail-closed preflight vs softer fill-holes; kept fail-closed with one AGENTS clarification.

**Preflight set** (every path Install would create):

| Target | Kind |
|--------|------|
| `CONTEXT.md` | file |
| `docs/adr/` | dir (ensure) |
| `docs/adr/README.md` | file |
| `docs/architecture.md` | file |
| `docs/architecture/` | dir (ensure) |
| `docs/architecture/README.md` | file |
| `docs/conventions.md` | file |
| `AGENTS.md` section `## Engineering Memory` | section (not whole-file) |

**Three classes:**

| Class | Meaning | Default action |
|-------|---------|----------------|
| **missing** | Absent - or for `AGENTS.md`, file may exist but the Engineering Memory **section heading is absent** | Create / append after clean preflight |
| **ours** | Recognized Engineering Memory Install artifact | **Skip** (not a conflict) |
| **conflict** | Exists and is not ours; or file<->directory type mismatch | Block (see default run) |

Exact **ours** recognition (file markers, AGENTS heading text) is [What markers classify an Install path as "ours"?](10-install-ours-markers.md) - this ticket locks the classes and skip semantics only.

**Directory rules:** Existing `docs/adr/` / `docs/architecture/` dirs are never conflicts (classify as ours for the dir target). Existing ADRs and deep-dives are never Install recreate targets and never conflicts. A pointer README inside those dirs conflicts only if that file already exists and isn't ours.

**Default run (atomic):** Any **conflict** -> write **nothing** (including no creates for other missing paths), print the full conflict list, exit non-zero, and **offer** in-session AI-guided interactive merge. Proceed only on explicit yes - never silent. Clean preflight (missing + ours only) -> create/append missing. All ours -> success no-op.

**Interactive merge (after explicit yes):**

| Path | Behavior |
|------|----------|
| `AGENTS.md` | Section append/update only; never whole-file replace; diff + confirm |
| `CONTEXT.md` | Preserve glossary; no term rewrites; optional short pointer only if zero EM linkage |
| `docs/architecture.md` | Add missing required template H2s only (merge contract from ticket 03); never delete prose; confirm |
| `docs/conventions.md` | Add missing seed sections only; preserve existing conventions; confirm |
| Pointer READMEs | Confirm vs stub; never delete sibling ADRs / deep-dives |
| Type mismatch | Ask - no auto rename/delete |

**Non-canonical architecture docs** (`ARCHITECTURE.md`, etc.): not conflicts. May still create `docs/architecture.md` when missing. Warn with discovered paths; never auto-move/overwrite. Fold-in later via Store Sync / Architecture Review.

**Rejected alternatives:**

1. **Fill-holes / soft-skip** - create missing paths even when foreign files sit on other Install paths. Rejected: partial silent writes make brownfield state hard to reason about; atomic fail-closed is safer.
2. **Auto-rename** foreign files aside (`*.bak`). Rejected: surprising and destructive.
3. **Hard-conflict non-canonical** arch docs. Rejected: would block Install on common layouts; warn + canonical create is enough.
4. **Whole-file AGENTS replace.** Rejected: brownfield AGENTS.md is project-owned; section-scoped only.
5. **Existing AGENTS.md without EM section = conflict.** Rejected: append-only section create is safe -> classify **missing**, not conflict.
6. **Silent interactive merge.** Rejected: explicit yes required.

Global Loop refresh order stays with Product & packaging / ticket 08; project Store never auto-upgrades on re-run (ours -> skip).

Detail: [spec.md section Memory Install](../spec.md).