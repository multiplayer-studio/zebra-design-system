# Snackbar

> A brief message about something the app just did, carrying at most one action. Variant chooses between a contextual pill, where Flavour sets the tint, the leading glyph and the controls together, and a plain standard bar with a filled action button. Reach for it where the message is worth noticing and not worth interrupting for, and for Dialog where the person has to answer before carrying on.

**Implementations:** `@zebra-design-system/react-baseui` · `@zebra-design-system/web-components` · `@zebra-fed/zeta-web` (`<zeta-snackbar>`)

## API

| Prop | Type | Default | Values | Notes |
|---|---|---|---|---|
| `message` | string | `Message` |  |  |
| `variant` | enum | `contextual` | `contextual` `standard` |  |
| `status` | enum | `info` | `info` `positive` `warning` `negative` `deletion` `view` `action` `default` | Figma's default variant is info; the metadata marks default as the default. standard exists only with Status=default. |
| `shape` | enum | `rounded` | `rounded` `sharp` |  |
| `showIcon` | boolean | `false` |  |  |
| `showAction` | boolean | `true` |  |  |
| `showClose` | boolean | `true` |  |  |

## When and how to use

### Do

- Pick the flavour for what happened rather than for the colour. Each one brings its own glyph and its own controls, so the choice settles the whole bar.
- Keep the message to one short line. The bar holds a fixed width and does not wrap, so anything longer runs past the edge.

### Don't

- Don't turn the close off on a bar with no action and no timer. That leaves a person with a message and no way to clear it.
- Don't reach for deletion just to get an error tint. It promises an Undo, and offering one the product cannot honour is worse than a plain error.

## States

| State | Trigger | What changes |
|---|---|---|
| Static | — |  |
| Flavour | The Flavour value |  |
| Variant | The Variant value |  |
| Entering | Opened |  |
| Leaving | Closed by its close, its action or its timer |  |

## Behaviour

- **Motion** — It slides in from below over 300ms, fading in as it rises, and leaves by sliding up and fading out over 200ms, so neither direction runs past 0.3s. It stays on screen until the exit has finished, and a bar opened again while it is leaving returns fully visible. With reduced motion it only fades, over 150ms, without moving.
- **Layering (z-axis)** — It floats in the browser's top layer rather than in the page's stacking order, so no z-index anywhere on the page can sit above it, modals and overlays included. It neither takes focus nor blocks the page beneath it. Two bars open at once occupy the same spot; there is no queue yet.
- **Width** — Each variant holds a fixed width and the message sits on a single line without wrapping. Message length is therefore a constraint on what gets written rather than something the bar absorbs.
- **Flavour presets** — Each flavour arrives with its glyph, its tint and its control set already decided. Changing flavour changes all three at once, so one picked for its colour brings controls along with it.

## Content

| Part | Kind | Guidance |
|---|---|---|
| Message | text property | Consumer owned, set through Message. It is the only text the component takes in. |
| Leading icon | contextual, per Flavour | Chosen by Flavour rather than passed in. info takes Info, positive Check Circle, warning Warning, error Error, deletion Delete and view Open In New Window. |
| Leading icon | standard, via Show Icon | An icon slot that opens when Show Icon is on. This is the one place a consumer picks the glyph, and it exists because standard has no Flavour to pick one for it. |
| Leading icon | action and default | No glyph at all. Both sit on the inverse surface, where the message and its control carry the whole bar. |
| Controls | Action and Close, per Flavour | Drawn by the bar rather than taken in. The action label is fixed per flavour, Undo on deletion, View on view and Action elsewhere, and is not exposed as an input. |

## Layout & theming

| Property | Sizing | Guidance |
|---|---|---|
| Size | Fixed width, hug height | 48 tall throughout. Each variant carries its own fixed width, running from 190 to 323 depending on the flavour and its controls, rather than growing with the message. |
| Position | Fixed to the viewport | Centred horizontally, space/xl above the bottom edge of the viewport, and never wider than the viewport less space/lg on each side. It does not move with the page as it scrolls. |
| Padding and gap | Fixed | space/xs top and bottom, space/lg on the leading edge and space/sm on the trailing one, with space/sm between the content and the controls. The action flavour tightens the trailing edge to space/xs and opens the gap to space/lg so a bordered control sits closer to the end. |
| Content | Fill | The leading icon and the message sit space/md apart, and the content block fills whatever width the controls leave it. |
| Radius | Per Variant and Shape | contextual is radius/pill when rounded and standard is radius/md, so the two read differently at the same setting. Both drop to radius/none when sharp, and the close and the action follow. |
| Fill | Per Flavour | info, positive, warning and error take feedback/info, success, warning and error at background/subtle. deletion shares the error tint and view takes feedback/neutral/background/subtle. action and default sit on surface/inverse, which is what moves the message to foreground/inverse. |
| Controls | Fixed | Close is a 36 square holding a 20 glyph. The action is 36 tall where it is plain text and 40 tall where it carries a border or a fill, the bordered one at 2px on foreground/inverse and the filled one at radius/sm on interactive/inverse/background/default. |
| Elevation | Theming | Two drop shadows on every variant. They are what lift the bar off whatever it is floating over, since it has no border to separate it. |

## Accessibility

- A snackbar appears without being asked for, so it has to announce itself. Nothing in the component does that, and the structure around it has to.
- Flavour is carried by a tint and a glyph. The tints are subtle by design, so the glyph and the words are what separate info from error for anyone who cannot rely on colour.
- The message does not wrap. A line longer than the bar runs past its edge rather than reflowing, so the content has to be written to the space rather than the space found for the content.
- view carries no close. Where the bar does not dismiss itself, its action is the only way out and it has to be reachable by keyboard.
- The close is a 36 square around a 20 glyph and it is a real target rather than decoration. It needs a name, because the glyph carries no text.
- Two drop shadows lift the bar off whatever it covers. Check it does not settle over something a person still needs to read or reach.
- Its movement respects reduced motion: with that preference set it fades in and out without sliding.

---
*Generated from `specs/snackbar` — do not edit by hand. Theming: put `mode-dark`, `ext-companion` or `bp-*` classes on any ancestor (Zeta Web uses `data-theme`/`data-brand` attributes instead).*
