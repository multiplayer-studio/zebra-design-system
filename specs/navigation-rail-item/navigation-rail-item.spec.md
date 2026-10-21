# Navigation Rail Item

A single destination in a Navigation Rail, shown as a glyph in a square target or, in the wide form, a glyph and label on one row. It is the content the rail's Menu and Footer slots are built around, and the rail sets nothing on it beyond visibility, so every property here is yours per instance. Selection recolours the glyph and label rather than laying a scrim behind them, which is what keeps it distinct from hover and press.

Source: [Navigation Rail Item set](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=3453-54230) on the Navigation Rail page · extracted 2026-10-21

> **Re-extracted 2026-10-21: no change in Figma.** Same set, variants, properties, tokens and metadata text as 2026-10-20. The only new context is the rail's code-only `shape` property, which should drive this item's corner radius when it sits in a rail (see Issues).

This is a separate spec, not a subcomponent of [Navigation Rail](../navigation-rail/navigation-rail.spec.md), for three reasons:
- It is public, with its own key.
- It has its own Navigation Rail Item Metadata frame (4762:6735).
- The rail's metadata defers to that frame.

## API

| Prop | Type | Values | Default | Controls |
|---|---|---|---|---|
| `state` | enum | default, hover, active, selected | `default` | variant |
| `disabled` | enum | false, true | `false` | variant (only with `state=default`) |
| `expanded` | enum | false, true | `false` | variant |
| `label` | string | — | `"Label"` | label |
| `showLabel` | boolean | true, false | `false` | label (narrow form only) |
| `showIcon` | boolean | true, false | `true` | icon box (glyph and badge) |
| `showBadge` | boolean | true, false | `false` | badge |

**state**:
- default: "The resting destination."
- hover: "Documents the pointer-over treatment. The implementation drives this, so choosing it in a layout freezes the item in a state it should not be in."
- active: "Documents the pointer-down treatment, with the same caveat as hover."
- selected: "The destination the user is currently on. It is the only state that recolours the glyph and label instead of laying a scrim behind them, so it stays legible whatever the rail sits on. Exactly one item across the rail should carry it."

In code, hover and active are interaction states and selected is a prop.

**disabled**: false: "The destination can be selected." · true: "The destination is unavailable, and nothing on the item explains why. Offered on the resting state only, so an item cannot be shown selected and disabled at once."

**expanded**: false: "The narrow form, a glyph in a square target with the caption hidden unless Show Label is on." · true: "The wide form, glyph and label side by side on a single row. This should match the rail the item sits in, since the rail sets its own width independently."

**label**: "The destination's name. It always shows in the wide form, and in the narrow form only when Show Label is on, where the column is too narrow for anything but a very short word."

**showLabel**: false: "Glyph only in the narrow form." · true: "Adds the caption under the glyph in the narrow form. It has no effect in the wide form, where the label shows regardless."

**showIcon**: true: "Shows the glyph." · false: "Hides it. In the narrow form with Show Label off this leaves an empty target with nothing to read, so only turn it off in the wide form."

**showBadge**: false: "No badge on the glyph." · true: "Reveals a notification dot over the glyph's top-right corner. It sits outside the layout, so turning it on never changes the item's size or shifts its neighbours."

**Unwired:** `Collapsible` (#3416:48, boolean) is bound to nothing and is not in the metadata.

Values anywhere in this document are token names. The only literals are inside verbatim metadata quotes and inside issues; measurements are suffixed Px.

## Internal variations & content inputs

- **Icon:** this is a swap-only exposed Icon, pinned to Size=small with Framed off. Its default glyph is `star`, a placeholder. In code it is a glyph name, likely an `icon` prop.
- **Badge:** this is a Notification Indicator ([specs/notification-indicator](../notification-indicator), the Badges-page set) pinned to Size=small, the dot. It is not exposed.

## Anatomy

1. **Item** (root): "The outer frame. Vertical and hugging in the narrow form, horizontal and fixed-width in the wide one, with a minimum on both axes so the target never shrinks below it." Min width and height are `control/lg`, and the radius is `radius/sm`.
   - Narrow: vertical and centred, gap `space/none`, padding `space/sm` top/bottom and `space/xs` left/right. Hugs (48×48Px).
   - Wide: horizontal, gap `space/lg`, padding `space/sm` top/bottom and `space/lg` left/right. Fixed width (176×48Px), and fills inside the wide rail.
2. **Icon box** (visible when `showIcon`): "The box holding the glyph, and the anchor the badge is positioned against. It does not clip, which is what lets the badge overhang its corner." Hugs (16×16Px). It holds:
   - **icon**: glyph `star`, rounded family. The nested Icon's Size=small sets its size. Its colour is currentColor, following the label.
   - **badge** (visible when `showBadge`, and only if `showIcon`): a Notification Indicator, Size=small (8×8Px). It is absolute, offset 12/−4Px from the icon box so it overhangs the top-right corner, with centre/centre constraints.
3. **Label**: "The destination's name. Hidden by default in the narrow form and always shown in the wide one, with a different text style in each." It is centred and end-truncated on one line as drawn (see issues).
   - Narrow: `indicator/small`, fills the width, visible when `showLabel`.
   - Wide: `label/medium`, hugs, always visible.

## Variants

Colours are the same in both forms. Expanded only changes the layout (see anatomy).

| state | disabled | root fill | label + glyph colour | node (narrow / wide) |
|---|---|---|---|---|
| default | false | `interactive/ghost/background/default` (transparent) | `interactive/neutral/foreground/default` | 3453:54231 / 4654:10555 |
| hover | false | `interactive/ghost/background/hover` | `interactive/neutral/foreground/default` | 3453:54236 / 4654:10550 |
| active | false | `interactive/ghost/background/pressed` | `interactive/neutral/foreground/default` | 3480:85366 / 4654:10545 |
| selected | false | `interactive/ghost/background/default` (transparent) | `interactive/subtle/foreground/default` | 3453:54264 / 4654:10540 |
| default | true | none | `interactive/subtle/foreground/disabled` | 3453:54241 / 4654:10535 |

## Dependencies

- Icon ([specs/icon](../icon)).
- Notification Indicator ([specs/notification-indicator](../notification-indicator), 3719:6256, Size=small). This is the correct set, not the drifted copy 2837:1489.

[Navigation Rail](../navigation-rail/navigation-rail.spec.md) uses this item.

## Tokens & theming

- **Colour:** `interactive/ghost/background/{default, hover, pressed}`, `interactive/neutral/foreground/default`, `interactive/subtle/foreground/{default, disabled}`.
- **Dimension:** `control/lg`, `space/{none, xs, sm, lg}`, `radius/sm`.
- **Typography:** `indicator/small` (narrow), `label/medium` (wide).
- **Glyph:** `star`.
- **Theme axes:** palette (Light, Dark); size and typography (Desktop, Mobile, Tablet, Desktop Compact).
- **Extensions** (tokens/manifest.json, new since the last extraction): companion (palette), target (primitives, palette), condensed (typography, size). Names only are bound here, so they theme unchanged.

All 14 names resolve in `tokens/`, and `star` is in the font. The badge's own tokens belong to specs/notification-indicator.

## States, behavior & motion

| State | Trigger | Duration | What changes |
|---|---|---|---|
| default | Resting | — | "A fully transparent ghost background, with glyph and label on interactive/neutral/foreground/default." |
| hover | Pointer over the item | — | "The ghost background rises to 5 percent opacity. Glyph and label do not change, so the scrim alone carries the feedback." |
| active | Pointer held down | — | "The same scrim at 10 percent. Glyph and label still do not change." |
| selected | Marked as the current destination | — | "No scrim at all. The glyph and label move to interactive/subtle/foreground/default instead, which is what separates selection from hover and press." |
| disabled | Disabled set to true | — | "The background fill is dropped entirely and glyph and label move to interactive/subtle/foreground/disabled." |
| focus | Not modelled | — | "There is no focus variant. Keyboard focus has to be rendered by the implementation." |

- **Motion**: "Figma stores no timing and no transition is modelled. Every state change is colour or opacity only, with no movement, scale or elevation."
- **Badge**: "The badge is positioned absolutely over the glyph and sits outside the layout, so showing or hiding it never reflows the item or the rail."
- **Form change**: "Switching Expanded changes the layout direction, the padding and the text style all at once. It is a different shape rather than a resize, so it is set by the rail rather than animated."

## Content & slots

- **Label** (text property): "The destination's name. There is no truncation and no wrapping, so in the narrow form a long word simply overflows its column."
- **Icon** (exposed nested Icon instance): "The item pins Icon to Size=small with Framed off and leaves the instance exposed, so the glyph can be swapped per instance while the sizing stays consistent. See the Icon Metadata frame. It arrives holding Star, a placeholder rather than a real destination glyph."
- **Badge** (nested Notification Indicator, toggled by Show Badge): "Pinned to Size=small, the dot with no number. The item does not leave this instance exposed, so its value and size cannot be changed without detaching. At this size the dot signals that something is waiting, not how much."

## Usage

**Do**
- Set exactly one item across the whole rail to selected. Selection is the item's job and neither the rail nor the panel manages it.
- Swap the glyph on every item. It ships holding a Star placeholder, which says nothing about where the destination goes.

**Don't**
- Don't turn Show Icon off in the narrow form. With the caption hidden too, the item becomes an empty target with nothing to read.
- Don't rely on Show Label to hide labels in the wide form. It only controls the narrow one, where the label is hidden by default anyway.

## Accessibility

- In the narrow form the destination is a glyph alone unless Show Label is on. An icon is not a name, so the accessible name has to come from code.
- Selection is carried by colour on the glyph and label, with no scrim, underline or indicator bar. It needs to be conveyed in code as well.
- Hover and press are carried by a translucent scrim alone and leave the glyph and label unchanged, so neither reaches a keyboard or screen reader user.
- There is no focus variant. Keyboard focus has to be rendered by the implementation.
- Disabled is visual only and nothing on the item explains why a destination is unavailable.
- The badge is a dot with no number at the size this component pins, so whatever it signals needs a text equivalent.

## Layout & theming intents

| Property | Type | Description |
|---|---|---|
| Width | Hug in the narrow form, fixed in the wide one | "48px collapsed, growing only if a caption is wider. 176px expanded, fixed regardless of label length." |
| Height | Hug with a floor | "48px in both forms, held up by a control/lg minimum on both axes so the target never drops below it." |
| Padding | Fixed per form | "8px (space/sm) top and bottom in both. 4px (space/xs) left and right collapsed, 16px (space/lg) expanded." |
| Gap | Fixed per form | "None collapsed, where the caption sits directly under the glyph. 16px (space/lg) expanded, between glyph and label." |
| Radius | Fixed | "radius/sm on every variant." |
| Icon | Fixed | "A 16px Icon at Size=small with Framed off, in a 16px box that does not clip its content." |
| Badge | Absolute | "An 8px Notification Indicator at Size=small, placed at 12,-4 against the 16px glyph box so it overhangs the top-right corner, outside the layout flow." |
| Label type | Fixed per form | "indicator/small (10/12, Regular) collapsed, label/medium (14/20, Medium) expanded." |
| Colour | Theming | "interactive/neutral/foreground/default at rest, hover and press. interactive/subtle/foreground/default when selected, interactive/subtle/foreground/disabled when disabled. Backgrounds come from the interactive/ghost family. Glyph and label take the same token in every state." |

## Duplicate check: Tab Bar

The Tab Bar page (3607:237) has its own set named "Navigation Rail Item" (3635:1151, key 356c565c…, in the "Tap Bar" frame). It was read with `page.loadAsync` and compared with this set (3453:54230, key 7848f7c7…).

**Verdict:** it is a different component that only shares the name. It is not this component placed elsewhere (the id and key differ), not a copy, and not a drifted duplicate. Its props, axes, structure, size and tokens are those of a horizontal tab item. Neither page uses the other's set: Tab Bar (3640:2127) holds its 27 instances. It was not specced here. Renaming it (e.g. Tab Item) would stop the two colliding in the asset panel.

They share only a few building blocks: a `control/lg` minimum height, the ghost background family for default and hover, the Badges-page Notification Indicator, a `star` placeholder, and `label/medium`.

| | This page | Tab Bar |
|---|---|---|
| Props | Label text, Show Badge, Show Label, Show Icon, Collapsible, State (hover/selected/default/active), Disabled, Expanded | Show Leading Icon, Show Badge, State (hover/selected/default/disabled), Disabled, Selected. There is no text prop: the label is fixed copy "Tab Item" |
| Variants | 10 | 4 |
| Layout | 48Px square vertical (narrow) or 176Px row (wide) | horizontal row that fills its width (152×48Px drawn), gap `space/sm`, padding `space/md` × `space/gutter` |
| Radius | `radius/sm` | `radius/none` |
| Selection | glyph and label recolour to `interactive/subtle/foreground/default` | bottom border `interactive/primary/border/default` at `stroke/thick`, plus fill `interactive/ghost/background/focused` |
| Rest label | `interactive/neutral/foreground/default` | `foreground/secondary` |
| Disabled label | `interactive/subtle/foreground/disabled` | `interactive/neutral/foreground/disabled` |
| Icon | Icon Size=small | Icon Size=medium; the default variant points at a different Icon set (3629:677) |
| Badge | Size=small, absolute over the glyph | Size=large, in flow after the label |

## Issues

**Warn**
- **Unwired Collapsible.** It is bound to nothing and missing from the metadata. There is no caret on this item.
- **Truncation.** The metadata says there is no truncation, but in both forms the label end-truncates on one line.
- **Double alpha on the scrims.** `interactive/ghost/background/hover` and `…/pressed` already resolve to translucent primitives (alpha 5 and 10), and Figma adds a paint opacity of 0.05 or 0.1 on top. The drawn scrim is therefore nearly invisible. The metadata's "5 percent" and "10 percent" describe the tokens alone, so use the tokens with no extra opacity.
- **Name collision.** The Tab Bar page has a different component with this name. See above.

**Note**
- Show Icon hides the icon box, and the badge with it.
- The narrow label box measures 40×7Px, shorter than its line height, but it renders correctly. Build it to its line height.
- Inside the rail, items rebind their radius to `radius/element-sm`, while the set uses `radius/sm`. The rail's metadata now adds a code-only Shape property (rounded default, sharp) that "controls the shape of all sub items within the rail unless overridden". In code, take the item's radius from the rail's shape. What sharp maps to is an open owner decision; see the [rail's issues](../navigation-rail/navigation-rail.spec.md#issues).
- The glyph's colour is not bound. A font glyph on currentColor meets the metadata's "same token in every state".
- An unbound gap of 10 on the icon box never renders.
- There is no focus state, no motion and no component description.
