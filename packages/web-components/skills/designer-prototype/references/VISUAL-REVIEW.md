# Composing the look, and reviewing it

Correct components and tokens don't make a screen look good on their own.
How the parts are combined does: what is grouped, how much space sits
between things, what the eye lands on first. This file has two parts. Read
part 1 before laying a screen out. Run part 2 on every screen after it is
built, before handing over.

The rules behind this are the patterns' (`patterns 1.7`, `1.11`, `1.13`,
`1.14`, `5.8`, `5.11`, `8.45`, `8.46`), and the recipes in the patterns'
`compositions/` folder say how each kind of screen is laid out. This file
adds how to judge the result.

With a Figma reference, the frame's own spacing and layout win (see
`FIDELITY.md` in the `builder-figma-to-code` skill). Part 1 then applies only
to what the frame doesn't draw, and part 2 reports instead of changing what
the frame draws.

## Part 1. Compose

### One spacing ladder

Space says how closely things are related. Take every gap from the spacing
steps in the patterns' `compositions/spacing.md`, with the tokens `zebra.md`
gives for each step under Spacing steps. A composition the screen started from, if there
is one, suggests which step goes between its regions. Never use a smaller step for a weaker relationship
than for a stronger one.

Two checks keep the ladder honest:

- the space **above** a heading is at least twice the space below it, so the
  heading belongs to what follows;
- the padding **inside** a container is never smaller than the gap between
  the items it holds.

### Give the screen one focal point

- Decide what the person should see first, and make it the largest or
  heaviest thing in its region. Everything else steps down.
- One primary button per screen or group. The rest are outline, subtle or
  text.
- Use at most three text sizes in one region, and two weights. Hierarchy
  comes from size, weight and space, in that order, before colour.
- Secondary text is quieter, not smaller than the smallest body style.

### Group with space first

- Start with no dividers and no cards. Add space between groups. Add a
  divider only where space alone doesn't separate. Add a card only where the
  content is one object that stands apart.
- Never put a card in a card. Never draw both a border and a shadow on the
  same surface.
- A page of cards uses one card padding and one gap throughout.

### Align to few edges

- Everything in a region starts on one leading edge. Count the distinct left
  edges in a region: more than two needs a reason.
- In a row, text sits on a shared baseline and controls share a height.
- Numbers in a column align to the trailing edge. Text aligns to the leading
  edge. Nothing is centred except a short empty state or a single figure in
  a tile.

### Let content breathe, and stop it stretching

- Forms and reading content take a maximum width and sit at the leading edge
  or centre. A field is never as wide as a desktop window.
- Reading text runs 45 to 90 characters a line.
- A row of tiles is equal in width and height. A grid's last row doesn't
  stretch its items to fill.
- Don't fill space because it is empty. An unfilled area beside a capped
  form is correct.
- Balance a screen by weight: a heavy region (a table, a chart, an image) is
  set against open space or a lighter column, never against another equally
  heavy one at the same size unless they are peers.

### Keep it calm

- Colour is for meaning: the primary action, selection, status. A screen
  with more than one accent, or with status colours used as decoration, is
  too loud.
- Icons accompany labels where they help recognition. A column of rows that
  each start with a different decorative icon is noise.
- Use fewer surface levels: the page, one raised level, and overlays.

## Part 2. Review

Run this after the build and before the hand-over. It is a loop: look,
measure, fix, look again.

### 1. Capture

Take a screenshot of every screen and state you built, at each surface in
the project's context (or phone width and desktop if there is none), in the
default mode. Look at the screenshots, not the code.

### 2. Look, in five passes

Look at each screenshot once per pass. Write down each problem with where it
is.

1. **Squint.** Blur your reading of it: what stands out first? Is that the
   most important thing? Do two things compete? Is any region a wall of
   equally loud content?
2. **Cramped.** Anywhere text or a control sits close to an edge, a border
   or another control. Anywhere rows feel packed, or a heading is stuck
   midway between two blocks.
3. **Empty or stretched.** Fields or buttons running the full width of a
   wide window. A lone card in a wide row. Content hugging one edge with no
   margin, or a large hole that reads as a mistake.
4. **Edges.** Follow each leading edge down the screen. Find the items that
   are a few pixels off, the ragged starts, the columns that don't line up.
5. **Consistency.** The same kind of thing drawn two ways: two card
   paddings, two gaps between like rows, two heading sizes for the same
   level, mixed button sizes in one row.

### 3. Measure what the eye can't settle

Run this in the page and read the result. It lists the places most likely to
be cramped or broken.

```js
(() => {
  const out = [], px = v => parseFloat(v) || 0;
  const vis = e => { const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0; };
  for (const el of document.querySelectorAll('body *')) {
    if (!vis(el)) continue;
    const cs = getComputedStyle(el), r = el.getBoundingClientRect();
    const boxed = px(cs.borderTopWidth) > 0 || (cs.backgroundColor !== 'rgba(0, 0, 0, 0)' && el.parentElement &&
      cs.backgroundColor !== getComputedStyle(el.parentElement).backgroundColor) || cs.boxShadow !== 'none';
    const hasText = [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim());
    const tag = el.tagName.toLowerCase() + (el.className && typeof el.className === 'string' ? '.' + el.className.split(' ')[0] : '');
    if (boxed && !el.tagName.includes('-') && el.children.length &&
        Math.min(px(cs.paddingTop), px(cs.paddingLeft), px(cs.paddingRight), px(cs.paddingBottom)) < 8)
      out.push(['tight padding', tag, cs.padding]);
    if (hasText && (el.scrollWidth > el.clientWidth + 1) && cs.overflow !== 'visible')
      out.push(['clipped text', tag, el.textContent.trim().slice(0, 40)]);
    if (r.right > innerWidth + 1) out.push(['runs off the page', tag, Math.round(r.right - innerWidth) + 'px']);
    const kids = [...el.children].filter(vis);
    for (let i = 1; i < kids.length; i++) {
      const a = kids[i - 1].getBoundingClientRect(), b = kids[i].getBoundingClientRect();
      const gap = Math.max(b.top - a.bottom, b.left - a.right);
      if (gap >= 0 && gap < 4 && cs.display !== 'inline' && !el.tagName.includes('-'))
        out.push(['siblings touch', tag, Math.round(gap) + 'px']);
    }
    if (/^(input|textarea|select|zds-text-field|zds-select)$/i.test(el.tagName) && r.width > 720)
      out.push(['field too wide', tag, Math.round(r.width) + 'px']);
  }
  return out;
})();
```

Then check by hand, from part 1:

- the checks in the composition the screen started from: a "no" that breaks
  a rule is fixed, and any other "no" is kept only if it was meant;
- each gap sits on the ladder, and weaker relationships have the larger gap;
- the space above each heading is at least twice the space below it;
- like items share one padding, one gap and one size;
- each region has no more than two leading edges.

The script only points. A listed item that is right as it is stays.

### 4. Fix, then look again

Fix every problem from steps 2 and 3. Fix with layout and space: change a
gap, a width, a grouping, a level of emphasis. Never fix by changing a
component's inside, by adding a raw value, or by adding decoration.

Capture again and repeat the five passes. Stop when a pass finds nothing, or
after three rounds. Then check the other modes once for anything the mode
changes.

With a Figma reference, don't change what the frame draws. List what the
review found in the frame's own layout, and ask the designer whether to
match the design or fix it, as `FIDELITY.md` says for deviations.

### 5. Say what you did

In the hand-over, one line: how many rounds the review took and what it
changed. List anything you saw and left, with the reason.
