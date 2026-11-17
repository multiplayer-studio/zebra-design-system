# Prototype Mode

Everything produced from this design system is a **prototype**. Its purpose is to communicate design concepts, not to ship. It will be rebuilt as production code later.

**Asking the designer:** every question to the designer goes through Claude desktop's built-in question prompt (the `AskUserQuestion` tool), never as plain text in your reply. This covers the Jira ticket, the GitHub repo, the Figma offer and link, posting to Jira, refreshing a prototype and saving a template. Give 2–4 short options, with the likely answer first. Where the answer is free text (a ticket key, a link, a name), offer the common choices (e.g. "No ticket") and let the designer type the rest in the prompt's own text field. Ask one question per prompt unless these instructions say the questions belong together. If the tool isn't available, ask in plain text. The one exception is the GitHub download steps (step 2 of the `new-prototype` skill's `GITHUB.md`): give them as plain text and wait for the designer to send the `.zip`.

**Starting:** begin every new prototype with the `new-prototype` skill (`.claude/skills/new-prototype/SKILL.md`). It asks for a Jira ticket, then the in-flight project's GitHub repo (two separate prompts, Jira first), copies the starter, and builds.

**Opening an existing prototype:** if its version is older than the `version` in `DESIGN.md`, use the `refresh-prototype` skill (`.claude/skills/refresh-prototype/SKILL.md`), which offers to update it.

**Browsing the system:** when the designer asks what exists or wants to look around, use the `showcase` skill (`.claude/skills/showcase/SKILL.md`).

**Reference designs:** whenever the designer gives a design to build from (a Figma link, frame or flow, or a screenshot), use the `build-from-reference` skill (`.claude/skills/build-from-reference/SKILL.md`) before writing any markup. The reference outranks everything here except that every value is still a token.

**No reference:** compose the screen by `DESIGN.md` §4 (Choosing a style) and §6 (Whitespace Strategy and Hierarchy), then check it with Before you hand over.

**Figma:** when the designer is happy with a finished prototype, use the `send-to-figma` skill (`.claude/skills/send-to-figma/SKILL.md`). It offers to send the prototype to a Figma file and does it through the Figma MCP.

## Stack

Every prototype is a static HTML, CSS and JS app. Do not use any other framework or build tool. The tokens from `DESIGN.md` and the component files are already written out as CSS custom properties in `tokens.css` (see Tokens in CSS), with names identical to the docs so every value can be traced back to its source.

**Claude desktop is the only software needed to build and view a prototype.** Never ask the user to install, or run, Python, Node, npm or any script. The one exception is the optional Jira setup in the `new-prototype` skill's `JIRA.md`. `tokens.css` and `icons.json` are generated files that are already committed; only whoever maintains the design system regenerates them (see Generated files below).

Prototypes must work when opened by double-click (`file://`), with no server and no Node. That means:
- Always create prototypes in the `prototypes/` folder at the project root, each in its own folder (`prototypes/<name>/index.html`), and never anywhere else. Create the folder if it's missing.
- Start every prototype from `prototypes/_starter/index.html`: copy it to `prototypes/<name>/index.html` and build inside `<body>`. Don't link `tokens.css`. The starter carries the tokens and the component CSS in marked blocks, because the Claude desktop Browser pane loads pages as `data:` documents and doesn't resolve relative links. Put the prototype's own CSS in a new `<style>` block after `<!-- components:end -->`.

<!-- Why the starter inlines tokens: the Browser pane ignores relative links. If it ever resolves them, go back to <link rel="stylesheet" href="../../tokens.css"> and retire scripts/starter-html.py. -->

- Use classic `<script>` tags, not ES module imports.
- Load nothing from a CDN except the IBM Plex Sans fonts listed under Fonts. Icons are inline SVG from `icons.json` (see Icons), never the icon font.

Prototypes need an internet connection to load those fonts.

## Screens

- **Handheld** prototypes are built inside the starter's device frame: `.device-stage` > `.device`, a `--frame-handheld-width` × `--frame-handheld-height` screen (a Zebra TC-series handheld) that's centred on a desktop viewport and fills a phone one. Inside it, in order: `.status-bar`, the header, `.device-body` (the only part that scrolls), and pinned actions. The markup is in the starter's component CSS comment.
- **Desktop** prototypes use the whole viewport.
- **Prototype controls** (restart, light/dark) go in `.proto-controls`, outside the design: the first child of `.device-stage` (above the frame) on handheld, and the page's top end corner on desktop. Never put them over the design. Every prototype has a light/dark control.

The device frame, status bar and prototype controls are prototype chrome, not design-system components.

## Where the design lives

| Source | What it gives you |
|---|---|
| `DESIGN.md` frontmatter | All raw values. Primitives (`primitives`: colour ramps and the `scale-*` size steps) and the semantic groups: `colors`, `colors-dark`, `colors-aaa`, `colors-aaa-dark`, `space`, `control`, `radius`, `stroke`, `container`, `shadow`, `font-family`, `font-weight`, `typography`, `motion`, `layout`, `opacity` and `component-sizes`. |
| `DESIGN.md` body | Rules, the token architecture (§2), layout principles and usage guidance |
| `atoms/`, `molecules/`, `organisms/` `*.md` | One file per component, with anatomy, variants, states, sizing, properties, usage and its `tokens:` block |
| `templates/*.md` | This project's page-level layouts (see Templates); empty in the generic kit |
| `templates/universal/*.md` | The universal page-level layouts, shared by every project (see Templates) |
| `tokens.css` | Every token as a CSS custom property, generated from `DESIGN.md` and the component files |
| `icons.json` | The only valid icons. Each key is an icon name; the value gives its label, category, search terms and its inline SVG in both styles (`round`, `sharp`). The file is large: search it, never read it whole. |

`github.json`, a `github/` folder and `prototypes/<name>/CONTEXT.md` describe the in-flight project (see the `new-prototype` skill's `GITHUB.md`). They are context, not design sources: never take a value or a component from them.

A component's `composes:` list says which other components it is built from. Read those files too, because a composite only defines its own parts and context overrides; its children's tokens style everything else.

## Tokens in CSS

**Use the tokens the starter carries; never write tokens by hand.** The file is generated, contains every component's tokens, and applies every rule below. The rules are here so you can read and check it, not so you can rewrite it. If a token you need is missing or looks out of date, don't patch it in the prototype: tell the user the generated files need regenerating.

**Naming:** a custom property has exactly the token's key, the same name the docs use in prose. `colors.color-fill-default` becomes `--color-fill-default`, `space.space-lg` becomes `--space-lg`, and the component token `button-primary-container-background-hover` becomes `--button-primary-container-background-hover`. Keys are unique across groups, so there is no prefix.

**What becomes a custom property**
- Every key of `primitives` (colour ramps and the `scale-*` size steps), `colors`, `space`, `control`, `radius`, `stroke`, `container`, `shadow`, `font-weight`, `typography`, `motion`, `layout` (lengths only), `opacity` and `component-sizes`.
- The `tokens:` of every component. These are written as `var()` references.
- **Never** `roles`: they are only aliases for tooling.

**Value conversions**
- **References:** a semantic token that points at a primitive, or a component token, becomes a `var()`: `'{primitives.color-brand-main-70}'` becomes `var(--color-brand-main-70)`, `'{colors.color-brand-primary-strong}'` becomes `var(--color-brand-primary-strong)`, and a child reference `'{icon.icon-size-small}'` becomes `var(--icon-size-small)`. Other values are written as literals.
- **Typography:** a typography token becomes a `font` shorthand, e.g. `--type-label-large: 500 16px/24px "IBM Plex Sans", sans-serif;`. The `type-h1`–`type-h6` aliases point at their target: `--type-h4: var(--type-title-large);`.

**Seven blocks, in this order:**

```css
:root {  /* 1. primitives, light colours (AA) + every non-colour token */
  --color-brand-main-60: #1f69ff;
  --color-brand-main-70: #0e53e5;
  --scale-7: 16px;
  --space-lg: var(--scale-7);
  --control-md: var(--scale-13);
  --radius-element-sm: var(--scale-3);
  --shadow-small: 0px 2px 6px 0 rgba(12,13,14,.1);
  --type-label-large: 500 16px/24px "IBM Plex Sans", sans-serif;
  --color-brand-primary-default: var(--color-brand-main-60);
  --color-fill-default: var(--color-pure-white);
  /* … */
}
[data-theme="dark"] {  /* 2. dark: every key from colors-dark */
  --color-fill-default: var(--color-neutral-cool-100);
  --color-ink-high: var(--color-pure-white);
  /* … */
}
[data-contrast="aaa"] {  /* 3. AAA contrast (light): every key from colors-aaa */
  --color-brand-primary-default: var(--color-brand-main-80);
  /* … */
}
[data-theme="light"] {  /* 4. back to light inside a dark area: the colors block again */
  --color-fill-default: var(--color-pure-white);
  /* … */
}
[data-contrast="aaa"] [data-theme="light"], [data-theme="light"][data-contrast="aaa"] {  /* 5. AAA light inside a dark area: colors-aaa again */
  --color-brand-primary-default: var(--color-brand-main-80);
  /* … */
}
[data-contrast="aaa"] [data-theme="dark"], [data-theme="dark"] [data-contrast="aaa"], [data-theme="dark"][data-contrast="aaa"] {  /* 6. AAA dark: every key from colors-aaa-dark */
  --color-brand-primary-default: var(--color-brand-main-30);
  /* … */
}
:root, [data-theme], [data-contrast] {  /* 7. component tokens, recomputed in every themed scope */
  --button-primary-container-background-enabled: var(--color-brand-primary-default);
  --button-primary-container-background-hover: var(--color-brand-primary-strong);
  --button-container-height-medium: var(--control-md);
  --button-icon-size-small: var(--icon-size-small);
  /* … every component */
}
[data-contrast="aaa"], [data-contrast="aaa"] [data-theme] {  /* 8. AAA is always sharp: every shape and corner radius → none */
  --button-container-radius-rounded: var(--radius-none);
  /* … every component radius except meaningful circles (radio, switch, avatar, dots) */
}
```

- **Why block 7 lists `[data-theme]` and `[data-contrast]`:** a custom property that uses `var()` is computed where it is declared, then inherited. If the component tokens were declared only on `:root`, a dark area would inherit their light values.
- **Order matters:** later blocks override earlier ones at equal specificity.
- **AAA is sharp:** block 8 makes every component sharp under `data-contrast="aaa"`, and `components.css` switches icons to the sharp set there. Rounded is every component's default otherwise (DESIGN.md §5). Never re-round a component in AAA.
- **Switching theme:** set `data-theme="dark"` on any element to make it and its contents dark, and `data-theme="light"` to switch back inside a dark area. Never choose a dark colour by hand.
- **Always-dark components:** components the docs describe as always dark carry `data-theme="dark"` on their own element, e.g. the Global Header.
- **AAA contrast:** set `data-contrast="aaa"` on `<html>`; it is a whole-page setting. It works in both themes: dark areas inside an AAA page use the AAA dark values, and light areas the AAA light ones.

## Building components

- Style a component with **its own tokens first**, then the tokens of the components it composes. Never use semantic tokens directly in component CSS. If a value you need has no component token, it isn't part of the design: ask, or flag it.
- Where the starter's component CSS gives a component's markup in a comment, use it exactly, e.g. a button's label sits in `<span class="btn-label">`.
- Build a composite from its children as the component file describes it, e.g. "Icon Button, outline-subtle, medium". Then apply the composite's own tokens and context overrides on top.
- Only use the variants, sizes, states and anatomy the component file lists.
- **Draft components** (`status: draft`, marked † in the `DESIGN.md` index) have no measurements yet. If a prototype needs one, use only the tokens it defines and its composed children. Lay out the rest with the `space` scale, and say in the prototype and in your reply that its measurements are placeholders.

## Templates

A **template** is the atomic-design level above organisms: a page-level layout (regions and the components that fill them), with placeholder content. It lives in `templates/<template-name>.md`, next to `prototypes/`. Every kit ships the **universal** templates in `templates/universal/`: layouts proven in production and shared by every project. A project's kit also ships that project's own templates, flat in `templates/`.

**Use them.** Before building a prototype, check `templates/`, then `templates/universal/`. If a template fits, build the screen from it; where both fit, the project's own wins.

**Spot them.** Notice when the designer has produced a layout that other screens or projects could reuse: the same arrangement of components across two or more prototypes, or one screen that is a common pattern (e.g. a header, a filter row and a data table; a centred form in a card with a primary action; a list with a detail pane). That is a template candidate.

**Offer, don't push.**
- Ask at a natural stopping point, after finishing the request, never mid-task, with the question prompt (see Asking the designer). One short question naming the pattern and where it appears: "The login and reset-password prototypes share this layout. Want me to save it as a template?"
- Write nothing until the designer says yes. If they decline, don't ask about that pattern again.

**Write it** with the `create-template` skill (`.claude/skills/create-template/SKILL.md` in this kit), which holds the format and checks. In short: a Markdown doc in the same format as the component files, with `level: template`, `status: draft`, `composes:` listing every component it uses, and the sections Anatomy, Layout, Responsiveness, Accessibility and Usage. The designer can also ask for a template directly, e.g. "Make a template from this prototype." Never write or edit in `templates/universal/`: those belong to the master design system. To vary one, save a new template in `templates/`.

**Share them.** Templates reach the design system through the project's repo: the designer gives the file to the project's developer, who adds it to the repo's `design-system/templates/`. A nightly sync then copies it to the master design system, and the project's next kit includes it.

A template contains only existing components. Never invent one for it; if it needs something missing, say so instead. A template is a doc, not a prototype: the prototype stays in `prototypes/`.

## Fonts

Fonts are loaded from the jsDelivr CDN, pinned to an exact version. Do not copy font files into the prototype folder, and do not load fonts from anywhere else.

All typography tokens use **IBM Plex Sans**, from the `@fontsource/ibm-plex-sans` package (v5.3.0, SIL OFL), Latin subset, in the five weights the tokens use: 300 (`--font-weight-light`), 400 (`--font-weight-regular`), 500 (`--font-weight-medium`), 600 (`--font-weight-semibold`) and 700 (`--font-weight-bold`).

1. The starter already declares these; don't add them again. For reference:
   ```css
   @font-face { font-family: "IBM Plex Sans"; font-weight: 300; font-style: normal; font-display: swap; src: url("https://cdn.jsdelivr.net/npm/@fontsource/ibm-plex-sans@5.3.0/files/ibm-plex-sans-latin-300-normal.woff2") format("woff2"); }
   @font-face { font-family: "IBM Plex Sans"; font-weight: 400; font-style: normal; font-display: swap; src: url("https://cdn.jsdelivr.net/npm/@fontsource/ibm-plex-sans@5.3.0/files/ibm-plex-sans-latin-400-normal.woff2") format("woff2"); }
   @font-face { font-family: "IBM Plex Sans"; font-weight: 500; font-style: normal; font-display: swap; src: url("https://cdn.jsdelivr.net/npm/@fontsource/ibm-plex-sans@5.3.0/files/ibm-plex-sans-latin-500-normal.woff2") format("woff2"); }
   @font-face { font-family: "IBM Plex Sans"; font-weight: 600; font-style: normal; font-display: swap; src: url("https://cdn.jsdelivr.net/npm/@fontsource/ibm-plex-sans@5.3.0/files/ibm-plex-sans-latin-600-normal.woff2") format("woff2"); }
   @font-face { font-family: "IBM Plex Sans"; font-weight: 700; font-style: normal; font-display: swap; src: url("https://cdn.jsdelivr.net/npm/@fontsource/ibm-plex-sans@5.3.0/files/ibm-plex-sans-latin-700-normal.woff2") format("woff2"); }
   ```
2. Set text through typography tokens, either a component's font token or, for page-level text, the typography group (e.g. `font: var(--type-body-medium)`). Do not write a font family or weight by hand.
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
3. **Size and colour** come from tokens. The Icon atom's tokens are the defaults: `--icon-size` (default), `--icon-size-xsmall`, `--icon-size-small`, `--icon-size-medium`, `--icon-size-large`, `--icon-foreground`, `--icon-foreground-inverse` and `--icon-foreground-disabled`. Inside a component, use that component's icon tokens or overrides where its file defines them.
4. **Accessibility:** decorative icons get `aria-hidden="true"`, and an icon-only button needs an `aria-label` on the button. Never use an icon as the only carrier of meaning: pair it with text.

## Generated files

`tokens.css`, `icons.json` and `prototypes/_starter/index.html` are generated and committed, so nobody building a prototype needs any tooling. They are produced by three scripts in `scripts/`, which only the design-system maintainer runs (they need Python 3, the standard library only):

| Run | When | Writes |
|---|---|---|
| `python3 scripts/tokens-css.py` | after any change to the `DESIGN.md` frontmatter or a component's `tokens:` | `tokens.css`; exits 1 if a token reference is broken |
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
- **Stay faithful to the design system.** Follow the `DESIGN.md` frontmatter and rules, the component files and `icons.json`. Never hardcode a value: every colour, size, space, radius, shadow, font and duration is a `var()` of a token. If a design needs a value with no token, use the nearest token and report the value as a token request. Never invent icons, variants, states, anatomy or tokens.
- **Accessibility baselines** are part of the design, not production polish:
  - WCAG 2.2 AA contrast, which the semantic colours already meet. Don't add opacity to text.
  - A visible focus ring on every interactive element, using that component's focus-ring tokens.
  - Touch targets of at least `--control-target-min`.
  - No meaning carried by colour alone.
- **Animate appearances,** even where only end states are drawn: sheets slide from their edge, scrims fade, dialogs ease in, using the `motion` tokens. All of it is off under `prefers-reduced-motion`.
- **Make intent obvious.** Name things after the design concept, and add a brief comment where a shortcut stands in for real behaviour (e.g. `// mock data`).
- **Say what's faked.** If something is faked, simplified or left out (including placeholder measurements for draft components), say so briefly so it isn't mistaken for production behaviour.

## Before you hand over

Measure, don't eyeball: read the computed values from the rendered page. With a reference, use the checks in the `build-from-reference` skill instead of the first five below.

- [ ] One primary button and one heading-level style per screen.
- [ ] Four text styles or fewer; nothing needed to finish the task under 14px.
- [ ] Every gap and padding is a token, and gaps inside groups are smaller than gaps between them.
- [ ] Squint at the screen: the first thing seen is the main content, the second the main action.
- [ ] View it in greyscale: the hierarchy still reads without colour.
- [ ] Light and dark; phone width and desktop; visible keyboard focus.

Then report: the screens built, the components used, any hand-built parts and why, every token request, and anything faked.
