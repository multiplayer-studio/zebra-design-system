import * as fs from 'fs';
import * as path from 'path';
import { TOKEN_DIR, BREAKPOINT_MODES } from './constants.js';

function readJsonToken(filePath: string, path_: string[]): unknown {
  if (!fs.existsSync(filePath)) return undefined;
  const json = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  return path_.reduce((node: any, key) => node?.[key], json)?.$value;
}

function resolvePxValue(value: unknown, theme: string): number | undefined {
  if (typeof value !== 'string') return undefined;
  const ref = value.match(/^\{(.+)\}$/);
  if (!ref) {
    const num = value.match(/^([\d.]+)px$/);
    return num ? parseFloat(num[1]) : undefined;
  }
  const [collection, ...rest] = ref[1].split('.');
  const themedPath = path.join(TOKEN_DIR, `${collection}-${theme}-value.json`);
  const basePath = path.join(TOKEN_DIR, `${collection}-value.json`);
  const resolved = theme !== 'default' && fs.existsSync(themedPath)
    ? readJsonToken(themedPath, [collection, ...rest])
    : readJsonToken(basePath, [collection, ...rest]);
  return resolvePxValue(resolved, theme);
}

export function getBreakpointsForTheme(theme: string): Record<string, string> {
  const rawByMode: Record<string, number> = {};
  BREAKPOINT_MODES.forEach(mode => {
    const themedPath = path.join(TOKEN_DIR, `size-${theme}-${mode}.json`);
    const basePath = path.join(TOKEN_DIR, `size-${mode}.json`);
    const raw = theme !== 'default' && fs.existsSync(themedPath)
      ? readJsonToken(themedPath, ['size', 'container', 'default'])
      : readJsonToken(basePath, ['size', 'container', 'default']);
    const px = resolvePxValue(raw, theme);
    if (px !== undefined) rawByMode[mode] = px;
  });

  const modes = Object.keys(rawByMode);
  if (modes.length === 0) return {};
  const baseMode = modes.reduce((a, b) => (rawByMode[a] <= rawByMode[b] ? a : b));

  const breakpoints: Record<string, string> = {};
  modes.forEach(mode => {
    breakpoints[mode] = mode === baseMode ? '' : `${rawByMode[mode]}px`;
  });
  return breakpoints;
}
