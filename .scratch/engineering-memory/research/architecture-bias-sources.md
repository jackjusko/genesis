# Architecture Bias — seed sources

Research for [Where does Architecture Bias get its defaults?](../issues/04-architecture-bias-sources.md).

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

### 1. `/codebase-design` — paraphrase (core)

Canonical deep-module vocabulary and soft defaults. This is the Architecture Bias spine.

**Paraphrase** (not copy the glossary essays):

- Prefer **deep modules**: lots of behaviour behind a small **interface**, at a deliberate **seam**.
- Use the vocabulary exactly: module, interface, depth, seam, adapter, leverage, locality — not “service / API / boundary” as substitutes.
- Depth is leverage at the interface, not “implementation lines ÷ interface lines” (rejected Ousterhout framing — the skill is source of truth, not the book).
- Deletion test: if deleting the module just moves complexity to callers, it was earning its keep.
- One adapter = hypothetical seam; two adapters = real seam — don’t invent ports for fashion.
- Interface is the test surface; callers and tests cross the same seam.

**Cite**: `/codebase-design` (and its DEEPENING / DESIGN-IT-TWICE companions) when deepening or redesigning a module — don’t duplicate those workflows in conventions.

### 2. `/tdd` — split (habit invoke + Bias paraphrase)

Map Notes already fix `/tdd` as a Loop habit *and* a Bias seed. Split cleanly:

| Lands in | Content |
|----------|---------|
| **Always-on habit** (“invoke `/tdd` when writing or changing code”) | Red → green loop; one vertical slice at a time; confirm seams with the user before writing tests; anti-pattern checklist as skill detail |
| **Conventions paraphrase (Bias)** | Tests verify behaviour through public interfaces, not internals; tests live at agreed seams; accept dependencies, don’t create them inside the unit under test; return results over hidden side effects where practical; prefer tests that survive internal refactors |

Do **not** paraphrase into conventions: mock catalogs, framework detection, the full anti-pattern essay, or “ask the user to confirm seams” (that’s procedure — stays in the skill / habit).

### 3. Long-term / scalability preferences — paraphrase lightly

Thin standing preferences that match Bias’s “extra work OK” stance — not whole skills:

- Prefer evolvable seams over short-term call-site convenience when a change is structural.
- Prefer honest failure and readable decision signals over silent catch-and-continue (agent-first debugging).
- Prefer fewer, deeper modules over many shallow pass-throughs when both are options.

These may later be sharpened by project ADRs; the stub only plants the bias.

## Conditional / on-demand seeds (cite; paraphrase only when stack matches)

Agents under Bias may **later** paraphrase into *this project’s* conventions when the stack earns it. Install stub does **not** dump these catalogs.

| Source | Role | Install stub |
|--------|------|--------------|
| `/api-design` | HTTP/GraphQL evolvability, honest status codes, pagination | Cite when the repo has/is adding a public or service HTTP surface |
| `/observability` | Decision logs, persisted failure state, health surfaces | Cite when building long-running / unattended subsystems |
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

## Recommended Install stub shape (for a later prose ticket)

`docs/conventions.md` after Install should roughly contain:

1. One-line purpose: agent-authored coding defaults under Architecture Bias; ADRs win on conflict.
2. **Deep modules** section — paraphrased soft defaults from `/codebase-design`.
3. **Tests & seams** section — paraphrased Bias bits from `/tdd` (not the red→green ritual).
4. **Long-term bias** section — the light scalability / honest-failure preferences.
5. **Pointers** — “for procedures, invoke `/codebase-design`, `/tdd`, …; stack packs when relevant.”
6. Empty **Project-specific** heading for earned conventions (agents fill later).

Exact prose is fog/ticket material; this research locks *sources and cite vs paraphrase*.

## Non-goals

- Copying skill bodies into the Store.
- Requiring a human to author conventions before Bias operates.
- Making Architecture Review or design-an-interface part of the Install stub.
- Stack-specific rule dumps in the generic scaffold.
