---
name: Pagination
level: molecule
status: stable
composes: [../atoms/icon.md]
tokens:
  # item (controls and page indicators)
  pagination-item-background-enabled: '{colors.color-fill-default}'
  pagination-item-background-hover: '{colors.color-fill-faint}'
  pagination-item-background-pressed: '{colors.color-fill-sunken}'
  pagination-item-background-selected: '{colors.color-fill-inverse}'
  pagination-item-background-disabled: '{colors.color-fill-disabled}'
  pagination-item-foreground-enabled: '{colors.color-ink-high}'
  pagination-item-foreground-selected: '{colors.color-ink-inverse}'
  pagination-item-foreground-disabled: '{colors.color-ink-disabled}'
  pagination-item-border-width: '{stroke.stroke-base}'
  # outline
  pagination-outline-item-border-width: '{stroke.stroke-thin}'
  pagination-outline-item-border-color-enabled: '{colors.color-line-default}'
  pagination-outline-item-border-color-hover: '{colors.color-line-strong}'
  pagination-outline-item-border-color-pressed: '{colors.color-line-stronger}'
  pagination-outline-item-border-color-selected: '{colors.color-fill-inverse}'
  pagination-outline-control-border-color-disabled: '{colors.color-line-subtle}'
  pagination-outline-indicator-border-color-disabled: '{colors.color-fill-disabled}'
  # focus
  pagination-focus-ring-width: '{stroke.stroke-thick}'
  pagination-focus-ring-color: '{colors.color-line-focus}'
  # shape
  pagination-item-radius-sharp: '{radius.radius-none}'
  pagination-item-radius-rounded: '{radius.radius-sm}'
  # sizes
  pagination-item-size: '{control.control-sm}'
  pagination-item-padding: '{space.space-sm}'
  pagination-container-gap: '{space.space-sm}'
  pagination-indicator-font: '{typography.type-body-small}'
  pagination-control-icon-size: '{icon.icon-size-medium}'
---

# Pagination

> A bar of page controls: first, previous, next and last jump buttons around a row of page numbers, with an optional overflow marker for a long range.

## Anatomy
1. First page, previous — the leading pair of jump controls: square buttons holding an [Icon](../atoms/icon.md) (`first_page`, `chevron_left`) at `--pagination-control-icon-size`.
2. Page numbers — square page indicators with the number in `--pagination-indicator-font`; the one for the current page is selected. Three are shown by default; the product decides how many.
3. Overflow — a control holding `more_horizontal`, standing for the skipped pages, paired with one trailing page indicator (usually the last page). The two always show or hide together.
4. Next, last page — the trailing pair of jump controls (`chevron_right`, `last_page`).

The controls and indicators are drawn in place with an Icon or a number, not as Icon Buttons, and share one square surface.

## Variants
| Outline | Border |
|---|---|
| off (default) | `--pagination-item-border-width`: none |
| on | `--pagination-outline-item-border-width` `--pagination-outline-item-border-color-enabled` on every control and indicator |

| Rounded | Radius |
|---|---|
| on (default) | `--pagination-item-radius-rounded` |
| off | `--pagination-item-radius-sharp` |

Both apply to the whole bar at once; there is no per-button override. Pair Rounded with the matching icon style (sharp UIs use sharp icons). Figma defaults to sharp; the system default is rounded. In the AAA modes the component is always sharp (DESIGN.md §5).

## States
| State | Background | Number / icon | Border (outline on) | Notes |
|---|---|---|---|---|
| enabled | `--pagination-item-background-enabled` | `--pagination-item-foreground-enabled` | `--pagination-outline-item-border-color-enabled` | |
| hover | `--pagination-item-background-hover` | unchanged | `--pagination-outline-item-border-color-hover` | pointer devices only |
| pressed | `--pagination-item-background-pressed` | unchanged | `--pagination-outline-item-border-color-pressed` | |
| focused | unchanged | unchanged | — | `--pagination-focus-ring-width` `--pagination-focus-ring-color` ring, replacing any border |
| selected (indicator) | `--pagination-item-background-selected` | `--pagination-item-foreground-selected` | `--pagination-outline-item-border-color-selected` | the current page |
| disabled | `--pagination-item-background-disabled` | `--pagination-item-foreground-disabled` | controls `--pagination-outline-control-border-color-disabled`, indicators `--pagination-outline-indicator-border-color-disabled` | e.g. first and previous on page 1 |

Every change is colour only; no transition is defined. The border sits inside the square, so Outline adds no size.

## Spacing & Sizing
| Property | Value |
|---|---|
| Control and indicator | `--pagination-item-size` square, at every Outline and Rounded setting |
| Control padding | `--pagination-item-padding` around the icon |
| Icon | `--pagination-control-icon-size` |
| Number font | `--pagination-indicator-font`, centred |
| Gap | `--pagination-container-gap` between every item, controls and indicators alike |

The bar hugs its content: its width grows with the number of page indicators shown.

## Properties
| Property | Options | Default |
|---|---|---|
| Show Controls | on / off (all four jump controls together) | on |
| Show More | on / off (overflow control and its trailing indicator together) | on |
| Outline | on / off | off |
| Rounded | on / off | on |
| Page numbers | indicators, one selected | three |

Hover, pressed and focused are driven by interaction. The page range shown (which numbers, where the overflow sits) comes from the implementation. Figma only: each Outline × Rounded combination keeps its own page-number slot, so slot content doesn't survive switching either; one extra Main Slot 1 property is wired to nothing and can be ignored.

## Usage
- Use pagination below tables and long lists, including the [Table](../organisms/table.md) footer.
- Leave it out when there is only ever one page; an empty or single-page bar looks unfinished.
- Use Show Controls and Show More independently: drop the jump buttons for a short range, keep the overflow for a long one.
- Disable first and previous on page 1 and next and last on the final page rather than hiding them, so the bar keeps its shape.
- Set Outline and Rounded once for the whole bar.
- `--pagination-item-size` is below the minimum touch target; add spacing or a larger hit area on touch UIs.

## Accessibility
- Wrap the bar in a `nav` with a label such as "Pagination".
- Mark the current page with `aria-current="page"`; selection is otherwise a fill and contrast change.
- The jump controls and the overflow have no visible text: give each an accessible name ("First page", "Previous page", "More pages") rather than reading the glyph.
- Give each page indicator a name such as "Page 3".
- Keyboard focus shows the `--pagination-focus-ring-width` `--pagination-focus-ring-color` ring on every control and indicator.

## Claude Prompt
Draw a horizontal pagination bar of `--pagination-item-size` white squares (`--pagination-item-background-enabled`) `--pagination-container-gap` apart, with `--pagination-item-radius-rounded` corners: first-page and chevron-left icon buttons in near-black (`--pagination-item-foreground-enabled`), page numbers "1", "2", "3" in `--pagination-indicator-font`, with "2" selected as a near-black square (`--pagination-item-background-selected`) holding white text (`--pagination-item-foreground-selected`), then a three-dot overflow square, "10", and chevron-right and last-page icons. Show a second bar with a `--pagination-outline-item-border-width` light grey outline (`--pagination-outline-item-border-color-enabled`) on every square, with the first two controls disabled on light grey (`--pagination-item-background-disabled`) with grey icons.
