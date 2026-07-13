<!-- engineering-memory:install -->

# Conventions

Agent-authored coding defaults under **Architecture Bias**. Soft defaults for this repo; **ADRs win** when they conflict. Humans need not fill this file for Bias to operate — agents grow the **Project-specific** section when a standing preference is earned.

## Deep modules

Prefer **deep modules**: lots of behaviour behind a small **interface**, at a deliberate **seam**.

Use this vocabulary exactly (do not substitute “service,” “API,” or “boundary”): **module**, **interface**, **depth**, **seam**, **adapter**, **leverage**, **locality**.

- **Depth** is leverage at the interface — behaviour callers can exercise per unit of interface they must learn — not an implementation-line count.
- **Deletion test:** if deleting the module only moves complexity to callers, it was earning its keep; if complexity vanishes, it was a pass-through.
- **One adapter** = hypothetical seam; **two adapters** = real seam. Don’t invent ports for fashion.
- The **interface is the test surface**: callers and tests cross the same seam.

For deepening or redesign workflows, invoke `/codebase-design` (and its companions). Do not paste skill bodies here.

## Tests & seams

Standing preferences when tests touch design (the red→green ritual stays in `/tdd`):

- Verify behaviour through public **interfaces**, not internals.
- Place tests at agreed **seams**.
- Accept dependencies; don’t create them inside the unit under test.
- Prefer returning results over hidden side effects where practical.
- Prefer tests that survive internal refactors.

When writing or changing code, use `/tdd` for the habit and procedure detail.

## Long-term bias

- Prefer evolvable **seams** over short-term call-site convenience when a change is structural.
- Prefer honest failure and readable decision signals over silent catch-and-continue.
- Prefer fewer, deeper modules over many shallow pass-throughs when both are options.

Extra work to preserve these is expected under Architecture Bias.

## Skill pointers

| Need | Invoke |
|------|--------|
| Deepen / redesign a module | `/codebase-design` |
| Write or change code | `/tdd` |
| Architecture deepening pass | Architecture Review (`/improve-codebase-architecture`) |
| Stack-specific catalogs (HTTP, React, observability, a11y, …) | Cite the matching skill when the stack earns it; paraphrase into **Project-specific** only then |

Never paste a whole skill into this file.

## Project-specific

<!-- Agents add earned standing preferences here under Architecture Bias / Store Sync / Architecture Review. -->
