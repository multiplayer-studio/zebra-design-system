---
name: List Item
level: molecule
status: stable
composes: [../atoms/icon.md, ../atoms/avatar.md, ../atoms/checkbox.md, ../atoms/switch.md, ../atoms/radio-button.md]
tokens:
  list-item-container-height: '{dimensions.dim-list-item-height}'
  list-item-container-padding-y: '{spacing.spacing-xl}'
  list-item-container-padding-x: '{spacing.spacing-large}'
  list-item-container-gap: '{spacing.spacing-medium}'
  list-item-headline-font: '{typography.title-medium}'
  list-item-headline-foreground: '{colors.main-default}'
  list-item-divider-border-width: '{border.border-size-small}'
  list-item-divider-border-color: '{colors.border-default}'
---

# List Item

> An item in a list comprised of a single row, typically containing some text as well as leading or trailing widgets.

## Anatomy
1. Row container – horizontal row, content pushed to both ends.
2. Leading region (optional) – e.g. [Icon](../atoms/icon.md) at its default size, or an [Avatar](../atoms/avatar.md) at size xxs (`--avatar-container-size-xxs`). Their own tokens govern them.
3. Headline – single text line, `--list-item-headline-font`.
4. Trailing region (optional) – e.g. chevron [Icon](../atoms/icon.md), [Checkbox](../atoms/checkbox.md), [Switch](../atoms/switch.md), [Radio Button](../atoms/radio-button.md).
5. Divider (list-level) – `--list-item-divider-border-width` line under every item except the last when the list is divided.

## Variants
| Variant | Content |
|---|---|
| text only | Headline |
| leading icon / avatar | Leading content + headline |
| trailing control | Headline + checkbox / switch / radio / icon |
| divided list | separators between items |

## States
The row itself has no hover, pressed, selected or disabled styling; interactive state comes from the controls it contains, styled by their own tokens. No background fill.

| Element | Colour |
|---|---|
| Headline | `--list-item-headline-foreground` |
| Divider | `--list-item-divider-border-color`, `--list-item-divider-border-width` |

## Spacing & Sizing
| Property | Value |
|---|---|
| Padding | `--list-item-container-padding-y` top/bottom, `--list-item-container-padding-x` sides |
| Gap (leading ↔ headline ↔ trailing) | `--list-item-container-gap` |
| Headline font | `--list-item-headline-font` |
| Row height (text only) | `--list-item-container-height` |

## Properties
| Property | Options | Default |
|---|---|---|
| Headline | text | — |
| Leading content | icon, avatar, none | none |
| Trailing content | chevron, checkbox, switch, radio, icon, none | none |
| Divided (list) | on / off | off |

## Usage
- Keep headlines to one line; put controls in the trailing region so they align on the right.
- Use a divided list for scannable lists of similar items.
- When the trailing control is the action (checkbox/switch), associate the headline as its label for screen readers.
- `--list-item-container-height` rows comfortably exceed touch-target minimums.

## Stitch Prompt
Draw a vertical list of full-width rows, each `--list-item-container-height` tall with `--list-item-container-padding-x` side padding: an optional `--icon-size` dark icon or small circular avatar on the left, `--list-item-container-gap` gap, then a `--list-item-headline-font` headline "List Item" in near-black (`--list-item-headline-foreground`); on the right edge an optional chevron, checkbox or toggle switch. Separate rows with a `--list-item-divider-border-width` light grey (`--list-item-divider-border-color`) line. No background fill.
