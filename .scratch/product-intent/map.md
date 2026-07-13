# Product Intent in Memory Ops

Labels: `wayfinder:map`

## Destination

Engineering Memory’s Memory Store and Loop also keep durable **project identity, vision, and goals** (Product Intent) current — not only architecture/coding/design truth. Raw ideas stay in planning until they crystallize.

## Notes

- Parent design: Engineering Memory (`.scratch/engineering-memory/spec.md`). This effort is a post-lock Store extension.
- Chosen shape: one Install-scaffolded Store doc `docs/product.md`; ideas remain in `.scratch/` until fold-back.
- No new skill in v1 — capture is Store Sync + fold-back only.
- Work frontier tickets in order; use `/implement` one at a time.

## Decisions so far

- [Lock Product Intent in the design corpus](issues/01-lock-product-intent-design.md) — design locked: closed Store includes `docs/product.md` (identity / vision / goals / non-goals) as an Install full-scaffold drop; ideas / PRDs / wayfinder maps stay planning-layer until fold-back; no vision-in-glossary; no auto-invented goals. (Ticket status left for orchestrator.)
- [Memory Install scaffolds docs/product.md](issues/02-install-scaffolds-product-md.md) — next frontier once 01 is resolved; blocked by 01
- [Loop syncs and folds product intent](issues/03-loop-syncs-folds-product-intent.md) — blocked by 02

## Out of scope

- Folding wayfinder maps / idea trackers into the Store
- Putting vision into `CONTEXT.md`
- Auto-writing goals the user never stated
- Packaging `wayfinder` or `write-milestone-brief` into Engineering Memory
