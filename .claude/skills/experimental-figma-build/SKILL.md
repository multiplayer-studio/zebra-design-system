---
name: experimental-figma-build
description: Build an experimental code component into Figma, on a branch, as a documented component page — a board named for the component with its details card and main component, a matching board per subcomponent, built from the file's existing scaffold, components, variables and icons only — then offer a metadata frame written for builders. Use whenever someone wants an experimental React or web component (packages/react-baseui or packages/web-components, marked EXPERIMENTAL) put into Figma, asks to "design", "draft", "mock up" or "push" an experimental component into the Zebra library, or shares a Figma branch link to build one on. Refuses non-experimental components and the main branch.
---

# Experimental Figma Build

Takes a component that exists **only in code, as an experiment**, and builds
it into a Figma branch the way the library documents every other component,
so design can review and refine it before it gets a real spec.

Code is the source of truth here. Figma is the draft. That is the opposite
direction to `zebra-figma-component-spec`, which reads a finished Figma page
into a spec.

Load **figma-use** and **figma-generate-library** before the first
`use_figma` call; pass `skillNames: "figma-use,figma-generate-library"`.

## The rules

1. **Experimental components only.** The source must be marked experimental
   in code: `EXPERIMENTAL` in the component's JSDoc *and* a story titled
   `Experimental/<Name>`. Anything else already has (or should get) a Figma
   spec first — stop and say so.
2. **Never the main branch.** Build only on a Figma branch. A branch link
   looks like `figma.com/design/<fileKey>/branch/<branchKey>/<name>?node-id=…`
   — use `<branchKey>` as the file key. A link without `/branch/` is main:
   stop and ask the author for a page link on a branch. Don't offer to
   build on main "just this once"; don't create the branch yourself.
3. **Use the existing scaffold.** Copy the board layout of an existing
   component page rather than drawing one: a board named for the component
   holding the component-details card, the "Master Component" label and the
   main component set, and one board of the same structure per
   subcomponent. See [references/page-scaffold.md](references/page-scaffold.md).
4. **Only what's in the project.** Components, variables, styles and icons
   from this file. No new variables, no remote libraries, no detached
   instances, no images. Icons go through the Icon component's Name swap,
   resolved from `packages/icons/codepoints.json` (`setId`).
5. **Offer metadata at the end.** When the build passes, ask whether to add
   a metadata frame. If yes, copy an existing one and rewrite it — never
   build one from scratch.
6. **Write for the builder.** Short. Intent and usage over appearance. Token
   names, not values. Call out anything that exists only because of how
   Figma works, so code doesn't inherit it. See
   [references/writing.md](references/writing.md).

## Workflow

### 1. Check the inputs

- **Component:** find it in `packages/react-baseui/src/components/` (or
  `packages/web-components/src/components/`). Confirm rule 1 with
  `grep -n EXPERIMENTAL` on the component and the story title. Read the
  component, its CSS and its stories: the stories are the state inventory.
- **Link:** confirm rule 2. The `node-id` should point at the target page
  (or anything on it). If it points at a page that already holds other
  components, ask before adding to it.

Then post one short checklist: what will be built (sets, variant axes,
subcomponents), which existing components and sets it reuses, where it
goes. Wait only if something is ambiguous.

### 2. Discover

Run [scripts/discover-scaffold.js](scripts/discover-scaffold.js) twice, one
call each (never switch pages twice in one call):

- on the **target page**: what's there, free space, existing boards;
- on a **reference page** for the closest existing component (the one the
  experiment reuses most — Input for a field, Dropdown for a menu): its
  board structure, the names of the details-card text layers, the metadata
  frame if any.

Then `search_design_system` (after `get_libraries`) only to confirm local
assets you couldn't find on a page. Map every visual value in the code's
CSS to a variable that exists in the file. **A CSS token with no Figma
variable is a gap** — list it; don't create the variable, don't inline the
value without saying so.

### 3. Build the boards

Clone, don't draw. [scripts/clone-node.js](scripts/clone-node.js) copies a
node (a reference board, a details card, a metadata frame) onto the target
page, places it clear of existing content, and returns every text layer so
you can rewrite them in one follow-up call.

- **Board:** clone the reference board, rename it, rewrite the details card
  (name, one-line description per rule 6, platforms "Pending
  development", created/updated dates, a change-log row with the author),
  set the status instance to its experimental / in-progress option (read
  the options; don't invent one), and remove the reference's component set
  from the clone.
- **Main component:** prefer **cloning the closest existing set** and
  trimming it (keeps every variable binding) over building from frames.
  Compose assemblies from instances of existing sets. Expose nested
  instances where the code exposes the child's props.
- **Subcomponents:** one board each, same structure, only if the code has
  a genuinely separate part (its own props, reused elsewhere). Parts that
  are only layout stay inside the main component.
- **Variant axes** mirror the code's props. Interaction states (hover,
  focus, pressed) are variants only if the sibling family models them that
  way. Matrices over ~30 only when a sibling family already does it.

Lessons this skill was built from — check for each:

- Cloned sets carry parts that don't apply (a text caret in a select's
  focus state). Remove them in every variant.
- Instances keep their original fixed widths. Set content and rows to FILL
  when the code stretches them.
- Boards clip. After placing a set, check it fits its board; stack
  variants rather than widening the board.
- After `combineAsVariants`, lay the variants out and resize the set.

### 4. Validate

- Structural: variant count and names, component properties, exposed
  instances, and **no unbound solid paints** in anything you created
  (instances keep their sources' bindings; check your own frames).
- Visual: one `get_screenshot` per board; compare against the component's
  Storybook stories. Fix, re-shoot only what changed.
- Every icon name used exists in `codepoints.json` and isn't `retired`.

### 5. Report, then offer metadata

Report briefly: boards and sets created (with node links), what was reused,
gaps (missing variables, code features with no Figma equivalent), and the
Figma-only workarounds you used.

Then ask: *"Do you want a metadata frame for it?"* If yes:

1. Clone the reference component's metadata frame (`<Name> Metadata`,
   built from the Button Metadata template) next to the new board.
2. Read its sections with
   `.claude/skills/zebra-figma-component-spec/scripts/read-metadata.js` to
   get the structure.
3. Rewrite every section for the new component per
   [references/writing.md](references/writing.md). Add or remove table rows
   by cloning or deleting row frames, never by leaving placeholder rows.
4. Verify nothing from the source component survives: compare the frame's
   text inventory with the source's — any identical string outside the
   template's fixed labels is a leftover.

Never write descriptions into the details card or metadata from the
reference component's text — the "Select" page this skill grew from carried
Search's and Input's descriptions, copied and never rewritten.

## Gotchas

- Page context resets every `use_figma` call, and a call may switch pages
  once. Cross-page clones work: clone on the source page's node, append to
  the target.
- Mutating calls are sequential, never parallel.
- Text edits need fonts loaded from the node's current segments.
- Set descriptions only on `COMPONENT` / `COMPONENT_SET`.
- If MCP reports no permission for the file, stop and tell the author — the
  branch may not be shared with the connected account.
