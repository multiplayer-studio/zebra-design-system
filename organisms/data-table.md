---
name: Data Table
level: organism
status: draft
composes: [../atoms/checkbox.md, ../atoms/icon-button.md, ../atoms/icon.md, ../atoms/status-label.md, ../atoms/tag.md, ../molecules/pagination.md, ../molecules/search-bar.md]
tokens:
  data-table-container-spacing-minimum: '{spacing.spacing-minimum}'
  data-table-container-spacing-maximum: '{spacing.spacing-4xl}'
  data-table-container-radius-rounded: '{rounded.radius-minimal}'
  data-table-container-background: '{colors.surface-default}'
  data-table-content-foreground: '{colors.main-default}'
  data-table-content-foreground-subtle: '{colors.main-subtle}'
  data-table-container-border-color: '{colors.border-default}'
  data-table-row-background-enabled: '{colors.surface-default}'
  data-table-row-background-hover: '{colors.surface-hover}'
  data-table-row-background-selected: '{colors.surface-selected}'
  data-table-divider-border-color: '{colors.border-subtle}'
  data-table-header-font: '{typography.label-medium}'
---

# Data Table

> A table used to show data in a structured way.

A composition guide built from existing Zebra atoms and molecules. Measurements to be defined.

## Anatomy
1. Toolbar (optional) — [search bar](../molecules/search-bar.md), filters, actions.
2. Header row — column titles, optional sort [icons](../atoms/icon.md).
3. Body rows — cells of text, [status labels](../atoms/status-label.md), [tags](../atoms/tag.md), row actions ([Icon Buttons](../atoms/icon-button.md), flavor subtle, size small).
4. Selection column (optional) — [checkboxes](../atoms/checkbox.md).
5. Footer — [pagination](../molecules/pagination.md).

The composed checkboxes, icon buttons, labels, tags, search bar and pagination govern their own colours, states, sizes and focus rings; the table defines only its container, rows, dividers and header text.

## Variants
To be defined (densities, striping, sticky header).

## States
| Row/cell state | Intended treatment |
|---|---|
| default | `--data-table-row-background-enabled`, dividers `--data-table-divider-border-color` |
| hover | `--data-table-row-background-hover` |
| selected | `--data-table-row-background-selected` + checked checkbox |
| sorted column | sort icon shows direction |

## Spacing & Sizing
Measurements to be defined. Use Zebra tokens only: spacing `--data-table-container-spacing-minimum` … `--data-table-container-spacing-maximum`; radius `--data-table-container-radius-rounded` when rounded; background `--data-table-container-background`, text `--data-table-content-foreground`, secondary text `--data-table-content-foreground-subtle`, borders `--data-table-container-border-color`; dividers `--data-table-divider-border-color`.

## Usage
- Left-align text, right-align numbers; keep column headers short.
- Expose the table structure to assistive tech: header cells scoped to their column, and the sorted column announces its sort direction.
- Paginate or virtualise long datasets.
- Interactive parts (checkboxes, icon buttons, pagination) bring their own touch targets and focus rings; never rely on colour alone.

## Stitch Prompt
Draw a white data table with a toolbar (search field on the left, filter and export buttons on the right). The header row has `--data-table-header-font` column titles with small sort arrows, separated from the body by a thin grey line. Rows are separated by light grey (`--data-table-divider-border-color`) hairlines; the first column has checkboxes, a status column shows small coloured status labels, and the last column has a vertical-dots action icon. A selected row is tinted pale blue (`--data-table-row-background-selected`). Pagination controls sit below the table, right-aligned.
