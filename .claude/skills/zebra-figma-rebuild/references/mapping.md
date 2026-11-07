# Mapping an old design onto Zebra

Every old part maps to exactly one of: a Zebra component (with variant and props), a local pattern component
composed from Zebra components, or plain layout (auto-layout frames bound to tokens). Every old value maps to a
Zebra variable or style. Build the table first, then build the screens from it.

Write the table in your working notes as you read, one row per old part:

| Old part (name · where) | Zebra | Variant / props | Notes |
|---|---|---|---|
| Global Header (Desktop) · top | Global Header | Rounded=false · PlatformName "Zebra Nucleus Connector", SearchBar off, AppSwitcher off | old had no search |
| Printer row · list | **Printer Card** (local) | Card base + Icon + Status Label | repeats ×6 → local component |

## Components: match by role, then by variant

1. **Name the role** of the old part (navigation, page header, primary action, list row, status, empty state…),
   not its old name. Old libraries name things differently ("Expanded Menu", "Web Nav").
2. **Find the Zebra component for that role:** `node scripts/catalog.mjs --find <word>` (try two or three words).
   Then read the real APIs — all candidates in one `catalog.mjs --api "<names>"` — before choosing variants:
   the variant axes and property names (with their `#ids`) are what the build uses.
3. **Pick the variant that reproduces the old look:** size by the old height (component-api gives each default
   size), flavour by emphasis (filled primary → `primary`, bordered → `outline`, text-only → `text`), shape by
   corner radius (square → `sharp`, small radius → `rounded`, pill → `full`), and the old state (hover, selected,
   disabled) when the screen shows one.
4. **Same-named sets:** the catalog may list two (e.g. Status Label on "Badges" and on its own page).
   `--keys` and `--api` pick the one the repo's specs point at and say so on stderr; when no spec settles it,
   compare both with `--api` and take the one with the fuller API. Say which you used.
5. **Slots:** some Zebra components take content through native slots (Card base `Body`, Navigation Rail
   `Menu Slot`, Global Header `Slot-Menu-Items`). Find the slot node inside the instance
   (`inst.findOne(n => n.type === "SLOT" && n.name === "Body")`) and append Zebra instances or token-bound
   frames into it. Never detach to get at the insides.

### When nothing in the library fits: reuse, then compose a local component

First look in the target Rebuild section's Local components row: an earlier rebuild may already have composed the
pattern (Wizard Header, Wizard Steps, Wizard Footer, Network List Item, Printer Summary, Printer Card in the
Nucleus section). Reuse it, overriding fills or nested variants to match this source where they differ.


Make a **local pattern component** when an old part either repeats (≥2 uses across the screens) or is a
recognisable block a product team would reuse (a printer row, a wizard footer, an option card). Rules:

- Build it once with `figma.createComponent()` (variants with `combineAsVariants` when the old design shows
  states such as default / hover / selected), from Zebra instances and token-bound auto-layout frames only.
- Name it by its role in the product, in Title Case ("Printer Card", "Wizard Footer"), never "Custom Button".
- Expose what changes per use as component properties (TEXT for labels, BOOLEAN for optional parts,
  INSTANCE_SWAP for icons), so the screens use instances with overrides, not copies. Exception: content placed
  inside a library component's slot (e.g. Card base's Body) can't carry properties; override it per instance.
- Place it in the **Local components** row of the rebuild (see layout.md) and use instances of it in the screens.
- A one-off block stays plain layout inside the screen. Don't componentise everything.

A local component is never a stand-in for a library component that exists: a hand-drawn button, input or chip
is a failure, even if it looks right.

### Icons

Old icons map to Zebra glyphs by meaning, then by name: `catalog.mjs --find chevron`. Place them through Zebra's
`Icon` component (or the icon slot of a component, e.g. Button's `Leading Icon`) and swap the glyph with
`iconInto` / `icon` from helpers.js. Match the old icon's size with the Icon `Size` variant
(xsmall 12 · small 16 · medium 20 · large 24). If no glyph means the same thing, use the closest and list it.

### Images and logos

Product photos, avatars and illustrations are content, not system parts: copy the image fill from the source
node with `imageFrom(source, target)` (same file, same hash, same crop). Logos: use the library's logo
component when there is one (`catalog.mjs --find logo`); otherwise reuse the source image.

## Tokens: match by role, not by hex

The old file's variables come from other collections ("Semantics", "Platforms", "Typography Primative ").
Never import or keep them. For each old value, ask what it is *for*, then take the Zebra **semantic** token for
that role **whose light-mode colour matches the old one**. The role narrows the family; the colour picks the
member. A white page background is `surface/section` (white), not `surface/page` (light grey), even though
"page" sounds like the role: the rebuild should look like the original, and a page that turns grey is a visible
change nobody asked for. Check a candidate's light value with `node scripts/catalog.mjs --find <name>` against
`tokens/base/palette/light.json`, or by eye in the compare image.

| Role | Zebra family | Examples |
|---|---|---|
| Page, card, section, overlay backgrounds | `surface/*` | section (white) · page (light grey) · card · subtle · overlay (dialogs, sheets, menus, popovers) · inverse · info/success/warning/error |
| Text and icons | `foreground/*` | primary · secondary · tertiary · disabled · link · inverse · on-strong · success/warning/error/info |
| Lines and outlines | `border/*` | subtle · default · strong · focus · disabled · status colours |
| Anything you press | `interactive/<kind>/<part>/<state>` | kinds: primary, neutral, ghost, destructive, inverse… parts: background, border, foreground |
| Status messages and badges | `feedback/<status>/*` | background/subtle · background/strong · foreground |
| Selected rows, highlighted items | `selection/*` | background · border · text |
| Dimming behind modals | `overlay/scrim` | |
| Spacing (gap, padding) | `space/*` | 3xs 2 · 2xs 4 · xs 6 · sm 8 · md 12 · lg 16 · xl 24 · 2xl 32 · 3xl 40 … plus page, section, card, gutter |
| Corner radius | `radius/*` | none · xs · sm · md · lg · xl · pill · element-sm/md · container |
| Line weight | `stroke/*` | thin · base · thick · heavy |
| Control and icon sizes | `control/*` | sm · md · lg · icon-sm/md/lg · target-min |
| Shadows | effect styles | Shadow/xsmall · small · medium · large |

### Lines and dividers

Every line the old design draws comes across, in the same place. Read stroke sides as well as stroke colour:
a header with a bottom-only border, a rail with a right-only border, a 1px rectangle between groups. Each
becomes a Zebra **Divider** instance (horizontal or vertical, FILL along its length) placed where the line was:
under the header in the screen's column, between the rail and the page in the row, between list groups. A
library component that already draws the line (Navigation Rail's menu and footer dividers) doesn't need another.
Missing dividers are easy to overlook and change the whole structure of a screen, so check for them in the
compare image before calling a screen done.

Read the exact names with `catalog.mjs --find <family>/`. Spacing: snap the old number to the nearest `space/*`
step; if it sits between two, take the one that keeps the old alignment and note it. Palette and primitives
variables are not for direct use: the audit flags them.

**The published library can lag the file.** Builds can only bind published variables. If the repo's `tokens/`
names a token the catalog doesn't have (e.g. `surface/overlay` before it's published), use the published name
it replaces (`surface/dialog`), and tell the user to publish the library so the rebuild can be re-pointed.

## Text styles: match size and weight, then role

Every text node gets a Zebra text style; no free-floating font settings. For each old text: read its size,
line height and weight (inventory and the frame read give them), then choose the Zebra style with the **same
size and weight**. The Zebra ramp (size/line-height, weight):

| Style | Size | Weight | Typical role |
|---|---|---|---|
| display/large · medium · small | 52/60 · 44/52 · 36/40 | Light | hero numbers, splash titles |
| heading/large · medium · small | 32/36 · 28/32 · 24/28 | Regular | page and section titles |
| title/large · medium · small | 20/24 · 16/20 · 12/16 | Medium | card titles, toolbar titles, group labels |
| body/large · medium · small · xsmall | 20/24 · 16/24 · 14/18 · 12/16 | Regular | paragraphs, descriptions, meta |
| label/large · medium · small | 16/24 · 14/20 · 12/16 | Medium | buttons, field labels, tabs, list primary text |
| indicator/medium · small | 12/14 · 10/12 | Medium · Regular | badges, counters |

When no style matches size and weight exactly, take the one closest in size *within the right role* (a 22px
bold title becomes title/large, not heading/small) and list the change in the report — it's a visible
difference the user should know about. Text colour is always a `foreground/*` token (or the component's own).

## Known mappings

Seed list from rebuilds already done in this system. Add a row whenever a rebuild settles a new one.

| Old part | Zebra | Notes |
|---|---|---|
| Global Header (Desktop) | Global Header | SearchBar, AppSwitcher, ActionMenu, MenuItems booleans; PlatformName text; `mode(gh, "Light")` for a light header. Always shows the account menu and is 56 tall (old 52): report both |
| _Navigation Rail (Web) / Expanded Menu | Navigation Rail (Label=false, Expanded=true) | three fixed Rail Items, then `Menu Slot` (divider + items) and `Footer Slot`; turn off Show Sub menu, Show Header Action, Show Toggle Item; hide Navigation Header with a layer override; `mode(rail, "Light")` on a light design. Width is fixed at 200 (old rails were 240): a visible difference to report |
| _Navigation Rail (Web) / Menu Item | Navigation Rail Item | Label, Show Label=true, State=selected for the current page; `iconInto(item, "Icon", …)` |
| Button | Button | Flavour by emphasis, Size by height (small 32 · medium 40 · large 48) |
| Status Label | Status Label | status by meaning (positive = "Ready") |
| Divider | Divider | Orientation |
| Printer list card (Nucleus) | local **Printer Card**: Card base (hasHeader/hasFooter off) with image, model (label/large), Status Label, serial (body/small) and Chevron Right in its Body slot | built in the Nucleus Rebuild section; override text and image per instance |
| Stepper / wizard steps | Vertical Stepper + Step Card/Round | as in the Connect Printer rebuild |
| Modal / Processing Modal | Dialog | over `overlay/scrim` |
| Scrim | a frame filled with `overlay/scrim` | |
