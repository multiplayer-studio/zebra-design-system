---
name: zebra-figma-page-build
description: Build a Figma flow or screen as an experimental page story in packages/react-baseui, composed only from Zebra components and semantic tokens, matching Figma's text styles exactly, then check it in a real browser and report how long the build took, what took longest and every issue met (component gaps, workarounds, Figma inconsistencies). Use whenever someone shares a Figma section, flow, screen or frame link and asks to build it as a page, mock flow, experimental page or Storybook page, or says "build this flow", "make a page called …", or names this skill (formerly build-figma-page).
---

# Build a Figma page

Turns a Figma section into one React story file under
`packages/react-baseui/stories/<Name>Page.stories.tsx`, titled
`Experimental/Pages/<Name>`. The page is a mock: every control is a library
component, every value is a semantic token, every text uses Figma's style.

It works for any project: any Figma file or section, any frame size (desktop,
tablet, handheld) and any brand extension. Take the frame size and any
extension (`ext-companion`) from the Figma frames, never from an
earlier page.

## Rules

- **Library components only.** Figma's local parts (a "Wizard Footer", an
  "Option Row") are composed in the page from library components and tokens.
  Never import from another page or copy a component.
- **Semantic tokens only**, by CSS name (`interactive/primary/background/default`
  → `var(--interactive-primary-background-default)`). Figma bindings to
  `palette/*`, `primitives/*` or `ink/*` map to the semantic token that resolves
  to them (check `tokens/base/semantics/base.json`). A token from a foreign
  collection (tagged `[Collection]` by the read script) has no Zebra name: find
  the Zebra equivalent and record the swap.
- **Text styles exactly as Figma.** Read every text node's style and
  size/line-height/weight first. Use the matching `--text-<style>` token.
  Never snap to a nearby style; if none matches, keep Figma's values and say so.
- **Variants and colors exactly as Figma.** Read every component variant and properties and use the equivalent in code. If colors are applied overiding the default in Figma, copy that across.
- **Follow Figma's component choices and variants** (flavour, size, shape,
  disabled) exactly, even where earlier pages chose differently.
- **Explicit modes count.** A frame set to palette Dark in Figma gets
  `className="mode-dark"`.
- **Don't change library components** to make a page fit. Work around it with
  scoped page CSS (`.xx-` prefix in a `PAGE_CSS` string), comment why, and
  report it as a component gap. Change a component only when the user asks.
- **Animate appearances.** Anything that appears or disappears moves, even
  when Figma shows only the end states:
  - side sheets slide in from their edge;
  - bottom sheets rise from the bottom;
  - scrims fade;
  - dialogs, menus and toasts ease in;
  - each reverses on close.

  Use the motion tokens (`--animations-smooth`, `--animations-spring` for a
  playful bounce) and turn every animation off under
  `prefers-reduced-motion`. Components that already animate (Navigation Rail,
  Bottom Sheet) keep their own motion. The pattern is in page-template.md.
- **Panels fill the space.** A collapsible rail or drawer works in the page,
  wired to its own toggle (and the header's menu button). The content beside
  it takes whatever width is left, with no fixed width on the rail's wrapper.
- **Every divider in Figma is drawn.** Header bottoms, rail and sub menu
  edges, footer tops, panel splits and Divider instances all count, whether
  a frame, a library instance or a Divider draws them. A library component
  that doesn't draw the same line gets a Divider or a page-CSS border beside
  it, with a comment, and a row in the report.
- **Don't invent screens.** Undesigned paths stay inert (disabled Next, no-op),
  and are reported. Motion is not a screen; add it.
- Never print the Figma token. No commits, no new dependencies.

## Time it

Run `date +%H:%M:%S` as the very first step and again after the final check.
Note the clock at each phase boundary below; the report needs the split.

## Workflow

### 1. Map the flow (Figma, read-only)

From the URL take `fileKey` and `nodeId` (`14-33031` → `14:33031`). Call
`create_session` once if there's no session yet.

- **Warm up Storybook now**, not at step 6: if nothing answers on 6008, start
  `npx storybook dev -p 6008 --no-open` in `packages/react-baseui` in the
  background. It's ready long before the browser check needs it.
- Run `scripts/list-frames.js` (set `INPUT.sectionId`) through `use_figma`.
  It lists the screens, stage and branch labels, local components, each
  screen's overlays, local option states and disabled buttons. Don't use
  `get_metadata` on a whole section; it overflows.
- Screenshot the screens that differ (one per stage and branch, not every
  hover variant) in one call with `scripts/export-images.mjs <fileKey>
  <scratchpad>/figma 41:6250=01-usb@1 …`, which is faster than one
  `get_screenshot` per screen. Start it **in the background** and look at the
  shots while step 2's reads run — the two don't depend on each other.

### 2. Read the details

Run `scripts/read-screens.js` with `INPUT.ids` set to:
- each distinct screen's content frame,
- each dialog, toast and scrim instance,
- the section's local components (all variants, so hover, selected and
  disabled fills are known).

Issue several calls in parallel when the list is long. From the output, note:
- text style and size per text,
- gap and padding tokens per frame,
- fills and strokes per state,
- component, variant and properties per instance,
- explicit modes,
- image layers (`image.id`).

Then run `scripts/scan-dividers.js` with `INPUT.ids` set to every distinct
screen (one call takes several). It lists each layout line: borders with the
sides they draw (`right 1` on a sub menu, `top 1` on a footer), Divider
instances, lines and 1–2px fills, with their position and token. Keep the
list: step 6 checks it line by line.

### 3. Export images

```bash
node .claude/skills/zebra-figma-page-build/scripts/export-images.mjs <fileKey> \
  packages/react-baseui/stories/assets/<page> <nodeId>=<name>@2 <nodeId>=<name>@3
```

Scale 2 for illustrations, 3 for small photos. Run it in the background and
carry on with step 4 — nothing before the story file needs the PNGs on disk.
Reference them in the story
with `new URL("./assets/<page>/<name>.png", import.meta.url).href`.

### 4. Look up the components

```bash
node .claude/skills/zebra-figma-page-build/scripts/react-props.mjs          # all
node .claude/skills/zebra-figma-page-build/scripts/react-props.mjs dialog   # one
```

Map each Figma instance to a component and its props. Check every glyph name
in one go — `node .claude/skills/zebra-figma-page-build/scripts/icon-check.mjs
chevron-right sync …` (misses print the closest real names) — rather than
finding a wrong name at the browser check. Where Figma sets something a
component can't (a hidden icon, a hidden part, a swapped glyph), plan the
page-CSS workaround now and log it as a component gap.

### 5. Write the story

Follow [references/page-template.md](references/page-template.md): file header
listing every departure from Figma, `t(role)` type helper, `PAGE_CSS`, one
composed part per Figma local component, a state machine for the flow, inert
background under dialogs, and stories for the full flow, each branch, jump-ins
to long steps, and Dark.

Then:

```bash
.claude/skills/zebra-figma-page-build/scripts/typecheck-story.sh stories/<Name>Page.stories.tsx
```

### 6. Check it in the browser

Storybook for React runs on 6008; step 1 already started it if it wasn't up.

Write a steps file in the scratchpad (format in the header of
`scripts/check-page.cjs`) that walks every screen and branch, then:

```bash
node .claude/skills/zebra-figma-page-build/scripts/check-page.cjs <steps.cjs> <scratchpad>/shots
```

- **Open every screenshot** and compare it with the Figma screenshot of the
  same state.
- **Compare each `.txt` table** against Figma's text sizes.
- **Fix and rerun until it's clean:** no console errors, and every text
  matching Figma.

- **Check every divider** from step 2's scan against the screenshot: each
  border, Divider and line must be there, on the same side and in the same
  token. Library components often draw some edges and not others (Navigation
  Rail draws its own right edge but not its sub menu's).

- **Check motion:** take one screenshot about 100ms after opening a sheet or
  dialog (it should be part-way in), and one after collapsing the rail (the
  content should have widened).

Common catches:
- **Inline styles beat page CSS.** Components that style a part inline need
  `!important` to hide it.
- **Background controls stay focusable under an inline dialog.** Make the
  page behind it `inert`.
- **Fixed heights.** Figma frames with a fixed height (a 56px header holding a
  48px button) need an explicit `blockSize`.

### 7. Report

End with this report, every time:

```
Built <Name> in <m>m<s>s (<start> → <end>).

Where the time went
| Phase | Time | What slowed it |
| Map the flow | … | … |
| Read details | … | … |
| Export images | … | … |
| Look up components | … | … |
| Write the story | … | … |
| Browser check and fixes | … | … |

Issues
- Component gaps (workarounds in page CSS): <component>: <what Figma does that it can't> → <workaround>
- Token swaps: <Figma binding> → <token used>, why
- Figma inconsistencies: <what>, which value was used
- Not designed, left out: <path>
- Errors hit while building: <what>, <fix>

Speed-ups for next time: <one or two concrete ones, from this build>
```

Leave out an Issues line only if it has nothing. Also record new component
gaps in `references/component-gaps.md` so the next build plans for them up
front.

## Where things are

| What | Where |
|---|---|
| Existing pages (patterns) | `packages/react-baseui/stories/*Page.stories.tsx` |
| Page template | `references/page-template.md` |
| Known component gaps | `references/component-gaps.md` |
| Tokens (CSS) | `packages/react-baseui/src/tokens/` |
| Semantic → palette map | `tokens/base/semantics/base.json` |
| Icon names | `packages/icons/codepoints.json` |
| Node for scripts | `export PATH="$HOME/.nvm/versions/node/v24.13.1/bin:$PATH"` |
