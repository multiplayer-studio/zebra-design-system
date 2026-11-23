---
name: zebra-onboard-project
description: Establish a project's context before its prototypes are built, and keep it in the project — walk a designer through a short setup whether they start from nothing, an existing Figma design or an existing codebase, then save how the product is themed, structured, behaves and is built in a zebra-context folder that every later prototype and audit reads. Use at the start of any prototype in a folder with no zebra-context, as the first step of zebra-prototype, and whenever a designer asks to set up, onboard, theme or re-onboard a project, or says the design or the repo has changed since the last setup.
---

# Onboard a project

Every prototype of one project shares one **context**: how it is themed, how
the product is structured, where it departs from the patterns, which
components it uses, and what it runs on. This skill agrees that context with
the designer once and saves it in the project, so the next prototype, the
next designer and a later audit all start from the same place.

It is written for designers. Show what you found before you ask, and ask as
little as you can.

## Talking with the designer

These apply to everything you say or show to the designer, in this skill and
in every build that follows it.

- **Call it the Design System.** In conversation the system is "the Design
  System", never "Zebra". Package names, class names and file names stay as
  they are in the files, and stay out of the conversation unless the
  designer asks.
- **Plain words, short sentences.** The designer is not a developer. Say
  what they would see on the screen, not how it is built.

  | Don't say | Say |
  |---|---|
  | token, variable | colour, spacing, text size |
  | override, custom property | a small style change |
  | component gap | a part the Design System doesn't have |
  | viewport, breakpoint | screen size |
  | repo, codebase | the app's code |
  | level: themed | the Design System with your own colours |

- **Keep it short.** A few lines. Lead with what was done or what you need.
- **The summary goes inside the dialog.** When you ask a question, what the
  designer needs in order to answer is in the question prompt itself: the
  question text, and each option's description. Don't write the summary in
  the reply and the question in the dialog. One dialog covers one concern,
  so what is being decided and its choices read as one group.

## The context folder

The context lives in `zebra-context/` at the root of the folder the request
comes from, and it is committed with the rest of the folder. It always holds
the same files, whichever path the project took:

| File | Holds |
|---|---|
| `PROJECT.md` | Read first. The source, how prototypes are built, surfaces, modes, shape, density, special treatments, and the decisions log |
| `ARCHITECTURE.md` | The product's shell, destinations, screen types and key flows |
| `PATTERNS.md` | Where this product departs from or adds to the UX patterns, by rule number, and its terms |
| `THEME.md` | Each of the project's values and the token it maps to, with contrast results |
| `<project>.theme.json`, `theme.css` | The project theme and its generated CSS. Only when the project has its own theme |
| `overrides.css` | The style changes that make the Design System's parts look like the project's. Only when the designer chose to match the project's look |
| `COMPONENTS.md` | Each component the project uses and what it maps to |

`references/CONTEXT-FILES.md` in this skill's folder has the layout of each
file. A section nobody has established yet says **Not established**. It is
never left out, so a later reader can tell "not decided" from "not looked at".

Never put a password, key or token in the context. It is committed.

## The three paths

The paths differ only in where the answers come from. They fill the same
files.

| | Free exploration | Figma reference | From a repo |
|---|---|---|---|
| Theme | Asked | Read from variables and styles | Read from the theme and what screens use |
| Architecture | Proposed from the brief | Read from frames | Read from routes and layouts |
| Patterns | The pattern defaults | Departures seen in frames | Departures seen in screens |
| Surfaces | Asked | Read from frame sizes | Read from breakpoints |
| Companion and AI | Read from the brief | Read from the frames | Read from the screens |
| Components | Zebra's | Matched to the source | Matched to the source |
| Functionality and data | Proposed from the brief | Only what the frames show | Only what the screens show |

A project with a source is asked, after the review, whether its prototypes
should match the project's look (step 5). When they should, it is built to
match (`references/SOURCE-PARITY.md`).

A project with both a Figma design and a repo reviews both. The Figma design
is the look to aim for and the repo is what ships today. Where they disagree,
show both and let the designer choose.

## The walk

### 1. Look for a saved context

- **`zebra-context/PROJECT.md` exists:** read it and the files it names. Tell
  the designer in one line what it holds ("Using the route-planner context:
  its own theme on Zebra, light and dark, rounded, handheld and desktop") and
  go back to what they asked for. Ask nothing.
- **It exists but is behind:** `PROJECT.md` records the Figma file version or
  repo commit it was reviewed at, and the Zebra package versions. If the
  source has moved, say what changed and ask: **Keep the saved context** /
  **Review again**. Never review again without asking.
- **It doesn't exist:** go to step 2.

### 2. Identify the source

Stop at the first that applies:

1. A Figma link and a repo: review both.
2. A Figma link in the request: existing Figma.
3. The folder is a codebase, or the designer names one: existing repo.
4. Neither: ask with the question prompt, "How do you want to start?"
   (**Free exploration** / **Figma reference** / **From a repo**).

When `zebra-prototype` has already asked this, use its answer. Never ask
twice.

A screenshot is a weak source. It has no variables, styles or library names.
Review what can be measured from it, mark the rest **assumed**, and ask for
the Figma link or the repo if there is one.

Name the project: short, lowercase and hyphenated, from the repo name, else
the Figma file name, else ask. It names the theme.

### 3. Review

Skip this on the free exploration path.

Review the whole project, not one screen, and read data, not the picture.
Follow `references/REVIEW-FIGMA.md` or `references/REVIEW-REPO.md` in this
skill's folder. Read only the one for your path.

### 4. Propose

Draft all the context files before asking anything. Mark every item:

- **observed**: read from the source;
- **assumed**: your best reading, not confirmed;
- **to ask**: can't be told from the source and changes how prototypes are built.

On the free exploration path, the draft is the Zebra defaults with everything that
needs an answer marked **to ask**.

Then choose the level you recommend:

| Level | Components | Values | Recommend when |
|---|---|---|---|
| **Zebra** | Zebra's | Zebra's tokens, with a shipped extension if one fits | the review found nothing of the project's own |
| **Zebra with a project theme** | Zebra's | Zebra's tokens with the project's own colours | the project has its own brand colour, neutrals or font. This is the recommendation even when the source uses another library |
| **Off-system** | the source's own library | the source's own | offered only when a trigger below applies |

The shipped extensions are listed by `npx zebra-theme --list` (its last
line).

**Companion is read from the source, never asked.** A project uses the
Companion extension, or marks out an assistant or AI content, when its
frames or screens show it: the Companion colours, an assistant surface, AI
content marked out. Record what you saw as **observed**. With no source,
read it from the brief; when the brief doesn't mention it, record none, as
**assumed**. The same goes for any other shipped extension.

In conversation the levels are "the Design System", "the Design System with
your own colours" and "your own library". `PROJECT.md` keeps the `level`
values as they are.

**Off-system is offered, never assumed,** and only when:
- the source is built on an established library: a public, documented
  component library with its own guidelines (Material, Apple's Human
  Interface Guidelines, Fluent, Carbon and the like); or
- more than a third of the distinct components in the reviewed screens have
  no Zebra component with the same anatomy.

Below that, a missing component is a gap: build on Zebra and record it.
Before a designer chooses off-system, tell them what it gives up
(`references/OFF-SYSTEM.md`).

### 5. Confirm

**First, for a project with a source: match its look?** Ask this straight
after the review, before anything else, in its own dialog. Say in the
question what you found, in one or two plain lines (its colours, its font,
how many of its parts the Design System has):

- "Do you want prototypes to match the look of <project> as it is today?"
  - **Match the project's look:** "Colours, fonts, spacing and parts as
    close to <the app / the design> as possible. I'll add small style
    changes where the Design System looks different."
  - **Use the Design System's look:** "Built from the Design System as it
    comes, with your brand colours if you keep them. It will look different
    from <the app / the design> where the two differ."

Offer no recommendation: it is the designer's call. Record the answer in
`PROJECT.md` as `look: match` or `look: design-system`, with a line in
Decisions, and never ask again for this project unless they bring it up.

- **Match:** every prototype of this project follows
  `references/SOURCE-PARITY.md`. Make it look and feel like the project as
  closely as you can, and write the style changes it takes into
  `zebra-context/overrides.css`, so the next prototype starts from the same
  look.
- **Design System:** build with the Design System's parts as they come. No
  style changes, no custom parts made to imitate the source, and no question
  after the first build. The source still decides what is on each screen,
  its words and its structure.

Then the rest:

Ask the items marked **to ask** with the question prompt, likely answer
first, and no more than four questions. If there are more, ask the four that
change the build most and record the rest as **assumed**. Each question
carries what you found about it, in the question itself, in plain words
("Your design uses purple for buttons and links. Keep it, or use the Design
System's blue?").

Every question here goes through the question prompt (the AskUserQuestion
tool where there is one), as options to pick. Never type a list of questions
into the reply.

A free exploration is meant to start fast. Ask its questions in one dialog,
save the answers and the Zebra defaults as **assumed**, and skip the final
confirmation. The designer can change the context later by asking.

The questions a free exploration usually needs:

- "Does <project> use the Design System's colours, or its own brand?" (**The Design System's** / **Its own brand**). Its own brand needs the brand colour, as a colour value or a brand guide to read it from.
- "What will <project> run on?" Offer the form factors in the patterns' `devices.md` (handheld, tablet, vehicle mount, kiosk, desktop). More than one may apply.
- "Which modes does <project> have?" (**Light and dark** / **Light only** / **Dark only**).

Special treatments, Companion and AI are not asked. They come from the brief
(step 4).

Rules for what is confirmed:

- **Modes.** A project offers the modes its source has. Never invent the look of a mode the source doesn't draw. Higher contrast stays available whatever is chosen, and is never the default (`patterns 8.90`). A product used in low light defaults to dark (`patterns 8.25`).
- **Shape.** One shape for the whole product, rounded or sharp, as DESIGN.md's Shape inheritance sets it. A fully round element is named case by case ("the floating action button"), never made the product's shape.
- **Density.** Touch products are comfortable. A desktop console for dense data may be compact (`patterns 5.46`).
- **Special treatments.** A treatment is something the product marks out visually, such as AI interactions. Record which the product has. An AI treatment marks AI and nothing else (`patterns 8.95`), and follows the patterns' AI file. A treatment the system doesn't have is never invented: record it under Requests.
- **Status colours are never themed** (`patterns 8.13`). A brand colour that would read as an error stays out of the action role (`patterns 8.89`).

Then ask the designer to confirm the whole context in one dialog. The
summary is in the dialog: one plain line per concern (the look, what it runs
on, how the product is laid out, the parts it uses), then **Looks right** /
**Change something**.

### 6. Save

Write the files, following `references/CONTEXT-FILES.md`.

- **Zebra with a project theme:** follow `references/THEME.md` to write the
  theme file and generate its CSS.
- **Off-system:** follow `references/OFF-SYSTEM.md`.

Tell the designer the context is saved in `zebra-context/` and should be
committed with their work.

### 7. The first build from a source

When the designer chose to match the project's look (`look: match`), the
first build matches the source strictly: follow
`references/SOURCE-PARITY.md`. In short:

- match the source's spacing, fonts and components, with the Design System's
  component where it fits, a small style change where it nearly fits (kept
  in `zebra-context/overrides.css`), and a custom component in the project
  where nothing fits;
- keep custom components under 20% of the parts on the screen, and ask when
  the source needs more, or when something can't be matched at all;
- don't make up functionality or data. Ask before making up data for a
  screen that fills in from live data;
- after the first build, tell the designer which parts were adjusted and ask
  whether to switch them to the Design System's own versions. If they say
  no, carry on as it is.

### 8. Keep it current

The context is used and updated by every later prototype:

- Read `PROJECT.md` before building. Follow its level, modes, shape, density,
  surfaces and special treatments.
- A decision made while building is added to the Decisions log, with its
  date and who made it.
- A new departure from a pattern is added to `PATTERNS.md`, with its reason.
- A component the project didn't have before is added to `COMPONENTS.md`.
- Anything in a prototype that departs from the context is reported, with why.

## What the patterns say about a project's own ways

A product's own shell and established patterns win over the pattern defaults,
so a project's way of doing something is recorded, not corrected. Two limits:

- **Accessibility minimums come first.** A project never overrides a rule in
  the patterns' accessibility file. Where the source breaks one, record it in
  `PATTERNS.md` as a finding to fix, and build the prototype to the minimum.
- **Only a rule that starts "By default" is a default.** Where the source
  breaks any other rule, record it as a finding too, and ask the designer
  whether the prototype follows the source or the rule.
