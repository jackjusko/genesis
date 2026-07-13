---
name: drain-tickets
description: "Work a feature's ticket queue frontier-first until no ready-for-agent tickets remain, spawning a fresh implement subagent per ticket."
disable-model-invocation: true
---

# Drain Tickets

Orchestrate implementation across a feature's ticket queue: pick the next unblocked `ready-for-agent` ticket, spawn a **fresh** `implement` subagent for that ticket only, mark it done, repeat until the frontier is empty.

You are the **orchestrator**. Do not implement inline. Do not keep implementing in a finished subagent's context — always spawn new.

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

**If the frontier is empty:** stop. Report how many tickets were completed this session and any still blocked / non-agent statuses left.

### 2. Claim

Before spawning work, set the frontier head to `Status: claimed` and save so a concurrent session won't take it.

### 3. Spawn implement (fresh context)

Spawn the `implement` subagent (`~/.cursor/agents/implement.md`) via the Task tool with a complete brief for **this ticket only**:

- Ticket path (and parent `spec.md` if present)
- Acceptance criteria from the ticket
- Any pre-agreed TDD seams / user constraints
- Pre-implement `HEAD` SHA (for code-review fixed point)
- Instruction: stay inside this ticket's scope

Do not pass the whole queue. Do not resume a prior implement subagent.

### 4. On success

When the subagent returns successfully:

1. Check off acceptance criteria that the work satisfied
2. Set `Status: resolved`
3. Optionally append a short `## Answer` (what landed + commit SHA) if useful for later tickets
4. Relay a one-line summary to the user
5. Go to step 1 (new frontier — blockers may have unlocked)

### 5. On blocker or failure

If the subagent fails, reports a blocker, or review/tests fail:

1. Leave the ticket `claimed` (or move to `needs-info` / `ready-for-human` if clearly appropriate — ask if unsure)
2. **Stop the drain** — do not skip to the next ticket
3. Tell the user what failed and wait for direction

Never force past a red suite or an unclear brief.

## Rules

- One ticket per implement subagent
- Respect blocking edges — never pick a blocked ticket
- Parent chat stays thin: pick → claim → spawn → mark → repeat
- No drive-by work outside the current ticket
- Do not push unless the user asked

## Done report

When the frontier is empty (or you stopped on a blocker), summarize:

- Tickets completed (ids/titles + commit SHAs)
- Tickets still open and why (blocked / claimed-failed / non-agent status)
- Suggested next step if anything remains
