import * as assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';
import config from './config.json' with { type: 'json' };

// Shape of packages/foundations/tokens/dist/json/resolved-tokens.json: a nested
// DTCG-style tree per category, each leaf { $type, $value }.
type TokenLeaf = { $type: string; $value: string | number };
interface TokenTree {
  [key: string]: TokenTree | TokenLeaf;
}
interface ResolvedTokens {
  typography?: { mobile?: TokenTree };
}

// Colors, spacing, radius, and stroke are resolved directly from each node's Figma
// boundVariables (see variables.ts) — the actual applied variable, not a value-based
// guess. Typography (fontSize/lineHeight/letterSpacing) is the one exception: those
// variables are bound to an external type-scale library that this file's own
// `/variables/local` response can't resolve, so it's matched by value here instead.

function isLeaf(node: unknown): node is TokenLeaf {
  return !!node && typeof node === 'object' && '$value' in (node as object);
}

function parsePx(value: string | number): number | null {
  if (typeof value === 'number') return Math.round(value * 100) / 100;
  const match = /^(-?\d+(?:\.\d+)?)px$/.exec(value.trim());
  return match ? Math.round(parseFloat(match[1]) * 100) / 100 : null;
}

interface TypographyStyle {
  path: string;
  fontSize: number;
  lineHeight: number | null;
}

// Typography styles are matched as a (fontSize, lineHeight) PAIR, not as independent
// fields — matching fontSize alone is hopeless (14px alone hits both body.small and
// label.medium) and matching each field separately can produce two different, mutually
// contradictory style names for the same text layer. The pair is far less ambiguous.
function collectTypographyStyles(root: TokenTree | undefined): TypographyStyle[] {
  const styles: TypographyStyle[] = [];
  function walk(node: TokenTree, path: string[]): void {
    const fontSizeLeaf = node['font-size'];
    if (isLeaf(fontSizeLeaf)) {
      const fontSize = parsePx(fontSizeLeaf.$value);
      const lineHeightLeaf = node['line-height'];
      const lineHeight = isLeaf(lineHeightLeaf) ? parsePx(lineHeightLeaf.$value) : null;
      if (fontSize != null) styles.push({ path: path.join('.'), fontSize, lineHeight });
      return; // this level is a style leaf-group (font-size/line-height/...), not a container to descend into
    }
    for (const [key, value] of Object.entries(node)) {
      if (!isLeaf(value) && value && typeof value === 'object') walk(value as TokenTree, [...path, key]);
    }
  }
  if (root) walk(root, []);
  return styles;
}

function loadTypographyStyles(): TypographyStyle[] {
  try {
    const filePath = path.join(process.cwd(), config.tokens.resolvedTokensPath);
    const resolved = JSON.parse(fs.readFileSync(filePath, 'utf-8')) as ResolvedTokens;
    return collectTypographyStyles(resolved.typography?.mobile);
  } catch {
    return [];
  }
}

let typographyStyles: TypographyStyle[] | null = null;

function joinCandidates(candidates: string[]): string | null {
  return candidates.length ? candidates.join(' | ') : null;
}

// Resolves a text layer's (fontSize, lineHeight) pair to the named typography style(s)
// it matches. Both fields are resolved together so a single text layer always gets ONE
// coherent style reference instead of independently-guessed, possibly contradictory ones.
export function resolveTypographyStyle(fontSize: number, lineHeight?: number | null): string | null {
  if (!typographyStyles) typographyStyles = loadTypographyStyles();
  const fs = parsePx(fontSize);
  const lh = lineHeight != null ? parsePx(lineHeight) : null;
  if (fs == null) return null;
  const candidates = typographyStyles.filter((s) => s.fontSize === fs && (lh == null || s.lineHeight == null || s.lineHeight === lh));
  return joinCandidates([...new Set(candidates.map((c) => c.path))]);
}

export function selfCheck(): void {
  const fixture: ResolvedTokens = {
    typography: {
      mobile: {
        label: { medium: { 'font-size': { $type: 'dimension', $value: '14px' }, 'line-height': { $type: 'dimension', $value: '20px' } } },
        body: { small: { 'font-size': { $type: 'dimension', $value: '14px' }, 'line-height': { $type: 'dimension', $value: '18px' } } },
      },
    },
  };
  const styles = collectTypographyStyles(fixture.typography?.mobile);
  assert.strictEqual(styles.length, 2);

  const matchFor = (fontSize: number, lineHeight: number | null) =>
    joinCandidates([
      ...new Set(
        styles.filter((s) => s.fontSize === fontSize && (lineHeight == null || s.lineHeight == null || s.lineHeight === lineHeight)).map((c) => c.path)
      ),
    ]);

  // fontSize alone (14px) matches both label.medium and body.small — ambiguous.
  const fontSizeOnly = matchFor(14, null);
  assert.ok(fontSizeOnly?.includes('label.medium') && fontSizeOnly?.includes('body.small'));

  // Pairing with lineHeight disambiguates: 14/20 is only label.medium.
  assert.strictEqual(matchFor(14, 20), 'label.medium');

  console.log('✓ token-resolver.selfCheck() passed');
}
