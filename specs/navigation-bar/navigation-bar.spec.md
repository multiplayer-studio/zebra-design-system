# Navigation Bar

A horizontal bar of top-level destinations, pinned to one edge of a view. It is a container rather than a fixed design, three slots hold the content and the variant axes decide only how that content is arranged across the width. Fill the slots with Navigation Item instances, and turn on the Action Slot when the bar also needs a call to action. It draws no background of its own, so it takes the colour of whatever sits behind it.

Source: [Navigation Bar page](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=2835-796) · extracted 2026-10-20

The page has four public components. **Navigation Bar** is this spec. **Spacer** is covered below as a subcomponent. **Navigation Item** has its own metadata frame and is specced separately in [specs/navigation-item](../navigation-item/navigation-item.spec.md). The page's **Notification Indicator** is a drifted duplicate of [specs/notification-indicator](../notification-indicator/notification-indicator.spec.md) and is not re-specced (see [Duplicate check](#duplicate-check-notification-indicator)).

## API

| Prop | Type | Values | Default | Controls |
|---|---|---|---|---|
| `shrinkItems` | enum | true, false | `true` | variant |
| `spacer` | enum | false, true | `false` | variant, rightSlot (only with `shrinkItems=true`) |
| `showDivider` | enum | false, true | `false` | variant, groupDivider (only with `spacer=true`) |
| `showActionSlot` | boolean | true, false | `false` | actionSlot, actionDivider |
| `slot` | slot | prefers Navigation Item | — | slot |
| `rightSlot` | slot | prefers Navigation Item | — | rightSlot, present when `spacer=true` |
| `actionSlot` | slot | prefers Button | — | actionSlot, shown when `showActionSlot` |

**shrinkItems**: true: "Items keep their natural width and the groups sit against the ends of the bar. The right choice when the number of destinations can change, because adding one does not re-space the others." · false: "The item row stretches to the full width and spreads the items evenly across it. Suits a fixed set of destinations, and looks unbalanced the moment the count changes."

**spacer**: false: "One group of items flowing from the start of the bar. Use when every destination has equal standing." · true: "Splits the items into two groups pushed to opposite ends and adds a second slot on the right. Use it to separate primary destinations from account or utility entries. Available only while Shrink Items is true."

**showDivider**: false: "No rule between the two groups. The gap alone carries the separation, which is enough on a plain surface." · true: "Draws a vertical rule between the two groups. Available only when Spacer is true, because without a split there is nothing to divide."

**showActionSlot**: true: "Reveals a slot at the end of the bar for a call to action that is not a destination. Placing an action among the items instead makes it read as another place to go."

Only four combinations exist: (true, false, false), (false, false, false), (true, true, false), (true, true, true) for (shrinkItems, spacer, showDivider).

Values anywhere in this document are token names. The only literals are inside verbatim metadata quotes and inside issues; measurements are suffixed Px.

## Internal variations & content inputs

There are no internal variations. The slots are content inputs: the sample has four Navigation Items in a single group (the first Active, the third with a badge), two per group when Spacer is on, and one small primary rounded Button in the Action Slot.

## Anatomy

1. **Bar** (root): "The outer horizontal frame. Fills its parent's width, hugs its content vertically, and carries a top border and nothing else." Horizontal, no gap or padding, centred on the cross axis. Main axis is space-between when `shrinkItems=true` and start when false. Sizing is fill × hug (555×72Px measured). Top edge stroke only, `border/default`, drawn outside; the width is unbound. No fill.
2. **Slot and Right Slot**: "The groups of destinations, holding Navigation Item instances. The right group exists only while Spacer is true." Horizontal, no gap or padding. With `shrinkItems=true` each hugs and packs to the start. With `shrinkItems=false` the slot fills the width and uses space-between.
3. **Divider Section** (groupDivider): "A vertical rule between the two groups, inset from the top and bottom edges. Present only while Show Divider is true." It is a zero-width vertical frame that fills the height, with padding `space/sm` top and bottom, holding a vertical Divider (`stroke/thin` wide, `radius/none`, colour `border/default` from the Divider component).
4. **Action Slot**: "An end-aligned slot holding a single Button, hidden until Show Action Slot is turned on." Horizontal, padding left `space/lg` and right `space/none`, with an unbound gap. Visible when `showActionSlot`.

Not in the metadata: in the `spacer=true, showDivider=true` variant only, a second Divider Section (actionDivider) sits before the Action Slot and shows with `showActionSlot`.

## Variants

| shrinkItems | spacer | showDivider | root main axis | slot width | slot main axis | parts |
|---|---|---|---|---|---|---|
| true | false | false | space-between | hug | start | slot, actionSlot |
| false | false | false | start | fill | space-between | slot, actionSlot |
| true | true | false | space-between | hug | start | slot, rightSlot, actionSlot |
| true | true | true | space-between | hug | start | slot, groupDivider, rightSlot, actionDivider, actionSlot |

None of the axes changes a colour or a token. They only rearrange or add parts.

## Subcomponents

### Spacer (public, standalone, no metadata)
- **API:** `showDivider` (boolean, default `true`) is **wired to nothing**.
- **Structure:** a fixed horizontal frame (measured 50×72Px, minimum width 50Px), with a centred vertical Divider (`stroke/thin`, `radius/none`, `border/default`, measured 40Px tall) that is always visible.
- **Usage:** no Navigation Bar variant uses it, because the Spacer axis is built with space-between. One instance exists in the file, inside Top App Bar. See issues.

### Navigation Item
Specced separately in [specs/navigation-item](../navigation-item/navigation-item.spec.md).

### Dependencies
- **Navigation Item** (2841:3535) is the preferred content of Slot and Right Slot. See [specs/navigation-item](../navigation-item/navigation-item.spec.md).
- **Button** (2060:15072) is the preferred content of the Action Slot. See [specs/button](../button/button.spec.md).
- **Divider** (2152:8803, Orientation=vertical) is used for groupDivider, actionDivider and Spacer. See [specs/divider](../divider/divider.spec.md).
- **Notification Indicator** (3719:6256) is used indirectly, through Navigation Item's badge. See [specs/notification-indicator](../notification-indicator/notification-indicator.spec.md).

## Duplicate check: Notification Indicator

The page's set (2837:1489, key `5ce874152d457038d8690067738a673cc2b0ad52`) is **a drifted duplicate**. It is not the Badges-page component placed here (3719:6256, key `73fe3d069d197d82a934eb2653a74245d4bb29a4`), and it is not an exact copy.

- **Same:** the props are `Value#2838:0` (default "2") and Size (small | medium | large, default large). The property ids match, which suggests the Badges set was made from this one. Both use fill `interactive/destructive/background/default`, border colour `border/inverse` and text style `indicator/medium`. Both give large a minimum width of `control/icon-lg` and side padding `space/2xs`. Medium is `radius/pill` with no padding.
- **Different:**

| | This page (2837:1489) | specs/notification-indicator (3719:6256) |
|---|---|---|
| Border width | `stroke/thin`, which draws a ring | `stroke/base`, zero, a theming hook |
| Count colour | `foreground/inverse` | `foreground/on-strong` |
| Large radius | `radius/element-sm` | `radius/pill` |
| Large top/bottom padding | `space/2xs` | raw, unbound |
| Small | `space/2xs` padding, 10×10Px | no padding, 8×8Px |
| Medium | clips | doesn't clip |

- **Usage:** nothing on this page uses it, because Navigation Item's badge is the Badges set. Its medium variant still has 15 instances, mostly on the Navigation Rail page. Small and large have none.

## Tokens & theming

- **Colour:** `border/default`.
- **Dimension:** `space/{none, sm, lg}`, `stroke/thin`, `radius/none`.
- **Typography / effects / glyphs:** none on the bar itself. Item, Button and Divider tokens are in their own specs.
- **Theme axes:** palette (Light, Dark); size and typography (Desktop, Mobile, Tablet, Desktop Compact). Extensions are in `tokens/extensions/` (companion, target, condensed).

All 6 names resolve in `tokens/`.

## States, behavior & motion

| State | Trigger | Duration | What changes |
|---|---|---|---|
| Static | — | — | "The bar itself has no interaction states. Selection, hover and disabled all live on the Navigation Item instances inside the slots, so the bar never changes appearance on its own." |

- **Motion:** "Figma stores no timing, and the bar models no transition. Arrangement changes come from switching a variant, which is an authoring choice rather than something that animates at runtime."
- **Reflow:** "Width fills the parent and height is driven by the slot content, so taller items make a taller bar. Under Shrink Items=false, adding or removing an item re-spaces every remaining item immediately."

## Content & slots

- **Slot** (slot, prefers Navigation Item): "The main group of destinations. It will accept other content, but Navigation Item is what the bar is built around and what sets its height. See the Navigation Item Metadata frame for what each item offers."
- **Right Slot** (slot, prefers Navigation Item): "The second group, present only while Spacer is true. Same content rules as Slot. Switching to a variant without Spacer removes the slot along with anything placed in it."
- **Action Slot** (slot, prefers Button): "A single action rather than a destination, hidden until Show Action Slot is turned on. See the Button Metadata frame. The bar does not constrain which flavour or size goes in, so match it to the surface."
- **Item count** (not constrained): "No slot caps how many items it holds. The bar keeps adding them well past the point where labels stay readable, so that limit is a design decision rather than one the component enforces."

## Usage

**Do**
- Fill the slots with Navigation Item instances and let the bar handle the arrangement. The variant axes exist so items never have to be positioned by hand.
- Turn on Show Action Slot when the bar needs a call to action, rather than dropping a Button in among the destinations.

**Don't**
- Don't use Shrink Items=false when the number of destinations can change. Evenly spread items re-space every time one is added or removed.
- Don't rely on the bar for a background. It has no fill of its own, so it shows whatever surface sits behind it.

## Accessibility

- The bar is a container and announces nothing itself. The destinations inside carry the meaning, so every Navigation Item needs a clear label.
- Only the top edge is drawn. On a surface close to border/default the bar's boundary disappears, so check that contrast rather than assuming the edge reads.
- Selection lives on the item, not the bar. Exactly one Navigation Item should be Active at a time, and nothing in the component enforces it.
- The Action Slot holds an action rather than a destination. Keeping it visually distinct matters more here than elsewhere, because everything else in the bar navigates.

## Layout & theming intents

| Property | Type | Description |
|---|---|---|
| Width | Fill | "Fills its parent's width at every variant. It is not built to be given a fixed width." |
| Height | Hug | "72px, driven entirely by the items inside. Nothing sets a height on the bar, so taller slot content makes a taller bar." |
| Padding | None | "Zero on all four sides. Every inset comes from the items themselves." |
| Gap | None | "Item spacing is zero. Separation comes from each item's own padding and from the alignment mode, never from a gap on the bar." |
| Arrangement | Fixed per variant | "Shrink Items=true lets each slot hug its content and spaces the groups apart. Shrink Items=false makes the slot fill the width and distribute its items evenly inside it." |
| Divider | Fixed | "A vertical Divider inside a Divider Section, inset space/sm top and bottom, 1px wide on stroke/thin. Present only while Show Divider is true." |
| Action Slot inset | Fixed | "space/lg of padding on its leading edge and an 8px gap, so the action separates from the last destination." |
| Border | Fixed | "A 1px top border on border/default, drawn outside the bounds. No other edge is drawn, and there is no fill and no shadow." |
| Colour | Theming | "The bar binds only its border, to border/default. Everything else visible in it is coloured by the items, or by the surface showing through." |

## Issues

**Warn**
- **Drifted duplicate Notification Indicator.** The page's set (2837:1489) differs from the Badges set (3719:6256) in border width, count colour, large radius, padding and small size. Its medium variant still feeds 15 instances, mostly on Navigation Rail. Retire it or swap those instances.
- **Spacer is inert and orphaned.** Its Show Divider boolean is unbound, so the Divider always shows. It has no metadata and no Navigation Bar variant uses it. Its one instance in the file is inside Top App Bar. Decide whether it is public before building it.
- **Unbound values.** The bar's 1px top border width and the Action Slot's 8px gap are raw values. The metadata states both.
- **Undocumented second divider.** In `spacer=true, showDivider=true` only, a Divider Section before the Action Slot shows with `showActionSlot`.

**Note**
- Shrink Items=false is space-between, not an even spread. The end items touch the bar's edges.
- The Button sample in the Action Slot is a layer named "Navigation Item".
- Four of eight axis combinations exist. Reject or ignore the rest in code.
- Slot, Right Slot and Action Slot are Figma SLOT properties with preferred content. In code they are child regions.
- A stray top-level instance (2837:1490) on the page points at a third, off-page Notification Indicator set (2835:1403). Ignore it.
- There is no motion and no bar states (stated in the metadata). There are no component descriptions.
