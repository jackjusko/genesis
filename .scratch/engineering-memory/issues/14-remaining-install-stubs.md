# What stub prose remains for other Memory Install Store drops?

Type: prototype  
Status: resolved  
Parent: [Engineering Memory design](../map.md)  
Blocked by: 02, 10

## Question

What exact Install stub prose (with ours markers) goes in `CONTEXT.md` (when missing), `docs/adr/README.md` (when the ADR folder is new), and `docs/architecture/README.md` (deep-dive pointer) — completing the full-scaffold Store drops?

## Answer

Locked Install drops (keep `<!-- engineering-memory:install -->`; strip PROTOTYPE comments):

| Path | Prototype |
|------|-----------|
| `CONTEXT.md` (create only if missing) | [prototypes/context-md-stub.md](../prototypes/context-md-stub.md) — thin domain glossary shell; empty Language; no product-specific terms |
| `docs/adr/README.md` (when folder new / file missing) | [prototypes/adr-readme-stub.md](../prototypes/adr-readme-stub.md) — ADR purpose + naming; no sample ADRs |
| `docs/architecture/README.md` | [prototypes/architecture-dir-readme-stub.md](../prototypes/architecture-dir-readme-stub.md) — pointer only; deep-dives earned later |

Together with architecture.md, conventions.md, and AGENTS section stubs already locked, this completes full-scaffold Store + index prose. Spec § Memory Store updated.
