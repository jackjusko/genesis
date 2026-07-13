# What must the Engineering Memory design/spec contain?

Type: grilling  
Status: resolved  
Parent: [Engineering Memory design](../map.md)

## Question

When this map’s destination is met, what document(s) exist, where do they live, and which sections are mandatory so a later implementation effort can execute without re-opening charting decisions?

## Answer

**Deliverable:** One primary design doc at [`.scratch/engineering-memory/spec.md`](../spec.md). ADRs under `docs/adr/` only when a charting decision needs a durable record beyond the spec.

**Mandatory sections** (nothing else is required):

1. Product & packaging
2. Memory Store
3. Memory Loop
4. Memory Install
5. Architecture Review
6. Architecture Bias
7. Open questions / deferred

**Done when:** Every mandatory section is filled enough to implement from (no empty stubs / TBD on charting decisions), and all map tickets are resolved or ruled out of scope.

**How it stays true:** Tickets that decide Store / Loop / Install / Review / Bias content update the matching section in the same session as resolution. Decisions-so-far on the map stays a one-line index only. Research that only feeds another ticket may skip a spec edit and link its asset instead.

Skeleton created with those section headings so later tickets have a place to write.
