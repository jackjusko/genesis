# Where does Architecture Bias get its defaults?

Type: research  
Status: claimed  
Parent: [Engineering Memory design](../map.md)

## Question

What high-trust sources and local skills (e.g. codebase-design, deep-module vocabulary, `/tdd`, other best-practice packs) should seed agent-authored conventions under Architecture Bias ? scalability and long-term outlook preferred ? and what should be cited vs paraphrased into the conventions stub?

Note from map: `/tdd` is a Loop habit and Bias seed ? research should say how its seam/red?green rules land in conventions vs stay as ?invoke the skill.?

## Prior answer (earlier pass ? re-resolve; do not rubber-stamp)

**Sources (priority):**

1. **`/codebase-design`** ? primary Bias spine. Paraphrase soft deep-module defaults + vocabulary into the Install conventions stub; cite the skill for deepening workflows.
2. **`/tdd`** ? split: red?green / seam-confirmation / anti-pattern detail stay as **invoke the habit**; behaviour-through-interfaces, test-at-seams, inject dependencies paraphrase into conventions.
3. **Light long-term preferences** (evolvable seams, honest failure signals, prefer depth over shallow pass-throughs) ? paraphrase thinly into the stub.
4. **Stack packs** (`/api-design`, `/observability`, `/react-best-practices`, web/a11y audits) ? cite on demand; paraphrase into *project* conventions only when the stack earns it. Not in the generic Install dump.
5. **`/design-an-interface`**, Architecture Review ? workflows, not stub seeds. External books only via the skills that already encode them (`/codebase-design` wins over Ousterhout where they diverge).

**Cite vs paraphrase:** conventions hold standing preferences agents apply without a skill invoke; skills hold procedures and catalogs. Never paste a whole skill into `docs/conventions.md`.

Full write-up: [research/architecture-bias-sources.md](../research/architecture-bias-sources.md). Spec § Architecture Bias updated.

## Answer

**Sources (priority), re-resolved against skill bodies:**

1. **`/codebase-design`** ? primary Bias spine. Paraphrase soft deep-module defaults + vocabulary **and** Designing for testability (accept dependencies; return results; interface is the test surface) into the Install stub. Cite the skill for deepening / design-it-twice workflows. *(Correction vs prior: inject-deps / return-results are this skill, not `/tdd`.)*
2. **`/tdd`** ? split: red?green, vertical slices, seam-confirmation procedure, and anti-pattern detail stay as **invoke the habit** (always-on rule); paraphrase only standing prefs ? behaviour-through-interfaces, tests at agreed seams, tests that survive refactors.
3. **Light long-term preferences** (evolvable seams; honest failure / readable decision signals; prefer depth over shallow pass-throughs) ? paraphrase thinly into the stub. Full observability instrumentation stays cite-on-demand via `/observability`.
4. **Stack packs** (`/api-design`, `/observability`, `/react-best-practices`, web/a11y audits) ? cite on demand; paraphrase into *project* conventions only when the stack earns it. Not in the generic Install dump.
5. **`/design-an-interface`**, Architecture Review ? workflows that update or explore design, not Install stub seeds. External books only via the skills that encode them (`/codebase-design` wins over Ousterhout where they diverge).

**Cite vs paraphrase:** conventions hold standing preferences agents apply without a skill invoke; skills hold procedures and catalogs. Never paste a whole skill into `docs/conventions.md`.

Full write-up: [research/architecture-bias-sources.md](../research/architecture-bias-sources.md). Spec § Architecture Bias updated.
