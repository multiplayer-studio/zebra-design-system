# Monitor

A screen that shows whether things are all right, and what isn't.

## Job

See at a glance what needs attention, then go to it.

**Signals**
- A row of figures leads the screen.
- Content is cards of charts, lists and counts.
- Each tile or card opens the detail behind it.

## Choose this when

- The person watches many things, and acts on few.
- What matters is the exception, not the full list.

| Instead, when | Use |
|---|---|
| the person is looking for one known item | [find one item](find-one.md) |
| everything shown is about one object | [act on one object](act-on-one.md) |

## Regions

| # | Region | Present | Filled by | Rules |
|---|---|---|---|---|
| 1 | Header | always | [page header](organisms.md#page-header) | 1.52 |
| 2 | Needs action | when something must be acted on | [exception item](organisms.md#exception-item) | 1.26, 1.27 |
| 3 | Summary | always | [summary tile](organisms.md#summary-tile) | 1.23, 1.24 |
| 4 | Detail cards | always | [chart card](organisms.md#chart-card) | 1.23, 1.25 |
| 5 | The rest | optional | | 1.23 |

## Variations

| When | Then | Rules |
|---|---|---|
| nothing is wrong | the screen is visually quiet: no status colour | 1.138 |
| there are exceptions | they take colour and the top position, by severity, then age | 1.138 |
| the summary sits above a collection | each status count filters the list below in place | 1.139 |
| compact width | cards run in one column; a chart that can't be read becomes its key figure and a list | 1.103, 1.104 |
| a card has no data, or failed | a state block takes the place of that card's content only | 1.128 |

## Space and emphasis

**Focal:** Summary

| Between | Step |
|---|---|
| Header and Summary | section |
| tiles in the Summary | gutter |
| Summary and Detail cards | section |
| cards | gutter |
| a card's edge and its content | inset |

## Checks

- Does the screen open with the few figures that matter most, in one row? (1.23, 1.102)
- Are tiles in the row equal in size and anatomy? (1.26)
- Does each tile carry a comparison where one exists? (1.24)
- Is colour used only for exceptions? (1.24, 1.138)
- Do all chart cards share one internal layout? (1.25)
- Does every tile and card open the list or detail behind it? (1.102)
