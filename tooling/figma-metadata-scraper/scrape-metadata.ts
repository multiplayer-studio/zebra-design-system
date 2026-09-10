import * as fs from 'fs';
import * as path from 'path';
import { mkdir } from 'fs/promises';
import { fileURLToPath } from 'url';
import config from './config.json' with { type: 'json' };
import componentsConfig from './components.json' with { type: 'json' };
import { parseFigmaUrl, parseFrame } from './parse.js';
import type { FigmaFileNodesResponse } from './types.js';

function isoDate(): string {
  const d = new Date();
  const pad2 = (n: number) => (n < 10 ? `0${n}` : String(n));
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export async function main() {
  const FIGMA_TOKEN = process.env.FIGMA_PERSONAL_ACCESS_TOKEN;
  const FIGMA_FILE_KEY = process.env.FIGMA_FILE_KEY;

  if (!FIGMA_TOKEN) {
    console.error('❌ Error: FIGMA_PERSONAL_ACCESS_TOKEN environment variable not set.');
    process.exit(1);
  }

  if (!FIGMA_FILE_KEY) {
    console.error('❌ Error: FIGMA_FILE_KEY environment variable not set.');
    process.exit(1);
  }

  const fileKey = FIGMA_FILE_KEY;

  if (!componentsConfig || Object.keys(componentsConfig).length === 0) {
    console.error('❌ Error: components.json is empty or missing.');
    process.exit(1);
  }

  // Optional filter to a single component
  // Skip the "--" separator if present (tsx passes it as argv[2] when using -- syntax)
  let filterComponent = process.argv[2];
  if (filterComponent === '--') {
    filterComponent = process.argv[3];
  }

  if (filterComponent && !(filterComponent in componentsConfig)) {
    console.error(
      `❌ Error: Component "${filterComponent}" not found in components.json.`
    );
    process.exit(1);
  }

  const componentsToScrape = filterComponent
    ? { [filterComponent]: componentsConfig[filterComponent as keyof typeof componentsConfig] }
    : componentsConfig;

  console.log(
    `🔍 Scraping ${Object.keys(componentsToScrape).length} component(s)...`
  );

  // Ensure output directory exists
  const outputDir = path.join(process.cwd(), config.output.dir);
  await mkdir(outputDir, { recursive: true });

  let successCount = 0;
  let failCount = 0;

  for (const [componentName, nodeIdInput] of Object.entries(componentsToScrape)) {
    try {
      console.log(`\n📝 Processing: ${componentName}`);

      // Convert node ID from hyphen format (3840-907) to colon format (3840:907)
      const nodeId = (nodeIdInput as string).replace('-', ':');

      // Fetch from Figma REST API with depth=10 to get all nested children
      const apiEndpoint = `https://api.figma.com/v1/files/${fileKey}/nodes?ids=${nodeId}&depth=10`;

      const response = await fetch(apiEndpoint, {
        headers: {
          'X-Figma-Token': FIGMA_TOKEN,
        },
      });

      if (!response.ok) {
        const errorData: any = await response.json();
        throw new Error(
          `Figma API request failed with status ${response.status}: ${errorData.err || errorData.message}`
        );
      }

      const data = (await response.json()) as FigmaFileNodesResponse;

      // Check if node exists
      if (!data.nodes[nodeId] || data.nodes[nodeId] === null) {
        throw new Error(`Node ${nodeId} not found or not accessible.`);
      }

      const nodeData = data.nodes[nodeId];
      if (!nodeData.document) {
        throw new Error(`Node ${nodeId} has no document data.`);
      }

      // Parse the frame (reconstruct URL for metadata)
      const sourceUrl = `https://www.figma.com/design/${fileKey}/The-Zebra-Design-System?node-id=${nodeId.replace(':', '-')}&m=dev`;
      const metadata = parseFrame(nodeData.document, sourceUrl, fileKey);

      // Validate component name
      if (!metadata.componentName) {
        throw new Error('Could not determine component name from Hero section.');
      }

      // Write output JSON
      const slug = slugify(componentName);
      const outputPath = path.join(outputDir, `${slug}.json`);
      fs.writeFileSync(outputPath, JSON.stringify(metadata, null, 2));

      console.log(`✨ Exported: ${outputPath}`);
      successCount++;
    } catch (err) {
      console.error(
        `❌ Error processing ${componentName}:`,
        err instanceof Error ? err.message : String(err)
      );
      failCount++;
    }
  }

  console.log(`\n📊 Summary: ${successCount} succeeded, ${failCount} failed.`);

  if (failCount > 0 && failCount === Object.keys(componentsToScrape).length) {
    console.error('❌ All components failed to scrape.');
    process.exit(1);
  }

  console.log('✅ Done!');
}

if (fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  main();
}
