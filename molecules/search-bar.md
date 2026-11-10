---
name: Search Bar
level: molecule
status: stable
composes: [./text-input.md, ../atoms/icon.md]
tokens:
  search-bar-container-radius-full: '{rounded.radius-full}'
  # sizes
  search-bar-divider-height-small: '{spacing.spacing-large}'
  search-bar-divider-height-medium: '{spacing.spacing-2xl}'
  search-bar-divider-height-large: '{spacing.spacing-2xl}'
  search-bar-divider-width: '{border.border-size-small}'
  search-bar-divider-color: '{colors.border-default}'
  # content
  search-bar-input-foreground: '{colors.main-subtle}'
  search-bar-microphone-icon-foreground: '{colors.main-default}'
---

# Search Bar

> A text input field for entering search queries. Supports voice search where the device offers speech recognition.

## Anatomy
1. Container – a [Text Input](./text-input.md) field: its background, border (per state), radius, caret, icon colours, sizes (height, padding, value font and icon size) and content gap govern the search bar. The search bar adds the full (pill) shape, the divider and the microphone.
2. Search icon – [Icon](../atoms/icon.md) `search`, leading, shown by default, in the text input's icon colour.
3. Input – search query text.
4. Clear icon – [Icon](../atoms/icon.md) `cancel`, shown only when there is a value; clears the field. This is the only clear control: hide the native platform's own clear button, so there are never two.
5. Divider – `--search-bar-divider-width` vertical line, shown between clear and microphone only when there is a value.
6. Microphone icon – [Icon](../atoms/icon.md) `microphone`, trailing, only when voice search is on and the device supports speech recognition.

## Variants
Sizes work exactly like the [Text Input](./text-input.md)'s small, medium (default) and large: each takes the text input's height, padding, value font and icon size for that size (see its Variants table). The search bar adds only the divider height:

| Size | Divider height |
|---|---|
| small | `--search-bar-divider-height-small` |
| medium (default) | `--search-bar-divider-height-medium` |
| large | `--search-bar-divider-height-large` |

| Shape | Radius | Icon font |
|---|---|---|
| rounded (default) | `--text-input-container-radius-rounded` | zeta-icons-round |
| full | `--search-bar-container-radius-full` (pill; override, the text input has no pill shape) | zeta-icons-round |
| sharp | `--text-input-container-radius-sharp` | zeta-icons-sharp |

## States
| State | Background | Border | Text / icons |
|---|---|---|---|
| enabled | `--text-input-container-background-enabled` | `--text-input-container-border-width-enabled` `--text-input-container-border-color-enabled` | input `--search-bar-input-foreground`; search/clear icons `--text-input-icon-foreground`; microphone `--search-bar-microphone-icon-foreground` |
| hover | `--text-input-container-background-hover` | `--text-input-container-border-width-hover` `--text-input-container-border-color-hover` | – |
| focus | `--text-input-container-background-focused` | `--text-input-container-border-width-focused` `--text-input-container-border-color-focused`; caret `--text-input-caret-foreground` | – |
| disabled | `--text-input-container-background-disabled` | – | icons `--text-input-content-foreground-disabled`; not interactive |

Divider colour: `--search-bar-divider-color`.

Context overrides: query text uses `--search-bar-input-foreground` (subtle, not the text input's value colour) and the microphone uses `--search-bar-microphone-icon-foreground` so it stands out from the subtle search/clear icons.

## Spacing & Sizing
| Property | Value |
|---|---|
| Gap between icon / input / icons | `--text-input-content-gap` |
| Width | hugs content by default; can stretch to fill its container |

## Properties
| Property | Options | Default |
|---|---|---|
| Voice search (microphone) | on / off | off |
| Leading search icon | on / off | on |
| Size | small, medium, large | medium |
| Shape | sharp, rounded, full | rounded |
| Disabled | on / off | off |
| Placeholder | text | "Search" |

## Usage
- Provide a placeholder like "Search" and an accessible name; the search icon alone is not a label.
- Use the full shape for prominent, app-bar search; rounded inside forms and tables.
- Voice search only appears where speech recognition exists — never make it the only way to search.
- Focus ring: `--text-input-container-border-width-focused` `--text-input-container-border-color-focused`.

## Stitch Prompt
Draw a search field `--text-input-container-height-medium` tall with a `--text-input-container-background-enabled` fill, `--text-input-container-border-width-enabled` `--text-input-container-border-color-enabled` border and either `--text-input-container-radius-rounded` corners or a fully rounded pill shape (`--search-bar-container-radius-full`). On the left, `--text-input-container-padding-x-medium` in, a `--text-input-icon-size-medium` `--text-input-icon-foreground` magnifying-glass icon, then `--text-input-value-font-medium` `--search-bar-input-foreground` placeholder text "Search". When text is entered, a `--text-input-icon-foreground` circular clear (x) icon appears at the right, followed by a thin `--search-bar-divider-height-medium`-tall `--search-bar-divider-color` vertical divider and a `--search-bar-microphone-icon-foreground` microphone icon. Hovering darkens the border to `--text-input-container-border-color-hover`; focus gives a `--text-input-container-border-width-focused` `--text-input-container-border-color-focused` border.
