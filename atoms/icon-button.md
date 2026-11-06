---
name: Icon Button
level: atom
status: stable
composes: [../atoms/button.md, ../atoms/icon.md]
tokens:
  # sizes (square geometry, specific to icon buttons)
  icon-button-container-size-small: '{spacing.spacing-3xl}'
  icon-button-container-size-medium: '{spacing.spacing-6xl}'
  icon-button-container-size-large: '{spacing.spacing-8xl}'
  icon-button-container-padding-small: '{spacing.spacing-minimum}'
  icon-button-container-padding-medium: '{spacing.spacing-small}'
  icon-button-container-padding-large: '{spacing.spacing-medium}'
---

# Icon Button

> Icon buttons are used to trigger actions with an icon.

## Anatomy
1. Container — a square [Button](../atoms/button.md) with no label: same flavor, shape, state and focus styling.
2. Icon — a single [icon](../atoms/icon.md) at the icon default `--icon-size` at every size, coloured with the button flavor's label colour.

## Variants
Flavors, colours and states are the [Button](../atoms/button.md) flavors; the button's label colour colours the icon:

| Flavor | Enabled bg | Hover | Pressed | Icon colour |
|---|---|---|---|---|
| primary (default) | `--button-primary-container-background-enabled` | `--button-primary-container-background-hover` | `--button-primary-container-background-pressed` | `--button-primary-label-foreground` |
| positive | `--button-positive-container-background-enabled` | `--button-positive-container-background-hover` | `--button-positive-container-background-pressed` | `--button-positive-label-foreground` |
| negative | `--button-negative-container-background-enabled` | `--button-negative-container-background-hover` | `--button-negative-container-background-pressed` | `--button-negative-label-foreground` |
| outline | `--button-outline-container-background-enabled` + `--button-outline-container-border-width` ring `--button-outline-container-border-color` | `--button-outline-container-background-hover` | `--button-outline-container-background-pressed` | `--button-outline-label-foreground` |
| outline-subtle | `--button-outline-subtle-container-background-enabled` + `--button-outline-subtle-container-border-width` ring `--button-outline-subtle-container-border-color` | `--button-outline-subtle-container-background-hover` | `--button-outline-subtle-container-background-pressed` | `--button-outline-subtle-label-foreground` |
| text | `--button-text-container-background-enabled` | `--button-text-container-background-hover` | `--button-text-container-background-pressed` | `--button-text-label-foreground` |
| subtle | `--button-subtle-container-background-enabled` | `--button-subtle-container-background-hover` | `--button-subtle-container-background-pressed` | `--button-subtle-label-foreground` |

Shape: the Button shapes — sharp → `--button-container-radius-sharp` with sharp icon style; rounded (default) → `--button-container-radius-rounded`; full → `--button-container-radius-full` (circle).

## States
| State | Background | Icon |
|---|---|---|
| enabled / hover / pressed | per flavor table | per flavor |
| focus-visible | — | Button focus ring (`--button-focus-ring-width` `--button-focus-ring-color`) |
| disabled | `--button-container-background-disabled` | `--button-label-foreground-disabled` |

## Spacing & Sizing
| Size | Box (w × h) | Padding | Icon |
|---|---|---|---|
| small | `--icon-button-container-size-small` square | `--icon-button-container-padding-small` | `--icon-size` |
| medium (default) | `--icon-button-container-size-medium` square | `--icon-button-container-padding-medium` | `--icon-size` |
| large | `--icon-button-container-size-large` square | `--icon-button-container-padding-large` | `--icon-size` |

## Properties
| Property | Options | Default |
|---|---|---|
| Flavor | primary, positive, negative, outline, outline-subtle, text, subtle | primary |
| Shape | sharp, rounded, full | rounded |
| Size | small, medium, large | medium |
| Icon | any icon from the set | — |
| Disabled | on / off | off |

## Usage
- Use for compact, well-understood actions (close, more, edit); always give it an accessible name because there is no visible text.
- Use text / subtle flavors inside toolbars, headers and cards (card headers use the default-coloured icon, see [Card](../atoms/card.md)).
- Small (`--icon-button-container-size-small`) is below the `--button-touch-target-size-minimum`–`--button-touch-target-size-recommended` touch minimum; prefer medium/large on touch UIs.
- Focus ring: the Button focus ring, `--button-focus-ring-width` `--button-focus-ring-color`.

## Stitch Prompt
Draw a Zeta icon button: a `--icon-button-container-size-medium` square with `--button-container-radius-rounded` rounded corners holding a single centred `--icon-size` rounded line icon. The primary version is solid blue `--button-primary-container-background-enabled` with a white icon; quieter versions are white squares with a blue icon (text), a grey icon (subtle, `--button-subtle-label-foreground`), or a `--button-outline-container-border-width` blue or light-grey outline. On hover the white versions tint to very light grey `--button-text-container-background-hover`, and the blue version lightens to `--button-primary-container-background-hover`. Disabled is flat `--button-container-background-disabled` with a grey `--button-label-foreground-disabled` icon. Small is `--icon-button-container-size-small`, large `--icon-button-container-size-large`, and "full" shape makes it a circle.
