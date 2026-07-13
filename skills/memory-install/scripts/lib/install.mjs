import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { appendEngineeringMemorySection } from "./agents-section.mjs";
import { planProjectWrites } from "./apply.mjs";
import { preflight } from "./preflight.mjs";
import { planGlobalRefresh } from "./refresh-globals.mjs";

function looksLikePackageRoot(dir) {
  return (
    fs.existsSync(path.join(dir, "rules", "engineering-memory.mdc")) &&
    fs.existsSync(path.join(dir, "skills", "memory-install", "SKILL.md"))
  );
}

/** Resolve package root (repo root containing rules/ + skills/). */
export function resolvePackageRoot(fromFileUrl = import.meta.url) {
  if (process.env.ENGINEERING_MEMORY_PACKAGE) {
    return path.resolve(process.env.ENGINEERING_MEMORY_PACKAGE);
  }

  const scriptsDir = path.dirname(fileURLToPath(fromFileUrl));
  let dir = scriptsDir;
  for (let i = 0; i < 6; i++) {
    if (looksLikePackageRoot(dir)) return dir;
    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }

  const home = process.env.USERPROFILE || process.env.HOME || "";
  const mirror = path.join(home, ".agents", "engineering-memory");
  if (looksLikePackageRoot(mirror)) return mirror;

  throw new Error(
    "Cannot resolve Engineering Memory package root. Set ENGINEERING_MEMORY_PACKAGE or run from a package checkout.",
  );
}

export function defaultGlobalDirs(home = process.env.USERPROFILE || process.env.HOME || "") {
  return {
    agentsSkillsDir: path.join(home, ".agents", "skills"),
    cursorRulesDir: path.join(home, ".cursor", "rules"),
    packageMirrorDir: path.join(home, ".agents", "engineering-memory"),
  };
}

export function createProjectFs(projectRoot) {
  const resolve = (rel) => path.join(projectRoot, rel);
  return {
    read: (rel) => {
      const p = resolve(rel);
      if (!fs.existsSync(p) || fs.statSync(p).isDirectory()) return null;
      return fs.readFileSync(p, "utf8");
    },
    exists: (rel) => fs.existsSync(resolve(rel)),
    isDirectory: (rel) => {
      const p = resolve(rel);
      return fs.existsSync(p) && fs.statSync(p).isDirectory();
    },
    isFile: (rel) => {
      const p = resolve(rel);
      return fs.existsSync(p) && fs.statSync(p).isFile();
    },
  };
}

/** Warn-only: non-canonical architecture doc paths (not conflicts). */
export function findNonCanonicalArchitectureDocs(projectRoot) {
  const candidates = [
    "ARCHITECTURE.md",
    "architecture.md",
    "docs/ARCHITECTURE.md",
    "Architecture.md",
  ];
  const seen = new Set();
  const found = [];
  for (const rel of candidates) {
    const p = path.join(projectRoot, rel);
    if (!fs.existsSync(p) || !fs.statSync(p).isFile()) continue;
    let key;
    try {
      key = fs.realpathSync(p).toLowerCase();
    } catch {
      key = p.toLowerCase();
    }
    if (seen.has(key)) continue;
    seen.add(key);
    // Prefer the candidate spelling that matches the directory listing when possible
    found.push(rel);
  }
  return found;
}

function copyRecursive(from, to) {
  const stat = fs.statSync(from);
  if (stat.isDirectory()) {
    fs.mkdirSync(to, { recursive: true });
    for (const name of fs.readdirSync(from)) {
      copyRecursive(path.join(from, name), path.join(to, name));
    }
    return;
  }
  fs.mkdirSync(path.dirname(to), { recursive: true });
  fs.copyFileSync(from, to);
}

export function refreshGlobals({
  packageRoot,
  agentsSkillsDir,
  cursorRulesDir,
  packageMirrorDir,
}) {
  const plan = planGlobalRefresh({
    packageRoot,
    agentsSkillsDir,
    cursorRulesDir,
    packageMirrorDir,
  });
  const written = [];
  for (const item of plan) {
    copyRecursive(item.from, item.to);
    written.push(item.to);
  }
  return { written };
}

export function applyProjectInstall({
  projectRoot,
  packageRoot,
  preflightResult,
  templatesDir = path.join(packageRoot, "skills", "memory-install", "templates"),
}) {
  if (!preflightResult.ok) {
    return { applied: false, writes: [], reason: "conflicts" };
  }
  const plan = planProjectWrites(preflightResult);
  const writes = [];
  for (const step of plan) {
    const dest = path.join(projectRoot, step.rel);
    if (step.action === "mkdir") {
      fs.mkdirSync(dest, { recursive: true });
      writes.push({ rel: step.rel, action: "mkdir" });
      continue;
    }
    const templatePath = path.join(templatesDir, step.template);
    const template = fs.readFileSync(templatePath, "utf8");
    if (step.action === "create") {
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      fs.writeFileSync(dest, template.endsWith("\n") ? template : template + "\n", "utf8");
      writes.push({ rel: step.rel, action: "create" });
      continue;
    }
    if (step.action === "append-section") {
      const existing = fs.existsSync(dest) ? fs.readFileSync(dest, "utf8") : "";
      const next = appendEngineeringMemorySection(existing, template);
      fs.writeFileSync(dest, next, "utf8");
      writes.push({ rel: step.rel, action: "append-section" });
    }
  }
  return { applied: true, writes };
}

/**
 * Full Memory Install: refresh globals, then project preflight/apply.
 * @returns {{ ok: boolean, globals: object, project: object, warnings: string[] }}
 */
export function runMemoryInstall({
  projectRoot,
  packageRoot = resolvePackageRoot(),
  agentsSkillsDir,
  cursorRulesDir,
  packageMirrorDir,
  skipGlobals = false,
}) {
  const globalsDirs =
    agentsSkillsDir && cursorRulesDir
      ? {
          agentsSkillsDir,
          cursorRulesDir,
          packageMirrorDir:
            packageMirrorDir ?? path.join(path.dirname(agentsSkillsDir), "engineering-memory"),
        }
      : defaultGlobalDirs();

  const globals = skipGlobals
    ? { skipped: true, written: [] }
    : refreshGlobals({ packageRoot, ...globalsDirs });

  const fsAdapter = createProjectFs(projectRoot);
  const preflightResult = preflight(fsAdapter);
  const warnings = findNonCanonicalArchitectureDocs(projectRoot).map(
    (p) => `Non-canonical architecture doc found at ${p} (warn only; not a conflict)`,
  );

  if (!preflightResult.ok) {
    return {
      ok: false,
      globals,
      project: {
        status: "conflict",
        conflicts: preflightResult.conflicts.map((c) => c.id),
        missing: preflightResult.missing.map((c) => c.id),
        ours: preflightResult.ours.map((c) => c.id),
      },
      warnings,
      preflightResult,
    };
  }

  const applyResult = applyProjectInstall({
    projectRoot,
    packageRoot,
    preflightResult,
  });

  const status = applyResult.writes.length === 0 ? "noop" : "installed";

  return {
    ok: true,
    globals,
    project: {
      status,
      writes: applyResult.writes,
      missing: preflightResult.missing.map((c) => c.id),
      ours: preflightResult.ours.map((c) => c.id),
    },
    warnings,
    preflightResult,
  };
}
