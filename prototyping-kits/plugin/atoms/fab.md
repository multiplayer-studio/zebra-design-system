---
name: FAB
level: atom
status: draft
composes: [../atoms/icon.md, ../atoms/button.md]
tokens:
  # primary
  fab-primary-container-background-enabled: '{colors.color-brand-primary-default}'
  fab-primary-container-background-hover: '{colors.color-brand-primary-strong}'
  fab-primary-container-background-pressed: '{colors.color-brand-primary-deep}'
  fab-primary-icon-foreground: '{colors.color-brand-primary-on}'
  fab-primary-label-foreground: '{colors.color-brand-primary-on}'
  # inverse
  fab-inverse-container-background-enabled: '{colors.color-fill-inverse}'
  fab-inverse-container-background-hover: '{colors.color-fill-inverse-sunken}'
  fab-inverse-container-background-pressed: '{colors.color-fill-inverse-elevated}'
  fab-inverse-icon-foreground: '{colors.color-ink-inverse}'
  fab-inverse-label-foreground: '{colors.color-ink-inverse}'
  # shape
  fab-container-radius-sharp: '{radius.radius-none}'
  fab-container-radius-rounded-small: '{radius.radius-md}'
  fab-container-radius-rounded-large: '{radius.radius-xl}'
  fab-container-radius-rounded-extended: '{radius.radius-md}'
  fab-container-radius-full: '{radius.radius-pill}'
  # focus, motion
  fab-focus-ring-width: '{button.button-focus-ring-width}'
  fab-focus-ring-color: '{button.button-focus-ring-color}'
  fab-container-transition: '{button.button-container-transition}'
  fab-container-radius-duration: '{motion.motion-slow}'
  fab-container-radius-easing: '{motion.easing-standard}'
  # sizes
  fab-container-size-small: '{control.control-lg}'
  fab-container-size-large: '{component-sizes.size-fab-large}'
  fab-container-height-extended: '{control.control-md}'
  fab-container-padding-small: '{space.space-md}'
  fab-container-padding-large: '{primitives.scale-8}'
  fab-container-padding-y-extended: '{space.space-sm}'
  fab-container-padding-x-extended: '{space.space-md}'
  fab-container-gap-extended: '{space.space-sm}'
  fab-icon-size-small: '{icon.icon-size}'
  fab-icon-size-large: '{icon.icon-size-large}'
  fab-label-font-extended: '{typography.type-label-large}'
  # external label
  fab-label-font: '{typography.type-body-xsmall}'
  fab-label-foreground: '{colors.color-ink-high}'
  fab-label-padding-top: '{space.space-2xs}'
---

# FAB

> Floating Action Buttons trigger a screen's main creating action (add, new, compose). They are square or circular buttons that float above the content.

## Anatomy
1. Container — square (icon only), or a pill / rounded rectangle when extended, with a minimum height (the extended label may wrap). Built on the [Button](../atoms/button.md) base: its focus ring and tint timing come from the Button's tokens; the FAB defines its own flavours, shapes and sizes.
2. Icon — [Icon](../atoms/icon.md) at `--fab-icon-size-small` (large FAB: `--fab-icon-size-large`, a bigger glyph for the bigger box); sharp style when the shape is sharp, round otherwise. The icon colour is set per flavour (light on the coloured fill), see below.
3. Label — inside the button (after the icon) when extended, in `--fab-label-font-extended`; otherwise shown **below** the button in `--fab-label-font` `--fab-label-foreground` text with `--fab-label-padding-top` above it.

## Variants
**Flavour**

| Flavour | Enabled bg | Hover bg | Pressed bg | Icon / label |
|---|---|---|---|---|
| primary (default) | `--fab-primary-container-background-enabled` | `--fab-primary-container-background-hover` | `--fab-primary-container-background-pressed` | `--fab-primary-icon-foreground` / `--fab-primary-label-foreground` |
| inverse | `--fab-inverse-container-background-enabled` | `--fab-inverse-container-background-hover` | `--fab-inverse-container-background-pressed` | `--fab-inverse-icon-foreground` / `--fab-inverse-label-foreground` |

Inverse is near-black in light mode and near-white in dark, like the Button's contrast flavour. There is no secondary (orange) flavour: a second action colour competes with the primary ([DESIGN.md §3](../DESIGN.md)).

**Shape → radius**

| Shape | small | large | extended |
|---|---|---|---|
| sharp | `--fab-container-radius-sharp` | `--fab-container-radius-sharp` | `--fab-container-radius-sharp` |
| rounded (default) | `--fab-container-radius-rounded-small` | `--fab-container-radius-rounded-large` | `--fab-container-radius-rounded-extended` |
| full | `--fab-container-radius-full` (circle) | `--fab-container-radius-full` (circle) | `--fab-container-radius-full` (pill) |

In the AAA modes the component is always sharp (DESIGN.md §5).

## States
| State | Background | Foreground | Notes |
|---|---|---|---|
| enabled | `--fab-<flavour>-container-background-enabled` | `--fab-<flavour>-icon-foreground` / `--fab-<flavour>-label-foreground` | resting state |
| hover | `--fab-<flavour>-container-background-hover` | unchanged | pointer devices only |
| pressed | `--fab-<flavour>-container-background-pressed` | unchanged | |
| focused | per flavour (enabled) | unchanged | `--fab-focus-ring-width` `--fab-focus-ring-color` ring outside the bounds (the Button's ring) |

There is no disabled state: when its action is unavailable, the FAB is removed, not greyed ([DESIGN.md §5 Disabled](../DESIGN.md)).

State changes are colour-only, a tint over `--fab-container-transition`. Radius changes (switching shape or size) animate over `--fab-container-radius-duration` with `--fab-container-radius-easing`.

## Spacing & Sizing
| Size | Box | Padding | Icon |
|---|---|---|---|
| small (default) | `--fab-container-size-small` square | `--fab-container-padding-small` | `--fab-icon-size-small` |
| large | `--fab-container-size-large` square | `--fab-container-padding-large` | `--fab-icon-size-large` |
| extended | `--fab-container-height-extended` tall, width hugs content | `--fab-container-padding-y-extended` / `--fab-container-padding-x-extended` | `--fab-icon-size-small`; gap `--fab-container-gap-extended`; label `--fab-label-font-extended` |

The button and its external label stack vertically, separated by `--fab-label-padding-top`. Measurements are provisional: there is no Figma source yet.

## Properties
| Property | Options | Default |
|---|---|---|
| Flavour | primary, inverse | primary |
| Size | small, large | small |
| Shape | sharp, rounded, full | rounded |
| Extended | on / off | off |
| Icon | any icon | — |
| Label | short text | none |

Hover, pressed and focus are driven by interaction, never set on a static layout.

## Usage
- One FAB per screen, for its main creating action. It floats above content at the trailing bottom corner, above the bottom navigation, and toasts sit above it, never over it ([patterns 1.63](../patterns/01-screen-composition.md)). At expanded width its action moves into the [Navigation Rail](../organisms/navigation-rail.md)'s header action instead of floating.
- Use the extended form when the icon alone is ambiguous; otherwise put a short label beneath.
- Use inverse on light, busy backgrounds where blue would compete with content.
- Don't stack a FAB over content the user needs to reach; leave scroll room below the last item.

## Accessibility
- Always provide an accessible name: the extended label, the external label (linked to the button), or an `aria-label` on an icon-only FAB.
- The small FAB (`--fab-container-size-small`) meets `--control-target-min`; the large one exceeds it. The extended FAB (`--fab-container-height-extended`) is below it, so extend its hit area on touch ([patterns 6.16](../patterns/06-accessibility.md)).
- The focus ring (`--fab-focus-ring-width` `--fab-focus-ring-color`) is the Button's and is identical on every flavour ([patterns 6.23](../patterns/06-accessibility.md)).
- The icon's meaning must be clear without colour; pick a glyph that matches the action ([patterns 6.11](../patterns/06-accessibility.md)).

## Claude Prompt
Draw a Zebra floating action button: a `--fab-container-size-small` square with `--fab-container-radius-rounded-small` corners, solid blue `--fab-primary-container-background-enabled`, holding a centred `--fab-icon-size-small` white (`--fab-primary-icon-foreground`) rounded icon such as "add". A large version is `--fab-container-size-large` with a `--fab-icon-size-large` icon and `--fab-container-radius-rounded-large` corners; the full shape makes it a perfect circle. An optional short caption in `--fab-label-font` text sits `--fab-label-padding-top` below the button. The extended version is a `--fab-container-height-extended`-tall blue rounded rectangle (`--fab-container-radius-rounded-extended` corners) containing the icon followed by a `--fab-label-font-extended` white label. An inverse version is near-black `--fab-inverse-container-background-enabled` with light content.
