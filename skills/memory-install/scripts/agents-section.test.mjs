import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  ENGINEERING_MEMORY_HEADING,
  hasEngineeringMemorySection,
  appendEngineeringMemorySection,
} from "./lib/agents-section.mjs";

describe("hasEngineeringMemorySection", () => {
  it("detects exact ## Engineering Memory heading", () => {
    assert.equal(
      hasEngineeringMemorySection("# Repo\n\n## Engineering Memory\n\nIndex.\n"),
      true,
    );
  });

  it("is case-sensitive on the heading", () => {
    assert.equal(hasEngineeringMemorySection("## engineering memory\n"), false);
  });

  it("returns false when missing", () => {
    assert.equal(hasEngineeringMemorySection("## Agent skills\n"), false);
  });
});

describe("appendEngineeringMemorySection", () => {
  it("appends section with leading blank line when file has content", () => {
    const section = `${ENGINEERING_MEMORY_HEADING}\n\nIndex.\n`;
    const out = appendEngineeringMemorySection("## Agent skills\n\nHi.\n", section);
    assert.equal(out, "## Agent skills\n\nHi.\n\n## Engineering Memory\n\nIndex.\n");
  });

  it("writes section alone when file is empty", () => {
    const section = `${ENGINEERING_MEMORY_HEADING}\n\nIndex.\n`;
    assert.equal(appendEngineeringMemorySection("", section), section);
  });

  it("is a no-op when section already present", () => {
    const existing = "## Engineering Memory\n\nAlready.\n";
    assert.equal(appendEngineeringMemorySection(existing, "## Engineering Memory\n\nNew.\n"), existing);
  });
});
