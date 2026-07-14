import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";
import { resolvePackageRoot } from "./lib/install.mjs";

const packageRoot = resolvePackageRoot();
const prototypesDir = path.join(
  packageRoot,
  ".scratch",
  "engineering-memory",
  "prototypes",
);

/** Strip HTML comments whose body starts with PROTOTYPE (design banners). */
export function stripPrototypeBanners(text) {
  return text
    .replace(/<!--\s*PROTOTYPE[\s\S]*?-->\r?\n?/g, "")
    .replace(/^\uFEFF/, "");
}

function normalize(text) {
  return stripPrototypeBanners(text).replace(/\r\n/g, "\n").trim() + "\n";
}

function read(rel) {
  return fs.readFileSync(path.join(packageRoot, rel), "utf8");
}

const PAIRS = [
  {
    prototype: "engineering-memory-always-on-rule.md",
    packaged: "rules/engineering-memory.mdc",
  },
  {
    prototype: "agents-md-engineering-memory-section.md",
    packaged: "skills/memory-install/templates/agents-md-engineering-memory-section.md",
  },
  {
    prototype: "product-md-stub.md",
    packaged: "skills/memory-install/templates/docs/product.md",
  },
  {
    prototype: "architecture-md-template.md",
    packaged: "skills/memory-install/templates/docs/architecture.md",
  },
  {
    prototype: "conventions-md-stub.md",
    packaged: "skills/memory-install/templates/docs/conventions.md",
  },
  {
    prototype: "context-md-stub.md",
    packaged: "skills/memory-install/templates/CONTEXT.md",
  },
  {
    prototype: "adr-readme-stub.md",
    packaged: "skills/memory-install/templates/docs/adr/README.md",
  },
  {
    prototype: "architecture-dir-readme-stub.md",
    packaged: "skills/memory-install/templates/docs/architecture/README.md",
  },
];

describe("packaged Install drops match locked prototypes", () => {
  for (const { prototype, packaged } of PAIRS) {
    it(`${packaged} matches ${prototype} (PROTOTYPE banners stripped)`, () => {
      const expected = normalize(
        fs.readFileSync(path.join(prototypesDir, prototype), "utf8"),
      );
      const actual = normalize(read(packaged));
      assert.equal(actual, expected);
    });
  }

  it("docs/product.md stub keeps locked Product Intent H2 contract", () => {
    const body = normalize(read("skills/memory-install/templates/docs/product.md"));
    assert.match(body, /^# Product Intent\s*$/m);
    const h2s = [...body.matchAll(/^## (.+)$/gm)].map((m) => m[1]);
    assert.deepEqual(h2s, [
      "What this is",
      "Vision",
      "Goals",
      "Non-goals",
      "Out of scope for this doc",
    ]);
    assert.match(body, /<!-- engineering-memory:install -->/);
    assert.match(body, /_TODO:/);
  });

  it("always-on rule Sync loads via AGENTS index (no embedded Store path list)", () => {
    const rule = read("rules/engineering-memory.mdc");
    assert.match(rule, /via the project `## Engineering Memory` AGENTS\.md index/);
    assert.doesNotMatch(
      rule,
      /load the relevant Memory Store docs for the work ahead \(`CONTEXT\.md`/,
    );
  });

  it("always-on rule Store Sync covers product-intent sessions", () => {
    const rule = read("rules/engineering-memory.mdc");
    assert.match(
      rule,
      /product intent|identity.*vision.*goals|vision.*goals/i,
      "apply/load cues should cover product-intent sessions",
    );
    assert.match(
      rule,
      /identity|vision|goals/i,
      "write-back should mention crystallized Product Intent outcomes",
    );
    assert.doesNotMatch(
      rule,
      /docs\/product\.md/,
      "rule must not embed Store path list (load via AGENTS index)",
    );
  });

  it("always-on rule keeps plan-sized handoff as pointer only", () => {
    const rule = read("rules/engineering-memory.mdc");
    assert.match(rule, /ticket 13/);
    assert.doesNotMatch(rule, /#### Plan-sized handoff \(exact\)/);
  });

  it("always-on plan-sized Destination may be product-intent when blocker is what/why", () => {
    const rule = read("rules/engineering-memory.mdc");
    assert.match(
      rule,
      /product-intent|Product Intent|what\/why|identity|vision/i,
    );
    assert.match(rule, /Automatic does not skip fold-back/);
    assert.match(rule, /does not own maps or tickets|Store does not own maps/);
  });

  it("always-on rule points at subagent-first policy", () => {
    const rule = read("rules/engineering-memory.mdc");
    assert.match(rule, /## 4\. Subagents/);
    assert.match(rule, /docs\/agents\/subagents\.md/);
    assert.match(rule, /complete brief|nuance|cross-cutting/i);
  });

  it("AGENTS Memory Store bullets follow ticket 02 path order", () => {
    const section = read(
      "skills/memory-install/templates/agents-md-engineering-memory-section.md",
    );
    const storeBlock = section.slice(
      section.indexOf("### Memory Store"),
      section.indexOf("### Loop"),
    );
    const order = [
      "CONTEXT.md",
      "docs/product.md",
      "docs/adr/",
      "docs/architecture.md",
      "docs/architecture/",
      "docs/conventions.md",
    ];
    let last = -1;
    for (const p of order) {
      const idx = storeBlock.indexOf(p);
      assert.ok(idx > last, `expected ${p} after previous Store path`);
      last = idx;
    }
    assert.match(
      section,
      /product intent/i,
      "load cue should mention product intent",
    );
  });
});

describe("Architecture Review packaging (ticket 06)", () => {
  const skillPath = path.join(
    packageRoot,
    "skills",
    "improve-codebase-architecture",
    "SKILL.md",
  );

  it("keeps locked slug and Architecture Review display + Store fold-back", () => {
    const body = fs.readFileSync(skillPath, "utf8");
    assert.match(body, /^name:\s*improve-codebase-architecture\s*$/m);
    assert.match(body, /Architecture Review/);
    assert.match(body, /fold.*Memory Store|Store fold-back/i);
    assert.match(body, /^# Architecture Review\s*$/m);
    assert.match(body, /CONTEXT\.md` \(via `\/domain-modeling`\)/);
    assert.match(body, /do not auto-write/);
    assert.match(body, /architecture-review-<timestamp>\.html/);
    assert.match(body, /subagent_type=Explore/);
  });

  it("fold-back table includes Product Intent → docs/product.md", () => {
    const body = fs.readFileSync(skillPath, "utf8");
    assert.match(
      body,
      /[Dd]urable product identity|identity\/vision\/goal|Product Intent/,
    );
    assert.match(body, /docs\/product\.md/);
    assert.match(body, /docs\/architecture\.md/);
    assert.match(body, /CONTEXT\.md/);
    assert.match(body, /docs\/conventions\.md/);
    assert.match(body, /docs\/adr\//);
  });
});
