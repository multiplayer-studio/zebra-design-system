---
name: Task List Page
level: template
status: draft
composes: [../../organisms/global-header.md, ../../organisms/navigation-bar.md, ../../organisms/navigation-rail.md, ../../organisms/top-app-bar.md, ../../molecules/breadcrumb.md, ../../molecules/inline-banner.md, ../../molecules/task-list.md, ../../atoms/button.md, ../../atoms/progress-bar.md, ../../atoms/skeleton.md]
---

# Task List Page

> Long work done across several sessions: what the job is, how far it has got, and a list of tasks named with verbs, each with its status, done in any order where possible.

Use it for onboarding a site, commissioning a fleet, completing a tenant's setup, or any job too long for one sitting ([patterns 2.36](../../patterns/02-navigation-flow.md)).

## Anatomy
1. **Header.** [Top App Bar](../../organisms/top-app-bar.md) at compact (back as its leading control when the page sits below the top level); [Global Header](../../organisms/global-header.md), Rounded off (sharp, full width; [Global Header Usage](../../organisms/global-header.md#usage)) from medium.
2. **Global navigation.** [Navigation Bar](../../organisms/navigation-bar.md) at compact, [Navigation Rail](../../organisms/navigation-rail.md) from medium. A product whose one job this is may have none, keeping settings, help and sign-out in the header ([patterns 2.6](../../patterns/02-navigation-flow.md)).
3. **Breadcrumb** (expanded and up, when the page sits below the top level). [Breadcrumb](../../molecules/breadcrumb.md).
4. **Introduction.** The page title names the job and the object ("Set up Store 214"). Under it, one or two sentences on what the job does, what it needs and roughly how long it takes ([patterns 2.52](../../patterns/02-navigation-flow.md)).
5. **Progress summary.** The Task List's own summary, Show Summary on ("3 of 7 tasks done"), with a [Progress Bar](../../atoms/progress-bar.md) size small, Show Label on, measuring the same count ([patterns 4.20](../../patterns/04-states-feedback.md)).
6. **Notice** (optional). [Inline Banner](../../molecules/inline-banner.md) when something blocks the job as a whole, such as a failed task others depend on, with its one action ([patterns 1.60–1.61](../../patterns/01-screen-composition.md)).
7. **Task list.** [Task List](../../molecules/task-list.md), Variant checklist, optionally in groups with headings ("Before you start", "Devices", "Go live"). Each row is a verb phrase ("Add store details", "Pair printers") and, once it has one, a status from the Task List's set: waiting (cannot start yet), running, needs approval, failed, retried or done. A task that can start but hasn't has no status; its verb reads as the thing to do. Rows that can be started are links to their task; rows that can't start yet aren't links and say what they wait for ([patterns 2.36](../../patterns/02-navigation-flow.md)). Done is shown quietly so unfinished tasks stand out. A failed task shows the Task List's failed status (the `error` glyph and "Failed: " with its reason) and Retry on its row.
8. **Finish** (only when every required task is done). A [Button](../../atoms/button.md) flavour primary naming the end of the job ("Go live") after the list. Before then there is no primary; each task is its own way forward.

**States.**
- Loading: [Skeleton](../../atoms/skeleton.md) rows in the task list's layout; the introduction shows at once.
- Returning: the list shows at the start and on every return ([patterns 2.36](../../patterns/02-navigation-flow.md)); a task finished while away is marked done, and anything needing attention is flagged on its row ([patterns 2.60](../../patterns/02-navigation-flow.md)).
- Task finished: completing a task returns here with that row marked done and focus on it.

The composed components govern their own colours, states, sizes, radius and focus rings. The template only places them.

## Layout
```
Expanded and large                                Compact
┌────────────────────────────────────────────┐    ┌──────────────────┐
│ 1 Header                                   │    │ 1 Header         │
├───┬────────────────────────────────────────┤    ├──────────────────┤
│ 2 │ 3 Breadcrumb                           │    │ 4 Title          │
│   │ 4 Set up Store 214                     │    │   intro          │
│   │   What it does, needs, how long        │    │ 5 3 of 7 ▬▬▬▭▭   │
│   │ 5 3 of 7 tasks done  ▬▬▬▬▭▭▭           │    │ 6 Notice         │
│   │ 6 Notice (optional)                    │    │ 7 Group          │
│   │ 7 Before you start                     │    │   Add details  ✓ │
│   │   Add store details            Done    │    │   Pair printers  │
│   │   Pair printers                        │    │   …              │
│   │ 7 Go live                              │    │ 8 [Go live]      │
│   │   Test a print     Waiting for printers│    ├──────────────────┤
│   │ 8 [Go live]                ← capped →  │    │ 2 Navigation bar │
└───┴────────────────────────────────────────┘    └──────────────────┘
```
- One column capped at `--container-reading`, aligned to the leading edge ([patterns 1.107](../../patterns/01-screen-composition.md)).
- Introduction, progress and notice stack `--space-lg` apart; the list starts `--space-section` below them; groups sit `--space-xl` apart.
- The page scrolls as one; nothing is pinned except the shell.

## Responsiveness
- **Compact** (below `--breakpoint-medium-min`): margins `--space-page`, [Navigation Bar](../../organisms/navigation-bar.md) at the bottom when the product has global navigation. Status words wrap under the task name rather than truncating ([patterns 5.29](../../patterns/05-sizes-devices.md)). Each task opens as its own screen with back to this page.
- **Medium** (from `--breakpoint-medium-min`): margins `--grid-margin`, [Navigation Rail](../../organisms/navigation-rail.md) Expanded false. Status sits at each row's trailing end.
- **Expanded** (from `--breakpoint-expanded-min`): breadcrumb shown; the page stays capped.
- **Large** (from `--breakpoint-large-min`): the rail is Expanded true; extra width stays empty.
- **Touch.** Each task row is at least `--control-target-min` tall and is a single target ([patterns 6.16](../../patterns/06-accessibility.md)). A row's small Retry or Approve [Button](../../atoms/button.md) is drawn below it and extends its hit area to `--control-target-min`.

## Accessibility
- **Landmarks and headings.** `header`, `nav`, `main`. The job's title is the `h1`; group headings are `h2`. The list is a list.
- **Focus order.** Introduction, progress, notice, tasks in order, Finish. On return from a task, focus goes to that task's row.
- **Keyboard.** Tab moves between tasks that are links; tasks that can't start yet are text, not stops. Enter opens a task.
- **Names and announcements.** Each task link's name includes its status ("Add store details, done"). Progress changes are announced politely when the page regains focus after a task.
- **Never colour alone.** Every status has its word; failed has the error glyph as well; done is quieter by weight and has the done glyph.

## Usage
- Use it when the job spans sessions or people. A short task done in one sitting whose steps must run in order is a [Wizard](wizard.md); a single object's form is a [Form Page](form-page.md).
- Tasks are verbs, done in any order where possible. Tasks that depend on others say what they wait for.
- Agent work with a plan and approvals uses the same [Task List](../../molecules/task-list.md) inside [AI Assistant](ai-assistant.md) ([patterns 9.37–9.38](../../patterns/09-ai.md)).
- Drafts: [Task List](../../molecules/task-list.md) and [Skeleton](../../atoms/skeleton.md) are draft; their measurements are placeholders.

Prototypes using this template: none yet.
