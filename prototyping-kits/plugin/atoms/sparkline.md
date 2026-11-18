---
name: Sparkline
level: atom
status: draft
composes: []
tokens:
  # value
  sparkline-value-font: '{typography.type-label-medium}'
  sparkline-value-foreground: '{colors.color-ink-high}'
  sparkline-container-gap: '{space.space-sm}'
  # plot
  sparkline-line-foreground: '{colors.color-ink-medium}'
  sparkline-line-width: '{stroke.stroke-thick}'
  sparkline-marker-background: '{colors.color-ink-high}'
  sparkline-marker-size: '{primitives.scale-4}'
  sparkline-marker-radius: '{radius.radius-pill}'
  # sizes
  sparkline-plot-width: '{primitives.scale-18}'
  sparkline-plot-height: '{primitives.scale-8}'
---

# Sparkline

> A word-sized line with no axes, beside the number it describes, that shows the shape of its recent history.

## Anatomy
1. Sparkline — a row holding the plot and then the value, `--sparkline-container-gap` apart, vertically centred.
2. Value (optional) — the current number in `--sparkline-value-font` `--sparkline-value-foreground`, with tabular figures. Hide it only where the number already sits beside the sparkline (in the next table cell, say).
3. Plot — a `--sparkline-plot-width` × `--sparkline-plot-height` box with no axes, gridlines, labels or legend. It holds:
   - Line — the series, `--sparkline-line-width` thick in `--sparkline-line-foreground`, with round joins. Gaps in the data stay gaps: the line breaks and is never bridged ([patterns 10.61](../patterns/10-data-display.md)).
   - Latest marker — a `--sparkline-marker-size` dot in `--sparkline-marker-background`, radius `--sparkline-marker-radius`, on the newest point. It ties the line to the value ([patterns 10.77](../patterns/10-data-display.md)).

The plot comes first and the value after it, so time runs towards the number and the latest marker sits right beside it. In right-to-left layouts the whole row mirrors.

## Variants
None. The sparkline is grey in every context: it shows a shape, not a status. When the value is flagged, the status shows on the value's row ([Status Label](../atoms/status-label.md) or an icon with words), not as a coloured line ([patterns 10.67](../patterns/10-data-display.md)).

## States
| State | What changes |
|---|---|
| static | no hover, pressed, focus or disabled states |
| no data | the plot is empty and the value reads "No data" |
| stale | the value carries its last-updated time; the line keeps its last shape ([patterns 10.79](../patterns/10-data-display.md)) |

No transition is defined: a new point redraws the line.

## Spacing & Sizing
| Part | Token |
|---|---|
| Value ↔ plot | `--sparkline-container-gap` |
| Plot | `--sparkline-plot-width` × `--sparkline-plot-height` |
| Line | `--sparkline-line-width` |
| Latest marker | `--sparkline-marker-size` |

The plot height sits within one line of `--sparkline-value-font`, so a sparkline fits a table row or a tile without growing it. Each sparkline scales its own range to its data unless magnitudes are being compared, in which case every sparkline in the column shares one range ([patterns 10.77](../patterns/10-data-display.md)). These measurements are draft placeholders from the nearest existing steps; confirm them in Figma.

## Properties
| Property | Options | Default |
|---|---|---|
| Data | a short series of values over time | — |
| Show Value | on / off | on |
| Range | own, shared | own |
| Text alternative | text, the trend in words | — |

## Usage
- Use it beside a number in a table cell, a list row or a tile, where the shape of recent history helps judge the number ([patterns 10.77](../patterns/10-data-display.md), [10.82](../patterns/10-data-display.md)).
- It shows shape, not values. When people need to read values, use a [Chart](../organisms/chart.md).
- Keep the period the same across a column or set of tiles, and say what it is in the column heading or tile ("Last 7 days").
- A measure people judge also needs its comparison (a target or the previous period) in words beside it ([patterns 10.83](../patterns/10-data-display.md)).

## Accessibility
- The plot is an image with a text alternative that states the trend in real values ("Up from 12 to 18 over 7 days"), not how the line looks ([patterns 10.73](../patterns/10-data-display.md)).
- The value is real text, read before the trend.
- Nothing in it is focusable. Check `--sparkline-line-foreground` against the surface for 3:1 graphic contrast.

## Claude Prompt
Draw a Zebra sparkline: a tiny `--sparkline-plot-width` × `--sparkline-plot-height` grey line chart (`--sparkline-line-foreground`, `--sparkline-line-width` thick) with no axes, gridlines or labels, ending in a small dark dot (`--sparkline-marker-background`) on the latest point, followed `--sparkline-container-gap` later by the current number in `--sparkline-value-font`. It fits inside a table row or a dashboard tile.
