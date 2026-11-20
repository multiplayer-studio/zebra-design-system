# Find one item

A collection the person searches, filters and scans to reach the one item they came for.

## Job

Reach one item among many, then open it.

**Signals**
- A list, table or grid is the largest region on the screen.
- Search or filters sit directly above it.
- Choosing an item opens it.

## Choose this when

- There are more items than fit on one screen.
- The person knows what they are looking for, or will know it when they see it.

| Instead, when | Use |
|---|---|
| the item is already chosen | [act on one object](act-on-one.md) |
| the person must handle every item in turn | [work through many](work-through-many.md) |
| the person wants to know what needs attention, not find a known item | [monitor](monitor.md) |

## Regions

| # | Region | Present | Filled by | Rules |
|---|---|---|---|---|
| 1 | Header | always | [page header](organisms.md#page-header) | 1.52, 1.53 |
| 2 | Search | when finding by name is the main task | [search field](organisms.md#search-field) | 1.84 |
| 3 | Filters | when the items differ in ways people narrow by | [filter bar](organisms.md#filter-bar) | 1.86, 1.91 |
| 4 | Collection | always | [collection row](organisms.md#collection-row) | 1.19, 1.95 |
| 5 | Paging | when people need to return to a place in the list | | 1.93 |

## Variations

| When | Then | Rules |
|---|---|---|
| compact width | a table becomes a list of rows; filters collapse behind one control that shows how many are active | 1.96, 1.87 |
| expanded width | the list stays beside the open item | 1.98 |
| expanded width and many filter types | filters move to a column on the leading side | 1.86 |
| items are compared across several attributes | the collection is a table, from medium width up | 1.96 |
| items are selected | a selection bar replaces the header actions | 1.80 |
| nothing matches, or it is loading or failed | a state block takes the place of the collection; the header and filters stay | 1.128 |
| creating an item is the screen's main action | one create action, in the header or floating at the trailing bottom corner | 1.82 |

## Space and emphasis

**Focal:** Collection

| Between | Step |
|---|---|
| Header and Search | section |
| Search and Filters | related |
| Filters and Collection | related |
| rows of the Collection | related |
| Collection and Paging | group |

## Checks

- Is the identifier the first thing in every row? (1.95)
- Do search and filters sit directly above the results they change? (1.84, 1.86)
- Is the result count between the filters and the first result? (1.91)
- Are active filters shown, each removable? (1.88)
- Do all rows share one anatomy and one height for the same kind of item? (1.20)
- When there are no results, are the header and filters still there? (1.128)
