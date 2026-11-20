---
name: zebra-ux-audit
description: Audit a product's UI and UX against the Zebra UX patterns and report what breaks which rule — for any product, whatever it is built with (Zebra, Material 3, a house library, plain HTML), from its code, a running app, Figma frames or screenshots. Covers all patterns or only the named ones: screen composition, navigation and flow, controls and interaction, states and feedback, sizes and devices, accessibility, content and copy, visual foundations and theming, AI in the interface, data display. Use when someone asks for a UX audit, UI review, heuristic review, design QA or pattern check of a screen, flow or product.
---

# Audit a product against the Zebra UX patterns

The patterns are component-agnostic, so the product does not have to use the
Zebra Design System. The audit reads the product, checks it against the
rules, and reports. It changes nothing unless asked.

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

## 2. Agree the scope

Ask only if the request leaves these open.

- **What is audited:** which screens, flows or states, and from what evidence
  (code, a running app, Figma frames, screenshots).
- **Which patterns:** the named ones, or every pattern file when none is
  named. `06-accessibility.md` holds the floors under all the others, so
  include it unless the person rules it out.

## 3. Read the project's context, if it has one

If the product's folder has `zebra-context/PROJECT.md`, read it and
`zebra-context/PATTERNS.md`.

- A departure recorded there with a reason is the product's own established
  pattern. It is not a finding, unless it breaks an accessibility minimum.
- Anything listed there under Findings is already known. Report it as open,
  not as new.
- Audit against the surfaces, modes and special treatments the context lists.

## 4. Read the rules

- Read `terms.md` and each pattern file in scope, in full.
- For a product on Zebra devices, read `devices.md` too.
- **The project uses a Zebra library:** also read `zebra.md`, which maps each
  pattern word to a Zebra component or token.
- **Any other system:** skip `zebra.md`. Map each pattern word to the
  project's own component by the meaning `terms.md` gives it.

## 5. Look at the product

Look at the product itself, not a description of it. Run it where you can:
narrow and wide, each theme, keyboard only. In Figma or screenshots, note
which states are drawn and which are missing.

A rule about behaviour over time (loading, focus, offline) cannot be judged
from a still image. Say it was not assessed.

## 6. Compare each screen with its recipe

Read `compositions/README.md` in the patterns folder. For each screen in
scope:

1. Match it to a recipe by the recipe's signals. Say which, and why. A
   screen that matches none is noted as composed for its own job.
2. Compare region by region: an `always` region that is missing, regions out
   of order, an organism missing a slot marked `always`, a focal region that
   isn't the most prominent thing, spacing where a weaker relationship gets
   the smaller step.
3. Answer the recipe's checks.

A difference that breaks a rule is a finding, under that rule's number. Any
other difference is a **suggestion**: say what the recipe has, what the
screen has, and what would change. A product's own established way of
composing a screen is not a suggestion to change it.

## 7. Report

Write for the person who will fix the product.

1. **Summary:** what was audited, from what evidence, against which pattern
   files, and how many findings per file.
2. **Findings,** most severe first. Each one gives:
   - the rule's number and bold sentence (`patterns 4.21` is rule 21 of
     file 04);
   - where it breaks: screen, state, or file and line;
   - what was seen;
   - what to change, in the product's own components.
3. **Composition:** per screen, the recipe it matched, then the suggestions
   from step 6, most visible first.
4. **Not assessed:** the rules that could not be judged, and why.

| Severity | Meaning |
|---|---|
| High | People are blocked, lose work or are excluded. |
| Medium | People can finish but are slowed or misled on a main path. |
| Low | A rule is broken off the main path, or a "By default" rule is departed from with no stated reason. |

A product's own shell and established patterns win over the defaults here, so
a departure that follows the product's own precedent is not a finding. A
broken accessibility floor is always High.

- Cite only rule numbers that are in the files you read. Never invent or
  renumber one.
- Group repeats of the same break into one finding with a list of places.
- A missing state is "not assessed", not a failure.
