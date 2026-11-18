---
name: List Item
level: molecule
status: draft
composes: [../atoms/icon.md, ../atoms/avatar.md, ../atoms/checkbox.md, ../atoms/radio-button.md, ../atoms/switch.md, ../atoms/status-label.md, ../atoms/divider.md]
tokens:
  # container
  list-item-container-background-enabled: '{colors.color-status-ghost-default}'
  list-item-container-background-hover: '{colors.color-status-ghost-faint}'
  list-item-container-background-pressed: '{colors.color-status-ghost-deep}'
  list-item-container-background-selected: '{colors.color-status-ghost-tint}'
  list-item-container-background-disabled: '{colors.color-status-ghost-default}'
  list-item-container-transition: '{motion.motion-feedback}'
  # selected: shape as well as tint
  list-item-selected-indicator-width: '{stroke.stroke-thick}'
  list-item-selected-indicator-color: '{colors.color-line-selection}'
  # text
  list-item-label-font: '{typography.type-body-medium}'
  list-item-label-foreground: '{colors.color-ink-high}'
  list-item-label-foreground-disabled: '{colors.color-ink-disabled}'
  list-item-supporting-font: '{typography.type-body-small}'
  list-item-supporting-foreground: '{colors.color-ink-medium}'
  list-item-supporting-foreground-disabled: '{colors.color-ink-disabled}'
  list-item-value-font: '{typography.type-body-small}'
  list-item-value-foreground: '{colors.color-ink-medium}'
  # leading and trailing icons
  list-item-icon-size: '{icon.icon-size-medium}'
  list-item-icon-foreground: '{colors.color-ink-high}'
  list-item-icon-foreground-disabled: '{colors.color-ink-disabled}'
  # focus
  list-item-focus-ring-width: '{stroke.stroke-thick}'
  list-item-focus-ring-color: '{colors.color-line-focus}'
  # shape
  list-item-container-radius-sharp: '{radius.radius-none}'
  list-item-container-radius-rounded: '{radius.radius-element-sm}'
  # sizes (heights are minimums: text wraps and grows the row)
  list-item-container-min-height-one-line: '{control.control-target-min}'
  list-item-container-min-height-two-line: '{primitives.scale-17}'
  list-item-container-min-height-three-line: '{primitives.scale-18}'
  list-item-container-padding-y: '{space.space-sm}'
  list-item-container-padding-x: '{space.space-lg}'
  list-item-container-gap: '{space.space-md}'
  list-item-text-gap: '{space.space-3xs}'
  list-item-trailing-gap: '{space.space-xs}'
  list-item-selection-control-size: '{control.control-target-min}'
  list-item-touch-target-size-minimum: '{control.control-target-min}'
---

# List Item

> A generic row in a list: something to show what it is, a label with up to three lines of supporting text, and one trailing value, status or control, with the whole row as one target.

## Anatomy
1. Row — a horizontal frame that fills the list's width, at least `--list-item-container-min-height-one-line` tall, padded `--list-item-container-padding-y` / `--list-item-container-padding-x`. Its slots sit `--list-item-container-gap` apart. Three slots, nothing in between ([patterns 1.19](../patterns/01-screen-composition.md), [patterns 10.31](../patterns/10-data-display.md)):
2. Leading slot (optional) — shows what kind of thing it is: an [Icon](../atoms/icon.md) at `--list-item-icon-size`, an [Avatar](../atoms/avatar.md) (small), an image, or a selection control ([Checkbox](../atoms/checkbox.md) or [Radio Button](../atoms/radio-button.md), medium, no label, in a `--list-item-selection-control-size` target).
3. Middle slot — says which one it is:
   1. Label — `--list-item-label-font` `--list-item-label-foreground`. Product copy wraps; a name someone created may truncate in the middle, with the full text on hover and focus ([patterns 5.30](../patterns/05-sizes-devices.md)).
   2. Supporting text (optional) — one to three lines under the label, `--list-item-text-gap` below it, in `--list-item-supporting-font` `--list-item-supporting-foreground`. It wraps up to its line count, then truncates with the rest on the item's detail ([patterns 10.32](../patterns/10-data-display.md), [patterns 10.33](../patterns/10-data-display.md)).
4. Trailing slot (optional) — one of: a short value (a count, a time) in `--list-item-value-font` `--list-item-value-foreground`; a [Status Label](../atoms/status-label.md); a [Switch](../atoms/switch.md); a selection control, only in a product that puts them at the trailing end (see below); or an Icon (`chevron_right` for "opens a level deeper", `info` for "shows more about this item", never both) ([patterns 10.34](../patterns/10-data-display.md)). A value and a chevron may pair, `--list-item-trailing-gap` apart.
5. Divider (list level, optional) — a [Divider](../atoms/divider.md) under every row but the last, only where space between rows isn't enough ([patterns 10.35](../patterns/10-data-display.md)).

## Variants
**Lines** sets the minimum height; text that wraps further grows the row.

| Lines | Min height | Middle slot |
|---|---|---|
| one (default) | `--list-item-container-min-height-one-line` | label |
| two | `--list-item-container-min-height-two-line` | label + one line of supporting text |
| three | `--list-item-container-min-height-three-line` | label + two or three lines of supporting text; the leading and trailing slots align to the top |

**Action** decides what the row does when pressed:

| Action | The row | Separate targets |
|---|---|---|
| open (default) | one button or link that opens the item | a trailing Switch or action control, after the row in focus order |
| select | one label for its selection control: pressing anywhere toggles it | none |
| toggle | one label for its trailing Switch: pressing anywhere toggles it | none |
| static | not interactive; read-only content | any trailing control |

Selection controls sit at the same end in every list of the product (leading by default) ([patterns 10.31](../patterns/10-data-display.md)). Never mix the two ends. The two-line and three-line minimum heights are draft placeholders on the closest scale steps, to be confirmed in Figma.

**Shape**: rounded (default) → `--list-item-container-radius-rounded`; sharp → `--list-item-container-radius-sharp`. Match the list's container. In the AAA modes the component is always sharp (DESIGN.md §5).

## States
| State | Background | Text and icons | Notes |
|---|---|---|---|
| enabled | `--list-item-container-background-enabled` | `--list-item-label-foreground`, `--list-item-supporting-foreground`, `--list-item-icon-foreground` | transparent |
| hover | `--list-item-container-background-hover` | unchanged | pointer devices only; open, select and toggle rows |
| pressed | `--list-item-container-background-pressed` | unchanged | over `--list-item-container-transition` |
| selected | `--list-item-container-background-selected` | unchanged | plus a `--list-item-selected-indicator-width` `--list-item-selected-indicator-color` bar on the leading edge, so selection shows by shape too; the selection control shows it as well |
| focus | unchanged | unchanged | `--list-item-focus-ring-width` `--list-item-focus-ring-color` ring inside the row's edges |
| disabled | `--list-item-container-background-disabled` | `--list-item-label-foreground-disabled`, `--list-item-supporting-foreground-disabled`, `--list-item-icon-foreground-disabled` | stays focusable (`aria-disabled`) with the reason in its supporting text |

Hover and pressed tints change over `--list-item-container-transition`; selection and focus are instant. Focus and selection always look different ([patterns 3.70](../patterns/03-controls-interaction.md)).

## Spacing & Sizing
| Property | Value |
|---|---|
| Min height | `--list-item-container-min-height-one-line` / `--list-item-container-min-height-two-line` / `--list-item-container-min-height-three-line` |
| Padding (V / H) | `--list-item-container-padding-y` / `--list-item-container-padding-x` |
| Slot gap | `--list-item-container-gap` |
| Label ↔ supporting text | `--list-item-text-gap` |
| Trailing value ↔ chevron | `--list-item-trailing-gap` |
| Leading icon | `--list-item-icon-size` |
| Selection control | `--list-item-selection-control-size`, including its target |
| Radius | `--list-item-container-radius-rounded` / `--list-item-container-radius-sharp` |

Width fills the list; the middle slot takes what the leading and trailing slots leave. Every height is a minimum, so a larger text size grows the row rather than clipping it. Every interactive row meets `--list-item-touch-target-size-minimum`.

## Properties
| Property | Options | Default |
|---|---|---|
| Lines | one, two, three | one |
| Action | open, select, toggle, static | open |
| Leading | none, icon, avatar, image, checkbox, radio | none |
| Trailing | none, value, status, switch, checkbox, radio, chevron, info | none |
| State | enabled, selected, disabled | enabled |
| Shape | rounded, sharp | rounded |
| Divided (list) | on / off | off |
| Label, supporting text, value | text | — |

Hover, pressed and focus are driven by interaction, never set on a static layout. Divided is set on the list, not the row.

## Usage
- Use List Item for any collection of rows that aren't a menu: settings, devices, people, tasks. [Menu Item](./menu-item.md) stays for menus and Select.
- Specialised rows build on the same anatomy for one job: [Chat List Item](./chat-list-item.md), [Contact List Item](./contact-list-item.md), [Notification Item](./notification-item.md) and [Task List](./task-list.md). Use one of those where it fits, List Item for everything else.
- Keep each slot in the same position on every row of a list ([patterns 10.32](../patterns/10-data-display.md), [patterns 1.20](../patterns/01-screen-composition.md)).
- Put one thing in the trailing slot. More actions go on the item's own page or in its menu.
- Keep list text short; long content belongs in the detail ([patterns 10.33](../patterns/10-data-display.md)).
- Group long lists under headings, with extra space between groups. Separate rows by space; add dividers only when space isn't enough ([patterns 10.35](../patterns/10-data-display.md)).
- A row whose only job is a setting is a toggle row: the whole row flips the Switch.
- Don't put a chevron and an info control on the same row ([patterns 10.34](../patterns/10-data-display.md)).

## Accessibility
- The row is reached and read as one unit with one main action; any separate trailing control is its own stop after it ([patterns 6.36](../patterns/06-accessibility.md)).
- Open rows are a `button` or a link whose name is the label; the supporting text is its description. Select and toggle rows wrap the control in its `label`, so the whole row is the hit area and the control keeps its own role and state.
- In a selectable list set `aria-selected` or the control's checked state; the tint and edge bar are only the visual.
- A truncated name shows its full text on hover and on focus, and the accessible name is always the full text.
- Disabled rows stay focusable with `aria-disabled="true"` and say why in their supporting text ([patterns 6.34](../patterns/06-accessibility.md)).
- A status in the trailing slot uses a Status Label, which carries an icon and words, never colour alone.
- Decorative leading icons are hidden from assistive tech; an avatar or image that identifies the item has a text alternative.

## Claude Prompt
Draw a list of rows that fill their container, each at least `--list-item-container-min-height-two-line` tall with `--list-item-container-padding-x` side padding and `--list-item-container-gap` between slots. Each row: a `--list-item-icon-size` near-black printer icon at the left, then a near-black `--list-item-label-font` label "Printer ZT411 Dock 3" with a grey `--list-item-supporting-font` line "Ready · Last printed 10:42" under it, and at the right a grey value "12 jobs" followed by a chevron. Rows have no background at rest, a faint grey wash on hover (`--list-item-container-background-hover`) and, when selected, a pale tint (`--list-item-container-background-selected`) with a `--list-item-selected-indicator-width` blue bar on the leading edge. Keyboard focus draws a `--list-item-focus-ring-width` blue ring inside the row. Show one settings row ending in a Switch and one row with a leading checkbox.
