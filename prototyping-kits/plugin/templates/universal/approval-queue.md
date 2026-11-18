---
name: Approval Queue
level: template
status: draft
composes: [../../organisms/compare-view.md, ../../organisms/dialog.md, ../../organisms/global-header.md, ../../organisms/navigation-bar.md, ../../organisms/navigation-rail.md, ../../organisms/top-app-bar.md, ../../molecules/commit-bar.md, ../../molecules/empty-state.md, ../../molecules/inline-banner.md, ../../molecules/input.md, ../../molecules/key-value-list.md, ../../molecules/list-item.md, ../../molecules/site-switcher.md, ../../atoms/ai-mark.md, ../../atoms/status-label.md]
---

# Approval Queue

> A screen for a person who approves drafts made by AI or by others (schedules, configuration changes, orders): items that break a rule first, each leading with what changed since the last approved version, clean items approved together and flagged items one at a time.

It embodies the approval queue rule ([patterns 9.90](../../patterns/09-ai.md)), approval on the item ([patterns 9.42](../../patterns/09-ai.md)), rechecking before running ([patterns 9.95](../../patterns/09-ai.md)) and authority over people's work ([patterns 9.89](../../patterns/09-ai.md)). Used for approving AI-drafted schedules and task assignments, device configuration changes, replenishment orders and any queue of drafts awaiting sign-off.

## Anatomy

1. **Shell**: from medium up, [Global Header](../../organisms/global-header.md), Rounded off (sharp, full width; [Global Header Usage](../../organisms/global-header.md#usage)) with the [Site Switcher](../../molecules/site-switcher.md) and a [Navigation Rail](../../organisms/navigation-rail.md) whose Approvals destination carries a count badge ([patterns 1.69](../../patterns/01-screen-composition.md)); at compact, [Top App Bar](../../organisms/top-app-bar.md) type default and [Navigation Bar](../../organisms/navigation-bar.md).
2. **Title row**: page title "Approvals" with the count and scope ("14 waiting · Site 4") ([patterns 10.101](../../patterns/10-data-display.md)).
3. **Queue** (leading pane): two groups, each with a heading and count.
   - **Needs a closer look**: items that break a rule, first ([patterns 9.90](../../patterns/09-ai.md)). Each is a [List Item](../../molecules/list-item.md), Lines three, Action open, no selection control (flagged items are approved one at a time), label the item, supporting text the change in one line ("3 shifts moved, 1 over 10 hours") and who drafted it with an [AI Mark](../../atoms/ai-mark.md) "Drafted" where it was the AI, Trailing status with a [Status Label](../../atoms/status-label.md) status warning, leading icon, "Breaks a rule".
   - **Ready to approve**: clean items, each a [List Item](../../molecules/list-item.md), Lines two, Action select, Leading checkbox, so they can be approved together.
4. **Detail** (trailing pane, the selected item):
   - The item's identity, its AI Mark, and who else must approve, if anyone ([patterns 9.42](../../patterns/09-ai.md)).
   - **What changed** first ([patterns 9.90](../../patterns/09-ai.md)): a [Compare View](../../organisms/compare-view.md), Type changes, Show only differences on, of this draft against the last approved version, listing only what changed by default, each change marked added, removed or changed in words and an icon ([patterns 10.90](../../patterns/10-data-display.md)).
   - **Rule broken** (flagged only): an [Inline Banner](../../molecules/inline-banner.md) appearance subtle, status warning, naming the rule in the approved wording and linking to its source ([patterns 9.94](../../patterns/09-ai.md)).
   - **Why**: the reason in work facts, not a score ([patterns 9.89](../../patterns/09-ai.md)), and where the idea came from if it came from something the AI read ([patterns 9.93](../../patterns/09-ai.md)).
   - **Facts**: a [Key Value List](../../molecules/key-value-list.md) of scope (people, devices or sites affected) ([patterns 9.92](../../patterns/09-ai.md)).
5. **Commit for one item**: a [Commit Bar](../../molecules/commit-bar.md), Scope pane, at the foot of the detail. Leading action destructive "Reject"; Secondary commit "Edit"; Primary label "Approve", or "Approve and next" when more remain ([patterns 2.57](../../patterns/02-navigation-flow.md)).
6. **Commit for many** (while clean items are selected): the queue's [Commit Bar](../../molecules/commit-bar.md), Scope pane, Show Scope on, Scope text the count and scope ("8 schedules at Site 4") ([patterns 1.140](../../patterns/01-screen-composition.md)), Cancel, Primary label "Approve 8".
7. **Reject reason**: Reject opens a [Dialog](../../organisms/dialog.md) flavour default (full screen at compact) with an [Input](../../molecules/input.md) for the reason, which goes back to the drafter.
8. **Changed since approval**: just before an approved item runs, it's checked against the current state; if the device, stock or schedule has changed, a [Dialog](../../organisms/dialog.md) flavour warning shows the difference and asks again ([patterns 9.95](../../patterns/09-ai.md)).

States:
- **Queue empty**: an [Empty State](../../molecules/empty-state.md) type All done in the queue pane ("Nothing waiting").
- **After approving many**: the outcome follows [Batch Result](batch-result.md); approved items leave the queue with an Undo where the action hasn't run yet ([patterns 3.86](../../patterns/03-controls-interaction.md), [patterns 3.87](../../patterns/03-controls-interaction.md)).

The composed components govern their own colours, states, sizes, radius and focus rings. The template only places them.

## Layout

```
┌───────────────────────────────────────────────────────────────────┐
│ 1 Global Header ………………………………… [Site 4 ▾] …………………………………… (account) │
├────┬──────────────────────────┬───────────────────────────────────┤
│ 1  │ 2 Approvals · 14 waiting │ 4 Week 21 schedule  ✦ Drafted     │
│ R  │ 3 Needs a closer look (2)│   Also needs: Site manager        │
│ a  │   ▮ Week 21 · Breaks rule│   What changed                    │
│ i  │   ▮ Dock B · Breaks rule │   ~ Ana  Tue 06:00 → 08:00        │
│ l  │   Ready to approve (12)  │   + Ben  Wed 14:00–22:00          │
│    │   ☐ Week 21 Dock A       │   (! Over 10 hours: rule 4.2)     │
│    │   ☐ Week 21 Dock C       │   Why · Scope                     │
│    ├──────────────────────────┼───────────────────────────────────┤
│    │ 6 [Approve 8 schedules]  │ [Reject] [Edit] [Approve and next]│
└────┴──────────────────────────┴───────────────────────────────────┘
```

- Two panes: the queue at about a third of the width on the leading side, the detail taking the rest ([patterns 1.98](../../patterns/01-screen-composition.md)). Each pane scrolls on its own and has its own Commit Bar, spanning only that pane ([patterns 1.22](../../patterns/01-screen-composition.md)); only one shows its primary at a time (the queue's while clean items are selected, the detail's otherwise) ([patterns 1.17](../../patterns/01-screen-composition.md)).
- Margins `--grid-margin`; inside the detail, sections sit `--space-xl` apart, and a section's heading `--space-sm` above its content.

## Responsiveness

- **Compact** (below `--breakpoint-medium-min`): one pane. The queue is the screen; opening an item replaces it, and back returns to the same place in the queue ([patterns 1.98](../../patterns/01-screen-composition.md)). Selecting clean items uses [Top App Bar](../../organisms/top-app-bar.md) type contextual and the Commit Bar, Scope page. The detail's Commit Bar stacks full width, primary on top ([patterns 1.77](../../patterns/01-screen-composition.md)). The Compare View shows one change per row, old above new.
- **Medium** (from `--breakpoint-medium-min`): as compact with margins `--grid-margin` and rail navigation; the detail is a page of its own.
- **Expanded** (from `--breakpoint-expanded-min`): the two panes drawn above.
- **Large** (from `--breakpoint-large-min`): as expanded; the Compare View may show old and new side by side.
- **Touch**: every target meets `--control-target-min` ([patterns 6.16](../../patterns/06-accessibility.md)). Reject and Approve sit at opposite ends of the bar ([patterns 1.132](../../patterns/01-screen-composition.md)).

## Accessibility

- **Landmarks and headings**: `header`, `nav`, `main` holding two labelled regions, "Queue" and the item's name. One h1, "Approvals"; the two queue groups and the item title are h2; detail sections are h3.
- **Focus order**: queue, then detail. Choosing an item moves focus to the detail's heading; after Approve and next, focus moves to the next item's heading ([patterns 6.33](../../patterns/06-accessibility.md)). When an approved item leaves the queue, focus moves to the next item, never to the top ([patterns 6.31](../../patterns/06-accessibility.md)).
- **Keyboard**: the queue is a list; Space selects a clean item, Enter opens any item.
- **Names and announcements**: the AI Mark reads its verb ("Drafted by AI"). Selection count and "8 approved" are announced politely ([patterns 6.53](../../patterns/06-accessibility.md)). The checkbox is named with the item.
- **Never colour alone**: rule breaks carry a word and icon; changes are marked added, removed or changed in words ([patterns 10.90](../../patterns/10-data-display.md)).

## Usage

- Use for drafts awaiting someone's approval before they take effect. For a person's own pending tasks, use a task list.
- Flagged items are never in a bulk approval; each is opened and approved on its own ([patterns 9.90](../../patterns/09-ai.md)).
- The person approving can see who drafted it, for which role, and that the recipients will see who approved it ([patterns 9.100](../../patterns/09-ai.md)).
- Approve acts only within the approver's permissions, tenant and site ([patterns 9.92](../../patterns/09-ai.md)).
- Draft components, whose measurements are placeholders: Site Switcher, List Item, AI Mark, Compare View, Key Value List, Commit Bar, Empty State.

Prototypes using this template: none yet.
