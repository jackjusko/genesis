import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  DEPENDENCY_SKILLS,
  planGlobalRefresh,
} from "./lib/refresh-globals.mjs";

describe("planGlobalRefresh", () => {
  it("always overwrites rule + Loop skills + core-four deps from package", () => {
    const plan = planGlobalRefresh({
      packageRoot: "/pkg",
      agentsSkillsDir: "/home/.agents/skills",
      cursorRulesDir: "/home/.cursor/rules",
    });
    assert.deepEqual(
      plan.map((p) => [p.from.replace(/\\/g, "/"), p.to.replace(/\\/g, "/")]),
      [
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
        ["/pkg/skills/tdd", "/home/.agents/skills/tdd"],
        [
          "/pkg/skills/codebase-design",
          "/home/.agents/skills/codebase-design",
        ],
        [
          "/pkg/skills/domain-modeling",
          "/home/.agents/skills/domain-modeling",
        ],
        ["/pkg/skills/grilling", "/home/.agents/skills/grilling"],
      ],
    );
    assert.deepEqual(DEPENDENCY_SKILLS, [
      "tdd",
      "codebase-design",
      "domain-modeling",
      "grilling",
    ]);
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
