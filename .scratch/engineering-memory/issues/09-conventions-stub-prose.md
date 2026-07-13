# What stub prose does Memory Install drop into conventions.md?

Type: prototype  
Status: resolved  
Parent: [Engineering Memory design](../map.md)  
Blocked by: 04

## Question

Given the seed sources and cite-vs-paraphrase rules in [Where does Architecture Bias get its defaults?](04-architecture-bias-sources.md), what exact Install stub prose goes in `docs/conventions.md` (sections, paraphrased defaults, skill pointers, empty project-specific heading) -- cheap enough to react to before locking the Install drop?

## Prior answer (earlier pass -- re-resolve; do not rubber-stamp)
**Locked Install drop:** [prototypes/conventions-md-stub.md](../prototypes/conventions-md-stub.md) (strip the PROTOTYPE banner; keep the `<!-- engineering-memory:install -->` marker).

**Shape (matches research):**

1. Purpose line -- agent-authored defaults under Architecture Bias; ADRs win on conflict.
2. **Deep modules** -- paraphrased `/codebase-design` soft defaults + exact vocabulary.
3. **Tests & seams** -- paraphrased Bias bits from `/tdd` (not red->green).
4. **Long-term bias** -- thin scalability / honest-failure preferences.
5. **Skill pointers** -- table citing procedures; stack packs on demand.
6. Empty **Project-specific** -- agents fill when earned.

No stack-pack dumps. Never paste skill bodies. Spec section Architecture Bias updated.

## Answer

Re-resolved against ticket 04 / [research/architecture-bias-sources.md](../research/architecture-bias-sources.md) (source split + Designing for testability attribution), ticket 05 merge ("add missing seed sections only"), and skill bodies (`/codebase-design`, `/tdd`). Compared three shapes; locked one.

**Rejected alternatives:**

1. **Attribute inject-deps / return-results to `/tdd`** (prior stub framing). Rejected: ticket 04 correction -- those are `/codebase-design` Designing for testability; `/tdd` only contributes behaviour-through-interfaces, tests-at-seams, survive-refactors.
2. **Stack-pack Install dump** -- paste `/api-design` / React / observability catalogs into the generic stub. Rejected by ticket 04: cite on demand; paraphrase into Project-specific only when the stack earns it.
3. **Duplicate "interface is the test surface"** under both Deep modules and Tests & seams. Rejected: research overlap note -- list once under Tests & seams with the other design/test meeting prefs.

**Locked Install drop:** [prototypes/conventions-md-stub.md](../prototypes/conventions-md-stub.md). Keep `<!-- engineering-memory:install -->` (first line; ticket 10 still owns formal ours-marker rules -- handoff); strip the PROTOTYPE comment only.

**Structure (order fixed; H2 titles = merge contract):**

| Piece | Form | Content at Install |
|-------|------|--------------------|
| Purpose | H1 `# Conventions` + preamble (not an H2) | Filled: agent-authored Bias defaults; ADRs win; humans need not fill; Project-specific grows when earned |
| Deep modules | exact H2 `## Deep modules` | Paraphrase `/codebase-design`: deep modules + exact vocabulary + depth-as-leverage + deletion test + one/two adapters; cite skill for workflows |
| Tests & seams | exact H2 `## Tests & seams` | `/codebase-design` Designing for testability (interface = test surface; accept deps; return results) **plus** `/tdd` standing prefs (agreed seams; survive refactors); **not** red->green / seam-confirmation / anti-patterns |
| Long-term bias | exact H2 `## Long-term bias` | Thin: evolvable seams; honest failure signals; prefer depth over shallow pass-throughs |
| Skill pointers | exact H2 `## Skill pointers` | Table: `/codebase-design`, `/tdd`, Architecture Review, stack packs on demand |
| Project-specific | exact H2 `## Project-specific` | Empty aside from guidance HTML comment -- agents fill when earned |

Those five H2 titles are the **required-section merge contract** (ticket 05: add missing only; preserve existing conventions). Purpose is preamble under H1 -- not a separate merge heading.

**Cite vs paraphrase:** standing prefs only; never paste skill bodies. No books in the stub.

Detail: [spec.md section Architecture Bias](../spec.md).