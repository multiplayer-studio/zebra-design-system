#!/usr/bin/env node
// Prints every exported React component in packages/react-baseui with its
// props, one block per component, so a page can be composed without opening
// each source file. Run from the repo root:
//
//   node .claude/skills/zebra-builder-skill/scripts/react-props.mjs [filter]
//
// `filter` keeps only components whose name contains it (case-insensitive).
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const root = "packages/react-baseui/src/components";
const filter = (process.argv[2] || "").toLowerCase();

for (const dir of readdirSync(root).sort()) {
  const path = join(root, dir);
  if (!statSync(path).isDirectory()) continue;
  for (const file of readdirSync(path).filter((f) => f.endsWith(".tsx") && !f.includes(".stories"))) {
    const src = readFileSync(join(path, file), "utf8");
    const types = Object.fromEntries([...src.matchAll(/export type (\w+) = ([^;]+);/g)].map((m) => [m[1], m[2].replace(/\s+/g, " ")]));
    for (const m of src.matchAll(/export interface (\w+)Props\b[^{]*\{([\s\S]*?)\n\}/g)) {
      const name = m[1];
      if (filter && !name.toLowerCase().includes(filter)) continue;
      if (!new RegExp(`export const ${name}\\b`).test(src)) continue;
      const ext = (m[0].match(/extends ([^{]+)\{/) || [])[1]?.trim().replace(/\s+/g, " ");
      const props = [...m[2].matchAll(/^\s+(\w+)(\??):\s*([^;]+);/gm)].map(([, p, opt, t]) => {
        const resolved = types[t.trim()] ? `${t.trim()} = ${types[t.trim()]}` : t.trim();
        return `  ${p}${opt}: ${resolved}`;
      });
      console.log(`${name}  (${dir}/${file})${ext ? `\n  extends ${ext}` : ""}\n${props.join("\n")}\n`);
    }
  }
}
