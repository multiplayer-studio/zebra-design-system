import * as assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';
import config from './config.json' with { type: 'json' };

// Figma page names carry spaces ("Top App Bar"); zeta-web folder names carry dashes
// ("top-appbar"). Each side strips its own convention, then both compare lowercase —
// that's the whole matching rule, no fuzzy/stemming logic beyond it.
function normalizeFigmaPageName(name: string): string {
  return name.toLowerCase().replace(/ /g, '');
}

function normalizeFolderName(name: string): string {
  return name.toLowerCase().replace(/-/g, '');
}

function listComponentFolders(): string[] {
  const dir = path.join(process.cwd(), config.zetaWeb.componentsDir);
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
}

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

// The actual matching logic, kept pure and separate from the network/fs calls above so it
// can be unit-tested without either. Every Figma CANVAS page whose normalized name matches
// a zeta-web component folder becomes a `{ "<Figma page name>": "<node-id>" }` entry — the
// same shape the old hand-maintained pages.json had. Everything else (Cover, token
// exploration canvases, section dividers like "COMPONENTS" or "-------") is skipped: it
// names no component folder, so there's nothing to fetch it for.
export function matchPagesToFolders(figmaPages: FigmaFilePage[], folderNames: string[]): Record<string, string> {
  const folders = new Set(folderNames.map(normalizeFolderName));
  const pages: Record<string, string> = {};
  for (const page of figmaPages) {
    if (page.type === 'CANVAS' && folders.has(normalizeFigmaPageName(page.name))) {
      pages[page.name] = page.id.replace(':', '-'); // match pages.json's node-id convention
    }
  }
  return pages;
}

export async function discoverPages(fileKey: string, token: string): Promise<Record<string, string>> {
  return matchPagesToFolders(await fetchTopLevelPages(fileKey, token), listComponentFolders());
}

export function selfCheck(): void {
  assert.strictEqual(normalizeFigmaPageName('Top App Bar'), 'topappbar');
  assert.strictEqual(normalizeFolderName('top-appbar'), 'topappbar');

  const figmaPages: FigmaFilePage[] = [
    { id: '2024:6729', name: 'Button', type: 'CANVAS' },
    { id: '3108:191', name: 'Top App Bar', type: 'CANVAS' },
    { id: '2314:3348', name: 'Global header', type: 'CANVAS' },
    { id: '11:7', name: 'Token Color Exploration', type: 'CANVAS' }, // no matching folder
    { id: '2024:6727', name: 'COMPONENTS', type: 'CANVAS' }, // section divider, no matching folder
  ];
  const folders = ['button', 'top-appbar', 'global-header', 'search'];

  const pages = matchPagesToFolders(figmaPages, folders);
  assert.deepStrictEqual(pages, {
    Button: '2024-6729',
    'Top App Bar': '3108-191',
    'Global header': '2314-3348',
  });
  // A page naming no zeta-web component folder is skipped, not included with a null id.
  assert.ok(!('Token Color Exploration' in pages));
  assert.ok(!('COMPONENTS' in pages));
  // A folder with no matching Figma page (e.g. mid-build, not yet on a Figma page) just
  // produces no entry — never an error.
  assert.ok(!('Search' in pages));

  console.log('✓ pages.selfCheck() passed');
}
