---
name: Stepper Input
level: molecule
status: stable
composes: [../atoms/icon-button.md, ./text-input.md, ../atoms/icon.md]
tokens:
  # layout (aligned with the composed field and buttons)
  stepper-input-container-height-medium: '{text-input.text-input-container-height-medium}'
  stepper-input-container-height-large: '{text-input.text-input-container-height-large}'
  stepper-input-container-gap: '{spacing.spacing-small}'
  stepper-input-field-width: '{dimensions.dim-stepper-input-field-width}'
  stepper-input-hint-margin: '{spacing.spacing-minimum}'
---

# Stepper Input

> A stepper input, also called numeric stepper, is a common UI element that allows users to input a number or value simply by clicking the plus and minus buttons.

## Anatomy
1. Decrement button – [Icon Button](../atoms/icon-button.md) `remove`, flavor outline-subtle, size medium (large stepper → size large), shape rounded (Rounded off → sharp).
2. Value field – [Text Input](./text-input.md) field (no label, no clear button), value centred, fixed `--stepper-input-field-width` wide, same size and shape as the stepper.
3. Increment button – [Icon Button](../atoms/icon-button.md) `add`, same flavor, size and shape as the decrement button.
4. Hint / error row – the [Text Input](./text-input.md) hint row (`--text-input-hint-icon-size` `info` / `error` [icon](../atoms/icon.md) + text).

The icon buttons and text input govern their own colours, borders, radius, states and focus ring; the stepper defines only the row layout.

## Variants
| Size | Buttons | Field | Overall height |
|---|---|---|---|
| medium (default) | Icon Button size medium (`--icon-button-container-size-medium` square) | Text Input size medium | `--stepper-input-container-height-medium` |
| large | Icon Button size large (`--icon-button-container-size-large` square) | Text Input size large | `--stepper-input-container-height-large` |

| Rounded | Buttons | Field |
|---|---|---|
| on (default) | Icon Button shape rounded | Text Input shape rounded |
| off | Icon Button shape sharp | Text Input shape sharp |

## States
| State | Field | Buttons (outline-subtle) |
|---|---|---|
| enabled / hover / pressed / focused | Text Input enabled | Icon Button outline-subtle states |
| at min / max | – | the relevant button becomes disabled |
| disabled | Text Input disabled | Icon Button disabled |
| error | field unchanged | hint row switches to the Text Input error colour (`--text-input-hint-foreground-error`) |

## Spacing & Sizing
| Property | Value |
|---|---|
| Button ↔ field gap | `--stepper-input-container-gap` |
| Field width | `--stepper-input-field-width`, text centred |
| Row → hint | `--stepper-input-hint-margin` |
| Hint | Text Input hint row: `--text-input-hint-font` `--text-input-hint-foreground`, `--text-input-hint-icon-size` icon, `--text-input-hint-gap` gap |

## Properties
| Property | Options | Default |
|---|---|---|
| Size | medium, large | medium |
| Value / Min / Max | number | — |
| Hint text / Error text | text | none |
| Error | on / off | off |
| Rounded | on / off | on |
| Disabled | on / off | off |

## Usage
- Use for small numeric adjustments (quantities); for wide ranges use [Slider Input Field](./slider-input-field.md).
- Set a minimum and maximum so the buttons disable at the bounds.
- Buttons are `--icon-button-container-size-medium`–`--icon-button-container-size-large`, meeting touch-target guidance; the value is also directly editable.
- Give the stepper a visible or accessible label in the surrounding form.

## Stitch Prompt
Draw a horizontal numeric stepper `--stepper-input-container-height-medium` tall: a white `--icon-button-container-size-medium` square outline-subtle icon button (thin light grey border, slightly rounded corners, dark minus icon); `--stepper-input-container-gap` gap; a thin-bordered text-input value box about `--stepper-input-field-width` wide showing a centred near-black number; `--stepper-input-container-gap` gap; then a matching plus button. Beneath, a small grey info icon with `--text-input-hint-font` hint text. Buttons tint pale grey on hover.
