// Reads every component on the Figma file's component pages into figma-components.json, for the Figma Status tab:
// node docs/guide/figma-sync.mjs (from the repo root). Needs FIGMA_PERSONAL_ACCESS_TOKEN, from the environment or .env.
// The component pages are the ones between the "COMPONENTS" page and the "---" divider. Private sets (_ or .) and
// Templates are left out. Reads the file itself, not the published library, which lags behind it.
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const HERE = import.meta.dirname;
const ROOT = resolve(HERE, "../..");
const FILE = "hvRmnZZOZrmTW0wf8hbrt5";

let token = process.env.FIGMA_PERSONAL_ACCESS_TOKEN;
if (!token && existsSync(join(ROOT, ".env"))) {
  token = /^FIGMA_PERSONAL_ACCESS_TOKEN=(.*)$/m.exec(readFileSync(join(ROOT, ".env"), "utf8"))?.[1]?.trim().replace(/^["']|["']$/g, "");
}
if (!token) throw new Error("FIGMA_PERSONAL_ACCESS_TOKEN is not set, in the environment or .env");

const get = async (path) => {
  const res = await fetch(`https://api.figma.com/v1/files/${FILE}${path}`, { headers: { "X-Figma-Token": token } });
  if (!res.ok) throw new Error(`Figma ${res.status} for ${path.split("?")[0] || "/"}`);
  return res.json();
};

const pages = (await get("?depth=1")).document.children;
const names = pages.map((p) => p.name);
const start = names.indexOf("COMPONENTS");
const end = names.indexOf("---");
if (start < 0 || end <= start) throw new Error('Expected a "COMPONENTS" page and a "---" divider after it');
const componentPages = pages.slice(start + 1, end);

// Depth 4 reaches sets inside a section and a frame, which is as deep as the component pages nest them.
const tree = await get(`?ids=${componentPages.map((p) => p.id).join(",")}&depth=4`);
const isPublic = (name) => !/^[_.]/.test(name.trim()) && !/^template\//i.test(name.trim());
// A set is a main component unless the top-level frame holding it is "Subcomponents/<Name>" or "<Name> Templates",
// the page layout the spec skill also reads.
const isSub = (frame) => /^subcomponents\b/i.test(frame ?? "") || /templates?$/i.test(frame ?? "");
const collect = (node, top, out) => {
  for (const child of node.children ?? []) {
    if (child.type === "COMPONENT_SET" || child.type === "COMPONENT") {
      if (isPublic(child.name)) out.push({ name: child.name.trim(), sub: isSub(top) });
    } else if (["FRAME", "SECTION", "GROUP"].includes(child.type)) collect(child, top ?? child.name.trim(), out);
  }
  return out;
};

const byId = new Map(tree.document.children.map((p) => [p.id, p]));
// A main component placed on a second page (Notification Indicator on Navigation Bar) is listed once, on its first.
const seen = new Set();
const result = {
  fileKey: FILE,
  readAt: new Date().toISOString(),
  pages: componentPages.map((p) => {
    const sets = collect(byId.get(p.id) ?? { children: [] }, null, []);
    const components = [...new Set(sets.filter((s) => !s.sub).map((s) => s.name))].filter((n) => !seen.has(n));
    components.forEach((n) => seen.add(n));
    return { page: p.name, pageId: p.id, components, subcomponents: [...new Set(sets.filter((s) => s.sub).map((s) => s.name))] };
  }),
};
writeFileSync(join(HERE, "figma-components.json"), `${JSON.stringify(result, null, 2)}\n`);
const count = (key) => result.pages.reduce((n, p) => n + p[key].length, 0);
console.log(`Read ${result.pages.length} pages: ${count("components")} main components, ${count("subcomponents")} subcomponents`);
