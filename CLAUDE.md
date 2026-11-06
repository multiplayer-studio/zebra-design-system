# CLAUDE.md

This repo **is** the Zebra Design System (the master copy), written as Markdown. It is not a consuming project. `PRODUCTION.CLAUDE.md` is the template that consuming projects get; this file is for working on the repo itself.

## Keep the whole repo in sync

Whatever the prompt asks for, finish by making every doc, generated file and bundle that depends on the change agree with it. A change that leaves any of them stale is incomplete. Do this in the same piece of work without being asked.

| If you change… | Also update |
|---|---|
| A token in the `DESIGN.md` frontmatter or a component's `tokens:` | Rerun `python3 scripts/tokens-css.py` (never hand-edit `tokens.css`). Update every component doc and `DESIGN.md` body text that mentions the value. |
| A component (add, remove, rename, new variant/state/size/property) | The component file's tables and prose, `DESIGN.md` §8 Component Index (and † draft marks), the component counts in `README.md`, and any `composes` lists and prototypes that use it. |
| The `@zebra-fed/zeta-icons` version | `version` in `DESIGN.md`, rerun `python3 scripts/icons-json.py`, and the icon count/version in `README.md`. |
| `DESIGN.md` rules (body) | Component docs, `AGENTS.md`, `PROTOTYPE.md`, `PRODUCTION.CLAUDE.md` and `README.md` wherever they restate the rule. |
| `AGENTS.md`, `PROTOTYPE.md`, `PROTOTYPING.JIRA.md`, `PROTOTYPING.FIGMA.md`, `PROTOTYPING.README.md` or `PRODUCTION.CLAUDE.md` | The others, and the README Contents table, so they never contradict each other. Keep `PRODUCTION.CLAUDE.md` in the layout `scripts/_bundle.py` expects. |
| `scripts/` (any script, file or folder added or removed) | The `scripts/` row in `README.md` and every doc that names the script. |
| Files or folders at the repo root | The README Contents table. |
| Anything that ends up in a zip | Regenerate with `python3 scripts/prototyping-zip.py` and `python3 scripts/production-zip.py`. The zips are generated; never edit them by hand. |
| `prototypes/` | `prototypes/showcase` if it renders the changed component or token. |

## Rules

- **Docs first.** Raw values live only in the `DESIGN.md` frontmatter; component tokens are references (`DESIGN.md` §2).
- **One source for each fact.** Don't copy a value or rule into a second doc when a link will do. Where a doc must restate something, update all copies.
- **Check before finishing:** grep the repo for the old name or value you changed, and confirm nothing still refers to it. Counts in `README.md` (components per level, icons) must match the actual files.
- **This repo has no `CLAUDE.md` for consumers.** Don't ship this file in a zip; the bundlers ship `PRODUCTION.CLAUDE.md` as `CLAUDE.md` instead.
- If the docs don't answer a question, ask. Don't guess.
