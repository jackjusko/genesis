# How do global Loop skills update after install?

Type: grilling  
Status: resolved  
Parent: [Engineering Memory design](../map.md)  
Blocked by: 07

## Question

After Memory Install, how do user-global Loop skills/rules receive updates (manual re-install, version pin, upgrade skill), and what happens to project-local Store scaffolds that diverge from newer templates?

## Answer

**Sole updater:** Memory Install is the only path that refreshes user-global Loop artifacts. No separate upgrade skill, no parallel “sync globals” command.

**Every invoke:** (1) replace user-global Loop artifacts (`engineering-memory` rule, `memory-install`, Architecture Review / `improve-codebase-architecture`) with the **packaged latest**; (2) run project preflight/merge as today. No globals-only mode or flag in v1 — a clean already-installed project is a no-op on step 2.

**Globals are package-owned:** always overwrite on Install. Local edits to global rule/skills are not preserved (re-apply after upgrade if needed). No interactive merge surface for globals.

**Project Store is project-owned:** never auto-upgrade living Store docs when templates advance. Re-run keeps merge rules — **ours → skip**, **missing → create**, **conflict → fail + offer interactive merge**. Newer stub shape reaches an installed repo only via explicit interactive merge or ordinary Store Sync / Architecture Review growth.

**Parked (fog):** version pins and changelogs between Loop releases and installed repos — not part of this decision.