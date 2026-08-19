import * as fs from 'fs';
import * as path from 'path';
import { TEMP_DIR, CSS_OUTPUT_DIR, BREAKPOINT_MODES } from './constants.ts';
import { getBreakpointsForTheme } from './breakpoints.ts';

export function extractCssVariables(filePath: string): string {
  if (!fs.existsSync(filePath)) return '';
  const content = fs.readFileSync(filePath, 'utf-8');
  const match = content.match(/:root\s*\{([\s\S]*?)\}/);
  if (!match) return '';
  return match[1].trim().replace(/-selfvalue\b/g, '');
}

export type SynthesizeType = 'color' | 'size' | 'typography';

export function synthesizeCss(theme: string, type: SynthesizeType, tempDir?: string, outputDir?: string) {
  const TEMP = tempDir || TEMP_DIR;
  const OUT = outputDir || CSS_OUTPUT_DIR;
  const typeIcons: Record<SynthesizeType, string> = { color: '🎨', size: '📏', typography: '✍️ ' };
  console.log(`\n${typeIcons[type]} Synthesizing ${type} CSS for theme: ${theme}`);
  const themeClass = theme === 'default' ? '' : `.${theme.toLowerCase()}-theme`;
  let finalCss = `/**\n * ${theme.charAt(0).toUpperCase() + theme.slice(1)} Theme - ${type.charAt(0).toUpperCase() + type.slice(1)} Variables\n * This file is auto-generated. Do not edit directly.\n */\n\n`;
  let hasContent = false;

  if (type === 'color') {
    const lightSelector = `:root${themeClass ? `, ${themeClass}` : ''}`;
    const darkSelectorDefault = `@media (prefers-color-scheme: dark) { ${lightSelector}`;
    const darkSelectorOverride = `${themeClass || ':root'}.dark-mode, .dark-mode ${themeClass || ':root'}`;
    let lightVars = extractCssVariables(path.join(TEMP, `${theme}-light.css`));
    let darkVars = extractCssVariables(path.join(TEMP, `${theme}-dark.css`));

    if (lightVars || darkVars) {
      if (lightVars) finalCss += `${lightSelector} {\n  ${lightVars}\n}\n\n`;
      if (darkVars) {
        finalCss += `${darkSelectorDefault} {\n    ${darkVars}\n  }\n}\n\n`;
        finalCss += `${darkSelectorOverride} {\n  ${darkVars}\n}\n`;
      }
      hasContent = true;
    }
  } else {
    const rootSelector = `:root${themeClass ? `, ${themeClass}` : ''}`;
    const fileSuffix = type === 'typography' ? '-typography' : '';
    const stripPattern = type === 'typography' ? /^(\s*)--typography-/gm : undefined;
    const breakpoints = getBreakpointsForTheme(theme);

    BREAKPOINT_MODES.forEach(mode => {
      let vars = extractCssVariables(path.join(TEMP, `${theme}-${mode}${fileSuffix}.css`));
      if (vars) {
        hasContent = true;
        if (stripPattern) vars = vars.replace(stripPattern, '$1--');
        const breakpoint = breakpoints[mode];
        if (!breakpoint) {
          finalCss += `${rootSelector} {\n  ${vars}\n}\n\n`;
        } else {
          finalCss += `@media (min-width: ${breakpoint}) {\n  ${rootSelector} {\n    ${vars}\n  }\n}\n\n`;
        }
      }
    });
  }

  if (!hasContent) {
    console.log(`   - Skipping, no ${type} variables found.`);
    return;
  }

  const fileMap: Record<SynthesizeType, (theme: string) => string> = {
    color: t => t === 'default' ? 'colors.css' : `${t.toLowerCase()}-colors.css`,
    size: t => t === 'default' ? 'sizes.css' : `${t.toLowerCase()}-sizes.css`,
    typography: t => t === 'default' ? 'typography.css' : `${t.toLowerCase()}-typography.css`,
  };
  const outputFileName = fileMap[type](theme);
  fs.writeFileSync(path.join(OUT, outputFileName), finalCss.trim(), 'utf-8');
  console.log(`   ✅ Wrote final file: ${outputFileName}`);
}
