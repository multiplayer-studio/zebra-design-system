---
name: Bottom Sheet
level: organism
status: stable
composes: [../molecules/menu-item.md, ../molecules/card.md, ../atoms/button.md, ../atoms/icon-button.md, ../atoms/icon.md, ../atoms/notification-indicator.md, ../atoms/scrim.md]
tokens:
  # container
  bottom-sheet-container-background: '{colors.color-fill-overlay}'
  bottom-sheet-container-radius: '{radius.radius-container}'
  bottom-sheet-container-padding-bottom: '{space.space-md}'
  bottom-sheet-container-width: '{component-sizes.size-bottom-sheet-width}'
  bottom-sheet-container-border-width: '{stroke.stroke-thin}'
  bottom-sheet-container-border-color: '{colors.color-fill-transparent}'
  # handle
  bottom-sheet-handle-padding-y: '{space.space-lg}'
  bottom-sheet-handle-padding-x: '{space.space-xl}'
  bottom-sheet-handle-bar-width: '{control.control-md}'
  bottom-sheet-handle-bar-height: '{primitives.scale-3}'
  bottom-sheet-handle-bar-background: '{colors.color-line-default}'
  bottom-sheet-handle-bar-radius: '{radius.radius-pill}'
  # header
  bottom-sheet-header-padding-x: '{space.space-lg}'
  bottom-sheet-header-padding-y-start: '{space.space-sm}'
  bottom-sheet-header-padding-y-center: '{space.space-gutter}'
  bottom-sheet-header-gap-start: '{space.space-2xs}'
  bottom-sheet-header-gap-center: '{space.space-gutter}'
  bottom-sheet-header-title-font: '{typography.type-title-medium}'
  bottom-sheet-header-title-foreground: '{colors.color-ink-high}'
  # content: list
  bottom-sheet-list-padding-y: '{space.space-md}'
  bottom-sheet-list-padding-x: '{space.space-lg}'
  bottom-sheet-list-gap: '{space.space-2xs}'
  # content: grid
  bottom-sheet-grid-padding-y: '{space.space-md}'
  bottom-sheet-grid-padding-x: '{space.space-gutter}'
  bottom-sheet-grid-gap: '{space.space-md}'
  # content: generic slot
  bottom-sheet-slot-padding-y: '{space.space-md}'
  bottom-sheet-slot-padding-x: '{space.space-gutter}'
  bottom-sheet-slot-gap: '{space.space-md}'
  # grid menu item
  bottom-sheet-grid-item-background-enabled: '{colors.color-status-ghost-default}'
  bottom-sheet-grid-item-background-hover: '{colors.color-status-ghost-faint}'
  bottom-sheet-grid-item-background-pressed: '{colors.color-status-ghost-deep}'
  bottom-sheet-grid-item-radius-rounded: '{radius.radius-element-sm}'
  bottom-sheet-grid-item-radius-sharp: '{radius.radius-none}'
  bottom-sheet-grid-item-width: '{component-sizes.size-bottom-sheet-grid-item-width}'
  bottom-sheet-grid-item-padding: '{space.space-lg}'
  bottom-sheet-grid-item-gap: '{space.space-sm}'
  bottom-sheet-grid-item-icon-size: '{icon.icon-size-large}'
  bottom-sheet-grid-item-icon-foreground: '{colors.color-ink-high}'
  bottom-sheet-grid-item-icon-foreground-active: '{colors.color-ink-brand}'
  bottom-sheet-grid-item-icon-foreground-disabled: '{colors.color-ink-disabled}'
  bottom-sheet-grid-item-label-font: '{typography.type-label-medium}'
  bottom-sheet-grid-item-label-foreground: '{colors.color-ink-high}'
  bottom-sheet-grid-item-label-foreground-active: '{colors.color-ink-link}'
  bottom-sheet-grid-item-label-foreground-disabled: '{colors.color-ink-disabled}'
  bottom-sheet-grid-item-selection-width: '{stroke.stroke-thick}'
  bottom-sheet-grid-item-selection-color: '{colors.color-line-selection}'
---

# Bottom Sheet

> A surface anchored to the bottom edge of the screen that holds a short set of actions or supplementary content without taking a person off the view behind it.

## Anatomy
1. Container — a column, `--bottom-sheet-container-background`, with `--bottom-sheet-container-radius` on the top two corners only (the bottom two sit past the screen edge, which is what anchors it), and a `--bottom-sheet-container-border-width` border in `--bottom-sheet-container-border-color` (transparent, so the edge shows in forced colours, [patterns 6.10](../patterns/06-accessibility.md)). The parts stack with no gap, because each carries its own padding; `--bottom-sheet-container-padding-bottom` closes it off below the footer.
2. Handle (Sheet Handle) — the drag affordance along the top edge, full width, padded `--bottom-sheet-handle-padding-y` above and below and `--bottom-sheet-handle-padding-x` at the sides. The bar is `--bottom-sheet-handle-bar-width` × `--bottom-sheet-handle-bar-height`, `--bottom-sheet-handle-bar-background`, `--bottom-sheet-handle-bar-radius`. It declares nothing, so it is identical on every arrangement.
3. Header (_Sheet Header) — the sheet title in `--bottom-sheet-header-title-font` `--bottom-sheet-header-title-foreground`, wrapping rather than truncating, with an optional leading [Icon Button](../atoms/icon-button.md) before it. The title belongs to the header, not to the sheet. At full height (Height behaviour expandable) a close [Icon Button](../atoms/icon-button.md) (subtle, small, glyph `close`) appears at the header's trailing end.
4. Content region — the only part that changes with Content Type:
   - list: a run of [Menu Items](../molecules/menu-item.md), each with an icon and square corners.
   - grid: Grid Menu Items, three to a row.
   - generic: a slot that takes whatever the product supplies.
5. Footer — Card's footer ([Card](../molecules/card.md)) set to two actions: an outline [Button](../atoms/button.md) beside a primary one, both small, each filling an equal share of the row. Its padding and gap are Card's.

**Grid Menu Item** (one tile of the grid; it also replaces the old Tile Button):
1. Tile — the tappable square, background `--bottom-sheet-grid-item-background-enabled`, corner per Rounded. Its ground is the only thing that answers hover and press.
2. Indicator — an [Icon](../atoms/icon.md) at `--bottom-sheet-grid-item-icon-size`, `--bottom-sheet-grid-item-icon-foreground`, with an optional [Notification Indicator](../atoms/notification-indicator.md) (small, no number) over its top-right corner, inside the icon's own box. The glyph is fixed per tile, not a consumer input.
3. Label — the option's name under the icon, `--bottom-sheet-grid-item-label-font` `--bottom-sheet-grid-item-label-foreground`. The only text the tile holds.
4. Selection mark — on the active tile only, a `--bottom-sheet-grid-item-selection-width` border in `--bottom-sheet-grid-item-selection-color` inside the tile's corners, so the current choice shows by shape as well as colour ([patterns 6.11](../patterns/06-accessibility.md)). It sits inside the tile, the focus ring outside, so focus and selection look different.

## Variants
| Content Type | Content | Padding (V / H) | Item gap |
|---|---|---|---|
| list (default) | Menu Items, full width, square corners | `--bottom-sheet-list-padding-y` / `--bottom-sheet-list-padding-x` | `--bottom-sheet-list-gap` |
| grid | Grid Menu Items, three to a row, each an equal share | `--bottom-sheet-grid-padding-y` / `--bottom-sheet-grid-padding-x` | `--bottom-sheet-grid-gap` between rows and between tiles |
| generic | Content Slot, consumer owned | `--bottom-sheet-slot-padding-y` / `--bottom-sheet-slot-padding-x` | `--bottom-sheet-slot-gap` |

Moving between the three replaces the content region outright; the handle, header and footer are identical on all three.

| Height behaviour | Opens at | Beyond that |
|---|---|---|
| capped (default) | its content's height, up to about half the window | stops at that limit; the content region scrolls inside while the handle, header and footer stay put |
| expandable | its content's height, up to about half the window | pulling the handle up takes it to full height, where the header shows the close Icon Button; pulling down returns it to its opening height |

No token caps the height: the limit is a share of the window, not a size ([patterns 5.18](../patterns/05-sizes-devices.md), [5.19](../patterns/05-sizes-devices.md)).

Header alignment (a _Sheet Header option; Bottom Sheet always uses start):

| Alignment | Padding (V / H) | Icon–title gap | Layout |
|---|---|---|---|
| start (default) | `--bottom-sheet-header-padding-y-start` / `--bottom-sheet-header-padding-x` | `--bottom-sheet-header-gap-start` | icon leads, title reads from the left |
| center | `--bottom-sheet-header-padding-y-center` / `--bottom-sheet-header-padding-x` | `--bottom-sheet-header-gap-center` | title centred, icon moves after it |

Grid Menu Item, Rounded: true (default) → `--bottom-sheet-grid-item-radius-rounded`; false → `--bottom-sheet-grid-item-radius-sharp`. Nothing else differs. In the AAA modes the component is always sharp (DESIGN.md §5).

## States
The sheet itself has no interaction states: hover, press and focus belong to the rows, tiles and buttons inside it. Menu Item rows carry the Menu Item states, and the footer buttons the Button states.

Grid Menu Item:

| State | Ground | Icon | Label | Notes |
|---|---|---|---|---|
| default | `--bottom-sheet-grid-item-background-enabled` | `--bottom-sheet-grid-item-icon-foreground` | `--bottom-sheet-grid-item-label-foreground` | resting tile |
| hover | `--bottom-sheet-grid-item-background-hover` | unchanged | unchanged | pointer devices only |
| pressed | `--bottom-sheet-grid-item-background-pressed` | unchanged | unchanged | reports contact, does not persist |
| focused | unchanged | unchanged | unchanged | `--button-focus-ring-width` `--button-focus-ring-color` ring, the shared Button ring (the spec defines none of its own) |
| active | unchanged, plus the selection mark | `--bottom-sheet-grid-item-icon-foreground-active` | `--bottom-sheet-grid-item-label-foreground-active` | the option a person is on now |
| disabled | unchanged | `--bottom-sheet-grid-item-icon-foreground-disabled` | `--bottom-sheet-grid-item-label-foreground-disabled` | temporarily unavailable; stays focusable and says why |

Active and disabled are drawn at the default state only, so hover and press don't combine with them. No transition is defined: neither the sheet's arrival and exit nor a tile's state change animates in the spec, so entry motion belongs to the screen presenting the sheet. No shadow and no [Scrim](../atoms/scrim.md) sit on the sheet; whatever separates it from the content behind comes from that screen, usually a Scrim.

## Spacing & Sizing
| Part | Size | Padding | Gap |
|---|---|---|---|
| Container | `--bottom-sheet-container-width` wide, hugs its height | bottom `--bottom-sheet-container-padding-bottom` | none |
| Handle | full width | `--bottom-sheet-handle-padding-y` / `--bottom-sheet-handle-padding-x` | — |
| Handle bar | `--bottom-sheet-handle-bar-width` × `--bottom-sheet-handle-bar-height` | — | — |
| Header | full width | per alignment (see Variants) | per alignment |
| Content | full width | per Content Type | per Content Type |
| Grid Menu Item | `--bottom-sheet-grid-item-width` square on its own; an equal third of the row inside a sheet | `--bottom-sheet-grid-item-padding` on all sides | `--bottom-sheet-grid-item-gap` icon to label |

The sheet is drawn at `--bottom-sheet-container-width` (a phone width); on a wider screen it spans no more than that, and on a narrower one it fills the width. Height hugs the handle, header, content and footer up to the limit set by Height behaviour (see Variants).

A Grid Menu Item stacks icon above label, centred on both axes. Its width is fixed, so a long label wraps, and the row aligns to its tallest tile.

## Properties
| Property | Options | Default |
|---|---|---|
| Content Type | list, grid, generic | list |
| Height behaviour | capped, expandable | capped |
| Content Slot | any content (generic only) | — |

The header title and its optional leading icon are set on the header part, not passed in from the sheet. The handle declares nothing. The item count is the product's decision (Figma draws six).

Grid Menu Item:

| Property | Options | Default |
|---|---|---|
| State | default, hover, pressed | default |
| Active | on / off | off |
| Disabled | on / off | off |
| Rounded | on / off | on |
| Label | text | "Label" |
| Show Badge | on / off | off |

Hover and pressed are driven by interaction, never set on a static layout.

## Usage
- Pick Content Type by how a person reads the options: list for reading down a set of labels, grid for recognising options by their icon.
- Use generic when the content isn't a set of options at all. It's the only arrangement that takes a slot, and nothing is laid out for you beyond the padding.
- Keep grid labels to a word or two: one label that wraps makes every tile in its row taller.
- Use Show Badge for something that needs attention, not for a count; the dot carries no number.
- Use expandable when the content can run past half the window and people need to see more of it at once; capped for a short set of options.
- A sheet is for short, contextual choices on compact screens, never a flow of several screens ([patterns 1.115](../patterns/01-screen-composition.md)).
- A grid of Grid Menu Items at their own `--bottom-sheet-grid-item-width` square also serves the launch grids and dashboards the old Tile Button covered (scan, receive, print). The Tile Button's Button flavours are gone; a tile is always ghost.
- Grey a tile (disabled) only when it is temporarily unavailable, and show the reason. Leave out a tile the person's role can never use ([patterns 2.80](../patterns/02-navigation-flow.md), [1.70](../patterns/01-screen-composition.md)).
- Don't try to set the title through the sheet; the header owns it.

## Accessibility
- A bottom sheet arrives over what a person was reading, so the screen presenting it announces it (a dialog with the header title as its accessible name) and follows the overlay focus rules ([patterns 6.28](../patterns/06-accessibility.md), [6.29](../patterns/06-accessibility.md)). Nothing in the component does that on its own.
- The handle is a visual affordance with no label and no focusable control. Dismissing must be reachable another way: the footer actions, the close Icon Button at full height, a Scrim tap, Escape and the system Back, which closes the sheet ([patterns 2.17](../patterns/02-navigation-flow.md), [2.18](../patterns/02-navigation-flow.md)). An expandable sheet also expands when its content is scrolled, so no drag is ever needed.
- The header title is the sheet's accessible name: write it as a short noun phrase that makes sense out of context.
- Grid Menu Item active shows by the selection mark as well as colour; announce it as state (`aria-pressed` or `aria-current`). A disabled tile stays focusable with `aria-disabled="true"` and gives its reason on focus and in its description ([patterns 6.34](../patterns/06-accessibility.md)).
- The icon carries no text, so the label has to name the option. The badge has no number or label; say what it reports in words (for example in the tile's accessible name) wherever it matters.
- The tile and the list rows sit well above `--button-touch-target-size-minimum`. Focus uses the Button ring, `--button-focus-ring-width` `--button-focus-ring-color`.

## Claude Prompt
Draw a white sheet (`--bottom-sheet-container-background`) anchored to the bottom of a phone screen, `--bottom-sheet-container-width` wide, with `--bottom-sheet-container-radius` rounded top corners and square bottom corners, over a dimmed page. Centred at the top is a light grey (`--bottom-sheet-handle-bar-background`) pill handle, `--bottom-sheet-handle-bar-width` wide and `--bottom-sheet-handle-bar-height` tall, with `--bottom-sheet-handle-padding-y` above and below it. Below sits a left-aligned title in `--bottom-sheet-header-title-font`, near-black (`--bottom-sheet-header-title-foreground`). The content is either a column of full-width menu rows, each a small icon and a label with square corners, or a grid of three tiles to a row, `--bottom-sheet-grid-gap` apart, each tile a large `--bottom-sheet-grid-item-icon-size` icon above a short `--bottom-sheet-grid-item-label-font` label with no border or fill; the active tile has a blue icon (`--bottom-sheet-grid-item-icon-foreground-active`), blue label (`--bottom-sheet-grid-item-label-foreground-active`) and a thick `--bottom-sheet-grid-item-selection-color` border inside its corners, and one tile may carry a small red dot on its icon. The sheet ends with two equal-width small buttons side by side, an outline button on the left and a solid blue primary button on the right, with `--bottom-sheet-container-padding-bottom` beneath them.
