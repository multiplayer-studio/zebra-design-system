---
name: Key Value List
level: molecule
status: draft
composes: [../atoms/button.md, ../atoms/icon-button.md, ../atoms/divider.md, ../atoms/skeleton.md]
tokens:
  # block title (one per object, 10.38)
  key-value-list-title-font: '{typography.type-title-medium}'
  key-value-list-title-foreground: '{colors.color-ink-high}'
  key-value-list-title-gap: '{space.space-sm}'
  # keys and values
  key-value-list-key-font: '{typography.type-body-small}'
  key-value-list-key-foreground: '{colors.color-ink-medium}'
  key-value-list-value-font: '{typography.type-body-medium}'
  key-value-list-value-font-mono: '{typography.type-code}'
  key-value-list-value-foreground: '{colors.color-ink-high}'
  key-value-list-missing-foreground: '{colors.color-ink-medium}'
  # rows
  key-value-list-row-min-height: '{control.control-target-min}'
  key-value-list-row-padding-y: '{space.space-sm}'
  key-value-list-row-gap: '{space.space-md}'
  key-value-list-stack-gap: '{space.space-3xs}'
  key-value-list-key-max-width: '{primitives.scale-container-0}'
  key-value-list-block-gap: '{space.space-lg}'
---

# Key Value List

> A read-only record shown as rows of a key and its value, with any action on a value at the row's trailing end.

## Anatomy
1. Title (optional) — the block's heading in `--key-value-list-title-font` `--key-value-list-title-foreground`, `--key-value-list-title-gap` above the rows. Required when several blocks describe objects of one kind, and then unique ("Printer 1", "Printer 2") ([patterns 10.38](../patterns/10-data-display.md)). Actions on the whole block (Edit) sit at the title's trailing end, set apart from row actions.
2. Rows — one per fact, at least `--key-value-list-row-min-height` tall, padded `--key-value-list-row-padding-y` top and bottom, with a [Divider](../atoms/divider.md) under every row but the last, tying each action to its row ([patterns 10.36](../patterns/10-data-display.md)):
   1. Key — `--key-value-list-key-font` `--key-value-list-key-foreground`. The key column takes the width of its longest key, up to `--key-value-list-key-max-width`, then keys wrap.
   2. Value — `--key-value-list-value-font` `--key-value-list-value-foreground`, `--key-value-list-row-gap` after the key. Codes, serials and IDs use `--key-value-list-value-font-mono`. Values wrap; a long created name or ID may truncate in the middle, with the full value on hover and focus.
   3. Row action (optional) — at the trailing end: a [Button](../atoms/button.md), text flavour, small ("Change", "Add"), or an [Icon Button](../atoms/icon-button.md), subtle, small (e.g. `copy_file` for Copy), named in its tooltip. Small buttons are below the touch minimum, so extend their hit area to `--control-target-min` on touch, as [Button](../atoms/button.md) does ([patterns 6.16](../patterns/06-accessibility.md)).
3. Missing value — the row stays. The value reads "—" in `--key-value-list-missing-foreground`, or words ("Not set", "Not applicable") where the reason matters; unknown and not applicable never look the same. Where the person can supply it, the row action is "Add" ([patterns 10.37](../patterns/10-data-display.md), [patterns 10.48](../patterns/10-data-display.md)).

## Variants
**Layout**

| Layout | Key and value | Use |
|---|---|---|
| auto (default) | side by side while both fit; stacked, key above value `--key-value-list-stack-gap` apart, when they don't | most records ([patterns 10.39](../patterns/10-data-display.md)) |
| stacked | always key above value | narrow panels, compact screens with long values |

Blocks of one record stack `--key-value-list-block-gap` apart. On expanded screens a record may lay its blocks in columns; a block never splits across columns.

## States
The list is read-only and has no interaction states of its own. Row actions take their own Button or Icon Button states. A value being refreshed may show a [Skeleton](../atoms/skeleton.md) line in place of the value; the key never changes.

## Spacing & Sizing
| Property | Value |
|---|---|
| Row min height | `--key-value-list-row-min-height` |
| Row padding (V) | `--key-value-list-row-padding-y` |
| Key ↔ value | `--key-value-list-row-gap` side by side; `--key-value-list-stack-gap` stacked |
| Key column | its longest key, up to `--key-value-list-key-max-width` |
| Title ↔ rows | `--key-value-list-title-gap` |
| Block ↔ block | `--key-value-list-block-gap` |

The list fills its container. Row heights are minimums; wrapped keys and values grow the row. `--key-value-list-key-max-width` is a draft placeholder on the closest scale step, to be confirmed in Figma.

## Properties
| Property | Options | Default |
|---|---|---|
| Layout | auto, stacked | auto |
| Show Title | on / off | off |
| Divided | on / off | on |
| Rows | key, value, optional action | — |
| Value style | default, mono | default |

## Usage
- Use Key Value List for the facts of one object on a detail screen or panel ([patterns 1.21](../patterns/01-screen-composition.md)). For many objects compared by the same keys, use a [Table](../organisms/table.md).
- Keep the keys in the same order wherever the object appears ([patterns 1.20](../patterns/01-screen-composition.md)).
- Never hide a row because its value is missing: say it's missing, and offer Add where the person can ([patterns 10.37](../patterns/10-data-display.md)).
- Put each action on the row it changes; actions on the whole object go in the title row or the page header.
- Use the mono value style only for codes, serials and IDs people read character by character.

## Accessibility
- Mark the list up as a description list (`dl`, `dt`, `dd`) or a two-column table with row headers, so each value is read with its key.
- A dash is announced as "No data" or "Not applicable", whichever is true (visually hidden text); never leave a cell blank ([patterns 10.48](../patterns/10-data-display.md)).
- `--key-value-list-missing-foreground` keeps the dash quieter than values while still meeting text contrast.
- Row actions name their row ("Change serial number"), not just "Change".
- A value truncated in the middle shows the full text on hover and on focus, and the accessible name is always the full value.
- The block title is a real heading at the level the page needs.

## Claude Prompt
Draw a read-only record: a `--key-value-list-title-font` heading "Printer ZT411", then rows separated by thin grey dividers. Each row is at least `--key-value-list-row-min-height` tall: a grey `--key-value-list-key-font` key on the left ("Serial number", "Location", "Firmware", "Last service") in a column as wide as the longest key, and the near-black `--key-value-list-value-font` value beside it ("D4J21-0045" in the mono `--key-value-list-value-font-mono`, "Dock 3", "V92.21.3"). "Last service" has a quiet grey dash (`--key-value-list-missing-foreground`) and a small text button "Add" at the trailing end; "Location" ends in a text button "Change". On a narrow screen, keys sit above their values.
