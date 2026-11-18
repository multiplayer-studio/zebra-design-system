---
name: Batch Result
level: template
status: draft
composes: [../../organisms/dialog.md, ../../organisms/right-drawer-panel.md, ../../molecules/commit-bar.md, ../../molecules/list-item.md, ../../molecules/notification-item.md, ../../molecules/snackbar.md, ../../atoms/button.md, ../../atoms/filter-chip.md, ../../atoms/progress-bar.md, ../../atoms/status-label.md]
---

# Batch Result

> What a person sees after acting on many items at once: a toast when all succeeded, otherwise a summary led by what worked, then each failure and why, with a way to retry only the failures.

It embodies partial and batch results ([patterns 4.44](../../patterns/04-states-feedback.md), [patterns 4.45](../../patterns/04-states-feedback.md), [patterns 4.46](../../patterns/04-states-feedback.md), [patterns 4.47](../../patterns/04-states-feedback.md)) and the partial outcome copy ([patterns 7.50](../../patterns/07-content-copy.md)). Used after bulk actions on devices, orders, users, files or tasks: restart, assign, update, delete, export.

## Anatomy

1. **Before acting** (where eligibility is known): the confirmation counts the items that can't take the action and lets the person go ahead with the rest ([patterns 4.44](../../patterns/04-states-feedback.md)): a [Dialog](../../organisms/dialog.md) flavour warning, title "Restart 17 of 20 devices?", body naming why 3 can't ("3 are updating"), Actions custom with [Button](../../atoms/button.md) outline-subtle "Cancel" and [Button](../../atoms/button.md) primary "Restart 17". If none can take it, the action is unavailable with each item's state showing why.
2. **All succeeded**: a [Snackbar](../../molecules/snackbar.md) contextual, status success, with the count in the simple past ("20 devices restarted") ([patterns 4.45](../../patterns/04-states-feedback.md), [patterns 7.48](../../patterns/07-content-copy.md)). Nothing else; the collection shows the new state in place ([patterns 4.30](../../patterns/04-states-feedback.md)).
3. **Some or none succeeded**: a summary, never only a toast ([patterns 4.47](../../patterns/04-states-feedback.md)). At expanded it's a [Right Drawer Panel](../../organisms/right-drawer-panel.md) variant modal over the collection; at compact a full screen with back. It holds:
   - **Heading**: what worked, then what didn't, by count ("18 of 20 devices restarted. 2 failed.") ([patterns 7.50](../../patterns/07-content-copy.md)); when none worked, "No devices restarted".
   - **Waiting and unknown** (when any): devices that were offline are counted as queued, not done ([patterns 3.135](../../patterns/03-controls-interaction.md)); devices whose result can't be confirmed are "Checking", not "Failed" ([patterns 4.86](../../patterns/04-states-feedback.md)).
   - **Failures**: grouped by reason, each group headed with its count ("Out of battery, 1"), each failure a [List Item](../../molecules/list-item.md), Lines two, Action open, label the item, supporting text the reason and what to do, Trailing status with a [Status Label](../../atoms/status-label.md) status error, leading icon.
   - **Footer**: at expanded, the panel's own footer; at compact, a [Commit Bar](../../molecules/commit-bar.md), Scope page. Either holds "Close" (outline-subtle), "Show in list" (outline) and "Retry 2 failed" (primary), in that order at the trailing end ([patterns 4.46](../../patterns/04-states-feedback.md)).
4. **In the collection afterwards**: failed items stay selected, with "Retry" in the selection actions, and failures can be filtered to on their own with a [Filter Chip](../../atoms/filter-chip.md) "Failed 2" ([patterns 4.46](../../patterns/04-states-feedback.md)).
5. **Long operations** (results arrive over time): the summary shows each result as it lands, grouped by outcome (done, waiting, failed) with counts, and a [Progress Bar](../../atoms/progress-bar.md) size small against the completion threshold ([patterns 4.48](../../patterns/04-states-feedback.md)). For staged changes across a fleet, use [Staged Rollout](staged-rollout.md).
6. **Background finish**: if the person left the screen, completion is announced and stays until seen, as a [Notification Item](../../molecules/notification-item.md) in the notification centre saying what ran, its result and what failed, linking to this summary ([patterns 4.27](../../patterns/04-states-feedback.md)).

The composed components govern their own colours, states, sizes, radius and focus rings. The template only places them.

## Layout

```
Expanded: summary panel over the collection
┌──────────────────────────────────┬───────────────────────────┐
│ collection (dimmed behind scrim) │ 3 18 of 20 devices        │
│                                  │   restarted. 2 failed.    │
│                                  │   Queued (offline): 0     │
│                                  │   Out of battery, 1       │
│                                  │   ▮ TC52 0042   [Error]   │
│                                  │   Not responding, 1       │
│                                  │   ▮ TC52 0107   [Error]   │
│                                  ├───────────────────────────┤
│                                  │ [Close]   [Retry 2 failed]│
└──────────────────────────────────┴───────────────────────────┘
```

- The summary's heading sits at the top of the panel; groups sit `--space-xl` apart, a group heading `--space-sm` above its rows. The panel body scrolls; the Commit Bar stays at its foot ([patterns 5.19](../../patterns/05-sizes-devices.md)).
- The summary covers part of the collection, never the items it reports on in a way that hides their state ([patterns 1.117](../../patterns/01-screen-composition.md)).

## Responsiveness

- **Compact** (below `--breakpoint-medium-min`): the summary is a full screen with back, margins `--space-page`; the Commit Bar stacks full width, primary on top ([patterns 1.77](../../patterns/01-screen-composition.md)). The pre-action dialog is full screen.
- **Medium** (from `--breakpoint-medium-min`): the summary is a [Right Drawer Panel](../../organisms/right-drawer-panel.md) variant modal; margins `--grid-margin` on the collection behind it.
- **Expanded** (from `--breakpoint-expanded-min`): as drawn.
- **Large** (from `--breakpoint-large-min`): the panel may be variant persistent beside the collection, so the failed rows stay visible next to their reasons.
- **Touch**: every target meets `--control-target-min` ([patterns 6.16](../../patterns/06-accessibility.md)); controls drawn smaller extend their hit area to it.

## Accessibility

- **Landmarks and headings**: the panel is a labelled dialog region; its heading is the outcome sentence (h2 under the page's h1). Reason groups are h3.
- **Focus order**: when the summary opens, focus moves to its heading so the outcome is read first ([patterns 6.28](../../patterns/06-accessibility.md)); then failures, then the Commit Bar. Closing returns focus to the control that started the action ([patterns 6.29](../../patterns/06-accessibility.md)).
- **Names and announcements**: the all-succeeded toast is announced politely and never takes focus ([patterns 6.55](../../patterns/06-accessibility.md)). A partial or failed result opens the summary, which is announced by its heading. Retry is named with its count.
- **Never colour alone**: failures are words with an icon; queued and checking are words.

## Usage

- Choose the outcome by result: all succeeded, a toast; some or none, the summary ([patterns 4.45](../../patterns/04-states-feedback.md)). A failure never appears only in a toast ([patterns 4.47](../../patterns/04-states-feedback.md)).
- Lead with what worked, then what didn't, by count, and link to each failure ([patterns 7.50](../../patterns/07-content-copy.md)).
- A state that takes a whole content area, rather than a bulk action's results, uses [Outcome Screen](outcome-screen.md).
- Retry acts only on the failures and never duplicates work that succeeded ([patterns 4.86](../../patterns/04-states-feedback.md)).
- Draft components, whose measurements are placeholders: Right Drawer Panel, List Item, Commit Bar.

Prototypes using this template: none yet.
