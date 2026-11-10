# Zebra Design System

The Zebra Design System written as plain Markdown, so that people and AI agents can both read it and build from it.

The Zebra Design System is an enterprise utility language for frontline workers who scan screens quickly, often on rugged handheld devices, with gloves on or in poor light. It uses cool-neutral greys, a single Zebra Blue accent, IBM Plex Sans, a strict mini-unit grid and low, quiet depth. It works in light, dark and high-contrast modes.

The docs are the specification. Every colour, size, space, radius, shadow, font and duration is defined once as a token, and every component is described in its own file.

---

## Contents

| Path | What it is |
|---|---|
| [`DESIGN.md`](DESIGN.md) | The foundation. The **frontmatter** holds every raw value (colours for light, dark and high contrast, spacing, radius, borders, elevation, typography, motion, layout, opacity, component dimensions). The **body** holds the rules: theme, token architecture, colour, typography, components, layout, notes for Stitch generation, the component index and governance. |
| [`atoms/`](atoms/) | 22 basic components: Button, Icon Button, FAB, Icon, Checkbox, Radio Button, Switch, Slider, Avatar, Chips, Tooltip, Progress… |
| [`molecules/`](molecules/) | 31 components built from atoms: inputs, tabs, segmented control, list items, banners, snackbar, pagination… |
| [`organisms/`](organisms/) | 18 larger patterns: dialog, bottom sheet, global header, top app bar, navigation rail, stepper, data table… |
| [`tokens.css`](tokens.css) | **Generated.** Every token as a CSS custom property, with light, dark and high-contrast blocks. |
| [`icons.json`](icons.json) | **Generated.** The 715 valid icon names from `@zebra-fed/zeta-icons` 1.9.8, keyed by ligature name, with label, category, search terms and each icon's round and sharp SVG. |
| [`scripts/`](scripts/) | Maintainer scripts: the two generators for the files above, the prototype starter generator (`starter-html.py`), and the two zip bundlers (`prototyping-zip.py`, `production-zip.py`, sharing `_bundle.py`). |
| [`prototypes/`](prototypes/) | HTML prototypes. [`showcase/`](prototypes/showcase/index.html) renders the components in every theme; its tokens, components and icons blocks are filled by `starter-html.py`. [`_starter/`](prototypes/_starter/index.html) is the page every prototype starts from: `components.css` is its hand-edited source, and `index.html` is generated with `tokens.css` and the component CSS inlined. |
| [`templates/`](templates/) | Page-level layout templates, one folder per project (`templates/{project_name}/`). Created in prototyping mode (the `create-template` skill); production builds read and edit them (see `PROTOTYPING.AGENTS.md` and `PRODUCTION.AGENTS.md`). Shipped in both zips. |
| [`.claude/skills/`](.claude/skills/) | Claude Code skills. [`create-template`](.claude/skills/create-template/SKILL.md) writes a template doc, including its Responsiveness and Accessibility sections. Prototyping zip only. |
| [`PRODUCTION.CLAUDE.md`](PRODUCTION.CLAUDE.md) | Template `CLAUDE.md` for production builds. The production zip ships it as `CLAUDE.md`. |
| [`PROTOTYPING.CLAUDE.md`](PROTOTYPING.CLAUDE.md) | Template `CLAUDE.md` for prototyping. The prototyping zip ships it as `CLAUDE.md`. |
| [`CLAUDE.md`](CLAUDE.md) | Instructions for working on this repo: keep every doc, generated file and zip in sync with each change. Not shipped in the zips. |
| [`PRODUCTION.AGENTS.md`](PRODUCTION.AGENTS.md) | Guide for agents building a **production** component library from these docs. Shipped in the production zip as `design-system/AGENTS.md`. |
| [`PROTOTYPING.AGENTS.md`](PROTOTYPING.AGENTS.md) | Guide for building **throwaway HTML prototypes** from these docs. |
| [`PROTOTYPING.JIRA.md`](PROTOTYPING.JIRA.md) | Prototyping add-on: asks for a Jira ticket, reads and comments on it through the `zebra-jira` MCP, and explains how to set the MCP up. Imported by `PROTOTYPING.AGENTS.md`; prototyping zip only. |
| [`PROTOTYPING.FIGMA.md`](PROTOTYPING.FIGMA.md) | Prototyping add-on: offers to send a finished prototype to a Figma file the designer links to, through the Figma MCP, and explains how to connect Figma. Imported by `PROTOTYPING.AGENTS.md`; prototyping zip only. |
| [`PROTOTYPING.README.md`](PROTOTYPING.README.md) | Plain-English setup guide for people who only build prototypes. Shipped as `README.md` inside the prototyping zip. |
| [`zebra-design-system-prototyping.zip`](zebra-design-system-prototyping.zip) | **Generated.** The prototyping kit to hand to someone who only builds prototypes. |
| [`zebra-design-system-production.zip`](zebra-design-system-production.zip) | **Generated.** The production kit to drop into a product repo as `design-system/`. |

The full component list, grouped by level and purpose, is in [`DESIGN.md` §8 Component Index](DESIGN.md#8-component-index-atomic).

---

## Token architecture

Tokens form three layers. Each layer only references the one below it.

| Layer | Lives in | Example |
|---|---|---|
| **1. Primitives** | `DESIGN.md` frontmatter: `primitives`, `primitives-dark` | `--color-blue-50` |
| **2. Semantic** | `DESIGN.md` frontmatter: `colors` (+ `colors-dark`, `colors-high-contrast`), `spacing`, `rounded`, `border`, `elevation`, `typography`, `motion`, `layout`, `opacity`, `dimensions`, … | `--state-primary-hover` |
| **3. Component** | the `tokens:` block of each component file | `--button-primary-container-background-hover` |

- **Raw values live only in the `DESIGN.md` frontmatter.** A value that isn't there doesn't exist in the system.
- **Primitives are never used directly.** Only semantic colours point at them.
- **Component tokens are references only:** `'{colors.state-primary-hover}'`, or `'{child.token}'` for a component listed in `composes`.
- **Modes are free.** Semantic keys are the same in every mode, so dark and high contrast re-theme every component without any per-component work.
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
  button-primary-container-background-hover: '{colors.state-primary-hover}'
  # …
---
```

The frontmatter is followed by these sections: **Anatomy, Variants, States, Spacing & Sizing, Properties, Usage, Stitch Prompt**.

- **Composites don't restate their children.** A molecule names the child, variant and size it uses (e.g. "Icon Button, outline-subtle, medium"). The child's own tokens style it. The composite's tokens only cover its own parts and deliberate context overrides.
- **Draft components** (`status: draft`, marked † in the index) have their purpose, anatomy and composition defined, but not their measurements. There are 16 of them, including Data Table, Date Picker, Chat and Dial Pad. Any measurements used for them are placeholders and must be called out as such.

---

## Using the design system

Pick one mode per project. Each zip ships its own `CLAUDE.md` (`PRODUCTION.CLAUDE.md` or `PROTOTYPING.CLAUDE.md`), so nothing needs trimming. If you copy by hand, take the file for your mode and name it `CLAUDE.md`.

### Prototypes (HTML)

You only need the Claude desktop app. No Python, Node or build tools.

1. Ask Claude for a prototype. It creates `prototypes/<name>/index.html`.
2. The page starts from `prototypes/_starter/index.html`, which carries the tokens and component CSS inline (the Browser pane ignores relative links such as `../../tokens.css`), and loads IBM Plex Sans from jsDelivr, pinned to an exact version. Icons are inline SVG copied from `icons.json`, so they need no font or CDN.
3. Open it in the Claude desktop Browser pane. It works over `file://` with no server; it needs internet only for the fonts.

Theming in the markup:

```html
<html data-contrast="high">            <!-- whole page high contrast (light only) -->
<section data-theme="dark">…</section>  <!-- this area and its contents dark -->
<svg class="icon" aria-hidden="true" …>…</svg>  <!-- icon: the round/sharp SVG from icons.json -->
```

See [`PROTOTYPING.AGENTS.md`](PROTOTYPING.AGENTS.md) for the full rules.

### Production component library

Copy `design-system/` and `CLAUDE.md` from the production zip into the product repo's root, and follow [`PRODUCTION.AGENTS.md`](PRODUCTION.AGENTS.md) (shipped as `AGENTS.md`). In short:

- Create `LIBRARY.md` (technology, library location, token-name transform, one row per built component) and `CHANGES.md` (log of local doc changes and the copied `version`).
- Generate the token file, never hand-write it. Keep component tokens as aliases so modes flow through.
- Build bottom-up from the docs. Each component's Properties table is its API, and every documented state and size gets implemented.
- Screens use library components plus layout tokens only. They never restyle a component.
- Screens start from a matching template in `templates/{project_name}/`. The agent edits templates on request but never creates them.
- Every change goes **docs first, then code, then log**, in one piece of work. `propose` entries in `CHANGES.md` are offered back upstream.

---

## Rules that always apply

- **Use tokens, never raw values.** That covers colour, spacing, radius, shadow, font and duration.
- **Use existing components before inventing new ones.** If nothing fits, follow [Governance](#governance).
- **Icons come only from `icons.json`.** Use the round set by default and the sharp set for sharp-shaped components.
- **Accessibility is part of the design:** WCAG 2.2 AA contrast (the semantic colours already meet it), a visible focus ring on every interactive element, touch targets of at least `--touch-target-min`, and no meaning carried by colour alone.
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
| `python3 scripts/tokens-css.py` | any change to the `DESIGN.md` frontmatter or a component's `tokens:` | `tokens.css` |
| `python3 scripts/starter-html.py` | after `tokens-css.py` or `icons-json.py`, or any change to `prototypes/_starter/components.css` | `prototypes/_starter/index.html` and the showcase's marked blocks; also reports (never fails on) `var()` names nothing defines and component tokens `components.css` doesn't use |
| `python3 scripts/icons-json.py [version]` | changing the `icons` version in the `DESIGN.md` frontmatter (needs internet; verifies the npm tarball's integrity) | `icons.json` |
| `python3 scripts/prototyping-zip.py` | regenerating either file above, or changing the docs, prototypes, `PROTOTYPING.CLAUDE.md`, `PROTOTYPING.AGENTS.md`, `PROTOTYPING.JIRA.md`, `PROTOTYPING.FIGMA.md`, `PROTOTYPING.README.md` or `.claude/skills/` | `zebra-design-system-prototyping.zip` |
| `python3 scripts/production-zip.py` | regenerating either file above, or changing the docs, `PRODUCTION.CLAUDE.md` or `PRODUCTION.AGENTS.md` | `zebra-design-system-production.zip` |

Never edit `tokens.css`, `icons.json` or the zips by hand. Commit them (and the zips) after regenerating, so consumers never need tooling.

`zebra-design-system-prototyping.zip` is the kit to hand to someone who only builds prototypes. It holds a single `zebra-design-system-prototyping/` folder containing `atoms/`, `molecules/`, `organisms/`, `prototypes/`, `templates/`, `.claude/skills/`, `DESIGN.md`, `PROTOTYPING.AGENTS.md`, `PROTOTYPING.JIRA.md`, `PROTOTYPING.FIGMA.md`, `icons.json` and `tokens.css`. It also includes `CLAUDE.md` (from `PROTOTYPING.CLAUDE.md`), and `PROTOTYPING.README.md` saved as `README.md`. Run the script after regenerating the token or icon files, so the zip carries the latest versions.

`zebra-design-system-production.zip` is the kit to drop into a project repo. It holds a `zebra-design-system-production/` folder with two things inside, both copied straight to the project root: `CLAUDE.md` (production-builds section only, importing `@design-system/AGENTS.md`) and a `design-system/` folder (the name `AGENTS.md` expects). `design-system/` contains `atoms/`, `molecules/`, `organisms/`, `templates/`, `DESIGN.md`, `AGENTS.md`, `icons.json`, `tokens.css` and the two generators in `scripts/`.

The current docs version is the `version` field in the `DESIGN.md` frontmatter.

---

## External dependencies

| What | Package | Version | Licence |
|---|---|---|---|
| Typeface | `@fontsource/ibm-plex-sans` (Latin; weights 300, 400, 500) | 5.3.0 | SIL OFL |
| Icons | `@zebra-fed/zeta-icons` (round and sharp fonts; SVGs in `icons.json`) | 1.9.8 | MIT |

The typeface is loaded from jsDelivr at a pinned version. Prototypes use the icon SVGs from `icons.json`; production uses the icon fonts from the package.
