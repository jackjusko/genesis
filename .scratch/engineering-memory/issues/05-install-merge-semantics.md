# How does Memory Install merge into an existing repo?

Type: grilling  
Status: resolved  
Parent: [Engineering Memory design](../map.md)  
Blocked by: 02

## Question

When the target already has `AGENTS.md`, `CONTEXT.md`, ADRs, or architecture docs, what does Memory Install do (merge, skip, rename, fail)? Define conflict rules so install is safe on brownfield Cursor repos.

## Answer

**Default posture:** Fail on any conflict. **Preflight first** — scan every path Install would create; if any conflict remains, write **nothing**, print the full conflict list, exit non-zero, and **offer** an in-session “continue with AI-guided interactive merge?” (proceed only on explicit yes). Interactive merge is never entered silently.

**Conflict vs skip vs create:**

| Classification | Meaning |
|----------------|---------|
| **missing** | Path absent → create after clean preflight (or after merge clears conflicts) |
| **ours** | Path exists and is recognized as an Engineering Memory Install artifact (canonical path + Memory markers / known stub shape) → **skip**, not a conflict |
| **conflict** | Path exists and is not “ours”; or file↔directory type mismatch |

**Directory rules:** Existing `docs/adr/` or `docs/architecture/` is **not** a conflict. Existing ADRs and deep-dives are left alone. A *new file* Install would drop inside those dirs (e.g. pointer README) conflicts only if that file already exists and isn’t “ours.”

**Interactive merge (per path):**

| Path | Behavior |
|------|----------|
| `AGENTS.md` | Append or update an Engineering Memory **section only**; never replace the whole file; show diff and confirm. Same spirit for other project Loop wiring Install touches. |
| `CONTEXT.md` | Keep existing glossary; don’t rewrite terms; optional short pointer only if zero EM linkage |
| `docs/architecture.md` | Diff vs template; propose adding **missing required sections**; never delete existing prose; confirm each change |
| `docs/conventions.md` | Add missing seed sections only; preserve existing project conventions; confirm |
| Type mismatch | Stop and ask — no automatic rename/delete |

**Non-canonical architecture docs** (`ARCHITECTURE.md`, etc.): not a conflict; Install may create `docs/architecture.md`. Summary **warns** with paths found; do not auto-move or overwrite. Fold-in later via Store Sync / Architecture Review.

**Idempotent re-run:** Fully installed repo (all required paths missing or “ours”) → success no-op. Exact “ours” marker shape deferred to Install stub / artifact tickets.

Detail in [spec.md § Memory Install](../spec.md).
