# Reading a composition out of a Figma design

Used by `zebra-pattern-ingest` when the person has a design that shows what
they mean. The design is **evidence of an arrangement**. What comes out is
the arrangement in pattern words: what the area is for, what is in it, in
what order, what sits next to what, how closely, and what changes when.
Nothing of the product comes with it.

The design can be any size: a whole screen, one area of it (a header area, a
footer area) or a single block (a dashboard card). Read the node the person
pointed at, at that size. For an area or a block, "the frame" below is that
node, its "regions" are its parts, and they become the block's slots.

## What to take, and what to leave

| Take | Leave |
|---|---|
| The job the screen does | The product, its name and its brand |
| The regions, in order, and how they are arranged | Colours, fonts, exact sizes and pixel values |
| What kind of block fills each region, and its parts | Component names, layer names, library names |
| Which things are closer together and which are further apart | The actual gap numbers |
| What the eye lands on first | The copy, the data, the pictures |
| What changes between frames | One-off decoration |

A composition has to hold for a screen nobody has drawn yet. If a thing would
only make sense in this product, it isn't part of it.

## 1. Read the design as data

Start a Figma session for the file, then for each frame the person pointed
at:

- take a screenshot, to look at;
- read the node tree: the frame's own layout, and every top-level child
  with its layout direction, gap, padding, alignment, and whether it is
  fixed, fills or hugs;
- go two or three levels down, enough to see what each block is made of;
- note the frame's width, and its name.

Read every frame of the set, not the first: the same screen at another
width, in another state (empty, loading, error, selected, editing), or at
another step. A large frame is read in sections.

If Figma isn't connected, or the link can't be opened, say so plainly and
ask the person to connect it or share a screenshot. A screenshot gives order
and arrangement, but no gaps: mark every spacing line **assumed**.

## 2. Work out the job

From the frame's title, its largest region, and its main action, say in one
sentence what it is for. For a whole screen, match it to the list in
`patterns/compositions/README.md` under Start from the job. For an area or a
block, match it to the blocks in `organisms.md`. Write down
the **signals**: the two or three things about this screen that would let a
tool recognise the same job on another screen ("A list is the largest
region. Search sits directly above it.").

## 3. List the regions, in order

A region is a major area of the screen. Take the frame's top-level children
in reading order and name each by its role, in the words of
`patterns/terms.md` (header, filters, collection, pinned bar), never by its
layer name.

For each region record:

- **order**, top to bottom and leading to trailing;
- **arrangement**: stacked, side by side, pinned to an edge, floating over;
- **what fills it**: the organism in `organisms.md` whose slots match its
  parts. Match by what the parts are for, not by how they look. A block that
  matches none is a candidate organism: list its parts as slots, each with
  what it holds;
- **present**: in every frame of the set (`always`), in some frames for a
  reason you can state (`when` and the condition), or in some for no clear
  reason (`optional`, and ask).

## 4. Read the relationships

This is what makes it a composition and not a picture.

- **Closeness.** List the gaps between neighbouring regions, and between
  the parts inside a region, and put them in order from smallest to largest.
  Map each to a step in `spacing.md` **by its place in that order and by
  what it separates**, never by its number: the gap between a label and its
  field is `tight` whatever it measures. If the design's order disagrees
  with the steps (two sections closer together than two rows in a group),
  that is a finding to raise, not something to copy.
- **What acts on what.** A control sits directly above or beside the thing
  it changes: note each such pair (filters above results, a commit bar
  across exactly what it commits).
- **Emphasis.** Which region is largest or heaviest, where the one primary
  action is, what is quieter. That region is the focal one.
- **Alignment and edges.** What shares a leading edge, what is pinned, what
  scrolls and what stays.
- **Containment.** What is inside what, and why it is a real unit.

## 5. Read what changes

Compare the frames of the set, pair by pair. Each difference is a variation,
written as a condition and what happens:

| Frames differ by | The condition is |
|---|---|
| width | compact, medium or expanded width, in the words of pack 05 |
| a state | nothing matches, loading, failed, offline |
| what the person did | items are selected, editing, a step further on |
| content | many of something, none of something, long text |
| input or device | touch, keys, a scanner, a mounted device |

Write a condition as something that can be checked on a screen or known
about the product, and reuse the wording the existing recipes already use
for the same condition, so a tool can match them.

With one frame only, there are no variations to read. Say so, and ask what
happens at phone width and when there is nothing to show.

## 6. Mark what you are sure of

Mark every line of the draft:

- **seen**: the design shows it;
- **inferred**: the design suggests it and a rule in the packs supports it
  (give the rule number);
- **assumed**: your reading, with nothing in the design or the rules behind
  it.

One design is one example. Ask the person, for the lines marked assumed and
for anything that looks particular to this screen, whether it is part of the
composition. A line the rules don't back is the recipe's own, and is marked
(suggested) when written.

## 7. Check it against the rules

Before it goes back to the skill's gates, check the arrangement breaks no
rule in the packs: the ones the region rows will cite, pack 01 for where
things sit, pack 05 for how they change with width, and pack 06 always.
Where the design breaks a rule, the composition follows the rule, and the
difference is raised with the person as a contradiction. A design never
overrides an accessibility minimum.

## What to hand back

A short draft in this shape, in pattern words only:

```
Size: <whole screen | area | block>
Job: <one sentence>
Signals: <two or three>
Regions, in order: <name> · <arrangement> · <organism or "new block"> · <present> · <seen | inferred | assumed>
New blocks: <name> — <what it is for> — slots
Closeness: <between X and Y> = <step>, smallest first
Focal: <region>
Changes: when <condition>, <what happens>
Breaks a rule: <rule> — <what the design does>
Not sure: <what to ask>
```
