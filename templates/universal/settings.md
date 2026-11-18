---
name: Settings
level: template
status: draft
composes: [../../organisms/dialog.md, ../../organisms/global-header.md, ../../organisms/navigation-bar.md, ../../organisms/navigation-rail.md, ../../organisms/top-app-bar.md, ../../molecules/commit-bar.md, ../../molecules/empty-state.md, ../../molecules/inline-banner.md, ../../molecules/input.md, ../../molecules/list-item.md, ../../molecules/search.md, ../../molecules/select.md, ../../molecules/snackbar.md, ../../atoms/button.md, ../../atoms/icon.md, ../../atoms/input-hint.md, ../../atoms/input-label.md, ../../atoms/radio-button.md, ../../atoms/skeleton.md, ../../atoms/switch.md]
---

# Settings

> Change how a product, device or account behaves: categories at the leading side, the chosen category's settings beside them in groups, each setting a label, a description and a control.

Use it for product preferences, a device's configuration page and tenant or site administration ([patterns 1.28](../../patterns/01-screen-composition.md)).

## Anatomy
1. **Header.** [Top App Bar](../../organisms/top-app-bar.md) at compact (type default on the category list, with back on a category's own screen); [Global Header](../../organisms/global-header.md), Rounded off (sharp, full width; [Global Header Usage](../../organisms/global-header.md#usage)) from medium.
2. **Global navigation.** [Navigation Bar](../../organisms/navigation-bar.md) at compact, [Navigation Rail](../../organisms/navigation-rail.md) from medium, Settings as the active destination.
3. **Settings search** (optional, for products with many settings). [Search](../../molecules/search.md), size medium, at the top of the category column. A result opens its setting directly, skipping the hierarchy ([patterns 1.28](../../patterns/01-screen-composition.md)).
4. **Category list.** [List Item](../../molecules/list-item.md) rows, one per category: leading [Icon](../../atoms/icon.md), the category name, optionally one line of supporting text naming what's inside. From medium the current category's row is selected; at compact each row carries a trailing `chevron_right` ([patterns 10.34](../../patterns/10-data-display.md)).
5. **Category pane.**
   1. Category title as the pane heading.
   2. Notice (optional): [Inline Banner](../../molecules/inline-banner.md) under the title when something about the whole category needs saying, such as "Some settings are managed by your organisation" ([patterns 1.60](../../patterns/01-screen-composition.md)).
   3. Groups: each a heading followed by settings. Each setting reads label, description, control ([patterns 1.28](../../patterns/01-screen-composition.md)):
      - A setting that takes effect at once: [List Item](../../molecules/list-item.md) with the label, the description as supporting text, and a [Switch](../../atoms/switch.md) in the trailing slot ([patterns 3.15](../../patterns/03-controls-interaction.md)). The label says what the setting does when on ([patterns 7.30](../../patterns/07-content-copy.md)).
      - A choice from a set: [Radio Button](../../atoms/radio-button.md)s, size large, for five or fewer options; [Select](../../molecules/select.md), size medium, for more ([patterns 3.16](../../patterns/03-controls-interaction.md)).
      - A value: [Input](../../molecules/input.md), size medium, with its [Input Label](../../atoms/input-label.md) and [Input Hint](../../atoms/input-hint.md) in the order label, hint, error, input ([patterns 1.124](../../patterns/01-screen-composition.md)).
      - A managed setting: shown read-only with its value, a `lock` [Icon](../../atoms/icon.md) and "Managed by your organisation" as its description ([patterns 4.63](../../patterns/04-states-feedback.md)).
      - An action that can't easily be reversed (reset, unpair): a [Button](../../atoms/button.md) flavour negative, size medium, at the end of its group, confirmed in a [Dialog](../../organisms/dialog.md) ([patterns 3.68](../../patterns/03-controls-interaction.md), [1.81](../../patterns/01-screen-composition.md)).
6. **Commit bar** (only for a group of settings that wait for Save). [Commit Bar](../../molecules/commit-bar.md) pinned to the bottom of the category pane, spanning the pane, with Cancel then Save ([Button](../../atoms/button.md) flavour primary) at its trailing end and the unsaved-changes notice beside them ([patterns 1.22](../../patterns/01-screen-composition.md), [1.75](../../patterns/01-screen-composition.md), [1.127](../../patterns/01-screen-composition.md)).
7. **Toast** (optional). [Snackbar](../../molecules/snackbar.md) only when a change's result isn't visible in place ([patterns 4.30](../../patterns/04-states-feedback.md)).

**States.**
- Loading: [Skeleton](../../atoms/skeleton.md) rows in the category pane's layout.
- Switch pending: while a switch's change is being applied, the switch shows its pending state; on failure it returns to its earlier value with an inline message at the row ([patterns 4.24](../../patterns/04-states-feedback.md)).
- Search with no match: [Empty State](../../molecules/empty-state.md) type No results, compact on, in the category column.
- No permission for a category: Empty State type No permission in the category pane, saying who can grant access ([patterns 4.10](../../patterns/04-states-feedback.md)).

The composed components govern their own colours, states, sizes, radius and focus rings. The template only places them.

## Layout
```
Medium and up                                          Compact (two screens)
┌──────────────────────────────────────────────────┐   ┌──────────────┐ ┌──────────────┐
│ 1 Header                                         │   │ 1 Settings   │ │ 1 ← Display  │
├───┬────────────────┬─────────────────────────────┤   ├──────────────┤ ├──────────────┤
│ 2 │ 3 Search       │ 5.1 Category title          │   │ 3 Search     │ │ 5.2 Notice   │
│   │ 4 Category ▌   │ 5.2 Notice (optional)       │   │ 4 Category › │ │ 5.3 Group    │
│   │ 4 Category     │ 5.3 Group heading           │   │ 4 Category › │ │  Label  [◉]  │
│   │ 4 Category     │   Label             [◉ ]    │   │ 4 Category › │ │  desc        │
│   │                │   Description               │   │              │ │              │
│   │                │   Label             [ ▾ ]   │   │              │ ├──────────────┤
│   │                ├─────────────────────────────┤   ├──────────────┤ │ 6 Commit bar │
│   │                │ 6 Commit bar  [Cancel][Save]│   │ 2 Nav bar    │ └──────────────┘
└───┴────────────────┴─────────────────────────────┘   └──────────────┘
```
- The category column takes a narrow fixed share; the category pane takes the rest, capped at `--container-reading` with the extra width left empty ([patterns 1.107](../../patterns/01-screen-composition.md)).
- Settings within a group sit `--space-lg` apart; groups sit `--space-xl` apart, the heading belonging to the group below it.
- The category column and the category pane scroll independently. The commit bar stays pinned at the bottom of the pane.
- The frame keeps its shape when a category holds only one setting ([patterns 1.28](../../patterns/01-screen-composition.md)).

## Responsiveness
- **Compact** (below `--breakpoint-medium-min`): the category list is its own screen; each category opens its settings on a new screen with back ([patterns 1.28](../../patterns/01-screen-composition.md)). Margins `--space-page`. [Navigation Bar](../../organisms/navigation-bar.md) at the bottom on the category list; on a category screen it stays unless the product hides it on deeper screens, with back reaching the top ([patterns 5.15](../../patterns/05-sizes-devices.md)). The commit bar spans the screen and rides above the keyboard ([patterns 5.54](../../patterns/05-sizes-devices.md)).
- **Medium** (from `--breakpoint-medium-min`): two panes, because settings are light content ([patterns 5.10](../../patterns/05-sizes-devices.md)). [Navigation Rail](../../organisms/navigation-rail.md) Expanded false. Margins `--grid-margin`.
- **Expanded** (from `--breakpoint-expanded-min`): two panes as medium, with the pane capped and the extra width empty.
- **Large** (from `--breakpoint-large-min`): the rail is Expanded true. Nothing else grows; settings never stretch.
- **Touch.** Every row is at least `--control-target-min` ([patterns 6.16](../../patterns/06-accessibility.md)). A switch's whole row is its target on touch, so the small switch never has to be hit on its own.

## Accessibility
- **Landmarks and headings.** `header`, `nav` for global navigation, and a second `nav` labelled "Settings categories" for the category list. The category pane is `main`. "Settings" is the `h1` on the category list; on a category screen, or beside the list from medium, the category title is `h1` and group headings are `h2`.
- **Focus order.** Search, categories, then the category pane top to bottom, then the commit bar. Choosing a category from medium moves focus to its title; at compact the new screen's heading takes focus ([patterns 6.27](../../patterns/06-accessibility.md)). After Save, focus stays on Save ([patterns 6.33](../../patterns/06-accessibility.md)).
- **Keyboard.** The category list is one stop with arrow keys between rows. Each switch is reached by Tab and toggled with Space; radio groups are one stop with arrows ([patterns 6.35](../../patterns/06-accessibility.md)).
- **Names and announcements.** Each switch is named by its label with the description as its description ([patterns 6.47](../../patterns/06-accessibility.md)). A managed setting announces as unavailable with its reason and stays focusable ([patterns 6.34](../../patterns/06-accessibility.md)). Applied changes and failures are announced politely; the current category is marked current.
- **Never colour alone.** The current category has the List Item selected state; switch state shows by thumb position and its check glyph; the lock is an icon with words.

## Usage
- Use it whenever a product has more than one category of settings. A single short group of settings can sit in a [Dialog](../../organisms/dialog.md) or a section of the object's own page.
- Never mix controls that act at once with controls that wait for Save in the same group ([patterns 3.62](../../patterns/03-controls-interaction.md)). Prefer instant switches; use a Save group only where settings must change together.
- Something that applies at once but can't easily be reversed is a button that confirms, never a switch ([patterns 3.68](../../patterns/03-controls-interaction.md)).
- Settings stay out of global navigation unless the product has many of them ([patterns 2.7](../../patterns/02-navigation-flow.md)). Settings for one object belong inside that object ([patterns 1.49](../../patterns/01-screen-composition.md)).
- Drafts: [List Item](../../molecules/list-item.md), [Commit Bar](../../molecules/commit-bar.md), [Skeleton](../../atoms/skeleton.md), [Empty State](../../molecules/empty-state.md), [Input Label](../../atoms/input-label.md) and [Input Hint](../../atoms/input-hint.md) are draft; their measurements are placeholders.

Prototypes using this template: none yet.
