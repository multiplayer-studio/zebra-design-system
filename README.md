# Zebra Design System

The Zebra Design System written as plain Markdown, so that people and AI agents can both read it and build from it.

The Zebra Design System is an enterprise utility language for frontline workers who scan screens quickly, often on rugged handheld devices, with gloves on or in poor light. It uses cool-neutral greys, a single Zebra Blue accent, IBM Plex Sans, a strict mini-unit grid and low, quiet depth. It works in four modes: light, dark, AAA contrast and AAA dark.

The docs are the specification. Every colour, size, space, radius, shadow, font and duration is defined once as a token, and every component is described in its own file.

---

## Contents

| Path | What it is |
|---|---|
| [`DESIGN.md`](DESIGN.md) | The foundation. The **frontmatter** holds every raw value (the primitive colour ramps and size scale; semantic colours for light, dark, AAA and AAA dark; space, control sizes, radius, stroke, container, shadow, typography, motion, layout, opacity and component sizes). The **body** holds the rules: theme, token architecture, colour, typography, components, layout, notes for Claude generation, the component index and governance. |
| [`atoms/`](atoms/) | 25 basic components: Button, Icon Button, FAB, Icon, Checkbox, Radio Button, Switch, Slider, Avatar, Chips, Divider, Scrim, Tooltip, Progress Bar… |
| [`molecules/`](molecules/) | 31 components built from atoms (and other molecules): inputs, select, search, card, tab bar, menu items, segmented control, banners, snackbar, pagination… |
| [`organisms/`](organisms/) | 19 larger patterns: dialog, bottom sheet, lightbox, global header, top app bar, navigation bar, rail and drawer, stepper, table… |
| [`tokens.css`](tokens.css) | **Generated.** Every token as a CSS custom property, with light, dark, AAA and AAA dark blocks. |
| [`icons.json`](icons.json) | **Generated.** The 715 valid icon names from `@zebra-fed/zeta-icons` 1.9.8, keyed by ligature name, with label, category, search terms and each icon's round and sharp SVG. |
| [`scripts/`](scripts/) | Maintainer scripts: the two generators for the files above, the prototype starter generator (`starter-html.py`), the two bundlers (`prototyping-zip.py` for the prototyping zips and plugin, `production-bundle.py` for the production kit, sharing `_bundle.py`), and the consumer loop: `tenants-sync.py` (nightly), `tenants-approve.py` (sprint decisions) and `release.py` (PRs to every consumer), sharing `_tenants.py`. |
| [`prototypes/`](prototypes/) | HTML prototypes. [`showcase/`](prototypes/showcase/index.html) renders the components in every theme; its tokens, components and icons blocks are filled by `starter-html.py`. [`_starter/`](prototypes/_starter/index.html) is the page every prototype starts from: `components.css` is its hand-edited source, and `index.html` is generated with `tokens.css` and the component CSS inlined. |
| [`templates/`](templates/) | Page-level layout templates. `templates/universal/` holds the **universal** ones: master docs, shipped in every kit and repo at the same path, each promoted at the sprint reconcile from a project template proven in production. Every other folder is **synced**: one per project (`templates/<project>/`), mirrored each night from the project's repo, which owns them. Written in prototyping mode (the `create-template` skill); production builds read and edit them (see `PROTOTYPING.AGENTS.md` and `PRODUCTION.AGENTS.md`). Kits and repos hold a project's own flat in `templates/`: a project's prototyping zip and its release PRs carry only its own. |
| [`tenants/`](tenants/) | **Synced.** One folder per consuming repo that differs from the version it has installed: `changelog.md` (each difference, and whether it's approved, rejected or needs review), `tenant.json`, the repo's `CHANGES.md` and its changed files. Written by the nightly sync; the DS team decides with `tenants-approve.py` (see `CLAUDE.md`, Sprint reconcile). Never shipped, except that a project's prototyping kit takes its changed docs. |
| [`consumers.json`](consumers.json) | The consuming repos: `repo`, `branch`, `tenant` and `project` for each, and optionally `path` (where the repo keeps `design-system/`). Read by the nightly sync and the release workflow. |
| [`.github/workflows/`](.github/workflows/) | `tenants-sync.yml` (nightly: pulls every consumer, updates `tenants/`, `templates/` and project zips) and `release.yml` (by hand: tags the version and opens a PR on every consumer). Secrets: `TEST_REPO_ACCESS_TOKEN` (the consumer repos: contents and pull requests, read and write; the scripts read it as `DS_BOT_TOKEN`) and `ZEBRA_DESIGN_SYSTEM_ACCESS_TOKEN` (this repo: contents read and write, for the nightly commit and release tags). |
| [`PRODUCTION.SKILLS/`](PRODUCTION.SKILLS/) | Claude Code skills for production repos, shipped in the production kit as `.claude/skills/` at the project root (master-owned: release PRs replace them). [`design-system-init`](PRODUCTION.SKILLS/design-system-init/SKILL.md) onboards a repo: it scans it, fills in `LIBRARY.md` with the developer section by section (per platform, with an Existing UI migration plan), starts `CHANGES.md`, wires the tokens, scaffolds the library and builds a first component. |
| [`PROTOTYPING.SKILLS/`](PROTOTYPING.SKILLS/) | Claude Code skills for prototyping, shipped in the prototyping zips as `.claude/skills/` and in the `zebra-prototyping` plugin. [`create-template`](PROTOTYPING.SKILLS/create-template/SKILL.md) writes a template doc, including its Responsiveness and Accessibility sections. [`build-from-reference`](PROTOTYPING.SKILLS/build-from-reference/SKILL.md) builds a prototype that matches a reference design (a Figma frame, flow or screenshot): reading it, mapping its values, text styles and components onto tokens, and checking the result, with any value the system lacks reported as a token request. [`send-to-figma`](PROTOTYPING.SKILLS/send-to-figma/SKILL.md) sends a finished prototype to a Figma file through the Figma MCP, and explains how to connect Figma. [`new-prototype`](PROTOTYPING.SKILLS/new-prototype/SKILL.md) starts every prototype: it asks for a Jira ticket ([`JIRA.md`](PROTOTYPING.SKILLS/new-prototype/JIRA.md): reads and comments on it through the `zebra-jira` MCP, and explains how to set the MCP up), then the in-flight project's GitHub repo ([`GITHUB.md`](PROTOTYPING.SKILLS/new-prototype/GITHUB.md): from the kit's `github.json`, the ticket or the designer; the designer downloads it as a `.zip`, Claude unzips it into `github/`, reads it read-only and writes `prototypes/<name>/CONTEXT.md`), copies the starter and builds. [`refresh-prototype`](PROTOTYPING.SKILLS/refresh-prototype/SKILL.md) offers to update an outdated prototype's tokens and component CSS. [`showcase`](PROTOTYPING.SKILLS/showcase/SKILL.md) opens the component showcase. |
| [`PRODUCTION.CLAUDE.md`](PRODUCTION.CLAUDE.md) | Template `CLAUDE.md` for production builds. The first release PR adds it to a repo as `CLAUDE.md`. |
| [`PROTOTYPING.CLAUDE.md`](PROTOTYPING.CLAUDE.md) | Template `CLAUDE.md` for prototyping. The prototyping zips ship it as `CLAUDE.md`. |
| [`CLAUDE.md`](CLAUDE.md) | Instructions for working on this repo: keep every doc, generated file and kit in sync with each change, and the Sprint reconcile process. Not shipped. |
| [`PRODUCTION.LIBRARY.md`](PRODUCTION.LIBRARY.md) | Template `LIBRARY.md` in which a product repo's engineers define how they build and maintain their component library (technology, location, token transform, API and conventions, workflow, component list), with a worked React example. Shipped in the production kit as `design-system/LIBRARY.md`. |
| [`PRODUCTION.CHANGES.md`](PRODUCTION.CHANGES.md) | Template `CHANGES.md`: a product repo's log of local changes to its design-system docs, with the installed `version` (the entry format is in `PRODUCTION.AGENTS.md`). Shipped in the production kit as `design-system/CHANGES.md`, with `production-bundle.py` filling in the version. |
| [`PRODUCTION.AGENTS.md`](PRODUCTION.AGENTS.md) | Guide for agents building a **production** component library from these docs. Shipped in the production kit as `design-system/AGENTS.md`. |
| [`PROTOTYPING.AGENTS.md`](PROTOTYPING.AGENTS.md) | Guide for building **throwaway HTML prototypes** from these docs. |
| [`.claude-plugin/`](.claude-plugin/) | The `zebra-design-system` marketplace. It lists `zebra-prototyping`, the prototyping pathway with no kit to download, as a `git-subdir` source: `prototyping-kits/plugin/` at the release tag, which the release workflow updates, so designers only get a release. (The library plugin on `design/init` joins this marketplace when that branch merges.) |
| [`PROTOTYPING.PLUGIN.md`](PROTOTYPING.PLUGIN.md) | Plugin-only preamble, put before `PROTOTYPING.CLAUDE.md` in the plugin's `CLAUDE.md`, which its SessionStart hook loads as context: maps the kit paths the prototyping docs name to the plugin's read-only folder or the designer's working folder, and points at `PROTOTYPING.AGENTS.md` to read first. |
| [`PROTOTYPING.README.md`](PROTOTYPING.README.md) | Plain-English setup guide for people who only build prototypes. Shipped as `README.md` inside the prototyping zips. |
| [`architecture.html`](architecture.html), [`architecture.md`](architecture.md) | Interactive, click-through diagram of how a doc change flows through the scripts into the generated files and kits, how consumers build from them, and the nightly-sync and sprint-release loop with every consuming repo. The `.md` is the same content as text. The page is styled with the system's own tokens: it links `tokens.css`, so keep it next to that file. Not shipped. |
| [`prototyping-kits/`](prototyping-kits/) | **Generated.** The prototyping kits to hand to someone who only builds prototypes: `zebra-design-system-prototyping.zip`, the generic one for a new project (only the universal templates), and a `zebra-design-system-prototyping-<project>.zip` for each project with templates or a tenant, carrying its own templates too and, if it has a tenant, its own versions of the docs (with `tokens.css` and the starter rebuilt from them), so prototypes match that project. `plugin/` is the `zebra-prototyping` Claude Code plugin, the parallel pathway for designers with git access to this repo: the generic kit's docs as a folder, `PROTOTYPING.SKILLS/` as `skills/`, a `CLAUDE.md` (`PROTOTYPING.PLUGIN.md` then `PROTOTYPING.CLAUDE.md`) and `.claude-plugin/plugin.json` (its `version` is the `DESIGN.md` version), whose SessionStart hook prints that `CLAUDE.md` and the plugin's path as context. |
| `build/` | **Generated, gitignored.** `production-bundle.py` writes the production kit here (`build/zebra-design-system-production/`); `release.py` sends it to the consuming repos. |

The full component list, grouped by level and purpose, is in [`DESIGN.md` §8 Component Index](DESIGN.md#8-component-index-atomic).

---

## Token architecture

Tokens form three layers. Each layer only references the one below it.

| Layer | Lives in | Example |
|---|---|---|
| **1. Primitives** | `DESIGN.md` frontmatter: `primitives` (colour ramps `color-*` and the size scale `scale-*`) | `--color-brand-main-70` |
| **2. Semantic** | `DESIGN.md` frontmatter: `colors` (+ `colors-dark`, `colors-aaa`, `colors-aaa-dark`), `space`, `control`, `radius`, `stroke`, `container`, `shadow`, `typography`, `motion`, `layout`, `opacity`, `component-sizes`, … | `--color-brand-primary-strong` |
| **3. Component** | the `tokens:` block of each component file | `--button-primary-container-background-hover` |

- **Raw values live only in the `DESIGN.md` frontmatter.** A value that isn't there doesn't exist in the system.
- **Primitives are never used directly.** Only semantic tokens point at them; a component may use a `scale-*` step only for a fixed measurement that matches it exactly.
- **Component tokens are references only:** `'{colors.color-brand-primary-strong}'`, or `'{child.token}'` for a component listed in `composes`.
- **Modes are free.** Semantic keys are the same in every mode, so dark, AAA and AAA dark re-theme every component without any per-component work.
- **Names are traceable.** A token's key is its name everywhere (`--<key>` in CSS), so any value in code can be found in the docs with a text search.

Naming pattern: `<component>-[<variant>-]<part>-<property>[-<state>|-<size>]`. See [`DESIGN.md` §2](DESIGN.md#2-token-architecture) for the full rules and a worked example.

---

## Component files

Each file in `atoms/`, `molecules/` and `organisms/` follows the same shape:

```yaml
---
name: Button
level: atom            # atom | molecule | organism
status: stable         # stable | draft
composes: [../atoms/icon.md]
tokens:
  button-primary-container-background-hover: '{colors.color-brand-primary-strong}'
  # …
---
```

The frontmatter is followed by these sections: **Anatomy, Variants, States, Spacing & Sizing, Properties, Usage, Accessibility, Claude Prompt**.

- **Composites don't restate their children.** A molecule names the child, variant and size it uses (e.g. "Icon Button, outline-subtle, medium"). The child's own tokens style it. The composite's tokens only cover its own parts and deliberate context overrides.
- **Draft components** (`status: draft`, marked † in the index) have their purpose, anatomy and composition defined, but not their measurements. They include Date Picker, Chat and Dial Pad; see the index for the full list. Any measurements used for them are placeholders and must be called out as such.

---

## Using the design system

Pick one mode per project. Each kit ships its own `CLAUDE.md` (`PRODUCTION.CLAUDE.md` or `PROTOTYPING.CLAUDE.md`), so nothing needs trimming. If you copy by hand, take the file for your mode and name it `CLAUDE.md`.

### Prototypes (HTML)

You only need the Claude desktop app. No Python, Node or build tools.

Get the system either as a prototyping zip from `prototyping-kits/` (see `PROTOTYPING.README.md`), or, if you have git access to this repo, as the `zebra-prototyping` plugin, which needs no download and updates at each design-system release (turn on auto-update for the marketplace in `/plugin` → **Marketplaces**). Installing clones this repo with your own git credentials. Install it once, then open any empty folder for your prototypes:

```
/plugin marketplace add zebratechnologies/zebra-design-system
/plugin install zebra-prototyping@zebra-design-system
```

The plugin puts every session into prototyping mode, so install it only where you prototype (install with project scope to keep it to one folder). If you added the library's `zebra-design-system` marketplace from the `design/init` branch, remove it first (`/plugin marketplace remove zebra-design-system`). It carries the generic system: for a project's own templates and design-system changes, use its zip.

1. Ask Claude for a prototype. It creates `prototypes/<name>/index.html`.
2. The page starts from `prototypes/_starter/index.html`, which carries the tokens and component CSS inline (the Browser pane ignores relative links such as `../../tokens.css`), and loads IBM Plex Sans from jsDelivr, pinned to an exact version. Icons are inline SVG copied from `icons.json`, so they need no font or CDN.
3. Open it in the Claude desktop Browser pane. It works over `file://` with no server; it needs internet only for the fonts.

Theming in the markup:

```html
<html data-contrast="aaa">             <!-- whole page AAA contrast (light and dark) -->
<section data-theme="dark">…</section>  <!-- this area and its contents dark -->
<svg class="icon" aria-hidden="true" …>…</svg>  <!-- icon: the round/sharp SVG from icons.json -->
```

See [`PROTOTYPING.AGENTS.md`](PROTOTYPING.AGENTS.md) for the full rules.

### Production component library

Add the repo to `consumers.json`. The next release opens a PR that adds `design-system/`, `CLAUDE.md` and `.claude/skills/design-system-init/` at the repo's root (to put `design-system/` elsewhere, e.g. `docs/design-system`, set `path` on the entry; `CLAUDE.md` then imports `@<path>/AGENTS.md`); from then on, follow [`PRODUCTION.AGENTS.md`](PRODUCTION.AGENTS.md) (shipped as `AGENTS.md`). In short:

- Run `/design-system-init` to fill in `LIBRARY.md`, shipped as a template with a React example (technology, library location, token-name transform, component API and conventions, workflow, existing UI, one row per built component), and check `CHANGES.md` (the log of local doc changes, shipped with the installed `version` filled in). The skill also wires the tokens, scaffolds the library and builds a first component.
- Generate the token file, never hand-write it. Keep component tokens as aliases so modes flow through.
- Build bottom-up from the docs. Each component's Properties table is its API, and every documented state and size gets implemented.
- Screens use library components plus layout tokens only. They never restyle a component.
- Screens start from a matching template: the project's own in `templates/` first, then the universal ones in `templates/universal/`. The agent edits templates on request and saves ones a designer hands over, but never writes new ones.
- Every change goes **docs first, then code, then log**, in one piece of work.
- Local changes go up automatically: each night the master repo records how the repo differs from its installed version (its *tenant*), and each sprint the DS team adopts, allows or rejects each difference. New versions come back as a PR that 3-way merges the repo's changes, replaces the shipped skills, and never touches `LIBRARY.md`, `CHANGES.md` or the project's own templates (`templates/universal/` is updated like any doc).

---

## Rules that always apply

- **Use tokens, never raw values.** That covers colour, spacing, radius, shadow, font and duration.
- **Use existing components before inventing new ones.** If nothing fits, follow [Governance](#governance).
- **Icons come only from `icons.json`.** Use the round set by default and the sharp set for sharp-shaped components.
- **Accessibility is part of the design:** WCAG 2.2 AA contrast (the semantic colours already meet it), a visible focus ring on every interactive element, touch targets of at least `--control-target-min`, and no meaning carried by colour alone.
- **If the docs don't answer it, ask.** Don't guess, and record the decision in the doc.

---

## Governance

When something is missing, ask these questions in order and take the first answer that works ([`DESIGN.md` §9](DESIGN.md#9-governance)):

1. Does an existing component already do it, perhaps with a different variant, size or property?
2. Can existing components be composed to do it?
3. Does an existing component need a new variant, state, size or token?
4. Is it genuinely new? Write the component doc first, then build it.

New values go into the `DESIGN.md` frontmatter, in the right semantic group. Component tokens then reference them.

---

## Maintaining the design system

Only maintainers run these scripts. They need Python 3 with the standard library only. People building prototypes never do.

| Command | Run after | Writes |
|---|---|---|
| `python3 scripts/tokens-css.py` | any change to the `DESIGN.md` frontmatter or a component's `tokens:` | `tokens.css`; then exits 1 if a reference is undefined, a component references a colour primitive or a component it doesn't compose, or two tokens share a CSS name |
| `python3 scripts/starter-html.py` | after `tokens-css.py` or `icons-json.py`, or any change to `prototypes/_starter/components.css` | `prototypes/_starter/index.html` and the showcase's marked blocks; also reports (never fails on) `var()` names nothing defines and component tokens `components.css` doesn't use |
| `python3 scripts/icons-json.py [version]` | changing the `icons` version in the `DESIGN.md` frontmatter (needs internet; verifies the npm tarball's integrity) | `icons.json` |
| `python3 scripts/prototyping-zip.py [project]` | regenerating either file above, or changing the docs, prototypes, `PROTOTYPING.CLAUDE.md`, `PROTOTYPING.AGENTS.md`, `PROTOTYPING.README.md`, `PROTOTYPING.PLUGIN.md` or `PROTOTYPING.SKILLS/` (the nightly sync runs it per project when its templates or tenant change) | in `prototyping-kits/`: `zebra-design-system-prototyping.zip` and one `zebra-design-system-prototyping-<project>.zip` per project with `templates/<project>/` or a tenant (or only that project's); removes zips whose project has neither. A full run also writes the plugin, `prototyping-kits/plugin/`; the release workflow fails if that is stale |
| `python3 scripts/production-bundle.py [out-dir]` | to check the production kit (`release.py` runs it) | `build/zebra-design-system-production/` (gitignored) |
| `python3 scripts/tenants-sync.py [tenant …]` | runs nightly in CI; by hand to refresh tenants (needs `DS_BOT_TOKEN`, e.g. `$(gh auth token)`) | `tenants/`, `templates/<project>/` and changed project zips |
| `python3 scripts/tenants-approve.py <tenant> <key-or-path> [--reject \| --undo]` | deciding a tenant difference at sprint reconcile | that tenant's `tenant.json` and `changelog.md` |
| `python3 scripts/release.py [--dry-run] [--notes …]` | runs in the release workflow; by hand with `--dry-run` to preview | a PR per repo in `consumers.json`, on branch `zebra-design-system/<version>` |
| `python3 scripts/_tenants.py` | changing the consumer-loop scripts | nothing: the self-test |

Never edit `tokens.css`, `icons.json`, the zips, `tenants/` or `templates/<project>/` by hand. Commit the generated files and zips after regenerating, so prototypers never need tooling.

The zips are in `prototyping-kits/`. `zebra-design-system-prototyping.zip` is the kit to hand to someone who only builds prototypes on a new project; `zebra-design-system-prototyping-<project>.zip` is the same kit for an existing project. Each holds a single folder of the same name containing `atoms/`, `molecules/`, `organisms/`, `prototypes/`, `templates/` (`universal/` with the universal templates, plus, in a project kit, that project's templates flat), `.claude/skills/` (from `PROTOTYPING.SKILLS/`), `DESIGN.md`, `PROTOTYPING.AGENTS.md`, `icons.json` and `tokens.css`, plus, in a project kit, `github.json` (its repo, branch and design-system `path` from `consumers.json`, for the `new-prototype` skill's GitHub step). If the project has a tenant, its kit takes the tenant's `DESIGN.md`, component docs and universal templates from `tenants/<tenant>/files/` (all of them, whatever their review state), leaves out docs it deleted, and rebuilds `tokens.css`, the starter and the showcase from them; the script warns if `tokens-css.py` finds a token error. It also includes `CLAUDE.md` (from `PROTOTYPING.CLAUDE.md`), and `PROTOTYPING.README.md` saved as `README.md`. `universal` is a reserved project name. Run the script after regenerating the token or icon files, so the zips carry the latest versions.

The production kit is what the release PRs put in a project repo; it is built, not committed. `build/zebra-design-system-production/` has three things inside, all at the project root: `CLAUDE.md` (production-builds section only, importing `@design-system/AGENTS.md`), `.claude/skills/` (from `PRODUCTION.SKILLS/`) and a `design-system/` folder. `release.py` moves `design-system/` to the repo's `path` from `consumers.json` (if set) and points the `CLAUDE.md` import there. `design-system/` contains `atoms/`, `molecules/`, `organisms/`, `templates/` (with the universal templates in `universal/`; `release.py` adds the project's own, flat), `DESIGN.md`, `AGENTS.md`, `LIBRARY.md` and `CHANGES.md` (the templates), `icons.json`, `tokens.css` and the two generators in `scripts/`.

The current docs version is the `version` field in the `DESIGN.md` frontmatter. Each release tags it `design-system-v<version>` and pins the plugin in `.claude-plugin/marketplace.json` to that tag; the nightly sync and the next release compare every repo with the tag of the version it has installed, so bump `version` before each release.

---

## External dependencies

| What | Package | Version | Licence |
|---|---|---|---|
| Typeface | `@fontsource/ibm-plex-sans` (Latin; weights 300, 400, 500, 600, 700) | 5.3.0 | SIL OFL |
| Icons | `@zebra-fed/zeta-icons` (round and sharp fonts; SVGs in `icons.json`) | 1.9.8 | MIT |

The typeface is loaded from jsDelivr at a pinned version. Prototypes use the icon SVGs from `icons.json`; production uses the icon fonts from the package.
