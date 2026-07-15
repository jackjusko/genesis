# How should Sync/Review fire more often without hooks?

Type: task  
Status: resolved  
Parent: [Engineering Memory design](../map.md)  
Blocked by: 16

## Question

Given thin and rare architecture updates, how do we tighten Store Sync and Architecture Review cadence (plus Done gates) so agents check and update the corpus more often — still normative Loop only, no hooks/CI?

## Answer

Locked against plan "Richer, more frequent architecture memory." Normative gates only; hooks/CI stay deferred.

### Store Sync (always-on)

| Moment | Bar |
|--------|-----|
| Session start | When writing/changing code, **always** load `docs/architecture.md` (+ linked deep-dives) via AGENTS index |
| Same-batch | Broaden: module collaboration, public Interface, package/folder topology, earned deep-dive, convention shift, crystallized product intent |
| Before Done / session end with code changes | **Architecture freshness gate:** corpus must match today’s shape; Install `_TODO_`s with real modules present = not done; fix in-batch or stop for Review if plan-sized |

### Architecture Review triggers

Keep: milestone/phase, friction, manual. **Add:** corpus still Install-stubbed while real structure exists; agent cannot answer a structure question from the Store; after auto-build / major Destination completion when architecture drifted. Still not every-N-sessions calendar.

### Auto-build / drain

Thin architecture freshness gate before Done / empty-frontier (point at always-on Sync; do not paste playbook).

Prototype: [engineering-memory-always-on-rule.md](../prototypes/engineering-memory-always-on-rule.md). Skills: `improve-codebase-architecture`, `auto-build`, `drain-tickets`. Spec Memory Loop / Architecture Review / Open questions updated same session.
