---
name: Navigation Header
level: molecule
status: draft
composes: [../atoms/avatar.md, ../atoms/icon-button.md, ../atoms/icon.md]
tokens:
  # container
  navigation-header-container-gap: '{space.space-sm}'
  navigation-header-container-padding-x: '{space.space-2xs}'
  navigation-header-container-gap-collapsed: '{space.space-xl}'
  # title
  navigation-header-title-foreground: '{colors.color-ink-high}'
  navigation-header-title-font: '{typography.type-label-medium}'
  # logo
  navigation-header-logo-height: '{control.control-target-min}'
  navigation-header-logo-foreground: '{colors.color-ink-high}'
---

# Navigation Header

> The identity block at the top of a Navigation Rail or Navigation Drawer: an avatar or product logo, a title, and an optional icon button.

## Anatomy
1. Container — a horizontal row, content vertically centred, `--navigation-header-container-padding-x` horizontal padding.
2. Identity — an [Avatar](../atoms/avatar.md) (Type avatar) or a product mark (Type logo), `--navigation-header-logo-height` tall in `--navigation-header-logo-foreground`.
3. Title (expanded only) — the person's or product's name in `--navigation-header-title-font`, `--navigation-header-title-foreground`, `--navigation-header-container-gap` after the identity. It fills the row and pushes the icon button to the trailing edge.
4. Icon button (expanded only, optional) — an [Icon Button](../atoms/icon-button.md), subtle, small, holding an [Icon](../atoms/icon.md). It shows Settings in the Navigation Rail and the close glyph in the Navigation Drawer; its glyph and action are set per use.

## Variants
| Type | Identity | Title |
|---|---|---|
| avatar (default) | Avatar | person's name |
| logo | product mark, `--navigation-header-logo-height` tall | product name |

| Expanded | Shows |
|---|---|
| true (default) | identity, title and icon button in one row, `--navigation-header-container-gap` apart |
| false | identity alone, centred, `--navigation-header-container-gap-collapsed` from what follows; used by the narrow Navigation Rail |

## States
The header is static. The icon button carries its own hover, pressed, focus and disabled states, and the avatar its own. Expanding or collapsing is set by the parent rail and animates with it.

## Spacing & Sizing
Measurements are provisional: Figma's section for this part is thin (layer structure and tokens only).

| Part | Value |
|---|---|
| Padding | `--navigation-header-container-padding-x` left and right |
| Gap | `--navigation-header-container-gap` (expanded); `--navigation-header-container-gap-collapsed` (collapsed) |
| Logo | `--navigation-header-logo-height` tall, width from the artwork |
| Title | `--navigation-header-title-font`, single line, ellipsis when cut off |
| Icon button | small |

Colour follows the parent: inside the Navigation Rail it renders in Dark mode with the rail; in the Navigation Drawer it follows the page.

In the AAA modes the component is always sharp (DESIGN.md §5).

## Properties
| Property | Options | Default |
|---|---|---|
| Type | avatar, logo | avatar |
| Expanded | true, false | true |
| Title | text | — |
| Show Icon Button | on / off | on |
| Icon button glyph | any icon | settings |
| Shape | rounded, sharp (inherited from the parent; reaches the icon button) | rounded |

## Usage
- Use avatar for a person-centred app (the signed-in user) and logo for a product-centred one.
- Keep the title to a name; it is identity, not a page title.
- In a drawer, the icon button is the close control; in a rail, it's an entry point such as Settings, not a destination.
- Don't put more than one control here; the header has room for one.

## Accessibility
- The icon button is glyph-only, so it needs an accessible name (for example "Close navigation" or "Settings").
- The avatar or logo is decorative when the title is shown beside it; give it text alternative only when the title is hidden (collapsed).
- When collapsed, the title is gone, so expose the name another way (the avatar's accessible name or a tooltip).
- Check `--navigation-header-title-foreground` against the parent surface in every mode the parent can render in.

## Stitch Prompt
Draw the top of a navigation panel: a row with `--navigation-header-container-padding-x` side padding holding a small round avatar, the user's name in `--navigation-header-title-font` near-black (`--navigation-header-title-foreground`) `--navigation-header-container-gap` to its right, and a small borderless settings icon button at the far right. In the logo version, replace the avatar with a `--navigation-header-logo-height` tall product mark and show the product name. Collapsed, only the avatar remains, centred.
