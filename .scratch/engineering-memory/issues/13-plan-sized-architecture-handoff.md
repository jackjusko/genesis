# How does the plan-sized Architecture Bias gate hand off to planning?

Type: grilling  
Status: resolved  
Parent: [Engineering Memory design](../map.md)  
Blocked by: 07

## Question

When the always-on rule decides a change is plan-sized, how exactly does it hand off to Wayfinder (or equivalent), apply the user’s Automatic / Critical only / Full grill choice, and fold durable decisions back into the Memory Store before implementation — without the Store owning planning maps?

## Answer

### Trigger

Agent classifies the change as **plan-sized** per Architecture Bias (needs designed architecture update before code). **Stop all implementation** in that thread until planning resolves or the user explicitly overrides (“treat as ordinary stretch”).

### Mode chooser (before charting)

Present exactly three options; wait for a pick unless this effort already has a standing mode:

| Mode | Behaviour |
|------|-----------|
| **Automatic** | Chart + work tickets with agent recommendations; ask only when blocked (missing fact/access). |
| **Critical only** | Chart + work tickets with recommendations; ask only highest-stakes decisions. **Default if unset.** |
| **Full grill** | Chart + HITL grilling per Wayfinder/grilling norms (one question at a time). |

Standing preference may be set per effort (e.g. in the Wayfinder map Notes or user instruction for the session). Do not invent a fourth mode.

### Handoff to planning (outside Store)

1. **Invoke Wayfinder** (or the repo’s equivalent planning tracker) to **chart a map** whose Destination is the architecture/design decision needed — not the full product, and not “implement X.”
2. Map + tickets live on the **issue tracker** (this repo: `.scratch/<effort>/`), **never** under Memory Store paths (`CONTEXT.md`, `docs/architecture*`, `docs/adr/`, `docs/conventions.md`).
3. AGENTS.md / Store may later gain an optional “active efforts” pointer (fog) — pointers only, never ownership of maps.
4. If Wayfinder/skills are unavailable: run the same shape inline (destination → decisions → frontier) in the session transcript, still without writing planning tickets into the Store; then fold durable outcomes the same way.

### Working the map

- Follow Wayfinder: claim → resolve → Decisions-so-far pointers; one ticket at a time unless the user overrides (as in a Critical-only / Automatic sweep).
- Mode controls **how HITL tickets ask**, not whether Store fold-back happens.
- Prototype/research assets link from tickets; they are not Store docs until fold-back copies validated content into canonical paths.

### Fold-back then implement (mandatory order)

When the map’s Destination is met (way clear — no open tickets blocking the architecture decision, or remaining work is pure implementation):

1. **Store fold-back (same session as resolve, before code):** write durable outcomes into the Memory Store — architecture corpus / deep-dives, `CONTEXT.md` terms, ADRs when hard overrides, conventions when earned standing prefs. Same targets as Architecture Review fold-back.
2. **Then implement** under ordinary Store Sync + `/tdd` habit.
3. Do **not** move the map into the Store; do **not** delete the map unless the user asks — it remains a decision-route artifact.

### Non-goals

- Store does not host wayfinder maps or ticket bodies.
- Plan-sized gate does not auto-start implementation under Automatic mode.
- Mode choice is not persisted into `docs/conventions.md` unless the project earns a standing preference ADR/convention later.

Spec § Architecture Bias updated.
