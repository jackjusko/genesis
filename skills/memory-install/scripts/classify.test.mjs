import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { classifyPath } from "./lib/classify.mjs";

describe("classifyPath", () => {
  it("classifies absent path as missing", () => {
    assert.equal(
      classifyPath({ kind: "file", exists: false }),
      "missing",
    );
  });

  it("classifies docs/adr and docs/architecture dirs as ours when present", () => {
    assert.equal(
      classifyPath({ kind: "dir", exists: true, path: "docs/adr" }),
      "ours",
    );
    assert.equal(
      classifyPath({ kind: "dir", exists: true, path: "docs/architecture" }),
      "ours",
    );
  });

  it("classifies file with install marker as ours", () => {
    assert.equal(
      classifyPath({
        kind: "file",
        exists: true,
        content: "<!-- engineering-memory:install -->\n# Architecture\n",
      }),
      "ours",
    );
    assert.equal(
      classifyPath({
        kind: "file",
        exists: true,
        content: "<!-- engineering-memory:install -->\n# Product Intent\n",
      }),
      "ours",
    );
  });

  it("classifies existing file without marker as conflict", () => {
    assert.equal(
      classifyPath({
        kind: "file",
        exists: true,
        content: "# Foreign architecture\n",
      }),
      "conflict",
    );
    assert.equal(
      classifyPath({
        kind: "file",
        exists: true,
        content: "# Foreign product brief\n",
      }),
      "conflict",
    );
  });

  it("classifies file↔directory mismatch as conflict", () => {
    assert.equal(
      classifyPath({
        kind: "file",
        exists: true,
        isDirectory: true,
        content: null,
      }),
      "conflict",
    );
    assert.equal(
      classifyPath({
        kind: "dir",
        exists: true,
        isFile: true,
      }),
      "conflict",
    );
  });

  it("classifies AGENTS.md by Engineering Memory heading, not install marker", () => {
    assert.equal(
      classifyPath({
        kind: "agents",
        exists: true,
        content: "## Agent skills\n\n## Engineering Memory\n\nIndex.\n",
      }),
      "ours",
    );
    assert.equal(
      classifyPath({
        kind: "agents",
        exists: true,
        content: "## Agent skills\n",
      }),
      "missing",
    );
    assert.equal(
      classifyPath({
        kind: "agents",
        exists: false,
      }),
      "missing",
    );
  });
});
