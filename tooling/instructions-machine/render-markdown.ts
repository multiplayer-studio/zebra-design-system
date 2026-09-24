import * as assert from 'assert';
import type { CanonicalLayerNode, ComponentMetadataDoc, ComponentSpecDoc, LayerValues, ResolvedValue, VariantSpec } from './types.js';

export interface PageDoc {
  pageName: string;
  pageSourceUrl: string;
  components: ComponentSpecDoc[];
  // Human-authored doc content (hero/anatomy/how-to-use/etc.), keyed by component name.
  // Not every component has one — see discover.ts's metadataFrames.
  metadataByComponent?: Map<string, ComponentMetadataDoc>;
  // Metadata frames on the page that matched no component (layer-name mismatch, or docs
  // for a component that lives elsewhere). Rendered as their own sections rather than
  // dropped — see generate-page-docs.ts.
  orphanMetadata?: ComponentMetadataDoc[];
}

// A cell value can itself contain a literal "|" — guard against it regardless of source.
// Left unescaped, that would be parsed as extra table columns and corrupt every row after
// it. Every dynamic value landing in a `| ... |` row must go through this.
function escapeCell(value: unknown): string {
  return String(value).replace(/\|/g, '\\|');
}

function renderStructureTree(node: CanonicalLayerNode, depth: number): string[] {
  const indent = '  '.repeat(depth);
  const icon = node.icon ? `, icon: ${node.icon}` : '';
  const lines = [`${indent}- ${node.path} (${node.type}${icon})`];
  for (const child of node.children ?? []) lines.push(...renderStructureTree(child, depth + 1));
  return lines;
}

// The variant whose properties match every VARIANT property's declared default; falls
// back to the first variant if nothing matches (e.g. a synthetic single-variant set).
function pickDefaultVariant(comp: ComponentSpecDoc): VariantSpec | undefined {
  const defaults = Object.entries(comp.componentProperties)
    .filter(([, def]) => typeof def.defaultValue === 'string')
    .map(([key, def]) => [key, def.defaultValue as string] as const);
  const match = comp.variants.find((v) => defaults.every(([key, value]) => v.properties[key] === value));
  return match ?? comp.variants[0];
}

interface FieldValue {
  field: string;
  raw: unknown;
  token: string | null;
}

// Flattens one layer's resolved values into a uniform (field, raw, token) list — the
// one place that knows every field name, shared by the default-variant table and the
// property → token delta sweep below so they can't drift out of sync.
function fieldValues(values: LayerValues | undefined): FieldValue[] {
  if (!values) return [];
  const out: FieldValue[] = [];
  const push = (field: string, rv: ResolvedValue<unknown> | undefined) => {
    if (!rv || rv.raw == null) return;
    out.push({ field, raw: rv.raw, token: rv.token });
  };
  push('width', values.width);
  push('height', values.height);
  (values.fills ?? []).forEach((f, i) => push(`fill[${i}]`, f));
  (values.strokes ?? []).forEach((s, i) => push(`stroke[${i}]`, s));
  push('cornerRadius', values.cornerRadius);
  push('strokeWeight', values.strokeWeight);
  push('itemSpacing', values.itemSpacing);
  if (values.padding) {
    push('padding.left', values.padding.left);
    push('padding.right', values.padding.right);
    push('padding.top', values.padding.top);
    push('padding.bottom', values.padding.bottom);
  }
  if (values.text) {
    push('fontSize', values.text.fontSize);
    push('lineHeight', values.text.lineHeight);
    push('letterSpacing', values.text.letterSpacing);
  }
  return out;
}

function renderLayerValueRows(layerPath: string, values: LayerValues): string[] {
  return fieldValues(values).map(
    (f) => `| ${escapeCell(layerPath)} | ${escapeCell(f.field)} | ${escapeCell(f.raw)} | ${escapeCell(f.token ?? '—')} |`
  );
}

interface TokenDelta {
  property: string;
  value: string;
  layer: string;
  field: string;
  token: string | null;
}

// For each VARIANT-type property (the only ones with distinct sibling variants — a
// BOOLEAN/TEXT/INSTANCE_SWAP property doesn't multiply the variant count), holds every
// other property at the default variant's value and compares against each of that
// property's other options. Only field/token pairs that actually differ from the
// default are emitted — this is what "how tokens change as properties change" means
// without dumping every variant's full resolved-token table (405 variants for Button).
function sweepPropertyTokenDeltas(comp: ComponentSpecDoc, defaultVariant: VariantSpec): TokenDelta[] {
  const deltas: TokenDelta[] = [];

  for (const [property, def] of Object.entries(comp.componentProperties)) {
    if (def.type !== 'VARIANT') continue;
    const defaultValue = defaultVariant.properties[property];

    for (const value of def.options ?? []) {
      if (value === defaultValue) continue;

      // The one sibling variant that isolates this property: every other property
      // matches the default variant, only `property` differs.
      const candidate = comp.variants.find(
        (v) =>
          v.properties[property] === value &&
          Object.entries(defaultVariant.properties).every(([k, v2]) => k === property || v.properties[k] === v2)
      );
      if (!candidate) continue;

      for (const [layer, values] of Object.entries(candidate.values)) {
        const baseByField = new Map(fieldValues(defaultVariant.values[layer]).map((f) => [f.field, f.token]));
        for (const f of fieldValues(values)) {
          const baseToken = baseByField.get(f.field) ?? null;
          if (f.token !== baseToken) deltas.push({ property, value, layer, field: f.field, token: f.token });
        }
      }
    }
  }

  return deltas;
}

function renderTokenDeltas(deltas: TokenDelta[]): string[] {
  if (!deltas.length) return [];
  const lines = ['### Token changes by property', '', '| Property | Value | Layer | Field | Token |', '| --- | --- | --- | --- | --- |'];
  for (const d of deltas) {
    lines.push(`| ${escapeCell(d.property)} | ${escapeCell(d.value)} | ${escapeCell(d.layer)} | ${escapeCell(d.field)} | ${escapeCell(d.token ?? '—')} |`);
  }
  lines.push('');
  return lines;
}

function formatCell(value: string | boolean | string[] | undefined): string {
  if (value == null) return '';
  return escapeCell(Array.isArray(value) ? value.join(', ') : String(value));
}

// Renders the human-authored doc content (hero + whatever sections the frame had) —
// metadata.ts already classified it, this just formats it as markdown. Every section
// kind is rendered; nothing is silently dropped, matching metadata.ts's own "unknown
// falls back to raw text" philosophy.
function renderMetadata(metadata: ComponentMetadataDoc): string[] {
  const lines: string[] = [];
  if (metadata.hero.description) lines.push('### Overview', '', metadata.hero.description, '');

  for (const section of metadata.sections) {
    switch (section.kind) {
      case 'table': {
        lines.push(`### ${section.title}`, '', `| ${section.columns.map(escapeCell).join(' | ')} |`, `| ${section.columns.map(() => '---').join(' | ')} |`);
        for (const row of section.rows) {
          lines.push(`| ${section.columns.map((c) => formatCell(row[c])).join(' | ')} |`);
        }
        lines.push('');
        break;
      }
      case 'anatomy': {
        lines.push(`### ${section.title}`, '');
        for (const item of section.items) lines.push(`${item.number}. **${item.title}** — ${item.description}`);
        lines.push('');
        break;
      }
      case 'how-to-use': {
        lines.push(`### ${section.title}`, '', '**Do:**');
        for (const item of section.dos) lines.push(`- ${item}`);
        lines.push('', "**Don't:**");
        for (const item of section.donts) lines.push(`- ${item}`);
        lines.push('');
        break;
      }
      case 'bullet-list': {
        lines.push(`### ${section.title}`, '');
        for (const item of section.items) lines.push(`- ${item}`);
        lines.push('');
        break;
      }
      case 'unknown': {
        if (section.rawTextContent.length) {
          lines.push(`### ${section.title ?? section.layerName}`, '');
          for (const text of section.rawTextContent) lines.push(`- ${text}`);
          lines.push('');
        }
        break;
      }
    }
  }
  return lines;
}

function renderComponent(comp: ComponentSpecDoc, metadata: ComponentMetadataDoc | undefined): string[] {
  const lines: string[] = [];
  lines.push(`## ${comp.componentName}`, '', `Source: ${comp.sourceUrl}`, '');

  if (metadata) lines.push(...renderMetadata(metadata));

  lines.push('### Layer structure', '', ...renderStructureTree(comp.structure, 0), '');

  const defaultVariant = pickDefaultVariant(comp);
  lines.push(`### Resolved tokens (default variant: ${defaultVariant?.name ?? 'n/a'})`, '');
  if (defaultVariant) {
    lines.push('| Layer | Field | Raw | Token |', '| --- | --- | --- | --- |');
    for (const [layerPath, values] of Object.entries(defaultVariant.values)) {
      lines.push(...renderLayerValueRows(layerPath, values));
    }
    lines.push('');
    lines.push(...renderTokenDeltas(sweepPropertyTokenDeltas(comp, defaultVariant)));
  }

  return lines;
}

export function renderPageMarkdown(page: PageDoc): string {
  const lines: string[] = [`# ${page.pageName}`, '', `Source: ${page.pageSourceUrl}`, ''];
  for (const comp of page.components) {
    lines.push(...renderComponent(comp, page.metadataByComponent?.get(comp.componentName)));
  }
  for (const metadata of page.orphanMetadata ?? []) {
    lines.push(`## ${metadata.componentName} (documentation only)`, '', `Source: ${metadata.sourceUrl}`, '', ...renderMetadata(metadata));
  }
  return lines.join('\n');
}

export function selfCheck(): void {
  const fixture: ComponentSpecDoc = {
    componentName: 'Button',
    sourceUrl: 'https://example.com/button',
    fileKey: 'fileKey123',
    nodeId: 'set1',
    fetchedAt: new Date().toISOString(),
    componentProperties: {
      Size: { type: 'VARIANT', defaultValue: 'Medium', options: ['Small', 'Medium'] },
      Flavour: { type: 'VARIANT', defaultValue: 'Primary', options: ['Primary', 'Positive'] },
    },
    structure: {
      path: 'Button',
      type: 'COMPONENT_SET',
      children: [
        { path: 'Button/Label', type: 'TEXT' },
        { path: 'Button/Leading-Icon', type: 'INSTANCE', icon: 'Chevron Right' },
      ],
    },
    variants: [
      {
        name: 'Size=Small, Flavour=Primary',
        nodeId: 'v1',
        properties: { Size: 'Small', Flavour: 'Primary' },
        values: {
          Button: {
            height: { raw: 32, token: 'control.sm' },
            strokeWeight: { raw: 1, token: 'border.width.sm' },
            cornerRadius: { raw: 4, token: 'radius.sm' },
            fills: [{ raw: '#1f69ff', token: 'interactive.primary.background.default' }],
            // A token containing a literal "|" must not corrupt the markdown table it lands in.
            text: { fontSize: { raw: 14, token: 'body.medium | label.large' } },
          },
        },
      },
      {
        name: 'Size=Medium, Flavour=Primary',
        nodeId: 'v2',
        properties: { Size: 'Medium', Flavour: 'Primary' },
        values: {
          Button: {
            cornerRadius: { raw: 8, token: 'radius.md' },
            fills: [{ raw: '#1f69ff', token: 'interactive.primary.background.default' }],
          },
        },
      },
      {
        name: 'Size=Medium, Flavour=Positive',
        nodeId: 'v3',
        properties: { Size: 'Medium', Flavour: 'Positive' },
        values: {
          Button: {
            cornerRadius: { raw: 8, token: 'radius.md' },
            fills: [{ raw: '#00864f', token: 'interactive.positive.background.default' }],
          },
        },
      },
    ],
  };

  const metadata: ComponentMetadataDoc = {
    componentName: 'BUTTON',
    sourceUrl: 'https://example.com/button-metadata',
    fileKey: 'fileKey123',
    nodeId: 'meta1',
    fetchedAt: new Date().toISOString(),
    hero: { statusLabel: 'BUTTON · COMPONENT METADATA', heading: 'What this component does', description: 'Triggers one action.' },
    sections: [
      { kind: 'how-to-use', nodeId: 's1', title: 'How to use', dos: ['Match Flavour to intent'], donts: ['Use gradient for routine actions'] },
      { kind: 'bullet-list', nodeId: 's2', title: 'Accessibility', items: ['Focus indicator always shows'] },
    ],
  };

  const markdown = renderPageMarkdown({
    pageName: 'Buttons',
    pageSourceUrl: 'https://example.com/page',
    components: [fixture],
    metadataByComponent: new Map([['Button', metadata]]),
  });
  assert.ok(markdown.includes('- Button/Label (TEXT)'));
  // An icon layer's resolved glyph name is rendered inline in the structure tree.
  assert.ok(markdown.includes('- Button/Leading-Icon (INSTANCE, icon: Chevron Right)'));
  assert.ok(markdown.includes('radius.md'));
  assert.ok(markdown.includes('Triggers one action.'));
  assert.ok(markdown.includes('Match Flavour to intent'));
  assert.ok(markdown.includes("Don't"));
  assert.ok(markdown.includes('Focus indicator always shows'));
  // Default variant (Size=Medium, Flavour=Primary) resolved tokens must be present.
  assert.ok(markdown.includes('Resolved tokens (default variant: Size=Medium, Flavour=Primary)'));
  // No structurally-extracted Properties table or per-variant dump — the metadata's own
  // Property Breakdown (rendered above via renderMetadata) already covers this, better.
  assert.ok(!markdown.includes('### Properties'));
  assert.ok(!markdown.includes('### All variants'));

  // Token delta sweep: only the fields that actually change as each property varies,
  // not a full dump of every variant.
  assert.ok(markdown.includes('### Token changes by property'));
  assert.ok(markdown.includes('| Size | Small | Button | cornerRadius | radius.sm |'));
  assert.ok(markdown.includes('| Flavour | Positive | Button | fill[0] | interactive.positive.background.default |'));
  // height and strokeWeight flow through the same field-value pipeline as every other
  // token — must reach the rendered table, not just the extracted spec.
  assert.ok(markdown.includes('| Size | Small | Button | height | control.sm |'));
  assert.ok(markdown.includes('| Size | Small | Button | strokeWeight | border.width.sm |'));
  // cornerRadius doesn't change between Flavour=Primary and Flavour=Positive (both
  // radius.md) — must not appear as a spurious delta row for the Flavour property.
  assert.ok(!markdown.includes('| Flavour | Positive | Button | cornerRadius |'));
  // An ambiguous token ("body.medium | label.large") must be escaped, not split into
  // extra table columns — check the escaped form is present and the raw, unescaped
  // form (which would corrupt the row) is not.
  assert.ok(markdown.includes('| Size | Small | Button | fontSize | body.medium \\| label.large |'));
  assert.ok(!markdown.includes('| Size | Small | Button | fontSize | body.medium | label.large |'));

  // Several metadata frames on one page are integrated independently: a matched one
  // under its component, an unmatched one as its own section — never merged, never dropped.
  const withOrphan = renderPageMarkdown({
    pageName: 'Buttons',
    pageSourceUrl: 'https://example.com/page',
    components: [fixture],
    metadataByComponent: new Map([['Button', metadata]]),
    orphanMetadata: [
      {
        ...metadata,
        componentName: 'Icon Button',
        hero: { ...metadata.hero, description: 'A button that is only an icon.' },
        sections: [{ kind: 'bullet-list', nodeId: 's3', title: 'Accessibility', items: ['Always needs an aria-label'] }],
      },
    ],
  });
  assert.ok(withOrphan.includes('## Icon Button (documentation only)'));
  assert.ok(withOrphan.includes('A button that is only an icon.'));
  assert.ok(withOrphan.includes('Always needs an aria-label'));
  // The matched component's own metadata is untouched by the orphan section.
  assert.ok(withOrphan.includes('Triggers one action.'));
  assert.ok(withOrphan.indexOf('## Button') < withOrphan.indexOf('## Icon Button (documentation only)'));

  console.log('✓ render-markdown.selfCheck() passed');
}
