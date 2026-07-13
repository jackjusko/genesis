#!/usr/bin/env node
/**
 * Memory Install CLI — refresh user-global Loop artifacts, then project Store scaffold.
 *
 * Usage:
 *   node memory-install.mjs [--project <dir>] [--package <dir>] [--skip-globals]
 *   node memory-install.mjs --json ...
 *
 * Exit codes: 0 success/noop, 2 conflicts (wrote nothing to project), 1 error
 */
import path from "node:path";
import { runMemoryInstall, resolvePackageRoot } from "./lib/install.mjs";

function parseArgs(argv) {
  const out = {
    project: process.cwd(),
    packageRoot: null,
    skipGlobals: false,
    json: false,
  };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--project") out.project = path.resolve(argv[++i]);
    else if (a === "--package") out.packageRoot = path.resolve(argv[++i]);
    else if (a === "--skip-globals") out.skipGlobals = true;
    else if (a === "--json") out.json = true;
    else if (a === "--help" || a === "-h") out.help = true;
    else throw new Error(`Unknown argument: ${a}`);
  }
  return out;
}

function main() {
  let args;
  try {
    args = parseArgs(process.argv.slice(2));
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }

  if (args.help) {
    console.log(`Memory Install — Engineering Memory

Usage: node memory-install.mjs [options]

Options:
  --project <dir>   Target repo (default: cwd)
  --package <dir>   Package root with rules/ and skills/ (default: auto)
  --skip-globals    Skip user-global Loop refresh (tests / project-only)
  --json            Print machine-readable result
`);
    process.exit(0);
  }

  const packageRoot = args.packageRoot ?? resolvePackageRoot();
  const result = runMemoryInstall({
    projectRoot: args.project,
    packageRoot,
    skipGlobals: args.skipGlobals,
  });

  if (args.json) {
    const { preflightResult: _pf, ...rest } = result;
    console.log(JSON.stringify(rest, null, 2));
  } else if (!result.ok) {
    console.error("Memory Install preflight found conflicts. Wrote nothing to the project Store.");
    console.error("Conflicts:");
    for (const id of result.project.conflicts) console.error(`  - ${id}`);
    console.error("");
    console.error("Offer in-session AI-guided interactive merge (explicit yes required).");
    console.error("See Memory Install skill for per-path merge rules.");
  } else if (result.project.status === "noop") {
    console.log("Memory Install: project Store already complete (success no-op).");
  } else {
    console.log("Memory Install: created missing Store / AGENTS paths:");
    for (const w of result.project.writes) console.log(`  - ${w.action}: ${w.rel}`);
  }

  for (const w of result.warnings) console.warn(`Warning: ${w}`);

  if (!args.skipGlobals && result.globals?.written?.length) {
    console.log("Refreshed user-global Loop artifacts:");
    for (const p of result.globals.written) console.log(`  - ${p}`);
  }

  process.exit(result.ok ? 0 : 2);
}

main();
