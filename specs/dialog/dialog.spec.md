# Dialog

A modal message that interrupts the current task until the user responds or dismisses it. A header carries the message's flavour and title, a body holds the message itself, and an optional footer offers one to three action buttons or two custom slots. Turning showFooter off removes the footer, leaving an informational dialog with nothing to decide.

Source: [Dialog page](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=2526-316) · extracted 2026-10-20

## API

| Prop | Type | Values | Default | Controls |
|---|---|---|---|---|
| `flavour` | enum | default, error, info, success, warning | `default` | header leading glyph |
| `shape` | enum | round, sharp | `round` | root radius, leading glyph family, footer button shape |
| `showFooter` | boolean | true, false | `true` | footer |

**flavour** — sets only the header's leading glyph: default → `block`, error → `error`, info → `info`, success → `verified`, warning → `warning`. The icon colour stays `foreground/primary` for every value, and nothing else changes.
- default: "The dialog's neutral baseline, with no severity implied. Use it for confirmations and other messages that are not warning the user about anything."
- error: "The header icon switches to the error glyph. Use it only when the message reports something that failed or blocks the user from continuing, not for a milder warning."
- info: "The header icon switches to the info glyph. Use it for a message the user should read but that needs no decision or urgency attached to it."
- success: "The header icon switches to the success glyph. Use it to confirm that an action already completed, not to ask the user to confirm one."
- warning: "The header icon switches to the warning glyph. Use it when the user can still proceed but should be made aware of a consequence first."

**shape** — round: "Matches the surrounding surface and its other rounded controls. Also sets the shape of every button in the footer, the two cannot be mixed within one dialog." · sharp: "Matches a square surface. Carries through to the footer’s action buttons as well."

**showFooter** — true: "Shows the footer and its action buttons." · false: "Removes the footer entirely, the dialog hugs to the header and body alone. Use it only for a message with nothing for the user to decide."

Values anywhere in this document are token names. The only literals are inside verbatim metadata quotes and inside issues; measurements are suffixed Px.

## Internal variations & content inputs

**Footer actions.** Dialog pins its footer to `Actions=3`. The 1, 2 and custom presets (with two slots) can only be reached on the nested `_Dialog Footer`. The How to use guidance relies on them, so code has to decide whether they become a prop or are composed as children.

**Header toggles.** `_Dialog Header` has `showLeadingIcon` and `showClose`. Dialog pins both true and exposes neither.

**Content inputs.** The title text (sample "Dialog Title"), the body (any content; the sample is one paragraph) and each footer button's label and action (sample "Button").

## Anatomy

Root: vertical, gap `space/none`, padding `space/md`, fill `surface/dialog`, border `border/default` at `stroke/thin` (inside), radius `radius/element-md` (round) or `radius/none` (sharp), no shadow. It hugs its content: 506×222Px measured, and 158Px tall without the footer. *"Outer padding — 12px on every side of the dialog itself, independent of each section’s own padding."*

1. **Header** (`_Dialog Header`, fills the width, both toggles pinned on). *"A single Dialog Header instance, fixed in every variant. Holds the leading icon, the title and the close icon."*
2. **Body**: horizontal, centred, gap `space/none`, padding `space/md` on top, right and left and `space/section` at the bottom. It fills the width and hugs its height, with a raw minimum width of 480Px. Inside it, a content box fills and clips. The sample text is `body/medium` in `foreground/primary`. *"An open content area with no fixed structure of its own in this file."*
3. **Footer** (`_Dialog Footer` at Actions=3, visible when `showFooter`). It has a fixed width (480Px measured). Dialog overrides each button's Shape to follow `shape` (round → rounded, sharp → sharp). *"A single Dialog Footer instance, hidden entirely when showFooter is off."*

## Variants

| flavour | leading glyph |
|---|---|
| default | `block` |
| error | `error` |
| info | `info` |
| success | `verified` |
| warning | `warning` |

| shape | root radius | leading glyph family | close glyph family | footer button shape |
|---|---|---|---|---|
| round | `radius/element-md` | rounded | rounded | rounded |
| sharp | `radius/none` | sharp | rounded (see issues) | sharp |

The two axes are independent and every other value is the same in all 10 cells.

## Subcomponents

### _Dialog Header (private, single component)
- **API:** `showLeadingIcon` (boolean, default true) → leadingIcon · `showClose` (boolean, default true) → close.
- **root:** horizontal, centred, gap `space/sm`, padding `space/md`, height `control/lg`, radius `radius/none`, no fill.
- **titleGroup:** horizontal, gap `space/sm`, padding `space/none`, fills the width.
- **leadingIcon:** the glyph comes from Dialog's `flavour` and the family from `shape`. The master default is `block`. Colour is `foreground/primary`, so with the font it is currentColor. It is a raw glyph component (24×24Px measured), not the Icon component, so there is no size token.
- **title:** `title/large`, `foreground/primary`, hugs its width, no truncation set.
- **close:** Icon (`specs/icon`), Size=medium (height `control/icon-md`), Framed=false, glyph `close`, rounded family, `foreground/primary`. It is a bare icon with no Icon Button states.

### _Dialog Footer (private, 4 variants)
- **API:** `actions` enum 1 | 2 | 3 | custom (default 3) · `leftAction` and `rightAction` slots, shown when actions = custom. Preferred content is Button (`specs/button`) and Icon Button (`specs/icon-button`), with no min or max children.
- **root:** horizontal, centred, padding `space/md`, no fill, fixed width (480Px measured, minimum 480Px), 64Px tall measured.
- Buttons are pinned to Size=medium, no icons, label "Button". Their paint comes from `specs/button`.

| actions | justify | gap | children |
|---|---|---|---|
| 1 | end | `space/sm` | primary (Flavour=primary) |
| 2 | end | `space/sm` | secondary (outline-subtle), primary |
| 3 | space-between | — | tertiary (text) on the left · secondary + primary on the right (gap `space/sm`) |
| custom | space-between | — | leftAction slot · rightAction slot (each gap `space/sm`) |

### Dependencies
| Component | Spec | Used for |
|---|---|---|
| Button | `specs/button` | footer tertiary, secondary and primary; preferred slot content |
| Icon Button | `specs/icon-button` | preferred slot content only (not the close control) |
| Icon | `specs/icon` | header close |
| Icon font | `packages/icons/codepoints.json` | `block`, `error`, `info`, `verified`, `warning`, `close` |
| Divider | `specs/divider` | not used: header, body and footer sit flush |

## Tokens & theming

- **Colour:** `surface/dialog`, `border/default`, `foreground/primary`.
- **Dimension:** `space/{none, sm, md, section}`, `radius/{element-md, none}`, `stroke/thin`, `control/lg`, `control/icon-md`.
- **Typography:** `title/large`, `body/medium`. **Glyphs:** `block`, `error`, `info`, `verified`, `warning`, `close`.
- **Via Button (owned by `specs/button`):** `interactive/{ghost, neutral, primary}/…` background, border and foreground defaults; `control/md`, `space/xs`, `radius/element-sm`, `stroke/base`.
- **Not bound, candidates only:** backdrop `overlay/modal` and `overlay/scrim`; elevation `shadow/soft` and `shadow/hard`. See issues.
- **Theme axes:** palette (Light, Dark); size and typography (Desktop, Mobile, Tablet, Desktop Compact).

All 14 of Dialog's own token names and all of the Button-side names resolve in `tokens/`. All six glyphs are in the font, none retired or rejected.

## States, behavior & motion

There is no States & Triggers section, and nothing on this page models a state. Interactive states belong to the nested Buttons, and open/closed is not modelled.
- Motion: "No transition is defined for the dialog's own header, body or footer arrangement across any of its variants."

### Modal expectations (for Base UI's Dialog)
| Concern | What the page says |
|---|---|
| Overlay / backdrop | Nothing is modelled: no backdrop layer and no overlay token bound. "Modal" is implied only by the summary. |
| Focus trap & return | Explicitly unspecified: "Nothing in this file marks how the dialog traps focus or returns it when it closes, so that behaviour needs confirming outside Figma." |
| Dismissal | Implied but not specified. A close glyph appears in every header, and the summary says "until the user responds or dismisses it". Escape, outside click, and whether dismissal is allowed while a decision is pending are not stated. |
| Stacking | Not modelled: no z-order or nested-dialog guidance. |
| Elevation | None: no shadow or effect. |
| Size & placement | Hugs its content. There is no max width or height, no viewport placement, and no scrolling for long bodies; the body content clips. |
| Dialog vs modal | The Dev Deviation note says Figma split dialog and modal into separate components. Only Dialog is on this page. |

Dev Deviation, verbatim: "Code implementation uses a the same dialog component for both dialogs and modals. We have split them into separate components given they have independent use cases and visual treatments. Code implementation does not allow for the clear icon to be hidden. This has been introduced in the new build. confirmButtonFlavor from code has not been implemented: slots are used, with buttons in actions. Button flavour can be changed at the component level properties. Figma’s dialog component exposes an explicit showFooter boolean."

## Content & slots

- **Header** (Dialog Header instance): "Fixed to a single Header instance in every variant, holding a leading icon, the title and a close icon. Both the icon and the close icon are always shown, Dialog does not expose either as a property. The leading icon's glyph changes with Flavour, set directly by Dialog rather than through an exposed binding."
- **Body** (Any content): "Holds whatever content the message needs to show, with no fixed type or structure of its own in this file."
- **Footer** (Dialog Footer instance): "Fixed to a single Footer instance, hidden entirely when showFooter is off. Every variant uses the same three button layout, a Tertiary action on one side and a Secondary and Primary pair on the other. Which layout shows is fixed by Dialog, not an exposed property."

## Usage

**Do**
- Keep the footer to one clear action when only one response is needed. The Actions preset for one button exists for exactly this case.
- Turn showFooter off only for a message the user reads with nothing to decide. The footer is removed entirely, not replaced with an empty bar.

**Don't**
- Don't rely on Flavour to recolour anything beyond the header icon. Every value binds that icon to the same colour token, so the body and the footer's buttons need their own styling if the message calls for it.
- Don't reach for the custom Actions value for a plain one, two or three button footer. The fixed presets already set each button's role and position, the custom slots exist for content that does not fit them.

## Accessibility

- The dialog's own header, body and footer carry no keyboard or focus behaviour beyond what the close icon and the footer's buttons already define on their own. Nothing in this file marks how the dialog traps focus or returns it when it closes, so that behaviour needs confirming outside Figma.

## Layout & theming intents

| Property | Type | Description |
|---|---|---|
| Width | Hug | "Hugs its content rather than holding a fixed width. 506px with the default content, from 12px padding on each side plus the 480px wide header, body and footer." |
| Height | Hug | "Hugs the stack of header, body and footer with no gap between them. Shrinks by the footer’s own height, 64px, when showFooter is off." |
| Padding | Fixed | "12px on every side of the dialog itself. The header, body and footer sit flush against each other inside it." |
| Header padding and gap | Fixed | "12px on every side, 8px between the leading icon, title and close icon." |
| Body padding | Fixed | "12px on three sides and 24px at the bottom, wider than the others to keep the footer’s buttons clear of the last line of content." |
| Footer | Fixed width, fixed padding | "Holds its own width fixed at 480px rather than hugging, with 12px padding on every side. Its content is pushed to the two opposite ends rather than spaced evenly." |
| Radius | Fixed per Shape | "0 for sharp, 6px for round. Chosen per dialog rather than inherited, and it sets the corner radius of every button in the footer as well." |
| Header icon colour | Fixed | "Every Flavour value binds the leading icon to the same foreground/primary token. Flavour changes which glyph shows, never its colour." |

The stated values agree with the bindings: padding `space/md`, header gap `space/sm`, body bottom `space/section`, round radius `radius/element-md`.

## Issues

**Warn**
- **Modal behaviour is unspecified.** Backdrop, focus trap and return, dismissal and stacking appear nowhere on the page. Base UI's defaults will apply until design decides.
- **There is no usable backdrop token.** `overlay/modal` is described as a dimming layer, but it aliases the same opaque palette value as `surface/dialog`. `overlay/scrim` (palette fill/scrim, translucent) is scoped to drawers and sheets. A token decision is needed.
- **The close control is a bare Icon,** not an Icon Button: no hit area, states or accessible name are drawn. In code it must be an interactive, labelled close control.
- **Shape misses the close glyph.** Sharp dialogs switch the leading glyph and the buttons to sharp, but the close glyph stays in the rounded family.
- **The Dev Deviation contradicts the API.** It says hiding the close icon was "introduced in the new build", but Dialog pins `showClose` (and `showLeadingIcon`) on and exposes neither.
- **`radius/element-md` description drift.** The description says 16px (scale/6), but the token resolves to scale/4, which matches the metadata's 6px.
- **The footer has a fixed width** while the header and body fill. A wider body would leave the footer short. Body and footer also carry a raw 480Px minimum width with no token.
- **Footer presets aren't exposed.** Dialog pins Actions=3, yet How to use relies on the 1-button and custom presets. Code needs to choose between a prop and composition.

**Note**
- Flavour is glyph-only. The How to use wording ("Every value binds that icon to the same colour token") is accurate but reads as if Flavour recoloured something.
- The 506Px width includes the two `stroke/thin` borders. The metadata's arithmetic (12 + 480 + 12) leaves them out.
- The leading glyph is a raw glyph component (24×24Px) with no size token, while the close glyph uses Icon Size=medium (`control/icon-md`), so the two render at different sizes.
- There is no elevation: `shadow/soft` and `shadow/hard` exist but are unused.
- The sample body text has a fixed width inside a content box that fills. In code the body is free content. Long-content scrolling isn't modelled.
- `_Dialog Footer` binding drift: radius is unbound in Actions=3 and gap is unbound in Actions=3 and custom. Neither has a visible effect.
- There is no States section, Behavior has only "no motion", no native component descriptions are set, and long-title wrapping and truncation aren't modelled.
- Dialog and Modal are split per the Dev Deviation, but there is no Modal on this page and no `specs/modal`.
