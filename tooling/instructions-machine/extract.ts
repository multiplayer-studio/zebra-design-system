import * as assert from 'assert';
import { resolveTypographyStyle } from './token-resolver.js';
import { parseVariantName } from './variant-parser.js';
import type {
  CanonicalLayerNode,
  ComponentSpecDoc,
  FigmaColor,
  FigmaNodeRaw,
  FigmaPaint,
  LayerValues,
  ResolvedValue,
  VariantSpec,
} from './types.js';

const STRUCTURAL_CONTAINERS = new Set(['FRAME', 'GROUP', 'COMPONENT', 'COMPONENT_SET']);

function isStructuralContainer(type: string): boolean {
  return STRUCTURAL_CONTAINERS.has(type);
}

function figmaColorToHex(color: FigmaColor, opacity?: number): string {
  const r = Math.round(color.r * 255);
  const g = Math.round(color.g * 255);
  const b = Math.round(color.b * 255);
  const a = (color.a ?? 1) * (opacity ?? 1);
  const hex = (n: number) => n.toString(16).padStart(2, '0');
  let out = `#${hex(r)}${hex(g)}${hex(b)}`;
  if (a < 0.999) out += hex(Math.round(a * 255));
  return out;
}

// The one lookup every resolved value goes through: a Figma boundVariables id -> the
// real applied token name (see variables.ts). No id bound means the property genuinely
// isn't tokenized in Figma — token stays null rather than guessing from the raw value.
function resolveVar(variableId: string | undefined, variableNames: Map<string, string>): string | null {
  return variableId ? variableNames.get(variableId) ?? null : null;
}

// Only SOLID paints are resolved (ponytail: v1 scope). Gradients (gradient/text-gradient
// flavors) come back as { raw: null, token: null } — add GRADIENT_LINEAR handling if a
// component actually needs it resolved.
function resolvePaintColor(paint: FigmaPaint, variableNames: Map<string, string>): ResolvedValue<string> {
  if (paint.type !== 'SOLID' || !paint.color) return { raw: null, token: null };
  const raw = figmaColorToHex(paint.color, paint.opacity);
  return { raw, token: resolveVar(paint.boundVariables?.color?.id, variableNames) };
}

// A component can bind uniform corner radius via `boundVariables.cornerRadius`, or (when
// each corner is independently tokenized, or the radius is 0 and Figma omits the plain
// field) via `boundVariables.rectangleCornerRadii`. Only the top-left corner is read in
// the latter case — ponytail: v1 scope, upgrade to all four if a component actually uses
// different radii per corner.
function cornerRadiusVariableId(node: FigmaNodeRaw): string | undefined {
  return node.boundVariables?.cornerRadius?.id ?? node.boundVariables?.rectangleCornerRadii?.RECTANGLE_TOP_LEFT_CORNER_RADIUS?.id;
}

function extractLayerValues(node: FigmaNodeRaw, variableNames: Map<string, string>): LayerValues {
  const values: LayerValues = {};

  const solidFills = (node.fills ?? []).filter((p) => p.type === 'SOLID');
  if (solidFills.length) values.fills = solidFills.map((p) => resolvePaintColor(p, variableNames));

  const solidStrokes = (node.strokes ?? []).filter((p) => p.type === 'SOLID');
  if (solidStrokes.length) values.strokes = solidStrokes.map((p) => resolvePaintColor(p, variableNames));

  const radiusVarId = cornerRadiusVariableId(node);
  if (node.cornerRadius != null || radiusVarId) {
    values.cornerRadius = { raw: node.cornerRadius ?? 0, token: resolveVar(radiusVarId, variableNames) };
  }

  if (node.itemSpacing != null) {
    values.itemSpacing = { raw: node.itemSpacing, token: resolveVar(node.boundVariables?.itemSpacing?.id, variableNames) };
  }

  if (
    node.paddingLeft != null ||
    node.paddingRight != null ||
    node.paddingTop != null ||
    node.paddingBottom != null
  ) {
    values.padding = {
      left: node.paddingLeft != null ? { raw: node.paddingLeft, token: resolveVar(node.boundVariables?.paddingLeft?.id, variableNames) } : undefined,
      right: node.paddingRight != null ? { raw: node.paddingRight, token: resolveVar(node.boundVariables?.paddingRight?.id, variableNames) } : undefined,
      top: node.paddingTop != null ? { raw: node.paddingTop, token: resolveVar(node.boundVariables?.paddingTop?.id, variableNames) } : undefined,
      bottom: node.paddingBottom != null ? { raw: node.paddingBottom, token: resolveVar(node.boundVariables?.paddingBottom?.id, variableNames) } : undefined,
    };
  }

  if (node.type === 'TEXT' && node.style) {
    // fontSize/lineHeight/letterSpacing are resolved together against the SAME matched
    // typography style, not independently — matching each field on its own can pick two
    // different, contradictory style names for one text layer (many sizes/line-heights
    // are reused across styles). See token-resolver.ts's resolveTypographyStyle.
    const styleToken =
      node.style.fontSize != null ? resolveTypographyStyle(node.style.fontSize, node.style.lineHeightPx) : null;
    values.text = {
      characters: node.characters,
      fontFamily: node.style.fontFamily,
      fontWeight: node.style.fontWeight,
      fontSize: node.style.fontSize != null ? { raw: node.style.fontSize, token: styleToken } : undefined,
      lineHeight: node.style.lineHeightPx != null ? { raw: node.style.lineHeightPx, token: styleToken } : undefined,
      letterSpacing: node.style.letterSpacing != null ? { raw: node.style.letterSpacing, token: styleToken } : undefined,
    };
  }

  return values;
}

// Structural containers get recursed into; TEXT/INSTANCE/VECTOR/etc. are leaves. INSTANCE
// names (e.g. "Icon/chevron-down") are still captured as their own layer path — identifies
// which asset is used, essentially free.
function walkForStructure(node: FigmaNodeRaw, path: string): CanonicalLayerNode {
  const result: CanonicalLayerNode = { path, type: node.type };
  if (isStructuralContainer(node.type) && node.children?.length) {
    result.children = node.children.map((child) => walkForStructure(child, `${path}/${child.name}`));
  }
  return result;
}

function mergeStructures(base: CanonicalLayerNode, extra: CanonicalLayerNode): CanonicalLayerNode {
  const byPath = new Map<string, CanonicalLayerNode>();
  for (const child of base.children ?? []) byPath.set(child.path, child);
  for (const child of extra.children ?? []) {
    const existing = byPath.get(child.path);
    byPath.set(child.path, existing ? mergeStructures(existing, child) : child);
  }
  const merged: CanonicalLayerNode = { path: base.path, type: base.type };
  if (byPath.size) merged.children = [...byPath.values()];
  return merged;
}

function walkForValues(node: FigmaNodeRaw, path: string, out: Record<string, LayerValues>, variableNames: Map<string, string>): void {
  out[path] = extractLayerValues(node, variableNames);
  if (isStructuralContainer(node.type) && node.children?.length) {
    for (const child of node.children) walkForValues(child, `${path}/${child.name}`, out, variableNames);
  }
}

// Requires a COMPONENT_SET (a standalone COMPONENT must be wrapped as a synthetic
// one-variant set by the caller — see generate-page-docs.ts). `variableNames` is the
// file's boundVariables id -> token-name map (see variables.ts), fetched once per file.
export function parseComponentSet(
  node: FigmaNodeRaw,
  sourceUrl: string,
  fileKey: string,
  variableNames: Map<string, string>
): ComponentSpecDoc {
  if (node.type !== 'COMPONENT_SET') {
    throw new Error(`parseComponentSet expects a COMPONENT_SET, got ${node.type} (${node.name})`);
  }

  const componentProperties: ComponentSpecDoc['componentProperties'] = {};
  for (const [key, def] of Object.entries(node.componentPropertyDefinitions ?? {})) {
    componentProperties[key] = { type: def.type, defaultValue: def.defaultValue, options: def.variantOptions };
  }

  const variantNodes = node.children ?? [];
  let structure: CanonicalLayerNode | null = null;
  const variants: VariantSpec[] = variantNodes.map((variantNode) => {
    const nodeStructure = walkForStructure(variantNode, node.name);
    structure = structure ? mergeStructures(structure, nodeStructure) : nodeStructure;

    const values: Record<string, LayerValues> = {};
    walkForValues(variantNode, node.name, values, variableNames);

    const { properties } = parseVariantName(variantNode.name);
    return { name: variantNode.name, nodeId: variantNode.id, properties, values };
  });

  return {
    componentName: node.name,
    sourceUrl,
    fileKey,
    nodeId: node.id,
    fetchedAt: new Date().toISOString(),
    componentProperties,
    structure: structure ?? { path: node.name, type: node.type },
    variants,
  };
}

export function selfCheck(): void {
  const variableNames = new Map([
    ['var-white', 'surface.card'],
    ['var-black', 'surface.inverse'],
  ]);

  const fakeSet: FigmaNodeRaw = {
    id: 'set1',
    name: 'Button',
    type: 'COMPONENT_SET',
    componentPropertyDefinitions: {
      Size: { type: 'VARIANT', defaultValue: 'Medium', variantOptions: ['Small', 'Medium'] },
    },
    children: [
      {
        id: 'v1',
        name: 'Size=Small',
        type: 'COMPONENT',
        fills: [{ type: 'SOLID', color: { r: 1, g: 1, b: 1, a: 1 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: 'var-white' } } }],
        children: [{ id: 'label1', name: 'Label', type: 'TEXT', characters: 'Go' }],
      },
      {
        id: 'v2',
        name: 'Size=Medium',
        type: 'COMPONENT',
        // No bound variable on this one — a hardcoded fill. Must resolve to token: null,
        // never a guessed name, even though some token elsewhere might share this value.
        fills: [{ type: 'SOLID', color: { r: 0, g: 0, b: 0, a: 1 } }],
        children: [
          { id: 'label2', name: 'Label', type: 'TEXT', characters: 'Go' },
          { id: 'overlay2', name: 'Overlay', type: 'FRAME', children: [] },
        ],
      },
    ],
  };

  const spec = parseComponentSet(fakeSet, 'https://example.com', 'fileKey123', variableNames);
  assert.strictEqual(spec.variants.length, 2);
  assert.deepStrictEqual(spec.variants[0].properties, { Size: 'Small' });
  assert.deepStrictEqual(spec.variants[1].properties, { Size: 'Medium' });

  // Union-of-paths: "Overlay" only exists on the Medium variant but must still appear
  // in the canonical structure tree.
  const paths = (spec.structure.children ?? []).map((c) => c.path);
  assert.ok(paths.includes('Button/Label'));
  assert.ok(paths.includes('Button/Overlay'));

  assert.strictEqual(spec.variants[0].values['Button'].fills?.[0].raw, '#ffffff');
  assert.strictEqual(spec.variants[0].values['Button'].fills?.[0].token, 'surface.card');
  assert.strictEqual(spec.variants[1].values['Button'].fills?.[0].raw, '#000000');
  assert.strictEqual(spec.variants[1].values['Button'].fills?.[0].token, null);

  console.log('✓ extract.selfCheck() passed');
}
