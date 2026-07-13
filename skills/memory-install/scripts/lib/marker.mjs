/** Exact Install marker used to classify project Store files as "ours". */
export const INSTALL_MARKER = "<!-- engineering-memory:install -->";

/**
 * True when the Install marker appears as a full line within the first 20 lines
 * (empty lines still count toward the 20-line window; we only skip emptiness for
 * "first non-empty" identity — the window itself is raw lines 1–20).
 *
 * Spec: first non-empty line OR within the first 20 lines.
 */
export function hasInstallMarker(text) {
  if (typeof text !== "string" || text.length === 0) return false;
  const lines = text.split(/\r?\n/);
  const window = lines.slice(0, 20);
  return window.some((line) => line.trim() === INSTALL_MARKER);
}
