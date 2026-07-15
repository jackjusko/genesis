<!-- engineering-memory:install -->

# Architecture

Living map of this repo’s **modules** and **seams** for agents and humans.
Domain names come from [`CONTEXT.md`](../CONTEXT.md). Hard decisions live in [`docs/adr/`](adr/). Coding defaults live in [`docs/conventions.md`](conventions.md).

**How to use:** load this file whenever the session writes or changes code (not only when you already know the change is “structural”). Prefer a linked deep-dive over growing this file past a skim. Write what is true **today** — not a target architecture. After real modules exist, leaving Install `_TODO_` placeholders here is a **Store Sync failure** — fill or earn a deep-dive in the same batch.

## System shape

<!-- Short: one paragraph + optional bullets or mermaid. Cover (1) top-level modules and how they relate, (2) main request/data flows, (3) named entrypoints. Put Interface detail under Key seams. -->

_TODO: name top-level modules and relations; main request/data flows; named entrypoints._

<!-- Example (delete when real):
```mermaid
flowchart LR
  CLI --> Core
  Core --> Adapters
```
-->

## Key seams

<!-- Bullet list of every top-level seam (not a selective handful). Fixed recipe per item — use codebase-design vocabulary (Module, Interface, Seam, Adapter); never “service,” “API,” or “boundary.” -->

- _TODO: **SeamName** — Interface: what callers must know; varies: what adapters swap across the seam._

## Deep-dives

Subsystem detail lives under [`docs/architecture/`](architecture/) as kebab-case files, linked from this table when earned. Do not pre-seed stubs. Relative link form from this file: `architecture/<kebab-slug>.md`.

**Earn a deep-dive when** a subsystem needs more than one hop to explain, has been touched across sessions, or would bloat Key seams. Prefer earning early over leaving the primary past-skim.

| Deep-dive | When to open it |
|-----------|-----------------|
| _(none yet)_ | Add a row when a subsystem has earned its own home. |

<!-- On first earn: replace the _(none yet)_ row (do not leave it beside real rows). Example:
| [billing-write-model](architecture/billing-write-model.md) | Write-path modules, outbox seam, payment adapters |
-->

## Out of scope for this doc

Runtime runbooks, ticket trackers / wayfinder maps, and ADR rationale dumps. Point elsewhere; keep this file a map of structure.
