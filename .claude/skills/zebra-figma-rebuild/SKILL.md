---
name: zebra-figma-rebuild
description: Rebuild an existing Figma design — one screen, a frame of screens, or a whole section — in Figma, using only the Zebra Design System library (components, semantic variables, text and effect styles), composing local pattern components from Zebra parts where the product needs them, so the result looks like the original but is made entirely of the system. Then outline better options and offer to implement them. Use whenever someone shares a Figma frame or section link and asks to rebuild, redesign, migrate, convert, "zebra-fy", modernise or port an old or off-system design to the Zebra library in Figma, or to replace an old library's components with Zebra's. Figma only: it never writes code (for a coded page from Figma, that's zebra-figma-page-build).
---

# Zebra Figma Rebuild

Takes a design made with an old library (or none) and rebuilds it **in Figma**, in the same file, from the
Zebra Design System: the same screens, layout, content and hierarchy, made only of Zebra components, Zebra
semantic tokens and Zebra text and effect styles. The original stays untouched. After the faithful rebuild,
it proposes improvements and implements the ones the user picks.

It never touches code. `zebra-figma-page-build` goes the other way (Figma → a React story).

Load **figma-use** and **figma-generate-design** before the first `use_figma` call, and pass
`skillNames: "figma-use,figma-generate-design"` on every call.

## Rules

1. **System only.** Every instance is a Zebra library component or a local pattern component built from them.
   Every colour, gap, padding, radius and stroke is bound to a Zebra variable; every text has a Zebra text style;
   every shadow a Zebra effect style. No old-library instances, no old variables, no detached instances, no raw
   values. The only exception is image content (photos, product shots), copied from the source.
2. **Semantic tokens.** Choose tokens by what a value is for (`surface/card`, `foreground/secondary`,
   `space/lg`), not by matching its hex. Palette and primitive variables are not for direct use.
3. **Faithful first.** Same frame sizes, same layout, same content (real copy, not placeholders), same visual
   weight. Differences come only from Zebra's own components looking like themselves, and each one that is
   visible gets listed. Improvements go in recommendations, never silently into the rebuild.
4. **Compose, don't hand-draw.** When the library has no component for a block that repeats or that a product
   team would reuse, make a local pattern component from Zebra parts. Never draw a stand-in for a library
   component that exists.
5. **Every screen.** A section or a frame of screens means every screen in it, in its original arrangement,
   with its annotations carried across.
6. **Ask where it goes**, once, before writing anything: beside the original, a new "Rebuild" section, or an
   existing one.
7. **Published library only.** Builds import by key from the published Zebra library. If the repo's `tokens/`
   is ahead of what's published, use the published name and say so.

## Scripts

| Script | Runs | Does |
|---|---|---|
| `scripts/catalog.mjs` | node | Zebra's published components, icons, variables and styles with keys (cached a day). `--find <word>`; `--keys "<exact names>"` → the `K` map for build calls (misses print close names, same-named sets resolve from `specs/`); `--api "<names>"` → component APIs (props with `#ids`, variant options, default variant, size, exposed instances) over REST, cached |
| `scripts/inventory.js` | use_figma, read | What to rebuild: the screens in a frame or section, what each is made of, existing Rebuild sections |
| `../zebra-figma-page-build/scripts/read-screens.js` | use_figma, read | Each screen in detail: layout, tokens, text styles and sizes, instances with variants and props, images |
| `../zebra-figma-page-build/scripts/export-images.mjs` | node | PNGs of source and rebuilt screens (REST) |
| `scripts/component-api.js` | use_figma, read | Fallback for `catalog.mjs --api`: same output, read in the target file — only to verify an import that failed |
| `scripts/place.js` | use_figma, **writes** | Empty target frames beside the source or in a Rebuild section |
| `scripts/helpers.js` | paste into build calls | `inst`, `iconInto`, `icon`, `mode`, `frame`, `fill`, `stroke`, `gap`, `pad`, `radius`, `effect`, `text`, `imageFrom`, `add` — all take names from `K`, never values |
| `scripts/audit.js` | use_figma, read | The gate: anything not from the system |
| `scripts/compare.py` | python | Source \| rebuild \| difference, with a mismatch score per region |

Run the node scripts from the repo root (`export PATH="$HOME/.nvm/versions/node/v24.13.1/bin:$PATH"` if node
isn't found). Scripts with an `INPUT` block: replace the placeholders and pass the whole file as `code`.

## Workflow

### 1. Read the source

- From the link take `fileKey` and `node-id` (`1-15353` → `1:15353`). `create_session` once, and run
  `node scripts/catalog.mjs` in the same turn (it refreshes if older than a day; they're independent).
- Run `inventory.js` on the node. It returns the screens (one, or all in the section/frame, in reading order),
  their annotations, what each is made of, and any existing Rebuild sections. Post one line: what will be
  rebuilt ("6 screens of My Printers, plus 3 dialogs").
- As soon as inventory returns ids, start `export-images.mjs` (1x, into the scratchpad) **in the background**
  and move on to step 2 — look at each shot when it lands. This is the reference you'll compare against.

### 2. Ask where it goes

One AskUserQuestion, per [references/layout.md](references/layout.md). Recommend a new Rebuild section for a
section or several screens, beside the original for one screen.

### 3. Map

Run `read-screens.js` on each distinct screen (states that only differ by hover or a dialog can share one read).
Then build the mapping table — old part → Zebra component / local component / layout, old values → tokens,
old text → Zebra text styles — following [references/mapping.md](references/mapping.md):

- find candidates with `catalog.mjs --find`, then read all their APIs in one `catalog.mjs --api "<names>"`
  (REST, cached — no Figma round trip; `component-api.js` only if a build import later fails);
- check the target Rebuild section's Local components row first: a pattern an earlier rebuild already composed
  from Zebra parts (a wizard header, a list row) is reused as-is, not rebuilt;
- decide the new local pattern components (what repeats, what has no library match) and their properties;
- collect every name you'll use and run `catalog.mjs --keys "<all of them>"` once: that's `K`. Fix any
  miss using the close names it prints; same-named sets are picked from `specs/` automatically.

### 4. Place and build

Run `place.js` with the user's choice. Then build, **one mutating call at a time** (never in parallel):

1. **Local components first**, into the Local components row (layout.md), so screens can use instances.
2. **Each screen**, one call per screen (split a dense screen into two or three calls by region: shell,
   content, overlays). Every call is `const K = {...}` + the whole of `helpers.js` + the build code, appending
   into the target frame by id. Use auto-layout, fill real copy, set component properties instead of editing
   text inside instances, and copy images with `imageFrom`.
3. **Annotations** (stage labels, arrows, notes) at the offset `place.js` returned.

Return the ids you create from every call.

### 5. Check, fix, repeat

- **Audit** every rebuilt screen and local component with `audit.js` (`K` = the map you built with, plus any
  library part a component puts in its own slots, e.g. Global Header's Brand Logo Horizontal, or that a reused
  local component holds in its slots, e.g. Step Card/Round). Local components reused from an earlier rebuild go
  in `allowLocal` instead of being re-audited. Fix every
  blocking finding: a foreign instance, raw colour, unbound spacing, missing text style or foreign token.
  `non-semantic` and `opacity` are warnings: fix them unless there's a reason, and say the reason.
- **Compare** each screen: export the rebuild at 1x, run `compare.py source.png rebuild.png out.png`, read the
  image. Fix layout, sizing, spacing and content drift until what remains is only Zebra components' own look.
  Re-export only what you changed.

Done means: audit clean, every screen compared, every remaining visual difference explained.

### 6. Report

Short, with node links:

```
Rebuilt <n> screens of <source> into <placement> (<link>).

Made from: <Zebra components used, with counts>. Local components: <name — what it's made of>.
Audit: clean. Compare: <screen — differs x%, why> for each screen.

Differences from the original
- Text: <old style/size> → <Zebra style>, <where>
- <part>: <old look> → <Zebra component's look>
Gaps
- <old part with no good Zebra match> → <what was used>
- <token in tokens/ not yet published> → <published one used>
```

### 7. Recommend, then offer to implement

Follow [references/recommendations.md](references/recommendations.md): up to six specific improvements, then ask
which to implement and whether on a copy (recommended) or in place. Implement the chosen ones under the same
rules, re-run the audit, and report one line per change.

## Gotchas

- Page context resets every call; a call may switch pages once. Mutating calls are sequential.
- `importComponentSetByKeyAsync` failing means the component isn't published, or the file can't see the library:
  enable "Zebra Design System" in the file's libraries, or pick a published alternative.
- Text: create it with `text()` from helpers (loads the style's font, applies the style). Editing text inside an
  instance goes through its TEXT property (`setProps`), not `characters`.
- `layoutSizingHorizontal = "FILL"` only after the node is in an auto-layout parent (`add()` does this).
- Instances keep the component's own size; set FILL on them when the source stretches them. Never set an
  instance's vertical sizing to HUG when its component has a fixed height (list rows, headers): it collapses to
  its content. Pass only the horizontal sizing to `add()` for those.
- Slots: append into the SLOT node inside the instance; don't detach. Content in a nested instance's slot can't be
  bound to the outer component's properties ("Cannot set component property references on instance sublayer"):
  leave it unbound and override text, images and visibility on each instance instead.
- Slot content fails silently: `insertChild` does nothing (use `appendChild`), and a hidden child is dropped. Never
  hide optional parts inside a local component's slot; add them on the instances that need them.
- A Button placed in a slot keeps "Button" as its text whatever its Label property says. Set its TEXT node too.
- Dividers added before their row was sized can render at the old width though the node reports the new one.
  Resize them (fixed, then back to FILL) and check the export.
- Some library parts pin a palette mode (Global Header and Navigation Rail are locked to Dark). On a light design,
  set them to Light with `mode(instance, "Light")`, or they render dark.
- A part with no visibility property (Navigation Rail's Navigation Header) is hidden with a layer override
  (`node.visible = false` on the nested layer), never by detaching.
- A failed call is rolled back as a whole, but check the canvas before retrying anyway.
- Big screens fail as one call: split by region, and return ids so a failed call can be retried alone.
