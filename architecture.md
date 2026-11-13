# Zebra Design System: from docs to builds

How a change to the Markdown docs flows through the generator scripts into tokens, icons, the prototype starter and the kits; how a consuming Claude project builds from them; and how every consuming repo's changes come back each night, get reconciled each sprint, and go out again as PRs. The interactive version is [`architecture.html`](architecture.html) (open it in a browser). It is styled with the design system itself: it links `tokens.css` and uses IBM Plex Sans, so it follows the light and dark themes. For the rules themselves, see [`CLAUDE.md`](CLAUDE.md), [`README.md`](README.md) and [`PRODUCTION.AGENTS.md`](PRODUCTION.AGENTS.md); this file only describes the flow.

## Components

| Node | What it is |
|---|---|
| Maintainer / DS team | Edits the docs, runs the scripts, commits the results; reviews every open tenant once per sprint. |
| Master docs | `DESIGN.md` (frontmatter holds every raw value), `atoms/`, `molecules/`, `organisms/`, and `prototypes/_starter/components.css`. Hand-edited. |
| `scripts/` | `tokens-css.py`, `icons-json.py`, `starter-html.py`, `prototyping-zip.py`, `production-bundle.py` (sharing `_bundle.py`), and the consumer loop: `tenants-sync.py`, `tenants-approve.py`, `release.py` (sharing `_tenants.py`). Python 3, stdlib only (plus `git` and `gh` for the loop). |
| npm registry | Source of `@zebra-fed/zeta-icons`. Only `icons-json.py` talks to it. |
| Generated files | `tokens.css` and `icons.json`. Never hand-edited. |
| Prototype starter | `prototypes/_starter/index.html` (tokens and component CSS inlined) and the showcase's marked blocks. |
| Prototyping zips / production kit | Prototyping: `zebra-design-system-prototyping.zip` (generic, no templates), `zebra-design-system-prototyping-testing.zip` (generic, plus `PROTOTYPING.TESTING.md` and the scripts to regenerate after a doc edit) and one `zebra-design-system-prototyping-<project>.zip` per `templates/<project>/`, committed. Production: `build/zebra-design-system-production/`, built in CI and not committed. |
| `consumers.json` | The consuming repos: `repo`, `branch`, `tenant`, `project`, and optionally `path` (where the repo keeps `design-system/`, e.g. `docs/design-system`). |
| `tenants/` | One folder per consuming repo that differs from the version it has installed: `tenant.json`, `changelog.md`, its `CHANGES.md` and changed files. No differences, no tenant. |
| Nightly sync | `.github/workflows/tenants-sync.yml` in this repo, running `tenants-sync.py` over `consumers.json`. |
| Release workflow | `.github/workflows/release.yml` in this repo, run by hand: tags the version and runs `release.py` over `consumers.json`. |
| Claude (consumer) | The agent in a consuming project, driven by its kit's `CLAUDE.md`. |
| Output | An HTML prototype (prototyping) or a consumer repo with `design-system/`, its component library, `LIBRARY.md` and `CHANGES.md` (production). |

## Modes

| | Prototyping | Production |
|---|---|---|
| Kit | `zebra-design-system-prototyping[-<project>\|-testing].zip` | `build/zebra-design-system-production/`, delivered by release PR |
| Shipped `CLAUDE.md` | from `PROTOTYPING.CLAUDE.md` | from `PRODUCTION.CLAUDE.md`, importing `@design-system/AGENTS.md` |
| Agent guide | `PROTOTYPING.AGENTS.md` (+ `PROTOTYPING.JIRA.md`, `PROTOTYPING.GITHUB.md`, `PROTOTYPING.FIGMA.md`; testing kit also `PROTOTYPING.TESTING.md`) | `design-system/AGENTS.md` (from `PRODUCTION.AGENTS.md`) |
| Templates | the project's, flat in `templates/` (none in the generic or testing kit); written with the `create-template` skill | the project's, flat in `design-system/templates/`, owned by the repo |
| Output | `prototypes/<name>/index.html`, viewed in the Claude Browser pane | Component library in the product repo |
| Consumer loop (flows 5, 6) | not part of it; templates reach master through the project's repo | every repo in `consumers.json` |

## Flows

### 1. Change a token
1. Maintainer → Docs: edit the value in the `DESIGN.md` frontmatter (or a reference in a component's `tokens:`), and any prose that mentions it.
2. Docs → scripts: `python3 scripts/tokens-css.py` reads all the frontmatter.
3. scripts → Generated: writes `tokens.css` (light, dark, AAA and AAA dark blocks; semantic and component tokens stay as `var()` aliases) and exits 1 on a broken reference.
4. Generated → scripts: `python3 scripts/starter-html.py` reads `tokens.css`, `components.css` and `icons.json`.
5. scripts → Starter: writes `prototypes/_starter/index.html`, refills the showcase blocks, and prints a drift report (never fails).
6. scripts → Kits: `prototyping-zip.py` rebuilds every prototyping zip (committed with the docs); the production kit is only built when the release runs (flow 6).

### 2. Change a component's prototype CSS
1. Maintainer → Docs: edit the component doc, then its CSS in `prototypes/_starter/components.css`.
2. Docs → scripts: `starter-html.py` reads it.
3. scripts → Starter: regenerates the starter and the showcase blocks, then prints a drift report (undefined `var()` names, unused component tokens).
4. scripts → Kits: rebuild the prototyping zips.

### 3. Bump `@zebra-fed/zeta-icons`
1. Maintainer → Docs: change the `icons` version in the `DESIGN.md` frontmatter.
2. Docs → scripts: `python3 scripts/icons-json.py [version]` (defaults to the frontmatter version).
3. scripts → npm: fetch the package metadata, then the tarball (needs internet).
4. npm → scripts: verify the tarball against `dist.integrity`.
5. scripts → Generated: write `icons.json` (name, label, category, terms, round and sharp SVG).
6. scripts → Starter: `starter-html.py` refreshes the showcase icons.
7. scripts → Kits: rebuild the prototyping zips, then update the version and icon count in `README.md`.

### 4. Build from a kit
Prototyping:
1. Kit → Claude: unzip the project's kit (the generic one for a new project, or the testing one to try the system out) and open the folder in the Claude desktop app. No Python, Node or build tools.
2. Claude → Claude: read `CLAUDE.md`, then `PROTOTYPING.AGENTS.md` (with its Jira, GitHub and Figma add-ons), then the component docs needed; check `templates/` first, and offer to save a reusable layout with the `create-template` skill. In the testing kit, `PROTOTYPING.TESTING.md` also lets the designer edit the docs: Claude regenerates with the kit's `tokens-css.py` and `starter-html.py`, logs each edit in the kit's `CHANGES.md` and files it to Jira.
3. Claude → Output: copy the starter, compose existing components, inline icon SVGs from `icons.json`; the prototype opens in the Browser pane.

Production:
1. Kit → Claude: the DS team adds the repo to `consumers.json`; the next release (flow 6) opens a **first install** PR with the whole production kit (in `design-system/`, or the entry's `path`), the project's own templates, and `CLAUDE.md` and `.claude/skills/design-system-init/` at the root. If the repo already has a `CLAUDE.md`, the PR only appends the `@<path>/AGENTS.md` import; the skill offers to merge in the rest of the design-system section. The developer merges it.
2. Claude → Claude: `CLAUDE.md` imports `design-system/AGENTS.md`. Before any component, the agent runs the `design-system-init` skill while `LIBRARY.md` (a template with a React example, owned by the engineers) has blanks. The skill scans the repo, proposes each section for the developer to confirm (per platform, plus an Existing UI migration plan) and never changes a convention itself. It then checks `CHANGES.md` (shipped with the installed `version` filled in), wires the tokens, scaffolds the library and builds a first component.
3. Claude → Output: generate the token file with the command in `LIBRARY.md`. Build components bottom-up in the library folder: each Properties table is the API, every state and size is implemented, and each gets a `LIBRARY.md` row. Screens start from `templates/` and use library components plus layout tokens only. Every local change goes docs, then code, then a `CHANGES.md` entry, which the nightly sync carries to the DS team (flow 5).

### 5. Nightly sync: consumer → tenant (production)
1. Claude → Consumer repo: a team changes its `design-system/` copy, docs first, and logs why in `CHANGES.md`.
2. Consumer repo → Nightly sync: this repo clones each consumer's `design-system/` (at the entry's `path`, if set) and compares it with the bundle of the version it has installed (`version` in its `DESIGN.md`, built from tag `design-system-v<version>`), never the latest master. Token keys are compared one by one, other files whole. `LIBRARY.md`, `CHANGES.md`, `templates/` and `tokens.css` don't count.
3. Nightly sync → `tenants/<tenant>/`: only the differences are stored, each marked approved, rejected or needs review; decisions are kept while they still match. A repo in sync has no tenant. Separately, the repo's templates are mirrored into `templates/<project>/` (no review) and that project's prototyping zip is rebuilt. The workflow commits only when something changed.

### 6. Sprint: reconcile and release (production)
1. `tenants/` → DS team: read the **Needs review** rows of each `changelog.md`, the repo's `CHANGES.md` and its files.
2. DS team → `tenants/`: **allow** a lasting difference (e.g. a project's theme primitives) or **reject** one, with `tenants-approve.py`.
3. DS team → Master docs: **adopt** what everyone should have (generalised where it helps), then bump `version` (`BREAKING.YYMM.N`, e.g. `2.2611.0` → `2.2611.1`; see `CLAUDE.md`, Sprint reconcile).
4. Master docs → scripts: the usual sync chain (flows 1–3).
5. DS team → Release workflow: run it by hand, dry run first. It tags `design-system-v<version>`, builds the production kit and reads `consumers.json`.
6. Release workflow → Consumer repo: one PR per repo on branch `zebra-design-system/<version>`. New repos get the whole kit plus their project's templates. Updates: unchanged files replaced; changed files 3-way merged against the installed version (allowed differences stay, master's other edits land); overlaps kept and listed under **Needs your agent**; rejected differences listed under **Please revert**; `LIBRARY.md`, `CHANGES.md` and `templates/` never touched; the shipped skills in `.claude/skills/` replaced outright; `tokens.css` regenerated. Never force-pushes; older release PRs are closed.
7. Consumer repo → Claude: after merging, the agent resolves the listed overlaps, reverts rejected items, regenerates tokens, updates components, records the version and drops adopted `CHANGES.md` entries. Only allowed differences remain, so the tenant shrinks to just those or disappears.

## Workshop scenarios

- "I changed `color-brand-primary-strong`. What else must I run?" Walk flow 1.
- "Why can't a prototype just link `../../tokens.css`?" Flow 1, step 5: the Browser pane ignores relative links, so the starter inlines everything.
- "Why does the production kit carry two scripts?" Flow 4: production projects regenerate their own token and icon files.
- "Our product needs its own brand colours. Will every release overwrite them?" No. Flows 5 and 6: the DS team allows the difference, and the release 3-way merges around it.
- "Can the DS team overwrite our local changes?" No. Flow 6, step 6: releases are PRs, and overlapping changes are kept for your agent to resolve.
- "A tester changed a token in the testing kit. How does it reach master?" Flow 4: Claude logs the edit in the kit's `CHANGES.md` and files it to Jira; the DS team then adopts it through flow 1.
- "A designer made a template. How does it reach the next kit?" They give it to the project's developer, who adds it to `design-system/templates/`; flow 5 mirrors it to master and rebuilds the project's zip.

## Assumptions

- Payloads (token values, `CHANGES.md` entries, repo names, counts, release notes) are illustrative.
- One project per repo (`project` in `consumers.json`).
- The Jira, GitHub, Figma and testing add-ons are mentioned in flow 4 rather than drawn as nodes.

## Open questions

- **Mandatory standards.** Releases are PRs, so a team can leave one unmerged. The release notes flag mandatory changes; what happens if a repo never merges isn't decided.
- **Bot credentials.** For now, two fine-grained tokens: `TEST_REPO_ACCESS_TOKEN` for the consumer repos (contents and pull requests, read and write) and `ZEBRA_DESIGN_SYSTEM_ACCESS_TOKEN` for this repo (contents read and write; used by checkout, so the nightly commit and the release tag go through it). Real consumers in the org may later need one token or a GitHub App instead.
- **First release.** Repos installed from an older zip have no `design-system-v<version>` tag to diff against until the first release; tag the current version once when rolling out.
