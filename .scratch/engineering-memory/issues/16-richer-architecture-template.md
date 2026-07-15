# How much richer should the primary architecture template be?

Type: prototype  
Status: resolved  
Parent: [Engineering Memory design](../map.md)  
Blocked by:

## Question

Given dissatisfaction with thin architecture memory, how do we amend the primary `docs/architecture.md` template (same four H2s) so Install stubs and Sync writes demand slightly richer content and earlier deep-dives — without adding H2s or past-skim primary docs?

## Answer

Locked against plan "Richer, more frequent architecture memory." Same four H2 merge contract; richer required content inside sections; lower deep-dive earn bar.

**Rejected alternatives:**

1. **New H2s** (`## Constraints`, `## Main flows`). Rejected: ticket 03 merge contract; empty H2s tempt invention.
2. **Heavy checklist primary.** Rejected: past-skim; depth stays in earned deep-dives.
3. **Leave stub depth unchanged.** Rejected: agents leave `_TODO_`s after real structure exists.

**Locked amendments** (prototype: [architecture-md-template.md](../prototypes/architecture-md-template.md)):

| Section | Change |
|---------|--------|
| How-to-use | Keep write-today + prefer deep-dive past skim; add: after real structure exists, leaving Install `_TODO_`s is a Sync failure |
| System shape | Topology **plus** main request/data flows and named entrypoints (still short) |
| Key seams | **Every** top-level seam (not a “handful”); keep Interface / varies recipe |
| Deep-dives | Earn when subsystem needs >1 hop, was touched across sessions, or would bloat Key seams; never pre-seed |

Packaged twin: `skills/memory-install/templates/docs/architecture.md`. Spec Memory Store § + CONTEXT Architecture Corpus updated same session.
