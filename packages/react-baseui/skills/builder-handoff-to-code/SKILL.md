---
name: builder-handoff-to-code
description: Build a designer's handoff package in this codebase, exactly as specified and in the repo's own coding style. Reads the handoff's spec.md (every changed part, with its component, props, tokens, states, behaviour, copy and assets), builds each part with what this repo uses for it, checks the result against the handoff by measurement, and marks what is built. Use whenever a developer has a handoff folder, a spec.md from designer-handoff, or says a design was handed off and needs building.
---

# Build a handoff

A handoff is a folder a designer made with `designer-handoff`: `spec.md`,
`assets/` where there are any, and sometimes `page/`, the prototype itself.
It describes the finished state of every part that changed, and nothing else.
The designer worked somewhere else, so the handoff is all you have from them.

## Before anything

1. **Read `zebra-build/PROJECT.md` and `MAP.md`.** No `zebra-build` folder:
   run `builder-start` first. Follow the record's Conventions and its Rules
   for this repo throughout.
2. **Find the handoff.** It is the folder the developer names, or the newest
   under `prototypes/*/handoff/`. Read `spec.md` in full before writing any
   code. A handoff outside the repo is copied in beside the feature's docs,
   or wherever the developer says, so the build can be traced to it.
3. **Read the library's contract** when the record's case uses the Zebra
   packages: `DESIGN.md` and `AGENTS.md` beside the installed package.

## Read the tags

Every part in the spec carries a tag. Each means one thing here:

| Tag in the spec | What to do |
|---|---|
| **Existing** | Find it in the repo. Use it as it is. Never rebuild it. |
| **Existing, changed** | Find it. Change exactly what is listed, nothing else. |
| **Zebra component: <name>** | Use what `MAP.md` gives for it, with the props listed. |
| **Not in your library yet: <name>** | Don't build a lookalike in a Zebra case; report it. In `own-library`, follow the record's rule for no match. |
| **New** | Build it exactly as specified, from the tokens given, where this repo keeps that kind of code. |
| **Removed** | Take it out, and close up what the spec says closes up. |

The spec names components and tokens as the Design System does. Translate
each through `MAP.md`:

- **`zebra`:** the names are the same. Use them as written.
- **`own-library`:** each Zebra component becomes the repo's own part, set
  so it looks and behaves as specified. Each token becomes the repo's
  variable. No match: build it locally in the repo's style, add it to
  `MAP.md` under Built locally, and report it.
- **`zebra-plus-legacy`:** Zebra first. Use an old-system part only where
  `MAP.md` says so, and list each use in the report.

Add every row you needed to `MAP.md`, so the next build doesn't look it up
again.

## Build

- **Find before you write.** For each **Existing** and **Existing, changed**
  part, find the file first. If you can't find a part the spec calls
  existing, stop on that part and ask: the spec and the repo disagree.
- **One change at a time, in spec order.** The spec is in render order.
- **Nothing extra.** Don't tidy, rename or refactor code the spec doesn't
  touch. Don't add a state, a string or a screen it doesn't name.
- **Copy is verbatim.** Every quoted string exactly as written, put where
  this repo keeps its text (inline, a strings file, translation keys).
- **Every state, width and mode the spec names is built**, including the
  ones that look the same at the width you happen to be viewing.
- **Assets** come from the handoff's `assets/`, placed where this repo keeps
  images. Icons are named, never copied: use the repo's icon source.
- **Data and conditions** are wired to the repo's real data where it exists.
  Where the spec's condition needs data the repo doesn't have, build the
  interface, leave the condition behind one clearly named function, and
  report it.
- **In the repo's style.** Folders, names, styling method, state and tests
  as the record says. A new part gets a test where the record says parts get
  tests.

## Check

1. Run `builder-design-check` against the handoff: `page/` if it has one,
   else the values `spec.md` states.
2. Go down the spec once more, line by line. Every part is built, changed or
   removed as written; every quoted string is in the code exactly.
3. Run the repo's lint and tests from the record. Fix what this build broke.

## Mark what is built

Add a `BUILT.md` beside `spec.md`, or update it:

```markdown
# Built
| Part | Status | Where | Notes |
|---|---|---|---|
| Filter bar | built | src/orders/FilterBar.tsx | |
| Bulk actions | not built | | needs an endpoint that doesn't exist yet |
```

A later handoff of the same feature starts from this file.

## Report

- the parts built, changed and removed, and where;
- anything not built, and what it needs;
- every part built locally because the repo had no match, and every
  old-system part used;
- every place the spec and the repo disagreed, and what was decided;
- the result of the design check, lint and tests;
- the spec's Requests, passed on unchanged: they are for the design system
  team.
