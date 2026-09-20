import * as fs from 'fs';
import * as path from 'path';
import { TEMP_DIR, CSS_OUTPUT_DIR, BREAKPOINT_MODES } from './constants.js';
import { getBreakpointsForTheme } from './breakpoints.js';

export function extractCssVariables(filePath: string): string {
  if (!fs.existsSync(filePath)) return '';
  const content = fs.readFileSync(filePath, 'utf-8');
  const match = content.match(/:root\s*\{([\s\S]*?)\}/);
  if (!match) return '';
  return match[1].trim().replace(/-selfvalue\b/g, '');
}

export type SynthesizeType = 'color' | 'size' | 'typography';

// Groups e.g. --display-large-font-weight/-font-size/-line-height/-font-family into one
// shorthand var. Only references sibling vars, so it's breakpoint-agnostic - emit once,
// outside any @media block, and it tracks whichever breakpoint is currently active.
export function buildTypographyShorthand(varsBlock: string): string {
  const names = new Set<string>();
  const regex = /--([\w-]+)-font-weight\s*:/g;
  let match;
  while ((match = regex.exec(varsBlock))) names.add(match[1]);
  return Array.from(names).sort().map(name =>
    `--${name}: var(--${name}-font-weight) var(--${name}-font-size)/var(--${name}-line-height) var(--${name}-font-family);`
  ).join('\n  ');
}

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
    const darkSelectorOverride = `[data-mode="dark"],\n${themeClass || ':root'}.dark-mode, .dark-mode ${themeClass || ':root'}`;
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
    let sampleVars = '';

    BREAKPOINT_MODES.forEach(mode => {
      let vars = extractCssVariables(path.join(TEMP, `${theme}-${mode}${fileSuffix}.css`));
      if (vars) {
        hasContent = true;
        if (stripPattern) vars = vars.replace(stripPattern, '$1--');
        sampleVars = sampleVars || vars;
        const breakpoint = breakpoints[mode];
        if (!breakpoint) {
          finalCss += `${rootSelector} {\n  ${vars}\n}\n\n`;
        } else {
          finalCss += `@media (min-width: ${breakpoint}) {\n  ${rootSelector} {\n    ${vars}\n  }\n}\n\n`;
        }
      }
    });

    if (type === 'typography' && sampleVars) {
      const shorthand = buildTypographyShorthand(sampleVars);
      if (shorthand) {
        finalCss += `${rootSelector} {\n  /* Semantic shorthand typography tokens */\n  ${shorthand}\n}\n\n`;
      }
    }
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
