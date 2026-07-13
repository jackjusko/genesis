# How is Architecture Review packaged?

Type: grilling  
Status: resolved  
Parent: [Engineering Memory design](../map.md)

## Question

How should `/improve-codebase-architecture` be packaged as Architecture Review for Engineering Memory (skill shape, HTML report destiny, explore subagent use, how findings fold back into the Memory Store and ADRs) while preserving its deepening vocabulary?

## Answer

**Skill shape:** Evolve `/improve-codebase-architecture` **in place** — one skill, one process. No wrapper fork, no parallel Architecture Review skill. Deepening vocabulary stays via `/codebase-design` (module, interface, depth, seam, adapter, leverage, locality).

**Installed name:** Surface as **Architecture Review** in Loop docs (AGENTS.md, Install wiring, glossary). Keep the skill slug `improve-codebase-architecture` only if Cursor discovery requires it; description must say Architecture Review and Store fold-back.

**HTML report:** Remains **temp-only and ephemeral** (`architecture-review-<timestamp>.html` under OS temp). Not committed to the Memory Store or a repo `reports/` tree. Durable outcomes are Store writes, not the visual report.

**Explore subagent:** Keep `subagent_type=Explore` for the organic codebase walk (earned isolation). Parent agent owns Store load, HTML report, grilling, and fold-back. If Store pieces are missing, degrade gracefully (note gaps; don’t invent architecture).

**Store fold-back (mandatory when decisions crystallize, same session):**

| Outcome | Lands in |
|--------|----------|
| New/changed seams, module shape, deep-dive earned | `docs/architecture.md` and/or kebab-case deep-dive under `docs/architecture/` |
| New or sharpened domain terms | `CONTEXT.md` (via `/domain-modeling`) |
| Hard override / “don’t re-suggest” | Offer an ADR (existing rule — keep) |
| Earned standing preference | `docs/conventions.md` Project-specific section |

No parallel review log or findings dump. If the session only browsed candidates and picked none, no Store write is required.

**Triggers** (unchanged from map charting): milestone/phase boundaries + friction; manual invoke allowed.
