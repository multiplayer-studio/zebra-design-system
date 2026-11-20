# Top App Bar

> The header at the top of a mobile screen, carrying the screen’s name between a leading control and whatever actions the screen needs. Type switches it between six arrangements: a standard title row, a centred title, two selection toolbars, a full width search field, and a taller layout that drops the title onto its own line. Each arrangement brings its own leading control and its own content, so changing Type replaces what the bar holds rather than rearranging it.

**Implementations:** `@zebra-design-system/react-baseui` · `@zebra-design-system/web-components` · `@zebra-design-system/zeta-web` (`<zeta-top-appbar>`)

## API

| Prop | Type | Default | Values | Notes |
|---|---|---|---|---|
| `type` | enum | `default` | `default` `centered` `contextual` `contextual alt` `search` `extended` |  |
| `shape` | enum | `sharp` | `sharp` `rounded` |  |
| `pageTitle` | string | `Title` |  |  |
| `contextualControlSlot` | slot |  |  |  |
| `trailingSlot` | slot |  |  |  |

## When and how to use

### Do

- Pick Type for what the screen is doing. Each value is a different arrangement with its own content, not a styling choice applied to one layout.
- Keep Page Title to the screen's name. It is the bar's only text input, and it reads as the screen's identity rather than as a label.

### Don't

- Don't set Page Title on contextual, contextual alt or search. Those arrangements draw no title, so the text has nowhere to appear.
- Don't expect Shape to reshape the controls. It sets the bar's own corner, and the icon buttons inside stay rounded either way.

## States

| State | Trigger | What changes |
|---|---|---|
| Static | — |  |
| Type | The Type value |  |
| Shape | The Shape value |  |
| Leading control | The Type value |  |
| Title treatment | The Type value |  |

## Behaviour

- **Motion** — No transition is defined. Changing Type replaces the bar’s contents outright, and nothing animates between one arrangement and the next.
- **Type is a content switch** — Type does not rearrange one set of parts. Each value brings its own leading control, its own middle content and its own slot, so moving between values is a replacement rather than a reflow.
- **Shape does not carry** — Shape sets the bar’s corner on its own. The nested controls are rounded in both values, so a sharp bar still contains rounded controls.
- **Height** — Five arrangements stand at one height. extended is taller because it puts the title on a second row beneath the controls.
- **Slot availability** — The two slots are never both present. Each Type offers at most one of them, and centered and search offer neither.

## Content

| Part | Kind | Guidance |
|---|---|---|
| Screen title | Page Title, text | Consumer owned on default, centered and extended. The other three arrangements draw no title, so the property has nowhere to land. |
| Trailing actions | Trailing Slot, consumer owned | Present on default and extended. The content in it by default is three icon buttons set to small and subtle. |
| Contextual actions | Contextual Control Slot, consumer owned | Present on contextual and contextual alt. The content in it by default is four icon buttons set to small and subtle. |
| Centered trailing | Parent owned | centered holds a single icon button rather than a slot, so its trailing action is fixed rather than passed in. |
| Leading control | Icon Button, parent owned | Set to small and subtle on every arrangement. Its glyph is decided by Type and is not exposed as an input. |
| Avatar | Parent owned | default carries a small photo avatar beside the title. It is not exposed as an input, and no other arrangement has one. |
| Selection count | Parent owned | contextual draws a fixed count as plain text. contextual alt puts the same count inside a button, where it is that button’s own label. |
| Search field | Search, parent owned | Set to small and ghost, and carried already in its typing state with text and a cursor in place. |

## Layout & theming

| Property | Sizing | Guidance |
|---|---|---|
| Size | Fixed width, hug height | 390 wide on every variant. 60 tall on five arrangements and 100 on extended, which carries a second row. |
| Direction | Column | A content row, with extended adding a title row beneath it. space/sm between rows, and space/lg on extended. |
| Padding | Tokenised | space/md above and below, space/sm on both sides. |
| Content row | Fill | Spreads its leading group and its trailing region to opposite ends. search instead lays its two parts out from the start, space/md apart. |
| Leading group | Fill | space/md between the leading control and whatever follows it. |
| Leading control | Set to small | An icon button set to small and subtle on every arrangement. |
| Trailing region | Hug | Hugs its content on default, extended, contextual and contextual alt. centered instead holds one control that fills the row height. |
| Search field | Set to small | Fills the width left beside the back control, set to small and ghost. |
| Surface | Tokenised | surface/section across every arrangement. |
| Radius | Per Shape | radius/element-sm on rounded. sharp carries a plain zero corner with no token bound to it. |
| Title | Per Type | label/large on default and extended, label/medium on centered. The title colour is set directly rather than bound to a token. |
| Selection count | Per Type | label/medium on contextual, also set directly rather than bound. On contextual alt it comes from the button and takes interactive/neutral/foreground/default. |

## Accessibility

- The bar is a landmark rather than a control, so it takes its role and its name from the screen around it.
- Every control in it carries a glyph and no visible label, so the leading control and each trailing action need an accessible name supplied where they are placed, and that name has to follow Type, since the same leading position is a menu, a dismiss and a back control depending on the arrangement.
- The title is the screen’s name and should match whatever the screen is announced as, so a person arriving by screen reader hears the same thing a sighted person reads.
- On the selection arrangements the count is the only report of how many items are held, so it needs to be announced when it changes rather than only drawn.

---
*Generated from `specs/top-app-bar` — do not edit by hand. Theming: put `mode-dark`, `ext-companion` or `bp-*` classes on any ancestor (Zeta Web uses `data-theme`/`data-brand` attributes instead).*
