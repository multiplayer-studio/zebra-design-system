---
name: Avatar
level: atom
status: stable
composes: [../atoms/icon.md, ../atoms/indicator.md]
tokens:
  avatar-container-radius: '{rounded.radius-full}'
  # size (diameter)
  avatar-container-size-xxxs: '{dimensions.dim-avatar-size-xxxs}'
  avatar-container-size-xxs: '{dimensions.dim-avatar-size-xxs}'
  avatar-container-size-xs: '{dimensions.dim-avatar-size-xs}'
  avatar-container-size-s: '{dimensions.dim-avatar-size-s}'
  avatar-container-size-m: '{dimensions.dim-avatar-size-m}'
  avatar-container-size-l: '{dimensions.dim-avatar-size-l}'
  avatar-container-size-xl: '{dimensions.dim-avatar-size-xl}'
  avatar-container-size-xxl: '{dimensions.dim-avatar-size-xxl}'
  avatar-container-size-xxxl: '{dimensions.dim-avatar-size-xxxl}'
  # proportional parts (fraction of the diameter)
  avatar-label-size: '{dimensions.dim-avatar-initials-scale}'
  avatar-icon-size: '{dimensions.dim-avatar-icon-scale}'
  avatar-ring-border-width: '{dimensions.dim-avatar-ring-scale}'
  avatar-close-badge-border-width: '{dimensions.dim-avatar-badge-border-scale}'
  avatar-close-icon-size: '{dimensions.dim-avatar-close-icon-scale}'
  # colour
  avatar-purple-container-background: '{colors.avatar-purple}'
  avatar-blue-container-background: '{colors.avatar-blue}'
  avatar-green-container-background: '{colors.avatar-green}'
  avatar-yellow-container-background: '{colors.avatar-yellow}'
  avatar-orange-container-background: '{colors.avatar-orange}'
  avatar-pink-container-background: '{colors.avatar-pink}'
  avatar-teal-container-background: '{colors.avatar-teal}'
  # content, ring, close badge
  avatar-content-foreground: '{colors.main-inverse}'
  avatar-label-font-weight: '{font-weight.medium}'
  avatar-ring-border-color: '{colors.border-default}'
  avatar-close-badge-background: '{colors.main-disabled}'
  avatar-close-icon-foreground: '{colors.main-inverse}'
  avatar-close-badge-border-color: '{colors.surface-default}'
---

# Avatar

> An avatar is a visual representation of a user or entity.

## Anatomy
1. Circle — `--avatar-container-radius`, coloured fill, centred content.
2. Content — a photo (cropped to the circle), an [icon](../atoms/icon.md), or uppercase initials.
3. Ring (optional) — border around the circle.
4. Close badge (optional) — top-right circle with a `close` icon that removes the avatar.
5. Status (optional) — bottom-right; usually an [indicator](../atoms/indicator.md) or badge.

The [icon](../atoms/icon.md) (content and close glyph) and the [indicator](../atoms/indicator.md) keep their own styling, with two deliberate context overrides: icon sizes scale with the diameter (`--avatar-icon-size`, `--avatar-close-icon-size`) instead of the icon default size, and icons are drawn light on the coloured fill (`--avatar-content-foreground`, `--avatar-close-icon-foreground`) instead of the icon default colour.

## Variants
**Size** — every part scales from the diameter: initials `--avatar-label-size`, icon `--avatar-icon-size`, ring `--avatar-ring-border-width` of the diameter.
| Size | Diameter |
|---|---|
| xxxs | `--avatar-container-size-xxxs` |
| xxs | `--avatar-container-size-xxs` |
| xs | `--avatar-container-size-xs` |
| s | `--avatar-container-size-s` |
| m (default) | `--avatar-container-size-m` |
| l | `--avatar-container-size-l` |
| xl | `--avatar-container-size-xl` |
| xxl | `--avatar-container-size-xxl` |
| xxxl | `--avatar-container-size-xxxl` |

**Colour** (default purple)
| Token |
|---|
| `--avatar-purple-container-background` (default) |
| `--avatar-blue-container-background` |
| `--avatar-green-container-background` |
| `--avatar-yellow-container-background` |
| `--avatar-orange-container-background` |
| `--avatar-pink-container-background` |
| `--avatar-teal-container-background` |

## States
| State | Visual |
|---|---|
| default | fill = avatar colour, initials/icon `--avatar-content-foreground`, weight `--avatar-label-font-weight` |
| ring | border `--avatar-ring-border-width` of the diameter, `--avatar-ring-border-color` |
| closable | close badge: `--avatar-close-badge-background` circle, icon `--avatar-close-icon-size` of the diameter in `--avatar-close-icon-foreground`, `--avatar-close-badge-border-width`-of-diameter `--avatar-close-badge-border-color` border |

## Spacing & Sizing
- Everything scales from the diameter (default `--avatar-container-size-m`): font `--avatar-label-size`, icon `--avatar-icon-size`, ring `--avatar-ring-border-width`, badge border `--avatar-close-badge-border-width`, close icon `--avatar-close-icon-size`.
- Close badge anchored top-right, status anchored bottom-right, both with a white separating border.

## Properties
| Property | Options | Default |
|---|---|---|
| Size | xxxs, xxs, xs, s, m, l, xl, xxl, xxxl | m |
| Colour | purple, blue, green, yellow, orange, pink, teal | purple |
| Content | photo, icon, initials | initials |
| Ring | on / off | off |
| Close badge | on / off | off |
| Status | none / indicator / badge | none |

## Usage
- Prefer a photo; fall back to 1–2 initials, then a `person` icon.
- Use the recommended avatar colours to distinguish people; don't encode meaning in colour alone.
- Provide alt text on images; closable avatars need an accessible name for the close action.
- Use xxxs (`--avatar-container-size-xxxs`) inside [input chips](../atoms/input-chip.md); groups go in an [avatar rail](../molecules/avatar-rail.md).

## Stitch Prompt
Draw a Zeta avatar: a `--avatar-container-size-m` perfect circle filled deep purple `--avatar-purple-container-background` with two uppercase initials in light `--avatar-content-foreground`, `--avatar-label-font-weight` weight, sized `--avatar-label-size` of the diameter. Photo avatars crop the image into the circle. Optionally add a thin light-grey `--avatar-ring-border-color` ring, a small grey (`--avatar-close-badge-background`) close badge with a white outline at the top-right, or a status dot at the bottom-right. Other fill options are dark blue `--avatar-blue-container-background`, green `--avatar-green-container-background`, mustard `--avatar-yellow-container-background`, orange `--avatar-orange-container-background`, deep pink `--avatar-pink-container-background` and dark teal `--avatar-teal-container-background`. Sizes range from `--avatar-container-size-xxxs` to `--avatar-container-size-xxxl` with all parts scaling proportionally.
