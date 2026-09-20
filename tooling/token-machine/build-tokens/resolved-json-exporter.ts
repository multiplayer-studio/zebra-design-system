import * as fs from 'fs';
import * as path from 'path';
import { RESOLVED_FRAGMENTS_DIR, JSON_OUTPUT_DIR } from './constants.js';

interface ResolvedTokens {
  color: Record<string, any>;
  size: Record<string, any>;
  typography: Record<string, any>;
}

function deepMerge(target: any, source: any): any {
  for (const key of Object.keys(source)) {
    const sourceValue = source[key];

    // Check if this is a DTCG token (has $type and $value)
    if (sourceValue !== null && typeof sourceValue === 'object' && '$type' in sourceValue && '$value' in sourceValue) {
      target[key] = sourceValue;
    } else if (sourceValue !== null && typeof sourceValue === 'object' && !Array.isArray(sourceValue)) {
      if (!target[key]) target[key] = {};
      deepMerge(target[key], sourceValue);
    } else {
      target[key] = sourceValue;
    }
  }
  return target;
}

// Assembles the per-mode JSON fragments build-tokens/index.ts wrote to RESOLVED_FRAGMENTS_DIR
// into one resolved-tokens.json (+ one per overriding theme), then deletes the fragments dir.
// Called at the end of the same build run that produced them - never a separate pipeline stage.
export function exportResolvedTokens(): void {
  console.log('\n📦 Exporting resolved tokens...');
  console.log(`   Source: ${RESOLVED_FRAGMENTS_DIR}`);
  console.log(`   Destination: ${JSON_OUTPUT_DIR}`);

  if (!fs.existsSync(RESOLVED_FRAGMENTS_DIR)) {
    throw new Error('Resolved fragments directory not found - build-tokens/index.ts should have created it.');
  }

  fs.mkdirSync(JSON_OUTPUT_DIR, { recursive: true });

  const files = fs.readdirSync(RESOLVED_FRAGMENTS_DIR).filter(file => file.endsWith('.json'));
  if (files.length === 0) {
    throw new Error('No JSON fragments found in resolved fragments directory.');
  }

  // Group fragments by theme
  const themeFragments: Record<string, Record<string, Record<string, unknown>>> = {};

  for (const file of files) {
    const match = file.match(/^([^-]+)-(.+)\.json$/);
    if (!match) continue;

    const [, theme, modeAndType] = match;
    if (!themeFragments[theme]) {
      themeFragments[theme] = {};
    }

    const fragmentPath = path.join(RESOLVED_FRAGMENTS_DIR, file);
    const data = JSON.parse(fs.readFileSync(fragmentPath, 'utf-8'));
    themeFragments[theme][modeAndType] = data;
  }

  // Assemble resolved tokens per theme
  for (const theme of Object.keys(themeFragments)) {
    const fragments = themeFragments[theme];
    const resolved: ResolvedTokens = {
      color: {},
      size: {},
      typography: {},
    };

    // Color tokens (light/dark modes)
    for (const mode of ['light', 'dark']) {
      if (fragments[mode]) {
        resolved.color[mode] = deepMerge({}, fragments[mode]);
      }
    }

    // Size tokens (breakpoint modes)
    for (const mode of ['mobile', 'tablet', 'desktop', 'desktop compact']) {
      if (fragments[mode]) {
        resolved.size[mode] = deepMerge({}, fragments[mode]);
      }
    }

    // Typography tokens (breakpoint modes)
    for (const mode of ['mobile', 'tablet', 'desktop', 'desktop compact']) {
      const key = `${mode}-typography`;
      if (fragments[key]) {
        resolved.typography[mode] = deepMerge({}, fragments[key]);
      }
    }

    const filename = theme === 'default' ? 'resolved-tokens.json' : `resolved-${theme}-tokens.json`;
    fs.writeFileSync(path.join(JSON_OUTPUT_DIR, filename), JSON.stringify(resolved, null, 2));
    console.log(`   ✓ Generated: ${filename}`);
  }

  fs.rmSync(RESOLVED_FRAGMENTS_DIR, { recursive: true, force: true });
  console.log(`✅ Exported resolved tokens for ${Object.keys(themeFragments).length} theme(s)`);
}
