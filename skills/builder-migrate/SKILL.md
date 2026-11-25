---
name: builder-migrate
description: Move an existing application's screens onto the Zebra Design System packages, a slice at a time, without changing how the app looks to its users unless a design says so and without changing its coding style. Lists what the app uses, maps each part to the Zebra component and token that replaces it, replaces one screen or one component at a time, and checks each slice against the screen as it was. Use when a developer asks to migrate, move, port, convert or upgrade an app, a screen or a component library to the Design System, to replace old Zeta or third-party components with Zebra ones, or to plan such a migration.
---

# Migrate to the Design System

A migration is many small, checked replacements, not one rewrite. Each slice
leaves the app working and shippable.

Only run this where the team wants to move. A repo recorded as `own-library`
has said it doesn't: ask before going further, and change the record's case
to `zebra-plus-legacy` if the answer is yes.

## Rules

- **One slice at a time.** A slice is one screen, or one component
  everywhere it is used. Never both at once.
- **Same look, unless a design says otherwise.** With no new design, the
  screen as it is today is the reference. With a Figma design or a handoff,
  that is the reference.
- **Same behaviour.** Every state, shortcut, validation and event the old
  part had is kept. A behaviour the Zebra component lacks is a gap to
  report, not something to drop.
- **Same coding style.** The repo's folders, names, state and tests stay as
  `zebra-build/PROJECT.md` records them. Only the parts and their values
  change.
- **Old and new live together** while the migration runs. That is the
  `zebra-plus-legacy` case, and its rules apply.

## Before anything

1. **Read `zebra-build/PROJECT.md` and `MAP.md`.** No folder: run
   `builder-start` first.
2. **Check the packages are installed and wired.** If not, point to
   `/zebra-setup`. Read `DESIGN.md` and `AGENTS.md` beside the installed
   package.
3. **Check the theme.** If the app has its own colours or font, it needs a
   theme extension before the first slice, or every migrated screen will
   change colour. Point to `/zebra-theme`.

## 1. List what the app uses

```
node <the builder-start skill's folder>/scripts/survey-repo.mjs
```

From it, fill `MAP.md`'s Components table for every component the app uses,
most used first:

| Result | Meaning |
|---|---|
| **Direct** | a Zebra component does the same job; props map one to one |
| **With changes** | a Zebra component fits, with listed differences in props, look or behaviour |
| **No match** | nothing in the installed version replaces it; it stays, and is reported |

Do the same for the tokens the app's styles use. A hard-coded value maps to
the semantic token with that value; one with no token is a gap.

## 2. Agree the plan

Show the developer one short plan with the question prompt, and let them
pick where to start:

- the slices, in order: shared parts with the most uses and the fewest
  changes first, then screens;
- for each, how many files it touches and whether it is Direct or With
  changes;
- what will not move, and why.

Write the agreed plan to `zebra-build/MIGRATION.md` as a table of slices
with a status column. Every later run reads it and takes the next slice.

## 3. Move one slice

1. **Save the reference** for each screen the slice touches, before changing
   anything: `builder-design-check` step 1, against the running app as it is.
   With a new design, save the reference from the design instead.
2. **Replace** the old part with the Zebra one, through `MAP.md`:
   - props by their mapped names and values;
   - hard-coded values and old variables by semantic tokens;
   - icons by glyph name from the icons package;
   - theme and mode the way the library sets them, at the root the record
     names.
3. **Keep the seams clean.** Where a migrated part sits beside an old one,
   check spacing, focus order and theme on both sides.
4. **Remove what is now unused**: the old component's file when its last use
   is gone, its styles, its dependency when nothing imports it. Never
   earlier.
5. **Check.** Run `builder-design-check` against the saved reference. A
   difference the Zebra component brings on purpose (a focus ring, a corner,
   a text style) is a deviation: list it, and ask once per kind, not once
   per screen. Then run the repo's lint and tests.
6. **Mark the slice done** in `MIGRATION.md`, with its deviations.

## Report

After each slice:

- what moved, how many files, and what was removed;
- the result of the design check, lint and tests;
- every deviation, and what the developer chose;
- every No match and every behaviour the Zebra component lacks: these go to
  the design system team;
- the next slice in the plan.
