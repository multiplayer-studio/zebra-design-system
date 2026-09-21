import * as fs from 'fs';
import { mkdir } from 'fs/promises';
import * as path from 'path';
import { fileURLToPath } from 'url';
import config from './config.json' with { type: 'json' };
import pagesConfig from './pages.json' with { type: 'json' };
import { discoverPage, fetchNodeSubtree, selfCheck as discoverSelfCheck } from './discover.js';
import { parseComponentSet, selfCheck as extractSelfCheck } from './extract.js';
import { renderPageMarkdown, selfCheck as renderSelfCheck } from './render-markdown.js';
import { selfCheck as tokenResolverSelfCheck } from './token-resolver.js';
import { parseFigmaUrl, selfCheck as urlSelfCheck } from './url.js';
import { selfCheck as variantParserSelfCheck } from './variant-parser.js';
import { fetchFileVariableNames, selfCheck as variablesSelfCheck } from './variables.js';
import { parseFrame, selfCheck as metadataSelfCheck } from './metadata.js';
import type { ComponentMetadataDoc, ComponentSpecDoc, FigmaNodeRaw } from './types.js';

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// A standalone COMPONENT (no variant set wrapping it) is handled by parseComponentSet
// unmodified by wrapping it as a synthetic one-variant set.
function asComponentSet(node: FigmaNodeRaw): FigmaNodeRaw {
  return node.type === 'COMPONENT_SET' ? node : { ...node, type: 'COMPONENT_SET', children: [node] };
}

function writeDebugJson(dir: string, name: string, data: unknown): void {
  fs.writeFileSync(path.join(dir, `${name}.json`), JSON.stringify(data, null, 2));
}

export async function main(): Promise<void> {
  const token = process.env.FIGMA_PERSONAL_ACCESS_TOKEN;
  if (!token) {
    console.error('❌ Error: FIGMA_PERSONAL_ACCESS_TOKEN environment variable not set.');
    process.exit(1);
  }

  const pages = pagesConfig as Record<string, string>;
  if (!pages || Object.keys(pages).length === 0) {
    console.error('❌ Error: pages.json is empty. Add at least one { "Page Name": "<figma page URL>" } entry.');
    process.exit(1);
  }

  let filterPage = process.argv[2];
  if (filterPage === '--') filterPage = process.argv[3];
  if (filterPage && !(filterPage in pages)) {
    console.error(`❌ Error: Page "${filterPage}" not found in pages.json.`);
    process.exit(1);
  }
  const pagesToRun = filterPage ? { [filterPage]: pages[filterPage] } : pages;

  const docsDir = path.join(process.cwd(), config.output.docsDir);
  const debugSpecsDir = path.join(process.cwd(), config.output.debugSpecsDir);
  const debugMetadataDir = path.join(process.cwd(), config.output.debugMetadataDir);
  await mkdir(docsDir, { recursive: true });
  await mkdir(debugSpecsDir, { recursive: true });
  await mkdir(debugMetadataDir, { recursive: true });

  let successCount = 0;
  let failCount = 0;
  // Variables belong to a file, not a page — fetched once per fileKey and reused across
  // every page in that file, instead of refetching per page.
  const variableNamesByFile = new Map<string, Map<string, string>>();

  for (const [pageName, url] of Object.entries(pagesToRun)) {
    try {
      console.log(`\n📝 Processing page: ${pageName}`);
      const { fileKey, nodeId } = parseFigmaUrl(url);

      let variableNames = variableNamesByFile.get(fileKey);
      if (!variableNames) {
        variableNames = await fetchFileVariableNames(fileKey, token);
        variableNamesByFile.set(fileKey, variableNames);
      }

      const root = await fetchNodeSubtree(fileKey, nodeId, token);
      const { components: discovered, metadataFrames } = discoverPage(root);
      if (discovered.length === 0) {
        throw new Error('No components discovered on this page.');
      }
      console.log(`  🔎 Discovered ${discovered.length} component(s): ${discovered.map((d) => d.name).join(', ')}`);
      if (metadataFrames.size) {
        console.log(`  📖 Found metadata for: ${[...metadataFrames.keys()].join(', ')}`);
      }

      const components: ComponentSpecDoc[] = discovered.map((d) => {
        const spec = parseComponentSet(asComponentSet(d), url, fileKey, variableNames!);
        writeDebugJson(debugSpecsDir, `${slugify(pageName)}-${slugify(spec.componentName)}`, spec);
        return spec;
      });

      const metadataByComponent = new Map<string, ComponentMetadataDoc>();
      for (const d of discovered) {
        const frame = metadataFrames.get(d.name);
        if (!frame) continue;
        try {
          const metadata = parseFrame(frame, url, fileKey);
          metadataByComponent.set(d.name, metadata);
          // Same debug-JSON dump figma-metadata-scraper used to write on its own, now
          // just folded into this tool's own output dir alongside the specs.
          writeDebugJson(debugMetadataDir, `${slugify(pageName)}-${slugify(d.name)}`, metadata);
        } catch (err) {
          console.warn(`  ⚠️  Skipping metadata for ${d.name}:`, err instanceof Error ? err.message : String(err));
        }
      }

      const markdown = renderPageMarkdown({ pageName, pageSourceUrl: url, components, metadataByComponent });
      const outputPath = path.join(docsDir, `${slugify(pageName)}.md`);
      fs.writeFileSync(outputPath, markdown);
      console.log(`✨ Exported: ${outputPath}`);
      successCount++;
    } catch (err) {
      console.error(`❌ Error processing ${pageName}:`, err instanceof Error ? err.message : String(err));
      failCount++;
    }
  }

  console.log(`\n📊 Summary: ${successCount} succeeded, ${failCount} failed.`);
  if (failCount > 0 && failCount === Object.keys(pagesToRun).length) {
    console.error('❌ All pages failed.');
    process.exit(1);
  }
  console.log('✅ Done!');
}

function selfCheck(): void {
  urlSelfCheck();
  tokenResolverSelfCheck();
  variantParserSelfCheck();
  discoverSelfCheck();
  extractSelfCheck();
  renderSelfCheck();
  variablesSelfCheck();
  metadataSelfCheck();
  console.log('✓✓✓ All self-checks passed! ✓✓✓');
}

if (process.argv[2] === '--selfcheck') {
  selfCheck();
} else if (fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  main();
}
