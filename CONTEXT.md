# Engineering Memory

Domain language for a Cursor-installable system that keeps large-codebase agent work coherent across sequential edits.

## Language

**Engineering Memory**:
The product as a whole: durable project knowledge plus the agent habits that keep it true.
_Avoid_: memory (alone), vibe memory, agent brain

**Memory Store**:
The living document set in a target repo that agents must read and keep current. It **extends** the existing domain-docs kit (`CONTEXT.md` + `docs/adr/`) with an architecture corpus and any other docs the Loop requires — not a parallel brain beside them. It does **not** own planning/wayfinding maps; those stay separate decision-route artifacts, and durable outcomes land in the Store after decisions resolve.
_Avoid_: knowledge base, wiki, context dump

**Architecture Corpus**:
The Memory Store documents that describe the system’s structure and module seams. Default load is one primary architecture doc (scaffolded on Memory Install); linked deep-dives are filled liberally when a subsystem has earned its own home — scaffold may include an empty deep-dive folder, not a wall of pre-written subsystem docs.
_Avoid_: architecture dump, system overview (when used as the corpus name)

**Memory Loop**:
The installed agent behaviors that force reference and update of the Memory Store. Default Cursor split: **AGENTS.md** as index, **one always-on rule** for Store Sync + Architecture Bias + the `/tdd` habit (use when writing or changing code — not a separate Install skill), **skills** for Memory Install + Architecture Review only (no optional sync skill — Store Sync is always-on), **subagents** only when a workflow is long enough to isolate (e.g. Architecture Review explore). Built from existing Cursor skills and organic practice, not a parallel process framework.
_Avoid_: process (alone), hooks (alone), automation

**Store Sync**:
The Memory Loop obligation for Store freshness: load relevant Store docs at session start; write back material changes before the session ends; update the Store in the same batch as the code when a change is structural (new seam, renamed module, convention shift).
_Avoid_: constant update, always sync

**Architecture Bias**:
The Loop’s standing preference when shaping code and the Architecture Corpus: deep modules and clear seams as soft defaults, plus agent-authored conventions aimed at known best practices, scalability, and long-term outlook — willing to do extra work to preserve that over short-term minimalism. When a change would stretch the current corpus thin or force a hacky/short-term fit, **prefer expanding the architecture** over a short-sighted implementation decision; the extension must fit the existing corpus and this bias. **Ordinary stretch:** design the extension, implement, and write it into the Store in the same batch. **Plan-sized change** (size/complexity needs a designed architecture update before code): stop implementing; offer the user **Automatic** (all recommendations), **Critical only** (few highest-stakes questions, recommendations elsewhere; default if unset), or **Full grill**; run planning outside the Memory Store (Wayfinder or equivalent); when decisions resolve, update the Store, then implement. Humans need not fill a conventions doc for the bias to operate; ADRs still record hard overrides. Does not mean inventing a full corpus when the Store was never installed — note the gap and degrade.
_Avoid_: house style (when it implies human-authored only), strict playbook

**Memory Install**:
The one-shot skill that lays down Engineering Memory in a target repo, and the **sole updater** of user-global Loop artifacts afterward. Default footprint is a **full scaffold** of the **project-local** Memory Store and AGENTS.md Engineering Memory section. **Hybrid packaging**: reusable Loop skills/rules ship user-global (package-owned — every Install invoke replaces them with packaged latest); Memory Install then lays down or merge-preflights the project Store + AGENTS.md wiring. Project Store docs are never auto-upgraded from newer stubs (ours/skip); living content grows via Store Sync / Architecture Review or explicit interactive merge.
_Avoid_: bootstrap (alone), setup script, memory-upgrade (as a separate skill)

**Architecture Review**:
A deepening pass: the `/improve-codebase-architecture` skill evolved in place (not a fork), surfaced under this name. Same explore → temp HTML → grill process; when decisions crystallize, findings fold back into the Memory Store (Architecture Corpus, glossary, ADRs when earned, conventions when earned) — no parallel review log. Default triggers: milestone/phase boundaries, and friction (repeated Store Sync thrash, hard-to-test seams, agent can’t locate a seam). Manual invoke remains available; not a fixed every-N-sessions ritual.
_Avoid_: refactor sweep, cleanup pass
