# What is the Memory Store scaffold layout?

Type: grilling  
Status: resolved  
Parent: [Engineering Memory design](../map.md)

## Question

What exact paths and files does full-scaffold Memory Install create for the Memory Store (primary architecture doc, deep-dive folder, conventions stub, `CONTEXT.md`, `docs/adr/`, and any other Store docs), and what are the canonical names agents must use?

## Answer

Closed set of Memory Store paths (canonical names agents must use):

| Path | Role |
|------|------|
| `CONTEXT.md` | Domain glossary — stub if missing; leave contents alone if present (merge detail in [How does Memory Install merge into an existing repo?](05-install-merge-semantics.md)) |
| `docs/adr/` | ADRs — ensure dir exists; short README when folder is new; no sample ADRs |
| `docs/architecture.md` | Primary architecture doc |
| `docs/architecture/` | Deep-dives — install has only a pointer README; no pre-seeded subsystem stubs |
| `docs/conventions.md` | Conventions stub (Architecture Bias target) |

Deep-dives when earned: kebab-case slug files under `docs/architecture/` (e.g. `billing-write-model.md`), linked from the primary doc (link/template shape is [What is the primary architecture doc template?](03-architecture-doc-template.md)).

Not Store: no `CONTEXT-MAP.md` by default (monorepo fog); no parallel `memory/` tree; no wayfinder maps; Loop artifacts are not Store paths.

Stub prose (empty headings vs starter text) remains fog / template ticket — this answer is paths and names only.

Detail lives in [spec.md § Memory Store](../spec.md).
