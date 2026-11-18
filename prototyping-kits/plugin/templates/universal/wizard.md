---
name: Wizard
level: template
status: draft
composes: [../../organisms/dialog.md, ../../organisms/global-header.md, ../../organisms/screen-header-bar.md, ../../organisms/stepper.md, ../../molecules/combobox.md, ../../molecules/commit-bar.md, ../../molecules/inline-banner.md, ../../molecules/input.md, ../../molecules/key-value-list.md, ../../molecules/select.md, ../../atoms/button.md, ../../atoms/checkbox.md, ../../atoms/input-hint.md, ../../atoms/input-label.md, ../../atoms/progress-bar.md, ../../atoms/radio-button.md]
---

# Wizard

> Create or set up something rare in a fixed order of steps: a step list, one step's questions at a time, a review that mirrors the steps, and a footer that never moves.

Use it for "Set up a printer", "Create a deployment rule", "Enrol a device": short tasks done rarely whose steps must happen in order ([patterns 2.35](../../patterns/02-navigation-flow.md)).

## Anatomy
1. **Header.** At compact, [Screen Header Bar](../../organisms/screen-header-bar.md) with its leading icon off and the Action Slot empty; the wizard's way out is Cancel in the footer. From medium, [Global Header](../../organisms/global-header.md), Rounded off (sharp, full width; [Global Header Usage](../../organisms/global-header.md#usage)). The wizard is a full-screen task, so global navigation is hidden ([patterns 2.10](../../patterns/02-navigation-flow.md)).
2. **Wizard title.** Names the task and the object ("Set up ZT411-10022") and stays the same on every step ([patterns 2.37](../../patterns/02-navigation-flow.md)).
3. **Step list.** [Stepper](../../organisms/stepper.md). From expanded, the vertical stepper (Card off) at the leading side; at compact and medium, the horizontal stepper size compact, showing "Step 2 of 5" and the step name ([patterns 1.120](../../patterns/01-screen-composition.md)). Steps show complete, active and default; completed steps can be revisited; upcoming steps can't be jumped to while creating, though any step opens when editing something that exists ([patterns 2.38](../../patterns/02-navigation-flow.md)). Where later steps depend on answers, the stepper shows the count only ("Step 3") rather than a fixed total. Optional steps say so in their subtitle.
4. **Step content.**
   1. Step heading: the step's title, or the question itself on a step that asks one ([patterns 7.26](../../patterns/07-content-copy.md)).
   2. Error summary (after Next finds problems): [Inline Banner](../../molecules/inline-banner.md) status error above the heading, as in [Form Page](form-page.md).
   3. Fields: as [Form Page](form-page.md), each field label, hint, error, input, using [Input](../../molecules/input.md), [Select](../../molecules/select.md), [Combobox](../../molecules/combobox.md), [Radio Button](../../atoms/radio-button.md)s and [Checkbox](../../atoms/checkbox.md)es with [Input Label](../../atoms/input-label.md) and [Input Hint](../../atoms/input-hint.md). A choice with consequences shows each option with a short description ([patterns 1.122](../../patterns/01-screen-composition.md)). Anything given earlier is filled in or offered, never asked again ([patterns 2.39](../../patterns/02-navigation-flow.md)).
   4. Operation progress (on a step that waits on a device): [Progress Bar](../../atoms/progress-bar.md) size large, with its label naming the work, inside the step ([patterns 2.43](../../patterns/02-navigation-flow.md)).
5. **Review step.** A [Key Value List](../../molecules/key-value-list.md) per step, in the same order and layout the answers were entered, each with its step's title as heading and a [Button](../../atoms/button.md) flavour text "Change" at its trailing end ([patterns 1.29](../../patterns/01-screen-composition.md), [2.44](../../patterns/02-navigation-flow.md)). Steps that already acted on a device are marked as applied.
6. **Footer.** [Commit Bar](../../molecules/commit-bar.md) pinned to the bottom of the content, the same on every step ([patterns 1.121](../../patterns/01-screen-composition.md)): Cancel ([Button](../../atoms/button.md) flavour outline-subtle), Back (flavour outline, from step two), then Next (flavour primary), at the trailing end ([patterns 1.76](../../patterns/01-screen-composition.md)). On the step before the review, Next reads "Review"; on the review it names the finishing action ("Create rule") ([patterns 2.41](../../patterns/02-navigation-flow.md)).
7. **Dialogs** (when needed). [Dialog](../../organisms/dialog.md) Actions 2 for leaving with entries ("Discard setup?", "Keep editing" and "Discard") ([patterns 2.46](../../patterns/02-navigation-flow.md)); for changing an earlier answer that later steps depend on ([patterns 2.42](../../patterns/02-navigation-flow.md)); and on opening a task that has a draft, to continue or start again ([patterns 2.45](../../patterns/02-navigation-flow.md)).

**States.**
- Next checks only the current step; the finishing action checks everything ([patterns 2.40](../../patterns/02-navigation-flow.md)). Next stays enabled and validates on press ([patterns 4.43](../../patterns/04-states-feedback.md)).
- While a device step runs, Next is unavailable with its reason beside it; Back and Cancel say what happens to the operation ([patterns 2.43](../../patterns/02-navigation-flow.md)). During an operation that can't be interrupted, system back explains rather than leaving ([patterns 2.27](../../patterns/02-navigation-flow.md)).
- Finishing returns to the screen that started the wizard with the result visible, or ends on an [Outcome Screen](outcome-screen.md) confirmation ([patterns 2.47](../../patterns/02-navigation-flow.md)).

The composed components govern their own colours, states, sizes, radius and focus rings. The template only places them.

## Layout
```
Expanded and large                                  Compact
┌──────────────────────────────────────────────┐    ┌──────────────────┐
│ 1 Header                                     │    │ 1 Header         │
├──────────────────────────────────────────────┤    ├──────────────────┤
│ 2 Set up ZT411-10022                         │    │ 3 Step 2 of 5    │
├─────────────┬────────────────────────────────┤    │   ▬▬▬▬▭▭▭        │
│ 3 ✓ Connect │ 4.1 Choose a network           │    │ 4.1 Heading      │
│   ● Network │ 4.3 Label / Hint / [Input  ]   │    │ 4.3 Fields       │
│   ○ Media   │     Label / [Select ▾]         │    │                  │
│   ○ Review  │                                │    │                  │
├─────────────┴────────────────────────────────┤    ├──────────────────┤
│ 6                     [Cancel] [Back] [Next] │    │ 6 Footer         │
└──────────────────────────────────────────────┘    └──────────────────┘
```
- The wizard title spans the content. The step list takes a narrow leading column; step content sits beside it, capped at `--container-reading` ([patterns 5.11](../../patterns/05-sizes-devices.md)).
- Fields sit `--space-lg` apart, groups `--space-xl`. The step heading sits `--space-xl` above the first field.
- Step content scrolls; the title, step list and footer stay put. Help sits beside the step, never over it ([patterns 2.39](../../patterns/02-navigation-flow.md)).

## Responsiveness
- **Compact** (below `--breakpoint-medium-min`): full screen, margins `--space-page`. The stepper is size compact above the step content. The footer's three buttons stay on one line where they fit; if not, the footer stacks at once, Next on top, then Back, then Cancel ([patterns 1.77](../../patterns/01-screen-composition.md)). The footer rides on the keyboard ([patterns 5.54](../../patterns/05-sizes-devices.md)).
- **Medium** (from `--breakpoint-medium-min`): as compact, margins `--grid-margin`, content capped.
- **Expanded** (from `--breakpoint-expanded-min`): the vertical stepper moves to the leading side.
- **Large** (from `--breakpoint-large-min`): as expanded; extra width stays empty.
- A wizard in an overlay is kept for short tasks tied to the screen behind it ([patterns 2.48](../../patterns/02-navigation-flow.md)); its overlay becomes full screen at compact ([patterns 5.17](../../patterns/05-sizes-devices.md)).
- **Touch.** Footer buttons at size medium are below `--control-target-min` and extend their hit area to it ([patterns 6.16](../../patterns/06-accessibility.md)). Completed steps in the stepper are targets of at least `--control-target-min`.

## Accessibility
- **Landmarks and headings.** `header`, `main` holding the step list as `nav` labelled "Steps", the step content, and the footer. The wizard title is the `h1`; the step heading is `h2`. The page title announces the step ("Network, step 2 of 5, Set up ZT411-10022").
- **Focus order.** Step list, step content, footer. When a step changes, focus moves to the start of the new step, including when reached from Change on the review ([patterns 2.40](../../patterns/02-navigation-flow.md), [6.33](../../patterns/06-accessibility.md)).
- **Keyboard.** The step list is one stop with arrow keys between steps that can be opened. Enter in a field doesn't advance the step.
- **Names and announcements.** The current step is marked current; complete and upcoming steps say so. Device progress is announced at start and finish and at phase changes, not every tick. Next's unavailable reason is announced and Next stays focusable ([patterns 6.34](../../patterns/06-accessibility.md)).
- **Never colour alone.** Step status uses the stepper's glyphs (check for complete, error glyph for error) and words.
- See [Stepper](../../organisms/stepper.md) Usage for its own rules.

## Usage
- Use a wizard only for a short, rare, ordered task. Long work across sessions uses a [Task List Page](task-list-page.md); frequent tasks use a [Form Page](form-page.md) with earlier answers as defaults ([patterns 2.35–2.36](../../patterns/02-navigation-flow.md)).
- A product's own start-up questions are a [First Run](first-run.md); on a shared device, sign-in is [Sign In Shared Device](sign-in-shared-device.md).
- Only steps that apply are shown ([patterns 2.38](../../patterns/02-navigation-flow.md)).
- The wizard keeps a draft as it goes; secrets are never kept in a draft ([patterns 2.45](../../patterns/02-navigation-flow.md)).
- Cancel returns to the screen that started the wizard and asks only if something was entered ([patterns 2.46](../../patterns/02-navigation-flow.md)).
- Drafts: [Combobox](../../molecules/combobox.md), [Key Value List](../../molecules/key-value-list.md), [Commit Bar](../../molecules/commit-bar.md), [Input Label](../../atoms/input-label.md) and [Input Hint](../../atoms/input-hint.md) are draft; their measurements are placeholders.

Prototypes using this template: none yet.
