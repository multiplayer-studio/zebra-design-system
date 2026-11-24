---
name: builder-start
description: The way in for a developer building with the Zebra Design System in a codebase. One short dialog picks the path (a Figma design, a handoff package, a brief, or migrating existing screens) and, the first time, confirms how the repo is built (its own component library, the Zebra packages, or the Zebra packages plus old-system packages). Reads the repo once, saves what it found in a zebra-build folder, then hands over to the matching builder skill. Use whenever a developer asks to build, implement, start or migrate something with the Design System in a repo, when it isn't clear which builder skill fits, or when a builder skill finds no zebra-build folder.
---

# Start building in a repo

A developer works in a repo. The repo already has a way of doing things, and
the design already says what the result looks like. This skill finds out both
in as few steps as it can, writes them down once, and gets out of the way.

Four steps. Only the first asks anything.

| Step | What happens | The developer |
|---|---|---|
| 1. Start | One dialog | one or two picks |
| 2. Read the repo | Survey it, save the record. First run only | nothing |
| 3. Build | The matching builder skill | nothing, unless it says so |
| 4. Check and report | `builder-design-check`, the project's lint and tests, a short report | nothing |

## Rules

- **The repo's style is kept.** New code looks like the code beside it: same
  folders, names, styling method, state and test habits. Never bring in a
  second way of doing something the repo already does one way.
- **The design is followed exactly.** Component, variant, spacing, text style
  and colour come from the design. A difference is a gap to fix or a
  deviation to report, never a judgement call.
- **Short.** Ask only what the repo can't answer. Never ask about theme,
  shell or look: the repo and the design already settle them.
- **Read-only until step 3.** Steps 1 and 2 write nothing but the
  `zebra-build` folder.

## 1. Start

Use the question prompt (the AskUserQuestion tool where there is one). Ask
one dialog, with a second question only on the first run.

**What are you building from?**

| Pick | Goes to |
|---|---|
| A Figma design | `builder-figma-to-code` |
| A handoff package | `builder-handoff-to-code` |
| A brief, no design | `builder-ui` |
| Migrating existing screens to the Design System | `builder-migrate` |

Skip this question when the request already answers it: a Figma link, a
handoff folder, "migrate the settings page".

**How is this repo built?** Ask only when `zebra-build/PROJECT.md` doesn't
exist. Run the survey first (step 2), so the answer it suggests is the first
option and the developer only confirms.

| Pick | Recorded as | Suggested when |
|---|---|---|
| Keeps its own component library | `own-library` | no `@zebra-design-system` package is installed |
| Uses the Zebra packages | `zebra` | `react-baseui` or `web-components` is installed, and no old-system package |
| Uses the Zebra packages plus old-system packages | `zebra-plus-legacy` | `zeta-web`, or an older Zeta package, is installed or imported |

Put what the survey found inside the dialog, in one line: "This repo uses MUI
5 and no Zebra package."

If the developer picks a Zebra case and the packages aren't installed, say so
and point to `/zebra-setup`. Don't install anything unasked.

## 2. Read the repo (first run only)

```
node <this skill's folder>/scripts/survey-repo.mjs
```

It is read-only and prints the interface libraries with their versions and
import counts, the theme files, colours, fonts and breakpoints in use, the
routes, the layout files and the most-used components.

Then read only what the record needs, and nothing else:

- the package file's scripts (run, build, lint, test, Storybook);
- two existing screens and one shared component, end to end, to see how this
  repo writes code;
- the lint and formatter settings;
- one test file, if there are tests.

Write the record as `references/BUILD-RECORD.md` says: `zebra-build/PROJECT.md`
and `zebra-build/MAP.md`. Commit them with the code, so every developer and
their assistant reads the same record.

On later runs, read the record and skip this step. Refresh it only when the
developer says the repo changed, or a build skill finds the record wrong.

## 3. Build

Hand over to the skill picked in step 1. Tell it nothing it can read in the
record.

## 4. Check and report

The build skill ends with `builder-design-check` whenever there is a design or
a handoff, then the repo's own lint and tests from the record. Its report
names what was built, every gap left, and anything added to `MAP.md`.

## The zebra-build folder

| File | Holds |
|---|---|
| `PROJECT.md` | the case, the stack, how to run and check the repo, its code conventions, and the rules for this case |
| `MAP.md` | each Design System component and token, and what this repo uses for it |
| `parity/<screen>.json` | measurements of a design, saved by `builder-design-check` |

Never put a password, key or token in it: it is committed.
