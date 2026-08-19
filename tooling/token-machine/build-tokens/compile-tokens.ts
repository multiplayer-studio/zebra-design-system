import StyleDictionary from 'style-dictionary';
import * as fs from 'fs';
import * as path from 'path';
import { TOKEN_DIR, TEMP_DIR, FLUTTER_LIB_DIR, BREAKPOINT_MODES } from './constants.ts';
import { dashToPascal } from './dart-helpers.ts';

export function getSourceFilesForCollection(collection: string, theme: string, mode: string): string[] {
  const files: string[] = [];

  const defaultPath = path.join(TOKEN_DIR, `${collection}-${mode}.json`);
  if (fs.existsSync(defaultPath)) {
    files.push(defaultPath);
  }

  if (theme !== 'default') {
    const themedPath = path.join(TOKEN_DIR, `${collection}-${theme}-${mode}.json`);
    if (fs.existsSync(themedPath)) {
      console.log(`     - Found themed override: ${path.basename(themedPath)}`);
      files.push(themedPath);
    }
  }
  return files;
}

export type FlutterFileTarget = {
  destination: string;
  format: string;
  filter?: string;
  options?: Record<string, any>;
};

export async function compileTokens(
  sources: string[],
  destination: string,
  opts?: { filter?: string; outputReferences?: boolean; flutter?: FlutterFileTarget | FlutterFileTarget[]; javascriptCtorParam?: string }
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

    const platforms: any = {
      css: {
        transformGroup: 'css',
        buildPath: '',
        files: [fileConfig],
      },
      javascript: {
        transformGroup: 'css',
        buildPath: '',
        files: [{
          destination: destination.replace(/\.css$/, '.jsobj'),
          format: 'javascript/object-entries',
          filter: fileConfig.filter,
          options: { ctorParamName: opts?.javascriptCtorParam },
        }],
      },
    };

    if (opts?.flutter) {
      const targets = Array.isArray(opts.flutter) ? opts.flutter : [opts.flutter];
      platforms.flutter = {
        buildPath: '',
        files: targets.map(t => ({
          destination: t.destination,
          format: t.format,
          filter: t.filter,
          options: t.options,
        })),
      };
    }

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
  label: string; collections: string[]; namePrefix: string; dartPrefix: string; cssSuffix: string; format: string;
}) {
  console.log(`  - Compiling ${opts.label} modes...`);
  for (const mode of BREAKPOINT_MODES) {
    try {
      const sources = opts.collections.flatMap(collection =>
        getSourceFilesForCollection(collection, theme, collection === 'primitives' ? 'value' : mode)
      );
      const safeModeStr = mode.replace(/\s+/g, '_');
      const modePascal = dashToPascal(safeModeStr);
      const className = theme === 'default' ? `${opts.namePrefix}${modePascal}` : `${dashToPascal(theme)}${opts.namePrefix}${modePascal}`;
      const dartFileName = theme === 'default' ? `${opts.dartPrefix}${safeModeStr}.dart` : `${theme}_${opts.dartPrefix}${safeModeStr}.dart`;
      await compileTokens(sources, path.join(TEMP_DIR, `${theme}-${mode}${opts.cssSuffix}.css`), {
        flutter: {
          destination: path.join(FLUTTER_LIB_DIR, dartFileName),
          format: opts.format,
          filter: 'encapsulationFilter',
          options: { className, mode },
        },
      });
    } catch (error) {
      console.warn(`    - ⚠️  Compilation failed for ${opts.label} mode '${mode}' in theme '${theme}'.`);
    }
  }
}
