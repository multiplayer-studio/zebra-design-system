# Screen Header Bar

> The bar at the top of a screen, carrying a back affordance, the screen's title and one action. It holds a single slot on the right, so it suits a screen with exactly one primary action rather than a toolbar of several. Use Top App Bar when the screen needs more than one action or a different leading control.

**Implementations:** `@zebra-design-system/react-baseui` · `@zebra-design-system/web-components` · `@zebra-fed/zeta-web` (`<zeta-screen-header-bar>`)

## API

| Prop | Type | Default | Values | Notes |
|---|---|---|---|---|
| `title` | string | `Add Subscribers` |  |  |
| `showLeadingIcon` | boolean | `true` |  |  |
| `rounded` | enum | `true` | `true` `false` | Since the Oct 7, 2026 file change it also sets the leading Icon Button's shape; the metadata still says slot-button only (see issues). |
| `actionSlot` | slot | `one primary Button (Size=medium, Shape per rounded, label "Button")` |  |  |

## When and how to use

### Do

- Use it as the top bar of a pushed screen, with the back chevron on and a single action on the right.
- Match Rounded to the buttons used elsewhere on the screen. It exists to keep the action button consistent, not to shape the bar.

### Don't

- Don't put more than one control in the Action Slot. It will hug them, but the bar was drawn around a single action.
- Don't assume the bar stretches to the screen. It ships at a fixed width, so it has to be set to fill wherever it is placed.

## States

| State | Trigger | What changes |
|---|---|---|
| Static | — | The set declares no hover, focus, pressed or disabled axis. The two variants render identically apart from the corners of the action button. |
| Leading icon | Show Leading Icon toggled off | The back affordance is removed and the heading absorbs the 28px it occupied. Nothing else moves, because the bar's width is fixed. |

## Behaviour

- **Motion** — Figma stores no timing and no transition is authored. Nothing in the set changes over time.
- **Navigation** — The leading chevron is a locked Icon instance with no state of its own. What it does on activation, and whether it is reachable at all, belongs to the implementation.
- **Reach of Rounded** — Rounded is a variant on this set rather than a property passed down, so it restyles the shipped action button and nothing else. Slot content put there later will not follow it.

## Content

| Part | Kind | Guidance |
|---|---|---|
| Title | text property | Plain text set per instance, defaulting to Add Subscribers. The heading wrapper is built with a gap for a second line, but no subtitle property exists to fill it. |
| Action Slot | slot, one Button as shipped | Holds the trailing action and hugs whatever is placed in it. It ships a Button at Size=medium and Flavour=primary. Nothing limits it to one control, so a crowded slot is possible and is the thing to watch. |
| Leading icon | fixed nested Icon, toggled by Show Leading Icon | An Icon at Size=medium swapped to Chevron Left. Only its visibility is surfaced, so the glyph cannot be changed from an instance without detaching. |

## Layout & theming

| Property | Sizing | Guidance |
|---|---|---|
| Size | Fixed width, hug height | 474 wide and 56 tall in both variants. The width is fixed rather than filling, so a placed instance will not stretch to its container on its own. |
| Padding and gap | Fixed | space/sm top and bottom, space/lg left and right, with a space/sm gap between the icon, the heading and the slot. |
| Alignment | Fixed | Horizontal auto-layout, items centred on the cross axis and packed from the start. The heading fills, which pushes the slot hard right. |
| Radius | None | Zero on both variants with no token bound. The Rounded axis does not touch it. |
| Fill | Theming | interactive/ghost/background/default, an interactive token on a static container. No border and no shadow. |
| Title | Theming | title/large, in foreground/primary. This style resolves to a remote library rather than a local one. |
| Leading icon | Fixed | Icon at Size=medium, 20 square. Hiding it returns 28px to the heading, the icon plus one gap. |

## Accessibility

- The leading chevron is a locked icon with no label and no state. It needs an accessible name and a keyboard path, neither of which is modelled here.
- No focus state exists anywhere in the set, so focus order and a visible focus ring both have to come from code.
- The title uses title/large. It names the screen, so it should map to a real heading in the markup rather than being styled text.
- The bar's fill is interactive/ghost/background/default, an interactive token on a static container. Check it against the screen behind it and against the action button sitting on it.
- Turning the leading icon off removes the only back affordance. On a pushed screen something else then has to provide one.

---
*Generated from `specs/screen-header-bar` — do not edit by hand. Theming: put `mode-dark`, `ext-companion` or `bp-*` classes on any ancestor (Zeta Web uses `data-theme`/`data-brand` attributes instead).*
