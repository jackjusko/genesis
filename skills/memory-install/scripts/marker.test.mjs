import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { hasInstallMarker } from "./lib/marker.mjs";

describe("hasInstallMarker", () => {
  it("returns true when marker is the first non-empty line", () => {
    const text = "<!-- engineering-memory:install -->\n\n# Architecture\n";
    assert.equal(hasInstallMarker(text), true);
  });

  it("returns true when marker appears within the first 20 lines", () => {
    const text = [
      "",
      "<!-- note -->",
      "<!-- engineering-memory:install -->",
      "# Title",
    ].join("\n");
    assert.equal(hasInstallMarker(text), true);
  });

  it("returns false when marker is missing", () => {
    assert.equal(hasInstallMarker("# Domain\n\nLiving glossary.\n"), false);
  });

  it("returns false when marker is past the first 20 lines", () => {
    const lines = Array.from({ length: 21 }, (_, i) => `line ${i + 1}`);
    lines.push("<!-- engineering-memory:install -->");
    assert.equal(hasInstallMarker(lines.join("\n")), false);
  });

  it("is case-sensitive and exact", () => {
    assert.equal(hasInstallMarker("<!-- Engineering-Memory:install -->\n"), false);
    assert.equal(hasInstallMarker("<!-- engineering-memory:install -->\n"), true);
  });
});
