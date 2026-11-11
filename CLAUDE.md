# CLAUDE.md

This repo **is** the Zebra Design System (the master copy), written as Markdown. It is not a consuming project. `PRODUCTION.CLAUDE.md` and `PROTOTYPING.CLAUDE.md` are the templates that consuming projects get (production builds and prototyping respectively); this file is for working on the repo itself.

## Keep the whole repo in sync

Whatever the prompt asks for, finish by making every doc, generated file and bundle that depends on the change agree with it. A change that leaves any of them stale is incomplete. Do this in the same piece of work without being asked.

| If you change… | Also update |
|---|---|
| A token in the `DESIGN.md` frontmatter or a component's `tokens:` | Rerun `python3 scripts/tokens-css.py` (never hand-edit `tokens.css`), then `python3 scripts/starter-html.py`. Update every component doc and `DESIGN.md` body text that mentions the value. |
| A component (add, remove, rename, new variant/state/size/property) | The component file's tables and prose, `DESIGN.md` §8 Component Index (and † draft marks), the component counts in `README.md`, and any `composes` lists and prototypes that use it. |
| The `@zebra-fed/zeta-icons` version | `version` in `DESIGN.md`, rerun `python3 scripts/icons-json.py` then `python3 scripts/starter-html.py`, and the icon count/version in `README.md`. |
| `DESIGN.md` rules (body) | Component docs, `PRODUCTION.AGENTS.md`, `PROTOTYPING.AGENTS.md`, `PRODUCTION.CLAUDE.md`, `PROTOTYPING.CLAUDE.md` and `README.md` wherever they restate the rule. |
| `PRODUCTION.AGENTS.md`, `PRODUCTION.LIBRARY.md`, `PRODUCTION.SKILLS/`, `PROTOTYPING.SKILLS/`, `PROTOTYPING.AGENTS.md`, `PROTOTYPING.JIRA.md`, `PROTOTYPING.GITHUB.md`, `PROTOTYPING.FIGMA.md`, `PROTOTYPING.TESTING.md`, `PROTOTYPING.README.md`, `PROTOTYPING.TESTING.README.md`, `PRODUCTION.CLAUDE.md` or `PROTOTYPING.CLAUDE.md` | The others, and the README Contents table, so they never contradict each other. The two `*.CLAUDE.md` files share the same design-system section; keep them identical there. |
| `scripts/` (any script, file or folder added or removed) | The `scripts/` row in `README.md` and every doc that names the script. |
| Files or folders at the repo root | The README Contents table. |
| Anything that ends up in a prototyping kit | Regenerate with `python3 scripts/prototyping-zip.py` (the generic zip and one per `templates/<project>/`). The zips are generated; never edit them by hand. |
| Anything that ends up in the production kit | Nothing to commit: `scripts/release.py` builds it with `python3 scripts/production-bundle.py` (into the gitignored `build/`) when the release workflow runs. Run it yourself to check the output. |
| `consumers.json` | Nothing else; the next nightly sync and release pick it up. Each entry needs `repo`, `branch`, `tenant` and a unique lowercase-hyphenated `project` (not `testing`, which names the testing kit), and may set `path` (where the repo keeps `design-system/`, relative to its root; default `design-system`). |
| `scripts/_tenants.py`, `tenants-sync.py`, `tenants-approve.py` or `release.py` | Run `python3 scripts/_tenants.py` (self-test) and `python3 scripts/release.py --dry-run`; keep `.github/workflows/` and the `PRODUCTION.AGENTS.md` Syncing section in step with what they do. |
| `prototypes/` | `prototypes/showcase` if it renders the changed component or token. Its component CSS lives in `prototypes/_starter/components.css`; edit it there, never between the showcase's markers. |
| A component's CSS in `prototypes/_starter/components.css` | Rerun `python3 scripts/starter-html.py` (never hand-edit `prototypes/_starter/index.html`). |

## Rules

- **Docs first.** Raw values live only in the `DESIGN.md` frontmatter; component tokens are references (`DESIGN.md` §2).
- **One source for each fact.** Don't copy a value or rule into a second doc when a link will do. Where a doc must restate something, update all copies.
- **Check before finishing:** grep the repo for the old name or value you changed, and confirm nothing still refers to it. Counts in `README.md` (components per level, icons) must match the actual files.
- **This repo has no `CLAUDE.md` for consumers.** Don't ship this file in a kit; the bundlers ship `PRODUCTION.CLAUDE.md` (production kit) and `PROTOTYPING.CLAUDE.md` (prototyping zips) as `CLAUDE.md` instead.
- **`tenants/` and `templates/<project>/` are written by the nightly sync** (`.github/workflows/tenants-sync.yml`). Never hand-edit them; the one exception is the decisions in `tenants/<tenant>/tenant.json`, made with `scripts/tenants-approve.py`. Templates are owned by their project: don't create or edit them here. Leave both folders out of the "grep for the old value" check: they hold the projects' copies.
- If the docs don't answer a question, ask. Don't guess.

## Sprint reconcile

Once per sprint, review every open tenant. A tenant exists only while its repo differs from the version it has installed; a repo in sync has none.

1. For each `tenants/<tenant>/`, read `changes.md` (only the **Needs review** rows matter), the repo's reasons in its `CHANGES.md`, and their files in `files/`.
2. Decide each difference with the `DESIGN.md` §9 Governance questions:
   - **Adopt:** change the master docs (generalise where it helps, e.g. a new variant or token). The difference disappears once the repo merges the release.
   - **Allow:** a lasting difference for that project, e.g. its own primitive colours for theming: `python3 scripts/tenants-approve.py <tenant> <key-or-path>`. The sync stops flagging it while it still matches.
   - **Reject:** `python3 scripts/tenants-approve.py <tenant> <key-or-path> --reject`. The release PR asks the repo to revert it.
3. Make the doc changes with the usual sync chain (table above), and bump `version` in the `DESIGN.md` frontmatter.
4. Run the **Release to consumers** workflow (`.github/workflows/release.yml`) as a dry run, read its log, then run it for real. It tags `design-system-v<version>` and opens or updates one PR per repo in `consumers.json`. It never force-pushes.
