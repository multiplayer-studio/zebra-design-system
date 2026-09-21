import * as assert from 'assert';

export interface ParsedVariantName {
  properties: Record<string, string>;
}

// Figma variant names look like "Size=Medium, Flavour=Primary, State=Default".
// Segments with no "=" (or an empty key) are just skipped — malformed input never throws.
export function parseVariantName(name: string): ParsedVariantName {
  const properties: Record<string, string> = {};

  for (const rawSegment of name.split(',')) {
    const segment = rawSegment.trim();
    if (!segment) continue;
    const eq = segment.indexOf('=');
    if (eq === -1) continue;
    const key = segment.slice(0, eq).trim();
    const value = segment.slice(eq + 1).trim();
    if (!key) continue;
    properties[key] = value; // duplicate key: last wins
  }

  return { properties };
}

export function selfCheck(): void {
  const basic = parseVariantName('Size=Medium, Flavour=Primary');
  assert.deepStrictEqual(basic.properties, { Size: 'Medium', Flavour: 'Primary' });

  const messy = parseVariantName('  Size = Medium ,BadSegment, Flavour=Primary');
  assert.strictEqual(messy.properties.Size, 'Medium');
  assert.strictEqual(messy.properties.Flavour, 'Primary');
  assert.strictEqual(Object.keys(messy.properties).length, 2); // BadSegment contributed nothing

  const duplicate = parseVariantName('Size=Small, Size=Large');
  assert.strictEqual(duplicate.properties.Size, 'Large');

  console.log('✓ variant-parser.selfCheck() passed');
}
