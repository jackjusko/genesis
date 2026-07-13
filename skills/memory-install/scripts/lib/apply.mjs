/**
 * From a clean preflight result, plan filesystem writes.
 * Never plans writes when conflicts exist (caller must not apply).
 *
 * @param {{ ok: boolean, missing: Array<{ id: string, rel: string, kind: string, template?: string }> }} preflightResult
 * @returns {Array<{ id: string, rel: string, action: "create" | "mkdir" | "append-section", template?: string }>}
 */
export function planProjectWrites(preflightResult) {
  if (!preflightResult.ok) return [];
  return preflightResult.missing.map((entry) => {
    if (entry.kind === "dir") {
      return { id: entry.id, rel: entry.rel, action: "mkdir" };
    }
    if (entry.kind === "agents") {
      return {
        id: entry.id,
        rel: entry.rel,
        action: "append-section",
        template: entry.template,
      };
    }
    return {
      id: entry.id,
      rel: entry.rel,
      action: "create",
      template: entry.template,
    };
  });
}
