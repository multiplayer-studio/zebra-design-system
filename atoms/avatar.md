---
name: Avatar
level: atom
status: stable
composes: [../atoms/icon.md]
tokens:
  # swatch (behind initials or an icon; never behind a photo)
  avatar-purple-container-background: '{colors.color-data-4}'
  avatar-magenta-container-background: '{colors.color-data-10}'
  avatar-indigo-container-background: '{colors.color-data-9}'
  avatar-yellow-container-background: '{colors.color-data-7}'
  avatar-coral-container-background: '{colors.color-data-2}'
  avatar-teal-container-background: '{colors.color-data-6}'
  avatar-burgundy-container-background: '{colors.color-data-5}'
  # content
  avatar-content-foreground: '{colors.color-ink-inverse}'
  avatar-label-font: '{typography.type-label-large}'
  avatar-label-size-ratio: '{component-sizes.size-avatar-label-ratio}'
  avatar-icon-size-ratio: '{component-sizes.size-avatar-icon-ratio}'
  # container
  avatar-container-radius: '{radius.radius-pill}'
  avatar-container-size-xxxsmall: '{control.control-xs}'
  avatar-container-size-xxsmall: '{primitives.scale-11}'
  avatar-container-size-xsmall: '{control.control-sm}'
  avatar-container-size-small: '{control.control-md}'
  avatar-container-size-medium: '{control.control-lg}'
  avatar-container-size-large: '{primitives.scale-17}'
  avatar-container-size-xlarge: '{primitives.scale-18}'
  avatar-container-size-xxlarge: '{component-sizes.size-avatar-xxlarge}'
  avatar-container-size-xxxlarge: '{component-sizes.size-avatar-xxxlarge}'
  # ring
  avatar-ring-border-color: '{colors.color-line-default}'
  avatar-ring-border-width-xxxsmall: '{stroke.stroke-thick}'
  avatar-ring-border-width-xxsmall: '{stroke.stroke-thick}'
  avatar-ring-border-width-xsmall: '{stroke.stroke-thick}'
  avatar-ring-border-width-small: '{stroke.stroke-thick}'
  avatar-ring-border-width-medium: '{stroke.stroke-thick}'
  avatar-ring-border-width-large: '{stroke.stroke-heavy}'
  avatar-ring-border-width-xlarge: '{stroke.stroke-heavy}'
  avatar-ring-border-width-xxlarge: '{primitives.scale-4}'
  avatar-ring-border-width-xxxlarge: '{primitives.scale-5}'
  # badge (status and close share the shape and the size ladder)
  avatar-badge-radius: '{radius.radius-pill}'
  avatar-badge-border-width: '{stroke.stroke-thin}'
  avatar-badge-border-color: '{colors.color-ink-inverse}'
  avatar-badge-icon-foreground: '{colors.color-ink-inverse}'
  avatar-badge-size-xxxsmall: '{primitives.scale-5}'
  avatar-badge-size-xxsmall: '{component-sizes.size-avatar-badge-xxsmall}'
  avatar-badge-size-xsmall: '{primitives.scale-6}'
  avatar-badge-size-small: '{primitives.scale-6}'
  avatar-badge-size-medium: '{primitives.scale-7}'
  avatar-badge-size-large: '{component-sizes.size-avatar-badge-large}'
  avatar-badge-size-xlarge: '{primitives.scale-9}'
  avatar-badge-size-xxlarge: '{primitives.scale-12}'
  avatar-badge-size-xxxlarge: '{primitives.scale-16}'
  avatar-status-icon-size-ratio: '{component-sizes.size-avatar-status-icon-ratio}'
  # status
  avatar-available-badge-background: '{colors.color-status-success-default}'
  avatar-away-badge-background: '{colors.color-data-8}'
  avatar-busy-badge-background: '{colors.color-status-error-default}'
  avatar-dnd-badge-background: '{colors.color-data-4}'
  avatar-on-shift-badge-background: '{colors.color-data-9}'
  avatar-offline-badge-background: '{colors.color-ink-inverse}'
  avatar-offline-badge-border-color: '{colors.color-ink-medium}'
  avatar-offline-icon-foreground: '{colors.color-ink-medium}'
  avatar-custom-badge-background: '{colors.color-data-9}'
  # close
  avatar-close-badge-background: '{colors.color-data-12}'
  avatar-close-icon-size-ratio: '{component-sizes.size-avatar-status-icon-ratio}'
  avatar-close-focus-ring-width: '{stroke.stroke-thick}'
  avatar-close-focus-ring-color: '{colors.color-line-focus}'
  avatar-close-touch-target-size-minimum: '{control.control-target-min}'
---

# Avatar

> Represents a person or entity as a photo, initials or an icon, with optional presence, dismiss and ring treatments that scale with its size.

## Anatomy
1. Container — a circle (`--avatar-container-radius`), fixed diameter per size. Holds one content type, chosen per instance:
   - initials (one or two letters) on a swatch, in `--avatar-content-foreground`, `--avatar-label-font` scaled to `--avatar-label-size-ratio` of the diameter;
   - a photo, cropped to the circle, no swatch;
   - an [Icon](../atoms/icon.md) on a swatch, in `--avatar-content-foreground`, sized `--avatar-icon-size-ratio` of the diameter.
2. Ring (optional) — an outline on the container's edge, `--avatar-ring-border-color`, weight per size (`--avatar-ring-border-width-medium` at medium). Drawn over the content, so it adds no size.
3. Close badge (optional) — pinned flush to the top-right corner, inside the avatar's bounds. A `--avatar-close-badge-background` circle with a `close` [Icon](../atoms/icon.md) sized `--avatar-close-icon-size-ratio` of the badge. In code it is a button.
4. Status badge (optional) — pinned flush to the bottom-right corner, inside the bounds. A circle showing presence, with its own glyph per state (see Variants), sized `--avatar-status-icon-size-ratio` of the badge.

Both badges are `--avatar-badge-radius` circles with a `--avatar-badge-border-width` `--avatar-badge-border-color` edge that cuts them away from the avatar beneath. Both sit at the same size step (`--avatar-badge-size-medium` at medium).

The status badge is presence only. For an unread or notification count, use a [Notification Indicator](../atoms/notification-indicator.md) outside the avatar rather than a status.

## Variants
**Swatch.** Applies behind initials or an icon, never behind a photo. Each swatch is named by its hue.

| Swatch | Background |
|---|---|
| purple (default) | `--avatar-purple-container-background` |
| magenta | `--avatar-magenta-container-background` |
| indigo | `--avatar-indigo-container-background` |
| yellow | `--avatar-yellow-container-background` |
| coral | `--avatar-coral-container-background` |
| teal | `--avatar-teal-container-background` |
| burgundy | `--avatar-burgundy-container-background` |

**Status.** Every state carries its own glyph as well as its colour.

| Status | Badge fill | Glyph | Glyph colour | Edge |
|---|---|---|---|---|
| Available (default) | `--avatar-available-badge-background` | `check_mark` | `--avatar-badge-icon-foreground` | `--avatar-badge-border-color` |
| Away | `--avatar-away-badge-background` | `clock` | `--avatar-badge-icon-foreground` | `--avatar-badge-border-color` |
| Busy | `--avatar-busy-badge-background` | `remove` | `--avatar-badge-icon-foreground` | `--avatar-badge-border-color` |
| DND | `--avatar-dnd-badge-background` | `block` | `--avatar-badge-icon-foreground` | `--avatar-badge-border-color` |
| On Shift | `--avatar-on-shift-badge-background` | `clock_on` | `--avatar-badge-icon-foreground` | `--avatar-badge-border-color` |
| Offline | `--avatar-offline-badge-background` (hollow) | `close` | `--avatar-offline-icon-foreground` | `--avatar-offline-badge-border-color` |
| Close | `--avatar-close-badge-background` | `close` | `--avatar-badge-icon-foreground` | `--avatar-badge-border-color` |
| Icon (custom) | `--avatar-custom-badge-background` | Custom Icon (default `star`) | `--avatar-badge-icon-foreground` | `--avatar-badge-border-color` |

Offline is the only hollow badge, so it stays distinguishable when colour isn't reliable. Close is the dismiss mark the top-right badge uses. It is not a presence state, so don't set the status to it.

## States
| State | Visual | Notes |
|---|---|---|
| static | as configured | Avatar has no hover, pressed or focus states of its own |
| close focused | `--avatar-close-focus-ring-width` `--avatar-close-focus-ring-color` ring around the close badge | code only; the close badge is the one interactive part |

The badges change only when their properties change. Avatar has no motion: any transition when swapping size or content, or toggling a badge or the ring, belongs to the code around it.

## Spacing & Sizing
| Size | Diameter | Badge | Ring |
|---|---|---|---|
| xxxsmall | `--avatar-container-size-xxxsmall` | `--avatar-badge-size-xxxsmall` | `--avatar-ring-border-width-xxxsmall` |
| xxsmall | `--avatar-container-size-xxsmall` | `--avatar-badge-size-xxsmall` | `--avatar-ring-border-width-xxsmall` |
| xsmall | `--avatar-container-size-xsmall` | `--avatar-badge-size-xsmall` | `--avatar-ring-border-width-xsmall` |
| small | `--avatar-container-size-small` | `--avatar-badge-size-small` | `--avatar-ring-border-width-small` |
| medium (base) | `--avatar-container-size-medium` | `--avatar-badge-size-medium` | `--avatar-ring-border-width-medium` |
| large | `--avatar-container-size-large` | `--avatar-badge-size-large` | `--avatar-ring-border-width-large` |
| xlarge | `--avatar-container-size-xlarge` | `--avatar-badge-size-xlarge` | `--avatar-ring-border-width-xlarge` |
| xxlarge | `--avatar-container-size-xxlarge` | `--avatar-badge-size-xxlarge` | `--avatar-ring-border-width-xxlarge` |
| xxxlarge | `--avatar-container-size-xxxlarge` | `--avatar-badge-size-xxxlarge` | `--avatar-ring-border-width-xxxlarge` |

Medium is the base step that every other size is scaled from. Each size is a fixed square, and it isn't resizable apart from the Size property.

- The badges are a third of the avatar at medium. Above medium they grow more slowly than the avatar, so a large avatar is never dominated by its badge.
- The status and close glyphs each keep a constant share of their badge (`--avatar-status-icon-size-ratio`, `--avatar-close-icon-size-ratio`).
- Initials (`--avatar-label-size-ratio`) and the content icon (`--avatar-icon-size-ratio`) scale with the diameter.
- Both badges stay inside the avatar's bounds, pinned to their corners. They move with the avatar and never independently.

Every colour resolves separately in light, dark and AAA modes.

## Properties
| Property | Options | Default |
|---|---|---|
| Size | xxxsmall, xxsmall, xsmall, small, medium, large, xlarge, xxlarge, xxxlarge | xxxsmall |
| Content | initials, photo, icon (set on the instance, not a property) | initials |
| Swatch | purple, magenta, indigo, yellow, coral, teal, burgundy | purple |
| Photo | any image (content photo only) | — |
| Show Status | on / off | on |
| Status | Available, Away, Busy, DND, On Shift, Offline, Close, Icon | Available |
| Custom Icon | any icon (Status Icon only) | star |
| Show Close | on / off | on |
| Show Ring | on / off | on |

Figma sets the content type and swatch by swapping the nested instance. Code takes them as properties, plus any image for the photo.

## Usage
- Match the size to the context. Dense lists and tables take xxxsmall to small, cards and list headers medium or large, and profile headers xlarge to xxxlarge.
- Prefer a photo. Fall back to one or two initials on a swatch, then a `person` icon.
- Swatches tell people apart. They carry no meaning, so don't encode status in them.
- Turn Show Status off where presence doesn't apply (a generic entity, an illustrative photo) or where it never updates. A stale Available promises a reachability the system can't back up.
- Use Away only where the system can actually detect idleness. Busy describes the person and DND describes their notifications, so the two aren't interchangeable. Use On Shift only in shift-based products.
- Use Status Icon rarely. A custom glyph carries none of the shared meaning of the named states.
- Use Show Close in removable contexts, such as a multi-select list of people. It's off in read-only contexts.
- Don't put a count in the status badge. Show unread counts with a [Notification Indicator](../atoms/notification-indicator.md), and don't set Status to Close (that puts two dismiss marks on one avatar).
- Turn the ring off where its outline competes with the surface around it.
- Groups of people go in an [Avatar Rail](../molecules/avatar-rail.md). A single person removed from a field is an [Input Chip](../molecules/input-chip.md) with a leading xxxsmall avatar.

## Accessibility
- An avatar alone doesn't convey a name. Pair it with visible text or give it an accessible name (alt text on the photo, or a label on the container).
- Each presence state has its own glyph as well as its colour, and Offline is hollow ([patterns 6.11](../patterns/06-accessibility.md)). Still give the status a text equivalent (e.g. "Dana Moreno, away"), because at the smallest sizes the glyph is only a few pixels across.
- The close badge is a button named for what it removes ("Remove Dana Moreno"), with the `--avatar-close-focus-ring-width` `--avatar-close-focus-ring-color` ring on focus. Its badge is far smaller than `--avatar-close-touch-target-size-minimum`, so extend its hit area to at least that ([patterns 6.16](../patterns/06-accessibility.md)).
- A custom status glyph needs a text equivalent beside it.

## Claude Prompt
Draw a Zebra avatar: a perfect circle `--avatar-container-size-medium` across, filled with a vivid purple swatch (`--avatar-purple-container-background`) and two white uppercase initials (`--avatar-content-foreground`) in medium-weight `--avatar-label-font`, about a third of the diameter tall. A thin light-grey ring (`--avatar-ring-border-color`, `--avatar-ring-border-width-medium`) traces its edge. A small `--avatar-badge-size-medium` green presence dot (`--avatar-available-badge-background`) with a tiny white check sits flush in the bottom-right corner, cut out from the avatar by a white edge (`--avatar-badge-border-color`). An optional grey close badge (`--avatar-close-badge-background`) with a tiny white "x" sits in the top-right corner. Other presence dots are tan with a clock (away), red with a dash (busy), purple with a no-entry sign (do not disturb), indigo with a clock (on shift), and a hollow white circle with a grey outline (offline). Other swatches are magenta, indigo, yellow, coral, teal and burgundy. Photo avatars crop the image into the circle. Sizes run from `--avatar-container-size-xxxsmall` to `--avatar-container-size-xxxlarge`, with every part scaling with the size.
