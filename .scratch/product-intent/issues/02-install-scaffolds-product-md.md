# 02 — Memory Install scaffolds docs/product.md

**What to build:** Running Memory Install on a clean Cursor repo creates `docs/product.md` with the locked Product Intent section contract and install marker, indexes it from the AGENTS Engineering Memory Store list, and treats the path with the same missing / ours / conflict preflight rules as other Store stubs. Re-running Install on an ours stub skips it; a foreign `docs/product.md` conflicts without writing.

**Blocked by:** 01 — Lock Product Intent in the design corpus

**Status:** resolved

Type: task  
Parent: [Product Intent in Memory Ops](../map.md)

- [x] Install prototype + packaged template for `docs/product.md` exist with fixed H2s: What this is, Vision, Goals, Non-goals, Out of scope for this doc (plus H1/preamble); keep install marker; stub depth matches siblings (`_TODO_` / guidance, not fiction)
- [x] AGENTS Engineering Memory Store index lists `docs/product.md` and the load cue includes product intent (not only structure / domain / conventions)
- [x] Preflight, classify, apply, and related tests include the new Store path; integration install on a temp repo creates the stub
- [x] Prototype↔template sync expectations cover the new drop (same pattern as architecture / conventions)

## Answer

Memory Install scaffolds Product Intent at `docs/product.md` with sibling Store preflight semantics. Commit `66ae69890918c81f1d2a3bbe463838dcfe4cb7da`.
