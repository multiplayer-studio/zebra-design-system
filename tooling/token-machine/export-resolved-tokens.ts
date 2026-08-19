import * as fs from 'fs';
import * as path from 'path';
import config from './config.json' assert { type: 'json' };

const OUTPUT_PATH = path.join('../../services/mcp-server/src/resources', 'resolved-tokens.json');

const CSS_DIR = config.directories.cssOutputDir;

// ===============================================================================================
// CSS PARSING
// ===============================================================================================

function extractTokensFromCss(filePath: string): Map<string, string> {
  const tokens = new Map<string, string>();

  if (!fs.existsSync(filePath)) {
    console.warn(`   ⚠️  File not found: ${filePath}`);
    return tokens;
  }

  const content = fs.readFileSync(filePath, 'utf-8');

  // Extract variables from :root selector only (first block, before media queries)
  const rootMatch = content.match(/:root\s*\{([^}]+)\}/);
  if (!rootMatch) return tokens;

  const lines = rootMatch[1].split('\n');
  for (const line of lines) {
    const match = line.match(/--([^:]+):\s*([^;]+);/);
    if (match) {
      const name = match[1].trim();
      const value = match[2].trim();
      tokens.set(name, value);
    }
  }

  return tokens;
}

function groupTokensByType(
  colorTokens: Map<string, string>,
  sizeTokens: Map<string, string>,
  typographyTokens: Map<string, string>
): Record<string, Array<{ name: string; value: string }>> {
  const result: Record<string, Array<{ name: string; value: string }>> = {
    color: [],
    size: [],
    typography: [],
  };

  colorTokens.forEach((value, name) => {
    result.color.push({ name, value });
  });

  sizeTokens.forEach((value, name) => {
    result.size.push({ name, value });
  });

  typographyTokens.forEach((value, name) => {
    result.typography.push({ name, value });
  });

  return result;
}

// ===============================================================================================
// MAIN EXPORT
// ===============================================================================================

async function main() {
  console.log('📄 Exporting resolved tokens from CSS...');
  console.log(`   Scanning: ${CSS_DIR}\n`);

  const colorPath = path.join(CSS_DIR, 'colors.css');
  const sizePath = path.join(CSS_DIR, 'sizes.css');
  const typographyPath = path.join(CSS_DIR, 'typography.css');

  console.log('   ✓ Parsing colors.css');
  const colorTokens = extractTokensFromCss(colorPath);

  console.log('   ✓ Parsing sizes.css');
  const sizeTokens = extractTokensFromCss(sizePath);

  console.log('   ✓ Parsing typography.css');
  const typographyTokens = extractTokensFromCss(typographyPath);

  const grouped = groupTokensByType(colorTokens, sizeTokens, typographyTokens);

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(grouped, null, 2), 'utf-8');

  console.log(`\n✅ Exported: ${OUTPUT_PATH}`);
  console.log(`   - Colors: ${grouped.color.length}`);
  console.log(`   - Sizes: ${grouped.size.length}`);
  console.log(`   - Typography: ${grouped.typography.length}`);
}

main().catch(error => {
  console.error('❌ Export failed:', error);
  process.exit(1);
});
