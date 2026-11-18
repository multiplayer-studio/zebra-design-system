# Navigation Item

> A single destination inside a Navigation Bar, shown as an icon above a label with an optional badge. It is the content the bar's slots are built around, and the bar sets nothing on it, so every property here is yours to set per instance. Selection is expressed with Active, and exactly one item in a bar should carry it.

**Implementations:** `@zebra-design-system/react-baseui` · `@zebra-design-system/web-components` · `@zebra-fed/zeta-web` (`<zeta-grid-menu-item>`)

## API

| Prop | Type | Default | Values | Notes |
|---|---|---|---|---|
| `active` | enum | `false` | `false` `true` |  |
| `disabled` | enum | `false` | `false` `true` |  |
| `label` | string | `Label` |  |  |
| `showBadge` | boolean | `false` |  |  |

## When and how to use

### Do

- Set exactly one item in a bar to Active. Selection is the item's job, and the bar does nothing to manage it.
- Swap the icon on every item. It ships holding a Star placeholder, which says nothing about where the destination goes.

### Don't

- Don't use Show Badge to show a count. It is pinned to the small size, which is a dot with no readable number in it.
- Don't give items long labels. Each one hugs its own text, so a single long name makes that destination wider than everything beside it.

## States

| State | Trigger | What changes |
|---|---|---|
| default | Resting |  |
| active | Active set to true |  |
| disabled | Disabled set to true |  |
| badge shown | Show Badge set to true |  |
| hover and pressed | Not modelled |  |

## Behaviour

- **Motion** — Figma stores no timing and no transition is modelled. Moving between states is a colour change only, with no movement, scale or elevation.
- **Badge** — The badge sits outside the layout flow, so showing or hiding it never reflows the item or the bar around it.
- **Reflow** — The item re-hugs its label whenever the text changes, which shifts every item beside it in the bar.

## Content

| Part | Kind | Guidance |
|---|---|---|
| Label | text property | The destination's name. There is no truncation and no wrapping, the item simply grows. |
| Icon | exposed nested Icon instance | Navigation Item pins Icon to Size=medium with Framed off and leaves the instance exposed, so the glyph can be swapped per instance while the sizing stays consistent. See the Icon Metadata frame. It arrives holding Star, a placeholder rather than a real destination glyph. |
| Badge | exposed nested Notification Indicator, toggled by Show Badge | Navigation Item exposes only its visibility and pins it to Size=small, the dot with no number, where the Notification Indicator's own default is large. The instance stays exposed, so its Value and Size remain reachable. At this size the dot signals that something is there, not how much. |

## Layout & theming

| Property | Sizing | Guidance |
|---|---|---|
| Width | Hug | Hugs the label, so an item is as wide as its text plus 16px (space/lg) of padding each side. Items in a row are not equal width unless their labels are. |
| Height | Fixed | 72px at every variant. This is what sets the Navigation Bar's height, because the bar hugs its content. |
| Padding | Fixed | 8px (space/sm) top and bottom, 16px (space/lg) left and right. |
| Gap | Fixed | 8px (space/sm) between the icon box and the label. |
| Icon | Fixed | A 20px Icon at Size=medium with Framed off, sitting in a 20px box that does not clip its content. |
| Badge | Absolute | An 8px Notification Indicator at Size=small, placed at 16,-4 against the 20px icon box so it overhangs the top-right corner. It is outside the layout flow. |
| Label type | Fixed | Body/body small (14/20), IBM Plex Sans Regular. |
| Colour | Theming | foreground/primary at rest, interactive/subtle/foreground/default when Active, interactive/subtle/foreground/disabled when Disabled. Icon and label take the same token in every state, and the item has no fill of its own. |

## Accessibility

- Selection is carried by colour alone. There is no underline, background or indicator bar, so the active destination has to be conveyed in code as well.
- The icon repeats the label rather than adding to it, so the label has to stand on its own.
- Disabled is visual only, and nothing on the item explains why a destination is unavailable.
- The badge is a dot with no number at the size this component pins, so whatever it signals needs a text equivalent.
- Icon and label move together between states, so they stay consistent with each other. Check interactive/subtle/foreground/disabled against the surface the bar sits on.

---
*Generated from `specs/navigation-item` — do not edit by hand. Theming: put `mode-dark`, `ext-companion` or `bp-*` classes on any ancestor (Zeta Web uses `data-theme`/`data-brand` attributes instead).*
