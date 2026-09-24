// Figma REST API node shapes (only the fields this tool reads).
export interface FigmaColor {
  r: number;
  g: number;
  b: number;
  a: number;
}

export interface FigmaVariableAlias {
  type: 'VARIABLE_ALIAS';
  id: string;
}

export interface FigmaGradientStop {
  color: FigmaColor;
  position: number;
  boundVariables?: { color?: FigmaVariableAlias };
}

export interface FigmaPaint {
  type: string;
  color?: FigmaColor;
  opacity?: number;
  boundVariables?: { color?: FigmaVariableAlias };
  // GRADIENT_LINEAR only (ponytail: v1 scope — RADIAL/ANGULAR/DIAMOND unresolved, add if a
  // component actually uses one). Each stop's own boundVariables.color is the source of
  // truth for that stop's token, same as a SOLID paint's boundVariables.color.
  gradientHandlePositions?: { x: number; y: number }[];
  gradientStops?: FigmaGradientStop[];
}

export interface FigmaTypeStyle {
  fontFamily?: string;
  fontWeight?: number;
  fontSize?: number;
  lineHeightPx?: number;
  letterSpacing?: number;
}

export interface FigmaComponentPropertyDefinition {
  type: string;
  defaultValue: string | boolean | Record<string, unknown>;
  variantOptions?: string[];
}

export interface FigmaComponentMeta {
  name: string;
  componentSetId?: string;
}

export interface FigmaComponentSetMeta {
  name: string;
}

export interface FigmaNodeRaw {
  id: string;
  name: string;
  type: string;
  characters?: string;
  children?: FigmaNodeRaw[];
  // Which main component this INSTANCE currently displays, and (if it fulfills an
  // INSTANCE_SWAP override on an ancestor) which component property drove that swap —
  // the ground truth for icon/glyph resolution (see extract.ts's resolveIconName), same
  // "read Figma's own structure, don't guess from a layer name" approach as boundVariables.
  componentId?: string;
  componentPropertyReferences?: { mainComponent?: string };
  // Metadata-frame table parsing (metadata.ts) zips cells to columns by x-position,
  // since the REST API doesn't expose CSS-like column classes.
  absoluteBoundingBox?: { x: number; y: number; width: number; height: number };
  fills?: FigmaPaint[];
  strokes?: FigmaPaint[];
  cornerRadius?: number;
  strokeWeight?: number;
  itemSpacing?: number;
  paddingLeft?: number;
  paddingRight?: number;
  paddingTop?: number;
  paddingBottom?: number;
  style?: FigmaTypeStyle;
  componentPropertyDefinitions?: Record<string, FigmaComponentPropertyDefinition>;
  // Which Figma Variable is actually applied to each property — the ground truth for
  // token resolution (see variables.ts), no value-based guessing needed for these fields.
  boundVariables?: {
    // Width/height bindings live under `size.x` / `size.y`, not top-level `width`/`height`.
    size?: { x?: FigmaVariableAlias; y?: FigmaVariableAlias };
    cornerRadius?: FigmaVariableAlias;
    rectangleCornerRadii?: Record<string, FigmaVariableAlias>;
    // Uniform stroke weight binds here directly; per-side weights (even when all four
    // sides share one variable) bind under individualStrokeWeights instead — same
    // top-left-corner-stands-for-all-corners convention as rectangleCornerRadii above.
    strokeWeight?: FigmaVariableAlias;
    individualStrokeWeights?: Record<string, FigmaVariableAlias>;
    itemSpacing?: FigmaVariableAlias;
    paddingLeft?: FigmaVariableAlias;
    paddingRight?: FigmaVariableAlias;
    paddingTop?: FigmaVariableAlias;
    paddingBottom?: FigmaVariableAlias;
    // Text-style bindings come back as arrays (Figma supports mixed-style runs within one
    // text node) — even a single uniform style is wrapped in a one-element array.
    fontSize?: FigmaVariableAlias[];
    lineHeight?: FigmaVariableAlias[];
    letterSpacing?: FigmaVariableAlias[];
  };
}

export interface FigmaFileNodesResponse {
  nodes: Record<
    string,
    { document: FigmaNodeRaw; components?: Record<string, FigmaComponentMeta>; componentSets?: Record<string, FigmaComponentSetMeta> } | null
  >;
}

// Output shapes produced by this tool.
export interface ResolvedValue<T = string> {
  raw: T | null;
  token: string | null;
}

export interface CanonicalLayerNode {
  path: string;
  type: string;
  // The resolved glyph name, only for an INSTANCE of the shared "Icon" wrapper component
  // (matches zeta-web's <zeta-icon>) — e.g. "Search", "Cancel". See extract.ts.
  icon?: string;
  children?: CanonicalLayerNode[];
}

export interface LayerValues {
  width?: ResolvedValue<number>;
  height?: ResolvedValue<number>;
  // A gradient paint's raw/token are CSS linear-gradient() strings (see extract.ts's
  // resolvePaint) rather than a single hex/name — same ResolvedValue<string> shape as a
  // SOLID paint, so callers (render-markdown.ts) don't need to know which kind it is.
  fills?: ResolvedValue[];
  strokes?: ResolvedValue[];
  cornerRadius?: ResolvedValue<number>;
  strokeWeight?: ResolvedValue<number>;
  itemSpacing?: ResolvedValue<number>;
  padding?: {
    top?: ResolvedValue<number>;
    right?: ResolvedValue<number>;
    bottom?: ResolvedValue<number>;
    left?: ResolvedValue<number>;
  };
  text?: {
    characters?: string;
    fontFamily?: string;
    fontWeight?: number;
    fontSize?: ResolvedValue<number>;
    lineHeight?: ResolvedValue<number>;
    letterSpacing?: ResolvedValue<number>;
  };
}

export interface VariantSpec {
  name: string;
  nodeId: string;
  properties: Record<string, string>;
  values: Record<string, LayerValues>;
}

export interface ComponentSpecDoc {
  componentName: string;
  sourceUrl: string;
  fileKey: string;
  nodeId: string;
  fetchedAt: string;
  componentProperties: Record<string, { type: string; defaultValue: string | boolean | Record<string, unknown>; options?: string[] }>;
  structure: CanonicalLayerNode;
  variants: VariantSpec[];
}

// Human-authored "<Name> Metadata" doc frame content (see metadata.ts).
export interface HeroSection {
  statusLabel: string; // "BUTTON · COMPONENT METADATA"
  heading: string; // "What this component does"
  description: string; // free-text overview paragraph
}

export interface AnatomyItem {
  number: string;
  title: string;
  description: string;
}

export type DocSection =
  | {
      kind: 'table';
      nodeId: string;
      title: string;
      columns: string[];
      rows: Record<string, string | boolean | string[]>[];
    }
  | {
      kind: 'anatomy';
      nodeId: string;
      title: string;
      diagramNodeId?: string;
      items: AnatomyItem[];
    }
  | {
      kind: 'how-to-use';
      nodeId: string;
      title: string;
      dos: string[];
      donts: string[];
    }
  | {
      kind: 'bullet-list';
      nodeId: string;
      title: string;
      items: string[];
    }
  | {
      kind: 'unknown';
      nodeId: string;
      layerName: string;
      title: string | null;
      rawTextContent: string[];
    };

export interface ComponentMetadataDoc {
  componentName: string; // e.g. "BUTTON", derived from Hero status label
  sourceUrl: string;
  fileKey: string;
  nodeId: string; // colon form, e.g. "3840:907"
  fetchedAt: string; // ISO date
  hero: HeroSection;
  sections: DocSection[]; // ordered, everything after Hero — nothing silently dropped
}
