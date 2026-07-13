import path from "node:path";

/** Package-owned dependency skills — always overwrite on Install. */
export const DEPENDENCY_SKILLS = [
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

/**
 * Package-owned global Loop + dependency refresh plan. Always overwrite destinations.
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

  for (const slug of DEPENDENCY_SKILLS) {
    plan.push({
      kind: "dir",
      from: path.join(packageRoot, "skills", slug),
      to: path.join(agentsSkillsDir, slug),
    });
  }

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
