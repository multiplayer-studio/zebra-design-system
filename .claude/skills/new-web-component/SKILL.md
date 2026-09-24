---
name: new-web-component
description: Use when the user wants to create a new zeta-web component and gives a Figma design link (or asks to build/implement a component "from Figma"). Guides pulling design context out of Figma and building a component that matches this repo's conventions — file layout, base classes/mixins, TSDoc tags, design-token styling, Storybook story + Docs.mdx, Figma Code Connect mapping, and the required test structure.
---

# Create a new zeta-web component

`zeta-web` is a Lit web component library (`@zebra-fed/zeta-web`). Every component must match existing conventions closely — reviewers check this against `CONTRIBUTING.md` and existing components. Read that file (`CONTRIBUTING.md` at repo root) if anything below is ambiguous.

Never hard code hex or px values. Always use a tokens. 

## 0. Pull the design context first

`docs/instructions/<component>.md` is the first port of truth — it mirrors the Figma design exactly (layer structure, resolved tokens per variant, token changes by property). Before writing any code:

1. Check `docs/instructions/<component>.md` first. If it exists, read it for layer structure, resolved tokens, and the token-changes-by-property table — this is the same information Figma would give you, already extracted.
2. If it doesn't exist (or is missing detail you need), fall back to Figma directly: load the `figma-design-to-code` skill and use `get_design_context` (and `get_screenshot` / `get_variable_defs` as needed) on the given node to get props, variants, states, and layout.
3. Note every variant/enum shown (e.g. size, flavor/type, shape, disabled/status) — these become `@property` values later and Figma Code Connect enum mappings.
4. Note every token used for color, spacing, radius — these must map to this repo's design tokens (see step 4), never hardcoded values.
5. The "Resolved tokens" table is captured for **one specific variant combination only** (stated in its own header, e.g. "default variant: Shape=sharp, State=enabled, Size=large, Flavour=default") — it is not the general case. Every other variant's actual values live only in the "Token changes by property" delta table below it; cross-reference both tables together rather than reading the resolved-tokens table as if it applied to every variant.
6. **Don't read a layer's instance label as a component name.** Layer structures commonly show entries like `Trailing-Icon (INSTANCE, icon: Microphone)` or `Search-Icon (INSTANCE, icon: Search)` — the `icon: X` part is a **prop value** on a single shared component (`<zeta-icon name="x">`), not a hint that a `zeta-icon-x` element exists. The same trap applies to other instanced atoms (e.g. a `Divider` instance is `<zeta-divider>`, not a hand-rolled styled `<div>`). See step 1's "reusable atoms" note before writing `render()`.

## 1. Decide before writing: does this need new code?

- **If you're rebuilding or modifying a component that already ships publicly**, `grep` it (and its tests) for `@deprecated` first — those properties exist for backward compatibility (see `dialog.ts`, `dropdown/droppable.ts`, `global-header.ts`, `empty-state.ts` for precedent) and should be preserved, not dropped, unless the user explicitly asks to remove them.
- **Check `src/mixins/`** for behavior that already exists — don't reimplement it:
  - `flavor.ts` — `Flavored()` mixin: primary/positive/negative/outline/outline-subtle/text/inverse/subtle/custom color variants. If a component's variant set doesn't match these fixed values, don't force it into `Flavored()` — instead add a new exported type alias in `mixins/flavor.ts` (e.g. `export type FooFlavor = "a" | "b";`) and use it as a plain `@property` type, bypassing the mixin entirely. See `SearchFlavor`, `DialogFlavor`, `StepperItemFlavor`, `ButtonFlavor` for precedent.
  - `contour.ts` — `ContourableElement` / `Contourable()`: rounded vs sharp shape (boolean `rounded` attribute).
  - `contourable-three.ts` — `ContourableThree()`: sharp/rounded/full shape (three-way, via a `shape` attribute). Use this instead of `contour.ts` when the design has 3 shape states, not 2 — see `search.ts`, `dialog.ts`, `base-button.ts`, `tile-button.ts`, `snackbar.ts` for precedent.
  - `size.ts` — `Size()`: small/medium/large. This only adds the `size` property/attribute — it applies no styles, so the component's own stylesheet must still implement the actual sizing (padding/height/font) per value.
  - `interactive.ts` / `interactive.styles.js`, `tertiary-interactive.styles.js` — hover/press/focus states.
  - `form-field.ts` — form-associated field behavior (validation, form reset/submit participation). Its type is declared via `AbstractConstructor`, so a concrete subclass **must** implement `type` and `handleChange` itself, even trivially (`override handleChange(event: Event) { return event; }`) — `tsc` fails on a missing override even though the mixin's runtime default is a no-op, and neither `eslint` nor the tests catch this, only `pnpm nx run zeta-web:typecheck` does.
  - `popup.ts`, `navigate.ts`, `breakpoints.styles.js` — overlay positioning, routing, responsive breakpoints.
  - Compose mixins the same way `button.ts` does: `class ZetaButton extends Flavored(BaseButton)`.
  - Note: `mixins/mixins.ts` only barrel-exports `flavor`, `interactive`, `popup`, `size`, `contour`, `navigate` — `contourable-three.ts` and `form-field.ts` are **not** in that barrel and must be imported directly from their file path (e.g. `import { ContourableThree } from "../../mixins/contourable-three.js";`).
- **Check `src/components/` for existing leaf/atom components before hand-rolling markup for something Figma shows as a sub-instance.** Mixins cover shared *behavior*; these are shared *elements* a `render()` method should compose, not reimplement:
  - `icon/icon.ts` — the single `<zeta-icon name="...">` element used for **every** icon everywhere in this repo. `name` is typed `ZetaIconName` from `@zebra-fed/zeta-icons` (a large fixed union — check it, don't guess a name). There is no per-icon custom element (no `zeta-icon-search`, `zeta-icon-cancel`, etc.) — import with `import "../icon/icon.js";` and pass the icon's lowercase/snake_case name as the `name` attribute.
  - `divider/divider.ts` — `<zeta-divider orientation="horizontal"|"vertical">`, used for any separator line instead of a styled `<div>`.
  - If unsure whether an atom like this already exists for something in the design, `grep` an existing component that renders something similar (e.g. `button.ts`, `global-header.ts` both render icons) before inventing markup.
- **Check if this is a variant of an existing component family** (e.g. a new chip type belongs under `src/components/chips/<new-chip>/`, extending `base-chips/base-chip.ts`) rather than a fully standalone component.
- Only write a new mixin/base class if the behavior is genuinely shared across multiple components — for a single component, put logic directly in the component class.

## 2. File layout

**All component files live in `packages/zeta-web/`.** All paths below are relative to that directory.

For a standalone component named e.g. `foo-bar`:

```
src/components/foo-bar/foo-bar.ts            # component class
src/components/foo-bar/foo-bar.styles.js      # css, colocated
src/stories/components/<Group>/foo-bar.stories.ts   # Storybook story (grouped by family, e.g. "Buttons")
src/stories/components/<Group>/Docs.mdx       # Storybook docs page (create if the group doesn't have one)
src/test/foo-bar/foo-bar.test.ts              # tests
src/figma/foo-bar.figma.ts                    # Code Connect mapping
```

For a sub-component of a family (e.g. a new button type), follow the existing family's nesting, e.g. `src/components/button/foo-bar/foo-bar.ts`, test dir `src/test/button/foo-bar.test.ts`, story alongside siblings in `src/stories/components/Buttons/foo-bar.stories.ts`.

Do **not** hand-edit `src/index.ts` — it is auto-generated by `node scripts/make-index.js` (run via `pnpm prebuild`) from `src/components/**` and `custom-elements.json`. Regenerate it (or just run `pnpm build`) once the component exists instead of adding an import/export by hand.

The `pnpm create` script (`scripts/makeWebComponentTemplate.js`) exists but is stale — it writes a `.css` file and a `test/` path that don't match current conventions (`.styles.js`, `src/test/...`). Prefer writing the files directly following the templates below and the nearest existing component as a reference (e.g. `src/components/button/button.ts` and `src/test/button/button.test.ts`).

## 3. Component file (`foo-bar.ts`)

```ts
import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./foo-bar.styles.js";

/**
 * One-line summary of what the component is/does.
 *
 * @slot - Describe default slot content.
 * @cssproperty --foo-bar-color - Describe any custom CSS property.
 * @part part-name - Describe any exposed shadow part.
 * @event zeta-foo-bar-change - Describe any custom event fired.
 * @figma <link to the Figma node used>
 * @storybook <link to hosted storybook, or omit and let a reviewer add it>
 */
@customElement("zeta-foo-bar")
export class ZetaFooBar extends /* Flavored/Contourable/Size(...)( */ LitElement /* ) */ {
  /** Document every property — purpose, and enumerate valid values with @remarks or a list. */
  @property({ type: String, reflect: true }) variant: "a" | "b" = "a";

  static get styles() {
    return [super.styles ?? [], styles];
  }

  protected render() {
    return html`<div part="root"><slot></slot></div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-foo-bar": ZetaFooBar;
  }
}
```

Rules the CEM analyzer and TSDoc lint enforce:
- **Every component must extend `LitElement`** — either directly or through a mixin composed on top of `LitElement` (see line 75 for the pattern). Never extend another component class directly.
- Real `@figma` and `@storybook` JSDoc tags on the class doc comment (custom CEM plugin, see `custom-elements-manifest.config.js`) — not optional decoration, they're extracted into `custom-elements.json` docs.
- Every public `@property` needs its own doc comment explaining valid values.
- `eslint-plugin-wc`, `eslint-plugin-lit`, `eslint-plugin-lit-a11y`, and `tsdoc` all run in `pnpm lint` — no unused vars (prefix intentionally-unused with `_`), no closed shadow roots, no constructor params/attributes.
- Keep lines ≤120 characters.

## 4. Styles file (`foo-bar.styles.js`)

```js
import { css } from "lit";
export default css`
  :host {
    --_foo-bar-color: var(--foo-bar-color, var(--interactive-primary-background-default));
  }
  [part="root"] {
    border-radius: var(--radius-element-sm);
  }
`;
```

- Use tokens from `@zebra-design-system/tokens` (`packages/foundations/tokens`) for every color, spacing, and radius value — `--surface-*` / `--foreground-*` / `--border-*` / `--interactive-*` for color, `--space-*` / `--radius-*` for sizing/shape, `--body-*` / `--title-*` for typography. Match whatever variables `get_variable_defs` showed in the Figma design. Don't reach for the old pre-migration names (`--main-*`, `--spacing-*`, `--state-*`, etc., aliased in `packages/zeta-web/src/css/tokens-compat.css`) — that file is a legacy shim for un-migrated components, not the source of truth for new components.
- Never hardcode a hex/px value. 
- Expose customization points as CSS custom properties with a token fallback (`var(--public-name, var(--token-fallback))`), matching the `@cssproperty` tags documented on the class.

## 5. Storybook story + docs

`foo-bar.stories.ts`:

```ts
import type { Meta, StoryObj } from "@storybook/web-components";
import type { ZetaFooBar } from "../../../components/foo-bar/foo-bar.js";
import "../../../components/foo-bar/foo-bar.js";

const meta: Meta<ZetaFooBar> = {
  component: "zeta-foo-bar",
  args: {},
  argTypes: {}
};
export default meta;

export const FooBar: StoryObj<ZetaFooBar> = {};
```

- Fill in every `args`/`argTypes` entry — this is what reviewers check for "fully documented" stories.
- **IMPORTANT: Do NOT add `tags: ["autodocs"]` to the meta if you are also creating a `Docs.mdx` file.** If you have both, Storybook will warn about duplicate documentation. Choose one approach:
  - **With `Docs.mdx`**: Create the `.mdx` file and omit the `tags: ["autodocs"]` from meta. The `.mdx` file provides the full documentation.
  - **Without `Docs.mdx`**: Add `tags: ["autodocs"]` to the meta to auto-generate docs from TSDoc comments and argTypes.
- If the family already has a `Docs.mdx` (e.g. `src/stories/components/Buttons/Docs.mdx`), add a `<Canvas of={.../>` + `<Description>` + `<ArgTypes>` section for the new component there. Otherwise create one following that same `@storybook/blocks` pattern (`Canvas`, `Meta`, `Description`, `ArgTypes`, `Title`).
- The story should visually match the Figma design (same variants/states covered).

## 6. Figma Code Connect (`src/figma/foo-bar.figma.ts`)

```ts
import figma, { html } from "@figma/code-connect/html";
import "../components/foo-bar/foo-bar";

figma.connect("<figma node url given in the prompt>", {
  props: {
    slot: figma.string("Label"),
    variant: figma.enum("Type", { A: "a", B: "b" }),
    disabled: figma.enum("Status", { Disabled: true })
  },
  example: props => html`<zeta-foo-bar variant=${props.variant} disabled=${props.disabled}>${props.slot}</zeta-foo-bar>`
});
```

Map every Figma variant property you noted in step 0 to the matching component property/enum value — see `src/figma/button.figma.ts` for a full multi-variant example.

## 7. Tests (`src/test/foo-bar/foo-bar.test.ts`)

An ESLint rule (`scripts/enforce-testing-structure.js`) enforces this shape exactly — violations fail `pnpm lint`:

- Root `describe` name **must** start with `"zeta-"` (e.g. `"zeta-foo-bar"`).
- Every nested `describe` name **must** be one of exactly: `Accessibility`, `Content`, `Dimensions`, `Styling`, `Interaction`, `Golden`, `Performance` (see `scripts/assets/web.test.categories.json`). No unique custom category names.
- No duplicate nested `describe` names at the same level.
- Every `it(...)` must live inside one of those category `describe` blocks — not directly under the root.
- Include an empty `// describe("Category", () => {});` comment for categories you didn't write tests for (matches existing files' style).

```ts
import { fixture, html, expect, unsafeStatic, elementUpdated } from "@open-wc/testing";
import type { ZetaFooBar } from "../../components/foo-bar/foo-bar.js";
import "../../components/foo-bar/foo-bar.js";
import "../../index.css";

describe("zeta-foo-bar", () => {
  let subject: ZetaFooBar;

  const createComponent = (template = `<zeta-foo-bar></zeta-foo-bar>`) => {
    // prettier-ignore
    return fixture<ZetaFooBar>(html`${unsafeStatic(template)}`);
  };

  beforeEach(async () => {
    subject = await createComponent();
  });

  describe("Accessibility", () => {
    it("meets accessibility requirements", async () => {
      await expect(subject).shadowDom.to.be.accessible();
    });
  });

  // describe("Content", () => {});
  // describe("Dimensions", () => {});
  // describe("Styling", () => {});
  // describe("Interaction", () => {});
  // describe("Golden", () => {});
  // describe("Performance", () => {});
});
```

- If the component renders text against a colored background, add a contrast check using `contrastTest` from `src/test/accessibility-utils/accessibility-test-runner.js` (see `Accessibility` block in `src/test/button/button.test.ts`) for every flavor/variant combination.
- Cover every variant/state shown in the Figma design with at least one test in the relevant category.

## 8. Verify before calling it done

Prefer running these through Nx rather than raw `pnpm` scripts (per this repo's root `CLAUDE.md`):

```
pnpm nx run zeta-web:analyze                                        # regenerate custom-elements.json (also part of prebuild)
node scripts/make-index.js                                          # regenerate src/index.ts (or just `pnpm nx run zeta-web:build`)
pnpm nx run zeta-web:lint                                            # eslint, incl. testing-structure and doc-tag rules
pnpm nx run-many --targets='lint:lit-analyzer' --projects=zeta-web   # see NOTE below
pnpm nx run zeta-web:typecheck                                       # tsc --noEmit
pnpm nx run zeta-web:test                                            # web-test-runner
```

- NOTE: `pnpm nx run zeta-web:lint:lit-analyzer` (colon inside the target name) does **not** error — it silently resolves to the plain `lint` target instead and gives false confidence that lit-analyzer passed. Always invoke it via `nx run-many --targets='lint:lit-analyzer' --projects=zeta-web` as shown above.
- Don't skip `typecheck`: it's the only one of these checks that catches a missing mixin override (e.g. a `FormField` subclass missing `handleChange`) — `lint` and `test` both pass with that bug present.
- An invented or misspelled custom-element tag inside an `html` template (e.g. a fabricated `<zeta-icon-search>` instead of the real `<zeta-icon name="search">`) compiles and lints clean — a tag name is just a string to `tsc` and `eslint`. Only `pnpm nx run zeta-web:test` (a real browser via web-test-runner) surfaces it, typically as the test run hanging or a browser console warning about an undefined element. **If `test` hangs after you added a new element usage, suspect an undefined custom element first** and go verify the real element/prop name in an existing component, rather than assuming an infra flake.
- If a verification step fails, fix the real component/import it's pointing at — don't substitute a hardcoded value (hex color, emoji/literal glyph, inline SVG) just to make the check stop failing. That trades a caught bug for an uncaught one and reintroduces the hardcoding this repo's styling rules exist to prevent.
- When regenerating `src/index.ts`, check the diff is minimal — a stray missing-trailing-newline is a known quirk of `make-index.js`, not a real change.

`pnpm check` (from `packages/zeta-web`) runs `analyze`, `lint`, `lint:lit-analyzer`, `test`, and `docs` together, but does **not** include `typecheck` — run that separately.
