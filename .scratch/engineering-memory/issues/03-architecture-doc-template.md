# What is the primary architecture doc template?

Type: prototype  
Status: resolved  
Parent: [Engineering Memory design](../map.md)  
Blocked by: 02

## Question

Given the scaffold layout, what is the concrete template for the primary architecture doc (required sections, empty vs starter prose, how deep-dives are linked) that agents can react to and that Memory Install will drop in?

## Prior answer (earlier pass - re-resolve; do not rubber-stamp)

Memory Install drops a fixed template into `docs/architecture.md` matching [prototypes/architecture-md-template.md](../prototypes/architecture-md-template.md) (strip the PROTOTYPE banner on install).

**Required sections (in order):**

1. Opening - purpose, pointers to `CONTEXT.md` / `docs/adr/` / `docs/conventions.md`, how-to-use skim rule
2. System shape
3. Key seams
4. Deep-dives
5. Out of scope for this doc

**Stub depth:** Opinionated headings + short stable prose where the text is repo-independent (opening, deep-dives intro, out-of-scope). Repo-specific sections get HTML guidance comments + a single `_TODO_` placeholder - not blank headings, not invented architecture.

**Deep-dive linking:** Index table in the primary doc (`Deep-dive` | `When to open it`), starting with "none yet". Rows added only when a kebab-case file under `docs/architecture/` is earned; example row lives in an HTML comment in the template. No pre-seeded deep-dive stubs.

Detail lives in [spec.md section Memory Store](../spec.md).

## Answer

Re-resolved against ticket 02 paths, Architecture Corpus skim preference, Install merge ("add missing required sections"), and codebase-design vocabulary. Compared three shapes; locked one.

**Rejected alternatives:**

1. **Folder-as-index** - thin primary, corpus lives only under `docs/architecture/`. Rejected: ticket 02 already chose sibling `docs/architecture.md` as the explicit load target; collapsing into the folder README was rejected there.
2. **Sample-architecture seed** - Install invents example modules/seams as teaching content. Rejected: fictional architecture fights brownfield merge and Store Sync honesty ("write what is true today").
3. **Heavy checklist** - extra H2s (invariants, failure modes, adapter inventory). Rejected: past-skim primary; empty sections tempt invention.

**Locked shape - skim-map** (prototype: [architecture-md-template.md](../prototypes/architecture-md-template.md)):

Memory Install drops that file into `docs/architecture.md`. Keep `<!-- engineering-memory:install -->`; strip the PROTOTYPE comment only.

**Structure (order fixed):**

| Piece | Form | Content at Install |
|-------|------|--------------------|
| Opening | H1 `# Architecture` + preamble (not an H2) | Filled: purpose, pointers to `CONTEXT.md` / `docs/adr/` / `docs/conventions.md`, how-to-use + "today not target" |
| System shape | exact H2 `## System shape` | Guidance HTML comment + `_TODO_` + commented mermaid skeleton |
| Key seams | exact H2 `## Key seams` | Guidance HTML comment + one `_TODO_` bullet using recipe `**SeamName** - Interface: ...; varies: ...` |
| Deep-dives | exact H2 `## Deep-dives` | Filled intro + index table starting with `_(none yet)_`; example row in HTML comment |
| Out of scope | exact H2 `## Out of scope for this doc` | Filled: exclude runbooks, wayfinder maps, ADR dumps |

Those four H2 titles are the **required-section merge contract** (ticket 05 / Install interactive merge adds missing ones only; never delete prose). Opening is preamble under H1 - not a separate merge heading.

**Stub depth:** Repo-independent prose filled. Repo-specific sections are never blank headings and never fictional architecture - HTML guidance + single `_TODO_` only. Vocabulary in Key seams matches `/codebase-design` (Module / Interface / Seam / Adapter).

**Deep-dive linking:** Table columns `Deep-dive` | `When to open it`. Links are relative from the primary file: `architecture/<kebab-slug>.md`. No pre-seeded deep-dive files. On first earn, **replace** the `_(none yet)_` row (do not leave it beside real rows).

Detail: [spec.md section Memory Store](../spec.md).
