# Architecture Bias — seed sources

Research for [Where does Architecture Bias get its defaults?](../issues/04-architecture-bias-sources.md).

Re-resolved against primary skill bodies (`~/.agents/skills/codebase-design`, `tdd`, `observability`, `api-design`, `design-an-interface`, `react-best-practices`) and project Lock (`CONTEXT.md` Architecture Bias; [prototypes/conventions-md-stub.md](../prototypes/conventions-md-stub.md); always-on rule § `/tdd` habit). Earlier pass treated inject-deps / return-results as `/tdd` paraphrase — **corrected** below to `/codebase-design` Designing for testability.

## What Bias is seeding

Per `CONTEXT.md`, Architecture Bias is soft deep-module defaults plus **agent-authored** conventions aimed at best practices, scalability, and long-term outlook. Humans need not fill `docs/conventions.md` for Bias to operate; ADRs still record hard overrides.

Two layers:

| Layer | Where it lives | Who fills it |
|-------|----------------|--------------|
| Soft defaults (always on) | Always-on Loop rule + Install stub in `docs/conventions.md` | Memory Install (paraphrased seed) |
| Project conventions (earned) | Growing `docs/conventions.md` (+ ADRs when hard) | Agents under Bias during Store Sync / Architecture Review |

This research names **what seeds the Install stub and the Bias rule**, not the full earned corpus of a mature repo.

## Cite vs paraphrase

**Paraphrase into the conventions stub** when the rule is:

- Stack-agnostic (or true for almost every Cursor repo)
- Durable enough to apply *without* invoking a skill
- Short enough to stay in an always-on / skim surface
- Aimed at scalability or long-term outlook (extra work OK)

**Cite (pointer only)** when the material is:

- A procedure / interview loop / red→green ritual
- A long catalog (dozens of rules)
- Stack-specific (React, HTTP APIs, observability for daemons, etc.)
- A HITL design session (design-it-twice, grilling)

Rule of thumb: conventions hold *standing preferences*; skills hold *how to do the work when triggered*. Never paste a whole skill into `docs/conventions.md`.

## Primary seeds (Install stub + Bias rule)

### 1. `/codebase-design` — paraphrase (core Bias spine)

Canonical deep-module vocabulary and soft defaults. Also owns **Designing for testability** (accept dependencies / return results / interface as test surface) — those standing preferences land in the stub’s Tests & seams section, but their **source skill is codebase-design**, not `/tdd`.

**Paraphrase** (not copy the glossary essays):

- Prefer **deep modules**: lots of behaviour behind a small **interface**, at a deliberate **seam**.
- Use the vocabulary exactly: module, interface, depth, seam, adapter, leverage, locality — not “service / API / boundary” as substitutes.
- Depth is leverage at the interface, not “implementation lines ÷ interface lines” (rejected Ousterhout framing — the skill is source of truth, not the book).
- Deletion test: if deleting the module just moves complexity to callers, it was earning its keep.
- One adapter = hypothetical seam; two adapters = real seam — don’t invent ports for fashion.
- Interface is the test surface; callers and tests cross the same seam.
- Accept dependencies; don’t create them inside the unit under test.
- Prefer returning results over hidden side effects where practical.

**Cite**: `/codebase-design` (and its DEEPENING / DESIGN-IT-TWICE companions) when deepening or redesigning a module — don’t duplicate those workflows in conventions.

### 2. `/tdd` — split (habit invoke vs Bias paraphrase)

Map Notes fix `/tdd` as a Loop habit *and* a Bias seed. Always-on rule already points procedure at the skill and standing prefs at `docs/conventions.md`. Split:

| Lands in | Content | Why |
|----------|---------|-----|
| **Always-on habit** (“invoke `/tdd` when writing or changing code”) | Red → green; one vertical slice at a time; confirm seams with the user **before** writing tests; anti-pattern checklist (implementation-coupled, tautological, horizontal slicing); mock/framework detail | Procedure and catalogs — must stay “invoke the skill” |
| **Conventions paraphrase (Bias)** | Tests verify behaviour through public interfaces, not internals; tests live at agreed seams; prefer tests that survive internal refactors | Standing preferences agents can apply without opening the skill body |

Do **not** paraphrase into conventions: the red→green ritual, “ask the user to confirm seams” as a session procedure, mock catalogs, framework detection, or the full anti-pattern essay.

**Overlap note:** “interface is the test surface” / testability-at-seam design also appears in `/codebase-design`. Stub may list them once under Tests & seams; research attributes design principles to codebase-design and the habit/ritual to `/tdd`.

### 3. Long-term / scalability preferences — paraphrase lightly

Thin standing preferences that match Bias’s “extra work OK” stance — not whole skills:

- Prefer evolvable seams over short-term call-site convenience when a change is structural.
- Prefer honest failure and readable decision signals over silent catch-and-continue (agent-first debugging stance; full instrumentation procedure stays in `/observability`).
- Prefer fewer, deeper modules over many shallow pass-throughs when both are options.

These may later be sharpened by project ADRs; the stub only plants the bias.

## Conditional / on-demand seeds (cite; paraphrase only when stack matches)

Agents under Bias may **later** paraphrase into *this project’s* conventions when the stack earns it. Install stub does **not** dump these catalogs.

| Source | Role | Install stub |
|--------|------|--------------|
| `/api-design` | HTTP/GraphQL evolvability, honest status codes, pagination | Cite when the repo has/is adding a public or service HTTP surface |
| `/observability` | Decision logs, persisted failure state, health surfaces | Cite when building long-running / unattended subsystems; thin “honest failure” already in Long-term bias |
| `/react-best-practices` (Vercel) | Perf rule catalog (waterfalls, bundle, etc.) | Cite for React/Next repos; never paste 57 rules into stub |
| `/best-practices`, `/core-web-vitals`, `/web-design-guidelines`, a11y packs | Stack or audit catalogs | Cite on demand; not generic Memory Install seed |
| `/design-an-interface` | HITL “design it twice” session | Cite only — never conventions |
| `/improve-codebase-architecture` → Architecture Review | Loop workflow that *updates* the Store | Not a conventions seed; packaging is a separate ticket |

## External literature

Treat published sources as **background the skills already encode**, not parallel Install inputs:

- Ousterhout *A Philosophy of Software Design* — deep modules; **follow `/codebase-design` where it diverges** (depth-as-leverage, not line-count ratio).
- Feathers *Working Effectively with Legacy Code* — seam language; already in `/codebase-design`.
- Vercel React Best Practices — via `/react-best-practices` when stack matches.

Do not cite books in the Install stub; cite the skills.

## Recommended Install stub shape (locked by ticket 09)

`docs/conventions.md` after Install should contain (exact prose: [prototypes/conventions-md-stub.md](../prototypes/conventions-md-stub.md)):

1. One-line purpose: agent-authored coding defaults under Architecture Bias; ADRs win on conflict.
2. **Deep modules** — paraphrased soft defaults from `/codebase-design`.
3. **Tests & seams** — standing prefs from `/tdd` (behaviour/seams/survive-refactors) plus `/codebase-design` Designing for testability (inject deps / return results); **not** the red→green ritual.
4. **Long-term bias** — light scalability / honest-failure preferences.
5. **Pointers** — invoke `/codebase-design`, `/tdd`, Architecture Review, stack packs when relevant.
6. Empty **Project-specific** for earned conventions.

This research locks *sources and cite vs paraphrase*; ticket 09 owns stub wording.

## Non-goals

- Copying skill bodies into the Store.
- Requiring a human to author conventions before Bias operates.
- Making Architecture Review or design-an-interface part of the Install stub.
- Stack-specific rule dumps in the generic scaffold.
- Attributing `/codebase-design` Designing for testability rules to the `/tdd` habit.
