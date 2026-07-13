# What stub prose does Memory Install drop into conventions.md?

Type: prototype  
Status: resolved  
Parent: [Engineering Memory design](../map.md)  
Blocked by: 04

## Question

Given the seed sources and cite-vs-paraphrase rules in [Where does Architecture Bias get its defaults?](04-architecture-bias-sources.md), what exact Install stub prose goes in `docs/conventions.md` (sections, paraphrased defaults, skill pointers, empty project-specific heading) — cheap enough to react to before locking the Install drop?

## Answer

**Locked Install drop:** [prototypes/conventions-md-stub.md](../prototypes/conventions-md-stub.md) (strip the PROTOTYPE banner; keep the `<!-- engineering-memory:install -->` marker).

**Shape (matches research):**

1. Purpose line — agent-authored defaults under Architecture Bias; ADRs win on conflict.
2. **Deep modules** — paraphrased `/codebase-design` soft defaults + exact vocabulary.
3. **Tests & seams** — paraphrased Bias bits from `/tdd` (not red→green).
4. **Long-term bias** — thin scalability / honest-failure preferences.
5. **Skill pointers** — table citing procedures; stack packs on demand.
6. Empty **Project-specific** — agents fill when earned.

No stack-pack dumps. Never paste skill bodies. Spec § Architecture Bias updated.
