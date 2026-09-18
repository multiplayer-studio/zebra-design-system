import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import config from './config.json' with { type: 'json' };

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RESOLVED_FRAGMENTS_DIR = path.resolve(__dirname, config.directories.resolvedFragmentsDir);
const OUTPUT_DIR = path.resolve(__dirname, '../../packages/foundations/tokens/dist/json');

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

async function main() {
  console.log('📦 Exporting resolved tokens...');
  console.log(`   Source: ${RESOLVED_FRAGMENTS_DIR}`);
  console.log(`   Destination: ${OUTPUT_DIR}\n`);

  if (!fs.existsSync(RESOLVED_FRAGMENTS_DIR)) {
    console.error('❌ Resolved fragments directory not found. Run build:tokens first.');
    process.exit(1);
  }

  // Create output directory if it doesn't exist
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  // Get all JSON fragment files
  const files = fs.readdirSync(RESOLVED_FRAGMENTS_DIR).filter(file => file.endsWith('.json'));

  if (files.length === 0) {
    console.error('❌ No JSON fragments found in resolved fragments directory');
    process.exit(1);
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
      const key = mode;
      if (fragments[key]) {
        resolved.color[mode] = deepMerge({}, fragments[key]);
      }
    }

    // Size tokens (breakpoint modes)
    for (const mode of ['mobile', 'tablet', 'desktop', 'desktop compact']) {
      const key = mode;
      if (fragments[key]) {
        resolved.size[mode] = deepMerge({}, fragments[key]);
      }
    }

    // Typography tokens (breakpoint modes)
    for (const mode of ['mobile', 'tablet', 'desktop', 'desktop compact']) {
      const key = `${mode}-typography`;
      if (fragments[key]) {
        resolved.typography[mode] = deepMerge({}, fragments[key]);
      }
    }

    // Write the assembled file
    const filename = theme === 'default' ? 'resolved-tokens.json' : `resolved-${theme}-tokens.json`;
    const filepath = path.join(OUTPUT_DIR, filename);
    fs.writeFileSync(filepath, JSON.stringify(resolved, null, 2));
    console.log(`   ✓ Generated: ${filename}`);
  }

  // Clean up resolved fragments directory
  fs.rmSync(RESOLVED_FRAGMENTS_DIR, { recursive: true, force: true });
  console.log(`   ✓ Cleaned up: ${RESOLVED_FRAGMENTS_DIR}\n`);

  console.log(`✅ Exported resolved tokens for ${Object.keys(themeFragments).length} theme(s)`);
}

main().catch(error => {
  console.error('❌ Export failed:', error);
  process.exit(1);
});
