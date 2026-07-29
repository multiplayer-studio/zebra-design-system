/**
 * ============================================================================
 * Figma Variables to DESIGN.md Generator (Master Orchestrator Edition)
 * ============================================================================
 * 
 * WHAT IT DOES:
 * 1. IMPORTS & RUNS the Component Extractor automatically, waiting for it to finish.
 * 2. Fetches Local Variables from the Figma API.
 * 3. Builds multi-tier YAML blocks and maps the newly generated Component paths.
 * 4. SMART MERGE: Preserves manual text and descriptions for ALL sections.
 * 5. Re-assembles the fully synced DESIGN.md file perfectly.
 * 
 * RUN COMMAND:
 * FIGMA_ACCESS_TOKEN="your_token_here" npx tsx scripts/design-md.ts [--verbose]
 * ============================================================================
 */

import * as fs from 'fs/promises';
import * as path from 'path';

// Import the component extractor logic
import { extractComponents } from './components-md.ts'; 

// --- Configuration ---
const FILE_KEY = 'H2HFgaEYnI6Fv8UxZXQPnk';
const OUTPUT_FILE = path.join(__dirname, '../../documentation/DESIGN.md'); 
const FIGMA_TOKEN = process.env.FIGMA_ACCESS_TOKEN;

if (!FIGMA_TOKEN) {
  console.error("❌ Error: FIGMA_ACCESS_TOKEN environment variable is missing.");
  process.exit(1);
}

const isVerbose = process.argv.includes('--verbose');
function logVerbose(message: string) {
  if (isVerbose) {
    console.log(message);
  }
}

const headers = {
  'X-Figma-Token': FIGMA_TOKEN,
  'Content-Type': 'application/json'
};

const SECTION_ORDER = [
  "Overview",
  "Colors",
  "Typography",
  "Layout & Spacing",
  "Elevation & Depth",
  "Shapes",
  "Components",
  "Do's and Don'ts"
];

const AUTO_GEN_SECTIONS = ["Colors", "Typography", "Layout & Spacing", "Shapes", "Components"];

type TokenTree = { [key: string]: TokenTree | string };

// --- Utility Functions ---

function setNested(obj: TokenTree, pathKeys: string[], value: string) {
  let current = obj;
  for (let i = 0; i < pathKeys.length - 1; i++) {
    const p = pathKeys[i];
    if (!current[p]) current[p] = {};
    current = current[p] as TokenTree;
  }
  current[pathKeys[pathKeys.length - 1]] = value;
}

function treeToYaml(tree: TokenTree, indent: string = '  '): string {
  if (Object.keys(tree).length === 0) return indent + "# None found\n";
  let yaml = '';
  
  for (const key of Object.keys(tree).sort()) {
    const value = tree[key];
    const safeKey = /^[0-9-]+$/.test(key) ? '"' + key + '"' : key;
    
    if (typeof value === 'string') {
      yaml += indent + safeKey + ': "' + value + '"\n';
    } else {
      yaml += indent + safeKey + ':\n';
      yaml += treeToYaml(value, indent + '  ');
    }
  }
  return yaml;
}

function getDefaultSectionText(section: string): string {
  switch (section) {
    case "Overview": return "*(Define high-level architecture and system goals here)*";
    case "Elevation & Depth": return "*(Define elevation layers, shadows, and z-indexes here)*";
    case "Shapes": return "*(Define corner radii and structural shapes here)*";
    case "Components": return "*Component specifications automatically generated from Figma.*\n\n*(No components found)*";
    case "Do's and Don'ts": return "- **Do:**\n- **Don't:**";
    default: return "";
  }
}

function getSectionIntroText(section: string, savedIntros: Record<string, string>): string {
  if (savedIntros[section] !== undefined && savedIntros[section].trim().length > 0) {
    return savedIntros[section];
  }
  
  switch (section) {
    case "Colors": return "*Theme-agnostic semantic color variables. Automatically injected from Figma.*";
    case "Typography": return "*Semantic typography variables. Automatically injected from Figma.*";
    case "Layout & Spacing": return "*Structural sizing and spacing variables. Automatically injected from Figma.*";
    case "Shapes": return "*Corner radii variables mapped to their structural semantics. Automatically injected from Figma.*";
    case "Components": return "*Component specifications automatically generated from Figma.*";
    default: return "";
  }
}

function rgbaToHex(r: number, g: number, b: number, a: number = 1): string {
  const toHex = (n: number) => Math.round(n * 255).toString(16).padStart(2, '0').toUpperCase();
  if (a < 1) {
    return "#" + toHex(r) + toHex(g) + toHex(b) + toHex(a);
  }
  return "#" + toHex(r) + toHex(g) + toHex(b);
}

function formatKeysToNestedList(
  obj: Record<string, string>, 
  descriptions: Record<string, string>,
  intermediateDescriptions: Record<string, string>
): string {
  const keys = Object.keys(obj).sort();
  let result = "";
  let currentPath: string[] = [];
  
  function capitalizeSegment(segment: string): string {
    return segment.split('-')
      .filter(word => word.length > 0)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
  
  for (const key of keys) {
    const fullParts = key.split('.');
    
    let displayParts = [...fullParts];
    if (['color', 'spacing', 'radius', 'rounded', 'type', 'dimension', 'font', 'size'].includes(displayParts[0])) {
      displayParts.shift();
    }
    if (displayParts.length === 0) displayParts = [key];
    
    let divergenceIndex = 0;
    while (
      divergenceIndex < displayParts.length - 1 && 
      divergenceIndex < currentPath.length && 
      displayParts[divergenceIndex] === currentPath[divergenceIndex]
    ) {
      divergenceIndex++;
    }
    
    for (let i = divergenceIndex; i < displayParts.length - 1; i++) {
      const indent = "  ".repeat(i);
      const segmentName = capitalizeSegment(displayParts[i]);
      
      // Look up if this exact intermediate group path had a description previously saved
      const pathKey = displayParts.slice(0, i + 1).map(capitalizeSegment).join(' > ');
      const desc = intermediateDescriptions[pathKey] ? " " + intermediateDescriptions[pathKey] : "";
      
      result += `${indent}- **${segmentName}:**${desc}\n`;
    }
    
    const leafIndex = displayParts.length - 1;
    const indent = "  ".repeat(leafIndex);
    const leafName = capitalizeSegment(displayParts[leafIndex]);
    
    const desc = descriptions[key] ? descriptions[key] : "";
    const descText = desc ? " " + desc : ""; 
    
    // Add the colon explicitly to all leaf variables per user request
    result += `${indent}- **${leafName} (\`${key}\`):**${descText}\n`;
    currentPath = displayParts.slice(0, -1);
  }
  return result.trim();
}

// --- Extraction & Processing Functions ---

async function processComponents() {
  const generatedComponents = await extractComponents();
  
  const formattedComponentList = generatedComponents.map(c => {
    const visualName = c.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    return `- [${visualName}](./components/${c}.md)`;
  }).join('\n');

  const componentsTree: TokenTree = {};
  for (const comp of generatedComponents) {
     componentsTree[comp] = `./components/${comp}.md`;
  }

  return { formattedComponentList, componentsTree };
}

async function fetchFigmaVariables() {
  console.log(`\n===========================================`);
  console.log(`🎨 STARTING DESIGN TOKENS EXTRACTION`);
  console.log(`===========================================\n`);

  const url = "https://api.figma.com/v1/files/" + FILE_KEY + "/variables/local";
  const response = await fetch(url, { headers });
  
  if (!response.ok) {
    throw new Error("Figma API Error: " + response.status);
  }
  
  const data = await response.json();
  return {
    variables: data.meta?.variables || {},
    collections: data.meta?.variableCollections || {}
  };
}

function mapFigmaVariables(variables: any, collections: any) {
  const semanticCollectionIds = new Set<string>();
  const primitiveCollectionIds = new Set<string>();
  
  for (const [colId, col] of Object.entries(collections)) {
    const colName = (col as any).name;
    if (colName === "Semantics") semanticCollectionIds.add(colId);
    else if (colName === "Primitives") primitiveCollectionIds.add(colId);
  }

  const varDictDot: Record<string, string> = {}; 
  for (const varId in variables) {
    const v = variables[varId];
    const isSem = semanticCollectionIds.has(v.variableCollectionId);
    const prefix = isSem ? "" : "primitives."; 
    const parts = v.name.toLowerCase().split('/');
    varDictDot[varId] = prefix + parts.join('.');
  }

  const trees = {
    primitives: {} as TokenTree,
    semanticColors: {} as TokenTree,
    semanticTypography: {} as TokenTree,
    semanticLayout: {} as TokenTree,
    semanticShapes: {} as TokenTree
  };

  const flats = {
    semanticColors: {} as Record<string, string>,
    semanticTypography: {} as Record<string, string>,
    semanticLayout: {} as Record<string, string>,
    semanticShapes: {} as Record<string, string>
  };

  for (const varId in variables) {
    const v = variables[varId];
    if (v.remote === true || v.resolvedType === 'BOOLEAN') continue;
    
    const modeKeys = Object.keys(v.valuesByMode);
    if (modeKeys.length === 0) continue;
    
    const rawValue = v.valuesByMode[modeKeys[0]];
    let finalValue = "";
    
    if (typeof rawValue === 'object' && rawValue.type === 'VARIABLE_ALIAS') {
      const targetName = varDictDot[rawValue.id];
      finalValue = "{" + targetName + "}"; 
    } 
    else if (v.resolvedType === 'COLOR') {
      finalValue = rgbaToHex(rawValue.r, rawValue.g, rawValue.b, rawValue.a);
    } 
    else {
      finalValue = rawValue.toString();
      if (v.resolvedType === 'FLOAT' && !finalValue.includes('%') && !finalValue.includes('px')) {
          finalValue += 'px';
      }
    }

    const parts = v.name.toLowerCase().split('/');
    const dotPath = parts.map((p: string) => p.startsWith('-') ? 'negative.' + p.substring(1) : p).join('.');

    if (primitiveCollectionIds.has(v.variableCollectionId)) {
      setNested(trees.primitives, parts, finalValue);
    } else if (semanticCollectionIds.has(v.variableCollectionId)) {
      let treeParts = [...parts];
      if (['color', 'spacing', 'radius', 'type', 'dimension', 'font', 'size'].includes(treeParts[0])) {
        treeParts.shift();
      }
      if (v.resolvedType === 'COLOR') {
        setNested(trees.semanticColors, treeParts, finalValue); 
        flats.semanticColors[dotPath] = finalValue; 
      } else {
        const isTypo = dotPath.includes('font') || dotPath.includes('text') || dotPath.includes('type') || dotPath.includes('lineheight');
        const isShape = dotPath.includes('radius'); 
        
        if (isTypo) {
          setNested(trees.semanticTypography, treeParts, finalValue);
          flats.semanticTypography[dotPath] = finalValue;
        } else if (isShape) {
          setNested(trees.semanticShapes, treeParts, finalValue);
          flats.semanticShapes[dotPath] = finalValue;
        } else {
          setNested(trees.semanticLayout, treeParts, finalValue);
          flats.semanticLayout[dotPath] = finalValue;
        }
      }
    }
  }

  logVerbose("   - Primitives and Semantic mappings established.");
  return { trees, flats };
}

async function parseExistingDesignMd() {
  const saved = {
    sections: {} as Record<string, string>,
    tokenDescriptions: {} as Record<string, string>,
    intermediateDescriptions: {} as Record<string, string>,
    introTexts: {} as Record<string, string>
  };

  try {
    logVerbose("📝 Checking for existing DESIGN.md file to preserve manual edits...");
    const existingContent = await fs.readFile(OUTPUT_FILE, 'utf8');
    const lines = existingContent.split('\n');
    
    let currentSection = 'FRONTMATTER';
    let inTokenList = false;
    let currentPathStack: { name: string, indent: number }[] = [];
    saved.sections[currentSection] = '';

    for (const line of lines) {
      const headerMatch = line.match(/^##\s+(.*)/);
      
      if (headerMatch && headerMatch[1]) {
        let headerName = headerMatch[1].trim();
        if (headerName.includes("Do")) headerName = "Do's and Don'ts";
        
        currentSection = headerName;
        saved.sections[currentSection] = '';
        inTokenList = false;
        currentPathStack = []; // Reset nesting path on new section
        
        if (AUTO_GEN_SECTIONS.includes(currentSection)) {
          saved.introTexts[currentSection] = '';
        }
      } else {
        if (AUTO_GEN_SECTIONS.includes(currentSection)) {
          // Track nesting level
          const indentMatch = line.match(/^(\s*)/);
          const indentLength = indentMatch ? indentMatch[1].length : 0;
          
          // Match token leaves e.g. `- **Brand (`color.bg`):** some desc`
          const leafMatch = line.match(/^\s*[-*]\s+\*\*.*?\(`(.*?)`\)[^*]*\*\*:?\s*(.*)/);
          // Match intermediate nodes e.g. `- **Background:** some desc`
          const intermediateMatch = line.match(/^\s*[-*]\s+\*\*(.*?):?\*\*:?\s*(.*)/);

          if (currentSection === "Components" && line.trim().startsWith('- [')) {
            inTokenList = true;
          } else if (leafMatch) {
            inTokenList = true;
            const key = leafMatch[1];
            const desc = leafMatch[2].trim();
            if (desc) saved.tokenDescriptions[key] = desc; 
          } else if (intermediateMatch && !line.includes('(`')) {
            inTokenList = true;
            const segmentNameRaw = intermediateMatch[1].trim();
            const desc = intermediateMatch[2].trim();
            
            // Re-align the path stack to our current indentation
            while (currentPathStack.length > 0 && currentPathStack[currentPathStack.length - 1].indent >= indentLength) {
              currentPathStack.pop();
            }
            currentPathStack.push({ name: segmentNameRaw, indent: indentLength });
            
            if (desc) {
              const pathKey = currentPathStack.map(p => p.name).join(' > ');
              saved.intermediateDescriptions[pathKey] = desc;
            }
          } else if (!inTokenList) {
            saved.introTexts[currentSection] += line + '\n';
          }
        } else {
          saved.sections[currentSection] += line + '\n';
        }
      }
    }

    for (const key of Object.keys(saved.introTexts)) {
      saved.introTexts[key] = saved.introTexts[key].trim();
    }
    logVerbose("   - Preserved manual sections, intro texts, and inline descriptions successfully.");
  } catch (e) {
     logVerbose("✨ No existing DESIGN.md found. Creating a fresh template...");
  }

  return saved;
}

function assembleFrontmatter(trees: any, componentsTree: TokenTree): string {
  return "---\n" +
    "version: 1.0.0\n" +
    "name: Zebra Companion Design System\n" +
    "description: Multi-tier adaptive token identity. Color-agnostic design systems logic.\n\n" +
    "# 1. Global Spectrum Palette (Primitives)\n" +
    "primitives:\n" + treeToYaml(trees.primitives, '  ') +
    "# 2. Semantic Mapping Roles (Semantics)\n" +
    "colors:\n" + treeToYaml(trees.semanticColors, '  ') +
    "typography:\n" + treeToYaml(trees.semanticTypography, '  ') +
    "layout:\n" + treeToYaml(trees.semanticLayout, '  ') +
    "shapes:\n" + treeToYaml(trees.semanticShapes, '  ') +
    "# 3. Component Map\n" +
    "components:\n" + treeToYaml(componentsTree, '  ') +
    "---\n\n";
}

function assembleMarkdownBody(
  savedSections: Record<string, string>, 
  savedIntros: Record<string, string>, 
  savedDescriptions: Record<string, string>, 
  savedIntermediateDescriptions: Record<string, string>,
  flats: any, 
  formattedComponentList: string
): string {
  
  const populateSection = (sectionName: string, flatData: Record<string, string>, listStr?: string) => {
    const intro = getSectionIntroText(sectionName, savedIntros);
    const content = listStr ?? formatKeysToNestedList(flatData, savedDescriptions, savedIntermediateDescriptions);
    savedSections[sectionName] = intro + (intro ? "\n\n" : "") + content + "\n";
  };

  populateSection('Colors', flats.semanticColors);
  populateSection('Typography', flats.semanticTypography);
  populateSection('Layout & Spacing', flats.semanticLayout);
  populateSection('Shapes', flats.semanticShapes);
  populateSection('Components', {}, formattedComponentList);

  let markdownBody = "";
  for (const section of SECTION_ORDER) {
    markdownBody += "## " + section + "\n\n";
    const sectionContent = savedSections[section] || getDefaultSectionText(section);
    markdownBody += sectionContent.trim() + "\n\n";
  }

  return markdownBody;
}

async function writeOutput(finalMarkdown: string) {
  logVerbose("💾 Writing to disk at: " + OUTPUT_FILE);
  await fs.mkdir(path.dirname(OUTPUT_FILE), { recursive: true });
  await fs.writeFile(OUTPUT_FILE, finalMarkdown, 'utf8');
  console.log("🎉 Successfully synchronized Tokens, Components, and DESIGN.md!");
}

// ============================================================================
// MAIN ORCHESTRATOR
// ============================================================================

async function main() {
  try {
    // 1. Component Extraction Phase
    const { formattedComponentList, componentsTree } = await processComponents();

    // 2. Figma Data Fetch Phase
    const { variables, collections } = await fetchFigmaVariables();

    // 3. Variables Mapping Phase
    const { trees, flats } = mapFigmaVariables(variables, collections);

    // 4. File Parsing Phase
    const saved = await parseExistingDesignMd();

    // 5. Document Assembly Phase
    logVerbose("🏗️  Reassembling the DESIGN.md document...");
    const frontmatter = assembleFrontmatter(trees, componentsTree);
    const markdownBody = assembleMarkdownBody(
      saved.sections, 
      saved.introTexts, 
      saved.tokenDescriptions, 
      saved.intermediateDescriptions,
      flats, 
      formattedComponentList
    );

    // 6. Write to Disk
    await writeOutput(frontmatter + markdownBody);

  } catch (error) {
    console.error("\n❌ Script failed with error:", error);
  }
}

main();
