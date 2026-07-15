# Auto-build one-shot mode — brief

Captured from the product owner. Requirements capture for this feature — not a Memory Store doc.

## Brief (verbatim)

I also want to launch with a fully autonomous, one shot prompt mode, where it will finish its starting prompt or previous prompt(2). This prompt really just needs to run grill me with docs on itsself, and go with every recommended generated answer (try to keep unnecessary written reasoning to a minimum) to save overall token usage. I actually do want to commit wayfairer, and I need the agent to run a full automatic wayfairer interview based on the starting prompt [or signaled prompt in conversation] with the conversation history, and complete a full spec from the full chain of grill me commands, Then, turn it into tickets with command /to-tickets . Mark every ticket as ready for agent, and then call /drain-tickets and the product is finished. Spin up subagents when possible to give extra context, and try to minimize unnecessary output generation. -- also, write everything I just said here to a file in root

## Clarifications (locked)

- **Ship as:** on-demand skill `/auto-build` (orchestrator only — not an always-on rule).
- **Seed:** when invoked mid-conversation, the seed is the **entire prior conversation history** (plus the invoke). Fresh chat = the starting user prompt. Do not re-ask decisions already answered in history.
- **Involvement:** before Orient, prompt for **none** (full auto) / **less** / **medium** / **more** / **max** — how much feedback and decisions to collect from the user. Invoke may pass the level directly (e.g. `/auto-build none`). Record on the map Notes as `Involvement: <level>`.
- **Autonomy:** at **none**, auto-accept every grill recommendation; higher levels ask more. Keep narration/reasoning minimal; parent stays thin.
- **Packaging:** commit Wayfinder into this package; also package `grill-me`, `grill-with-docs`, `to-tickets`, `drain-tickets` (keep existing `grilling` / `domain-modeling`).
- **Subagent-first (framework-wide):** spawn a fresh subagent whenever a complete brief can carry full detail; assume the child is capable for bounded work. Stay on the parent when cross-cutting nuance or live multi-decision synthesis would be lost by summarizing. Canonical policy: [`docs/agents/subagents.md`](docs/agents/subagents.md).
- **Done / Prove-it (cardinal sin):** Done forbids shipping non-functional, far-off-spec, hollow, or unfinished-feel deliverables. Requires **`/prove-it`**: debug/dev boot, **every Destination-named user path**, vision completeness (no obvious glitches/hollowness), and play/feel or graphical quality **beyond** bare Spec minimum when in scope. Tickets-resolved / compile / unit tests / happy-path-only smoke alone are not finished. Do not hand the user a half-broken scaffold to debug.
- **Architecture freshness:** before Done, Architecture Corpus must match today (always-on Store Sync gate). Install `_TODO_`s with real modules present = not Done.
- **Prove-it fix-loop:** on `/prove-it` failure → debug, fix, re-verify, loop. Gap report only when absolutely necessary (named hard blocker).

## Pipeline

0. Involvement chooser (`none` / `less` / `medium` / `more` / `max`).
1. Orient from full conversation history (or starting prompt).
2. Grill-with-docs (HITL density per involvement).
3. Wayfinder until Destination is a full spec.
4. `/to-tickets` — every ticket `ready-for-agent` (quiz only at more/max).
5. `/drain-tickets` until frontier empty (confirm-before-drain only at max).
5b. Prove-it via `/prove-it` (all Destination paths + vision + play/feel; fix-loop on failure).
5c. Architecture freshness (Store Sync gate; stub/drifted corpus = not Done).
6. Short done report (boot + path coverage + vision/feel + architecture freshness + Destination capabilities met).
