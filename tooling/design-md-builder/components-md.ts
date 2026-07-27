/**
 * ============================================================================
 * Figma Design System to Markdown Extractor (H3 Hierarchy Edition)
 * ============================================================================
 * 
 * WHAT IT DOES:
 * 1. Safely wipes the output directory.
 * 2. Fetches Figma Local Variables to build a Design Token Dictionary.
 * 3. Fetches the complete document tree.
 * 4. SMART LIST DETECTION: Automatically detects numbered grids and formats them.
 * 5. DO/DON'T GUIDELINE DETECTION: Inspects grid data for guidelines.
 * 6. HIERARCHY FIX: Uses H3 (###) for component sections (Properties, Blueprint, 
 *    Metadata) so they cleanly nest under the main Component H1/H2 header.
 * 7. EXPORTABLE: Can be run independently or imported by design-md.ts.
 * 
 * RUN COMMAND:
 * FIGMA_ACCESS_TOKEN="your_token_here" npx tsx scripts/components-md.ts
 * ============================================================================
 */

import * as fs from 'fs/promises';
import * as path from 'path';

// --- Configuration ---
const FILE_KEY = 'H2HFgaEYnI6Fv8UxZXQPnk';
const OUTPUT_DIR = path.join(__dirname, '../../documentation/components');
const IGNORED_PAGES = ['Icons', 'Tokens'];

const FIGMA_TOKEN = process.env.FIGMA_ACCESS_TOKEN;
if (!FIGMA_TOKEN) {
  console.error("❌ Error: FIGMA_ACCESS_TOKEN environment variable is missing.");
  process.exit(1);
}

const headers = {
  'X-Figma-Token': FIGMA_TOKEN,
  'Content-Type': 'application/json'
};

// --- Types ---
interface FigmaNode {
  id: string;
  name: string;
  type: string;
  characters?: string;
  layoutMode?: 'NONE' | 'HORIZONTAL' | 'VERTICAL' | 'GRID';
  gridColumnCount?: number;
  gridRowAnchorIndex?: number;
  gridColumnAnchorIndex?: number;
  primaryAxisAlignItems?: string;
  counterAxisAlignItems?: string;
  layoutSizingHorizontal?: string;
  layoutSizingVertical?: string;
  paddingLeft?: number;
  paddingRight?: number;
  paddingTop?: number;
  paddingBottom?: number;
  itemSpacing?: number;
  boundVariables?: any;
  fills?: any[];
  children?: FigmaNode[];
  componentId?: string; 
  componentPropertyDefinitions?: Record<string, { type: string; defaultValue: any; variantOptions?: string[] }>;
  componentProperties?: Record<string, { value: string; type: string }>;
}

interface ComponentSetContext {
  pageName: string;
  node: FigmaNode;
  metadataText?: string;
}

let tokenDictionary: Record<string, string> = {};

// --- Functions ---
async function buildTokenDictionary() {
  const url = `https://api.figma.com/v1/files/${FILE_KEY}/variables/local`;
  console.log(`Fetching local variables to build token dictionary...`);
  
  const response = await fetch(url, { headers });
  if (!response.ok) {
    console.warn(`⚠️ Could not fetch variables. Tokens will render as raw IDs.`);
    return;
  }
  
  const data = await response.json();
  const variables = data.meta?.variables || {};
  
  for (const varId in variables) {
    const v = variables[varId];
    tokenDictionary[v.id] = v.name;
  }
  console.log(`✅ Loaded ${Object.keys(tokenDictionary).length} design tokens.`);
}

async function fetchFigmaDocument(): Promise<FigmaNode> {
  const url = `https://api.figma.com/v1/files/${FILE_KEY}`;
  console.log(`Fetching document tree for file ${FILE_KEY}...`);
  
  const response = await fetch(url, { headers });
  if (!response.ok) {
    throw new Error(`Figma API Error: ${response.status} - ${response.statusText}`);
  }
  
  const data = await response.json();
  return data.document;
}

function isIconNode(node: FigmaNode): boolean {
  const name = node.name.toLowerCase();
  const hasIconProp = node.componentProperties && Object.keys(node.componentProperties).some(
    propKey => propKey.toLowerCase().includes('icon') || propKey.toLowerCase().includes('glyph')
  );
  if (name.includes('icon') || name.includes('glyph') || hasIconProp) {
    let hasText = false;
    const search = (n: FigmaNode) => {
      if (n.type === 'TEXT') hasText = true;
      if (n.children) n.children.forEach(search);
    };
    search(node);
    return !hasText;
  }
  return false;
}

function resolveIconName(node: FigmaNode): string {
  let targetId = node.componentId || '';
  if (node.componentProperties) {
    for (const propKey in node.componentProperties) {
      const prop = node.componentProperties[propKey];
      if (prop.type === 'INSTANCE_SWAP' && prop.value) {
        targetId = prop.value;
        break;
      }
    }
  }
  if (targetId.includes('2335')) {
     return 'true';
  }
  return 'false';
}

function getCellContent(node: FigmaNode): string {
  let texts: string[] = [];
  let foundIconName: string | null = null;
  function traverse(n: FigmaNode) {
    if (n.type === 'TEXT' && n.characters) {
      const cleanText = n.characters.trim().replace(/\n/g, ' ').replace(/\|/g, '\\|');
      texts.push(cleanText);
      return;
    }
    if (!foundIconName && isIconNode(n)) {
      foundIconName = resolveIconName(n);
    }
    if (n.children) {
      if ((n.type === 'FRAME' || n.type === 'INSTANCE' || n.type === 'COMPONENT') && 
          (!n.layoutMode || n.layoutMode === 'NONE')) {
        return; 
      }
      n.children.forEach(traverse);
    }
  }
  traverse(node);
  
  const resultText = texts.join(' ').replace(/\s+/g, ' ').trim();
  if (resultText) return resultText; 
  return foundIconName || '';
}

function getTableRows(node: FigmaNode): string[][] {
  if (node.layoutMode === 'GRID') {
    const gridRows: string[][] = [];
    if (node.children) {
      node.children.forEach(child => {
        const r = child.gridRowAnchorIndex || 0;
        const c = child.gridColumnAnchorIndex || 0;
        if (!gridRows[r]) gridRows[r] = [];
        gridRows[r][c] = getCellContent(child);
      });
    }
    const cleanRows: string[][] = [];
    let maxCols = 0;
    gridRows.forEach(r => { if (r) maxCols = Math.max(maxCols, r.length); });
    
    for (let i = 0; i < gridRows.length; i++) {
      if (gridRows[i]) {
        const padded = [];
        for (let j = 0; j < maxCols; j++) {
          padded.push(gridRows[i][j] || '');
        }
        cleanRows.push(padded);
      }
    }
    return cleanRows;
  } else if (node.layoutMode === 'HORIZONTAL') {
    return [[ ...(node.children || []).map(c => getCellContent(c)) ]];
  }
  return [];
}

function formatMarkdownTableOrList(rows: string[][]): string {
  if (rows.length === 0) return '';
  
  const isNumberedList = rows.length > 0 && rows[0].length === 2 && rows.every(row => {
    const firstCol = row[0].trim();
    return /^\d+\.?$/.test(firstCol);
  });

  if (isNumberedList) {
    let md = '';
    for (const row of rows) {
      let num = row[0].trim();
      if (!num.endsWith('.')) num += '.'; 
      md += `${num} **${row[1].trim()}**\n`; 
    }
    return md + '\n';
  }

  const allCells = rows.flat().map(c => c.trim()).filter(c => c.length > 0);
  const doDontCount = allCells.filter(cell => {
    const lower = cell.toLowerCase();
    return lower.startsWith('do ') || lower.startsWith("don't ") || lower.startsWith("don’t ");
  }).length;
  
  const isGuidelineList = doDontCount > 0 && (doDontCount / allCells.length) >= 0.3;

  if (isGuidelineList) {
    let md = '';
    for (const cell of allCells) {
      let formattedCell = cell;
      const lower = cell.toLowerCase();
      if (lower.startsWith('do ')) {
         formattedCell = `**Do:** ${cell.substring(3).trim()}`;
      } else if (lower.startsWith("don't ")) {
         formattedCell = `**Don't:** ${cell.substring(6).trim()}`;
      } else if (lower.startsWith("don’t ")) {
         formattedCell = `**Don't:** ${cell.substring(6).trim()}`;
      }
      md += `- ${formattedCell}\n`;
    }
    return md + '\n';
  }
  
  const numCols = Math.max(...rows.map(r => r.length));
  const paddedRows = rows.map(row => {
    const padded = [...row];
    while (padded.length < numCols) padded.push('');
    return padded;
  });

  let md = '\n';
  md += `| ${paddedRows[0].join(' | ')} |\n`;
  md += `| ${Array(numCols).fill('---').join(' | ')} |\n`;
  for (let i = 1; i < paddedRows.length; i++) {
    md += `| ${paddedRows[i].join(' | ')} |\n`;
  }
  return md + '\n';
}

function extractNodesNormally(node: FigmaNode): string[] {
  let blocks: string[] = [];
  if (node.type === 'TEXT' && node.characters) {
    blocks.push(node.characters.trim());
    return blocks;
  }
  
  if (isIconNode(node)) {
    const resolvedName = resolveIconName(node);
    blocks.push(resolvedName);
    return blocks;
  }

  if (node.children) {
    if (node.layoutMode === 'VERTICAL') {
      let currentTableRows: string[][] = [];
      const flushTable = () => {
        if (currentTableRows.length >= 2) {
          const maxCols = Math.max(...currentTableRows.map(r => r.length));
          if (maxCols >= 2) {
            blocks.push(formatMarkdownTableOrList(currentTableRows));
          } else {
            currentTableRows.forEach(row => {
              const rowText = row.filter(c => c).join(' ');
              if (rowText) blocks.push(rowText);
            });
          }
        } else if (currentTableRows.length === 1) {
          const rowText = currentTableRows[0].filter(c => c).join(' ');
          if (rowText) blocks.push(rowText);
        }
        currentTableRows = [];
      };

      for (const child of node.children) {
        if (child.layoutMode === 'HORIZONTAL' || child.layoutMode === 'GRID') {
          let isValidRow = true;
          if (child.layoutMode === 'HORIZONTAL') {
            const hasVertical = (n: FigmaNode): boolean => {
              if (n.layoutMode === 'VERTICAL') return true;
              return (n.children || []).some(hasVertical);
            };
            if (hasVertical(child)) isValidRow = false;
          }
          if (isValidRow) {
            currentTableRows.push(...getTableRows(child));
          } else {
            flushTable();
            blocks.push(...extractNodesNormally(child));
          }
        } else {
          flushTable();
          blocks.push(...extractNodesNormally(child));
        }
      }
      flushTable();
    } else if (node.layoutMode === 'GRID') {
      const rows = getTableRows(node);
      if (rows.length >= 2) {
         blocks.push(formatMarkdownTableOrList(rows));
      } else {
         rows.forEach(r => {
           const rowText = r.filter(c => c).join(' ');
           if (rowText) blocks.push(rowText);
         });
      }
    } else if (node.layoutMode === 'HORIZONTAL') {
      let rowTexts: string[] = [];
      for (const child of node.children) {
        rowTexts.push(...extractNodesNormally(child));
      }
      if (rowTexts.length > 0) blocks.push(rowTexts.join(' '));
    } else {
      if (node.type === 'FRAME' || node.type === 'INSTANCE' || node.type === 'COMPONENT') {
        return blocks; 
      }
      for (const child of node.children) {
        blocks.push(...extractNodesNormally(child));
      }
    }
  }
  return blocks;
}

function compileMetadata(node: FigmaNode): string {
  const blocks = extractNodesNormally(node);
  const validBlocks = blocks.filter(b => b.trim().length > 0);
  return validBlocks.join('\n\n');
}

function extractVisualBlueprint(componentSet: FigmaNode): string {
  if (!componentSet.children || componentSet.children.length === 0) return '';
  
  // Changed from ## to ###
  let bp = `### 🏗️ Visual Blueprint (Strict AST)\n`;
  bp += `*The LLM MUST strictly adhere to the following DOM structure and CSS properties. Map all token names to the target framework.*\n\n`;

  const resolveProp = (propName: string, node: FigmaNode, fallbackValue: any) => {
    if (node.boundVariables && node.boundVariables[propName]) {
      const varId = node.boundVariables[propName].id;
      return `var(--${tokenDictionary[varId] || varId})`;
    }
    return `${fallbackValue}px`;
  };

  const extractStructure = (n: FigmaNode, indent: string = ''): string => {
    let nodeDisplayName = n.name;
    if (isIconNode(n)) {
      nodeDisplayName = `Icon: ${resolveIconName(n)}`;
    }
    let s = `${indent}- **Node:** \`${nodeDisplayName}\` (${n.type})\n`;

    if (n.layoutMode && n.layoutMode !== 'NONE') {
      s += `${indent}  - **Layout:** Flex ${n.layoutMode} (Justify: ${n.primaryAxisAlignItems}, Align: ${n.counterAxisAlignItems})\n`;
      s += `${indent}  - **Sizing:** W: ${n.layoutSizingHorizontal}, H: ${n.layoutSizingVertical}\n`;
      
      const pT = resolveProp('paddingTop', n, n.paddingTop);
      const pB = resolveProp('paddingBottom', n, n.paddingBottom);
      const pL = resolveProp('paddingLeft', n, n.paddingLeft);
      const pR = resolveProp('paddingRight', n, n.paddingRight);
      const gap = resolveProp('itemSpacing', n, n.itemSpacing);
      
      s += `${indent}  - **Padding:** T:${pT} B:${pB} L:${pL} R:${pR}\n`;
      s += `${indent}  - **Gap:** ${gap}\n`;
    }
    
    if (n.boundVariables?.fills && n.boundVariables.fills.length > 0) {
       const fillVarId = n.boundVariables.fills[0].id;
       s += `${indent}  - **Fill:** \`var(--${tokenDictionary[fillVarId] || fillVarId})\`\n`;
    }

    if (n.children) {
      s += `${indent}  - *Children:*\n`;
      for (const child of n.children) {
        s += extractStructure(child, indent + '    ');
      }
    }
    return s;
  };

  const variantsToExtract = componentSet.children.slice(0, 3);
  
  for (const variant of variantsToExtract) {
    // Changed from ### to #### to maintain proper nesting
    bp += `#### Variant: \`${variant.name}\`\n`;
    bp += extractStructure(variant);
    bp += `\n`;
  }

  if (componentSet.children.length > 3) {
    bp += `*(Note: Additional variants exist but structural logic remains identical. Adapt token mapping based on Variant Prop Enums).*\n`;
  }
  return bp;
}

function parsePageForComponents(page: FigmaNode, results: ComponentSetContext[]) {
  const componentSets: FigmaNode[] = [];
  const metadataFrames = new Map<string, FigmaNode>();

  function traverse(node: FigmaNode) {
    if (node.type === 'COMPONENT_SET') {
      componentSets.push(node);
      return; 
    }
    if (node.name.endsWith(' Metadata')) {
      metadataFrames.set(node.name, node);
    }
    if (node.children) {
      for (const child of node.children) {
        traverse(child);
      }
    }
  }

  traverse(page);

  for (const comp of componentSets) {
    const targetMetadataName = `${comp.name} Metadata`;
    const metadataNode = metadataFrames.get(targetMetadataName);
    
    let metadataText = '';
    if (metadataNode) {
      metadataText = compileMetadata(metadataNode);
    }

    results.push({
      pageName: page.name,
      node: comp,
      metadataText: metadataText
    });
  }
}

function sanitizeFilename(name: string): string {
  return name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
}

function generateMarkdownContent(context: ComponentSetContext): string {
  const { pageName, node, metadataText } = context;
  const props = node.componentPropertyDefinitions || {};
  
  let md = `# Component: ${node.name}\n\n`;
  md += `**Figma ID:** \`${node.id}\`\n`;
  md += `**Source Page:** ${pageName}\n\n`;
  
  // Changed from ## to ###
  md += `### Properties (Variants)\n`;
  md += `The LLM must expose these as props/parameters in the target language:\n\n`;
  
  const propKeys = Object.keys(props);
  if (propKeys.length === 0) {
    md += `- *No variant properties defined in Figma.*\n\n`;
  } else {
    for (const key of propKeys) {
      const propData = props[key];
      const cleanName = key.split('#')[0]; 
      
      md += `- \`${cleanName}\`: `;
      if (propData.type === 'VARIANT' && propData.variantOptions) {
        md += `Enum [${propData.variantOptions.map(opt => `"${opt}"`).join(', ')}]`;
      } else {
        md += `${propData.type}`;
      }
      md += ` (Default: \`${propData.defaultValue}\`)\n`;
    }
    md += `\n`;
  }

  md += extractVisualBlueprint(node);
  md += `\n---\n\n`;

  if (metadataText) {
    // Changed from ## to ###
    md += `### Design Metadata & Intent\n`;
    md += `*The following rules and descriptions were extracted directly from the Figma design system specifications.*\n\n`;
    md += `${metadataText}\n\n`;
  }

  return md;
}

/**
 * EXPORTED ORCHESTRATOR
 * This function returns a list of the generated component filenames (e.g. ['button', 'avatar']).
 */
export async function extractComponents(): Promise<string[]> {
  console.log(`\n===========================================`);
  console.log(`🛠️  STARTING COMPONENT EXTRACTION `);
  console.log(`===========================================\n`);
  
  console.log(`🧹 Cleaning output directory: ${OUTPUT_DIR}...`);
  await fs.rm(OUTPUT_DIR, { recursive: true, force: true });
  await buildTokenDictionary();

  const document = await fetchFigmaDocument();
  await fs.mkdir(OUTPUT_DIR, { recursive: true });
  
  const allComponentSets: ComponentSetContext[] = [];
  for (const page of document.children || []) {
    if (page.type === 'CANVAS') {
      if (IGNORED_PAGES.includes(page.name)) {
        console.log(`⏭️  Skipping page: ${page.name}`);
        continue;
      }
      parsePageForComponents(page, allComponentSets);
    }
  }

  console.log(`\nFound ${allComponentSets.length} Component Sets.`);
  
  const generatedFiles: string[] = [];

  for (const comp of allComponentSets) {
    const markdown = generateMarkdownContent(comp);
    const safeName = sanitizeFilename(comp.node.name);
    const filename = `${safeName}.md`;
    const filepath = path.join(OUTPUT_DIR, filename);
    
    await fs.writeFile(filepath, markdown, 'utf8');
    generatedFiles.push(safeName); // Pass back the clean filename slug

    const metadataStatus = comp.metadataText ? "🏷️  (Includes Metadata)" : "";
    console.log(`✅ Created: ${filename} ${metadataStatus}`);
  }

  console.log(`\n🎉 Component Extraction complete!\n`);
  return generatedFiles;
}

// Auto-run if executed directly via CLI
const isMain = typeof require !== 'undefined' ? require.main === module : process.argv[1]?.endsWith('components-md.ts');
if (isMain) {
  extractComponents().catch(console.error);
}
