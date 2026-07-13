# What stub prose remains for other Memory Install Store drops?

Type: prototype  
Status: resolved  
Parent: [Engineering Memory design](../map.md)  
Blocked by: 02, 10

## Question

What exact Install stub prose (with ours markers) goes in `CONTEXT.md` (when missing), `docs/adr/README.md` (when the ADR folder is new), and `docs/architecture/README.md` (deep-dive pointer) -- completing the full-scaffold Store drops?

## Prior answer (earlier pass -- re-resolve; do not rubber-stamp)

Locked Install drops (keep `<!-- engineering-memory:install -->`; strip PROTOTYPE comments):

| Path | Prototype |
|------|-----------|
| `CONTEXT.md` (create only if missing) | [prototypes/context-md-stub.md](../prototypes/context-md-stub.md) -- thin domain glossary shell; empty Language; no product-specific terms |
| `docs/adr/README.md` (when folder new / file missing) | [prototypes/adr-readme-stub.md](../prototypes/adr-readme-stub.md) -- ADR purpose + naming; no sample ADRs |
| `docs/architecture/README.md` | [prototypes/architecture-dir-readme-stub.md](../prototypes/architecture-dir-readme-stub.md) -- pointer only; deep-dives earned later |

Together with architecture.md, conventions.md, and AGENTS section stubs already locked, this completes full-scaffold Store + index prose. Spec section Memory Store updated.

## Answer

Re-resolved against ticket 02 Install file set, ticket 10 ours marker, domain-kit formats (`CONTEXT-FORMAT` / `ADR-FORMAT` / `docs/agents/domain.md`), and locked siblings (tickets 03/09 primary + conventions stubs). Compared shapes for each path; locked three pointer/shell drops. Keep `<!-- engineering-memory:install -->` on line 1; strip PROTOTYPE comments only on Install.

### Rejected alternatives

1. **Seed product terms or sample ADRs / deep-dives** (teaching fiction). Rejected: brownfield honesty + tickets 02/03 -- no invented glossary, no sample ADR files, no pre-seeded deep-dives.
2. **H1 `_TODO_` / blank context name on CONTEXT.md**. Rejected: provisional `# Domain` is a stable skim target; agents rename via `/domain-modeling` when the context name crystallises (matches CONTEXT-FORMAT `# {Context Name}` without forcing a fake name).
3. **CONTEXT points at architecture.md / conventions.md**. Rejected: glossary only (domain-modeling); Store index lives in AGENTS `## Engineering Memory`.
4. **CONTEXT-MAP.md or multi-context stub**. Rejected: monorepo deferred (map Out of scope / spec deferred).
5. **Paste full ADR-FORMAT / MADR sections into adr README**. Rejected: thin pointer + naming + 1-3 sentence cue; procedure stays in `/domain-modeling`.
6. **Deep-dive index table duplicated in architecture/README.md**. Rejected: ticket 03 -- index owns `docs/architecture.md`; folder README is pointer only.
7. **Collapse primary corpus into `docs/architecture/README.md`**. Rejected already by tickets 02/03.

### Locked Install drops

| Path | When | Prototype | Shape |
|------|------|-----------|-------|
| `CONTEXT.md` | Create **only if missing** | [context-md-stub.md](../prototypes/context-md-stub.md) | Marker -> H1 `# Domain` + glossary-only preamble (ADR pointer, rename H1 when known, grow via `/domain-modeling`) -> exact H2 `## Language` empty aside from pattern HTML comment matching CONTEXT-FORMAT (`**Term**` / `_Avoid_`). No terms at Install. |
| `docs/adr/README.md` | Folder new / README missing | [adr-readme-stub.md](../prototypes/adr-readme-stub.md) | Marker -> H1 purpose (hard decisions override soft Bias; Install never rewrites existing; no sample ADRs) -> naming `NNNN-kebab-title.md` -> thin ADR cue (title + 1-3 sentences; optional sections only when earned) -> link-from-prose + `/domain-modeling` offer path. |
| `docs/architecture/README.md` | Ensure folder; write when missing | [architecture-dir-readme-stub.md](../prototypes/architecture-dir-readme-stub.md) | Marker -> H1 folder-pointer (explicitly **not** the primary corpus) -> link to [`docs/architecture.md`](../architecture.md) -> kebab-case earned files only; no pre-seed; index from primary Deep-dives table. |

**Marker / strip:** Same as siblings -- keep `<!-- engineering-memory:install -->`; strip PROTOTYPE banner only (ticket 10).

**Completes full-scaffold Store file prose** with tickets 03 (`docs/architecture.md`) and 09 (`docs/conventions.md`). Loop index / always-on remain tickets 11-12 (not Store).

Detail: [spec.md section Memory Store](../spec.md).
