# Building with the Zebra Design System

These instructions are for an AI agent working in a product project that uses the Zebra Design System. Your job is to build and maintain **one component library** in the project's own technology, and to keep that library and the design-system docs in step at all times.

The docs are the specification. The code implements them. Neither changes without the other.

## Setup

The design system arrives as a pull request from the master design-system repo, opened by its release workflow for every repo in its `consumers.json`. The first one adds the whole design system as a `design-system/` folder, at the repo root unless the project asked the design-system team for another path (`path` in the master repo's `consumers.json`, e.g. `docs/design-system`):

```
design-system/
  DESIGN.md        foundation: every raw value (frontmatter) + rules (body)
  atoms/           one .md per component
  molecules/
  organisms/
  templates/       this project's page-level layouts (project-owned; written in the prototyping kit, see Templates)
    universal/     the universal page-level layouts, shared by every project (master-owned, see Templates)
  icons.json       the only valid icon names, keyed by ligature name, with round/sharp SVGs (generated)
  tokens.css       every token as a CSS custom property (generated)
  scripts/         tokens-css.py and icons-json.py, the generators for the two files above
  AGENTS.md        this file
  LIBRARY.md       project-specific: a template the project's engineers fill in (see below)
  CHANGES.md       project-specific: the project's log of local changes (see below)
```

The first PR also adds, at the project root, a `CLAUDE.md` that imports this file (`@<path>/AGENTS.md`, so it names where the folder is), and the `design-system-init` skill in `.claude/skills/design-system-init/`. If the project already has a `CLAUDE.md`, the PR only appends the `@<path>/AGENTS.md` import to it (unless it's already there) and says so: the skill offers to merge in the rest of the design-system section. All paths below are relative to the design-system folder. Don't move it yourself: ask the design-system team to change its `path` first, or the next release installs it again at the old path.

On first use, before writing any component, check both project-specific files exist and are filled in.

**`LIBRARY.md`** maps the docs to the code. It ships as a template with a worked React example; the project's engineers own it and decide its conventions. If its placeholders aren't filled in, run the `design-system-init` skill: it proposes the answers from the repo, the developer confirms each section, and it then wires the tokens, scaffolds the library and builds a first component. Never change a convention in it on your own. It records (sections 1–5 once per platform, if the repo has more than one):
- the technology (e.g. React, SwiftUI, Flutter, Compose, plain CSS);
- where the component library lives (one folder, e.g. `src/components/zebra/`);
- where the generated token file lives and the command that regenerates it;
- the name transform from token key to code (e.g. `button-primary-container-background-hover` → `--button-primary-container-background-hover` in CSS, `buttonPrimaryContainerBackgroundHover` in Swift/Dart/Kotlin). Use one mechanical transform everywhere;
- how a doc's Properties table becomes the component API, and the project's conventions and workflow for library changes;
- open questions from draft components;
- the UI components the project had before, each mapped to a doc with a plan (replace, extend doc or keep);
- a table with one row per component built: `| Component | Platform | Doc | Code | Status |`.

**`CHANGES.md`** is the log of every local change to the docs (see Changing the design system). It ships with the installed `version` filled in; add an entry for every change.

## How the system is built

Read `DESIGN.md` §2 (Token Architecture) before anything else. In short:

1. **Primitives** (`primitives`): raw colour ramps (`color-*`) and the size scale (`scale-*`). Only semantic tokens point at them; a component token may use a `scale-*` step for a fixed measurement that matches it exactly. Never used directly in code.
2. **Semantic tokens** (`DESIGN.md` frontmatter): `colors` (the full palette) + the theme modes `colors-dark`, `colors-aaa`, `colors-aaa-dark`, `colors-companion`, `colors-companion-dark`, `colors-companion-aaa`, `colors-companion-aaa-dark` (overrides only), `space`, `control`, `radius`, `stroke`, `container`, `shadow`, `font-family`, `font-weight`, `typography`, `motion`, `layout`, `opacity`, `component-sizes`. Semantic colours and sizes point at primitives; the rest are raw values. The frontmatter holds the only raw values in the system.
3. **Component tokens** (`tokens:` in each component file): references only, `'{group.key}'` or `'{child.token}'` for components listed in `composes`.

Every component file has: `level`, `status` (`stable` or `draft`), `composes`, `tokens`, then Anatomy, Variants, States, Spacing & Sizing, Properties, Usage, Accessibility.

## Tokens in code

- **Generate the token file; never hand-write it.** Write one generator in the project (for CSS projects, `design-system/tokens.css` is already generated by `scripts/tokens-css.py`: use or copy it, and rerun the script after every doc change) that reads the frontmatter of `DESIGN.md` and every component file and outputs all three layers except `roles`. Record its command in `LIBRARY.md`. Rerun it after every doc change.
- **Keep references as references.** A component token must stay an alias of the token it points at (CSS `var()`, a getter, a theme lookup), not a copied value, so that every theme mode flows through. The same goes for semantic tokens that point at primitives.
- **Modes:** there are eight (`DESIGN.md` §3 Theme modes). Light (`colors`) is the default and the only full palette; `colors-dark` (dark), `colors-aaa` (AAA contrast), `colors-aaa-dark` (AAA dark), `colors-companion` (Companion), `colors-companion-dark` (Companion dark), `colors-companion-aaa` (Companion AAA) and `colors-companion-aaa-dark` (Companion AAA dark) list only the keys they override, each against the base named in its frontmatter comment. A generator merges each mode onto its base to get its full palette. In every AAA mode every component is **sharp**: its shape and corner radius tokens resolve to `radius-none`, its icons use the sharp set, and only meaningful circles (radio, switch, avatar, dots) stay round (`DESIGN.md` §5, `tokens.css` block 8). Build this as a mode-level override of those radius tokens, not per component. Rounded is every component's default shape otherwise.
- **Names:** identical to the token key, through the transform in `LIBRARY.md`, so any value in code can be found in the docs with a text search.

## Building a component

Work bottom-up. Before building a component, build (or find) everything in its `composes` list.

1. **Check `LIBRARY.md` first.** If the component exists, use it. Never build a second version, a local copy, or a "simple" variant of something already in the library.
2. **Build from the doc only**, following the conventions in `LIBRARY.md`: its anatomy, variants, states, sizes, properties and tokens. Expose the doc's Properties table as the component's API (same names and options, same defaults).
3. **Style with the component's own tokens**, then its children's. Never use semantic tokens, primitives or raw values (hex, px, ms, %, font weights) inside a component.
4. **Compose, don't restate.** A composite renders its child components (e.g. Stepper Input renders the library's Icon Button and Input) with the variant and size the doc names. It never re-implements a child's colours, states or radius. Its own tokens cover only its own parts and documented context overrides.
5. **Implement every documented state** (hover, pressed, focused, disabled, selected, error and any component-specific states) and every size, even if the current screen only needs one.
6. **Draft components** (`status: draft`, marked † in `DESIGN.md` §8) have intent tokens but no measurements. Build them with clearly marked placeholders, list the open questions in `LIBRARY.md` (Open questions), and tell the developer. Don't invent measurements silently.
7. **Add the row to `LIBRARY.md`** in the same change.

## Building a screen

- Screens are made only of library components plus layout. Start from a matching template if one exists (see Templates). Layout uses semantic `space`, `layout` and `typography` tokens (`DESIGN.md` §6).
- Screens never style a component. No overriding colours, sizes or radii from the outside, no wrapper that restyles a child. If a screen needs a component to look or behave differently, that's a design-system change (below).
- Icons come only from `icons.json` (each key is an icon's ligature name; each entry also holds its `round` and `sharp` SVG), via the Icon atom (`atoms/icon.md`). The icon font is package `@zebra-fed/zeta-icons`, at the version in the `DESIGN.md` frontmatter. `icons.json` is generated from that package by `scripts/icons-json.py`; rerun it when the version changes, and never edit it by hand. Use the sharp set for sharp-shaped components and the round set otherwise.

## Templates

A **template** is the atomic-design level above organisms: a page-level layout (regions and the library components that fill them), with placeholder content. There are two kinds:

- **This project's own**, in `templates/<template-name>.md`. They belong to this project: the release PRs never touch them, and a nightly sync copies them to the master design system (and into this project's prototyping kit).
- **Universal**, in `templates/universal/<template-name>.md`. Layouts proven in production in a project and promoted by the design-system team for every project. They belong to the master design system: the release PRs update them like any other doc.

**Use them.** Before building a screen, check `templates/`, then `templates/universal/`. If a template fits, build the screen from it; where both fit, this project's own wins.

**Don't create them.** Templates are written in prototyping mode (the prototyping kit's `create-template` skill). When the developer brings one from a designer, save it in `templates/` as it is (never in `templates/universal/`). If screens repeat a layout that has no template, tell the developer it's a template candidate for the designer, and write nothing.

**Editing one.** Only when the developer asks. Keep the format: frontmatter with `level: template`, `status` and `composes:` (every organism, molecule and atom it uses, paths relative to the template file), and the sections Anatomy, Layout, Responsiveness, Accessibility and Usage. Layout and Responsiveness use only semantic `space` and `layout` tokens, as references. Edit the doc first, then the screens built from it, then log it.

A template contains only existing library components. If an edit needs something that doesn't exist, follow the next section first.

Log an added or edited template in `CHANGES.md` (Type: template change, Files: the template path). For this project's own, Upstream is `project-only`: they reach the master design system by the nightly sync, not by review. An edit to a universal template is a design-system change like any other doc: Upstream `propose` or `project-only`, and the design-system team reviews it. Templates are docs only; screens stay in the project's code.

## When something is missing or doesn't fit

Ask the `DESIGN.md` §9 Governance questions, in this order, and take the first answer that works:

1. **Does an existing component already do it?** Use it, perhaps with a different variant, size or property.
2. **Can existing components be composed to do it?** Build a new composite that composes them.
3. **Does an existing component need a new variant, state, size or token?** Extend that component.
4. **Is it genuinely new?** Write a new component doc first, then build it.

Options 2–4 change the design system. Tell the developer which option you chose and why before you build it.

## Changing the design system

The developer may change the system to fit the project. Every change goes **docs first, then code, then log**, in one piece of work:

1. **Edit the doc.**
   - A new value goes in the `DESIGN.md` frontmatter, in the right semantic group. Raw values live nowhere else.
   - Component tokens point at it with a reference.
   - Update the component's tables and prose to match.
   - A new component gets a new file in the right level folder, in the same format as its neighbours (frontmatter, then the same sections), and a row in the `DESIGN.md` §8 index.
2. **Regenerate the tokens.**
3. **Update the code** of the changed component. Composites that use it update themselves, because they reference it instead of copying it. Check them anyway.
4. **Log it in `CHANGES.md`:**

   ```markdown
   ## YYYY-MM-DD: <short title>
   - Type: new component | template change | new variant | new token | token change | context override | fix
   - Files: atoms/button.md, DESIGN.md (frontmatter: colors)
   - Why: <the project need, in one or two sentences>
   - Upstream: propose | project-only
   ```

Mark a change `project-only` when it's a deliberate one-off for this project. Mark it `propose` when other projects would benefit. The design-system team reads these entries when it reviews this project's differences each sprint (see Syncing).

Never change the code's look or behaviour without the matching doc change, and never change a doc without updating the code that implements it.

## Syncing with the master design system

Both directions are automatic. Your part is keeping `CHANGES.md` accurate, because it carries the why.

- **Sending changes up:** every night the master design-system repo reads this repo's design-system folder and compares it with the version you have installed (the `version` in `DESIGN.md`). If anything differs, it records the differences in this project's *tenant* there, next to the master docs; if nothing does, there is no tenant. This project's own templates are copied up as they are; `templates/universal/` counts like any other doc. Don't push anything upstream yourself.
- **What happens to a difference:** each sprint the design-system team reviews it and either adopts it into the master docs, allows it as a lasting difference for this project (e.g. your own primitive colours for theming), or rejects it.
- **Pulling a new version:** it arrives as a pull request on branch `zebra-design-system/<version>`. The PR has already:
  - replaced every file you hadn't changed;
  - 3-way merged the files you had changed, so allowed differences stay and master's other edits still land;
  - left alone anything where your change and master's overlap, listed under **Needs your agent**;
  - listed rejected differences under **Please revert**;
  - never touched `LIBRARY.md`, `CHANGES.md` or this project's own templates (it updates `templates/universal/` like any doc), and regenerated `tokens.css`;
  - listed any of this project's templates that has been promoted to `templates/universal/`;
  - replaced the shipped skills in `.claude/skills/` outright. They belong to the master design system, so don't edit them here: local edits are overwritten and never synced up.

  After the developer merges it:
  1. Resolve each **Needs your agent** file against the new master version. Where it's unclear, stop and ask the developer.
  2. Revert the **Please revert** items, unless the developer decides otherwise. For each template the PR says is now universal, point its screens at the universal one and delete this project's copy.
  3. Regenerate the tokens, update the affected components, record the new `version` in `CHANGES.md`, and drop the entries upstream has now adopted.
  4. Report what changed.

## Rules

- **One library.** Each documented component exists once in the code, in the folder named in `LIBRARY.md`.
- **No raw values** in components or screens. Everything resolves to a token defined in the `DESIGN.md` frontmatter.
- **No orphans.** Every token key in a component file is used by that component's code. Every component in the library has a doc. Every built component has a `LIBRARY.md` row.
- **Docs and code move together.** A change touching one but not the other is incomplete.
- **Accessibility:** meet AA contrast (the semantic colours already do; don't override them). Touch targets are at least `--control-target-min` (`DESIGN.md` §6), through each component's touch-target token. Every focusable component shows its documented focus ring. Don't rely on colour alone (see each Usage section).
- **Don't guess.** If the docs don't answer a question, ask the developer. If they decide, record the answer in the doc.

## Before you finish

- [ ] Searched `LIBRARY.md` before building anything new
- [ ] No raw values, primitives or semantic tokens inside components
- [ ] Composites render their child components and don't restate their styling
- [ ] All documented variants, states and sizes are implemented
- [ ] Token file regenerated, and it renders correctly in light, dark, AAA and AAA dark
- [ ] Docs, code, `LIBRARY.md` and `CHANGES.md` all updated in the same change
- [ ] Started screens from a matching template; any edited template keeps its five sections and an up-to-date `composes:`
