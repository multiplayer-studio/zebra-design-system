---
name: Text Input
level: molecule
status: stable
composes: [../atoms/icon.md]
tokens:
  # container
  text-input-container-background-enabled: '{colors.surface-default}'
  text-input-container-background-hover: '{colors.surface-default}'
  text-input-container-background-focused: '{colors.surface-default}'
  text-input-container-background-error: '{colors.surface-negative-subtle}'
  text-input-container-background-disabled: '{colors.surface-disabled}'
  text-input-container-border-width-enabled: '{border.border-size-small}'
  text-input-container-border-width-hover: '{border.border-size-small}'
  text-input-container-border-width-focused: '{border.border-size-medium}'
  text-input-container-border-width-error: '{border.border-size-medium}'
  text-input-container-border-width-disabled: '{border.border-size-small}'
  text-input-container-border-color-enabled: '{colors.border-default}'
  text-input-container-border-color-hover: '{colors.border-hover}'
  text-input-container-border-color-focused: '{colors.border-primary}'
  text-input-container-border-color-error: '{colors.border-negative}'
  text-input-container-border-color-disabled: '{colors.border-default}'
  text-input-container-radius-rounded: '{rounded.radius-minimal}'
  text-input-container-radius-sharp: '{rounded.radius-none}'
  # sizes
  text-input-container-height-small: '{dimensions.dim-text-input-height-small}'
  text-input-container-height-medium: '{dimensions.dim-text-input-height-medium}'
  text-input-container-height-large: '{dimensions.dim-text-input-height-large}'
  text-input-container-padding-y-small: '{spacing.spacing-small}'
  text-input-container-padding-x-small: '{spacing.spacing-small}'
  text-input-container-padding-y-medium: '{spacing.spacing-small}'
  text-input-container-padding-x-medium: '{spacing.spacing-medium}'
  text-input-container-padding-large: '{spacing.spacing-medium}'
  text-input-multi-line-container-padding: '{spacing.spacing-medium}'
  text-input-value-font-small: '{typography.body-small}'
  text-input-value-font-medium: '{typography.body-medium}'
  text-input-value-font-large: '{typography.body-medium}'
  text-input-multi-line-value-font: '{typography.body-medium}'
  # icon overrides: smaller than the Icon default inside a field
  text-input-icon-size-small: '{icon.icon-size-small}'
  text-input-icon-size-medium: '{icon.icon-size-medium}'
  text-input-icon-size-large: '{icon.icon-size-medium}'
  # content
  text-input-value-foreground: '{colors.main-default}'
  text-input-placeholder-foreground: '{colors.main-subtle}'
  text-input-affix-foreground: '{colors.main-subtle}'
  text-input-icon-foreground: '{colors.main-subtle}'
  text-input-caret-foreground: '{colors.main-primary}'
  text-input-content-foreground-disabled: '{colors.main-disabled}'
  text-input-content-gap: '{spacing.spacing-small}'
  text-input-field-gap: '{spacing.spacing-minimum}'
  # label
  text-input-label-font: '{typography.body-small}'
  text-input-label-foreground: '{colors.main-default}'
  text-input-label-required-foreground: '{colors.main-negative}'
  # hint
  text-input-hint-font: '{typography.body-x-small}'
  text-input-hint-foreground: '{colors.main-subtle}'
  text-input-hint-foreground-error: '{colors.main-negative}'
  text-input-hint-icon-size: '{icon.icon-size-small}'
  text-input-hint-gap: '{spacing.spacing-minimum}'
  # clear button
  text-input-clear-icon-foreground-enabled: '{colors.main-subtle}'
  text-input-clear-icon-foreground-hover: '{colors.main-default}'
  text-input-clear-icon-foreground-pressed: '{colors.state-inverse-selected}'
  text-input-clear-focus-ring-width: '{border.border-size-medium}'
  text-input-clear-focus-ring-color: '{colors.border-primary}'
  # integer arrows
  text-input-arrows-width: '{dimensions.dim-text-input-arrows-width}'
  text-input-arrows-height: '{dimensions.dim-text-input-arrows-height}'
  text-input-arrows-background: '{colors.main-inverse}'
  text-input-arrow-width: '{dimensions.dim-text-input-arrow-width}'
  text-input-arrow-height: '{dimensions.dim-text-input-arrow-height}'
  text-input-arrow-foreground-enabled: '{colors.main-subtle}'
  text-input-arrow-foreground-hover: '{colors.main-default}'
  text-input-arrow-scale-pressed: '{dimensions.dim-text-input-arrow-press-scale}'
  text-input-arrow-duration: '{motion.motion-instant}'
  text-input-arrow-easing: '{motion.easing-standard}'
  text-input-arrow-repeat-delay: '{dimensions.dim-text-input-arrow-repeat-delay}'
  text-input-arrow-repeat-interval: '{dimensions.dim-text-input-arrow-repeat-interval}'
---

# Text Input

> A text input field for entering text. This is the base field shared by Password, Date, Time and Phone inputs (and reused by Search, Select, Stepper and Slider inputs).

## Anatomy
1. Label – optional text above the field.
2. Field container – `--text-input-container-background-enabled` box with a `--text-input-container-border-width-enabled` inner border.
3. Leading icon – [Icon](../atoms/icon.md) (text type only).
4. Prefix – affix text (text / number types only).
5. Input / multi-line area – value + placeholder.
6. Trailing icon – [Icon](../atoms/icon.md) (text type only) or the type-specific control (password toggle, calendar, clock, integer arrows).
7. Suffix – affix text (text / number types only).
8. Clear button – `cancel` icon, always right-most; top-right for multi-line.
9. Hint / error row – `--text-input-hint-icon-size` `info` (hint) or `error` icon + text below the field.

Order inside the field: leading icon → prefix → input → trailing icon/type control → suffix → clear button.

Every icon in the field is an [Icon](../atoms/icon.md); its tokens govern the glyph. Text Input keeps two context overrides: icons are sized smaller than the Icon default (`--text-input-icon-size-small` / `--text-input-icon-size-medium` / `--text-input-icon-size-large`, hint icon `--text-input-hint-icon-size`) to fit the field, and drawn in the subtler `--text-input-icon-foreground` (clear button `--text-input-clear-icon-foreground-enabled`) so they recede behind the value.

## Variants
| Size | Padding (v / h) | Text font | Leading/trailing icon | Resulting height |
|---|---|---|---|---|
| small | `--text-input-container-padding-y-small` / `--text-input-container-padding-x-small` | `--text-input-value-font-small` | `--text-input-icon-size-small` | `--text-input-container-height-small` |
| medium (default) | `--text-input-container-padding-y-medium` / `--text-input-container-padding-x-medium` | `--text-input-value-font-medium` | `--text-input-icon-size-medium` | `--text-input-container-height-medium` |
| large | `--text-input-container-padding-large` (all sides) | `--text-input-value-font-large` | `--text-input-icon-size-large` | `--text-input-container-height-large` |
| multi-line (any size) | `--text-input-multi-line-container-padding` (all sides) | `--text-input-multi-line-value-font` | – | number of visible lines (default 2) |

| Shape | Radius |
|---|---|
| rounded (default) | `--text-input-container-radius-rounded` |
| sharp | `--text-input-container-radius-sharp` |

Input types: text (default), number, integer, password, date, time, multi-line.

## States
| State | Background | Border | Text / icons |
|---|---|---|---|
| enabled | `--text-input-container-background-enabled` | `--text-input-container-border-width-enabled` `--text-input-container-border-color-enabled` | value `--text-input-value-foreground`; placeholder `--text-input-placeholder-foreground`, affixes `--text-input-affix-foreground`, icons `--text-input-icon-foreground` |
| hover | `--text-input-container-background-hover` | `--text-input-container-border-width-hover` `--text-input-container-border-color-hover` | – |
| focus | `--text-input-container-background-focused` | `--text-input-container-border-width-focused` `--text-input-container-border-color-focused`; caret `--text-input-caret-foreground` | – |
| error | `--text-input-container-background-error` | `--text-input-container-border-width-error` `--text-input-container-border-color-error` | hint text + icon `--text-input-hint-foreground-error`; error text replaces hint text |
| disabled | `--text-input-container-background-disabled` | `--text-input-container-border-width-disabled` `--text-input-container-border-color-disabled` | value, label, affixes, hint, icons `--text-input-content-foreground-disabled`; not interactive |
| read-only | as enabled | – | clear button hidden |

Clear button: icon `--text-input-clear-icon-foreground-enabled` → hover `--text-input-clear-icon-foreground-hover` → pressed `--text-input-clear-icon-foreground-pressed`; focus `--text-input-clear-focus-ring-width` outline `--text-input-clear-focus-ring-color`. Shown only when enabled, the field has a value, and the field is not disabled or read-only.

## Spacing & Sizing
| Part | Value |
|---|---|
| Label → field → hint gap | `--text-input-field-gap` |
| Icon/affix ↔ input | `--text-input-content-gap` |
| Hint row | `--text-input-hint-font`, `--text-input-hint-foreground`, `--text-input-hint-icon-size` icon, `--text-input-hint-gap` gap |
| Label | `--text-input-label-font` `--text-input-label-foreground`, required `*` in `--text-input-label-required-foreground` |
| Integer arrows | `--text-input-arrows-width` by `--text-input-arrows-height` block, bg `--text-input-arrows-background`, `--text-input-arrow-width` by `--text-input-arrow-height` triangles `--text-input-arrow-foreground-enabled` → hover `--text-input-arrow-foreground-hover`, press scales to `--text-input-arrow-scale-pressed` (`--text-input-arrow-duration` `--text-input-arrow-easing`); visible on hover only; press-and-hold repeats (`--text-input-arrow-repeat-delay` delay, `--text-input-arrow-repeat-interval` interval) |
| Width | hugs content by default; can stretch to fill its container |

## Properties
| Property | Options | Default |
|---|---|---|
| Label | text | none |
| Hint text | text | none |
| Error | on / off | off |
| Error text | text | none |
| Leading / trailing icon | icon | none |
| Prefix / suffix | text | none |
| Input type | text, number, integer, password, date, time, multi-line | text |
| Visible lines | number (multi-line only) | 2 |
| Clear button | on / off | off |
| Size | small, medium, large | medium |
| Rounded | on / off | on |
| Disabled | on / off | off |
| Required | on / off | off |
| Read-only | on / off | off |
| Placeholder | text | none |

## Usage
- Always give a visible label; placeholder is not a label.
- Use hint text for guidance; in error state show error text — the field gets a red border and pink fill plus an error icon, so error is not signalled by colour alone.
- Clear button is keyboard operable and announced as "Clear input".
- Use large (`--text-input-container-height-large`) where touch targets matter; small (`--text-input-container-height-small`) is for dense desktop layouts.
- Focus ring: `--text-input-container-border-width-focused` `--text-input-container-border-color-focused`.

## Stitch Prompt
Draw a form field: a small `--text-input-label-font` IBM Plex Sans label in `--text-input-label-foreground` above a `--text-input-container-background-enabled` input box with a `--text-input-container-border-width-enabled` `--text-input-container-border-color-enabled` border and `--text-input-container-radius-rounded` corners, `--text-input-container-height-medium` tall with `--text-input-container-padding-x-medium` horizontal padding, `--text-input-value-font-medium` placeholder text in `--text-input-placeholder-foreground`. Optional `--text-input-icon-size-medium` `--text-input-icon-foreground` icons sit `--text-input-content-gap` from the text on the left and right, and `--text-input-affix-foreground` prefix/suffix text can flank the value. Beneath the box, `--text-input-field-gap` down, show a row with a `--text-input-hint-icon-size` info icon and `--text-input-hint-font` `--text-input-hint-foreground` hint text. On hover the border becomes `--text-input-container-border-color-hover`; on focus it becomes a `--text-input-container-border-width-focused` `--text-input-container-border-color-focused` border. The error version has a `--text-input-container-background-error` fill, a `--text-input-container-border-width-error` `--text-input-container-border-color-error` border and `--text-input-hint-foreground-error` error icon and message. Disabled fields are `--text-input-container-background-disabled` with `--text-input-content-foreground-disabled` text.
