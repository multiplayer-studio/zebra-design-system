# Building off-system

For a project whose `zebra-context/PROJECT.md` says `level: off-system`. Its
prototypes are built with the source's own component library and values, not
with Zebra components and tokens.

## What it gives up

Tell the designer this before they choose off-system, in plain words:

- The prototypes won't look or behave like Zebra products, and don't change when the design system updates.
- Nothing from them becomes a project theme, and no component or token requests go to the design system.
- Components the library doesn't provide are built by hand from the design. They are approximations, checked only against the frames or screens you were given.

## What still applies

Off-system lifts only the rules that make a prototype use Zebra's parts:
Zebra components, Zebra tokens and Zebra icons.

Everything else still applies:

- The UX patterns: how screens are composed, navigated and worded, their states and feedback, and sizes. Apply each rule to the library's equivalent, by the meaning in the patterns' `terms.md`.
- Where the library's own guidelines disagree with a pattern that starts "By default", follow the library and say so.
- **The patterns' accessibility minimums always apply.** A library's guideline never lowers one.
- The project's context: its modes, shape, density, surfaces and special treatments.
- No raw values in markup or component styles. Every value is one of the project's own tokens (step 2).
- Real copy, and saying what is faked.

Never mix Zebra components into an off-system prototype.

## 1. The library

Use the published library when it has a build a browser can load directly:

- Load it from a public CDN, pinned to an exact version. Record the library, version and URLs under `library` in `PROJECT.md`.
- Use the version the project uses: the Figma library's stated version, or the repo's lockfile. Otherwise the latest stable one.
- Never install anything from the project, run its build, or ask the designer to.
- If the library only ships in a form that needs a build step, it isn't reachable. Build its components by hand (step 3).
- Open a test page before building on it. If the library doesn't render there, build by hand and tell the designer.

Tell the designer which case applies before you build: "Material Web 2.4.0
loads from a CDN, so its buttons, fields and dialogs are the real ones. Its
date picker isn't in that build, so I'll build that by hand from your design."

## 2. The project's tokens

Write the source's values once in `zebra-context/tokens.css`, as custom
properties named after the source's own names, so each traces back to where
it came from. Use one block per mode the project has. A library that reads
its own custom properties gets its theme set through them.

## 3. Hand-built components

A component the library can't supply is built once, in
`zebra-context/components.css`, and reused by every prototype of the
project. A second, slightly different copy of the same component is a defect.

**Before building one, read `zebra-context/COMPONENTS.md`.** If the
component is there, use it as it is. If it needs a new variant or state, add
that to the shared component, never to one prototype.

To build one:

1. Read it from the Figma data or the repo's source: its anatomy, every variant and size drawn, and each state.
2. Name its class after the source's own component name. Style it only with the project's tokens.
3. Build every variant and state the source has, plus a visible keyboard focus and a disabled state if it draws none. Make it keyboard reachable, with the right role and name.
4. Add its row to `COMPONENTS.md`, with Match set to hand-built and, in Notes, the date, the variants, the states, and everything you guessed.

## 4. Report

After every build, tell the designer as a table: each component, and whether
it came from the library, was built by hand for this prototype, or was built
by hand earlier and reused. Then list what was guessed, anything faked, and
each place the library's guidelines overrode a pattern default.
