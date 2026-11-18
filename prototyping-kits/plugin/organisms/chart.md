---
name: Chart
level: organism
status: draft
composes: [../organisms/table.md, ../molecules/segmented-control.md, ../molecules/empty-state.md, ../atoms/tooltip.md, ../atoms/button.md, ../atoms/icon.md, ../atoms/skeleton.md]
tokens:
  # container
  chart-container-background: '{colors.color-fill-default}'
  chart-container-border-color: '{colors.color-line-default}'
  chart-container-border-width: '{stroke.stroke-thin}'
  chart-container-radius-rounded: '{radius.radius-element-md}'
  chart-container-radius-sharp: '{radius.radius-none}'
  chart-container-padding: '{space.space-card}'
  chart-container-gap: '{space.space-lg}'
  # header
  chart-header-gap: '{space.space-md}'
  chart-title-font: '{typography.type-title-medium}'
  chart-title-foreground: '{colors.color-ink-high}'
  chart-subtitle-font: '{typography.type-body-small}'
  chart-subtitle-foreground: '{colors.color-ink-medium}'
  chart-title-gap: '{space.space-sm}'
  # plot
  chart-plot-min-height: '{primitives.scale-container-0}'
  chart-plot-gap: '{space.space-sm}'
  chart-gridline-color: '{colors.color-line-subtle}'
  chart-gridline-width: '{stroke.stroke-thin}'
  chart-axis-line-color: '{colors.color-line-default}'
  chart-axis-line-width: '{stroke.stroke-thin}'
  chart-zero-line-color: '{colors.color-line-strong}'
  chart-axis-label-font: '{typography.type-body-xsmall}'
  chart-axis-label-foreground: '{colors.color-ink-medium}'
  chart-axis-title-font: '{typography.type-label-small}'
  chart-axis-title-foreground: '{colors.color-ink-medium}'
  chart-axis-tick-gap: '{space.space-2xs}'
  # marks
  chart-bar-radius-rounded: '{radius.radius-xs}'
  chart-bar-radius-sharp: '{radius.radius-none}'
  chart-bar-gap: '{space.space-3xs}'
  chart-bar-category-gap: '{space.space-md}'
  chart-segment-separator-color: '{colors.color-fill-default}'
  chart-segment-separator-width: '{stroke.stroke-thin}'
  chart-line-width: '{stroke.stroke-thick}'
  chart-point-size: '{primitives.scale-5}'
  chart-point-radius: '{radius.radius-pill}'
  chart-point-border-color: '{colors.color-fill-default}'
  chart-point-border-width: '{stroke.stroke-thick}'
  chart-pattern-color: '{colors.color-fill-default}'
  chart-direct-label-font: '{typography.type-label-small}'
  chart-direct-label-foreground: '{colors.color-ink-high}'
  # series colours: a fixed categorical order (data-1 and data-11 are never categories)
  chart-series-1-color: '{colors.color-data-2}'
  chart-series-2-color: '{colors.color-data-3}'
  chart-series-3-color: '{colors.color-data-4}'
  chart-series-4-color: '{colors.color-data-5}'
  chart-series-5-color: '{colors.color-data-6}'
  chart-series-6-color: '{colors.color-data-7}'
  chart-series-7-color: '{colors.color-data-8}'
  chart-series-8-color: '{colors.color-data-9}'
  chart-series-9-color: '{colors.color-data-10}'
  chart-series-10-color: '{colors.color-data-12}'
  chart-series-highlight-color: '{colors.color-data-1}'
  chart-series-context-color: '{colors.color-data-neutral}'
  # reference lines
  chart-reference-line-width: '{stroke.stroke-thick}'
  chart-target-line-color: '{colors.color-line-stronger}'
  chart-reference-line-color-warning: '{colors.color-status-warning-default}'
  chart-reference-line-color-error: '{colors.color-status-error-default}'
  # legend
  chart-legend-gap: '{space.space-lg}'
  chart-legend-item-gap: '{space.space-2xs}'
  chart-legend-item-padding-y: '{space.space-2xs}'
  chart-legend-item-padding-x: '{space.space-xs}'
  chart-legend-item-radius: '{radius.radius-element-sm}'
  chart-legend-item-background-hover: '{colors.color-fill-faint}'
  chart-legend-item-border-color-selected: '{colors.color-line-selection}'
  chart-legend-item-border-width-selected: '{stroke.stroke-thick}'
  chart-legend-swatch-size: '{primitives.scale-6}'
  chart-legend-label-font: '{typography.type-label-medium}'
  chart-legend-label-foreground: '{colors.color-ink-high}'
  # data tooltip (the Tooltip's surface, several lines)
  chart-tooltip-background: '{tooltip.tooltip-container-background}'
  chart-tooltip-foreground: '{tooltip.tooltip-label-foreground}'
  chart-tooltip-radius: '{tooltip.tooltip-container-radius-rounded}'
  chart-tooltip-shadow: '{tooltip.tooltip-container-shadow}'
  chart-tooltip-padding-y: '{space.space-sm}'
  chart-tooltip-padding-x: '{space.space-md}'
  chart-tooltip-gap: '{space.space-2xs}'
  chart-tooltip-label-font: '{typography.type-label-small}'
  chart-tooltip-value-font: '{typography.type-label-medium}'
  chart-crosshair-color: '{colors.color-line-strong}'
  # notes and freshness
  chart-note-font: '{typography.type-body-xsmall}'
  chart-note-foreground: '{colors.color-ink-medium}'
  # focus
  chart-focus-ring-width: '{stroke.stroke-thick}'
  chart-focus-ring-color: '{colors.color-line-focus}'
---

# Chart

> A bar, line or stacked bar chart in a titled frame, with axes, direct labels or a legend, a data tooltip and a visible table of the same data.

## Anatomy
1. Container — a `--chart-container-background` frame with a `--chart-container-border-width` `--chart-container-border-color` border and `--chart-container-radius-rounded` corners, padded `--chart-container-padding`, its parts `--chart-container-gap` apart. Empty, loading and error states sit inside it with the title kept ([patterns 10.75](../patterns/10-data-display.md)).
2. Header — `--chart-header-gap` between the titles and the view switch:
   - Title — `--chart-title-font` `--chart-title-foreground`. An explanatory chart states its finding ("Returns doubled in March"); a monitoring chart names the measure, scope and period ("Scans per hour, Store 12, today") ([patterns 10.65](../patterns/10-data-display.md), [10.101](../patterns/10-data-display.md)).
   - Subtitle (optional) — units, precise detail, the period, in `--chart-subtitle-font` `--chart-subtitle-foreground`, `--chart-title-gap` below the title.
   - View switch — a [Segmented Control](../molecules/segmented-control.md) with two segments: Chart and Table.
3. Plot — at least `--chart-plot-min-height` tall (draft placeholder), filling the frame's width.
   - Value axis — at the leading edge by default, a few ticks at familiar steps (fewer on compact), labels in `--chart-axis-label-font` `--chart-axis-label-foreground` with tabular figures, `--chart-axis-tick-gap` from the plot. Optional axis title in `--chart-axis-title-font` `--chart-axis-title-foreground`, carrying the unit ([patterns 10.46](../patterns/10-data-display.md), [10.62](../patterns/10-data-display.md), [10.63](../patterns/10-data-display.md)).
   - Category or time axis — the baseline, a `--chart-axis-line-width` `--chart-axis-line-color` line. With negative values the zero line is `--chart-zero-line-color`.
   - Gridlines — absent or faint: `--chart-gridline-width` `--chart-gridline-color`, horizontal only.
   - Marks — bars, segments, lines and points (see Variants).
   - Reference line (optional) — a target or limit across the value axis, `--chart-reference-line-width` thick, with a short label ([patterns 10.84](../patterns/10-data-display.md), [10.86](../patterns/10-data-display.md)).
   - Direct labels — each series named at its end or on its bar, `--chart-direct-label-font` `--chart-direct-label-foreground` ([patterns 10.64](../patterns/10-data-display.md)).
4. Legend (only when direct labels won't fit, never for one series) — a row of legend items `--chart-legend-gap` apart, in the same place on every chart in a set. Each item is a button: a `--chart-legend-swatch-size` swatch in the series colour (and its pattern), `--chart-legend-item-gap` before a `--chart-legend-label-font` `--chart-legend-label-foreground` label, padded `--chart-legend-item-padding-y` / `--chart-legend-item-padding-x` with `--chart-legend-item-radius` corners.
5. Data tooltip — on hover, focus or a touch slide across the plot: the point's category or time and each value with its unit, `--chart-tooltip-label-font` labels over `--chart-tooltip-value-font` values, on the [Tooltip](../atoms/tooltip.md)'s surface (`--chart-tooltip-background`, `--chart-tooltip-foreground`, `--chart-tooltip-radius`, `--chart-tooltip-shadow`), padded `--chart-tooltip-padding-y` / `--chart-tooltip-padding-x`, lines `--chart-tooltip-gap` apart. A `--chart-crosshair-color` line marks the point being read on a line chart ([patterns 10.71](../patterns/10-data-display.md)).
6. Table view — a [Table](table.md) of the same data, one row per category or time, one column per series, numbers right-aligned in tabular figures. Shown by the view switch; never hidden from sighted people ([patterns 10.73](../patterns/10-data-display.md)).
7. Notes (optional) — source, last updated time, "Paused" while a live chart is held, in `--chart-note-font` `--chart-note-foreground` ([patterns 10.78](../patterns/10-data-display.md), [10.79](../patterns/10-data-display.md)).

## Variants
| Type | Use | Marks |
|---|---|---|
| bar (default) | ranking or comparing categories; totals over time | bars from zero, `--chart-bar-radius-rounded` on the value end only, `--chart-bar-gap` within a group, `--chart-bar-category-gap` between categories. Vertical columns, or horizontal bars on compact and wherever labels are long ([patterns 10.58](../patterns/10-data-display.md)) |
| line | change over time | `--chart-line-width` lines; `--chart-point-size` round points (`--chart-point-radius`) with a `--chart-point-border-width` `--chart-point-border-color` ring at the latest value and on focus. A gap in the data stays a gap ([patterns 10.61](../patterns/10-data-display.md)) |
| stacked bar | part of a whole | segments of one bar from zero, separated by a `--chart-segment-separator-width` `--chart-segment-separator-color` gap ([patterns 10.69](../patterns/10-data-display.md)); the same series sits in the same place in every bar |

Bars and stacked bars always start at zero ([patterns 10.59](../patterns/10-data-display.md)). The chart type follows the relationship shown ([patterns 10.54](../patterns/10-data-display.md)); for a used-of-total value use a [Meter](../atoms/meter.md), and for a word-sized trend a [Sparkline](../atoms/sparkline.md).

**Series colour** ([patterns 10.66–10.68](../patterns/10-data-display.md)):

| Data | Colour |
|---|---|
| Categories, in this fixed order | `--chart-series-1-color` … `--chart-series-10-color` |
| One series, or the one series that matters | `--chart-series-highlight-color` |
| Context (other series, a previous period) | `--chart-series-context-color` |
| A limit or threshold | `--chart-reference-line-color-warning` / `--chart-reference-line-color-error` |
| A target | `--chart-target-line-color`, quieter than the measure |

The categorical order skips the data palette's first colour (the action blue, which is `--chart-series-highlight-color` and never one category among others) and its red (never a category, because red reads as error). Status colours mean status only. A category keeps its colour on every chart in the product. Past about five series, use small multiples or group the categories ([patterns 10.57](../patterns/10-data-display.md), [10.76](../patterns/10-data-display.md)).

**Pattern:** where two series sit next to each other without direct labels (stacked segments, grouped bars), each also carries a pattern, stripes of `--chart-pattern-color` in a fixed order, so colour is never the only difference ([patterns 6.15](../patterns/06-accessibility.md)).

Shape: rounded (default) → `--chart-container-radius-rounded` and `--chart-bar-radius-rounded`; sharp → `--chart-container-radius-sharp` and `--chart-bar-radius-sharp`. In the AAA modes the component is always sharp (DESIGN.md §5). No 3-D, gradients, shadows on marks or shine ([patterns 10.70](../patterns/10-data-display.md)).

## States
| Part | State | Treatment |
|---|---|---|
| Chart | loading | the title and axes stay; the plot shows a [Skeleton](../atoms/skeleton.md) block |
| | empty | an [Empty State](../molecules/empty-state.md), compact, inside the frame, saying why: "No scans in this period" or "Nothing matches these filters" |
| | error | Empty State, Can't show, with Retry, inside the frame |
| | live, paused | the note reads "Paused" with the time it was held; on resume it jumps to the latest data and says so |
| | stale | the note reads "Last updated 10:42" with a `warning` [Icon](../atoms/icon.md); a gap in a live line stays visible |
| Mark (bar, segment, point) | hover / focused | the data tooltip shows; a focused mark also gets a `--chart-focus-ring-width` `--chart-focus-ring-color` ring |
| Legend item | enabled | swatch and label |
| | hover | `--chart-legend-item-background-hover`; the other series turn `--chart-series-context-color` |
| | selected | `--chart-legend-item-border-width-selected` `--chart-legend-item-border-color-selected` border; only its series shows, and a "Show all" [Button](../atoms/button.md), text, small, returns the rest ([patterns 10.72](../patterns/10-data-display.md)) |
| | focused | `--chart-focus-ring-width` `--chart-focus-ring-color` ring |

Data changes don't animate the marks; under reduced motion nothing in the chart moves. New data is announced (see Accessibility).

## Spacing & Sizing
Measurements are provisional: the component has no Figma source yet. `--chart-plot-min-height` and `--chart-point-size` are draft placeholders on the closest existing step.

| Part | Value |
|---|---|
| Container | `--chart-container-padding` on all sides, `--chart-container-gap` between header, plot, legend and notes |
| Header | `--chart-header-gap` between titles and view switch; `--chart-title-gap` between title and subtitle |
| Plot | at least `--chart-plot-min-height` tall, full width; tick labels `--chart-axis-tick-gap` from the plot |
| Bars | `--chart-bar-gap` within a group, `--chart-bar-category-gap` between categories |
| Legend | `--chart-legend-gap` between items; swatch `--chart-legend-swatch-size`, `--chart-legend-item-gap` before the label |
| Data tooltip | `--chart-tooltip-padding-y` / `--chart-tooltip-padding-x`, `--chart-tooltip-gap` between lines |

Width fills its container. Every number in the chart and its table uses tabular figures (CSS `font-variant-numeric: tabular-nums`), so digits line up.

## Properties
| Property | Options | Default |
|---|---|---|
| Type | bar, line, stacked bar | bar |
| Orientation | vertical, horizontal (bar and stacked bar) | vertical; horizontal on compact |
| Shape | rounded, sharp | rounded |
| Title | text | — |
| Subtitle | text | — |
| Series | name, values, colour slot (1–10, highlight, context), pattern | — |
| Labels | direct, legend | direct |
| Value axis | range: fit, fixed (min, max); unit | fit |
| Gridlines | on / off | on |
| Reference line | none, target, warning limit, error limit (value and label) | none |
| View | chart, table | chart |
| Live | on / off (adds pause and last updated) | off |
| State | default, loading, empty, error | default |

## Usage
- Use a chart only when the message is in the shape of the data; values people only look up go in a [Table](table.md) ([patterns 10.1](../patterns/10-data-display.md), [10.2](../patterns/10-data-display.md)).
- Label series directly; reach for the legend only when labels won't fit.
- Give one series the highlight colour and the rest the context grey when one thing matters; use the categorical order when every series matters equally.
- Use a fixed range for quantities with real limits (0 to 100%), a fitted range otherwise ([patterns 10.60](../patterns/10-data-display.md)). Don't cut a bar's axis above zero; switch to a line or points.
- Shorten, then thin tick labels before rotating them; on compact, switch to horizontal bars first.
- Put the unit in the axis title or subtitle, and in every tooltip value.
- A live chart keeps a fixed time window, can be paused and shows when it last updated ([patterns 10.80](../patterns/10-data-display.md)).
- Composed parts (Segmented Control, Table, Empty State, Tooltip, Button, Skeleton) bring their own states, sizes and focus rings.

## Accessibility
- The chart has a short text description of what it shows and what its colours mean, in real values ("Returns rose from 120 in January to 260 in March"), as its accessible name and description ([patterns 10.73](../patterns/10-data-display.md), [6.15](../patterns/06-accessibility.md)).
- The table view is a real `table`, visible to everyone through the view switch.
- Series are told apart by direct label or pattern, never colour alone.
- Keyboard: the plot is one stop; arrow keys move from point to point (or bar to bar) in reading order, and the tooltip reads out. Legend items are buttons with `aria-pressed` ([patterns 10.74](../patterns/10-data-display.md)).
- On touch the whole plot is the target: sliding across it reads values; the tooltip never holds the only copy of something critical.
- Data changes are announced in a polite live region ("Updated 10:45, 312 scans"), not only redrawn.
- Axis and tooltip labels spell out dates and units ("6 June", "60 minutes") for assistive technology ([patterns 10.49](../patterns/10-data-display.md)).
- Marks that carry meaning meet the non-text contrast floor against the frame; data colours are never used for text.

## Claude Prompt
Draw a white chart card (`--chart-container-background`) with a thin `--chart-container-border-color` border and `--chart-container-radius-rounded` corners, padded `--chart-container-padding`. At the top left, a title in `--chart-title-font` that states the finding, "Returns doubled in March", with a grey subtitle "Units, last 6 months"; at the top right, a segmented control reading Chart | Table. Below, a bar chart: grey tick labels in `--chart-axis-label-font` at the left edge (0, 100, 200, 300), faint horizontal gridlines (`--chart-gridline-color`), a baseline (`--chart-axis-line-color`), and six month columns in the highlight blue (`--chart-series-highlight-color`) with slightly rounded tops, the March column labelled "260" above it. A solid target line in `--chart-target-line-color` crosses at 200 with the label "Target". Under the plot, a grey note in `--chart-note-font`: "Source: returns log. Last updated 10:42".
