---
name: prove-it
description: >-
  Pre-ship simulation QA: debug/dev boot, walk every Destination-named user
  path, vision-check for hollow UI and visual glitches, and verify play/feel or
  graphical polish beyond bare Spec minimum. Use when claiming Done, ready for
  the user, auto-build/drain Prove-it, runtime smoke, Spec fidelity, playtest,
  or visual completeness.
disable-model-invocation: true
---

# Prove-it (simulation QA)

Full pre-ship playbook for runnable deliverables. Always-on **Prove-it** triggers and the cardinal-sin bar live in the Engineering Memory rule; this skill is the procedure. Thin gates in `/auto-build` and `/drain-tickets` invoke this playbook — do not paste it into those skills.

On any failure: **debug → fix → re-run from the failed step → loop**. Gap report to the user **only** on a named hard blocker (credentials / interactive TTY / user-only machine state / irreversible external dependency). Still prove everything the session can run.

## 1. Inventory paths

From the locked Destination / `spec.md` (and Product Intent when it names user-facing flows):

1. List **every Destination-named user path** — primary loop, menus/hubs, secondary flows, fail/empty/error states the Spec calls out, and any “player can …” / “user can …” capabilities.
2. Treat that list as the **mandatory simulation set**. Spec silence on an edge case does **not** invent paths; Spec naming a path **does** require exercising it.
3. Note product shape: web / CLI / game / desktop / mixed — tools and readiness signals follow the shape.

If there is no locked Destination and no runnable artifact, skip simulation QA (Handoff rules in the always-on rule still apply).

## 2. Debug / dev boot

1. Prefer the **debug or development entrypoint** when the project has one (dev script, debug build, local server with source maps) — that is the simulation build. Use production/release boot only when no debug/dev entry exists or the Destination explicitly requires shipping-config verification.
2. Start it the way a user would (package scripts / README / Destination). Wait for a real ready signal (process up, port answers, window/headless ready, CLI prompt).
3. Match tools to shape: web → browser navigate + snapshot/screenshot; CLI → invoke entrypoint + assert output; game → boot script/dev server + readiness, then interact/observe as tools allow.
4. Compile / typecheck / unit tests alone are **not** boot proof.

## 3. Walk every path

For **each** path in the inventory:

1. Drive it with tools as far as the session can (clicks, keystrokes, commands, API/UI flows).
2. Confirm the path **completes** its promised outcome (or fails gracefully when the Spec’s fail state is the path).
3. Record one-line evidence per path (what you did + what you observed).

Skipping a Destination-named path is a Prove-it failure. “Happy path only” is **not** enough.

## 4. Vision pass (looks finished)

On every interactive/visual surface touched in §3 (and the first viewport / main hub after boot):

1. Capture **browser snapshot and/or screenshot** (or the closest visual evidence the shape allows).
2. Fail on **obvious** end-user breakdowns, including:
   - blank, placeholder, lorem, “TODO”, or stub chrome where finished UI was promised
   - clipped/overlapping text, broken layout, empty panels that should have content
   - missing assets (broken images/icons), unstyled dumps, debug-only overlays left on
   - controls that look active but do nothing on the path under test
3. The product must look **complete to an end user** on those surfaces — not merely mount without throwing.

## 5. Play / feel (beyond bare Spec)

Bare functional presence is **not** the bar. When the Destination implies gameplay, motion, spatial UI, or a graphical experience, also verify:

| Concern | Fail if… |
|---------|----------|
| **Smoothness** | Core loop feels broken: hitching that blocks play, input ignored/queued wrongly, transitions that strand the user |
| **Dynamics** | Promised live/reactive behavior is static, frozen, or one-shot when the Spec implies ongoing play or feedback |
| **Graphical experience** | Readable but hollow: missing feedback, no readable state change, “tech demo” emptiness where a finished feel was in Destination |
| **Pacing / flow** | Dead ends, softlocks, or mandatory waits with no feedback on Destination paths |

Apply judgment proportional to product shape: a CLI needs crisp correct I/O, not animation; a game or rich UI needs the experience to feel intentional and finished, **above** the minimum that merely satisfies a checklist line in the Spec.

## 6. Spec fidelity gate

Re-read Destination / `spec.md`. Confirm:

- Every inventoried path was exercised and passed §3–§5 as applicable
- No hollow scaffold / stub core loop / “opens but isn’t the product”
- Experience quality meets §5 when play or graphics are in scope

## 7. Evidence (done report)

Keep it short — parent done reports stay one–two lines plus path coverage:

- Boot: entrypoint + ready signal
- Paths: `N/N Destination paths exercised` (name any hard-blocker skips)
- Vision: surfaces checked + no obvious glitches (or named failures fixed)
- Feel: one line on play/graphical quality when in scope

## Anti-patterns

- Declaring Done after tickets/tests/compile only
- Smoking only the happy path when the Spec named more
- Ignoring visual hollowness because “it runs”
- Meeting Spec checkboxes while the play/feel is clearly unfinished
- Handing the user a half-broken build to debug
