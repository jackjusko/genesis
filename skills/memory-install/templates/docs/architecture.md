<!-- engineering-memory:install -->

# Architecture

Living map of this repo’s **modules** and **seams** for agents and humans.
Domain names come from [`CONTEXT.md`](../CONTEXT.md). Hard decisions live in [`docs/adr/`](adr/). Coding defaults live in [`docs/conventions.md`](conventions.md).

**How to use:** load this file when a change touches structure (new seam, renamed module, crossed package). Prefer a linked deep-dive over growing this file past a skim.

## System shape

<!-- One short paragraph + optional mermaid/list: the handful of top-level modules and how they relate. Write what is true today — not a target architecture. -->

_TODO: name the top-level modules and the main seams between them._

## Key seams

<!-- Bullet list. Each item: seam name, what sits behind it, what callers must know (the Interface). Use codebase-design vocabulary: Module, Interface, Seam, Adapter — not “service/API/boundary.” -->

- _TODO: Seam — what varies across it; what stays stable for callers._

## Deep-dives

Subsystem detail lives under [`docs/architecture/`](architecture/) as kebab-case files, linked from here when earned. Do not pre-seed stubs.

| Deep-dive | When to open it |
|-----------|-----------------|
| _(none yet)_ | Add a row when a subsystem has earned its own home. |

<!-- Example row after earn:
| [billing-write-model](architecture/billing-write-model.md) | Write-path modules, outbox seam, payment adapters |
-->

## Out of scope for this doc

Runtime runbooks, ticket trackers / wayfinder maps, and ADR rationale dumps. Point elsewhere; keep this file a map of structure.
