# What is the Memory Store scaffold layout?

Type: grilling  
Status: resolved  
Parent: [Engineering Memory design](../map.md)

## Question

What exact paths and files does full-scaffold Memory Install create for the Memory Store (primary architecture doc, deep-dive folder, conventions stub, `CONTEXT.md`, `docs/adr/`, and any other Store docs), and what are the canonical names agents must use?

## Answer

**Canonical Memory Store paths** (closed set agents must read/write; no aliases):

| Path | Role |
|------|------|
| `CONTEXT.md` | Domain glossary (repo root) - extends the existing domain-docs kit |
| `docs/adr/` | ADRs - hard overrides live here |
| `docs/architecture.md` | Primary Architecture Corpus doc |
| `docs/architecture/` | Deep-dive folder (earned subsystem docs only) |
| `docs/conventions.md` | Architecture Bias / standing preferences |

**Exact files full-scaffold Memory Install creates** (paths and names only; stub bodies owned elsewhere):

| File | Install rule |
|------|----------------|
| `CONTEXT.md` | Create stub **only if missing** |
| `docs/adr/README.md` | Ensure `docs/adr/` exists; write short README when the folder is new / README missing; **no sample ADRs** |
| `docs/architecture.md` | Create primary architecture doc |
| `docs/architecture/README.md` | Ensure `docs/architecture/` exists; write pointer README only - **no pre-seeded deep-dive files** |
| `docs/conventions.md` | Create conventions stub |

**Deep-dives when earned (not Install):** kebab-case slug files under `docs/architecture/` (e.g. `billing-write-model.md`), linked from `docs/architecture.md`. Naming/link shape for the primary doc is [What is the primary architecture doc template?](03-architecture-doc-template.md).

**Why this shape (re-derived, not rubber-stamped):**

1. **Extend, don't parallel** - Keep `CONTEXT.md` + `docs/adr/` as the domain kit already defines them (`docs/agents/domain.md`); add Architecture Corpus + conventions beside them. Reject a parallel `memory/` tree or root `ARCHITECTURE.md` that would split the Store.
2. **Primary file + empty deep-dive dir** - Standing Architecture Corpus preference is one primary doc plus an empty deep-dive folder on scaffold. `docs/architecture.md` beside `docs/architecture/` gives an explicit load target; collapsing the primary into `docs/architecture/README.md` would bury the corpus name and blur "pointer README" vs "primary doc." Sibling `.md` file + same-stem directory is intentional and portable (extension distinguishes them).
3. **Conventions under `docs/`** - Architecture Bias needs a durable project file; `docs/conventions.md` sits with the rest of the Store under `docs/` (except root `CONTEXT.md`, which the domain kit already pins).
4. **Not Store** - `## Engineering Memory` in `AGENTS.md` is Loop index (Install creates it; not a Store path). No default `CONTEXT-MAP.md` (monorepo deferred). No wayfinder/planning maps. No Loop rules/skills paths.

Stub prose / templates remain out of scope here (tickets 03, 09, 14, etc.). Detail lives in [spec.md section Memory Store](../spec.md).
