---
name: Segmented Control
level: molecule
status: stable
composes: [../atoms/icon.md]
tokens:
  # track
  segmented-control-track-background: '{colors.surface-disabled}'
  segmented-control-track-padding: '{spacing.spacing-minimum}'
  segmented-control-track-radius-rounded: '{rounded.radius-minimal}'
  segmented-control-track-radius-sharp: '{rounded.radius-none}'
  # indicator
  segmented-control-indicator-background: '{colors.surface-default}'
  segmented-control-indicator-radius-rounded: '{rounded.radius-minimal}'
  segmented-control-indicator-radius-sharp: '{rounded.radius-none}'
  segmented-control-indicator-duration: '{motion.motion-slow}'
  segmented-control-indicator-easing: '{motion.easing-standard}'
  # segment
  segmented-control-label-foreground-enabled: '{colors.main-disabled}'
  segmented-control-label-foreground-selected: '{colors.main-default}'
  segmented-control-label-duration: '{motion.motion-slow}'
  segmented-control-label-font: '{typography.label-medium}'
  segmented-control-segment-padding-y: '{spacing.spacing-minimum}'
  segmented-control-segment-padding-x: '{spacing.spacing-large}'
  segmented-control-track-gap: '{spacing.spacing-none}'
---

# Segmented Control

> A segmented control is a linear set of two or more segments, each of which functions as a mutually exclusive button. Like buttons, segments can contain text or images. Segmented controls are often used to display different views.

## Anatomy
1. Track – grey container with `--segmented-control-track-padding` inner padding.
2. Sliding indicator – white pill behind the active segment; animates (`--segmented-control-indicator-duration` `--segmented-control-indicator-easing`) to the new segment.
3. Segment – text and/or [Icon](../atoms/icon.md) content. The icon keeps its default size; context override: it takes the segment's label colour (`--segmented-control-label-foreground-enabled` / `--segmented-control-label-foreground-selected`) instead of the Icon default, so icon and text change together.

## Variants
| Rounded | Track radius | Indicator / segment radius |
|---|---|---|
| on (default) | `--segmented-control-track-radius-rounded` | `--segmented-control-indicator-radius-rounded` |
| off | `--segmented-control-track-radius-sharp` | `--segmented-control-indicator-radius-sharp` |

Content: text-only, icon-only, or icon + text segments.

## States
| State | Segment background | Text / icon |
|---|---|---|
| inactive | transparent on track `--segmented-control-track-background` | `--segmented-control-label-foreground-enabled` |
| active | indicator `--segmented-control-indicator-background` | `--segmented-control-label-foreground-selected` |

Colour change transitions `--segmented-control-label-duration`. Hover, focus and disabled treatments are not yet defined.

## Spacing & Sizing
| Property | Value |
|---|---|
| Track padding | `--segmented-control-track-padding` |
| Segment padding | `--segmented-control-segment-padding-y` `--segmented-control-segment-padding-x` |
| Segment font | `--segmented-control-label-font` |
| Gap between segments | `--segmented-control-track-gap` |
| Width | fit-content (sum of segments) |

## Properties
| Property | Options | Default |
|---|---|---|
| Segments | 2–5, each text, icon, or icon + text | — |
| Active segment | exactly one | first |
| Rounded | on / off | on |

## Usage
- Use for 2–5 mutually exclusive views of the same content; use [Tabs](./tabs.md) for navigation between sections.
- Exactly one segment is active at a time.
- Inactive text is low contrast (`--segmented-control-label-foreground-enabled` on `--segmented-control-track-background`) — keep labels short and clear, and add accessible names for icon-only segments.
- Ensure the full control has adequate height for touch on mobile.

## Stitch Prompt
Draw a compact horizontal toggle: a light grey (`--segmented-control-track-background`) rounded rectangle with `--segmented-control-track-radius-rounded` corners and `--segmented-control-track-padding` inner padding containing three segments labelled "Item 1", "Item 2", "Item 3" in `--segmented-control-label-font` IBM Plex Sans. The active segment sits on a white `--segmented-control-indicator-radius-rounded`-rounded pill with near-black text; inactive segments show grey (`--segmented-control-label-foreground-enabled`) text directly on the grey track, each with `--segmented-control-segment-padding-x` horizontal padding.
