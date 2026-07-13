# What must the Engineering Memory design/spec contain?

Type: grilling  
Status: claimed  
Parent: [Engineering Memory design](../map.md)

## Question

When this map's destination is met, what document(s) exist, where do they live, and which sections are mandatory so a later implementation effort can execute without re-opening charting decisions?

## Answer

**Primary deliverable:** one design doc at [.scratch/engineering-memory/spec.md](../spec.md). That file is the locked charting handoff. The map and tickets are the route that produced it - not a second design surface implementers must re-walk.

**Supporting docs (not parallel design specs):**

| Doc | Role when destination is met |
|-----|------------------------------|
| Repo-root [CONTEXT.md](../../../CONTEXT.md) | Engineering Memory vocabulary; kept current via domain-modeling as tickets resolve |
| [prototypes/](../prototypes/) | Locked stub/rule bodies linked from the section that owns them |
| [
esearch/](../research/) | Evidence that fed tickets; cite from the owning section; not a second handoff |
| docs/adr/ | Only when a charting decision needs a durable override beyond what the spec already states |

**Mandatory spec.md sections** (nothing else is required as a top-level heading):

1. Product & packaging - Cursor-first, hybrid global Loop / local Store, what ships where
2. Memory Store - closed Store paths, corpus rules, architecture template ownership
3. Memory Loop - closed Loop surfaces and Sync / Bias / /tdd duties
4. Memory Install - full scaffold, preflight/merge, global update path
5. Architecture Review - packaging of improve-codebase-architecture, process, Store fold-back
6. Architecture Bias - soft deep-module defaults, expand-over-hacky, plan-sized gate, Install seed sources
7. Open questions / deferred - explicit fog so implementers do not invent out-of-scope answers

**Why these seven (re-derived):** Destination + map Notes name Store, Loop, Install, Review, and Bias as the product nouns; packaging is the cross-cutting ship shape; deferred is the seal that fog stays fog. Prototypes are assets under those sections, not an eighth section. Bias stays separate from Loop because seed sources and plan-sized handoff are charting content Loop inventory alone does not carry.

**Done when:** every mandatory section is filled enough to implement from (no empty stubs / TBD on charting decisions), and all map tickets are resolved or ruled out of scope. The deferred list may still be non-empty.

**How it stays true during charting:** tickets that decide Product / Store / Loop / Install / Review / Bias content update the matching section in the same session as resolution. Map **Decisions so far** stays a one-line index only. Research that only feeds another ticket may skip a spec edit and link its asset instead.

## Comments

Earlier pass reached the same primary path and seven headings; this pass keeps that shape and tightens supporting-doc roles (CONTEXT, prototypes, research, ADRs) vs. the sole handoff at spec.md.
