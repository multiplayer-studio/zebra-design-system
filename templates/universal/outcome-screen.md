---
name: Outcome Screen
level: template
status: draft
composes: [../../organisms/dialog.md, ../../organisms/global-header.md, ../../organisms/navigation-bar.md, ../../organisms/navigation-rail.md, ../../organisms/top-app-bar.md, ../../molecules/empty-state.md, ../../molecules/inline-banner.md, ../../molecules/key-value-list.md, ../../molecules/progress-circle.md, ../../molecules/task-list.md, ../../atoms/button.md, ../../atoms/icon.md, ../../atoms/progress-bar.md]
---

# Outcome Screen

> A screen whose content is one outcome rather than data: empty, an error, a confirmation, an interruption, or waiting. One centred block of visual, title, body and at most two actions, inside the product's normal frame.

Use it whenever a whole content area is taken by a state. The shell, and for empty and error any filters and actions, stay where they are; only the content is replaced ([patterns 1.128](../../patterns/01-screen-composition.md), [4.6](../../patterns/04-states-feedback.md)).

## Anatomy
1. **Header and navigation.** The frame of the screen the outcome belongs to: [Top App Bar](../../organisms/top-app-bar.md) and [Navigation Bar](../../organisms/navigation-bar.md) at compact, [Global Header](../../organisms/global-header.md), Rounded off (sharp, full width; [Global Header Usage](../../organisms/global-header.md#usage)) and [Navigation Rail](../../organisms/navigation-rail.md) from medium. Inside a flow (confirmation, interruption, waiting) the flow's own frame is kept and global navigation stays hidden ([patterns 1.40](../../patterns/01-screen-composition.md)).
2. **Kept controls** (empty and error in a collection). The page title, search, filters and create action stay above the outcome block.
3. **Outcome block.** Centred in the content area:
   1. Visual (per variant, below).
   2. Title: names the situation in a few front-loaded words, never just "Error" ([patterns 7.24](../../patterns/07-content-copy.md)).
   3. Body: one or two sentences that don't repeat the title ([patterns 7.25](../../patterns/07-content-copy.md)).
   4. Specifics (optional, per variant).
   5. Actions: at most one [Button](../../atoms/button.md) flavour primary and one flavour outline or text, in the product's button order ([patterns 1.76](../../patterns/01-screen-composition.md)).

### Variants
| Variant | Visual and component | Title and body | Actions | Rules |
|---|---|---|---|---|
| **Empty: first use** | [Empty State](../../molecules/empty-state.md) type First use | what this area is for | the create action, primary ("Add printer") | [4.8](../../patterns/04-states-feedback.md), [7.42](../../patterns/07-content-copy.md) |
| **Empty: no results** | Empty State type No results | names the search or filters that found nothing | Clear filters, outline; search and filters stay visible | [4.7](../../patterns/04-states-feedback.md) |
| **Empty: all done** | Empty State type All done | acknowledges the finished work, positively | the next likely task, if any | [4.9](../../patterns/04-states-feedback.md) |
| **No permission** | Empty State type No permission | what's blocked and who can unblock it | "Request access" where the product supports it; never Retry | [4.10](../../patterns/04-states-feedback.md), [4.36](../../patterns/04-states-feedback.md), [7.40](../../patterns/07-content-copy.md) |
| **Error: can't show** | Empty State type Can't show | whose side the problem is on and what to do | Retry, primary, only when retrying could work | [4.11](../../patterns/04-states-feedback.md), [4.34–4.36](../../patterns/04-states-feedback.md), [1.67](../../patterns/01-screen-composition.md) |
| **Error: service unavailable** | Empty State type Can't show | to try again later, what happened to the person's work, another way to get the job done; when the service returns if known | Retry, primary; the other way, outline | [4.40](../../patterns/04-states-feedback.md) |
| **Confirmation** | [Icon](../../atoms/icon.md) `check_circle` size large, Framed on | the result in the simple past ("Rule created") | the likely next task, primary; "Back to rules", outline | [2.50](../../patterns/02-navigation-flow.md), [7.48–7.49](../../patterns/07-content-copy.md) |
| **Not confirmed yet** | Icon `hourglass` size large, Framed on | what was sent and that the result isn't known yet ("Sent to 40 devices. Waiting for them to report back.") | "View progress", primary | [2.54](../../patterns/02-navigation-flow.md), [4.86](../../patterns/04-states-feedback.md) |
| **Partial result** | Icon `warning` size large, Framed on | leads with what worked, then what didn't, by count | "Retry failed", primary; "View failures", outline | [4.45–4.47](../../patterns/04-states-feedback.md), [7.50](../../patterns/07-content-copy.md) |
| **Interruption** | none; a heading only | one heading stating the unusual answer, short text on why it matters | Continue, primary; "Change answer", outline | [2.51](../../patterns/02-navigation-flow.md) |
| **Waiting: elsewhere** | [Progress Circle](../../molecules/progress-circle.md) size medium, indeterminate | where to go and what to do there ("Confirm on your phone") | "Resend", outline; "Try another way", text | [2.66](../../patterns/02-navigation-flow.md) |
| **Waiting: long operation** | [Progress Bar](../../atoms/progress-bar.md) size large, measured, label naming the work and count ("Updating 3 of 50 devices") | what not to do while it runs; a rough estimate after about ten seconds | Cancel (or Pause), outline-subtle, until the point of no return | [4.13](../../patterns/04-states-feedback.md), [4.18–4.21](../../patterns/04-states-feedback.md), [7.107–7.109](../../patterns/07-content-copy.md) |

**Specifics.**
- Confirmation: a [Key Value List](../../molecules/key-value-list.md) with the reference, what happens next and when, and how to get help ([patterns 2.50](../../patterns/02-navigation-flow.md)).
- Partial result: the failures listed with each reason, as an [Inline Banner](../../molecules/inline-banner.md) status error per group of failures or a link to a filtered list ([patterns 4.45](../../patterns/04-states-feedback.md)). After a bulk action on many objects, use [Batch Result](batch-result.md) instead.
- Waiting, long operation where time isn't reliable: a [Task List](../../molecules/task-list.md) of completed and remaining steps replaces the percentage ([patterns 4.28](../../patterns/04-states-feedback.md)).
- Error after repeated failures: more detail, another way, and how to reach help, inside the flow ([patterns 4.39](../../patterns/04-states-feedback.md)); a support reference on its own line ([patterns 7.35](../../patterns/07-content-copy.md)).

**State changes.** A waiting screen moves on by itself when the step is done ([patterns 2.66](../../patterns/02-navigation-flow.md)). Progress that fails stays on screen and says what went wrong, becoming the error or partial variant in place ([patterns 4.22](../../patterns/04-states-feedback.md)). Cancelling a long operation with consequences asks first in a [Dialog](../../organisms/dialog.md) that says what has already changed ([patterns 4.94](../../patterns/04-states-feedback.md)).

The composed components govern their own colours, states, sizes, radius and focus rings. The template only places them.

## Layout
```
Medium and up                                       Compact
┌───────────────────────────────────────────────┐   ┌──────────────────┐
│ 1 Header                                      │   │ 1 Header         │
├───┬───────────────────────────────────────────┤   ├──────────────────┤
│ 1 │ 2 Title · Search · Filters (empty, error) │   │ 2 Kept controls  │
│   │                                           │   │                  │
│   │              3.1  ( ✓ )                   │   │     3.1 ( ✓ )    │
│   │              3.2  Rule created            │   │  3.2 Rule created│
│   │              3.3  body                    │   │  3.3 body        │
│   │              3.4  Reference  R-2201       │   │  3.4 specifics   │
│   │              3.5  [Back] [Next task]      │   │                  │
│   │                                           │   │ 3.5 [Next task]  │
│   │                                           │   │     [Back]       │
└───┴───────────────────────────────────────────┘   ├──────────────────┤
                                                    │ 1 Navigation bar │
                                                    └──────────────────┘
```
- The outcome block is centred horizontally in the content area and placed in its upper part, so it reads first; its width follows the Empty State's own cap, or `--container-reading` for the other variants.
- Visual to title `--space-lg`; title to body `--space-sm`; body to specifics `--space-lg`; to actions `--space-xl`.
- Kept controls sit above the block at their usual places; the block takes the space the content would have taken.

## Responsiveness
- **Compact** (below `--breakpoint-medium-min`): margins `--space-page`. Actions stack full width, the primary on top ([patterns 1.77](../../patterns/01-screen-composition.md)); in a flow they're pinned to the bottom. Specifics in a Key Value List stack label above value ([patterns 10.39](../../patterns/10-data-display.md)).
- **Medium** (from `--breakpoint-medium-min`): margins `--grid-margin`, [Navigation Rail](../../organisms/navigation-rail.md) Expanded false where the frame has navigation. Actions sit side by side, primary at the trailing end.
- **Expanded** (from `--breakpoint-expanded-min`): as medium. In a pane or panel narrower than medium, the block follows the pane's width, not the window's ([patterns 5.2](../../patterns/05-sizes-devices.md)), and several small empty areas on one screen use text only with a low-emphasis action ([patterns 4.12](../../patterns/04-states-feedback.md)).
- **Large** (from `--breakpoint-large-min`): the rail is Expanded true; the block doesn't grow.
- **Touch.** Size large buttons meet `--control-target-min` ([patterns 6.16](../../patterns/06-accessibility.md)); size medium buttons are below it and extend their hit area to it.

## Accessibility
- **Landmarks and headings.** The frame's `header`, `nav` and `main`. A whole-screen outcome's title is the `h1`; an outcome inside a page or section takes the next heading level below that page's or section's heading.
- **Focus order.** Kept controls, then the outcome block. On a confirmation, interruption or waiting screen reached by navigation, focus goes to its heading ([patterns 6.27](../../patterns/06-accessibility.md)). When an empty or error state replaces content in place, focus stays where it was; if the focused item disappeared, it moves to the outcome's heading ([patterns 6.31](../../patterns/06-accessibility.md)).
- **Keyboard.** Standard; nothing traps focus.
- **Names and announcements.** Empty and no-results states are announced politely with the result count ([patterns 6.53](../../patterns/06-accessibility.md)); errors that block the task assertively ([patterns 6.54](../../patterns/06-accessibility.md)). Waiting progress is announced at start, phase changes and finish, not every tick. The decorative visual is hidden from assistive technology when the title says it all ([patterns 6.49](../../patterns/06-accessibility.md)).
- **Never colour alone.** Every variant has a title in words; confirmation and partial use distinct glyphs, not only colour.

## Usage
- Use one outcome per content area. An outcome about one section stays inside that section; a field problem stays at the field ([patterns 4.34](../../patterns/04-states-feedback.md)).
- Routine success doesn't need this screen: the visible change or a toast is enough ([patterns 4.30–4.31](../../patterns/04-states-feedback.md)). A confirmation is for a flow that commits something significant, and stays valid if revisited ([patterns 2.50](../../patterns/02-navigation-flow.md)). Back from it never shows the form ready to send again ([patterns 2.22](../../patterns/02-navigation-flow.md)).
- An interruption is used rarely, only for an unusual, probably mistaken or irreversible answer, or a conflict with known data ([patterns 2.51](../../patterns/02-navigation-flow.md)).
- Never "Success!", "Are you sure?" or a code as a title ([patterns 7.24](../../patterns/07-content-copy.md), [7.48](../../patterns/07-content-copy.md)).
- Drafts: [Empty State](../../molecules/empty-state.md), [Key Value List](../../molecules/key-value-list.md) and [Task List](../../molecules/task-list.md) are draft; their measurements are placeholders.

Prototypes using this template: none yet.
