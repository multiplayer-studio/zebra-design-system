---
name: Dropdown Menu
level: molecule
status: stable
composes: [../atoms/button.md, ../atoms/icon.md, ../atoms/checkbox.md, ../atoms/radio-button.md]
tokens:
  # panel
  dropdown-menu-panel-padding: '{spacing.spacing-medium}'
  dropdown-menu-panel-gap: '{spacing.spacing-minimum}'
  dropdown-menu-panel-elevation: '{elevation.elevation-3}'
  dropdown-menu-panel-radius: '{rounded.radius-minimal}'
  # item sizes
  dropdown-menu-item-padding-small: '{spacing.spacing-small}'
  dropdown-menu-item-padding-y-medium: '{spacing.spacing-small}'
  dropdown-menu-item-padding-x-medium: '{spacing.spacing-medium}'
  dropdown-menu-item-padding-y-large: '{spacing.spacing-medium}'
  dropdown-menu-item-padding-x-large: '{spacing.spacing-large}'
  dropdown-menu-item-gap-small: '{spacing.spacing-minimum}'
  dropdown-menu-item-gap-medium: '{spacing.spacing-small}'
  dropdown-menu-item-gap-large: '{spacing.spacing-small}'
  dropdown-menu-item-font-small: '{typography.label-small}'
  dropdown-menu-item-font-medium: '{typography.body-medium}'
  dropdown-menu-item-font-large: '{typography.body-medium}'
  dropdown-menu-item-icon-size-small: '{icon.icon-size-small}'
  dropdown-menu-item-icon-size-medium: '{icon.icon-size-medium}'
  dropdown-menu-item-icon-size-large: '{icon.icon-size-medium}'
  dropdown-menu-item-height-medium: '{spacing.spacing-6xl}'
  # checkbox / radio rows
  dropdown-menu-selection-item-height: '{spacing.spacing-6xl}'
  dropdown-menu-selection-item-padding-y: '{spacing.spacing-none}'
  dropdown-menu-selection-item-padding-x: '{spacing.spacing-medium}'
  dropdown-menu-selection-item-radius: '{rounded.radius-minimal}'
  # item states
  dropdown-menu-item-background-enabled: '{colors.surface-default}'
  dropdown-menu-item-background-hover: '{colors.surface-hover}'
  dropdown-menu-item-background-pressed: '{colors.surface-selected}'
  dropdown-menu-item-background-disabled: '{colors.surface-disabled}'
  dropdown-menu-item-icon-foreground: '{colors.main-subtle}'
  dropdown-menu-item-foreground-disabled: '{colors.main-disabled}'
---

# Dropdown Menu

> Dropdown menus allow users to select an option from a list that appears when the menu is clicked or tapped. A button opens a menu panel containing a list of items.

## Anatomy
1. Anchor – [Button](../atoms/button.md), flavor primary by default, size as the menu size; its tokens govern colours, states, radius and label. It shows its default text or the selected label, with a trailing `chevron_left` [Icon](../atoms/icon.md) rotated −90° while open.
2. Menu panel – floating white panel, `--dropdown-menu-panel-elevation`.
3. Menu items – one of:
   - text item: optional leading [Icon](../atoms/icon.md) + label. Context override: item icons are smaller than the Icon default (`--dropdown-menu-item-icon-size-small` / `--dropdown-menu-item-icon-size-medium` / `--dropdown-menu-item-icon-size-large`) and drawn in the subtler `--dropdown-menu-item-icon-foreground` so they sit behind the label;
   - [Checkbox](../atoms/checkbox.md) item;
   - [Radio Button](../atoms/radio-button.md) item.

## Variants
| Type | Item content | Selection |
|---|---|---|
| text (default) | icon + label | single; the anchor text can update to the selected label |
| checkbox | checkbox + label | multiple |
| radio | radio + label | single |

| Item size | Padding | Gap | Font | Icon |
|---|---|---|---|---|
| small | `--dropdown-menu-item-padding-small` | `--dropdown-menu-item-gap-small` | `--dropdown-menu-item-font-small` | `--dropdown-menu-item-icon-size-small` |
| medium (default) | `--dropdown-menu-item-padding-y-medium` / `--dropdown-menu-item-padding-x-medium` | `--dropdown-menu-item-gap-medium` | `--dropdown-menu-item-font-medium` | `--dropdown-menu-item-icon-size-medium` |
| large | `--dropdown-menu-item-padding-y-large` / `--dropdown-menu-item-padding-x-large` | `--dropdown-menu-item-gap-large` | `--dropdown-menu-item-font-large` | `--dropdown-menu-item-icon-size-large` |

Checkbox / radio rows: height `--dropdown-menu-selection-item-height`, `--dropdown-menu-selection-item-padding-y` / `--dropdown-menu-selection-item-padding-x` padding.

Anchor button: flavor primary by default (any Button flavor), sizes small / medium / large as Button. Panel opens below (default), above, left or right of the anchor.

## States
| Element / state | Background | Text / icon |
|---|---|---|
| item – enabled | `--dropdown-menu-item-background-enabled` | inherited text; icon `--dropdown-menu-item-icon-foreground` |
| item – hover | `--dropdown-menu-item-background-hover` | – |
| item – pressed | `--dropdown-menu-item-background-pressed` | – |
| item – disabled | `--dropdown-menu-item-background-disabled` | `--dropdown-menu-item-foreground-disabled` |
| anchor | per Button flavor, e.g. primary `--button-primary-container-background-enabled` → hover `--button-primary-container-background-hover` → pressed `--button-primary-container-background-pressed` | white |

## Spacing & Sizing
| Property | Value |
|---|---|
| Panel padding | `--dropdown-menu-panel-padding` |
| Gap between items | `--dropdown-menu-panel-gap` |
| Panel shadow | `--dropdown-menu-panel-elevation` |
| Panel radius | `--dropdown-menu-panel-radius` when rounded; items in checkbox/radio rows `--dropdown-menu-selection-item-radius` |
| Panel width | matches the anchor (default) or fits content |

## Properties
| Property | Options | Default |
|---|---|---|
| Type | text, checkbox, radio | text |
| Items | label, optional icon, checked, disabled | — |
| Default text | text | — |
| Anchor shows selection | on / off | on |
| Open | on / off | off |
| Direction | bottom, top, left, right | bottom |
| Match anchor width | on / off | on |
| Flavor | any Button flavor | primary |
| Size | small, medium, large | medium |
| Rounded | on / off | on |
| Disabled | on / off | off |

## Usage
- Use for a compact list of actions or options behind a button; for form fields use [Select Input](./select-input.md).
- Use the checkbox type for multi-select, radio for single-select with visible state.
- Items are keyboard focusable (Enter/Space/arrow keys); medium items are `--dropdown-menu-item-height-medium` tall.
- Keep labels short; disable rather than hide unavailable items.

## Stitch Prompt
Draw a blue (`--button-primary-container-background-enabled`) button with `--button-container-radius-rounded` corners and white `--button-label-font-medium` label "Select" plus a white chevron, and directly below it an open white menu panel the same width, with `--dropdown-menu-panel-radius` corners, `--dropdown-menu-panel-padding` padding and a soft drop shadow (`--dropdown-menu-panel-elevation`). Inside, stack `--dropdown-menu-item-height-medium` rows `--dropdown-menu-panel-gap` apart, each with a `--dropdown-menu-item-icon-size-medium` grey icon and a `--dropdown-menu-item-font-medium` near-black label `--dropdown-menu-item-gap-medium` apart; one row is hovered with a pale grey-blue (`--dropdown-menu-item-background-hover`) fill and one is disabled with a light grey (`--dropdown-menu-item-background-disabled`) fill and grey text.
