---
name: Button Group
level: molecule
status: stable
composes: [../atoms/button.md, ../atoms/icon.md]
tokens:
  # default
  button-group-item-background-enabled: '{colors.surface-default}'
  button-group-label-foreground: '{colors.main-default}'
  button-group-item-border-color: '{colors.border-subtle}'
  # inverse
  button-group-inverse-item-background-enabled: '{colors.state-inverse-enabled}'
  button-group-inverse-item-background-hover: '{colors.state-inverse-hover}'
  button-group-inverse-item-background-pressed: '{colors.state-inverse-selected}'
  button-group-inverse-item-background-focused: '{colors.state-inverse-focus}'
  button-group-inverse-label-foreground: '{colors.main-inverse}'
  button-group-inverse-item-border-color: '{colors.border-subtle}'
  # shared
  button-group-item-border-width: '{border.border-size-small}'
  # sizes
  button-group-item-height-medium: '{spacing.spacing-7xl}'
  button-group-item-height-large: '{dimensions.dim-button-group-item-height-large}'
  button-group-item-padding-medium: '{spacing.spacing-medium}'
  button-group-item-padding-large: '{spacing.spacing-large}'
  button-group-item-gap: '{spacing.spacing-minimum}'
  button-group-label-font: '{typography.label-medium}'
  button-group-container-gap: '{spacing.spacing-none}'
  # shape
  button-group-item-radius-inner: '{rounded.radius-none}'
---

# Button Group

> Button groups are used to group related buttons together. They can be used to create a toolbar or a set of related actions.

## Anatomy
1. Group – horizontal row of group items.
2. Item – a [Button](../atoms/button.md) segment with a `--button-group-item-border-width` border; adjacent items share a border. The group overrides the button's fill, label colour, border, label font, height and padding so the items read as one joined bar (see Variants); the button's own shape radius, focus ring and disabled foreground apply unchanged.
3. Leading icon (optional) – [Icon](../atoms/icon.md), sized as in a medium button (`--button-icon-size-medium`).
4. Label – item text.
5. Dropdown chevron (optional) – `expand_more` [Icon](../atoms/icon.md) when the item opens a menu.

## Variants
The flavors are context overrides of the button: a group item is flatter than any button flavor (subtle border, no hover change in default) and adds an inverse flavor the button doesn't have.

| Flavor | Background | Text / icon | Border |
|---|---|---|---|
| default | `--button-group-item-background-enabled` | `--button-group-label-foreground` | `--button-group-item-border-width` `--button-group-item-border-color` |
| inverse | `--button-group-inverse-item-background-enabled` | `--button-group-inverse-label-foreground` | `--button-group-item-border-width` `--button-group-inverse-item-border-color` |

| Size | Item height | Item padding |
|---|---|---|
| medium (default) | `--button-group-item-height-medium` | `--button-group-item-padding-medium` |
| large | `--button-group-item-height-large` | `--button-group-item-padding-large` |

| Shape | Radius |
|---|---|
| rounded (default) | the button's `--button-container-radius-rounded` on the outer corners of first and last item only; inner corners `--button-group-item-radius-inner` |
| sharp | the button's `--button-container-radius-sharp` |

## States
| State | default | inverse |
|---|---|---|
| enabled | `--button-group-item-background-enabled` / `--button-group-label-foreground` | `--button-group-inverse-item-background-enabled` / `--button-group-inverse-label-foreground` |
| hover | no change | `--button-group-inverse-item-background-hover` |
| pressed | no change | `--button-group-inverse-item-background-pressed` |
| focused | the button's focus ring (`--button-focus-ring-width` `--button-focus-ring-color`) | bg `--button-group-inverse-item-background-focused` + ring |
| disabled | the button's disabled label `--button-label-foreground-disabled`, not interactive | same |

There is no persistent "selected" state (use [Segmented Control](./segmented-control.md) for single selection).

## Spacing & Sizing
| Property | Value |
|---|---|
| Icon / label / chevron gap | `--button-group-item-gap` |
| Label font | `--button-group-label-font` |
| Icon size | `--button-icon-size-medium` (button default) |
| Gap between items | `--button-group-container-gap` (borders collapse) |

## Properties
| Property | Options | Default |
|---|---|---|
| Size | medium, large | medium |
| Rounded | on / off | on |
| Item flavor | default, inverse | default |
| Item leading icon | any icon | none |
| Item label | text | — |
| Item shows dropdown | on / off | off |
| Item disabled | on / off | off |

## Usage
- Group only related actions (toolbar, view switches); keep labels short.
- Icon-only items need an accessible name.
- Medium items are `--button-group-item-height-medium` tall, meeting the touch-target minimum.
- Show the dropdown chevron when an item opens a menu ([Dropdown Menu](./dropdown-menu.md)).

## Stitch Prompt
Draw a horizontal row of joined buttons `--button-group-item-height-medium` tall, each with a white fill (`--button-group-item-background-enabled`), `--button-group-item-border-width` very light grey (`--button-group-item-border-color`) borders that are shared between neighbours, `--button-group-item-padding-medium` padding and `--button-group-label-font` near-black (`--button-group-label-foreground`) labels; items may have a `--button-icon-size-medium` leading icon or a trailing small down chevron, spaced `--button-group-item-gap` apart. Only the far-left and far-right outer corners are rounded at `--button-container-radius-rounded`. An inverse version uses near-black (`--button-group-inverse-item-background-enabled`) items with off-white text (`--button-group-inverse-label-foreground`).
