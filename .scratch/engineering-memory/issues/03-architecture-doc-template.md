# What is the primary architecture doc template?

Type: prototype  
Status: resolved  
Parent: [Engineering Memory design](../map.md)  
Blocked by: 02

## Question

Given the scaffold layout, what is the concrete template for the primary architecture doc (required sections, empty vs starter prose, how deep-dives are linked) that agents can react to and that Memory Install will drop in?

## Answer

Memory Install drops a fixed template into `docs/architecture.md` matching [prototypes/architecture-md-template.md](../prototypes/architecture-md-template.md) (strip the PROTOTYPE banner on install).

**Required sections (in order):**

1. Opening — purpose, pointers to `CONTEXT.md` / `docs/adr/` / `docs/conventions.md`, how-to-use skim rule
2. System shape
3. Key seams
4. Deep-dives
5. Out of scope for this doc

**Stub depth:** Opinionated headings + short stable prose where the text is repo-independent (opening, deep-dives intro, out-of-scope). Repo-specific sections get HTML guidance comments + a single `_TODO_` placeholder — not blank headings, not invented architecture.

**Deep-dive linking:** Index table in the primary doc (`Deep-dive` | `When to open it`), starting with “none yet”. Rows added only when a kebab-case file under `docs/architecture/` is earned; example row lives in an HTML comment in the template. No pre-seeded deep-dive stubs.

Detail lives in [spec.md § Memory Store](../spec.md).
