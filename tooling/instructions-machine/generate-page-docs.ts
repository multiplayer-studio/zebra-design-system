import * as fs from 'fs';
import { mkdir } from 'fs/promises';
import * as path from 'path';
import { fileURLToPath } from 'url';
import config from './config.json' with { type: 'json' };
import { discoverPage, fetchNodeSubtree, selfCheck as discoverSelfCheck } from './discover.js';
import { parseComponentSet, selfCheck as extractSelfCheck } from './extract.js';
import { discoverPages, selfCheck as pagesSelfCheck } from './pages.js';
import { renderPageMarkdown, selfCheck as renderSelfCheck } from './render-markdown.js';
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

// A page can carry several "<Name> Metadata" frames (e.g. the Button page has both
// "Button Metadata" and "Icon Button Metadata"). Each is matched to its component
// independently — loosely, since hand-authored layer names drift: case-insensitive and
// ignoring the `_` / `Template/` prefixes this file uses for subcomponents.
function metadataKey(name: string): string {
  return name
    .replace(/^_+/, '')
    .replace(/^Template\//i, '')
    .trim()
    .toLowerCase();
}

// Builds a Figma link to a specific node — the page's own node for the page-level link,
// or a component's own node id so its "Source" links straight to that component set, not
// just wherever on the page it happens to sit.
function figmaUrl(fileKey: string, nodeIdDash: string, branchKey: string | undefined): string {
  if (branchKey) {
    const parts = branchKey.split('/');
    if (parts.length !== 2) {
      throw new Error(`FIGMA_BRANCH_KEY must be in format "branchId/componentName", got: ${branchKey}`);
    }
    const [branchId, componentName] = parts;
    return `https://www.figma.com/design/${branchId}/${componentName}?node-id=${nodeIdDash}&m=dev`;
  }
  return `https://www.figma.com/design/${fileKey}/The-Zebra-Design-System?node-id=${nodeIdDash}&m=dev`;
}

export async function main(): Promise<void> {
  const token = process.env.FIGMA_PERSONAL_ACCESS_TOKEN;
  if (!token) {
    console.error('❌ Error: FIGMA_PERSONAL_ACCESS_TOKEN environment variable not set.');
    process.exit(1);
  }

  const fileKey = process.env.FIGMA_FILE_KEY;
  if (!fileKey) {
    console.error('❌ Error: FIGMA_FILE_KEY environment variable not set.');
    process.exit(1);
  }

  const branchKey = process.env.FIGMA_BRANCH_KEY;

  // Auto-discovered from the Figma file's own page list — every top-level page whose name
  // matches an actual zeta-web component folder (see pages.ts) — instead of a hand-maintained
  // pages.json that drifts out of sync as components are added.
  console.log('🔍 Discovering Figma pages that match zeta-web components...');
  const pages = await discoverPages(fileKey, token);
  if (Object.keys(pages).length === 0) {
    console.error('❌ Error: No Figma page matched a zeta-web component folder.');
    process.exit(1);
  }
  console.log(`  Found ${Object.keys(pages).length} matching page(s): ${Object.keys(pages).join(', ')}`);

  let filterPage = process.argv[2];
  if (filterPage === '--') filterPage = process.argv[3];
  if (filterPage && !(filterPage in pages)) {
    console.error(`❌ Error: Page "${filterPage}" not found — no Figma page of that name matches a zeta-web component folder.`);
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

  for (const [pageName, nodeIdStr] of Object.entries(pagesToRun)) {
    try {
      console.log(`\n📝 Processing page: ${pageName}`);
      const url = figmaUrl(fileKey, nodeIdStr, branchKey);
      console.log(`@ 🔗: ${url}`);

      const { nodeId, branchId: parsedBranchId } = parseFigmaUrl(url);

      let variableNames = variableNamesByFile.get(fileKey);
      if (!variableNames) {
        variableNames = await fetchFileVariableNames(fileKey, token);
        variableNamesByFile.set(fileKey, variableNames);
      }

      const { document: root, components: figmaComponents, componentSets: figmaComponentSets } = await fetchNodeSubtree(fileKey, nodeId, token, parsedBranchId);
      const { components: discovered, metadataFrames } = discoverPage(root);
      if (discovered.length === 0) {
        throw new Error('No components discovered on this page.');
      }
      console.log(`  🔎 Discovered ${discovered.length} component(s): ${discovered.map((d) => d.name).join(', ')}`);
      if (metadataFrames.size) {
        console.log(`  📖 Found metadata for: ${[...metadataFrames.keys()].join(', ')}`);
      }

      const components: ComponentSpecDoc[] = discovered.map((d) => {
        const componentUrl = figmaUrl(fileKey, d.id.replace(':', '-'), branchKey);
        const spec = parseComponentSet(asComponentSet(d), componentUrl, fileKey, variableNames!, figmaComponents, figmaComponentSets);
        writeDebugJson(debugSpecsDir, `${slugify(pageName)}-${slugify(spec.componentName)}`, spec);
        return spec;
      });

      // Same debug-JSON dump figma-metadata-scraper used to write on its own, now
      // just folded into this tool's own output dir alongside the specs.
      const parseMetadata = (label: string, frame: FigmaNodeRaw): ComponentMetadataDoc | undefined => {
        try {
          const metadata = parseFrame(frame, url, fileKey);
          writeDebugJson(debugMetadataDir, `${slugify(pageName)}-${slugify(label)}`, metadata);
          return metadata;
        } catch (err) {
          console.warn(`  ⚠️  Skipping metadata for ${label}:`, err instanceof Error ? err.message : String(err));
          return undefined;
        }
      };

      const framesByKey = new Map([...metadataFrames].map(([name, frame]) => [metadataKey(name), { name, frame }]));
      const metadataByComponent = new Map<string, ComponentMetadataDoc>();
      const claimed = new Set<string>();
      for (const d of discovered) {
        const hit = framesByKey.get(metadataKey(d.name));
        if (!hit) continue;
        claimed.add(hit.name);
        const metadata = parseMetadata(d.name, hit.frame);
        if (metadata) metadataByComponent.set(d.name, metadata);
      }

      // A metadata frame matching no component on the page is still rendered, on its own
      // — hand-authored docs are never silently dropped over a layer-naming mismatch.
      const orphanMetadata: ComponentMetadataDoc[] = [];
      for (const [name, frame] of metadataFrames) {
        if (claimed.has(name)) continue;
        console.warn(`  ⚠️  "${name} Metadata" matches no component on this page — rendering it standalone.`);
        const metadata = parseMetadata(name, frame);
        if (metadata) orphanMetadata.push({ ...metadata, componentName: name });
      }

      const markdown = renderPageMarkdown({ pageName, pageSourceUrl: url, components, metadataByComponent, orphanMetadata });
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
  variantParserSelfCheck();
  discoverSelfCheck();
  extractSelfCheck();
  renderSelfCheck();
  variablesSelfCheck();
  metadataSelfCheck();
  pagesSelfCheck();
  console.log('✓✓✓ All self-checks passed! ✓✓✓');
}

if (process.argv[2] === '--selfcheck') {
  selfCheck();
} else if (fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  main();
}
