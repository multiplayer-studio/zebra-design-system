# Code style — packages/zeta-web

Taken from Zeta Web's own `CONTRIBUTING.md`, `documentation/COMPONENT_README.md`,
`documentation/TESTING_README.md`, `scripts/assets/*.template` and the existing
components. Follow it even where `packages/web-components` does it differently.

## Files

```
src/components/system-banner/
├── system-banner.ts          the element: TSDoc, properties, render
└── system-banner.styles.js   lit `css` — JavaScript, not TypeScript, not .css
src/stories/components/System Banner/
├── system-banner.stories.ts  one stories file per element
└── Docs.mdx                  the component's docs page
src/test/system-banner/system-banner.test.ts
```

The story folder is named as Storybook shows the component, with spaces and
capitals (`Tab Bar/`, `Navigation Rail/`).

Sub-elements that only exist inside a parent live in its folder
(`src/components/button/icon-button/`) and are not exported from `src/index.ts`.

## The element

```ts
import { html, LitElement, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./x.styles.js";
import { ContourableThree } from "../../mixins/mixins.js";
import "../icon/icon.js";

/** Summary sentence(s), from the spec's summary.
 *
 * @slot - Default slot.
 * @slot actions - Named slot.
 * @cssproperty --x-gap - Custom property.
 * @part row - Exposed part.
 * @event close - Fired when …
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/…?node-id=…
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-x--docs
 */
@customElement("zeta-x")
export class ZetaX extends ContourableThree(LitElement) {
  /** What it is for, in one line. */
  @property({ type: String, reflect: true }) status: "default" | "warning" = "default";

  static styles = [super.styles ?? [], styles];

  protected render() {
    return html`<div class="x">…</div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-x": ZetaX;
  }
}
```

- Tag `zeta-<kebab>`, class `Zeta<Pascal>`.
- `static styles = [super.styles ?? [], styles]` so mixin styles come along.
- Every public property has a one-line TSDoc comment. Variant axes are
  `reflect: true` so styles can key off `:host([status="…"])`.
- `@figma` points at the component's page in the **Zebra Design System** file
  (`hvRmnZZOZrmTW0wf8hbrt5`), not the old ZDS Components file.
- Lines under 120 characters; `pnpm run prettier` formats.

## Spec API → Zeta vocabulary

| Spec | Zeta Web |
|---|---|
| `shape: sharp \| rounded \| full` | `ContourableThree(LitElement)` → `shape` (sets `--contour` and the icon family) |
| `shape: sharp \| rounded` only | `ContourableThree`, documenting that `full` is not designed; or the boolean `Contourable` → `rounded` when refining a component that already uses it |
| `size` | `Size` mixin → `size` |
| flavour / variant colour axis | `Flavored` mixin where the values fit, otherwise a reflected `@property` |
| interaction states (hover, pressed, focus) | CSS states, never properties; `Interactive` for the shared state layer |
| `disabled` | reflected boolean `disabled` (or `FormField` for inputs) |
| text content | a property **and** the default slot (Zeta's pattern: the property wins when both are set) |
| slot of controls | a named `<slot>`; set inherited props (`shape`) on slotted `zeta-*` elements on `slotchange` |
| content inputs / sample content | properties or slots, never enums of sample names |

## Styles (`x.styles.js`)

```js
import { css } from "lit";
export default css`
  :host {
    display: block;
    --_gap: var(--x-gap, var(--space-sm));
  }
  :host([status="warning"]) .x {
    background: var(--feedback-warning-background-strong);
  }
  @media (hover: hover), (hover: none) and (pointer: fine) {
    .x:hover {
      background: var(--interactive-ghost-background-hover);
    }
  }
`;
```

- **Hover only inside** `@media (hover: hover), (hover: none) and (pointer: fine)`,
  and `-webkit-tap-highlight-color: transparent` on the host, so hover never
  sticks on touch.
- **A state fill paints the surface the spec names, edge to edge.** Read the
  spec's state row ("the background lifts" on a row means the whole row).
  Put hover and pressed on that surface and keep the buttons inside it
  transparent (`all: unset`). Never give each inner target its own fill
  inside a padded container. That produces inset, boxed hovers that split a
  row into pieces (Accordion, 2026-10-30).
- **A nested spec component keeps its own states.** Where the spec's anatomy
  names a subcomponent (an Icon Button, a Checkbox), render the real `zeta-*`
  element with the spec's flavour and size. Never rebuild it as a bare
  button. The parent's hover stays on while the child is hovered, with the
  child's own hover layered on top.
- **A filled surface contains its slotted content's margins.** Give it
  `display: flow-root`. Otherwise a slotted child's bottom margin escapes
  the box and leaves an unfilled gap under the hover (Accordion header
  actions). Test that the surface's height equals the item's.
- Public custom properties are documented with `@cssproperty` and read
  through a private `--_name` with a token fallback.
- Bind only tokens from `src/generated/zebra-tokens/` (see tokens.md).

## Stories

Match the folders already in `src/stories/components/` (`Tab Bar/`,
`Segmented Control/`, `Navigation Rail/`). Each component gets a folder holding
one stories file per element and a `Docs.mdx` that builds its docs page.

**One stories file per element.** The main element and each sub-element a
consumer places (`zeta-tab-item`, `zeta-stepper-item`) get their own file. All
of them share the component's `title`, so they appear as one entry.

```ts
// src/stories/components/X/x.stories.ts
import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { ZetaX } from "../../../components/x/x.js";
import "../../../components/x/x.js";

const meta: Meta<ZetaX> = {
  component: "zeta-x",
  title: "Components/X",
  args: { status: "default" },
  argTypes: { status: { options: ["default", "warning"], control: { type: "select" } } },
  parameters: {
    design: { url: "https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=…" },
    status: { type: "ready" }
  }
};
export default meta;

export const X: StoryObj<ZetaX> = {
  render: args => html`<zeta-x status=${args.status}></zeta-x>`
};
```

- **No `tags: ["autodocs"]`.** `Docs.mdx` is the docs page, and autodocs would
  add a second one.
- **Imports climb three levels** (`../../../components/…`), because the file
  sits one folder deeper.
- **The first story is the playground.** It is one instance, driven by fully
  filled `args` and `argTypes`, so the controls reach every variant.
- **Each main arrangement gets its own named story**, one instance each,
  usually just different `args` on a shared `render` in the meta
  (Stepper: `Compact`, `Vertical`, `Cards`; Segmented Control:
  `SegmentedControlWithIcons`). A sub-element's file can add a story that
  sets out one axis, such as `Statuses`.
- **Never put every variant in one canvas.** A canvas that stacks all of
  them with captions is hard to read, and its controls drive nothing in
  particular.
- A sub-element's file sets `parameters.design` but leaves out `status`.
  Status belongs to the component, on the main file.

**`Docs.mdx` builds the page**, in this order:

```mdx
import { Canvas, Meta, Description, ArgTypes, Title } from "@storybook/blocks";
import * as X from "./x.stories";
import * as XItem from "./x-item.stories";

<Meta of={X} title="X" />

<Title />
<Description of="zeta-x" />
<Canvas of={X.X} />
<ArgTypes of="zeta-x" />

## X with icons

<Canvas of={X.XWithIcons} />

# X Item

<Description of="zeta-x-item" />
<Canvas of={XItem.Item} />
<ArgTypes of="zeta-x-item" />
```

- `<Meta title>` is the component name with no `Components/` prefix.
- `<Description of="zeta-…">` reads the element's TSDoc through
  `custom-elements.json`. That makes the TSDoc summary the page's opening
  text, so write it for a reader rather than a developer, and run
  `pnpm run storybook` (it runs `cem analyze`) before checking the page.
- Give each named story an `##` heading with its `<Canvas>`.
- Give each sub-element a `#` section with its own description, canvas and
  argument table.

`spreadGenerator` from
`src/stories/utils.js` spreads args onto the element. Icons in `argTypes` use
`ZetaIconNameList`.

`spread(args)` from `@open-wc/lit-helpers` writes `false` as the attribute
`"false"`, which still switches a boolean attribute on. Bind booleans as
`?attr` keys (map them before spreading) and drop `undefined` values.

## Tests

`src/test/<dir>/<name>.test.ts`, from `scripts/assets/web.test.template`:
`@open-wc/testing` `fixture`, `import "../../index.css"`, and `describe`
groups in this order — **Accessibility, Content, Dimensions, Styling,
Interaction, Golden, Performance**. Accessibility (`shadowDom.to.be.accessible()`)
and Content are required; add a Styling check for each token the spec binds.

Every component with a hover state gets an Interaction test that hovers with
the real pointer (`sendMouse({ type: "move", position })` from
`@web/test-runner-commands`, `resetMouse()` in `afterEach`). It moves over
each target and asserts three things: the named surface takes the hover
token, the surface spans the full width, and every inner button stays
`rgba(0, 0, 0, 0)`. Over a nested component, assert that both
the child's inner button and the parent surface take their hover tokens. A computed-style check at rest cannot see a hover bug.
Build the cases with a helper and explicit `it`s: the lint rejects `it`
inside a loop and a second `describe` with the same name.
`pnpm run test:count` reports coverage per group.

## Scaffolding

`pnpm run create <name> [dir]` fills `scripts/assets/*.template` and appends the
import and export to `src/index.ts`. Two paths in `scripts/makeWebComponentTemplate.js`
are wrong for the current layout — fix the output rather than the script
unless asked:

- the styles file comes out as `<name>.css`; rename it to `<name>.styles.js`;
- the story is written next to the component and the test to `../test/…`;
  move the story into the component's folder in `src/stories/components/<Name>/`
  and add its `Docs.mdx`, then move the test to `src/test/<dir>/`.

## Don'ts

- Don't edit anything under `src/generated/` — tokens and locales are generated.
- Don't export sub-elements or helpers from `src/index.ts`.
- Don't copy `packages/web-components` code style (`zds-` prefix, `.styles.ts`,
  `@spec` tags) into Zeta Web; borrow behaviour, not form.
