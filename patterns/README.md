# Patterns

Binding UX rules for every Zebra product: how screens are composed, how people move and act, what each state does, how layouts change with size, what the product says, and how AI and data behave. They have the same authority as [DESIGN.md](../DESIGN.md). DESIGN.md holds the values and the token rules; the patterns hold behaviour and judgement. Component docs and templates apply both.

## Files

| File | Subject |
|---|---|
| [01-screen-composition.md](01-screen-composition.md) | Where each part of a screen goes: shell, messages, actions, finding, content, overlays, flows, forms |
| [02-navigation-flow.md](02-navigation-flow.md) | Structure, navigation, back and close, deep links, wizards, task loops, sign-in |
| [03-controls-interaction.md](03-controls-interaction.md) | How each control responds: buttons, choices, text entry, menus, gestures, scanning, motion |
| [04-states-feedback.md](04-states-feedback.md) | Loading, empty, error, success, offline, sync, permissions, sessions, device states, severity |
| [05-sizes-devices.md](05-sizes-devices.md) | Size classes, grids, overflow, translation, density, pinned regions, form factors |
| [06-accessibility.md](06-accessibility.md) | The floors: contrast, targets, focus, names, announcements, reflow, motion, time limits |
| [07-content-copy.md](07-content-copy.md) | Voice, labels, errors, terms, numbers and dates, translation |
| [08-visual-theming.md](08-visual-theming.md) | Device drawings, imagery and illustration, brand, re-theming, urgent and device colour, true content and scripts. Colour, type, shape, elevation and motion rules live in [DESIGN.md](../DESIGN.md) §2–§6; icon rules in [Icon](../atoms/icon.md). |
| [09-ai.md](09-ai.md) | Where AI is offered, suggestions, marking, confidence, acting for someone, failures |
| [10-data-display.md](10-data-display.md) | Tables, lists, key–value records, status in data, charts, live data, maps |

## Citing a rule

Rules are numbered `file.rule`, and the numbers are stable. Cite a rule as `patterns 6.11`, linked to its file: `([patterns 6.11](patterns/06-accessibility.md))` from a root doc, `../patterns/...` from a component doc, `../../patterns/...` from a template. Rules aren't headings, so link to the file. Where a doc must restate a rule, it states it briefly and links to it.

## Precedence

- Accessibility minimums come first.
- A more specific rule wins over a general one.
- Where two files disagree, the one whose subject it is wins (the table above says which subject each file owns).
- DESIGN.md owns tokens and the visual rules moved from 08 (§2–§6); the pattern files own behaviour.

A rule or sentence that starts "By default" is a default a project may override. Defaults in 06 may only be made stricter. Every other rule is strict. A project that overrides a default records it, with its reason, in its `CHANGES.md`, so the sprint reconcile sees it ([DESIGN.md §9](../DESIGN.md)).

## Which files to read

| Task | Read |
|---|---|
| Any screen layout | 01, 05 |
| Navigation, flows, wizards, sign-in | 02, then 01 |
| A form | 03, 04, 07, 06, and 01 §8 |
| Status, errors, loading, empty, offline | 04, then 07 |
| Choosing or wiring a control | 03, 06 |
| Copy and labels | 07 |
| AI features | 09, 01 §0 (The AI composer) and §11, 07 §14 |
| Overlays: dialogs, sheets, side panels | 01 §6, 02 §3, 05 §3 |
| Icons, imagery, re-theming a product | [Icon](../atoms/icon.md), 08 |
| Tables, lists, records, charts, maps | 10, 05 |
| Field devices, scanning, hardware keys | 03 §16, 05 §10, 01 §10 |
| Colour, type, theming | [DESIGN.md](../DESIGN.md), 08 |
| Anything | 06 is the floor under all of it |

## Terms

Where a pattern word and a Zebra component name differ, read them as follows.

| Pattern word | Zebra |
|---|---|
| tag | [Label](../atoms/label.md). Zebra's [Tag](../atoms/tag.md) is a pointer callout, not a category tag. |
| badge | [Notification Indicator](../atoms/notification-indicator.md) |
| button group | A set of action buttons in any layout, not [Button Group](../molecules/button-group.md) (one bordered row of peer actions). |
| toast | [Snackbar](../molecules/snackbar.md) |
| notice | [Inline Banner](../molecules/inline-banner.md) |
| information (severity) | the `info` severity |
| critical (banner) | [System Banner](../molecules/system-banner.md) error |
| composer | [Message Input](../molecules/message-input.md) |
| AI mark | [AI Mark](../atoms/ai-mark.md) |
| side panel | [Right Drawer Panel](../organisms/right-drawer-panel.md) |
| bottom bar | [Navigation Bar](../organisms/navigation-bar.md) |
| system banner | [System Banner](../molecules/system-banner.md) |
| tooltip | [Tooltip](../atoms/tooltip.md), as a name tooltip or a description tooltip (7.100) |
| compact, medium, expanded, large | Size classes, from the `--breakpoint-medium-min`, `--breakpoint-expanded-min` and `--breakpoint-large-min` tokens. Compact is below `--breakpoint-medium-min`. |
| compact (other uses) | "Compact" also names a density (5.45–5.50) and some component sizes or variants. Say which each time. |
| touch, pointer, gloved targets | `--control-target-min`, `--control-target-pointer-min`, `--control-target-gloved` (6.16, 6.18, 6.19) |
