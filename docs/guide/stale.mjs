// Tells whether the published Manager's Playbook is behind the design system.
//   node docs/guide/stale.mjs           prints what changed since the last publish
//   node docs/guide/stale.mjs --hook    Claude Code Stop hook: sends Claude back to update the page
//   node docs/guide/stale.mjs --mark    records the current state, after a successful publish
import { createHash } from "node:crypto";
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join, relative, resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "../..");
const RECORD = join(import.meta.dirname, "published.json");
const URL = "https://claude.ai/artifact/FB685boKEuodGJj7Xw3ymX";

// src/tokens and tokens/_dump are left out: they are generated from what is listed here.
const AREAS = {
  components: ["packages/web-components/src/components", "packages/web-components/src/index.ts"],
  tokens: ["tokens/base", "tokens/extensions", "tokens/manifest.json"],
  icons: ["packages/icons/codepoints.json", "packages/icons/inventory.json"],
  specs: ["specs"],
  docs: ["README.md", "DESIGN.md", "CONTRIBUTING.md"],
  skills: [".claude/skills"],
  guide: ["docs/guide/index.html", "docs/guide/build.mjs"],
};
const SKIP = new Set(["node_modules", ".DS_Store"]);

const walk = (path) => {
  if (!existsSync(path) || SKIP.has(path.split("/").pop())) return [];
  if (!statSync(path).isDirectory()) return [path];
  return readdirSync(path).sort().flatMap((name) => walk(join(path, name)));
};

const hashArea = (paths) => {
  const hash = createHash("sha256");
  for (const file of paths.flatMap((path) => walk(join(ROOT, path)))) {
    hash.update(relative(ROOT, file)).update(readFileSync(file));
  }
  return hash.digest("hex");
};

export const current = () => Object.fromEntries(Object.entries(AREAS).map(([area, paths]) => [area, hashArea(paths)]));

const published = () => (existsSync(RECORD) ? JSON.parse(readFileSync(RECORD, "utf8")).areas ?? {} : {});
const changedAreas = () => {
  const now = current();
  const last = published();
  return Object.keys(now).filter((area) => now[area] !== last[area]);
};

const mode = process.argv[2];

if (mode === "--mark") {
  writeFileSync(RECORD, `${JSON.stringify({ url: URL, publishedAt: new Date().toISOString(), areas: current() }, null, 2)}\n`);
  console.log("Recorded the published state.");
} else if (mode === "--hook") {
  const input = JSON.parse(readFileSync(0, "utf8") || "{}");
  const changed = changedAreas();
  // stop_hook_active means this turn was already sent back once. Stopping here prevents a loop.
  if (changed.length && !input.stop_hook_active) {
    console.log(JSON.stringify({
      decision: "block",
      reason: `The Manager's Playbook is behind the design system. Changed: ${changed.join(", ")}. Follow the zebra-playbook skill to update and republish it, then run node docs/guide/stale.mjs --mark. If you can't publish, say so and leave it unmarked.`,
    }));
  }
} else {
  const changed = changedAreas();
  console.log(changed.length ? `Behind in: ${changed.join(", ")}` : "The playbook is up to date.");
}
