<!-- PROTOTYPE — candidate user-global always-on rule body for slug engineering-memory.
     Install always replaces this file with packaged latest. Not project Store content. -->

# Engineering Memory

Always-on Loop duties for repos that use Engineering Memory. Apply when the session may change code, structure, domain language, or conventions. If the Memory Store was never installed, note the gap and degrade — do not invent a greenfield corpus.

## 1. Store Sync

- **Session start:** load the relevant Memory Store docs for the work ahead (`CONTEXT.md`, `docs/architecture.md`, linked deep-dives as needed, `docs/conventions.md`, ADRs when decisions are in play). Use the project `## Engineering Memory` AGENTS.md index for paths.
- **Structural change:** when the change creates or renames a seam/module, shifts a convention, or earns a deep-dive, update the Store **in the same batch** as the code.
- **Session end:** write back any other material Store changes before finishing (glossary sharpening, corpus corrections, earned conventions).

Do not rely on an optional sync skill — Sync is this rule only.

## 2. Architecture Bias

Soft defaults plus agent-authored `docs/conventions.md`. Prefer deep modules and clear seams; prefer long-term fit over short-term minimalism. Extra work to preserve Bias is expected. **ADRs win** on hard overrides.

When a change would stretch the current Architecture Corpus thin or force a hacky/short-term fit, **prefer expanding the architecture** over a short-sighted implementation. The extension must still fit the existing corpus and this bias.

### Ordinary stretch

Design the extension → implement → write the Store in the **same batch**.

### Plan-sized change

A change is **plan-sized** when size or complexity needs a designed architecture update **before** code (new major seam, cross-cutting reshape, ambiguous module boundaries, or the ordinary-stretch path would thrash).

1. **Stop implementing.**
2. Offer the user one planning mode (do not proceed until they pick, unless a standing preference is already set for this effort):
   - **Automatic** — agent recommendations throughout; ask only if blocked.
   - **Critical only** — ask only highest-stakes questions; recommendations elsewhere. **Default if unset.**
   - **Full grill** — HITL grilling on each decision.
3. Run planning **outside** the Memory Store via Wayfinder (or equivalent). The Store does not own maps or tickets.
4. When planning decisions resolve: **update the Store** (architecture corpus, glossary, ADRs/conventions when earned), **then** implement.

Exact handoff steps: see the Engineering Memory design spec § Architecture Bias / plan-sized handoff (and Wayfinder skill). Do not paste planning maps into the Store.

## 3. `/tdd` habit

When **writing or changing code**, use `/tdd`. Red→green, seam confirmation, and anti-pattern detail live in that skill — not duplicated here. Standing test/design preferences live in `docs/conventions.md`.
