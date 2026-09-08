import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import config from './config.json' with { type: 'json' };

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = config.directories.jsonOutputDir;

async function main() {
  console.log('📄 Exporting DTCG tokens...');
  console.log(`   Source: tokens/dtcg-tokens`);
  console.log(`   Destination: ${OUTPUT_DIR}\n`);

  // Create output directory if it doesn't exist
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  // Get all JSON files from dtcg-tokens
  const sourceDir = path.join(__dirname, 'tokens', 'dtcg-tokens');
  const files = fs.readdirSync(sourceDir).filter(file => file.endsWith('.json'));

  if (files.length === 0) {
    console.error('❌ No JSON files found in dtcg-tokens directory');
    process.exit(1);
  }

  // Copy each file
  for (const file of files) {
    const sourcePath = path.join(sourceDir, file);
    const destPath = path.join(OUTPUT_DIR, file);
    fs.copyFileSync(sourcePath, destPath);
    console.log(`   ✓ Copied: ${file}`);
  }

  console.log(`\n✅ Exported ${files.length} DTCG token files`);
}

main().catch(error => {
  console.error('❌ Export failed:', error);
  process.exit(1);
});
