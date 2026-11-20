# Navigation Bar

> A horizontal bar of top-level destinations, pinned to one edge of a view. It is a container rather than a fixed design, three slots hold the content and the variant axes decide only how that content is arranged across the width. Fill the slots with Navigation Item instances, and turn on the Action Slot when the bar also needs a call to action. It draws no background of its own, so it takes the colour of whatever sits behind it.

**Implementations:** `@zebra-design-system/react-baseui` · `@zebra-design-system/web-components` · `@zebra-design-system/zeta-web` (`<zeta-navigation-bar>`)

## API

| Prop | Type | Default | Values | Notes |
|---|---|---|---|---|
| `shrinkItems` | enum | `true` | `true` `false` |  |
| `spacer` | enum | `false` | `false` `true` |  |
| `showDivider` | enum | `false` | `false` `true` |  |
| `showActionSlot` | boolean | `false` |  |  |
| `slot` | slot |  |  |  |
| `rightSlot` | slot |  |  |  |
| `actionSlot` | slot |  |  |  |

## When and how to use

### Do

- Fill the slots with Navigation Item instances and let the bar handle the arrangement. The variant axes exist so items never have to be positioned by hand.
- Turn on Show Action Slot when the bar needs a call to action, rather than dropping a Button in among the destinations.

### Don't

- Don't use Shrink Items=false when the number of destinations can change. Evenly spread items re-space every time one is added or removed.
- Don't rely on the bar for a background. It has no fill of its own, so it shows whatever surface sits behind it.

## States

| State | Trigger | What changes |
|---|---|---|
| Static | — |  |

## Behaviour

- **Motion** — Figma stores no timing, and the bar models no transition. Arrangement changes come from switching a variant, which is an authoring choice rather than something that animates at runtime.
- **Reflow** — Width fills the parent and height is driven by the slot content, so taller items make a taller bar. Under Shrink Items=false, adding or removing an item re-spaces every remaining item immediately.

## Content

| Part | Kind | Guidance |
|---|---|---|
| Slot | slot, prefers Navigation Item | The main group of destinations. It will accept other content, but Navigation Item is what the bar is built around and what sets its height. See the Navigation Item Metadata frame for what each item offers. |
| Right Slot | slot, prefers Navigation Item | The second group, present only while Spacer is true. Same content rules as Slot. Switching to a variant without Spacer removes the slot along with anything placed in it. |
| Action Slot | slot, prefers Button | A single action rather than a destination, hidden until Show Action Slot is turned on. See the Button Metadata frame. The bar does not constrain which flavour or size goes in, so match it to the surface. |
| Item count | not constrained | No slot caps how many items it holds. The bar keeps adding them well past the point where labels stay readable, so that limit is a design decision rather than one the component enforces. |

## Layout & theming

| Property | Sizing | Guidance |
|---|---|---|
| Width | Fill | Fills its parent's width at every variant. It is not built to be given a fixed width. |
| Height | Hug | 72px, driven entirely by the items inside. Nothing sets a height on the bar, so taller slot content makes a taller bar. |
| Padding | None | Zero on all four sides. Every inset comes from the items themselves. |
| Gap | None | Item spacing is zero. Separation comes from each item's own padding and from the alignment mode, never from a gap on the bar. |
| Arrangement | Fixed per variant | Shrink Items=true lets each slot hug its content and spaces the groups apart. Shrink Items=false makes the slot fill the width and distribute its items evenly inside it. |
| Divider | Fixed | A vertical Divider inside a Divider Section, inset 8px (space/sm) top and bottom, 1px wide on stroke/thin. Present only while Show Divider is true. |
| Action Slot inset | Fixed | 16px (space/lg) of padding on its leading edge and an 8px gap, so the action separates from the last destination. |
| Border | Fixed | A 1px top border on border/default, drawn outside the bounds. No other edge is drawn, and there is no fill and no shadow. |
| Colour | Theming | The bar binds only its border, to border/default. Everything else visible in it is coloured by the items, or by the surface showing through. |

## Accessibility

- The bar is a container and announces nothing itself. The destinations inside carry the meaning, so every Navigation Item needs a clear label.
- Only the top edge is drawn. On a surface close to border/default the bar's boundary disappears, so check that contrast rather than assuming the edge reads.
- Selection lives on the item, not the bar. Exactly one Navigation Item should be Active at a time, and nothing in the component enforces it.
- The Action Slot holds an action rather than a destination. Keeping it visually distinct matters more here than elsewhere, because everything else in the bar navigates.

---
*Generated from `specs/navigation-bar` — do not edit by hand. Theming: put `mode-dark`, `ext-companion` or `bp-*` classes on any ancestor (Zeta Web uses `data-theme`/`data-brand` attributes instead).*
