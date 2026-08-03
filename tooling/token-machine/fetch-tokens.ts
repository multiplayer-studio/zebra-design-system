/**
 * Figma Variable Tokens Extractor (Plugin-parity version)
 * 
 * Extracts tokens into a deeply nested structure: 
 * Mode > Group > Variable.
 * 
 * HOW TO RUN:
 * 
 * Mac/Linux:
 * FIGMA_ACCESS_TOKEN=your_token_here FIGMA_FILE_KEY=your_file_key_here npx tsx fetch-tokens.ts
 */

import fs from 'fs';
import path from 'path';

// --- CONFIGURATION ---
const FIGMA_TOKEN = process.env.FIGMA_ACCESS_TOKEN;
const FIGMA_FILE_KEY = process.env.FIGMA_FILE_KEY;

// --- TYPE DEFINITIONS ---
interface FigmaVariable {
  id: string;
  name: string;
  resolvedType: 'COLOR' | 'FLOAT' | 'STRING' | 'BOOLEAN';
  valuesByMode: { [modeId: string]: any };
  variableCollectionId: string;
  hiddenFromPublishing?: boolean;
  deleted?: boolean;
}

interface FigmaMode {
  modeId: string;
  name: string;
}

interface FigmaVariableCollection {
  name: string;
  modes: FigmaMode[];
  hiddenFromPublishing?: boolean;
}

interface FigmaApiResponse {
  meta: {
    variables: { [id: string]: FigmaVariable };
    variableCollections: { [id: string]: FigmaVariableCollection };
  };
}

// --- HELPERS ---

/**
 * Converts strings to camelCase and ensures the first letter is lowercase
 * (Matches the logic from the Figma plugin)
 */
function toCamelCase(str: string): string {
  if (!str) return '';
  return str
    .replace(/[- ]([a-zA-Z])/g, (_, c) => c.toUpperCase())
    .replace(/^[A-Z]/, c => c.toLowerCase())
    .replace(/[^a-zA-Z0-9]/g, ''); // strip remaining invalid characters
}

/**
 * Sanitizes collection names for web-safe file names
 */
function sanitizeFilename(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

async function fetchFigmaTokens(): Promise<void> {
  try {
    if (!FIGMA_TOKEN || !FIGMA_FILE_KEY) {
      throw new Error('Missing environment variables. Check script header comments.');
    }

    console.log(`🔍 Fetching variables from Figma file: ${FIGMA_FILE_KEY}...`);

    const response = await fetch(`https://api.figma.com/v1/files/${FIGMA_FILE_KEY}/variables/local`, {
      method: 'GET',
      headers: { 'X-Figma-Token': FIGMA_TOKEN },
    });

    if (!response.ok) {
      throw new Error(`API call failed: ${response.status} ${response.statusText}`);
    }

    const data: FigmaApiResponse = await response.json();
    const { variables, variableCollections } = data.meta;

    if (!variables || Object.keys(variables).length === 0) {
      throw new Error('No local variables found.');
    }

    // Grouping structure: { CollectionName: { ModeName: { GroupName: { VarName: Value } } } }
    const nestedJsonOutput: Record<string, any> = {};

    Object.values(variables).forEach((variable) => {
      const collection = variableCollections[variable.variableCollectionId];

      // Skip invalid, hidden, or deleted variables
      if (!collection 
        || variable.deleted 
        || variable.hiddenFromPublishing 
      //  || collection.hiddenFromPublishing 
        || variable.name.startsWith('_') 
        || variable.name.startsWith('.')) 
      {
        return; 
      }

      const collectionName = sanitizeFilename(collection.name);

      // Parse Group and Variable names (split by "/" or space)
      let pathParts: string[];
      if (variable.name.includes("/")) {
        pathParts = variable.name.split("/");
      } else {
        const parts = variable.name.split(" ");
        if (parts.length >= 2) {
          pathParts = [parts[0], parts.slice(1).join(" ")];
        } else {
          pathParts = [variable.name];
        }
      }

      // Default to "ungrouped" if no group is found
      const groupName = pathParts.length > 1 ? toCamelCase(pathParts[0]) : 'ungrouped';
      const variableName = pathParts.length > 1 ? toCamelCase(pathParts.slice(1).join(" ")) : toCamelCase(variable.name);

      if (!nestedJsonOutput[collectionName]) nestedJsonOutput[collectionName] = {};

      // Process values for ALL modes
      for (const [modeId, rawValue] of Object.entries(variable.valuesByMode)) {
        
        // Resolve mode name
        const mode = collection.modes.find(m => m.modeId === modeId);
        const modeName = mode ? toCamelCase(mode.name) : toCamelCase(modeId);

        if (!nestedJsonOutput[collectionName][modeName]) nestedJsonOutput[collectionName][modeName] = {};
        if (!nestedJsonOutput[collectionName][modeName][groupName]) nestedJsonOutput[collectionName][modeName][groupName] = {};

        let parsedValue: any = rawValue;

        // 1. Resolve Aliases
        if (rawValue && typeof rawValue === 'object' && rawValue.type === 'VARIABLE_ALIAS') {
          const refVar = variables[rawValue.id];
          if (refVar) {
            const refPathParts = refVar.name.includes("/") 
              ? refVar.name.split("/") 
              : [refVar.name.split(" ")[0], refVar.name.split(" ").slice(1).join(" ")];
            
            const refGroup = toCamelCase(refPathParts[0]);
            const refVariable = refPathParts.length > 1 ? toCamelCase(refPathParts.slice(1).join(" ")) : '';
            
            parsedValue = refVariable ? `${refGroup}/${refVariable}` : refGroup;
          } else {
            parsedValue = rawValue.id;
          }
        } 
        // 2. Format Colors to Hex
        else if (variable.resolvedType === 'COLOR') {
          const { r, g, b, a } = rawValue;
          const hexRGB = [r, g, b].map(c => Math.round(c * 255).toString(16).padStart(2, '0')).join('');
          const hexA = a < 1 ? Math.round(a * 255).toString(16).padStart(2, '0') : '';
          parsedValue = `#${hexRGB}${hexA}`;
        }

        // Assign to our deeply nested dictionary
        nestedJsonOutput[collectionName][modeName][groupName][variableName] = parsedValue;
      }
    });

    // Write output
    const outputDir = path.resolve(process.cwd(), 'json');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    console.log(`💾 Writing structured files to disk... (Target folder: ./json/)`);
    let filesWritten = 0;

    for (const [collectionFileName, collectionData] of Object.entries(nestedJsonOutput)) {
      if (Object.keys(collectionData).length === 0) continue;

      const safeFileName = `${collectionFileName}.json`;
      const outputPath = path.resolve(outputDir, safeFileName);
      
      fs.writeFileSync(outputPath, JSON.stringify(collectionData, null, 2));
      console.log(`  ↳ Saved ${safeFileName}`);
      filesWritten++;
    }

    console.log(`\n✨ Success! Extracted nested variables into ${filesWritten} files.`);

  } catch (error) {
    if (error instanceof Error) {
      console.error('\n❌ Error:', error.message);
    } else {
      console.error('\n❌ An unknown error occurred.');
    }
    process.exit(1);
  }
}

fetchFigmaTokens();
