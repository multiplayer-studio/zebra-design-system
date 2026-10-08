import * as assert from 'assert';

interface FigmaFilePage {
  id: string;
  name: string;
  type: string;
}

// Top-level pages only (depth=1) — a design file's canvases, not every node in it.
async function fetchTopLevelPages(fileKey: string, token: string): Promise<FigmaFilePage[]> {
  const url = `https://api.figma.com/v1/files/${fileKey}?depth=1`;
  const response = await fetch(url, { headers: { 'X-Figma-Token': token } });
  if (!response.ok) {
    throw new Error(`Figma file request failed with status ${response.status} for file ${fileKey}`);
  }
  const data = (await response.json()) as { document?: { children?: FigmaFilePage[] } };
  return data.document?.children ?? [];
}

// Every CANVAS page as `{ "<Figma page name>": "<node-id>" }`. No name matching against
// zeta-web — whether a page is worth documenting is decided by the caller, by whether
// discoverPage() finds any component frames inside it.
export function toPageMap(figmaPages: FigmaFilePage[]): Record<string, string> {
  const pages: Record<string, string> = {};
  for (const page of figmaPages) {
    if (page.type === 'CANVAS') pages[page.name] = page.id.replace(':', '-'); // node-id URL convention
  }
  return pages;
}

export async function discoverPages(fileKey: string, token: string): Promise<Record<string, string>> {
  return toPageMap(await fetchTopLevelPages(fileKey, token));
}

export function selfCheck(): void {
  const pages = toPageMap([
    { id: '2024:6729', name: 'Button', type: 'CANVAS' },
    { id: '3108:191', name: 'Top App Bar', type: 'CANVAS' },
    { id: '99:1', name: 'Not a canvas', type: 'FRAME' },
  ]);
  assert.deepStrictEqual(pages, { Button: '2024-6729', 'Top App Bar': '3108-191' });

  console.log('✓ pages.selfCheck() passed');
}
