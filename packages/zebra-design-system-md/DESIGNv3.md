---
version: alpha
name: Zebra Design System (Zeta)
description: "Calm, high-contrast, utility-first UI for enterprise and field-operations software: cool gray canvas, white work surfaces, one blue accent, IBM Plex Sans, color reserved for meaning."
colors:
  # Roles (light theme). Values are from tokens.json `color.light.*`.
  primary: "#1f69ff"            # interactive.primary.background.default
  primary-hover: "#3886ff"
  primary-pressed: "#0e53e5"
  on-primary: "#f8fbff"
  primary-container: "#e0f0ff"  # surface.brand / interactive.subtle.background.default
  on-primary-container: "#1f69ff"
  link: "#0e53e5"               # interactive.ghost.foreground.default (text and outline buttons)
  secondary: "#ff4d00"          # interactive.secondary.background.default (rare, accent only)
  background: "#f3f6fa"         # surface.page
  surface: "#ffffff"            # surface.section, dialog, menu, popover, sheet
  surface-card: "#f8fbff"
  surface-hover: "#f3f6fa"      # interactive.neutral.background.hover
  surface-pressed: "#e0e3e9"    # interactive.neutral.background.pressed
  selection: "#b9daff"
  inverse-surface: "#1d1e23"    # surface.inverse / tooltip
  on-inverse-surface: "#f8fbff"
  on-surface: "#0c0d0e"         # foreground.primary
  on-surface-variant: "#545963" # foreground.secondary
  on-surface-tertiary: "#7a8190"
  disabled: "#8d95a3"           # foreground.disabled
  disabled-container: "#e0e3e9"
  outline: "#ced2db"            # border.default
  outline-variant: "#e0e3e9"    # border.subtle
  outline-strong: "#7a8190"
  focus: "#1f69ff"              # border.focus / focus.ring
  scrim: "rgba(12, 13, 14, 0.6)"
  error: "#d70015"
  error-container: "#fff0f1"
  success: "#00864f"
  success-container: "#ecfff7"
  warning: "#ae6500"
  warning-container: "#fef2e2"
  info: "#0073e6"
  info-container: "#f1f8ff"
  gradient-start: "#7e0cff"
  gradient-end: "#4f62fe"
  # Dark theme: the roles that change. Anything not listed keeps its light value.
  dark-background: "#1d1e23"
  dark-surface: "#0c0d0e"
  dark-surface-card: "#0c0d0e"
  dark-surface-raised: "#2c2f36" # dialog, menu, popover, sheet
  dark-on-surface: "#f8fbff"
  dark-on-surface-variant: "#ced2db"
  dark-outline: "#545963"
  dark-outline-variant: "#2c2f36"
  dark-primary-pressed: "#5ea2ff"
  dark-primary-container: "#00143a"
  dark-link: "#5ea2ff"
  dark-focus: "#3886ff"
  dark-warning: "#d78d26"
  dark-info: "#599fe5"
typography:
  display-large:  { fontFamily: IBM Plex Sans, fontSize: 52px, fontWeight: 300, lineHeight: 60px }
  display-medium: { fontFamily: IBM Plex Sans, fontSize: 44px, fontWeight: 300, lineHeight: 52px }
  display-small:  { fontFamily: IBM Plex Sans, fontSize: 36px, fontWeight: 300, lineHeight: 40px }
  heading-large:  { fontFamily: IBM Plex Sans, fontSize: 32px, fontWeight: 400, lineHeight: 36px }
  heading-medium: { fontFamily: IBM Plex Sans, fontSize: 28px, fontWeight: 400, lineHeight: 32px }
  heading-small:  { fontFamily: IBM Plex Sans, fontSize: 24px, fontWeight: 400, lineHeight: 28px }
  title-large:    { fontFamily: IBM Plex Sans, fontSize: 20px, fontWeight: 500, lineHeight: 24px }
  title-medium:   { fontFamily: IBM Plex Sans, fontSize: 16px, fontWeight: 500, lineHeight: 20px }
  title-small:    { fontFamily: IBM Plex Sans, fontSize: 12px, fontWeight: 500, lineHeight: 16px }
  body-large:     { fontFamily: IBM Plex Sans, fontSize: 20px, fontWeight: 400, lineHeight: 24px }
  body-medium:    { fontFamily: IBM Plex Sans, fontSize: 16px, fontWeight: 400, lineHeight: 24px }
  body-small:     { fontFamily: IBM Plex Sans, fontSize: 14px, fontWeight: 400, lineHeight: 18px }
  body-xsmall:    { fontFamily: IBM Plex Sans, fontSize: 12px, fontWeight: 400, lineHeight: 16px }
  label-large:    { fontFamily: IBM Plex Sans, fontSize: 16px, fontWeight: 500, lineHeight: 24px }
  label-medium:   { fontFamily: IBM Plex Sans, fontSize: 14px, fontWeight: 500, lineHeight: 20px }
  label-small:    { fontFamily: IBM Plex Sans, fontSize: 12px, fontWeight: 500, lineHeight: 16px }
  indicator-medium: { fontFamily: IBM Plex Sans, fontSize: 12px, fontWeight: 500, lineHeight: 14px }
  indicator-small:  { fontFamily: IBM Plex Sans, fontSize: 10px, fontWeight: 400, lineHeight: 12px }
rounded:
  none: 0px
  element-sm: 4px   # buttons, inputs, cards, list and nav items
  element-md: 6px   # dialogs, menus, popovers
  container: 12px   # page-level panels
  pill: 9999px      # chips, badges, avatars, status labels
spacing:
  2xs: 2px
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 24px
  2xl: 32px
  control-sm: 36px
  control-md: 40px
  control-lg: 48px
  target-min: 40px
  icon-sm: 16px
  icon-md: 20px
  icon-lg: 28px
components:
  button-primary:  { backgroundColor: "{colors.primary}", textColor: "{colors.on-primary}", typography: "{typography.label-large}", rounded: "{rounded.element-sm}", height: "{spacing.control-md}", padding: "{spacing.md}" }
  button-outline:  { backgroundColor: "{colors.surface}", textColor: "{colors.link}", borderColor: "{colors.primary}", typography: "{typography.label-large}", rounded: "{rounded.element-sm}", height: "{spacing.control-md}", padding: "{spacing.md}" }
  button-text:     { backgroundColor: "transparent", textColor: "{colors.link}", typography: "{typography.label-large}", rounded: "{rounded.element-sm}", height: "{spacing.control-md}", padding: "{spacing.md}" }
  button-negative: { backgroundColor: "{colors.error}", textColor: "{colors.on-primary}", typography: "{typography.label-large}", rounded: "{rounded.element-sm}", height: "{spacing.control-md}", padding: "{spacing.md}" }
  text-input:      { backgroundColor: "{colors.surface}", textColor: "{colors.on-surface}", borderColor: "{colors.outline}", typography: "{typography.body-medium}", rounded: "{rounded.element-sm}", height: "{spacing.control-md}", padding: "{spacing.md}" }
  card:            { backgroundColor: "{colors.surface}", textColor: "{colors.on-surface}", borderColor: "{colors.outline-variant}", rounded: "{rounded.element-sm}", padding: "{spacing.lg}" }
  page-panel:      { backgroundColor: "{colors.surface}", rounded: "{rounded.container}", padding: "{spacing.lg}" }
  dialog:          { backgroundColor: "{colors.surface}", textColor: "{colors.on-surface}", typography: "{typography.body-medium}", rounded: "{rounded.element-md}", padding: "{spacing.xl}" }
  menu:            { backgroundColor: "{colors.surface}", rounded: "{rounded.element-md}", padding: "{spacing.sm}" }
  status-label:    { rounded: "{rounded.pill}", typography: "{typography.label-small}" }
  table-header:    { textColor: "{colors.on-surface-variant}", typography: "{typography.label-medium}" }
  table-row:       { backgroundColor: "{colors.surface}", textColor: "{colors.on-surface}", typography: "{typography.body-small}", height: "{spacing.control-lg}" }
---

# Design System: Zebra (Zeta)

This is the agent- and Stitch-facing description of how Zebra software **looks**. It replaces `DESIGNv2.md`, which listed every token with no picture of the product. It works alongside `DESIGN.md` (v1), which keeps the rules for accessibility, form factors, motion and spec vocabulary.

Sources of truth, highest first: `tokens.json` (values), `icons.json` (icon names), `components/*.md` (anatomy and states), then this file. The front matter is a curated subset of `tokens.json` under role names. Whenever a key below appears in backticks, it is a `tokens.json` path.

## 1. Visual Theme & Atmosphere

Zeta is a tool, not a brochure. Screens read like a well-lit warehouse office: a cool, pale blue-gray canvas (`#f3f6fa`) with crisp white work surfaces set on it, separated by hairline gray borders rather than shadows. Text is near-black, set in IBM Plex Sans, a sober engineered humanist sans. One saturated blue marks what you can act on, and almost nothing else is colored. Green, amber, red and blue appear only to say something about state, and always come with an icon and a word.

Density is moderate and even. Spacing sits on a 4px grid with 16px and 24px as the workhorse values, controls are 40px tall, and everything aligns to a few strong vertical edges. The software runs on rugged handhelds, tablets, POS terminals and desktops, often in glare, gloves or a hurry. That is why contrast is high, targets are large and nothing depends on hover. Corners are softly rounded (4px on controls), never bubbly. Motion is short and functional.

## 2. Color Palette & Roles

### Primary Foundation
- **Cool Mist Canvas** `#f3f6fa` (`color.surface.page`): the page background behind everything.
- **Clean White Surface** `#ffffff` (`color.surface.section`, `dialog`, `menu`, `popover`): panels, tables, dialogs and menus, meaning the surfaces where work happens.
- **Frost Card** `#f8fbff` (`color.surface.card`): a barely tinted surface for cards nested inside white panels.
- **Graphite Inverse** `#1d1e23` (`color.surface.inverse`): tooltips and the occasional dark band.

### Accent & Interactive
- **Zebra Signal Blue** `#1f69ff` (`color.interactive.primary.*`): primary buttons, selected tab underline, selected nav marker, checkbox and radio fills, focus ring. It brightens to `#3886ff` on hover and deepens to `#0e53e5` when pressed.
- **Deep Link Blue** `#0e53e5` (`color.interactive.ghost.foreground.default`): text buttons, outline-button labels and links.
- **Pale Sky Tint** `#e0f0ff` (`color.surface.brand`): subtle selected rows, the subtle button flavour and brand highlight backgrounds.
- **Selection Blue** `#b9daff` (`color.selection.background`): text and range selection.
- **Violet Gradient** `#7e0cff` to `#4f62fe` (`color.surface.gradient.*`): reserved for the gradient button flavour and AI or assistant moments. Use it at most once per screen.
- **Signal Orange** `#ff4d00` (`color.interactive.secondary.*`): a secondary accent for rare highlights. It must never compete with the blue.

### Typography & Text Hierarchy
- **Ink** `#0c0d0e` (`color.foreground.primary`): headings, body and table cells.
- **Slate** `#545963` (`color.foreground.secondary`): descriptions, table headers, helper text and inactive tabs.
- **Steel** `#7a8190` (`color.foreground.tertiary`): metadata and timestamps.
- **Fog** `#8d95a3` (`color.foreground.disabled`): placeholders and disabled labels.
- **Hairline Gray** `#ced2db` (`color.border.default`): input and outline-button borders, panel edges.
- **Whisper Gray** `#e0e3e9` (`color.border.subtle`): table row dividers and section separators.

### Functional States
Each status has a strong foreground and a pale container (`color.feedback.{status}.*`):

| Status | Foreground | Container | Typical use |
|---|---|---|---|
| Success | `#00864f` Forest | `#ecfff7` | Healthy, online, completed |
| Warning | `#ae6500` Amber | `#fef2e2` | Degraded, expiring, needs attention |
| Error | `#d70015` Signal Red | `#fff0f1` | Failed, offline, destructive actions |
| Info | `#0073e6` Ocean | `#f1f8ff` | Neutral notices, tips |

The overlay scrim is `rgba(12,13,14,0.6)`.

### Dark theme
Dark is a deliberate theme, not an inversion:
- The canvas becomes graphite `#1d1e23` and work surfaces go to near-black `#0c0d0e`.
- Floating surfaces (dialogs, menus) lift to `#2c2f36`.
- Text is `#f8fbff` / `#ced2db` and borders are `#545963` / `#2c2f36`.
- The primary blue stays `#1f69ff`, but pressed and link states lighten to `#5ea2ff`.
- Warning and info lighten to `#d78d26` and `#599fe5`.

The full map is under `color.dark.*`.

## 3. Typography Rules

**IBM Plex Sans** is used everywhere, loaded at weights 300, 400 and 500, never 600 or above. IBM Plex Mono is used only for code, IDs and raw payloads. The type sizes are the same on every device tier.

### Hierarchy & Weights
| Role | Sizes (px, size/line) | Weight | Use |
|---|---|---|---|
| Display | 52/60, 44/52, 36/40 | Light 300 | Rare. Hero numbers, login, empty marketing moments |
| Heading | 32/36, 28/32, 24/28 | Regular 400 | Page titles (`heading.medium` for the page H1) |
| Title | 20/24, 16/20, 12/16 | Medium 500 | Card and dialog titles (`title.large`), section titles and page descriptions (`title.medium`) |
| Body | 20/24, 16/24, 14/18, 12/16 | Regular 400 | Running text `body.medium`, table cells and dense lists `body.small` |
| Label | 16/24, 14/20, 12/16 | Medium 500 | Buttons `label.large`, tabs, nav items and table headers `label.medium`, chips `label.small` |
| Indicator | 12/14, 10/12 | 500 / 400 | Badge counts, notification dots |

### Spacing Principles
- Letter-spacing is always 0. Hierarchy comes from size and weight, not tracking or uppercase.
- Big type is light and small type is medium. Display is 300, so large numbers feel airy. Labels are 500, so small UI text holds up in glare.
- Line heights snap to the 4px grid.
- Text is never centered except in empty states and dialogs with a single message.

## 4. Component Stylings

Every component listed here has a full spec in `components/*.md`. Those specs win on anatomy, bindings and states.

### Buttons
- **Shape:** rectangles with 4px corners (`size.radius.element.sm`), with `sharp` (0) and `full` (pill) available as an explicit Shape choice. Heights are 36, 40 (default) and 48px, with 12px horizontal padding (16px on large) and an optional 20px leading or trailing icon.
- **Flavours, in order of frequency in real products:**
  1. **Outline:** white with a 1px blue border and deep-blue label. The everyday secondary action.
  2. **Primary:** solid Signal Blue with a white label. One per view region.
  3. **Text:** label only, deep blue. Used for tertiary and inline actions.
  4. **Outline-subtle:** white with a gray border and ink label. Used for neutral toolbar actions.
  5. **Negative:** solid red. Only for destructive confirmation.
  6. **Positive** (solid green), **subtle**, **gradient** and **text-gradient** are rare.
- **States:** hover and press change only the fill (primary goes `#3886ff` then `#0e53e5`, neutral goes `#f3f6fa` then `#e0e3e9`) over about 150ms. Focus adds a 2px Signal Blue ring. Disabled uses a `#e0e3e9` fill with `#8d95a3` text.

### Cards & Page Panels
- **Page panel:** the main white work surface on the gray canvas. It has 12px corners (`size.radius.container`), 16px inset, no shadow and no border; the tonal step from canvas to white is enough.
- **Card** (component): white or Frost, 4px corners, 16px inset, and a hairline `#e0e3e9` border instead of a shadow. The header, body and footer each have 16px inset, and footer actions align to the trailing edge.
- **Dashboard cards:** a grid of equal cards on the canvas with 16px or 24px gutters. Each has a title-medium header, the chart or metric, and an optional hairline-divided footer link.
- **Shadows** are only for things that float: menus and popovers (`size.shadow.small` + `medium` using `color.shadow.soft`), dialogs and tooltips. Nothing that sits in the page flow has a shadow.

### Navigation
- **Global header:** a full-width bar at the top. Reading from leading to trailing, it holds the menu toggle, the Zebra logo and product name (`title.medium`), the search, action icons, the avatar and the app switcher.
- **Navigation rail and menu:** a vertical white strip on the leading side with a 1px `#ced2db` trailing border.
  - A narrow icon rail sits beside a collapsible labeled menu of about 256px.
  - Items are 40–48px tall with 4px corners. Hover fills `#f3f6fa`.
  - The selected item uses a pale blue fill with ink text and a blue glyph.
- **Tabs:** a row of `label.medium` labels over a 1px bottom border. The selected tab has a 2px Signal Blue underline and ink text; unselected tabs use slate text.
- **Mobile:** the rail becomes a bottom navigation bar with icon plus label. Primary actions sit in the thumb zone.

### Inputs & Forms
- **Field:** a 40px white field with 4px corners and a 1px `#ced2db` border. The label (`label.medium`) sits above, and helper text (`body.small`, slate) sits below.
- **States:**
  - Focus thickens the border to a 2px blue ring.
  - Error turns the border and helper text red and adds an `error` icon.
- Required fields carry an explicit marker.
- Checkboxes and radios use Signal Blue when selected, and the checked state shows a glyph, not just a fill.
- Search is the same field with a leading search glyph and a trailing clear button.

### Data Tables (the signature surface)
- Tables are the main surface of most Zebra products. They sit edge-to-edge inside a white page panel.
- **Header row:** `label.medium` text in slate with 20px sort glyphs. **Body cells:** `body.small` ink text on a single line, truncated with an ellipsis.
- **Rows:**
  - Rows are about 44–48px tall, with cell inset 12px vertical and 16px horizontal.
  - Rows are separated by a hairline `#e0e3e9` divider and may alternate white and `#f3f6fa` stripes.
  - Hover fills `#f3f6fa`, and selected rows use `#e0f0ff` with a checked checkbox in the leading column.
- **Above the table:** a toolbar with search on the leading side, filter chips (pill, outline) and trailing action buttons.
- **Bulk actions:** when rows are selected, a bulk-action bar replaces the toolbar. It is white with a 1px info-blue border and 8px corners.
- **Below the table:** pagination aligns to the trailing edge.

### Status & Feedback
- **Status label:** a pill with a pale status container and a strong status foreground, plus a leading status glyph. For example, "Online" is green and "Offline" is red.
- **In-page banner:** a full-width strip at the top of the page panel with a container fill, a leading status icon, a title and body text, and an optional dismiss button. It stays until it is dismissed.
- **Snackbar:** sits on the inverse graphite surface at the bottom.
- **Dialog:** a white surface with 6px corners over the scrim. It has a `title.large` header, `body.medium` content, and a footer with buttons on the trailing edge (24px inset, 16px gap), confirm last.
- **Loading** uses shimmer placeholders matching the final layout, and a progress circle for in-place waits.
- **Empty state:** centered, at most about 512px wide, with an illustration or large glyph, a title, one sentence and a primary action.

## 5. Layout Principles

### Grid & Structure
- **App shell:** global header across the top, the navigation rail on the leading side, and the content area filling the rest on the gray canvas.
- **Content area:** 24px inset (`size.space.xl`). Within it, the page header, banners and page panel are stacked with a 24px gap.
- **Page header:** a `heading.medium` title, a `title.medium` slate description, and the page actions on the trailing side (24px gap).
- **Content width:** `size.container.default` gives 1200px on desktop and 840px on desktop compact. Data-heavy pages may run full-width; reading pages should not.
- **Dashboards:** 3- or 4-column equal grids of cards, collapsing to 2 and then 1 column.

### Whitespace Strategy
- The base unit is 4px. Use 8px inside clusters, 12px within components, 16px for panel inset and gutters, and 24px between sections and around the page. 32px is for rare large separations.
- Spacing is never computed. Every gap is a `size.space.*` token.

### Alignment & Visual Balance
- Content is left-aligned (leading edge) and follows a strong vertical line from the page title down through the panel content.
- Actions sit at the trailing edge of the bar or row they belong to, with the primary action last.
- Each region has one visual anchor, usually the primary button or the table.

### Responsive Behavior & Touch
| Tier | Devices | Layout |
|---|---|---|
| `mobile` | handhelds, wearables | Single column, bottom navigation bar, primary action bottom-anchored, sharp corners allowed |
| `tablet` | tablets, POS | Two-pane / master-detail, rail navigation |
| `desktop` | pointer-first | Full shell, tables, multi-pane |
| `desktop compact` | dense pointer-only | Same as desktop at 840px content width. Never on touch-first devices |

- Every interactive target is at least 40px (`size.control.target.min`).
- Content reflows instead of shrinking text.
- Focus ring, contrast, motion and form-factor rules are in `DESIGN.md` §2–§5.

## 6. Design System Notes for Stitch Generation

### Language to Use
"Enterprise utility UI, calm and high-contrast. Pale cool-gray canvas with crisp white panels separated by hairline borders, no drop shadows on in-flow content. IBM Plex Sans, regular and medium weights, no uppercase. A single vivid blue (#1f69ff) for primary actions and selection. Status color only in small pills and banners with icons. 4px corners on controls, 40px controls, 16–24px spacing, dense but orderly data tables."

### Color References
Cool Mist Canvas `#f3f6fa`, Clean White Surface `#ffffff`, Ink `#0c0d0e`, Slate `#545963`, Hairline Gray `#ced2db`, Whisper Gray `#e0e3e9`, Zebra Signal Blue `#1f69ff`, Deep Link Blue `#0e53e5`, Pale Sky Tint `#e0f0ff`, Forest `#00864f`, Amber `#ae6500`, Signal Red `#d70015`, Ocean `#0073e6`.

### Component Prompts
- **Device list page:** "A device management page in a desktop app shell. The shell has a white top header with the Zebra logo, a search field and an avatar, plus a slim white navigation rail on the left with outline icons; the selected item has a pale blue fill. The content sits on a #f3f6fa canvas with 24px padding. The page title 'Devices' is 28px regular ink, with a slate description below it and an outline button plus a primary blue 'Add device' button on the right. Below is one white panel with 12px corners holding a toolbar (search field, pill filter chips) and a data table with slate medium-weight headers, 48px rows, hairline row dividers, a checkbox column, and green/red pill status labels with icons. Pagination is at the bottom right."
- **Overview dashboard:** "A 4-column grid of white cards on a pale gray canvas, each with 4px corners and a hairline border, no shadows. Each card has a 16px medium title, a large light-weight metric number, a small slate caption and a thin line or bar chart in #1f69ff with gray gridlines. An amber in-page warning banner with an icon spans the top."
- **Confirmation dialog:** "A white dialog with 6px corners over a 60% black scrim. The title is 20px medium, followed by one line of 16px body text. The footer has an outline 'Cancel' and a solid red 'Delete' button aligned right."

### Incremental Iteration
- Change one region at a time: shell, page header, panel, then table.
- If a screen looks too 'designed', remove shadows, gradients and extra colors first.
- If it looks too sparse, tighten to 12px cell inset and 44px rows before shrinking type.
- Check every status color has an icon and a word next to it.
- Check that the screen has exactly one solid blue button per region.

## Appendix: Known drift between this file and shipped code

These are recorded so nobody copies them by mistake. This file follows `tokens.json`.

- **harmonix-webui legacy tokens:** the app still uses legacy zeta tokens. Its primary is `#0073e6` (now the info color), its main text is `#1d1e23`, its page panels have 16px corners, its table cells are 14px/16px inset at 45px rows, and its dialog body is `#fafafa`. New work uses the values above.
- **Tailwind gray leftovers in harmonix-webui:** `#e5e7eb`, `#6b7280` and `#111827` should become `color.border.subtle`, `color.foreground.secondary` and `color.foreground.primary`.
- **Partial migration in zeta-web:** only 17 of about 48 components use the new tokens. Text input, chips, select and others still use legacy `--spacing-*` and `--radius-*` aliases through `tokens-compat.css`.
- **Broken heading shorthands in zeta-web:** `styles.css` builds `--headline-*` and `--body-x-small` from longhands that no longer exist, so h1–h3 fall back to inherited type.
- **Focus ring offset:** zeta-web draws the focus ring with no offset, but `DESIGN.md` requires one.
- **No motion tokens:** neither library has them. Durations are hardcoded (0.1–0.5s). See `DESIGN.md` §5 for the proposed roles.
- **Shape tiers:** `tokens.json` sets `shape: sharp` on the mobile tier, but no shipped component switches on it. Sharp is opt-in per component.
