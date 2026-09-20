import { describe, it, expect } from 'vitest';
import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { CSS_OUTPUT_DIR, JSON_OUTPUT_DIR } from '../build-tokens/constants.js';

// Runs the real "build tokens from committed dtcg-tokens fixtures" pipeline once,
// then sanity-checks every generated file for the shapes/values consumers rely on.
// No Figma credentials needed - build-tokens only reads source/dtcg-tokens/*.json,
// which is checked into git.

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TOKEN_MACHINE_DIR = path.resolve(__dirname, '..');
const WORKSPACE_ROOT = path.resolve(TOKEN_MACHINE_DIR, '../..');

const VAR_DECL = /--([\w-]+):\s*([^;]+);/g;
// Alpha-channel colors come out as rgba() (Style Dictionary's css transform), everything else as hex.
const COLOR_VALUE = /^(#[0-9a-fA-F]{6}([0-9a-fA-F]{2})?|rgba?\(\s*[\d.]+\s*,\s*[\d.]+\s*,\s*[\d.]+\s*(,\s*[\d.]+\s*)?\))$/;

function readCss(relPath: string): string {
  return fs.readFileSync(path.join(CSS_OUTPUT_DIR, relPath), 'utf-8');
}

function allCssFiles(): string[] {
  const out: string[] = [];
  const walk = (dir: string, prefix: string) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.isDirectory()) walk(path.join(dir, entry.name), `${prefix}${entry.name}/`);
      else if (entry.name.endsWith('.css')) out.push(`${prefix}${entry.name}`);
    }
  };
  walk(CSS_OUTPUT_DIR, '');
  return out;
}

/** Count of unmatched `{` before `index` - i.e. how deeply nested that position is. */
function braceDepthAt(text: string, index: number): number {
  let depth = 0;
  for (let i = 0; i < index; i++) {
    if (text[i] === '{') depth++;
    else if (text[i] === '}') depth--;
  }
  return depth;
}

function collectVars(css: string): Map<string, string> {
  const vars = new Map<string, string>();
  for (const [, name, value] of css.matchAll(VAR_DECL)) vars.set(name, value.trim());
  return vars;
}

// Runs as a plain module-level side effect, not beforeAll: several describe() bodies below
// (and `it.each(allCssFiles())`) read the filesystem synchronously at collection time, which
// happens before any beforeAll hook would fire - the build has to be done before that.
//
// "build" alone produces dist/css, dist/json, and the packed artifact in one shot (see
// build-tokens/index.ts, which calls resolved-json-exporter.ts's exportResolvedTokens()
// directly) - run through Nx, not the bare npm script, so this is exactly the one real
// entry point any consumer or CI job actually uses.
execSync('pnpm exec nx run @zebra-design-system/token-machine:build', { cwd: WORKSPACE_ROOT, stdio: 'pipe' });

describe('generated CSS (every file under dist/css)', () => {
  it('produces at least the expected top-level and building-block files', () => {
    const files = allCssFiles();
    for (const expected of [
      'colors.css', 'sizes.css', 'typography.css',
      'primitives/default.css', 'palette/default.css', 'size/default.css', 'typography/default.css',
      'semantics.css',
    ]) {
      expect(files).toContain(expected);
    }
  });

  it.each(allCssFiles())('%s has balanced braces and no erroneous values', (file) => {
    const css = readCss(file);
    expect(css.length).toBeGreaterThan(0);

    const opens = (css.match(/\{/g) || []).length;
    const closes = (css.match(/\}/g) || []).length;
    expect(opens).toBe(closes);

    expect(css).not.toMatch(/\bundefined\b/);
    expect(css).not.toMatch(/\bNaN\b/);
    expect(css).not.toMatch(/:\s*\{[\w.]+\}\s*;/); // an unresolved DTCG "{a.b.c}" reference left as a literal value

    for (const [name, value] of collectVars(css)) {
      expect(value.length, `--${name} in ${file} has an empty value`).toBeGreaterThan(0);
    }
  });
});

describe('colors.css', () => {
  const css = readCss('colors.css');
  const vars = collectVars(css);

  it('resolves every color to a hex or rgba() value', () => {
    expect(vars.size).toBeGreaterThan(0);
    for (const [name, value] of vars) {
      expect(value, `--${name}`).toMatch(COLOR_VALUE);
    }
  });

  it('scopes dark-mode overrides behind prefers-color-scheme and .dark-mode', () => {
    expect(css).toContain('@media (prefers-color-scheme: dark)');
    expect(css).toContain('.dark-mode');
  });
});

describe('sizes.css', () => {
  it('resolves every size to a pixel dimension', () => {
    const vars = collectVars(readCss('sizes.css'));
    expect(vars.size).toBeGreaterThan(0);
    for (const [name, value] of vars) {
      if (name === 'shape') continue; // the one keyword-valued (non-dimension) size token
      expect(value, `--${name}`).toMatch(/^[\d.]+px$/);
    }
  });
});

describe('typography.css', () => {
  const css = readCss('typography.css');
  const vars = collectVars(css);

  it('emits the semantic shorthand block exactly once, outside every @media block', () => {
    const marker = '/* Semantic shorthand typography tokens */';
    const firstIndex = css.indexOf(marker);
    expect(firstIndex).toBeGreaterThan(-1);
    expect(css.indexOf(marker, firstIndex + 1)).toBe(-1); // no second occurrence

    // The shorthand's own `:root {` is the only open brace at that point - depth 1, not >1.
    expect(braceDepthAt(css, firstIndex)).toBe(1);
  });

  it('every shorthand var only references longhand vars that actually exist in the file', () => {
    const shorthandLine = /^\s*--([\w-]+): var\(--[\w-]+-font-weight\) var\(--[\w-]+-font-size\)\/var\(--[\w-]+-line-height\) var\(--[\w-]+-font-family\);$/gm;
    const matches = [...css.matchAll(shorthandLine)];
    expect(matches.length).toBeGreaterThan(0);

    for (const [, scale] of matches) {
      for (const prop of ['font-weight', 'font-size', 'line-height', 'font-family']) {
        expect(vars.has(`${scale}-${prop}`), `--${scale}-${prop} referenced but never declared`).toBe(true);
      }
    }
  });

  it('resolves font sizes/line-heights to px and keeps a sans-serif fallback on every family', () => {
    for (const [name, value] of vars) {
      if (name.endsWith('-font-size') || name.endsWith('-line-height')) {
        expect(value, `--${name}`).toMatch(/^[\d.]+px$/);
      }
      if (name.endsWith('-font-family')) {
        expect(value, `--${name}`).toContain('sans-serif');
      }
      if (name.endsWith('-font-weight')) {
        expect(Number(value), `--${name}`).toBeGreaterThanOrEqual(100);
        expect(Number(value), `--${name}`).toBeLessThanOrEqual(900);
      }
    }
  });
});

describe('resolved JSON output', () => {
  const files = fs.readdirSync(JSON_OUTPUT_DIR).filter(f => f.endsWith('.json'));

  it('produces the default resolved-tokens.json plus one per overriding theme', () => {
    expect(files).toContain('resolved-tokens.json');
    expect(files.length).toBeGreaterThanOrEqual(1);
  });

  it.each(files)('%s is valid JSON with color/size/typography sections and no dangling leaves', (file) => {
    const data = JSON.parse(fs.readFileSync(path.join(JSON_OUTPUT_DIR, file), 'utf-8'));
    expect(Object.keys(data).sort()).toEqual(['color', 'size', 'typography']);

    const isDtcgLeaf = (node: unknown): node is { $type: string; $value: unknown } =>
      !!node && typeof node === 'object' && '$type' in (node as object) && '$value' in (node as object);

    const walk = (node: unknown, at: string) => {
      if (isDtcgLeaf(node)) {
        expect(node.$value, at).not.toBeUndefined();
        expect(node.$value, at).not.toBeNull();
        expect(String(node.$value).trim().length, at).toBeGreaterThan(0);
        expect(String(node.$value), at).not.toMatch(/\bNaN\b/);
        if (node.$type === 'color') {
          expect(node.$value, at).toMatch(COLOR_VALUE);
        }
        if (node.$type === 'fontWeight') {
          expect(node.$value, at).toBeGreaterThanOrEqual(100);
          expect(node.$value, at).toBeLessThanOrEqual(900);
        }
      } else if (node && typeof node === 'object') {
        for (const [key, child] of Object.entries(node)) walk(child, `${at}.${key}`);
      }
    };
    walk(data, file);
  });
});
