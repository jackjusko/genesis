import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { INSTALL_PATHS, preflight } from "./lib/preflight.mjs";

describe("INSTALL_PATHS", () => {
  it("lists the closed Memory Store + AGENTS set", () => {
    const ids = INSTALL_PATHS.map((p) => p.id);
    assert.deepEqual(ids, [
      "CONTEXT.md",
      "docs/adr",
      "docs/adr/README.md",
      "docs/architecture.md",
      "docs/architecture",
      "docs/architecture/README.md",
      "docs/conventions.md",
      "AGENTS.md",
    ]);
  });
});

describe("preflight", () => {
  it("all missing → clean, every path missing", () => {
    const result = preflight({
      read: () => null,
      exists: () => false,
      isDirectory: () => false,
      isFile: () => false,
    });
    assert.equal(result.ok, true);
    assert.equal(result.conflicts.length, 0);
    assert.equal(result.missing.length, INSTALL_PATHS.length);
  });

  it("fully ours → clean no-op (no missing)", () => {
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
    assert.equal(result.ok, true);
    assert.equal(result.conflicts.length, 0);
    assert.equal(result.missing.length, 0);
    assert.equal(result.ours.length, INSTALL_PATHS.length);
  });

  it("any conflict → not ok, lists all conflicts, no writes implied", () => {
    const result = preflight({
      read: (rel) => {
        if (rel === "docs/architecture.md") return "# Foreign\n";
        if (rel === "docs/conventions.md") return "# Also foreign\n";
        return null;
      },
      exists: (rel) =>
        rel === "docs/architecture.md" || rel === "docs/conventions.md",
      isDirectory: () => false,
      isFile: () => false,
    });
    assert.equal(result.ok, false);
    assert.deepEqual(
      result.conflicts.map((c) => c.id).sort(),
      ["docs/architecture.md", "docs/conventions.md"],
    );
  });

  it("existing adr/architecture dirs with foreign README only conflict the README", () => {
    const result = preflight({
      read: (rel) => {
        if (rel === "docs/adr/README.md") return "# Old ADR index\n";
        return null;
      },
      exists: (rel) =>
        rel === "docs/adr" ||
        rel === "docs/architecture" ||
        rel === "docs/adr/README.md",
      isDirectory: (rel) => rel === "docs/adr" || rel === "docs/architecture",
      isFile: () => false,
    });
    assert.equal(result.ok, false);
    assert.deepEqual(
      result.conflicts.map((c) => c.id),
      ["docs/adr/README.md"],
    );
    assert.ok(result.ours.some((c) => c.id === "docs/adr"));
    assert.ok(result.ours.some((c) => c.id === "docs/architecture"));
  });
});
