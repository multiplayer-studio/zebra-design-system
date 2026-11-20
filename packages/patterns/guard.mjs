/* Guard rails for the pattern files, run when they are packaged.
 *
 * Editing stays free: nothing here runs while you write. When the patterns
 * are packaged for distribution, guard() reads the folder and returns
 * errors (the package is not built) and warnings (it is, with a note).
 *
 * What is guarded, and why:
 *   names      Rule files and terms.md must not name a Zebra token, theme
 *              class, package, element or component. They are read by
 *              products on other systems. Those names belong in zebra.md.
 *   shape      A pattern file (NN-name.md) has a title, a summary and
 *              numbered rules. Every rule starts with a bold sentence, no
 *              number is used twice in a file, and a rule's number carries
 *              its file's number (4.12 lives in 04-…).
 *   references A rule that points at another rule, such as (4.21), points
 *              at one that exists. So does a skill that cites one, such as
 *              `patterns 4.21` (checked in the repository's skills).
 *   links      Every link between files points at a file that exists, and
 *              the README links to every file.
 *   binding    Every token and theme class zebra.md names still exists.
 *   leftovers  No merge markers, no TODO or placeholder text, no stray files.
 *
 * The lists of token and component names are read from tokens/ and specs/
 * each time, so the guard follows the design system without being edited.
 * A line that must break a names rule on purpose can end with
 * <!-- guard:ok -->.
 */
import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import { join } from "node:path";

const walk = (dir) => (existsSync(dir) ? readdirSync(dir, { withFileTypes: true }) : []).flatMap((e) =>
  e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)]);

/* ---- what the design system calls things ----------------------------------- */
const systemNames = (root) => {
  const tokens = new Set();
  const roots = new Set();
  const leaves = (node, path) => {
    if (node && typeof node === "object" && "$value" in node) { tokens.add("--" + path.join("-")); return; }
    if (node && typeof node === "object") for (const [k, v] of Object.entries(node)) if (!k.startsWith("$")) leaves(v, [...path, k.replace(/\s+/g, "-")]);
  };
  for (const group of ["semantics", "size", "typography"]) {
    for (const f of walk(join(root, "tokens", "base", group)).filter((f) => f.endsWith(".json"))) {
      const json = JSON.parse(readFileSync(f, "utf8"));
      Object.keys(json).filter((k) => !k.startsWith("$")).forEach((k) => roots.add(k));
      leaves(json, []);
    }
  }
  const stems = (dir) => (existsSync(dir) ? readdirSync(dir) : []).filter((f) => !f.startsWith(".")).map((f) => f.replace(/\.json$/, ""));
  const classes = new Set([
    ...stems(join(root, "tokens", "base", "palette")).map((m) => `mode-${m}`),
    ...stems(join(root, "tokens", "base", "size")).filter((m) => m !== "desktop").map((m) => `bp-${m}`),
    ...stems(join(root, "tokens", "extensions")).map((m) => `ext-${m}`),
  ]);
  const components = new Set();
  for (const f of walk(join(root, "specs")).filter((f) => f.endsWith(".spec.json"))) {
    const name = JSON.parse(readFileSync(f, "utf8")).component?.name;
    if (name) components.add(name.replace(/\s*\(.*\)$/, "").trim());
  }
  return { tokens, roots: [...roots], classes, components: [...components] };
};

// A pattern file is named NN-name.md. A rule is a line that starts with its
// number, which carries the file's number: "4.12. " in 04-….
export const isPatternFile = (f) => /^\d\d-.+\.md$/.test(f);
export const fileNumber = (f) => Number(f.slice(0, 2));
export const RULE = /^(\d+(?:\.\d+)?)\. (.*)$/;

const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export function guard(source, root) {
  const errors = [];
  const warnings = [];
  const err = (file, line, what, fix) => errors.push(`${file}${line ? ":" + line : ""}  ${what}\n      fix: ${fix}`);
  const warn = (file, what) => warnings.push(`${file}  ${what}`);
  const sys = systemNames(root);

  const entries = readdirSync(source).filter((f) => !/^[._]/.test(f));
  for (const f of entries) {
    if (statSync(join(source, f)).isDirectory()) err(f, 0, "is a folder", "keep patterns/ flat: one .md file per pattern");
    else if (!f.endsWith(".md")) warn(f, "is not a .md file and will not be packaged");
  }
  const files = entries.filter((f) => f.endsWith(".md"));
  const text = Object.fromEntries(files.map((f) => [f, readFileSync(join(source, f), "utf8")]));
  const patterns = files.filter(isPatternFile);
  const neutral = [...patterns, ...(text["terms.md"] ? ["terms.md"] : [])];

  if (!text["README.md"]) err("README.md", 0, "is missing", "restore patterns/README.md: it tells readers which files a task needs");
  if (!patterns.length) err("patterns/", 0, "has no pattern files", "a pattern file is named NN-name.md, for example 04-states-feedback.md");

  /* ---- names: rule files stay free of system names ------------------------ */
  const multi = sys.components.filter((c) => /\s/.test(c));
  // A one-word component name that the patterns already use as an ordinary
  // word ("search", "dialog", "table") is not a Zebra name, so it is left alone.
  const plainWords = new Set(neutral.flatMap((f) => text[f].match(/\b[a-z]+\b/g) ?? []));
  const single = sys.components.filter((c) => !/\s/.test(c) && !plainWords.has(c.toLowerCase()));
  const nameChecks = [
    [/(?<![\w-])--[a-z][\w-]*/g, "names a CSS token"],
    [/\bvar\(/g, "uses var()"],
    [new RegExp(`\\b(?:${sys.roots.map(esc).join("|")})/[a-z0-9][\\w-]*`, "g"), "names a token path"],
    [/(?<![\w&])#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/g, "has a raw colour"],
    [/\b(?:mode|bp|ext)-[a-z][a-z-]*\b/g, "names a theme class"],
    [/\b(?:zds|zeta)-[a-z][\w-]*/g, "names a Zebra element"],
    [/@zebra-(?:design-system|fed)\//g, "names a Zebra package"],
    [/<[A-Z][A-Za-z]+[\s/>]/g, "has component markup"],
    [multi.length ? new RegExp(`\\b(?:${multi.map(esc).join("|")})\\b`, "g") : null, "names a Zebra component"],
    // The remaining one-word names count when capitalised mid-sentence.
    [single.length ? new RegExp(`(?<=[a-z,;:] )(?:${single.map(esc).join("|")})\\b`, "g") : null, "names a Zebra component"],
  ].filter(([re]) => re);
  for (const f of neutral) {
    text[f].split("\n").forEach((line, i) => {
      if (line.includes("<!-- guard:ok -->")) return;
      for (const [re, what] of nameChecks) {
        for (const m of line.matchAll(re)) {
          err(f, i + 1, `${what}: "${m[0].trim()}"`, "say it in a pattern word from terms.md, and put the Zebra name in zebra.md");
        }
      }
      for (const m of line.matchAll(/\]\((https?:[^)]+)\)/g)) {
        err(f, i + 1, `links to an outside page: ${m[1]}`, "a rule should stand without it; move the link to a reference file such as devices.md");
      }
    });
  }

  /* ---- shape: a pattern file reads the same way every time ----------------- */
  const ids = {}; // file number -> Map(rule id -> line)
  for (const f of patterns) {
    const n = fileNumber(f);
    if (ids[n]) err(f, 0, `shares the number ${n} with another file`, "give each pattern file its own two-digit number");
    ids[n] = new Map();
    if (!/^# \S/m.test(text[f])) err(f, 0, "has no title", "start the file with '# Title'");
    const summary = text[f].split(/\n\s*\n/).map((p) => p.trim()).find((p) => p && !p.startsWith("#"));
    if (!summary || RULE.test(summary)) err(f, 0, "has no summary", "put one plain sentence under the title saying what the file covers");
    const seen = new Map();
    text[f].split("\n").forEach((line, i) => {
      const m = line.match(RULE);
      if (!m) return;
      const id = m[1];
      if (id.split(".")[0] !== String(n) || !id.includes(".")) err(f, i + 1, `rule ${id} does not carry this file's number ${n}`, `number it ${n}.x, like every other rule (indent a plain numbered list so it is not read as rules)`);
      if (ids[n].has(id)) err(f, i + 1, `uses the number ${id} again (first on line ${ids[n].get(id)})`, "give this rule the next free number");
      else ids[n].set(id, i + 1);
      const bold = m[2].match(/^\*\*(.+?)\*\*/);
      if (!bold) { err(f, i + 1, `rule ${id} does not start with a bold sentence`, "write it as 'N. **The rule.** Any explanation.'"); return; }
      const key = bold[1].toLowerCase().replace(/[.,:;]+$/, "").trim();
      if (seen.has(key)) err(f, i + 1, `rule ${id} repeats the rule on line ${seen.get(key)}`, "delete one of them");
      seen.set(key, i + 1);
    });
    if (!ids[n].size) err(f, 0, "has no rules", "add at least one numbered rule: 'N. **The rule.**'");
  }

  /* ---- references: a rule that points at another rule finds it -------------- */
  for (const f of patterns) {
    const n = fileNumber(f);
    text[f].split("\n").forEach((line, i) => {
      const body = line.replace(RULE, "$2");
      // 4.21: the first number names a pattern file, the second a rule in it
      for (const m of body.matchAll(/(?<![\d.:])(\d{1,2})\.(\d{1,3})(?![\d:%]|\.\d)/g)) {
        const target = ids[Number(m[1])];
        if (!target) continue;
        if (!target.has(m[0])) err(f, i + 1, `points at rule ${m[0]}, which does not exist`, "fix the number, or remove the reference if the rule was deleted");
      }
    });
  }

  /* ---- citations: a skill that cites a rule cites one that exists ------------ */
  // Only in the repository, where the skills sit beside the patterns.
  const skillsDir = join(root, "distribution", "skills");
  for (const file of walk(skillsDir).filter((f) => f.endsWith(".md"))) {
    const rel = "distribution/skills/" + file.slice(skillsDir.length + 1);
    readFileSync(file, "utf8").split("\n").forEach((line, i) => {
      for (const m of line.matchAll(/\bpatterns (\d{1,2})\.(\d{1,3})\b(?![\d.])/g)) {
        const target = ids[Number(m[1])];
        if (!target || !target.has(`${m[1]}.${m[2]}`)) err(rel, i + 1, `cites ${m[0]}, which does not exist`, "cite a rule that exists: check the pattern file for the right number");
      }
    });
  }

  /* ---- links: every file is reachable and nothing points at a hole --------- */
  for (const f of files) {
    text[f].split("\n").forEach((line, i) => {
      for (const m of line.matchAll(/\]\(([^)\s]+)\)/g)) {
        const target = m[1].split("#")[0];
        if (!target || /^[a-z]+:/i.test(target)) continue;
        if (!existsSync(join(source, target))) err(f, i + 1, `links to "${target}", which is not in patterns/`, "fix the link, or remove it if the file was deleted");
      }
    });
  }
  for (const f of files.filter((f) => f !== "README.md")) {
    if (text["README.md"] && !text["README.md"].includes(`](${f})`)) err("README.md", 0, `does not list ${f}`, `add a row for ${f} to the Files table`);
  }

  /* ---- binding: zebra.md only names things that exist ----------------------- */
  if (text["zebra.md"]) {
    text["zebra.md"].split("\n").forEach((line, i) => {
      for (const m of line.matchAll(/`(--[a-z][\w-]*)`/g)) {
        if (!sys.tokens.has(m[1])) err("zebra.md", i + 1, `names the token ${m[1]}, which is not in tokens/`, "it was renamed or removed: update the binding");
      }
      for (const m of line.matchAll(/`((?:mode|bp|ext)-[a-z][a-z-]*)`/g)) {
        if (!sys.classes.has(m[1])) err("zebra.md", i + 1, `names the theme class ${m[1]}, which is not in tokens/`, "it was renamed or removed: update the binding");
      }
    });
  } else warn("zebra.md", "is missing, so Zebra projects have no binding");
  if (!text["terms.md"]) warn("terms.md", "is missing, so the pattern words have no definitions");

  /* ---- leftovers ------------------------------------------------------------- */
  for (const f of files) {
    if (!text[f].trim()) { err(f, 0, "is empty", "write it or delete it"); continue; }
    text[f].split("\n").forEach((line, i) => {
      if (/^(<{7}|={7}|>{7})( |$)/.test(line)) err(f, i + 1, "has a merge conflict marker", "resolve the conflict");
      if (/\b(TODO|TBD|FIXME|XXX|lorem ipsum)\b/i.test(line)) err(f, i + 1, `has unfinished text: "${line.trim().slice(0, 60)}"`, "finish it or remove it before it ships");
    });
  }
  const unknown = (text["devices.md"]?.match(/\| \? /g) ?? []).length;
  if (unknown) warn("devices.md", `has ${unknown} figure(s) still marked "?"`);

  return { errors, warnings, patterns: patterns.length };
}
