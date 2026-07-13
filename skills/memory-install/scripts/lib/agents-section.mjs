export const ENGINEERING_MEMORY_HEADING = "## Engineering Memory";

/** True when AGENTS.md already has the Engineering Memory section (ours → skip rewrite). */
export function hasEngineeringMemorySection(text) {
  if (typeof text !== "string") return false;
  return text.split(/\r?\n/).some((line) => line.trim() === ENGINEERING_MEMORY_HEADING);
}

/**
 * Append the Engineering Memory section to AGENTS.md content.
 * Never whole-file replaces. No-op if heading already present.
 */
export function appendEngineeringMemorySection(existing, sectionBody) {
  if (hasEngineeringMemorySection(existing)) return existing;
  const section = sectionBody.trimEnd() + "\n";
  if (!existing || existing.length === 0) return section;
  const base = existing.endsWith("\n") ? existing : existing + "\n";
  return `${base}\n${section}`;
}
