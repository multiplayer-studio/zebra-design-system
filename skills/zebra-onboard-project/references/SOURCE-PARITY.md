# Building to match a source

For a project that starts from a Figma design, a codebase or both, **when
the designer chose to match its look** (`look: match` in `PROJECT.md`, asked
after the review in `zebra-onboard-project` step 5). Used by
`zebra-onboard-project` and `zebra-prototype`.

It doesn't apply to a free exploration. With `look: design-system`, only
section 5 applies (don't make anything up): the build uses the Design
System's parts as they come.

## The goal: the same thing, 1:1

The build is the source, reproduced. Someone who puts the two side by side
sees no difference, in how it looks and in how it is put together.

- **Visual parity:** every colour, font, size, weight, spacing, corner,
  border, shadow, icon size and state looks the same.
- **Architectural parity:** the same screens, the same regions in the same
  order, the same hierarchy and nesting, the same navigation, the same
  states and the same words.

**Parity comes before using the Design System's parts.** A Design System
part is used only where it reproduces the source exactly. Where it doesn't,
the source wins, and the part is changed or built to match. There is no
limit on how many parts are changed or built for the project.

**No questions on the way.** Once the designer has chosen to match, don't
stop to ask about choices, deviations, limits or preferences. Decide for
parity, keep going, and report at the end. The only time to ask is section
5, where there is nothing to match against.

## 1. Build each part to match

Use the first of these that gives an exact match:

1. **The Design System's component**, set to the variant the source draws,
   when it then looks and behaves the same.
2. **The Design System's component with style changes** kept in the
   project, through the component's own custom properties and parts. Never
   edit the library.
3. **A component built in the project**, from the Design System's tokens
   where their values match and the source's own values where they don't,
   to the source's measurements.

Don't settle for step 1 or 2 when the result is only close. Close is a gap.

Colours and the font go in the project's theme (`THEME.md`). A value with no
exact token keeps the source's value, as one named custom property.

Keep a list while you build: every part that needed step 2 (**adjusted**)
or step 3 (**custom**), and what was different about it. It goes in the
report and in `COMPONENTS.md`. It is not a question.

### The overrides file

Keep every style change in one file, `zebra-context/overrides.css`, so each
prototype of the project gets the same look:

- load it after the Design System's styles and after `theme.css`;
- scope every rule under the project's class (`.ext-<project>`), so nothing
  leaks into a page that doesn't carry it;
- change a part through its own custom properties and parts. Never reach
  into a part's inside with selectors it doesn't offer: build the part for
  the project instead (step 3);
- use a token where one has the value, and the source's own value where
  none does, named as a custom property at the top of the file;
- put a one-line comment above each rule saying what it matches ("Buttons:
  shorter, as in the app").

A later prototype reuses the file and adds to it. It never starts a second
one.

## 2. Check parity against the source, and fix the gaps yourself

Run this after every build that matches a source. It is automatic: find the
gaps, fix them, check again. Don't ask the designer about a gap you can
close.

**What to compare against**

| Source | The reference is |
|---|---|
| Figma | each frame's screenshot, and its node values (sizes, gaps, padding, text styles, fills, strokes, effects), as `FIDELITY.md` steps 1 and 2 read them |
| Codebase | the app's screens, from the first that exists: a running or deployed address the context names; screenshots kept in the repo; else the values read from its code (theme, styles, layout and markup) |
| Both | the Figma design for the look, the code for structure and behaviour the design doesn't draw |

Never install the project, run its build or start it to get a reference.
With only the code to go on, compare values, and say in the report that the
check was by value, not by picture.

**The loop**

1. **Render** the build at the reference's width, mode and state. Take a
   screenshot.
2. **Compare the structure:** the same regions, in the same order and
   nesting, with the same parts in each. Anything missing, extra or moved is
   a gap.
3. **Compare by measurement,** region by region: read each part's box and
   computed style in the browser and set it against the reference. Position
   and size, padding and gaps, font family, size, line height and weight,
   every colour, corner radius, borders, shadows, icon sizes, and each state
   the source shows.
4. **Compare by eye:** put the two pictures side by side and look at each
   region in turn for what measuring misses: alignment, balance, clipping,
   an image's crop.
5. **List every gap** with where it is and by how much.
6. **Fix every gap,** by the ladder in section 1: a variant, a style change,
   or a part built to match. Then go back to step 1.

Stop when a round finds no gap. Stop after five rounds if gaps remain, and
report each one that is left with the reason it couldn't be closed.

A difference of a pixel from text rendering is not a gap. Anything a person
would notice at normal size is.

Check every screen and state you built, at each width and in each mode the
source has. Don't invent a mode or a width the source doesn't draw.

## 3. What is decided without asking

| Case | Do this, and report it |
|---|---|
| The Design System's part differs from the source | Match the source |
| Many parts need building for the project | Build them. There is no limit |
| A value has no token | Keep the source's value |
| The source departs from a pattern default | Follow the source |
| Two places in the source disagree | Follow the one the source uses most, and note the other |
| Something can't be reproduced exactly (a font that won't load, an effect the browser can't draw) | Use the closest thing that can, and say what and why |
| The source breaks an accessibility minimum | Keep the minimum at the smallest change that meets it, and say what differs |

## 4. Report, don't ask

After the parity check, tell the designer in a few plain lines:

- **Matched:** the screens built, and what each was checked against;
- **Parity:** how many rounds the check took, and that no gap is left, or
  each gap that is left and why;
- **Built for this project:** the parts that were adjusted or custom, one
  line each ("Filter chips: built for this project, shorter than the Design
  System's");
- **Decided for you:** anything from section 3;
- **Sample data:** anything made up under section 5.

Record each adjusted and custom part in `COMPONENTS.md`. Don't ask whether to
switch them to the Design System's versions. If the designer later asks for
that, replace them, remove their rules from `overrides.css`, and set
`look: design-system`.

## 5. Don't make anything up

Reproduce only what the source shows:

- **No new functionality.** No extra screens, actions, filters, menus,
  states or steps. A control the source draws does what the source shows it
  doing, and no more. The states every component already has (hover, focus,
  pressed, disabled) are not new functionality.
- **No new data.** Use the source's own names, numbers, rows, dates and
  pictures, in the amounts it shows.
- **No new words.** Copy is the source's, word for word.

The one question left is a codebase whose screens fill in from live data
you can't reach. There is nothing to match, so don't guess. Ask:

- "This screen fills in from live data I can't see. Should I make up sample
  data?" (**Make up sample data** / **I'll give you the data** / **Leave it
  empty**)

Made-up data is marked as sample in the report.
