---
name: update-web-component
description: Use when the user wants to update or maintain an existing zeta-web component — adding a prop/variant, fixing a bug, changing styles/behavior, or applying a design change from an updated Figma link — as opposed to building a new component from scratch. Guides making the change consistent with this repo's conventions — keeping the base classes/mixins, TSDoc tags, design-token styling, Storybook story + Docs.mdx, Figma Code Connect mapping, and test structure in sync with the update, without restructuring what doesn't need to change.
---

# Update an existing zeta-web component

`zeta-web` is the Lit web component library package (`packages/zeta-web` / `@zebra-fed/zeta-web`) within this monorepo. The goal here is a minimal, consistent change — match the existing file's style and don't restructure what the update doesn't touch. Check `CONTRIBUTING.md` if anything below is ambiguous.

## 0. Pull the design context first

`docs/figma-generated-instructions/<component>.md` is the source of truth — it mirrors the Figma design exactly (layer structure, resolved tokens per variant, token changes by property). Before touching code:

1. Check `docs/figma-generated-instructions/<component>.md` first and diff it mentally against the current implementation to see what changed — new variant, new token, new state.
2. If a Figma link was given and the doc doesn't cover the change (or doesn't exist yet), fall back to Figma directly: load the `figma-design-to-code` skill and use `get_design_context` (and `get_variable_defs`) on the given node.
3. Skip this step only if there's no `docs/figma-generated-instructions/<component>.md` file and no Figma link.

## 1. Find the component and its related files

For a component `foo-bar`, locate all of:

```
src/components/**/foo-bar/foo-bar.ts            # component class
src/components/**/foo-bar/foo-bar.styles.js      # styles
src/stories/components/<Group>/foo-bar.stories.ts  # story
src/stories/components/<Group>/Docs.mdx          # docs page
src/test/**/foo-bar/foo-bar.test.ts              # tests
src/figma/foo-bar.figma.ts                       # Code Connect mapping
```

This is a template, not a guarantee. Doc names don't always match folder names (e.g. `top-app-bar.md` → `top-appbar/`), components can be split across several files (`avatar-size.ts`, sub-element folders such as `avatar/status-indicator/`), stories may sit directly in `src/stories/components/` instead of a group folder or under `src/stories/Assets/` (e.g. Icon), and many components have no `.figma.ts` (skip that step in that case). Run `find src -ipath '*<name>*'` from `packages/zeta-web` to find every related file.

Read the existing `.ts` and `.styles.js` first — match its current patterns (mixins used, how properties/parts/CSS custom properties are named) rather than introducing a new approach.

### Mapping doc tokens to CSS custom properties

Instruction-doc tokens are dotted paths; the CSS variable is the same path with dots → hyphens: `interactive.destructive.background.default` → `--interactive-destructive-background-default`, `control.lg` → `--control-lg`. Spaces in token names (e.g. `indicator.medium.font size`) become hyphens too. Always confirm the variable exists before using it (path from repo root): `grep -rho -- '--the-name' packages/foundations/tokens/dist/css | head -1`. Batch check: `for v in space-xs radius-sm border-focus; do grep -rqo -- "--$v:" packages/foundations/tokens/dist/css && echo "ok $v" || echo "MISSING $v"; done`. If it doesn't exist, look for the nearest existing name in that folder and mention the mismatch in your report rather than inventing a variable.

### Reconciling doc vs code

- **Scope = what the doc covers.** A doc may cover only one sub-component of a multi-component folder (e.g. `badges.md` only covers the notification type of `zeta-indicator`), or several components at once (e.g. `button.md` covers Button *and* Icon Button — update both). Change exactly that; list the rest as out of scope.
- **Component-local vs shared mixin.** Much styling (e.g. flavors) lives in `src/mixins/*.styles.js`, not the component's own (sometimes empty) styles file. Prefer overriding in the component's styles file so other components using the mixin don't change. Only edit a mixin for purely additive selectors (e.g. adding a new flavor value to an existing rule group), and list it in your report. If a mixin's token disagrees with the doc (e.g. `Contourable` uses `--radius-element-sm` but the doc says `radius.sm`), override it in the component's styles rather than changing the mixin, and report it.
- **Files inside the component folder can be shared too** (e.g. `dropdown/droppable.ts` is also used by `action-menu`). Before editing any file, `grep -rl "<file-basename>" src/components` and list every other component affected in your report.
- **Layer structure ≠ DOM:** don't restructure markup to mirror Figma layers. Apply the token values to the closest existing elements and list structural differences in your report. Spacing (`itemSpacing`/padding) that belongs to a Figma-only wrapper with no DOM counterpart is skipped and reported.
- **Token family differs** (code uses `--surface-gradient-*`, doc says `foreground.gradient.*`): follow the doc. Batch-check every variable you add, including each typography `-font-size` / `-line-height` / `-letter-spacing`. Underscore-prefixed doc sections (`_User Profile`, `_Brand Logo`) are internal Figma sub-components — look for them inside the parent's template, not as separate folders.
- **Rounded/sharp rows:** check the mixin first — `Contourable` (in `src/mixins/contour.ts`; mixin file names don't always match the export, so `grep -rn "export const <Mixin>" src/mixins`) already applies `--radius-element-sm` / `--radius-none` from the `rounded` prop. Only override if the doc names a different token. `rounded` reflects as a boolean attribute, so select rounded with `:host([rounded])` and sharp with `:host(:not([rounded]))`.
- **Widely embedded components** (`icon`, `button`, `icon-button`, typography, mixins): a change to a default visual (colour fallback, transition, size) ripples into every embedder. Count embedders with `grep -rl "<zeta-name" src/components | wc -l`, run the full suite (`pnpm nx run zeta-web:test --excludeTaskDependencies`), and put a "needs visual check" line at the top of your report naming the change.
- **Multi-section docs:** map each top-level section to its element before editing (e.g. dropdown's Template / Menu / Menu Item → `droppable` / `dropdown-menu-button` / `dropdown-menu-item`).
- **Doc terms may not match prop names.** Map by behaviour, not by name (e.g. card doc's `Flavor=gradient` is `zeta-card-container`'s existing `ai` boolean; "Collapsible Card" is `zeta-card-container`). Don't add a duplicate prop for something that already exists; state the mapping in your report.
- **Never guess values the doc doesn't give.** When migrating a legacy token the doc doesn't cover, swap it for its exact equivalent from `src/css/tokens-compat.css` (`grep -n -- "--spacing-large:" src/css/tokens-compat.css` → `--space-lg`) so the pixel value doesn't change. If it has no new equivalent there (e.g. `--spacing-6xl`), leave it and report it.
- **Sub-components implemented elsewhere:** a doc section may be implemented by a differently named element the parent imports (e.g. navigation-bar's "Navigation Item" is `zeta-grid-menu-item`, also used by `bottom-sheet`). Check the parent `.ts` imports. Apply that section only if the element is used solely by this component; otherwise report it as a follow-up, listing the doc values that weren't applied.
- **No token for a raw value** (e.g. a 28px icon with no matching token): keep the existing value and report it; don't hardcode the raw number.
- **Backward compatibility is about the API** (props, slots, parts, events, CSS custom properties, defaults), not pixels. Visual changes from the doc — colors, padding, radius, sizes — are the point of the update, so apply them. Only skip a value when the doc is ambiguous (e.g. `—`, or a raw value that contradicts the token), and report it.
- **Typography:** most type styles have a shorthand token (e.g. `font: var(--indicator-small)`, `var(--label-medium)`). Use it, then add the doc's individual `--<style>-font-size` / `-line-height` / `-letter-spacing` properties after it. Any later rule that sets `font:` again (e.g. a `[centered]` variant) resets those, so repeat all three there.
- **Doc describes API/sub-components the code doesn't have** (new slots, props like `expanded`, whole sub-components): don't build them — that's new-component work. Style only the existing elements, and put the missing pieces at the top of your report as "needs a decision".
- **Don't add legacy fallbacks** like `var(--space-xs, var(--spacing-minimum))` — the new token always exists; just use `var(--space-xs)`.
- **Enum naming differs only** (e.g. doc `xxxsmall` vs code `xxxs`): add the doc's names as aliases to the type union and CSS selectors; keep the existing names.
- **Defaults differ** (e.g. doc says a boolean defaults to true): keep the code's default (changing it breaks backward compat) and list the difference in your final report.
- **Hardcoded hex in SVG assets** (e.g. icon/glyph sets traced from Figma) is existing, deliberate code — don't rewrite it unless the design for that asset changed.

## 2. Make the change

- **IMPORTANT**: All changes must be backward compatible - never remove or rename an existing prop, slot, part, event, or CSS custom property, and never narrow an existing type union or change a default value. Add new props/variants alongside the old ones and deprecate in the doc comment (`@deprecated` + guidance) instead of deleting.
- New prop/variant: add an `@property`, give it its own doc comment describing valid values, and extend the type union — don't add a second way of doing something an existing mixin (`Flavored`, `Contourable`, `Size`, etc., in `src/mixins/`) already handles.
- Style/token change: use tokens from `@zebra-design-system/tokens` (`packages/foundations/tokens`) — `--surface-*` / `--foreground-*` / `--border-*` / `--interactive-*` for color, `--space-*` / `--radius-*` for sizing/shape, `--body-*` / `--title-*` for typography — never hardcode a hex/px value. Don't add new usages of the old pre-migration names (`--main-*`, `--spacing-*`, `--state-*`, etc., aliased in `packages/zeta-web/src/css/tokens-compat.css`) — that file is a legacy shim kept for components not yet migrated, not the source of truth for new work. If a new CSS custom property is added for customization, document it with `@cssproperty` and give it a token fallback: `var(--public-name, var(--token-fallback))`.
- Bug fix/behavior change: keep it scoped to the affected component/mixin; don't refactor unrelated code in the same file.
- Doc comments: update the class doc comment's `@slot`/`@cssproperty`/`@part`/`@event` tags (and any individual `@property` doc comment) whenever the change adds to or changes what they describe — stale docs are worse than none. Only touch the `@figma` tag if the Figma link itself changed.
- If the change touches a shared mixin in `src/mixins/`, other components composing that mixin are affected too — check whether their tests/stories still need updating, not just this component's. Also grep for other places in the repo that already use this component (other components' templates, stories) to make sure the change doesn't visually or behaviorally break them.

## 3. Keep everything else in sync

- **Storybook**: update `argTypes`/`args` in `foo-bar.stories.ts` for any new or deprecated prop. Update the matching `Docs.mdx` `<ArgTypes>`/`<Description>` section if present.
- **Figma Code Connect** (`foo-bar.figma.ts`): update the `props` mapping if a variant/enum changed, and the `example` template if the rendered markup changed. If the doc's `Source:` Figma file key differs from the one in the existing Code Connect URL, or you can't confirm the exact Figma enum value, don't guess — leave the mapping and report it.
- **Tests** (`foo-bar.test.ts`): root `describe` stays `"zeta-foo-bar"`; nested `describe`s must be one of exactly `Accessibility`, `Content`, `Dimensions`, `Styling`, `Interaction`, `Golden`, `Performance` (enforced by `scripts/enforce-testing-structure.js`) — don't invent a new category, and add tests to the existing nested `describe` for that category rather than creating a duplicate. Pick the category by what changed: new/changed markup or slotted content → `Content`; new CSS custom property, token, or visual variant → `Styling`; new size/layout behavior → `Dimensions`; new interactive/keyboard/hover/press state → `Interaction`. If the change affects rendered contrast (new flavor/background pairing), add/update a `contrastTest` case in `Accessibility`.
  - Bug fix: add a regression test that fails without the fix, alongside updating whatever test previously asserted the buggy behavior.
  - Deprecating a prop: keep its existing tests passing and add a test for the new replacement prop/variant.
  - Run the full existing test file (not just new tests) to catch regressions the change may have introduced elsewhere in the component.
  - Tests asserting computed styles from current tokens must `import "../../index.css";` (adjust depth) — it pulls in the real token package plus the compat shim. The older `src/generated/tokens/*.css` imports seen in some tests are the legacy set and lack new names like `--surface-card`, `--stroke-thin`, `--radius-sm`, so values silently resolve to 0/empty.
  - If the component has no test file, create `src/test/<name>/<name>.test.ts` with only the categories you need:
    ```ts
    import { fixture, html, expect } from "@open-wc/testing";
    import type { ZetaFoo } from "../../components/foo/foo.js";
    import "../../components/foo/foo.js";
    import "../../index.css";

    describe("zeta-foo", () => {
      describe("Styling", () => {
        it("uses the surface token", async () => {
          const el = await fixture<ZetaFoo>(html`<zeta-foo></zeta-foo>`);
          const style = getComputedStyle(el.shadowRoot!.querySelector(".foo")!);
          expect(style.borderRadius).to.equal("4px");
        });
      });
    });
    ```
  - Check for `describe.skip` / `it.skip` around the area you changed — a skipped block won't catch anything. Many components have `Styling`/`Dimensions`/`Accessibility` skipped. If the right category is skipped, put the new test in the nearest non-skipped allowed category (usually `Content`) with a one-line comment saying why, and note it in your report. Don't un-skip existing blocks.
- Don't touch `src/index.ts` by hand — it's auto-generated (`pnpm nx run zeta-web:build`).

## 4. Verify before calling it done

Run from `packages/zeta-web`:

```
npx prettier --write <file1> <file2> ...    # literal paths — zsh won't word-split a $VAR of paths
pnpm nx run zeta-web:analyze                 # regenerate custom-elements.json if TSDoc tags/props changed. It may rewrite src/index.ts; if `git diff src/index.ts` is whitespace-only, `git checkout src/index.ts`
pnpm nx run zeta-web:lint                    # eslint, incl. testing-structure and doc-tag rules
pnpm run lint:lit-analyzer
pnpm run test:file "src/test/<name>/*.test.ts"   # just this component's tests — fast
```

Before finishing, confirm the component folder uses no legacy tokens — names defined in `src/generated/tokens/{semantics,primitives}.css` but not in `packages/foundations/tokens/dist/css`. Swap any hit (including ones you didn't otherwise touch, and `var(--old, fallback)` forms) for its `tokens-compat.css` target, which keeps pixels identical; a target may be a `calc(...)` expression, paste it as-is. A name defined in neither set (e.g. `--radius-xxl`) is a broken reference — fix it and report it. Don't treat names defined in `src/css/styles.css` as valid just because they resolve: the `--border-size-*` tokens are gone (use `--stroke-thin` 1px / `--stroke-thick` 2px / `--stroke-heavy` 4px), and the half-spacing `--spacing-0-5`…`--spacing-20` values there are legacy too. Component-local properties that happen to share a legacy name (e.g. avatar's own `--avatar-purple`) are fine. Tests should import `index.css`, never `src/generated/tokens/*`.

Run each step as its own Bash call, prefixed with an absolute `cd <repo-root>/packages/zeta-web &&` (the cwd may or may not persist between calls, so never rely on a relative `cd`). Don't chain them — a chained call that exceeds the tool timeout gets backgrounded and any edits queued after it silently never happen. To lint only your files: `npx eslint --config src/eslint.config.* <paths>`.

Known environment quirks — don't burn time on these:

- No `timeout` command on macOS, and `sleep` is blocked — if a command hangs, kill it and rerun it alone rather than waiting.
- The shell is zsh on macOS: quote paths (some story folders contain spaces, e.g. `Navigation Bar/`), quote globs (`--include='*.ts'`), and use the Edit tool rather than `sed -i` (BSD sed needs `-i ''` and doesn't take `\n` in replacements).
- **Don't use `pnpm nx run zeta-web:test` or `:check`.** They depend on `@zebra-fed/zeta-icons:build`, which fails because that package declares `packageManager: yarn`. zeta-web consumes the published icons package from `node_modules`, so that build isn't needed. Use `pnpm run test:file` (above) or `pnpm nx run zeta-web:test --excludeTaskDependencies` for the full suite.
- **`lint:lit-analyzer` has a known error** in `src/stories/components/avatar-rail.stories.ts` (`no-nullable-attribute-binding`). Ignore it unless you touched that file, and only fix lit-analyzer errors in files you changed. File paths are printed on their own line above each error — `pnpm run lint:lit-analyzer 2>&1 | grep '^\./src'` lists which files have errors.
- Nx's "AI agent configuration is outdated" notice and the icons package `"resolutions"` warning are harmless.
- If `test:file` reports "Failed to fetch dynamically imported module" for `@zebra-fed/zeta-icons`, deps aren't installed — stop and report it; don't try to build the icons package with yarn.
- If another `vite`/wtr process holds port 5173, the runner picks another port automatically; that warning is harmless.
