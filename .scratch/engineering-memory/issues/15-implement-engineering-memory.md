# Implement Engineering Memory from the locked design

Status: resolved  
Parent: [Engineering Memory design](../map.md) (design complete ? tickets 01?14 re-resolved)

## Spec

Implement and ship Cursor **Engineering Memory** from the locked design:

- Spec: [../spec.md](../spec.md)
- Domain: [`CONTEXT.md`](../../../CONTEXT.md) at repo root
- Install prototypes (strip PROTOTYPE banners; keep `<!-- engineering-memory:install -->` where marked): [../prototypes/](../prototypes/)

## Scope

Deliver the hybrid package described in the spec:

1. **User-global Loop** ? always-on rule `engineering-memory`, skill `memory-install`, Architecture Review via evolving `improve-codebase-architecture` in place. ?
2. **Project-local Store scaffold** ? full Install drop + AGENTS.md `## Engineering Memory` section per merge/preflight/ours-marker rules. ?
3. **Behaviors** ? Store Sync, Architecture Bias (ordinary stretch + plan-sized Wayfinder handoff), `/tdd` habit wiring as specified. ?

## Out of scope (leave deferred)

Items listed in spec § Open questions / deferred (hooks/CI enforcement, monorepo Store, Loop evaluation harness, version pins/changelogs, active-effort pointers).

## Done when

An agent (or human) can run Memory Install on a brownfield Cursor repo and get a working Store + Loop per the spec, with idempotent re-runs and global refresh behavior as specified. ?

## Answer

Re-synced package to re-locked design (01?14): pointer-only always-on rule (Sync via AGENTS index; plan-sized ? ticket 13), all Install templates matched to prototypes, Architecture Review fold-back per ticket 06. `npm test` 42/42. Commit `8572092`.
