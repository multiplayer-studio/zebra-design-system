# Building from a source

For a project that starts from a Figma design, a codebase or both, **when
the designer chose to match its look** (`look: match` in `PROJECT.md`,
asked after the review in `zebra-onboard-project` step 5). Used by
`zebra-onboard-project` and `zebra-prototype`.

It doesn't apply to a free exploration. With `look: design-system`, only
section 4 applies (don't make anything up): the build uses the Design
System's parts as they come.

The source is what the designer already has. The first build shows it back
to them as it is, made from the Design System wherever that is possible.
Moving closer to the Design System is their choice, and it comes after.

## 1. The first build matches the source

Build the first layout strictly from the source: its spacing, its fonts, its
components and their variants, its colours and its words. Don't tidy it,
improve it or bring it into line.

Match each part with the first of these that works:

1. **The Design System's component**, set to the variant the source draws.
2. **The Design System's component with a style change** kept in the
   project: its spacing, corners, type or colour, through the component's
   own custom properties and parts. Never edit the library.
3. **A custom component built in the project**, from the Design System's
   tokens, to the source's own measurements.

A font the source uses goes in the project's theme (`THEME.md`). Spacing with
no exact token keeps the source's value, as `FIDELITY.md` says.

### The look and feel, as closely as possible

Matching is more than the parts. Compare the build with the source and
close every difference a person would notice:

- colours of surfaces, text, borders and each state;
- the font, its sizes, weights and line heights;
- corner rounding, borders, dividers and shadows;
- spacing inside parts and between them, and how dense the screen feels;
- the height and width of controls, and icon sizes;
- hover, focus, pressed and selected looks, where the source shows them.

Colours and the font belong in the theme. Everything else that differs goes
in the overrides.

### The overrides file

Keep every style change in one file, `zebra-context/overrides.css`, so each
prototype of the project gets the same look:

- load it after the Design System's styles and after `theme.css`;
- scope every rule under the project's class (`.ext-<project>`), so nothing
  leaks into a page that doesn't carry it;
- change a part through its own custom properties and parts. Never edit the
  library, and never reach into a part's inside with selectors it doesn't
  offer;
- use a token where one has the value, and the source's own value where
  none does, named as a custom property at the top of the file;
- put a one-line comment above each rule saying what it matches ("Buttons:
  shorter, as in the app");
- an accessibility minimum is never overridden. Where the source's look
  breaks one, keep the minimum and tell the designer.

A later prototype reuses the file and adds to it. It never starts a second
one.

Keep a list while you build: every part that needed step 2 (**adjusted**) or
step 3 (**custom**), and what was different about it.

## 2. Keep custom components under 20%

Count the distinct components on the screens you are building. Fewer than
one in five may be custom (step 3). Adjusted components don't count.

When the source needs more than that, stop before building and ask. Name
the parts you would swap for the Design System's closest component, least
noticeable first, until the count is under the limit:

- "This design needs <n> parts the Design System doesn't have. I can build
  <m> of them to match. Which should use the Design System's version
  instead?" Offer your suggestion first (**Swap the ones you suggest**),
  then **Let me choose**.

## 3. Ask when something can't be matched

Ask the designer, before building that part, whenever the source can't be
matched by any of the three steps: a font that can't be loaded, a part that
can't be read from the source, an effect the browser can't draw, two places
in the source that disagree. Say what the source has, what you can do
instead, and let them pick. An accessibility minimum is never a choice:
build to it and say what changed.

Everything that can be matched is matched without asking.

## 4. Don't make anything up

Unless the designer asks for it, reproduce only what the source shows:

- **No new functionality.** No extra screens, actions, filters, menus,
  states or steps. A control the source draws does what the source shows it
  doing, and no more. The states every component already has (hover, focus,
  pressed, disabled) are not new functionality.
- **No new data.** Use the source's own names, numbers, rows, dates and
  pictures, in the amounts it shows.
- **No new words.** Copy is the source's, word for word.

The one exception is a codebase whose screens fill in from live data you
can't reach. Don't guess. Ask:

- "This screen fills in from live data I can't see. Should I make up sample
  data?" (**Make up sample data** / **I'll give you the data** / **Leave it
  empty**)

Made-up data is marked as sample in the hand-over.

## 5. After the first build, offer the Design System

Once the first build is checked against the source, ask one question. Put
the summary inside the dialog, not in the reply (see Talking with the
designer in the skill):

- The question: "I matched <the design / the app>. <n> of <total> parts
  needed changes to do it. Do you want to switch them to the Design System's
  own versions?"
- In the dialog, the list: each adjusted or custom part in one plain line,
  such as "Filter chips: made shorter, 28 instead of 32" or "Date range
  picker: built for this project, the Design System doesn't have one".
- The options: **Switch to the Design System** (says what will look
  different) / **Keep them as they are**.

Then:

- **Switch:** replace every adjusted and custom part with the Design
  System's component as it comes, take out the style changes, check the
  build again and show what changed. A part the Design System has nothing
  for stays custom, and is recorded as a request.
- **Keep:** go on as it is. Later screens of this project match the source
  the same way.

On **Switch**, also empty `zebra-context/overrides.css` of the rules for the
parts that were switched, and set `look: design-system`.

Record the answer in `PROJECT.md` (`adjusted-components`, and a line in
Decisions), and each part in `COMPONENTS.md` as adjusted or custom. Never
ask again for this project unless the designer brings it up, or a later
screen needs a custom part that takes the project over the limit.
