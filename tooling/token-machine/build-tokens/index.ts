import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import './style-dictionary-formats.ts';
import { TOKEN_DIR, TEMP_DIR, CSS_OUTPUT_DIR, JS_OUTPUT_DIR, COLOR_COLLECTIONS, SIZE_COLLECTIONS, TYPOGRAPHY_COLLECTIONS, COLOR_MODES, BREAKPOINT_MODES } from './constants.ts';
import { compileTokens, compileFlatModeTokens } from './compile-tokens.ts';
import { synthesizeCss } from './css-synthesizer.ts';
import { synthesizeJs } from './js-synthesizer.ts';
import { synthesizeBuildingBlockCss } from './building-block-css-synthesizer.ts';
import { synthesizeBuildingBlockJs } from './building-block-js-synthesizer.ts';
import { getSourceFilesForCollection } from './utils.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function main() {
  console.log('🚀 Starting Design Token Build Process...');
  if (fs.existsSync(TEMP_DIR)) fs.rmSync(TEMP_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEMP_DIR, { recursive: true });
  fs.mkdirSync(CSS_OUTPUT_DIR, { recursive: true });
  fs.mkdirSync(JS_OUTPUT_DIR, { recursive: true });

  const themes = new Set<string>(['default']);
  const tokenFiles = fs.readdirSync(TOKEN_DIR).filter(file => file.endsWith('.json'));
  tokenFiles.forEach(file => {
    const basename = path.basename(file, '.json');
    const parts = basename.split('-');
    if (parts.length === 3 && !['base', 'value', ...COLOR_MODES, ...BREAKPOINT_MODES].includes(parts[1])) {
      themes.add(parts[1]);
    }
  });
  console.log(`🔍 Discovered Themes: ${Array.from(themes).join(', ')}`);

  for (const theme of themes) {
    console.log(`\n\nProcessing Theme: [${theme}]`);

    console.log('  - Compiling color modes...');
    for (const mode of COLOR_MODES) {
      try {
        const sources = COLOR_COLLECTIONS.flatMap(collection =>
          getSourceFilesForCollection(collection, theme, collection === 'primitives' ? 'value' : collection === 'semantics' ? 'base' : mode)
        );
        await compileTokens(sources, path.join(TEMP_DIR, `${theme}-${mode}.css`), {
          filter: 'encapsulationFilter',
        });
      } catch (error) {
        console.warn(`    - ⚠️  Compilation failed for color mode '${mode}' in theme '${theme}'.`);
      }
    }

    await compileFlatModeTokens(theme, {
      label: 'size', collections: SIZE_COLLECTIONS, cssSuffix: '',
    });

    await compileFlatModeTokens(theme, {
      label: 'typography', collections: TYPOGRAPHY_COLLECTIONS, cssSuffix: '-typography',
    });

    synthesizeCss(theme, 'color');
    synthesizeJs(theme, 'color');
    synthesizeCss(theme, 'size');
    synthesizeJs(theme, 'size');
    synthesizeCss(theme, 'typography');
    synthesizeJs(theme, 'typography');

    // Building block layers
    console.log(`\n  🧱 Building mix-and-match building blocks...`);

    // Primitives building block
    if (theme === 'default' || fs.existsSync(path.join(TOKEN_DIR, `primitives-${theme}-value.json`))) {
      try {
        const sources = getSourceFilesForCollection('primitives', theme, 'value');
        await compileTokens(sources, path.join(TEMP_DIR, `${theme}-bb-primitives.css`), {
          filter: 'primitivesOnlyFilter',
          outputReferences: true,
        });
        synthesizeBuildingBlockCss(theme, 'primitives');
        synthesizeBuildingBlockJs(theme, 'primitives');
      } catch (error) {
        console.warn(`    - ⚠️  Failed to compile primitives building block for theme '${theme}'.`);
      }
    }

    // Palette building block (light & dark)
    if (theme === 'default' || COLOR_MODES.some(mode => fs.existsSync(path.join(TOKEN_DIR, `palette-${theme}-${mode}.json`)))) {
      for (const mode of COLOR_MODES) {
        try {
          const sources = getSourceFilesForCollection('palette', theme, mode)
            .concat(getSourceFilesForCollection('primitives', theme, 'value'));
          await compileTokens(sources, path.join(TEMP_DIR, `${theme}-${mode}-bb-palette.css`), {
            filter: 'paletteOnlyFilter',
            outputReferences: true,
          });
        } catch (error) {
          console.warn(`    - ⚠️  Failed to compile palette ${mode} building block for theme '${theme}'.`);
        }
      }
      synthesizeBuildingBlockCss(theme, 'palette');
      synthesizeBuildingBlockJs(theme, 'palette');
    }

    // Size building block (per breakpoint mode)
    if (theme === 'default' || BREAKPOINT_MODES.some(mode => fs.existsSync(path.join(TOKEN_DIR, `size-${theme}-${mode}.json`)))) {
      for (const mode of BREAKPOINT_MODES) {
        try {
          const sources = getSourceFilesForCollection('size', theme, mode)
            .concat(getSourceFilesForCollection('primitives', theme, 'value'));
          await compileTokens(sources, path.join(TEMP_DIR, `${theme}-${mode}-bb-size.css`), {
            filter: 'sizeOnlyFilter',
            outputReferences: true,
          });
        } catch (error) {
          console.warn(`    - ⚠️  Failed to compile size ${mode} building block for theme '${theme}'.`);
        }
      }
      synthesizeBuildingBlockCss(theme, 'size');
      synthesizeBuildingBlockJs(theme, 'size');
    }

    // Typography building block (per breakpoint mode)
    if (theme === 'default' || BREAKPOINT_MODES.some(mode => fs.existsSync(path.join(TOKEN_DIR, `typography-${theme}-${mode}.json`)))) {
      for (const mode of BREAKPOINT_MODES) {
        try {
          const sources = getSourceFilesForCollection('typography', theme, mode)
            .concat(getSourceFilesForCollection('primitives', theme, 'value'));
          await compileTokens(sources, path.join(TEMP_DIR, `${theme}-${mode}-bb-typography.css`), {
            filter: 'typographyOnlyFilter',
            outputReferences: true,
          });
        } catch (error) {
          console.warn(`    - ⚠️  Failed to compile typography ${mode} building block for theme '${theme}'.`);
        }
      }
      synthesizeBuildingBlockCss(theme, 'typography');
      synthesizeBuildingBlockJs(theme, 'typography');
    }
  }

  // Semantics building block (default theme only)
  try {
    const sources = getSourceFilesForCollection('semantics', 'default', 'base')
      .concat(getSourceFilesForCollection('palette', 'default', 'light'))
      .concat(getSourceFilesForCollection('palette', 'default', 'dark'))
      .concat(getSourceFilesForCollection('primitives', 'default', 'value'));
    await compileTokens(sources, path.join(TEMP_DIR, `default-bb-semantics.css`), {
      filter: 'semanticsOnlyFilter',
      outputReferences: true,
    });
    synthesizeBuildingBlockCss('default', 'semantics');
    synthesizeBuildingBlockJs('default', 'semantics');
  } catch (error) {
    console.warn(`⚠️  Failed to compile semantics building block.`);
  }

  fs.rmSync(TEMP_DIR, { recursive: true, force: true });
  console.log('\n\n✅ Build complete. Temporary files cleaned up.');
  console.log(`🎉 Final CSS & Building-block files are available in: ${CSS_OUTPUT_DIR}`);
}

main().catch(error => {
  console.error('\n❌ A critical error occurred during the build process:');
  console.error(error);
  process.exit(1);
});
