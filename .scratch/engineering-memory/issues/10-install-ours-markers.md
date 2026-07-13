# What markers classify an Install path as "ours"?

Type: grilling  
Status: resolved  
Parent: [Engineering Memory design](../map.md)  
Blocked by: 05

## Question

For Memory Install idempotency, what exact markers or stub signatures classify each canonical path (`CONTEXT.md`, `docs/architecture.md`, `docs/conventions.md`, `AGENTS.md` Memory section, ADR/architecture pointer READMEs, etc.) as an Engineering Memory artifact ("ours" → skip) versus foreign content (conflict)?

## Answer

**Primary marker (files Install owns):** first non-empty line of the file (or within the first 20 lines) must be exactly:

```html
<!-- engineering-memory:install -->
```

Case-sensitive. No version suffix in v1 (re-Install never rewrites “ours” project files anyway). Living Store growth may keep or lose the marker; **once the marker is gone, the path is no longer “ours”** — future Install treats it as conflict if it would recreate that path. Prefer agents leave the marker on Install-seeded files; earned deep-dives and ADRs are never Install recreates, so they need no marker.

**Path-specific rules:**

| Path | Ours when | Conflict when |
|------|-----------|---------------|
| `docs/architecture.md` | Has Install marker | Exists without marker |
| `docs/conventions.md` | Has Install marker | Exists without marker |
| `CONTEXT.md` | Has Install marker | Exists without marker (interactive merge preserves glossary) |
| `docs/adr/README.md` | Has Install marker | Exists without marker |
| `docs/architecture/README.md` | Has Install marker | Exists without marker |
| `AGENTS.md` § `## Engineering Memory` | Heading `## Engineering Memory` present (exact, case-sensitive) | N/A for whole-file — section missing → create/append; foreign content *under that heading* is still “ours section present → skip section rewrite” on idempotent re-run. Whole-file replace never. |
| `docs/adr/` dir, `docs/architecture/` dir | Dir exists (any contents) | Never — dirs are not conflicts |
| Existing ADRs / deep-dives | Never Install recreates | Never conflicts |

**Not markers:** content fingerprinting of stub prose, frontmatter YAML, or “looks like our template” heuristics. Marker (or AGENTS heading) only — cheap and unambiguous.

**Globals** (user rule / skills): package-owned; always overwrite; “ours” classification does not apply.

Spec § Memory Install updated.
