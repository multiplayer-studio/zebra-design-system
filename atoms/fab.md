---
name: FAB
level: atom
status: stable
composes: [../atoms/icon.md, ../atoms/button.md]
tokens:
  # primary
  fab-primary-container-background-enabled: '{colors.state-primary-enabled}'
  fab-primary-container-background-hover: '{colors.state-primary-hover}'
  fab-primary-container-background-pressed: '{colors.state-primary-selected}'
  fab-primary-icon-foreground: '{colors.main-inverse}'
  fab-primary-label-foreground: '{colors.state-default-enabled}'
  # inverse
  fab-inverse-container-background-enabled: '{colors.state-inverse-enabled}'
  fab-inverse-container-background-hover: '{colors.state-inverse-hover}'
  fab-inverse-container-background-pressed: '{colors.state-inverse-selected}'
  fab-inverse-content-foreground: '{colors.main-inverse}'
  # secondary
  fab-secondary-container-background-enabled: '{colors.state-secondary-enabled}'
  fab-secondary-container-background-hover: '{colors.state-secondary-hover}'
  fab-secondary-container-background-pressed: '{colors.state-secondary-selected}'
  fab-secondary-content-foreground: '{colors.main-default}'
  # shape
  fab-sharp-container-radius: '{rounded.radius-none}'
  fab-rounded-container-radius-small: '{rounded.radius-rounded}'
  fab-rounded-container-radius-large: '{rounded.radius-large}'
  fab-rounded-container-radius-extended: '{rounded.radius-rounded}'
  fab-full-container-radius: '{rounded.radius-full}'
  fab-container-radius-duration: '{motion.motion-slow}'
  fab-container-radius-easing: '{motion.easing-standard}'
  # sizes
  fab-container-padding-small: '{spacing.spacing-medium}'
  fab-container-size-small: '{dimensions.dim-fab-size-small}'
  fab-container-padding-large: '{spacing.spacing-xl}'
  fab-icon-size-large: '{icon.icon-size-large}'
  fab-container-size-large: '{dimensions.dim-fab-size-large}'
  fab-container-padding-y-extended: '{spacing.spacing-small}'
  fab-container-padding-x-extended: '{spacing.spacing-medium}'
  fab-container-height-extended: '{dimensions.dim-fab-height-extended}'
  fab-container-gap-extended: '{spacing.spacing-small}'
  fab-label-font-extended: '{typography.label-large}'
  # external label
  fab-label-font: '{typography.body-x-small}'
  fab-label-padding-top: '{spacing.spacing-minimum}'
---

# FAB

> Floating Action Buttons are used to trigger the primary action on a screen. They are circular buttons that float above the content.

## Anatomy
1. Container — square (icon only), or a pill / rounded rectangle when extended. Built on the [Button](../atoms/button.md) base: its focus ring and disabled styling are the Button's; the FAB defines its own flavors, shapes and sizes.
2. Icon — [icon](../atoms/icon.md) at the icon default `--icon-size` (large FAB: context override `--fab-icon-size-large`, a bigger glyph for the bigger box); sharp style when the shape is sharp, round otherwise. Icon colour is a context override per flavor (light on the coloured fill), see below.
3. Label — inside the button (after the icon) when extended; otherwise shown **below** the button in `--fab-label-font` text with `--fab-label-padding-top` top padding.

## Variants
**Flavor**

| Flavor | Enabled bg | Hover bg | Pressed bg | Icon / label |
|---|---|---|---|---|
| primary (default) | `--fab-primary-container-background-enabled` | `--fab-primary-container-background-hover` | `--fab-primary-container-background-pressed` | icon `--fab-primary-icon-foreground`; label `--fab-primary-label-foreground` |
| inverse | `--fab-inverse-container-background-enabled` | `--fab-inverse-container-background-hover` | `--fab-inverse-container-background-pressed` | `--fab-inverse-content-foreground` |
| secondary | `--fab-secondary-container-background-enabled` | `--fab-secondary-container-background-hover` | `--fab-secondary-container-background-pressed` | `--fab-secondary-content-foreground` |

**Shape → radius**
| Shape | small | large | extended |
|---|---|---|---|
| sharp | `--fab-sharp-container-radius` | `--fab-sharp-container-radius` | `--fab-sharp-container-radius` |
| rounded (default) | `--fab-rounded-container-radius-small` | `--fab-rounded-container-radius-large` | `--fab-rounded-container-radius-extended` |
| full | `--fab-full-container-radius` (circle / pill) | circle | pill |

Radius changes animate over `--fab-container-radius-duration` with `--fab-container-radius-easing`.

## States
| State | Background | Foreground |
|---|---|---|
| enabled / hover / pressed | per flavor table | per flavor |
| focus-visible | Button focus ring, `--button-focus-ring-width` `--button-focus-ring-color` outline | — |
| disabled | Button disabled, `--button-container-background-disabled` | `--button-label-foreground-disabled`; external label background stays transparent |

## Spacing & Sizing
| Size | Padding | Icon | Resulting box |
|---|---|---|---|
| small (default) | `--fab-container-padding-small` | `--icon-size` | `--fab-container-size-small` square |
| large | `--fab-container-padding-large` | `--fab-icon-size-large` | `--fab-container-size-large` square |
| extended | `--fab-container-padding-y-extended` / `--fab-container-padding-x-extended` | `--icon-size` | `--fab-container-height-extended` tall, width = content; gap `--fab-container-gap-extended`; label `--fab-label-font-extended` |

The button and its external label stack vertically, separated by the label's `--fab-label-padding-top`.

## Properties
| Property | Options | Default |
|---|---|---|
| Flavor | primary, inverse, secondary | primary |
| Size | small, large | small |
| Shape | sharp, rounded, full | rounded |
| Extended | on / off | off |
| Icon | any icon | — |
| Label | short text | none |
| Disabled | on / off | off |

## Usage
- One FAB per screen, for the single primary action; it floats above content (typically bottom-right).
- Use the extended form when the icon alone is ambiguous; otherwise put a short label beneath.
- Use inverse on light, busy backgrounds where blue would compete with content.
- Always provide an accessible name. Small (`--fab-container-size-small`) meets the recommended touch-target minimum.

## Stitch Prompt
Draw a Zebra floating action button: a `--fab-container-size-small` square with `--fab-rounded-container-radius-small` corners, solid blue `--fab-primary-container-background-enabled`, holding a centred `--icon-size` light (`--fab-primary-icon-foreground`) rounded icon such as "add". A large version is `--fab-container-size-large` with a `--fab-icon-size-large` icon and `--fab-rounded-container-radius-large` corners; a "full" shape makes it a perfect circle. An optional short caption in `--fab-label-font` text sits `--fab-label-padding-top` below the button. The extended version is a `--fab-container-height-extended`-tall blue pill-ish rectangle (`--fab-rounded-container-radius-extended` corners) containing the icon followed by a `--fab-label-font-extended` white label. An inverse version is near-black `--fab-inverse-container-background-enabled` with light content.
