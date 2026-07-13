# How do global Loop skills update after install?

Type: grilling  
Status: resolved  
Parent: [Engineering Memory design](../map.md)  
Blocked by: 07

## Question

After Memory Install, how do user-global Loop skills/rules receive updates (manual re-install, version pin, upgrade skill), and what happens to project-local Store scaffolds that diverge from newer templates?

## Prior answer (earlier pass -- re-resolve; do not rubber-stamp)
**Sole updater:** Memory Install is the only path that refreshes user-global Loop artifacts. No separate upgrade skill, no parallel "sync globals" command.

**Every invoke:** (1) replace user-global Loop artifacts (`engineering-memory` rule, `memory-install`, Architecture Review / `improve-codebase-architecture`) with the **packaged latest**; (2) run project preflight/merge as today. No globals-only mode or flag in v1 -- a clean already-installed project is a no-op on step 2.

**Globals are package-owned:** always overwrite on Install. Local edits to global rule/skills are not preserved (re-apply after upgrade if needed). No interactive merge surface for globals.

**Project Store is project-owned:** never auto-upgrade living Store docs when templates advance. Re-run keeps merge rules -- **ours -> skip**, **missing -> create**, **conflict -> fail + offer interactive merge**. Newer stub shape reaches an installed repo only via explicit interactive merge or ordinary Store Sync / Architecture Review growth.

**Parked (fog):** version pins and changelogs between Loop releases and installed repos -- not part of this decision.

## Answer

Re-resolved against closed Loop inventory (ticket 07), Install merge classes (ticket 05), hybrid packaging (map / CONTEXT / Product & packaging), and Architecture Review ship location (ticket 06). Compared: sole Install updater vs separate upgrade skill; always-replace vs ensure-present / merge globals; every-invoke dual step vs globals-only flag; Store auto-upgrade vs ours/skip; project-first vs globals-first order.

### Sole updater

**Memory Install** is the only path that refreshes user-global Loop artifacts. No `memory-upgrade` skill, no parallel "sync globals" command, no self-refresh from Architecture Review or the always-on rule.

Closed global set (ticket 07 + package deps) rewritten every refresh:

| Artifact | Destination |
|----------|-------------|
| Always-on rule `engineering-memory` | `~/.cursor/rules/engineering-memory.mdc` |
| Memory Install `memory-install` | `~/.agents/skills/memory-install/` |
| Architecture Review `improve-codebase-architecture` | `~/.agents/skills/improve-codebase-architecture/` |
| Package-owned deps (core-four + auto-build pipeline) | `~/.agents/skills/<slug>/` (see [`skills/DEPENDENCIES.md`](../../skills/DEPENDENCIES.md)) |

Package mirror / refresh cache (if any) is Install plumbing only -- not a Loop behavioral surface and not a second update path (ticket 07).

### Every invoke -- two ordered steps

1. **Globals first:** always replace the closed global set with **packaged latest** from the Engineering Memory **package root** this Install was invoked against (checkout preferred as source of truth). Treat the global set as one step: fail loudly if any global write fails; do not proceed to project writes on a half-updated global set.
2. **Then project:** run full-scaffold / merge-preflight on the target repo's Store + `## Engineering Memory` (ticket 05).

No globals-only mode or flag in v1. A fully installed clean project (all paths missing or ours) is a **success no-op on step 2**; step 1 still ran. First install and re-install share this path.

**Order consequence:** a project conflict does **not** roll back globals. Loop skill/rule fixes still land when brownfield merge is blocked -- desirable under hybrid packaging.

### Globals are package-owned

Always overwrite. No interactive merge, three-way merge, or "ours" classification for user-global rule/skills. Local edits to globals are **not** preserved -- re-apply after the next Install if needed. Agents must not treat `~/.cursor/rules/engineering-memory.mdc` or the global skill folders as project-owned docs.

### Project Store (+ AGENTS index) are project-owned

Never auto-upgrade living project files when Install stubs advance. Step 2 keeps ticket 05:

| Class | Action |
|-------|--------|
| **ours** | Skip (including `## Engineering Memory` when the heading is present) |
| **missing** | Create / append |
| **conflict** | Atomic fail + offer interactive merge (explicit yes) |

Newer stub shape reaches an already-installed repo only via **explicit interactive merge** or ordinary growth (Store Sync / Architecture Review fold-back). The AGENTS index is project-local like the Store -- not refreshed by global replace.

### Deferred (fog)

Version pins, release changelogs, and "which installed repos are behind which Loop release" stay out of v1. Without pins, always-replace on every Install invoke is the freshness guarantee.

### Rejected alternatives

1. **Separate upgrade / sync-globals skill** -- second discovery surface; CONTEXT already avoids `memory-upgrade`; sole updater keeps one habit.
2. **Ensure-present only (no overwrite)** -- leaves globals stale after package advances; contradicts ticket 07's sole-updater duty.
3. **Merge or preserve local global edits** -- globals are shared across repos; per-user forks break "one Loop, many Stores."
4. **Auto-upgrade project Store / AGENTS when stubs advance** -- destroys living corpus and brownfield safety; ticket 05 ours/skip wins.
5. **Globals-only flag / mode in v1** -- rare need; clean already-installed project already no-ops step 2; flag adds CLI fog without pins.
6. **Project-first, or roll back globals on project conflict** -- would withhold Loop fixes from brownfield conflicted repos; globals-first without rollback is intentional.
7. **Architecture Review or always-on rule self-updating globals** -- splits updater duty; only Install writes the global set.
8. **Version pins / changelog gating in v1** -- deferred; always-replace is enough until a later packaging effort.

Detail: [spec.md Product & packaging](../spec.md) / [Memory Loop](../spec.md) / [Memory Install](../spec.md).
