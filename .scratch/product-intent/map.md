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

- [Lock Product Intent in the design corpus](issues/01-lock-product-intent-design.md) — resolved (`9440146`): closed Store includes `docs/product.md` (identity / vision / goals / non-goals) as an Install full-scaffold drop; ideas / PRDs / wayfinder maps stay planning-layer until fold-back; no vision-in-glossary; no auto-invented goals.
- [Memory Install scaffolds docs/product.md](issues/02-install-scaffolds-product-md.md) — resolved (`66ae698`): Install prototype/template, AGENTS index + load cue, preflight/classify/apply/integration + prototype sync.
- [Loop syncs and folds product intent](issues/03-loop-syncs-folds-product-intent.md) — resolved (`1d78bee`): always-on Store Sync, Architecture Review fold-back row, plan-sized Bias Destination for what/why; no new skill.

## Out of scope

- Folding wayfinder maps / idea trackers into the Store
- Putting vision into `CONTEXT.md`
- Auto-writing goals the user never stated
- Packaging `wayfinder` or `write-milestone-brief` into Engineering Memory
