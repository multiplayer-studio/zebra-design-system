---
name: Meter
level: atom
status: draft
composes: [../atoms/icon.md]
tokens:
  # label row
  meter-label-font: '{typography.type-label-medium}'
  meter-label-foreground: '{colors.color-ink-high}'
  meter-value-font: '{typography.type-body-small}'
  meter-value-foreground: '{colors.color-ink-medium}'
  meter-label-gap: '{space.space-sm}'
  meter-container-gap: '{space.space-sm}'
  # track and indicator
  meter-track-background: '{colors.color-fill-sunken}'
  meter-indicator-background: '{colors.color-status-neutral-strong}'
  meter-indicator-transition: '{motion.motion-smooth}'
  # threshold mark
  meter-threshold-background: '{colors.color-ink-high}'
  meter-threshold-width: '{stroke.stroke-thick}'
  meter-threshold-height: '{primitives.scale-7}'
  # warning
  meter-warning-indicator-background: '{colors.color-status-warning-default}'
  meter-warning-icon-foreground: '{colors.color-status-warning-default}'
  # error
  meter-error-indicator-background: '{colors.color-status-error-default}'
  meter-error-icon-foreground: '{colors.color-status-error-default}'
  # status line
  meter-status-font: '{typography.type-body-small}'
  meter-status-foreground: '{colors.color-ink-high}'
  meter-status-gap: '{space.space-2xs}'
  meter-icon-size: '{icon.icon-size-small}'
  # shape and size
  meter-track-height: '{primitives.scale-5}'
  meter-track-radius-rounded: '{radius.radius-sm}'
  meter-track-radius-sharp: '{radius.radius-none}'
---

# Meter

> Shows a used amount against a fixed total, such as battery, storage or capacity, with threshold marks and a status in words once a threshold is crossed.

## Anatomy
1. Meter — the outer frame, stacking the label row, the track and the status line `--meter-container-gap` apart. Its width is set by the placer.
2. Label row — the measure's name in `--meter-label-font` `--meter-label-foreground`, and, `--meter-label-gap` after it, the amount in words in `--meter-value-font` `--meter-value-foreground` ("72 of 128 GB", "18%"). The amount is always shown, with the total where the device reports one, and each threshold is stated in words too ("Warns at 100 GB"), so the marks never carry it alone ([patterns 10.85](../patterns/10-data-display.md)).
3. Track — a `--meter-track-height` bar in `--meter-track-background`, the whole range from zero to the total.
4. Indicator — fills the track from the start to the used amount, in the colour of the current status.
5. Threshold marks (optional, up to two) — `--meter-threshold-width` lines `--meter-threshold-height` tall in `--meter-threshold-background`, centred on the track at each threshold value: warning, then error. Each mark has its value in words in the label row or the status line ("Warns at 100 GB").
6. Status line (past a threshold only) — an [Icon](../atoms/icon.md) at `--meter-icon-size` in the status colour, then `--meter-status-gap` later the status in words in `--meter-status-font` `--meter-status-foreground` ("Storage almost full"). The glyph is fixed per status: `warning` or `error`. This is a context override: the icon takes the status colour instead of the text colour.

## Variants
| Status | Indicator | Status line |
|---|---|---|
| normal (default) | `--meter-indicator-background` | none |
| warning | `--meter-warning-indicator-background` | `warning` in `--meter-warning-icon-foreground` + words |
| error | `--meter-error-indicator-background` | `error` in `--meter-error-icon-foreground` + words |

The status comes from the value and the thresholds, never set by hand. Below the first threshold the meter is normal and quiet, in grey; only crossing a threshold brings in a status colour, and it always brings the icon and words with it ([patterns 10.40](../patterns/10-data-display.md), [10.85](../patterns/10-data-display.md)).

| Direction | Crossing means | Example |
|---|---|---|
| high is bad (default) | the value rises past a threshold | storage, memory, queue capacity |
| low is bad | the value falls below a threshold | battery, consumables such as labels or ribbon |

The track always fills from the start; Direction only decides which side of a threshold is the problem.

Shape: rounded (default) → `--meter-track-radius-rounded` on track and indicator; sharp → `--meter-track-radius-sharp`. In the AAA modes the component is always sharp (DESIGN.md §5).

## States
| State | What changes |
|---|---|
| static | a meter has no hover, pressed, focus or disabled states; only the value changes it |
| value change | the indicator grows or shrinks over `--meter-indicator-transition`; the status, its colour and its line change together when a threshold is crossed |
| unknown | the device hasn't reported a value: no indicator, and the amount reads "Unknown" or the last known value with its time ([patterns 10.79](../patterns/10-data-display.md)) |

Under reduced motion the indicator jumps to the new value; the colour change stays ([patterns 6.66](../patterns/06-accessibility.md)).

## Spacing & Sizing
| Part | Token |
|---|---|
| Label row → track → status line | `--meter-container-gap` |
| Label ↔ amount | `--meter-label-gap` |
| Track height | `--meter-track-height` |
| Threshold mark | `--meter-threshold-width` × `--meter-threshold-height` |
| Status icon ↔ words | `--meter-status-gap` |
| Status icon | `--meter-icon-size` |

Width comes from the container; the meter never grows with its content. These measurements are draft placeholders from the nearest existing steps; confirm them in Figma.

## Properties
| Property | Options | Default |
|---|---|---|
| Label | text, the measure ("Storage") | — |
| Value / Total | numbers with a unit | — |
| Amount text | text, the value in words | "Value of Total unit" |
| Warning threshold | a value, or none | none |
| Error threshold | a value, or none | none |
| Direction | high is bad, low is bad | high is bad |
| Status text | text, one per status | — |
| Shape | rounded, sharp | rounded |

## Usage
- Use a meter for a used-of-total value with a real limit; it shows quantity by length, from zero ([patterns 10.56](../patterns/10-data-display.md)). For progress through a task, use [Progress Bar](../atoms/progress-bar.md); for a part of a whole with several parts, a stacked bar in a [Chart](../organisms/chart.md).
- Keep it grey until a threshold is crossed. A meter that is always coloured stops signalling anything ([patterns 10.67](../patterns/10-data-display.md)).
- Name the status in words that say what to do where action is needed ("Battery low, charge soon"), using the product's fixed status words ([patterns 7.51](../patterns/07-content-copy.md)).
- Show at most two thresholds. Flag only conditions that need a response ([patterns 10.81](../patterns/10-data-display.md)).
- Where the value can go stale, say when it was last reported ([patterns 10.79](../patterns/10-data-display.md)).

## Accessibility
- Expose it as a meter (`role="meter"`) with its value, minimum, maximum and a name; set the value text to the words shown, including the threshold ("72 of 128 GB, warns at 100 GB, storage almost full") ([patterns 10.85](../patterns/10-data-display.md)).
- The status is never colour alone: past a threshold the icon and the words carry it ([patterns 6.11](../patterns/06-accessibility.md)). The status icon is decorative; the words are the name.
- Check `--meter-indicator-background` against `--meter-track-background` on the surface it sits on; the threshold marks must stand out from both.
- A status change while a person is on the screen is announced politely by the surrounding structure, not by the meter.

## Claude Prompt
Draw a Zebra meter: a `--meter-label-font` label ("Storage") on the left with the amount ("72 of 128 GB") in smaller grey text (`--meter-value-foreground`) beside it, then a full-width `--meter-track-height` light grey track (`--meter-track-background`) filled from the left in dark grey (`--meter-indicator-background`). Thin dark vertical marks (`--meter-threshold-background`) cross the track at the warning and error thresholds. Past a threshold the fill turns amber (`--meter-warning-indicator-background`) or red (`--meter-error-indicator-background`), and a line beneath shows a matching warning or error icon with words such as "Storage almost full".
