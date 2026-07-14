# Subagents

Framework-wide **subagent-first** policy for Engineering Memory Loop orchestration (including `/auto-build`, `/drain-tickets`, `/wayfinder`, Architecture Review).

## Default

Spin up a **fresh** subagent for any bounded task whose inputs fit a **complete brief** (paths, acceptance criteria, constraints, relevant seed quotes). Assume the subagent model is capable for that bounded work.

Do not keep doing the next bounded task in a finished subagent’s context — spawn new.

When spawning, pass everything the child needs. Never tell it to “look at the chat.” Prefer a one-line parent relay of child results.

## Stay on the parent when

- Decisions need the whole conversation, map, or design tree in one mind (e.g. Destination naming from full history; auto-accept grill synthesis across branches).
- Nuance or cross-cutting judgment is too high to compress into a brief without losing the task.
- The next step is pure orchestration (claim ticket, mark resolved, one-line stage flip).

## Examples

| Spawn | Stay on parent |
|-------|----------------|
| Codebase fact lookup (explore/research) | Auto-accept grill question chain |
| One Wayfinder research ticket | Charting Destination + map index |
| One implement ticket via drain | Claiming / marking tickets |
| Architecture Review Explore walk | User pick + fold-back synthesis |

Interactive `/grilling` stays HITL unless the parent skill is `/auto-build` (AFK auto-accept). Do **not** spawn a subagent per grill question — the design tree is high-nuance parent work.
