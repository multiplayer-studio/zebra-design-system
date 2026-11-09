/* Doc distillation (step 2.1 of the distribution plan).
 *
 * Turns each specs/<slug>/<slug>.spec.json into docs/components/<slug>.md —
 * the consumer-facing layer only: what the component is for, its API, when
 * to use it, states, behaviour, content rules, layout & theming intent, and
 * accessibility. The extraction internals (token bindings, variant deltas,
 * Figma node links, issues) stay in the spec: they are the managers' layer.
 *
 * Deterministic on purpose: CI regenerates and diffs, so a spec change that
 * forgets to regenerate fails the build instead of shipping stale context.
 * Run: node docs/components/generate.mjs   (root: pnpm run docs:components)
 */
import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const SPECS = join(ROOT, "specs");
const OUT = join(ROOT, "docs", "components");

/* ---- implementations: which library builds each spec ---------------------- */
// @spec tags in the two Zebra libraries; Zeta Web maps specs in api-map.json.
const grepSpecTags = (pkg) => {
  const map = new Map(); // slug -> Set of source files
  let out = "";
  try {
    out = execSync(`grep -rn "@spec specs/" packages/${pkg}/src --include="*.ts" --include="*.tsx" -l -e "@spec specs/" | xargs grep -ho "@spec specs/[a-z0-9-]*"`, { cwd: ROOT, encoding: "utf8" });
  } catch { /* no matches */ }
  for (const line of out.split("\n")) {
    const m = line.match(/@spec specs\/([a-z0-9-]+)/);
    if (m) map.set(m[1], true);
  }
  return map;
};
const reactImpl = grepSpecTags("react-baseui");
const wcImpl = grepSpecTags("web-components");
const apiMapPath = join(ROOT, ".claude/skills/zeta-web-components/references/api-map.json");
const zetaMap = existsSync(apiMapPath) ? JSON.parse(readFileSync(apiMapPath, "utf8")) : {};

const implementations = (slug) => {
  const impls = [];
  if (reactImpl.has(slug)) impls.push("`@zebra-design-system/react-baseui`");
  if (wcImpl.has(slug)) impls.push("`@zebra-design-system/web-components`");
  if (zetaMap[slug]) {
    const el = JSON.stringify(zetaMap[slug]).match(/zeta-[a-z-]+/);
    impls.push(`\`@zebra-fed/zeta-web\`${el ? ` (\`<${el[0]}>\`)` : ""}`);
  }
  return impls;
};

/* ---- markdown helpers ------------------------------------------------------ */
const esc = (s) => String(s ?? "").replace(/\|/g, "\\|").replace(/\n/g, " ");
const table = (headers, rows) =>
  rows.length
    ? [`| ${headers.join(" | ")} |`, `|${headers.map(() => "---").join("|")}|`, ...rows.map((r) => `| ${r.map(esc).join(" | ")} |`)].join("\n")
    : "";
const bullets = (items) => items.map((i) => `- ${i}`).join("\n");

/* ---- one spec -> one doc --------------------------------------------------- */
function render(spec) {
  const parts = [];
  parts.push(`# ${spec.component.name}`);
  parts.push(`> ${spec.summary}`);

  const impls = implementations(spec.component.slug);
  parts.push(`**Implementations:** ${impls.length ? impls.join(" · ") : "none yet"}`);

  if (spec.api && Object.keys(spec.api).length) {
    const rows = Object.entries(spec.api).map(([name, a]) => [
      `\`${name}\``,
      a.type ?? "",
      a.default !== undefined ? `\`${a.default}\`` : "",
      Array.isArray(a.values) ? a.values.map((v) => `\`${v}\``).join(" ") : "",
      a.note ?? a.description ?? "",
    ]);
    parts.push(`## API\n\n${table(["Prop", "Type", "Default", "Values", "Notes"], rows)}`);
  }

  const u = spec.usage ?? {};
  const usage = [];
  if (Array.isArray(u.do) && u.do.length) usage.push(`### Do\n\n${bullets(u.do)}`);
  if (Array.isArray(u.dont) && u.dont.length) usage.push(`### Don't\n\n${bullets(u.dont)}`);
  for (const [k, v] of Object.entries(u)) {
    if (k === "do" || k === "dont" || !Array.isArray(v) || !v.length) continue;
    usage.push(`### ${k[0].toUpperCase()}${k.slice(1)}\n\n${bullets(v.map(String))}`);
  }
  if (usage.length) parts.push(`## When and how to use\n\n${usage.join("\n\n")}`);

  if (Array.isArray(spec.states) && spec.states.length) {
    parts.push(`## States\n\n${table(["State", "Trigger", "What changes"], spec.states.map((s) => [s.state, s.trigger, s.change]))}`);
  }
  if (Array.isArray(spec.behavior) && spec.behavior.length) {
    parts.push(`## Behaviour\n\n${bullets(spec.behavior.map((b) => (b.type ? `**${b.type}** — ${b.description}` : String(b.description ?? b))))}`);
  }
  if (Array.isArray(spec.content) && spec.content.length) {
    parts.push(`## Content\n\n${table(["Part", "Kind", "Guidance"], spec.content.map((c) => [c.property, c.type, c.description]))}`);
  }
  if (Array.isArray(spec.layoutTheming) && spec.layoutTheming.length) {
    parts.push(`## Layout & theming\n\n${table(["Property", "Sizing", "Guidance"], spec.layoutTheming.map((l) => [l.property, l.type, l.description]))}`);
  }
  if (Array.isArray(spec.accessibility) && spec.accessibility.length) {
    parts.push(`## Accessibility\n\n${bullets(spec.accessibility.map(String))}`);
  }

  parts.push(`---\n*Generated from \`specs/${spec.component.slug}\` — do not edit by hand. Theming: put \`mode-dark\`, \`ext-companion\`, \`ext-target\` or \`bp-*\` classes on any ancestor (Zeta Web uses \`data-theme\`/\`data-brand\` attributes instead).*`);
  return parts.filter(Boolean).join("\n\n") + "\n";
}

/* ---- run over every spec --------------------------------------------------- */
mkdirSync(OUT, { recursive: true });
for (const f of readdirSync(OUT)) if (f.endsWith(".md")) rmSync(join(OUT, f));

const slugs = readdirSync(SPECS, { withFileTypes: true })
  .filter((d) => d.isDirectory() && existsSync(join(SPECS, d.name, `${d.name}.spec.json`)))
  .map((d) => d.name)
  .sort();

const index = [];
for (const slug of slugs) {
  const spec = JSON.parse(readFileSync(join(SPECS, slug, `${slug}.spec.json`), "utf8"));
  writeFileSync(join(OUT, `${slug}.md`), render(spec));
  index.push(`- [${spec.component.name}](./${slug}.md) — ${esc(spec.summary).slice(0, 120)}`);
}

writeFileSync(join(OUT, "README.md"),
  `# Zebra Design System — component usage docs

One page per component, distilled from the specs: purpose, API, when to use,
states, behaviour, content, layout & theming, accessibility. Generated by
\`docs/components/generate.mjs\`; regenerate with \`pnpm run docs:components\`.
Never edit these files by hand — CI diffs them against the specs.

${index.join("\n")}
`);

console.log(`generated ${slugs.length} component docs + index in docs/components/`);
