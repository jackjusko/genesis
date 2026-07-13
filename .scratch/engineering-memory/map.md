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
  - Architecture Corpus: one primary doc + liberal deep-dives when earned; scaffold may include empty deep-dive folder.
  - Store Sync: session bookends + same-batch update on structural change.
  - Architecture Review triggers: milestone/phase boundaries + friction; manual invoke allowed.
  - Memory Install: full scaffold; hybrid packaging (global Loop, local Store).
  - Architecture Bias: soft deep-module defaults + agent-authored conventions; prefer expand-over-hacky; ordinary stretch = same-batch Store write; plan-sized = pause, three-mode chooser (Automatic / Critical only default / Full grill), plan outside Store, then Store fold-back + implement.
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
- [How does Memory Install merge into an existing repo?](issues/05-install-merge-semantics.md) — Preflight; fail on conflict (write nothing) + offer AI merge; ours=skip; CONTEXT/architecture/conventions/AGENTS section rules; non-canonical arch docs warn only.
- [How is Architecture Review packaged?](issues/06-architecture-review-packaging.md) — Evolve `/improve-codebase-architecture` in place; surface as Architecture Review; temp HTML; Explore subagent kept; mandatory Store fold-back when decisions crystallize.
- [What is the Loop artifact inventory?](issues/07-loop-artifact-inventory.md) — Closed Loop set: project `## Engineering Memory` index; global `engineering-memory` rule + `memory-install` + Architecture Review; no sync skill; Bias expand + plan-sized three-mode gate.
- [How do global Loop skills update after install?](issues/08-global-skill-updates.md) — Install alone refreshes globals (always replace packaged latest); project Store never auto-upgrades (ours/skip); no globals-only mode; pins/changelogs stay fog.
- [What stub prose does Memory Install drop into conventions.md?](issues/09-conventions-stub-prose.md) — Locked Install prose: Deep modules / Tests & seams / Long-term bias / Skill pointers / empty Project-specific; see prototypes/conventions-md-stub.md.
- [What markers classify an Install path as "ours"?](issues/10-install-ours-markers.md) — Ours = `<!-- engineering-memory:install -->` (first ~20 lines) or AGENTS heading `## Engineering Memory`; no fingerprint heuristics; marker loss → conflict.
- [What stub does Memory Install drop for the AGENTS.md Engineering Memory section?](issues/11-agents-md-section-stub.md) — Index-only stub: Store bullets, rule/skill pointers, planning non-ownership; see prototypes/agents-md-engineering-memory-section.md.
- [What is the exact body of the engineering-memory always-on rule?](issues/12-always-on-rule-body.md) — Locked global rule body: Store Sync / Architecture Bias (ordinary vs plan-sized + three modes) / `/tdd` habit; see prototypes/engineering-memory-always-on-rule.md.
- [How does the plan-sized Architecture Bias gate hand off to planning?](issues/13-plan-sized-architecture-handoff.md) — Stop → mode chooser → Wayfinder outside Store → fold-back then implement; Critical only default; maps never in Store.
- [What stub prose remains for other Memory Install Store drops?](issues/14-remaining-install-stubs.md) — CONTEXT / adr README / architecture dir README stubs locked with Install markers; see prototypes/.

## Not yet specified

_(none — remaining deferred items live in [spec.md § Open questions / deferred](spec.md).)_

## Out of scope

- Implementing or shipping the installable Engineering Memory package (destination is the design/spec only).
- Folding wayfinder/planning trackers into the Memory Store.
- Non-Cursor agent hosts for this effort (Cursor-first design only).
- Mechanical Store Sync enforcement (hooks/CI) for v1 — normative Loop only (deferred in spec).
- Monorepo Memory Store shape for v1.