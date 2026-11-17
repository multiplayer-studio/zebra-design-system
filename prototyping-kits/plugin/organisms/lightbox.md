---
name: Lightbox
level: organism
status: stable
composes: [../atoms/icon-button.md, ../atoms/icon.md, ../atoms/scrim.md]
tokens:
  # panel
  lightbox-container-background: '{colors.color-fill-overlay}'
  lightbox-container-border-color: '{colors.color-line-default}'
  lightbox-container-border-width: '{stroke.stroke-thin}'
  lightbox-container-radius-rounded: '{radius.radius-element-md}'
  lightbox-container-radius-sharp: '{radius.radius-none}'
  lightbox-container-padding: '{space.space-md}'
  lightbox-container-gap: '{space.space-sm}'
  lightbox-container-shadow: '{shadow.shadow-large}'
  lightbox-container-width: '{component-sizes.size-lightbox-width}'
  lightbox-container-margin: '{space.space-page}'
  # toolbar
  lightbox-toolbar-gap: '{space.space-sm}'
  lightbox-name-foreground: '{colors.color-ink-high}'
  lightbox-name-font: '{typography.type-title-medium}'
  lightbox-counter-foreground: '{colors.color-ink-medium}'
  lightbox-counter-font: '{typography.type-body-medium}'
  lightbox-actions-gap: '{space.space-2xs}'
  lightbox-action-size: '{control.control-md}'
  # stage
  lightbox-stage-background: '{colors.color-fill-faint}'
  lightbox-stage-radius-rounded: '{radius.radius-element-sm}'
  lightbox-stage-radius-sharp: '{radius.radius-none}'
  lightbox-stage-padding-y-image: '{space.space-lg}'
  lightbox-stage-min-height: '{component-sizes.size-lightbox-stage-min-height}'
  lightbox-media-max-height: '{component-sizes.size-lightbox-media-max-height}'
  lightbox-navigation-size: '{control.control-md}'
  lightbox-navigation-inset: '{space.space-sm}'
  # media placeholders (Figma only; in code the real file renders)
  lightbox-media-background-image: '{colors.color-fill-default}'
  lightbox-media-background-video: '{colors.color-fill-inverse}'
  lightbox-media-background-pdf: '{colors.color-fill-default}'
  lightbox-media-icon-foreground: '{colors.color-ink-low}'
  lightbox-media-icon-foreground-video: '{colors.color-ink-inverse}'
  lightbox-media-icon-size: '{icon.icon-size-large}'
  # file sheet (Kind = other)
  lightbox-unpreviewable-gap: '{space.space-md}'
  lightbox-unpreviewable-padding-x: '{space.space-xl}'
  lightbox-unpreviewable-padding-y: '{space.space-3xl}'
  lightbox-sheet-background: '{colors.color-fill-default}'
  lightbox-sheet-border-color: '{colors.color-line-default}'
  lightbox-sheet-border-width: '{stroke.stroke-thin}'
  lightbox-sheet-radius: '{radius.radius-element-md}'
  lightbox-sheet-icon-foreground: '{colors.color-ink-low}'
  lightbox-sheet-fold-size: '{space.space-lg}'
  lightbox-sheet-fold-background: '{colors.color-fill-faint}'
  lightbox-sheet-fold-border-color: '{colors.color-line-default}'
  lightbox-no-preview-foreground: '{colors.color-ink-medium}'
  lightbox-no-preview-font: '{typography.type-body-medium}'
  # scrim, motion
  lightbox-scrim-background: '{colors.color-fill-scrim}'
  lightbox-open-transition: '{motion.motion-spring}'
  lightbox-scrim-transition: '{motion.motion-smooth}'
  lightbox-paging-transition: '{component-sizes.size-lightbox-paging-transition}'
---

# Lightbox

> A full-size preview over the page that pages through a list of images, videos, PDFs and other files.

## Anatomy
1. Panel — the raised surface over the backdrop: `--lightbox-container-background`, a `--lightbox-container-border-width` `--lightbox-container-border-color` border, `--lightbox-container-shadow`, radius from Shape. `--lightbox-container-padding` inside, `--lightbox-container-gap` between toolbar and stage.
2. Toolbar — a row `--lightbox-toolbar-gap` apart:
   - Name — the item's name, its file's name or its URL; "Untitled" when none exists. `--lightbox-name-font`, `--lightbox-name-foreground`.
   - Counter — "{index} of {count}", shown only while paging through several items. `--lightbox-counter-font`, `--lightbox-counter-foreground`.
   - Actions — open in new (`open_in_new_window`), download (`download`) and close (`close`), each an [Icon Button](../atoms/icon-button.md) (subtle, `--lightbox-action-size` square), `--lightbox-actions-gap` apart. Open in new and download each sit behind their own property.
3. Stage — the media well: `--lightbox-stage-background`, radius from Shape, at least `--lightbox-stage-min-height` tall. A track of frames slides inside it, clipped; neighbouring frames stay mounted either side of the current one.
4. Navigation — previous (`chevron_left`) and next (`chevron_right`), [Icon Buttons](../atoms/icon-button.md) in the contrast flavour, `--lightbox-navigation-size` square, floating `--lightbox-navigation-inset` in from the stage's sides and vertically centred, so they read over any media.
5. Backdrop — a [Scrim](../atoms/scrim.md) in `--lightbox-scrim-background`.

## Variants
Kind is never set by hand: it comes from the item's MIME type or extension.

| Kind | Stage | Media |
|---|---|---|
| image (default) | `--lightbox-stage-padding-y-image` top and bottom | renders itself at its own ratio, up to `--lightbox-media-max-height` |
| video | no padding | fills the stage's width where it can; `--lightbox-media-max-height` contains it and the picture keeps its ratio inside the player |
| pdf | no padding | an embedded document, `--lightbox-media-max-height` tall |
| other | no padding | no preview: a drawn file sheet (see below) |

The Figma media is a placeholder (the library ships no images): `--lightbox-media-background-image` with an `image` [Icon](../atoms/icon.md) in `--lightbox-media-icon-foreground`; `--lightbox-media-background-video` with the icon in `--lightbox-media-icon-foreground-video`; `--lightbox-media-background-pdf` with a `document` icon. Placeholder icons are `--lightbox-media-icon-size`.

File sheet (Kind = other): a column `--lightbox-unpreviewable-gap` apart with `--lightbox-unpreviewable-padding-y` / `--lightbox-unpreviewable-padding-x` padding, holding a sheet (`--lightbox-sheet-background`, `--lightbox-sheet-border-width` `--lightbox-sheet-border-color`, `--lightbox-sheet-radius`) with a `document` icon in `--lightbox-sheet-icon-foreground` and a `--lightbox-sheet-fold-size` folded corner (`--lightbox-sheet-fold-background`, `--lightbox-sheet-fold-border-color`), above the text "No preview for this file" in `--lightbox-no-preview-font` `--lightbox-no-preview-foreground`.

Shape: rounded (default) → `--lightbox-container-radius-rounded` panel, `--lightbox-stage-radius-rounded` stage, rounded Icon Buttons, zeta-icons-round; sharp → `--lightbox-container-radius-sharp` and `--lightbox-stage-radius-sharp`, sharp Icon Buttons, zeta-icons-sharp. In the AAA modes the component is always sharp (DESIGN.md §5).

## States
| State | Trigger | What changes |
|---|---|---|
| open | an index is set on a closed lightbox | the backdrop fades in over `--lightbox-scrim-transition` and the panel springs up from the bottom over `--lightbox-open-transition`, the stage already at the current frame's height; the height never animates on open and the first frame never slides in |
| paging | previous / next, or the arrow keys | the track slides to the new frame and the stage's height follows, both over `--lightbox-paging-transition`; an interrupted page glides on to the new target instead of restarting |
| media sized | the current media reports its real size | the stage re-measures and eases to the true height over `--lightbox-paging-transition` |
| reduced motion | the OS preference | paging and height changes land instantly, whatever Animated says |
| closed | close, Escape or the backdrop | the lightbox unmounts; offscreen videos are already paused |

Paging is slower than the small controls because the frames are large and travel far: the slide reads as a scene change, not a flick. Use transitions, not keyed animations, so nothing remounts. The stage's height is always written as a measured length, never `auto` (which can't animate); measure again once the panel mounts and whenever media gains its real size, and arm the height and track transitions only after the first real measure or the first page. Pin the track to the stage: sized by its content, the tallest frame inflates it and every frame centres against the oversized box.

## Spacing & Sizing
| Part | Size | Padding / gap |
|---|---|---|
| Panel | `--lightbox-container-width` wide by default, overridable; never wider or taller than the viewport less `--lightbox-container-margin` each side | `--lightbox-container-padding`; `--lightbox-container-gap` toolbar to stage |
| Toolbar | hugs | `--lightbox-toolbar-gap`; actions `--lightbox-actions-gap` |
| Stage | fills the panel's width; height follows the current frame, minimum `--lightbox-stage-min-height` | `--lightbox-stage-padding-y-image` (image only) |
| Media | up to `--lightbox-media-max-height`, keeping its ratio | — |
| Toolbar actions, navigation | `--lightbox-action-size`, `--lightbox-navigation-size` | navigation inset `--lightbox-navigation-inset` |

Every colour is a semantic token, so all four modes work without overrides.

## Properties
| Property | Options | Default |
|---|---|---|
| Kind | image, video, pdf, other (derived, never set by hand) | image |
| Shape | rounded, sharp | rounded |
| Show open in new | on / off | on |
| Show download | on / off | on |
| Show navigation | on / off | on |
| Animated | on / off | on |
| Items | the list being previewed (code) | — |
| Name | text, from the item | "Untitled" |
| Counter | "{index} of {count}" | shown with several items |

Open in new and download disable themselves when the item has no URL. With a single item, navigation hides itself whatever Show navigation says.

## Usage
- Open the lightbox from the thing being previewed (a thumbnail, an attachment row) and return focus there when it closes.
- Pass every related item in one list, so previous, next and the arrow keys page through the set without reopening.
- Don't page by swapping frames. The track slides what is already mounted; remounting reloads media and flickers.
- Don't fix the stage's height or leave it `auto`: a fixed height crops tall media and `auto` can't animate.
- Use [Dialog](dialog.md) for a message; the lightbox is only for previewing content.

## Accessibility
- Backdrop, focus trap, Escape and scroll lock behave as in [Dialog](dialog.md): focus can't leave the panel while it is open.
- Previous and next are labelled buttons and the arrow keys page as well; with one item, navigation disappears entirely.
- Open in new and download disable themselves when the item has no URL, rather than failing silently.
- Reduced motion turns all sliding off; nothing is communicated by motion alone.
- The file sheet names the file and says "No preview for this file", so an unpreviewable item is still announced.
- A frame slid out of view pauses its video, so sound never continues behind another frame. Neighbouring frames stay mounted, so pause them explicitly.

## Claude Prompt
Draw a `--lightbox-container-width`-wide white preview panel (`--lightbox-container-background`) with a thin light grey `--lightbox-container-border-color` border, `--lightbox-container-radius-rounded` corners and a soft large shadow, over a dark translucent scrim. At the top a toolbar shows the file name in `--lightbox-name-font`, a grey "2 of 5" counter in `--lightbox-counter-font`, and three plain icon buttons at the right: open in new window, download and close. Below, a pale grey stage (`--lightbox-stage-background`, `--lightbox-stage-radius-rounded` corners) shows a photo centred at its own ratio, with two dark square arrow buttons floating at its left and right edges, vertically centred. For a file with no preview, the stage instead shows a white document sheet with a folded corner and a grey document icon above the grey text "No preview for this file".
