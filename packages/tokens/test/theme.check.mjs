/* Checks that `zebra-theme` builds a project theme the way a shipped extension is
 * built, and refuses a theme that renames or invents tokens. Node only: the
 * browser proof that scopes re-theme lives in web-components' theming check. */
import { execFileSync, spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const bin = join(here, "..", "bin", "zebra-theme.mjs");
const tmp = mkdtempSync(join(tmpdir(), "zds-theme-"));
const fail = (m) => { console.error("✗ theme check: " + m); process.exitCode = 1; };
try {
  const out = join(tmp, "sample.theme.css");
  execFileSync(process.execPath, [bin, join(here, "sample.theme.json"), out], { stdio: "pipe" });
  const css = readFileSync(out, "utf8");
  const block = (selector) => css.split("\n}\n").find((b) => b.includes(selector + " {") || b.includes(selector + ",")) ?? "";
  // every way the theme and a mode can meet has a scope
  for (const s of [".ext-sample {", ".ext-sample.mode-dark,", ".mode-dark .ext-sample,", ".ext-sample .mode-dark {", ".ext-sample .mode-aaa-light {"])
    if (!css.includes(s)) fail(`no scope for "${s}"`);
  // the override, and a token that only depends on it, are both re-declared
  if (!block(".ext-sample").includes("--primitives-color-brand-main-60: #7a1fa2;")) fail("the overridden primitive is not declared in the theme's own scope");
  if (!block(".ext-sample").includes("--interactive-primary-background-default:")) fail("a dependent semantic token is not re-declared in the theme's own scope");
  // the Dark-only role change is in the dark scope and not the light one
  if (!block(".ext-sample.mode-dark").includes("--palette-brand-primary-default: var(--primitives-color-brand-main-40);")) fail("the Dark-only override is missing from the dark scope");
  if (block(".ext-sample.mode-light").includes("--palette-brand-primary-default: var(--primitives-color-brand-main-40);")) fail("the Dark-only override leaked into the light scope");
  // a theme that invents a token, or gives a role a raw value, is refused and writes nothing
  const bad = join(tmp, "bad.theme.json");
  writeFileSync(bad, JSON.stringify({ name: "bad", values: { primitives: { "color/brand/main/65": "#000" }, palette: { "brand/primary/default": "#f00" } } }));
  const r = spawnSync(process.execPath, [bin, bad, join(tmp, "bad.css")], { encoding: "utf8" });
  if (r.status === 0) fail("a theme with an unknown token and a raw role value was accepted");
  if (!/no such token/.test(r.stderr) || !/must alias a token/.test(r.stderr)) fail("the refusal does not name both problems");
  if (!process.exitCode) console.log("✓ theme check: scopes, dependents, per-mode overrides and refusals");
} finally { rmSync(tmp, { recursive: true, force: true }); }
