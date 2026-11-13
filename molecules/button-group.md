---
name: Button Group
level: molecule
status: stable
composes: [../atoms/button.md, ../atoms/divider.md, ../atoms/icon.md]
tokens:
  # container
  button-group-container-background: '{colors.color-fill-default}'
  button-group-container-border-color: '{colors.color-line-default}'
  button-group-container-border-width: '{stroke.stroke-thin}'
  button-group-container-gap: '{space.space-none}'
  button-group-container-padding: '{space.space-none}'
  # shape
  button-group-container-radius-sharp: '{radius.radius-none}'
  button-group-container-radius-rounded: '{radius.radius-sm}'
  # divider
  button-group-divider-color: '{colors.color-line-default}'
  button-group-divider-width: '{stroke.stroke-thin}'
---

# Button Group

> A row of peer actions on one bordered surface, each a subtle Button, separated by dividers.

## Anatomy
1. Group — horizontal row hugging its items, and the only part with a fill (`--button-group-container-background`) and an outline (`--button-group-container-border-width` `--button-group-container-border-color`, drawn inside so it adds no size). Items butt against each other (`--button-group-container-gap`, `--button-group-container-padding`).
2. Item — a [Button](../atoms/button.md) at the subtle flavour and sharp shape (`--button-container-radius-sharp`), with its size set by the group. It has no fill at rest, so the group's surface shows through.
3. Divider — a vertical [Divider](../atoms/divider.md) (`--button-group-divider-width` `--button-group-divider-color`) at the trailing edge of every item except the last, which leaves the group a clean edge.
4. Leading and trailing icons — the item Button's own [Icon](../atoms/icon.md) slots, both on by default with placeholder glyphs (`verified` leading, `expand_more` trailing). Swap or turn them off per action; keep `expand_more` on an item that opens a menu.

A group holds at least two actions; there is no upper limit, but keep it to a handful.

## Variants
There is one flavour. Every item is the subtle Button on the group's surface:

| Part | Enabled | Hover | Pressed |
|---|---|---|---|
| Group background | `--button-group-container-background` | unchanged | unchanged |
| Item background | `--button-subtle-container-background-enabled` | `--button-subtle-container-background-hover` | `--button-subtle-container-background-pressed` |
| Item label / icon | `--button-subtle-label-foreground` | unchanged | unchanged |

Shape applies to the group's outline only: rounded (default) → `--button-group-container-radius-rounded`; sharp → `--button-group-container-radius-sharp`. Figma defaults to sharp; the system default is rounded. In the AAA modes the component is always sharp (DESIGN.md §5). The items stay square inside a rounded group; the group clips them, so their hover and pressed tints follow its corners.

## States
The group has no state of its own. Each item carries the Button states:

| State | Item | Notes |
|---|---|---|
| enabled | subtle Button at rest | |
| hover | `--button-subtle-container-background-hover` | pointer devices only |
| pressed | `--button-subtle-container-background-pressed` | |
| focused | `--button-focus-ring-width` `--button-focus-ring-color` ring | drawn inside the item, so the group's outline doesn't clip it |

Every change is a tint over `--button-container-transition`. The group defines no disabled item; a disabled item is the [Button](../atoms/button.md)'s own disabled state. Nothing marks an item as chosen; for a persistent selection use [Segmented Control](./segmented-control.md).

## Spacing & Sizing
| Size | Height | Padding (V / H) | Font | Icon |
|---|---|---|---|---|
| small | `--button-container-height-small` | `--button-container-padding-y` / `--button-container-padding-x-small` | `--button-label-font-small` | `--button-icon-size-small` |
| medium (default) | `--button-container-height-medium` | `--button-container-padding-y` / `--button-container-padding-x-medium` | `--button-label-font-medium` | `--button-icon-size-medium` |
| large | `--button-container-height-large` | `--button-container-padding-y` / `--button-container-padding-x-large` | `--button-label-font-large` | `--button-icon-size-large` |

Size is set on the group and every item inherits it; never set it per item. Height is fixed per size and the outline sits inside it. Width hugs the items, and each item hugs its label and icons.

## Properties
| Property | Options | Default |
|---|---|---|
| Size | small, medium, large | medium |
| Shape | sharp, rounded | rounded |
| Items | two or more subtle Buttons | — |
| Item label | text (a verb phrase) | — |
| Item leading icon | on / off, any icon | on (`verified`, a placeholder) |
| Item trailing icon | on / off, any icon (`expand_more` for a menu) | on (`expand_more`, a placeholder) |

Flavour and shape of the items are fixed by the group. Hover, pressed and focus are driven by interaction.

## Usage
- Use it where several actions are peers. If one action is clearly the main one, use a single [Button](../atoms/button.md) instead.
- Only the subtle Button belongs inside; another flavour breaks the single surface the group is built on.
- Don't expect Shape to round the items. It rounds the group's outline only.
- Use a trailing `expand_more` icon on an item that opens a [Dropdown Menu](./dropdown-menu.md).
- Keep labels short and parallel; icon-only items are fine when every icon is unambiguous.
- Small (`--button-container-height-small`) is below `--button-touch-target-size-minimum`; prefer medium or large on touch UIs.

## Accessibility
- Give the group `role="group"` and an accessible name that says what the actions have in common.
- Each item is a real button in the tab order. Its focus ring (`--button-focus-ring-width` `--button-focus-ring-color`) is the only focus indication; the group itself has none.
- Items are told apart only by the divider (`--button-group-divider-width`). Where `--button-group-container-background` is close to the surface behind it, the outline does all the work of bounding the group.
- Icon-only items need an `aria-label`. Icons beside a label are decorative (`aria-hidden`), so they aren't read twice.
- Nothing marks an action as current. If the row needs a selected state, it's a [Segmented Control](./segmented-control.md), not a button group.

## Stitch Prompt
Draw a horizontal row of three joined actions, `--button-container-height-medium` tall, on a single white surface (`--button-group-container-background`) with a thin light grey outline (`--button-group-container-border-width` `--button-group-container-border-color`) and softly rounded outer corners (`--button-group-container-radius-rounded`). Each action is a transparent subtle button with near-black `--button-label-font-medium` text (`--button-subtle-label-foreground`), `--button-container-padding-x-medium` horizontal padding and an optional `--button-icon-size-medium` leading icon; a 1px vertical divider (`--button-group-divider-color`) separates neighbours, with none after the last. Hovering an action tints it faint grey (`--button-subtle-container-background-hover`). A sharp version squares the outer outline (`--button-group-container-radius-sharp`); the items inside stay square either way.
