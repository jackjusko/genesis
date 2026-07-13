# Skill dependencies

Closed set of **package-owned** on-demand skills that Memory Install always overwrites into `~/.agents/skills/<slug>/` alongside the Loop skills.

## Core Loop helpers

| Slug | Why Engineering Memory needs it |
|------|----------------------------------|
| `tdd` | Always-on `/tdd` habit; Bias / conventions seed |
| `codebase-design` | Architecture Bias + Architecture Review vocabulary |
| `domain-modeling` | Store fold-back for glossary + ADRs |
| `grilling` | Architecture Review interview after candidate pick |

## Auto-build pipeline

| Slug | Why Engineering Memory needs it |
|------|----------------------------------|
| `auto-build` | One-shot autonomous orchestrator (grill → wayfinder → tickets → drain) |
| `wayfinder` | Chart + work planning maps (maps stay outside the Memory Store) |
| `grill-me` | Thin alias → `/grilling` |
| `grill-with-docs` | Thin alias → `/grilling` + `/domain-modeling` |
| `to-tickets` | Spec → vertical-slice tickets with blocking edges |
| `drain-tickets` | Frontier → fresh implement subagent per ticket |

**Ownership:** same as Loop skills — package root is source of truth; every Install invoke always replaces these globals. They are **not** project Store drops.

**Not packaged:** `write-milestone-brief` and other external skills remain the user’s responsibility.

**Invocation:** still on-demand (`/tdd`, `/grilling`, `/auto-build`, etc.). Install only ensures the skill bodies exist globally. Interactive `/grilling` and `/wayfinder` stay HITL unless the parent skill is `/auto-build` (AFK auto-accept).
