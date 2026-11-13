---
name: design-system-init
description: Set up the Zebra Design System in this repo. Walks the developer through filling in LIBRARY.md (technology, library location, tokens, component API, conventions, workflow, existing UI), creates CHANGES.md, wires the tokens, scaffolds the component library and builds a first component. Use when the developer asks to set up, init or onboard the design system, or to fill in LIBRARY.md, and whenever LIBRARY.md still has <…> placeholders before a component is built. On a filled-in LIBRARY.md, use it to revise one section or add a platform.
---

# Set up the design system

The design system arrived as a `design-system/` folder from a release PR, at the repo root unless the project chose another path. Below, `design-system/` means that folder. `design-system/AGENTS.md` says how the library is built. `design-system/LIBRARY.md` holds this project's answers about how, and its engineers own it. This skill fills in those answers with the developer. It doesn't set any rules of its own: where this skill and `AGENTS.md` overlap, `AGENTS.md` wins.

Work through the steps in order, one at a time. For each `LIBRARY.md` section:
- propose answers;
- let the developer confirm or edit them;
- write the section;
- move on.

If the developer stops partway, you can resume later, because a section with no `<…>` left counts as done and is skipped. Never decide a convention yourself: every answer written to `LIBRARY.md` is one the developer confirmed. Don't run git; leave every change uncommitted.

## 0. Preflight

1. Find the design-system folder: the one the root `CLAUDE.md` imports as `@<path>/AGENTS.md`, or else the folder holding `DESIGN.md`, `AGENTS.md` and `LIBRARY.md` together. If there's none, stop: the first release PR hasn't been merged.
2. Check the root `CLAUDE.md` imports `@<path>/AGENTS.md`. If it doesn't, the repo had its own `CLAUDE.md` before the first release. Offer to add the design-system section (the "Design system (always applies)" block and the import). Show the diff, and write only after the developer says yes.
3. Read `version` from the `DESIGN.md` frontmatter.
4. If `LIBRARY.md` has no `<…>` placeholders and no "Example: React" section, it's already filled in. Offer a menu:
   - revise one section (1–8);
   - add a platform;
   - rerun the Existing UI inventory.

   Do only what the developer picks, using the steps below, then stop.

## 1. Scan the repo

Read the repo without changing anything, then show the developer a short summary of what you found:

- **Platforms:**
  - `package.json` (React, Vue, Angular, Svelte…);
  - `pubspec.yaml` (Flutter);
  - `build.gradle(.kts)` with Compose (Android);
  - `*.xcodeproj` or `Package.swift` (SwiftUI).

  A monorepo can have more than one.
- **Styling:**
  - CSS Modules, Tailwind, styled-components, Sass;
  - `ThemeData` or a `ThemeExtension`;
  - a Compose `MaterialTheme`.
- **Behaviour/a11y primitives:** Base UI, Radix, React Aria, Headless UI; Material widgets.
- **Existing UI components:**
  - folders such as `components/`, `ui/` or `widgets/`;
  - wrappers around MUI, shadcn, Material and the like.
- **Tooling:**
  - tests: Vitest, Jest, `flutter_test`;
  - previews: Storybook, Widgetbook;
  - accessibility checks: axe.
- **Entry point:** `src/main.tsx`, `lib/main.dart` and the like.
- **Workflow:** branch and PR conventions from `CONTRIBUTING*`, `.github/pull_request_template.md` and recent branch names.

## 2. Sections 1–5, per platform

If the repo has more than one platform, ask which ones get a library. Fill sections 1–5 once per platform, under a `### <Platform>` heading in each section. Sections 6–9 are shared.

Propose from the scan first. Where the scan finds nothing (greenfield, or a choice the project hasn't made), propose the house default:

| Platform | Default |
|---|---|
| React | the "Example: React" section of `LIBRARY.md`: CSS Modules, Base UI, `design-system/tokens.css` loaded once |
| Flutter | a generated Dart token class per mode (light, dark, AAA, AAA dark) exposed through a `ThemeExtension`; components read tokens with `Theme.of(context).extension<…>()`; no third-party widget library |
| Anything else | no default: ask open-ended |

Per section:

1. **Technology.** Platform and language, styling approach, behaviour primitives.
2. **Library location.** One folder, the files that make up one component, how screens import it. If the project already has a component folder, ask whether the Zebra library goes in it or next to it.
3. **Tokens.**
   - CSS projects use `design-system/tokens.css` and `python3 design-system/scripts/tokens-css.py`.
   - Other platforms get a generator written in step 6. Agree its path and command now, in the project's own tooling (e.g. `tool/` or `scripts/`), never in `design-system/`.
   - Name transform: one mechanical rule (`AGENTS.md`, Tokens in code). CSS keeps the token key; Swift, Dart and Kotlin use camelCase.
   - Fill in the example row, and say how modes are switched.
4. **Component API.** Show the proposal applied to the Properties table of `design-system/atoms/button.md` (names, options, defaults, icons, pass-through), so the developer can judge it on a real component.
5. **Conventions.** States, composites, tests, previews, review. Delete the bullets the project doesn't use.

## 3. Section 6, Workflow

Propose the branch, checks and PR steps from the scan, around the order `AGENTS.md` sets (docs, then tokens, then code, then `CHANGES.md`).

## 4. Existing UI

Skip this step (and delete §8) if the scan found no UI components. Otherwise list each existing component, then propose:
- the design-system doc it maps to (`DESIGN.md` §8), or "none";
- a plan:
  - **replace:** the library component takes over, and screens move to it;
  - **extend doc:** it needs something the doc lacks, so follow `AGENTS.md` (When something is missing) when it's migrated;
  - **keep:** it stays outside the library, with the reason why.

After the developer confirms, write the table in §8 Existing UI. If there were none, delete §8. Don't change any existing code. Migration happens later, component by component, the same way as any other build.

## 5. Finish LIBRARY.md and start CHANGES.md

1. Delete the "Example: React" section and the "To fill it in" line. Check that no `<…>` is left.
2. Create `design-system/CHANGES.md` if it doesn't exist:

   ```markdown
   # CHANGES.md

   Local changes to the design-system docs (see `AGENTS.md`, Changing the design system).

   Installed version: <version from DESIGN.md>
   ```

## 6. Wire the tokens

- **CSS:** import `design-system/tokens.css` once in the entry point recorded in §3.
- **Other platforms:** write the generator at the path agreed in §3, following `AGENTS.md` (Tokens in code): it reads the frontmatter of `DESIGN.md` and every component file, outputs every layer except `roles`, and keeps component tokens as references to the semantic ones (and semantic ones as references to the primitives). Run it, and check that it has no raw values in its component tokens.
- **Modes:** add the switch recorded in §3 (e.g. a `ThemeProvider` that sets `data-theme="dark"`/`data-contrast="aaa"`, or a `ThemeMode` that swaps the extension). Check that light, dark, AAA and AAA dark all resolve.

## 7. Scaffold the library

Create the library folder from §2, with its index or barrel file and nothing else. No placeholder components.

## 8. Build the first component

Ask which component the developer needs first. Suggest `atoms/icon.md` if they have no preference, because most components compose it. Build the component and everything in its `composes` list, bottom-up, by following `AGENTS.md` (Building a component) and the conventions just written. Add one row per component to §9 Components, with its platform.

## 9. Report

Run the `AGENTS.md` "Before you finish" checklist. Then tell the developer:
- every file you created or changed;
- the open questions you added to §7 (draft components);
- the Existing UI plan, in one line;
- that nothing is committed, and that §6 says how to raise the PR.
