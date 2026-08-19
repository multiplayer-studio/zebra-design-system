
export type FigmaVariableType = 'COLOR' | 'FLOAT' | 'STRING' | 'BOOLEAN';

export interface FigmaModeValueLiteral {
  kind: 'literal';
  value: string | number | boolean | { r: number; g: number; b: number; a: number };
}

export interface FigmaModeValueAlias {
  kind: 'alias';
  variableId: string;
}

export type FigmaModeValue = FigmaModeValueLiteral | FigmaModeValueAlias;

export interface FigmaVariable {
  id: string;
  name: string;
  description?: string;
  collectionId: string;
  type: FigmaVariableType;
  scopes: string[];
  valuesByMode: Record<string, FigmaModeValue>;
}

export interface FigmaCollection {
  id: string;
  name: string;
  modes: { id: string; name: string }[];
  isExtension: boolean;
  defaultModeId: string;
}

export interface FigmaVarsExport {
  schemaVersion: number;
  collections: FigmaCollection[];
  variables: FigmaVariable[];
}

export interface ExtendedFigmaCollection extends FigmaCollection {
  variableOverrides?: Record<string, Record<string, FigmaModeValue>>;
}

export interface ExtendedFigmaVarsExport extends Omit<FigmaVarsExport, 'collections'> {
  collections: ExtendedFigmaCollection[];
}

// DTCG standard token format
export interface DTCGToken {
  $type: string;
  $value: string | number | boolean;
  $description?: string;
}
