#!/usr/bin/env node
/* `npx zebra-skills` — copies the Claude Code skills shipped inside this
 * package into the consumer project's .claude/skills/, where Claude Code
 * discovers them. Explicit by design: a postinstall writing outside
 * node_modules would be hostile (and pnpm blocks it anyway).
 *
 *   npx zebra-skills            install/update into ./.claude/skills
 *   npx zebra-skills --list     show what would be installed
 */
import { cpSync, readdirSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const pkgRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = join(pkgRoot, "skills");
const skills = readdirSync(src, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name);

if (process.argv.includes("--list")) {
  for (const s of skills) {
    const head = readFileSync(join(src, s, "SKILL.md"), "utf8");
    const desc = head.match(/^description:\s*(.+)$/m)?.[1] ?? "";
    console.log(`${s} — ${desc.split(". ")[0]}.`);
  }
  process.exit(0);
}

const dest = join(process.cwd(), ".claude", "skills");
mkdirSync(dest, { recursive: true });
for (const s of skills) {
  const existed = existsSync(join(dest, s));
  cpSync(join(src, s), join(dest, s), { recursive: true });
  console.log(`${existed ? "updated" : "installed"} .claude/skills/${s}`);
}
console.log(`\nDone. Claude Code picks these up in this project; re-run after package updates.`);
