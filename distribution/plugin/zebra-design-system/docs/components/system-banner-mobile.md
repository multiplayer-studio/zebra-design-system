# System Banner (Mobile)

> A full-width message pinned to the top of a mobile screen, carrying a status colour, a title, an optional description and an optional action. Status sets the background, while four toggles decide whether the glyph, the description, the action row and the dismiss control appear. It spans the screen and stays until something clears it, so it suits news a person has to see before carrying on.

**Implementations:** `@zebra-design-system/react-baseui` · `@zebra-design-system/web-components` · `@zebra-design-system/zeta-web` (`<zeta-system-banner>`)

## API

| Prop | Type | Default | Values | Notes |
|---|---|---|---|---|
| `status` | enum | `Default` | `Default` `negative` `warning` `Info` |  |
| `showLeadingIcon` | boolean | `true` |  |  |
| `showDescription` | boolean | `true` |  |  |
| `showActions` | boolean | `true` |  |  |
| `showClose` | boolean | `true` |  |  |
| `actions` | slot | `one Button (small, rounded, outline-contrast, label "Primary")` |  |  |

## When and how to use

### Do

- Match Status to what happened rather than to the colour you want. Using negative for emphasis leaves nothing for a real failure.
- Keep the title to one line and let the description carry the detail. The banner spans the screen, so a long title pushes the message down it.

### Don't

- Don't let the background colour carry the status on its own. Keep the glyph on, and say what has happened in the text as well.
- Don't turn the dismiss off on a banner a person can do nothing about. That leaves a message on screen with no way to clear it.

## States

| State | Trigger | What changes |
|---|---|---|
| Static | — |  |

## Behaviour

- **Motion** — The banner slides in from the top as it opens, pushing the content below it down. Removing it plays the same motion in reverse, pulling the content back up. Both take 400ms, easing out on the way in and in on the way out, with no motion token yet. With reduced motion it fades instead.
- **Reflow** — Width is fixed and height hugs the content, so a longer description makes the banner taller rather than wider. The text wraps inside its own column.
- **Dismissal** — The component offers the control and nothing more. What happens after it is pressed, and whether the banner can return, is the product's decision.

## Content

| Part | Kind | Guidance |
|---|---|---|
| Title | text | The headline. It is not exposed as an input, so it is set on the text itself. |
| Description | text | The supporting line below the title, switched by Show Description. Also set on the text rather than through an input. |
| Action Slot | slot | Takes the controls the message needs. It holds one small outline-contrast Button by default, and the slot accepts more than one. |
| Status Icon | icon, exposed | The leading glyph. It holds Verified on all four Status values, so the glyph is chosen per use rather than following the colour. |
| Dismiss | icon | The close control, switched by Show Close. Default, warning and Info carry it. negative does not, so that banner stays until the condition clears. |
| Status Bar | Figma only | A mock phone status bar above the message, pinned to ios. It is here so the banner previews as a phone screen, and saves drawing one around every example. It is not part of what gets built. |

## Layout & theming

| Property | Sizing | Guidance |
|---|---|---|
| Size | Fixed width, hug height | 412px wide, with the height following the content. The banner spans the screen rather than sitting inside a column. |
| Padding | Fixed | space/sm on all four sides of the message row, with a further space/sm above and below the text column. |
| Gap | Fixed | space/2xs between the glyph, the text column and the dismiss control. space/sm between the text block and the action row. |
| Radius | None | Square on every corner. The banner meets both screen edges, so a radius would leave a gap at the sides. |
| Colour | Theming | The background is feedback/<status>/background/strong, one token per Status. Default resolves to the success token rather than a neutral one. Every variant is locked to the Dark palette mode, whatever mode its container uses. |
| Typography | Fixed | Title is label/large, description is body/small and the action label is label/medium. Title and description sit on foreground/on-strong; the action label takes the outline-contrast Button's foreground/primary. The Dark lock keeps that label white beside them. |
| Status glyph | Fixed | A medium framed Icon at 40×40px including its frame, held to the top of the message row. |
| Dismiss control | Fixed | 40×40px including its frame, sitting inside the message row's 8px padding at the trailing edge. |

## Accessibility

- A banner appears without being asked for, so it has to announce itself. Nothing in the component does that, and the product has to send the message to the screen reader as it opens.
- Status is carried by the background colour and by a glyph that is the same on all four values, so the text has to say what has happened. Someone who cannot separate the colours has only the words.
- The dismiss control is 40 square including its frame. Check it still meets your minimum target size once the surrounding padding is counted.
- Title and description both sit on foreground/on-strong over a strong feedback background. Check the contrast on each Status rather than assuming the pair holds across all four.

---
*Generated from `specs/system-banner-mobile` — do not edit by hand. Theming: put `mode-dark`, `ext-companion` or `bp-*` classes on any ancestor (Zeta Web uses `data-theme`/`data-brand` attributes instead).*
