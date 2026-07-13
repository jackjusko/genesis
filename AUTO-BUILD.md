# Auto-build one-shot mode — brief

Captured from the product owner. Requirements capture for this feature — not a Memory Store doc.

## Brief (verbatim)

I also want to launch with a fully autonomous, one shot prompt mode, where it will finish its starting prompt or previous prompt(2). This prompt really just needs to run grill me with docs on itsself, and go with every recommended generated answer (try to keep unnecessary written reasoning to a minimum) to save overall token usage. I actually do want to commit wayfairer, and I need the agent to run a full automatic wayfairer interview based on the starting prompt [or signaled prompt in conversation] with the conversation history, and complete a full spec from the full chain of grill me commands, Then, turn it into tickets with command /to-tickets . Mark every ticket as ready for agent, and then call /drain-tickets and the product is finished. Spin up subagents when possible to give extra context, and try to minimize unnecessary output generation. -- also, write everything I just said here to a file in root

## Clarifications (locked)

- **Ship as:** on-demand skill `/auto-build` (orchestrator only — not an always-on rule).
- **Seed:** when invoked mid-conversation, the seed is the **entire prior conversation history** (plus the invoke). Fresh chat = the starting user prompt. Do not re-ask decisions already answered in history.
- **Autonomy:** auto-accept every grill recommendation; keep narration/reasoning minimal; spawn subagents for codebase facts / implement drain; parent stays thin.
- **Packaging:** commit Wayfinder into this package; also package `grill-me`, `grill-with-docs`, `to-tickets`, `drain-tickets` (keep existing `grilling` / `domain-modeling`).

## Pipeline

1. Orient from full conversation history (or starting prompt).
2. Auto grill-with-docs (accept every recommendation; minimal prose).
3. Wayfinder Automatic until Destination is a full spec.
4. `/to-tickets` — every ticket `ready-for-agent`.
5. `/drain-tickets` until frontier empty.
6. Short done report.
