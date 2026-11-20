# Avatar

> A visual representation of a user or entity, shown as a photo, initials, or icon, with an optional status indicator. Nine sizes step from xxxsmall to xxxlarge with medium as the base, and the badges, ring and glyphs all scale from that step. The status badge carries a distinct glyph per state as well as its colour. Content type isn't an exposed property, swap the nested Avatar Type instance directly to change it. For a notification count on an icon or nav item, use the Notification Indicator component instead, Avatar's own indicator is for presence, not counts.

**Implementations:** `@zebra-design-system/react-baseui` · `@zebra-design-system/web-components` · `@zebra-design-system/zeta-web` (`<zeta-avatar>`)

## API

| Prop | Type | Default | Values | Notes |
|---|---|---|---|---|
| `size` | enum | `xxxsmall` | `xxxsmall` `xxsmall` `xsmall` `small` `medium` `large` `xlarge` `xxlarge` `xxxlarge` |  |
| `showClose` | boolean | `true` |  |  |
| `showStatus` | boolean | `true` |  |  |
| `showRing` | boolean | `true` |  |  |

## When and how to use

### Do

- Match Size to context, dense lists and tables call for the smaller sizes (xxxsmall to small), profile headers and standalone display call for the larger ones (xlarge to xxxlarge).
- Turn off Show Status for generic entities or purely illustrative photos where presence doesn't apply.

### Don't

- Don't use the presence Status badge for unread or notification counts, that's a different purpose, use the Notification Indicator component instead.

## States

| State | Trigger | What changes |
|---|---|---|
| Static | — |  |

## Behaviour

- **Motion** — None modeled in Figma. Avatar is presented as a static graphic, any transition when swapping Size, content, or toggling Show Close, Show Status, or Show Ring lives in code.

## Content

| Part | Kind | Guidance |
|---|---|---|
| Content type | fixed per instance | Initials, photo, or icon. Not an exposed property, swap the nested Avatar Type instance directly to change it. |
| Swatch color | fixed per instance, 7 options | Background color behind initials or an icon (purple, blue, sea, yellow, orange, green, burgundy, using chart/series tokens). Not used behind a photo. Swap the nested Swatch instance directly. |
| Photo | instance swap, 40 named options | Used only when Content type is photo, fills the circle. In Figma swap the nested Photo instance to any of the named photos in _Avatar Photos. In code any image can be passed as an image property. |
| Status | exposed nested instance, 8 states | Holds one of eight states from the _Status Indicator component, each drawn with its own glyph from the Assets library. The instance is exposed, so the state is set from Avatar's own properties panel without detaching. Only rendered while Show Status is true. |
| Custom Icon | instance swap, any component | The glyph used while Status is Icon. Any component can be swapped in and the suggested list holds only the Star set, so nothing constrains it to a presence-shaped mark. |

## Layout & theming

| Property | Sizing | Guidance |
|---|---|---|
| Size | Fixed per Size, medium is the base | Nine fixed squares stepping 24, 32, 36, 40, 48, 64, 80, 120 and 200px, with medium at 48px as the base. Medium is the only step bound to a token (control/lg), every other step is an authored value. Not resizable independently of the Size property. |
| Badge size | Scales with Size, medium is the base | The Status and Close badges are 16px at medium, exactly one third of the avatar, and step 8, 10, 12, 12, 16, 18, 24, 36 and 56px across the ladder. Above medium they grow more slowly than the avatar, so a large avatar is never dominated by its badge. |
| Badge glyph | Scales with the badge | The status glyph holds a constant share of its badge at every size, 0.42 of the badge width, so it stays proportional from 24px through 200px. The close glyph is drawn at a fixed 5px at every size, so its share of the badge falls from two thirds at xxxsmall to under a tenth at xxxlarge. |
| Ring weight | Scales per Size tier, medium is the base | 2px (stroke/thick) at medium and every step below it, 4px (stroke/heavy) at large and xlarge, then 6px and 8px at xxlarge and xxxlarge. The two heaviest weights are authored values rather than tokens. |
| Close and Status position | Fixed | Pinned flush to the top-right and bottom-right corners, inset by exactly the badge's own width so both sit inside the avatar's bounds at every size. They scale in position as the avatar resizes and do not move independently. |
| Color | Theming | Ring uses border/default. Each status draws its circle from a chart token, chart/positive for Available, chart/negative for Busy and chart/series steps for the rest, with the glyph on foreground/inverse. Offline inverts that pair, a foreground/inverse circle carrying a foreground/secondary glyph. Swatch colours use chart/series. All resolve separately for light and dark mode. |

## Accessibility

- Purely visual, an avatar image or initials alone don't convey a name, pair it with visible text or provide an accessible name in code
- Each presence state now carries its own glyph as well as its colour, so the badge no longer depends on colour alone. Still give it a text equivalent, because at the smallest sizes the glyph is only a few pixels across
- The Close badge implies a dismiss action, give it an accessible name in code like "Remove [name]", Figma has no interactive state for it
- The close glyph is drawn at a fixed size whatever the avatar, so on the largest avatars it sits very small inside its badge. Check it still reads as a target

---
*Generated from `specs/avatar` — do not edit by hand. Theming: put `mode-dark`, `ext-companion` or `bp-*` classes on any ancestor (Zeta Web uses `data-theme`/`data-brand` attributes instead).*
