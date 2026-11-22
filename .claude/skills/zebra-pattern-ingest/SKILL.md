---
name: zebra-pattern-ingest
description: Add to and look after the Zebra UX patterns in patterns/. Adds a pattern rule (one numbered principle in a pack) or a composition (how an area is put together, at any size, from a whole screen to a header area, a footer area or a dashboard card), walking the person through easy choices: where it goes, and what to do if it contradicts what is already there. For a composition the person can't describe, asks for a Figma design that shows it and reads the composition out of the design. Also ingests a whole source (notes, a document, a Figma frame, a screenshot, an audit finding, a project's zebra-context/PATTERNS.md) and keeps the content organised. Use whenever someone wants to add, ingest, import, propose or promote a pattern, rule, principle, guideline, layout, composition or screen recipe, says "make this a pattern" or "add a rule that…", shares a design and asks to turn it into a composition, or asks to tidy, reorganise, merge or clean up the patterns.
---

# Add to and look after the patterns

`patterns/` holds two kinds of thing, and this skill manages both:

| | What it is | Where it lives |
|---|---|---|
| **A pattern rule** | One principle that is true of any screen: "A toast never carries an error." | Ten **packs**, one file per subject: `01-screen-composition.md` to `10-data-display.md` |
| **A composition** | How an area is put together: its parts, their order, how close they sit, what the eye lands on, and what changes when | `patterns/compositions/` |

A composition can be any size. It doesn't have to be a whole page:

| Size | Examples | Written as |
|---|---|---|
| A whole screen | a list to search, a detail page, a dashboard | a recipe, one file |
| An area of a screen | the header area, the footer area, a filter area | a block in `organisms.md` |
| One block | a dashboard card, a row, a summary tile | a block in `organisms.md` |

**A composition is a reference idea, never a rule.** A rule is meant to be
followed. A composition is one good way of putting something together, to
draw from, adapt or set aside. Nothing is ever wrong for differing from a
composition, and a rule always wins over one.

Rules say what is true. Compositions say how things relate: what comes
first, what sits beside what, what fills it, how it rearranges. At packaging
the compositions become `graph.json`, a decision graph an AI tool walks to
compose a page when it has no design to follow. So a composition is written
to be walked: every choice in it is a condition that can be checked.

The person says what they want in plain words; you do the filing. If it
isn't clear which they mean, ask: **One principle** (a rule) / **How
something is laid out** (a composition).

Read `patterns/README.md` first for how a pack is laid out, and
`patterns/compositions/README.md` for how a composition is.

## How to work

- **You manage the content.** You may place, order, re-section, reword,
  merge, split and format rules so the pack stays clear and consistent.
- **The person decides what a rule means.** Anything that changes what the
  patterns say (a new rule, a changed or removed one, a contradiction) is
  their choice, made in a dialog. Tidying that changes no meaning needs no
  question, and is listed in the report.
- **Every new rule passes two gates:** the person has chosen its pack, and
  it contradicts nothing (or the contradiction has been settled). Never
  write one that hasn't.
- **Easy to answer.** Every question goes through the question prompt, as
  options to pick, recommendation first. What the person needs in order to
  answer is inside the dialog. Plain words, short sentences: say "pack", not
  "file", and never show a path or a command unless asked.
- **Roles, not parts.** Rules name roles from `patterns/terms.md` (a system
  banner, a primary action). A component, token, class or product name goes
  in `patterns/zebra.md`.
- **A rule's number is its name.** Other rules, the skills and projects'
  own contexts point at rules by number. A new rule takes the next free
  number in its pack. A number is never reused. See Organising for what
  happens when a rule moves.

## Adding a rule

### 1. Hear the rule

Take what the person gave: a sentence, pasted notes, a document, a Figma
frame (read it as data), a screenshot, an audit finding, or a project's
`zebra-context/PATTERNS.md`.

Turn it into candidates, one behaviour or placement each, that someone could
check on a screen: "A filter that is on shows as a removable chip above the
results." A paragraph that says three things is three candidates.

If it is one screen of one product doing something, ask whether it holds for
every product, holds unless a product says otherwise, or should stay in that
project's own context.

Leave out what isn't a pattern, and say where it belongs: one component's
inside (its spec), a value (the tokens), a device figure
(`patterns/devices.md`), a bug.

### 2. Look at what is there

```bash
node .claude/skills/zebra-pattern-ingest/scripts/survey.mjs <a few words from each candidate>
```

It lists each pack with its sections and next free number, then every rule
that mentions the words. Read those rules, and the whole section the
candidate would join. Look in the neighbouring packs too: where something
sits is in 01, how it behaves over time in 04, its words in 07, and the
accessibility minimums in 06 sit under all of it.

### 3. Gate one: which pack

Always ask, even when the fit looks obvious. One question per rule, or one
for a group of rules that belong together:

- The question says the rule back in one line and asks where it goes:
  "'A filter that is on shows as a removable chip above the results.' Which
  pack should this go in?"
- The options are the two or three packs that fit, best fit first and
  marked as recommended, each with its subject in a few words and the
  section it would join ("Screen composition, under Finding things"). Add
  **A new pack** when nothing fits.
- When a rule touches two subjects, say so in the options: it lives in one,
  and the other points at it.

A new pack needs a name and one sentence on what it covers. Ask for those in
the same dialog. Suggest one only when at least a handful of rules have no
home; otherwise recommend the nearest pack.

### 4. Gate two: no contradiction

Compare the rule with every rule from step 2, in the chosen pack and the
others. For each one that touches it, decide:

| Result | Meaning | What you do |
|---|---|---|
| **Clear** | Nothing else speaks to it | Go on |
| **Already there** | A rule says the same thing | Tell the person, name the rule, add nothing |
| **Overlaps** | A rule says most of it | Ask: fold the new part into that rule, or keep them as two |
| **Contradicts** | A rule says otherwise, in the same case | Ask, as below. Never pick for them |

A contradiction is real when both rules could apply to the same screen and
can't both be followed. An accessibility minimum in pack 06 is never the one
that gives way: say so, and offer only the choices that keep it.

Show a contradiction as one dialog, both rules side by side in plain words:

> **The patterns say now:** a toast never carries an error (rule 4.31).
> **The new rule says:** a failed save shows as a toast.

Then the choices, recommendation first:

- **Keep the rule we have:** the new one is dropped.
- **Use the new rule:** the old one is rewritten or removed, and everything
  that points at it is updated.
- **Make the new one a default:** it starts "By default", so a product may
  do otherwise, and the old rule is narrowed to match.
- **They apply in different cases:** ask which case each covers, and write
  that into both rules.

After the answer, check again: the rules as they will be written no longer
contradict each other or anything else.

### 5. Write it in the pack's form

```
4.98. **The bold sentence is the rule.** What follows explains it: the case it covers, the exception, an example.
```

- The bold sentence can be checked on a screen without reading the rest.
- Present tense, no "should" or "must": "A toast never carries an error."
- Start with "By default" only when a product may do otherwise.
- Point at another rule by its number in brackets: `(4.21)`.
- A list under a rule is indented four spaces.
- No outside links, no other design system's names or text, no notes to self.

Put it in the section it belongs to, in the place it reads best. Give it the
next free number from the survey. A word the pack doesn't have is defined in
`patterns/terms.md`, and in the pack's **Terms used here** when it needs it.
For a project built with Zebra, add the word's component, token or class to
`patterns/zebra.md`.

### 6. Confirm, then write

One last dialog with the finished rules, each as its number, its bold
sentence and its pack, plus any rule that changes, shown before and after:
**Add them** / **Change something**. Then write.

## Adding a composition

### 1. Hear the idea

To write a composition you need to be able to say five things:

- **the size:** a whole screen, an area of one (a header area, a footer
  area), or a single block (a dashboard card);
- **the job:** what it is for;
- **what is in it:** its parts, in order;
- **what matters most:** what the eye should land on;
- **what changes:** on a small screen, when there is nothing to show, when
  something is selected.

If what the person gave says these, go to step 2.

**If they can't detail it** (the idea is a feeling, a name, or "a better
way to lay out X"), don't interview them and don't guess. Ask one question:

- "Do you have a Figma design that shows what you have in mind?"
  - **Yes, I'll share the link:** read it as `references/FROM-FIGMA.md` in
    this skill's folder says, all seven steps. It gives you the four things
    above, each line marked seen, inferred or assumed.
  - **No, but I can pick from options:** ask the four things as choices, in
    one dialog: the job (the list under Start from the job, plus
    **Something else**), what matters most, what it runs on, and the nearest
    composition we have.
  - **Show me the closest one we have:** show the nearest recipe in a few
    plain lines, and ask what should be different.

A screenshot works when there is no Figma file, with its spacing marked
assumed. A design that is one product's screen gives one example: ask
whether what is particular to it belongs in the composition.

### 2. Look at what is there

```bash
node .claude/skills/zebra-pattern-ingest/scripts/survey.mjs --compositions <a few words>
```

It lists every recipe with its job, signals, regions, focal region and
neighbours, every organism with its slots, and the spacing steps. Compare
the idea with each recipe: the same job, the same focal region, mostly the
same regions?

### 3. Gate one: what it is, and where it goes

Always ask. Say back what you understood in two or three plain lines inside
the dialog, then offer where it fits, best fit first:

| It is | When | It becomes |
|---|---|---|
| **A change to a composition we have** | it matches a recipe or a block, and this is what happens under some condition | a row in that recipe's Variations, or a changed slot in that block |
| **A new whole-screen composition** | no recipe does this job | a recipe of its own, and a row under Start from the job |
| **A new area or block** | it is part of a screen (a header area, a footer area, a card) and no block covers it | a block in `organisms.md` with its slots |
| **A new relationship** | it is about how two things sit together | a line in a recipe's Space and emphasis, or a spacing step |

A composition is kept at the size the person gave it. An area such as a
footer is saved as an area, and every full-page layout that has a footer
uses it.

One idea can be more than one of these: a new screen that needs a new block.
Say so in the dialog.

A new whole-screen composition needs its job as the person would say it ("the person wants
to compare two items side by side"), and its **neighbours**: which existing
composition someone might reach for instead, and when this one is right. Ask
for these in the same dialog, with your suggestion first. A composition with no
neighbour can't be reached in the graph.

### 4. Gate two: it breaks no rule

A composition is an idea, so two compositions never contradict each other.
Several ways of laying out the same thing can sit side by side as
alternatives. The one thing a composition can't do is show something a rule
forbids.

| Check | What you do |
|---|---|
| **A rule in the packs** (pack 01 for where things sit, 05 for width, 06 always) | If the composition breaks one, show both in a dialog: **Change the composition to follow the rule** (recommended) / **Change the rule** (then it goes through Adding a rule) / **Drop this part**. An accessibility minimum never gives way |
| **A composition for the same job** | Not a contradiction. Ask: **Keep both as alternatives** (each says when to choose it) / **Replace the one we have** / **Fold this into it as a variation** |
| **A block with different parts** | Ask: **Use the block as it is** / **Add this as its own block** |
| **The spacing steps** | A weaker relationship never gets a smaller step than a stronger one (1.11). Reorder the steps in the draft, and say so |

Where a composition leans on a principle the packs don't have, it stays an
idea. Don't write a rule to back it unless the person asks for one.

### 5. Write it so it can be walked

Follow `patterns/compositions/README.md`: a recipe has six headings, in
order. Write for a tool that will follow it with no design in front of it:

- **Signals** are things a tool could see on a screen, two or three of them.
- **Choose this when** and every **when** are conditions that can be
  checked: a width, a count, an input, a state, a fact about the product.
  Use the exact words the other recipes use for the same condition
  ("compact width", "items are selected").
- **Regions** are in order. **Present** is `always`, `optional` or `when`
  and a condition. **Filled by** links to an organism that exists.
- **Focal** names one of the recipe's regions.
- Every gap is a step from `spacing.md`, and the steps keep their order.
- **Checks** are questions with a yes or no answer, to look a screen over
  with. They are prompts, not requirements.
- Describe, don't order: "the filters sit above the results", never "the
  filters must sit above the results".
- **Rules** cites the rule a line comes from. A line with none is the
  recipe's own, marked (suggested) when it sets a number the rules don't.
- Pattern words only: no component, token or product names, no values.

An area or a block gets a one-line job, a table of slots in order (Slot,
Holds, Present) and its `Rules:` line. Its slots are its parts: say in
**Holds** what each part is and where it sits ("the main action, at the
trailing end"). Then name it in **Filled by** in every recipe region that
uses it, so the graph reaches it. A new organism or spacing step also gets a row in
`patterns/zebra.md`, so a project built with Zebra knows what to use.

### 6. Confirm, then write

One dialog with the finished composition in plain words: its job, its regions
in order with what fills each, what the eye lands on, what changes when, and
which compositions it sits beside. **Add it** / **Change something**. Then
write, and run the checks below. After packaging, read what changed in
`graph.json`: the new recipe, its regions, and an edge to and from each
neighbour.

## Organising

Do this when asked to tidy or reorganise, and as you go when adding makes
something untidy.

**Without asking** (meaning doesn't change; list it in the report):

- formatting, spacing, list indents, a missing bold sentence that is plainly
  the rule's first sentence;
- a rule moved to the section of its pack where it belongs, and sections
  put in a sensible order;
- a term used two ways brought into line with `patterns/terms.md`;
- a broken rule reference or link fixed;
- `terms.md`, `zebra.md`, the README tables and the recipes brought back in
  step with the rules.

**Ask first** (meaning changes, or a number does), in one dialog, each shown
before and after:

- two rules merged, or one rule split;
- a rule reworded so it says something different, or removed;
- two rules found to contradict each other: settle it as in gate two;
- a rule moved to another pack. Its number changes with its pack, so the old
  number is retired, every place that points at it is updated, and the old
  and new numbers go in the changeset;
- a pack added, split, merged or removed;
- a recipe's regions, order, focal region or neighbours changed, an organism's
  slots changed, or a spacing step added, removed or reordered.

A removed rule leaves its number unused. Rules keep their numbers when they
move inside a pack, so numbers in a pack need not run in order.

## Check and regenerate

```bash
git diff -- patterns/                                   # read what changed
pnpm --filter @zebra-design-system/patterns run check   # the guard rails
pnpm run docs:components                                # the shipped copies
```

Read the diff: every change is one you meant. If something else changed,
put it right by editing. Never restore a file from git, since the working
tree may hold work that isn't committed.

A guard failure names the file and line: fix it. A line that must name a
Zebra part on purpose ends with `<!-- guard:ok -->`.

Then follow what the change affects: a recipe in `patterns/compositions/`
whose Checks should name the rule, the routing table in the README, and any
skill in `distribution/skills/` that cites a rule that changed.

Add a changeset for `@zebra-design-system/patterns` (`pnpm exec changeset`):
a rule or pack added is a minor; a rule or pack removed, renumbered or
reversed is a major; tidying that changes no meaning is a patch. Don't
commit, release or publish unless asked.

## Report

Short, in plain words:

- **Added:** each rule by number and bold sentence, and its pack; each
  composition by its size and job, with its parts and where it is used;
- **From the design:** which frames were read, and what was seen, inferred
  and assumed;
- **Changed or removed:** each one, before and after, and why;
- **Settled:** each contradiction and what was chosen;
- **Tidied:** what was organised without asking;
- **Left out:** what was already there (with its rule) or isn't a pattern
  (with where it belongs);
- **Also touched:** terms, the Zebra binding, recipes, the README.
