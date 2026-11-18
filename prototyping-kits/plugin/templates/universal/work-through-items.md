---
name: Work Through Items
level: template
status: draft
composes: [../../organisms/bottom-sheet.md, ../../organisms/screen-header-bar.md, ../../molecules/card.md, ../../molecules/commit-bar.md, ../../molecules/connection-status.md, ../../molecules/empty-state.md, ../../molecules/input.md, ../../molecules/key-value-list.md, ../../molecules/list-item.md, ../../molecules/menu-item.md, ../../molecules/stepper-input.md, ../../atoms/button.md, ../../atoms/icon.md, ../../atoms/progress-bar.md, ../../atoms/skeleton.md, ../../atoms/status-label.md]
---

# Work Through Items

> A handheld screen for working through a run of items one at a time (count, pick, put away, check bays): the current item, its place in the run, a scan-or-type entry, the last entry with Undo, and a pinned commit that a hardware key also presses.

It embodies the Zebra screen type for working through many items ([patterns 1.137](../../patterns/01-screen-composition.md)) and the repeated-work loop ([patterns 2.55](../../patterns/02-navigation-flow.md)). Used for cycle counts, picking, put-away, receiving, bay and shelf checks, and any run of scans with a running count and an end.

## Anatomy

1. **Header**: [Screen Header Bar](../../organisms/screen-header-bar.md), leading icon on (back leaves the run, not the item ([patterns 2.56](../../patterns/02-navigation-flow.md))), Title naming the task and the object ("Count aisle 4"), Action Slot one [Button](../../atoms/button.md) "Finish", flavour outline-subtle, size medium. The run is a guided physical task, so it takes the whole screen and hides global navigation; back always shows how to leave ([patterns 1.118](../../patterns/01-screen-composition.md)).
2. **Connection** (optional, offline-capable products): [Connection Status](../../molecules/connection-status.md), Layout compact, Show when connected hidden, in the header area, showing Status waiting to send with its Waiting count while entries are queued ([patterns 4.50](../../patterns/04-states-feedback.md), [patterns 4.53](../../patterns/04-states-feedback.md)).
3. **Instruction and position**: one line of instruction for what to scan, at the top of the content ("Scan the bin label") ([patterns 1.130](../../patterns/01-screen-composition.md)), and the position in the run beside it: a [Progress Bar](../../atoms/progress-bar.md) size small, Show Label on, Label "12 of 40 items" ([patterns 4.20](../../patterns/04-states-feedback.md)). In a blind count the expected quantity is hidden on purpose; in continuous work with no end, the label shows the running count only ("32 scanned") and the bar is off ([patterns 2.55](../../patterns/02-navigation-flow.md)).
4. **Current item** (focal): one composed block ([patterns 1.3](../../patterns/01-screen-composition.md), [patterns 1.18](../../patterns/01-screen-composition.md)). A [Card](../../molecules/card.md) standard, header on (title the item name, subtitle its code in the Key Value List mono value style), footer off. Its body is a [Key Value List](../../molecules/key-value-list.md) of the facts being checked (location, expected quantity, unit), which sit with the item ([patterns 1.137](../../patterns/01-screen-composition.md)).
5. **Entry**: an [Input](../../molecules/input.md) type text, size large, with the scan trailing control ([patterns 3.46](../../patterns/03-controls-interaction.md)), label naming what to scan ("Bin label"), hint "Scan or type the code". Typing is visible by default, never in a menu ([patterns 1.130](../../patterns/01-screen-composition.md), [patterns 3.111](../../patterns/03-controls-interaction.md)). Where the step counts a quantity, a [Stepper Input](../../molecules/stepper-input.md) size large follows it. The on-screen keyboard stays closed until the person chooses to type ([patterns 3.115](../../patterns/03-controls-interaction.md)).
6. **Last entry**: a [List Item](../../molecules/list-item.md) confirming the last scan in place ([patterns 2.55](../../patterns/02-navigation-flow.md), [patterns 3.117](../../patterns/03-controls-interaction.md)): Lines two, Action static, Leading icon ([Icon](../../atoms/icon.md) `barcode`), label the item, supporting text what happened ("Counted 1, total 6"), and as its trailing control a [Button](../../atoms/button.md) "Undo scan", flavour text, size medium ([patterns 3.89](../../patterns/03-controls-interaction.md)). Undo shows only while the entry hasn't been sent. Earlier entries (optional) follow as more List Items, newest first.
7. **Commit**: a [Commit Bar](../../molecules/commit-bar.md), Scope page, pinned to the bottom of the run ([patterns 1.22](../../patterns/01-screen-composition.md)). Leading action back, labelled "Can't complete": the way out of this item, at the opposite end from the commit ([patterns 1.137](../../patterns/01-screen-composition.md), [patterns 1.132](../../patterns/01-screen-composition.md)). Primary label "Confirm", or "Next item" where a scan doesn't move on by itself ([patterns 3.112](../../patterns/03-controls-interaction.md)). Show Scope on where the run has a scope worth restating ("Aisle 4").
8. **Field message** (when needed): a wrong, unreadable or duplicate scan shows at the field as an error line with icon and words, naming what was scanned and what was expected ([patterns 3.113](../../patterns/03-controls-interaction.md), [patterns 1.64](../../patterns/01-screen-composition.md)). A duplicate where a count is expected adds to the count and says so ([patterns 3.114](../../patterns/03-controls-interaction.md)).
9. **Can't complete** (when chosen): a [Bottom Sheet](../../organisms/bottom-sheet.md) content type list of reasons as [Menu Item](../../molecules/menu-item.md)s (Damaged, Not found, Location blocked), then the run moves to the next item.
10. **Finish summary**: Finish replaces the item region with the summary ([patterns 2.55](../../patterns/02-navigation-flow.md)): a heading with the totals, a [Key Value List](../../molecules/key-value-list.md) (counted, expected, difference with its sign ([patterns 10.105](../../patterns/10-data-display.md))), then the differences as [List Item](../../molecules/list-item.md)s, Lines two, Trailing status, each status a [Status Label](../../atoms/status-label.md) status warning, leading icon, only where outside tolerance. The Commit Bar becomes Leading action back "Back to count" and Primary label "Submit count", in the same position.

States:
- **Loading the run**: a [Skeleton](../../atoms/skeleton.md) of regions 3 to 6 ([patterns 4.16](../../patterns/04-states-feedback.md), [patterns 4.17](../../patterns/04-states-feedback.md)).
- **Nothing left**: an [Empty State](../../molecules/empty-state.md) type All done in place of regions 3 to 6, with the next assignment as its action ([patterns 2.86](../../patterns/02-navigation-flow.md)).
- **Offline**: entries are saved and marked waiting to send; the run carries on ([patterns 4.49](../../patterns/04-states-feedback.md), [patterns 4.53](../../patterns/04-states-feedback.md)).

The composed components govern their own colours, states, sizes, radius and focus rings. The template only places them.

## Layout

```
┌──────────────────────────────────┐
│ 1 ‹  Count aisle 4      [Finish] │
│ 2 (waiting to send: 3)           │
├──────────────────────────────────┤
│ 3 Scan the bin label             │
│   ███████░░░░░░  12 of 40 items  │
│ 4 ┌──────────────────────────┐   │
│   │ Item name                │   │
│   │ SKU 00412-88             │   │
│   │ Location   A4-03-2       │   │
│   │ Expected   6             │   │
│   └──────────────────────────┘   │
│ 5 Bin label                      │
│   Scan or type the code          │
│   [                    ⌗  ✕ ]    │
│ 6 ▮ Item name  Counted 1  [Undo] │
├──────────────────────────────────┤
│ 7 [Can't complete]    [Confirm]  │
└──────────────────────────────────┘
```

- One column. The content area is padded `--space-page` and scrolls between the header and the Commit Bar. Regions 3 to 6 sit `--space-xl` apart; inside the instruction (3) and the entry (5) parts sit `--space-sm` apart.
- The instruction and the current item stay at the top, where the eye already is ([patterns 5.73](../../patterns/05-sizes-devices.md)). The commit stays pinned and is the last region to give way in a short window ([patterns 5.52](../../patterns/05-sizes-devices.md)).
- When the keyboard opens, the layout shrinks above it and the Commit Bar rides on top of the keyboard ([patterns 5.54](../../patterns/05-sizes-devices.md)).
- The primary sits at the trailing end of the Commit Bar on every screen of the run, including the summary, so the screen and the hardware key reinforce each other ([patterns 1.147](../../patterns/01-screen-composition.md)).

## Responsiveness

- **Compact** (below `--breakpoint-medium-min`): the default design, as above, margins `--space-page`. Pinned regions together leave the content the larger share of the height ([patterns 5.51](../../patterns/05-sizes-devices.md)).
- **Medium** (from `--breakpoint-medium-min`, handheld in landscape, small tablet): still one column, capped at a readable width and centred, margins `--grid-margin`. In a short landscape window the header and Connection Status scroll with the content; the Commit Bar stays ([patterns 5.52](../../patterns/05-sizes-devices.md)).
- **Expanded** (from `--breakpoint-expanded-min`, tablet or docked handheld): two panes. The current item and entry (regions 3 to 5) take the larger share; the entries list (region 6, all entries) sits in a trailing pane at about a third of the width ([patterns 1.99](../../patterns/01-screen-composition.md)). The Commit Bar spans only the leading pane, the scope it commits ([patterns 1.22](../../patterns/01-screen-composition.md)).
- **Large** (from `--breakpoint-large-min`): as expanded; extra width stays empty, never stretched fields ([patterns 1.107](../../patterns/01-screen-composition.md)).
- **Touch**: every target is at least `--control-target-min`; gloved products use `--control-target-gloved` on every surface the glove touches ([patterns 6.16](../../patterns/06-accessibility.md), [patterns 6.19](../../patterns/06-accessibility.md), [patterns 5.50](../../patterns/05-sizes-devices.md)). The entry uses size large. Can't complete and the primary are at opposite ends of the bar so one smeared touch can't hit both ([patterns 5.82](../../patterns/05-sizes-devices.md)).
- **Hardware**: the scan trigger scans; the confirming key does exactly what the on-screen primary does, and back does what back does ([patterns 2.77](../../patterns/02-navigation-flow.md), [patterns 3.118](../../patterns/03-controls-interaction.md)). Every key action has its on-screen control ([patterns 6.86](../../patterns/06-accessibility.md)). Where a programmable key has an assigned job, the screen names it ([patterns 3.119](../../patterns/03-controls-interaction.md)).

## Accessibility

- **Landmarks and headings**: the header bar is `header`; the content is `main`; the Commit Bar is a labelled region ("Count actions"). The h1 is the task title. The current item's name is the h2; the summary heading replaces it on Finish.
- **Focus order**: header, instruction and position, current item, entry field, last entry, Commit Bar. On each new item, focus stays on the entry field so the next scan or typed value lands there ([patterns 3.110](../../patterns/03-controls-interaction.md)); it never jumps to the commit. After Undo, focus returns to the entry field. On Finish, focus moves to the summary heading ([patterns 6.33](../../patterns/06-accessibility.md)).
- **Keyboard and keys**: everything works with arrows and Enter alone on devices with keys ([patterns 3.129](../../patterns/03-controls-interaction.md)). The Enter a scanner sends after the data moves on and never submits the run ([patterns 3.112](../../patterns/03-controls-interaction.md)).
- **Names and announcements**: the scan trailing control is named "Scan with camera"; Undo is named for what it undoes ("Undo scan of item name") ([patterns 3.89](../../patterns/03-controls-interaction.md)). Each accepted entry and the new running count ("6 counted, 13 of 40 items") are announced politely, without moving focus ([patterns 6.53](../../patterns/06-accessibility.md), [patterns 6.54](../../patterns/06-accessibility.md)). A rejected scan is announced assertively, and gets its own sound and vibration distinct from a good read ([patterns 3.117](../../patterns/03-controls-interaction.md), [patterns 4.89](../../patterns/04-states-feedback.md)).
- **Never colour alone**: differences in the summary carry a Status Label with icon and words; waiting-to-send entries say so in words ([patterns 4.53](../../patterns/04-states-feedback.md)).
- The field's error placement and the Commit Bar's button order are the components' own; see [Input](../../molecules/input.md) and [Commit Bar](../../molecules/commit-bar.md) Usage.

## Usage

- Use for any run of like items done one at a time with a running count and a clear end. Don't use for a single scan that opens a record (that's the product's normal scan-to-open ([patterns 2.83](../../patterns/02-navigation-flow.md))), or for a few typed items, which loop through a summary instead ([patterns 2.58](../../patterns/02-navigation-flow.md)).
- One primary per screen, and it never moves between screens of the run ([patterns 1.17](../../patterns/01-screen-composition.md), [patterns 1.147](../../patterns/01-screen-composition.md)). Finish is not the primary; it ends the run early or at the end and always shows the summary.
- Each scan or entry is confirmed in place and the screen is immediately ready for the next ([patterns 2.55](../../patterns/02-navigation-flow.md)). Don't add a toast for routine scans; the device's own beep plus the last-entry row are the confirmation ([patterns 4.33](../../patterns/04-states-feedback.md)).
- Repeated reads (RFID, several barcodes per trigger) count up live against what's expected ("18 of 24"), each item once ([patterns 3.116](../../patterns/03-controls-interaction.md)).
- Unfinished runs belong to the person, survive sign-out and restarts, and reopen at the same item ([patterns 2.85](../../patterns/02-navigation-flow.md), [patterns 4.88](../../patterns/04-states-feedback.md)).
- Draft components, whose measurements are placeholders until confirmed in Figma: Commit Bar, List Item, Key Value List, Connection Status, Skeleton, Empty State.

Prototypes using this template: none yet.
