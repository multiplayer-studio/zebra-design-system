# Zebra UX patterns

Principles for how screens are composed and behave. They describe roles (a filter, a system notification, a primary action), not a particular component, so they hold in any product and any design system: Zebra's, Material 3, or a product's own.

It is a folder of plain Markdown files. Edit them by hand.

## Files

| File | Subject |
|---|---|
| [01-screen-composition.md](01-screen-composition.md) | Where each part of a screen goes, how it relates to what's around it, and how it changes with the size of the screen |
| [02-navigation-flow.md](02-navigation-flow.md) | Structure, global and local navigation, back and exit, deep links, wizards, task loops, interruption, handoff, onboarding and sign-in |
| [03-controls-interaction.md](03-controls-interaction.md) | How each control responds: buttons, choices, text entry, dates, selection, menus, gestures, saving, undo, scanning, hardware input, motion |
| [04-states-feedback.md](04-states-feedback.md) | Loading, empty, error, success, offline, sync, permissions, sessions, device states, message lifetime and severity |
| [05-sizes-devices.md](05-sizes-devices.md) | Size classes, grids, how components change, overflow, text growth, orientation, density, form factors, input modes |
| [06-accessibility.md](06-accessibility.md) | The floors every other principle sits on: contrast, targets, focus, names, announcements, reflow, motion, time limits |
| [07-content-copy.md](07-content-copy.md) | Voice, labels, messages, terms, and how numbers, dates and plurals are written |
| [08-visual-theming.md](08-visual-theming.md) | Colour, states, themes, type, space, shape, elevation, icons, imagery, brand, and re-theming to a product |
| [09-ai.md](09-ai.md) | Where AI is offered, suggestions, marking and sources, confidence, acting for someone, failures, memory, voice, camera |
| [10-data-display.md](10-data-display.md) | Choosing the form, tables, list items, records, status and numbers in data, charts, live data, maps |
| [terms.md](terms.md) | The pattern words in one place |
| [devices.md](devices.md) | The Zebra device list |
| [zebra.md](zebra.md) | Pattern word → Zebra component, token or theme class. Only for projects built with Zebra. |

## How a file is laid out

- A title and one paragraph saying what the file covers, then what it does not cover.
- **When principles conflict** and **Terms used here**, the same in every file that needs them.
- Numbered sections, and under them numbered rules. The bold sentence is the rule. Anything after it explains.
- A rule that starts "By default" may be overridden by a project. Every other rule is meant to be followed.

Every file numbers the same way: sections from 1, and rules by file, so `4.21` is rule 21 of file 04 and `1.7` is rule 7 of file 01. Refer to a rule by its number: *patterns 4.21*. One rule points at another by its number in brackets: `(4.21)`.

## When principles conflict

1. Accessibility minimums ([06-accessibility.md](06-accessibility.md)) come first.
2. A product's own shell and established patterns come next, and win over the defaults here.
3. A more specific principle wins over a general one.
4. Where two files disagree, the one whose subject it is wins.

## Which files to read

| Task | Read |
|---|---|
| Any screen layout | 01, 05 |
| Navigation, flows, wizards, sign-in | 02, 01 |
| A form | 03, 04, 07, 01 |
| Status, errors, loading, empty, offline | 04, 07 |
| Choosing or wiring a control | 03 |
| Copy and labels | 07 |
| AI features | 09, 01, 07 |
| Colour, type, icons, theming a product | 08 |
| Tables, lists, records, charts, maps | 10, 05 |
| Field devices, scanning, hardware keys | 03, 05, 01, devices |
| A full audit or a new product baseline | every numbered file |
| Anything | 06 sits under all of it |

## Editing

- **Change a rule:** edit it.
- **Add a rule:** give it the next free number in its file and start it with a bold sentence.
- **Remove a rule:** delete it. Leave the gap: the other numbers stay as they are, because other rules and other documents point at them.
- **Add a pattern:** add a file named with the next two-digit number, and a row to both tables above.
- **Remove a pattern:** delete the file and its rows.
- **The manifest:** `manifest.json` is written for you when the patterns are packaged. It lists whatever files are in this folder. Never write or edit it.
- Keep rule files free of component and token names. Put those in [zebra.md](zebra.md).

In the repository, run `pnpm run docs:components` after editing, so the shipped copies match.

## Checks at packaging

Nothing checks the files while you edit. When they are packaged, guard rails run, and a failure stops the package and names the file and line.

| Guard rail | It stops |
|---|---|
| Names | A token, theme class, element, package or Zebra component named in a rule file or in terms.md. Put it in [zebra.md](zebra.md). |
| Shape | A pattern file with no title, summary or rules; a rule with no bold sentence; a number used twice in one file; a rule not numbered for its file (`4.x` in file 04). |
| References | A rule that points at a rule number that does not exist, and a skill in the repository that cites one. |
| Links | A link to a file that is not here; a file the tables above do not list; an outside link in a rule file. |
| Binding | A token or theme class in zebra.md that the design system no longer has. |
| Leftovers | Merge markers, notes-to-self and placeholder text, an empty file, a subfolder. |

It warns, without stopping, about a file that is not Markdown and device figures still marked "?".

To check without packaging, run `pnpm --filter @zebra-design-system/patterns run check`. A line that must break the Names rule on purpose ends with `<!-- guard:ok -->`.
