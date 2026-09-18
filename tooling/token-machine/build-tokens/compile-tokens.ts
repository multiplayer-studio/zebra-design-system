import StyleDictionary from 'style-dictionary';
import * as path from 'path';
import { TEMP_DIR, RESOLVED_FRAGMENTS_DIR, BREAKPOINT_MODES } from './constants.js';
import { getSourceFilesForCollection } from './utils.js';

export async function compileTokens(
  sources: string[],
  destination: string,
  opts?: { filter?: string; outputReferences?: boolean; javascriptCtorParam?: string }
) {
  try {
    const fileConfig: any = {
      destination: destination,
      format: opts?.outputReferences ? 'css/variables' : 'css/variables-root',
    };
    if (opts?.outputReferences) {
      fileConfig.filter = opts.filter;
      fileConfig.options = { outputReferences: true };
    } else {
      fileConfig.filter = 'encapsulationFilter';
    }

    // Derive json destination: replace destination path with RESOLVED_FRAGMENTS_DIR and change extension to .json
    const jsonFilename = path.basename(destination).replace(/\.css$/, '.json');
    const jsonDestination = path.join(RESOLVED_FRAGMENTS_DIR, jsonFilename);

    const platforms: any = {
      css: {
        transformGroup: 'css',
        buildPath: '',
        files: [fileConfig],
      },
      json: {
        transformGroup: 'css',
        buildPath: '',
        files: [{
          destination: jsonDestination,
          format: 'json/flat-entries',
          filter: fileConfig.filter,
        }],
      },
    };

    const config = {
      source: sources,
      platforms,
    };

    const sd = new StyleDictionary(config);
    await sd.buildAllPlatforms();
  } catch (error) {
    console.error(`\n❌ Error compiling tokens for destination: "${destination}"`);
    console.error(error);
    throw error;
  }
}

export async function compileFlatModeTokens(theme: string, opts: {
  label: string; collections: string[]; cssSuffix: string;
}) {
  console.log(`  - Compiling ${opts.label} modes...`);
  for (const mode of BREAKPOINT_MODES) {
    try {
      const sources = opts.collections.flatMap(collection =>
        getSourceFilesForCollection(collection, theme, collection === 'primitives' ? 'value' : mode)
      );
      await compileTokens(sources, path.join(TEMP_DIR, `${theme}-${mode}${opts.cssSuffix}.css`), {
        filter: 'encapsulationFilter',
      });
    } catch (error) {
      console.warn(`    - ⚠️  Compilation failed for ${opts.label} mode '${mode}' in theme '${theme}'.`);
    }
  }
}
