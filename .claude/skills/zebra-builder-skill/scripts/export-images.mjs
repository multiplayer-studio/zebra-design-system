#!/usr/bin/env node
// Renders Figma image layers through the REST API and saves them as PNGs.
// Rendering the layer (not downloading the raw fill) keeps Figma's crop and fit.
//
//   node export-images.mjs <fileKey> <outDir> <nodeId>=<name>[@scale] ...
//   node export-images.mjs <fileKey> stories/assets/<page> 12:345=hero@2 12:678=avatar@3
//
// Reads FIGMA_PERSONAL_ACCESS_TOKEN from the environment or the repo's .env.
// Never prints the token.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { resolve, join } from "node:path";

const [fileKey, outDir, ...specs] = process.argv.slice(2);
if (!fileKey || !outDir || !specs.length) {
  console.error("usage: export-images.mjs <fileKey> <outDir> <nodeId>=<name>[@scale] ...");
  process.exit(1);
}

let token = process.env.FIGMA_PERSONAL_ACCESS_TOKEN;
if (!token) {
  for (let dir = process.cwd(); dir !== "/"; dir = resolve(dir, "..")) {
    const env = join(dir, ".env");
    if (existsSync(env)) {
      const m = readFileSync(env, "utf8").match(/^FIGMA_PERSONAL_ACCESS_TOKEN=(.*)$/m);
      if (m) { token = m[1].trim().replace(/^["']|["']$/g, ""); break; }
    }
  }
}
if (!token) { console.error("FIGMA_PERSONAL_ACCESS_TOKEN not found in the environment or .env"); process.exit(1); }

const byScale = new Map();
for (const s of specs) {
  // Plain ids (12:34 or 12-34) and ids of layers inside instances (I12:34;56:78).
  const m = s.match(/^(I?\d+[:-]\d+(?:;\d+:\d+)*)=([\w.-]+?)(?:@(\d+(?:\.\d+)?))?$/);
  if (!m) { console.error(`bad spec: ${s}`); process.exit(1); }
  const [, id, name, scale = "2"] = m;
  if (!byScale.has(scale)) byScale.set(scale, []);
  byScale.get(scale).push({ id: id.startsWith("I") ? id : id.replace("-", ":"), name });
}

mkdirSync(outDir, { recursive: true });
for (const [scale, items] of byScale) {
  const url = `https://api.figma.com/v1/images/${fileKey}?ids=${items.map((i) => i.id).join(",")}&scale=${scale}&format=png`;
  const res = await fetch(url, { headers: { "X-Figma-Token": token } });
  const json = await res.json();
  if (json.err) { console.error(`Figma: ${json.err}`); process.exit(1); }
  for (const { id, name } of items) {
    const src = json.images?.[id];
    if (!src) { console.error(`no render for ${id}`); continue; }
    const png = Buffer.from(await (await fetch(src)).arrayBuffer());
    const file = join(outDir, `${name}.png`);
    writeFileSync(file, png);
    console.log(`${file}  ${(png.length / 1024).toFixed(0)} KB  @${scale}x`);
  }
}
