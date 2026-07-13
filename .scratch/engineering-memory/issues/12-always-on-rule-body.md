# What is the exact body of the engineering-memory always-on rule?

Type: prototype  
Status: resolved  
Parent: [Engineering Memory design](../map.md)  
Blocked by: 07

## Question

Given the three duties (Store Sync, Architecture Bias including ordinary-stretch vs plan-sized + Automatic / Critical only / Full grill, `/tdd` habit) in [What is the Loop artifact inventory?](07-loop-artifact-inventory.md), what exact always-on rule body does Memory Install ensure globally under slug `engineering-memory` — cheap enough to react to before locking the Install drop?

## Answer

**Locked Install drop (user-global):** [prototypes/engineering-memory-always-on-rule.md](../prototypes/engineering-memory-always-on-rule.md) (strip the PROTOTYPE comment; title **Engineering Memory**, slug `engineering-memory`).

**Body shape:**

1. **Store Sync** — load at start; same-batch on structural change; write back before session end; no optional sync skill.
2. **Architecture Bias** — soft deep-module defaults; expand-over-hacky; ordinary stretch vs plan-sized gate with three-mode chooser (Critical only default); plan outside Store; Store fold-back then implement; degrade if Store missing.
3. **`/tdd` habit** — invoke when writing/changing code; detail stays in the skill.

Plan-sized → Wayfinder mechanics detailed in [How does the plan-sized Architecture Bias gate hand off to planning?](13-plan-sized-architecture-handoff.md). Spec § Memory Loop updated.
