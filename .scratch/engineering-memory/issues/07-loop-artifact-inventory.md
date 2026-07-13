# What is the Loop artifact inventory?

Type: grilling  
Status: claimed  
Parent: [Engineering Memory design](../map.md)  
Blocked by: 02, 06

## Question

What are the exact names, locations (user-global vs project), and duties of the AGENTS.md section, always-on rule (Store Sync + Architecture Bias + `/tdd` habit), Memory Install skill, Architecture Review skill, optional sync skill, and any subagents ? matching the agreed Cursor surface split?

Note from map: `/tdd` is a habit wired through the always-on rule / AGENTS.md index, not a third Install skill.

## Prior answer (earlier pass ? re-resolve; do not rubber-stamp)
### Closed set

| Artifact | Name / slug | Location | Duties |
|----------|-------------|----------|--------|
| AGENTS.md section | `## Engineering Memory` | Project | Index only: Store paths to load; pointer to always-on rule (three duties, not pasted); skills Memory Install + Architecture Review; note that wayfinder/planning stays outside the Store. No procedure bodies, conventions prose, or sync checklists. |
| Always-on rule | Title **Engineering Memory**; slug `engineering-memory` | User-global | **Only** (1) Store Sync, (2) Architecture Bias, (3) `/tdd` habit. See below. |
| Memory Install skill | Display **Memory Install**; slug `memory-install` | User-global | Ensure global Loop artifacts present (rule + `memory-install` + Architecture Review skill); full-scaffold project Store + `## Engineering Memory` in AGENTS.md per merge/preflight rules. Not Review, not real architecture prose beyond stubs, not hooks/CI. |
| Architecture Review skill | Display **Architecture Review**; slug `improve-codebase-architecture` (evolve in place) | User-global | Deepening pass per [How is Architecture Review packaged?](06-architecture-review-packaging.md): Store load ? Explore walk ? temp HTML ? grill ? Store fold-back. Triggers: milestone/friction/manual. |
| Explore subagent | Cursor Explore | Invoke-only | Used by Architecture Review for the organic walk. Not an Install drop. |

**Out of inventory:** optional / explicit Store Sync skill (Sync is always-on only); dedicated `/tdd` Install skill; any other Loop skills or always-on rules.

### Always-on rule ? three duties

1. **Store Sync** ? load relevant Store docs at session start; write back material changes before session end; same-batch Store update on structural change.
2. **Architecture Bias** ? soft deep-module / clear-seam defaults; conventions + long-term outlook over short-term minimalism; ADRs win on hard overrides. Prefer expanding architecture over hacky fit:
   - **Ordinary stretch:** design extension ? implement ? write Store same batch (must fit existing corpus + bias).
   - **Plan-sized change:** stop implementing; offer **Automatic** / **Critical only** (default if unset) / **Full grill**; plan outside the Store (Wayfinder or equivalent); on resolve, update Store then implement. Missing Store / never installed ? note gap and degrade (don?t invent a greenfield corpus).
3. **`/tdd` habit** ? when writing or changing code, use `/tdd`; not a separate Install skill.

Exact AGENTS.md stub prose, always-on rule body text, and plan-sized ? Wayfinder handoff mechanics are follow-on tickets.

## Answer

Re-resolved against closed Store (ticket 02), Architecture Review packaging (ticket 06), hybrid packaging (map / CONTEXT), and Cursor surface split. Compared: one always-on rule vs split rules; optional sync skill vs always-on Sync only; Install ?ensure present? vs sole-updater; project-local rule/skills vs user-global Loop; Explore as Install drop vs invoke-only.

### Closed Loop set

Four Install-owned surfaces + one invoke-only subagent. Nothing else is Engineering Memory Loop.

| Artifact | Display / heading | Slug / path key | Location | Canonical Cursor destination |
|----------|-------------------|-----------------|----------|------------------------------|
| AGENTS.md section | `## Engineering Memory` | heading (ours marker) | **Project** | `<repo>/AGENTS.md` section only |
| Always-on rule | **Engineering Memory** | `engineering-memory` | **User-global** | `~/.cursor/rules/engineering-memory.mdc` (`alwaysApply: true`) |
| Memory Install skill | **Memory Install** | `memory-install` | **User-global** | `~/.agents/skills/memory-install/` |
| Architecture Review skill | **Architecture Review** | `improve-codebase-architecture` (locked) | **User-global** | `~/.agents/skills/improve-codebase-architecture/` |
| Explore subagent | Cursor Explore | `subagent_type=Explore` | **Invoke-only** | Not installed; Review invokes it for the organic walk |

Hybrid packaging: reusable Loop rule + skills ship **user-global**; Memory Store paths (ticket 02) + the AGENTS index stay **project-local**. No project copies of the rule or Loop skills.

### Duties

**`## Engineering Memory` (project index only)**  
Pointers, not procedures: canonical Store paths to load; name the always-on rule (three duties listed, body not pasted); name Memory Install + Architecture Review (display + slug); state that wayfinder/planning maps stay outside the Store. No sync checklists, conventions prose, or skill bodies. Exact stub ? ticket 11.

**Always-on rule `engineering-memory` (three duties only)**

1. **Store Sync** ? load relevant Store at session start (via AGENTS index); same-batch Store write on structural change; write back other material changes before session end. No optional sync skill.
2. **Architecture Bias** ? soft deep-module / clear-seam defaults + agent-authored `docs/conventions.md`; long-term over short-term minimalism; ADRs win on hard overrides. Prefer expanding architecture over hacky fit (extension must fit existing corpus + bias):
   - **Ordinary stretch:** design ? implement ? Store write same batch.
   - **Plan-sized:** stop; offer **Automatic** / **Critical only** (default if unset) / **Full grill**; plan outside Store (Wayfinder or equivalent); on resolve, Store update then implement. Never-installed Store ? note gap, degrade (don?t invent a corpus).
3. **`/tdd` habit** ? when writing or changing code, use `/tdd`. Not a separate Install skill.

Exact rule body ? ticket 12. Plan-sized ? Wayfinder mechanics ? ticket 13.

**Memory Install (`memory-install`)**  
Sole updater of the user-global Loop set (rule + both skills). Every invoke refreshes those globals from the packaged latest, then full-scaffolds / merge-preflights the project Store + `## Engineering Memory` section. Not Architecture Review, not living architecture beyond Install stubs, not hooks/CI. Refresh/merge detail ? tickets 05 / 08.

**Architecture Review (`improve-codebase-architecture`)**  
Deepening pass per ticket 06: load Store ? Explore walk ? temp HTML ? grill ? Store fold-back when decisions crystallize. Triggers: milestone/phase + friction; manual invoke allowed. Evolve in place; display name Architecture Review; slug locked.

**Explore**  
Invoke-only isolation for Review?s organic walk. Parent owns Store load, HTML, grill, fold-back. Not an Install drop.

### Out of inventory (explicit)

| Candidate | Why out |
|-----------|---------|
| Optional / explicit Store Sync skill | Sync is always-on duty only |
| Dedicated `/tdd` Install skill | Habit via always-on / AGENTS index; `/tdd` stays an existing skill |
| Second always-on rule (e.g. TDD-only) | One rule, three duties |
| Project-local copies of rule or Loop skills | Violates hybrid packaging |
| Wrapper / parallel `architecture-review` skill | Rejected in ticket 06 |
| `/grilling`, `/domain-modeling`, `/codebase-design`, `/tdd` as EM Install drops | Existing skills invoked on demand; not Loop package surfaces |
| Package mirror / refresh cache | Install plumbing, not a Loop behavioral surface |
| Hooks, CI, mechanical Sync enforcement | Deferred past v1 design |

### Rejected alternatives

1. **Optional sync skill** ? duplicates always-on Sync; agents would skip the rule and ?remember to sync later.?
2. **`/tdd` as third Install skill** ? map already wires it as habit; a third skill bloated the closed set without a distinct Install job.
3. **Split always-on rules** (Sync vs Bias vs TDD) ? three always-on surfaces compete for attention; one rule keeps the Loop cheap to load.
4. **Project-local Loop rule/skills** ? breaks ?one global Loop, many project Stores?; upgrades would fork per repo.
5. **Install only ?ensures present?** (no refresh duty) ? leaves globals stale; sole-updater + refresh is the inventory duty (replace-always mechanics locked in ticket 08).
6. **Explore as Install drop** ? Cursor-provided invoke target; shipping a fake Explore skill confuses discovery.

Detail: [spec.md § Product & packaging](../spec.md) / [§ Memory Loop](../spec.md).
