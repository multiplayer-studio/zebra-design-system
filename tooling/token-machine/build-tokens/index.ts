import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import './style-dictionary-formats.ts';
import { TOKEN_DIR, TEMP_DIR, CSS_OUTPUT_DIR, FLUTTER_OUTPUT_DIR, JS_OUTPUT_DIR, COLOR_COLLECTIONS, SIZE_COLLECTIONS, TYPOGRAPHY_COLLECTIONS, COLOR_MODES, BREAKPOINT_MODES } from './constants.ts';
import { dashToPascal } from './dart-helpers.ts';
import { compileTokens, compileFlatModeTokens, getSourceFilesForCollection } from './compile-tokens.ts';
import { synthesizeCss } from './css-synthesizer.ts';
import { synthesizeJs } from './js-synthesizer.ts';
import { compilePrimitivesBuildingBlock, compileModeBuildingBlock, compileSemanticsBuildingBlock } from './flutter-building-blocks.ts';
import { compileZetaTarget } from './zeta-generate.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function writeFlutterPubspec() {
  const pubspec = `name: zebra_design_system_tokens
description: Generated Flutter/Dart design tokens for the Zebra Design System. Do not edit directly.
publish_to: 'none'
version: 1.0.0

environment:
  sdk: '>=3.0.0 <4.0.0'

dependencies:
  flutter:
    sdk: flutter
`;
  fs.mkdirSync(FLUTTER_OUTPUT_DIR, { recursive: true });
  fs.writeFileSync(path.join(FLUTTER_OUTPUT_DIR, 'pubspec.yaml'), pubspec, 'utf-8');
}

async function main() {
  console.log('🚀 Starting Design Token Build Process...');
  if (fs.existsSync(TEMP_DIR)) fs.rmSync(TEMP_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEMP_DIR, { recursive: true });
  fs.mkdirSync(CSS_OUTPUT_DIR, { recursive: true });
  fs.mkdirSync(JS_OUTPUT_DIR, { recursive: true });
  writeFlutterPubspec();

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
        const modeLabel = mode === 'light' ? 'Light' : 'Dark';
        const className = theme === 'default' ? `${modeLabel}Colors` : `${dashToPascal(theme)}${modeLabel}Colors`;
        const dartFileName = theme === 'default' ? `colors_${mode}.dart` : `${theme}_colors_${mode}.dart`;
        await compileTokens(sources, path.join(TEMP_DIR, `${theme}-${mode}.css`), {
          flutter: {
            destination: path.join(path.join(FLUTTER_OUTPUT_DIR, 'lib'), dartFileName),
            format: 'flutter/flat-colors',
            filter: 'encapsulationFilter',
            options: { className },
          },
        });
      } catch (error) {
        console.warn(`    - ⚠️  Compilation failed for color mode '${mode}' in theme '${theme}'.`);
      }
    }

    await compileFlatModeTokens(theme, {
      label: 'size', collections: SIZE_COLLECTIONS, namePrefix: 'Sizes', dartPrefix: 'sizes_',
      cssSuffix: '', format: 'flutter/flat-sizes',
    });

    await compileFlatModeTokens(theme, {
      label: 'typography', collections: TYPOGRAPHY_COLLECTIONS, namePrefix: 'Typography', dartPrefix: 'typographys_',
      cssSuffix: '-typography', format: 'flutter/flat-typography',
    });

    synthesizeCss(theme, 'color');
    synthesizeJs(theme, 'color');
    synthesizeCss(theme, 'size');
    synthesizeJs(theme, 'size');
    synthesizeCss(theme, 'typography');
    synthesizeJs(theme, 'typography');
  }

  console.log('\n\n🧱 Building mix-and-match building blocks...');
  for (const theme of themes) {
    console.log(`\nProcessing Building Blocks for Theme: [${theme}]`);
    await compilePrimitivesBuildingBlock(theme);
    await compileModeBuildingBlock('palette', COLOR_MODES, theme);
    await compileModeBuildingBlock('size', BREAKPOINT_MODES, theme);
    await compileModeBuildingBlock('typography', BREAKPOINT_MODES, theme);
  }
  await compileSemanticsBuildingBlock();

  console.log('\n\n🎯 Building zeta_flutter target...');
  await compileZetaTarget();

  fs.rmSync(TEMP_DIR, { recursive: true, force: true });
  console.log('\n\n✅ Build complete. Temporary files cleaned up.');
  console.log(`🎉 Final CSS files are available in: ${CSS_OUTPUT_DIR}`);
}

main().catch(error => {
  console.error('\n❌ A critical error occurred during the build process:');
  console.error(error);
  process.exit(1);
});
