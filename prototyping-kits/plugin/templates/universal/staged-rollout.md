---
name: Staged Rollout
level: template
status: draft
composes: [../../organisms/dialog.md, ../../organisms/global-header.md, ../../organisms/navigation-rail.md, ../../organisms/right-drawer-panel.md, ../../organisms/screen-header-bar.md, ../../organisms/table.md, ../../molecules/commit-bar.md, ../../molecules/inline-banner.md, ../../molecules/list-item.md, ../../molecules/site-switcher.md, ../../molecules/task-list.md, ../../atoms/ai-mark.md, ../../atoms/filter-chip.md, ../../atoms/progress-bar.md, ../../atoms/status-label.md]
---

# Staged Rollout

> A screen for sending a change (firmware, configuration, profile) to many devices in stages: it states how many and which, runs on a small group first, shows each device's result as it lands, and offers a rollback before reaching the rest.

It embodies changes aimed at many devices ([patterns 9.91](../../patterns/09-ai.md)), long operations across many devices ([patterns 4.48](../../patterns/04-states-feedback.md)), deployments ([patterns 4.94](../../patterns/04-states-feedback.md)) and rollout counts ([patterns 10.100](../../patterns/10-data-display.md)). Used for firmware updates, configuration and profile deployments, app installs and AI-proposed fleet changes.

## Anatomy

1. **Shell**: from medium up, [Global Header](../../organisms/global-header.md), Rounded off (sharp, full width; [Global Header Usage](../../organisms/global-header.md#usage)) with the [Site Switcher](../../molecules/site-switcher.md) and a [Navigation Rail](../../organisms/navigation-rail.md); at compact, [Screen Header Bar](../../organisms/screen-header-bar.md) with leading icon on, the rollout's name as Title.
2. **Identity**: the change's name and version, its type, who started it and when; an [AI Mark](../../atoms/ai-mark.md) "Proposed" where the AI proposed it, with who approved it ([patterns 9.100](../../patterns/09-ai.md)). The scope in words: how many devices, which sites and tenant ("1,240 devices at 12 sites, Acme Retail") ([patterns 9.91](../../patterns/09-ai.md), [patterns 9.92](../../patterns/09-ai.md), [patterns 10.101](../../patterns/10-data-display.md)).
3. **Stages**: a [Task List](../../molecules/task-list.md), Variant progress, Show Summary on ("1 of 3 stages done"), of the stages in order, each named and counted ("Pilot group, 20 devices", "Site 4, 180 devices", "All other sites, 1,040 devices"), each with its status: waiting, running, needs approval, done or failed ([patterns 9.38](../../patterns/09-ai.md)). The stage awaiting a decision says so.
4. **Overall progress**: a [Progress Bar](../../atoms/progress-bar.md) size large, Label naming the work and counting it ("Updating 214 of 1,240 devices") ([patterns 4.20](../../patterns/04-states-feedback.md)), measured against the completion threshold, which it marks in words ("Complete at 98%") ([patterns 4.48](../../patterns/04-states-feedback.md)). The point of no return, where there is one, is marked ([patterns 4.21](../../patterns/04-states-feedback.md)).
5. **Outcome counts**: a row of [Filter Chip](../../atoms/filter-chip.md)s with every outcome and its count, failures first, adding to the total: "Failed 6", "In progress 40", "Waiting 960", "Done 214", and the long tail counted separately ("Offline for more than 3 days 20") ([patterns 10.100](../../patterns/10-data-display.md), [patterns 4.48](../../patterns/04-states-feedback.md)). Choosing one filters the device table.
6. **Devices**: a [Table](../../organisms/table.md), Column Position frozen (identifier), Selectable on, Row Actions off, Live updates hold: identifier, outcome as a [Status Label](../../atoms/status-label.md) shape sharp with leading icon, version now (the last working version where an update was interrupted ([patterns 4.92](../../patterns/04-states-feedback.md))), site, and last seen for waiting devices ([patterns 4.94](../../patterns/04-states-feedback.md)). Results land row by row as they arrive; rows don't move while focused, pointed at or selected ([patterns 10.98](../../patterns/10-data-display.md)). A device whose result can't be confirmed shows "Checking", not "Failed" ([patterns 4.86](../../patterns/04-states-feedback.md)).
7. **Stage gate** (when a stage finishes): an [Inline Banner](../../molecules/inline-banner.md) appearance subtle, status info (warning if any failed), summarising the stage ("Pilot finished: 19 of 20 updated, 1 failed") ([patterns 7.50](../../patterns/07-content-copy.md)), above a [Commit Bar](../../molecules/commit-bar.md), Scope page, with Leading action destructive "Roll back pilot", Show Scope on, Scope text the next stage ("Next: 180 devices at Site 4"), Primary label "Continue rollout" ([patterns 9.91](../../patterns/09-ai.md), [patterns 1.140](../../patterns/01-screen-composition.md)).
8. **While running**: the Commit Bar's Leading action destructive "Cancel rollout", which stops only the devices still waiting and says how many have already changed ([patterns 4.94](../../patterns/04-states-feedback.md)); Secondary commit "Pause" where pausing is safe ([patterns 4.21](../../patterns/04-states-feedback.md)). Stop is always in this same place ([patterns 9.39](../../patterns/09-ai.md)).
9. **Retry**: selecting failed devices offers "Retry 6" for those only ([patterns 4.46](../../patterns/04-states-feedback.md)).
10. **Confirmations**: rollback, cancel and continue each confirm in a [Dialog](../../organisms/dialog.md) flavour warning that states the count and scope, and that offline devices are queued, not done ([patterns 3.135](../../patterns/03-controls-interaction.md)). Rolling back the whole fleet uses [Type To Confirm](type-to-confirm.md).

States:
- **Before starting**: the same screen with stages all waiting, the Commit Bar's Primary label "Start pilot", and the plan shown first for approval ([patterns 9.37](../../patterns/09-ai.md)).
- **Changed since approval**: if devices or versions changed since it was approved, the difference shows and it asks again before running ([patterns 9.95](../../patterns/09-ai.md)).
- **Finished**: the progress bar says complete, the long tail stays counted with its own status, and the rollout stays open only for them, never blocking completion ([patterns 4.48](../../patterns/04-states-feedback.md)).

The composed components govern their own colours, states, sizes, radius and focus rings. The template only places them.

## Layout

```
┌──────────────────────────────────────────────────────────────┐
│ 1 Global Header ……………………… [All sites ▾] ………………………… (account) │
├────┬─────────────────────────────────────────────────────────┤
│ 1  │ 2 Firmware 11.4 · 1,240 devices at 12 sites  ✦ Proposed │
│ R  │ 3 ✓ Pilot group, 20 devices            Done             │
│ a  │   ◌ Site 4, 180 devices                Needs approval   │
│ i  │   ○ All other sites, 1,040 devices     Waiting          │
│ l  │ 4 ███████░░░░░░░░░░░  Updating 214 of 1,240             │
│    │ 5 (Failed 6)(In progress 40)(Waiting 960)(Done 214)     │
│    │ 6 ┌Device────┬Outcome──┬Version┬Site┬Last seen┐         │
│    │   └──────────┴─────────┴───────┴────┴─────────┘         │
│    │ 7 (Pilot finished: 19 of 20 updated, 1 failed)          │
│    │   [Roll back pilot]  Next: 180 at Site 4  [Continue]    │
└────┴─────────────────────────────────────────────────────────┘
```

- One column under the header, the table running the full content width ([patterns 5.11](../../patterns/05-sizes-devices.md)). Regions 2 to 5 sit `--space-xl` apart; the table `--space-xl` below the chips. Margins `--grid-margin` from medium, `--space-page` at compact.
- The Commit Bar is pinned to the bottom of the page; the table scrolls inside its region with a sticky header.

## Responsiveness

- **Compact** (below `--breakpoint-medium-min`): one column, margins `--space-page`. The Task List and progress stay at the top; the outcome chips scroll sideways; the table becomes a list of [List Item](../../molecules/list-item.md)s, Lines two, label the identifier, supporting text site and last seen, Trailing status ([patterns 1.96](../../patterns/01-screen-composition.md)). The Commit Bar stacks full width, primary on top ([patterns 1.77](../../patterns/01-screen-composition.md)). Starting a rollout across a fleet is usually a console task; a handheld may show progress and stop it, and hands off anything more ([patterns 5.4](../../patterns/05-sizes-devices.md)).
- **Medium** (from `--breakpoint-medium-min`): rail navigation, margins `--grid-margin`; the table keeps identifier, outcome and one more column ([patterns 5.20](../../patterns/05-sizes-devices.md)).
- **Expanded** (from `--breakpoint-expanded-min`): as drawn. A device row opens its detail in a [Right Drawer Panel](../../organisms/right-drawer-panel.md) variant persistent.
- **Large** (from `--breakpoint-large-min`): the Task List may sit in a leading column beside the progress and table.
- **Touch**: every target meets `--control-target-min` ([patterns 6.16](../../patterns/06-accessibility.md)); Filter Chips extend their hit area to it. Roll back and Continue sit at opposite ends of the Commit Bar ([patterns 1.132](../../patterns/01-screen-composition.md)).

## Accessibility

- **Landmarks and headings**: `header`, `nav`, `main`; the Commit Bar is a labelled region. One h1, the rollout's name; "Stages", "Progress" and "Devices" are h2.
- **Focus order**: identity, stages, progress, outcome chips, table, stage gate, Commit Bar. When a stage gate appears, focus doesn't move; the banner is announced and the Commit Bar is the next stop after the table.
- **Keyboard**: the outcome chips are one stop with arrow keys; the table follows [Table](../../organisms/table.md) Accessibility.
- **Names and announcements**: progress is announced at intervals, not every device ([patterns 6.57](../../patterns/06-accessibility.md)); a stage finishing and any failure are announced politely, a stage that needs approval assertively ([patterns 6.54](../../patterns/06-accessibility.md)). Live results can be paused ([patterns 6.58](../../patterns/06-accessibility.md)).
- **Never colour alone**: stages and outcomes are words with icons; the threshold and point of no return are marked in words.

## Usage

- Use for one change sent to many devices in stages. For a one-off action on a few selected devices, confirm it and show its [Batch Result](batch-result.md).
- Always run on a small group first and offer rollback before the rest ([patterns 9.91](../../patterns/09-ai.md)).
- Never declare the rollout successful before devices report back ([patterns 2.54](../../patterns/02-navigation-flow.md)). One absent device never keeps a large job open forever ([patterns 4.48](../../patterns/04-states-feedback.md)).
- Steps that can't be interrupted (writing firmware) say so before they start ([patterns 9.39](../../patterns/09-ai.md)).
- Draft components, whose measurements are placeholders: Site Switcher, AI Mark, Task List, Commit Bar, List Item, Right Drawer Panel.

Prototypes using this template: none yet.
