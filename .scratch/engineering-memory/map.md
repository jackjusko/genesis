# Engineering Memory design

Labels: `wayfinder:map`

## Destination

A written design/spec for **Cursor Engineering Memory** — Memory Store + Memory Loop, full-scaffold Memory Install (hybrid: user-global Loop skills/rules + project-local Store), Architecture Review packaged from improve-codebase-architecture — ready for a later implementation effort. Not the shipped package itself.

**Handoff:** Design destination met. Implementation is [Implement Engineering Memory from the locked design](issues/15-implement-engineering-memory.md) (`ready-for-agent`).

## Notes

- Domain: `CONTEXT.md` at repo root (Engineering Memory vocabulary). Keep it current via `/domain-modeling` as tickets resolve.
- Skills every session should know: `/grilling`, `/domain-modeling`, `/codebase-design`, `/tdd` (Loop habit, not a separate Install skill), `/improve-codebase-architecture` (to be packaged as Architecture Review).
- Standing preferences from charting (do not re-litigate without cause):
  - Destination is design/spec only (implementation is a later effort).
  - Memory Store extends `CONTEXT.md` + ADRs + Architecture Corpus (not a parallel brain).
  - Architecture Corpus: one primary doc (topology + flows + entrypoints; every top-level seam) + deep-dives earned early when multi-hop / cross-session / would bloat Key seams; leftover `_TODO_`s after real structure = Sync failure.
  - Store Sync: session bookends + always load architecture when coding + broader same-batch + architecture freshness Done gate.
  - Architecture Review triggers: milestone/phase + friction + stub corpus / Store-blind / post-Destination drift; manual invoke allowed.
  - Memory Install: full scaffold; hybrid packaging (global Loop, local Store).
  - Architecture Bias: soft deep-module defaults + agent-authored conventions; prefer expand-over-hacky; ordinary stretch = same-batch Store write; plan-sized = pause, three-mode chooser (Automatic / Critical only default / Full grill), Wayfinder Destination=arch decision outside Store, Review-aligned fold-back then implement (Automatic never skips fold-back).
  - `/tdd` is a Memory Loop habit (use when writing/changing code), wired via always-on rule / AGENTS.md — not its own Install skill surface; also a Bias/conventions seed source. Built from existing skills + organic practice, not a parallel test framework.
  - Wayfinder/planning stay separate from the Memory Store.
  - Loop surfaces: project `## Engineering Memory` AGENTS.md index; user-global always-on rule `engineering-memory` (Store Sync + Architecture Bias + TDD habit); user-global skills `memory-install` + Architecture Review (`improve-codebase-architecture`); no optional sync skill; Explore subagent invoke-only for Review.
  - Spec deliverable: one doc at `.scratch/engineering-memory/spec.md`; tickets that decide design update the matching section in the same session; map Decisions-so-far is index-only.
- Plan, don't implement, unless a ticket’s Notes say otherwise.

## Decisions so far

- [What must the Engineering Memory design/spec contain?](issues/01-spec-deliverable-shape.md) — Sole handoff: `.scratch/engineering-memory/spec.md` with seven mandatory sections; CONTEXT/prototypes/research/ADRs support; fill same-session as tickets; done when implementable + map clear.
- [What is the Memory Store scaffold layout?](issues/02-store-scaffold-layout.md) — Closed Store: `CONTEXT.md`, `docs/adr/`, `docs/architecture.md`, `docs/architecture/`, `docs/conventions.md`; Install files = those plus adr/architecture READMEs; deep-dives kebab-case when earned; AGENTS section not Store.
- [What is the primary architecture doc template?](issues/03-architecture-doc-template.md) — Skim-map `docs/architecture.md`: H1 preamble + H2s System shape / Key seams / Deep-dives / Out of scope (merge contract); `_TODO_`+guidance not fiction; deep-dive table replaces "none yet" when earned.
- [Where does Architecture Bias get its defaults?](issues/04-architecture-bias-sources.md) — Seed from `/codebase-design` (deep modules + Designing for testability paraphrase) + `/tdd` split (habit ritual vs standing test prefs) + thin long-term prefs; stack packs cite-only until earned; never paste skills into conventions.
- [How does Memory Install merge into an existing repo?](issues/05-install-merge-semantics.md) — Atomic preflight (missing/ours/conflict); fail-closed + offer AI merge; AGENTS without section = missing append; dirs/ADRs/deep-dives never conflicts; non-canonical arch warn only; ours markers → ticket 10.
- [How is Architecture Review packaged?](issues/06-architecture-review-packaging.md) — Evolve in place; display Architecture Review; slug locked `improve-codebase-architecture`; temp HTML; Explore walk; Store fold-back when decisions crystallize.
- [What is the Loop artifact inventory?](issues/07-loop-artifact-inventory.md) — Closed Loop: project AGENTS index; global `engineering-memory` rule (Sync + Bias + `/tdd` + Prove-it) + `memory-install` (sole updater) + Architecture Review; Explore invoke-only; no sync/`tdd` Install skills.
- [How do global Loop skills update after install?](issues/08-global-skill-updates.md) — Install alone: globals-first always-replace from package root, then project preflight; Store/AGENTS never auto-upgrade (ours/skip); no globals-only; pins stay fog.
- [What stub prose does Memory Install drop into conventions.md?](issues/09-conventions-stub-prose.md) — Install stub: Bias purpose + Deep modules (/codebase-design) + Tests & seams (design-for-testability + /tdd prefs, not ritual) + Long-term bias + Skill pointers + empty Project-specific; marker kept; see prototypes/conventions-md-stub.md.
- [What markers classify an Install path as "ours"?](issues/10-install-ours-markers.md) — Ours = exact `<!-- engineering-memory:install -->` in first 20 lines (trim/BOM) or AGENTS line `## Engineering Memory`; dirs by existence; no fingerprints; marker loss → conflict.
- [What stub does Memory Install drop for the AGENTS.md Engineering Memory section?](issues/11-agents-md-section-stub.md) — Index-only stub: Store paths (02 order) + Loop rule/skills + Planning non-ownership; heading is ours marker; see prototypes/agents-md-engineering-memory-section.md.
- [What is the exact body of the engineering-memory always-on rule?](issues/12-always-on-rule-body.md) — Locked `.mdc` body: Sync via AGENTS index; Bias (ordinary vs plan-sized + three modes, handoff deferred to 13); `/tdd` habit; see prototypes/engineering-memory-always-on-rule.md.
- [How does the plan-sized Architecture Bias gate hand off to planning?](issues/13-plan-sized-architecture-handoff.md) — Stop → three-mode chooser (Critical only default) → Wayfinder Destination=arch decision outside Store → Review-aligned fold-back (offer ADR) then implement; Automatic never skips fold-back; resume=map path.
- [What stub prose remains for other Memory Install Store drops?](issues/14-remaining-install-stubs.md) — CONTEXT (Domain + empty Language), adr README (thin ADR + naming), architecture/README (pointer only); markers kept; see prototypes/.
- [How much richer should the primary architecture template be?](issues/16-richer-architecture-template.md) — Same four H2s; System shape = topology+flows+entrypoints; Key seams = every top-level; lower deep-dive earn bar; leftover `_TODO_`s after real structure = Sync failure.
- [How should Sync/Review fire more often without hooks?](issues/17-sync-review-cadence-gate.md) — Always-load architecture when coding; broader same-batch; architecture freshness Done gate; Review adds stub/Store-blind/post-Destination triggers; thin auto-build/drain gate; no hooks/CI.

## Not yet specified

_(none — remaining deferred items live in [spec.md § Open questions / deferred](spec.md).)_

## Out of scope

- Implementing or shipping the installable Engineering Memory package (destination is the design/spec only).
- Folding wayfinder/planning trackers into the Memory Store.
- Non-Cursor agent hosts for this effort (Cursor-first design only).
- Mechanical Store Sync enforcement (hooks/CI) for v1 — normative Loop only (deferred in spec).
- Monorepo Memory Store shape for v1.