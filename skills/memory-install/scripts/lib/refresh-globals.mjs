import path from "node:path";

/**
 * Package-owned global Loop refresh plan. Always overwrite destinations.
 *
 * @param {{
 *   packageRoot: string,
 *   agentsSkillsDir: string,
 *   cursorRulesDir: string,
 *   packageMirrorDir?: string,
 * }} paths
 */
export function planGlobalRefresh({
  packageRoot,
  agentsSkillsDir,
  cursorRulesDir,
  packageMirrorDir,
}) {
  const plan = [
    {
      kind: "file",
      from: path.join(packageRoot, "rules", "engineering-memory.mdc"),
      to: path.join(cursorRulesDir, "engineering-memory.mdc"),
    },
    {
      kind: "dir",
      from: path.join(packageRoot, "skills", "improve-codebase-architecture"),
      to: path.join(agentsSkillsDir, "improve-codebase-architecture"),
    },
    {
      kind: "dir",
      from: path.join(packageRoot, "skills", "memory-install"),
      to: path.join(agentsSkillsDir, "memory-install"),
    },
  ];

  if (packageMirrorDir) {
    plan.push({
      kind: "dir",
      from: path.join(packageRoot, "rules"),
      to: path.join(packageMirrorDir, "rules"),
    });
    plan.push({
      kind: "dir",
      from: path.join(packageRoot, "skills"),
      to: path.join(packageMirrorDir, "skills"),
    });
  }

  return plan;
}
