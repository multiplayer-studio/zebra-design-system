---
name: List Detail
level: template
status: draft
composes: [../../organisms/dialog.md, ../../organisms/global-header.md, ../../organisms/navigation-bar.md, ../../organisms/navigation-rail.md, ../../organisms/table.md, ../../organisms/top-app-bar.md, ../../molecules/dropdown-menu.md, ../../molecules/empty-state.md, ../../molecules/filter-selection-bar.md, ../../molecules/key-value-list.md, ../../molecules/list-item.md, ../../molecules/menu-item.md, ../../molecules/pagination.md, ../../molecules/search.md, ../../molecules/snackbar.md, ../../molecules/system-banner.md, ../../molecules/tab-bar.md, ../../atoms/button.md, ../../atoms/filter-chip.md, ../../atoms/icon-button.md, ../../atoms/skeleton.md, ../../atoms/status-label.md]
---

# List Detail

> Find one item in a collection and act on it: a list of items beside the open item's detail, which replaces the list on narrow screens.

Use it for the "find one item" and "act on one object" page types ([patterns 1.1](../../patterns/01-screen-composition.md)) wherever people move between items of one kind: devices, printers, orders, tickets, users.

## Anatomy
1. **Header.** [Top App Bar](../../organisms/top-app-bar.md) type default at compact; [Global Header](../../organisms/global-header.md), Rounded off (sharp, full width; [Global Header Usage](../../organisms/global-header.md#usage)) from medium. The current site or tenant sits in the header when the person can belong to more than one ([patterns 1.54](../../patterns/01-screen-composition.md)).
2. **Global navigation.** [Navigation Bar](../../organisms/navigation-bar.md) at compact, [Navigation Rail](../../organisms/navigation-rail.md) from medium. The current destination is the active item.
3. **System banner** (optional, only while a system condition holds). [System Banner](../../molecules/system-banner.md), one at a time, directly below the header across the content area ([patterns 1.58–1.59](../../patterns/01-screen-composition.md)).
4. **List pane.**
   1. Pane title: the collection's name as the page heading, with the create action, if any, at its trailing end as a [Button](../../atoms/button.md) flavour primary, size medium. It is the screen's one primary ([patterns 1.72](../../patterns/01-screen-composition.md)).
   2. Search: [Search](../../molecules/search.md), size medium, directly under the title when finding is the main task ([patterns 1.84](../../patterns/01-screen-composition.md)).
   3. Filters (optional): [Filter Selection Bar](../../molecules/filter-selection-bar.md) of [Filter Chip](../../atoms/filter-chip.md)s directly above the list, active filters shown as Active chips with Clear all ([patterns 1.86–1.88](../../patterns/01-screen-composition.md)). Sort sits at the trailing end of the filter row and shows the current sort ([patterns 1.90](../../patterns/01-screen-composition.md)), as a [Button](../../atoms/button.md) flavour text with trailing icon `expand_more` opening a [Dropdown Menu](../../molecules/dropdown-menu.md) of [Menu Item](../../molecules/menu-item.md)s type check.
   4. Result count: one line of text between the filters and the first row ([patterns 1.91](../../patterns/01-screen-composition.md)).
   5. List: [List Item](../../molecules/list-item.md) rows. Leading slot shows the kind of thing, label is the identifier, one or two lines of supporting text, trailing slot holds one [Status Label](../../atoms/status-label.md) or value ([patterns 1.19](../../patterns/01-screen-composition.md), [1.95](../../patterns/01-screen-composition.md), [10.31–10.32](../../patterns/10-data-display.md)). The whole row opens the item. The open item's row is selected from expanded up ([patterns 2.13](../../patterns/02-navigation-flow.md)).
   6. More: on handhelds the list loads more as it scrolls; in a console it pages with [Pagination](../../molecules/pagination.md) at the bottom of the list ([patterns 1.93](../../patterns/01-screen-composition.md)).
5. **Detail pane.**
   1. Identity: the item's identifier as the pane heading, its [Status Label](../../atoms/status-label.md) directly after it, and the fact that tells it apart ([patterns 1.18](../../patterns/01-screen-composition.md), [1.68](../../patterns/01-screen-composition.md)). Actions on the whole item at the trailing end of this row: one or two [Button](../../atoms/button.md)s flavour outline, size medium, and the rest in an [Icon Button](../../atoms/icon-button.md) `more_vertical`, flavour subtle, opening a [Dropdown Menu](../../molecules/dropdown-menu.md) ([patterns 1.73](../../patterns/01-screen-composition.md), [1.78](../../patterns/01-screen-composition.md)).
   2. Sections (optional): a [Tab Bar](../../molecules/tab-bar.md) flavour condensed when the item has parallel views, such as Details and History ([patterns 1.105](../../patterns/01-screen-composition.md)).
   3. Facts: a [Key Value List](../../molecules/key-value-list.md) per group of facts, each group with a heading, in the order identity, summary, then sections by kind of fact ([patterns 1.21](../../patterns/01-screen-composition.md), [1.108](../../patterns/01-screen-composition.md)). The pane's content follows [Record Detail](record-detail.md).
6. **Toast** (when something just happened). [Snackbar](../../molecules/snackbar.md) at the bottom of the content area, above the bottom navigation ([patterns 1.63](../../patterns/01-screen-composition.md)).

**States.**
- Loading: [Skeleton](../../atoms/skeleton.md) rows in the list layout, filling the visible area, and skeleton blocks in the detail pane ([patterns 4.16–4.17](../../patterns/04-states-feedback.md)). The title, search and filters stay usable.
- Empty: an [Empty State](../../molecules/empty-state.md) replaces the list only, never the header, search or filters ([patterns 1.128](../../patterns/01-screen-composition.md), [4.6](../../patterns/04-states-feedback.md)). Type First use with the create action; type No results with the active search and filters still shown and a Clear filters action ([patterns 4.7–4.8](../../patterns/04-states-feedback.md)). From expanded, with nothing open, the detail pane shows Empty State type First use, compact on, with text only ("Select a device to see its details").
- Error: Empty State type Can't show, with Retry, in the pane that failed; the other pane keeps working ([patterns 4.34](../../patterns/04-states-feedback.md)).
- Selection (optional, when the list supports bulk actions): the header becomes a [Top App Bar](../../organisms/top-app-bar.md) type contextual at compact, and from medium a Top App Bar type contextual takes the place of the list pane's title row, with the count and the actions that apply to all selected rows ([patterns 1.80](../../patterns/01-screen-composition.md)). Selection controls sit in the List Item's leading slot.

The composed components govern their own colours, states, sizes, radius and focus rings. The template only places them.

## Layout
```
Expanded and large                                  Compact
┌───────────────────────────────────────────────┐   ┌──────────────────┐
│ 1 Header                                      │   │ 1 Header         │
├───┬───────────────────────────────────────────┤   ├──────────────────┤
│ 2 │ 3 System banner (optional)                │   │ 3 Banner (opt.)  │
│   ├───────────────┬───────────────────────────┤   │ 4.1 Title   [+]  │
│ R │ 4.1 Title [+] │ 5.1 Identity  [Act][⋮]    │   │ 4.2 Search       │
│ a │ 4.2 Search    │ 5.2 Tabs                  │   │ 4.3 Filters      │
│ i │ 4.3 Filters   │ 5.3 Facts                 │   │ 4.4 Count        │
│ l │ 4.4 Count     │   label   value           │   │ 4.5 Rows         │
│   │ 4.5 Rows ▌    │   label   value           │   │   …              │
│   │ 4.6 More      │                           │   │ 6 Toast          │
│   │               │                     6     │   ├──────────────────┤
│   │               │                           │   │ 2 Navigation bar │
└───┴───────────────┴───────────────────────────┘   └──────────────────┘
```
- The content area sits between the header and the navigation, inset by the page margin. The list pane and detail pane are separated by `--space-gutter`.
- Inside the list pane: title, search, filters, count and rows stack with `--space-md` between them; the gap before the rows is `--space-lg`.
- Inside the detail pane: identity row, tabs and fact groups stack with `--space-xl` between groups and `--space-section` between sections ([patterns 1.11](../../patterns/01-screen-composition.md)).
- Each pane scrolls on its own; the header, navigation and the pane titles stay put. The list keeps its scroll position while the detail changes.

## Responsiveness
Panes follow width ([patterns 5.10](../../patterns/05-sizes-devices.md)): one pane below expanded, two from expanded ([patterns 1.98](../../patterns/01-screen-composition.md)).
- **Compact** (below `--breakpoint-medium-min`): one pane, margins `--space-page`, `--grid-columns-compact` columns. The list fills the screen. Opening an item replaces it with the detail as its own screen, with a [Top App Bar](../../organisms/top-app-bar.md) whose leading control is back. Back returns to the list at the same scroll position and selection ([patterns 2.15](../../patterns/02-navigation-flow.md)). Navigation is the [Navigation Bar](../../organisms/navigation-bar.md) at the bottom. Filters collapse behind one control that shows how many are active and opens them in a full-screen [Dialog](../../organisms/dialog.md) with Apply ([patterns 1.87](../../patterns/01-screen-composition.md)); active chips stay as one sideways-scrolling row. The create action stays in the title row. Item actions in the detail's identity row collapse to the overflow menu except the most used one.
- **Medium** (from `--breakpoint-medium-min`): still one pane, margins `--grid-margin`, `--grid-columns-medium` columns. The [Navigation Rail](../../organisms/navigation-rail.md) replaces the navigation bar, Expanded false. Filters show in part, the rest behind More filters ([patterns 5.25](../../patterns/05-sizes-devices.md)).
- **Expanded** (from `--breakpoint-expanded-min`): two panes, `--grid-columns-expanded` columns. The list takes about a third and the detail the rest. Selecting a row shows its detail beside the list and doesn't add to history ([patterns 2.21](../../patterns/02-navigation-flow.md)); back from the detail isn't shown.
- **Large** (from `--breakpoint-large-min`): the rail is Expanded true. Extra width goes to the detail pane; fact groups in the detail may sit in two columns, labels beside values ([patterns 5.26](../../patterns/05-sizes-devices.md)). Reading text in the detail stays capped at `--container-reading`.
- **Touch.** Every row and control is at least `--control-target-min` tall ([patterns 6.16](../../patterns/06-accessibility.md)). The Top App Bar's small icon buttons and the size medium buttons and search are drawn below it: give each a hit area of `--control-target-min`. Row actions are always visible on touch, never only on hover ([patterns 1.79](../../patterns/01-screen-composition.md)).

## Accessibility
- **Landmarks and headings.** Header is `header`, global navigation is `nav`, the list and the detail sit in `main`. From expanded, each pane is a labelled region ("Devices", "Device details"). The collection's name is the `h1`; the open item's identifier is `h2` when beside the list and `h1` when it is its own screen at compact. Fact group headings are one level below.
- **Focus order** follows Anatomy: header, navigation, banner, list pane, detail pane. Opening an item from expanded keeps focus on the row and announces the detail's title; at compact, focus goes to the detail's heading ([patterns 6.27](../../patterns/06-accessibility.md)). After back, focus returns to the row that was opened. When the open item is removed, focus moves to the next row ([patterns 6.31](../../patterns/06-accessibility.md)).
- **Keyboard.** The list is one tab stop with arrow keys between rows; Enter opens. Row controls (selection, trailing actions) are separate stops after the row ([patterns 6.36](../../patterns/06-accessibility.md)). Filters, sort menu and tabs behave as their components describe.
- **Names and announcements.** The overflow is named for its item ("More actions for ZT411-10022"), the filter control "Filters, 2 applied", the selection close "Cancel selection". Result count changes, selection count, loading and errors are announced politely ([patterns 6.53](../../patterns/06-accessibility.md)). The open row is marked current.
- **Never colour alone.** The open row is marked by the List Item's selected state, not only a fill; status always shows a word; active filters are chips with a label.
- The composed components handle their own roles: see [List Item](../../molecules/list-item.md), [Search](../../molecules/search.md) and [Tab Bar](../../molecules/tab-bar.md) Usage.

## Usage
- Use it when people find one item among many and then read or act on it. For comparing many items across several attributes, use a [Table](../../organisms/table.md) page instead ([patterns 10.4](../../patterns/10-data-display.md)). For working through items in order, use [Work Through Items](work-through-items.md).
- One primary per screen: the create action, or the detail's main action when there is no create. Never both styled primary.
- Rows hold one trailing status or value. Long text opens in the detail, never in the row ([patterns 10.33](../../patterns/10-data-display.md)).
- Moving to the next or previous item from the detail replaces the history step ([patterns 2.56](../../patterns/02-navigation-flow.md)).
- Drafts: [List Item](../../molecules/list-item.md), [Key Value List](../../molecules/key-value-list.md), [Skeleton](../../atoms/skeleton.md), [Empty State](../../molecules/empty-state.md) and [Filter Selection Bar](../../molecules/filter-selection-bar.md) are draft; their measurements are placeholders.

Prototypes using this template: none yet.
