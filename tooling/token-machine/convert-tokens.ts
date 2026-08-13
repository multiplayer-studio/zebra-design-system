import * as fs from 'fs';
import * as path from 'path';
import { 
  FigmaModeValue, 
  FigmaVariableType, 
  FigmaVariable, 
  ExtendedFigmaCollection, 
  ExtendedFigmaVarsExport, 
  DTCGToken 
} from './types.ts';

function rgbaToHex(color: { r: number; g: number; b: number; a: number }): string {
  const toHex = (value: number) => {
    const hex = Math.round(value * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  const r = toHex(color.r);
  const g = toHex(color.g);
  const b = toHex(color.b);
  // Omit alpha channel from hex string if opacity is 100%
  const a = color.a < 1 ? toHex(color.a) : '';

  return `#${r}${g}${b}${a}`;
}

function getDtcgType(figmaType: FigmaVariableType): string {
  switch (figmaType) {
    case 'COLOR': return 'color';
    case 'FLOAT': return 'number';
    case 'STRING': return 'string';
    case 'BOOLEAN': return 'boolean';
    default: return 'unknown';
  }
}

// Deep Object Setter for converting "brand/primary/500" into nested JSON
function sanitizeTokenName(name: string): string {
  return name.replace(/ /g, '');
}

function setNestedProperty(obj: any, pathArray: string[], value: any) {
  let current = obj;
  for (let i = 0; i < pathArray.length - 1; i++) {
    const key = pathArray[i];
    if (!current[key]) current[key] = {};
    current = current[key];
  }
  current[pathArray[pathArray.length - 1]] = value;
}

// ==========================================
// 3. Main Converter Script
// ==========================================

function convertTokens(inputFile: string, outputDir: string) {
  console.log(`🚀 Starting conversion for: ${inputFile}`);
  
  // Read input file
  const rawData = fs.readFileSync(inputFile, 'utf-8');
  const rawJson = JSON.parse(rawData);

  // 3a. Normalize raw JSON into our strict types
  const figmaExport: ExtendedFigmaVarsExport = {
    schemaVersion: rawJson.schemaVersion || 1,
    collections: rawJson.collections.map((c: any) => ({
      id: c.id,
      name: c.name,
      // Map Figma's 'modeId' to our strict 'id'
      modes: c.modes.map((m: any) => ({
        id: m.modeId || m.id, 
        name: m.name
      })),
      isExtension: c.isExtension || false,
      defaultModeId: c.defaultModeId,
      variableOverrides: c.variableOverrides
    })),
    variables: rawJson.variables.map((v: any) => ({
      id: v.id,
      name: v.name,
      description: v.description,
      // Map Figma's 'variableCollectionId' to our strict 'collectionId'
      collectionId: v.variableCollectionId || v.collectionId, 
      // Handle cases where Figma exports as 'resolvedType' instead of 'type'
      type: v.resolvedType || v.type,
      scopes: v.scopes || [],
      valuesByMode: v.valuesByMode
    }))
  };

  // Lookup dictionaries
  const collectionById = new Map<string, ExtendedFigmaCollection>();
  const variableById = new Map<string, FigmaVariable>();
  const dtcgPathByVarId = new Map<string, string>(); // Maps variableId -> {collection.name.path}

  // 3b. Index Collections & Variables
  figmaExport.collections.forEach(c => collectionById.set(c.id, c));
  
  figmaExport.variables.forEach(v => {
    variableById.set(v.id, v);
    const collection = collectionById.get(v.collectionId);
    if (collection) {
      // Build the DTCG Reference Path string (e.g. "{palette.brand.primary}")
      const sanitizedName = sanitizeTokenName(v.name).replace(/\//g, '.');
      const pathString = `${collection.name}.${sanitizedName}`;
      dtcgPathByVarId.set(v.id, `{${pathString}}`);
    }
  });

  // 3c. The Value Resolver
  const resolveValue = (modeValue: any): string | number | boolean => {
    if (modeValue === undefined || modeValue === null) return "";
    // 1. Check for standard 'alias' OR alternative Figma 'VARIABLE_ALIAS' type
    if (modeValue.kind === 'alias' || modeValue.type === 'VARIABLE_ALIAS') {
      const targetId = modeValue.variableId || modeValue.id;
      if (targetId && dtcgPathByVarId.has(targetId)) {
        return dtcgPathByVarId.get(targetId)!;
      }
      return "{unknown.reference}";
    }
    
    // 2. Check for standard 'literal' wrapper
    if (modeValue.kind === 'literal') {
      const val = modeValue.value;
      if (typeof val === 'object' && val !== null && 'r' in val) {
        return rgbaToHex(val as { r: number; g: number; b: number; a: number });
      }
      return val as string | number | boolean;
    }
    // 3. FALLBACK: What if the export unwrapped the value in the overrides?
    if (typeof modeValue === 'object' && modeValue !== null && 'r' in modeValue) {
      return rgbaToHex(modeValue as { r: number; g: number; b: number; a: number });
    }
    if (typeof modeValue === 'string' || typeof modeValue === 'number' || typeof modeValue === 'boolean') {
      return modeValue;
    }
    return "";
  };

  // 3d. Process Data and Output Files
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  figmaExport.collections.forEach(collection => {
    collection.modes.forEach(mode => {
      // Determine File Name & Key structure
      let fileName = '';
      let parentName = collection.name; // Fallback to current collection name if not an extension

      if (collection.isExtension && collection.variableOverrides) {
        // Find the first overriden variable to locate the parent collection's ID
        const firstOverriddenId = Object.keys(collection.variableOverrides)[0];
        const baseVar = firstOverriddenId ? variableById.get(firstOverriddenId) : undefined;
        const parentCollection = baseVar ? collectionById.get(baseVar.collectionId) : undefined;
        
        if (parentCollection) {
          parentName = parentCollection.name;
        }
        fileName = `${parentName}-${collection.name}-${mode.name.toLowerCase()}.json`;
      } else {
        fileName = `${collection.name}-${mode.name.toLowerCase()}.json`;
      }

      // Create an empty root object mapped to the Parent's namespace (keeps pattern matching identical)
      const fileData: Record<string, any> = { [parentName]: {} };

      // Populate fileData with Standard Variables native to this collection
      figmaExport.variables
        .filter(v => v.collectionId === collection.id)
        .forEach(variable => {
          const modeValue = variable.valuesByMode[mode.id];
          if (modeValue !== undefined) {
            const tokenPath = sanitizeTokenName(variable.name).split('/');
            const token: DTCGToken = {
              $type: getDtcgType(variable.type),
              $value: resolveValue(modeValue)
            };
            if (variable.description) token.$description = variable.description;

            setNestedProperty(fileData[parentName], tokenPath, token);
          }
        });

      // Populate fileData with Extension Overrides (e.g., Companion theme) + Missing Base Variables
      if (collection.isExtension && collection.variableOverrides) {
        // 1. Discover all base collections this extension modifies
        const overriddenVarIds = Object.keys(collection.variableOverrides);
        const baseCollectionIds = new Set<string>();
        overriddenVarIds.forEach(id => {
          const v = variableById.get(id);
          if (v) baseCollectionIds.add(v.collectionId);
        });

        // 2. Loop through the base collections to grab ALL variables (overridden + non-overridden)
        baseCollectionIds.forEach(baseColId => {
          const baseCollection = collectionById.get(baseColId);
          if (!baseCollection) return;

          // Find the corresponding mode in the base collection by matching the mode name
          const baseMode = baseCollection.modes.find(m => m.name.toLowerCase() === mode.name.toLowerCase()) 
                           || baseCollection.modes[0];

          // 3. Process every variable in the base collection
          figmaExport.variables
            .filter(v => v.collectionId === baseColId)
            .forEach(baseVar => {
              // Overrides lookup
              const overridesForVar = collection.variableOverrides![baseVar.id];
              let overrideValue: any = undefined;
              if (overridesForVar !== undefined) {
                // Try extension's mode ID
                overrideValue = overridesForVar[mode.id];
                
                // If not found, try base collection's mode ID
                if (overrideValue === undefined) {
                  overrideValue = overridesForVar[baseMode.id];
                }
                // If STILL not found, check if the overrides object is just a flat value
                if (overrideValue === undefined && 
                   (overridesForVar.kind || overridesForVar.type === 'VARIABLE_ALIAS' || typeof overridesForVar !== 'object' || 'r' in overridesForVar)) {
                  overrideValue = overridesForVar;
                }
              }
              
              // Fallback to the base collection's value if no valid override exists
              const finalValue = overrideValue !== undefined ? overrideValue : baseVar.valuesByMode[baseMode.id];
              if (finalValue !== undefined) {
                 const tokenPath = sanitizeTokenName(baseVar.name).split('/');
                 const token: DTCGToken = {
                   $type: getDtcgType(baseVar.type),
                   $value: resolveValue(finalValue)
                 };
                 if (baseVar.description) token.$description = baseVar.description;

                 // Nest the token under the base/parent collection's name root (e.g. palette) instead of the extension
                 setNestedProperty(fileData[parentName], tokenPath, token);
              }
            });
        });
      }

      // Write File
      const filePath = path.join(outputDir, fileName);
      const nestedObj = Object.values(fileData)[0];
      if (Object.keys(nestedObj).length !== 0) {
        fs.writeFileSync(filePath, JSON.stringify(fileData, null, 2), 'utf-8');
        console.log(`✅ Generated: ${fileName}`);
      }
    });
  });

  console.log('🎉 Token conversion completed successfully!');
}

// ==========================================
// 4. Execute Script
// ==========================================
const INPUT_FILE = './tokens/raw-tokens.json';
const OUTPUT_DIR = './tokens/dtcg-tokens';

try {
  convertTokens(INPUT_FILE, OUTPUT_DIR);
} catch (error) {
  console.error("❌ Error running script:", error);
}
