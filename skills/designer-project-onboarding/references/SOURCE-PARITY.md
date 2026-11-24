# Building to match a source

For a project that starts from a Figma design, a codebase or both, **when
the designer chose to match its look** (`look: match` in `PROJECT.md`, asked
after a quick look at the source in `designer-project-onboarding` step 3). Used by
`designer-project-onboarding` and `designer-prototype`.

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

The source is read **once** and saved. Every check after that is one
command.

### Save the reference, once per screen

Before building a screen, save what the source measures as
`zebra-context/parity/<screen>.json`, one file per screen, width and mode.
Name each part of the screen (`header`, `filters`, `orders-table`,
`new-order`) and give it the values the source has:

```json
{
  "source": "<frame link, address or file>",
  "width": 1440,
  "scheme": "light",
  "order": ["header", "title", "new-order", "orders-table"],
  "parts": {
    "header": { "parent": null, "height": 64, "paddingLeft": 24, "backgroundColor": "#192222" },
    "title": { "parent": "header", "fontFamily": "Inter", "fontSize": 20, "fontWeight": 600, "text": "Orders" }
  }
}
```

List only the values the source states. A value left out isn't checked. The
names of the values are the ones `scripts/measure.js` returns: position and
size, padding, gaps, font, colours, borders, corners, shadow, and the words.

| Source | Where the values come from |
|---|---|
| Figma | each frame's node values, as `FIDELITY.md` steps 1 and 2 read them. Keep the frame's screenshot beside the file |
| A codebase running or deployed at an address the context names | measure it: `node "<this skill's folder>/scripts/parity.mjs" --capture --page=<address> --map=<map.json> --out=zebra-context/parity/<screen>.json --shot=<png>`, where the map names each part and its selector |
| A codebase with only its code | the values read from its theme, styles, layout and markup, written into the file by hand |
| Both | the Figma design for the look, the code for structure and behaviour the design doesn't draw |

Never install the project, run its build or start it to get a reference.
With only the code to go on, say in the report that the check was by value,
not by picture.

A reference is reused by every later prototype of the same screen. Save it
again only when the source has moved.

### Mark the parts as you build

Give each part of the build the same name, as `data-parity="<name>"`. On a
Design System component whose look is drawn inside it, add
`data-parity-inner="<selector>"` to measure that inner element.

### The loop

1. **Run the check.** It renders the build at the reference's width,
   measures every marked part, takes a screenshot and lists every gap: a
   part missing, extra, moved or nested differently, and every value that
   differs, with by how much.

   ```bash
   node "<this skill's folder>/scripts/parity.mjs" zebra-context/parity/<screen>.json --page=<the build> --shot=<png>
   ```

   It needs a browser. If it says there is none, evaluate
   `scripts/measure.js` in the page with the browser tool you have, save
   what it returns, and pass it as `--measured=<file>`.
2. **Fix every gap** it lists, all of them in one go, by the ladder in
   section 1: a variant, a style change, or a part built to match.
3. **Run the check again.** Repeat until it prints "No gap".
4. **Then look, once.** Put the build's screenshot beside the source's and
   look at each region for what measuring misses: alignment, balance,
   clipping, an image's crop, a part nobody named. Fix what you see, and run
   the check a last time.

Don't compare by eye before the check is clean, and don't read values out of
the page by hand: the script does both faster.

Stop after three rounds of fixing if gaps remain, and report each one that
is left with the reason it couldn't be closed.

A difference of a pixel from text rendering is not a gap, and the check
allows for it. Anything a person would notice at normal size is.

Get one width and mode clean first. Then run the check once for each other
width and mode the source has (`--width`, `--scheme=dark`,
`--attr=data-theme=dark`) and fix what it lists. Do the same for each state
the source shows. Don't invent a mode or a width the source doesn't draw.

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
- **Parity:** that no gap is left, or each gap that is left and why;
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
