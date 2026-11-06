---
name: Tile Button
level: molecule
status: stable
composes: [../atoms/button.md, ../atoms/icon.md]
tokens:
  # sizing
  tile-button-container-size: '{spacing.spacing-10xl}'
  tile-button-container-padding-y: '{spacing.spacing-large}'
  tile-button-container-padding-x: '{spacing.spacing-small}'
  tile-button-container-gap: '{spacing.spacing-minimum}'
---

# Tile Button

> A large, tappable button with an icon stacked above a label. Ideal for grid layouts, dashboards, or mobile interfaces where quick, visually distinct actions are needed.

## Anatomy
1. Container – a [Button](../atoms/button.md) laid out as a fixed square with the icon stacked above the label. The button's flavor, shape, state and focus-ring tokens govern its colours, border and radius; the tile owns only its square size, padding and icon–label gap.
2. Icon – [Icon](../atoms/icon.md), centred on top (defaults to `star` when no icon is chosen), sized as in a medium button.
3. Label – the button label at medium size, single line below the icon, truncated with an ellipsis.

## Variants
Default flavor is outline-subtle (not primary like Button). All Button flavors are available, with the button's own tokens.

| Flavor | Background | Text / icon | Border |
|---|---|---|---|
| outline-subtle (default) | `--button-outline-subtle-container-background-enabled` | `--button-outline-subtle-label-foreground` | `--button-outline-subtle-container-border-width` `--button-outline-subtle-container-border-color` |
| outline | `--button-outline-container-background-enabled` | `--button-outline-label-foreground` | `--button-outline-container-border-width` `--button-outline-container-border-color` |
| primary | `--button-primary-container-background-enabled` | `--button-primary-label-foreground` | none |
| positive | `--button-positive-container-background-enabled` | `--button-positive-label-foreground` | none |
| negative | `--button-negative-container-background-enabled` | `--button-negative-label-foreground` | none |
| text | `--button-text-container-background-enabled` | `--button-text-label-foreground` | none |
| subtle | `--button-subtle-container-background-enabled` | `--button-subtle-label-foreground` | none |

| Shape | Radius | Icon font |
|---|---|---|
| rounded (default) | `--button-container-radius-rounded` | zeta-icons-round |
| sharp | `--button-container-radius-sharp` | zeta-icons-sharp |

## States
| State | outline-subtle | primary |
|---|---|---|
| enabled | `--button-outline-subtle-container-background-enabled` | `--button-primary-container-background-enabled` |
| hover | `--button-outline-subtle-container-background-hover` | `--button-primary-container-background-hover` |
| pressed | `--button-outline-subtle-container-background-pressed` | `--button-primary-container-background-pressed` |
| focus | `--button-focus-ring-width` outline `--button-focus-ring-color` | same |
| disabled | bg `--button-container-background-disabled`, text/icon `--button-label-foreground-disabled` | same |

## Spacing & Sizing
| Property | Value |
|---|---|
| Width × height | `--tile-button-container-size` × `--tile-button-container-size`, fixed |
| Padding | `--tile-button-container-padding-y` `--tile-button-container-padding-x` (`--tile-button-container-padding-y` top/bottom, `--tile-button-container-padding-x` sides) |
| Icon–label gap | `--tile-button-container-gap` |

Padding and gap are context overrides of the button's own padding and gap: the tile stacks its content vertically in a fixed square instead of hugging it in a row.
| Icon size | `--button-icon-size-medium` |
| Label font | `--button-label-font-medium`, nowrap + ellipsis |

## Properties
| Property | Options | Default |
|---|---|---|
| Flavor | primary, positive, negative, outline, outline-subtle, text, subtle | outline-subtle |
| Shape | rounded, sharp | rounded |
| Icon | any icon | `star` |
| Label | short text | — |
| Disabled | on / off | off |

## Usage
- Use in grids / dashboards for quick, visually distinct actions; keep labels to one or two short words (they truncate at `--tile-button-container-size`).
- `--tile-button-container-size` square comfortably exceeds the recommended touch target.
- Focus ring is `--button-focus-ring-width` `--button-focus-ring-color`; supply an accessible name when the label is ambiguous.
- Disabled tiles are greyed, not hidden.

## Stitch Prompt
Draw a `--tile-button-container-size` square button with a `--button-container-radius-rounded` corner radius, white fill and a thin `--button-outline-subtle-container-border-width` light grey (`--button-outline-subtle-container-border-color`) outline. Centre a `--button-icon-size-medium` dark-grey line icon in the upper part and a single line of `--button-label-font-medium` IBM Plex Sans label text (`--button-outline-subtle-label-foreground`) just `--tile-button-container-gap` beneath it, with `--tile-button-container-padding-y` padding at top and bottom and `--tile-button-container-padding-x` on the sides; long labels end with an ellipsis. On hover the fill turns a very pale grey-blue (`--button-outline-subtle-container-background-hover`); when pressed, pale blue (`--button-outline-subtle-container-background-pressed`). A primary variant uses a solid `--button-primary-container-background-enabled` fill with white icon and text. Arrange several tiles in an even grid with small gaps.
