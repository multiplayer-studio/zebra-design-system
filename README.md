# Zeta Design System

The Zeta Design System (Zebra Technologies) written as plain Markdown, so that people and AI agents can both read it and build from it.

Zeta is an enterprise utility language for frontline workers who scan screens quickly, often on rugged handheld devices, with gloves on or in poor light. It uses cool-neutral greys, a single Zebra Blue accent, IBM Plex Sans, a strict mini-unit grid and low, quiet depth. It works in light, dark and high-contrast modes.

The docs are the specification. Every colour, size, space, radius, shadow, font and duration is defined once as a token, and every component is described in its own file.

---

## Contents

| Path | What it is |
|---|---|
| [`DESIGN.md`](DESIGN.md) | The foundation. The **frontmatter** holds every raw value (colours for light, dark and high contrast, spacing, radius, borders, elevation, typography, motion, layout, opacity, component dimensions). The **body** holds the rules: theme, token architecture, colour, typography, components, layout, governance. |
| [`atoms/`](atoms/) | 22 basic components: Button, Icon Button, FAB, Icon, Checkbox, Radio Button, Switch, Slider, Avatar, Chips, Tooltip, Progress… |
| [`molecules/`](molecules/) | 31 components built from atoms: inputs, tabs, segmented control, list items, banners, snackbar, pagination… |
| [`organisms/`](organisms/) | 18 larger patterns: dialog, bottom sheet, global header, top app bar, navigation rail, stepper, data table… |
| [`tokens.css`](tokens.css) | **Generated.** Every token as a CSS custom property, with light, dark and high-contrast blocks. |
| [`icons.json`](icons.json) | **Generated.** The 715 valid icon names from `@zebra-fed/zeta-icons` 1.9.8, keyed by ligature name, with label, category and search terms. |
| [`scripts/`](scripts/) | Maintainer scripts: the two generators for the files above, and the prototyping-kit bundler. |
| [`prototypes/`](prototypes/) | HTML prototypes. [`showcase/`](prototypes/showcase/index.html) renders the components in every theme. |
| [`CLAUDE.md`](CLAUDE.md) | Entry point for Claude. It loads one of the two guides below. |
| [`AGENTS.md`](AGENTS.md) | Guide for agents building a **production** component library from these docs. |
| [`PROTOTYPE.md`](PROTOTYPE.md) | Guide for building **throwaway HTML prototypes** from these docs. |

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

The frontmatter is followed by these sections: **Anatomy, Variants, States, Spacing & Sizing, Properties, Usage**.

- **Composites don't restate their children.** A molecule names the child, variant and size it uses (e.g. "Icon Button, outline-subtle, medium"). The child's own tokens style it. The composite's tokens only cover its own parts and deliberate context overrides.
- **Draft components** (`status: draft`, marked † in the index) have their purpose, anatomy and composition defined, but not their measurements. There are 16 of them, including Data Table, Date Picker, Chat and Dial Pad. Any measurements used for them are placeholders and must be called out as such.

---

## Using the design system

Pick one mode per project. `CLAUDE.md` expects to contain exactly one of the two optional sections; delete the other.

### Prototypes (HTML)

You only need the Claude desktop app. No Python, Node or build tools.

1. Ask Claude for a prototype. It creates `prototypes/<name>/index.html`.
2. The page links `../../tokens.css` and loads IBM Plex Sans and the Zeta icon fonts from jsDelivr, pinned to exact versions.
3. Open it in the Claude desktop Browser pane. It works over `file://` with no server; it needs internet only for the fonts.

Theming in the markup:

```html
<html data-contrast="high">            <!-- whole page high contrast (light only) -->
<section data-theme="dark">…</section>  <!-- this area and its contents dark -->
<span class="icon" aria-hidden="true">check_circle</span>  <!-- icon by ligature name from icons.json -->
```

See [`PROTOTYPE.md`](PROTOTYPE.md) for the full rules.

### Production component library

Copy the whole folder into the product repo as `design-system/` and follow [`AGENTS.md`](AGENTS.md). In short:

- Create `LIBRARY.md` (technology, library location, token-name transform, one row per built component) and `CHANGES.md` (log of local doc changes and the copied `version`).
- Generate the token file, never hand-write it. Keep component tokens as aliases so modes flow through.
- Build bottom-up from the docs. Each component's Properties table is its API, and every documented state and size gets implemented.
- Screens use library components plus layout tokens only. They never restyle a component.
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
| `python3 scripts/icons-json.py [version]` | changing the `icons` version in the `DESIGN.md` frontmatter (needs internet; verifies the npm tarball's integrity) | `icons.json` |
| `python3 scripts/prototyping-zip.py` | regenerating either file above, or changing the docs, prototypes, `CLAUDE.md`, `PROTOTYPE.md` or `PROTOTYPING.README.md` | `zebra-prototyping.zip` |

Never edit `tokens.css` or `icons.json` by hand. Commit them after regenerating, so consumers never need tooling.

`zebra-prototyping.zip` is the kit to hand to someone who only builds prototypes. It holds a single `zebra-prototyping/` folder containing `atoms/`, `molecules/`, `organisms/`, `prototypes/`, `DESIGN.md`, `PROTOTYPE.md`, `icons.json` and `tokens.css`. It also includes `CLAUDE.md` with the production-builds section removed, and `PROTOTYPING.README.md` saved as `README.md`. Run the script after regenerating the token or icon files, so the zip carries the latest versions.

The current docs version is the `version` field in the `DESIGN.md` frontmatter.

---

## External dependencies

| What | Package | Version | Licence |
|---|---|---|---|
| Typeface | `@fontsource/ibm-plex-sans` (Latin; weights 300, 400, 500) | 5.3.0 | SIL OFL |
| Icons | `@zebra-fed/zeta-icons` (round and sharp fonts) | 1.9.8 | MIT |

Both are loaded from jsDelivr at pinned versions.
