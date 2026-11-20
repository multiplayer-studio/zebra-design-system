# Work through many

A run of items handled one after another, the same way each time.

## Job

Finish every item in a run: pick, count, check, deliver.

**Signals**
- One item fills the screen, with its position in the run.
- One action finishes it and brings the next.
- The same screen repeats for each item.

## Choose this when

- Every item gets the same handling.
- The order is given, or doesn't matter.

| Instead, when | Use |
|---|---|
| the person chooses which item to open | [find one item](find-one.md) |
| handling each item means scanning or photographing it | [capture](capture.md) |
| the items are steps of one thing being made | [create in steps](create-in-steps.md) |

## Regions

| # | Region | Present | Filled by | Rules |
|---|---|---|---|---|
| 1 | Header | always | [page header](organisms.md#page-header) | 1.50 |
| 2 | Current item | always | [current item](organisms.md#current-item) | 1.137, 1.129 |
| 3 | What's next | optional | [collection row](organisms.md#collection-row) | 1.137 |
| 4 | Can't complete | always | | 1.137, 1.132 |
| 5 | Commit bar | always | [commit bar](organisms.md#commit-bar) | 1.74 |

## Variations

| When | Then | Rules |
|---|---|---|
| a hardware key does the primary action | the on-screen primary sits in the same position on every screen of the run | 1.147 |
| the item is confirmed by a scan | a scan target leads the current item | 1.130 |
| expanded width | the run's list stays beside the current item | 1.98 |
| the run is finished | a state block says so, with the way forward | 1.128 |

## Space and emphasis

**Focal:** Current item

| Between | Step |
|---|---|
| Header and Current item | group |
| the item and its facts | related |
| Current item and What's next | section |
| Can't complete and the Commit bar | section |

## Checks

- Are the thing to look at and the thing to do the two most prominent elements? (1.129)
- Is the position in the run beside the current item? (1.137)
- Is the next item one action away? (1.137)
- Is "can't complete" set apart from the commit? (1.137, 1.132)
- Does the primary action stay in one position from item to item? (1.40)
