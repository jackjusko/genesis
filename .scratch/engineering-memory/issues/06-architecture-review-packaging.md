# How is Architecture Review packaged?

Type: grilling  
Status: resolved  
Parent: [Engineering Memory design](../map.md)

## Question

How should `/improve-codebase-architecture` be packaged as Architecture Review for Engineering Memory (skill shape, HTML report destiny, explore subagent use, how findings fold back into the Memory Store and ADRs) while preserving its deepening vocabulary?

## Prior answer (earlier pass ? re-resolve; do not rubber-stamp)

**Skill shape:** Evolve `/improve-codebase-architecture` **in place** ? one skill, one process. No wrapper fork, no parallel Architecture Review skill. Deepening vocabulary stays via `/codebase-design` (module, interface, depth, seam, adapter, leverage, locality).

**Installed name:** Surface as **Architecture Review** in Loop docs (AGENTS.md, Install wiring, glossary). Keep the skill slug `improve-codebase-architecture` only if Cursor discovery requires it; description must say Architecture Review and Store fold-back.

**HTML report:** Remains **temp-only and ephemeral** (`architecture-review-<timestamp>.html` under OS temp). Not committed to the Memory Store or a repo `reports/` tree. Durable outcomes are Store writes, not the visual report.

**Explore subagent:** Keep `subagent_type=Explore` for the organic codebase walk (earned isolation). Parent agent owns Store load, HTML report, grilling, and fold-back. If Store pieces are missing, degrade gracefully (note gaps; don?t invent architecture).

**Store fold-back (mandatory when decisions crystallize, same session):**

| Outcome | Lands in |
|--------|----------|
| New/changed seams, module shape, deep-dive earned | `docs/architecture.md` and/or kebab-case deep-dive under `docs/architecture/` |
| New or sharpened domain terms | `CONTEXT.md` (via `/domain-modeling`) |
| Hard override / ?don?t re-suggest? | Offer an ADR (existing rule ? keep) |
| Earned standing preference | `docs/conventions.md` Project-specific section |

No parallel review log or findings dump. If the session only browsed candidates and picked none, no Store write is required.

**Triggers** (amended ticket 17): milestone/phase boundaries + friction + stub corpus / Store-blind / post-Destination drift; manual invoke allowed.

## Answer

Re-resolved against closed Store (ticket 02), Loop hybrid packaging (map Notes / ticket 07), and the shipped `skills/improve-codebase-architecture/` process. Compared evolve-in-place vs rename vs wrapper; temp HTML vs Store/reports persistence; Explore vs parent-only walk.

### Packaging

| Dimension | Decision |
|-----------|----------|
| Skill shape | **Evolve in place** ? one skill, one process. No wrapper fork, no parallel Architecture Review skill. |
| Slug | **Locked** `improve-codebase-architecture` (folder + frontmatter `name`). Not optional on ?discovery.? |
| Display / Loop name | **Architecture Review** everywhere humans/agents read (H1, description, AGENTS.md, Install, glossary). Description must name Architecture Review + Store fold-back. |
| Ship location | User-global Loop skill (Install replaces with packaged latest per hybrid packaging). |
| Vocabulary | Unchanged ? `/codebase-design` terms only (module, interface, depth, seam, adapter, leverage, locality). |

### Process (parent-owned stages)

1. **Load Store** ? `CONTEXT.md`, `docs/architecture.md` (+ linked deep-dives), `docs/conventions.md`, relevant `docs/adr/`. Missing pieces ? note gaps; do not invent architecture.
2. **Explore walk** ? invoke Cursor Explore (`subagent_type=Explore`) for the organic codebase friction walk only. Explore is invoke-only, not an Install drop.
3. **Temp HTML report** ? candidates with before/after visuals; user picks.
4. **Grilling** ? `/grilling` on the pick; `/domain-modeling` side effects as terms sharpen; optional `/codebase-design` design-it-twice for interface alternatives.
5. **Store fold-back** ? mandatory same session when decisions crystallize (table below). Then implementation (if any) follows under Store Sync + `/tdd`.

Parent owns Store load, HTML, grilling, and fold-back. Explore does not write the Store.

### HTML report destiny

**Temp-only and ephemeral:** `architecture-review-<timestamp>.html` under OS temp (`$TMPDIR` / `/tmp` / `%TEMP%`). Open for the user; tell them the absolute path. Never commit to the repo, Memory Store, or a `reports/` tree. Durable outcomes are Store writes, not the visual file.

### Store fold-back

Mandatory when decisions crystallize, same session. **No parallel review log** or findings dump.

| Outcome | Store target |
|--------|----------------|
| Seams / module shape / earned deep-dive | `docs/architecture.md` and/or `docs/architecture/<kebab>.md` |
| New or sharpened domain terms | `CONTEXT.md` (via `/domain-modeling`) |
| Hard override / don?t re-suggest | **Offer** an ADR under `docs/adr/` (do not auto-write) |
| Earned standing preference | `docs/conventions.md` **Project-specific** |

Browse-only (no candidate chosen) ? no Store write required.

### Triggers

Milestone/phase boundaries; friction (Store Sync thrash, hard-to-test seams, agent can't locate a seam); corpus still Install-stubbed while real structure exists; agent cannot answer a structure question from the Store; after auto-build / major Destination completion when architecture drifted; manual invoke allowed. Not every-N-sessions.

### Rejected alternatives

1. **Wrapper / fork skill** (`architecture-review` calling the old skill). Two surfaces to maintain; discovery splits; contradicts ?one skill, one process.?
2. **Rename slug** to `architecture-review` in v1. Breaks existing `/improve-codebase-architecture` invokes and Install path already in Product packaging; display name is enough. (Rename remains deferred fog, not v1.)
3. **Commit HTML** into Store or `reports/`. Violates closed Store paths; report is a pick UI, not durable architecture.
4. **Parent-only walk** (drop Explore). Loses earned isolation for long organic scans; CONTEXT already allows subagents when the workflow is long enough.
5. **Parallel review log / last-reviewed stamp.** Second brain beside the Store; fold-back into corpus/glossary/ADRs/conventions is the durable trail.
6. **Auto-write ADRs** on every rejection. Ephemeral ?not now? reasons must not litter `docs/adr/`; offer only when the reason must block re-suggestion.

Detail: [spec.md � Architecture Review](../spec.md).

## Comments

Earlier pass left slug as ?keep if discovery requires it.? This pass **locks** the slug and records rejected packaging shapes so ticket 15 does not reopen them.
