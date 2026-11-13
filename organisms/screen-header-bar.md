---
name: Screen Header Bar
level: organism
status: stable
composes: [../atoms/icon.md, ../atoms/button.md]
tokens:
  # container
  screen-header-bar-container-background: '{colors.color-status-ghost-default}'
  screen-header-bar-container-padding-y: '{space.space-sm}'
  screen-header-bar-container-padding-x: '{space.space-lg}'
  screen-header-bar-container-gap: '{space.space-sm}'
  # leading icon
  screen-header-bar-icon-size: '{icon.icon-size-medium}'
  screen-header-bar-icon-foreground: '{icon.icon-foreground}'
  # title
  screen-header-bar-title-foreground: '{colors.color-ink-high}'
  screen-header-bar-title-font: '{typography.type-title-large}'
  # action slot
  screen-header-bar-action-gap: '{space.space-2xs}'
  # focus
  screen-header-bar-focus-ring-width: '{stroke.stroke-thick}'
  screen-header-bar-focus-ring-color: '{colors.color-line-focus}'
---

# Screen Header Bar

> The bar at the top of a pushed screen: a back affordance, the screen's title and one action.

## Anatomy
1. Container — a horizontal row, items centred, packed from the start, padded `--screen-header-bar-container-padding-y` / `--screen-header-bar-container-padding-x`, `--screen-header-bar-container-gap` between parts, on `--screen-header-bar-container-background` (transparent). No border, radius or shadow.
2. Leading icon (optional) — a back chevron (`chevron_left`), an [Icon](../atoms/icon.md) at `--screen-header-bar-icon-size` in `--screen-header-bar-icon-foreground`. Only its visibility is exposed; the glyph is fixed.
3. Heading — the title in `--screen-header-bar-title-font` `--screen-header-bar-title-foreground`. It fills the space between the icon and the slot, which holds the action hard right.
4. Action Slot — the trailing region, hugging its content, `--screen-header-bar-action-gap` between controls. Ships with one [Button](../atoms/button.md), medium, primary.

## Variants
Rounded doesn't round the bar: it sets the shape of the Button shipped in the slot. On (default) → the Button's rounded shape; off → its sharp shape. Content placed in the slot later doesn't follow it. In the AAA modes the component is always sharp (DESIGN.md §5).

## States
The bar is static and declares no hover, focus, pressed or disabled states; the action Button carries its own. The back chevron has no state in Figma, so code makes it a control with a `--screen-header-bar-focus-ring-width` `--screen-header-bar-focus-ring-color` focus ring. Nothing animates. Turning the leading icon off removes it and the heading absorbs its width (the icon plus one gap); nothing else moves.

## Spacing & Sizing
| Part | Value |
|---|---|
| Padding | `--screen-header-bar-container-padding-y` top and bottom, `--screen-header-bar-container-padding-x` left and right |
| Gap | `--screen-header-bar-container-gap` between icon, heading and slot |
| Leading icon | `--screen-header-bar-icon-size` |
| Height | one medium Button plus padding |

Set the bar to fill its container: Figma ships it at a fixed width, so a placed instance won't stretch on its own.

## Properties
| Property | Options | Default |
|---|---|---|
| Title | text | Add Subscribers |
| Show Leading Icon | on / off | on |
| Rounded | on / off (shape of the slot's Button) | on |
| Action Slot | one Button (any flavour) | Button, medium, primary |

## Usage
- Use it as the top bar of a pushed screen, with the back chevron on and a single action on the right. Use [Top App Bar](top-app-bar.md) when the screen needs several actions or a different leading control.
- Name the screen, not the task in progress; the bar doesn't change as people work.
- Turn the leading icon off only on a root screen with nowhere to go back to.
- Match Rounded to the buttons elsewhere on the screen.
- Don't put more than one control in the Action Slot; the bar was drawn around one.

## Accessibility
- The back chevron needs an accessible name ("Back") and a keyboard path; neither is modelled in Figma. Build it as a button.
- No focus state exists in the set; focus order and the `--screen-header-bar-focus-ring-color` ring come from code.
- The title names the screen, so mark it up as a real heading.
- The bar is transparent (`--screen-header-bar-container-background`); check the title and the action against whatever screen sits behind it.
- With the leading icon off on a pushed screen, something else must provide a way back.

## Stitch Prompt
Draw a transparent header strip at the top of a screen, `--screen-header-bar-container-padding-x` side padding and `--screen-header-bar-container-padding-y` top and bottom. On the left a `--screen-header-bar-icon-size` left chevron in near-black, then the screen title "Add Subscribers" in `--screen-header-bar-title-font` near-black (`--screen-header-bar-title-foreground`) filling the row; on the far right a single medium blue primary button "Save". Everything vertically centred, no border or shadow.
