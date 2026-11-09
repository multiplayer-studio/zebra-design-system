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
import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync, rmSync, cpSync } from "node:fs";
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
  if (spec.summary) parts.push(`> ${spec.summary}`);

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

/* ---- per-package AGENTS.md + llms.txt (step 2.2) --------------------------- */
// The same distilled layer, shipped inside each tarball so any agent that
// installs a package has the usage contract at hand, versioned with the code.
const summaries = new Map(); // slug -> {name, summary}
for (const slug of slugs) {
  const s = JSON.parse(readFileSync(join(SPECS, slug, `${slug}.spec.json`), "utf8"));
  summaries.set(slug, { name: s.component.name, summary: s.summary ?? "" });
}
const docsUrl = (slug) =>
  `https://github.com/zebratechnologies/zebra-design-system/blob/main/docs/components/${slug}.md`;

const componentIndex = (has) =>
  slugs.filter(has).map((slug) => {
    const { name, summary } = summaries.get(slug);
    const first = summary ? `: ${summary.split(". ")[0].replace(/\.$/, "")}.` : "";
    return `- [${name}](${docsUrl(slug)})${first}`;
  }).join("\n");

const PACKAGES = {
  "react-baseui": {
    title: "@zebra-design-system/react-baseui",
    blurb: "Zebra Design System React components on Base UI primitives, themed entirely by CSS custom properties.",
    agents: (list) => `# Using @zebra-design-system/react-baseui

Rules for agents writing UI with this package.

## Setup (once, at the app entry)
\`\`\`ts
import "@zebra-design-system/tokens/css";      // tokens + themes + IBM Plex
import "@zebra-design-system/icons/icons.css"; // icon font faces
\`\`\`
React 19 is a peer dependency; a bundler is required (components import their
own CSS as side effects — never import or recreate styles by hand).
Run \`npx zebra-skills\` once to install this package's Claude Code skills
(\`zebra-figma-to-code\`, \`zebra-build-ui\`, \`zebra-prototype\`) into the project's .claude/skills.

## Rules
- Import components from \`@zebra-design-system/react-baseui\`; anything under
  \`/experimental\` has no spec and no SemVer promise — ask before using it in product.
- Style with semantic tokens only (\`var(--surface-default)\`,
  \`var(--foreground-primary)\`, \`var(--space-md)\`…). Never hex values, never
  \`--palette-*\`/\`--primitives-*\`.
- Theme with a class on any ancestor: \`mode-dark\`, \`mode-aaa-light\`,
  \`ext-companion\`, \`ext-target\`, \`bp-mobile\`. No provider, no JS. Anything
  that portals to document.body escapes a scoped theme class — theme
  \`<html>\`/\`<body>\`, or pass the component's \`portalContainer\`.
- Icons are font glyphs by name (typed \`IconName\`); never inline SVGs for
  system icons.
- One \`flavour="primary"\` action per view; label buttons with the verb.

## Components in this package
${list}
`,
    has: (slug) => reactImpl.has(slug),
  },
  "web-components": {
    title: "@zebra-design-system/web-components",
    blurb: "Zebra Design System as zds-* Lit custom elements, framework-agnostic, themed by CSS custom properties.",
    agents: (list) => `# Using @zebra-design-system/web-components

Rules for agents writing UI with this package.

## Setup (once, in the host page)
\`\`\`ts
import "@zebra-design-system/tokens/css";
import "@zebra-design-system/icons/icons.css"; // @font-face must load in the document
import "@zebra-design-system/web-components";  // registers every zds-* element
\`\`\`
Run \`npx zebra-skills\` once to install this package's Claude Code skills
(\`zebra-figma-to-code\`, \`zebra-build-ui\`, \`zebra-prototype\`) into the project's .claude/skills.

## Rules
- Elements are \`<zds-*>\`; attributes/properties are documented in the
  package's custom-elements.json (machine-readable — read it).
- Theme with a class on any light-DOM ancestor: \`mode-dark\`, \`ext-companion\`,
  \`ext-target\`, \`bp-mobile\`. Tokens cascade into shadow roots; nothing re-renders.
- Style with semantic tokens only; never \`--palette-*\`/\`--primitives-*\`, never hex.
- Icons: \`<zds-icon name="…">\` draws a font glyph; give \`label\` when it is
  not decorative. Check names against @zebra-design-system/icons codepoints.

## Components in this package
${list}
`,
    has: (slug) => wcImpl.has(slug),
  },
  "tokens": {
    title: "@zebra-design-system/tokens",
    blurb: "The design tokens: DTCG JSON source of truth plus built CSS custom-property layers and fonts.",
    agents: () => `# Using @zebra-design-system/tokens

- \`import "@zebra-design-system/tokens/css"\` gives every token as a CSS
  custom property with class-scoped themes (\`.mode-dark\`, \`.ext-companion\`,
  \`.ext-target\`, \`.bp-*\`). \`/css-attributes\` is the same layer scoped by
  \`[data-theme]\`/\`[data-brand]\`/\`[data-breakpoint]\` for Zeta-style stacks.
- Build UI against the unprefixed semantic names (\`--surface-default\`,
  \`--foreground-primary\`, \`--interactive-primary-background-default\`,
  \`--space-md\`, \`--radius-element-md\`). The prefixed \`--palette-*\` and
  \`--primitives-*\` layers are internal: reading them opts out of theming.
- Non-CSS stacks read the DTCG JSON: \`manifest.json\` for collections, modes
  and the extension graph; \`base/*\` per collection mode; \`extensions/*\`
  hold only what each brand overrides.
- Versioning: a new token is a minor, a removed or renamed token is a major,
  a value change is a patch — themes are allowed to move.
`,
    has: () => false,
  },
  "icons": {
    title: "@zebra-design-system/icons",
    blurb: "The Zebra icon font: woff2 glyph fonts, registration CSS, codepoints and a typed name union.",
    agents: () => `# Using @zebra-design-system/icons

- Load \`icons.css\` once in the document; @font-face reaches into shadow roots.
- A glyph inherits \`currentColor\` and \`1em\` — never give an icon its own
  colour token.
- \`/names\` exports the typed \`IconName\` union; \`/codepoints.js\` maps
  name → glyph character and family (\`rounded\`/\`sharp\` share codepoints —
  the style is a font-family swap, not a different glyph).
- Verify a name exists in \`codepoints.json\` before using it; a missing name
  renders nothing, silently. \`inventory.json\` lists icons rejected from the
  font build.
`,
    has: () => false,
  },
  "zeta-web": {
    title: "@zebra-fed/zeta-web",
    blurb: "The legacy Zeta Web library: zeta-* Lit custom elements, refined against the Zebra specs.",
    agents: (list) => `# Using @zebra-fed/zeta-web

For existing Zeta consumers; new builds should prefer the
@zebra-design-system packages.

- Import \`@zebra-fed/zeta-web\` (registers zeta-* elements) and
  \`@zebra-fed/zeta-web/index.css\`. React wrappers: \`@zebra-fed/zeta-web/react\`.
- Theme with attributes on an ancestor: \`data-theme="dark"\`,
  \`data-brand="companion"|"target"|"condensed"\`, \`data-breakpoint\`.
- The element API is in custom-elements.json (machine-readable).

## Spec-refined components
${list}
`,
    has: (slug) => Boolean(zetaMap[slug]),
  },
};

/* ---- consumer DESIGN.md, derived from the root one ------------------------- */
// §1 Principles, §2 Shape inheritance and §5 Patterns are the system's design
// voice and travel with the component libraries; §3/§4/§6 reference repo
// paths and manager skills, which mean nothing inside a tarball.
const rootDesign = readFileSync(join(ROOT, "DESIGN.md"), "utf8");
const section = (from, to) => {
  const a = rootDesign.indexOf(from);
  const b = to ? rootDesign.indexOf(to) : rootDesign.length;
  if (a === -1 || (to && b === -1)) throw new Error(`DESIGN.md section markers moved: ${from} / ${to}`);
  return rootDesign.slice(a, b).replace(/\n---\n*$/, "").trim();
};
const consumerDesign = `# Zebra Design System — design voice

*Derived from the repo's DESIGN.md for consumers of the published packages;
regenerated by \`docs/components/generate.mjs\`, do not edit here.*

${section("## 1. Principles", "## 2. Shape inheritance")}

---

${section("## 2. Shape inheritance", "## 3. Tokens")}

---

**Interaction states** such as hover, pressed and focus are CSS states, never
props, even where a design tool models them as variants.

---

${section("## 5. Patterns", "## 6. Where to dig deeper")}

---

## Where to dig deeper (as a consumer)

| Need | Go to |
|---|---|
| How to use this package, and its component index | \`AGENTS.md\` in this package |
| Per-component usage docs | the Component usage docs linked from \`llms.txt\` |
| Token names, modes and themes | \`@zebra-design-system/tokens\` (its AGENTS.md and DTCG JSON) |
| Icon glyph names | \`@zebra-design-system/icons\` (\`codepoints.json\`, typed \`IconName\`) |
`;
for (const dir of ["react-baseui", "web-components", "zeta-web"]) {
  writeFileSync(join(ROOT, "packages", dir, "DESIGN.md"), consumerDesign);
}

/* ---- consumer skills, distributed into the component libraries ------------- */
// Authored once in distribution/skills/; each library tarball carries them
// plus the `zebra-skills` installer that copies them into a consumer
// project's .claude/skills (Claude Code does not discover node_modules).
const SKILLS_SRC = join(ROOT, "distribution", "skills");
for (const dir of ["react-baseui", "web-components"]) {
  const pkgDir = join(ROOT, "packages", dir);
  rmSync(join(pkgDir, "skills"), { recursive: true, force: true });
  mkdirSync(join(pkgDir, "skills"), { recursive: true });
  for (const entry of readdirSync(SKILLS_SRC, { withFileTypes: true })) {
    if (entry.isDirectory()) cpSync(join(SKILLS_SRC, entry.name), join(pkgDir, "skills", entry.name), { recursive: true });
  }
  mkdirSync(join(pkgDir, "bin"), { recursive: true });
  cpSync(join(SKILLS_SRC, "install-skills.mjs"), join(pkgDir, "bin", "install-skills.mjs"));
}

/* ---- the Claude Code plugin (distribution/plugin) --------------------------- */
// Same sources, third wrapper: the plugin carries the skills, the component
// catalog, the consumer DESIGN.md and a versions.json pinning the npm
// versions it documents. Regenerated here, so the Changesets version PR
// (whose script runs this generator) updates the pins automatically.
{
  const plug = join(ROOT, "distribution", "plugin", "zebra-design-system");
  // skills
  rmSync(join(plug, "skills"), { recursive: true, force: true });
  mkdirSync(join(plug, "skills"), { recursive: true });
  for (const entry of readdirSync(SKILLS_SRC, { withFileTypes: true })) {
    if (entry.isDirectory()) cpSync(join(SKILLS_SRC, entry.name), join(plug, "skills", entry.name), { recursive: true });
  }
  // component catalog + design voice
  rmSync(join(plug, "docs"), { recursive: true, force: true });
  mkdirSync(join(plug, "docs", "components"), { recursive: true });
  for (const f of readdirSync(OUT)) {
    if (f.endsWith(".md")) cpSync(join(OUT, f), join(plug, "docs", "components", f));
  }
  writeFileSync(join(plug, "docs", "DESIGN.md"), consumerDesign);
  // version pins (step 2.6): which npm versions this plugin documents
  const pins = {};
  for (const dir of ["tokens", "icons", "react-baseui", "web-components", "zeta-web"]) {
    const m = JSON.parse(readFileSync(join(ROOT, "packages", dir, "package.json"), "utf8"));
    pins[m.name] = m.version;
  }
  writeFileSync(join(plug, "docs", "versions.json"), JSON.stringify({ documents: pins }, null, 2) + "\n");
}

for (const [dir, p] of Object.entries(PACKAGES)) {
  const pkgDir = join(ROOT, "packages", dir);
  const list = componentIndex(p.has);
  writeFileSync(join(pkgDir, "AGENTS.md"), p.agents(list));
  writeFileSync(join(pkgDir, "llms.txt"),
`# ${p.title}

> ${p.blurb} Part of the Zebra Design System; tokens are the base of the graph and themes are CSS classes/attributes, no JavaScript.

## Docs
- [AGENTS.md](./AGENTS.md): the usage contract for agents, shipped in this package
- [DESIGN.md](./DESIGN.md): the system's design voice (principles, shape inheritance, patterns) — in the component-library packages
- [Component usage docs](https://github.com/zebratechnologies/zebra-design-system/tree/main/docs/components): one page per component
- [Versioning policy](https://github.com/zebratechnologies/zebra-design-system/blob/main/VERSIONING.md)
`);
}
console.log(`generated ${slugs.length} component docs + index, and AGENTS.md + llms.txt for ${Object.keys(PACKAGES).length} packages`);
