---
name: Input Chip
level: atom
status: stable
composes: [../atoms/avatar.md, ../atoms/icon.md]
tokens:
  # shape
  input-chip-container-radius-rounded: '{rounded.radius-full}'
  input-chip-container-radius-sharp: '{rounded.radius-none}'
  # states
  input-chip-container-background-enabled: '{colors.surface-default}'
  input-chip-container-background-hover: '{colors.surface-hover}'
  input-chip-container-background-disabled: '{colors.surface-disabled}'
  input-chip-label-foreground-enabled: '{colors.main-default}'
  input-chip-label-foreground-hover: '{colors.main-default}'
  input-chip-label-foreground-disabled: '{colors.main-disabled}'
  input-chip-container-border-width: '{border.border-size-small}'
  input-chip-container-border-color-enabled: '{colors.border-default}'
  input-chip-container-border-color-hover: '{colors.border-default}'
  input-chip-container-border-color-disabled: '{colors.border-disabled}'
  input-chip-container-background-duration: '{motion.motion-fast}'
  input-chip-container-background-easing: '{motion.easing-out}'
  # sizing
  input-chip-content-height: '{spacing.spacing-2xl}'
  input-chip-container-padding-y: '{spacing.spacing-small}'
  input-chip-container-padding-x: '{spacing.spacing-medium}'
  input-chip-container-gap: '{spacing.spacing-small}'
  input-chip-close-icon-size: '{icon.icon-size-medium}'
---

# Input Chip

> A chip used to show input data, typically used to associate some content or action with a user.

## Anatomy
1. Container — outlined.
2. Leading (optional) — typically an [Avatar](../atoms/avatar.md) at size xxxs (`--avatar-container-size-xxxs`) or an [Icon](../atoms/icon.md); the avatar's own tokens govern it.
3. Label — text.
4. Close icon — trailing `close` [Icon](../atoms/icon.md), `--input-chip-close-icon-size` (override: the icon's medium size rather than its default `--icon-size`, to fit the chip height).

## Variants
| Shape | Radius |
|---|---|
| rounded (default) | `--input-chip-container-radius-rounded` (pill) |
| sharp | `--input-chip-container-radius-sharp` |

With or without leading avatar/icon.

## States
| State | Background | Text | Outline |
|---|---|---|---|
| enabled | `--input-chip-container-background-enabled` | `--input-chip-label-foreground-enabled` | `--input-chip-container-border-width` `--input-chip-container-border-color-enabled` |
| hover / pressed | `--input-chip-container-background-hover` | `--input-chip-label-foreground-hover` | `--input-chip-container-border-color-hover` |
| disabled | `--input-chip-container-background-disabled` | `--input-chip-label-foreground-disabled` | `--input-chip-container-border-color-disabled` |

Background transitions `--input-chip-container-background-duration` `--input-chip-container-background-easing`.

## Spacing & Sizing
| Property | Token |
|---|---|
| Height | `--input-chip-content-height` content height + `--input-chip-container-padding-y` vertical padding |
| Padding | `--input-chip-container-padding-y` / `--input-chip-container-padding-x` |
| Gap | `--input-chip-container-gap` |
| Close icon | `--input-chip-close-icon-size` |
| Leading avatar | xxxs (`--avatar-container-size-xxxs`) |

## Properties
| Property | Options | Default |
|---|---|---|
| Label | text | — |
| Leading | none, avatar, icon | none |
| Rounded | on / off | on |
| Disabled | on / off | off |

## Usage
- Use to represent entered values such as recipients or selected people inside an input.
- The close icon removes the chip: make it keyboard-reachable and labelled ("Remove <name>").
- Keep the label to the person/value name; truncate long text.

## Stitch Prompt
Draw a Zeta input chip: a white pill with a `--input-chip-container-border-width` light-grey (`--input-chip-container-border-color-enabled`) outline, holding a tiny `--avatar-container-size-xxxs` circular avatar with initials on the left, `--input-chip-container-gap` gap, a short dark (`--input-chip-label-foreground-enabled`) name, and a `--input-chip-close-icon-size` dark close "×" icon on the right, with `--input-chip-container-padding-x` side padding. Hover fills it very light grey `--input-chip-container-background-hover`; disabled is flat `--input-chip-container-background-disabled` with grey text.
