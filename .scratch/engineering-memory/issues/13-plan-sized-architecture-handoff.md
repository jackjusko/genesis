# How does the plan-sized Architecture Bias gate hand off to planning?

Type: grilling  
Status: claimed  
Parent: [Engineering Memory design](../map.md)  
Blocked by: 07

## Question

When the always-on rule decides a change is plan-sized, how exactly does it hand off to Wayfinder (or equivalent), apply the user?s Automatic / Critical only / Full grill choice, and fold durable decisions back into the Memory Store before implementation ? without the Store owning planning maps?

## Prior answer (earlier pass ? re-resolve; do not rubber-stamp)

### Trigger

Agent classifies the change as **plan-sized** per Architecture Bias (needs designed architecture update before code). **Stop all implementation** in that thread until planning resolves or the user explicitly overrides (?treat as ordinary stretch?).

### Mode chooser (before charting)

Present exactly three options; wait for a pick unless this effort already has a standing mode:

| Mode | Behaviour |
|------|-----------|
| **Automatic** | Chart + work tickets with agent recommendations; ask only when blocked (missing fact/access). |
| **Critical only** | Chart + work tickets with recommendations; ask only highest-stakes decisions. **Default if unset.** |
| **Full grill** | Chart + HITL grilling per Wayfinder/grilling norms (one question at a time). |

Standing preference may be set per effort (e.g. in the Wayfinder map Notes or user instruction for the session). Do not invent a fourth mode.

### Handoff to planning (outside Store)

1. **Invoke Wayfinder** (or the repo?s equivalent planning tracker) to **chart a map** whose Destination is the architecture/design decision needed ? not the full product, and not ?implement X.?
2. Map + tickets live on the **issue tracker** (this repo: `.scratch/<effort>/`), **never** under Memory Store paths (`CONTEXT.md`, `docs/architecture*`, `docs/adr/`, `docs/conventions.md`).
3. AGENTS.md / Store may later gain an optional ?active efforts? pointer (fog) ? pointers only, never ownership of maps.
4. If Wayfinder/skills are unavailable: run the same shape inline (destination ? decisions ? frontier) in the session transcript, still without writing planning tickets into the Store; then fold durable outcomes the same way.

### Working the map

- Follow Wayfinder: claim ? resolve ? Decisions-so-far pointers; one ticket at a time unless the user overrides (as in a Critical-only / Automatic sweep).
- Mode controls **how HITL tickets ask**, not whether Store fold-back happens.
- Prototype/research assets link from tickets; they are not Store docs until fold-back copies validated content into canonical paths.

### Fold-back then implement (mandatory order)

When the map?s Destination is met (way clear ? no open tickets blocking the architecture decision, or remaining work is pure implementation):

1. **Store fold-back (same session as resolve, before code):** write durable outcomes into the Memory Store ? architecture corpus / deep-dives, `CONTEXT.md` terms, ADRs when hard overrides, conventions when earned standing prefs. Same targets as Architecture Review fold-back.
2. **Then implement** under ordinary Store Sync + `/tdd` habit.
3. Do **not** move the map into the Store; do **not** delete the map unless the user asks ? it remains a decision-route artifact.

### Non-goals

- Store does not host wayfinder maps or ticket bodies.
- Plan-sized gate does not auto-start implementation under Automatic mode.
- Mode choice is not persisted into `docs/conventions.md` unless the project earns a standing preference ADR/convention later.

Spec ? Architecture Bias updated.

## Answer

Re-resolved against Architecture Bias vocabulary (CONTEXT), closed Loop duties (ticket 07), always-on pointer-only lock (ticket 12), Architecture Review fold-back table (ticket 06), and Wayfinder ?plan, don?t do? / map-as-index norms. Compared five shapes; locked one. Status left `claimed` for parent resolve.

### Locked sequence

| Step | Rule |
|------|------|
| 1. **Stop** | Classify **plan-sized** ? **stop all implementation** in that thread until Destination is met **and** Store fold-back completes, or the user explicitly overrides (?treat as ordinary stretch?). |
| 2. **Mode chooser** | Before charting, offer exactly **Automatic** / **Critical only** / **Full grill**. Wait for a pick unless a **standing per-effort** preference already exists (map Notes or session instruction). **Critical only** if unset. No fourth mode. |
| 3. **Chart outside Store** | Invoke **Wayfinder** (or repo equivalent). **Destination = the architecture/design decision needed**, or a **Product Intent** decision when the blocker is what/why (identity, vision, goals) ? not the full shipping product, not ?implement X,? not shipping code. Map + tickets live on the **issue tracker** (here: `.scratch/<effort>/`). Never under Store paths. |
| 4. **Degrade / inline** | If Wayfinder/skills unavailable: same shape inline in-session (Destination ? decisions ? frontier), still **outside** Store; fold-back rules unchanged. |
| 5. **Work the map** | Claim ? resolve ? Decisions-so-far one-liners. One ticket at a time unless the user overrides (Automatic / Critical-only sweeps). Mode controls **how HITL asks**, never whether fold-back happens. Prototype/research assets link from tickets; they are not Store until fold-back. |
| 6. **Fold-back then implement** | When Destination is met: **Store fold-back first** (same session, before code), **then** implement under Store Sync + `/tdd`. Leave the map as a decision-route artifact (do not move into Store; delete only if the user asks). |

### Mode behaviours

| Mode | Chart / resolve | Ask the human |
|------|-----------------|---------------|
| **Automatic** | Agent recommendations throughout | Only when blocked (missing fact/access) |
| **Critical only** (default) | Recommendations elsewhere | Highest-stakes decisions only |
| **Full grill** | Per Wayfinder / `/grilling` norms | One question at a time on HITL tickets |

Automatic still **plans** ? it does **not** skip fold-back or auto-start implementation once tickets clear.

### Store fold-back (same targets as Architecture Review)

Mandatory before any plan-sized implementation. Prefer folding as decisions crystallize mid-map when durable; **must** complete a Destination-met fold-back pass before code.

| Outcome | Store target |
|--------|----------------|
| Durable product identity / vision / goals | `docs/product.md` (do not invent goals the user never stated) |
| Seams / module shape / earned deep-dive | `docs/architecture.md` and/or `docs/architecture/<kebab>.md` |
| Domain terms | `CONTEXT.md` (via `/domain-modeling`) |
| Hard override / don?t re-suggest | **Offer** ADR under `docs/adr/` (do not auto-write) |
| Earned standing preference | `docs/conventions.md` Project-specific |

No parallel planning log in the Store. Mode choice is **not** written to conventions unless later earned as a standing project preference.

### Resume (v1)

The map path on the issue tracker **is** the resume artifact. Next session opens that map (Notes carry standing mode). Optional AGENTS/Store ?active efforts? pointers stay **deferred fog** ? pointers only if ever added; never map ownership.

### Rejected alternatives

1. **Paste full handoff into the always-on rule.** Rejected: ticket 12 ? rule stays skim-cheap; this ticket + spec ? Architecture Bias own mechanics; rule keeps a pointer.
2. **Host maps/tickets under Store paths** (or ?active efforts? as Store content). Rejected: map Out of scope + AGENTS Planning non-ownership; Store is durable architecture, not a tracker.
3. **Automatic ? implement as soon as tickets clear** (skip explicit fold-back). Rejected: violates fold-back-then-implement and Wayfinder plan-don?t-do; Automatic only changes HITL density.
4. **Destination = ?feature shipped? / carry execution into the map by default.** Rejected: Destination is the architecture decision clear enough to implement; execution follows under ordinary Loop after fold-back (effort Notes may override Wayfinder?s plan-don?t-do only with explicit user intent ? not the Bias default).
5. **Auto-write ADRs on hard overrides.** Rejected: align with Architecture Review ? **offer** ADR; do not auto-write.
6. **Persist mode into `docs/conventions.md` on every chooser pick.** Rejected: per-effort standing preference lives on the map / session; conventions only when earned.

### Surfaces updated

- Spec ? Architecture Bias / Plan-sized handoff (and Memory Loop pointer unchanged in role).
- Map Decisions-so-far one-liner.
- Always-on prototype: pointer-only retained; skim wording aligned (no pasted mechanics).

Detail: [spec.md section Architecture Bias](../spec.md).
