#!/usr/bin/env node
/**
 * Read-only survey of patterns/ for the zebra-pattern-ingest skill.
 *
 *   node .claude/skills/zebra-pattern-ingest/scripts/survey.mjs
 *       every pattern file: its sections, and the next free rule number
 *
 *   node .claude/skills/zebra-pattern-ingest/scripts/survey.mjs toast "pinned bar" undo
 *       the same, then every rule that mentions any of the words, so a
 *       candidate can be compared with what is already there
 *
 *   node .claude/skills/zebra-pattern-ingest/scripts/survey.mjs --compositions [words…]
 *       the compositions in patterns/compositions: every recipe with its
 *       job, signals, regions, focal region and neighbours, every organism
 *       with its slots, the spacing steps, and anything the packaged graph
 *       would reject. With words, also the lines that mention them.
 *
 * It never writes. The next free number is one above the highest in the file,
 * and above any number the repository's skills and docs still cite, so a
 * number a deleted rule once had is never handed out again by accident.
 */
import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../../../..");
const DIR = join(ROOT, "patterns");
const RULE = /^(\d+)\.(\d+)\. (.*)$/;
const args = process.argv.slice(2);
const wantCompositions = args.includes("--compositions");
const words = args.filter((a) => !a.startsWith("--")).map((w) => w.toLowerCase());

if (wantCompositions) {
  const { readCompositions } = await import(join(ROOT, "packages/patterns/compositions.mjs"));
  const c = readCompositions(DIR);
  const g = c.graph;
  console.log("Start from the job\n");
  for (const e of g.entry) console.log(`  the person wants to ${e.wants}  ->  ${e.recipe}`);
  console.log("\nRecipes\n");
  for (const r of g.recipes) {
    console.log(`${r.id}  —  ${r.title}`);
    console.log(`  job: ${r.job}`);
    for (const sig of r.signals ?? []) console.log(`  signal: ${sig}`);
    console.log(`  focal: ${r.focal ?? "?"}`);
    for (const reg of r.regions ?? [])
      console.log(`  ${reg.order}. ${reg.name}  [${reg.present}${reg.condition ? " " + reg.condition : ""}]  ${reg.organism ? "<- " + reg.organism : ""}  ${(reg.rules ?? []).join(", ")}`);
    for (const v of r.variations ?? []) console.log(`  when ${v.when}: ${v.then}`);
    for (const i of r.instead ?? []) console.log(`  instead, when ${i.when}: ${i.use}`);
    console.log("");
  }
  console.log("Organisms\n");
  for (const o of g.organisms) console.log(`${o.name}  —  ${o.job}\n  slots: ${o.slots.map((s) => s.slot).join(", ")}`);
  console.log("\nSpacing steps, smallest first\n  " + g.spacing.map((s) => s.step).join(" < "));
  const into = {};
  for (const e of g.edges) into[e.to] = (into[e.to] ?? 0) + 1;
  const lonely = g.recipes.filter((r) => !into[r.id] && !(r.instead ?? []).length).map((r) => r.id);
  if (lonely.length) console.log(`\nRecipes with no neighbour (the graph can't route to or from them): ${lonely.join(", ")}`);
  if (c.unbound.steps.length || c.unbound.organisms.length)
    console.log(`\nNot in zebra.md yet: ${[...c.unbound.steps, ...c.unbound.organisms].join(", ")}`);
  if (c.problems.length) {
    console.log("\nProblems the packaging would stop on\n");
    for (const pr of c.problems) console.log(`  ${pr.file}: ${pr.what} — ${pr.fix}`);
  }
  if (words.length) {
    console.log(`\nLines that mention: ${words.join(", ")}\n`);
    for (const [f, text] of Object.entries(c.text))
      text.split("\n").forEach((line, i) => {
        if (words.some((w) => line.toLowerCase().includes(w))) console.log(`  compositions/${f}:${i + 1}  ${line.trim().slice(0, 200)}`);
      });
  }
  console.log("");
  process.exit(0);
}

const files = readdirSync(DIR).filter((f) => /^\d\d-.*\.md$/.test(f)).sort();
const highest = {}; // file number -> highest rule number in the file
const rules = [];

for (const f of files) {
  const n = Number(f.slice(0, 2));
  const lines = readFileSync(join(DIR, f), "utf8").split("\n");
  const sections = [];
  highest[n] = 0;
  let section = null;
  lines.forEach((line, i) => {
    if (line.startsWith("## ")) sections.push((section = { title: line.slice(3), line: i + 1, last: i + 1, count: 0 }));
    const m = line.match(RULE);
    if (m && Number(m[1]) === n) {
      highest[n] = Math.max(highest[n], Number(m[2]));
      if (section) section.count++;
      rules.push({ file: f, id: `${m[1]}.${m[2]}`, line: i + 1, text: m[3], section: section?.title ?? "" });
    }
    if (section && line.trim()) section.last = i + 1;
  });
  highest[n] = { inFile: highest[n], sections, title: lines[0].replace(/^# /, "") };
}

// Numbers still cited elsewhere in the repository, in case their rule was deleted.
const cited = {};
const CITE = /patterns?\s+(\d+)\.(\d+)/gi;
const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    if (name === "node_modules" || name === "dist" || name.startsWith(".git")) continue;
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) walk(p);
    else if (name.endsWith(".md")) {
      for (const m of readFileSync(p, "utf8").matchAll(CITE)) cited[m[1]] = Math.max(cited[m[1]] ?? 0, Number(m[2]));
    }
  }
};
for (const d of ["distribution/skills", "patterns/compositions", ".claude/skills"]) {
  const p = join(ROOT, d);
  if (existsSync(p)) walk(p);
}

console.log("Pattern files\n");
for (const f of files) {
  const n = Number(f.slice(0, 2));
  const h = highest[n];
  const next = Math.max(h.inFile, cited[n] ?? 0) + 1;
  console.log(`${f}  —  ${h.title}`);
  console.log(`  next free rule number: ${n}.${next}`);
  for (const s of h.sections) console.log(`  ## ${s.title}  (${s.count} rules, ends line ${s.last})`);
  console.log("");
}
const nextFile = String(Math.max(...files.map((f) => Number(f.slice(0, 2)))) + 1).padStart(2, "0");
console.log(`Next free file number: ${nextFile}\n`);

if (words.length) {
  console.log(`Rules that mention: ${words.join(", ")}\n`);
  const hits = rules.filter((r) => words.some((w) => r.text.toLowerCase().includes(w)));
  for (const r of hits) console.log(`${r.id}  ${r.file}:${r.line}  [${r.section}]\n    ${r.text.slice(0, 260)}\n`);
  if (!hits.length) console.log("  none\n");
}
