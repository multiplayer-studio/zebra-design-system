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
  # handle
  bottom-sheet-handle-padding-y: '{space.space-lg}'
  bottom-sheet-handle-padding-x: '{space.space-xl}'
  bottom-sheet-handle-bar-width: '{control.control-target-min}'
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
---

# Bottom Sheet

> A surface anchored to the bottom edge of the screen that holds a short set of actions or supplementary content without taking a person off the view behind it.

## Anatomy
1. Container — a column, `--bottom-sheet-container-background`, with `--bottom-sheet-container-radius` on the top two corners only (the bottom two sit past the screen edge, which is what anchors it). The parts stack with no gap, because each carries its own padding; `--bottom-sheet-container-padding-bottom` closes it off below the footer.
2. Handle (Sheet Handle) — the drag affordance along the top edge, full width, padded `--bottom-sheet-handle-padding-y` above and below and `--bottom-sheet-handle-padding-x` at the sides. The bar is `--bottom-sheet-handle-bar-width` × `--bottom-sheet-handle-bar-height`, `--bottom-sheet-handle-bar-background`, `--bottom-sheet-handle-bar-radius`. It declares nothing, so it is identical on every arrangement.
3. Header (_Sheet Header) — the sheet title in `--bottom-sheet-header-title-font` `--bottom-sheet-header-title-foreground`, with an optional leading [Icon Button](../atoms/icon-button.md) before it. The title belongs to the header, not to the sheet.
4. Content region — the only part that changes with Content Type:
   - list: a run of [Menu Items](../molecules/menu-item.md), each with an icon and square corners.
   - grid: Grid Menu Items, three to a row.
   - generic: a slot that takes whatever the product supplies.
5. Footer — Card's footer ([Card](../molecules/card.md)) set to two actions: an outline [Button](../atoms/button.md) beside a primary one, both small, each filling an equal share of the row. Its padding and gap are Card's.

**Grid Menu Item** (one tile of the grid; it also replaces the old Tile Button):
1. Tile — the tappable square, background `--bottom-sheet-grid-item-background-enabled`, corner per Rounded. Its ground is the only thing that answers hover and press.
2. Indicator — an [Icon](../atoms/icon.md) at `--bottom-sheet-grid-item-icon-size`, `--bottom-sheet-grid-item-icon-foreground`, with an optional [Notification Indicator](../atoms/notification-indicator.md) (small, no number) over its top-right corner, inside the icon's own box. The glyph is fixed per tile, not a consumer input.
3. Label — the option's name under the icon, `--bottom-sheet-grid-item-label-font` `--bottom-sheet-grid-item-label-foreground`. The only text the tile holds.

## Variants
| Content Type | Content | Padding (V / H) | Item gap |
|---|---|---|---|
| list (default) | Menu Items, full width, square corners | `--bottom-sheet-list-padding-y` / `--bottom-sheet-list-padding-x` | `--bottom-sheet-list-gap` |
| grid | Grid Menu Items, three to a row, each an equal share | `--bottom-sheet-grid-padding-y` / `--bottom-sheet-grid-padding-x` | `--bottom-sheet-grid-gap` between rows and between tiles |
| generic | Content Slot, consumer owned | `--bottom-sheet-slot-padding-y` / `--bottom-sheet-slot-padding-x` | `--bottom-sheet-slot-gap` |

Moving between the three replaces the content region outright; the handle, header and footer are identical on all three.

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
| active | unchanged | `--bottom-sheet-grid-item-icon-foreground-active` | `--bottom-sheet-grid-item-label-foreground-active` | the option a person is on now |
| disabled | unchanged | `--bottom-sheet-grid-item-icon-foreground-disabled` | `--bottom-sheet-grid-item-label-foreground-disabled` | not interactive |

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

The sheet is drawn at `--bottom-sheet-container-width` (a phone width); on a wider screen it spans no more than that, and on a narrower one it fills the width. Height hugs the handle, header, content and footer, and nothing in the component caps it, so a long run of items has to be limited (and scrolled) by the screen that presents it.

A Grid Menu Item stacks icon above label, centred on both axes. Its width is fixed, so a long label wraps, and the row aligns to its tallest tile.

## Properties
| Property | Options | Default |
|---|---|---|
| Content Type | list, grid, generic | list |
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
- Don't rely on Active to stand out on its own; it recolours the icon and label and leaves the ground alone, so pair it with whatever else marks the current choice.
- A grid of Grid Menu Items at their own `--bottom-sheet-grid-item-width` square also serves the launch grids and dashboards the old Tile Button covered (scan, receive, print). The Tile Button's Button flavours are gone; a tile is always ghost.
- Disabled tiles are greyed, not hidden.
- Don't try to set the title through the sheet; the header owns it.
- Don't rely on the sheet to cap its height; the presenting screen limits it.

## Accessibility
- A bottom sheet arrives over what a person was reading, so the screen presenting it has to announce it (a dialog with the header title as its accessible name) and move focus into it. Nothing in the component does that on its own.
- The handle is a visual affordance with no label and no focusable control. Dismissing must be reachable another way: through the footer actions, which are the dependable way out on every arrangement, a Scrim tap or Escape supplied by the screen.
- The header title is the sheet's accessible name: write it as a short noun phrase that makes sense out of context.
- Grid Menu Item active and disabled are carried by colour alone, with no change of ground or shape. Announce active as state (`aria-pressed` or `aria-current`) and take a disabled tile out of the tab order rather than only dimming it.
- The icon carries no text, so the label has to name the option. The badge has no number or label; say what it reports in words (for example in the tile's accessible name) wherever it matters.
- The tile and the list rows sit well above `--button-touch-target-size-minimum`. Focus uses the Button ring, `--button-focus-ring-width` `--button-focus-ring-color`.

## Claude Prompt
Draw a white sheet (`--bottom-sheet-container-background`) anchored to the bottom of a phone screen, `--bottom-sheet-container-width` wide, with `--bottom-sheet-container-radius` rounded top corners and square bottom corners, over a dimmed page. Centred at the top is a light grey (`--bottom-sheet-handle-bar-background`) pill handle, `--bottom-sheet-handle-bar-width` wide and `--bottom-sheet-handle-bar-height` tall, with `--bottom-sheet-handle-padding-y` above and below it. Below sits a left-aligned title in `--bottom-sheet-header-title-font`, near-black (`--bottom-sheet-header-title-foreground`). The content is either a column of full-width menu rows, each a small icon and a label with square corners, or a grid of three tiles to a row, `--bottom-sheet-grid-gap` apart, each tile a large `--bottom-sheet-grid-item-icon-size` icon above a short `--bottom-sheet-grid-item-label-font` label with no border or fill; the active tile has a blue icon (`--bottom-sheet-grid-item-icon-foreground-active`) and blue label (`--bottom-sheet-grid-item-label-foreground-active`), and one tile may carry a small red dot on its icon. The sheet ends with two equal-width small buttons side by side, an outline button on the left and a solid blue primary button on the right, with `--bottom-sheet-container-padding-bottom` beneath them.
