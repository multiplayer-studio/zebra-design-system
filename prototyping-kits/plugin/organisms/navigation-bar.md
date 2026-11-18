---
name: Navigation Bar
level: organism
status: stable
composes: [../atoms/icon.md, ../atoms/notification-indicator.md, ../atoms/divider.md, ../atoms/button.md]
tokens:
  # container
  navigation-bar-container-border-width: '{stroke.stroke-thin}'
  navigation-bar-container-border-color: '{colors.color-line-default}'
  navigation-bar-divider-inset: '{space.space-sm}'
  navigation-bar-action-padding-start: '{space.space-lg}'
  navigation-bar-action-gap: '{space.space-sm}'
  # item
  navigation-bar-item-height: '{component-sizes.size-navigation-bar-item-height}'
  navigation-bar-item-padding-y: '{space.space-sm}'
  navigation-bar-item-padding-x: '{space.space-lg}'
  navigation-bar-item-gap: '{space.space-sm}'
  navigation-bar-item-foreground: '{colors.color-ink-high}'
  navigation-bar-item-foreground-active: '{colors.color-ink-link}'
  navigation-bar-item-foreground-disabled: '{colors.color-ink-disabled}'
  navigation-bar-item-label-font: '{typography.type-body-small}'
  navigation-bar-item-icon-size: '{icon.icon-size-medium}'
  navigation-bar-item-badge-offset-x: '{space.space-lg}'
  navigation-bar-item-badge-offset-y: '{space.space-neg-md}'
  navigation-bar-item-selection-width: '{stroke.stroke-thick}'
  navigation-bar-item-selection-color: '{colors.color-line-selection}'
  # focus
  navigation-bar-focus-ring-width: '{stroke.stroke-thick}'
  navigation-bar-focus-ring-color: '{colors.color-line-focus}'
---
	
# Navigation Bar

> A horizontal bar of top-level destinations pinned to the bottom of a compact screen, each an icon over a label, with an optional main create action.

## Anatomy
1. Bar — fills its parent's width and hugs its content vertically. It has no fill, padding, gap or shadow; it draws only a `--navigation-bar-container-border-width` `--navigation-bar-container-border-color` top border outside its bounds, and shows whatever surface is behind it.
2. Slot — the main group of destinations (navigation items).
3. Right Slot (Spacer only) — a second group pushed to the far end, for account or utility destinations.
4. Divider section (Show Divider only) — a vertical [Divider](../atoms/divider.md) between the two groups, inset `--navigation-bar-divider-inset` top and bottom.
5. Action Slot (optional) — one [Button](../atoms/button.md) at the end of the bar, `--navigation-bar-action-padding-start` from the last destination: the product's one main create action, not a destination ([patterns 2.14](../patterns/02-navigation-flow.md)). Match its flavour and size to the surface.
6. Navigation item — one destination, at least `--navigation-bar-item-height` tall, padded `--navigation-bar-item-padding-y` / `--navigation-bar-item-padding-x`, hugging its label:
   - Icon box — an [Icon](../atoms/icon.md) at `--navigation-bar-item-icon-size` in a box that doesn't clip. It ships holding Star, a placeholder to swap.
   - Label — the destination's name in `--navigation-bar-item-label-font`, `--navigation-bar-item-gap` under the icon, the same colour as the icon in every state. It wraps to two lines rather than truncating.
   - Selection mark (active only) — a `--navigation-bar-item-selection-width` bar in `--navigation-bar-item-selection-color` along the item's top edge, inside its bounds, so the current destination shows by shape as well as colour ([patterns 6.11](../patterns/06-accessibility.md)).
   - Badge (optional) — a [Notification Indicator](../atoms/notification-indicator.md): small (a dot) for something new, or large with a number for a count ([patterns 1.69](../patterns/01-screen-composition.md)), placed `--navigation-bar-item-badge-offset-x` / `--navigation-bar-item-badge-offset-y` against the icon box so it overhangs the top-right corner, outside the layout.

## Variants
| Arrangement | Layout |
|---|---|
| Shrink Items on (default) | items keep their natural width; the groups sit against the ends of the bar |
| Shrink Items off | the item row stretches to the full width and spreads the items evenly |
| Spacer on (Shrink Items on only) | two groups pushed to opposite ends, adding the Right Slot |
| Show Divider on (Spacer on only) | a vertical rule between the two groups |
| Show Action Slot on | an action at the end of the bar |

## States
Navigation item:

| State | Icon and label | Notes |
|---|---|---|
| default | `--navigation-bar-item-foreground` | no fill |
| active | `--navigation-bar-item-foreground-active` | plus the selection mark; no background; exactly one per bar |
| focused | per state | `--navigation-bar-focus-ring-width` `--navigation-bar-focus-ring-color` ring; Figma models no focus, so code draws it |
| disabled | `--navigation-bar-item-foreground-disabled` | temporarily unavailable only; stays focusable and says why |
| badge shown | unchanged | the dot or count appears over the icon; the footprint doesn't change |

The bar has no states. Figma models no hover or pressed and no timing: state changes are colour only. Arrangement changes are an authoring choice, not runtime motion. Under Shrink Items off, adding or removing an item re-spaces the rest at once, and an item re-hugs its label whenever the text changes.

## Spacing & Sizing
| Part | Value |
|---|---|
| Bar | fill width; height hugs the items (at least `--navigation-bar-item-height`) |
| Item | at least `--navigation-bar-item-height` tall, growing when a label wraps; `--navigation-bar-item-padding-y` top and bottom, `--navigation-bar-item-padding-x` each side; `--navigation-bar-item-gap` icon to label |
| Divider | inset `--navigation-bar-divider-inset` top and bottom |
| Action Slot | `--navigation-bar-action-padding-start` leading padding, `--navigation-bar-action-gap` gap |

Every inset comes from the items; the bar adds no padding or gap. Labels never truncate: they wrap to two lines and the item grows ([patterns 5.29](../patterns/05-sizes-devices.md)). The bar holds up to five destinations; beyond five, the most used stay and the rest go under a final "More" ([patterns 1.46](../patterns/01-screen-composition.md)).

## Properties
| Property | Options | Default |
|---|---|---|
| Shrink Items | on / off | on |
| Spacer | on / off (Shrink Items on) | off |
| Show Divider | on / off (Spacer on) | off |
| Show Action Slot | on / off | off |

Navigation item:

| Property | Options | Default |
|---|---|---|
| Active | on / off | off |
| Disabled | on / off (temporarily unavailable items) | off |
| Label | text | Label |
| Icon | any icon | star |
| Show Badge | on / off | off |
| Badge count | none (dot), a number | none |

## Usage
- Fill the slots with navigation items and let the bar arrange them; use the variants rather than positioning by hand.
- Put the main create action in the Action Slot, never among the destinations, where it reads as another place to go. One action at most; any other action belongs to the screen.
- Use the bar for global navigation on compact screens only; from medium up the [Navigation Rail](navigation-rail.md) takes over ([patterns 5.15](../patterns/05-sizes-devices.md)).
- Leave out destinations the person's role can't use ([patterns 2.80](../patterns/02-navigation-flow.md)). Use Disabled only for one that's temporarily unavailable, and say why.
- Use Shrink Items off only for a fixed set of destinations; evenly spread items re-space whenever the count changes.
- Keep labels to one or two words; each item hugs its text, so a long one is wider than its neighbours.
- Use the dot badge for something new and the count badge for a number that needs attention.
- Don't rely on the bar for a background; it has none.

## Accessibility
- The bar is a container that announces nothing itself; wrap it in a named `nav` landmark ([patterns 6.52](../patterns/06-accessibility.md)).
- Mark the active item with `aria-current="page"`; nothing enforces exactly one.
- The icon repeats the label, so the label must stand on its own.
- A disabled item keeps focus with `aria-disabled="true"` and gives its reason on focus and hover, in its description ([patterns 6.34](../patterns/06-accessibility.md)).
- The badge needs a text equivalent in the item's accessible name ("Jobs, 3 new").
- Only the top edge is drawn; on a surface close to `--navigation-bar-container-border-color` the boundary disappears.
- Keep the Action Slot visually distinct; everything else in the bar navigates.

## Claude Prompt
Draw a mobile bottom navigation bar across the full width, with only a thin light grey top line (`--navigation-bar-container-border-color`) and no fill. Inside, four destinations, each `--navigation-bar-item-height` tall with `--navigation-bar-item-padding-x` side padding: a `--navigation-bar-item-icon-size` rounded icon over a `--navigation-bar-item-label-font` label, both near-black (`--navigation-bar-item-foreground`). The current destination's icon and label are blue (`--navigation-bar-item-foreground-active`), with a thick `--navigation-bar-item-selection-color` bar along the item's top edge and no background. One icon has a small red dot badge on its top-right corner.
