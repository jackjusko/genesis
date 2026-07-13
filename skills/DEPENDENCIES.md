# Skill dependencies

Closed set of **package-owned** on-demand skills that Memory Install always overwrites into `~/.agents/skills/<slug>/` alongside the Loop skills.

| Slug | Why Engineering Memory needs it |
|------|----------------------------------|
| `tdd` | Always-on `/tdd` habit; Bias / conventions seed |
| `codebase-design` | Architecture Bias + Architecture Review vocabulary |
| `domain-modeling` | Store fold-back for glossary + ADRs |
| `grilling` | Architecture Review interview after candidate pick |

**Ownership:** same as Loop skills — package root is source of truth; every Install invoke always replaces these globals. They are **not** project Store drops.

**Not packaged:** `grill-me`, `grill-with-docs` (thin aliases), `wayfinder`, and other external skills remain the user’s responsibility.

**Invocation:** still on-demand (`/tdd`, `/grilling`, etc.). Install only ensures the skill bodies exist globally.
