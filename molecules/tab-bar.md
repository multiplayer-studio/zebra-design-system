---
name: Tab Bar
level: molecule
status: stable
composes: [../atoms/icon.md, ../atoms/notification-indicator.md]
tokens:
  # bar
  tab-bar-container-background: '{colors.color-fill-default}'
  # tab item
  tab-bar-item-background-enabled: '{colors.color-status-ghost-default}'
  tab-bar-item-background-hover: '{colors.color-status-ghost-faint}'
  tab-bar-item-label-foreground-enabled: '{colors.color-ink-medium}'
  tab-bar-item-label-foreground-selected: '{colors.color-ink-high}'
  tab-bar-item-label-foreground-disabled: '{colors.color-ink-disabled}'
  tab-bar-item-icon-foreground-enabled: '{colors.color-ink-medium}'
  tab-bar-item-icon-foreground-selected: '{colors.color-ink-high}'
  tab-bar-item-icon-foreground-disabled: '{colors.color-ink-disabled}'
  # selection underline
  tab-bar-indicator-color-enabled: '{colors.color-status-ghost-default}'
  tab-bar-indicator-color-selected: '{colors.color-brand-primary-default}'
  tab-bar-indicator-width: '{stroke.stroke-thick}'
  # focus
  tab-bar-focus-ring-width: '{stroke.stroke-thick}'
  tab-bar-focus-ring-color: '{colors.color-line-focus}'
  # sizes
  tab-bar-item-height: '{control.control-lg}'
  tab-bar-item-padding-y: '{space.space-md}'
  tab-bar-item-padding-x: '{space.space-gutter}'
  tab-bar-item-gap: '{space.space-sm}'
  tab-bar-item-radius: '{radius.radius-none}'
  tab-bar-label-font: '{typography.type-label-medium}'
  tab-bar-icon-size: '{icon.icon-size-small}'
---

# Tab Bar

> A row of tabs for switching between views at the same level; the bar either fills its container or hugs its tabs.

## Anatomy
1. Bar — the row, on `--tab-bar-container-background`, with no padding, gap or radius of its own. Its slot holds the tabs; the bar sets the arrangement and the product sets how many.
2. Tab item — a `--tab-bar-item-height` tab carrying its own state:
   - Icon (optional) — an [Icon](../atoms/icon.md) at `--tab-bar-icon-size`.
   - Label — the tab's name in `--tab-bar-label-font`. It never wraps.
   - Badge (optional) — a [Notification Indicator](../atoms/notification-indicator.md) after the label, off by default.
3. Underline — a `--tab-bar-indicator-width` bottom border on every tab, coloured only on the selected one. The space is always held, so selecting shifts nothing.

## Variants
| Flavour | Tab width | Use |
|---|---|---|
| full width (default) | tabs divide the row evenly | the bar owns the full width of its container |
| condensed | tabs hug their content | the bar shares a row with other content |

Switching changes how tabs size, never how many there are.

## States
| State | Background | Label | Icon | Underline |
|---|---|---|---|---|
| default | `--tab-bar-item-background-enabled` | `--tab-bar-item-label-foreground-enabled` | `--tab-bar-item-icon-foreground-enabled` | `--tab-bar-indicator-color-enabled` |
| hover | `--tab-bar-item-background-hover` | unchanged | unchanged | unchanged |
| selected | `--tab-bar-item-background-enabled` | `--tab-bar-item-label-foreground-selected` | `--tab-bar-item-icon-foreground-selected` | `--tab-bar-indicator-color-selected` |
| focused | unchanged | unchanged | unchanged | unchanged; `--tab-bar-focus-ring-width` `--tab-bar-focus-ring-color` ring inside the tab |
| disabled | `--tab-bar-item-background-enabled` | `--tab-bar-item-label-foreground-disabled` | `--tab-bar-item-icon-foreground-disabled` | `--tab-bar-indicator-color-enabled` |

No transition is defined: selection swaps the underline and label colours. Disabled moves only the label and icon; the surface holds. Figma draws no focus state, so the tab uses the system focus ring in these tokens.

## Spacing & Sizing
| Property | Value |
|---|---|
| Tab height | `--tab-bar-item-height`, underline included |
| Tab padding (V / H) | `--tab-bar-item-padding-y` / `--tab-bar-item-padding-x` |
| Icon, label, badge gap | `--tab-bar-item-gap` |
| Label font | `--tab-bar-label-font` |
| Icon | `--tab-bar-icon-size` |
| Tab radius | `--tab-bar-item-radius` |
| Bar width | full width: fills its container, tabs share it equally; condensed: hugs its tabs |

## Properties
| Property | Options | Default |
|---|---|---|
| Flavour | full width, condensed | full width |
| Tabs | tab items in the slot | four |
| Tab: Selected | on / off | off |
| Tab: Disabled | on / off | off |
| Tab: Show Icon | on / off, any icon | on |
| Tab: Show Badge | on / off | off |
| Tab: Label | text | — |

Hover and focus are driven by interaction. Each tab is set on itself; the bar exposes none of their properties. Four tabs is what Figma draws, not a limit.

## Usage
- Use a tab bar to switch between views at the same level of the same context; for mutually exclusive views of the same data consider [Segmented Control](./segmented-control.md).
- Keep exactly one tab selected at all times. A bar with none says nothing about where a person is.
- Use condensed where the bar shares a row; full width divides whatever container it is given, however wide.
- Keep labels short (one or two words); they don't wrap.
- Don't use tabs for actions. A tab that does something is a button in the wrong clothes.
- Don't disable a tab that has content behind it; a view a person can't reach needs explaining, not hiding.

## Accessibility
- Render a `tablist` of `tab`s, each controlling a `tabpanel`; mark the selected tab with `aria-selected="true"`. Selection is an underline and a label colour, colour alone, so it must be in the structure too.
- Arrow keys move between tabs, with the selected tab as the single tab stop; nothing in the component provides that.
- Disabled changes the label colour and nothing else; check it still reads.
- The badge is a dot with no text. Where it stands for a count or an alert, make that available another way (e.g. in the tab's accessible name).
- Tab labels come from the implementation and must be real words.
- `--tab-bar-item-height` meets the minimum touch target.

## Stitch Prompt
Draw a white (`--tab-bar-container-background`) horizontal tab bar `--tab-bar-item-height` tall with four equal-width tabs, each with `--tab-bar-item-padding-x` side padding, a small `--tab-bar-icon-size` icon and a `--tab-bar-label-font` label `--tab-bar-item-gap` apart: "Overview", "Items", "History", "Invoices". Inactive tabs are mid grey (`--tab-bar-item-label-foreground-enabled`); the selected tab has near-black text (`--tab-bar-item-label-foreground-selected`) and a `--tab-bar-indicator-width` Zebra blue underline (`--tab-bar-indicator-color-selected`) along its bottom edge; a disabled tab is light grey (`--tab-bar-item-label-foreground-disabled`). One tab shows a small red notification dot after its label.
