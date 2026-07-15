---
name: drain-tickets
description: "Work a feature's ticket queue frontier-first until no ready-for-agent tickets remain, spawning a fresh implement subagent per ticket with a plan context pack brief."
disable-model-invocation: true
---

# Drain Tickets

Orchestrate implementation across a feature's ticket queue: pick the next unblocked `ready-for-agent` ticket, spawn a **fresh** `implement` subagent for that ticket only, mark it done, repeat until the frontier is empty.

You are the **orchestrator**. Do not implement inline. Do not keep implementing in a finished subagent's context — always spawn new.

Follow **subagent-first** ([`docs/agents/subagents.md`](../../docs/agents/subagents.md) when present): each ticket is a bounded child with a **complete brief** (plan context pack + ticket). Never tell the child to rely on parent conversation history. Parent owns claim / brief assembly / frontier only — not the implementation.

The issue tracker and triage label vocabulary should have been provided to you — run `/setup-matt-pocock-skills` if `docs/agents/issue-tracker.md` is missing.

## Invocation

User passes a feature path (or equivalent tracker parent), e.g.:

```
/drain-tickets .scratch/<feature-slug>/
```

Optional constraints from the user (branch name, "don't commit", seam notes) apply to every spawned implement run.

## Loop

Repeat until stop:

### 1. Find the frontier

Scan the feature's tickets (local: `.scratch/<feature-slug>/issues/*.md`).

A ticket is on the **frontier** when:

- `Status:` is `ready-for-agent` (not `claimed`, `resolved`, `ready-for-human`, `needs-info`, `needs-triage`, or `wontfix`)
- Every blocker listed in `Blocked by:` is `resolved` (or there are no blockers)

Sort by ticket number ascending. The frontier head is the lowest number.

**If the frontier is empty:** do not emit the Done report yet. If this effort produced a **user-runnable** artifact or has a locked Destination/`spec.md`, run Engineering Memory **Prove-it** via **`/prove-it`** (all Destination-named paths + vision + play/feel when in scope) first (parent runs it, or spawn a brief-scoped verify subagent instructed to follow `/prove-it`). Ticket-level tests stay on implement; empty tickets ≠ product finished. On failure: **debug → fix → re-verify → loop** (open/claim follow-up tickets or keep implementing) until Prove-it passes — do not summarize as success. Gap report only on a named hard blocker. Also apply the always-on **Store Sync** architecture freshness gate before Done (corpus matches today; no Install `_TODO_`s with real modules present — write Store or run Architecture Review if plan-sized). Then continue to Done report.

### 2. Claim

Before spawning work, set the frontier head to `Status: claimed` and save so a concurrent session won't take it.

### 3. Assemble the implement brief (plan context pack)

Before spawning, the parent **reads** the effort's plan artifacts and builds a **complete brief** for this ticket. The child has no parent chat — if a detail is needed to implement correctly, it must appear in the brief (path + quote, or inlined gist).

**Always load (when present under the effort path):**

| Artifact | Role in the brief |
|----------|-------------------|
| `map.md` → **Destination** | One- or two-line north star — what “done for the effort” looks like |
| `map.md` → **Notes** | Standing preferences, domain pointers, skills/constraints for this effort |
| `map.md` → **Out of scope** | Hard no-gos the implementer must not expand into |
| `map.md` → **Decisions so far** | Index lines **relevant to this ticket** (not the whole history dump) |
| `spec.md` | Locked product/design truth — path required; paste only sections this ticket depends on |
| Ticket file | Full body: What to build, acceptance criteria, Blocked by, any prototype snippets |
| Each **resolved blocker** ticket | Path + `## Answer` gist (or full Answer if short) — what already landed upstream |
| Store seeds (if Notes / ticket point at them) | `CONTEXT.md`, relevant ADR paths, `docs/architecture.md` (+ named deep-dives) — **paths**, plus a one-line why |

Optional when present: effort `prototypes/` files the ticket or spec links for this slice.

**Size discipline:** Prefer paths + short quotes over pasting entire specs/maps. Do **not** paste every Decisions-so-far line or the whole ticket queue. Do **not** omit Destination, Out of scope, or blocker Answers — those are the usual failure modes when implement drifts.

**Brief template** (fill every section; use `_(none)_` only when truly absent):

```markdown
## Implement brief — <ticket NN title>

### Effort orientation
- Effort path: `.scratch/<feature-slug>/`
- Destination: <quote map Destination, 1–2 lines>
- Spec: <path to spec.md>
- Spec excerpts that gate this ticket:
  <paste only the necessary subsections, or “see spec §… — read before coding”>
- Out of scope (do not expand into):
  <bullets from map Out of scope / spec deferred that touch this area>
- Standing preferences (from map Notes):
  <bullets that affect how this ticket is built>

### Upstream (resolved blockers)
- <NN title> (<path>): <Answer gist — what already exists>
- _(none — can start from greenfield for this slice)_

### This ticket
- Path: `.scratch/<feature-slug>/issues/<NN>-<slug>.md`
- What to build: <from ticket>
- Acceptance criteria:
  - [ ] …
- Relevant decisions (from map Decisions-so-far + linked tickets):
  <gist + path for each decision this slice must honor>

### Seams & constraints
- Pre-agreed TDD seams / test approach: <… or “choose seams; state before red”>
- User / drain constraints (branch, no-commit, etc.): <… or none>
- Domain / Store to load before coding: <paths>

### Fixed point
- Pre-implement HEAD: <sha>
- Scope lock: implement **only** this ticket; no drive-by work on other tickets
- Return: short summary (what landed, files, tests, review, commit SHA, blockers)
```

### 4. Spawn implement (fresh context)

Spawn the `implement` subagent (`~/.cursor/agents/implement.md`) via the Task tool with the filled brief above as the Task `prompt`.

Do not pass the whole queue. Do not resume a prior implement subagent. Never tell the child to “look at the chat” or “read the map yourself for context” without also putting the necessary quotes/paths in the brief — the child may open linked paths, but orientation and blocker Answers must already be in the prompt.

### 5. On success

When the subagent returns successfully:

1. Check off acceptance criteria that the work satisfied
2. Set `Status: resolved`
3. Optionally append a short `## Answer` (what landed + commit SHA) if useful for later tickets
4. Relay a one-line summary to the user
5. Go to step 1 (new frontier — blockers may have unlocked)

### 6. On blocker or failure

If the subagent fails, reports a blocker, or review/tests fail:

1. Leave the ticket `claimed` (or move to `needs-info` / `ready-for-human` if clearly appropriate — ask if unsure)
2. **Stop the drain** — do not skip to the next ticket
3. Tell the user what failed and wait for direction

Never force past a red suite or an unclear brief.

## Rules

- One ticket per implement subagent
- Complete brief per spawn — **plan context pack** + ticket; no history reliance
- Parent assembles Destination / Notes / Out of scope / relevant decisions / blocker Answers before every spawn
- Respect blocking edges — never pick a blocked ticket
- Parent chat stays thin: pick → claim → assemble brief → spawn → mark → repeat
- No drive-by work outside the current ticket
- Do not push unless the user asked

## Done report

When the frontier is empty (after `/prove-it` and architecture freshness pass when applicable) or you stopped on a named hard blocker, summarize:

- Tickets completed (ids/titles + commit SHAs)
- Prove-it evidence: boot + `N/N` Destination paths + vision/feel line + Destination capabilities met (or named Prove-it hard-blocker exception)
- Architecture freshness: corpus current (or Review invoked for plan-sized drift)
- Tickets still open and why (blocked / claimed-failed / non-agent status / fidelity fix-loop in progress)
- Suggested next step if anything remains

Do not paste the full Prove-it or Sync procedures — follow **`/prove-it`** and the Engineering Memory always-on rule (cardinal sin against hollow/unfinished shipping; architecture freshness gate; fix-loop by default).
