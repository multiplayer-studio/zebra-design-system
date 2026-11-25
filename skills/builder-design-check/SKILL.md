---
name: builder-design-check
description: Check a built screen against its design and list every difference, by measurement, then fix the gaps and check again until there are none. Works against a Figma frame, a handoff package, a published prototype or a running page, in any codebase whatever it is built with. Use at the end of every build that follows a design (the other builder skills call it), and whenever a developer asks whether a screen matches the design, wants a design QA or pixel check of their work, or wants a pull request checked against Figma or a handoff.
---

# Check a build against its design

High adherence is measured, not judged by eye. The design is read once and
saved as numbers; every check after that is one command that lists each gap.

## Rules

- **Measure first, look second.** Never compare by eye before the check is
  clean, and never read values out of the page by hand.
- **Fix, don't ask.** A gap you can close is closed. Ask only where the design
  and the repo's rules can't both be followed.
- **Fix in the repo's style.** Close a gap the way `zebra-build/PROJECT.md`
  says this repo writes code: a prop or variant first, then a scoped style.
  Never change a shared component to make one screen fit.
- **Never weaken the reference** to make a check pass.

## 1. Save the reference, once per screen

Save what the design measures as `zebra-build/parity/<screen>.json`, one
file per screen, width and mode. Name each part of the screen (`header`,
`filters`, `orders-table`) and give it the values the design states:

```json
{
  "source": "<frame link, address or handoff folder>",
  "width": 1440,
  "scheme": "light",
  "order": ["header", "title", "new-order", "orders-table"],
  "parts": {
    "header": { "parent": null, "height": 64, "paddingLeft": 24, "backgroundColor": "#192222" },
    "title": { "parent": "header", "fontFamily": "Inter", "fontSize": 20, "fontWeight": 600, "text": "Orders" }
  }
}
```

List only values the design states. A value left out isn't checked. The
value names are the ones `scripts/measure.js` returns: position and size,
padding, gaps, font, colours, borders, corners, shadow and the words.

| The design is | Where the values come from |
|---|---|
| A Figma frame | each node's values, read with the Figma tools. Keep the frame's screenshot beside the file |
| A handoff package with a `page/` folder | measure the page: `node "<this skill's folder>/scripts/parity.mjs" --capture --page=<handoff>/page/index.html --map=<map.json> --out=zebra-build/parity/<screen>.json --shot=<png>` |
| A handoff package with only `spec.md` | the values the spec states, written in by hand |
| A published prototype or a running page | the same capture command, with its address |

The map names each part and its selector: `{ "header": "header.app-bar" }`.

A reference is reused by every later check of that screen. Save it again
only when the design has moved.

## 2. Mark the parts in the build

Give each part the same name as in the reference, as
`data-parity="<name>"`. Where a component draws its look inside itself, add
`data-parity-inner="<selector>"` to measure that inner element.

If the repo doesn't want test attributes in its markup, leave the markup
alone and pass a map: `--map=<map.json>`, with `" >>> "` in a selector to
reach inside a shadow root.

## 3. The loop

1. **Run the check** at the reference's width and mode:

   ```bash
   node "<this skill's folder>/scripts/parity.mjs" zebra-build/parity/<screen>.json --page=<the build's address> --shot=<png>
   ```

   The address is the one `PROJECT.md` gives for seeing a screen. The check
   lists every gap: a part missing, extra, moved or nested differently, and
   every value that differs, with by how much. `--scheme=dark` or
   `--attr=data-theme=dark` checks dark.

   It needs Playwright in the project. If it says there is none, evaluate
   `scripts/measure.js` in the page with the browser tool you have, save
   what it returns, and pass it as `--measured=<file>`.
2. **Fix every gap** it lists, all in one go.
3. **Run it again.** Repeat until it prints "No gap". Stop after three
   rounds on the same gap and report it.
4. **Then look, once.** Put the build's screenshot beside the design's and
   look at each region for what measuring misses: alignment, balance,
   clipping, an image's crop, a part nobody named. Fix what you see and run
   the check a last time.
5. **Other widths and modes** the design draws, once the first is clean.

## 4. Report

- the screens checked, at which widths and modes, and the result of the last
  run;
- every gap left, with its size and why it is left;
- every deviation: where the build differs on purpose, and who decided;
- whether the check was by picture and measurement, or by stated values only.

With no browser and no way to render the build, say so plainly. Don't report
a match you couldn't measure.
