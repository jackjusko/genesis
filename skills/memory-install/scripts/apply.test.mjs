import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { planProjectWrites } from "./lib/apply.mjs";
import { preflight } from "./lib/preflight.mjs";

describe("planProjectWrites", () => {
  it("returns empty when preflight has conflicts", () => {
    const result = preflight({
      read: (rel) => (rel === "CONTEXT.md" ? "# Foreign\n" : null),
      exists: (rel) => rel === "CONTEXT.md",
      isDirectory: () => false,
      isFile: () => false,
    });
    assert.equal(result.ok, false);
    assert.deepEqual(planProjectWrites(result), []);
  });

  it("plans creates only for missing paths on clean preflight", () => {
    const result = preflight({
      read: () => null,
      exists: () => false,
      isDirectory: () => false,
      isFile: () => false,
    });
    const plan = planProjectWrites(result);
    assert.ok(plan.every((p) => p.action === "create" || p.action === "mkdir" || p.action === "append-section"));
    assert.ok(plan.some((p) => p.id === "CONTEXT.md" && p.action === "create"));
    assert.ok(plan.some((p) => p.id === "docs/adr" && p.action === "mkdir"));
    assert.ok(plan.some((p) => p.id === "AGENTS.md" && p.action === "append-section"));
  });

  it("plans nothing when fully installed", () => {
    const oursFiles = new Set([
      "CONTEXT.md",
      "docs/adr/README.md",
      "docs/architecture.md",
      "docs/architecture/README.md",
      "docs/conventions.md",
    ]);
    const result = preflight({
      read: (rel) => {
        if (rel === "AGENTS.md") return "## Engineering Memory\n";
        if (oursFiles.has(rel)) return "<!-- engineering-memory:install -->\n";
        return null;
      },
      exists: (rel) =>
        oursFiles.has(rel) ||
        rel === "AGENTS.md" ||
        rel === "docs/adr" ||
        rel === "docs/architecture",
      isDirectory: (rel) => rel === "docs/adr" || rel === "docs/architecture",
      isFile: () => false,
    });
    assert.deepEqual(planProjectWrites(result), []);
  });
});
