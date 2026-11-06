---
name: Filter Selection Bar
level: organism
status: draft
composes: [../atoms/filter-chip.md, ../atoms/icon-button.md]
tokens:
  filter-selection-bar-container-radius-rounded: '{rounded.radius-minimal}'
---

# Filter Selection Bar

> A bar containing Filter Chips.

A composition of existing atoms. Measurements to be defined.

## Anatomy
1. Container — horizontal bar, scrolls horizontally when chips overflow.
2. [Filter chips](../atoms/filter-chip.md) — one per filter option, toggle selected.
3. Optional leading filter / trailing clear [Icon Button](../atoms/icon-button.md), flavor subtle.

The chips and icon buttons govern their own colours, states, radius, touch targets and focus ring; the bar defines only its container.

## Variants
To be defined. Chip variants/states come from [filter chip](../atoms/filter-chip.md).

## States
Each chip: unselected / selected / hover / pressed / focus / disabled — as filter chip.

## Spacing & Sizing
Measurements to be defined. Use the system spacing scale and semantic tokens only; radius `--filter-selection-bar-container-radius-rounded` when rounded.

## Usage
- Use to refine a list or results set on the same screen.
- Order chips by frequency of use; allow multiple selection unless filters are exclusive.
- Selected chips must show a check/icon, not colour only.
- Interactive parts inherit the chips' and icon buttons' accessibility (touch targets, focus ring); never rely on colour alone.

## Stitch Prompt
Draw a single horizontal row of rounded filter chips under a page header, spaced evenly and scrolling sideways off the right edge. Unselected chips are white with a thin grey border and dark label; selected chips are filled with a check mark. Optionally a filter icon button sits at the start of the row.
