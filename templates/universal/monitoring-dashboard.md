---
name: Monitoring Dashboard
level: template
status: draft
composes: [../../organisms/chart.md, ../../organisms/global-header.md, ../../organisms/navigation-bar.md, ../../organisms/navigation-rail.md, ../../organisms/table.md, ../../organisms/top-app-bar.md, ../../molecules/card.md, ../../molecules/empty-state.md, ../../molecules/list-item.md, ../../molecules/segmented-control.md, ../../molecules/select.md, ../../molecules/site-switcher.md, ../../molecules/system-banner.md, ../../atoms/ai-mark.md, ../../atoms/button.md, ../../atoms/icon-button.md, ../../atoms/meter.md, ../../atoms/skeleton.md, ../../atoms/sparkline.md, ../../atoms/status-label.md]
---

# Monitoring Dashboard

> A screen for watching live operations: exceptions first, then a row of summary tiles, then chart cards, with its scope and freshness always stated and the normal state kept quiet.

It embodies the monitoring screen type ([patterns 1.138](../../patterns/01-screen-composition.md)), the dashboard order ([patterns 1.23](../../patterns/01-screen-composition.md), [patterns 1.102](../../patterns/01-screen-composition.md)) and the live-data rules ([patterns 10.78](../../patterns/10-data-display.md), [patterns 10.79](../../patterns/10-data-display.md), [patterns 10.81](../../patterns/10-data-display.md)). Used for site operations overviews, device health, print volumes, task throughput and any screen whose job is to show what is happening now.

## Anatomy

1. **Shell**: from medium up, [Global Header](../../organisms/global-header.md), Rounded off (sharp, full width; [Global Header Usage](../../organisms/global-header.md#usage)) with the [Site Switcher](../../molecules/site-switcher.md) in its site slot ([patterns 1.54](../../patterns/01-screen-composition.md)) and a [Navigation Rail](../../organisms/navigation-rail.md); at compact, [Top App Bar](../../organisms/top-app-bar.md) type default and [Navigation Bar](../../organisms/navigation-bar.md) ([patterns 1.45](../../patterns/01-screen-composition.md)).
2. **System banner** (only while a system condition holds): one [System Banner](../../molecules/system-banner.md) across the content, below the header ([patterns 1.58](../../patterns/01-screen-composition.md), [patterns 1.59](../../patterns/01-screen-composition.md)).
3. **Title row**: the page title (h1) at the leading edge; at the trailing end, the scope and freshness: a line naming the tenant, sites and period ("Site 4 · Today") ([patterns 10.101](../../patterns/10-data-display.md)), "Updated 2 min ago" ([patterns 4.57](../../patterns/04-states-feedback.md), [patterns 7.61](../../patterns/07-content-copy.md)), a [Segmented Control](../../molecules/segmented-control.md) flavour text only for the period (Today, 7 days, 30 days), an [Icon Button](../../atoms/icon-button.md) `pause` (becomes `play` while paused), flavour subtle, size medium, to pause live updates ([patterns 10.78](../../patterns/10-data-display.md), [patterns 6.58](../../patterns/06-accessibility.md)), and an [Icon Button](../../atoms/icon-button.md) `refresh`, flavour subtle, size medium ([patterns 4.59](../../patterns/04-states-feedback.md)).
4. **Exceptions** (top position, only while there are any) ([patterns 1.138](../../patterns/01-screen-composition.md)): a list of alerts ordered by severity, then age. Each is a [List Item](../../molecules/list-item.md), Lines two, Action open, Leading icon (the severity glyph), label the title with its reason, supporting text the place and time, Trailing status carrying a [Status Label](../../atoms/status-label.md) status error or warning, leading icon ([patterns 1.27](../../patterns/01-screen-composition.md)). Many devices with the same problem are one item with a count ("12 printers out of media") ([patterns 4.93](../../patterns/04-states-feedback.md)). AI-raised alerts carry an [AI Mark](../../atoms/ai-mark.md) "Flagged" and say why ([patterns 9.98](../../patterns/09-ai.md)). When there are none, one quiet line replaces the list: an [Empty State](../../molecules/empty-state.md) type All done, compact on ("No issues at Site 4").
5. **Summary tiles**: one row of three to five equal tiles ([patterns 1.23](../../patterns/01-screen-composition.md), [patterns 1.26](../../patterns/01-screen-composition.md)). Each tile is a [Card](../../molecules/card.md) standard, header off, footer off, holding a label, the value, its comparison (target, previous period or normal range) ([patterns 1.24](../../patterns/01-screen-composition.md), [patterns 10.83](../../patterns/10-data-display.md)) and a [Sparkline](../../atoms/sparkline.md) with its Text alternative, where history matters ([patterns 10.82](../../patterns/10-data-display.md)). A tile whose value crosses a threshold carries a [Status Label](../../atoms/status-label.md) beside the value; colour marks exceptions only. Capacity measures (storage, battery, media) use a [Meter](../../atoms/meter.md) in the tile ([patterns 10.85](../../patterns/10-data-display.md)). The whole tile opens the list behind it.
6. **Chart cards**: [Card](../../molecules/card.md)s standard in order of importance, each with the same inside layout ([patterns 1.25](../../patterns/01-screen-composition.md)): header title, then a [Chart](../../organisms/chart.md) (Type bar, line or stacked bar; Live on for live data) with its legend in the same place on every card, then a footer with one [Button](../../atoms/button.md) flavour text "View details". Live charts keep a fixed moving time window ([patterns 10.80](../../patterns/10-data-display.md)) and keep gaps visible ([patterns 10.79](../../patterns/10-data-display.md)).
7. **Least important last** (optional): a short [Table](../../organisms/table.md), Row Actions off, Selectable off, or list of recent activity, newest first ([patterns 1.109](../../patterns/01-screen-composition.md)).

States:
- **Loading**: a [Skeleton](../../atoms/skeleton.md) of the tile row and card frames ([patterns 4.16](../../patterns/04-states-feedback.md)); each region shows what has loaded while the rest loads ([patterns 4.5](../../patterns/04-states-feedback.md)).
- **Stale or dropped feed**: affected values are marked out of date where they are shown, not just timestamped ([patterns 4.60](../../patterns/04-states-feedback.md), [patterns 10.79](../../patterns/10-data-display.md)).
- **Paused**: the title row says "Paused" in words beside the freshness line; resuming jumps to the latest data and says it was paused ([patterns 10.78](../../patterns/10-data-display.md)).

The composed components govern their own colours, states, sizes, radius and focus rings. The template only places them.

## Layout

```
┌──────────────────────────────────────────────────────────────┐
│ 1 Global Header …………………………… [Site 4 ▾] …………………………… (account) │
├────┬─────────────────────────────────────────────────────────┤
│ 1  │ 2 System banner (only while a condition holds)          │
│ R  │ 3 Operations          Site 4 · Today  Updated 2 min ago │
│ a  │                       [Today|7 days|30 days]  (⏸) (⟳)   │
│ i  │ 4 ▲ 12 printers out of media · Dock 2       [Error]     │
│ l  │   ▲ Scanner 044 battery low · Aisle 7       [Warning]   │
│    │ 5 ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐                   │
│    │   │Tile  │ │Tile  │ │Tile  │ │Tile  │                   │
│    │   └──────┘ └──────┘ └──────┘ └──────┘                   │
│    │ 6 ┌───────────────┐ ┌───────────────┐                   │
│    │   │ Chart card    │ │ Chart card    │                   │
│    │   └───────────────┘ └───────────────┘                   │
│    │ 7 Recent activity                                       │
└────┴─────────────────────────────────────────────────────────┘
```

- The content area scrolls under the header. Margins `--grid-margin` from medium up, `--space-page` at compact. Regions sit `--space-section` apart; tiles and cards sit `--space-gutter` apart; inside a tile parts sit `--space-sm` apart.
- Tiles and chart cards align to the column grid (`--grid-columns-expanded` at expanded); tiles in one row share one size, chart cards in one group share one size ([patterns 1.102](../../patterns/01-screen-composition.md)).
- A dashboard may run the full width ([patterns 5.11](../../patterns/05-sizes-devices.md)); text inside cards keeps its own measure.

## Responsiveness

- **Compact** (below `--breakpoint-medium-min`): one column, margins `--space-page`. Exceptions stay first. Tiles become a two-up grid, or a single row that scrolls sideways with the cut-off tile partly visible. Chart cards stack; a chart that can't be read at this width becomes its key figure plus a list ([patterns 1.104](../../patterns/01-screen-composition.md), [patterns 5.27](../../patterns/05-sizes-devices.md)). The scope and freshness wrap below the title; the period control becomes a [Select](../../molecules/select.md) when its labels don't fit. Navigation is the Navigation Bar.
- **Medium** (from `--breakpoint-medium-min`): rail navigation ([patterns 1.45](../../patterns/01-screen-composition.md)), margins `--grid-margin`, `--grid-columns-medium` columns. Tiles fit in one row where there are four or fewer; chart cards sit one or two to a row.
- **Expanded** (from `--breakpoint-expanded-min`): the layout above, `--grid-columns-expanded` columns, chart cards two to a row.
- **Large** (from `--breakpoint-large-min`): chart cards up to three to a row; tiles stop stretching and keep a readable width ([patterns 5.13](../../patterns/05-sizes-devices.md)). A wall display read from across a room uses larger type roles and fewer tiles ([patterns 5.67](../../patterns/05-sizes-devices.md)).
- **Touch**: every target meets `--control-target-min` ([patterns 6.16](../../patterns/06-accessibility.md)); the Icon Buttons at size medium get a hit area of at least `--control-target-min` on touch. Whole tiles and cards are targets; their footer button is a separate target after them ([patterns 6.36](../../patterns/06-accessibility.md)).

## Accessibility

- **Landmarks and headings**: Global Header or Top App Bar is `header`; the rail or bar is `nav`; the content is `main`. One h1, the page title. "Needs attention", "Summary" and each chart card's title are h2.
- **Focus order**: title row controls, exceptions, tiles, chart cards, activity. Nothing is focused in advance on arrival ([patterns 6.26](../../patterns/06-accessibility.md)). Updates never move focus, and rows don't move while focused or pointed at ([patterns 10.98](../../patterns/10-data-display.md)).
- **Keyboard**: the exceptions list and tiles are reached by Tab; each opens with Enter. The period control is one stop with arrow keys ([patterns 6.35](../../patterns/06-accessibility.md)). Pause stops all live changes, including moving counts and charts ([patterns 6.67](../../patterns/06-accessibility.md)).
- **Names and announcements**: Pause and Refresh are named "Pause live updates" / "Resume live updates" and "Refresh". New exceptions are announced politely, and assertively only for errors that need action now ([patterns 6.54](../../patterns/06-accessibility.md)); routine value changes are not announced. Each chart has its table alternative ([Chart](../../organisms/chart.md) Usage). Each Sparkline has its text alternative.
- **Never colour alone**: exceptions carry a glyph and a word; tiles past a threshold carry a Status Label; Meters state the threshold in words ([patterns 10.40](../../patterns/10-data-display.md), [patterns 10.85](../../patterns/10-data-display.md)).

## Usage

- Use to show what is happening. Why it is happening belongs on the screen each tile or card opens ([patterns 1.23](../../patterns/01-screen-composition.md)).
- The normal state is quiet. Don't colour healthy values or put a success status on them ([patterns 10.41](../../patterns/10-data-display.md), [patterns 1.138](../../patterns/01-screen-composition.md)).
- Keep the tile row to the few measures that matter most; a count that is itself the alert ("3 printers offline") stands alone without a comparison ([patterns 1.24](../../patterns/01-screen-composition.md)).
- Only conditions that need a response are flagged, at two levels, error and warning ([patterns 10.81](../../patterns/10-data-display.md)).
- Every total, average and chart says which tenant, sites and period it covers ([patterns 10.101](../../patterns/10-data-display.md)); restricted values are marked restricted, not zero ([patterns 10.102](../../patterns/10-data-display.md)).
- No primary button: a monitoring screen is a hub with several ways forward ([patterns 1.40](../../patterns/01-screen-composition.md)).
- Draft components, whose measurements are placeholders: Site Switcher, List Item, AI Mark, Empty State, Sparkline, Meter, Chart, Skeleton.

Prototypes using this template: none yet.
