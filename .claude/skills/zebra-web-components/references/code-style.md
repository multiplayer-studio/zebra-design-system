# Code style — packages/web-components

Conventions as they exist in `button.ts`, `button.styles.ts` and `icon.ts`.
Match them; where you need to depart, say why in a comment.

## The two files

Every component is a folder holding exactly two files:

```
src/components/button/
├── button.ts          the element: properties, template, docs
└── button.styles.ts   a default-exported `css` tagged template
```

Styles live apart from the element because they are the part that maps
one-to-one onto the spec's variant table, and a 265-line `static styles` inside
a class is a file you scroll past rather than read. The element imports it:

```ts
import styles from "./button.styles.js";

@customElement("zds-button")
export class ZdsButton extends LitElement {
  static styles = styles;
}
```

Note the `.js` extension on a TypeScript import. The package is
`"type": "module"` and compiles with `tsc` to real ESM, so specifiers must be
what the browser will fetch.

## The element file

```ts
import { LitElement, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./button.styles.js";
import type { IconName } from "@zebra-design-system/icons/names";

export type ButtonFlavour = "primary" | "positive" | /* … */ "text-gradient";
export type ButtonSize = "small" | "medium" | "large";

/**
 * One-line statement of what it does, in the spec's own words.
 *
 * Then the things a consumer cannot infer: which flavour to reach for, what
 * to use instead when this is the wrong component, how theming applies.
 *
 * @slot - The label. A verb phrase naming the action.
 * @part button - The button element.
 *
 * @spec specs/button/button.spec.json
 */
@customElement("zds-button")
export class ZdsButton extends LitElement {
  static styles = styles;

  /** How much weight the action carries. */
  @property({ type: String, reflect: true }) flavour: ButtonFlavour = "primary";

  /** Icon before the label. Reinforces the action at a glance. */
  @property({ type: String, attribute: "leading-icon" }) leadingIcon: IconName | null = null;

  protected render() { /* … */ }
}

declare global {
  interface HTMLElementTagNameMap {
    "zds-button": ZdsButton;
  }
}
```

Rules that matter:

- **Tag names are `zds-*`.** The prefix exists so this package can load
  alongside the older `zeta-*` elements without clashing.
- **A variant axis reflects; content does not.** `reflect: true` puts the value
  back on the host attribute, which is what lets the styles select
  `:host([size="medium"])`. A content property like `leadingIcon` has no styling
  to drive, so reflecting it only adds DOM noise.
- **Multi-word properties declare their attribute.** `leadingIcon` would
  otherwise bind to `leadingicon`; `attribute: "leading-icon"` keeps the HTML
  readable.
- **Export the union types.** Consumers type against `ButtonFlavour`, not
  against a bare string.
- **Augment `HTMLElementTagNameMap`.** Without it `document.querySelector`
  returns `Element` and every call site casts.
- **Doc every public property with a `/** … *\/` comment.** `cem analyze` reads
  them into `custom-elements.json`, which is what IDEs and Storybook show.
- **`nothing`, not `undefined`,** for a conditional attribute or child — it is
  the sentinel Lit understands as "omit this".

## The styles file

```ts
import { css } from "lit";

/**
 * Every value here is a semantic token from the generated CSS layer. …
 *
 * Spec: specs/button/button.spec.json
 */
export default css`
  :host { display: inline-flex; vertical-align: middle; }
  :host([hidden]) { display: none; }

  button {
    /* --- geometry: size axis ------------------------------------------- */
    height: var(--control-sm);
    padding: var(--space-xs) var(--space-md);
    border-radius: var(--radius-none);

    /* --- colour: flavour x state axis ---------------------------------- */
    background: var(--zds-button-bg);
    border-color: var(--zds-button-border);
    color: var(--zds-button-fg);
  }

  /* ---- flavour: resting ---------------------------------------------- */
  :host([flavour="primary"]) button {
    --zds-button-bg: var(--interactive-primary-background-default);
    --zds-button-fg: var(--interactive-primary-foreground-default);
  }
`;
```

- **Section the file by the spec's axes**, in the spec's order, with the same
  banner comments. Someone holding the spec open should be able to scan both.
- **Route colour through one local custom property per role.** `--zds-button-bg`
  is set once per flavour and consumed once on the element. Without it, every
  flavour × state combination has to restate `background`, `border-color` and
  `color` together, and the file grows by the product rather than the sum.
- **`:host([hidden]) { display: none }`** is not optional. A host with
  `display: inline-flex` overrides the UA's `[hidden]` rule, so without this the
  attribute silently does nothing.
- **Comment anything that is not obviously derived from the spec.** The ghost
  scrim opacities in Button are written with `color-mix` and are the one part of
  the component with no token behind it; the comment says so and points at the
  spec issue.

## Tokens

`src/tokens/*.css` is **generated**. Editing it is undone by the next
`pnpm run tokens`, which every build and every Storybook start runs.

- **Use unprefixed names only.** A collection nothing else references is the
  public API and is emitted unprefixed (`--surface-page`, `--control-sm`,
  `--interactive-primary-background-default`). A collection that other layers
  reference is internal and is emitted prefixed (`--palette-*`,
  `--primitives-*`). Reaching into a prefixed token couples the component to a
  layer the theme system moves underneath it.
- **Never hard-code a colour, radius, spacing or type value.** If no token
  exists, that is a finding for the spec's `issues`, not a licence to inline a
  hex.
- **Dimensions come from tokens too** — `var(--control-sm)`, not `36px`.

## Stories

`stories/<name>.stories.ts`, titled `Components/<Name>`, `tags: ["autodocs"]`.
One `Playground` with full controls, then one export per spec axis
(`Flavours`, `Sizes`, `Shapes`, …) rendering that axis as a row. The story set
should look like the spec's variant table, because that is what a reviewer will
compare it against.

Icon-valued controls take their options from the font, never a hand-written
list:

```ts
import { iconNames } from "@zebra-design-system/icons/names";
leadingIcon: { control: "select", options: [null, ...iconNames] },
```

## TypeScript

`strict`, ESM, `tsc --noEmit` for the typecheck target and a real `tsc` build.
No `any` in a public signature. Use `import type` for type-only imports — the
build emits what it sees, and a value import of a type pulls a module into the
bundle for nothing.
