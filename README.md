# Zebra Design System

Zebra's design system, from Figma to shipped components. Figma holds the design. This repo turns it into tokens, icons and specs, then builds the same components in three libraries from them.

```text
                Figma (source of design)
                          │
          Claude Code skills read it, never write
                          │
     ┌────────────────────┼────────────────────┐
  tokens/             packages/icons/        specs/
  DTCG JSON           icon fonts             one contract per component
     │                    │                    │
     └────────────────────┼────────────────────┘
                          │
     ┌────────────────────┼────────────────────┐
  web-components      react-baseui          zeta-web
  Lit, zds-*          React on Base UI      legacy Lit, zeta-*
```

The three libraries share tokens, icons and specs, but no component code.

## Repository layout

```text
.
├── DESIGN.md              Rules, token vocabulary and component inventory. Start here to build with Zebra.
├── CONTRIBUTING.md        Commit format and version bumps
├── .env                   Figma credentials
├── .claude/skills/        Claude Code skills for every step of the pipeline
├── tokens/                Tokens exported from Figma. Don't edit by hand.
│   ├── manifest.json      Collections, modes, extensions and export warnings
│   ├── base/              Primitives, palette, semantics, size, typography, text styles
│   ├── extensions/        Brand overrides only: companion, target, condensed
│   ├── fonts/             Fetched font files
│   ├── _dump/             Raw export data the token builder reads
│   └── _docs/             Token changelog, audit and what the Figma Tokens page documents
├── specs/<component>/     Component contracts, as .spec.json and .spec.md
├── patterns/              The UX patterns: how screens are composed and behave. Plain Markdown, edited by hand.
│   ├── README.md          The list of patterns and which ones a task needs
│   ├── NN-<pattern>.md    One file per pattern, each holding numbered rules
│   ├── terms.md           What each pattern word means
│   ├── devices.md         Zebra devices
│   └── zebra.md           Pattern word to Zebra component or token
├── distribution/          Consumer skills and the two Claude Code plugins, generated from the sources above
└── packages/
    ├── icons/             @zebra-design-system/icons: icon fonts, CSS, glyph names
    ├── patterns/          @zebra-design-system/patterns: a copy of patterns/, packed
    ├── web-components/    @zebra-design-system/web-components, and the token CSS builder
    ├── react-baseui/      @zebra-design-system/react-baseui
    └── zeta-web/          @zebra-design-system/zeta-web, the legacy library
```

## Packages

| Package | What it is | Elements | Package manager | Storybook |
|---|---|---|---|---|
| `packages/web-components` | Lit custom elements, plus the script that turns tokens into CSS | `zds-*` | pnpm | [localhost:6007](http://localhost:6007) |
| `packages/react-baseui` | React components. Base UI brings behaviour and accessibility, we bring the visuals. | `<Button>` etc. | pnpm | [localhost:6008](http://localhost:6008) |
| `packages/zeta-web` | The legacy Zeta Web library, being refined from Zebra specs, tokens and icons in Zeta's own code style | `zeta-*` | pnpm | [localhost:6006](http://localhost:6006) |
| `packages/icons` | Icon fonts generated from Figma. Icons are font glyphs, never SVGs. | — | pnpm | Open `preview.html` |
| `packages/patterns` | The UX patterns as plain Markdown, copied from `patterns/`. No code, no dependencies. | — | pnpm | — |

## Patterns

`patterns/` holds the rules for how screens are composed and behave. The rules name no component and no token, so a product on any component system can follow them, and `zebra.md` maps them onto Zebra.

- Edit the files in `patterns/` by hand: change, add or delete a rule, or add or delete a file. A new rule takes the next free number; a deleted rule leaves a gap.
- A new file also needs a row in [patterns/README.md](patterns/README.md).
- [patterns/compositions/](patterns/compositions/README.md) holds recipes for whole screens, by the person's job. Packaging writes them to `graph.json`, which tools walk to compose a screen or to suggest changes to one.
- Guard rails run when the patterns are packaged and stop it with the file and line if, for example, a rule file names a token or a Zebra component. [patterns/README.md](patterns/README.md) lists them.
- Run `pnpm run docs:components` afterwards. It refreshes the copies in the packages and plugins and regenerates each copy's `manifest.json` from the files.

Consumers get the pack with a Zebra library, alone as `@zebra-design-system/patterns`, or through the `zebra-patterns` plugin. Two skills use it: `zebra-ux-patterns` applies the rules and `zebra-ux-audit` audits a product against them.

## Getting started

You need Node 24 (developed on 24.13.1), Google Chrome for the checks, and Python 3 for token exports.

Every package is in one pnpm workspace, so one install at the repo root covers all of them.

```bash
corepack enable        # once, provides pnpm
pnpm install
```

## Running Storybook

Run each from its package folder. Use one terminal per Storybook, or run them all side by side.

```bash
cd packages/web-components && pnpm run storybook   # http://localhost:6007
cd packages/react-baseui   && pnpm run storybook   # http://localhost:6008
cd packages/zeta-web       && pnpm run storybook   # http://localhost:6006
```

The pnpm Storybooks rebuild token CSS on start. Zeta doesn't, so run `pnpm run tokens` after a token export.

Every toolbar has the same three menus, which is how you compare a component across libraries:

| Menu | Options |
|---|---|
| Extension | Base, Companion |
| Mode | Light, Dark, AAA Light, AAA Dark |
| Breakpoint | Desktop, Desktop Compact, Tablet, Mobile |

Stories live in `packages/web-components/stories/`, `packages/react-baseui/stories/` and `packages/zeta-web/src/stories/`. Components with no spec yet appear under `Experimental/` and must not be used in product.

## Theming

Theming is CSS only, with no provider and no re-render. Set it on any ancestor and everything inside follows.

| Axis | `web-components` and `react-baseui` | `react-baseui` also accepts | `zeta-web` |
|---|---|---|---|
| Colour | `.mode-light`, `.mode-dark`, `.mode-aaa-light`, `.mode-aaa-dark` | `data-theme-mode="light"`, `dark`, `aaa-light`, `aaa-dark` | `data-theme="…"`, same values |
| Brand | `.ext-companion`, `.ext-condensed` | `data-theme-ext="…"`, same values | `data-brand="…"`, same values |
| Size | `.bp-desktop-compact`, `.bp-tablet`, `.bp-mobile` | `data-size-mode="compact"`, `tablet`, `mobile` | `data-breakpoint="desktop-compact"`, `tablet`, `mobile` |

```html
<div class="ext-companion mode-dark">
  <zds-button>Inherits companion dark</zds-button>
</div>
```

In Zeta, AAA reaches components built on Zebra tokens. Its legacy tokens only know `light` and `dark`, so unmigrated components don't change.

## Skills

The pipeline is run through [Claude Code](https://claude.com/claude-code) skills in `.claude/skills/`. They load automatically when a request matches, or you can call one with `/<skill-name>`. Each `SKILL.md` holds the full workflow.

**From Figma into the repo.** These only read Figma. Problems they find are reported, not fixed.

| Skill | Use it to | Writes to |
|---|---|---|
| `zebra-figma-token-export` | Export every collection, mode, extension and text style | `tokens/` |
| `zebra-figma-icon-font` | Turn the icon page into fonts with stable codepoints | `packages/icons/` |
| `zebra-figma-component-spec` | Turn a Figma component page into a contract any stack can build from | `specs/<component>/` |

**Building components.** Each covers one library's conventions, and starts from a spec.

| Skill | Use it to | Checks it brings |
|---|---|---|
| `zebra-web-components` | Build, change or review a `zds-*` element | Theming assertions, visual audit |
| `zebra-react-baseui` | Build, change or review a React component | Theming assertions, visual audit |
| `zeta-web-components` | Build or refine a `zeta-*` element in Zeta's code style | Spec API coverage, hover screenshots, lint, tests |

**From code back to Figma.**

| Skill | Use it to | Limits |
|---|---|---|
| `experimental-figma-build` | Draft an experimental code component in Figma for design review, with an optional metadata frame | Experimental components only, and only on a Figma branch |
| `zebra-figma-token-documenter` | Keep the Figma Tokens page in step with the live tokens, track what changed, and report missing or repeated colour descriptions | Rebuilds only what's inside `Docs /` frames, and keeps the page spacing even. New themes join the Extensions section. |

Every skill that touches Figma needs the Figma MCP connected, apart from the REST steps below.

## Common workflows

**Add a component**

1. Extract the spec: run `zebra-figma-component-spec` with the Figma page link.
2. Build it with `zebra-web-components`, `zebra-react-baseui` or `zeta-web-components`.
3. Run the checks below and open the story to look at it.

**Refresh tokens**

1. Run `/zebra-figma-token-export`. This updates `tokens/`.
2. Rebuild the CSS:

```bash
cd packages/web-components && pnpm run tokens
cd packages/react-baseui   && pnpm run tokens
cd packages/zeta-web       && pnpm run tokens
```

The same script builds all three with different flags, so they can't drift. Never edit generated CSS or anything in `zeta-web/src/generated/tokens`.

3. Update the Figma Tokens page: run `/zebra-figma-token-documenter`. It rebuilds the frames the change touched and logs it in `tokens/_docs/changelog.md`.

**Refresh icons**

```bash
(cd .claude/skills/zebra-figma-icon-font/scripts && pnpm install)   # once

cd packages/icons
pnpm run generate:dry    # inventory only, run this first
pnpm run generate
```

Existing codepoints never move. All three libraries, Zeta Web included, read the icons from this package, so there is nothing to copy.

**Credentials**

Create `.env` at the repo root. It is only needed for the REST token export and the icon font.

```bash
FIGMA_PERSONAL_ACCESS_TOKEN=
FIGMA_FILE_KEY=hvRmnZZOZrmTW0wf8hbrt5
```

The token needs `file_content:read` for icons and `file_variables:read` for tokens. The variables endpoint is Enterprise-only, and the skill falls back to the Figma MCP without it.

## Checks

**Before every commit**

```bash
cd packages/web-components && pnpm run check   # tokens, typecheck, theming assertions
cd packages/react-baseui   && pnpm run check   # the same
cd packages/zeta-web       && pnpm run check   # analyze, lint, lit-analyzer, tests
```

**Visual audit.** Renders a component against its spec in four theme panes and checks what only shows once painted. Run from the repo root, then open the screenshot it prints.

```bash
node .claude/skills/zebra-web-components/scripts/visual-audit.mjs button
node .claude/skills/zebra-react-baseui/scripts/visual-audit.mjs button
```

**Zeta spec coverage.** Every spec property must be implemented or mapped in the skill's `references/api-map.json`. Run from the repo root.

```bash
node .claude/skills/zeta-web-components/scripts/api-coverage.mjs button   # or --all
```

**Zeta hover states.** Static screenshots never show hover, so this one moves the pointer. It expects Storybook on 6010.

```bash
cd packages/zeta-web
pnpm run storybook --ci -p 6010    # leave running, then in a second terminal:
node ../../.claude/skills/zeta-web-components/scripts/hover-shot.mjs components-accordion--accordion 300,158
```

**AAA contrast and Desktop Compact sweeps.** These visit every story in a running Storybook. They live in `packages/react-baseui` but work on any of the three. Both `react-baseui` and `zeta-web` must be installed, because they borrow axe and Playwright from those packages. Always pass `--url`, because the default is port 6021.

```bash
cd packages/react-baseui
node scripts/aaa-contrast.mjs --url=http://localhost:6008 --report=react
node scripts/aaa-contrast.mjs --url=http://localhost:6007 --report=web-components
node scripts/aaa-contrast.mjs --url=http://localhost:6006 --report=zeta
node scripts/compact-check.mjs --url=http://localhost:6008 --report=react
```

Add `--modes=aaa-light,aaa-dark,light,dark` or `--filter=button` to narrow a run. Reports land in `node_modules/.cache/aaa-contrast/` and `node_modules/.cache/compact-check/`.

## Rules worth knowing

- **Tokens, never values.** Components read semantic tokens only, never `--primitives-*` or `--palette-*`.
- **Don't edit generated files.** That covers token CSS, `tokens/` and `packages/icons/` output. Change the source and regenerate.
- **The detailed source wins.** Token values come from `tokens/`, anatomy and props from the spec, and `DESIGN.md` follows both.
- **Look at it.** Assertions catch collapse and broken theming, but not a component that is simply the wrong shape.

Commits follow Conventional Commits, for example `feat(button): add gradient flavour`. See [CONTRIBUTING.md](CONTRIBUTING.md) for the types and version bumps.

## More reading

| Need | Go to |
|---|---|
| What to do at each step, with examples | [Manager's Playbook](https://claude.ai/artifact/6m7y8fX48TNsXSRJvwACDS), source in `docs/guide/`, updated with the `zebra-playbook` skill |
| Rules, tokens and the component list | [DESIGN.md](DESIGN.md) |
| One component's anatomy, props, tokens and known issues | `specs/<component>/<component>.spec.md` |
| Web components usage and status | [packages/web-components/README.md](packages/web-components/README.md) |
| React usage | [packages/react-baseui/README.md](packages/react-baseui/README.md) |
| Icon usage | [packages/icons/README.md](packages/icons/README.md) |
| Code style for each library | `.claude/skills/<skill>/references/code-style.md` |
