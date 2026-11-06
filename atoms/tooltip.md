---
name: Tooltip
level: atom
status: stable
composes: [../atoms/icon.md]
tokens:
  tooltip-container-background: '{colors.main-default}'
  tooltip-label-foreground: '{colors.main-inverse}'
  tooltip-label-font: '{typography.label-small}'
  tooltip-icon-size: '{typography.label-small}'
  tooltip-container-padding-y: '{spacing.spacing-minimum}'
  tooltip-container-padding-x: '{spacing.spacing-small}'
  tooltip-container-height: '{spacing.spacing-2xl}'
  tooltip-container-radius-rounded: '{rounded.radius-minimal}'
  tooltip-container-radius-sharp: '{rounded.radius-none}'
  tooltip-container-elevation: '{elevation.elevation-3}'
  tooltip-arrow-background: '{colors.main-default}'
  tooltip-arrow-width: '{dimensions.dim-tooltip-arrow-width}'
  tooltip-arrow-height: '{dimensions.dim-tooltip-arrow-height}'
  tooltip-arrow-offset-vertical: '{dimensions.dim-tooltip-arrow-offset-vertical}'
  tooltip-arrow-offset-horizontal: '{dimensions.dim-tooltip-arrow-offset-horizontal}'
---

# Tooltip

> Tooltips display informative text when users hover over, focus on, or tap an element.

## Anatomy
1. Container — dark box, content centred, sized to its content.
2. Content — short text or an [Icon](../atoms/icon.md). Context overrides: the icon is sized to the text (`--tooltip-icon-size`, much smaller than the Icon default) and drawn in `--tooltip-label-foreground` like the text, to read on the dark box.
3. Point — `--tooltip-arrow-width` × `--tooltip-arrow-height` triangle on the chosen side, pointing at the anchor.

## Variants
| Point | Arrow position |
|---|---|
| bottom (default) | below the box (offset `--tooltip-arrow-offset-vertical`), pointing down |
| top | above the box (offset `--tooltip-arrow-offset-vertical`), pointing up |
| left | left side (offset `--tooltip-arrow-offset-horizontal`), pointing left |
| right | right side (offset `--tooltip-arrow-offset-horizontal`), pointing right |

| Shape | Box corners | Arrow tip |
|---|---|---|
| rounded (default) | `--tooltip-container-radius-rounded` | rounded tip |
| sharp | `--tooltip-container-radius-sharp` | sharp tip |

## States
Static; it is shown and hidden by its trigger. In light themes the box casts `--tooltip-container-elevation`.

## Spacing & Sizing
| Property | Token |
|---|---|
| Background + arrow | `--tooltip-container-background` / `--tooltip-arrow-background` |
| Text / icon colour | `--tooltip-label-foreground` |
| Font | `--tooltip-label-font` (icon size `--tooltip-icon-size`) |
| Padding | `--tooltip-container-padding-y` / `--tooltip-container-padding-x` |
| Height (one line) | `--tooltip-label-font` line height + 2 × `--tooltip-container-padding-y` = `--tooltip-container-height` |
| Arrow | `--tooltip-arrow-width` × `--tooltip-arrow-height` |

## Properties
| Property | Options | Default |
|---|---|---|
| Point | top, bottom, left, right | bottom |
| Rounded | on / off | on |
| Content | text or icon | — |

## Usage
- Show on hover, keyboard focus and tap; keep to a short phrase — no interactive content inside.
- Don't put essential information only in a tooltip; it supplements a visible label.
- Associate the tooltip with its trigger so assistive tech reads it as a description; dismiss on Escape.

## Stitch Prompt
Draw a Zeta tooltip: a small near-black (`--tooltip-container-background`) box with `--tooltip-container-radius-rounded` corners, `--tooltip-container-padding-x` horizontal and `--tooltip-container-padding-y` vertical padding, containing a short phrase in `--tooltip-label-font` light-grey (`--tooltip-label-foreground`) text, with a soft drop shadow (`--tooltip-container-elevation`). A tiny `--tooltip-arrow-width` × `--tooltip-arrow-height` triangle of the same dark colour sticks out from the bottom edge (or top/left/right) pointing at the element it describes.
