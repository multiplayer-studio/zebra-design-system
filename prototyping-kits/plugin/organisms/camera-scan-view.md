---
name: Camera Scan View
level: organism
status: draft
composes: [../organisms/bottom-sheet.md, ../molecules/input.md, ../atoms/icon-button.md, ../atoms/button.md, ../atoms/icon.md, ../atoms/progress-bar.md]
tokens:
  # container (the camera image fills it)
  camera-scan-view-container-background: '{colors.color-fill-canvas}'
  camera-scan-view-mask-background: '{colors.color-fill-scrim}'
  # top and bottom bars (controls stay at the edges)
  camera-scan-view-bar-padding-y: '{space.space-md}'
  camera-scan-view-bar-padding-x: '{space.space-lg}'
  camera-scan-view-bar-gap: '{space.space-md}'
  camera-scan-view-title-font: '{typography.type-title-medium}'
  camera-scan-view-title-foreground: '{colors.color-ink-high}'
  # frame (reticle)
  camera-scan-view-frame-width: '{primitives.scale-container-0}'
  camera-scan-view-frame-corner-length: '{space.space-xl}'
  camera-scan-view-frame-stroke-width: '{stroke.stroke-heavy}'
  camera-scan-view-frame-radius: '{radius.radius-container}'
  camera-scan-view-frame-color-searching: '{colors.color-ink-high}'  # the view is locked dark: white in dark, AAA dark and both Companion dark modes
  camera-scan-view-frame-color-found: '{colors.color-status-success-default}'
  camera-scan-view-frame-color-failed: '{colors.color-status-error-default}'
  camera-scan-view-frame-transition: '{motion.motion-fast}'
  camera-scan-view-frame-easing: '{motion.easing-out}'
  # guidance (short condition under the frame)
  camera-scan-view-guidance-background: '{colors.color-fill-inverse}'
  camera-scan-view-guidance-foreground: '{colors.color-ink-inverse}'
  camera-scan-view-guidance-font: '{typography.type-label-medium}'
  camera-scan-view-guidance-padding-y: '{space.space-2xs}'
  camera-scan-view-guidance-padding-x: '{space.space-md}'
  camera-scan-view-guidance-gap: '{space.space-2xs}'
  camera-scan-view-guidance-radius-rounded: '{radius.radius-pill}'
  camera-scan-view-guidance-offset: '{space.space-lg}'
  # code markers (multiple codes, result markers)
  camera-scan-view-marker-size: '{control.control-target-min}'
  camera-scan-view-marker-radius: '{radius.radius-pill}'
  camera-scan-view-marker-background: '{colors.color-fill-default}'
  camera-scan-view-marker-foreground: '{colors.color-ink-high}'
  camera-scan-view-marker-font: '{typography.type-label-medium}'
  camera-scan-view-marker-border-color: '{colors.color-line-default}'
  camera-scan-view-marker-border-width: '{stroke.stroke-thin}'
  camera-scan-view-marker-border-color-selected: '{colors.color-line-selection}'
  camera-scan-view-marker-border-width-selected: '{stroke.stroke-thick}'
  camera-scan-view-marker-background-selected: '{colors.color-fill-selection}'
  # running count (repeated reads)
  camera-scan-view-count-font: '{typography.type-title-large}'
  camera-scan-view-count-foreground: '{colors.color-ink-high}'
  # focus
  camera-scan-view-focus-ring-width: '{stroke.stroke-thick}'
  camera-scan-view-focus-ring-color: '{colors.color-line-focus}'
---

# Camera Scan View

> A full-screen camera viewfinder that reads barcodes or recognises items, shows what it is doing in a frame, lets the person choose among several codes, and returns results in a sheet over the captured image.

## Anatomy
1. Container — fills the screen. The live camera image covers it; `--camera-scan-view-container-background` shows only before the camera starts. Outside the frame, the image is dimmed by `--camera-scan-view-mask-background` so the frame reads at a glance. The centre stays clear: every control sits in the top or bottom bar ([patterns 9.71](../patterns/09-ai.md)).
2. Top bar — padded `--camera-scan-view-bar-padding-y` / `--camera-scan-view-bar-padding-x`, parts `--camera-scan-view-bar-gap` apart:
   - Cancel — an [Icon Button](../atoms/icon-button.md) (`close`), subtle, large, at the leading end. It leaves without a result and returns to the screen that asked.
   - Title — what to scan, as an instruction ("Scan the bin label"), `--camera-scan-view-title-font` `--camera-scan-view-title-foreground`.
   - Torch — an Icon Button toggle at the trailing end, `flash_off` when off and `flash_on` when on ([patterns 3.128](../patterns/03-controls-interaction.md)).
3. Frame — the reticle, `--camera-scan-view-frame-width` wide (draft placeholder), four corners `--camera-scan-view-frame-corner-length` long in `--camera-scan-view-frame-stroke-width` strokes with `--camera-scan-view-frame-radius` bends. Its colour and shape follow the frame state.
4. Guidance — a short condition under the frame, `--camera-scan-view-guidance-offset` below it: an [Icon](../atoms/icon.md) `--camera-scan-view-guidance-gap` before the words, `--camera-scan-view-guidance-font` `--camera-scan-view-guidance-foreground` on a `--camera-scan-view-guidance-background` pill (`--camera-scan-view-guidance-radius-rounded`), padded `--camera-scan-view-guidance-padding-y` / `--camera-scan-view-guidance-padding-x`. It states the condition ("Move closer"), not a command to tap ([patterns 9.72](../patterns/09-ai.md)).
5. Code markers (multiple, results) — one `--camera-scan-view-marker-size` circle (`--camera-scan-view-marker-radius`) per code or result on the image, `--camera-scan-view-marker-background` with a `--camera-scan-view-marker-border-width` `--camera-scan-view-marker-border-color` edge, numbered in `--camera-scan-view-marker-font` `--camera-scan-view-marker-foreground`. Each marker is a button.
6. Bottom bar — the same padding as the top bar:
   - Type instead — a [Button](../atoms/button.md), outline-contrast, with the `keyboard` icon: "Type the code". It opens an [Input](../molecules/input.md) in a sheet with the same validation as a scan ([patterns 3.111](../patterns/03-controls-interaction.md)).
   - Capture (visual recognition only) — a large Icon Button (`camera_shutter`) when the person, not the camera, decides the moment.
   - Running count (repeated reads) — "18 of 24" in `--camera-scan-view-count-font` `--camera-scan-view-count-foreground`, with a Done Button ([patterns 3.116](../patterns/03-controls-interaction.md)).
7. Checking — while a frozen capture is looked up, a [Progress Bar](../atoms/progress-bar.md), indeterminate, under the guidance, with Cancel kept in the top bar ([patterns 9.73](../patterns/09-ai.md)).
8. Result sheet — a [Bottom Sheet](bottom-sheet.md), generic, over the captured image: results most likely first, each tied to its marker on the image, so the person compares them with what they pointed at. Its footer holds Try again and the primary action ([patterns 9.74](../patterns/09-ai.md)).

## Variants
| Mode | Use | Behaviour |
|---|---|---|
| barcode (default) | reading barcodes and QR codes with the camera | continuous, the device's own behaviour; with one code in view it reads it, with several the person taps one ([patterns 3.128](../patterns/03-controls-interaction.md), [9.73](../patterns/09-ai.md)) |
| repeated | counting many codes in one session | each code counts once however often it's read; the running count shows against the expected total; Done ends it |
| recognition | recognising an item, label or document | the view freezes on a detection and gives the person a moment to cancel before anything is looked up ([patterns 9.73](../patterns/09-ai.md)) |

The view is locked to dark mode, like the [Global Header](global-header.md): it always renders with the `colors-dark` values, so its bars and guidance read over any image. Text over the image sits on the mask or the guidance pill, never on the bare image.

## States
| Frame state | Frame | Guidance (icon and words) | Notes |
|---|---|---|---|
| searching | `--camera-scan-view-frame-color-searching` corners | `barcode` "Point at a barcode"; or the condition: "Move closer", "Too dark, turn on the light" | default |
| found | `--camera-scan-view-frame-color-found`, the corners close to a full outline around the code | `check_circle` "Found" | the screen then shows what was captured and what happens next ([patterns 3.117](../patterns/03-controls-interaction.md)) |
| multiple | searching corners; a marker on each code | `info` "3 codes found. Tap the one you want" | a selected marker takes `--camera-scan-view-marker-border-width-selected` `--camera-scan-view-marker-border-color-selected` and `--camera-scan-view-marker-background-selected` |
| checking | the found outline holds over the frozen image | `info` "Checking" with the Progress Bar | Cancel stays available until the result shows |
| failed | `--camera-scan-view-frame-color-failed` corners | `error` "Can't read this code. Try a different angle, closer, or with more light" | Try again and Type the code both show ([patterns 9.75](../patterns/09-ai.md)) |
| wrong code | found outline | `warning` "This is a product code. Scan the bin label" | never silently accepted or dropped ([patterns 3.113](../patterns/03-controls-interaction.md)) |
| already scanned | found outline | `info` "Already scanned"; or the count goes up and says so | [patterns 3.114](../patterns/03-controls-interaction.md) |

Torch: off (`flash_off`, `aria-pressed="false"`) and on (`flash_on`, `aria-pressed="true"`). Markers: enabled, selected and focused (`--camera-scan-view-focus-ring-width` `--camera-scan-view-focus-ring-color` ring).

The frame moves between states over `--camera-scan-view-frame-transition` with `--camera-scan-view-frame-easing`. Under reduced motion the frame changes colour and outline without moving ([patterns 6.66](../patterns/06-accessibility.md)). A product rejecting a scan adds its own sound and vibration; it never repeats the device's read beep.

## Spacing & Sizing
Measurements are provisional: the component has no Figma source yet. `--camera-scan-view-frame-width` is a draft placeholder on the closest existing step.

| Part | Value |
|---|---|
| Top / bottom bar | `--camera-scan-view-bar-padding-y` / `--camera-scan-view-bar-padding-x`, `--camera-scan-view-bar-gap` between parts |
| Frame | `--camera-scan-view-frame-width` square (wider and shorter for 1D barcodes), centred; corners `--camera-scan-view-frame-corner-length`, `--camera-scan-view-frame-stroke-width` thick |
| Guidance | `--camera-scan-view-guidance-offset` below the frame; `--camera-scan-view-guidance-padding-y` / `--camera-scan-view-guidance-padding-x` |
| Marker | `--camera-scan-view-marker-size` across, at least the touch minimum |

The view fills the screen at every size class. Results use the Bottom Sheet's own sizing.

## Properties
| Property | Options | Default |
|---|---|---|
| Mode | barcode, repeated, recognition | barcode |
| Frame state | searching, found, multiple, checking, failed, wrong code, already scanned | searching |
| Title | text (the instruction) | — |
| Guidance | icon and text | per state |
| Torch | off / on; hidden where the device has no light | off |
| Type instead | on / off | on |
| Expected count | number (repeated) | — |
| Results | list, most likely first, each with its marker | — |

## Usage
- Open the camera only where the device has no scanner, or for recognition; a screen that expects a scan accepts the scanner without the person choosing a field ([patterns 3.110](../patterns/03-controls-interaction.md)).
- Keep the centre clear: no buttons, banners or text over the frame.
- Always offer typing. Keep Type the code on the view in every state, not only after a failure.
- With several codes in view, never pick one for the person; show a marker on each and let them tap.
- For recognition, freeze on a detection and give a moment to cancel before looking anything up.
- Show results over the captured image, most likely first, each tied to its marker. In a form, the chosen result returns to the field that asked for it ([patterns 9.74](../patterns/09-ai.md)).
- On no result or low confidence, say what would help (angle, distance, light) and offer Try again and typing ([patterns 9.75](../patterns/09-ai.md)).
- A field that opens this view carries the scan control at its trailing end ([patterns 3.46](../patterns/03-controls-interaction.md)).
- Composed parts (Icon Button, Button, Progress Bar, Bottom Sheet, Input) bring their own states, sizes and focus rings.

## Accessibility
- The view is a dialog named by its title; Cancel and the system Back both leave it, and focus returns to the control that opened it.
- Guidance is a polite live region, so each change of condition is read out ("Move closer", "Found"). The frame state is always in words and an icon, never colour alone.
- Markers are buttons named for what they hold ("Code 2, 0012 3456 7890"); the selected one carries `aria-pressed`.
- The torch is a toggle button named "Light" with `aria-pressed`.
- Typing is always reachable without the camera, for people who can't aim it.
- The running count is announced as it changes ("19 of 24").
- Every control meets the touch minimum; Cancel and Torch are large because they sit at the screen's corners ([patterns 6.19](../patterns/06-accessibility.md)).

## Claude Prompt
Draw a full-screen, dark-mode phone camera view of a warehouse shelf, the image dimmed outside a centred square frame (`--camera-scan-view-mask-background`). The frame is four white rounded corner brackets (`--camera-scan-view-frame-color-searching`), `--camera-scan-view-frame-stroke-width` thick. At the top, a close icon button on the left, the instruction "Scan the bin label" in white `--camera-scan-view-title-font`, and a light (flash) toggle icon button on the right. Under the frame, a dark pill (`--camera-scan-view-guidance-background`) with a small barcode icon and "Move closer" in `--camera-scan-view-guidance-font`. At the bottom, an outline-contrast button with a keyboard icon reading "Type the code". In a second frame, the corners have closed into a green outline (`--camera-scan-view-frame-color-found`) and a white sheet rises from the bottom over the frozen image, listing the found item with a "Try again" outline button and a primary "Use this" button.
