import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { after, before, describe, it } from "node:test";
import {
  findNonCanonicalArchitectureDocs,
  resolvePackageRoot,
  runMemoryInstall,
} from "./lib/install.mjs";

function mkTmp(prefix) {
  return fs.mkdtempSync(path.join(os.tmpdir(), prefix));
}

describe("runMemoryInstall integration", () => {
  const packageRoot = resolvePackageRoot();
  let projectRoot;
  let globalRoot;

  before(() => {
    projectRoot = mkTmp("em-project-");
    globalRoot = mkTmp("em-global-");
    fs.mkdirSync(path.join(globalRoot, "skills"), { recursive: true });
    fs.mkdirSync(path.join(globalRoot, "rules"), { recursive: true });
  });

  after(() => {
    fs.rmSync(projectRoot, { recursive: true, force: true });
    fs.rmSync(globalRoot, { recursive: true, force: true });
  });

  it("greenfield install creates full Store + AGENTS section", () => {
    fs.writeFileSync(path.join(projectRoot, "AGENTS.md"), "## Agent skills\n\nHello.\n");

    const result = runMemoryInstall({
      projectRoot,
      packageRoot,
      agentsSkillsDir: path.join(globalRoot, "skills"),
      cursorRulesDir: path.join(globalRoot, "rules"),
    });

    assert.equal(result.ok, true);
    assert.equal(result.project.status, "installed");
    assert.ok(fs.existsSync(path.join(projectRoot, "CONTEXT.md")));
    assert.ok(
      fs
        .readFileSync(path.join(projectRoot, "CONTEXT.md"), "utf8")
        .includes("<!-- engineering-memory:install -->"),
    );
    assert.ok(fs.existsSync(path.join(projectRoot, "docs", "product.md")));
    assert.ok(
      fs
        .readFileSync(path.join(projectRoot, "docs", "product.md"), "utf8")
        .includes("<!-- engineering-memory:install -->"),
    );
    assert.ok(fs.existsSync(path.join(projectRoot, "docs", "architecture.md")));
    assert.ok(fs.existsSync(path.join(projectRoot, "docs", "conventions.md")));
    assert.ok(fs.existsSync(path.join(projectRoot, "docs", "adr", "README.md")));
    assert.ok(
      fs.existsSync(path.join(projectRoot, "docs", "architecture", "README.md")),
    );
    const agents = fs.readFileSync(path.join(projectRoot, "AGENTS.md"), "utf8");
    assert.ok(agents.includes("## Engineering Memory"));
    assert.ok(agents.includes("## Agent skills"));
    assert.match(agents, /product intent/i);
    const storeBlock = agents.slice(
      agents.indexOf("### Memory Store"),
      agents.indexOf("### Loop"),
    );
    const storeOrder = [
      "CONTEXT.md",
      "docs/product.md",
      "docs/adr/",
      "docs/architecture.md",
      "docs/architecture/",
      "docs/conventions.md",
    ];
    let last = -1;
    for (const p of storeOrder) {
      const idx = storeBlock.indexOf(p);
      assert.ok(idx > last, `installed AGENTS Store order: ${p}`);
      last = idx;
    }
    const rule = fs.readFileSync(
      path.join(globalRoot, "rules", "engineering-memory.mdc"),
      "utf8",
    );
    assert.match(rule, /via the project `## Engineering Memory` AGENTS\.md index/);
    assert.doesNotMatch(rule, /#### Plan-sized handoff \(exact\)/);
    assert.ok(
      fs.existsSync(path.join(globalRoot, "rules", "engineering-memory.mdc")),
    );
    assert.ok(
      fs.existsSync(
        path.join(globalRoot, "skills", "improve-codebase-architecture", "SKILL.md"),
      ),
    );
    assert.ok(
      fs.existsSync(path.join(globalRoot, "skills", "memory-install", "SKILL.md")),
    );
    for (const slug of [
      "tdd",
      "prove-it",
      "codebase-design",
      "domain-modeling",
      "grilling",
      "auto-build",
      "wayfinder",
      "grill-me",
      "grill-with-docs",
      "to-tickets",
      "drain-tickets",
    ]) {
      assert.ok(
        fs.existsSync(path.join(globalRoot, "skills", slug, "SKILL.md")),
        `dependency skill installed: ${slug}`,
      );
    }
  });

  it("idempotent re-run is success no-op on project", () => {
    const result = runMemoryInstall({
      projectRoot,
      packageRoot,
      agentsSkillsDir: path.join(globalRoot, "skills"),
      cursorRulesDir: path.join(globalRoot, "rules"),
    });
    assert.equal(result.ok, true);
    assert.equal(result.project.status, "noop");
    assert.deepEqual(result.project.writes, []);
  });

  it("conflict writes nothing and lists conflicts", () => {
    const conflictRoot = mkTmp("em-conflict-");
    try {
      fs.writeFileSync(path.join(conflictRoot, "CONTEXT.md"), "# Foreign glossary\n");
      const result = runMemoryInstall({
        projectRoot: conflictRoot,
        packageRoot,
        skipGlobals: true,
      });
      assert.equal(result.ok, false);
      assert.ok(result.project.conflicts.includes("CONTEXT.md"));
      assert.equal(fs.existsSync(path.join(conflictRoot, "docs", "architecture.md")), false);
      assert.equal(fs.existsSync(path.join(conflictRoot, "docs", "product.md")), false);
    } finally {
      fs.rmSync(conflictRoot, { recursive: true, force: true });
    }
  });

  it("foreign docs/product.md conflicts without writing", () => {
    const conflictRoot = mkTmp("em-product-conflict-");
    try {
      fs.mkdirSync(path.join(conflictRoot, "docs"), { recursive: true });
      fs.writeFileSync(
        path.join(conflictRoot, "docs", "product.md"),
        "# Someone else's product brief\n",
      );
      const result = runMemoryInstall({
        projectRoot: conflictRoot,
        packageRoot,
        skipGlobals: true,
      });
      assert.equal(result.ok, false);
      assert.ok(result.project.conflicts.includes("docs/product.md"));
      assert.equal(fs.existsSync(path.join(conflictRoot, "CONTEXT.md")), false);
      assert.equal(
        fs.readFileSync(path.join(conflictRoot, "docs", "product.md"), "utf8"),
        "# Someone else's product brief\n",
      );
    } finally {
      fs.rmSync(conflictRoot, { recursive: true, force: true });
    }
  });

  it("warns on non-canonical architecture docs without conflicting", () => {
    const root = mkTmp("em-warn-");
    try {
      fs.writeFileSync(path.join(root, "ARCHITECTURE.md"), "# Old\n");
      const warnings = findNonCanonicalArchitectureDocs(root);
      assert.deepEqual(warnings, ["ARCHITECTURE.md"]);
      const result = runMemoryInstall({
        projectRoot: root,
        packageRoot,
        skipGlobals: true,
      });
      assert.equal(result.ok, true);
      assert.ok(fs.existsSync(path.join(root, "docs", "architecture.md")));
      assert.ok(result.warnings.some((w) => w.includes("ARCHITECTURE.md")));
    } finally {
      fs.rmSync(root, { recursive: true, force: true });
    }
  });
});
