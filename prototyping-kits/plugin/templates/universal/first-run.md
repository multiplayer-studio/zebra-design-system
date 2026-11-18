---
name: First Run
level: template
status: draft
composes: [../../organisms/global-header.md, ../../organisms/top-app-bar.md, ../../molecules/empty-state.md, ../../molecules/inline-banner.md, ../../molecules/input.md, ../../molecules/select.md, ../../atoms/button.md, ../../atoms/icon.md, ../../atoms/input-hint.md, ../../atoms/input-label.md, ../../atoms/progress-bar.md, ../../atoms/radio-button.md]
---

# First Run

> The one screen a product may show before its work the first time it opens: only the questions it can't work without, or one permission it can't work without, then straight into the work.

Use it only when the product genuinely can't start without an answer; otherwise the product starts straight into its work with sensible defaults and teaches in context ([patterns 2.70–2.71](../../patterns/02-navigation-flow.md)).

## Anatomy
1. **Header.** [Top App Bar](../../organisms/top-app-bar.md) type centered at compact, title the product's name, no leading control; [Global Header](../../organisms/global-header.md), Rounded off (sharp, full width; [Global Header Usage](../../organisms/global-header.md#usage)) from medium with navigation, search and account regions off. No global navigation: first run is a step people pass through, never the start screen ([patterns 2.20](../../patterns/02-navigation-flow.md)).
2. **Introduction.** A heading naming what's being set up ("Set up Fleet Manager"), and one or two sentences on what's needed and roughly how long it takes ([patterns 2.52](../../patterns/02-navigation-flow.md)).
3. **Setup questions** (one screen if possible) ([patterns 2.71](../../patterns/02-navigation-flow.md)). Each field label, hint, error, input with [Input Label](../../atoms/input-label.md) and [Input Hint](../../atoms/input-hint.md): a [Select](../../molecules/select.md) or [Radio Button](../../atoms/radio-button.md)s for a choice (language, site, units), an [Input](../../molecules/input.md) for a value. Each has a sensible default where one exists ([patterns 2.53](../../patterns/02-navigation-flow.md)). On a managed device, anything the administrator configured isn't asked ([patterns 2.72](../../patterns/02-navigation-flow.md)).
4. **Permission explanation** (variant, only for a permission the core job can't work without). A leading [Icon](../../atoms/icon.md) size large, Framed on, for the capability (`scanner`, `map`), a heading saying what the permission is for, and one sentence on what the product does with it. The system's own prompt follows the primary button ([patterns 4.61](../../patterns/04-states-feedback.md)). Every other permission is asked when its feature is first used, not here.
5. **Primary action.** [Button](../../atoms/button.md) flavour primary, size large, naming what happens next ("Start", "Allow camera"). A [Button](../../atoms/button.md) flavour text "Skip for now" beside it where the questions have defaults ([patterns 2.70](../../patterns/02-navigation-flow.md)).
6. **Progress** (only if setup applies something that takes time). [Progress Bar](../../atoms/progress-bar.md) size large with a label naming the work, in place of the questions ([patterns 4.18–4.20](../../patterns/04-states-feedback.md)).

**States.**
- Permission denied: the product still opens. The feature that needs the permission shows, where its result would be, an [Empty State](../../molecules/empty-state.md) type Can't show saying which feature is unavailable and how to enable it, without nagging ([patterns 4.62](../../patterns/04-states-feedback.md)).
- Setup failed: [Inline Banner](../../molecules/inline-banner.md) status error above the introduction, with what to do and entries kept ([patterns 6.78](../../patterns/06-accessibility.md)).
- Done: the product opens on its start screen. First run is taken out of history, so Back never returns to it, and it never shows again ([patterns 2.16](../../patterns/02-navigation-flow.md), [2.70](../../patterns/02-navigation-flow.md)).

The composed components govern their own colours, states, sizes, radius and focus rings. The template only places them.

## Layout
```
Compact                         Expanded and large
┌──────────────────┐            ┌──────────────────────────────────────────┐
│ 1 Product name   │            │ 1 Header (brand only)                    │
├──────────────────┤            ├──────────────────────────────────────────┤
│ 2 Set up …       │            │        2 Set up Fleet Manager            │
│   what and how   │            │          what's needed, about 1 minute   │
│   long           │            │        3 Site                            │
│ 3 Site           │            │          [Store 214            ▾]        │
│   [Store 214 ▾]  │            │          Units                           │
│   Units          │            │          ◉ Metric  ○ Imperial            │
│   ◉ Metric       │            │        5 [Start]  Skip for now           │
│   ○ Imperial     │            │                                          │
├──────────────────┤            │                                          │
│ 5 [Start]        │            │                                          │
│   Skip for now   │            │                                          │
└──────────────────┘            └──────────────────────────────────────────┘
```
- One column capped at `--container-reading` and centred ([patterns 5.11](../../patterns/05-sizes-devices.md)).
- Introduction to questions `--space-section`; fields `--space-lg` apart; questions to actions `--space-xl`.
- The column scrolls when text size or a short window needs it; the actions are pinned at compact.

## Responsiveness
- **Compact** (below `--breakpoint-medium-min`): margins `--space-page`. Actions pinned to the bottom, full width, stacked with the primary on top ([patterns 1.77](../../patterns/01-screen-composition.md)), riding on the keyboard when it opens ([patterns 5.54](../../patterns/05-sizes-devices.md)).
- **Medium** (from `--breakpoint-medium-min`): margins `--grid-margin`; actions sit after the last question, primary at the trailing end of the group.
- **Expanded** (from `--breakpoint-expanded-min`) and **Large** (from `--breakpoint-large-min`): as medium, the column centred; extra width stays empty.
- **Touch.** Size large buttons meet `--control-target-min` ([patterns 6.16](../../patterns/06-accessibility.md)); size medium fields are below it and extend their hit area to it.

## Accessibility
- **Landmarks and headings.** `header` and `main`. The introduction's heading is the `h1`; a screen with a single question uses the question as heading and label ([patterns 6.51](../../patterns/06-accessibility.md)).
- **Focus order.** On arrival, focus goes to the heading so the introduction is read first; then the questions, then the actions.
- **Keyboard.** Standard; radio groups are one stop with arrows.
- **Names and announcements.** Buttons are named by their visible labels. Progress, if shown, is announced at start, phase changes and finish.
- **Never colour alone.** Errors have icon and words.

## Usage
- Most products need no first run. Ask only what the product can't work without; everything else uses defaults and is changed later in [Settings](settings.md).
- Never a tour. AI features and other capabilities are introduced when they first matter ([patterns 9.5](../../patterns/09-ai.md)).
- On a device poor at entering data (wearable, vehicle mount, kiosk), sign-up and lengthy entry are offered on another device ([patterns 2.67](../../patterns/02-navigation-flow.md)).
- Long onboarding that spans sessions is a [Task List Page](task-list-page.md), not a first run. A rare, ordered setup task is a [Wizard](wizard.md); on a shared device, sign-in comes first ([Sign In Shared Device](sign-in-shared-device.md)).
- Drafts: [Empty State](../../molecules/empty-state.md), [Input Label](../../atoms/input-label.md) and [Input Hint](../../atoms/input-hint.md) are draft; their measurements are placeholders.

Prototypes using this template: none yet.
