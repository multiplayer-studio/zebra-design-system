import { describe, it, expect } from 'vitest';
import { parseComponentSet } from '../extract.js';
import { parseFrame } from '../metadata.js';
import { renderPageMarkdown } from '../render-markdown.js';
import type { ComponentMetadataDoc, ComponentSpecDoc, FigmaNodeRaw } from '../types.js';

// Verifies the SHAPE of what generate-page-docs.ts actually writes to
// docs/instructions/*.md — not against live Figma (that needs a real token + network,
// and would make this suite flaky/uncommittable-to-CI), but by running the real
// extract.ts -> metadata.ts -> render-markdown.ts pipeline against synthetic-but-
// realistic FigmaNodeRaw fixtures, the same way every module's own selfCheck() does,
// just exercised together end-to-end and checked more broadly.
//
// Fixtures deliberately use fontSize/lineHeight values (999999) that can't match any
// real typography style, and never touch a Figma API — this suite has zero dependency
// on resolved-tokens.json existing or `sync:tokens` having been run first.

const VARIABLE_NAMES = new Map([
  ['var-primary-bg', 'interactive.primary.background.default'],
  ['var-positive-bg', 'interactive.positive.background.default'],
  ['var-radius-sm', 'radius.sm'],
  ['var-radius-md', 'radius.md'],
  // Deliberately no entry for a stroke variable — exercises the "not tokenized" path.
]);

function buttonVariant(name: string, id: string, fillVar: string, radiusVar: string, cornerRadius: number): FigmaNodeRaw {
  return {
    id,
    name,
    type: 'COMPONENT',
    fills: [{ type: 'SOLID', color: { r: 0, g: 0, b: 0, a: 1 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: fillVar } } }],
    // No boundVariables on this stroke — must resolve to token: null, not a guess.
    strokes: [{ type: 'SOLID', color: { r: 0.2, g: 0.2, b: 0.2, a: 1 } }],
    boundVariables: { cornerRadius: { type: 'VARIABLE_ALIAS', id: radiusVar } },
    cornerRadius,
    children: [
      {
        id: `${id}-label`,
        name: 'Label',
        type: 'FRAME',
        children: [
          {
            id: `${id}-label-text`,
            name: 'Label',
            type: 'TEXT',
            characters: 'Go',
            // Absurd values on purpose: guaranteed not to match any real typography
            // style, so this exercises the "no match -> token: null" path robustly
            // regardless of what resolved-tokens.json currently contains.
            style: { fontFamily: 'IBM Plex Sans', fontWeight: 500, fontSize: 999999, lineHeightPx: 999999, letterSpacing: 0 },
          },
        ],
      },
    ],
  };
}

const BUTTON_SET: FigmaNodeRaw = {
  id: 'set1',
  name: 'Button',
  type: 'COMPONENT_SET',
  componentPropertyDefinitions: {
    Size: { type: 'VARIANT', defaultValue: 'Medium', variantOptions: ['Small', 'Medium'] },
    Flavour: { type: 'VARIANT', defaultValue: 'Primary', variantOptions: ['Primary', 'Positive'] },
  },
  children: [
    buttonVariant('Size=Small, Flavour=Primary', 'v1', 'var-primary-bg', 'var-radius-sm', 4),
    buttonVariant('Size=Medium, Flavour=Primary', 'v2', 'var-primary-bg', 'var-radius-md', 8),
    buttonVariant('Size=Medium, Flavour=Positive', 'v3', 'var-positive-bg', 'var-radius-md', 8),
    buttonVariant('Size=Small, Flavour=Positive', 'v4', 'var-positive-bg', 'var-radius-sm', 4),
  ],
};

// A single-variant set with no VARIANT properties at all — the "Token changes by
// property" section has nothing to sweep and must not appear for this component.
const ICON_SET: FigmaNodeRaw = {
  id: 'set2',
  name: 'Icon',
  type: 'COMPONENT_SET',
  children: [{ id: 'icon-v1', name: 'Default', type: 'COMPONENT', fills: [{ type: 'SOLID', color: { r: 0, g: 0, b: 0, a: 1 } }] }],
};

// Mirrors the real "<Name> Metadata" frame shape metadata.ts classifies structurally
// (see its own selfCheck fixtures) — a Hero, a property table, a how-to-use block, and
// a flat bullet list, so all four DocSection kinds this suite cares about get exercised.
const BUTTON_METADATA_FRAME: FigmaNodeRaw = {
  id: 'meta1',
  name: 'Button Metadata',
  type: 'FRAME',
  children: [
    {
      id: 'hero',
      name: 'Hero',
      type: 'FRAME',
      children: [
        { id: 'status', name: 'Hero Status', type: 'FRAME', children: [{ id: 'statusText', name: 'Text', type: 'TEXT', characters: 'BUTTON · COMPONENT METADATA' }] },
        {
          id: 'whatItDoes',
          name: 'What it does',
          type: 'FRAME',
          children: [
            { id: 'heading', name: 'Heading', type: 'TEXT', characters: 'What this component does' },
            { id: 'details', name: 'Details', type: 'FRAME', children: [{ id: 'desc', name: 'Text', type: 'TEXT', characters: 'Triggers one action.' }] },
          ],
        },
        {
          id: 'propTable',
          name: 'Property Breakdown',
          type: 'FRAME',
          children: [
            { id: 'tableHeading', name: 'Heading', type: 'TEXT', characters: 'Property breakdown' },
            {
              id: 'table',
              name: 'Table',
              type: 'FRAME',
              children: [
                {
                  id: 'headerRow',
                  name: 'Row',
                  type: 'FRAME',
                  children: [
                    { id: 'h1', name: 'H1', type: 'TEXT', characters: 'Property', absoluteBoundingBox: { x: 0, y: 0, width: 80, height: 20 } },
                    { id: 'h2', name: 'H2', type: 'TEXT', characters: 'Default', absoluteBoundingBox: { x: 90, y: 0, width: 80, height: 20 } },
                  ],
                },
                {
                  id: 'dataRow',
                  name: 'Row',
                  type: 'FRAME',
                  children: [
                    { id: 'd1', name: 'D1', type: 'TEXT', characters: 'Size', absoluteBoundingBox: { x: 0, y: 20, width: 80, height: 20 } },
                    { id: 'd2', name: 'D2', type: 'TEXT', characters: 'medium', absoluteBoundingBox: { x: 90, y: 20, width: 80, height: 20 } },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: 'howTo',
          name: 'How to use',
          type: 'FRAME',
          children: [
            { id: 'howToHeading', name: 'Heading', type: 'TEXT', characters: 'How to use' },
            { id: 'doCard', name: 'Details', type: 'FRAME', children: [
              { id: 'doLabel', name: 'Label', type: 'TEXT', characters: 'Do' },
              { id: 'doText', name: 'Text', type: 'TEXT', characters: 'Match Flavour to intent' },
            ] },
            { id: 'dontCard', name: 'Details', type: 'FRAME', children: [
              { id: 'dontLabel', name: 'Label', type: 'TEXT', characters: "Don't" },
              { id: 'dontText', name: 'Text', type: 'TEXT', characters: 'Use gradient for a routine action' },
            ] },
          ],
        },
        {
          id: 'a11y',
          name: 'Accessibility',
          type: 'FRAME',
          children: [
            { id: 'a11yHeading', name: 'Heading', type: 'TEXT', characters: 'Accessibility and content guidelines' },
            { id: 'b1', name: 'B1', type: 'TEXT', characters: '• Behaves like a standard button' },
            { id: 'b2', name: 'B2', type: 'TEXT', characters: '• Focus indicator always shows' },
          ],
        },
      ],
    },
  ],
};

// Markdown table syntax check that respects `\|` escaping the way a real markdown
// renderer does — a naive `line.split('|')` would (wrongly) treat an escaped pipe as a
// new column and could never actually catch the corruption-by-unescaped-pipe bug class
// this guards against, since the fix IS the escaping.
function tableRowCells(line: string): string[] {
  return line.split(/(?<!\\)\|/).slice(1, -1);
}

function assertEveryTableIsWellFormed(markdown: string): void {
  const lines = markdown.split('\n');
  let expectedCells: number | null = null;
  lines.forEach((line, i) => {
    const trimmed = line.trim();
    if (!trimmed.startsWith('|') || !trimmed.endsWith('|')) {
      expectedCells = null; // outside any table
      return;
    }
    const cells = tableRowCells(trimmed);
    if (expectedCells == null) {
      expectedCells = cells.length; // this line establishes a new table's column count
    } else {
      expect(cells.length, `line ${i + 1} ("${line}") has ${cells.length} cells, table expects ${expectedCells}`).toBe(expectedCells);
    }
  });
}

describe('assertEveryTableIsWellFormed (the checker itself)', () => {
  it('passes a table where an ambiguous token is properly pipe-escaped', () => {
    const goodTable = ['| Layer | Field | Token |', '| --- | --- | --- |', '| Button | fontSize | body.medium \\| label.large |'].join('\n');
    expect(() => assertEveryTableIsWellFormed(goodTable)).not.toThrow();
  });

  it('fails a table where that same token was left unescaped — the exact bug this guards against', () => {
    const brokenTable = ['| Layer | Field | Token |', '| --- | --- | --- |', '| Button | fontSize | body.medium | label.large |'].join('\n');
    expect(() => assertEveryTableIsWellFormed(brokenTable)).toThrow();
  });
});

describe('parseComponentSet output shape', () => {
  const spec: ComponentSpecDoc = parseComponentSet(BUTTON_SET, 'https://example.com/button', 'fileKey123', VARIABLE_NAMES);

  it('has exactly the ComponentSpecDoc contract fields', () => {
    expect(Object.keys(spec).sort()).toEqual(
      ['componentName', 'componentProperties', 'fetchedAt', 'fileKey', 'nodeId', 'sourceUrl', 'structure', 'variants'].sort()
    );
  });

  it('produces one variant per COMPONENT child, each with a name/nodeId/properties/values', () => {
    expect(spec.variants).toHaveLength(4);
    for (const v of spec.variants) {
      expect(Object.keys(v).sort()).toEqual(['name', 'nodeId', 'properties', 'values'].sort());
      expect(Object.keys(v.properties).sort()).toEqual(['Flavour', 'Size']);
    }
  });

  it('resolves a bound-variable fill/radius to a real token, and an unbound stroke to null', () => {
    const medium = spec.variants.find((v) => v.properties.Size === 'Medium' && v.properties.Flavour === 'Primary')!;
    expect(medium.values['Button'].fills?.[0].token).toBe('interactive.primary.background.default');
    expect(medium.values['Button'].cornerRadius?.token).toBe('radius.md');
    expect(medium.values['Button'].strokes?.[0].raw).not.toBeNull();
    expect(medium.values['Button'].strokes?.[0].token).toBeNull(); // honest, not guessed
  });

  it('builds the canonical structure as the union of every variant path', () => {
    const paths = (spec.structure.children ?? []).map((c) => c.path);
    expect(paths).toContain('Button/Label');
  });
});

describe('parseFrame (metadata) output shape', () => {
  const metadata: ComponentMetadataDoc = parseFrame(BUTTON_METADATA_FRAME, 'https://example.com/button-metadata', 'fileKey123');

  it('has exactly the ComponentMetadataDoc contract fields', () => {
    expect(Object.keys(metadata).sort()).toEqual(['componentName', 'fetchedAt', 'fileKey', 'hero', 'nodeId', 'sections', 'sourceUrl'].sort());
  });

  it('classifies each fixture section as the expected kind, in order, nothing dropped', () => {
    expect(metadata.hero.description).toBe('Triggers one action.');
    expect(metadata.sections.map((s) => s.kind)).toEqual(['table', 'how-to-use', 'bullet-list']);
  });
});

describe('renderPageMarkdown output shape', () => {
  const buttonSpec = parseComponentSet(BUTTON_SET, 'https://example.com/button', 'fileKey123', VARIABLE_NAMES);
  const iconSpec = parseComponentSet(ICON_SET, 'https://example.com/icon', 'fileKey123', VARIABLE_NAMES);
  const metadata = parseFrame(BUTTON_METADATA_FRAME, 'https://example.com/button-metadata', 'fileKey123');

  const markdown = renderPageMarkdown({
    pageName: 'Buttons',
    pageSourceUrl: 'https://example.com/page',
    components: [buttonSpec, iconSpec],
    metadataByComponent: new Map([['Button', metadata]]), // keyed by ComponentSpecDoc.componentName, same as generate-page-docs.ts
  });

  it('every markdown table has the same cell count on every row as its header', () => {
    assertEveryTableIsWellFormed(markdown);
  });

  it('never leaks [object Object]/undefined/NaN into the rendered doc', () => {
    expect(markdown).not.toContain('[object Object]');
    expect(markdown).not.toMatch(/\bundefined\b/);
    expect(markdown).not.toMatch(/\bNaN\b/);
  });

  it('starts with the page heading and source link', () => {
    expect(markdown.startsWith('# Buttons\n')).toBe(true);
    expect(markdown).toContain('Source: https://example.com/page');
  });

  it('gives each component its own heading, in discovery order', () => {
    const buttonIndex = markdown.indexOf('## Button');
    const iconIndex = markdown.indexOf('## Icon');
    expect(buttonIndex).toBeGreaterThan(-1);
    expect(iconIndex).toBeGreaterThan(buttonIndex);
  });

  it('renders metadata sections only for the component that has a metadata frame', () => {
    expect(markdown).toContain('### Overview');
    expect(markdown).toContain('Triggers one action.');
    expect(markdown).toContain('Match Flavour to intent');
    expect(markdown).toContain('Focus indicator always shows');
    // Icon has no metadata frame — must render without crashing and without an Overview.
    const iconSection = markdown.slice(markdown.indexOf('## Icon'));
    expect(iconSection).not.toContain('### Overview');
  });

  it('always renders layer structure and a resolved-tokens table per component', () => {
    for (const heading of ['## Button', '## Icon']) {
      const section = markdown.slice(markdown.indexOf(heading));
      expect(section).toContain('### Layer structure');
      expect(section).toMatch(/### Resolved tokens \(default variant: .+\)/);
    }
  });

  it('shows "Token changes by property" only for the component that has VARIANT properties', () => {
    const buttonSection = markdown.slice(markdown.indexOf('## Button'), markdown.indexOf('## Icon'));
    const iconSection = markdown.slice(markdown.indexOf('## Icon'));
    expect(buttonSection).toContain('### Token changes by property');
    expect(buttonSection).toContain('radius.sm'); // the Size delta
    expect(buttonSection).toContain('interactive.positive.background.default'); // the Flavour delta
    expect(iconSection).not.toContain('### Token changes by property'); // nothing to sweep
  });

  it('never enumerates every variant individually', () => {
    expect(markdown).not.toContain('### All variants');
    expect(markdown).not.toContain('### Properties');
  });
});
