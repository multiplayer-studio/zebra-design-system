/* Reads <patterns>/compositions: the hand-edited recipes, organisms and
 * spacing steps, and turns them into one graph. guard.mjs uses the problems
 * it finds; build.mjs writes the graph as graph.json.
 *
 * Nothing here is configuration. The graph is whatever the Markdown says:
 *   README.md     the first table is the entry: job -> recipe
 *   spacing.md    the "Steps" table
 *   organisms.md  every "## Name" is an organism, with a slots table and "Rules:"
 *   any other .md a recipe, with six headings (see README.md)
 */
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

export const DIR = "compositions";
export const HEADINGS = ["Job", "Choose this when", "Regions", "Variations", "Space and emphasis", "Checks"];
const SUPPORT = new Set(["README.md", "spacing.md", "organisms.md"]);

export const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const ruleIds = (s) => [...(s ?? "").matchAll(/(?<![\d.])(\d{1,2}\.\d{1,3})(?![\d%]|\.\d)/g)].map((m) => m[1]);
const link = (s) => { const m = (s ?? "").match(/\[([^\]]+)\]\(([^)\s]+)\)/); return m ? { text: m[1], href: m[2] } : null; };
const plain = (s) => (s ?? "").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/\*\*/g, "").trim();

// "## Heading" -> the lines under it, up to the next heading of that level
const sections = (text, level = 2) => {
  const out = {}; let name = null;
  const mark = "#".repeat(level) + " ";
  for (const line of text.split("\n")) {
    if (line.startsWith(mark)) { name = line.slice(mark.length).trim(); out[name] = []; }
    else if (name) out[name].push(line);
  }
  return Object.fromEntries(Object.entries(out).map(([k, v]) => [k, v.join("\n")]));
};
// every Markdown table in a block, as rows keyed by the lower-cased header
const tables = (block) => {
  const found = []; let cur = null;
  for (const line of (block ?? "").split("\n")) {
    if (!/^\s*\|/.test(line)) { cur = null; continue; }
    const cells = line.trim().replace(/^\||\|$/g, "").split("|").map((c) => c.trim());
    if (!cur) { cur = { head: cells.map((c) => c.toLowerCase()), rows: [] }; found.push(cur); continue; }
    if (cells.every((c) => /^:?-+:?$/.test(c))) continue;
    cur.rows.push(Object.fromEntries(cur.head.map((h, i) => [h, cells[i] ?? ""])));
  }
  return found;
};
const bullets = (block) => (block ?? "").split("\n").filter((l) => /^- /.test(l)).map((l) => l.slice(2).trim());
const present = (s) => {
  const v = (s ?? "").trim();
  if (v === "always" || v === "optional") return { present: v };
  if (/^when \S/.test(v)) return { present: "when", condition: v.slice(5).trim() };
  return null;
};
const title = (text) => text.match(/^# (.+)$/m)?.[1]?.trim() ?? "";
const summary = (text) => text.split(/\n\s*\n/).map((p) => p.trim()).find((p) => p && !p.startsWith("#")) ?? "";

export function readCompositions(source) {
  const dir = join(source, DIR);
  if (!existsSync(dir)) return null;
  const problems = []; // { file, what, fix }
  const bad = (file, what, fix) => problems.push({ file: `${DIR}/${file}`, what, fix });
  const files = readdirSync(dir).filter((f) => f.endsWith(".md") && !/^[._]/.test(f)).sort();
  const text = Object.fromEntries(files.map((f) => [f, readFileSync(join(dir, f), "utf8")]));
  for (const f of SUPPORT) if (!text[f]) bad(f, "is missing", `restore ${DIR}/${f}`);

  /* spacing steps */
  const steps = (tables(sections(text["spacing.md"] ?? "")["Steps"])[0]?.rows ?? [])
    .map((r, i) => ({ step: r.step, order: i + 1, between: r.between, floor: r["never less than"] }))
    .filter((s) => s.step);
  if (text["spacing.md"] && !steps.length) bad("spacing.md", "has no steps", "keep the table under '## Steps', with a Step column");
  const stepNames = new Set(steps.map((s) => s.step));

  /* organisms */
  const organisms = [];
  for (const [name, block] of Object.entries(sections(text["organisms.md"] ?? ""))) {
    const slots = (tables(block)[0]?.rows ?? []).map((r) => {
      const p = present(r.present);
      if (!p) bad("organisms.md", `"${name}" has a slot "${r.slot}" with Present "${r.present}"`, "write always, optional, or when followed by the condition");
      return { slot: r.slot, holds: r.holds, ...(p ?? {}) };
    });
    if (!slots.length) bad("organisms.md", `"${name}" has no slots`, "give it a table with Slot, Holds and Present columns");
    const job = block.split("\n").map((l) => l.trim()).find((l) => l && !l.startsWith("|") && !l.startsWith("Rules:")) ?? "";
    organisms.push({ id: slug(name), name, job, slots, rules: ruleIds(block.match(/^Rules:(.*)$/m)?.[1]) });
  }
  const organismIds = new Set(organisms.map((o) => o.id));

  /* recipes */
  const recipeFiles = files.filter((f) => !SUPPORT.has(f));
  const recipes = [];
  for (const f of recipeFiles) {
    const sec = sections(text[f]);
    for (const h of HEADINGS) if (!(h in sec)) bad(f, `has no "## ${h}" heading`, `every recipe has these six headings: ${HEADINGS.join(", ")}`);
    const id = f.replace(/\.md$/, "");

    const jobBlock = sec["Job"] ?? "";
    const job = jobBlock.split("\n").map((l) => l.trim()).find((l) => l && !l.startsWith("-") && !l.startsWith("**")) ?? "";
    const signals = bullets(jobBlock);
    if (!signals.length && "Job" in sec) bad(f, "has no signals under Job", "list what a screen doing this job looks like, one '- ' line each");

    const instead = (tables(sec["Choose this when"])[0]?.rows ?? []).map((r) => {
      const l = link(r.use);
      const to = l?.href.replace(/\.md$/, "");
      if (!l || !recipeFiles.includes(l.href)) bad(f, `points at a neighbour that doesn't exist: "${r.use}"`, "link it to a recipe file in this folder");
      return { when: r["instead, when"], use: to };
    });

    const regions = (tables(sec["Regions"])[0]?.rows ?? []).map((r, i) => {
      const p = present(r.present);
      if (!p) bad(f, `region "${r.region}" has Present "${r.present}"`, "write always, optional, or when followed by the condition");
      const l = link(r["filled by"]);
      const organism = l ? l.href.split("#")[1] : null;
      if (l && (!l.href.startsWith("organisms.md#") || !organismIds.has(organism))) bad(f, `region "${r.region}" is filled by "${l.href}", which isn't an organism`, "link to a heading in organisms.md, such as organisms.md#commit-bar");
      return { order: i + 1, name: r.region, ...(p ?? {}), organism, rules: ruleIds(r.rules) };
    });
    if ("Regions" in sec && !regions.length) bad(f, "has no regions", "give Regions a table with Region, Present, Filled by and Rules columns");
    const regionNames = new Set(regions.map((r) => r.name));

    const variations = (tables(sec["Variations"])[0]?.rows ?? []).map((r) => ({ when: r.when, then: r.then, rules: ruleIds(r.rules) }));

    const space = sec["Space and emphasis"] ?? "";
    const focal = space.match(/^\*\*Focal:\*\*\s*(.+)$/m)?.[1]?.trim() ?? null;
    if ("Space and emphasis" in sec && !focal) bad(f, "names no focal region", "add a line '**Focal:** <a region name>'");
    else if (focal && !regionNames.has(focal)) bad(f, `has the focal region "${focal}", which isn't one of its regions`, `use one of: ${[...regionNames].join(", ")}`);
    const spacing = (tables(space)[0]?.rows ?? []).map((r) => {
      if (!stepNames.has(r.step)) bad(f, `uses the spacing step "${r.step}", which isn't in spacing.md`, `use one of: ${[...stepNames].join(", ")}`);
      return { between: r.between, step: r.step };
    });

    const checks = bullets(sec["Checks"]).map((c) => ({ check: c.replace(/\s*\([\d., ]+\)\s*$/, ""), rules: ruleIds(c) }));
    if ("Checks" in sec && !checks.length) bad(f, "has no checks", "list yes-or-no questions, one '- ' line each");

    recipes.push({
      id, file: `${DIR}/${f}`, title: title(text[f]), summary: summary(text[f]), job, signals,
      chooseWhen: bullets(sec["Choose this when"]), instead, regions, variations, focal, spacing, checks,
    });
  }

  /* entry: README's first table */
  const entry = (tables(text["README.md"] ?? "")[0]?.rows ?? []).map((r) => {
    const l = link(r.recipe);
    return { wants: r["the person wants to"], recipe: l?.href.replace(/\.md$/, "") };
  }).filter((e) => e.recipe);
  for (const f of recipeFiles) {
    if (text["README.md"] && !entry.some((e) => e.recipe === f.replace(/\.md$/, ""))) bad("README.md", `does not list ${f}`, `add a row for ${f} to the "Start from the job" table`);
  }

  /* every rule number named anywhere here, for the guard to check */
  const cited = [];
  for (const f of files) text[f].split("\n").forEach((line, i) => ruleIds(line).forEach((id) => cited.push({ file: `${DIR}/${f}`, line: i + 1, id })));

  /* the Zebra binding, when zebra.md has one */
  const zebra = existsSync(join(source, "zebra.md")) ? sections(readFileSync(join(source, "zebra.md"), "utf8")) : {};
  const bind = (heading) => Object.fromEntries((tables(zebra[heading])[0]?.rows ?? []).map((r) => [slug(Object.values(r)[0]), plain(r.zebra)]));
  const bindings = { spacing: bind("Spacing steps"), organisms: bind("Organisms") };

  const edges = recipes.flatMap((r) => r.instead.filter((e) => e.use).map((e) => ({ from: r.id, to: e.use, when: e.when })));
  return {
    files: Object.keys(text), text, problems, cited,
    unbound: {
      steps: steps.filter((s) => !(slug(s.step) in bindings.spacing)).map((s) => s.step),
      organisms: organisms.filter((o) => !(o.id in bindings.organisms)).map((o) => o.name),
    },
    graph: { entry, recipes, edges, organisms, spacing: steps, bindings: { zebra: bindings } },
  };
}
