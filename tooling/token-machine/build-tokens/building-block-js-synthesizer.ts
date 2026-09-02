import * as fs from 'fs';
import * as path from 'path';
import { TEMP_DIR, JS_OUTPUT_DIR, BREAKPOINT_MODES } from './constants.ts';
import { dashToCamel, readJsObjectFragment } from './utils.ts';

export type BuildingBlockType = 'primitives' | 'palette' | 'size' | 'typography' | 'semantics';

export function synthesizeBuildingBlockJs(theme: string, type: BuildingBlockType, tempDir?: string, outputDir?: string) {
  const TEMP = tempDir || TEMP_DIR;
  const OUT = outputDir || JS_OUTPUT_DIR;
  console.log(`\n🧱 Synthesizing ${type} building block JS for theme: ${theme}`);

  const header = `// ${theme.charAt(0).toUpperCase() + theme.slice(1)} ${type.charAt(0).toUpperCase() + type.slice(1)} - Building Block Tokens\n// Auto-generated. Do not edit directly.\n\n`;
  let finalJs = '';
  let hasContent = false;

  if (type === 'primitives') {
    const fragment = readJsObjectFragment(path.join(TEMP, `${theme}-bb-primitives.jsobj`));
    if (fragment) {
      finalJs = `${header}export default ${fragment};\n`;
      hasContent = true;
    }
  } else if (type === 'palette') {
    const lightFragment = readJsObjectFragment(path.join(TEMP, `${theme}-light-bb-palette.jsobj`));
    const darkFragment = readJsObjectFragment(path.join(TEMP, `${theme}-dark-bb-palette.jsobj`));
    if (lightFragment || darkFragment) {
      const entries: string[] = [];
      if (lightFragment) entries.push(`  light: (primitives) => ${lightFragment}`);
      if (darkFragment) entries.push(`  dark: (primitives) => ${darkFragment}`);
      finalJs = `${header}export default {\n${entries.join(',\n')},\n};\n`;
      hasContent = true;
    }
  } else if (type === 'semantics') {
    const fragment = readJsObjectFragment(path.join(TEMP, `default-bb-semantics.jsobj`));
    if (fragment) {
      finalJs = `// Semantics - Building Block Tokens\n// References palette. Import exactly one primitives + one palette alongside this.\n// Auto-generated. Do not edit directly.\n\nexport default (palette) => ${fragment};\n`;
      hasContent = true;
    }
  } else {
    const modeFragments: Record<string, string> = {};
    BREAKPOINT_MODES.forEach(mode => {
      const fragment = readJsObjectFragment(path.join(TEMP, `${theme}-${mode}-bb-${type}.jsobj`));
      if (fragment) {
        const key = dashToCamel(mode);
        modeFragments[key] = fragment;
        hasContent = true;
      }
    });

    if (hasContent) {
      const entries = Object.entries(modeFragments).map(([key, frag]) => `  ${key}: (primitives) => ${frag}`);
      finalJs = `${header}export default {\n${entries.join(',\n')},\n};\n`;
    }
  }

  if (!hasContent) {
    console.log(`   - Skipping, no ${type} tokens found.`);
    return;
  }

  if (type !== 'semantics') {
    const outputPath = path.join(OUT, type);
    fs.mkdirSync(outputPath, { recursive: true });
    const outputFileName = theme === 'default' ? 'default.js' : `${theme.toLowerCase()}.js`;
    fs.writeFileSync(path.join(outputPath, outputFileName), finalJs.trim(), 'utf-8');
    console.log(`   ✅ Wrote final file: ${type}/${outputFileName}`);
  } else {
    fs.writeFileSync(path.join(OUT, 'semantics.js'), finalJs.trim(), 'utf-8');
    console.log(`   ✅ Wrote final file: semantics.js`);
  }
}
