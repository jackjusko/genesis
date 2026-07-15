---
name: auto-build
description: >-
  One-shot build from the current chat: grill-with-docs → Wayfinder →
  /to-tickets → /drain-tickets. Prompts for involvement (none/less/medium/more/max).
  Use for one-shot, fully autonomous, AFK build from this chat, or /auto-build.
disable-model-invocation: true
---

# Auto-build

Finish the seed into a shipped product along the fixed pipeline, with **involvement** controlling how much feedback and decisions you collect from the user.

You are the **orchestrator**. Follow **subagent-first** ([`docs/agents/subagents.md`](../../docs/agents/subagents.md) when present): spawn a fresh subagent whenever a complete brief can carry the detail; assume the child is capable for bounded work. Stay on this parent when nuance or cross-cutting synthesis would be lost. Do not implement the product inline once tickets exist — drain does that.

Brief / design notes for this package feature: [`AUTO-BUILD.md`](../../AUTO-BUILD.md) at package root (if present).

## Seed

- **Mid-conversation:** the seed is the **entire prior conversation history** plus this invoke. Do not re-ask decisions already settled in-thread.
- **Fresh chat:** the starting user prompt is the seed.
- Optional focus string after the invoke is additive, not a replacement for history.

## 0. Involvement chooser (before Orient)

**Before** naming Destination or grilling, present exactly these five levels and **wait for a pick** (unless the invoke already names one, e.g. `/auto-build none` or “involvement: medium”):

| Level | Feedback / decisions from the user |
|-------|-------------------------------------|
| **none** | Full auto. Auto-accept every grill recommendation; no ticket-breakdown quiz; drain without asking. Ask only if hard-blocked (missing fact/access you cannot resolve). |
| **less** | Auto-accept recommendations by default; ask only when blocked or a single irreversible fork appears. |
| **medium** | Recommendations elsewhere; ask only **highest-stakes** decisions (scope, Destination shape, hard Store overrides). |
| **more** | Ask on major design branches + confirm the `/to-tickets` breakdown before publish; still recommend first. |
| **max** | Full HITL: one grill question at a time and wait; quiz ticket breakdown; confirm before drain starts. |

Record the pick in the Wayfinder map **Notes** as `Involvement: <level>` for the effort. Do not invent a sixth level.

Token discipline still applies at every level — keep prose minimal; higher involvement means more **waits**, not longer essays.

## Token discipline

- Keep written reasoning to a minimum.
- When auto-accepting: one short question, one recommended answer, mark **accepted** — then continue.
- When asking: question + recommendation, then **wait**.
- No victory laps, no restating the pipeline, no long status essays between stages.
- One-line stage transitions only (e.g. `Wayfinder → charting`, `to-tickets → N tickets`, `drain → 03 resolved`, `smoke → ok`).

## Involvement contract (grill / wayfinder / tickets)

While this skill is the parent, apply the chosen level:

1. Run `/grill-with-docs` (grilling + domain-modeling).
2. **none / less:** emit recommendation and treat as accepted (less: pause only on block or irreversible fork).
3. **medium:** auto-accept routine branches; wait only on highest-stakes decisions.
4. **more / max:** wait for user on the decisions the table requires (max = every grill question).
5. Prefer codebase lookup (explore subagent) over asking when a *fact* is in-repo.
6. Interactive `/grilling` and `/wayfinder` outside `/auto-build` are unchanged (normal HITL).

Standing preference for the Wayfinder map Notes: `Involvement: <level>` (and AFK auto-accept only when level is **none** or **less**).

## Pipeline

Run in order. Do not skip stages.

### 1. Orient

Name the Destination in one short line from the seed. Skip anything history already locked. At **medium+**, confirm Destination if it was not already explicit in the seed.

### 2. Grill-with-docs

Read and follow `grill-with-docs` / `grilling` / `domain-modeling`, under the involvement contract above, until shared understanding of the Destination and major design branches is locked. Fold durable glossary/ADR outcomes as they crystallize (domain-modeling).

### 3. Wayfinder → full spec

Read and follow `wayfinder` against this repo’s tracker (`docs/agents/issue-tracker.md` when local markdown).

1. Chart `.scratch/<effort-slug>/` map + tickets (Destination = full locked spec for this effort). Put `Involvement: <level>` in Notes.
2. Work the frontier applying the same involvement rules on grilling tickets until the Destination is met (complete spec under `.scratch/<effort-slug>/spec.md` or equivalent).
3. Maps stay **outside** the Memory Store. Never fold the map itself into Store paths.

### 4. `/to-tickets`

Read and follow `to-tickets` on the locked spec.

- **none / less / medium:** skip the quiz-the-user step — publish immediately; every ticket `Status: ready-for-agent`.
- **more / max:** present the breakdown and wait for approval (or edits), then publish; every ticket `Status: ready-for-agent`.

### 5. `/drain-tickets`

Read and follow `drain-tickets` on the effort path. Spawn a **fresh** `implement` subagent per ticket with that skill’s **plan context pack** brief (Destination, Notes/Out of scope, relevant decisions, blocker Answers, ticket — not ticket-path-only). Stop on blocker/failure; do not skip the queue.

- **max:** confirm once before drain starts (“begin implement drain?”).
- Other levels: start drain without that confirm.

### 5b. Runtime smoke + Spec fidelity

Before Done: apply Engineering Memory **Prove-it** (cardinal sin against hollow shipping) when a **runnable** deliverable was produced or a Destination/`spec.md` locked experience. Follow **`/prove-it`** (do not paste the playbook here).

1. **Runtime smoke:** debug/dev boot when available; inventory **every Destination-named user path**; exercise each with tools; vision-check surfaces (snapshot/screenshot) for hollow UI / obvious glitches.
2. **Spec fidelity + experience:** all Destination-named paths/capabilities work; when play/graphics apply, require smooth/dynamic/intentional feel **beyond** bare Spec checkboxes. Hollow scaffold / stub / unfinished feel = not Done.
3. Compile / typecheck / unit tests alone are **not** enough. Tickets-resolved alone is **not** enough. Happy-path-only smoke is **not** enough.
4. **On failure:** debug → fix → re-run `/prove-it` → loop (spawn more implement work or keep draining as needed). Do **not** declare the product finished. Gap report **only** on a named hard blocker (credentials / user-only state / irreversible external dependency).
5. Anti-pattern: handing the user a half-broken scaffold to debug.

Parent may run verify or spawn a brief-scoped verify subagent that is instructed to follow `/prove-it`. Done report needs smoke evidence (boot + `N/N` paths + vision/feel) + “Destination capabilities met.”

### 5c. Architecture freshness

Before Done: apply the Engineering Memory always-on **Store Sync** architecture freshness gate (do not paste the Sync body here). Corpus must match today’s shape; Install `_TODO_`s with real modules present = not Done — write the Store in-batch, or run `/improve-codebase-architecture` when the gap is plan-sized / drifted after this Destination. Stub or drifted architecture = not Done.

### 6. Done

Only after §5b `/prove-it` passes (or a named Prove-it hard-blocker exception) **and** §5c architecture freshness passes. Short report: involvement level used, tickets completed (ids/titles + commit SHAs), Prove-it evidence (boot + `N/N` paths + vision/feel), architecture freshness (corpus current / deep-dives earned as needed), Destination capabilities met, any leftover non-agent statuses, one suggested next step if anything remains.

## Subagents

Policy: [`docs/agents/subagents.md`](../../docs/agents/subagents.md).

**Spawn (complete brief — never “look at the chat”):**

- Codebase fact lookup during grill/charting (explore/research)
- Wayfinder **research** tickets (and AFK tasks that fit a brief)
- Optional assist drafting ticket bodies for `/to-tickets` when the slice set is already locked on the parent
- Each implement ticket via `/drain-tickets` (one fresh `implement` subagent; never resume a finished one)
- Optional brief-scoped **Prove-it** verify after drain (`/prove-it` §5b)
- Follow-up implement work when §5b fails (fix-loop until pass)

**Stay on parent (high nuance):**

- Involvement chooser + Destination naming from full history
- Grill question chain / design-tree synthesis (do **not** spawn per grill question)
- Map index, blocking edges, claim/mark orchestration
- Prove-it §5b and architecture freshness §5c ownership (fix-loop) and the final done report

Parent chat stays thin: stage → claim/spawn → mark → next.

## Non-goals

- Always-on auto-entry into this mode.
- Folding wayfinder maps into the Memory Store.
- Changing default interactive grilling/wayfinder outside this skill.
- Pushing remotes unless the user asked.
