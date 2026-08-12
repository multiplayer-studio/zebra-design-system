
import * as fs from 'fs';
import * as path from 'path';
import { mkdir } from 'fs/promises';
import './types.ts';

const SCHEMA_VERSION = 1;

function isoDate(): string {
  const d = new Date();
  const pad2 = (n: number) => (n < 10 ? `0${n}` : String(n));
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

function resolveCollectionByID(id: string, collections: object): string {
    const c = Object.values(collections).find(c => c.id === id);
  return c.name; 
}

async function main() {
  const FIGMA_TOKEN = process.env.FIGMA_PERSONAL_ACCESS_TOKEN;
  const FIGMA_FILE_KEY = process.env.FIGMA_FILE_KEY;

  if (!FIGMA_TOKEN) {
    console.error('❌ Error: FIGMA_TOKEN environment variable not set.');
    process.exit(1);
  }

  if (!FIGMA_FILE_KEY) {
    console.error('❌ Error: FIGMA_FILE_KEY environment variable not set.');
    process.exit(1);
  }
  
  console.log(`🔍 Fetching variables for Figma file: ${FIGMA_FILE_KEY}...`);

  try {
    const apiEndpoint = `https://api.figma.com/v1/files/${FIGMA_FILE_KEY}/variables/local`;
    
    // Using the native global fetch API (Node 18+)
    const response = await fetch(apiEndpoint, {
      headers: {
        'X-Figma-Token': FIGMA_TOKEN,
      },
    });

    if (!response.ok) {
        const errorData: any = await response.json();
        throw new Error(`Figma API request failed with status ${response.status}: ${errorData.err || errorData.message}`);
    }

    const data: any = await response.json();
    const meta = data.meta;

    if (!meta || !meta.variables || Object.keys(meta.variables).length === 0) {
      console.log("⚠️ No variables found in the specified Figma file.");
      return;
    }

    const collections: FigmaCollection[] = Object.values(meta.variableCollections)
    .map((c: any) => ({
      id: c.id,
      name: c.name,
      modes: c.modes,
      isExtension: c.isExtension,
      variableOverrides: c.variableOverrides,
      parentVariableCollectionId: c.parentVariableCollectionId,
      defaultModeId: c.defaultModeId,
    }));

    const variables: FigmaVariable[] = Object.values(meta.variables)
      .filter(c => !c.hiddenFromPublishing)
      .filter(c => !c.deletedButReferenced)
      .map((v: any) => {
        const {
          id,
          name,
          description,
          variableCollectionId,
          resolvedType,
          scopes,
          valuesByMode,
          ...rest
        } = v;

        return {
          ...rest,
          id,
          name,
          description,
          collectionId: variableCollectionId,
          type: resolvedType,
          scopes,
          valuesByMode: Object.entries(valuesByMode || {}).reduce((acc, [modeId, value]) => {
            // Map Figma API's resolved output to match your plugin's local serialized types
            if (value && typeof value === 'object' && 'type' in value && value.type === 'VARIABLE_ALIAS') {
              acc[modeId] = { kind: 'alias', variableId: value.id };
            } else if (value && typeof value === 'object' && 'r' in value) {
              const rgba = 'a' in value ? value : { ...value, a: 1 };
              acc[modeId] = { kind: 'literal', value: rgba as any };
            } else {
              acc[modeId] = { kind: 'literal', value: value as any };
            }
            return acc;
          }, {} as Record<string, FigmaModeValue>),
        };
      });

    
    const payload: FigmaVarsExport = {
      schemaVersion: SCHEMA_VERSION,
      collections,
      variables,
    };

    await mkdir('./tokens', { recursive: true });

    const filename = `tokens/raw-tokens.json`;
    const outputPath = path.join(process.cwd(), filename);
    fs.writeFileSync(outputPath, JSON.stringify(payload, null, 2));

    console.log(`✨ Exported ${variables.length} variables from ${collections.length} collections.`);
    console.log(`💾 Output saved to: ${outputPath}`);

  } catch (err) {
    console.error("❌ An error occurred during the export process:", err);
    process.exit(1);
  }
}

main();
