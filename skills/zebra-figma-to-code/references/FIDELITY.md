# Matching a Figma reference

Used by `zebra-figma-to-code` and `zebra-prototype` whenever a build has a
Figma design to follow. The reference is the look. The system supplies the
parts and the names. The patterns supply only what the reference doesn't draw.

## What wins

| Question | Answer comes from |
|---|---|
| Which component, and which variant of it | the frame |
| Padding, gap, size and alignment | the frame |
| The text style of each piece of text | the frame |
| Colour, border, divider, radius, shadow | the frame |
| Hover, focus, pressed, loading, empty, error, motion | the frame if it draws them, else the patterns |
| A width or mode the file doesn't draw | the patterns and the project's context |
| Accessibility minimums | the patterns, always |

A project context's density, shape and pattern defaults describe the product
in general. They never restyle a frame that draws something else. Where the
two disagree, that is a deviation to raise (below), not a reason to change
the frame.

## 1. Read every frame as data

Never build from the screenshot alone. For each frame you will build, with
the Figma tools:

- take its screenshot, and keep it for the comparison in step 4;
- read its node tree: every instance, text node, auto-layout container and
  bound variable;
- read nested instances too. An instance inside an instance can carry its
  own overrides (a repainted icon, a swapped label style).

A large frame is read in sections. Don't stop at the first level because the
response was long.

## 2. Write the inventory before any markup

One table per frame, in your working notes. Nothing is built until every row
is filled.

| Read from Figma | Record | Maps to |
|---|---|---|
| Each component instance | its name and every variant property as set: flavour, size, shape, state, icon, with or without label | the installed component with the same properties |
| Each text node | its text style name, and its size, line height, weight | the text token with those exact values |
| Each auto-layout container | direction, padding on each side, gap, alignment, fixed or fill or hug on each axis | the spacing tokens with those exact values |
| Each fill, stroke and effect | the variable bound to it, or the raw value | the semantic token |
| Each divider and border | where it sits and its weight | the Divider component or a scoped border |
| The frame | its width and height, and its mode | the width you build and check at |

Rules for the mapping:

- **Variants as set.** A Medium button in the frame is a medium button, even
  when the project's density or the component's default says otherwise. Set
  every property the frame sets. Don't rely on a default you haven't checked.
- **Exact values only.** A 12 gap maps to the token that is 12. A value with
  no exact token keeps Figma's value, in one named custom property at the top
  of the page's styles, and is listed as a deviation. Never round to the
  nearest step.
- **Text styles by value.** Match size, line height and weight together. A
  style one step up or down is a different style.
- **No extras.** Don't add a header, a card, an icon, a divider, a shadow or
  helper text the frame doesn't have. Don't drop one it has.
- **Local parts are composed.** A part that isn't a library component is
  built from library components and tokens, to the frame's own measurements.

## 3. Raise the obvious deviations before building

A deviation is anywhere the build can't be both the frame and the system.
Collect them from the inventory. One is **obvious** when a reviewer would see
it without measuring:

- the frame uses a component or variant the library doesn't have;
- a text style has no token with its values;
- spacing or a size is off the scale by more than 4;
- a colour has no token, or is bound to another library;
- the frame disagrees with the project's context: its shape, density, mode
  or shell;
- two frames draw the same part differently;
- the frame breaks an accessibility minimum, or a pattern rule that doesn't
  start "By default".

Show the obvious ones to the designer with the question prompt, before
building the part they affect. Never pick silently.

- One question per deviation. Say what the frame has and what the system has,
  with the values: "The filter chips are 28 tall. Zebra's smallest chip is 32."
- Two or three options, your recommendation first: **Match the design** (what
  it costs: a page-scoped override, reported as a gap), **Use the system**
  (what will look different), and a third only when there is a real one.
- Up to four questions in one dialog. Group the same deviation across frames
  into one question. If there are more than four, ask the four most visible
  and build the rest as designed.
- An accessibility minimum is not offered as a choice. Build to the minimum,
  and tell the designer what changed and why.

Everything smaller is built as designed and listed in the report.

Record each answer in the project's `zebra-context/PROJECT.md` Decisions when
there is a context, so the next build doesn't ask again.

## 4. Compare, by measurement

Render the result at the frame's width and mode, and take a screenshot.

1. Put it beside the frame's screenshot. Look at each region in turn: the
   header, each section, each row, the footer.
2. Measure in the browser what the eye can't judge. For each row of the
   inventory, read the rendered box and computed style: height and width of
   each component, the padding and gap of each container, the font size,
   line height and weight of each text.
3. Fix every difference that isn't an agreed deviation, then compare again.

Don't hand over on the first render. A build that hasn't been compared isn't
finished.

## 5. Report

After the usual report, add:

- **Matched:** the frames built, and the width and mode each was checked at;
- **Decided:** each deviation asked, and the designer's answer;
- **As designed, off-system:** each value kept from Figma with no token;
- **Still different:** anything that doesn't match and why.
