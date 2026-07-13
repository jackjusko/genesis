import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  DEPENDENCY_SKILLS,
  planGlobalRefresh,
} from "./lib/refresh-globals.mjs";

const EXPECTED_DEPS = [
  "tdd",
  "codebase-design",
  "domain-modeling",
  "grilling",
  "auto-build",
  "wayfinder",
  "grill-me",
  "grill-with-docs",
  "to-tickets",
  "drain-tickets",
];

describe("planGlobalRefresh", () => {
  it("always overwrites rule + Loop skills + package deps from package", () => {
    const plan = planGlobalRefresh({
      packageRoot: "/pkg",
      agentsSkillsDir: "/home/.agents/skills",
      cursorRulesDir: "/home/.cursor/rules",
    });
    const expectedPairs = [
      [
        "/pkg/rules/engineering-memory.mdc",
        "/home/.cursor/rules/engineering-memory.mdc",
      ],
      [
        "/pkg/skills/improve-codebase-architecture",
        "/home/.agents/skills/improve-codebase-architecture",
      ],
      [
        "/pkg/skills/memory-install",
        "/home/.agents/skills/memory-install",
      ],
      ...EXPECTED_DEPS.map((slug) => [
        `/pkg/skills/${slug}`,
        `/home/.agents/skills/${slug}`,
      ]),
    ];
    assert.deepEqual(
      plan.map((p) => [p.from.replace(/\\/g, "/"), p.to.replace(/\\/g, "/")]),
      expectedPairs,
    );
    assert.deepEqual(DEPENDENCY_SKILLS, EXPECTED_DEPS);
  });

  it("mirrors full package when packageMirrorDir is set", () => {
    const plan = planGlobalRefresh({
      packageRoot: "/pkg",
      agentsSkillsDir: "/home/.agents/skills",
      cursorRulesDir: "/home/.cursor/rules",
      packageMirrorDir: "/home/.agents/engineering-memory",
    });
    const pairs = plan.map((p) => [
      p.from.replace(/\\/g, "/"),
      p.to.replace(/\\/g, "/"),
    ]);
    assert.ok(
      pairs.some(
        ([from, to]) =>
          from === "/pkg/rules" && to === "/home/.agents/engineering-memory/rules",
      ),
    );
    assert.ok(
      pairs.some(
        ([from, to]) =>
          from === "/pkg/skills" && to === "/home/.agents/engineering-memory/skills",
      ),
    );
  });
});
