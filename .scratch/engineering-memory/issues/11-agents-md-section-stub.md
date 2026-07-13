# What stub does Memory Install drop for the AGENTS.md Engineering Memory section?

Type: prototype  
Status: resolved  
Parent: [Engineering Memory design](../map.md)  
Blocked by: 07

## Question

Given the index-only duties in [What is the Loop artifact inventory?](07-loop-artifact-inventory.md), what exact stub prose does Memory Install append/create under `## Engineering Memory` in AGENTS.md (Store path bullets, rule pointer, skill pointers, planning non-ownership) -- cheap enough to react to before locking the Install drop?

## Prior answer (earlier pass -- re-resolve; do not rubber-stamp)

**Locked Install drop:** [prototypes/agents-md-engineering-memory-section.md](../prototypes/agents-md-engineering-memory-section.md) (strip the PROTOTYPE comment).

**Contents (index only):**

- Heading `## Engineering Memory` (ours marker for the section).
- **Memory Store** bullets -- the five canonical paths.
- **Loop** -- name the always-on rule by title/slug (duties named, not pasted); skills Memory Install + Architecture Review.
- **Planning** -- wayfinder/maps stay outside the Store.

No procedure bodies, sync checklists, or conventions prose. Spec Memory Loop section updated.

## Answer

Re-resolved against closed Loop index duties (ticket 07), Store path set (ticket 02), AGENTS ours = heading only (ticket 10), and hybrid packaging (map / CONTEXT). Compared four shapes; locked one.

**Rejected alternatives:**

1. **Architecture-first Store bullet order** (prior stub). Rejected: agents matching inventory should see ticket 02 closed-set order -- `CONTEXT.md`, `docs/adr/`, `docs/architecture.md`, `docs/architecture/`, `docs/conventions.md`.
2. **Flat bullets under the H2 (no H3 clusters).** Rejected: Store vs Loop vs Planning is the index job; three cheap H3s keep clusters scannable without procedure bodies.
3. **HTML `<!-- engineering-memory:install -->` inside the AGENTS section.** Rejected by ticket 10 -- heading `## Engineering Memory` is the ours marker; no second marker.
4. **Paste always-on rule body, sync checklists, Explore, or `/tdd` as an Install skill.** Rejected by ticket 07 -- index names the three duties and two skills only; Explore is invoke-only; `/tdd` is habit via the rule.

**Locked Install drop:** [prototypes/agents-md-engineering-memory-section.md](../prototypes/agents-md-engineering-memory-section.md). Strip the PROTOTYPE comment only. No HTML install marker in this section.

**Structure (order fixed):**

| Piece | Form | Content at Install |
|-------|------|--------------------|
| Heading | exact `## Engineering Memory` | Ours marker (ticket 10); append section when missing; never whole-file replace |
| Purpose | one line under H2 | Index of Store + Loop wiring; load cue when session touches structure / domain / conventions |
| Memory Store | exact H3 `### Memory Store` | Five canonical paths (ticket 02 order), relative links from repo root, short role labels |
| Loop | exact H3 `### Loop` | Always-on **Engineering Memory** (`engineering-memory`) with three duties named, body not pasted; skills **Memory Install** + **Architecture Review** (display + slug) |
| Planning | exact H3 `### Planning` | Wayfinder / planning maps are not Memory Store paths; durable outcomes land in Store after decisions resolve |

No procedure bodies, sync checklists, conventions prose, or skill bodies.

Detail: [spec.md section Memory Loop](../spec.md).
