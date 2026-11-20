---
name: zebra-handoff
description: Hand a finished Zebra prototype to developers as a build spec. Compares the prototype page with its last handoff, confirms in one short dialog what's going in, then writes a markdown spec of every change (each component with its props, every token, state, behaviour, surface and mode), named as the library the app is built with names them, that a developer's AI builds from exactly. Use when a designer says a prototype is ready for developers, or asks for a handoff, dev spec or build spec. Sets up the project's handoff the first time.
---

# Hand a prototype off to developers

One job: everything that changed in a prototype since its last handoff,
written so completely that a developer gives the spec to their AI in the
app's codebase and gets it built as designed, with the installed Zebra
library.

The designer runs this when the design is done. Reviewing the design
happened while it was built (`zebra-prototype`); here you spec what's there.
You do every step. The first time, the project's handoff setup asks a
question or two; after that, there is one confirmation (step 4).

Every question goes through the question prompt (the AskUserQuestion tool
where there is one), as options to pick. Never type a list of questions into
the reply.

## Rules

- **The prototype is the only source.** Every component, value, word and
  behaviour comes out of the page. Nothing invented, nothing "improved",
  nothing normalised. If it's inconsistent, spec the inconsistency.
- **Only what changed.** The app already is the "before". Unchanged parts
  appear only as anchors ("below the top app bar") and as **Existing**.
- **Nothing is optional.** Every change covers structure, components, tokens,
  states, behaviour (what happens, when, and what triggers it), every surface
  and width, every mode, accessibility, motion, copy and data. A gap in the
  spec is a gap in the build.
- **No reasons, no before-and-after.** Describe the finished state. Don't
  explain design choices.
- **Components and tokens by name.** A part built from a `zds-*` element is
  specced as that component with its props, never as its rendered values:
  the app's library already implements it. Every other value is the semantic
  token the page uses, which has the same name in the app's code.
- **Measured, not eyeballed.** Values come from the rendered page and from its
  source. Never estimate from a screenshot.
- **The system isn't the design.** `zds.js`, `zds.css`, `icons.css` and the
  fonts are the installed packages, bundled. A difference there is a package
  version, not a change to build.
- **Committed, so private.** The spec names the app's code and lives in the
  project. Never put a password, key or token in it.

## 1. The project's context and handoff setup

Read `zebra-context/PROJECT.md` and `COMPONENTS.md`. With no `zebra-context/`,
run `zebra-onboard-project` first: a handoff needs the project's modes,
surfaces and level.

If `PROJECT.md` has a `handoff:` block, read it and go on. If it doesn't, set
it up once:

1. **Which library the app is built with.** Look in the app's `package.json`
   (this folder, if it's the codebase; else the repo in the context's
   `reference`) for `@zebra-design-system/react-baseui`,
   `@zebra-design-system/web-components` or `@zebra-design-system/zeta-web`
   (older apps have it as `@zebra-fed/zeta-web`).
   - **One:** that's it. Don't ask.
   - **Several:** ask "Which library do <project>'s developers build these
     screens with?", offering the ones found.
   - **None, or no codebase to read:** ask the same question, offering
     **React Base UI** / **Web components** / **Zeta web** / **Not on Zebra
     yet**. Not on Zebra yet means the developers start with `/zebra-setup`;
     the spec then names each component by its doc name.
2. **Where the app is**, if it isn't this folder: the path or repo, from the
   context's `reference`. Ask only if there is none.

Save it in `PROJECT.md`'s frontmatter, add a line to its Decisions, and tell
the designer in one line ("Handoffs for route-planner name components as
React Base UI does"):

```yaml
handoff:
  library: react-baseui        # react-baseui | web-components | zeta-web | none
  app: .                       # the app's codebase: . for this folder, a path, or owner/repo
```

**Off-system** (`level: off-system`): the page isn't built from `zds-*`
elements. Tag each component **Project component: <name>** from
`COMPONENTS.md`, take values from the project's own, and leave out the
library question. Everything else applies.

## 2. The prototype and its mark

The prototype is the page the designer has been working on, kept in
`prototypes/<name>/index.html` with its `assets/` (`zebra-prototype`). If it
isn't clear which, ask, listing the pages in `prototypes/`. A prototype that
only exists as a published artifact can't be handed off: ask for the page
file, and put it in `prototypes/<name>/`.

A **mark** is the page as it was at its last handoff: a folder
`prototypes/<name>/handoff/marks/NNN/` holding a copy of `index.html` and
`assets/`, plus `mark.json`:

```json
{ "label": "…", "date": "YYYY-MM-DD", "from": "<what it was copied from>", "zebra-packages": { "web-components": "0.7.0", "tokens": "0.3.0" } }
```

Marks are numbered `001` upward; the highest is the latest. You make them by
copying files. Never change one.

- **There's a mark:** go on.
- **No mark yet:** this is the page's first handoff. Ask "What should this
  handoff be compared with?", likely answer first:
  - **The app as it is:** the page reworks screens the app already has.
    Record an empty mark, and in step 5 tag each part against the app's code.
  - **Nothing, it's all new:** a new screen or product. Record an empty mark.
  - **An earlier page:** the designer names a page in `prototypes/`. Copy it
    as the mark.

  Label mark `001` "Starting point".

## 3. Find every change

**Source.** Compare the page's `index.html` with the mark's. Read the whole
difference. This is where states and behaviour live:

- the screens, and what shows in each state (empty, loading, error, selected);
- every inline script: what a tap does, what's toggled, opened, counted or
  filtered, and which element properties and events it uses;
- the page's own styles, the classes on the root (shape, mode, surface,
  theme), and every `zds-*` element with its attributes;
- copy, icons (by name) and images in `assets/`.

**Render.** Serve the page and the mark locally (the page loads ES modules,
so it won't run from `file://`) and open both in a browser you can drive.
For every screen and state the source difference touches (every screen, if
the page's own styles changed), show it in both and look at it:

- on each surface in the context's `surfaces`, with its size mode on the root
  (the patterns' `zebra.md` says which class), at the widths that surface
  covers, and at phone width and desktop;
- in each mode the context lists (`mode-dark` and the other mode classes in
  the library's `AGENTS.md`), with the project's theme class when it has one.

Read the computed values of everything that differs: layout, gap, padding,
size, type, colour, border, radius, shadow and position. A part that only
moved or resized is usually a knock-on effect of a change above it. Note it
anyway, because it may be stray.

With the **app as it is** as the mark, also read the app's code for each
screen the page reworks: which parts exist already, and what they are built
from. `COMPONENTS.md` says what the app's own components map to.

## 4. One confirmation, in feature terms

Sort every change into what belongs to the feature, and anything that
doesn't look like it does. Then ask in one dialog, no values: the feature
list (**Good to go** / **Change something**) and one question per stray
change (**Keep it** / **Drop it**), four questions at most. Ask about any
others in a second dialog. The shape (this example is made up):

> Here's what goes in the handoff:
> - New: an Export button in the Orders top app bar, with an export dialog
> - Changed: order rows get a checkbox for selecting them
>
> The buttons are fully round on every screen, which doesn't look like part
> of this. Keep it or drop it?

- **Keep:** it goes in the spec like everything else.
- **Drop:** undo just that change in the page. Put back only the lines it
  touched, from the mark's copy, or by hand when the mark is empty. Never
  restore a whole file that also holds the feature. Say you did it,
  republish the artifact if there is one, redo step 3 and ask again.
- **Something looks broken** (the page does something its own design clearly
  doesn't intend, such as a header left showing when its list is hidden):
  add it to the same dialog: **Hand off as it is** / **Fix it first**. Never
  spec a suspected bug, or fix one, without asking.

## 5. Write the spec

Fill `references/SPEC.md` in this skill's folder, one section per change.

**Tag every part**, so the developer reuses their own code wherever it exists:

| Tag | Meaning for the developer |
|---|---|
| **Existing** | Already in your app, unchanged. Use yours. Named only as an anchor. |
| **Existing, changed** | Already in your app. Change exactly what's listed, nothing else. |
| **Zebra component: <name>** | A component in your Zebra library. Use it with the props given. |
| **Not in your library yet: <name>** | A Zebra component the page uses that your library's `AGENTS.md` doesn't list. Its doc is linked; flag it to the design system team, and don't hand-build a lookalike. |
| **New** | Not a component: a layout, region or hand-built part. Build it exactly as specced, from the tokens given. |
| **Removed** | Take it out. Say exactly what goes and what closes up behind it. |

With **the app as it is** as the mark, a part is **Existing** or **Existing,
changed** when the app's code already has it, and everything else is new.

**Name things the way the app's library does.** Read the library's `AGENTS.md`
(beside it in `node_modules`, or in the app's) for the component index, and
each component's usage doc (linked from that index, or this plugin's
`docs/components/`) for its props:

- a component as the library names it: `<Button>` from
  `@zebra-design-system/react-baseui`, `<zds-button>`, or Zeta web's element;
- its props by the doc's names and values, written the library's way
  (`flavour="primary"`, `leadingIcon`), with the import the `AGENTS.md` gives;
- icons by name, from the icons package's names, passed as the library says;
- the theme, mode and shape the way the library sets them. Zeta web uses
  `data-theme` and `data-contrast` attributes, not mode classes.

A component marked draft or experimental in its doc is tagged as usual and
marked **draft**: its details may change, so the developer checks its doc.

**Tokens.** Name each semantic token as the page uses it, `var(--space-md)`,
with its value in each mode the project has. A value from the project theme
names its `.ext-<project>` class. A value the page needed and the system
doesn't have was recorded as a gap: spec the token used and list the request
under Requests.

**Copy is verbatim.** Every string, exactly as written, in quotation marks.
Use quotation marks only for real interface text: step 6 checks it against
the page.

**Surfaces and widths.** Describe each layout by where it applies, in the
context's surfaces and the size modes the page uses. If a rule exists in the
design but changes nothing visible at the widths measured, still spec it.

**What a developer's AI will otherwise guess.** Always state:
- **What each part is:** heading (and its level), paragraph, button, link,
  list, group. Not just how it looks.
- **How images fit their box:** the box size, the image's own proportions, and
  whether it's stretched, contained or cropped.
- **Every condition in terms of the data on screen:** not "needs attention"
  but "rows whose Status chip is Warning or Error".
- **Knock-on effects on existing parts:** every real one from step 3 gets an
  **Existing, changed** entry ("the list starts 48px lower").
- **How accessible names are built** when they combine visible text ("All
  17": the label, a space, the count).
- **Motion** with its tokens, and what reduced motion does.

**Assets.** An image added since the mark is copied from the page's `assets/`
into the handoff's `assets/`. One the app already has is named, not copied.
Icons are never assets: name them.

**Requests.** List the gaps under Requests in `PROJECT.md` that this
handoff's parts use, so the developer knows where the design goes beyond the
system.

## 6. Check the spec against the page

Go through the spec line by line:

- [ ] Every token exists in the installed tokens package (or the project's
      `theme.css`), and its value is the value you measured, in each mode.
- [ ] Every quoted string appears in the page exactly as quoted.
- [ ] Every **Zebra component** is in the library's `AGENTS.md` index, and
      every prop and value is in its doc.
- [ ] Every icon name exists in the icons package.
- [ ] Every screen, state, surface, width and mode from step 3 is covered, in
      render order.

Fix every mismatch. Each one is a typo, a value you worked out (allowed only
when the spec says how, such as "fills the remaining width") or something
invented.

## 7. Deliver and move the mark

Write the handoff to `prototypes/<name>/handoff/<YYYY-MM-DD>-<feature-name>/`:
`spec.md`, plus `assets/` if there are any. Tell the designer in two lines
what's in it and where, and that it should be committed with the prototype,
so the developer gets it with the repo.

Then record a new mark: copy the page as it is now to the next `marks/NNN/`,
labelled "<feature name> handed off". The next handoff starts from there.
