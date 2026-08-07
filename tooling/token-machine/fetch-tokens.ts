import fs from 'node:fs';
import path from 'node:path';

// --- Types & Interfaces ---

interface FigmaColor {
  r: number;
  g: number;
  b: number;
  a: number;
}

interface FigmaVariableAlias {
  type: 'VARIABLE_ALIAS';
  id: string;
}

type FigmaVariableValue = string | number | boolean | FigmaColor | FigmaVariableAlias;

interface FigmaVariable {
  id: string;
  name: string;
  variableCollectionId: string;
  resolvedType: 'COLOR' | 'FLOAT' | 'STRING' | 'BOOLEAN';
  valuesByMode: Record<string, FigmaVariableValue>;
}

interface FigmaVariableCollection {
  id: string;
  name: string;
  isExtension?: boolean;
  modes: { modeId: string; name: string }[];
  variableOverrides?: Record<string, Record<string, FigmaVariableValue>>;
}

interface FigmaVariablesResponse {
  status: number;
  error?: boolean;
  meta: {
    variables: Record<string, FigmaVariable>;
    variableCollections: Record<string, FigmaVariableCollection>;
  };
}

// --- Configuration ---

const FIGMA_FILE_KEY = process.env.FIGMA_FILE_KEY;
const FIGMA_TOKEN = process.env.FIGMA_PERSONAL_ACCESS_TOKEN;
const TOKENS_DIR = path.join(process.cwd(), 'tokens');

if (!FIGMA_FILE_KEY || !FIGMA_TOKEN) {
  console.error("❌ Missing required environment variables: FIGMA_FILE_KEY or FIGMA_PERSONAL_ACCESS_TOKEN");
  process.exit(1);
}

// --- Type Guards ---

function isAlias(value: any): value is FigmaVariableAlias {
  return typeof value === 'object' && value !== null && value.type === 'VARIABLE_ALIAS';
}

function isColor(value: any): value is FigmaColor {
  return typeof value === 'object' && value !== null && 'r' in value && 'g' in value && 'b' in value && 'a' in value && !('type' in value);
}

// --- Utility Functions ---

function mapFigmaTypeToW3C(figmaType: FigmaVariable['resolvedType']): string {
  const typeMap: Record<FigmaVariable['resolvedType'], string> = {
    'COLOR': 'color',
    'FLOAT': 'number', // Can be 'dimension' based on context, defaulting to number
    'STRING': 'string',
    'BOOLEAN': 'boolean'
  };
  return typeMap[figmaType] || 'string';
}

function parseFigmaColor(color: FigmaColor): string {
  const r = Math.round(color.r * 255);
  const g = Math.round(color.g * 255);
  const b = Math.round(color.b * 255);
  if (color.a === 1) {
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
  }
  return `rgba(${r}, ${g}, ${b}, ${Number(color.a.toFixed(2))})`;
}

function setNestedToken(targetObj: Record<string, any>, tokenPath: string, tokenValue: any, tokenType: string): void {
  const parts = tokenPath.split('/');
  let current = targetObj;

  parts.forEach((part, index) => {
    if (index === parts.length - 1) {
      current[part] = {
        $value: tokenValue,
        $type: tokenType 
      };
    } else {
      current[part] = current[part] || {};
      current = current[part];
    }
  });
}

function resolveValue(value: FigmaVariableValue, figmaType: FigmaVariable['resolvedType'], varMap: Record<string, FigmaVariable>): string | number | boolean {
  if (isAlias(value)) {
    const aliasedVar = varMap[value.id];
    if (!aliasedVar) return value.id; 
    // Format as W3C Alias: {color.primitives.white}
    return `{${aliasedVar.name.replace(/\//g, '.')}}`;
  }

  if (isColor(value) && figmaType === 'COLOR') {
    return parseFigmaColor(value);
  }
  
  // Return primitive types directly (string, number, boolean)
  return value as string | number | boolean;
}

function hoistTypes(obj: any): any {
  if (typeof obj !== 'object' || obj === null || obj.$value !== undefined) {
    return obj;
  }
  console.log("obj before hoist: ", obj)

  const keys = Object.keys(obj);
  let sharedType: string | null = null;
  let allShareType = true;

  for (const key of keys) {
    if (key === '$type') continue;
    
    // Recursively hoist children first
    hoistTypes(obj[key]);

    const childType = obj[key].$type;
    
    if (!childType) {
      allShareType = false;
    } else if (sharedType === null) {
      sharedType = childType;
    } else if (sharedType !== childType) {
      allShareType = false;
    }
  }

  if (allShareType && sharedType !== null && keys.length > 0) {
    obj.$type = sharedType;
    // Remove $type from children now that it is hoisted
    for (const key of keys) {
      if (obj[key] && obj[key].$type) {
        delete obj[key].$type;
      }
    }
  }
  
  console.log("obj after hoist: ", obj)
  
  return obj;
}

function writeJSON(filePath: string, data: Record<string, any>): void {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  const cleanedData = hoistTypes(data);
  fs.writeFileSync(filePath, JSON.stringify(cleanedData, null, 2), 'utf-8');
  console.log(`✅ Wrote ${filePath}`);
}

// --- Main Execution ---

async function fetchAndParseTokens(): Promise<void> {
  console.log(`Fetching variables from Figma file: ${FIGMA_FILE_KEY}...`);

  try {
    const response = await fetch(`https://api.figma.com/v1/files/${FIGMA_FILE_KEY}/variables/local`, {
      headers: { 'X-Figma-Token': FIGMA_TOKEN as string }
    });
    
    if (!response.ok) {
      throw new Error(`Figma API Error: ${response.status} - ${response.statusText}`);
    }

    const json = (await response.json()) as FigmaVariablesResponse;
    const { variables, variableCollections } = json.meta;

    const varMap = Object.values(variables).reduce((acc, v) => {
      acc[v.id] = v;
      return acc;
    }, {} as Record<string, FigmaVariable>);

    const collections = Object.values(variableCollections);
    const primitivesCol = collections.find(c => c.name === 'primitives');
    const semanticsCol = collections.find(c => c.name === 'semantics');
    const paletteCol = collections.find(c => c.name === 'palette');
    const extensions = collections.filter(c => !['primitives', 'semantics', 'palette'].includes(c.name));

    // 1. Process Primitives
    if (primitivesCol) {
      const tokens: Record<string, any> = {};
      const modeId = primitivesCol.modes[0].modeId; 
      Object.values(variables)
        .filter(v => v.variableCollectionId === primitivesCol.id)
        .forEach(v => {
          const w3cType = mapFigmaTypeToW3C(v.resolvedType);
          const val = resolveValue(v.valuesByMode[modeId], v.resolvedType, varMap);
          setNestedToken(tokens, v.name, val, w3cType);
        });
      writeJSON(path.join(TOKENS_DIR, 'primitives.json'), tokens);
    }

    // 2. Process Semantics
    if (semanticsCol) {
      const tokens: Record<string, any> = {};
      const modeId = semanticsCol.modes[0].modeId; 
      Object.values(variables)
        .filter(v => v.variableCollectionId === semanticsCol.id)
        .forEach(v => {
          const w3cType = mapFigmaTypeToW3C(v.resolvedType);
          const val = resolveValue(v.valuesByMode[modeId], v.resolvedType, varMap);
          setNestedToken(tokens, v.name, val, w3cType);
        });
      writeJSON(path.join(TOKENS_DIR, 'semantics.json'), tokens);
    }

    // 3. Process Palette (Default Theme)
    if (paletteCol) {
      paletteCol.modes.forEach(mode => {
        const tokens: Record<string, any> = {};
        Object.values(variables)
          .filter(v => v.variableCollectionId === paletteCol.id)
          .forEach(v => {
            const w3cType = mapFigmaTypeToW3C(v.resolvedType);
            const val = resolveValue(v.valuesByMode[mode.modeId], v.resolvedType, varMap);
            setNestedToken(tokens, v.name, val, w3cType);
          });
        writeJSON(path.join(TOKENS_DIR, 'default', `${mode.name}.json`), tokens);
      });
    }

    // 4. Process Extensions (Alt Themes)
    extensions.forEach(extCol => {
      // Safety check to ensure Figma provided the overrides object
      const overrides = extCol.variableOverrides || {};

      extCol.modes.forEach(mode => {
        const tokens: Record<string, any> = {};
        
        // In the REST API, extended modes store their values in `variableOverrides` 
        // on the collection object itself, mapped by the base Variable ID.
        Object.entries(overrides).forEach(([variableId, modeValues]) => {
          
          // Check if this specific variable has an override for the current mode
          if (mode.modeId in modeValues) {
            const rawValue = modeValues[mode.modeId];
            
            // We need to look up the original variable to get its name and type
            const baseVar = varMap[variableId];
            if (!baseVar) return;

            const w3cType = mapFigmaTypeToW3C(baseVar.resolvedType);
            const resolvedVal = resolveValue(rawValue, baseVar.resolvedType, varMap);
            
            if (resolvedVal !== undefined) {
              setNestedToken(tokens, baseVar.name, resolvedVal, w3cType);
            }
          }
        });

        if (Object.keys(tokens).length > 0) {
          writeJSON(path.join(TOKENS_DIR, extCol.name, `${mode.name}.json`), tokens);
        } else {
          console.log(`⚠️ Skipped ${extCol.name}/${mode.name}.json (No overrides defined for this mode)`);
        }
      });
    });


    console.log("🚀 Token extraction complete!");

  } catch (error) {
    console.error("❌ Failed to fetch tokens:", error);
  }
}

fetchAndParseTokens();
