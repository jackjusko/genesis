# Engineering Memory — design

Sole primary design/spec for Cursor Engineering Memory at this path (charting handoff for implementation). Mandatory sections: Product & packaging, Memory Store, Memory Loop, Memory Install, Architecture Review, Architecture Bias, Open questions / deferred. Stub/rule bodies live under [`prototypes/`](prototypes/) and are linked from the section that owns them; domain vocabulary is [`CONTEXT.md`](../../CONTEXT.md). Filled as [Engineering Memory design](map.md) tickets resolve (matching section updated in the same session). **Design complete.** Implementation: [Implement Engineering Memory from the locked design](issues/15-implement-engineering-memory.md) (`ready-for-agent`).

## Product & packaging

**Cursor-first** Engineering Memory. **Hybrid packaging:** reusable Loop artifacts ship **user-global**; Memory Store + `## Engineering Memory` in AGENTS.md live **project-local**.

| Loop artifact | Slug / heading | Where |
|---------------|----------------|-------|
| AGENTS.md section | `## Engineering Memory` | Project |
| Always-on rule | `engineering-memory` (title **Engineering Memory**) | User-global |
| Memory Install skill | `memory-install` | User-global |
| Architecture Review skill | `improve-codebase-architecture` (display **Architecture Review**) | User-global |

No optional sync skill. Explore subagent is invoke-only (Architecture Review), not an Install drop. Implementation/shipping of the package is out of scope for this design.

**Global Loop updates:** Memory Install is the sole updater. Every invoke (1) **always replaces** user-global rule + skills with packaged latest (package-owned; no global merge), then (2) runs project preflight/merge. No separate upgrade skill, no globals-only flag. **Project Store never auto-upgrades** when stubs advance — ours/skip, missing/create, conflict/offer interactive merge. Version pins and release changelogs deferred.

## Memory Store

**Canonical paths** agents must use (closed set; no aliases):

| Path | Role |
|------|------|
| `CONTEXT.md` | Domain glossary (repo root) |
| `docs/adr/` | ADRs |
| `docs/architecture.md` | Primary Architecture Corpus doc |
| `docs/architecture/` | Deep-dives (earned only) |
| `docs/conventions.md` | Architecture Bias / standing preferences |

**Full-scaffold Install file drops** (create these; stub bodies linked below / in prototypes):

| File | Rule |
|------|------|
| `CONTEXT.md` | Stub only if missing |
| `docs/adr/README.md` | Ensure `docs/adr/`; README when folder new / README missing; no sample ADRs |
| `docs/architecture.md` | Primary architecture doc |
| `docs/architecture/README.md` | Ensure `docs/architecture/`; pointer README only; no pre-seeded deep-dives |
| `docs/conventions.md` | Conventions stub |

Deep-dives are added later as kebab-case files under `docs/architecture/` when a subsystem has earned its own home — never pre-seeded. No default `CONTEXT-MAP.md`. Nothing else is Memory Store: no parallel `memory/` tree; `AGENTS.md` `## Engineering Memory` is Loop index (not Store); planning/wayfinder maps stay outside the Store.

### Primary architecture doc (`docs/architecture.md`)

Install drops the template validated in [prototypes/architecture-md-template.md](prototypes/architecture-md-template.md) (without the PROTOTYPE banner).

**Required sections (order fixed):** opening (purpose + Store pointers + how-to-use) → System shape → Key seams → Deep-dives → Out of scope for this doc.

**Stub depth:** Repo-independent prose is filled (opening, deep-dives intro, out-of-scope). Repo-specific sections use HTML guidance comments plus one `_TODO_` placeholder — not empty headings, not fictional architecture.

**Deep-dive index:** A table in the primary doc links earned kebab-case files under `docs/architecture/`; install starts with “none yet”. No pre-seeded deep-dive files.

Stub prose for other Store paths: [CONTEXT.md](prototypes/context-md-stub.md), [docs/adr/README.md](prototypes/adr-readme-stub.md), [docs/architecture/README.md](prototypes/architecture-dir-readme-stub.md). Brownfield merge: see Memory Install.

## Memory Loop

Closed inventory (detail: [issues/07-loop-artifact-inventory.md](issues/07-loop-artifact-inventory.md)):

**Project — `## Engineering Memory` in AGENTS.md:** index only. Exact Install stub: [prototypes/agents-md-engineering-memory-section.md](prototypes/agents-md-engineering-memory-section.md). Points at Store paths, the always-on rule (by name, not pasted), Memory Install + Architecture Review skills, and that wayfinder/planning maps stay outside the Store.

**User-global — always-on rule `engineering-memory`:** three duties only. Exact body: [prototypes/engineering-memory-always-on-rule.md](prototypes/engineering-memory-always-on-rule.md).

1. **Store Sync** — load relevant Store at session start; write back material changes before session end; same-batch update on structural change.
2. **Architecture Bias** — soft deep-module defaults; prefer expanding architecture over hacky/short-term fit (extension must fit existing corpus + bias). **Ordinary stretch:** design → implement → Store write same batch. **Plan-sized:** stop; offer **Automatic** / **Critical only** (default if unset) / **Full grill**; plan outside Store; on resolve, Store update then implement. Never-installed Store → note gap, degrade. Plan-sized handoff: [issues/13-plan-sized-architecture-handoff.md](issues/13-plan-sized-architecture-handoff.md).
3. **`/tdd` habit** — use `/tdd` when writing/changing code (not a separate Install skill).

**User-global — `memory-install`:** sole updater of globals — every invoke replaces global Loop artifacts with packaged latest, then full-scaffold / merge-preflight the project Store + AGENTS.md section (per Memory Install; Store never auto-upgraded from newer stubs).

**User-global — Architecture Review** (`improve-codebase-architecture`): deepening pass with Explore invoke-only; Store fold-back when decisions crystallize (see Architecture Review).

## Memory Install

Brownfield-safe full scaffold. Hybrid packaging (global Loop vs local Store) is unchanged; this section is **conflict and merge** rules plus **global update** behavior.

**Update path:** Re-invoking Memory Install is how Loop skills/rules receive updates. Order: replace user-global artifacts with packaged latest → project preflight/merge. Globals are package-owned (always overwrite). Project Store stays under the rules below — living “ours” docs are never rewritten just because templates advanced.

**Preflight:** Classify every path Install would create as **missing**, **ours** (recognized Engineering Memory artifact → skip), or **conflict** (foreign content at that path, or file↔directory mismatch). Existing `docs/adr/` / `docs/architecture/` dirs are fine; existing ADRs and deep-dives are never conflicts. A new file inside those dirs conflicts only if it already exists and isn’t ours.

**Default run:** If any **conflict** → write **nothing**, list all conflicts, fail, and **offer** in-session AI-guided interactive merge (explicit yes required). Clean preflight (only missing + ours) → create missing paths; fully installed → success no-op.

**Interactive merge:**

| Path | Rule |
|------|------|
| `AGENTS.md` (and similar project Loop wiring) | Section append/update only; never whole-file replace; diff + confirm |
| `CONTEXT.md` | Preserve glossary; no term rewrites; optional pointer if no EM linkage |
| `docs/architecture.md` | Add missing required template sections only; never delete prose; confirm |
| `docs/conventions.md` | Add missing seed sections only; preserve existing conventions; confirm |
| Type mismatch | Ask — no auto rename/delete |

**Non-canonical architecture docs:** Not conflicts. May still create `docs/architecture.md`. Warn with discovered alternate paths; never auto-move/overwrite.

**“Ours” detection:** For Install-owned files, classify **ours** only if `<!-- engineering-memory:install -->` appears as the first non-empty line (or within the first 20 lines). Exact, case-sensitive; no version suffix in v1. If the marker is removed later, the path is no longer ours (conflict on recreate). **`AGENTS.md`:** ours section = heading `## Engineering Memory` present → skip section rewrite on re-run; never whole-file replace. **Dirs** `docs/adr/` and `docs/architecture/` are never conflicts. ADRs and deep-dives are never Install recreates. No content-fingerprint heuristics. Globals always overwrite (no ours check).

## Architecture Review

Packaged by **evolving** `/improve-codebase-architecture` **in place** (no wrapper fork). Loop surface name: **Architecture Review**; skill slug may remain `improve-codebase-architecture` if discovery requires it. Deepening vocabulary unchanged (`/codebase-design`).

**Process (preserved):** load Store/domain docs → Explore subagent codebase walk → temp HTML candidate report → user picks → grilling → domain-modeling side effects → **Store fold-back**.

**HTML report:** Temp-only (`architecture-review-<timestamp>.html` under OS temp). Never committed to the repo or Memory Store.

**Explore subagent:** Kept for the organic walk. Parent owns Store load, report, grill, fold-back. Missing Store pieces → note gaps; don’t invent architecture.

**Fold-back (mandatory when decisions crystallize, same session):**

| Outcome | Store target |
|--------|----------------|
| Seams / module shape / earned deep-dive | `docs/architecture.md` and/or `docs/architecture/<kebab>.md` |
| Domain terms | `CONTEXT.md` |
| Hard override / don’t re-suggest | Offer ADR |
| Earned standing preference | `docs/conventions.md` Project-specific |

No parallel review log. Browse-only session (no candidate chosen) → no Store write.

**Triggers:** milestone/phase boundaries + friction; manual invoke allowed (not every-N-sessions).

## Architecture Bias

Soft deep-module defaults plus agent-authored `docs/conventions.md`. Humans need not fill conventions for Bias to operate; ADRs win on hard overrides.

**Expand over hacky fit** (always-on rule): when a change would stretch the corpus thin or force a short-term fit, prefer designing a long-term architecture extension that fits the existing corpus and this bias. Ordinary stretch → same-batch Store write. Plan-sized → three-mode planning chooser, plan outside Store, then Store fold-back and implement.

### Plan-sized handoff

1. **Stop implementing** (unless user explicitly overrides to ordinary stretch).
2. Offer **Automatic** / **Critical only** (default if unset) / **Full grill**; honour a standing per-effort preference when set.
3. **Chart + work** via Wayfinder (or equivalent) on the issue tracker — Destination = the architecture decision needed. Maps/tickets never live in Store paths. If Wayfinder unavailable, same shape inline in-session, still outside Store.
4. Mode controls how HITL tickets ask; not whether fold-back happens.
5. When Destination is met: **Store fold-back first** (architecture / glossary / ADRs / conventions as earned — same targets as Architecture Review), **then implement** under Store Sync + `/tdd`. Leave the map as a decision-route artifact unless the user deletes it.

Detail: [issues/13-plan-sized-architecture-handoff.md](issues/13-plan-sized-architecture-handoff.md).

**Install seed sources** (detail: [research/architecture-bias-sources.md](research/architecture-bias-sources.md)):

| Source | Into conventions stub | Stays as skill/habit |
|--------|----------------------|----------------------|
| `/codebase-design` | Deep-module soft defaults + vocabulary | Deepening / design-it-twice workflows |
| `/tdd` | Behaviour-through-interfaces; test at seams; inject deps | Red→green loop; seam confirmation; anti-pattern detail |
| Long-term bias (thin) | Evolvable seams; honest failure signals; prefer depth | — |
| Stack packs (`/api-design`, `/observability`, `/react-best-practices`, …) | Not in generic Install | Cite on demand; paraphrase into project conventions when stack matches |

**Cite vs paraphrase:** conventions = standing preferences (always-on / skim); skills = procedures and catalogs. Never paste a whole skill into the Store.

**Install stub:** drop [prototypes/conventions-md-stub.md](prototypes/conventions-md-stub.md) (without the PROTOTYPE banner; keep the Install marker). Sections in order: purpose → Deep modules → Tests & seams → Long-term bias → Skill pointers → empty Project-specific.

## Open questions / deferred

Deferred past this design (not required to implement v1 Engineering Memory):

- Mechanical enforcement of Store Sync (hooks, CI, linters) — normative Loop first.
- Monorepo / multi-package Memory Store shape (no default `CONTEXT-MAP.md` in v1).
- How to evaluate in practice that agents are obeying the Loop.
- Version pins / changelogs between global Loop releases and already-installed repos.
- Optional “active efforts” pointers from the Store or AGENTS index to wayfinder maps (pointers only; maps stay outside Store).
