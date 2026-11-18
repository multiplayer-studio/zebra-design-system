---
name: Notification Centre
level: organism
status: draft
composes: [../organisms/right-drawer-panel.md, ../molecules/notification-item.md, ../molecules/filter-selection-bar.md, ../molecules/empty-state.md, ../molecules/snackbar.md, ../atoms/notification-indicator.md, ../atoms/skeleton.md, ../atoms/button.md, ../atoms/icon-button.md]
tokens:
  # container
  notification-centre-container-background: '{colors.color-fill-canvas}'
  # header
  notification-centre-header-background: '{colors.color-fill-default}'
  notification-centre-header-padding-y: '{space.space-md}'
  notification-centre-header-padding-x: '{space.space-lg}'
  notification-centre-header-gap: '{space.space-sm}'
  notification-centre-title-font: '{typography.type-title-large}'
  notification-centre-title-foreground: '{colors.color-ink-high}'
  notification-centre-header-border-color: '{colors.color-line-subtle}'
  notification-centre-header-border-width: '{stroke.stroke-thin}'
  # filters
  notification-centre-filters-padding-y: '{space.space-sm}'
  notification-centre-filters-padding-x: '{space.space-lg}'
  # list
  notification-centre-list-padding-y: '{space.space-lg}'
  notification-centre-list-padding-x: '{space.space-lg}'
  notification-centre-list-gap: '{space.space-xl}'
  # group
  notification-centre-group-gap: '{space.space-sm}'
  notification-centre-group-heading-font: '{typography.type-label-medium}'
  notification-centre-group-heading-foreground: '{colors.color-ink-medium}'
  notification-centre-group-heading-padding-x: '{notification-item.notification-item-container-padding-x}'
  # footer (load earlier)
  notification-centre-footer-padding-y: '{space.space-md}'
---

# Notification Centre

> The one place system messages wait to be read later: Notification Items, newest first, grouped by day, source or urgency, with filters and Mark all as read.

## Anatomy
1. Container — a column on `--notification-centre-container-background`. The centre is the panel's content only: at medium and up it sits in a [Right Drawer Panel](right-drawer-panel.md), which brings the title ("Notifications"), Close and width; at compact it is a full-screen view. It opens from one entry point in the shell, whose [Notification Indicator](../atoms/notification-indicator.md) counts items not yet seen and clears when the centre opens ([patterns 4.82](../patterns/04-states-feedback.md), [4.84](../patterns/04-states-feedback.md)).
2. Header — a toolbar on `--notification-centre-header-background`, padded `--notification-centre-header-padding-y` / `--notification-centre-header-padding-x`, parts `--notification-centre-header-gap` apart, over a `--notification-centre-header-border-width` `--notification-centre-header-border-color` rule:
   - Title (compact only) — "Notifications", `--notification-centre-title-font` `--notification-centre-title-foreground`. In a panel, the panel's own title is used instead.
   - Mark all as read — a [Button](../atoms/button.md), text, small. Hidden while nothing is unread.
   - Settings (optional) — an [Icon Button](../atoms/icon-button.md) (`settings`), subtle, opening the product's notification settings.
   - Close (compact only) — an Icon Button (`close`), subtle, at the trailing end. In a panel, the panel's own Close is used instead.
3. Filters — a [Filter Selection Bar](../molecules/filter-selection-bar.md), padded `--notification-centre-filters-padding-y` / `--notification-centre-filters-padding-x`: All, Unread, then the product's sources, urgencies or sites. One filter is active at a time; All is the default.
4. List — padded `--notification-centre-list-padding-y` / `--notification-centre-list-padding-x`, groups `--notification-centre-list-gap` apart.
   - Group — a heading in `--notification-centre-group-heading-font` `--notification-centre-group-heading-foreground`, inset `--notification-centre-group-heading-padding-x` to line up with the items' text, then its [Notification Items](../molecules/notification-item.md) `--notification-centre-group-gap` apart, newest first.
5. Footer — "Show earlier", a Button, text, small, centred, padded `--notification-centre-footer-padding-y`, while older items remain.
6. Empty — an [Empty State](../molecules/empty-state.md), compact, in place of the list.

## Variants
| Grouping | Group headings | Use |
|---|---|---|
| day (default) | Today, Yesterday, then dates | most products |
| source | the app, feature or device that sent it | many sources, few items each |
| urgency | Needs action, then For information | products where some items need a response ([patterns 4.85](../patterns/04-states-feedback.md)) |
| site | the tenant or site name | people who work across sites ([patterns 4.97](../patterns/04-states-feedback.md)) |

Inside a group, items are always newest first. Grouping by urgency uses the severity words and icons of the items themselves, never a colour on the heading.

## States
| Part | State | Treatment |
|---|---|---|
| Centre | loading | the header and filters stay; the list shows three [Skeleton](../atoms/skeleton.md) rows in the Notification Item layout |
| | empty | Empty State, All done, compact: "You're all caught up" |
| | no results | Empty State, No results, compact, naming the filter: "No unread notifications", with a Show all Button |
| | error | Empty State, Can't show, compact, with Retry |
| | offline | the list shows what was last loaded, with "Last updated 10:42" in the group heading style above it |
| Item | unread / read | the Notification Item's own states; an item turns read when opened, not when scrolled past |
| Mark all as read | enabled / hidden | hidden while nothing is unread; after it, an Undo appears in a [Snackbar](../molecules/snackbar.md) |

New items arriving while the centre is open go to the top of their group without moving the item someone is pointing at or focused on; past a screenful, a "3 new" Button at the top brings them in. No transition is defined for the centre itself; the presenting panel owns its entry.

## Spacing & Sizing
Measurements are provisional: the component has no Figma source yet.

| Part | Value |
|---|---|
| Container | the Right Drawer Panel's width at medium and up; full width at compact |
| Header | `--notification-centre-header-padding-y` / `--notification-centre-header-padding-x`, `--notification-centre-header-gap` between parts |
| Filters | `--notification-centre-filters-padding-y` / `--notification-centre-filters-padding-x` |
| List | `--notification-centre-list-padding-y` / `--notification-centre-list-padding-x`; `--notification-centre-list-gap` between groups, `--notification-centre-group-gap` between items |
| Footer | `--notification-centre-footer-padding-y` above and below |

The list scrolls under a fixed header and filter bar.

## Properties
| Property | Options | Default |
|---|---|---|
| Grouping | day, source, urgency, site | day |
| Filters | All, Unread, plus product filters | All, Unread |
| Settings | on / off | on |
| Presentation | panel, full screen | panel at medium and up, full screen at compact |
| State | default, loading, empty, no results, error, offline | default |
| Items | Notification Items | — |

## Usage
- Keep one entry point and one centre per product; don't scatter messages across several lists ([patterns 4.82](../patterns/04-states-feedback.md)).
- Each item makes sense on its own: what happened, to what, when, and a link to it. On a product used across sites, every item names its tenant or site, and opening it switches there first ([patterns 4.83](../patterns/04-states-feedback.md), [4.97](../patterns/04-states-feedback.md)).
- Only what needs action now interrupts; everything else waits here ([patterns 4.85](../patterns/04-states-feedback.md)).
- Clear the entry point's badge when the centre opens; keep each item unread until it's opened.
- Don't use the centre for errors in the person's current task; those sit at their source.
- Composed parts (Right Drawer Panel, Notification Item, Filter Selection Bar, Button, Icon Button, Empty State, Skeleton, Snackbar) bring their own states, sizes and focus rings.

## Accessibility
- The centre is a region (in a panel, a dialog) named "Notifications"; opening it moves focus to the title, and closing it returns focus to the entry point.
- The list is a list; each group is a group named by its heading, and each heading is a real heading.
- Unread is in each item's accessible name ("Unread"), not only its fill and dot.
- The entry point's name includes the count ("Notifications, 3 unread").
- New arrivals and Mark all as read are announced in a polite live region ("3 new notifications", "All marked as read").
- The active filter is announced as selected by the Filter Chip itself.

## Claude Prompt
Draw a right drawer panel titled "Notifications" with a close icon button, its content on a pale grey canvas (`--notification-centre-container-background`). At the top of the content, a white toolbar with a small text button "Mark all as read" and a settings icon button, over a light hairline. Below, a row of filter chips: All (active), Unread, Devices, Orders. The list has a grey group heading "Today" in `--notification-centre-group-heading-font` followed by three notification items, the first two unread with a white fill and a small blue dot, each naming its site ("Store 12"); then a "Yesterday" heading with two read items on the canvas. At the bottom, a centred text button "Show earlier".
