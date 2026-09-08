import * as fs from 'fs';
import * as path from 'path';
import { TEMP_DIR, JS_OUTPUT_DIR, BREAKPOINT_MODES } from './constants.js';
import { dashToCamel, readJsObjectFragment } from './utils.js';

export type SynthesizeType = 'color' | 'size' | 'typography';

export function synthesizeJs(theme: string, type: SynthesizeType, tempDir?: string, outputDir?: string) {
  const TEMP = tempDir || TEMP_DIR;
  const OUT = outputDir || JS_OUTPUT_DIR;
  const typeIcons: Record<SynthesizeType, string> = { color: '🎨', size: '📏', typography: '✍️ ' };
  console.log(`\n${typeIcons[type]} Synthesizing ${type} JS for theme: ${theme}`);

  const header = `// ${theme.charAt(0).toUpperCase() + theme.slice(1)} Theme - ${type.charAt(0).toUpperCase() + type.slice(1)} Tokens\n// Auto-generated. Do not edit directly.\n\n`;
  let finalJs = '';
  let hasContent = false;

  if (type === 'color') {
    const lightFragment = readJsObjectFragment(path.join(TEMP, `${theme}-light.jsobj`));
    const darkFragment = readJsObjectFragment(path.join(TEMP, `${theme}-dark.jsobj`));

    if (lightFragment || darkFragment) {
      const entries: string[] = [];
      if (lightFragment) entries.push(`  light: ${lightFragment}`);
      if (darkFragment) entries.push(`  dark: ${darkFragment}`);
      finalJs = `${header}export default {\n${entries.join(',\n')},\n};\n`;
      hasContent = true;
    }
  } else {
    const modeFragments: Record<string, string> = {};
    BREAKPOINT_MODES.forEach(mode => {
      const fragment = readJsObjectFragment(path.join(TEMP, `${theme}-${mode}.jsobj`));
      if (fragment) {
        const key = dashToCamel(mode);
        modeFragments[key] = fragment;
        hasContent = true;
      }
    });

    if (hasContent) {
      const entries = Object.entries(modeFragments).map(([key, frag]) => `  ${key}: ${frag}`);
      finalJs = `${header}export default {\n${entries.join(',\n')},\n};\n`;
    }
  }

  if (!hasContent) {
    console.log(`   - Skipping, no ${type} tokens found.`);
    return;
  }

  const fileMap: Record<SynthesizeType, (theme: string) => string> = {
    color: t => t === 'default' ? 'colors.js' : `${t.toLowerCase()}-colors.js`,
    size: t => t === 'default' ? 'sizes.js' : `${t.toLowerCase()}-sizes.js`,
    typography: t => t === 'default' ? 'typography.js' : `${t.toLowerCase()}-typography.js`,
  };
  const outputFileName = fileMap[type](theme);
  fs.writeFileSync(path.join(OUT, outputFileName), finalJs.trim(), 'utf-8');
  console.log(`   ✅ Wrote final file: ${outputFileName}`);
}
