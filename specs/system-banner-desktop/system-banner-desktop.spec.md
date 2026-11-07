# System Banner (Desktop)

A full-width message pinned to the top of a desktop view, carrying a status colour, a title, an optional description and an optional action. Status sets the background and the glyph together, while Content Type decides whether the message runs to one line or two. It spans the view and stays until something clears it, so it suits news a person has to see before carrying on.

Source: [Zebra Design System › System Banner](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5255-2146) (set `5406:9998`, 8 variants) · extracted 2026-10-29

> **Values are token names.** The values live in [tokens/](../../tokens/). The only literals are measurements (suffixed Px) and the untokenised values called out in Issues.

> **Locked to Dark.** The banner root pins `palette=Dark`, and every element inside it inherits that: the status glyph, title, description, dismiss control and anything in the action slot. The container's mode is ignored. In code, scope the root to dark so every descendant resolves dark tokens.

> **One shape, from the container.** Every banner takes its shape, rounded or sharp, from the container it sits in, and every element inside it uses that same shape: the action Buttons, the dismiss and anything in the action slot. The banner itself stays square in both.

Sibling on the same page: [System Banner (Mobile)](../system-banner-mobile/system-banner-mobile.spec.md).

## API

| Prop | Type | Values | Default | Controls |
|---|---|---|---|---|
| `status` | enum | Default, negative, warning, Info | `Default` | root.fill, statusIcon.glyph, dismiss (removed on negative) |
| `contentType` | enum | single line, multiline | `single line` | content.direction, description |
| `title` | string | — | `Banner Title` | title |
| `showLeadingIcon` | boolean | true, false | `true` | statusIcon |
| `showActions` | boolean | true, false | `true` | actions |
| `showClose` | boolean | true, false | `true` | dismiss |
| `actions` | slot | Button; more than one | one Button (small, rounded, outline-contrast, label "Primary") | actions |

### Per-value intent (verbatim)

**status**
- **Default** — The success colour, despite the name. Use it on completion, not as a neutral default.
- **negative** — A failure that needs attention. It carries no dismiss, so it stays until the problem clears.
- **warning** — A problem the person can still act on. Use it ahead of failure, or negative loses its force.
- **Info** — Neutral news with nothing at stake. Use it where nothing is required of the reader.

**contentType**
- **single line** — Title and action on one row. Use it when the message fits in a few words.
- **multiline** — Adds a description under the title. Use it when the title alone leaves the reason unclear.

**title**
- **text** — The headline. Use it to say what happened and leave the detail to the description.

**showLeadingIcon**
- **true** — Keeps the status glyph, which follows Status. Use it so the banner survives greyscale.
- **false** — Drops the glyph. Colour alone then carries the status, which the text has to repeat.

**showActions**
- **true** — Keeps the action slot. Use it when there is something to do, not merely to acknowledge.
- **false** — Removes the action row. Use it for a message that only informs, so nothing invites a click.

**showClose**
- **true** — Lets the person dismiss the banner. Use it where the message stops mattering once read.
- **false** — Keeps the banner until the condition clears. Use it where the message must not be lost.

## Internal variations & content inputs

- **description** is a content input. Present on multiline only; not a Figma property.

## Anatomy

- **root** (container) 
  mode: `palette=Dark, locked on every variant`; layout: {direction: vertical, gap: none (single child; see issues)}; fill: `feedback/<status>/background/strong`
- **row** (container) 
  mode: `inherits palette=Dark from root`; layout: {direction: horizontal, gap: space/sm, padding: space/lg, align: top}
- 1. **statusIcon** (instance) — The leading icon inside its own square, following Status rather than being chosen per message. 
  mode: `inherits palette=Dark from root`; ref: `Icon`; refVariant: `Size=medium, Framed=false`; glyph: `follows status (see variants)`; glyphFamily: `rounded`; colour: `foreground/primary (the glyph follows the text colour)`; visible when `showLeadingIcon`
- 2. **content** (container) — The title and, on multiline, its description. It fills whatever width the glyph and the dismiss control leave. 
  mode: `inherits palette=Dark from root`; layout: {single line: {direction: horizontal, gap: space/lg, align: center}, multiline: {direction: vertical, gap: space/lg, paddingBlock: space/2xs}}
- **text** (container) 
  mode: `inherits palette=Dark from root`; layout: {single line: {direction: horizontal, gap: space/card, paddingBlock: space/sm}, multiline: {direction: vertical, gap: space/2xs, paddingBlock: space/2xs}}
- **title** (text) 
  mode: `inherits palette=Dark from root`; text: {style: label/medium, color: foreground/primary, maxLines: 1, truncation: ending}
- **description** (text) 
  mode: `inherits palette=Dark from root`; text: {style: body/small, color: foreground/primary, maxLines: 1, truncation: ending}; visible when `contentType == multiline`
- 3. **actions** (slot) — Sits beside the text on single line and beneath it on multiline, holding one small outline-contrast Button by default. 
  mode: `inherits palette=Dark from root`; layout: {direction: horizontal, gap: space/sm, align: center}; visible when `showActions`
- 4. **dismiss** (instance) — The close control at the trailing edge. Absent on negative, which stays until the condition clears. 
  mode: `inherits palette=Dark from root`; ref: `Icon Button`; refVariant: `Size=small, Shape=sharp, Flavour=subtle`; glyph: `close`; glyphFamily: `rounded`; colour: `foreground/primary (overridden on the nested glyph)`; visible when `showClose && status != negative`

## Variants

| status | root fill | status glyph | dismiss |
|---|---|---|---|
| Default | `feedback/success/background/strong` | `check-circle` | present |
| negative | `feedback/error/background/strong` | `error` | absent |
| warning | `feedback/warning/background/strong` | `warning` | present |
| Info | `feedback/info/background/strong` | `info` | present |

| contentType | content | text | description | rootHeightPx (measured) |
|---|---|---|---|---|
| single line | horizontal | horizontal, gap `space/card`, padding block `space/sm` | absent | 68 |
| multiline | vertical, padding block `space/2xs` | vertical, gap `space/2xs`, padding block `space/2xs` | present | 142 |

The two axes are independent: Status carries colour, glyph and dismiss; Content Type carries the content layout. rootHeightPx is a measurement of the preview, not a size to ship.

## Dependencies

- **Icon** (`2046:15010`, local) at statusIcon
- **Icon Button** (`2338:1763`, local) at dismiss — `Size=small, Shape=sharp, Flavour=subtle`
- **Button** (`2060:15072`, local) at actions — `Size=small, Shape=rounded, Flavour=outline-contrast`

## Tokens & theming

**Colour** — `feedback/success/background/strong`, `feedback/error/background/strong`, `feedback/warning/background/strong`, `feedback/info/background/strong`, `foreground/primary`

**Dimension** — `control/sm`, `space/2xs`, `space/sm`, `space/card`, `space/lg`

**Typography** — `label/medium`, `body/small` (text styles)

**Effects** — none.

**Shape** — Every banner takes one shape from its container, rounded or sharp, and every element inside it uses that same shape: the action Buttons, the dismiss Icon Button and anything else placed in the action slot. No control picks its own. The banner itself has no curved edges in either shape; its corners stay radius/none. Expose the container's shape to the banner (a shape prop, or a shape inherited from the container) and pass it down to every control inside; do not hard-code a shape on the action or the dismiss, and do not round the banner.

**Mode lock** — Every element inside the banner inherits palette=Dark: the status glyph, title, description, dismiss control, and anything placed in the action slot, including the default Button. None of them sets its own mode. Container mode: ignored — the banner renders in Dark whether its container is Light or Dark. Scope the banner root to dark (for example a mode-dark class on the root) so every descendant resolves dark tokens; do not let any part inherit the page mode.

Every variant pins `palette=Dark`, so the banner looks the same whatever mode its container uses; the brand extensions, which override part of `palette`, still apply. Theme axes are listed in `tokens/manifest.json`. The banner's own spacing does not change with the size modes.

## States, behavior & motion

| State | Trigger | Duration | What changes |
|---|---|---|---|
| Static | — | — | The banner has no interaction states of its own. Hover, focus and pressed all live on the action Button and the dismiss Icon Button inside it. |

| | |
|---|---|
| **Motion** | The banner slides in from the top as it opens, pushing the content below it down. Removing it plays the same motion in reverse, pulling the content back up. Both take 400ms, easing out on the way in and in on the way out, with no motion token yet. With reduced motion it fades instead. |
| **Reflow** | Width is fixed and height follows the content. single line holds one row, multiline grows with the description, and the text wraps inside its own column. |
| **Dismissal** | The component offers the control and nothing more. What happens after it is pressed, and whether the banner can return, is the product's decision. |

## Content & slots

| Property | Type | Description |
|---|---|---|
| Title | text, exposed | The headline, set through the Title input rather than on the text itself. |
| Description | text | The supporting line, present only on multiline. It is not exposed as an input, so it is set on the text. |
| Action Slot | slot | Takes the controls the message needs. It holds one small outline-contrast Button by default, and the slot accepts more than one. |
| Status Icon | icon, parent-owned | The leading glyph, following Status: Check Circle, Error, Warning and Info. It is not a consumer choice. |
| Dismiss | Icon Button | The close control, switched by Show Close. Default, warning and Info carry it. negative does not, so that banner stays until the condition clears. |
| Action Button | nested instance | One small rounded outline-contrast Button. The flavour is the banner's call, so changing it per message breaks the pairing with the background. |

## Usage

**Do**
- Match Status to what happened rather than to the colour you want. Using negative for emphasis leaves nothing for a real failure.
- Use single line when the title says everything. multiline earns its height only when the reason needs spelling out.

**Don't**
- Don't let the background colour carry the status on its own. Keep the glyph on, and say what has happened in the text as well.
- Don't turn the dismiss off on a banner a person can do nothing about. That leaves a message on screen with no way to clear it.

## Accessibility

- A banner appears without being asked for, so it has to announce itself. Nothing in the component does that, and the product has to send the message to the screen reader as it opens.
- The glyph follows Status here, so colour is not the only carrier. The text should still name what has happened, because the glyph alone is a small difference at this size.
- The dismiss control is a 36 square Icon Button. Check it still meets your minimum target size, and that it is reachable by keyboard in the same order it appears.
- Title and description both sit on foreground/on-strong over a strong feedback background. Check the contrast on each Status rather than assuming the pair holds across all four.

## Layout & theming intents

| Property | Type | Description |
|---|---|---|
| Size | Fixed width, hug height | 983px wide. 68px tall on single line and 142px on multiline, with the height following the description. |
| Padding | Fixed | 16px on all four sides of the message row, with a further space/2xs above and below the text on multiline. |
| Gap | Fixed | 8px between the glyph, the content and the dismiss control. space/lg inside the content between the text and the action row. |
| Radius | None | Square on every corner. The banner spans the full width of the view, so a radius would leave a gap at the sides. |
| Colour | Theming | The background is feedback/<status>/background/strong, one token per Status. Default resolves to the success token rather than a neutral one. Every variant is locked to the Dark palette mode, whatever mode its container uses. |
| Typography | Fixed | Title is label/medium, description is body/small and the action label is label/medium. Title and description sit on foreground/on-strong; the action label takes the outline-contrast Button's foreground/primary. The Dark lock keeps that label white beside them. |
| Status glyph | Fixed | A medium unframed Icon inside a 36×36px container, held to the top of the message row. |
| Dismiss control | Fixed | A 36×36px Icon Button with space/2xs around a 20px glyph, at the trailing edge of the row. |

## Visual reference

No images are stored. [Page](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5255-2146) · [Component set](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5406-9998). Per-variant links are in the JSON under `visualReference.variants`.

## Issues

### Warn

- **structure vs metadata (text colour).** Title, description and glyphs now bind foreground/primary, which reads white only because every variant is locked to Dark. Accessibility and Layout & Theming still say foreground/on-strong. In code the Dark scope is what keeps them white, so it is required, not optional.
- **structure (Title property).** The Title text property is bound only on single line. On every multiline variant the binding is gone, so setting Title on an instance does not reach the multiline title. In code title is one prop for both.
- **structure vs metadata.** Reflow says multiline 'grows with the description', but the description is capped at one line with an ending ellipsis, as is the title. Decide in code whether the description wraps.
- **api (sibling sets).** Mobile and Desktop model the same idea differently. Mobile switches the description with a Show Description boolean and does not expose the title; Desktop uses a Content Type variant and exposes Title. Mobile lets the glyph be swapped per use; Desktop ties it to Status. Decide in code whether this is one component with a layout prop or two.
- **shape inheritance vs Figma and metadata.** The rule is one shape for every control in the banner, taken from the container, while the banner itself stays square (as Layout & Theming's Radius row says). Figma mixes the controls (the action Button is rounded, the dismiss Icon Button sharp). Build to the rule; Figma needs updating to match.

### Note

- **resolved (spec check 2026-10-29).** The message row's padding and gap were untokenised on seven of the eight variants. They now bind space/lg and space/sm on all eight.
- **gaps / bindingDrift.** The root's 8Px gap is untokenised on seven variants and bound to space/sm only on Status=warning, Content Type=single line. The root holds a single child, so the gap draws nothing; ignore it in code.
- **metadata.** Layout & Theming still quotes the row's padding and gap as bare numbers ('16px on all four sides', '8px between the glyph…'). They are now bound to space/lg and space/sm, which the metadata could name.
- **structure.** negative removes the Dismiss layer outright rather than hiding it, so Show Close has no effect on negative. In code that is a rule (no dismiss when status is negative), not a default.
- **gaps.** The icon container has an untokenised gap of 10Px around a single child, so it draws nothing; ignore it in code.
- **icon font.** Glyphs used: check-circle, error, warning, info, close (rounded family). All exist in packages/icons/codepoints.json and none is retired. Their colour is foreground/primary, the same as the text, so currentColor satisfies it; on the dismiss Icon Button that is an override of the button's own glyph colour.
- **coverage.** The banner has no interaction states of its own, and no effects or shadows anywhere. Its only motion is the reveal (see Behavior).
- **theming (Dark lock).** Every variant pins palette=Dark at the variant level, so the banner renders the same in a light or dark container. That is why the outline-contrast action, which follows the mode, reads white beside the white title: under Dark its label is foreground/primary and its border interactive/inverse/border/default, both near-white. In code, scope the banner to dark (for example a mode-dark class on its root) rather than letting it inherit the page mode.
- **gaps (motion).** The reveal and its reverse have no motion token: 400Ms, an ease-out curve in and an ease-in curve out are literals. The height opens from nothing while the content slides down from above, so everything beneath moves with it rather than being covered; removal closes it the same way back up.
- **code (react-baseui SystemBanner, web-components zds-system-banner).** Built 2026-10-29 as one component with layout mobile/desktop, settling the sibling-API decision: title is a prop on both (heading on the web component, since title would show the browser tooltip), a description makes desktop multiline and shows mobile's description, the glyph follows Status on desktop and is the icon prop on mobile, actions is a slot, and the dismiss never shows on negative. The root carries .mode-dark for the Dark lock and contain: inline-size so it fills its container rather than sizing to its one-line text. Announced as role=status, negative as role=alert. React and web components were compared in a browser and render identically. The shape rule is built: a shape prop (rounded or sharp, default sharp, set by the container) reaches the dismiss and every Button / Icon Button in the actions, and the banner stays square in both. The reveal is built in both packages with the Web Animations API: height from nothing to full while the row slides down, 400Ms on cubic-bezier(0.2, 0, 0, 1), and the reverse on removal on cubic-bezier(0.3, 0, 1, 1), 200Ms fades with reduced motion. Removal is the dismiss (the banner plays the reverse, hides, then reports close) or an open prop turned false; turning it true again replays the reveal; the React package reaches only direct children (or children inside a fragment), not ones wrapped in another component.
- **layout.** The set is drawn at a fixed 983Px width. The metadata says the banner spans the screen, so in code it fills its container; the width is the preview frame's, not a size to ship.
- **api.** Status options mix case (Default, negative, warning, Info) and Default is the success colour, as the metadata itself warns. The spec keeps Figma's names; code may lower-case them and decide whether Default ships as 'success'.
- **metadata (corrected 2026-10-29).** At the author's request the metadata was corrected in Figma before this extraction: the action Button is outline-contrast (it said outline-subtle; the flavour was later renamed from outline-contrast), and the title and description sit on foreground/on-strong (it said foreground/primary). The text in this spec is the corrected version.
