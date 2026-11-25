#!/usr/bin/env node
/* Quick look at a codebase, for designer-project-onboarding step 3 and
 * builder-start step 2. The two copies are kept identical.
 *
 * Reads the code and prints, in one run, what the review would otherwise
 * collect file by file: the commit, the interface libraries, the theme files,
 * the colours, fonts, corners and breakpoints in use (counted), the modes, the
 * routes, the layout files and the components screens use most.
 *
 * Read-only. It never installs, builds or runs the project.
 *
 *   node survey-repo.mjs [dir]                 the whole project
 *   node survey-repo.mjs [dir] --screen=<file> also what one screen is made of
 *   node survey-repo.mjs [dir] --json          the same, as JSON
 */
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, relative, extname, dirname, basename, resolve } from "node:path";
import { execFileSync } from "node:child_process";

const args = process.argv.slice(2);
const flag = (name) => args.find((a) => a.startsWith(`--${name}=`))?.split("=").slice(1).join("=");
const root = resolve(args.find((a) => !a.startsWith("--")) ?? ".");
const asJson = args.includes("--json");
const screenArg = flag("screen");

const SKIP_DIRS = new Set([
  "node_modules", ".git", "dist", "build", "out", ".next", ".nuxt", ".svelte-kit", ".turbo", ".cache",
  "coverage", "vendor", "target", ".dart_tool", "Pods", ".gradle", "__pycache__", ".venv", "venv",
  "storybook-static", ".output", "tmp", "zebra-context", "zebra-build", "prototypes",
]);
const STYLE = new Set([".css", ".scss", ".sass", ".less", ".styl"]);
const MARKUP = new Set([".jsx", ".tsx", ".vue", ".svelte", ".html", ".astro"]);
const CODE = new Set([".js", ".mjs", ".cjs", ".ts", ".dart", ".json"]);
const MAX_BYTES = 400_000;
const MAX_FILES = 6000;

/* ---- collect files -------------------------------------------------------- */
const files = [];
(function walk(dir) {
  if (files.length >= MAX_FILES) return;
  let entries;
  try { entries = readdirSync(dir, { withFileTypes: true }); } catch { return; }
  for (const e of entries) {
    if (e.name.startsWith(".") && e.name !== ".storybook") continue;
    const p = join(dir, e.name);
    if (e.isDirectory()) { if (!SKIP_DIRS.has(e.name)) walk(p); continue; }
    const ext = extname(e.name);
    if (!(STYLE.has(ext) || MARKUP.has(ext) || CODE.has(ext))) continue;
    if (/\.(min|map|lock|test|spec|stories)\./.test(e.name) || /-lock\.json$/.test(e.name)) continue;
    try { if (statSync(p).size > MAX_BYTES) continue; } catch { continue; }
    files.push(p);
    if (files.length >= MAX_FILES) return;
  }
})(root);

const rel = (p) => relative(root, p);
const read = (p) => { try { return readFileSync(p, "utf8"); } catch { return ""; } };

/* ---- counting helpers ----------------------------------------------------- */
const tally = () => new Map();
const add = (map, key, file) => {
  const row = map.get(key) ?? { count: 0, files: new Set() };
  row.count += 1; row.files.add(file); map.set(key, row);
};
const top = (map, n) => [...map.entries()]
  .sort((a, b) => b[1].count - a[1].count)
  .slice(0, n)
  .map(([value, r]) => ({ value, count: r.count, files: r.files.size }));

const hex = (h) => {
  let s = h.toLowerCase().slice(1);
  if (s.length === 3 || s.length === 4) s = [...s].map((c) => c + c).join("");
  return `#${s}`;
};

const colours = tally(), fonts = tally(), radii = tally(), fontSizes = tally(), weights = tally();
const breakpoints = tally(), tags = tally(), customEls = tally(), libImports = tally();
const varDecl = new Map(), varUse = tally();
const modes = { "prefers-color-scheme": 0, "data-theme / data-mode": 0, ".dark class": 0, "dark: utilities": 0 };
const declaredRoutes = new Set();

for (const f of files) {
  const ext = extname(f);
  const text = read(f);
  if (!text) continue;
  const name = rel(f);
  const styled = STYLE.has(ext) || MARKUP.has(ext) || /\.(js|ts|mjs|cjs|dart)$/.test(ext);
  if (ext === ".json" && !/theme|token|colou?r|palette/i.test(name)) continue;

  if (styled || ext === ".json") {
    for (const m of text.matchAll(/#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3,4})\b/g)) {
      // skip anchors and ids such as #top; a colour has a hex digit mix
      if (/^#[a-fA-F]+$/.test(m[0]) && m[0].length !== 7 && m[0].length !== 4) continue;
      add(colours, hex(m[0]), name);
    }
    for (const m of text.matchAll(/\b(?:rgba?|hsla?|oklch)\(\s*[^)]{3,60}\)/g)) add(colours, m[0].replace(/\s+/g, " "), name);
    for (const m of text.matchAll(/\b0x([0-9a-fA-F]{8})\b/g)) add(colours, `#${m[1].slice(2).toLowerCase()} (0x${m[1].slice(0, 2)} alpha)`, name);
  }
  if (styled) {
    for (const m of text.matchAll(/font-family\s*:\s*([^;}{\n`]+)/g)) add(fonts, m[1].trim().replace(/\s+/g, " ").slice(0, 80), name);
    for (const m of text.matchAll(/fontFamily\s*[:=]\s*['"`]([^'"`]+)['"`]/g)) add(fonts, m[1].trim(), name);
    for (const m of text.matchAll(/border-radius\s*:\s*([^;}{\n`]+)/g)) add(radii, m[1].trim(), name);
    for (const m of text.matchAll(/borderRadius\s*[:=]\s*['"`]?([\w.%]+)/g)) add(radii, m[1], name);
    for (const m of text.matchAll(/font-size\s*:\s*([^;}{\n`]+)/g)) add(fontSizes, m[1].trim(), name);
    for (const m of text.matchAll(/font-weight\s*:\s*([^;}{\n`]+)/g)) add(weights, m[1].trim(), name);
    for (const m of text.matchAll(/@media[^{]*?\((min|max)-width\s*:\s*([\d.]+(?:px|em|rem))\)/g)) add(breakpoints, `${m[1]}-width ${m[2]}`, name);
    for (const m of text.matchAll(/(--[\w-]+)\s*:\s*([^;}{\n`]+)/g)) {
      if (!varDecl.has(m[1])) varDecl.set(m[1], { value: m[2].trim().slice(0, 60), file: name });
    }
    for (const m of text.matchAll(/var\(\s*(--[\w-]+)/g)) add(varUse, m[1], name);
    modes["prefers-color-scheme"] += (text.match(/prefers-color-scheme/g) ?? []).length;
    modes["data-theme / data-mode"] += (text.match(/data-(?:theme|mode|color-scheme)/g) ?? []).length;
    modes[".dark class"] += (text.match(/\.dark\b|class(?:Name)?=["'][^"']*\bdark\b/g) ?? []).length;
    modes["dark: utilities"] += (text.match(/\bdark:[\w-]+/g) ?? []).length;
  }
  if (MARKUP.has(ext) || /\.(js|ts)$/.test(ext)) {
    for (const m of text.matchAll(/<([A-Z][A-Za-z0-9]*(?:\.[A-Z][A-Za-z0-9]*)?)[\s/>]/g)) add(tags, m[1], name);
    for (const m of text.matchAll(/<([a-z][a-z0-9]*-[a-z0-9-]+)[\s/>]/g)) add(customEls, m[1], name);
    for (const m of text.matchAll(/from\s+['"]((?:@[\w.-]+\/)?[\w.-]+)(?:\/[^'"]*)?['"]/g)) add(libImports, m[1], name);
    for (const m of text.matchAll(/<Route[^>]*\spath=["'`]([^"'`]+)["'`]/g)) declaredRoutes.add(m[1]);
    for (const m of text.matchAll(/\bpath\s*:\s*["'`](\/?[\w:/*\-[\]]*)["'`]/g)) declaredRoutes.add(m[1]);
  }
}

/* ---- commit --------------------------------------------------------------- */
let commit = null;
try { commit = execFileSync("git", ["-C", root, "rev-parse", "--short", "HEAD"], { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim(); } catch { /* not a git repo */ }

/* ---- libraries ------------------------------------------------------------ */
const UI_LIB = /^(react|react-dom|react-native|next|vue|nuxt|svelte|@sveltejs\/kit|@angular\/core|@angular\/material|lit|solid-js|preact|astro|@mui\/.*|@material-ui\/.*|@material\/web|antd|@ant-design\/.*|@chakra-ui\/.*|@mantine\/.*|@radix-ui\/.*|@base-ui-components\/.*|@headlessui\/.*|@fluentui\/.*|@carbon\/.*|carbon-components.*|bootstrap|react-bootstrap|tailwindcss|daisyui|@shadcn\/.*|primereact|primevue|vuetify|quasar|element-plus|@ionic\/.*|@blueprintjs\/.*|@adobe\/react-spectrum|@spectrum-web-components\/.*|@shoelace-style\/.*|semantic-ui.*|@emotion\/.*|styled-components|@vanilla-extract\/.*|@stitches\/.*|sass|less|@zebra-design-system\/.*|@zebra-fed\/.*|lucide.*|@heroicons\/.*|@fortawesome\/.*|@tabler\/icons.*|react-icons|@phosphor-icons\/.*|recharts|chart\.js|d3|@nivo\/.*|echarts|ag-grid.*|@tanstack\/react-table|react-router.*|@tanstack\/react-router|vue-router|framer-motion|motion)$/;

const lockVersion = (() => {
  const npmLock = join(root, "package-lock.json"), pnpmLock = join(root, "pnpm-lock.yaml"), yarnLock = join(root, "yarn.lock");
  if (existsSync(npmLock)) {
    try {
      const pk = JSON.parse(read(npmLock)).packages ?? {};
      return (n) => pk[`node_modules/${n}`]?.version;
    } catch { /* fall through */ }
  }
  if (existsSync(pnpmLock)) {
    const t = read(pnpmLock);
    return (n) => {
      const esc = n.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&");
      return t.match(new RegExp(`^\\s*'?/?${esc}@(\\d[\\w.-]*)`, "m"))?.[1]
        ?? t.match(new RegExp(`^\\s+'?${esc}'?:\\s*\\n\\s+specifier:[^\\n]*\\n\\s+version:\\s*'?(\\d[\\w.-]*)`, "m"))?.[1];
    };
  }
  if (existsSync(yarnLock)) {
    const t = read(yarnLock);
    return (n) => {
      const esc = n.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&");
      return t.match(new RegExp(`^"?${esc}@[^\\n]*:\\n\\s+version:?\\s+"?(\\d[\\w.-]*)`, "m"))?.[1];
    };
  }
  return () => undefined;
})();

const libraries = [];
const manifests = [];
const pkgFiles = [join(root, "package.json"), ...files.filter((f) => basename(f) === "package.json" && dirname(f) !== root)].filter(existsSync);
const seenLib = new Set();
for (const pf of pkgFiles.slice(0, 40)) {
  let pkg; try { pkg = JSON.parse(read(pf)); } catch { continue; }
  manifests.push(rel(pf) || "package.json");
  for (const [n, range] of Object.entries({ ...pkg.dependencies, ...pkg.devDependencies, ...pkg.peerDependencies })) {
    if (!UI_LIB.test(n) || seenLib.has(n)) continue;
    seenLib.add(n);
    libraries.push({ name: n, version: lockVersion(n) ?? String(range), imports: libImports.get(n)?.count ?? 0 });
  }
}
if (existsSync(join(root, "pubspec.yaml"))) {
  manifests.push("pubspec.yaml");
  const deps = read(join(root, "pubspec.yaml")).match(/^dependencies:\n((?:[ \t]+.*\n?|\n)*)/m)?.[1] ?? "";
  for (const m of deps.matchAll(/^ {2}([\w_]+):\s*(\S*)/gm)) libraries.push({ name: m[1], version: m[2] || "(see pubspec)", imports: 0 });
}
libraries.sort((a, b) => b.imports - a.imports);

/* ---- theme files, layouts, routes ----------------------------------------- */
const themeFiles = files.map(rel).filter((f) => /(theme|tokens?|variables|palette|colou?rs|typography|tailwind\.config|globals?\.(s?css|less)|_variables|design-system)/i.test(basename(f)) || /(^|\/)(theme|tokens|styles\/tokens)\//i.test(f)).slice(0, 40);
const layoutFiles = files.map(rel).filter((f) => /(^|\/)(_?layout|_app|app|root|.*(shell|sidebar|side-?nav|nav-?bar|navigation|top-?bar|app-?bar|header|footer|drawer|tab-?bar|bottom-?nav).*)\.(jsx|tsx|vue|svelte|astro|dart|html|js|ts)$/i.test(f)).slice(0, 40);

const routeFiles = [];
for (const f of files.map(rel)) {
  let m;
  if ((m = f.match(/(?:^|\/)app\/(.*?)\/?page\.(?:jsx?|tsx?|mdx?)$/))) routeFiles.push({ route: `/${m[1].replace(/\([^)]*\)\/?/g, "")}`.replace(/\/$/, "") || "/", file: f });
  else if ((m = f.match(/(?:^|\/)pages\/(.*)\.(?:jsx?|tsx?|vue|astro)$/)) && !/^(_|api\/)/.test(m[1])) routeFiles.push({ route: `/${m[1].replace(/(^|\/)index$/, "")}`.replace(/\/$/, "") || "/", file: f });
  else if ((m = f.match(/(?:^|\/)routes\/(.*?)\/?\+page\.svelte$/))) routeFiles.push({ route: `/${m[1]}`.replace(/\/$/, "") || "/", file: f });
  else if ((m = f.match(/(?:^|\/)routes\/(.*)\.(?:jsx?|tsx?|vue)$/)) && !/^(_|api\/)/.test(m[1])) routeFiles.push({ route: `/${m[1].replace(/(^|\/)index$/, "")}`.replace(/\/$/, "") || "/", file: f });
}

/* ---- one screen ----------------------------------------------------------- */
let screen = null;
if (screenArg) {
  const start = [resolve(root, screenArg), resolve(screenArg)].find(existsSync);
  if (start) {
    const seen = new Set(), parts = tally(), els = tally(), styleFiles = new Set(), from = tally();
    const tryFile = (base) => {
      for (const c of [base, ...[".tsx", ".jsx", ".ts", ".js", ".vue", ".svelte"].map((e) => base + e), ...["index.tsx", "index.jsx", "index.ts", "index.js"].map((e) => join(base, e))]) {
        try { if (statSync(c).isFile()) return c; } catch { /* next */ }
      }
      return null;
    };
    const visit = (file, depth) => {
      if (seen.has(file) || seen.size > 60) return;
      seen.add(file);
      const text = read(file);
      for (const m of text.matchAll(/<([A-Z][A-Za-z0-9]*(?:\.[A-Z][A-Za-z0-9]*)?)[\s/>]/g)) add(parts, m[1], rel(file));
      for (const m of text.matchAll(/<([a-z][a-z0-9]*-[a-z0-9-]+)[\s/>]/g)) add(els, m[1], rel(file));
      for (const m of text.matchAll(/(?:from|import)\s+['"]([^'"]+)['"]/g)) {
        const spec = m[1];
        if (/\.(s?css|less|sass)$/.test(spec)) { styleFiles.add(spec.startsWith(".") ? rel(resolve(dirname(file), spec)) : spec); continue; }
        if (!spec.startsWith(".")) { add(from, spec, rel(file)); continue; }
        if (depth < 2) { const next = tryFile(resolve(dirname(file), spec)); if (next) visit(next, depth + 1); }
      }
    };
    visit(start, 0);
    screen = { file: rel(start), filesRead: [...seen].map(rel), parts: top(parts, 60), elements: top(els, 40), importsFrom: top(from, 30), styles: [...styleFiles] };
  } else {
    screen = { file: screenArg, error: "not found" };
  }
}

/* ---- report --------------------------------------------------------------- */
const variables = [...varDecl.entries()]
  .map(([name, d]) => ({ name, value: d.value, declaredIn: d.file, uses: varUse.get(name)?.count ?? 0 }))
  .sort((a, b) => b.uses - a.uses);

const out = {
  root, commit, filesScanned: files.length, truncated: files.length >= MAX_FILES,
  manifests, libraries,
  themeFiles,
  colours: top(colours, 30),
  variables: { declared: variables.length, mostUsed: variables.slice(0, 40), unused: variables.filter((v) => v.uses === 0).length },
  fonts: top(fonts, 10), fontSizes: top(fontSizes, 14), fontWeights: top(weights, 8),
  corners: top(radii, 10),
  breakpoints: top(breakpoints, 12),
  modes,
  routes: { fromFiles: routeFiles.slice(0, 80), declared: [...declaredRoutes].filter((r) => r && r !== "/*").slice(0, 80) },
  layoutFiles,
  components: top(tags, 50), customElements: top(customEls, 30),
  screen,
};

if (asJson) { console.log(JSON.stringify(out, null, 1)); process.exit(0); }

const line = (r) => `${String(r.count).padStart(5)}  ${r.value}${r.files > 1 ? `  (${r.files} files)` : ""}`;
const sect = (title, rows, empty = "none found") => { console.log(`\n## ${title}`); console.log(rows.length ? rows.join("\n") : empty); };

console.log(`# Quick look: ${basename(root)}`);
console.log(`commit ${commit ?? "(not a git repo)"} · ${files.length} files read${out.truncated ? " (stopped at the limit: point at a narrower folder)" : ""}`);
sect("Interface libraries (version, times imported)", libraries.map((l) => `${String(l.imports).padStart(5)}  ${l.name} ${l.version}`), `none recognised in ${manifests.join(", ") || "no manifest"}`);
sect("Theme and style files", themeFiles);
sect("Colours in use (count)", out.colours.map(line));
sect(`Style variables: ${variables.length} declared, ${out.variables.unused} never used. Most used`, out.variables.mostUsed.map((v) => `${String(v.uses).padStart(5)}  ${v.name}: ${v.value}  [${v.declaredIn}]`));
sect("Fonts", out.fonts.map(line));
sect("Text sizes", out.fontSizes.map(line));
sect("Text weights", out.fontWeights.map(line));
sect("Corners", out.corners.map(line));
sect("Screen sizes (breakpoints)", out.breakpoints.map(line));
sect("Signs of modes", Object.entries(modes).map(([k, v]) => `${String(v).padStart(5)}  ${k}`));
sect("Routes from files", routeFiles.slice(0, 80).map((r) => `  ${r.route}  [${r.file}]`));
sect("Routes declared in code", out.routes.declared.map((r) => `  ${r}`));
sect("Layout and shell files", layoutFiles.map((f) => `  ${f}`));
sect("Components used most", out.components.map(line));
if (out.customElements.length) sect("Custom elements used most", out.customElements.map(line));
if (screen) {
  if (screen.error) sect(`Screen ${screen.file}`, [], "file not found");
  else {
    sect(`Screen ${screen.file}: parts`, screen.parts.map(line));
    if (screen.elements.length) sect("Screen: custom elements", screen.elements.map(line));
    sect("Screen: imports from", screen.importsFrom.map(line));
    sect("Screen: style files", screen.styles.map((s) => `  ${s}`));
    sect("Screen: files read", screen.filesRead.map((s) => `  ${s}`));
  }
}
