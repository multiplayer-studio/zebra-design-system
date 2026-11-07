# Where the rebuild goes, and how it's laid out

## Placement (ask the user once, before building)

Ask with AskUserQuestion, one question, and name the screens it covers:

- **Beside the original** — each rebuilt screen sits to the right of its source (or below it when that spot is
  taken), in the same container. Best for one or two screens.
- **New "Rebuild" section** — one section below the source, holding every rebuilt screen in the same relative
  layout as the original, plus its annotations and the Local components row. Best for flows and sections.
- **Existing "Rebuild" section** — list the ones `inventory.js` found (name and id); the screens are added below
  what it already holds, and it grows to fit.

Recommend "New section" when the source is a section or holds more than two screens, "Beside" for a single
screen. Then run `scripts/place.js` with the answer. It returns the target frame for each source screen and,
for sections, the offset from the source layout to the rebuild layout.

## Inside a Rebuild section

The section is filled with `surface/page`. Keep the original's arrangement so the flow reads the same:
rows stay rows, branches stay below their stage. Carry the source's annotations across, re-made in Zebra
styles, at the same offset:

| Annotation in the source | In the rebuild |
|---|---|
| Stage or step heading above a column of screens | Frame "Stage · N · Title": auto-layout vertical, gap `space/sm`; title `heading/medium` in `foreground/primary` ("N · Title"); description `body/medium` in `foreground/secondary` |
| Arrow between screens | Frame "Flow · N → M": the arrow drawn as a vector, stroke bound to `border/strong` at `stroke/thick` |
| Branch label under a row ("Error · …") | Text "Branch · …": `title/large` in `foreground/secondary`, prefixed "↳ " |
| Sticky notes, comments, design notes | Text in `body/medium`, `foreground/secondary`, with the same wording |

If the source has no labels, add a stage label per row only when the screens clearly form steps of a flow, and
keep the wording to what the screen names already say.

Below all screens, when you made local pattern components:

- **"Components header"** frame: `heading/medium` "Local components", and a one-line `body/medium` description
  in `foreground/secondary`: "Pattern-level building blocks used by the screens above, each composed from Zebra
  Design System components, variables and text styles."
- The local components in one row under it, ordered as they appear top-to-bottom in the screens, gap 120.

## Inside each rebuilt screen

- Same frame size and name as the source. Fill it with the token that matches the source's background colour
  (a white app background is `surface/section`; `surface/page` is light grey).
- Rebuild with auto-layout even where the source used absolute positioning, so the screen stays editable. Keep
  absolute positioning only for things that genuinely float: toasts, overlays, scrims, badges on avatars.
- Composite states (a base screen with a scrim and a dialog on top, as old files often do): when two or more
  states share the same base, make the base a local component (`<Screen> Base`) and stack the scrim and the
  Zebra Dialog on an instance of it, exactly as the source stacks them. Otherwise rebuild the base in the frame.
- Name layers by role ("Page header", "Printer list"), not "Frame 12".
