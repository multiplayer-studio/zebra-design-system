# System Banner (Desktop)

> A full-width message pinned to the top of a desktop view, carrying a status colour, a title, an optional description and an optional action. Status sets the background and the glyph together, while Content Type decides whether the message runs to one line or two. It spans the view and stays until something clears it, so it suits news a person has to see before carrying on.

**Implementations:** `@zebra-design-system/react-baseui` · `@zebra-design-system/web-components` · `@zebra-fed/zeta-web` (`<zeta-system-banner>`)

## API

| Prop | Type | Default | Values | Notes |
|---|---|---|---|---|
| `status` | enum | `Default` | `Default` `negative` `warning` `Info` |  |
| `contentType` | enum | `single line` | `single line` `multiline` |  |
| `title` | string | `Banner Title` |  |  |
| `showLeadingIcon` | boolean | `true` |  |  |
| `showActions` | boolean | `true` |  |  |
| `showClose` | boolean | `true` |  |  |
| `actions` | slot | `one Button (small, rounded, outline-contrast, label "Primary")` |  |  |

## When and how to use

### Do

- Match Status to what happened rather than to the colour you want. Using negative for emphasis leaves nothing for a real failure.
- Use single line when the title says everything. multiline earns its height only when the reason needs spelling out.

### Don't

- Don't let the background colour carry the status on its own. Keep the glyph on, and say what has happened in the text as well.
- Don't turn the dismiss off on a banner a person can do nothing about. That leaves a message on screen with no way to clear it.

## States

| State | Trigger | What changes |
|---|---|---|
| Static | — |  |

## Behaviour

- **Motion** — The banner slides in from the top as it opens, pushing the content below it down. Removing it plays the same motion in reverse, pulling the content back up. Both take 400ms, easing out on the way in and in on the way out, with no motion token yet. With reduced motion it fades instead.
- **Reflow** — Width is fixed and height follows the content. single line holds one row, multiline grows with the description, and the text wraps inside its own column.
- **Dismissal** — The component offers the control and nothing more. What happens after it is pressed, and whether the banner can return, is the product's decision.

## Content

| Part | Kind | Guidance |
|---|---|---|
| Title | text, exposed | The headline, set through the Title input rather than on the text itself. |
| Description | text | The supporting line, present only on multiline. It is not exposed as an input, so it is set on the text. |
| Action Slot | slot | Takes the controls the message needs. It holds one small outline-contrast Button by default, and the slot accepts more than one. |
| Status Icon | icon, parent-owned | The leading glyph, following Status: Check Circle, Error, Warning and Info. It is not a consumer choice. |
| Dismiss | Icon Button | The close control, switched by Show Close. Default, warning and Info carry it. negative does not, so that banner stays until the condition clears. |
| Action Button | nested instance | One small rounded outline-contrast Button. The flavour is the banner's call, so changing it per message breaks the pairing with the background. |

## Layout & theming

| Property | Sizing | Guidance |
|---|---|---|
| Size | Fixed width, hug height | 983px wide. 68px tall on single line and 142px on multiline, with the height following the description. |
| Padding | Fixed | 16px on all four sides of the message row, with a further space/2xs above and below the text on multiline. |
| Gap | Fixed | 8px between the glyph, the content and the dismiss control. space/lg inside the content between the text and the action row. |
| Radius | None | Square on every corner. The banner spans the full width of the view, so a radius would leave a gap at the sides. |
| Colour | Theming | The background is feedback/<status>/background/strong, one token per Status. Default resolves to the success token rather than a neutral one. Every variant is locked to the Dark palette mode, whatever mode its container uses. |
| Typography | Fixed | Title is label/medium, description is body/small and the action label is label/medium. Title and description sit on foreground/on-strong; the action label takes the outline-contrast Button's foreground/primary. The Dark lock keeps that label white beside them. |
| Status glyph | Fixed | A medium unframed Icon inside a 36×36px container, held to the top of the message row. |
| Dismiss control | Fixed | A 36×36px Icon Button with space/2xs around a 20px glyph, at the trailing edge of the row. |

## Accessibility

- A banner appears without being asked for, so it has to announce itself. Nothing in the component does that, and the product has to send the message to the screen reader as it opens.
- The glyph follows Status here, so colour is not the only carrier. The text should still name what has happened, because the glyph alone is a small difference at this size.
- The dismiss control is a 36 square Icon Button. Check it still meets your minimum target size, and that it is reachable by keyboard in the same order it appears.
- Title and description both sit on foreground/on-strong over a strong feedback background. Check the contrast on each Status rather than assuming the pair holds across all four.

---
*Generated from `specs/system-banner-desktop` — do not edit by hand. Theming: put `mode-dark`, `ext-companion` or `bp-*` classes on any ancestor (Zeta Web uses `data-theme`/`data-brand` attributes instead).*
