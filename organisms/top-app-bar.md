---
name: Top App Bar
level: organism
status: stable
composes: [../atoms/icon-button.md, ../atoms/avatar.md, ../atoms/button.md, ../molecules/search.md, ../atoms/icon.md]
tokens:
  # container
  top-app-bar-container-background: '{colors.color-fill-default}'
  top-app-bar-container-padding-y: '{space.space-md}'
  top-app-bar-container-padding-x: '{space.space-sm}'
  top-app-bar-container-gap: '{space.space-sm}'
  top-app-bar-extended-container-gap: '{space.space-lg}'
  top-app-bar-container-radius-sharp: '{radius.radius-none}'
  top-app-bar-container-radius-rounded: '{radius.radius-element-sm}'
  # content row
  top-app-bar-leading-gap: '{space.space-md}'
  top-app-bar-search-gap: '{space.space-md}'
  top-app-bar-trailing-gap: '{space.space-none}'
  # title
  top-app-bar-title-gap: '{space.space-sm}'
  top-app-bar-title-foreground: '{colors.color-ink-high}'
  top-app-bar-title-font: '{typography.type-label-large}'
  top-app-bar-centered-title-font: '{typography.type-label-medium}'
  top-app-bar-extended-title-padding-x: '{space.space-sm}'
  # selection count
  top-app-bar-count-foreground: '{colors.color-ink-high}'
  top-app-bar-count-font: '{typography.type-label-medium}'
---

# Top App Bar

> The header at the top of a mobile screen: the screen's name between a leading control and whatever actions the screen needs, in six arrangements.

## Anatomy
1. Bar — the surface, `--top-app-bar-container-background`, holding one content row padded `--top-app-bar-container-padding-y` top and bottom and `--top-app-bar-container-padding-x` each side. Extended adds a second row beneath, `--top-app-bar-extended-container-gap` below the first.
2. Leading control — an [Icon Button](../atoms/icon-button.md), small, subtle, at the start. Its glyph follows Type (hamburger, close or back) and isn't an input. `--top-app-bar-leading-gap` separates it from what follows.
3. Title — the screen's name in `--top-app-bar-title-font` `--top-app-bar-title-foreground` (centered: `--top-app-bar-centered-title-font`). On default, a small photo [Avatar](../atoms/avatar.md) sits `--top-app-bar-title-gap` before it.
4. Trailing region — the Trailing Slot (default, extended), the Contextual Control Slot (contextual, contextual alt), a single fixed Icon Button (centered), or nothing (search). Slots hold small subtle Icon Buttons, `--top-app-bar-trailing-gap` apart, and hug them.
5. Selection count (contextual types) — plain text in `--top-app-bar-count-font` `--top-app-bar-count-foreground` on contextual; the label of a small subtle [Button](../atoms/button.md) on contextual alt.
6. Search field (search only) — a [Search](../molecules/search.md), small, ghost, filling the width beside the back control, `--top-app-bar-search-gap` from it, shown in its typing state.
7. Second row (extended only) — the title on a line of its own, `--top-app-bar-title-font`, `--top-app-bar-extended-title-padding-x` side padding.

## Variants
| Type | Leading | Middle | Trailing |
|---|---|---|---|
| default | hamburger | avatar + title (`--top-app-bar-title-font`) | Trailing Slot (three icon buttons) |
| centered | hamburger | title centred (`--top-app-bar-centered-title-font`) | one fixed icon button |
| contextual | close | fixed count (`--top-app-bar-count-font`) | Contextual Control Slot (four icon buttons) |
| contextual alt | close | count inside a Button | Contextual Control Slot |
| search | back | Search field | none |
| extended | hamburger | none on the first row; title on the second | Trailing Slot |

Each Type brings its own leading control, middle content and slot, so changing Type replaces the bar's contents rather than rearranging them. The two slots are never both present.

Shape: rounded (default) → `--top-app-bar-container-radius-rounded`; sharp → `--top-app-bar-container-radius-sharp`. Figma defaults to sharp; the system default is rounded. In the AAA modes the component is always sharp (DESIGN.md §5). Shape rounds the bar's own corner only; the controls inside keep their own (rounded) shape either way.

## States
The bar is static. Hover, focus and press belong to the controls placed inside it. No transition is defined: changing Type replaces the contents outright and nothing animates.

## Spacing & Sizing
| Part | Value |
|---|---|
| Padding | `--top-app-bar-container-padding-y` top and bottom, `--top-app-bar-container-padding-x` each side |
| Row gap | `--top-app-bar-container-gap`; extended `--top-app-bar-extended-container-gap` |
| Content row | leading group and trailing region spread to opposite ends; search lays its two parts out from the start, `--top-app-bar-search-gap` apart |
| Leading group | `--top-app-bar-leading-gap` after the leading control; `--top-app-bar-title-gap` avatar to title |
| Height | one small control plus padding on five types; extended is taller by its title row |

Width fills the screen (Figma draws a 390 phone frame). A layout that assumes one bar height shifts when Type becomes extended.

## Properties
| Property | Options | Default |
|---|---|---|
| Type | default, centered, contextual, contextual alt, search, extended | default |
| Shape | sharp, rounded | rounded |
| Page Title | text (default, centered and extended only) | Title |
| Trailing Slot | icon buttons (default, extended) | three |
| Contextual Control Slot | icon buttons (contextual, contextual alt) | four |
| Selection count | text (contextual alt: the Button label) | — |

## Usage
- Pick Type for what the screen is doing; each is a different arrangement, not a style on one layout.
- Keep Page Title to the screen's name. Setting it on contextual, contextual alt or search changes nothing; they draw no title.
- Use centered only when one trailing control is enough.
- Use contextual while items are selected; use contextual alt when the count must be settable or pressable.
- Search takes over the whole bar; nothing but back is reachable while searching.
- Don't expect Shape to reshape the controls inside.
- App-wide navigation belongs in the [Global Header](global-header.md), not here.

## Accessibility
- The bar is a landmark, not a control; it takes its role and name from the screen (usually `header`).
- Every control is glyph-only, so the leading control and each trailing action need an accessible name, and the leading name must follow Type (menu, close or back).
- The title should match what the screen is announced as, and be a real heading.
- On the contextual types the count is the only report of the selection, so announce it when it changes (a polite live region).
- The title colour isn't bound in Figma; this system binds it to `--top-app-bar-title-foreground` so it follows every mode.

## Claude Prompt
Draw a white mobile top bar (`--top-app-bar-container-background`) with `--top-app-bar-container-padding-y` vertical and `--top-app-bar-container-padding-x` horizontal padding and softly rounded corners (`--top-app-bar-container-radius-rounded`). On the left a small borderless hamburger icon button, then `--top-app-bar-leading-gap` later a small round photo avatar and the screen title "Deliveries" in `--top-app-bar-title-font` near-black (`--top-app-bar-title-foreground`). On the right, three small borderless icon buttons (globe, heart, vertical dots). For the extended version, keep the icons on the top row and place the title on its own row `--top-app-bar-extended-container-gap` below; for centered, centre a smaller title (`--top-app-bar-centered-title-font`) between a hamburger and one icon; for contextual, show a close icon, "2 items" and four action icons.
