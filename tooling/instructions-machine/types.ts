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

export interface FigmaPaint {
  type: string;
  color?: FigmaColor;
  opacity?: number;
  boundVariables?: { color?: FigmaVariableAlias };
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

export interface FigmaNodeRaw {
  id: string;
  name: string;
  type: string;
  characters?: string;
  children?: FigmaNodeRaw[];
  // Metadata-frame table parsing (metadata.ts) zips cells to columns by x-position,
  // since the REST API doesn't expose CSS-like column classes.
  absoluteBoundingBox?: { x: number; y: number; width: number; height: number };
  fills?: FigmaPaint[];
  strokes?: FigmaPaint[];
  cornerRadius?: number;
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
    cornerRadius?: FigmaVariableAlias;
    rectangleCornerRadii?: Record<string, FigmaVariableAlias>;
    itemSpacing?: FigmaVariableAlias;
    paddingLeft?: FigmaVariableAlias;
    paddingRight?: FigmaVariableAlias;
    paddingTop?: FigmaVariableAlias;
    paddingBottom?: FigmaVariableAlias;
  };
}

export interface FigmaFileNodesResponse {
  nodes: Record<string, { document: FigmaNodeRaw } | null>;
}

// Output shapes produced by this tool.
export interface ResolvedValue<T = string> {
  raw: T | null;
  token: string | null;
}

export interface CanonicalLayerNode {
  path: string;
  type: string;
  children?: CanonicalLayerNode[];
}

export interface LayerValues {
  fills?: ResolvedValue[];
  strokes?: ResolvedValue[];
  cornerRadius?: ResolvedValue<number>;
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
