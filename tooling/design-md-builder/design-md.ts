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

// Note: "Components" is now added to AUTO_GEN_SECTIONS
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

function formatKeysToNestedList(obj: Record<string, string>, descriptions: Record<string, string>): string {
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
      result += `${indent}- **${segmentName}:**\n`;
    }
    
    const leafIndex = displayParts.length - 1;
    const indent = "  ".repeat(leafIndex);
    const leafName = capitalizeSegment(displayParts[leafIndex]);
    
    const desc = descriptions[key] ? descriptions[key] : "";
    const descText = desc ? " " + desc : ""; 
    
    result += `${indent}- **${leafName} (\`${key}\`)**${descText}\n`;

    currentPath = displayParts.slice(0, -1);
  }

  return result.trim();
}

async function main() {
  try {
    // ---------------------------------------------------------
    // PHASE 1: COMPONENT EXTRACTION ORCHESTRATION
    // ---------------------------------------------------------
    const generatedComponents = await extractComponents();

    // Convert component slugs to visually clean names (e.g. "text_input" -> "Text Input")
    const formattedComponentList = generatedComponents.map(c => {
      const visualName = c.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      return `- [${visualName}](./components/${c}.md)`;
    }).join('\n');

    // Build the nested component YAML tree map
    const componentsTree: TokenTree = {};
    for (const comp of generatedComponents) {
       componentsTree[comp] = `./components/${comp}.md`;
    }

    // ---------------------------------------------------------
    // PHASE 2: VARIABLES EXTRACTION
    // ---------------------------------------------------------
    console.log(`\n===========================================`);
    console.log(`🎨 STARTING DESIGN TOKENS EXTRACTION`);
    console.log(`===========================================\n`);

    const url = "https://api.figma.com/v1/files/" + FILE_KEY + "/variables/local";
    const response = await fetch(url, { headers });
    
    if (!response.ok) {
      throw new Error("Figma API Error: " + response.status);
    }
    
    const data = await response.json();
    const variables = data.meta?.variables || {};
    const collections = data.meta?.variableCollections || {};
    
    const semanticCollectionIds = new Set<string>();
    const primitiveCollectionIds = new Set<string>();

    for (const [colId, col] of Object.entries(collections)) {
      const colName = (col as any).name;
      if (colName === "Semantics") {
        semanticCollectionIds.add(colId);
      } else if (colName === "Primitives") {
        primitiveCollectionIds.add(colId);
      }
    }

    const varDictDot: Record<string, string> = {}; 

    for (const varId in variables) {
      const v = variables[varId];
      const isSem = semanticCollectionIds.has(v.variableCollectionId);
      const prefix = isSem ? "" : "primitives."; 
      
      const parts = v.name.toLowerCase().split('/');
      varDictDot[varId] = prefix + parts.join('.');
    }

    const primitivesTree: TokenTree = {};
    const semanticColorsTree: TokenTree = {};
    const semanticTypographyTree: TokenTree = {};
    const semanticLayoutTree: TokenTree = {};
    const semanticShapesTree: TokenTree = {}; 

    const semanticColorsFlat: Record<string, string> = {};
    const semanticTypographyFlat: Record<string, string> = {};
    const semanticLayoutFlat: Record<string, string> = {};
    const semanticShapesFlat: Record<string, string> = {};

    for (const varId in variables) {
      const v = variables[varId];
      if (v.remote === true) continue;
      if (v.resolvedType === 'BOOLEAN') continue;

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
      const dotPath = parts.map(p => p.startsWith('-') ? 'negative.' + p.substring(1) : p).join('.');

      if (primitiveCollectionIds.has(v.variableCollectionId)) {
        setNested(primitivesTree, parts, finalValue);
      } else if (semanticCollectionIds.has(v.variableCollectionId)) {
        
        let treeParts = [...parts];
        if (['color', 'spacing', 'radius', 'type', 'dimension', 'font', 'size'].includes(treeParts[0])) {
          treeParts.shift();
        }

        if (v.resolvedType === 'COLOR') {
          setNested(semanticColorsTree, treeParts, finalValue); 
          semanticColorsFlat[dotPath] = finalValue; 
        } else {
          const isTypo = dotPath.includes('font') || dotPath.includes('text') || dotPath.includes('type') || dotPath.includes('lineheight');
          const isShape = dotPath.includes('radius'); 

          if (isTypo) {
            setNested(semanticTypographyTree, treeParts, finalValue);
            semanticTypographyFlat[dotPath] = finalValue;
          } else if (isShape) {
            setNested(semanticShapesTree, treeParts, finalValue);
            semanticShapesFlat[dotPath] = finalValue;
          } else {
            setNested(semanticLayoutTree, treeParts, finalValue);
            semanticLayoutFlat[dotPath] = finalValue;
          }
        }
      }
    }

    logVerbose("   - Primitives and Semantic mappings established.");

    // --- SMART PARSE EXISTING DESIGN.MD & EXTRACT DEFINITIONS ---
    const savedSections: Record<string, string> = {};
    const savedTokenDescriptions: Record<string, string> = {}; 
    const savedIntroTexts: Record<string, string> = {}; 
    
    try {
      logVerbose("📝 Checking for existing DESIGN.md file to preserve manual edits...");
      const existingContent = await fs.readFile(OUTPUT_FILE, 'utf8');
      const lines = existingContent.split('\n');
      
      let currentSection = 'FRONTMATTER';
      let inTokenList = false;
      savedSections[currentSection] = '';

      for (const line of lines) {
        const headerMatch = line.match(/^##\s+(.*)/);
        
        if (headerMatch && headerMatch[1]) {
          let headerName = headerMatch[1].trim();
          if (headerName.includes("Do")) headerName = "Do's and Don'ts";
          
          currentSection = headerName;
          savedSections[currentSection] = '';
          inTokenList = false;
          
          if (AUTO_GEN_SECTIONS.includes(currentSection)) {
            savedIntroTexts[currentSection] = '';
          }
        } else {
          if (AUTO_GEN_SECTIONS.includes(currentSection)) {
            const tokenMatch = line.match(/^\s*[-*]\s+\*\*.*?\(`(.*?)`\)[^]*?\*\*[ \t]*:?[ \t]*(.*)/);
            const listMatch = line.match(/^\s*[-*]\s+\*\s*/);
            
            // Special case for components list logic
            if (currentSection === "Components" && line.trim().startsWith('- [')) {
              inTokenList = true;
            } else if (tokenMatch) {
              inTokenList = true;
              const key = tokenMatch[1];
              const desc = tokenMatch[2].trim();
              if (desc) savedTokenDescriptions[key] = desc; 
            } else if (listMatch) {
              inTokenList = true;
            } else if (!inTokenList) {
              savedIntroTexts[currentSection] += line + '\n';
            }
          } else {
            savedSections[currentSection] += line + '\n';
          }
        }
      }

      for (const key of Object.keys(savedIntroTexts)) {
        savedIntroTexts[key] = savedIntroTexts[key].trim();
      }

      logVerbose("   - Preserved manual sections, intro texts, and inline descriptions successfully.");
    } catch (e) {
       logVerbose("✨ No existing DESIGN.md found. Creating a fresh template...");
    }

    logVerbose("🏗️  Reassembling the DESIGN.md document...");

    // --- REASSEMBLE THE MULTI-TIER YAML FRONT MATTER ---
    const newFrontmatter = "---\n" +
      "version: 1.0.0\n" +
      "name: Zebra Companion Design System\n" +
      "description: Multi-tier adaptive token identity. Color-agnostic design systems logic.\n\n" +
      "# 1. Global Spectrum Palette (Primitives)\n" +
      "primitives:\n" +
      treeToYaml(primitivesTree, '  ') +
      "# 2. Semantic Mapping Roles (Semantics)\n" +
      "colors:\n" +
      treeToYaml(semanticColorsTree, '  ') +
      "typography:\n" +
      treeToYaml(semanticTypographyTree, '  ') +
      "layout:\n" +
      treeToYaml(semanticLayoutTree, '  ') +
      "shapes:\n" +
      treeToYaml(semanticShapesTree, '  ') +
      "# 3. Component Map\n" +
      "components:\n" +
      treeToYaml(componentsTree, '  ') +
      "---\n\n";

    // Populate Auto-Generated sections for Markdown Body
    const colorsIntro = getSectionIntroText('Colors', savedIntroTexts);
    savedSections['Colors'] = colorsIntro + (colorsIntro ? "\n\n" : "") + formatKeysToNestedList(semanticColorsFlat, savedTokenDescriptions) + "\n";
    
    const typoIntro = getSectionIntroText('Typography', savedIntroTexts);
    savedSections['Typography'] = typoIntro + (typoIntro ? "\n\n" : "") + formatKeysToNestedList(semanticTypographyFlat, savedTokenDescriptions) + "\n";
    
    const layoutIntro = getSectionIntroText('Layout & Spacing', savedIntroTexts);
    savedSections['Layout & Spacing'] = layoutIntro + (layoutIntro ? "\n\n" : "") + formatKeysToNestedList(semanticLayoutFlat, savedTokenDescriptions) + "\n";
    
    const shapesIntro = getSectionIntroText('Shapes', savedIntroTexts);
    savedSections['Shapes'] = shapesIntro + (shapesIntro ? "\n\n" : "") + formatKeysToNestedList(semanticShapesFlat, savedTokenDescriptions) + "\n";

    const compIntro = getSectionIntroText('Components', savedIntroTexts);
    savedSections['Components'] = compIntro + (compIntro ? "\n\n" : "") + formattedComponentList + "\n";

    let finalMarkdown = newFrontmatter;

    for (const section of SECTION_ORDER) {
      finalMarkdown += "## " + section + "\n\n";
      const sectionContent = savedSections[section] || getDefaultSectionText(section);
      finalMarkdown += sectionContent.trim() + "\n\n";
    }

    logVerbose("💾 Writing to disk at: " + OUTPUT_FILE);
    await fs.mkdir(path.dirname(OUTPUT_FILE), { recursive: true });
    await fs.writeFile(OUTPUT_FILE, finalMarkdown, 'utf8');
    
    console.log("🎉 Successfully synchronized Tokens, Components, and DESIGN.md!");
    
  } catch (error) {
    console.error("\n❌ Script failed with error:", error);
  }
}

main();
