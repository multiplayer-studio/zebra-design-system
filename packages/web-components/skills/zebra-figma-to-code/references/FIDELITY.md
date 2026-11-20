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

- take its screenshot, and keep it for the comparison in step 5;
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
| Each image, logo and illustration | the node, its drawn size, how it is cropped or fitted, its corner radius, and which kind it is (step 3) | a file in the build's assets, never a stand-in |
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
- **Pictures stay pictures.** A photo, a logo or an illustration in the frame
  is brought into the build (step 3). It is never replaced by an icon,
  initials, a grey box or a picture from somewhere else.
- **No extras.** Don't add a header, a card, an icon, a divider, a shadow or
  helper text the frame doesn't have. Don't drop one it has.
- **Local parts are composed.** A part that isn't a library component is
  built from library components and tokens, to the frame's own measurements.

## 3. Bring the pictures over

Sort every picture in the frame into one of four kinds, then fetch it with
the Figma tools. One asset call covers one node and a limited number of
pictures, so call it per section, not once for the page.

| Kind | Examples | Bring it over as |
|---|---|---|
| **Photo** | a product, a face, a place, a screenshot | the original image file, in its own format |
| **Logo** | a brand or product mark | SVG |
| **Illustration** | an empty-state drawing, a hero graphic, a diagram | SVG |
| **Icon** | any small, simple glyph on a control, a row, a tab or a status | a glyph from the system's icon set. Never a file from Figma |

Tell an illustration from an icon by what it is made of, not by its size:

- an **illustration** is a complex vector picture: several groups, several
  colours and many shapes, drawn as a scene or an object;
- an **icon** is one simple glyph, in one colour, that stands for an action,
  an object or a status.

Anything that is one simple glyph is an icon, even when the frame draws it
large. Only photos, logos and illustrations are fetched.

Save the files in an `assets/` folder beside the page (in an application,
wherever the project keeps its images). Name each for what it shows:
`product-handheld.jpg`, `avatar-driver.jpg`, `logo-acme.svg`,
`empty-orders.svg`. Download as soon as you have the links: they expire.
Never point the page at a Figma link.

**Photos**

- Use the original image, with the extension of its real format.
- Draw it at the frame's size, with the same crop: `object-fit` and
  `object-position` for how Figma fits it, the frame's corner radius, and
  explicit width and height so nothing jumps while it loads.
- A photo inside a component goes into that component: a face is the
  avatar's image, a product picture is the card's media.
- Give it alternative text that says what it shows, or mark it decorative
  when the text beside it already does.
- Where the frame crops, masks or overlays the photo in a way CSS can't
  reproduce, export that node as a picture at twice its drawn size instead.
- An original much larger than it is drawn is exported at twice its drawn
  size, so the page stays light.

**Logos and illustrations**

- Get the SVG and put it **inline in the markup**, not in an image tag, so
  the build can change it.
- Keep its `viewBox`. Take off the fixed width and height and size it from
  the layout.
- Give its main groups plain names (`id` or `class`): the figure, the
  background, the accent. That is what makes it workable later.
- A fill or stroke bound to a variable in Figma becomes the matching
  semantic token, so the illustration follows the theme and the mode. A
  colour that is the artwork's own stays as it is.
- A logo is never recoloured, redrawn or simplified. If the file draws a
  separate version for dark, bring both and switch by mode.
- A decorative illustration is hidden from assistive technology. One that
  carries meaning gets a title.
- An illustration too complex to come out as SVG (it arrives as a picture,
  or as thousands of paths) is brought as an image, and listed in the
  report as not editable.

**Icons**

Icons are never imported from Figma, as SVG or as a picture. Every icon in
the frame is a glyph from the system's icon set, by name:

- the same glyph, when the set has it;
- otherwise the closest one: the same meaning first, then the nearest shape.
  Keep the frame's size, colour and filled or outlined style.

List each icon that was replaced by a closest match in the report, with the
Figma name and the glyph used. Ask the designer only when nothing in the set
carries the meaning.

Don't turn a photo, a logo or an illustration into an icon.

**When a picture can't be fetched**

Say which one and why, and ask the designer for the file or the go-ahead to
use a stand-in. Never fill the space silently. A stand-in that was agreed is
listed in the report.

## 4. Raise the obvious deviations before building

**In a prototype, match first.** `zebra-prototype` follows
`SOURCE-PARITY.md` in the `zebra-onboard-project` skill: each deviation
below is built as the frame draws it, with a style change or a custom part
kept in the project, and they are all put to the designer in one question
after the first build. Ask before building only what can't be matched. The
rest of this step is for application code.

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

## 5. Compare, by measurement

Render the result at the frame's width and mode, and take a screenshot.

1. Put it beside the frame's screenshot. Look at each region in turn: the
   header, each section, each row, the footer.
2. Measure in the browser what the eye can't judge. For each row of the
   inventory, read the rendered box and computed style: height and width of
   each component, the padding and gap of each container, the font size,
   line height and weight of each text.
3. Check every picture loaded, at the frame's size and crop, and that none
   was swapped for an icon or a placeholder.
4. Fix every difference that isn't an agreed deviation, then compare again.

Don't hand over on the first render. A build that hasn't been compared isn't
finished.

## 6. Report

After the usual report, add:

- **Matched:** the frames built, and the width and mode each was checked at;
- **Decided:** each deviation asked, and the designer's answer;
- **Pictures:** each file brought over and where it is used, any stand-in,
  and any illustration that isn't editable;
- **Icons replaced:** each Figma icon with no exact glyph, and the closest
  glyph used;
- **As designed, off-system:** each value kept from Figma with no token;
- **Still different:** anything that doesn't match and why.
