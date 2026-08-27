import * as fs from 'fs';
import * as path from 'path';
import { TEMP_DIR, CSS_OUTPUT_DIR, BREAKPOINT_MODES } from './constants.ts';
import { getBreakpointsForTheme } from './breakpoints.ts';
import { extractCssVariables } from './css-synthesizer.ts';

export type BuildingBlockType = 'primitives' | 'palette' | 'size' | 'typography' | 'semantics';

export function synthesizeBuildingBlockCss(theme: string, type: BuildingBlockType, tempDir?: string, outputDir?: string) {
  const TEMP = tempDir || TEMP_DIR;
  const OUT = outputDir || CSS_OUTPUT_DIR;
  console.log(`\n🧱 Synthesizing ${type} building block for theme: ${theme}`);
  let finalCss = `/**\n * ${theme.charAt(0).toUpperCase() + theme.slice(1)} ${type.charAt(0).toUpperCase() + type.slice(1)} - Building Block Variables\n * This file is auto-generated. Do not edit directly.\n */\n\n`;
  let hasContent = false;

  const stripVars = (vars: string, ...prefixes: string[]): string => {
    for (const prefix of prefixes) {
      vars = vars.replace(new RegExp(`^(\\s*)--${prefix}-`, 'gm'), '$1--');
      vars = vars.replace(new RegExp(`var\\(--${prefix}-`, 'g'), 'var(--');
    }
    return vars;
  };

  if (type === 'primitives') {
    let vars = extractCssVariables(path.join(TEMP, `${theme}-bb-primitives.css`));
    if (vars) {
      finalCss += `:root {\n  ${stripVars(vars, 'primitives')}\n}\n`;
      hasContent = true;
    }
  } else if (type === 'palette') {
    let lightVars = extractCssVariables(path.join(TEMP, `${theme}-light-bb-palette.css`));
    let darkVars = extractCssVariables(path.join(TEMP, `${theme}-dark-bb-palette.css`));
    if (lightVars || darkVars) {
      lightVars = stripVars(lightVars, 'palette', 'primitives');
      darkVars = stripVars(darkVars, 'palette', 'primitives');
      if (lightVars) finalCss += `:root {\n  ${lightVars}\n}\n\n`;
      if (darkVars) {
        finalCss += `@media (prefers-color-scheme: dark) {\n  :root {\n    ${darkVars}\n  }\n}\n\n`;
        finalCss += `[data-mode="dark"],\n:root.dark-mode, .dark-mode :root {\n  ${darkVars}\n}\n`;
      }
      hasContent = true;
    }
  } else if (type === 'semantics') {
    const vars = extractCssVariables(path.join(TEMP, `default-bb-semantics.css`));
    if (vars) {
      finalCss = `/**\n * Semantics - Building Block Variables\n * References palette/*.css. Import exactly one primitives/*.css + one palette/*.css alongside this file.\n * This file is auto-generated. Do not edit directly.\n */\n\n`;
      finalCss += `:root {\n  ${stripVars(vars, 'semantics', 'palette', 'primitives')}\n}\n`;
      hasContent = true;
    }
  } else {
    const breakpoints = getBreakpointsForTheme(theme);
    BREAKPOINT_MODES.forEach(mode => {
      let vars = extractCssVariables(path.join(TEMP, `${theme}-${mode}-bb-${type}.css`));
      if (vars) {
        hasContent = true;
        const stripList = type === 'size' ? ['size', 'primitives'] : ['typography', 'primitives'];
        vars = stripVars(vars, ...stripList);
        const breakpoint = breakpoints[mode];
        if (!breakpoint) {
          finalCss += `:root {\n  ${vars}\n}\n\n`;
        } else {
          finalCss += `@media (min-width: ${breakpoint}) {\n  :root {\n    ${vars}\n  }\n}\n\n`;
        }
      }
    });
  }

  if (!hasContent) {
    console.log(`   - Skipping, no ${type} variables found.`);
    return;
  }

  if (type !== 'semantics') {
    const outputPath = path.join(OUT, type);
    fs.mkdirSync(outputPath, { recursive: true });
    const outputFileName = theme === 'default' ? 'default.css' : `${theme.toLowerCase()}.css`;
    fs.writeFileSync(path.join(outputPath, outputFileName), finalCss.trim(), 'utf-8');
    console.log(`   ✅ Wrote final file: ${type}/${outputFileName}`);
  } else {
    fs.writeFileSync(path.join(OUT, 'semantics.css'), finalCss, 'utf-8');
    console.log(`   ✅ Wrote final file: semantics.css`);
  }
}
