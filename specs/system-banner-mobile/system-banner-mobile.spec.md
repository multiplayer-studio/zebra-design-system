# System Banner (Mobile)

A full-width message pinned to the top of a mobile screen, carrying a status colour, a title, an optional description and an optional action. Status sets the background, while four toggles decide whether the glyph, the description, the action row and the dismiss control appear. It spans the screen and stays until something clears it, so it suits news a person has to see before carrying on.

Source: [Zebra Design System › System Banner](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5255-2146) (set `5350:6261`, 4 variants) · extracted 2026-10-29

> **Values are token names.** The values live in [tokens/](../../tokens/). The only literals are measurements (suffixed Px) and the untokenised values called out in Issues.

> **Locked to Dark.** The banner root pins `palette=Dark`, and every element inside it inherits that: the status glyph, title, description, dismiss control and anything in the action slot. The container's mode is ignored. In code, scope the root to dark so every descendant resolves dark tokens.

> **One shape, from the container.** Every banner takes its shape, rounded or sharp, from the container it sits in, and every element inside it uses that same shape: the action Buttons, the dismiss and anything in the action slot. The banner itself stays square in both.

Sibling on the same page: [System Banner (Desktop)](../system-banner-desktop/system-banner-desktop.spec.md).

## API

| Prop | Type | Values | Default | Controls |
|---|---|---|---|---|
| `status` | enum | Default, negative, warning, Info | `Default` | root.fill, dismiss (removed on negative) |
| `showLeadingIcon` | boolean | true, false | `true` | statusIcon |
| `showDescription` | boolean | true, false | `true` | description |
| `showActions` | boolean | true, false | `true` | actions |
| `showClose` | boolean | true, false | `true` | dismiss |
| `actions` | slot | Button; more than one | one Button (small, rounded, outline-contrast, label "Primary") | actions |

### Per-value intent (verbatim)

**status**
- **Default** — The success colour, despite the name. Use it on completion, not as a neutral default.
- **negative** — A failure that needs attention. It carries no dismiss, so it stays until the problem clears.
- **warning** — A problem the person can still act on. Use it ahead of failure, or negative loses its force.
- **Info** — Neutral news with nothing at stake. Use it where nothing is required of the reader.

**showLeadingIcon**
- **true** — Keeps the status glyph. Use it so the banner survives greyscale and colour blindness.
- **false** — Drops the glyph. Colour alone then carries the status, which the text has to repeat.

**showDescription**
- **true** — Keeps the supporting line. Use it when the title alone cannot carry the message.
- **false** — Title only. Use it for a short message, or the banner grows taller than the news deserves.

**showActions**
- **true** — Keeps the action slot. Use it when there is something to do, not merely to acknowledge.
- **false** — Removes the action row. Use it for a message that only informs, so nothing invites a tap.

**showClose**
- **true** — Lets the person dismiss the banner. Use it where the message stops mattering once read.
- **false** — Keeps the banner until the condition clears. Use it where the message must not be lost.

## Internal variations & content inputs

- **statusIcon** varies by swapping Icon (Name swap): any glyph in packages/icons (default `verified`). The leading glyph. It holds Verified on all four Status values, so the glyph is chosen per use rather than following the colour.
- **title** is a content input. Not a Figma property; set on the text.
- **description** is a content input. Not a Figma property; set on the text.

## Anatomy

- **root** (container) 
  mode: `palette=Dark, locked on every variant`; layout: {direction: vertical, gap: space/none}; fill: `feedback/<status>/background/strong`
- **statusBar** (instance) — A mock phone status bar above the message, pinned to ios. It is here so the banner previews as a phone screen, and saves drawing one around every example. It is not part of what gets built. 
  ref: `Status Bar`; refVariant: `Platform=ios`; **Figma only, not built**
- **row** (container) 
  mode: `inherits palette=Dark from root`; layout: {direction: horizontal, gap: space/2xs, padding: space/sm, align: top}
- 1. **statusIcon** (instance) — The leading icon, held to the top of the message row. It is exposed, so the glyph is set per use. 
  mode: `inherits palette=Dark from root`; ref: `Icon`; refVariant: `Size=medium, Framed=true`; glyph: `verified`; glyphFamily: `rounded`; size: `control/target-min`; colour: `foreground/primary (the glyph follows the text colour)`; visible when `showLeadingIcon`
- 2. **content** (container) — The title and its optional description, filling whatever width the glyph and the dismiss control leave. 
  mode: `inherits palette=Dark from root`; layout: {direction: vertical, gap: space/sm, paddingBlock: space/sm, align: center}
- **title** (text) 
  mode: `inherits palette=Dark from root`; text: {style: label/large, color: foreground/primary, wrap: true}
- **description** (text) 
  mode: `inherits palette=Dark from root`; text: {style: body/small, color: foreground/primary, maxLines: 2, truncation: ending}; visible when `showDescription`
- 3. **actions** (slot) — The row beneath the text, holding one small outline-contrast Button by default. 
  mode: `inherits palette=Dark from root`; layout: {direction: horizontal, gap: space/sm, paddingBlock: space/2xs, align: center}; visible when `showActions`
- 4. **dismiss** (instance) — The close control at the trailing edge. Absent on negative, which stays until the condition clears. 
  mode: `inherits palette=Dark from root`; ref: `Icon Button`; refVariant: `Size=medium, Shape=sharp, Flavour=subtle`; glyph: `close`; glyphFamily: `rounded`; size: `control/md`; colour: `foreground/primary (overridden on the nested glyph)`; visible when `showClose && status != negative`

## Variants

| status | root fill | dismiss |
|---|---|---|
| Default | `feedback/success/background/strong` | present |
| negative | `feedback/error/background/strong` | absent |
| warning | `feedback/warning/background/strong` | present |
| Info | `feedback/info/background/strong` | present |

Status changes only the background token and, on negative, removes the dismiss control. Geometry is identical across all four.

## Subcomponents

**Status Bar** (`5255:2738`) — Preview chrome only; not built. Platforms: android (`space/page, space/sm, foreground/primary`), ios (`space/lg, space/gutter, foreground/primary`).

## Dependencies

- **Icon** (`2046:15010`, local) at statusIcon
- **Icon Button** (`2338:1763`, local) at dismiss — `Size=medium, Shape=sharp, Flavour=subtle`
- **Button** (`2060:15072`, local) at actions — `Size=small, Shape=rounded, Flavour=outline-contrast`

## Tokens & theming

**Colour** — `feedback/success/background/strong`, `feedback/error/background/strong`, `feedback/warning/background/strong`, `feedback/info/background/strong`, `foreground/primary`

**Dimension** — `space/none`, `space/2xs`, `space/sm`, `control/target-min`, `control/md`

**Typography** — `label/large`, `body/small` (text styles)

**Effects** — none.

**Shape** — Every banner takes one shape from its container, rounded or sharp, and every element inside it uses that same shape: the action Buttons, the dismiss Icon Button and anything else placed in the action slot. No control picks its own. The banner itself has no curved edges in either shape; its corners stay radius/none. Expose the container's shape to the banner (a shape prop, or a shape inherited from the container) and pass it down to every control inside; do not hard-code a shape on the action or the dismiss, and do not round the banner.

**Mode lock** — Every element inside the banner inherits palette=Dark: the status glyph, title, description, dismiss control, and anything placed in the action slot, including the default Button. None of them sets its own mode. Container mode: ignored — the banner renders in Dark whether its container is Light or Dark. Scope the banner root to dark (for example a mode-dark class on the root) so every descendant resolves dark tokens; do not let any part inherit the page mode.

Every variant pins `palette=Dark`, so the banner looks the same whatever mode its container uses; the brand extensions, which override part of `palette`, still apply. Theme axes are listed in `tokens/manifest.json`. The banner's own spacing does not change with the size modes.

## States, behavior & motion

| State | Trigger | Duration | What changes |
|---|---|---|---|
| Static | — | — | The banner has no interaction states of its own. Hover, focus and pressed all live on the action Button and the dismiss control inside it. |

| | |
|---|---|
| **Motion** | The banner slides in from the top as it opens, pushing the content below it down. Removing it plays the same motion in reverse, pulling the content back up. Both take 400ms, easing out on the way in and in on the way out, with no motion token yet. With reduced motion it fades instead. |
| **Reflow** | Width is fixed and height hugs the content, so a longer description makes the banner taller rather than wider. The text wraps inside its own column. |
| **Dismissal** | The component offers the control and nothing more. What happens after it is pressed, and whether the banner can return, is the product's decision. |

## Content & slots

| Property | Type | Description |
|---|---|---|
| Title | text | The headline. It is not exposed as an input, so it is set on the text itself. |
| Description | text | The supporting line below the title, switched by Show Description. Also set on the text rather than through an input. |
| Action Slot | slot | Takes the controls the message needs. It holds one small outline-contrast Button by default, and the slot accepts more than one. |
| Status Icon | icon, exposed | The leading glyph. It holds Verified on all four Status values, so the glyph is chosen per use rather than following the colour. |
| Dismiss | icon | The close control, switched by Show Close. Default, warning and Info carry it. negative does not, so that banner stays until the condition clears. |
| Status Bar | Figma only | A mock phone status bar above the message, pinned to ios. It is here so the banner previews as a phone screen, and saves drawing one around every example. It is not part of what gets built. |

## Usage

**Do**
- Match Status to what happened rather than to the colour you want. Using negative for emphasis leaves nothing for a real failure.
- Keep the title to one line and let the description carry the detail. The banner spans the screen, so a long title pushes the message down it.

**Don't**
- Don't let the background colour carry the status on its own. Keep the glyph on, and say what has happened in the text as well.
- Don't turn the dismiss off on a banner a person can do nothing about. That leaves a message on screen with no way to clear it.

## Accessibility

- A banner appears without being asked for, so it has to announce itself. Nothing in the component does that, and the product has to send the message to the screen reader as it opens.
- Status is carried by the background colour and by a glyph that is the same on all four values, so the text has to say what has happened. Someone who cannot separate the colours has only the words.
- The dismiss control is 40 square including its frame. Check it still meets your minimum target size once the surrounding padding is counted.
- Title and description both sit on foreground/on-strong over a strong feedback background. Check the contrast on each Status rather than assuming the pair holds across all four.

## Layout & theming intents

| Property | Type | Description |
|---|---|---|
| Size | Fixed width, hug height | 412px wide, with the height following the content. The banner spans the screen rather than sitting inside a column. |
| Padding | Fixed | space/sm on all four sides of the message row, with a further space/sm above and below the text column. |
| Gap | Fixed | space/2xs between the glyph, the text column and the dismiss control. space/sm between the text block and the action row. |
| Radius | None | Square on every corner. The banner meets both screen edges, so a radius would leave a gap at the sides. |
| Colour | Theming | The background is feedback/<status>/background/strong, one token per Status. Default resolves to the success token rather than a neutral one. Every variant is locked to the Dark palette mode, whatever mode its container uses. |
| Typography | Fixed | Title is label/large, description is body/small and the action label is label/medium. Title and description sit on foreground/on-strong; the action label takes the outline-contrast Button's foreground/primary. The Dark lock keeps that label white beside them. |
| Status glyph | Fixed | A medium framed Icon at 40×40px including its frame, held to the top of the message row. |
| Dismiss control | Fixed | 40×40px including its frame, sitting inside the message row's 8px padding at the trailing edge. |

## Visual reference

No images are stored. [Page](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5255-2146) · [Component set](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5350-6261). Per-variant links are in the JSON under `visualReference.variants`.

## Issues

### Warn

- **structure vs metadata (dismiss).** Dismiss is now a medium, sharp, subtle Icon Button on control/md, as on Desktop (small there). Content & Slot still types it as 'icon'. Its hover, focus and pressed come from Icon Button.
- **structure vs metadata (text colour).** Title, description and glyphs now bind foreground/primary, which reads white only because every variant is locked to Dark. Accessibility and Layout & Theming still say foreground/on-strong. In code the Dark scope is what keeps them white, so it is required, not optional.
- **api (sibling sets).** Mobile and Desktop model the same idea differently. Mobile switches the description with a Show Description boolean and does not expose the title; Desktop uses a Content Type variant and exposes Title. Mobile lets the glyph be swapped per use; Desktop ties it to Status. Decide in code whether this is one component with a layout prop or two.
- **api.** Title and Description are not exposed as properties (the metadata says so). In code both are content inputs.
- **shape inheritance vs Figma and metadata.** The rule is one shape for every control in the banner, taken from the container, while the banner itself stays square (as Layout & Theming's Radius row says). Figma mixes the controls (the action Button is rounded, the dismiss Icon Button sharp). Build to the rule; Figma needs updating to match.

### Note

- **structure.** negative removes the Dismiss layer outright rather than hiding it, so Show Close has no effect on negative. In code that is a rule (no dismiss when status is negative), not a default.
- **gaps.** The Description wrapper has an untokenised gap of 10Px. It holds a single child, so the gap draws nothing; ignore it in code.
- **internalVariations.** The status glyph is swap-only (Verified on every Status). Decide in code whether it becomes a prop or follows Status as Desktop does.
- **icon font.** Glyphs used: verified, close (rounded family). Both exist in packages/icons/codepoints.json and are not retired. Their colour is foreground/primary, the same as the text, so currentColor satisfies it; on the dismiss Icon Button that is an override of the button's own glyph colour.
- **coverage.** The banner has no interaction states of its own, and no effects or shadows anywhere. Its only motion is the reveal (see Behavior).
- **subcomponents.** Status Bar is Figma-only preview chrome and is not part of the build.
- **theming (Dark lock).** Every variant pins palette=Dark at the variant level, so the banner renders the same in a light or dark container. That is why the outline-contrast action, which follows the mode, reads white beside the white title: under Dark its label is foreground/primary and its border interactive/inverse/border/default, both near-white. In code, scope the banner to dark (for example a mode-dark class on its root) rather than letting it inherit the page mode.
- **gaps (motion).** The reveal and its reverse have no motion token: 400Ms, an ease-out curve in and an ease-in curve out are literals. The height opens from nothing while the content slides down from above, so everything beneath moves with it rather than being covered; removal closes it the same way back up.
- **code (react-baseui SystemBanner, web-components zds-system-banner).** Built 2026-10-29 as one component with layout mobile/desktop, settling the sibling-API decision: title is a prop on both (heading on the web component, since title would show the browser tooltip), a description makes desktop multiline and shows mobile's description, the glyph follows Status on desktop and is the icon prop on mobile, actions is a slot, and the dismiss never shows on negative. The root carries .mode-dark for the Dark lock and contain: inline-size so it fills its container rather than sizing to its one-line text. Announced as role=status, negative as role=alert. React and web components were compared in a browser and render identically. The shape rule is built: a shape prop (rounded or sharp, default sharp, set by the container) reaches the dismiss and every Button / Icon Button in the actions, and the banner stays square in both. The reveal is built in both packages with the Web Animations API: height from nothing to full while the row slides down, 400Ms on cubic-bezier(0.2, 0, 0, 1), and the reverse on removal on cubic-bezier(0.3, 0, 1, 1), 200Ms fades with reduced motion. Removal is the dismiss (the banner plays the reverse, hides, then reports close) or an open prop turned false; turning it true again replays the reveal; the React package reaches only direct children (or children inside a fragment), not ones wrapped in another component.
- **layout.** The set is drawn at a fixed 412Px width. The metadata says the banner spans the screen, so in code it fills its container; the width is the preview frame's, not a size to ship.
- **api.** Status options mix case (Default, negative, warning, Info) and Default is the success colour, as the metadata itself warns. The spec keeps Figma's names; code may lower-case them and decide whether Default ships as 'success'.
- **metadata (corrected 2026-10-29).** At the author's request the metadata was corrected in Figma before this extraction: the action Button is outline-contrast (it said outline-subtle; the flavour was later renamed from outline-contrast), and the title and description sit on foreground/on-strong (it said foreground/primary). The text in this spec is the corrected version.
