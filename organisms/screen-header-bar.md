---
name: Screen Header Bar
level: organism
status: draft
composes: [../atoms/icon-button.md, ../atoms/button.md, ../atoms/icon.md]
tokens:
  screen-header-bar-container-background: '{colors.surface-default}'
  screen-header-bar-container-radius-rounded: '{rounded.radius-minimal}'
  screen-header-bar-title-foreground: '{colors.main-default}'
  screen-header-bar-divider-color: '{colors.border-default}'
---

# Screen Header Bar

> A header bar for screens, typically containing the title and actions.

This page is a composition guide built from existing Zeta atoms and molecules. Measurements to be defined.

## Anatomy
1. Container — full-width bar at the top of a screen/section.
2. Title — screen title text.
3. Actions — [Icon Buttons](../atoms/icon-button.md), flavor subtle, and/or [Buttons](../atoms/button.md), flavor text, aligned to the end. They govern their own colours, states, radius and focus ring.
4. Optional leading [icon](../atoms/icon.md) / back action (Icon Button, flavor subtle).

## Variants
Measurements to be defined. The closest measured equivalent is [Top App Bar](top-app-bar.md) (leading / title / trailing, centered, extended).

## States
Static container; actions carry their own enabled / hover / pressed / focus / disabled states.

## Spacing & Sizing
Measurements to be defined. Stated so far: background `--screen-header-bar-container-background` with `--screen-header-bar-container-radius-rounded` corners when rounded; title `--screen-header-bar-title-foreground`; action icons are Icon Button subtle (`--button-subtle-label-foreground`); bottom divider `--screen-header-bar-divider-color`. Spacing will use the Zeta semantic scale once defined.

## Usage
- Use to title a screen and expose screen-level actions; app-wide navigation stays in the [Global Header](global-header.md).
- Keep the action count small; move extras into an overflow menu ([dropdown menu](../molecules/dropdown-menu.md)).
- Interactive parts inherit the atoms' accessibility: Button touch targets ≥ `--button-touch-target-size-minimum`–`--button-touch-target-size-recommended`, Button focus ring `--button-focus-ring-width` `--button-focus-ring-color`; never rely on colour alone.

## Stitch Prompt
Draw a full-width white header strip with the screen title in medium-weight near-black IBM Plex Sans on the left and two or three grey icon buttons aligned on the right, everything vertically centred, with a thin light grey (`--screen-header-bar-divider-color`) divider beneath it.
