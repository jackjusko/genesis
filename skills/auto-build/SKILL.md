---
name: auto-build
description: >-
  Fully autonomous one-shot build from the current chat: auto-accept
  grill-with-docs, Wayfinder Automatic to a full spec, /to-tickets
  (all ready-for-agent), then /drain-tickets until done. Use for one-shot,
  fully autonomous, AFK build from this chat, or /auto-build.
disable-model-invocation: true
---

# Auto-build

Finish the seed into a shipped product **without waiting for HITL**, with minimal narration.

You are the **orchestrator**. Follow **subagent-first** ([`docs/agents/subagents.md`](../../docs/agents/subagents.md) when present): spawn a fresh subagent whenever a complete brief can carry the detail; assume the child is capable for bounded work. Stay on this parent when nuance or cross-cutting synthesis would be lost. Do not implement the product inline once tickets exist — drain does that.

Brief / design notes for this package feature: [`AUTO-BUILD.md`](../../AUTO-BUILD.md) at package root (if present).

## Seed

- **Mid-conversation:** the seed is the **entire prior conversation history** plus this invoke. Do not re-ask decisions already settled in-thread.
- **Fresh chat:** the starting user prompt is the seed.
- Optional focus string after the invoke is additive, not a replacement for history.

## Token discipline

- Keep written reasoning to a minimum.
- Per grill question: one short question, one recommended answer, mark **accepted** — then continue.
- No victory laps, no restating the pipeline, no long status essays between stages.
- One-line stage transitions only (e.g. `Wayfinder → charting`, `to-tickets → N tickets`, `drain → 03 resolved`).

## Auto-accept contract

While this skill is the parent:

1. Run `/grill-with-docs` (grilling + domain-modeling).
2. **Do not wait for the user.** For every grill question, emit the recommendation and treat it as accepted.
3. Prefer codebase lookup (explore subagent) over asking when a *fact* is in-repo.
4. Interactive `/grilling` and `/wayfinder` remain HITL when **not** under `/auto-build`. This override applies only here.

Standing preference for the Wayfinder map Notes: **AFK auto-accept** (Automatic mode; agent may answer for the human on grilling tickets).

## Pipeline

Run in order. Do not skip stages.

### 1. Orient

Name the Destination in one short line from the seed. Skip anything history already locked.

### 2. Auto grill-with-docs

Read and follow `grill-with-docs` / `grilling` / `domain-modeling`, under the auto-accept contract above, until shared understanding of the Destination and major design branches is locked. Fold durable glossary/ADR outcomes as they crystallize (domain-modeling).

### 3. Wayfinder Automatic → full spec

Read and follow `wayfinder` against this repo’s tracker (`docs/agents/issue-tracker.md` when local markdown).

1. Chart `.scratch/<effort-slug>/` map + tickets (Destination = full locked spec for this effort).
2. Work the frontier with AFK auto-accept on grilling tickets until the Destination is met (complete spec under `.scratch/<effort-slug>/spec.md` or equivalent).
3. Maps stay **outside** the Memory Store. Never fold the map itself into Store paths.

### 4. `/to-tickets`

Read and follow `to-tickets` on the locked spec.

**Under auto-build only:** skip the quiz-the-user step — publish the breakdown immediately; every ticket `Status: ready-for-agent`.

### 5. `/drain-tickets`

Read and follow `drain-tickets` on the effort path. Spawn a **fresh** `implement` subagent per ticket. Stop on blocker/failure; do not skip the queue.

### 6. Done

Short report only: tickets completed (ids/titles + commit SHAs), any leftover non-agent statuses, one suggested next step if anything remains.

## Subagents

Policy: [`docs/agents/subagents.md`](../../docs/agents/subagents.md).

**Spawn (complete brief — never “look at the chat”):**

- Codebase fact lookup during grill/charting (explore/research)
- Wayfinder **research** tickets (and AFK tasks that fit a brief)
- Optional assist drafting ticket bodies for `/to-tickets` when the slice set is already locked on the parent
- Each implement ticket via `/drain-tickets` (one fresh `implement` subagent; never resume a finished one)

**Stay on parent (high nuance):**

- Destination naming from full history
- Auto-accept grill question chain / design-tree synthesis (do **not** spawn per grill question)
- Map index, blocking edges, claim/mark orchestration
- One-line stage flips and the final done report

Parent chat stays thin: stage → claim/spawn → mark → next.

## Non-goals

- Always-on auto-entry into this mode.
- Folding wayfinder maps into the Memory Store.
- Changing default interactive grilling/wayfinder to auto-accept outside this skill.
- Pushing remotes unless the user asked.
