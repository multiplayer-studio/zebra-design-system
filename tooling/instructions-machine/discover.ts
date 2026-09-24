import * as assert from 'assert';
import type { FigmaComponentMeta, FigmaComponentSetMeta, FigmaFileNodesResponse, FigmaNodeRaw } from './types.js';

const CONTAINER_TYPES = new Set(['CANVAS', 'SECTION', 'FRAME', 'GROUP']);
const METADATA_FRAME_SUFFIX = ' Metadata';

export interface NodeSubtree {
  document: FigmaNodeRaw;
  // Every component/componentSet referenced anywhere in this subtree — the same maps the
  // nodes endpoint already returns for free, used to resolve an INSTANCE's applied
  // component identity (see extract.ts's resolveIconName) without a separate fetch.
  components: Record<string, FigmaComponentMeta>;
  componentSets: Record<string, FigmaComponentSetMeta>;
}

export async function fetchNodeSubtree(fileKey: string, nodeId: string, token: string, branchId?: string): Promise<NodeSubtree> {
  let url = `https://api.figma.com/v1/files/${fileKey}/nodes?ids=${encodeURIComponent(nodeId)}`;
  if (branchId) url += `&branch_id=${branchId}`;
  const response = await fetch(url, { headers: { 'X-Figma-Token': token } });
  if (!response.ok) {
    throw new Error(`Figma API request failed with status ${response.status} for node ${nodeId}`);
  }
  const data = (await response.json()) as FigmaFileNodesResponse;
  const entry = data.nodes[nodeId];
  if (!entry || !entry.document) {
    throw new Error(`Node ${nodeId} not found or not accessible.`);
  }
  return { document: entry.document, components: entry.components ?? {}, componentSets: entry.componentSets ?? {} };
}

export interface PageDiscovery {
  components: FigmaNodeRaw[];
  // Human-authored doc frames (named "<Component Name> Metadata"), keyed by component
  // name — a sibling of the actual component set on the same page, per this design
  // system's convention. Not every component has one.
  metadataFrames: Map<string, FigmaNodeRaw>;
}

// Walk a page/frame subtree once, collecting both:
// - every COMPONENT_SET (or standalone COMPONENT, for the rare component with no variant
//   set wrapping it) found at any depth. Recursion stops the moment a set or standalone
//   component is hit — a set's own variant children must never be independently
//   collected as if they were siblings on the page.
// - every FRAME named "<Name> Metadata" — the human-authored documentation for <Name>.
//   Matched by exact suffix (ponytail: v1 heuristic; upgrade to fuzzy/config-driven
//   matching if a page doesn't follow this naming convention).
export function discoverPage(root: FigmaNodeRaw): PageDiscovery {
  const components: FigmaNodeRaw[] = [];
  const metadataFrames = new Map<string, FigmaNodeRaw>();
  const seen = new Set<string>();

  function walk(node: FigmaNodeRaw): void {
    if (node.type === 'COMPONENT_SET' || node.type === 'COMPONENT') {
      if (!seen.has(node.id)) {
        seen.add(node.id);
        components.push(node);
      }
      return;
    }
    if (node.type === 'FRAME' && node.name.endsWith(METADATA_FRAME_SUFFIX)) {
      const key = node.name.slice(0, -METADATA_FRAME_SUFFIX.length);
      if (metadataFrames.has(key)) {
        console.warn(`  ⚠️  Two metadata frames named "${node.name}" on this page — keeping the first, ignoring ${node.id}.`);
        return;
      }
      metadataFrames.set(key, node);
      return;
    }
    if (CONTAINER_TYPES.has(node.type) && node.children) {
      for (const child of node.children) walk(child);
    }
  }

  walk(root);
  return { components, metadataFrames };
}

export function selfCheck(): void {
  const variantA: FigmaNodeRaw = { id: 'v1', name: 'Size=Small', type: 'COMPONENT', children: [] };
  const variantB: FigmaNodeRaw = { id: 'v2', name: 'Size=Large', type: 'COMPONENT', children: [] };
  const buttonSet: FigmaNodeRaw = {
    id: 'set1',
    name: 'Button',
    type: 'COMPONENT_SET',
    children: [variantA, variantB],
  };
  const standalone: FigmaNodeRaw = { id: 'comp1', name: 'Logo', type: 'COMPONENT', children: [] };
  const metadataFrame: FigmaNodeRaw = { id: 'meta1', name: 'Button Metadata', type: 'FRAME', children: [{ id: 'hero1', name: 'Hero', type: 'FRAME' }] };
  const page: FigmaNodeRaw = {
    id: 'page1',
    name: 'Buttons',
    type: 'CANVAS',
    children: [
      { id: 'section1', name: 'Section', type: 'SECTION', children: [{ id: 'frame1', name: 'Frame', type: 'FRAME', children: [buttonSet] }] },
      standalone,
      metadataFrame,
    ],
  };

  const result = discoverPage(page);
  assert.strictEqual(result.components.length, 2);
  const ids = result.components.map((n) => n.id).sort();
  assert.deepStrictEqual(ids, ['comp1', 'set1']);
  // The set's own variants must not show up as separate top-level entries.
  assert.ok(!result.components.some((n) => n.id === 'v1' || n.id === 'v2'));
  // Metadata frame keyed by component name, suffix stripped.
  assert.strictEqual(result.metadataFrames.get('Button')?.id, 'meta1');
  assert.strictEqual(result.metadataFrames.get('Logo'), undefined); // Logo has no metadata frame here

  // A URL pointing straight at a component/component-set should also work.
  const direct = discoverPage(buttonSet);
  assert.strictEqual(direct.components.length, 1);
  assert.strictEqual(direct.components[0].id, 'set1');

  console.log('✓ discover.selfCheck() passed');
}
