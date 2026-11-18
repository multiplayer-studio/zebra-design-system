---
name: Fleet Overview
level: template
status: draft
composes: [../../organisms/dialog.md, ../../organisms/global-header.md, ../../organisms/map-view.md, ../../organisms/navigation-bar.md, ../../organisms/navigation-rail.md, ../../organisms/right-drawer-panel.md, ../../organisms/table.md, ../../organisms/top-app-bar.md, ../../molecules/commit-bar.md, ../../molecules/dropdown-menu.md, ../../molecules/empty-state.md, ../../molecules/filter-selection-bar.md, ../../molecules/list-item.md, ../../molecules/search.md, ../../molecules/segmented-control.md, ../../molecules/site-switcher.md, ../../atoms/button.md, ../../atoms/filter-chip.md, ../../atoms/icon-button.md, ../../atoms/meter.md, ../../atoms/status-label.md]
---

# Fleet Overview

> A screen for managing many devices at once: a status summary that doubles as the first filter, a live table of devices, and a commit area that states the scope of any action across them.

It embodies the fleet rules ([patterns 1.139](../../patterns/01-screen-composition.md), [patterns 1.140](../../patterns/01-screen-composition.md), [patterns 10.99](../../patterns/10-data-display.md), [patterns 10.98](../../patterns/10-data-display.md)) and device states ([patterns 4.70](../../patterns/04-states-feedback.md)). Used for device, printer and scanner fleets, and any large managed collection across sites.

## Anatomy

1. **Shell**: from medium up, [Global Header](../../organisms/global-header.md), Rounded off (sharp, full width; [Global Header Usage](../../organisms/global-header.md#usage)) with the [Site Switcher](../../molecules/site-switcher.md) ([patterns 1.54](../../patterns/01-screen-composition.md)) and a [Navigation Rail](../../organisms/navigation-rail.md); at compact, [Top App Bar](../../organisms/top-app-bar.md) type default and [Navigation Bar](../../organisms/navigation-bar.md).
2. **Title row**: page title (h1) with the total ("Devices · 1,240"), the scope ("Site 4", or "All sites") ([patterns 10.101](../../patterns/10-data-display.md)); page actions at the trailing end, for example [Button](../../atoms/button.md) "Add devices", flavour outline, size medium ([patterns 1.53](../../patterns/01-screen-composition.md)).
3. **Status summary** (first filter) ([patterns 1.139](../../patterns/01-screen-composition.md)): a row of [Filter Chip](../../atoms/filter-chip.md)s, one per state in order of severity, each labelled with the state word and its count ("Error 12", "Needs attention 30", "Updating 6", "Offline 41", "Connected 1,151"), counts adding to the total ([patterns 10.99](../../patterns/10-data-display.md)). One chip is active at a time; choosing one filters the table below in place ([patterns 1.89](../../patterns/01-screen-composition.md)). Active again, or "All", clears it.
4. **Search, filters and sort**: a [Search](../../molecules/search.md) size medium at the leading end; "More filters" as a [Button](../../atoms/button.md) flavour outline-subtle with leading icon `filter`; sort at the trailing end showing the current sort ([patterns 1.84](../../patterns/01-screen-composition.md), [patterns 1.86](../../patterns/01-screen-composition.md), [patterns 1.90](../../patterns/01-screen-composition.md)). Active filters (other than the status chip) show below as a [Filter Selection Bar](../../molecules/filter-selection-bar.md) with the trailing clear button ([patterns 1.88](../../patterns/01-screen-composition.md)).
5. **Result count and live hold**: "Showing 41 of 1,240" between the filters and the table ([patterns 1.91](../../patterns/01-screen-composition.md)); when live updates arrive, a [Button](../../atoms/button.md) flavour text "12 updated" applies them when chosen ([patterns 10.98](../../patterns/10-data-display.md)).
6. **Devices**: a [Table](../../organisms/table.md), Selectable on, Row Actions menu, Column Position frozen (identifier), Column Settings on, Live updates hold ([patterns 1.94](../../patterns/01-screen-composition.md)). Columns: identifier (name and serial in the Key Value List mono value style), connection, condition, each a [Status Label](../../atoms/status-label.md) shape sharp, leading icon, kept separate ([patterns 4.70](../../patterns/04-states-feedback.md)); site; battery or media as a [Meter](../../atoms/meter.md) marked approximate where estimated ([patterns 10.104](../../patterns/10-data-display.md)); last seen, with one named time zone in the header ([patterns 10.103](../../patterns/10-data-display.md)). Normal states are plain text ([patterns 10.41](../../patterns/10-data-display.md)).
7. **Selection**: selecting rows shows the selected count in the table's controls bar, and the header actions give way to the actions that apply to all of them ([patterns 1.80](../../patterns/01-screen-composition.md)).
8. **Commit area** (only while rows are selected): a [Commit Bar](../../molecules/commit-bar.md), Scope pane, spanning the table's pane ([patterns 1.22](../../patterns/01-screen-composition.md), [patterns 1.75](../../patterns/01-screen-composition.md)). Show Scope on, Scope text the count and site next to the commit ("48 devices at Site 4") ([patterns 1.140](../../patterns/01-screen-composition.md)). Cancel clears the selection; Secondary commit on for one secondary action; Primary label the action ("Update firmware"). Further actions go into a [Dropdown Menu](../../molecules/dropdown-menu.md) from an [Icon Button](../../atoms/icon-button.md) `more_vertical`, flavour subtle, in the table's controls bar ([patterns 1.78](../../patterns/01-screen-composition.md)).
9. **Confirming a bulk action**: a [Dialog](../../organisms/dialog.md) flavour warning whose title states the count and scope ("Restart 48 devices at Site 4?"), and that offline devices will be queued, not done ([patterns 3.135](../../patterns/03-controls-interaction.md), [patterns 7.44](../../patterns/07-content-copy.md), [patterns 7.45](../../patterns/07-content-copy.md)). Where some selected devices can't take the action, the dialog says how many and offers to go ahead with the rest ([patterns 4.44](../../patterns/04-states-feedback.md)). The irreversible ones use [Type To Confirm](type-to-confirm.md); results follow [Batch Result](batch-result.md).
10. **Map** (optional, when location matters) ([patterns 10.91](../../patterns/10-data-display.md)): a [Segmented Control](../../molecules/segmented-control.md) flavour text only ("Table", "Map") in the title row swaps the table for a [Map View](../../organisms/map-view.md), Type markers, whose own list (List beside at expanded, switch below) stays in step with the map and keeps the table's filters ([patterns 10.93](../../patterns/10-data-display.md)).

States:
- **Loading**: the table's skeleton rows under its real column headers ([patterns 1.128](../../patterns/01-screen-composition.md), [patterns 4.17](../../patterns/04-states-feedback.md)).
- **No match**: an [Empty State](../../molecules/empty-state.md) type No results, compact on, in place of the rows, with "Clear filters" ([patterns 1.128](../../patterns/01-screen-composition.md)).
- **No permission for a value**: shown as restricted, never as missing or zero ([patterns 10.102](../../patterns/10-data-display.md)).

The composed components govern their own colours, states, sizes, radius and focus rings. The template only places them.

## Layout

```
┌──────────────────────────────────────────────────────────────┐
│ 1 Global Header …………………………… [Site 4 ▾] …………………………… (account) │
├────┬─────────────────────────────────────────────────────────┤
│ 1  │ 2 Devices · 1,240 · Site 4                [Add devices] │
│ R  │ 3 (Error 12)(Needs attention 30)(Updating 6)(Offline 41)│
│ a  │   (Connected 1,151)                                     │
│ i  │ 4 [Search……………]  [More filters]          Sort: Status ▾ │
│ l  │ 5 Showing 41 of 1,240                     [12 updated]  │
│    │ 6 ┌─☐─Name/serial─┬Connection┬Condition┬Site┬Battery──┐ │
│    │   │ ☐ ZT411-0042  │ Offline  │ Unknown │ S4 │ ▮▮▯ 40% │ │
│    │   └───────────────┴──────────┴─────────┴────┴─────────┘ │
│    │ 8       48 devices at Site 4 [Cancel] [Update firmware] │
└────┴─────────────────────────────────────────────────────────┘
```

- One pane under the header; the table may run the full width ([patterns 5.11](../../patterns/05-sizes-devices.md)). Margins `--grid-margin` from medium up, `--space-page` at compact. Regions 2 to 5 sit `--space-lg` apart; the table sits `--space-xl` below them.
- The table scrolls inside its region with a sticky header; the page never scrolls sideways ([patterns 1.97](../../patterns/01-screen-composition.md)). The Commit Bar is pinned to the bottom of the pane.
- The status summary, search and table toolbar match the table's row density ([patterns 5.49](../../patterns/05-sizes-devices.md)).

## Responsiveness

- **Compact** (below `--breakpoint-medium-min`): margins `--space-page`. The status chips are a single row that scrolls sideways, the cut-off chip partly visible ([patterns 1.88](../../patterns/01-screen-composition.md)). Search becomes an icon that opens full screen; filters sit behind one control showing how many are active, opening a full-screen sheet with Apply ([patterns 1.87](../../patterns/01-screen-composition.md)). The table becomes a list of [List Item](../../molecules/list-item.md)s, Lines two, Leading checkbox while selecting, label the identifier, supporting text two key values, Trailing status ([patterns 1.96](../../patterns/01-screen-composition.md)). Selection uses [Top App Bar](../../organisms/top-app-bar.md) type contextual (count and actions) and the Commit Bar stacks its buttons full width, primary on top ([patterns 1.77](../../patterns/01-screen-composition.md)).
- **Medium** (from `--breakpoint-medium-min`): rail navigation, margins `--grid-margin`. The table keeps the identifier, status and two priority columns; the rest leave in priority order and appear in the row's detail ([patterns 5.20](../../patterns/05-sizes-devices.md)). Filters collapse behind "Filters (2)" ([patterns 5.25](../../patterns/05-sizes-devices.md)).
- **Expanded** (from `--breakpoint-expanded-min`): the full table as drawn. Opening a row shows its detail in a [Right Drawer Panel](../../organisms/right-drawer-panel.md) variant persistent beside the table, or its own page for deep records ([patterns 1.98](../../patterns/01-screen-composition.md)).
- **Large** (from `--breakpoint-large-min`): as expanded; the detail panel may stay open beside the table. Filters may move to a leading column when there are many types ([patterns 1.86](../../patterns/01-screen-composition.md)).
- **Touch**: every target meets `--control-target-min` ([patterns 6.16](../../patterns/06-accessibility.md)). Filter Chips are shorter than the minimum; extend their hit area to it. On pointer-only consoles the denser table setting may be used, never below `--control-target-pointer-min` ([patterns 6.18](../../patterns/06-accessibility.md)).

## Accessibility

- **Landmarks and headings**: `header`, `nav`, `main`; the Commit Bar is a labelled region. One h1, the page title; the status summary has a visually hidden h2 "Status".
- **Focus order**: title row, status chips, search and filters, result count, table, Commit Bar. When the Commit Bar appears, focus stays in the table; it is the next stop after it. When a chip filters out the focused row, focus moves to the result count ([patterns 6.31](../../patterns/06-accessibility.md)).
- **Keyboard**: the chip row is one stop with arrow keys. The table follows [Table](../../organisms/table.md) Accessibility; the selection checkbox works with Space. Escape clears selection.
- **Names and announcements**: each chip's name includes its count and whether it is active ("Offline, 41 devices, filter on"). Result count and selection count changes are announced politely ([patterns 6.53](../../patterns/06-accessibility.md)). "12 updated" is announced once per batch, not per row. Icon-only controls: "More actions", "Clear filters".
- **Never colour alone**: every status is a word with an icon ([patterns 10.40](../../patterns/10-data-display.md)); the active chip shows a check mark; selected rows show a checked box.

## Usage

- Use for a collection of many like devices whose states drive the work. For a handful of devices, use a list; for one device, a record detail.
- The summary counts every state, worst first, and the counts add up to the total ([patterns 10.99](../../patterns/10-data-display.md)). Don't hide states with zero; show the zero.
- Keep connection and condition as two columns; roll them into one only where space allows a single status, by the most limiting first ([patterns 4.70](../../patterns/04-states-feedback.md), [patterns 4.4](../../patterns/04-states-feedback.md)).
- Every bulk action states its count and scope next to its commit, and in the confirmation ([patterns 1.140](../../patterns/01-screen-composition.md), [patterns 3.135](../../patterns/03-controls-interaction.md)). Actions on an unreachable device are disabled with the reason, or queued and marked waiting where they can wait ([patterns 4.72](../../patterns/04-states-feedback.md)).
- Exports include every matching row, not just those loaded, and say so ([patterns 10.109](../../patterns/10-data-display.md)).
- Draft components, whose measurements are placeholders: Site Switcher, Filter Selection Bar, Meter, Commit Bar, Map View, List Item, Right Drawer Panel, Empty State.

Prototypes using this template: none yet.
