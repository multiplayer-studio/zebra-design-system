# Prototype Mode

Everything produced from this design system is a **prototype**. Its purpose is to communicate design concepts, not to ship. It will be rebuilt as production code later.

**Jira:** at the start of every new prototype, follow these instructions. They ask for a Jira ticket, read it through the `zebra-jira` MCP, and post the result back.

@PROTOTYPING.JIRA.md

**Figma:** when a prototype is done, follow these instructions. They offer to send the prototype to a Figma file, ask for the link to put it in, and use the Figma MCP.

@PROTOTYPING.FIGMA.md

## Stack

Every prototype is a static HTML, CSS and JS app. Do not use any other framework or build tool. The tokens from `DESIGN.md` and the component files are already written out as CSS custom properties in `tokens.css` (see Tokens in CSS), with names identical to the docs so every value can be traced back to its source.

**Claude desktop is the only software needed to build and view a prototype.** Never ask the user to install, or run, Python, Node, npm or any script. The one exception is the optional Jira setup in `PROTOTYPING.JIRA.md`. `tokens.css` and `icons.json` are generated files that are already committed; only whoever maintains the design system regenerates them (see Generated files below).

Prototypes must work when opened by double-click (`file://`), with no server and no Node. That means:
- Always create prototypes in the `prototypes/` folder at the project root, each in its own folder (`prototypes/<name>/index.html`), and never anywhere else. Create the folder if it's missing.
- Start every prototype from `prototypes/_starter/index.html`: copy it to `prototypes/<name>/index.html` and build inside `<body>`. Don't link `tokens.css`. The starter carries the tokens and the component CSS in marked blocks, because the Claude desktop Browser pane loads pages as `data:` documents and doesn't resolve relative links. Put the prototype's own CSS in a new `<style>` block after `<!-- components:end -->`.

<!-- Why the starter inlines tokens: the Browser pane ignores relative links. If it ever resolves them, go back to <link rel="stylesheet" href="../../tokens.css"> and retire scripts/starter-html.py. -->

- Use classic `<script>` tags, not ES module imports.
- Load nothing from a CDN except the IBM Plex Sans fonts listed under Fonts. Icons are inline SVG from `icons.json` (see Icons), never the icon font.

Prototypes need an internet connection to load those fonts.

## Where the design lives

| Source | What it gives you |
|---|---|
| `DESIGN.md` frontmatter | All raw values. Semantic groups: `colors`, `colors-dark`, `colors-high-contrast`, `spacing`, `rounded`, `border`, `elevation`, `font-family`, `font-weight`, `typography`, `motion`, `layout`, `opacity` and `dimensions`. |
| `DESIGN.md` body | Rules, the token architecture (§2), layout principles and usage guidance |
| `atoms/`, `molecules/`, `organisms/` `*.md` | One file per component, with anatomy, variants, states, sizing, properties, usage and its `tokens:` block |
| `templates/{project_name}/*.md` | Page-level layouts saved from earlier prototypes (see Templates) |
| `tokens.css` | Every token as a CSS custom property, generated from `DESIGN.md` and the component files |
| `icons.json` | The only valid icons. Each key is an icon name; the value gives its label, category, search terms and its inline SVG in both styles (`round`, `sharp`). The file is large: search it, never read it whole. |

A component's `composes:` list says which other components it is built from. Read those files too, because a composite only defines its own parts and context overrides; its children's tokens style everything else.

## Tokens in CSS

**Use the tokens the starter carries; never write tokens by hand.** The file is generated, contains every component's tokens, and applies every rule below. The rules are here so you can read and check it, not so you can rewrite it. If a token you need is missing or looks out of date, don't patch it in the prototype: tell the user the generated files need regenerating.

**Naming:** a custom property has exactly the token's key, the same name the docs use in prose. `colors.surface-default` becomes `--surface-default`, `spacing.spacing-large` becomes `--spacing-large`, and the component token `button-primary-container-background-hover` becomes `--button-primary-container-background-hover`. Keys are unique across groups, so there is no prefix.

**What becomes a custom property**
- Every key of `colors`, `spacing`, `rounded`, `border`, `elevation`, `font-weight`, `typography`, `motion`, `layout` (lengths only), `opacity` and `dimensions`, written as its literal value.
- The `tokens:` of every component. These are written as `var()` references.
- **Never** `primitives`, `primitives-dark` or `roles`. Semantic colours are already resolved hex values, and `roles` are only aliases for tooling.

**Value conversions**
- **Typography:** a typography token becomes a `font` shorthand, e.g. `--label-large: 500 16px/24px "IBM Plex Sans", sans-serif;`. The `h1`–`h6` aliases point at their target: `--h4: var(--title-large);`.
- **`dimensions` font shorthands** written as `500 10/14` become `500 10px/14px "IBM Plex Sans", sans-serif`.
- **`dimensions` keys ending in `-scale`:** these are ratios of the component's own size. Write them as plain numbers (`40%` → `0.4`, `1.25` stays `1.25`) and use them in `calc()`, e.g. `calc(var(--avatar-container-size-m) * var(--dim-avatar-initials-scale))`.
- **Component token references:** `'{colors.state-primary-hover}'` becomes `var(--state-primary-hover)`. A child reference `'{icon-button.icon-button-container-size-medium}'` becomes `var(--icon-button-container-size-medium)`.

**Six blocks, in this order:**

```css
:root {  /* 1. light colours + every non-colour token, as literals */
  --surface-default: #ffffff;
  --main-default: #1d1e23;
  --state-primary-enabled: #0073e6;
  --spacing-large: 16px;
  --radius-minimal: 4px;
  --label-large: 500 16px/24px "IBM Plex Sans", sans-serif;
  --elevation-3: 0 4px 8px 0 rgba(96,104,112,.16),0 0 2px 0 rgba(40,51,61,.04);
  --dim-button-height-medium: 40px;
  /* … */
}
[data-contrast="high"] {  /* 2. high contrast (light): every key from colors-high-contrast */
  --main-default: #0c0d0e;
  --state-primary-enabled: #004d99;
  /* … */
}
[data-theme="dark"] {  /* 3. dark: every key from colors-dark */
  --surface-default: #151519;
  --main-default: #f3f6fa;
  --state-primary-enabled: #599fe5;
  /* … */
}
[data-theme="light"] {  /* 4. back to light inside a dark area: the colors block again */
  --surface-default: #ffffff;
  /* … */
}
[data-contrast="high"] [data-theme="light"] {  /* 5. light area inside a high-contrast page */
  --main-default: #0c0d0e;
  /* … */
}
:root, [data-theme], [data-contrast] {  /* 6. component tokens, recomputed in every themed scope */
  --button-primary-container-background-enabled: var(--state-primary-enabled);
  --button-primary-container-background-hover: var(--state-primary-hover);
  --button-container-height-medium: var(--dim-button-height-medium);
  --stepper-input-container-height-medium: var(--text-input-container-height-medium);
  /* … every component */
}
```

- **Why block 6 lists `[data-theme]` and `[data-contrast]`:** a custom property that uses `var()` is computed where it is declared, then inherited. If the component tokens were declared only on `:root`, a dark area would inherit their light values.
- **Order matters:** later blocks override earlier ones at equal specificity.
- **Switching theme:** set `data-theme="dark"` on any element to make it and its contents dark, and `data-theme="light"` to switch back inside a dark area. Never choose a dark colour by hand.
- **Always-dark components:** components the docs describe as always dark carry `data-theme="dark"` on their own element, e.g. the Global Header.
- **High contrast:** set `data-contrast="high"` on `<html>` only; it is a whole-page setting. The system defines high-contrast values for light mode only. A dark area inside a high-contrast page uses the normal dark values; say so if it matters to the design.

## Building components

- Style a component with **its own tokens first**, then the tokens of the components it composes. Never use semantic tokens directly in component CSS. If a value you need has no component token, it isn't part of the design: ask, or flag it.
- Build a composite from its children as the component file describes it, e.g. "Icon Button, outline-subtle, medium". Then apply the composite's own tokens and context overrides on top.
- Only use the variants, sizes, states and anatomy the component file lists.
- **Draft components** (`status: draft`, marked † in the `DESIGN.md` index) have no measurements yet. If a prototype needs one, use only the tokens it defines and its composed children. Lay out the rest with the `spacing` scale, and say in the prototype and in your reply that its measurements are placeholders.

## Templates

A **template** is the atomic-design level above organisms: a page-level layout (regions and the components that fill them), with placeholder content. It lives in `templates/{project_name}/<template-name>.md`, next to `prototypes/`.

**Use them.** Before building a prototype, check `templates/`. If a template fits, build the screen from it.

**Spot them.** Notice when the designer has produced a layout that other screens or projects could reuse: the same arrangement of components across two or more prototypes, or one screen that is a common pattern (e.g. a header, a filter row and a data table; a centred form in a card with a primary action; a list with a detail pane). That is a template candidate.

**Offer, don't push.**
- Ask at a natural stopping point, after finishing the request, never mid-task. One short question naming the pattern and where it appears: "The login and reset-password prototypes share this layout. Want me to save it as a template?"
- If they say yes, ask for the project name and use it as `{project_name}` (lowercase, hyphenated). Reuse it for later templates in the same project, and confirm it if unsure.
- Write nothing until the designer says yes. If they decline, don't ask about that pattern again.

**Write it** with the `create-template` skill (`.claude/skills/create-template/SKILL.md`), which holds the format and checks. In short: a Markdown doc in the same format as the component files, with `level: template`, `status: draft`, `composes:` listing every component it uses, and the sections Anatomy, Layout, Responsiveness, Accessibility and Usage. The designer can also ask for a template directly, e.g. "Make a template from this prototype."

A template contains only existing components. Never invent one for it; if it needs something missing, say so instead. A template is a doc, not a prototype: the prototype stays in `prototypes/`.

## Refreshing a prototype

Do this when the design system is updated, or when a prototype's version comment is older than the `version` in `DESIGN.md`. It is for you, not the designer.

1. Replace everything between `<!-- tokens:start -->` and `<!-- tokens:end -->` with that block from the current `prototypes/_starter/index.html`. That block carries the version comment, so the version updates with it.
2. Do the same between `<!-- components:start -->` and `<!-- components:end -->`.
3. Never change anything outside the markers.

## Fonts

Fonts are loaded from the jsDelivr CDN, pinned to an exact version. Do not copy font files into the prototype folder, and do not load fonts from anywhere else.

All typography tokens use **IBM Plex Sans**, from the `@fontsource/ibm-plex-sans` package (v5.3.0, SIL OFL), Latin subset, in the three weights the tokens use: 300 (`--light`), 400 (`--regular`) and 500 (`--medium`).

1. The starter already declares these; don't add them again. For reference:
   ```css
   @font-face { font-family: "IBM Plex Sans"; font-weight: 300; font-style: normal; font-display: swap; src: url("https://cdn.jsdelivr.net/npm/@fontsource/ibm-plex-sans@5.3.0/files/ibm-plex-sans-latin-300-normal.woff2") format("woff2"); }
   @font-face { font-family: "IBM Plex Sans"; font-weight: 400; font-style: normal; font-display: swap; src: url("https://cdn.jsdelivr.net/npm/@fontsource/ibm-plex-sans@5.3.0/files/ibm-plex-sans-latin-400-normal.woff2") format("woff2"); }
   @font-face { font-family: "IBM Plex Sans"; font-weight: 500; font-style: normal; font-display: swap; src: url("https://cdn.jsdelivr.net/npm/@fontsource/ibm-plex-sans@5.3.0/files/ibm-plex-sans-latin-500-normal.woff2") format("woff2"); }
   ```
2. Set text through typography tokens, either a component's font token or, for page-level text, the typography group (e.g. `font: var(--body-medium)`). Do not write a font family or weight by hand.
3. Only the Latin subset and normal (non-italic) style are used. If a design needs Cyrillic, Greek or italics, use the matching file from the same package path (`ibm-plex-sans-<subset>-<weight>-<style>.woff2`) and tell the user.

## Icons

Icons come from the Zebra Icons library, the `@zebra-fed/zeta-icons` package (v1.9.8, MIT, matching `icons` in the `DESIGN.md` frontmatter). They come only from `icons.json`, which is generated from the package itself; never invent one, and never load the icon font or anything else from the zeta-icons CDN. Each icon comes in two styles: **round** (the default) and **sharp** (used when a component's shape is sharp).

1. The starter already declares the `.icon` class; don't add it again. Icons are sized with `font-size` (the SVG is `1em` square) and coloured with `color` (the SVG paints in `currentColor`):
   ```css
   .icon { width: 1em; height: 1em; flex: none; display: inline-block; vertical-align: middle;
     font-size: var(--icon-size); color: var(--icon-foreground); }
   ```
2. Use an icon by pasting its SVG inline: copy the icon's `round` value from `icons.json` (or `sharp` for a sharp-shaped component) and add `class="icon" aria-hidden="true"` to the `<svg>` tag:
   `<svg class="icon" aria-hidden="true" fill="none" viewBox="0 0 1200 1200">…</svg>`
   - `icons.json` is large (over 1 MB). Never read it whole: search it for the icon's key and read just that entry.
   - The key is the icon name (`check_circle`, `wifi`). It is lowercase snake_case and is not always the lowercased `label` (for example the label `WiFi` has the key `wifi`). Search the `label`, `category` and `searchTerms` fields to find an icon.
   - Paste the SVG exactly as it is in `icons.json`. Don't edit its paths or ids, and don't redraw it. If no icon fits, report the gap.
3. **Size and colour** come from tokens. The Icon atom's tokens are the defaults: `--icon-size` (default), `--icon-size-small`, `--icon-size-medium`, `--icon-size-large`, `--icon-foreground`, `--icon-foreground-inverse` and `--icon-foreground-disabled`. Inside a component, use that component's icon tokens or overrides where its file defines them.
4. **Accessibility:** decorative icons get `aria-hidden="true"`, and an icon-only button needs an `aria-label` on the button. Never use an icon as the only carrier of meaning: pair it with text.

## Generated files

`tokens.css`, `icons.json` and `prototypes/_starter/index.html` are generated and committed, so nobody building a prototype needs any tooling. They are produced by three scripts in `scripts/`, which only the design-system maintainer runs (they need Python 3, the standard library only):

| Run | When | Writes |
|---|---|---|
| `python3 scripts/tokens-css.py` | after any change to the `DESIGN.md` frontmatter or a component's `tokens:` | `tokens.css` |
| `python3 scripts/icons-json.py` | after the icons version in the `DESIGN.md` frontmatter changes (needs internet; it reads the npm package) | `icons.json` |
| `python3 scripts/starter-html.py` | after either script above, or a change to `prototypes/_starter/components.css` | `prototypes/_starter/index.html` (and the showcase's marked blocks) |

Never edit these files by hand.

## Running

Prototypes are viewed **only inside the Claude desktop app** (its Browser pane). Never open them in an external browser: do not run `open`, `start`, `xdg-open` or any command that launches Chrome, Safari or Edge.

Open the prototype in the Browser pane straight from `file://`; it renders styles and fonts there. Never add a server, a `.claude/launch.json` or any other file to serve it. If a prototype renders wrong, fix the prototype or tell the user what's broken. Don't work around it with tooling.

## Rules

- **Clarity first.** Optimise for the design idea: layout, hierarchy, spacing, colour, typography, states and flow.
- **Minimum build.** Build only what's needed to show the concept, with static or mock data and hardcoded content.
- **No production concerns** unless asked: backend or API integration, auth, persistence, error handling, performance tuning, build tooling, tests and scalable architecture.
- **Throwaway code.** Keep it simple. Do not abstract, generalise or future-proof.
- **Stay faithful to the design system.** Follow the `DESIGN.md` frontmatter and rules, the component files and `icons.json`. Never hardcode a value: every colour, size, space, radius, shadow, font and duration is a `var()` of a token. Never invent icons, variants, states, anatomy or tokens.
- **Accessibility baselines** are part of the design, not production polish:
  - WCAG 2.2 AA contrast, which the semantic colours already meet. Don't add opacity to text.
  - A visible focus ring on every interactive element, using that component's focus-ring tokens.
  - Touch targets of at least `--touch-target-min`, ideally `--touch-target-recommended`.
  - No meaning carried by colour alone.
- **Make intent obvious.** Name things after the design concept, and add a brief comment where a shortcut stands in for real behaviour (e.g. `// mock data`).
- **Say what's faked.** If something is faked, simplified or left out (including placeholder measurements for draft components), say so briefly so it isn't mistaken for production behaviour.
