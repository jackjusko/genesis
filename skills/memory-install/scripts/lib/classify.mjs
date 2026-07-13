import { hasInstallMarker } from "./marker.mjs";
import { hasEngineeringMemorySection } from "./agents-section.mjs";

/**
 * Classify one Install target.
 *
 * @param {{
 *   kind: "file" | "dir" | "agents",
 *   path?: string,
 *   exists: boolean,
 *   content?: string | null,
 *   isDirectory?: boolean,
 *   isFile?: boolean,
 * }} input
 * @returns {"missing" | "ours" | "conflict"}
 */
export function classifyPath(input) {
  const { kind, exists } = input;

  if (kind === "agents") {
    if (!exists) return "missing";
    if (hasEngineeringMemorySection(input.content ?? "")) return "ours";
    return "missing"; // section absent → append (not a whole-file conflict)
  }

  if (kind === "dir") {
    if (!exists) return "missing";
    if (input.isFile) return "conflict";
    // Existing docs/adr or docs/architecture dirs are never conflicts
    return "ours";
  }

  // kind === "file"
  if (!exists) return "missing";
  if (input.isDirectory) return "conflict";
  if (hasInstallMarker(input.content ?? "")) return "ours";
  return "conflict";
}
