#!/usr/bin/env node
/* `npx zebra-skills` — copies the Claude Code skills shipped inside this
 * package into the consumer project's .claude/skills/, where Claude Code
 * discovers them. Explicit by design: a postinstall writing outside
 * node_modules would be hostile (and pnpm blocks it anyway).
 *
 *   npx zebra-skills            install/update into ./.claude/skills
 *   npx zebra-skills --list     show what would be installed
 */
import { cpSync, readdirSync, existsSync, mkdirSync, readFileSync, rmSync } from "node:fs";
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

// Skills this package used to ship under another name. From 0.8.0 the names
// say who a skill is for (designer-, builder-, shared-). An old copy is removed
// so a project never carries both, but only when it is ours: its SKILL.md
// still carries the old name.
const RETIRED = {
  "zebra-prototype": "designer-prototype",
  "zebra-onboard-project": "designer-project-onboarding",
  "zebra-theme": "designer-theme",
  "zebra-handoff": "designer-handoff",
  "zebra-figma-to-code": "builder-figma-to-code",
  "zebra-build-ui": "builder-ui",
  "zebra-ux-patterns": "shared-ux-patterns",
  "zebra-ux-audit": "shared-ux-audit",
};

const dest = join(process.cwd(), ".claude", "skills");
mkdirSync(dest, { recursive: true });
for (const [old, now] of Object.entries(RETIRED)) {
  const dir = join(dest, old);
  if (!skills.includes(now) || !existsSync(join(dir, "SKILL.md"))) continue;
  if (!new RegExp(`^name:\\s*${old}\\s*$`, "m").test(readFileSync(join(dir, "SKILL.md"), "utf8"))) continue;
  rmSync(dir, { recursive: true, force: true });
  console.log(`removed  .claude/skills/${old} (now ${now})`);
}
for (const s of skills) {
  const existed = existsSync(join(dest, s));
  cpSync(join(src, s), join(dest, s), { recursive: true });
  console.log(`${existed ? "updated" : "installed"} .claude/skills/${s}`);
}
console.log(`\nDone. Claude Code picks these up in this project; re-run after package updates.`);
