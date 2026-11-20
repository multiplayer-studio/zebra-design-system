/* Packages the hand-edited pattern files from <repo>/patterns: runs the
 * guard rails (guard.mjs), copies the .md files into ./dist (or --out <dir>,
 * for the plugin copies) and writes manifest.json beside them. If a guard
 * rail fails, nothing is packaged.
 *
 *   node build.mjs            guard, then package
 *   node build.mjs --check    guard only
 *   node build.mjs --quiet    do not print warnings (errors always print)
 *
 * The manifest is never written by hand. It is rebuilt from whatever .md
 * files are in the folder, so adding, removing or renaming a file needs no
 * other change:
 *   - a file named NN-name.md is a pattern;
 *   - any other .md file (except README.md) is a reference;
 *   - title = the first "# " heading, summary = the first paragraph,
 *     sections = the "## " headings, rules = the numbered rule lines.
 *
 * graph.json is written the same way from compositions/: the recipes, the
 * organisms and the spacing steps, with the Zebra binding from zebra.md.
 */
import { cpSync, rmSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { guard, isPatternFile, fileNumber, RULE } from "./guard.mjs";
import { readCompositions, DIR as COMPOSITIONS } from "./compositions.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const SOURCE = join(here, "..", "..", "patterns");
const out = process.argv.indexOf("--out");
const OUT = out >= 0 ? resolve(process.argv[out + 1]) : join(here, "dist");

const { errors, warnings } = guard(SOURCE, join(here, "..", ".."));
if (warnings.length && !process.argv.includes("--quiet")) console.warn(`patterns: ${warnings.length} warning(s)\n  - ${warnings.join("\n  - ")}`);
if (errors.length) {
  console.error(`\n✗ patterns not packaged: ${errors.length} problem(s)\n\n  ${errors.join("\n\n  ")}\n`);
  process.exit(1);
}
if (process.argv.includes("--check")) { console.log("✓ patterns pass the guard rails"); process.exit(0); }

rmSync(OUT, { recursive: true, force: true });
cpSync(SOURCE, OUT, { recursive: true, filter: (src) => src === SOURCE || src === join(SOURCE, COMPOSITIONS) || (src.endsWith(".md") && !/^[._]/.test(src.split("/").pop())) });

const patterns = [];
const references = [];
for (const file of readdirSync(OUT).filter((f) => f.endsWith(".md") && f !== "README.md").sort()) {
  const text = readFileSync(join(OUT, file), "utf8");
  const title = text.match(/^# (.+)$/m)?.[1] ?? file.replace(/\.md$/, "");
  const summary = text.split(/\n\s*\n/).map((p) => p.trim()).find((p) => p && !p.startsWith("#")) ?? "";
  if (!isPatternFile(file)) { references.push({ file, title, summary }); continue; }
  const sections = [...text.matchAll(/^## (?:\d+\. )?(.+)$/gm)].map((m) => m[1]);
  const rules = text.split("\n").filter((line) => RULE.test(line)).length;
  patterns.push({ file, number: fileNumber(file), title, summary, rules, sections });
}

const NOTE = "Generated when the patterns are packaged. Do not edit: change the .md files and package again.";
const comp = readCompositions(SOURCE);

const { name, version } = JSON.parse(readFileSync(join(here, "package.json"), "utf8"));
writeFileSync(join(OUT, "manifest.json"), JSON.stringify({
  name, version,
  note: NOTE,
  readme: "README.md",
  patterns, references,
  ...(comp ? { compositions: {
    readme: `${COMPOSITIONS}/README.md`, graph: "graph.json",
    recipes: comp.graph.recipes.map(({ id, file, title, summary }) => ({ id, file, title, summary })),
    organisms: comp.graph.organisms.length, spacingSteps: comp.graph.spacing.length,
  } } : {}),
}, null, 2) + "\n");
if (comp) writeFileSync(join(OUT, "graph.json"), JSON.stringify({ name, version, note: NOTE, ...comp.graph }, null, 2) + "\n");
console.log(`packaged ${patterns.length} patterns and ${references.length} references to ${OUT}`);
