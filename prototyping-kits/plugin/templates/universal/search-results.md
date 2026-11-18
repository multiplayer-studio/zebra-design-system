---
name: Search Results
level: template
status: draft
composes: [../../organisms/bottom-sheet.md, ../../organisms/global-header.md, ../../organisms/navigation-bar.md, ../../organisms/navigation-rail.md, ../../organisms/table.md, ../../organisms/top-app-bar.md, ../../molecules/dropdown-menu.md, ../../molecules/empty-state.md, ../../molecules/filter-selection-bar.md, ../../molecules/list-item.md, ../../molecules/menu-item.md, ../../molecules/pagination.md, ../../molecules/search.md, ../../molecules/segmented-control.md, ../../atoms/button.md, ../../atoms/filter-chip.md, ../../atoms/progress-bar.md, ../../atoms/skeleton.md, ../../atoms/status-label.md]
---

# Search Results

> Find things by searching: the query at the top, filters and sort above the results, a result count, then the results, with recent searches before typing and a clear no-results state.

Use it for global search across a product and for an area's own search page ([patterns 2.68](../../patterns/02-navigation-flow.md)).

## Anatomy
1. **Header.** [Top App Bar](../../organisms/top-app-bar.md) at compact; while searching it is type search, the field filling the bar beside back ([patterns 1.85](../../patterns/01-screen-composition.md)). From medium, [Global Header](../../organisms/global-header.md), Rounded off (sharp, full width; [Global Header Usage](../../organisms/global-header.md#usage)), whose Search at the trailing end, before account, opens this page ([patterns 1.56](../../patterns/01-screen-composition.md)).
2. **Global navigation.** [Navigation Bar](../../organisms/navigation-bar.md) at compact (hidden while the search field has focus), [Navigation Rail](../../organisms/navigation-rail.md) from medium.
3. **Search field.** From medium, [Search](../../molecules/search.md) size large at the top of the content, holding the query ([patterns 1.84](../../patterns/01-screen-composition.md)). It searches everything by default.
4. **Suggestions** (while the field has focus and before results). Recent and suggested searches as [Menu Item](../../molecules/menu-item.md) rows under the field, each with a leading `history` or `search` icon ([patterns 1.85](../../patterns/01-screen-composition.md)). The untyped part of a suggestion is the emphasised part; at compact they are plain text rows ([patterns 3.35–3.36](../../patterns/03-controls-interaction.md)).
5. **Scope** (optional, for global search over several kinds of thing). [Segmented Control](../../molecules/segmented-control.md) flavour text only, "All" first, then up to four kinds ("Devices", "Sites", "Users"). More kinds become a filter.
6. **Filter row.** [Filter Selection Bar](../../molecules/filter-selection-bar.md) of [Filter Chip](../../atoms/filter-chip.md)s directly above the results, with More filters at its trailing end beyond six to eight filter types ([patterns 1.86](../../patterns/01-screen-composition.md)). Active filters show as Active chips with Clear all ([patterns 1.88](../../patterns/01-screen-composition.md)). Sort at the row's trailing end: a [Button](../../atoms/button.md) flavour text with trailing icon `expand_more`, labelled with the current sort ("Sort: Most relevant"), opening a [Dropdown Menu](../../molecules/dropdown-menu.md) ([patterns 1.90](../../patterns/01-screen-composition.md)).
7. **Result count.** One line between the filters and the first result ("128 results for 'ZT411'"), updated whenever the query or filters change ([patterns 1.91](../../patterns/01-screen-composition.md)).
8. **Results.**
   - Mixed or single-kind results people open one at a time: [List Item](../../molecules/list-item.md) rows, the identifier first, a line of context (kind, site), a trailing [Status Label](../../atoms/status-label.md) ([patterns 1.95](../../patterns/01-screen-composition.md)). Grouped by kind under headings when Scope is All.
   - Results people compare across attributes, in a console: [Table](../../organisms/table.md) with the identifier column frozen ([patterns 1.96](../../patterns/01-screen-composition.md)).
9. **More results.** Load more on scroll on handhelds; [Pagination](../../molecules/pagination.md) at the bottom in a console ([patterns 1.93](../../patterns/01-screen-composition.md)).

**States.**
- Updating: while results update after a filter or query change, the results area dims and shows a [Progress Bar](../../atoms/progress-bar.md) Indeterminate at its top; it doesn't jump to the top ([patterns 1.89](../../patterns/01-screen-composition.md)).
- First load: [Skeleton](../../atoms/skeleton.md) rows under the count.
- No results: [Empty State](../../molecules/empty-state.md) type No results in place of the results, naming the query and filters that found nothing, with Clear filters, while the field and filters stay visible ([patterns 4.7](../../patterns/04-states-feedback.md), [7.42](../../patterns/07-content-copy.md)).
- Can't search (service or connection): Empty State type Can't show with Retry, or offline wording where the product works offline ([patterns 4.51](../../patterns/04-states-feedback.md)).

The composed components govern their own colours, states, sizes, radius and focus rings. The template only places them.

## Layout
```
Expanded and large                                   Compact
┌──────────────────────────────────────────────┐     ┌──────────────────┐
│ 1 Header                                     │     │ 1 ← [ZT411     ×]│
├───┬──────────────────────────────────────────┤     ├──────────────────┤
│ 2 │ 3 [🔍 ZT411                          ×]  │     │ 5 All|Devices|…  │
│   │ 5 All | Devices | Sites | Users          │     │ 6 [Filters 2] ▸▸ │
│   │ 6 [Site ▾][Status ▾][More]   Sort: ▾     │     │ 7 128 results    │
│   │ 7 128 results for "ZT411"                │     │ 8 Row            │
│   │ 8 Row  identifier · context      Status  │     │   Row            │
│   │   Row                            Status  │     │   …              │
│   │ 9 Pagination                             │     ├──────────────────┤
└───┴──────────────────────────────────────────┘     │ 2 Navigation bar │
                                                     └──────────────────┘
```
- Field, scope, filters and count stack `--space-md` apart; results start `--space-lg` below the count. Rows use the List Item's own spacing; result groups sit `--space-xl` apart.
- A list of results is capped at `--container-reading`; a table runs the content width.
- The results scroll; the field, scope and filter row stay pinned while there's room, giving way first in a short window ([patterns 5.51–5.52](../../patterns/05-sizes-devices.md)).

## Responsiveness
- **Compact** (below `--breakpoint-medium-min`): search opens full screen, the [Top App Bar](../../organisms/top-app-bar.md) type search holding the field ([patterns 1.85](../../patterns/01-screen-composition.md)). Margins `--space-page`. Filters collapse behind one control showing how many are active, opening a [Bottom Sheet](../../organisms/bottom-sheet.md) at full height with Apply ([patterns 1.87](../../patterns/01-screen-composition.md)); active chips stay as one row that scrolls sideways. Sort moves into the filter sheet. Tables become List Item rows ([patterns 1.96](../../patterns/01-screen-composition.md)).
- **Medium** (from `--breakpoint-medium-min`): field in the content, margins `--grid-margin`, [Navigation Rail](../../organisms/navigation-rail.md) Expanded false. Some filters show, the rest behind More filters ([patterns 5.25](../../patterns/05-sizes-devices.md)).
- **Expanded** (from `--breakpoint-expanded-min`): all filters in the row up to its limit; a [Table](../../organisms/table.md) is used where results are compared. With many filter types, filters may move to a leading column.
- **Large** (from `--breakpoint-large-min`): the rail is Expanded true. A results list stays capped; extra width may hold a preview of the focused result.
- **Touch.** Rows meet `--control-target-min` ([patterns 6.16](../../patterns/06-accessibility.md)); chips extend their hit area to it; the field's clear control needs a hit area of `--control-target-min`.

## Accessibility
- **Landmarks and headings.** `header`, `nav`, a `search` landmark around the field, and `main` for the results. The `h1` is "Search results" or "Results for 'ZT411'"; result group headings are `h2`.
- **Focus order.** Field, scope, filters, sort, results, pagination. Suggestions keep focus in the field while arrow keys move through them; Enter accepts, Escape closes and keeps the text ([patterns 3.33](../../patterns/03-controls-interaction.md)). Applying filters keeps focus on the control used ([patterns 6.33](../../patterns/06-accessibility.md)).
- **Keyboard.** Results list is one stop with arrows; the table follows its own grid rules. From a result, Back returns to the results with query, filters and scroll kept ([patterns 2.69](../../patterns/02-navigation-flow.md)).
- **Names and announcements.** The filter control is "Filters, 2 applied"; each active chip's remove is "Remove filter: Offline"; the clear control is "Clear search". The result count is announced politely each time it changes ([patterns 6.53](../../patterns/06-accessibility.md)); "No results" is announced the same way.
- **Never colour alone.** Active filters are chips with words; the current sort is written in the sort button; the current scope is the selected segment.

## Usage
- One search field per page. Search inside an area filters that area; global search finds anything ([patterns 2.68](../../patterns/02-navigation-flow.md)).
- Results appear as the person types when the service answers quickly; otherwise on submit ([patterns 1.85](../../patterns/01-screen-composition.md)).
- Filters apply at once when results are quick; with several set at once or slow results, they apply together with Apply ([patterns 1.89](../../patterns/01-screen-composition.md)).
- Saved views, where offered, sit above the filters ([patterns 1.92](../../patterns/01-screen-composition.md)).
- Drafts: [List Item](../../molecules/list-item.md), [Skeleton](../../atoms/skeleton.md), [Empty State](../../molecules/empty-state.md) and [Filter Selection Bar](../../molecules/filter-selection-bar.md) are draft; their measurements are placeholders.

Prototypes using this template: none yet.
