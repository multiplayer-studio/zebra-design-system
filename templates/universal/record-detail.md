---
name: Record Detail
level: template
status: draft
composes: [../../organisms/dialog.md, ../../organisms/global-header.md, ../../organisms/navigation-bar.md, ../../organisms/navigation-rail.md, ../../organisms/table.md, ../../organisms/top-app-bar.md, ../../molecules/accordion.md, ../../molecules/breadcrumb.md, ../../molecules/commit-bar.md, ../../molecules/dropdown-menu.md, ../../molecules/empty-state.md, ../../molecules/inline-banner.md, ../../molecules/key-value-list.md, ../../molecules/list-item.md, ../../molecules/menu-item.md, ../../molecules/select.md, ../../molecules/snackbar.md, ../../molecules/system-banner.md, ../../molecules/tab-bar.md, ../../atoms/avatar.md, ../../atoms/button.md, ../../atoms/icon-button.md, ../../atoms/icon.md, ../../atoms/skeleton.md, ../../atoms/status-label.md]
---

# Record Detail

> Read and act on one object: its identity and status first, then key facts, then sections by kind of fact, with actions on the whole object in the header and each section's actions at that section.

Use it for a device, printer, order, user, site or job: any screen that acts on one object ([patterns 1.1](../../patterns/01-screen-composition.md), [1.21](../../patterns/01-screen-composition.md)). A product built around one object type uses it as that object's hub ([patterns 2.5](../../patterns/02-navigation-flow.md)).

## Anatomy
1. **Header.** [Top App Bar](../../organisms/top-app-bar.md) at compact, leading control back (the object sits below its list); [Global Header](../../organisms/global-header.md), Rounded off (sharp, full width; [Global Header Usage](../../organisms/global-header.md#usage)) from medium.
2. **Global navigation.** [Navigation Bar](../../organisms/navigation-bar.md) at compact, [Navigation Rail](../../organisms/navigation-rail.md) from medium, the object's area active.
3. **System banner** (optional). [System Banner](../../molecules/system-banner.md) below the header while a system condition holds.
4. **Breadcrumb** (expanded and up). [Breadcrumb](../../molecules/breadcrumb.md) following the structure, not the path taken ([patterns 2.78](../../patterns/02-navigation-flow.md)).
5. **Identity header.** The object's type mark ([Icon](../../atoms/icon.md) size large, Framed on, or an [Avatar](../../atoms/avatar.md) size medium for a person), its identifier as the page title, its [Status Label](../../atoms/status-label.md) directly after the title, and the fact that tells it apart (serial, address, location) beneath ([patterns 1.18](../../patterns/01-screen-composition.md), [1.52](../../patterns/01-screen-composition.md), [1.68](../../patterns/01-screen-composition.md)). Actions on the whole object sit on the title row at its trailing end: the main one as a [Button](../../atoms/button.md) flavour primary, a second as flavour outline, and the rest in an [Icon Button](../../atoms/icon-button.md) `more_vertical` flavour subtle opening a [Dropdown Menu](../../molecules/dropdown-menu.md) of [Menu Item](../../molecules/menu-item.md)s, destructive items last ([patterns 1.53](../../patterns/01-screen-composition.md), [1.73](../../patterns/01-screen-composition.md), [1.81](../../patterns/01-screen-composition.md)). **The identity header's container is not a design-system component; it is a region built from these parts.**
6. **Object notice** (optional). [Inline Banner](../../molecules/inline-banner.md) below the identity for a condition of this object ("Needs attention: out of labels", "Locked by Sam Patel since 10:42"), with its one action ([patterns 1.60](../../patterns/01-screen-composition.md), [4.64](../../patterns/04-states-feedback.md)).
7. **Key facts.** A [Key Value List](../../molecules/key-value-list.md) of the few facts or counts people check first, with when the data was last updated ([patterns 1.21](../../patterns/01-screen-composition.md), [4.57](../../patterns/04-states-feedback.md)).
8. **Section navigator** (when the object has more than one section). [Tab Bar](../../molecules/tab-bar.md) flavour condensed, pinned below the identity header as it collapses ([patterns 1.100](../../patterns/01-screen-composition.md), [1.105](../../patterns/01-screen-composition.md)): for example Overview, Settings, Activity, Files. Local to this object, never in global navigation ([patterns 1.49](../../patterns/01-screen-composition.md)).
9. **Sections.** Grouped by kind of fact: what it is, what it's doing, who made or changed it, what it's linked to ([patterns 1.21](../../patterns/01-screen-composition.md)). Each has a heading and, at its trailing end, the actions on that section (a [Button](../../atoms/button.md) flavour text or outline).
   - Facts: [Key Value List](../../molecules/key-value-list.md); a missing value keeps its row and says it's missing ([patterns 10.37](../../patterns/10-data-display.md)).
   - Linked items: [List Item](../../molecules/list-item.md) rows, or a [Table](../../organisms/table.md) where they're compared across attributes.
   - Activity and history: [List Item](../../molecules/list-item.md) rows newest first, each saying what happened, who and when ([patterns 1.109](../../patterns/01-screen-composition.md)).
10. **Supporting pane** (optional, large). Context people use now and then (location, related contacts) as a [Key Value List](../../molecules/key-value-list.md) on the trailing side at about a third of the width ([patterns 1.99](../../patterns/01-screen-composition.md)).
11. **Edit mode** (optional). Editing keeps the same layout and turns values into fields ([patterns 1.101](../../patterns/01-screen-composition.md)), with a [Commit Bar](../../molecules/commit-bar.md) pinned at the bottom while there are changes ([patterns 1.75](../../patterns/01-screen-composition.md)).

**States.**
- Loading: the identity shows as soon as it's known; [Skeleton](../../atoms/skeleton.md) blocks stand in for facts and sections ([patterns 4.5](../../patterns/04-states-feedback.md), [4.16](../../patterns/04-states-feedback.md)).
- Empty section: [Empty State](../../molecules/empty-state.md) compact on, text only, inside that section ([patterns 4.12](../../patterns/04-states-feedback.md)).
- Section error: Empty State type Can't show with Retry inside the section; the rest works ([patterns 4.34](../../patterns/04-states-feedback.md)).
- Gone or no access (from a link): the content area shows Empty State type Can't show or No permission in place of the object ([patterns 2.29](../../patterns/02-navigation-flow.md), [4.10](../../patterns/04-states-feedback.md)).
- Destructive actions: reversible ones act at once with a [Snackbar](../../molecules/snackbar.md) and Undo; irreversible ones confirm in a [Dialog](../../organisms/dialog.md) titled for the action ([patterns 1.81](../../patterns/01-screen-composition.md), [7.44](../../patterns/07-content-copy.md)).

The composed components govern their own colours, states, sizes, radius and focus rings. The template only places them.

## Layout
```
Large                                                       Compact
┌──────────────────────────────────────────────────────┐    ┌──────────────────┐
│ 1 Header                                             │    │ 1 ← ZT411-10022 ⋮│
├───┬──────────────────────────────────────────────────┤    ├──────────────────┤
│ 2 │ 3 System banner (optional)                       │    │ 5 ▣ ZT411-10022  │
│   │ 4 Fleet › Line 3 › ZT411-10022                   │    │   [Online]       │
│   │ 5 ▣ ZT411-10022 [Online]       [Print][Edit][⋮]  │    │   Serial …       │
│   │   Serial 52J1…  · Line 3                         │    │   [Print test]   │
│   │ 6 Notice (optional)                              │    │ 6 Notice         │
│   │ 7 Key facts                                      │    │ 7 Key facts      │
│   │ 8 Overview | Settings | Activity | Files         │    │ 8 Tabs ▸         │
│   ├────────────────────────────────┬─────────────────┤    │ 9 Section        │
│   │ 9 Section heading     [Action] │ 10 Supporting   │    │   label          │
│   │   label   value                │    label value  │    │   value          │
│   │   label   value                │                 │    ├──────────────────┤
│   │ 9 Section heading              │                 │    │ 2 Navigation bar │
└───┴────────────────────────────────┴─────────────────┘    └──────────────────┘
```
- Identity, notice and key facts stack `--space-lg` apart; the section navigator sits `--space-xl` below; sections are `--space-section` apart, groups within them `--space-xl`.
- Reading content is capped at `--container-reading` unless a supporting pane takes the extra width; tables in a section may run the content width.
- The page scrolls; the identity header collapses to one line with the title, status and actions, and the section navigator pins beneath it ([patterns 1.100](../../patterns/01-screen-composition.md)).

## Responsiveness
- **Compact** (below `--breakpoint-medium-min`): margins `--space-page`. The [Top App Bar](../../organisms/top-app-bar.md) carries back, the identifier and the overflow; the identity block below holds the type mark, status and distinguishing fact. Header actions reduce to the most used one, as a full-width [Button](../../atoms/button.md) under the identity, plus the overflow; nothing else ([patterns 1.78](../../patterns/01-screen-composition.md)). Breadcrumbs are replaced by back ([patterns 1.51](../../patterns/01-screen-composition.md)). Tabs scroll sideways; with many sections they become a [Select](../../molecules/select.md) ([patterns 5.22](../../patterns/05-sizes-devices.md)). Long independent sections may use an [Accordion](../../molecules/accordion.md) ([patterns 1.106](../../patterns/01-screen-composition.md)). Key-value rows stack label above value ([patterns 10.39](../../patterns/10-data-display.md)). The supporting pane moves below the main content or into its own tab. Tables become lists of rows ([patterns 1.96](../../patterns/01-screen-composition.md)).
- **Medium** (from `--breakpoint-medium-min`): margins `--grid-margin`, [Navigation Rail](../../organisms/navigation-rail.md) Expanded false. Actions return to the title row; labels sit beside values where they fit.
- **Expanded** (from `--breakpoint-expanded-min`): breadcrumb shown. The supporting pane, if any, sits below the main content.
- **Large** (from `--breakpoint-large-min`): the rail is Expanded true; the supporting pane sits on the trailing side at about a third.
- **Touch.** Action buttons at size medium are below `--control-target-min` and extend their hit area to it ([patterns 6.16](../../patterns/06-accessibility.md)); the overflow icon button in the Top App Bar is small and needs a hit area of `--control-target-min`.

## Accessibility
- **Landmarks and headings.** `header`, `nav`, `main`; the breadcrumb is a `nav` labelled "Breadcrumb"; the supporting pane is a labelled `complementary` region. The identifier is the `h1`; the key facts and each section have `h2` headings. Key-value groups are description lists.
- **Focus order.** Identity actions, notice, key facts, section navigator, sections, supporting pane. Switching tabs moves focus to the tab panel only on activation; it doesn't add to history ([patterns 2.21](../../patterns/02-navigation-flow.md)).
- **Keyboard.** Tabs are one stop with arrow keys; the overflow opens with Enter and closes with Escape, returning focus to it.
- **Names and announcements.** The overflow is "More actions for ZT411-10022"; section actions carry the section and object ("Edit network settings"). Status changes on a live object and "Last updated" refreshes are announced politely. The current tab is selected; the current breadcrumb is marked current.
- **Never colour alone.** Status always has its word and icon; a locked object says who holds the lock.
- See [Key Value List](../../molecules/key-value-list.md) and [Tab Bar](../../molecules/tab-bar.md) Usage.

## Usage
- Use it for any screen about one object. Opening it from a list beside the list on wide screens is [List Detail](list-detail.md).
- The page has one primary: the object's main action. Section actions are text or outline.
- Several objects of one kind (two addresses, three printers on a line) each get a titled block ([patterns 10.38](../../patterns/10-data-display.md)).
- Moving to the next or previous object replaces the history step ([patterns 2.56](../../patterns/02-navigation-flow.md)).
- Drafts: [Key Value List](../../molecules/key-value-list.md), [List Item](../../molecules/list-item.md), [Commit Bar](../../molecules/commit-bar.md), [Skeleton](../../atoms/skeleton.md) and [Empty State](../../molecules/empty-state.md) are draft; their measurements are placeholders.

Prototypes using this template: none yet.
