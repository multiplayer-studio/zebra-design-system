---
name: Schedule
level: template
status: draft
composes: [../../organisms/date-picker.md, ../../organisms/gantt-view.md, ../../organisms/global-header.md, ../../organisms/navigation-bar.md, ../../organisms/navigation-rail.md, ../../organisms/right-drawer-panel.md, ../../organisms/top-app-bar.md, ../../molecules/commit-bar.md, ../../molecules/empty-state.md, ../../molecules/inline-banner.md, ../../molecules/key-value-list.md, ../../molecules/list-item.md, ../../molecules/site-switcher.md, ../../atoms/ai-mark.md, ../../atoms/button.md, ../../atoms/filter-chip.md, ../../atoms/icon-button.md, ../../atoms/skeleton.md]
---

# Schedule

> A screen for planning and reading shifts or resource bookings: people or resources down one axis, time along the other, opening on now, with a shift's detail in a side panel that keeps the grid visible.

It embodies the schedule screen type ([patterns 1.144](../../patterns/01-screen-composition.md)) and shifts on a shared time axis ([patterns 10.107](../../patterns/10-data-display.md)). Used for staff rosters, shift planning, equipment and dock bookings, and task timelines per person.

## Anatomy

1. **Shell**: from medium up, [Global Header](../../organisms/global-header.md), Rounded off (sharp, full width; [Global Header Usage](../../organisms/global-header.md#usage)) with the [Site Switcher](../../molecules/site-switcher.md) ([patterns 1.54](../../patterns/01-screen-composition.md)) and a [Navigation Rail](../../organisms/navigation-rail.md); at compact, [Top App Bar](../../organisms/top-app-bar.md) type default and [Navigation Bar](../../organisms/navigation-bar.md).
2. **Title row**: page title (h1) "Schedule", the site and the time zone in words ("Site 4, times in Central European Time") ([patterns 10.103](../../patterns/10-data-display.md), [patterns 7.59](../../patterns/07-content-copy.md)); page action at the trailing end, [Button](../../atoms/button.md) flavour outline "Add shift" where the person can edit, so the panel's Save stays the one primary ([patterns 1.53](../../patterns/01-screen-composition.md), [patterns 1.17](../../patterns/01-screen-composition.md)).
3. **Time navigation**: [Icon Button](../../atoms/icon-button.md)s `chevron_left` and `chevron_right`, flavour subtle, size medium, around the visible range ("12 to 18 May 2026") ([patterns 7.58](../../patterns/07-content-copy.md)); a [Button](../../atoms/button.md) flavour outline-subtle "Today" returns to now; the range opens a [Date Picker](../../organisms/date-picker.md).
4. **Filters**: [Filter Chip](../../atoms/filter-chip.md)s for team, role and status ("Unfilled"), above the grid ([patterns 1.86](../../patterns/01-screen-composition.md)), with the result count ("32 people") ([patterns 1.91](../../patterns/01-screen-composition.md)).
5. **Grid** (focal): a [Gantt View](../../organisms/gantt-view.md), Zoom day or week, Group by resource, Assignee avatar on. One row per person or resource, with their shifts as bars along the shared time axis; now is marked, and overlaps and gaps are visible ([patterns 10.107](../../patterns/10-data-display.md)). It opens scrolled to now ([patterns 1.144](../../patterns/01-screen-composition.md)). A shift's status is in its label as well as its bar ("Unfilled", "Swap requested"), never colour alone.
6. **Shift detail** (on choosing a shift): a [Right Drawer Panel](../../organisms/right-drawer-panel.md) variant persistent, beside the grid ([patterns 1.144](../../patterns/01-screen-composition.md)), titled with the person and the shift. Its body is a [Key Value List](../../molecules/key-value-list.md) (start, end, role, location, breaks) with exact times ([patterns 7.60](../../patterns/07-content-copy.md)), then any conflict as an [Inline Banner](../../molecules/inline-banner.md) appearance subtle, status warning ("Overlaps a shift at Dock 2"). Its footer is a [Commit Bar](../../molecules/commit-bar.md), Scope sheet, Leading action destructive "Remove shift", Primary label "Save" while editing; read-only viewers see no footer ([patterns 1.75](../../patterns/01-screen-composition.md)).
7. **AI proposal** (optional): a proposed schedule carries an [AI Mark](../../atoms/ai-mark.md) "Drafted" on each changed shift, and is never applied without a manager's approval; the worker affected can see the reason in work facts and contest it ([patterns 9.89](../../patterns/09-ai.md)). Approval follows [Approval Queue](approval-queue.md).

States:
- **Loading**: the grid's frame with [Skeleton](../../atoms/skeleton.md) rows under its real header ([patterns 1.128](../../patterns/01-screen-composition.md)).
- **Nobody scheduled**: an [Empty State](../../molecules/empty-state.md) type First use (or No results when filtered) in place of the rows, with "Add shift".
- **Restricted**: shifts the person may not see are marked restricted, not left empty ([patterns 10.102](../../patterns/10-data-display.md)).

The composed components govern their own colours, states, sizes, radius and focus rings. The template only places them.

## Layout

```
┌──────────────────────────────────────────────────────────────────┐
│ 1 Global Header ………………………………… [Site 4 ▾] ………………………………… (account) │
├────┬──────────────────────────────────────────┬──────────────────┤
│ 1  │ 2 Schedule · Site 4, CET      [Add shift]│ 6 Ana · Tue 13   │
│ R  │ 3 ‹ 12 to 18 May 2026 ›  [Today]         │   Start  06:00   │
│ a  │ 4 (Team ▾)(Role ▾)(Unfilled)  32 people  │   End    14:00   │
│ i  │ 5 ┌────────┬──Mon──Tue──Wed──Thu──Fri──┐ │   Role   Picker  │
│ l  │   │ Ana    │ ███  ███  │    ███        │ │   (Overlaps …)   │
│    │   │ Ben    │      ███  │ ███           │ │                  │
│    │   │ Unfill.│ ░░░       │               │ │                  │
│    │   └────────┴───────────┴now────────────┘ │ [Remove]  [Save] │
└────┴──────────────────────────────────────────┴──────────────────┘
```

- The grid takes the larger share and may run the full width ([patterns 5.11](../../patterns/05-sizes-devices.md)); the shift panel sits on the trailing side and keeps the grid visible ([patterns 1.99](../../patterns/01-screen-composition.md)). Margins `--grid-margin`; regions 2 to 4 sit `--space-lg` apart and `--space-xl` above the grid.
- The grid scrolls in both directions inside its region; the people column and the time header stay pinned ([patterns 1.97](../../patterns/01-screen-composition.md)). The page never scrolls sideways.

## Responsiveness

- **Compact** (below `--breakpoint-medium-min`): the grid can't be read at this width, so it becomes a day view: a day selector (the date with previous and next [Icon Button](../../atoms/icon-button.md)s) and a list of shifts in time order, each a [List Item](../../molecules/list-item.md), Lines two, Action open, Leading avatar, label the person, supporting text the times and role, Trailing status for exceptions. A worker's own schedule shows only their shifts, next first ([patterns 2.86](../../patterns/02-navigation-flow.md)). The shift detail opens full screen with back ([patterns 1.114](../../patterns/01-screen-composition.md)). Filters sit behind one control with a count ([patterns 1.87](../../patterns/01-screen-composition.md)).
- **Medium** (from `--breakpoint-medium-min`): the grid at Zoom day, margins `--grid-margin`; the shift detail is a [Right Drawer Panel](../../organisms/right-drawer-panel.md) variant modal over the grid.
- **Expanded** (from `--breakpoint-expanded-min`): as drawn, Zoom week, the persistent panel beside the grid.
- **Large** (from `--breakpoint-large-min`): as expanded, with more days visible; the panel keeps its width.
- **Touch**: bars and rows meet `--control-target-min` in height ([patterns 6.16](../../patterns/06-accessibility.md)); small bars that can't are also reachable from the person's row and the day list ([patterns 6.20](../../patterns/06-accessibility.md)). Moving a shift by dragging always has a non-drag way: edit its times in the panel ([patterns 6.83](../../patterns/06-accessibility.md)).

## Accessibility

- **Landmarks and headings**: `header`, `nav`, `main`, and the panel as a `complementary` region titled with the shift. One h1, "Schedule"; the panel title is h2.
- **Focus order**: title row, time navigation, filters, grid, panel. Opening a shift moves focus into the panel; closing it returns focus to the bar that opened it ([patterns 6.28](../../patterns/06-accessibility.md), [patterns 6.29](../../patterns/06-accessibility.md)).
- **Keyboard**: the grid is one stop; arrow keys move between people and days, Enter opens a shift ([patterns 6.35](../../patterns/06-accessibility.md)). "Today" is reachable by Tab.
- **Names and announcements**: Icon buttons are named "Previous week" and "Next week". The visible range is announced when it changes. Each bar's name includes person, day, times and status. The table alternative is Gantt View's View table ([Gantt View](../../organisms/gantt-view.md) Usage).
- **Never colour alone**: shift status and the now marker each have words; unfilled shifts say "Unfilled".

## Usage

- Use for time-based assignments across several people or resources. For a single person's day, use a list of their shifts.
- Exact times, not relative ones, from the start; one named time zone, with a choice between the person's zone and the site's where sites span zones ([patterns 7.60](../../patterns/07-content-copy.md), [patterns 10.103](../../patterns/10-data-display.md)).
- Publishing a schedule that reaches many people states the scope next to its commit ("Publish 32 shifts at Site 4") ([patterns 1.140](../../patterns/01-screen-composition.md)).
- AI never makes the final decision on someone's schedule ([patterns 9.89](../../patterns/09-ai.md)).
- Draft components, whose measurements are placeholders: Gantt View, Date Picker, Right Drawer Panel, Site Switcher, Key Value List, Commit Bar, List Item, AI Mark, Skeleton, Empty State.

Prototypes using this template: none yet.
