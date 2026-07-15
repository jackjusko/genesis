# What is the exact body of the engineering-memory always-on rule?

Type: prototype  
Status: resolved  
Parent: [Engineering Memory design](../map.md)  
Blocked by: 07

## Question

Given the four duties (Store Sync, Architecture Bias including ordinary-stretch vs plan-sized + Automatic / Critical only / Full grill, `/tdd` habit, Prove-it) in [What is the Loop artifact inventory?](07-loop-artifact-inventory.md), what exact always-on rule body does Memory Install ensure globally under slug `engineering-memory` -- cheap enough to react to before locking the Install drop?

## Prior answer (earlier pass -- re-resolve; do not rubber-stamp)

**Locked Install drop (user-global):** [prototypes/engineering-memory-always-on-rule.md](../prototypes/engineering-memory-always-on-rule.md) (strip the PROTOTYPE comment; title **Engineering Memory**, slug `engineering-memory`).

**Body shape:**

1. **Store Sync** -- load at start (always architecture when coding); broader same-batch; architecture freshness before Done; write back before session end; no optional sync skill.
2. **Architecture Bias** -- soft deep-module defaults; expand-over-hacky; ordinary stretch vs plan-sized gate with three-mode chooser (Critical only default); plan outside Store; Store fold-back then implement; degrade if Store missing.
3. **`/tdd` habit** -- invoke when writing/changing code; detail stays in the skill.
4. **Prove-it** -- cardinal sin opener + handoff + runtime smoke + Spec fidelity + fix-loop (see Answer body-shape table).

Plan-sized -> Wayfinder mechanics detailed in [How does the plan-sized Architecture Bias gate hand off to planning?](13-plan-sized-architecture-handoff.md). Spec section Memory Loop updated.

## Answer

Re-resolved against closed Loop duties (ticket 07), AGENTS index-only stub (ticket 11), Architecture Bias vocabulary (CONTEXT), and the "cheap enough to react" bar. Compared four shapes; locked one. Status left `claimed` for parent resolve.

**Rejected alternatives:**

1. **Ultra-thin three-bullet rule** (duties named, no ordinary/plan-sized gate). Rejected: ticket 07 / CONTEXT require Bias duties named -- expand-over-hacky, ordinary vs plan-sized, three-mode chooser with Critical only default, plan outside Store, fold-back then implement, degrade if Store missing.
2. **Embed full plan-sized -> Wayfinder handoff** (Destination charting, inline fallback, fold-back target table, map retention) inside the always-on body. Rejected: always-on must stay skim-cheap; ticket 13 owns exact handoff. Pointer only.
3. **Inline canonical Store path list** in Sync (duplicate of AGENTS / ticket 02). Rejected: drifts from the project index; Sync loads **via** `## Engineering Memory` AGENTS.md.
4. **Omit `.mdc` frontmatter from the locked body.** Rejected: Install destination is `~/.cursor/rules/engineering-memory.mdc` with `alwaysApply: true`; exact body includes frontmatter.

**Locked Install drop:** [prototypes/engineering-memory-always-on-rule.md](../prototypes/engineering-memory-always-on-rule.md). Strip the PROTOTYPE comment only. Title **Engineering Memory**; slug `engineering-memory`.

**Body shape (order fixed):**

| Piece | Form | Content |
|-------|------|---------|
| Frontmatter | YAML | `description` + `alwaysApply: true` |
| H1 | exact `# Engineering Memory` | Apply-when cue (code / structure / domain / conventions) |
| Store Sync | exact `## 1. Store Sync` | Session start via AGENTS index; always load architecture when coding; broader same-batch (collab/Interface/topology/structural); architecture freshness gate before Done; session-end write-back; no optional sync skill |
| Architecture Bias | exact `## 2. Architecture Bias` | Soft deep-module defaults + conventions; ADRs win; degrade if Store missing; expand-over-hacky |
| Ordinary stretch | exact `### Ordinary stretch` | Design -> implement -> Store same batch |
| Plan-sized change | exact `### Plan-sized change` | Definition; stop (unless user overrides); Automatic / Critical only (default) / Full grill; plan outside Store; Store update then implement; handoff pointer to ticket 13 / spec -- no pasted mechanics |
| `/tdd` habit | exact H2 `## 3.` + `/tdd` habit (code span) | Invoke when writing/changing code; procedure stays in `/tdd`; standing prefs in `docs/conventions.md` |
| Prove-it | exact `## 4. Prove-it` + opener + pointer to `/prove-it` + `### Handoff` + `### Runtime smoke` + `### Spec fidelity` | Cardinal sin against hollow/unfinished shipping; handoff; all Destination-named paths + vision; Spec fidelity + experience bar beyond bare Spec; fix-loop (gap report last resort); playbook in packaged `prove-it` skill |
| Subagents | exact `## 5. Subagents` | Fresh subagent for bounded Loop work; pointer to project policy |

Detail: [spec.md section Memory Loop](../spec.md).
