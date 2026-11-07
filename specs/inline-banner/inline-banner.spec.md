# Inline Banner

A status message placed inside the content it is about: a form, a card, a panel. It sits in the flow at its container's width. Status sets the colour and glyph; Appearance sets how loud it is. Solid interrupts, for the one message on a view that must be seen now. Subtle informs, for context and guidance, and several can share a page.

Source: [Figma page](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=8051-4995) · set `8053:85` · extracted 2026-11-06 · 20 variants

## API

| Prop | Type | Values | Default | Controls |
|---|---|---|---|---|
| `status` | enum | negative, warning, neutral, info, positive | info | root fill and stroke, glyph, glyph colour |
| `appearance` | enum | subtle, solid | subtle | root fill and stroke, text colour, glyph colour, action flavour, controls' palette mode |
| `shape` | enum | rounded, sharp | rounded | root radius, action and dismiss shape |
| `title` | string | — | "Inline banner title" | title |
| `description` | string | — | "Supporting line: why, and what to do next." | description |
| `showDescription` | boolean | — | true | description |
| `showIcon` | boolean | — | true | icon container |
| `showActions` | boolean | — | true | actions |
| `showClose` | boolean | — | false | dismiss |
| `actions` | slot | Buttons | one small Button (sample) | actions |

Intent, verbatim:

- **status** — info: "News that helps the reader, with nothing at stake." · neutral: "General guidance or a tip, with no status attached." · positive: "Something finished as intended. Confirm it, then let it go." · warning: "A problem the person can still act on, or a limit on what they can do now." · negative: "A failure that needs attention. Announced immediately."
- **appearance** — subtle: "Tinted surface, status border, status glyph. Informs without interrupting; several can share a page." · solid: "Strong status fill, always-white text. Interrupts: one per view, for what must be seen now."
- **shape** — rounded: "radius/sm corners. The actions and the dismiss take the same shape." · sharp: "radius/none corners, for edge-to-edge containers. The actions and the dismiss follow."
- **title** — "The headline: what happened."
- **description** — "Why, and what to do next. Shown by Show Description."
- **showDescription** — true: "Shows the supporting line when one is set." · false: "Title only, for messages that need no reason."
- **showIcon** — true: "Keeps the status glyph so the banner survives greyscale." · false: "Drops the glyph. The text must then name the status."
- **showActions** — true: "Shows the action slot when it holds actions." · false: "No actions, for a message that only informs."
- **showClose** — false: "No dismiss. The banner stays while its condition holds." · true: "Adds the dismiss. Pressing it reports the dismissal; the product removes the banner."

Values anywhere in this document are token names. The only literals are inside verbatim metadata quotes and inside issues.

## Internal variations & content inputs

None swap-only. The action slot's Button is sample content: the input is the actions themselves (normally one small Button).

## Anatomy

- **root** — vertical wrapper, one child, clips. Fill: subtle `feedback/<feedback>/background/subtle`, solid `feedback/<feedback>/background/strong`. Stroke `stroke/thin`, inside: subtle `border/<status>` (`border/default` on neutral), solid the fill token. Radius: rounded `radius/sm`, sharp `radius/none`. Fixed preview width in Figma; fills its container in code. Hug height.
- **container** — horizontal, gap `space/sm`, padding `space/md` block / `space/lg` inline, start-aligned, fill × hug.
- **1. Status glyph** (icon container) — "Leading icon centred on the title's first line. Status colour on subtle, foreground/on-strong on solid." Hug width, height `label/large/line height`, centred. Visible when `showIcon`. Holds Icon (medium, unframed), rounded family. Glyphs: neutral `lightbulb`, info `info`, positive `check-circle`, warning `warning`, negative `error`. The glyph takes `currentColor`: subtle `feedback/<feedback>/foreground`, solid `foreground/on-strong`.
- **2. Content** — "Title and optional description. Takes the width the glyph and the dismiss leave." Horizontal, wraps, gap `space/lg`, cross gap `space/sm`, centred, fill × hug.
  - **text** — vertical, gap `space/2xs`, fill × hug. Keeps a minimum width (measured 256, no token) so the actions wrap beneath it in narrow containers.
  - **title** — `label/large`; subtle `foreground/primary`, solid `foreground/on-strong`.
  - **description** — `body/small`, wraps, fills; subtle `foreground/primary`, solid `foreground/on-strong`. Visible when `showDescription`.
- **3. Action slot** — "Beside the text when there is room, beneath it when the container is narrow." Horizontal, gap `space/sm`, centred, hug. Visible when `showActions`. On solid it pins palette=Dark (Figma-only).
- **4. Dismiss** — "Optional close control at the trailing edge, on every status." Icon Button, small, subtle, glyph `close`, shape follows `shape`. Visible when `showClose`. On solid it pins palette=Dark.

`<feedback>` maps status to the token group: info→info, neutral→neutral, positive→success, warning→warning, negative→error.

## Variants

| status | appearance | root fill | root stroke | glyph | text | action flavour | controls palette |
|---|---|---|---|---|---|---|---|
| info | subtle | feedback/info/background/subtle | border/info | info | foreground/primary | outline-subtle | inherit |
| info | solid | feedback/info/background/strong | feedback/info/background/strong | info | foreground/on-strong | outline-contrast | Dark |
| neutral | subtle | feedback/neutral/background/subtle | border/default | lightbulb | foreground/primary | outline-subtle | inherit |
| neutral | solid | feedback/neutral/background/strong | feedback/neutral/background/strong | lightbulb | foreground/on-strong | outline-contrast | Dark |
| positive | subtle | feedback/success/background/subtle | border/success | check-circle | foreground/primary | outline-subtle | inherit |
| positive | solid | feedback/success/background/strong | feedback/success/background/strong | check-circle | foreground/on-strong | outline-contrast | Dark |
| warning | subtle | feedback/warning/background/subtle | border/warning | warning | foreground/primary | outline-subtle | inherit |
| warning | solid | feedback/warning/background/strong | feedback/warning/background/strong | warning | foreground/on-strong | outline-contrast | Dark |
| negative | subtle | feedback/error/background/subtle | border/error | error | foreground/primary | outline-subtle | inherit |
| negative | solid | feedback/error/background/strong | feedback/error/background/strong | error | foreground/on-strong | outline-contrast | Dark |

| shape | root radius | actions | dismiss |
|---|---|---|---|
| rounded | radius/sm | rounded | rounded |
| sharp | radius/none | sharp | sharp |

## Subcomponents

None on the page. Dependencies, all local to the library: Icon (`2046:15010`), Button (`2060:15072`, small), Icon Button (`2338:1763`, small, subtle).

## Tokens & theming

- **Colour** — `feedback/{info,neutral,success,warning,error}/background/{subtle,strong}`, `border/{info,default,success,warning,error}`, `feedback/neutral/foreground`, `foreground/primary`, `foreground/on-strong`. Glyph colours: `feedback/{info,neutral,success,warning,error}/foreground` on subtle, `foreground/on-strong` on solid.
- **Dimension** — `space/2xs`, `space/sm`, `space/md`, `space/lg`, `radius/sm`, `radius/none`, `stroke/thin`, `label/large/line height`.
- **Typography** — `label/large`, `body/small`.
- **Theme axes** (tokens/manifest.json) — palette: Light (default), Dark, AAA Light, AAA Dark. The banner follows the page mode; on solid the controls pin Dark. size and typography: Desktop (default), Mobile, Tablet, Desktop Compact.

All names resolve in `tokens/`.

## States, behavior & motion

- **Static** — "No interaction states of its own. Hover, focus and pressed live on the action Button and the dismiss Icon Button."
- **Motion** — "None. It appears and disappears with the content it sits in. There is no motion token; add one before animating it."
- **Reflow** — "Fills its container's width; height follows the content. The text keeps a minimum width, and the actions wrap beneath it when the container is narrower. That minimum has no size token yet. See the narrow sample under Anatomy."
- **Dismissal** — "The component offers the control and reports the dismissal. Removing the banner, and whether it comes back, is the product's decision."

## Content & slots

- **Title** (text, exposed) — "The headline, set through the Title input."
- **Description** (text, exposed) — "The supporting line, set through the Description input and shown by Show Description."
- **Action Slot** (slot) — "Holds the controls the message needs, normally one small Button: outline-subtle on subtle, outline-contrast on solid. The banner passes its Shape to them."
- **Status Icon** (icon, parent-owned) — "Follows Status: Lightbulb, Info, Check Circle, Warning, Error. A product can override the glyph."
- **Dismiss** (Icon Button) — "A small subtle Icon Button, switched by Show Close. Available on every status."
- **Action Button** (nested instance) — "Sample content for the slot, not part of the API. On solid it sits in palette Dark so it draws white. That is Figma-only: code gives the controls a dark-mode scope."

## Usage

**Do**
- Use solid for the one message on a view that blocks or changes what the person can do. Make everything else subtle.
- Place it next to what it is about: above the form, inside the card, at the top of the panel.

**Don't**
- Don't stack several solid banners. They compete, and the page reads as an alarm.
- Don't use it for page-wide or system news. That is System Banner, pinned to the top of the view.

## Accessibility

- Announced politely; negative is announced immediately.
- Keep the glyph on, or name the status in the text, so colour is never the only signal.
- The action and the dismiss carry their own focus states.
- Known gap: foreground/on-strong falls below 4.5:1 on solid neutral (both modes) and solid warning (dark mode).

## Layout & theming intents

| Property | Type | Description |
|---|---|---|
| Size | Fill width, hug height | Spans its container. The 640 width in Figma is a preview only. |
| Padding | Fixed | space/md block, space/lg inline. |
| Gap | Fixed | space/sm between glyph, content and dismiss. space/lg between text and actions, space/sm when they wrap. space/2xs between title and description. |
| Radius | Shape | radius/sm on rounded, radius/none on sharp. Border stroke/thin on both appearances. |
| Colour | Theming | Subtle: feedback/<status>/background/subtle fill, border/<status> border (border/default on neutral), feedback/<status>/foreground glyph, foreground/primary text. Solid: feedback/<status>/background/strong fill and border, foreground/on-strong text and glyph. positive maps to success, negative to error. |
| Typography | Fixed | Title label/large, description body/small. |
| Status glyph | Fixed | A medium Icon centred in a box as tall as label/large's line height. |
| Dismiss control | Fixed | A small subtle Icon Button at the trailing edge. |

## Visual reference

[Component set](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=8053-85) · [default](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=8053-157) · [solid](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=8054-899) · [sharp](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=8054-888) · [narrow sample](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=8055-294) · [metadata](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=8055-154). Every variant's link is in the JSON.

## Issues

**Warn**
- foreground/on-strong on solid neutral (both modes) and solid warning (dark) falls below 4.5:1, per the metadata.
- The text's minimum width before the actions wrap is a raw 256 (16rem in code) with no size token.

**Note**
- Status options are in creation order; the metadata lists them info, neutral, positive, warning, negative.
- On solid, the controls pin palette=Dark: Figma-only.
- root is a single-child wrapper; code can fold it.
- Motion and interaction states are intentionally absent.
