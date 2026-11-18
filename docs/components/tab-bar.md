# Tab Bar

> A row of tabs for switching between views at the same level. Flavour decides whether the row fills its container or hugs its tabs. The tabs arrive through a slot, so the bar sets the arrangement and the product sets how many.

**Implementations:** `@zebra-design-system/react-baseui` · `@zebra-design-system/web-components` · `@zebra-fed/zeta-web` (`<zeta-tab-bar>`)

## API

| Prop | Type | Default | Values | Notes |
|---|---|---|---|---|
| `flavour` | enum | `full width` | `full width` `condensed` |  |
| `tabs` | slot | `null` |  |  |

## When and how to use

### Do

- Keep one tab selected at all times. A bar with none says nothing about where a person is.
- Use condensed where the bar shares a row. full width divides whatever container it is given, however wide.

### Don't

- Don't use tabs for actions. Tabs switch between views, and one that does something is a button in the wrong clothes.
- Don't disable a tab that has content behind it. A view a person cannot reach needs explaining, not hiding.

## States

| State | Trigger | What changes |
|---|---|---|
| default | Resting |  |
| hover | Pointer over the tab |  |
| selected | Tab chosen |  |
| disabled | — |  |

## Behaviour

- **Motion** — No transition is defined. Selection is a swap of the underline and label colours.
- **Selection model** — Exactly one tab is selected. Nothing in the component enforces that, so the surrounding structure has to.
- **Flavour and width** — full width divides the row, condensed hugs. Switching changes how tabs size, never how many there are.

## Content

| Part | Kind | Guidance |
|---|---|---|
| Tab Slot | slot, product filled | Takes the tabs. Four is what it is drawn with, not a limit it enforces. |
| Tab item | nested, four states | Each tab carries its own state, icon toggle and badge toggle. The bar exposes none of them, so every tab is set on itself. |
| Tab label | not parameterised | Not exposed as an input, so the words come from the implementation. |
| Tab badge | nested, off by default | A notification dot on the tab, hidden until Show Badge turns it on. |

## Layout & theming

| Property | Sizing | Guidance |
|---|---|---|
| Size | Per Flavour | 48 tall. 708 and fixed at full width, hugging to 472 at condensed with four tabs. |
| Surface | Fixed | surface/section across the row, with no padding, gap or radius of its own. |
| Tab slot | Per Flavour | Tabs fill the row at full width, 177 each with four. At condensed they hug, 118 each. |
| Tab item | Fixed | 48 tall, space/md top and bottom, space/gutter each side, space/sm between icon and label. |
| Selection underline | Theming | A 2px bottom border on every tab, border/transparent until selected and interactive/primary/border/default after. The space is always held, so selecting shifts nothing. |
| Tab label | Theming | label/medium. foreground/secondary at rest, interactive/neutral/foreground/default selected, and the disabled token when off. |

## Accessibility

- Tab labels are not exposed as inputs, so whatever names each tab comes from the implementation and has to be real words.
- Selection is carried by an underline colour and a label colour, both colour alone. The selected tab has to be marked in the structure as well.
- Disabled changes the label colour and nothing else. The surface holds, so check the label still carries enough contrast to read.
- Arrow keys should move between tabs with the selected one as the tab stop. Nothing in the component provides that.
- The badge is a dot with no text. Where it stands for a count or an alert, that has to be available to a reader some other way.

---
*Generated from `specs/tab-bar` — do not edit by hand. Theming: put `mode-dark`, `ext-companion` or `bp-*` classes on any ancestor (Zeta Web uses `data-theme`/`data-brand` attributes instead).*
