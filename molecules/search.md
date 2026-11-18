---
name: Search
level: molecule
status: stable
composes: [../atoms/icon.md, ../atoms/divider.md, ../atoms/ai-mark.md]
tokens:
  # container (default flavour)
  search-container-background-enabled: '{colors.color-fill-default}'
  search-container-background-disabled: '{colors.color-fill-disabled}'
  search-container-border-color-enabled: '{colors.color-line-strong}'
  search-container-border-color-hover: '{colors.color-line-stronger}'
  search-container-border-color-focused: '{colors.color-line-focus}'
  search-container-border-color-selected: '{colors.color-line-focus}'
  search-container-border-color-typing: '{colors.color-line-focus}'
  search-container-border-color-filled: '{colors.color-line-strong}'
  search-container-border-color-disabled: '{colors.color-line-subtle}'
  search-container-border-width: '{stroke.stroke-thin}'
  search-container-border-width-focused: '{stroke.stroke-thick}'
  # gradient flavour (other states as default)
  search-gradient-container-background-enabled: '{colors.color-fill-default}'
  search-gradient-container-border-color-start: '{colors.color-gradient-strong-start}'
  search-gradient-container-border-color-end: '{colors.color-gradient-strong-end}'
  # ghost flavour
  search-ghost-container-background-enabled: '{colors.color-status-ghost-default}'
  search-ghost-container-background-disabled: '{colors.color-status-ghost-default}'
  search-ghost-container-border-color: '{colors.color-line-contrast-brand}'
  search-ghost-container-border-width: '{stroke.stroke-thin}'
  # text
  search-value-foreground: '{colors.color-ink-high}'
  search-value-foreground-disabled: '{colors.color-ink-disabled}'
  search-placeholder-foreground: '{colors.color-ink-medium}'
  search-cursor-foreground: '{colors.color-ink-brand}'
  search-value-font-small: '{typography.type-body-small}'
  search-value-font-medium: '{typography.type-body-medium}'
  search-value-font-large: '{typography.type-body-medium}'
  # icons and controls
  search-icon-foreground: '{colors.color-ink-high}'
  search-icon-foreground-disabled: '{colors.color-ink-disabled}'
  search-icon-size: '{icon.icon-size-medium}'
  search-control-target-size: '{control.control-sm}'
  search-control-focus-ring-width: '{stroke.stroke-thick}'
  search-control-focus-ring-color: '{colors.color-line-focus}'
  # trailing group
  search-trailing-gap: '{space.space-sm}'
  search-divider-height: '{control.control-icon-md}'
  # shape
  search-container-radius-sharp: '{radius.radius-none}'
  search-container-radius-rounded: '{radius.radius-sm}'
  search-container-radius-full: '{radius.radius-pill}'
  # sizes
  search-container-width: '{component-sizes.size-search-width}'
  search-container-height-small: '{control.control-sm}'
  search-container-height-medium: '{control.control-md}'
  search-container-height-large: '{control.control-lg}'
  search-container-padding-y: '{space.space-sm}'
  search-container-padding-x: '{space.space-md}'
  search-container-gap: '{space.space-2xs}'
  search-text-padding-x: '{space.space-2xs}'
  search-touch-target-size-minimum: '{control.control-target-min}'
---

# Search

> A single-line field for typing a query, led by a magnifier, with a trailing control for voice input or any other action.

## Anatomy
1. Container — a horizontal row, at least `--search-container-height-large` tall by default, carrying the background, border and radius. Its parts sit `--search-container-gap` apart.
2. Leading icon (optional) — [Icon](../atoms/icon.md) `search`, `--search-icon-size`. Turned on by hasLeading.
3. Input text — the placeholder, then the query, padded `--search-text-padding-x` each side, taking the width between the icons.
4. Trailing area (optional) — turned on by hasTrailing. At rest a single trailing control: any icon and function the implementation passes, `microphone` (voice input) by default. While typing it becomes a group of a clear control (`cancel`), a vertical [Divider](../atoms/divider.md) `--search-divider-height` tall and the trailing control, `--search-trailing-gap` apart. The group can also be icon only or clear only.

Search usually stands without a label. Where it carries a visible label or hint, they sit above it in [Input](./input.md)'s order: label, hint, field ([patterns 1.124](../patterns/01-screen-composition.md)).

Every icon is an [Icon](../atoms/icon.md) in `--search-icon-foreground`. Both trailing controls are real targets: each claims `--search-control-target-size` square around its glyph, which the gap either side of the divider leaves room for.

## Variants
**Flavour**

| Flavour | Background | Border |
|---|---|---|
| default | `--search-container-background-enabled` | `--search-container-border-width` `--search-container-border-color-enabled` |
| gradient | `--search-gradient-container-background-enabled` | `--search-container-border-width`, a 129° gradient `--search-gradient-container-border-color-start` → `--search-gradient-container-border-color-end` |
| ghost | `--search-ghost-container-background-enabled` (none) | `--search-ghost-container-border-width` `--search-ghost-container-border-color` (transparent except in the AAA modes) |

Default suits forms. Gradient marks a search the AI runs or ranks (DESIGN.md §3); it's never the only marker, so pair it with an [AI Mark](../atoms/ai-mark.md) ([DESIGN.md §3 Data and gradient](../DESIGN.md)). Ghost has no visible border, for a field in a surface that already bounds it, such as a header; its border is drawn at the normal width in a colour that is transparent except in the AAA modes (`--color-line-contrast-brand`).

**Shape**: rounded (default) → `--search-container-radius-rounded`; sharp → `--search-container-radius-sharp` with zeta-icons-sharp; full → `--search-container-radius-full` (pill). Shape changes nothing but the corners. Figma defaults to sharp; the system default is rounded. In the AAA modes the component is always sharp (DESIGN.md §5).

## States
| State | Border | Text | Trailing area |
|---|---|---|---|
| enabled | `--search-container-border-width` `--search-container-border-color-enabled` | placeholder `--search-placeholder-foreground` | trailing control |
| hover | `--search-container-border-color-hover` | unchanged | unchanged |
| focus | `--search-container-border-width-focused` `--search-container-border-color-focused` | cursor `--search-cursor-foreground` | unchanged |
| selected | `--search-container-border-width` `--search-container-border-color-selected` | cursor `--search-cursor-foreground` | unchanged |
| typing | `--search-container-border-color-typing` | query `--search-value-foreground` | clear, divider and trailing control |
| filled | `--search-container-border-color-filled` | query `--search-value-foreground` | trailing control |
| disabled | `--search-container-border-color-disabled`, background `--search-container-background-disabled` (ghost `--search-ghost-container-background-disabled`) | `--search-value-foreground-disabled` | icons `--search-icon-foreground-disabled`; not interactive |

Gradient keeps its gradient border in every state except focus and disabled, which use the default tokens. Ghost keeps its ghost border (transparent except in the AAA modes) in every state; the focus border is optional so a container that surfaces its own focus (as a message prompt does) can suppress it. The states run enabled, focus, selected, typing, filled; only typing swaps the trailing area, so the clear control arrives once there is something to clear and goes once the query is committed. No transition is defined.

## Spacing & Sizing
| Size | Minimum height | Padding (V / H) | Text font | Icons |
|---|---|---|---|---|
| small | `--search-container-height-small` | `--search-container-padding-y` / `--search-container-padding-x` | `--search-value-font-small` | `--search-icon-size` |
| medium | `--search-container-height-medium` | `--search-container-padding-y` / `--search-container-padding-x` | `--search-value-font-medium` | `--search-icon-size` |
| large (default) | `--search-container-height-large` | `--search-container-padding-y` / `--search-container-padding-x` | `--search-value-font-large` | `--search-icon-size` |

`--search-container-width` wide at every size by default; it can stretch to fill its container. Padding and gaps hold at every size. The heights are minimums: the field grows with the text size and the query stays on one line ([patterns 5.37](../patterns/05-sizes-devices.md)). Icons stay at the Icon's `--icon-size-medium` step at every size.

## Properties
| Property | Options | Default |
|---|---|---|
| Size | small, medium, large | large |
| Shape | sharp, rounded, full | rounded |
| Flavour | default, gradient, ghost | default |
| State | enabled, hover, focus, selected, typing, filled, disabled | enabled |
| hasLeading | on / off | on |
| hasTrailing | on / off | on |
| Trailing control | any icon and action | `microphone` (voice input) |
| Trailing group | icon only, clear only, both | both (while typing) |
| Placeholder | text | Search |

Hover, focus, selected and typing are driven by interaction, never set on a static layout.

## Usage
- Keep hasLeading on unless the context already says this is search; the magnifier is the fastest signal.
- Use ghost in a surface that already bounds the field, such as a header, and default inside a form.
- Don't use gradient on an ordinary search field; it marks AI search, and always comes with an [AI Mark](../atoms/ai-mark.md).
- Typing is the only state with a clear control. Don't treat it as a style.
- Offer voice input only where the device supports speech recognition, and never as the only way to search.
- Show only one clear control: hide the platform's own search clear button.
- Search finds things; to choose one item from a long known list, use a [Combobox](./combobox.md).
- Declare the field as search (`type="search"`, `enterkeyhint="search"`), so the keyboard's action key says Search ([patterns 3.39](../patterns/03-controls-interaction.md)).
- Small and medium are below `--search-touch-target-size-minimum`; on touch products use large or extend the hit area ([patterns 6.16](../patterns/06-accessibility.md)).

## Accessibility
- The field has no label of its own and the placeholder is never one ([patterns 6.47](../patterns/06-accessibility.md)); give it an accessible name (for example "Search orders").
- Focus is the heaviest border in the set. Wherever ghost suppresses it, the container must show focus instead.
- The magnifier is decorative. The clear and trailing controls are glyphs with no text: each needs a name ("Clear search", "Voice search") and a focus ring of `--search-control-focus-ring-width` `--search-control-focus-ring-color`.
- The clear control appears only while typing; announce the change or keep it reachable.
- The placeholder disappears once someone types; don't rely on it to carry meaning.

## Claude Prompt
Draw a Zebra search field `--search-container-width` wide and `--search-container-height-large` tall with a white fill (`--search-container-background-enabled`), a thin `--search-container-border-width` mid grey border (`--search-container-border-color-enabled`) and softly rounded corners (`--search-container-radius-rounded`), or a full pill shape (`--search-container-radius-full`). Inside, `--search-container-padding-x` from the left, a `--search-icon-size` near-black magnifier icon, then grey placeholder text "Search" in `--search-value-font-large` (`--search-placeholder-foreground`), and at the right a microphone icon. While typing, a circular clear (x) icon, a thin vertical divider and the microphone sit together at the right, and the border turns blue (`--search-container-border-color-typing`). On focus the border thickens to `--search-container-border-width-focused`. A ghost version has no border; a gradient version has a purple-to-navy gradient border.
