# Lightbox

> A full-size preview over the page, opened from the item being viewed. Images, videos and PDFs render themselves; anything else shows a drawn file sheet with the file's glyph and “No preview for this file”. A toolbar names the item and offers open in a new tab, download and close; previous, next and the arrow keys page through the list. Backdrop, focus trap, Escape and scroll lock come from Dialog; everything visual comes from the token layer.

**Implementations:** `@zebra-design-system/react-baseui` · `@zebra-design-system/web-components` · `@zebra-fed/zeta-web` (`<zeta-lightbox>`)

## API

| Prop | Type | Default | Values | Notes |
|---|---|---|---|---|
| `kind` | enum | `image` | `image` `video` `pdf` `other` |  |
| `shape` | enum | `rounded` | `rounded` `sharp` |  |
| `showOpenInNew` | boolean | `true` |  |  |
| `showDownload` | boolean | `true` |  |  |
| `showNavigation` | boolean | `true` |  |  |
| `name` | string | `File-name.jpg` |  |  |
| `counter` | string | `2 of 4` |  |  |
| `animated` | boolean | `true` |  |  |

## When and how to use

### Do

- Open the lightbox from the thing being previewed — a thumbnail, an attachment row — and return focus there when it closes.
- Pass every related item in one list, so previous, next and the arrow keys page through the whole set without reopening.

### Don't

- Don’t page by swapping frames. The track slides what is already mounted; remounting reloads media and flickers.
- Don’t fix the stage’s height or leave it auto. It follows the current frame as a measured value — auto cannot animate, and a fixed height crops tall media.

## States

| State | Trigger | What changes |
|---|---|---|
| open | Index set on a closed lightbox |  |
| paging | Previous / next, or the arrow keys |  |
| media sized | The current item’s media reports real dimensions |  |
| reduced motion | OS motion preference |  |
| closed | Close, Escape or the backdrop |  |

## Behaviour

- **Motion** — Paging is one transition on the track’s slide and one on the stage’s height: 400ms on cubic-bezier(0.33, 1, 0.68, 1), slower than the small controls’ 250ms because the frames are large and travel far — the slide reads as a scene change, not a flick. Transitions, not keyed animations: an interrupted page glides to the new target instead of restarting, and nothing remounts. No motion token exists yet; the timing is a literal, as Message Input and Switch.
- **Opening** — The panel enters from the bottom on animations/spring, carrying the stage at the first frame’s measured height. The height and track transitions arm only once the current frame has reported its real size, or on the first page — so opening never animates the height to meet late-loading media. Only real paging slides and eases.
- **Height response** — The stage’s height follows the current frame on the paging timing, as a measured length. Both ends of a height transition must be real lengths — auto never interpolates — so the height is always written as a value, never left to the content.
- **Late media sizes** — An image or video only knows its real size once it loads, and a PDF’s load event is unreliable. The stage re-measures when media gains dimensions and again when the panel mounts; never trust the first measure.
- **Track sizing** — The track is pinned to the stage, never sized by its content. Sized by content, the tallest frame (a 70vh document) inflates it past the stage, it overflows, and every frame centres against the oversized box instead of the visible window.
- **Media caps** — Media caps at 70% of the viewport’s height and keeps its own ratio. Video fills the stage’s width where it can; the cap contains it. The panel never grows wider than the viewport less space/page each side, nor taller than it less the same.
- **Offscreen media** — A frame slid out of view pauses its video. Neighbouring frames stay mounted so paging never reloads — which also means they keep playing unless paused.
- **Reduced motion** — Animated always yields to the reduced-motion preference: the motion block turns off entirely rather than shortening.

## Content

| Part | Kind | Guidance |
|---|---|---|
| Name | text content | The item’s name in the toolbar, from its name, its file’s name or its URL; “Untitled” when none exists. |
| Counter | text content | “{index} of {count}”, shown only while paging through several items. |
| Items | code content | The list being previewed. Neighbouring items stay mounted either side of the current one, so paging never reloads media or flickers. |
| Media | Figma-only placeholder | The drawn media in the variants is a placeholder — the library ships no images. In code the real file renders. |

## Layout & theming

| Property | Sizing | Guidance |
|---|---|---|
| Width | Fixed, overridable | control/lg × 16 by default (--zds-lightbox-width in code), capped at the viewport less space/page each side. |
| Height | Content, capped | Fits its content up to the viewport less space/page top and bottom; the stage follows the current frame. |
| Stage | Min height | control/lg × 6 minimum; surface/subtle fill; radius/element-sm, radius/none when sharp. |
| Media | Capped | Up to 70% of the viewport’s height, keeping its ratio; shadow/medium on shadow/soft — the panel itself carries shadow/large. |
| Padding | Fixed | space/md around the panel, space/sm between toolbar and stage. |
| Radius | Per Shape | radius/element-md on the panel, radius/element-sm on the stage; radius/none everywhere when sharp. |
| Border | Fixed | stroke/thin on border/default around the panel. |
| Colour | Theming | surface/overlay panel, surface/subtle stage, foreground/primary text. Every value is a semantic token; nothing hardcodes a colour, so modes and extensions arrive free. |

## Accessibility

- Backdrop, focus trap, Escape and scroll lock come from Dialog, so focus cannot leave the panel while it is open.
- Previous and next are labelled buttons and the arrow keys page as well; with one item, navigation disappears entirely.
- Open in new and download disable themselves when the item has no URL rather than failing silently.
- Reduced motion turns all sliding off; nothing is communicated by motion alone.
- The file sheet names the file and says “No preview for this file”, so an unpreviewable item is still announced.
- A frame slid out of view pauses its video, so sound never continues behind another frame.

---
*Generated from `specs/lightbox` — do not edit by hand. Theming: put `mode-dark`, `ext-companion`, `ext-target` or `bp-*` classes on any ancestor (Zeta Web uses `data-theme`/`data-brand` attributes instead).*
