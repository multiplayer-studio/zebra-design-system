# The zebra-build record

Two files, written once by `builder-start` and read by every builder skill.
Keep them short: a fact the code states clearly doesn't need repeating here.

## PROJECT.md

```markdown
# Build record

Case: own-library | zebra | zebra-plus-legacy
Recorded: <date>, at commit <short hash>

## Stack
- Framework: <React 18 with Vite | Angular 17 | …>
- Interface libraries: <name and version, with how many files import it>
- Styling: <CSS modules | styled-components | Tailwind | plain CSS | …>
- Icons: <where icons come from>

## Run and check
- Run: `<command>`, at <address>
- Storybook: `<command>`, at <address>, or none
- Lint: `<command>`
- Tests: `<command>`
- A screen is seen at: <how to reach one screen in the browser>

## Conventions
- Screens live in: <folder>, one <file | folder> per screen, named <pattern>
- Shared components live in: <folder>
- Files and components are named: <pattern>
- Styles are written: <where, and how classes or tokens are named>
- State and data: <how a screen gets and holds data>
- Text and translations: <inline | a strings file | i18n keys>
- Tests: <what gets a test, and where it sits>

## Rules for this repo
<the block below for the recorded case, copied in>
```

Record what the repo does, not what would be better. Where the repo does one
thing two ways, name the newer or more common one and say so.

### Rules to copy in: own-library

```markdown
- Build with this repo's own components and tokens. Never add a
  `@zebra-design-system` package or import from one.
- A Design System component in the design is built with the component
  `MAP.md` gives for it, set to look as designed.
- No match in `MAP.md`: build it locally, in this repo's style, from the
  Design System's component doc, where shared components live. Add a row to
  `MAP.md` under Built locally and report it.
- A token in the design is the variable `MAP.md` gives for it. No match: use
  the design's value in one named variable, written the way this repo names
  variables, and report it.
- Icons come from this repo's icon source. Pick the same glyph by meaning.
```

### Rules to copy in: zebra

```markdown
- Build with the installed Zebra components and semantic tokens. Read the
  package's `DESIGN.md` and `AGENTS.md` before building.
- Never hand-build a control the library has.
- A component the design uses and the installed version lacks: report it,
  and don't build a lookalike.
```

### Rules to copy in: zebra-plus-legacy

```markdown
- New work uses the Zebra packages first.
- An old-system component is used only where `MAP.md` says the Zebra one is
  not ready or the surrounding screen is still on the old system.
- Never mix the two inside one control. A screen may mix them between
  regions; say which region is on which in the report.
- Old-system theming (`data-theme`, `data-contrast`) and Zebra theming
  (`mode-*`, `ext-*`) are set together at the same root, so both follow.
- Each use of an old-system component in new work is listed in the report,
  so it can be moved later.
```

## MAP.md

```markdown
# Design System map

## Components
| Design System | This repo | Import | Notes |
|---|---|---|---|
| Button | `<AppButton>` | `src/ui/Button` | flavour primary → `variant="contained"`; size medium → `size="md"` |
| Dialog | `<Modal>` | `src/ui/Modal` | no flavour icon; pass `icon` |
| Segmented Control | no match | | |

## Tokens
| Design System | This repo | Notes |
|---|---|---|
| `--surface-page` | `--bg-default` | |
| `--space-md` | `theme.spacing(1.5)` | 12px in both |
| `--text-body-medium` | `typography.body1` | size matches, line height 22 not 24 |

## Built locally
| Design System | Built as | Where | When |
|---|---|---|---|

## Old system still in use
| Component | Package | Why | Move when |
|---|---|---|---|
```

Rules for the map:

- **Fill it as you go.** `builder-start` writes rows only for what the survey
  shows in use. Each build adds the rows it needed. Never try to map the
  whole system up front.
- **`own-library`:** every row maps to the repo's own part.
- **`zebra`:** the Components and Tokens tables are left out. The names are
  the same.
- **`zebra-plus-legacy`:** the Components table says which package each
  component comes from, and Old system still in use lists the exceptions.
- **A match must look and behave the same.** Note every difference in Notes.
  A part that can't be made to look as designed is "no match".
