# Table

A data table with rows of content arranged in columns, framed by an optional controls bar above and a pagination footer below. Reading top to bottom it is the controls bar, the table content, and the footer, each of the two outer bars removable on its own without affecting the other. This instance always lays out its columns in the plain left-to-right arrangement, not the frozen or horizontally scrolling arrangement Table Content also offers.

Source: [Table page](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=4364-1629) · extracted 2026-10-20, re-extracted the same day for the Shape axis

## API

| Prop | Type | Values | Default | Controls |
|---|---|---|---|---|
| `hasControl` | boolean | true, false | `true` | controls |
| `hasFooter` | boolean | true, false | `true` | footer |
| `shape` | enum | rounded, sharp | `rounded` | table corners, nested components' shape |

**hasControl** — true: "Shows the controls bar above the content, holding the search field and the controls slot. Turn it off when the table doesn't need its own search or extra actions above it." · false: "Removes the controls bar entirely, the content starts at the top of the table."

**hasFooter** — true: "Shows the footer below the content, holding the page summary text and the pagination control. Turn it off for a table short enough that pagination has nothing to do." · false: "Removes the footer entirely, the content ends at the bottom of the table."

**shape** — rounded: "Every component inside the table takes its rounded option: search, buttons, checkboxes, status labels and pagination, including the table's own corners." · sharp: "Every component inside the table takes its sharp option."

Values anywhere in this document are token names. The only literals are inside verbatim metadata quotes and inside issues; measurements are suffixed Px.

## Internal variations & content inputs

**Content arrangement** — via Table Content: `columnPosition` (default, frozen) × `horizontalScroll` (false, true). Table pins default × false and exposes neither.

**Controls bar and footer parts** — Table Controls has `search` and `controls`; Table Footer has `pageDetails` and `pagination`. Not reachable from Table: `hasControl` / `hasFooter` toggle each bar whole.

**Cell content** — each `_Data Cell` swaps its content (default `_Avatar and text`). Preferred, per the metadata: Avatar + Text, Button, Icon Button, Checkbox, Status Label, Search, Slot (see issues on the keys).

**Content inputs** — columns (5 sample `Table Column/Default`), rows per column (5 sample `_Data Cell`), controls-slot actions (3 sample outline-subtle Icon Buttons), the page summary ("Showing 1-3 of 21"), header labels, and avatar / title / subtitle per cell.

## Anatomy

Root: vertical stack, no gap, no padding; fixed width (979Px measured), hugs height.

1. **Controls bar** — Table Controls, visible when `hasControl`. "Holds a search field that can be toggled on/off. Controls Slot houses extra actions, and can be shown/hidden with the hasControl property."
2. **Content** — Table Content, `columnPosition=default`, `horizontalScroll=false`; fills width, hugs height. "Subcomponent that contains table data. Column position and horizontal scroll can be adjusted, and is set to default in this example. Default column positions do not allow for fixed columns or horizontal scrolling. The rows and columns themselves, always in the plain left-to-right arrangement for this instance. Columns can be formatted based on user preference (i.e width). Cell content can be swapped in individual data cells. Slot container allows users to freely add/remove any number of columns and adjust sizing based on their requirements."
3. **Footer** — Table Footer, visible when `hasFooter`. "Holds a locked summary text and a Pagination instance. Shown or hidden as a whole by hasFooter. Both page details and pagination can be toggled on/off for the footer itself."

## Variants

| shape | Table radius | Nested components |
|---|---|---|
| rounded (default) | `radius/element-md`, clips its content | Search, Icon Button, Button, Checkbox `Shape=rounded`; Status Label, Pagination `Rounded=true` |
| sharp | none (raw 0, no token) | the same components `Shape=sharp` / `Rounded=false` |

The bars and content keep square corners; the table's clip rounds them. Subcomponent variant tables follow.

## Subcomponents

### Table Controls
Props: `search` (true), `controls` (true), `controlsSlot` (slot). Horizontal, end-aligned, gap `space/sm`, padding `space/lg` inline / `space/md` block, fill `surface/section`; hugs height (60Px measured).
- **search** — Search, Shape=sharp, Size=small, Flavour=default, cancel and leading icon on (280Px min width measured).
- **controlsSlot** — horizontal, gap `space/sm`, clips. Sample: three outline-subtle Icon Buttons.

### Table Content
Props: `columnPosition` (default | frozen), `horizontalScroll` (false | true), `slotContainer`, `frozenSlotContainer`.

| columnPosition | horizontalScroll | Parts |
|---|---|---|
| default | false | 2 fixed columns + slotContainer (gap `space/none`, clips) |
| frozen | false | frozenSlotContainer (end stroke `border/default` @ `stroke/thin`) + scrollable columns |
| frozen | true | as above + `Shadow/medium-horizontal` on the frozen side + horizontal Scrollbar pinned to the bottom (padding `space/xxs`) |

default × true isn't modelled.

### Table Footer
Props: `pageDetails` (true), `pagination` (true). Horizontal, space-between, padding `space/lg` / `space/md`, fill `surface/section`; hugs height (60Px measured).
- **pageDetails** — `body/small`, `foreground/secondary`.
- **pagination** — Pagination, Outline=true, Rounded=false, controls on, more off; gap `space/sm`.

### Table Column/Default
Prop: `slotContainer`. Vertical, no gap; fixed width (200Px measured), hugs height. A `_Header Cell`, three fixed `_Data Cell` rows, then the slot (sample: two more rows).

### Table Column/true
Not on any page; used only by Table Content's frozen variants. Same as Column/Default plus an end stroke `border/default` (raw 1 weight).

### _Header Cell
Props: `state` (enabled | hover | focus | disabled), `sorted` (true | false). Top and bottom stroke `border/default` @ `stroke/thin`; cell padding `space/lg` / `space/md`.

| state | sorted | cell fill | other |
|---|---|---|---|
| enabled | true | `interactive/neutral/background/default` | — |
| enabled | false | — | (flips _Label `sort`, no visible effect) |
| hover | true | `interactive/neutral/background/hover` | filter glyph on |
| focus | true | `interactive/neutral/background/focused` | stroke `border/focus` @ `stroke/thick`; filter glyph on |
| disabled | true | `interactive/neutral/background/disabled` | label disabled; filter glyph on |

### _Data Cell
Props: `state` (enabled | hover | selected | disabled), `content` (slot, default `_Avatar and text`). Bottom stroke `border/subtle` @ `stroke/thin`; cell padding `space/lg` / `space/md`, fixed height (60Px measured).

| state | cell fill |
|---|---|
| enabled | `interactive/neutral/background/default` |
| hover | `interactive/neutral/background/hover` |
| selected | `interactive/neutral/background/selected` |
| disabled | none (content not dimmed — see issues) |

### _Label
Props: `state` (enabled | disabled), `sort` (unbound), `hasTrailing`. Text `label/medium` `foreground/primary` (disabled `foreground/disabled`) with `_Sort` after it (gap `space/xxs`); trailing glyph `filter`, rounded family, Icon Size=small, colour follows the text.

### _Sort
Props: `state` (default | hover | disabled), `direction` (default | ascending | descending). A drawn 16Px vector with two carets, each its own colour token: inactive `foreground/tertiary` (hover `foreground/secondary`, disabled `foreground/disabled`); active direction `foreground/cursor`.

### _Avatar and text
Props: `state` (enabled | disabled), `avatar`, `subtitle`. Horizontal, gap `space/sm`: Avatar xxxsmall (ring, status, close off), title `body/small` `foreground/primary`, subtitle `body/xsmall` `foreground/secondary`; disabled turns both to `foreground/disabled`.

### Slot
Prop: `slot`. A centring wrapper (gap `space/sm`, 36Px tall measured) offered as cell content.

**Dependencies on other pages:** Search, Icon Button, Pagination, Scrollbar, Avatar, Icon, Button.

## Tokens & theming

- **Colour:** `surface/section`; `interactive/neutral/background/{default, hover, focused, selected, disabled}`, `interactive/neutral/border/default`, `interactive/ghost/background/default`; `border/{default, subtle, focus}`; `foreground/{primary, secondary, tertiary, disabled, cursor}`; `shadow/soft`.
- **Dimension:** `space/{none, xxs, sm, md, lg}`, `stroke/{base, thin, thick}`, `radius/{none, element-md}`, `control/sm`, `shadow/medium/{x, y, blur}`, `shadow/small/{x, y, blur}`.
- **Typography:** `body/small`, `body/xsmall`, `label/medium`.
- **Effect style:** `Shadow/medium-horizontal`. **Glyph:** `filter`.
- **Theme axes:** palette (Light, Dark); size (Desktop, Mobile, Tablet, Desktop Compact); typography (Desktop, Tablet, Mobile, Desktop Compact).

All 49 names resolve in `tokens/`.

## States, behavior & motion

No States & Triggers section in the metadata (states exist only on the private cells, above).

- **Motion** — "No transition is defined for the controls bar or the footer appearing and disappearing."

## Content & slots

- **Controls bar** (Table Controls instance) — "Holds a search field (instance of the search component) fixed to its own Shape, Size and Flavour, and an open Controls Slot for whatever actions a consumer adds. Whether each shows on its own is not reachable from Table, only hasControl toggles them together."
- **Content** (Table Content instance) — "Always the plain left-to-right column layout. Table Content also offers a frozen-column and a horizontally scrolling arrangement, neither used by this instance and neither exposed as a property of Table."
- **Footer** (Table Footer instance) — "Holds a locked summary text and a Pagination instance set to Outline. Whether each shows on its own is not reachable from Table, only hasFooter toggles them together."

## Usage

**Do**
- Turn hasControl off when the table doesn't need its own search or extra actions above it.
- Turn hasFooter off for a table short enough that pagination has nothing to do.

**Don't**
- Don't expect Table's own properties to hide just the search field or just the pagination summary on their own, hasControl and hasFooter each toggle their whole section together.
- Don't expect a frozen or horizontally scrolling column arrangement from this instance, it always uses the plain left-to-right layout no matter what fills the columns.

## Accessibility

- Nothing in this file marks keyboard navigation between cells, rows or the controls above and below them. Whether this table participates in a grid-style keyboard pattern needs confirming outside Figma.

## Layout & theming intents

| Property | Type | Description |
|---|---|---|
| Width | Fixed | "979px, held fixed rather than hugging its content." |
| Height | Hug | "Hugs the controls bar, the content and the footer stacked with no gap between them." |
| Padding | Fixed | "0 on every side of the table itself, each section carries its own padding instead." |
| Controls bar | Fixed height, fixed padding | "Fixed at 60px tall, 16px padding on the left and right, 12px on top and bottom. Its search field and controls slot align to the right-hand side, leaving the left side open." |
| Footer | Fixed height, fixed padding | "Fixed at 60px tall, the same 16px and 12px padding as the controls bar. The summary text and the pagination control push to opposite ends rather than sitting a fixed distance apart." |
| Content | Fill | "Takes whatever height is left between the controls bar and the footer, 351px with both shown." |

## Issues

**Warn**
- **Sharp corners aren't tokenised.** `sharp` leaves the radius a raw 0; `rounded` binds `radius/element-md`, and sharp corners elsewhere bind `radius/none`.
- **Sorting is unwired.** `_Label`'s `sort` is bound to nothing (`_Sort` is always shown, never changes); `_Header Cell`'s `Sorted` only flips it, inversely. No header variant sets a sort direction. Build sort state from `_Sort`'s `direction`; don't reproduce `Sorted`.
- **Orphaned component.** Table Column/true, used by the frozen variants, isn't on any page. Its end stroke weight is raw 1, no token.
- **Sideways shadow by swapped bindings.** `Shadow/medium-horizontal` binds offsetX to `shadow/medium/y` and offsetY to `shadow/medium/x` (same for small). Implement as a horizontal shadow; no horizontal-offset tokens exist.
- **Disabled data cell isn't dimmed.** It removes the cell fill but keeps the content enabled; `_Avatar and text` has an unused disabled variant.
- **Preferred cell content.** 9 keys, 5 resolve (_Avatar and text, Button, Icon Button, Search, Slot); 4 don't. The metadata names 7, including Checkbox and Status Label, so two keys are unaccounted for.
- **Active sort colour is `foreground/cursor`**, the text-caret token, not an interactive or brand token.
- **Metadata vs file.** Controls bar and footer are said to be fixed 60px tall — both hug (60 is measured). Content is said to fill — it hugs. Quoted paddings are bound to `space/lg` / `space/md`.
- **Gaps.** `_Data Cell` cell height fixed with no token; several containers use raw 0 gap/padding where others bind `space/none`.

**Note**
- **Shape reaches inside.** Besides rounding the table's corners, it sets the matching shape option on every nested component. In code, pass it to what the table renders; slotted content (controls, custom cells) needs it separately or from context.
- Extractor false positive: Frozen Slot Container's end stroke is bound to `stroke/thin`.
- `_Sort` is a two-region vector, not an Icon. `caret-sort` can't colour its carets separately — use `caret-up` + `caret-down` or an SVG.
- `_Header Cell` shows the filter glyph only on hover, focus and disabled; hover and focus are interaction states. 5 of 8 State × Sorted combinations exist.
- Table Content's default × horizontalScroll=true isn't modelled.
- Table exposes only `hasControl` and `hasFooter`; decide in code which nested options become Table props.
- No States section, no motion, keyboard navigation unconfirmed, and no component descriptions on the page.
