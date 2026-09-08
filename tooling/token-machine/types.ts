
export type FigmaVariableType = 'COLOR' | 'FLOAT' | 'STRING' | 'BOOLEAN';

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

export type FigmaModeValue = boolean | number | string | FigmaColor | FigmaVariableAlias;

export interface FigmaMode {
  modeId: string;
  name: string;
  parentModeId?: string;
}

export interface FigmaVariable {
  id: string;
  name: string;
  key: string;
  variableCollectionId: string;
  resolvedType: FigmaVariableType;
  valuesByMode: Record<string, FigmaModeValue>;
  remote: boolean;
  description?: string;
  hiddenFromPublishing?: boolean;
  deletedButReferenced?: boolean;
  scopes: string[];
  codeSyntax?: Record<string, string>;
}

export interface FigmaCollection {
  id: string;
  name: string;
  key: string;
  modes: FigmaMode[];
  defaultModeId: string;
  remote: boolean;
  hiddenFromPublishing?: boolean;
  variableIds: string[];
  isExtension: boolean;
  parentVariableCollectionId?: string;
  rootVariableCollectionId?: string;
  inheritedVariableIds?: string[];
  localVariableIds?: string[];
  variableOverrides?: Record<string, Record<string, FigmaModeValue>>;
  deletedButReferenced?: boolean;
}

export interface FigmaVariablesResponse {
  status: number;
  error: boolean;
  meta: {
    variables: Record<string, FigmaVariable>;
    variableCollections: Record<string, FigmaCollection>;
  };
}

// Extended types for internal processing
export interface FigmaModeValueLiteral {
  kind: 'literal';
  value: string | number | boolean | FigmaColor;
}

export interface FigmaModeValueAlias {
  kind: 'alias';
  variableId: string;
}

export type ProcessedFigmaModeValue = FigmaModeValueLiteral | FigmaModeValueAlias;

export interface ProcessedFigmaVariable {
  id: string;
  name: string;
  description?: string;
  collectionId: string;
  type: FigmaVariableType;
  scopes: string[];
  valuesByMode: Record<string, ProcessedFigmaModeValue>;
}

export interface ProcessedFigmaCollection {
  id: string;
  name: string;
  modes: { id: string; name: string }[];
  isExtension: boolean;
  variableOverrides?: Record<string, Record<string, FigmaModeValue>>;
  parentVariableCollectionId?: string;
  defaultModeId: string;
}

export interface ProcessedFigmaVarsExport {
  schemaVersion: number;
  collections: ProcessedFigmaCollection[];
  variables: ProcessedFigmaVariable[];
}

export interface ExtendedFigmaCollection {
  id: string;
  name: string;
  modes: { id: string; name: string }[];
  isExtension: boolean;
  variableOverrides?: Record<string, Record<string, ProcessedFigmaModeValue>>;
  parentVariableCollectionId?: string;
  defaultModeId: string;
}

export interface ExtendedFigmaVarsExport extends Omit<ProcessedFigmaVarsExport, 'collections'> {
  collections: ExtendedFigmaCollection[];
}

// DTCG standard token format
export interface DTCGToken {
  $type: string;
  $value: string | number | boolean;
  $description?: string;
}
