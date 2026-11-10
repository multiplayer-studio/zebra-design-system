# Lightbox

A full-size preview over the page, opened from the item being viewed. Images, videos and PDFs render themselves; anything else shows a drawn file sheet with the file's glyph and "No preview for this file". A toolbar names the item and offers open in a new tab, download and close; previous, next and the arrow keys page through the list. Backdrop, focus trap, Escape and scroll lock come from Dialog; everything visual comes from the token layer.

Source: <https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=8181-9232> · extracted 2026-11-10

Values anywhere in this document are token names. The only literals are inside verbatim metadata quotes, inside `issues`, and measurements suffixed `…Px`.

## API

| Prop | Type | Values | Default | Controls |
|---|---|---|---|---|
| `kind` | enum (derived) | `image` · `video` · `pdf` · `other` | `image` | variant |
| `shape` | enum | `rounded` · `sharp` | `rounded` | variant |
| `showOpenInNew` | boolean | | `true` | openInNew visibility |
| `showDownload` | boolean | | `true` | download visibility |
| `showNavigation` | boolean | | `true` | counter, previous, next visibility |
| `name` | string | | `File-name.jpg` | the name text |
| `counter` | string | | `2 of 4` | the counter text |
| `animated` | boolean (code only) | | `true` | the motion block |

Intent, verbatim from the metadata:

- **kind / image** — Never set by hand — derived from the item's MIME type or extension. An image renders itself, capped at 70% of the viewport's height, keeping its own ratio.
- **kind / video** — Fills the stage's width where it can; the height cap contains it and the picture keeps its own ratio inside the player.
- **kind / pdf** — An embedded document at 70% of the viewport's height.
- **kind / other** — No preview. A drawn file sheet carries the file's glyph and "No preview for this file".
- **shape / rounded** — The default, matching the system's other rounded controls. Shape also picks the glyph family for every icon in the toolbar and navigation.
- **shape / sharp** — Square corners on the panel and stage, with the sharp glyph family.
- **showOpenInNew / true** — The toolbar offers open in a new tab. The action disables itself when the item has no URL rather than failing silently.
- **showDownload / true** — The toolbar offers download, named after the item. It disables itself when the item has no URL.
- **showNavigation / true** — Previous and next float at the stage's sides and the arrow keys page too. With a single item, navigation hides itself whatever this is set to. **false** — Hides paging even when several items are passed.
- **animated / true** — Paging slides and the stage's height follows — see Behavior & Motion Intent. Always yields to the reduced-motion preference. A code property; the variants don't model it. **false** — Paging and the height change land instantly, with nothing in between.

## Internal variations & content inputs

None exposed by swapping. The drawn media inside the variants is a placeholder (the library ships no images); in code the real file renders, so the media part takes a `src`/`file` content input.

## Anatomy

1. **Panel (root)** — The raised surface over the backdrop: `surface/overlay` with a `border/default` stroke (`stroke/thin`, inside) and Dialog's `Shadow/large` (`shadow/large/x·y·blur` on `shadow/soft` plus `shadow/small/x·y·blur` on `shadow/hard`). Vertical layout, gap `space/sm`, padding `space/md`, radius `radius/element-md` (`radius/none` when sharp). Width defaults to `control/lg` × 16, never wider than the viewport less `space/page` each side (768Px as drawn).
2. **Toolbar** — Names the item, counts the pages and holds open in new, download and close — each behind its own property, every one an Icon Button. Horizontal, gap `space/sm`, fills the panel's width.
   - **Name** — `title/medium` on `foreground/primary`, fills the row, truncates at one line.
   - **Counter** — `body/medium` on `foreground/secondary`; visible when `showNavigation`.
   - **Actions** — gap `space/2xs`: Icon Button (medium, subtle, glyph `open-in-new-window`) when `showOpenInNew`; Icon Button (medium, subtle, glyph `download`) when `showDownload`; Icon Button (medium, subtle, glyph `close`) always.
3. **Stage** — The media well: `surface/subtle` sets the content apart from the panel, minimum height `control/lg` × 6 (288Px as drawn, unbound — see issues). Radius `radius/element-sm` (`radius/none` when sharp), clips. Content centres both ways; the image kind pads `space/lg` top and bottom, the other kinds fill edge to edge.
   - **Media** (image, video) — image on `surface/card`, video on `surface/inverse` filling the stage's width; `Shadow/medium` (`shadow/medium/x·y·blur` + `shadow/small/x·y·blur`, both on `shadow/soft`).
   - **Document** (pdf) — fills the stage's width on `surface/card` with `Shadow/medium`.
   - **Unpreviewable** (other) — vertical, gap `space/md`, padding `space/3xl` top and bottom, `space/xl` sides: a **Sheet** (`surface/card`, `border/default` at `stroke/thin`, `Shadow/medium`, `radius/element-md` with the top-right corner `radius/none` under the fold), its **Fold** (`space/lg` square, `surface/subtle`, `stroke/thin` on the bottom and left sides only, anchored top-right), and **"No preview for this file"** in `body/medium` on `foreground/secondary`.
4. **Navigation** — Previous and next float at the stage's sides, vertically centred, contrast flavour so they read over any media: Icon Button (medium, contrast) with glyphs `chevron-left` / `chevron-right`; visible when `showNavigation`.

Icons are font glyphs: colour is `currentColor`, size is the nested Icon's own variant (large inside the sheet; Icon Button's own inside buttons), and rounded/sharp is a family swap pinned by `shape`. All glyphs exist in `packages/icons/codepoints.json`; none is retired or rejected.

## Variants

| kind | stage content | stage padding | root height (observation) |
|---|---|---|---|
| image | media on `surface/card` | `space/lg` top and bottom | 394Px |
| video | media on `surface/inverse`, width fill | none | 488Px |
| pdf | document on `surface/card`, width fill | none | 554Px |
| other | sheet + "No preview for this file" | none | 362Px |

Root heights are placeholder-media measurements, not design values — in code the stage follows the real frame.

**shape** (`rounded` base): `sharp` swaps every radius to `radius/none` (panel, stage, sheet, fold) and switches every nested Icon Button and glyph to the sharp family; nothing else changes.

## Subcomponents

- **Icon Button** (local, own spec) — all five actions. Lightbox pins Size=medium; Flavour=subtle in the toolbar, Flavour=contrast for navigation; Shape follows `shape`.
- **Icon** (local, own spec) — Size=large placeholder glyphs inside the drawn media and the sheet; in code the sheet glyph comes from the file's kind.

## Tokens & theming

- **Color:** `surface/overlay`, `surface/subtle`, `surface/card`, `surface/inverse`, `border/default`, `foreground/primary`, `foreground/secondary`, `interactive/ghost/background/default`, `interactive/neutral/border/default`, `interactive/inverse/background/default`, `interactive/inverse/border/default`, `shadow/soft`, `shadow/hard`
- **Dimension:** `space/none`, `space/2xs`, `space/sm`, `space/md`, `space/lg`, `space/xl`, `space/3xl`, `radius/none`, `radius/element-sm`, `radius/element-md`, `stroke/base`, `stroke/thin`, `control/md`, `shadow/small|medium|large` x·y·blur
- **Typography:** `title/medium/*`, `body/medium/*` (text styles `title/medium`, `body/medium`)
- **Effects:** `Shadow/large`, `Shadow/medium`
- **Motion:** `animations/spring` (the entry; the paging timing is a literal — see issues)
- **Theme axes** (from `tokens/manifest.json`): palette Light · Dark · AAA Light · AAA Dark; size and typography Desktop · Tablet · Mobile · Desktop Compact. Every colour is semantic, so modes and brand extensions apply with no component work.

## States, behavior & motion

Verbatim from the metadata.

| State | Trigger | Duration | What changes |
|---|---|---|---|
| open | Index set on a closed lightbox | animations/spring | The backdrop fades in and the panel springs up from the bottom (animations/spring) with the stage already at the current frame's height. The height never animates on open, and the first frame never slides in. |
| paging | Previous / next, or the arrow keys | 400ms | The track slides to the new frame — the old one glides out as the new one glides in — and the stage's height follows on the same timing. An interrupted page glides on to the new target instead of restarting. |
| media sized | The current item's media reports real dimensions | 400ms | The stage re-measures the frame and eases to its true height. Media sizes arrive after mount, so the first measure is never final. |
| reduced motion | OS motion preference | 0 | The whole motion block turns off: paging and height changes land instantly, whatever Animated says. |
| closed | Close, Escape or the backdrop | — | The dialog unmounts; offscreen videos are already paused, and the open-in-place reset arms for the next open. |

- **Motion** — Paging is one transition on the track's slide and one on the stage's height: 400ms on cubic-bezier(0.33, 1, 0.68, 1), slower than the small controls' 250ms because the frames are large and travel far — the slide reads as a scene change, not a flick. Transitions, not keyed animations: an interrupted page glides to the new target instead of restarting, and nothing remounts. No motion token exists yet; the timing is a literal, as Message Input and Switch.
- **Opening** — The panel enters from the bottom on animations/spring, carrying the stage at the first frame's measured height. The height and track transitions arm only once the current frame has reported its real size, or on the first page — so opening never animates the height to meet late-loading media. Only real paging slides and eases.
- **Height response** — The stage's height follows the current frame on the paging timing, as a measured length. Both ends of a height transition must be real lengths — auto never interpolates — so the height is always written as a value, never left to the content.
- **Late media sizes** — An image or video only knows its real size once it loads, and a PDF's load event is unreliable. The stage re-measures when media gains dimensions and again when the panel mounts; never trust the first measure.
- **Track sizing** — The track is pinned to the stage, never sized by its content. Sized by content, the tallest frame (a 70vh document) inflates it past the stage, it overflows, and every frame centres against the oversized box instead of the visible window.
- **Media caps** — Media caps at 70% of the viewport's height and keeps its own ratio. Video fills the stage's width where it can; the cap contains it. The panel never grows wider than the viewport less space/page each side, nor taller than it less the same.
- **Offscreen media** — A frame slid out of view pauses its video. Neighbouring frames stay mounted so paging never reloads — which also means they keep playing unless paused.
- **Reduced motion** — Animated always yields to the reduced-motion preference: the motion block turns off entirely rather than shortening.

## Content & slots

- **Name** (text content) — The item's name in the toolbar, from its name, its file's name or its URL; "Untitled" when none exists.
- **Counter** (text content) — "{index} of {count}", shown only while paging through several items.
- **Items** (code content) — The list being previewed. Neighbouring items stay mounted either side of the current one, so paging never reloads media or flickers.
- **Media** (Figma-only placeholder) — The drawn media in the variants is a placeholder — the library ships no images. In code the real file renders.

## Usage (do / don't)

- **Do** — Open the lightbox from the thing being previewed — a thumbnail, an attachment row — and return focus there when it closes.
- **Do** — Pass every related item in one list, so previous, next and the arrow keys page through the whole set without reopening.
- **Don't** — Don't page by swapping frames. The track slides what is already mounted; remounting reloads media and flickers.
- **Don't** — Don't fix the stage's height or leave it auto. It follows the current frame as a measured value — auto cannot animate, and a fixed height crops tall media.

## Accessibility

- Backdrop, focus trap, Escape and scroll lock come from Dialog, so focus cannot leave the panel while it is open.
- Previous and next are labelled buttons and the arrow keys page as well; with one item, navigation disappears entirely.
- Open in new and download disable themselves when the item has no URL rather than failing silently.
- Reduced motion turns all sliding off; nothing is communicated by motion alone.
- The file sheet names the file and says "No preview for this file", so an unpreviewable item is still announced.
- A frame slid out of view pauses its video, so sound never continues behind another frame.

## Layout & theming intents

- **Width** (fixed, overridable) — control/lg × 16 by default (--zds-lightbox-width in code), capped at the viewport less space/page each side.
- **Height** (content, capped) — Fits its content up to the viewport less space/page top and bottom; the stage follows the current frame.
- **Stage** (min height) — control/lg × 6 minimum; surface/subtle fill; radius/element-sm, radius/none when sharp.
- **Media** (capped) — Up to 70% of the viewport's height, keeping its ratio; shadow/medium on shadow/soft — the panel itself carries shadow/large.
- **Padding** (fixed) — space/md around the panel, space/sm between toolbar and stage.
- **Radius** (per Shape) — radius/element-md on the panel, radius/element-sm on the stage; radius/none everywhere when sharp.
- **Border** (fixed) — stroke/thin on border/default around the panel.
- **Colour** (theming) — surface/overlay panel, surface/subtle stage, foreground/primary text. Every value is a semantic token; nothing hardcodes a colour, so modes and extensions arrive free.

## Issues

**Warn**

1. *gaps* — The stage's minimum height is a raw measurement (288Px, matching control/lg × 6 as the metadata states) with no variable bound — Figma cannot bind min-height to arithmetic on a token. Implement it as calc on `control/lg`, not as a literal.
2. *metadata* — The paging timing (400ms, cubic-bezier(0.33, 1, 0.68, 1)) is a literal: the token export has no paging-scale motion token. The entry uses the `animations/spring` token; the paging literal follows the Message Input and Switch convention.

**Note**

3. *cross-check* — Resolved 2026-11-10: the stage's fill is `surface/subtle`, as every Figma variant binds it. The metadata and the implementations originally said `surface/shade` and were corrected to match.
4. *api* — `animated` exists only in code; the variants don't model it. `kind` is derived from the item's MIME type or extension, never set by a consumer — both stated in the metadata.
5. *bindingDrift* — Stage paddingTop/Bottom (`space/lg`) is bound only in the image variants; the other kinds remove the padding so media fills the stage (intended, per the variant table). The fold's `radius/element-sm` binding exists only in rounded; sharp removes every radius.
6. *gaps* — The sheet fold's per-side stroke weights read as a raw composite, but the two drawn sides (bottom, left) are each bound to `stroke/thin`; the zero sides are by design.
7. *figma-only* — From the set description, verbatim: the media are placeholders (no images in the library); the backdrop (overlay/scrim), portal, focus trap and Escape come from Dialog in code; the paging slide (400ms, no motion token) isn't drawn. The sheet's fold uses surface/subtle because surface/sunken has no variable.
8. *cross-check* — The counter's visibility is tied to Show Navigation in Figma; the metadata's Content row says it shows "only while paging through several items" — the same condition in code, since navigation hides itself with one item.
9. *observation* — The root width (768Px) is fixed in Figma and equals control/lg × 16, the stated default; the per-kind root heights are placeholder-media measurements, not design values.
