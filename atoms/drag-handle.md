---
name: Drag Handle
level: atom
status: draft
composes: [../atoms/icon.md]
tokens:
  # container
  drag-handle-container-background-enabled: '{colors.color-status-ghost-default}'
  drag-handle-container-background-hover: '{colors.color-status-ghost-faint}'
  drag-handle-container-background-pressed: '{colors.color-status-ghost-deep}'
  drag-handle-container-radius-rounded: '{radius.radius-element-sm}'
  drag-handle-container-radius-sharp: '{radius.radius-none}'
  # icon
  drag-handle-icon-size: '{icon.icon-size-medium}'
  drag-handle-icon-foreground: '{colors.color-ink-medium}'
  drag-handle-icon-foreground-hover: '{colors.color-ink-high}'
  drag-handle-icon-foreground-disabled: '{colors.color-ink-disabled}'
  # focus
  drag-handle-focus-ring-width: '{stroke.stroke-thick}'
  drag-handle-focus-ring-color: '{colors.color-line-focus}'
  # sizes
  drag-handle-container-width: '{control.control-target-min}'
  drag-handle-container-min-height: '{control.control-target-min}'
  # motion
  drag-handle-container-transition: '{motion.motion-feedback}'
---

# Drag Handle

> The grip on a reorderable item: drag it to move the item, or use it from the keyboard or its menu to move the item without dragging.

## Anatomy
1. Container — a `--drag-handle-container-width` wide box at least `--drag-handle-container-min-height` tall, with no fill at rest. It is the touch target and the space around the grip. In code it is a button.
2. Grip — an [Icon](../atoms/icon.md) `reorder` (six dots) at `--drag-handle-icon-size` in `--drag-handle-icon-foreground`, centred. It never uses a menu or list glyph, so it can't be mistaken for one ([patterns 3.103](../patterns/03-controls-interaction.md)).

The handle sits at the leading edge of the item it moves, vertically centred on the item's first line.

## Variants
None. Shape: rounded (default) → `--drag-handle-container-radius-rounded` on the hover and pressed tint; sharp → `--drag-handle-container-radius-sharp`. In the AAA modes the component is always sharp (DESIGN.md §5).

## States
| State | Container | Grip | Cursor |
|---|---|---|---|
| enabled | `--drag-handle-container-background-enabled` | `--drag-handle-icon-foreground` | grab |
| hover | `--drag-handle-container-background-hover` | `--drag-handle-icon-foreground-hover` | grab |
| pressed (grabbed) | `--drag-handle-container-background-pressed` | `--drag-handle-icon-foreground-hover` | grabbing |
| focused | `--drag-handle-focus-ring-width` `--drag-handle-focus-ring-color` ring outside the container | unchanged | — |
| disabled | `--drag-handle-container-background-enabled` | `--drag-handle-icon-foreground-disabled` | not-allowed |

Tints change over `--drag-handle-container-transition`. Grabbed lasts from press until drop, by pointer or keyboard. The item itself lifts and other items move aside; that motion belongs to the list, not the handle ([patterns 3.104](../patterns/03-controls-interaction.md), [DESIGN.md §5 Elevation](../DESIGN.md)). Under reduced motion the item moves without sliding.

Disabled is for a list that can't be reordered right now (it is sorted by a column, say): the handle stays focusable (`aria-disabled`) and says why.

## Spacing & Sizing
| Property | Token |
|---|---|
| Width | `--drag-handle-container-width` |
| Min height | `--drag-handle-container-min-height` |
| Grip | `--drag-handle-icon-size` |

The size meets the touch minimum, and keeps space around the grip on touch ([patterns 3.103](../patterns/03-controls-interaction.md)). These measurements are draft placeholders from the nearest existing steps; confirm them in Figma.

## Properties
| Property | Options | Default |
|---|---|---|
| Shape | rounded, sharp | rounded |
| Disabled | on / off | off |
| Disabled reason | text | — |

## Usage
- Use it on items a person reorders by hand: a route's stops, a priority list, columns in a table's settings.
- A drag starts at once from the handle. Without a handle, an item drags only where long press isn't already used for selection ([patterns 3.103](../patterns/03-controls-interaction.md), [3.76](../patterns/03-controls-interaction.md)).
- Every move has a way without dragging: the item's menu offers Move up, Move down, Move to top and Move to bottom (or "Move to…"), and the keyboard moves it from the handle ([patterns 3.102](../patterns/03-controls-interaction.md), [6.83](../patterns/06-accessibility.md)). A keyboard route alone isn't enough.
- A drop can be undone ([patterns 3.104](../patterns/03-controls-interaction.md)). A long list scrolls when the item nears its edge ([patterns 3.105](../patterns/03-controls-interaction.md)).

## Accessibility
- It is a button named for the item ("Reorder Stop 3"), with the move actions also exposed as named actions to assistive technology ([patterns 6.84](../patterns/06-accessibility.md)).
- Keyboard: Space or Enter picks the item up, the arrow keys move it, Space or Enter drops it and Escape puts it back. Each move is announced politely ("Stop 3 moved to position 2 of 6").
- It shows `--drag-handle-focus-ring-width` `--drag-handle-focus-ring-color` when focused, and keeps focus on the moved item after the drop.

## Claude Prompt
Draw a Zebra drag handle: a grey six-dot grip icon (`reorder`, `--drag-handle-icon-size`, `--drag-handle-icon-foreground`) centred in a borderless `--drag-handle-container-width` square at the leading edge of a list row. On hover a faint grey tint (`--drag-handle-container-background-hover`) appears behind it and the grip darkens; while the row is being dragged the tint deepens (`--drag-handle-container-background-pressed`).
