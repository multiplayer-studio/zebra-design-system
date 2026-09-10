// --- Raw Figma REST subset (input) ---

export interface FigmaNodeRaw {
  id: string;
  name: string;
  type: string; // 'FRAME' | 'TEXT' | 'INSTANCE' | 'VECTOR' | 'COMPONENT' | 'GROUP' | ...
  characters?: string; // TEXT nodes only
  children?: FigmaNodeRaw[];
  absoluteBoundingBox?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export interface FigmaFileNodesResponse {
  nodes: Record<string, { document: FigmaNodeRaw } | null>;
}

// --- Output document (ComponentMetadataDoc) ---

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
