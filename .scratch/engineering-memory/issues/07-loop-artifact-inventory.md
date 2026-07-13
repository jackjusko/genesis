# What is the Loop artifact inventory?

Type: grilling  
Status: resolved  
Parent: [Engineering Memory design](../map.md)  
Blocked by: 02, 06

## Question

What are the exact names, locations (user-global vs project), and duties of the AGENTS.md section, always-on rule (Store Sync + Architecture Bias + `/tdd` habit), Memory Install skill, Architecture Review skill, optional sync skill, and any subagents — matching the agreed Cursor surface split?

Note from map: `/tdd` is a habit wired through the always-on rule / AGENTS.md index, not a third Install skill.

## Answer

### Closed set

| Artifact | Name / slug | Location | Duties |
|----------|-------------|----------|--------|
| AGENTS.md section | `## Engineering Memory` | Project | Index only: Store paths to load; pointer to always-on rule (three duties, not pasted); skills Memory Install + Architecture Review; note that wayfinder/planning stays outside the Store. No procedure bodies, conventions prose, or sync checklists. |
| Always-on rule | Title **Engineering Memory**; slug `engineering-memory` | User-global | **Only** (1) Store Sync, (2) Architecture Bias, (3) `/tdd` habit. See below. |
| Memory Install skill | Display **Memory Install**; slug `memory-install` | User-global | Ensure global Loop artifacts present (rule + `memory-install` + Architecture Review skill); full-scaffold project Store + `## Engineering Memory` in AGENTS.md per merge/preflight rules. Not Review, not real architecture prose beyond stubs, not hooks/CI. |
| Architecture Review skill | Display **Architecture Review**; slug `improve-codebase-architecture` (evolve in place) | User-global | Deepening pass per [How is Architecture Review packaged?](06-architecture-review-packaging.md): Store load → Explore walk → temp HTML → grill → Store fold-back. Triggers: milestone/friction/manual. |
| Explore subagent | Cursor Explore | Invoke-only | Used by Architecture Review for the organic walk. Not an Install drop. |

**Out of inventory:** optional / explicit Store Sync skill (Sync is always-on only); dedicated `/tdd` Install skill; any other Loop skills or always-on rules.

### Always-on rule — three duties

1. **Store Sync** — load relevant Store docs at session start; write back material changes before session end; same-batch Store update on structural change.
2. **Architecture Bias** — soft deep-module / clear-seam defaults; conventions + long-term outlook over short-term minimalism; ADRs win on hard overrides. Prefer expanding architecture over hacky fit:
   - **Ordinary stretch:** design extension → implement → write Store same batch (must fit existing corpus + bias).
   - **Plan-sized change:** stop implementing; offer **Automatic** / **Critical only** (default if unset) / **Full grill**; plan outside the Store (Wayfinder or equivalent); on resolve, update Store then implement. Missing Store / never installed → note gap and degrade (don’t invent a greenfield corpus).
3. **`/tdd` habit** — when writing or changing code, use `/tdd`; not a separate Install skill.

Exact AGENTS.md stub prose, always-on rule body text, and plan-sized → Wayfinder handoff mechanics are follow-on tickets.
