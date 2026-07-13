# What markers classify an Install path as "ours"?

Type: grilling  
Status: resolved  
Parent: [Engineering Memory design](../map.md)  
Blocked by: 05

## Question

For Memory Install idempotency, what exact markers or stub signatures classify each canonical path (`CONTEXT.md`, `docs/architecture.md`, `docs/conventions.md`, `AGENTS.md` Memory section, ADR/architecture pointer READMEs, etc.) as an Engineering Memory artifact ("ours" -> skip) versus foreign content (conflict)?

## Prior answer (earlier pass -- re-resolve; do not rubber-stamp)

**Primary marker (files Install owns):** first non-empty line of the file (or within the first 20 lines) must be exactly:

```html
<!-- engineering-memory:install -->
```

Case-sensitive. No version suffix in v1 (re-Install never rewrites "ours" project files anyway). Living Store growth may keep or lose the marker; **once the marker is gone, the path is no longer "ours"** -- future Install treats it as conflict if it would recreate that path. Prefer agents leave the marker on Install-seeded files; earned deep-dives and ADRs are never Install recreates, so they need no marker.

**Path-specific rules:**

| Path | Ours when | Conflict when |
|------|-----------|---------------|
| `docs/architecture.md` | Has Install marker | Exists without marker |
| `docs/conventions.md` | Has Install marker | Exists without marker |
| `CONTEXT.md` | Has Install marker | Exists without marker (interactive merge preserves glossary) |
| `docs/adr/README.md` | Has Install marker | Exists without marker |
| `docs/architecture/README.md` | Has Install marker | Exists without marker |
| `AGENTS.md` section `## Engineering Memory` | Heading `## Engineering Memory` present (exact, case-sensitive) | N/A for whole-file -- section missing -> create/append; foreign content *under that heading* is still "ours section present -> skip section rewrite" on idempotent re-run. Whole-file replace never. |
| `docs/adr/` dir, `docs/architecture/` dir | Dir exists (any contents) | Never -- dirs are not conflicts |
| Existing ADRs / deep-dives | Never Install recreates | Never conflicts |

**Not markers:** content fingerprinting of stub prose, frontmatter YAML, or "looks like our template" heuristics. Marker (or AGENTS heading) only -- cheap and unambiguous.

**Globals** (user rule / skills): package-owned; always overwrite; "ours" classification does not apply.

Spec Memory Install section updated.

## Answer

Re-resolved against ticket 05 merge classes, ticket 08 (Store/AGENTS never auto-upgrade; globals have no ours class), closed Install file set (ticket 02), and every Install prototype that already carries the HTML marker. Compared: first-line-only vs first-N window vs whole-file scan; HTML comment vs YAML frontmatter vs install manifest; fingerprint/heuristic "looks like stub"; versioned marker; AGENTS HTML comment vs heading. Locked one cheap recognition rule.

### File marker (Install-owned files)

Exact token (case-sensitive, no version suffix in v1):

```html
<!-- engineering-memory:install -->
```

**Recognition algorithm:** After stripping a leading UTF-8 BOM if present, scan the first **20 physical lines**. A path is **ours** iff at least one of those lines, after trimming leading/trailing ASCII whitespace, equals that token exactly (no other text on the line). Otherwise, if the path exists as the expected kind, it is **conflict**.

Install drops place the marker on line 1 (prototypes keep it; strip PROTOTYPE banners only). Agents and humans **should leave the marker** on Install-seeded Store files through living growth. **Marker loss -> not ours** -> next Install that would recreate the path classifies **conflict** (fail-closed + offer interactive merge per ticket 05). No silent re-stamp.

### Path table

| Path | Ours when | Conflict when |
|------|-----------|---------------|
| `CONTEXT.md` | File marker in first 20 lines | Exists without marker |
| `docs/architecture.md` | File marker in first 20 lines | Exists without marker |
| `docs/conventions.md` | File marker in first 20 lines | Exists without marker |
| `docs/adr/README.md` | File marker in first 20 lines | Exists without marker |
| `docs/architecture/README.md` | File marker in first 20 lines | Exists without marker |
| `AGENTS.md` section Engineering Memory | A physical line trims to exactly `## Engineering Memory` (case-sensitive ATX `##`) | N/A whole-file -- heading absent -> **missing** (append); heading present -> **ours** (skip section rewrite), even if body under the heading is foreign or diverged. Never whole-file replace. |
| `docs/adr/`, `docs/architecture/` | Directory exists (any contents) | Never -- dirs are not conflicts (ticket 05) |
| Existing ADRs / deep-dives | Never Install recreate targets | Never conflicts |

### Out of scope for "ours"

- **Globals** (always-on rule + Loop skills): package-owned always-replace; no ours classification (ticket 08).
- **Earned ADRs / deep-dives:** not Install drops; no marker required.

### Rejected alternatives

1. **"First non-empty line" XOR "first 20 lines"** (prior wording). Rejected: two rules for implementers. One window -- first 20 physical lines after optional BOM strip.
2. **Whole-file marker scan.** Rejected: a quoted marker in foreign prose could false-positive.
3. **First line only.** Rejected: brittle if a license/SPDX line is prepended; 20 lines stays cheap and near-top.
4. **YAML frontmatter / sidecar manifest / content fingerprint / "looks like our stub".** Rejected: heavier or ambiguous; HTML comment + AGENTS heading are enough.
5. **Versioned marker** (`...:install:v1`). Rejected: re-Install never rewrites ours project files; version adds no v1 behavior.
6. **HTML comment inside AGENTS section.** Rejected: product surface already uses heading `## Engineering Memory` as the section identity (tickets 07/11); heading is the ours marker.
7. **Treat marker loss as still ours.** Rejected: without the marker, Install cannot distinguish Install-seeded files from pre-existing foreign files at the same path; fail-closed wins.

Detail: [spec.md section Memory Install](../spec.md).
