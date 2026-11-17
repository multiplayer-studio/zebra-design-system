---
name: Filter Selection Bar
level: molecule
status: draft
composes: [../atoms/filter-chip.md, ../atoms/icon-button.md]
tokens:
  # shape
  filter-selection-bar-container-radius-rounded: '{radius.radius-sm}'
  filter-selection-bar-container-radius-sharp: '{radius.radius-none}'
  # spacing
  filter-selection-bar-container-gap: '{space.space-sm}'
  filter-selection-bar-chip-gap: '{filter-chip.filter-chip-group-gap}'
  filter-selection-bar-scroll-padding: '{space.space-2xs}'
---

# Filter Selection Bar

> A horizontal bar of Filter Chips that refines a list or result set on the same screen.

## Anatomy
1. Container — horizontal bar holding the chip row and the optional buttons, `--filter-selection-bar-container-gap` between them.
2. Chip row — [Filter Chips](../atoms/filter-chip.md), one per filter option, `--filter-selection-bar-chip-gap` apart. It scrolls horizontally when the chips overflow; it never wraps.
3. Leading filter button (optional) — [Icon Button](../atoms/icon-button.md) `filter`, flavour subtle; opens the full filter set.
4. Trailing clear button (optional) — [Icon Button](../atoms/icon-button.md) `filter_off`, flavour subtle; turns every chip off.

The chips and icon buttons govern their own colours, states, radius, touch targets and focus ring; the bar defines only its container and spacing.

## Variants
| Variant | Contents |
|---|---|
| chips only (default) | the chip row |
| with buttons | leading filter and/or trailing clear Icon Button around the chip row |

Shape: rounded (default) → `--filter-selection-bar-container-radius-rounded`; sharp → `--filter-selection-bar-container-radius-sharp`. The chips and icon buttons follow the same shape. In the AAA modes the component is always sharp (DESIGN.md §5).

## States
The bar has no states of its own. Each chip is enabled, hover, focused, active or disabled as [Filter Chip](../atoms/filter-chip.md) defines; the icon buttons follow [Icon Button](../atoms/icon-button.md). Clear is disabled while no chip is active.

## Spacing & Sizing
Measurements are provisional: this component has no Figma source yet.

| Part | Value |
|---|---|
| Container gap | `--filter-selection-bar-container-gap` |
| Chip gap | `--filter-selection-bar-chip-gap` |
| Chip row padding | `--filter-selection-bar-scroll-padding` on every side, so chip focus rings aren't clipped by the scroll area |
| Chip row radius | `--filter-selection-bar-container-radius-rounded` |

The bar fills the width of its parent; the chip row takes the remaining space and its height hugs the chips.

## Properties
| Property | Options | Default |
|---|---|---|
| Chips | list of filter labels, each active on / off | — |
| Leading filter button | on / off | off |
| Trailing clear button | on / off | off |
| Shape | rounded, sharp | rounded |

## Usage
- Use to refine a list or result set on the same screen.
- Order chips by frequency of use; allow multiple selection unless the filters are exclusive.
- Let the row scroll sideways rather than wrapping or truncating chip labels.
- Show the result count near the list so the effect of each chip is visible.

## Accessibility
- Group the chips with a label (for example `role="group"` and an `aria-label` naming the filter set) and expose each chip's on / off state (`aria-pressed`).
- Active chips show a check mark, so their state never relies on colour alone.
- Every chip, and the leading and trailing buttons, stays reachable by keyboard even when the row is scrolled; the row's padding keeps their focus rings visible.
- Give the icon-only buttons accessible names ("Open filters", "Clear all filters"), and announce the updated result count politely.

## Claude Prompt
Draw a single horizontal row of filter chips under a page header, `--filter-selection-bar-chip-gap` apart and scrolling sideways off the right edge. Inactive chips are white (`--filter-chip-container-background-enabled`) pills with a thin grey border (`--filter-chip-container-border-color`) and a dark label; active chips are near-black (`--filter-chip-active-container-background`) with a white check mark and label. A subtle filter icon button sits at the start of the row and a clear-filters icon button at the end, `--filter-selection-bar-container-gap` from the chips.
