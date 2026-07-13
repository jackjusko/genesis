import { classifyPath } from "./classify.mjs";

/** Closed set of Memory Install project targets (canonical paths). */
export const INSTALL_PATHS = [
  { id: "CONTEXT.md", rel: "CONTEXT.md", kind: "file", template: "CONTEXT.md" },
  { id: "docs/adr", rel: "docs/adr", kind: "dir" },
  {
    id: "docs/adr/README.md",
    rel: "docs/adr/README.md",
    kind: "file",
    template: "docs/adr/README.md",
  },
  {
    id: "docs/architecture.md",
    rel: "docs/architecture.md",
    kind: "file",
    template: "docs/architecture.md",
  },
  { id: "docs/architecture", rel: "docs/architecture", kind: "dir" },
  {
    id: "docs/architecture/README.md",
    rel: "docs/architecture/README.md",
    kind: "file",
    template: "docs/architecture/README.md",
  },
  {
    id: "docs/conventions.md",
    rel: "docs/conventions.md",
    kind: "file",
    template: "docs/conventions.md",
  },
  {
    id: "AGENTS.md",
    rel: "AGENTS.md",
    kind: "agents",
    template: "agents-md-engineering-memory-section.md",
  },
];

/**
 * @param {{
 *   read: (rel: string) => string | null,
 *   exists: (rel: string) => boolean,
 *   isDirectory: (rel: string) => boolean,
 *   isFile: (rel: string) => boolean,
 * }} fs
 */
export function preflight(fs) {
  const missing = [];
  const ours = [];
  const conflicts = [];

  for (const target of INSTALL_PATHS) {
    const exists = fs.exists(target.rel);
    const entry = {
      ...target,
      classification: /** @type {"missing"|"ours"|"conflict"} */ ("missing"),
    };

    let classification;
    if (target.kind === "dir") {
      classification = classifyPath({
        kind: "dir",
        path: target.rel,
        exists,
        isFile: exists && fs.isFile(target.rel),
      });
    } else if (target.kind === "agents") {
      classification = classifyPath({
        kind: "agents",
        exists,
        content: exists ? fs.read(target.rel) : null,
      });
    } else {
      classification = classifyPath({
        kind: "file",
        exists,
        content: exists ? fs.read(target.rel) : null,
        isDirectory: exists && fs.isDirectory(target.rel),
      });
    }

    entry.classification = classification;
    if (classification === "missing") missing.push(entry);
    else if (classification === "ours") ours.push(entry);
    else conflicts.push(entry);
  }

  return {
    ok: conflicts.length === 0,
    missing,
    ours,
    conflicts,
  };
}
