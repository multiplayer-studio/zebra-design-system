import * as assert from 'assert';

// Names come back slash-separated (e.g. "surface/page"); normalized to dots to match
// this tool's other token-name formatting (e.g. "space.md").
export function normalizeVariableName(name: string): string {
  return name.replace(/\//g, '.');
}

// One Variable belongs to exactly one file (the file that owns/defines it) — fetching
// this once per fileKey and reusing it across every page in that file is enough; no
// per-node or per-page fetch needed.
export async function fetchFileVariableNames(fileKey: string, token: string): Promise<Map<string, string>> {
  const url = `https://api.figma.com/v1/files/${fileKey}/variables/local`;
  const response = await fetch(url, { headers: { 'X-Figma-Token': token } });
  if (!response.ok) {
    throw new Error(`Figma variables request failed with status ${response.status} for file ${fileKey}`);
  }
  const data = (await response.json()) as { meta?: { variables?: Record<string, { name: string }> } };
  const map = new Map<string, string>();
  for (const [id, variable] of Object.entries(data.meta?.variables ?? {})) {
    map.set(id, normalizeVariableName(variable.name));
  }
  return map;
}

export function selfCheck(): void {
  assert.strictEqual(normalizeVariableName('surface/page'), 'surface.page');
  assert.strictEqual(normalizeVariableName('space/md'), 'space.md');
  console.log('✓ variables.selfCheck() passed');
}
