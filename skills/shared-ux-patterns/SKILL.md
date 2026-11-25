---
name: shared-ux-patterns
description: Apply the Zebra UX patterns while designing or building UI in any component system — Zebra, Material 3, a house library or plain HTML. The patterns are component-agnostic rules for screen composition, navigation and flow, controls and interaction, states and feedback, sizes and Zebra devices, accessibility, content and copy, visual foundations and theming, AI in the interface, and data display. Use when someone asks to design, build, prototype or change a screen, flow, form, table, empty or error state, or AI feature and wants it to follow Zebra's UX rules, or asks what the patterns say about something.
---

# Apply the Zebra UX patterns

The patterns say how screens are composed and behave. They name no component
and no token, so they apply to whatever the project is built with.

## 1. Find the patterns

Use the first of these folders that exists:

1. `node_modules/@zebra-design-system/patterns/dist/`
2. the `patterns/` folder shipped with this skill's plugin (two folders above
   this file).

If neither exists, install the pack. It is plain Markdown with no code:
`npm i "git+https://github.com/multiplayer-studio/zebra-design-system.git#dist/patterns"`

Read `manifest.json` first. It is generated when the patterns are packaged,
so it always matches the files: `patterns` lists every pattern file with its
title, summary and sections, and `references` lists the supporting files.
Then read `README.md`, which says which patterns a task needs. Where the two
disagree, the manifest is right.

## 2. Read what the task touches

- Read `terms.md`, then the pattern files the README names for this task, in
  full. For a new product or a baseline, read every pattern file.
- For work on a Zebra device, read `devices.md` too.
- **The project uses a Zebra library:** also read `zebra.md`, which maps each
  pattern word to a Zebra component or token.
- **Any other system:** skip `zebra.md`. Map each pattern word to the
  project's own component by the meaning `terms.md` gives it.

## 3. Start whole screens from a composition

Compositions are reference ideas, never rules. They show one good way to
put a screen together, and they are there to draw from when there is no
design to follow. Adapt one, combine two, or leave it, as the product needs.
Only the numbered rules are meant to be followed, and a rule always wins
over a composition.

When the task is a whole screen, or a suggestion for one, read
`compositions/README.md` in the same folder. If it lists no composition for
the job, compose the screen from the numbered rules and the spacing steps,
and skip the rest of this step. Otherwise use the composition as a starting
point:

1. **Job.** Pick the recipe from the person's job, using the README's first
   table and each recipe's "Choose this when". A screen that fits none is
   composed from the numbered rules.
2. **Regions.** Start from the recipe's regions in order: the `always`
   regions, and a `when` region if its condition is true. Add, drop or
   reorder where the product has a reason.
3. **Variations.** Apply each one whose condition is true for this project's
   widths, data and states.
4. **Organisms.** Fill each region with its organism and that organism's
   slots. On Zebra, `zebra.md` (Organisms) says what each is built from. On
   another system, map each slot to the project's own parts.
5. **Space.** Use the recipe's spacing steps, from `compositions/spacing.md`.
   On Zebra, `zebra.md` (Spacing steps) gives the tokens.
6. **Checks.** Look the finished screen over with the checks. A "no" that
   breaks the rule the check names is fixed. Any other "no" is a choice:
   keep it if it was meant.

`graph.json` holds the same recipes as data, written when the patterns are
packaged. Use it when a tool needs to walk them. The Markdown is the source.

For an existing screen, don't rebuild it to the recipe. Match it to a recipe
by its signals, compare region by region, and offer the differences as
ideas, each with the recipe line and the rule it comes from, if any. Never
call a difference from a composition wrong.

## 4. Apply

- Each numbered line is a rule, and its bold sentence states it. Follow it.
- A rule that starts "By default" may be overridden for the project. Say
  which one and why. Never edit the pattern files to fit a project.
- When rules pull apart, follow each file's "When principles conflict":
  accessibility minimums first, then the product's own shell and established
  patterns, then the more specific rule, then the file whose subject it is.
- `06-accessibility.md` sits under every task. Read it whenever the work
  shows, speaks or asks for anything.
- The patterns decide layout and behaviour. The project's component system
  decides how each component looks.

## 5. Report

End with the pattern files and recipes you read, the rules that shaped the work by
number (`patterns 4.21` is rule 21 of file 04), any default you overrode,
and any pattern word the project has no component for.

Cite only rule numbers that are in the files you read.
