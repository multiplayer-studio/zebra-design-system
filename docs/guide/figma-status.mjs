// Works out, for every component in figma-components.json, which spec covers it and how each library builds it.
// Used by build.mjs; the result travels in dist/build.json. Read straight from the repo, so it is never guessed.
//   spec:  the specs/<slug> whose component, sets or subcomponents carry the Figma name, or specs/<kebab-name>
//   code:  "From spec" when the library's source names that spec (@spec tags; Zeta Web's api-map.json),
//          "Experimental" when an element of that name exists without it and its file says EXPERIMENTAL,
//          "Not from spec" when it exists without either, "Not built" otherwise.
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
const words = (s) => s.replace(/\(.*?\)/g, (m) => ` ${m.slice(1, -1)} `).split(/[^A-Za-z0-9]+/).filter(Boolean);
const kebab = (s) => words(s).map((w) => w.toLowerCase()).join("-");
const pascal = (s) => words(s).map((w) => w[0].toUpperCase() + w.slice(1).toLowerCase()).join("");

const files = (dir, test, out = []) => {
  if (!existsSync(dir)) return out;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) files(path, test, out);
    else if (test.test(entry.name)) out.push(path);
  }
  return out;
};

/** Every name a spec answers to: its component, its sets, its subcomponents and their sets, its family. */
function specNames(spec) {
  const names = [spec.component?.name];
  const visit = (part) => {
    if (!part || typeof part !== "object") return;
    names.push(part.name);
    for (const set of Object.values(part.sets ?? {})) names.push(set?.name);
  };
  visit(spec.component);
  for (const key of ["subcomponents", "family", "compositions"]) {
    const list = Array.isArray(spec[key]) ? spec[key] : Object.values(spec[key] ?? {});
    list.forEach(visit);
  }
  // A slot's `accepts` lists the sets it takes (Input's type: Input / Text, Input / Number…).
  const accepts = (api) => {
    for (const prop of Object.values(api ?? {})) {
      if (!prop || typeof prop !== "object") continue;
      if (Array.isArray(prop.accepts)) names.push(...prop.accepts);
      else if (!prop.type) accepts(prop);
    }
  };
  accepts(spec.api);
  // One part can name several sets: "Input / Text · Number · Password" is Input / Text, Input / Number…
  const expanded = names.filter(Boolean).flatMap((n) => {
    const [first, ...rest] = n.split(" · ");
    const prefix = first.includes(" / ") ? first.slice(0, first.lastIndexOf(" / ") + 3) : "";
    return [n, first, ...rest.map((r) => prefix + r)];
  });
  // Private parts (_Label) never stand for a public Figma component of the same name.
  return expanded.filter((n) => !/^[_.]/.test(n.trim()));
}

export function figmaStatus(root) {
  const snapshot = JSON.parse(readFileSync(join(root, "docs/guide/figma-components.json"), "utf8"));

  // A spec is a file: specs/<dir>/<stem>.spec.json. Most folders hold one (button/button); Badges holds four.
  const specDir = join(root, "specs");
  const specIds = files(specDir, /\.spec\.json$/).map((p) => p.slice(specDir.length + 1).replace(/\.spec\.json$/, ""));
  const bySpecName = new Map();
  for (const id of specIds) {
    const spec = JSON.parse(readFileSync(join(specDir, `${id}.spec.json`), "utf8"));
    // The spec's own component wins over a spec that only lists it as a part.
    specNames(spec).forEach((name, i) => {
      if (!bySpecName.has(norm(name)) || i === 0) bySpecName.set(norm(name), id);
    });
  }
  const byKebab = (name) => specIds.find((id) => id === `${kebab(name)}/${kebab(name)}`) ?? null;

  const read = (paths) => paths.map((p) => readFileSync(p, "utf8")).join("\n");
  const specsNamedIn = (text) => new Set([...text.matchAll(/specs\/([a-z0-9-]+\/[a-z0-9-]+)\.spec/g)].map((m) => m[1]));

  const reactSrc = read(files(join(root, "packages/react-baseui/src/components"), /\.(tsx|ts|css)$/));
  const reactIndex = readFileSync(join(root, "packages/react-baseui/src/index.ts"), "utf8");
  const wcSrc = read(files(join(root, "packages/web-components/src/components"), /\.ts$/));
  const apiMap = JSON.parse(readFileSync(join(root, ".claude/skills/zeta-web-components/references/api-map.json"), "utf8"));

  // `defines` returns the source of the file that defines the element, or null. An element whose file says
  // EXPERIMENTAL (the marker experimental-figma-build and the packages use) reports as Experimental.
  const reactDir = join(root, "packages/react-baseui/src");
  const byTag = (dir, prefix) => {
    const sources = files(dir, /\.ts$/).map((p) => readFileSync(p, "utf8"));
    return (n) => sources.find((src) => src.includes(`customElement("${prefix}-${kebab(n)}")`)) ?? null;
  };
  const libs = {
    react: {
      specs: specsNamedIn(reactSrc),
      defines: (n) => {
        const line = reactIndex.split("\n").find((l) => /^export \{/.test(l) && new RegExp(`\\b${pascal(n)}\\b`).test(l));
        const from = line && /from "\.\/(.+?)\.js"/.exec(line)?.[1];
        const file = from && [".tsx", ".ts"].map((ext) => join(reactDir, from + ext)).find(existsSync);
        return file ? readFileSync(file, "utf8") : null;
      },
    },
    wc: { specs: specsNamedIn(wcSrc), defines: byTag(join(root, "packages/web-components/src/components"), "zds") },
    zeta: {
      specs: new Set(Object.values(apiMap).flatMap((e) => (typeof e?.spec === "string" ? [e.spec.replace(/^specs\/|\.spec\.json$/g, "")] : []))),
      defines: byTag(join(root, "packages/zeta-web/src/components"), "zeta"),
    },
  };

  const rows = [];
  for (const { page, pageId, components } of snapshot.pages) {
    for (const component of components) {
      const spec = bySpecName.get(norm(component)) ?? byKebab(component);
      const status = (lib) => {
        if (spec && lib.specs.has(spec)) return "From spec";
        const source = lib.defines(component);
        return source === null ? "Not built" : /\bEXPERIMENTAL\b/.test(source) ? "Experimental" : "Not from spec";
      };
      const [dir, stem] = spec ? spec.split("/") : [];
      rows.push({
        page,
        pageId,
        component,
        // Shown as its folder, or folder/file where a folder holds several specs.
        spec: spec ? (dir === stem ? dir : spec) : "",
        react: status(libs.react),
        wc: status(libs.wc),
        zeta: status(libs.zeta),
      });
    }
  }
  return { readAt: snapshot.readAt, fileKey: snapshot.fileKey, rows };
}
