import * as assert from 'assert';
import { parseVariantName } from './variant-parser.js';
import type {
  CanonicalLayerNode,
  ComponentSpecDoc,
  FigmaColor,
  FigmaComponentMeta,
  FigmaComponentSetMeta,
  FigmaGradientStop,
  FigmaNodeRaw,
  FigmaPaint,
  LayerValues,
  ResolvedValue,
  VariantSpec,
} from './types.js';

// Paint types this tool can resolve at all — anything else (RADIAL/ANGULAR/DIAMOND
// gradients, images) is dropped rather than reported as an unresolved value.
const RESOLVABLE_PAINT_TYPES = new Set(['SOLID', 'GRADIENT_LINEAR']);

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

// Figma's gradient handle positions are two anchor points (+ a third for width) in the
// same normalized, y-down space CSS uses — the vector between them converts straight to a
// CSS angle (0deg = up, clockwise) with no space-flip needed.
function gradientAngleDeg(handles: { x: number; y: number }[] | undefined): number {
  const [start, end] = handles ?? [];
  if (!start || !end) return 0;
  const angle = (Math.atan2(end.x - start.x, -(end.y - start.y)) * 180) / Math.PI;
  return Math.round(((angle % 360) + 360) % 360);
}

function resolveGradientStop(stop: FigmaGradientStop, opacity: number | undefined, variableNames: Map<string, string>) {
  return {
    position: Math.round(stop.position * 100),
    hex: figmaColorToHex(stop.color, opacity),
    token: resolveVar(stop.boundVariables?.color?.id, variableNames),
  };
}

// A gradient resolves to a CSS linear-gradient() string, in both raw (hex stops) and token
// form — token form only when EVERY stop is itself tokenized; a gradient with one
// untokenized stop reports token: null rather than a half-token/half-hex string.
function resolveGradient(paint: FigmaPaint, variableNames: Map<string, string>): ResolvedValue<string> {
  const stops = (paint.gradientStops ?? []).map((s) => resolveGradientStop(s, paint.opacity, variableNames));
  const angle = gradientAngleDeg(paint.gradientHandlePositions);
  const raw = `linear-gradient(${angle}deg, ${stops.map((s) => `${s.hex} ${s.position}%`).join(', ')})`;
  const token = stops.length && stops.every((s) => s.token) ? `linear-gradient(${angle}deg, ${stops.map((s) => `${s.token} ${s.position}%`).join(', ')})` : null;
  return { raw, token };
}

// SOLID and GRADIENT_LINEAR are resolved (ponytail: v1 scope — RADIAL/ANGULAR/DIAMOND
// gradients and images unresolved, add if a component actually uses one). Applies equally
// to fills, strokes, and text color — Figma stores text color as a TEXT node's `fills`,
// so this same function already covers a gradient text flavor with no extra plumbing.
function resolvePaint(paint: FigmaPaint, variableNames: Map<string, string>): ResolvedValue<string> {
  if (paint.type === 'SOLID' && paint.color) {
    const raw = figmaColorToHex(paint.color, paint.opacity);
    return { raw, token: resolveVar(paint.boundVariables?.color?.id, variableNames) };
  }
  if (paint.type === 'GRADIENT_LINEAR' && paint.gradientStops?.length) {
    return resolveGradient(paint, variableNames);
  }
  return { raw: null, token: null };
}

// A component can bind uniform corner radius via `boundVariables.cornerRadius`, or (when
// each corner is independently tokenized, or the radius is 0 and Figma omits the plain
// field) via `boundVariables.rectangleCornerRadii`. Only the top-left corner is read in
// the latter case — ponytail: v1 scope, upgrade to all four if a component actually uses
// different radii per corner.
function cornerRadiusVariableId(node: FigmaNodeRaw): string | undefined {
  return node.boundVariables?.cornerRadius?.id ?? node.boundVariables?.rectangleCornerRadii?.RECTANGLE_TOP_LEFT_CORNER_RADIUS?.id;
}

// Same two-shapes-for-one-property pattern as cornerRadius above: a uniform stroke weight
// binds via `boundVariables.strokeWeight`, but per-side weights (even four equal sides)
// bind via `individualStrokeWeights` instead. Only the top side is read in that case —
// ponytail: v1 scope, upgrade to all four if a component actually uses different widths
// per side.
function strokeWeightVariableId(node: FigmaNodeRaw): string | undefined {
  return node.boundVariables?.strokeWeight?.id ?? node.boundVariables?.individualStrokeWeights?.BORDER_TOP_WEIGHT?.id;
}

function extractLayerValues(node: FigmaNodeRaw, variableNames: Map<string, string>): LayerValues {
  const values: LayerValues = {};

  // Width/height bindings live under boundVariables.size.x/.y (not top-level width/height),
  // and the raw value comes from absoluteBoundingBox — Figma doesn't return plain
  // width/height fields. Only included when actually bound to a token; a raw size with no
  // binding is dropped rather than reported as an untokenized value.
  const widthVarId = node.boundVariables?.size?.x?.id;
  if (widthVarId && node.absoluteBoundingBox?.width != null) {
    values.width = { raw: node.absoluteBoundingBox.width, token: resolveVar(widthVarId, variableNames) };
  }

  const heightVarId = node.boundVariables?.size?.y?.id;
  if (heightVarId && node.absoluteBoundingBox?.height != null) {
    values.height = { raw: node.absoluteBoundingBox.height, token: resolveVar(heightVarId, variableNames) };
  }

  const fills = (node.fills ?? []).filter((p) => RESOLVABLE_PAINT_TYPES.has(p.type));
  if (fills.length) values.fills = fills.map((p) => resolvePaint(p, variableNames));

  const strokes = (node.strokes ?? []).filter((p) => RESOLVABLE_PAINT_TYPES.has(p.type));
  if (strokes.length) values.strokes = strokes.map((p) => resolvePaint(p, variableNames));

  const radiusVarId = cornerRadiusVariableId(node);
  if (node.cornerRadius != null || radiusVarId) {
    values.cornerRadius = { raw: node.cornerRadius ?? 0, token: resolveVar(radiusVarId, variableNames) };
  }

  // Only meaningful alongside an actual stroke — a strokeWeight with no stroke paint is
  // just Figma's default and not worth reporting.
  if ((node.strokes ?? []).length) {
    const strokeWeightVarId = strokeWeightVariableId(node);
    if (node.strokeWeight != null || strokeWeightVarId) {
      values.strokeWeight = { raw: node.strokeWeight ?? 0, token: resolveVar(strokeWeightVarId, variableNames) };
    }
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
    // Text-style bindings (fontSize/lineHeight/letterSpacing) come back as one-element
    // arrays, not single aliases — Figma's shape for supporting mixed-style runs within a
    // single text node. Only the first (only, for these single-style layers) entry applies.
    const fontSizeVarId = node.boundVariables?.fontSize?.[0]?.id;
    const lineHeightVarId = node.boundVariables?.lineHeight?.[0]?.id;
    const letterSpacingVarId = node.boundVariables?.letterSpacing?.[0]?.id;
    values.text = {
      characters: node.characters,
      fontFamily: node.style.fontFamily,
      fontWeight: node.style.fontWeight,
      fontSize: node.style.fontSize != null ? { raw: node.style.fontSize, token: resolveVar(fontSizeVarId, variableNames) } : undefined,
      lineHeight: node.style.lineHeightPx != null ? { raw: node.style.lineHeightPx, token: resolveVar(lineHeightVarId, variableNames) } : undefined,
      letterSpacing: node.style.letterSpacing != null ? { raw: node.style.letterSpacing, token: resolveVar(letterSpacingVarId, variableNames) } : undefined,
    };
  }

  return values;
}

// A zeta-web icon is always rendered through the shared "Icon" wrapper component (matches
// the <zeta-icon> element) with the actual glyph swapped in as a nested INSTANCE — resolved
// by componentId/componentPropertyReferences, not by guessing from a layer's own name
// (which a designer can freely rename, e.g. "Search-Icon", "Cancel-Icon").
const ICON_WRAPPER_COMPONENT_NAME = 'Icon';

// An INSTANCE's applied component identity: the componentSet's name if it belongs to one
// (a variant like "Style=rounded" isn't a useful identity on its own), else the component's
// own name.
function resolveComponentName(
  componentId: string | undefined,
  components: Record<string, FigmaComponentMeta>,
  componentSets: Record<string, FigmaComponentSetMeta>
): string | undefined {
  if (!componentId) return undefined;
  const component = components[componentId];
  if (!component) return undefined;
  return component.componentSetId ? componentSets[component.componentSetId]?.name : component.name;
}

function resolveIconName(
  node: FigmaNodeRaw,
  components: Record<string, FigmaComponentMeta>,
  componentSets: Record<string, FigmaComponentSetMeta>
): string | undefined {
  if (node.type !== 'INSTANCE') return undefined;
  if (resolveComponentName(node.componentId, components, componentSets) !== ICON_WRAPPER_COMPONENT_NAME) return undefined;
  const swapped = (node.children ?? []).find((c) => c.componentPropertyReferences?.mainComponent);
  return swapped ? resolveComponentName(swapped.componentId, components, componentSets) : undefined;
}

// Structural containers get recursed into; TEXT/INSTANCE/VECTOR/etc. are leaves. INSTANCE
// names (e.g. "Search-Icon") are still captured as their own layer path — identifies which
// asset is used, essentially free. An icon instance additionally gets its resolved glyph
// name (e.g. "Search") attached, since the layer's own name is only a human label.
function walkForStructure(
  node: FigmaNodeRaw,
  path: string,
  components: Record<string, FigmaComponentMeta>,
  componentSets: Record<string, FigmaComponentSetMeta>
): CanonicalLayerNode {
  const result: CanonicalLayerNode = { path, type: node.type };
  const icon = resolveIconName(node, components, componentSets);
  if (icon) result.icon = icon;
  if (isStructuralContainer(node.type) && node.children?.length) {
    result.children = node.children.map((child) => walkForStructure(child, `${path}/${child.name}`, components, componentSets));
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
  const merged: CanonicalLayerNode = { path: base.path, type: base.type, icon: base.icon ?? extra.icon };
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
// `components`/`componentSets` are the same page fetch's own maps (see discover.ts's
// NodeSubtree) — used only to resolve icon instances to their glyph name.
export function parseComponentSet(
  node: FigmaNodeRaw,
  sourceUrl: string,
  fileKey: string,
  variableNames: Map<string, string>,
  components: Record<string, FigmaComponentMeta> = {},
  componentSets: Record<string, FigmaComponentSetMeta> = {}
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
    const nodeStructure = walkForStructure(variantNode, node.name, components, componentSets);
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
    ['var-width-small', 'var.width.small'],
    ['var-font-size-md', 'typography.body.medium.font-size'],
    ['var-stroke-weight', 'border.width.sm'],
    ['var-gradient-a', 'gradient.brand.start'],
    ['var-gradient-b', 'gradient.brand.end'],
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
        absoluteBoundingBox: { x: 0, y: 0, width: 100, height: 40 },
        fills: [{ type: 'SOLID', color: { r: 1, g: 1, b: 1, a: 1 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: 'var-white' } } }],
        boundVariables: { size: { x: { type: 'VARIABLE_ALIAS', id: 'var-width-small' } } },
        children: [
          {
            id: 'label1',
            name: 'Label',
            type: 'TEXT',
            characters: 'Go',
            style: { fontFamily: 'IBM Plex Sans', fontWeight: 400, fontSize: 16, lineHeightPx: 24 },
            // Text-style bindings are one-element arrays, not bare aliases (see extract.ts).
            boundVariables: { fontSize: [{ type: 'VARIABLE_ALIAS', id: 'var-font-size-md' }] },
          },
          // A leading icon: an INSTANCE of the shared "Icon" wrapper, with the actual glyph
          // swapped in as a nested INSTANCE — must resolve to icon: "Chevron Right", not the
          // layer's own arbitrary name ("Leading-Icon") or the wrapper's variant name.
          {
            id: 'iconwrap1',
            name: 'Leading-Icon',
            type: 'INSTANCE',
            componentId: 'comp-icon-wrapper',
            children: [
              { id: 'glyph1', name: 'Chevron Right', type: 'INSTANCE', componentId: 'comp-chevron', componentPropertyReferences: { mainComponent: 'Name#1:1' } },
            ],
          },
          // A non-icon INSTANCE_SWAP (e.g. a dropdown's swappable trigger component) must
          // NOT be mislabeled as an icon just because it also has componentPropertyReferences
          // — only a swap nested inside the "Icon" wrapper counts.
          {
            id: 'swap1',
            name: 'Trigger',
            type: 'INSTANCE',
            componentId: 'comp-trigger-wrapper',
            children: [
              { id: 'triggerbody1', name: 'Button', type: 'INSTANCE', componentId: 'comp-button', componentPropertyReferences: { mainComponent: 'Trigger Component#1:1' } },
            ],
          },
        ],
      },
      {
        id: 'v2',
        name: 'Size=Medium',
        type: 'COMPONENT',
        // Sized, but not bound to a variable — width/height must stay unreported, not
        // fall back to the raw pixel value.
        absoluteBoundingBox: { x: 0, y: 0, width: 120, height: 48 },
        // No bound variable on this one — a hardcoded fill. Must resolve to token: null,
        // never a guessed name, even though some token elsewhere might share this value.
        fills: [{ type: 'SOLID', color: { r: 0, g: 0, b: 0, a: 1 } }],
        // A fully-tokenized gradient border, plus its width — both stops bound, so this
        // must resolve to a token-form linear-gradient(), not just the raw hex form.
        strokes: [
          {
            type: 'GRADIENT_LINEAR',
            gradientHandlePositions: [
              { x: 0, y: 0 },
              { x: 1, y: 0 },
              { x: 0, y: 1 },
            ],
            gradientStops: [
              { position: 0, color: { r: 1, g: 0, b: 0, a: 1 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: 'var-gradient-a' } } },
              { position: 1, color: { r: 0, g: 0, b: 1, a: 1 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: 'var-gradient-b' } } },
            ],
          },
        ],
        strokeWeight: 2,
        boundVariables: { individualStrokeWeights: { BORDER_TOP_WEIGHT: { type: 'VARIABLE_ALIAS', id: 'var-stroke-weight' } } },
        children: [
          { id: 'label2', name: 'Label', type: 'TEXT', characters: 'Go' },
          {
            id: 'overlay2',
            name: 'Overlay',
            type: 'FRAME',
            // Partially-tokenized gradient (only the first stop is bound) — raw still
            // resolves to a linear-gradient(), but token must be null, not a
            // half-token/half-hex string.
            fills: [
              {
                type: 'GRADIENT_LINEAR',
                gradientHandlePositions: [
                  { x: 0, y: 0 },
                  { x: 1, y: 1 },
                  { x: 0, y: 1 },
                ],
                gradientStops: [
                  { position: 0, color: { r: 1, g: 0, b: 0, a: 1 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: 'var-gradient-a' } } },
                  { position: 1, color: { r: 0, g: 0, b: 1, a: 1 } },
                ],
              },
            ],
            children: [],
          },
        ],
      },
    ],
  };

  const components = {
    'comp-icon-wrapper': { name: 'Size=medium', componentSetId: 'set-icon' },
    'comp-chevron': { name: 'Style=rounded', componentSetId: 'set-chevron' },
    'comp-trigger-wrapper': { name: 'Size=medium', componentSetId: 'set-trigger-wrapper' },
    'comp-button': { name: 'Style=primary', componentSetId: 'set-button' },
  };
  const componentSets = {
    'set-icon': { name: 'Icon' },
    'set-chevron': { name: 'Chevron Right' },
    'set-trigger-wrapper': { name: 'Trigger Wrapper' },
    'set-button': { name: 'Button' },
  };

  const spec = parseComponentSet(fakeSet, 'https://example.com', 'fileKey123', variableNames, components, componentSets);
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

  // Width/height only included if bound to a token in Figma
  assert.strictEqual(spec.variants[0].values['Button'].width?.raw, 100);
  assert.strictEqual(spec.variants[0].values['Button'].width?.token, 'var.width.small');
  assert.strictEqual(spec.variants[1].values['Button'].width, undefined); // No bound variable, ignored
  assert.strictEqual(spec.variants[1].values['Button'].height, undefined); // No bound variable, ignored

  // An icon instance (INSTANCE of the "Icon" wrapper, with a swapped-in glyph child)
  // resolves to the glyph's own name — never the wrapper's generic variant name, and never
  // just the layer's own arbitrary name.
  const iconNode = (spec.structure.children ?? []).find((c) => c.path === 'Button/Leading-Icon');
  assert.strictEqual(iconNode?.icon, 'Chevron Right');

  // A non-icon INSTANCE_SWAP (e.g. a swappable trigger component) must not be mislabeled
  // as an icon just because it also carries componentPropertyReferences.
  const swapNode = (spec.structure.children ?? []).find((c) => c.path === 'Button/Trigger');
  assert.strictEqual(swapNode?.icon, undefined);

  // Text-style bindings arrive as one-element arrays — fontSize bound resolves; lineHeight
  // unbound on the same layer stays raw-only (token: null), not silently skipped.
  const label = spec.variants[0].values['Button/Label'].text;
  assert.strictEqual(label?.fontSize?.raw, 16);
  assert.strictEqual(label?.fontSize?.token, 'typography.body.medium.font-size');
  assert.strictEqual(label?.lineHeight?.raw, 24);
  assert.strictEqual(label?.lineHeight?.token, null);

  // Border stroke width: only reported alongside an actual stroke paint, and only bound
  // via individualStrokeWeights (Figma's shape for a uniform width) resolves to a token.
  assert.strictEqual(spec.variants[1].values['Button'].strokeWeight?.raw, 2);
  assert.strictEqual(spec.variants[1].values['Button'].strokeWeight?.token, 'border.width.sm');
  assert.strictEqual(spec.variants[0].values['Button'].strokeWeight, undefined); // no stroke paint on Small

  // A fully-tokenized gradient border resolves to a linear-gradient() in BOTH raw (hex
  // stops) and token form.
  const buttonStroke = spec.variants[1].values['Button'].strokes?.[0];
  assert.strictEqual(buttonStroke?.raw, 'linear-gradient(90deg, #ff0000 0%, #0000ff 100%)');
  assert.strictEqual(buttonStroke?.token, 'linear-gradient(90deg, gradient.brand.start 0%, gradient.brand.end 100%)');

  // A gradient with only ONE stop tokenized still resolves raw (hex form), but token must
  // be null — never a half-token/half-hex string.
  const overlayFill = spec.variants[1].values['Button/Overlay'].fills?.[0];
  assert.strictEqual(overlayFill?.raw, 'linear-gradient(135deg, #ff0000 0%, #0000ff 100%)');
  assert.strictEqual(overlayFill?.token, null);

  console.log('✓ extract.selfCheck() passed');
}
