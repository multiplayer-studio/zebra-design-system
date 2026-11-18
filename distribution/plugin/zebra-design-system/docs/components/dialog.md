# Dialog

> A modal message that interrupts the current task until the user responds or dismisses it. A header carries the message's flavour and title, a body holds the message itself, and an optional footer offers one to three action buttons or two custom slots. Turning showFooter off removes the footer, leaving an informational dialog with nothing to decide.

**Implementations:** `@zebra-design-system/react-baseui` · `@zebra-design-system/web-components` · `@zebra-fed/zeta-web` (`<zeta-dialog>`)

## API

| Prop | Type | Default | Values | Notes |
|---|---|---|---|---|
| `flavour` | enum | `default` | `default` `error` `info` `success` `warning` |  |
| `shape` | enum | `round` | `round` `sharp` |  |
| `showFooter` | boolean | `true` |  |  |

## When and how to use

### Do

- Keep the footer to one clear action when only one response is needed. The Actions preset for one button exists for exactly this case.
- Turn showFooter off only for a message the user reads with nothing to decide. The footer is removed entirely, not replaced with an empty bar.

### Don't

- Don't rely on Flavour to recolour anything beyond the header icon. Every value binds that icon to the same colour token, so the body and the footer's buttons need their own styling if the message calls for it.
- Don't reach for the custom Actions value for a plain one, two or three button footer. The fixed presets already set each button's role and position, the custom slots exist for content that does not fit them.

## Behaviour

- **Motion** — No transition is defined for the dialog's own header, body or footer arrangement across any of its variants.

## Content

| Part | Kind | Guidance |
|---|---|---|
| Header | Dialog Header instance | Fixed to a single Header instance in every variant, holding a leading icon, the title and a close icon. Both the icon and the close icon are always shown, Dialog does not expose either as a property. The leading icon's glyph changes with Flavour, set directly by Dialog rather than through an exposed binding. |
| Body | Any content | Holds whatever content the message needs to show, with no fixed type or structure of its own in this file. |
| Footer | Dialog Footer instance | Fixed to a single Footer instance, hidden entirely when showFooter is off. Every variant uses the same three button layout, a Tertiary action on one side and a Secondary and Primary pair on the other. Which layout shows is fixed by Dialog, not an exposed property. |

## Layout & theming

| Property | Sizing | Guidance |
|---|---|---|
| Width | Hug | Hugs its content rather than holding a fixed width. 506px with the default content, from 12px padding on each side plus the 480px wide header, body and footer. |
| Height | Hug | Hugs the stack of header, body and footer with no gap between them. Shrinks by the footer’s own height, 64px, when showFooter is off. |
| Padding | Fixed | 12px on every side of the dialog itself. The header, body and footer sit flush against each other inside it. |
| Header padding and gap | Fixed | 12px on every side, 8px between the leading icon, title and close icon. |
| Body padding | Fixed | 12px on three sides and 24px at the bottom, wider than the others to keep the footer’s buttons clear of the last line of content. |
| Footer | Fixed width, fixed padding | Holds its own width fixed at 480px rather than hugging, with 12px padding on every side. Its content is pushed to the two opposite ends rather than spaced evenly. |
| Radius | Fixed per Shape | 0 for sharp, 6px for round. Chosen per dialog rather than inherited, and it sets the corner radius of every button in the footer as well. |
| Header icon colour | Fixed | Every Flavour value binds the leading icon to the same foreground/primary token. Flavour changes which glyph shows, never its colour. |

## Accessibility

- The dialog's own header, body and footer carry no keyboard or focus behaviour beyond what the close icon and the footer's buttons already define on their own. Nothing in this file marks how the dialog traps focus or returns it when it closes, so that behaviour needs confirming outside Figma.

---
*Generated from `specs/dialog` — do not edit by hand. Theming: put `mode-dark`, `ext-companion` or `bp-*` classes on any ancestor (Zeta Web uses `data-theme`/`data-brand` attributes instead).*
