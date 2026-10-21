# Sub Menu Item

A row in the Navigation Rail's sub menu panel, with a leading glyph, a label, an optional badge and an optional caret. It is the content the rail's Sub Menu Slot is built around, placed either directly or inside a Collapsible Menu Item. Nesting is a property rather than a layout, indenting the row and quietening its label so one level of hierarchy reads without connector lines.

Source: [Sub Menu Item set](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=3453-54275) on the Navigation Rail page · extracted 2026-10-21

> **Re-extracted 2026-10-21: no change in Figma.** Same set, variants, properties, description, tokens and metadata text as 2026-10-20. Two things carry over or are new from the rail: the owner decision that the caret rotates one glyph on `animations/spring`, and the rail's code-only `shape` property, which should drive this row's corner radius (see Issues).

This is a separate spec, not a subcomponent of [Navigation Rail](../navigation-rail/navigation-rail.spec.md), for three reasons:
- It is public, with its own key.
- It has its own Sub Menu Item Metadata frame (4762:6931).
- The rail's metadata defers to that frame.

The set also has a Figma component description: "A row inside the Navigation Rail sub-menu panel. Set Nested=true for items that belong under an expandable group header — it applies extra indent, secondary (de-emphasized) text color, and a smaller type size, so nested items read as visually subordinate to their parent group rather than looking like flat, top-level items. The leading icon (Show Leading Icon) and badge/notification indicator behave the same as top-level items."

## API

| Prop | Type | Values | Default | Controls |
|---|---|---|---|---|
| `state` | enum | default, hover, active, selected | `default` | variant |
| `disabled` | enum | false, true | `false` | variant (only with `state=default`) |
| `nested` | enum | false, true | `false` | variant |
| `label` | string | — | `"Label"` | label |
| `showLeadingIcon` | boolean | true, false | `true` | icon (and, by mistake, the badge's inner indicator) |
| `subMenu` | boolean | true, false | `true` | trailing slot (caret) |
| `showBadge` | boolean | true, false | `false` | badge |

**state**:
- default: "The resting row."
- hover: "Documents the pointer-over treatment. The implementation drives this, so choosing it in a layout freezes the row in a state it should not be in."
- active: "Documents the pointer-down treatment. It also shifts the label token, which hover does not."
- selected: "The row the user is currently on. It is the only state with a background of its own rather than a borrowed scrim, and it recolours the label as well."

**disabled**: false: "The row can be selected." · true: "The row is unavailable, and nothing on it explains why. Offered on the resting state only, so a row cannot be shown selected and disabled at once."

**nested**: false: "A first-level row in the panel." · true: "A child row under a collapsible parent. It indents from the leading edge and steps the label down to a quieter token and a smaller type style, so depth reads without a connector line. Only one level of nesting is built."

**label**: "The row's name. The row is a fixed width and the text does not truncate or wrap, so a long name overflows rather than shortening."

**showLeadingIcon**: true: "Shows a glyph before the label, which is what keeps rows scannable in a long list." · false: "Hides it. The label shifts to the leading edge, so a list mixing rows with and without icons loses its alignment."

**subMenu**: true: "Shows the caret at the trailing edge, marking the row as one that opens a further level." · false: "Hides the caret, for a row that navigates straight to its destination. Leaving it on for a row that opens nothing promises a level that is not there."

**showBadge**: false: "No badge on the row." · true: "Reveals a notification indicator between the label and the trailing caret. Unlike the rail item's badge this one sits in the layout, so it takes space from the label."

Values anywhere in this document are token names. The only literals are inside verbatim metadata quotes and inside issues; measurements are suffixed Px.

## Internal variations & content inputs

- **Icon:** this is an exposed Icon, Size=small, Framed off. Its default glyph is `verified`, a placeholder.
- **Badge:** this is an exposed Notification Indicator at Size=medium (the counter), with sample value "2". It is likely a `badgeCount` input in code. Build it from [specs/notification-indicator](../notification-indicator) Size=medium, not from the drifted copy the set uses (see issues).
- **Caret:** this is an exposed [Caret Indicator](../navigation-rail/navigation-rail.spec.md#caret-indicator), pinned to Open=false, Direction=horizontal, Size=small, which gives `chevron-right`. Collapsible Menu Item overrides it to Direction=vertical and drives Open. **In code (owner decision):** one `chevron-right` glyph turned 90deg clockwise when open, animated on `animations/spring` (`--animations-spring`), not Figma's glyph swap.

## Anatomy

1. **Row** (root): "The outer frame. Fills the width of the slot it sits in and holds a minimum height, so rows in a list line up whatever they contain."
   - Horizontal, gap `space/sm`, radius `radius/sm`.
   - Padding: `space/xs` top and bottom, `space/md` on the right, and `space/md` on the left (`space/xl` when nested).
   - Min height `control/lg`. The min width is unbound.
   - Drawn fixed at 184×48Px; it fills inside a slot.
2. **Icon and Title**: "The leading glyph and the label, kept together so the label starts at the same place on every row that has an icon." Horizontal, gap `space/md`, fill × hug.
   - **icon** (visible when `showLeadingIcon`): glyph `verified`, rounded family, Icon Size=small. Its colour is currentColor.
   - **label**: `label/medium` (nested: `indicator/medium`). It neither truncates nor wraps. Colour per state, see variants.
3. **Badge** (visible when `showBadge` and, as drawn, `showLeadingIcon`): "A notification indicator between the label and the caret. It sits inside the layout, so it takes width rather than overhanging." It is a Notification Indicator at Size=medium (16×16Px).
4. **Trailing Slot** (visible when `subMenu`): "The caret marking a row that opens a further level. Toggled as a whole by the Sub Menu property." It holds a Caret Indicator showing `chevron-right` (16×16Px).

## Variants

Nested changes only three things: the left padding (`space/md` → `space/xl`), the label style (`label/medium` → `indicator/medium`) and the resting label colour.

| state | disabled | root fill | label colour | node (nested false / true) |
|---|---|---|---|---|
| default | false | none | `foreground/primary` (nested: `foreground/secondary`) | 3453:54294 / 3458:1467 |
| hover | false | `interactive/ghost/background/hover` | `foreground/primary` (nested: `foreground/secondary`) | 3453:54276 / 3458:1445 |
| active | false | `interactive/ghost/background/pressed` | `interactive/neutral/foreground/default` | 3453:54303 / 3458:1478 |
| selected | false | `interactive/ghost/background/selected` | `interactive/ghost/foreground/default` | 3480:63554 / 3480:63563 |
| default | true | none | `foreground/disabled` | 3453:54285 / 3458:1456 |

## Dependencies

- Icon ([specs/icon](../icon)).
- Caret Indicator ([specs/navigation-rail](../navigation-rail/navigation-rail.spec.md#caret-indicator)).
- Notification Indicator, **as drawn the drifted copy 2837:1489** (Navigation Bar page, key 5ce87415…). Use [specs/notification-indicator](../notification-indicator) (3719:6256) instead.

The rail's Sub Menu Slot and Collapsible Menu Item use this item.

## Tokens & theming

- **Colour:** `foreground/{primary, secondary, disabled}`, `interactive/ghost/background/{hover, pressed, selected}`, `interactive/ghost/foreground/default`, `interactive/neutral/foreground/default`.
- **Dimension:** `control/lg`, `space/{none, xs, sm, md, xl}`, `radius/sm`.
- **Typography:** `label/medium`, `indicator/medium` (nested).
- **Glyphs:** `verified`, `chevron-right`.
- **Motion (owner decision, not bound in Figma):** `animations/smooth` inside the Navigation Rail (rows opening and closing, the caret turn); `animations/spring` for the caret rotation elsewhere.
- **Theme axes:** palette (Light, Dark); size and typography (Desktop, Mobile, Tablet, Desktop Compact).
- **Extensions** (tokens/manifest.json, new since the last extraction): companion (palette), target (primitives, palette), condensed (typography, size). Names only are bound here, so they theme unchanged.

All 17 names resolve in `tokens/`, and both glyphs are in the font.

## States, behavior & motion

| State | Trigger | Duration | What changes |
|---|---|---|---|
| default | Resting | — | "No background at all. The label sits on foreground/primary, or foreground/secondary when nested." |
| hover | Pointer over the row | — | "A ghost scrim at 5 percent opacity appears behind the row. The label does not change." |
| active | Pointer held down | — | "The ghost scrim at 10 percent, and the label moves to interactive/neutral/foreground/default. This is the one state where nested and unnested rows converge on the same label token." |
| selected | Marked as the current row | — | "A background on interactive/ghost/background/selected at 5 percent, the only state with a token of its own rather than a borrowed scrim, with the label on interactive/ghost/foreground/default." |
| disabled | Disabled set to true | — | "The background is dropped entirely and the label moves to foreground/disabled." |
| focus | Not modelled | — | "There is no focus variant. Keyboard focus has to be rendered by the implementation." |

- **Motion**: "Figma stores no timing and no transition is modelled. Every state change is colour or opacity only, with no movement, scale or elevation."
  - **In the rail (owner decision):** rows open and close with their group (Collapsible Menu Item rows' height) and with the sub menu panel on `animations/smooth` (ease-in-out, 250ms), by owner decision; the caret turns on smooth there too, and on `animations/spring` outside the rail. Off under prefers-reduced-motion.
- **Caret**: "The caret has its own open and closed states, but this component does not drive them. Whatever expands the row is responsible for turning the caret with it."
- **Badge**: "The badge sits inside the row's layout rather than floating over it, so turning it on takes width away from the label."

## Content & slots

- **Label** (text property): "The row's name. Fixed row width with no truncation and no wrapping, so length has to be controlled by the writing."
- **Leading icon** (exposed nested Icon instance): "Pinned to Size=small with Framed off and left exposed, so the glyph can be swapped per instance while the sizing stays consistent. See the Icon Metadata frame. It arrives holding Verified, a placeholder rather than a real destination glyph."
- **Badge** (exposed nested Notification Indicator): "Pinned to Size=medium, which is the counter rather than the bare dot, and left exposed so its value stays editable. This is a different size from the one the rail item pins, so the two badges are not interchangeable."
- **Caret** (exposed nested Caret Indicator): "Pinned to the horizontal direction and the closed position, and left exposed so the open state is reachable. Toggled as a whole by Sub Menu."

## Usage

**Do**
- Turn Sub Menu off for rows that navigate straight to a destination. The caret is a promise that another level exists.
- Keep the leading icon on for every row in a list, or off for all of them. Mixing the two breaks the label alignment down the panel.

**Don't**
- Don't nest more than one level. Only a single indent step is built, so a deeper tree will read as though everything sits at the same depth.
- Don't treat this badge as interchangeable with the rail item's. This one is the counter size and sits in the layout, that one is a bare dot that floats over the glyph.

## Accessibility

- Nesting is conveyed by indent, a quieter label token and a smaller type style, with no connector line. The hierarchy has to be expressed in code as well.
- Selection is the only state with a background of its own. Hover and press borrow a translucent scrim and leave the label alone, so neither reaches a keyboard or screen reader user.
- There is no focus variant. Keyboard focus has to be rendered by the implementation.
- Disabled is visual only and nothing on the row explains why it is unavailable.
- The caret marks a row that opens another level but does not describe what is inside it, so the label has to carry that on its own.
- Nested rows drop to a 12px type style, which is small for a navigation target. Check it against your minimum readable size.

## Layout & theming intents

| Property | Type | Description |
|---|---|---|
| Width | Fill | "Fills the slot it sits in, drawn at 184px. It does not hug its label, so rows in a list are all the same width." |
| Height | Hug with a floor | "48px, held up by a control/lg minimum so the target never drops below it." |
| Padding | Fixed per Nested | "4px (space/xs) top and bottom throughout. 12px (space/md) left and right unnested, with the left edge stepping to 24px when nested." |
| Gap | Fixed | "8px (space/sm) between the icon, the label, the badge and the caret." |
| Radius | Fixed | "radius/sm on every variant." |
| Icon and caret | Fixed | "Both 16px, the icon an Icon at Size=small and the caret a Caret Indicator in its horizontal direction." |
| Badge | In flow | "A 16px Notification Indicator at Size=medium, sitting between the label and the caret rather than overhanging the row." |
| Label type | Fixed per Nested | "label/medium (14/20, Medium) unnested, indicator/medium (12/14, Medium) nested." |
| Colour | Theming | "foreground/primary at rest, foreground/secondary when nested, interactive/ghost/foreground/default when selected, interactive/neutral/foreground/default when pressed and foreground/disabled when disabled. Backgrounds come from the interactive/ghost family." |

## Owner decisions

- **Every row shows its full label in a tooltip after a 3s hover while it is truncated**, inside a group or capped by the rail's `subMenuMaxWidth`. Code-only; an untruncated label shows none.
- **A Collapsible Menu Item never widens the sub menu.** It fills the width the panel's other content gives it (min 240px); its header and row labels truncate, and a truncated label shows in full in a tooltip after a 3s hover. Figma has no truncation or tooltip here. The tooltip opens only while the label is truncated, repeats the accessible name without adding a description, and follows the rail's mode.
- Carets and chevrons rotate one glyph with animation rather than swapping glyphs. Figma still swaps.
- Motion that matches Switch uses the `animations/spring` token (`--animations-spring`). It applies to the caret rotation outside the rail.
- Every opening and closing in the rail uses `animations/smooth` (ease-in-out, 250ms), caret included.

## Duplicate check: orphaned Sub Menu Item (3404:28070)

An older Sub Menu Item set (key e97045ae…) has been removed from every page but is still referenced:
- It is the Navigation Rail's Sub Menu Slot preferred instance.
- Collapsible Menu Item's closed variant still holds four of its instances in the hidden slot.
- It holds four of the drifted Notification Indicator instances.

It shares this set's property ids but has only four variants (State hover/selected/default × Disabled), with no `active` and no `nested`. It is not specced; this spec is the reference.

## Issues

**Warn**
- **The badge is the drifted Notification Indicator copy.** All 10 variants use 2837:1489 at Size=medium, not the specced set 3719:6256. The copy has a `stroke/thin` ring and a `foreground/inverse` count, among other differences ([navigation-bar duplicateCheck](../navigation-bar/navigation-bar.spec.md)). Build the badge from specs/notification-indicator.
- **Badge visibility is double-bound.** The Badge frame follows Show Badge, but the indicator inside it follows Show Leading Icon. So the badge shows only when both are on, and hiding the icon hides the badge. In code, bind it to `showBadge` alone.
- **Gap.** The metadata says `space/sm` sits between the icon, label, badge and caret. In fact the icon and label are grouped with `space/md` between them; `space/sm` separates that group, the badge and the caret.
- **Double alpha.** The hover, pressed and selected tokens already resolve to translucent primitives (alpha 5, 10 and 5), and Figma adds a paint opacity of 0.05, 0.1 and 0.05 on top. Use the tokens alone in code.
- **Orphaned older set.** The Sub Menu Item set 3404:28070 is still referenced. See above.

**Note**
- **Shape from the rail.** The rail's metadata now adds a code-only Shape property (rounded default, sharp) that "controls the shape of all sub items within the rail unless overridden". Inside the rail, rows carry `radius/element-sm` (the rounded shape), but the set uses `radius/sm`. In code the row's radius should follow the rail's shape. What sharp maps to is an open owner decision; see the [rail's issues](../navigation-rail/navigation-rail.spec.md#issues).
- Width: the metadata says Fill, but the set is fixed at 184Px. Only placed instances fill.
- The Nested=true variants carry a hidden, unbound duplicate of the trailing slot. It is a leftover; ignore it.
- Unbound gaps of 10 on the single-child wrappers never render. The min width is a raw 48Px.
- The caret never changes with State or Disabled, and its colour follows the label.
- There is no focus state and no motion in Figma. The caret's rotation motion comes from the owner decision.
