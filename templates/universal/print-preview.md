---
name: Print Preview
level: template
status: draft
composes: [../../organisms/global-header.md, ../../organisms/navigation-rail.md, ../../organisms/screen-header-bar.md, ../../molecules/commit-bar.md, ../../molecules/inline-banner.md, ../../molecules/list-item.md, ../../molecules/segmented-control.md, ../../molecules/select.md, ../../molecules/stepper-input.md, ../../atoms/icon-button.md, ../../atoms/meter.md, ../../atoms/progress-bar.md, ../../atoms/skeleton.md, ../../atoms/status-label.md]
---

# Print Preview

> A screen whose job is printing: a true-proportion preview of the output as its focal element, the settings beside it updating the preview in place, the printer's status, and a Print commit that states what will print where.

It embodies the printing screen type ([patterns 1.141](../../patterns/01-screen-composition.md)), true proportions for labels and codes ([patterns 5.74](../../patterns/05-sizes-devices.md)), and the print job's own status ([patterns 4.90](../../patterns/04-states-feedback.md)). Used for printing labels, tags, receipts, test and configuration labels, and any document sent to a Zebra printer.

## Anatomy

1. **Header**: at compact, [Screen Header Bar](../../organisms/screen-header-bar.md), leading icon on, Title naming the job ("Print shelf labels"), Action Slot empty. From medium up, the product's shell ([Global Header](../../organisms/global-header.md), Rounded off (sharp, full width; [Global Header Usage](../../organisms/global-header.md#usage)), [Navigation Rail](../../organisms/navigation-rail.md)) with the same title as the page h1.
2. **Preview** (focal) ([patterns 1.2](../../patterns/01-screen-composition.md), [patterns 1.141](../../patterns/01-screen-composition.md)): the output drawn at its physical proportions and orientation, never stretched, cropped or mirrored, and never smaller than it can be scanned ([patterns 5.74](../../patterns/05-sizes-devices.md)). **The preview surface is not a design-system component**: prototypes treat it as a placeholder region holding a rendered image of the output. Beneath it, a row of [Icon Button](../../atoms/icon-button.md)s flavour subtle, size medium: `zoom_out`, `zoom_in`, and for several labels `chevron_left` and `chevron_right` around "Label 2 of 12".
3. **Printer**: a [List Item](../../molecules/list-item.md), Lines two, Action open, Leading icon `printer`, label the printer's name, supporting text its location, Trailing status. Connection and condition show separately, each as a [Status Label](../../atoms/status-label.md) with leading icon ([patterns 4.70](../../patterns/04-states-feedback.md)); the normal state is plain text ([patterns 10.41](../../patterns/10-data-display.md)). Opening it changes the printer (see [Device Discovery](device-discovery.md)).
4. **Printer condition** (only when it needs attention): an [Inline Banner](../../molecules/inline-banner.md) appearance subtle, status warning (or error when it can't print), title naming the physical cause and description its fix ("Media out. Load labels and close the cover.") ([patterns 4.71](../../patterns/04-states-feedback.md)). It clears by itself when the printer reports the fix ([patterns 4.91](../../patterns/04-states-feedback.md)). Consumables show as a [Meter](../../atoms/meter.md), Direction low is bad, where the printer reports them ([patterns 10.85](../../patterns/10-data-display.md), [patterns 10.104](../../patterns/10-data-display.md)).
5. **Settings**: in order of use, each changing the preview in place ([patterns 1.141](../../patterns/01-screen-composition.md)): [Stepper Input](../../molecules/stepper-input.md) size medium, label "Copies"; [Select](../../molecules/select.md)s for template, media size and darkness; a [Segmented Control](../../molecules/segmented-control.md) flavour text only for orientation where the output allows it. Fields follow label, hint, error, input ([patterns 1.124](../../patterns/01-screen-composition.md)).
6. **Commit**: a [Commit Bar](../../molecules/commit-bar.md), Scope page (pane at expanded), Show Scope on, Scope text stating what and where ("12 labels on Dock 2 printer") ([patterns 1.140](../../patterns/01-screen-composition.md)), Cancel, Primary label "Print".
7. **Job status** (after Print): the Commit Bar's scope statement is replaced by the job's own status, a [Status Label](../../atoms/status-label.md) (Queued, Printing, Held, Failed, Done) and a [Progress Bar](../../atoms/progress-bar.md) size small, Label "Printing 4 of 12" ([patterns 4.20](../../patterns/04-states-feedback.md), [patterns 4.90](../../patterns/04-states-feedback.md)). "Sent" is never shown as printed. A held job says its physical cause and resumes once it clears.

States:
- **Preview loading**: a [Skeleton](../../atoms/skeleton.md) type block at the output's proportions.
- **Printer offline or busy**: Print is unavailable with the reason beside it, or the job is queued and marked waiting where it can wait ([patterns 4.72](../../patterns/04-states-feedback.md), [patterns 4.73](../../patterns/04-states-feedback.md)).
- **Print failed**: the failure stays on screen in the job status, says what went wrong, and offers Retry ([patterns 4.22](../../patterns/04-states-feedback.md)).

The composed components govern their own colours, states, sizes, radius and focus rings. The template only places them.

## Layout

```
Compact                               Expanded
┌──────────────────────────────┐      ┌───────────────────────────────┬───────────────┐
│1 ‹ Print shelf labels        │      │ 2                             │ 3 Printer     │
├──────────────────────────────┤      │    ┌───────────────────┐      │ 4 (condition) │
│2   ┌──────────────────┐      │      │    │                   │      │ 5 Copies [-1+]│
│    │   label preview  │      │      │    │   label preview   │      │   Template ▾  │
│    └──────────────────┘      │      │    │                   │      │   Media    ▾  │
│    (−)(+)  ‹ 2 of 12 ›       │      │    └───────────────────┘      │   Darkness ▾  │
│3 ▮ Dock 2 printer   Online   │      │      (−)(+)  ‹ 2 of 12 ›      │               │
│4 (condition, when needed)    │      │                               │               │
│5 Copies   [−  1  +]          │      ├───────────────────────────────┴───────────────┤
│  Template ▾  Media ▾         │      │6 12 labels on Dock 2 printer  [Cancel] [Print]│
├──────────────────────────────┤      └───────────────────────────────────────────────┘
│6 12 labels…  [Cancel] [Print]│
└──────────────────────────────┘
```

- The preview takes the larger share; the settings panel sits on the trailing side at about a third of the width ([patterns 1.30](../../patterns/01-screen-composition.md), [patterns 1.99](../../patterns/01-screen-composition.md)). The preview centres its output in its region with at least `--space-xl` clear around it.
- The settings panel scrolls on its own; the preview stays in view while settings change. Settings fields sit `--space-lg` apart, groups `--space-xl` apart.
- The Commit Bar spans the scope it commits: the whole page at compact, both panes at expanded because Print commits the preview and the settings together ([patterns 1.22](../../patterns/01-screen-composition.md)).

## Responsiveness

- **Compact** (below `--breakpoint-medium-min`): one column, margins `--space-page`: preview, then printer, condition and settings, with the Commit Bar pinned. The preview keeps its proportions and shrinks to the width, never below scannable size; if it can't fit, it shows at scannable size inside its own scroll area and says it's zoomed ([patterns 5.74](../../patterns/05-sizes-devices.md)). When the keyboard opens for Copies, the preview scrolls away and the Commit Bar rides above the keyboard ([patterns 5.54](../../patterns/05-sizes-devices.md)).
- **Medium** (from `--breakpoint-medium-min`): margins `--grid-margin`. Still one column, the preview capped and centred, the settings below in a capped reading width.
- **Expanded** (from `--breakpoint-expanded-min`): the two panes above, rail navigation.
- **Large** (from `--breakpoint-large-min`): as expanded; the preview never grows past true size at a comfortable zoom, and the extra width is space around it.
- **Touch**: every target meets `--control-target-min` ([patterns 6.16](../../patterns/06-accessibility.md)); the zoom and page Icon Buttons at size medium get a hit area of `--control-target-min`.

## Accessibility

- **Landmarks and headings**: header, then `main` holding the preview (a labelled region, "Preview") and the settings (a labelled region, "Print settings"). One h1, the job title; "Printer" and "Settings" are h2.
- **Focus order**: preview controls, printer, condition, settings, Commit Bar. Changing a setting keeps focus on it ([patterns 6.33](../../patterns/06-accessibility.md)).
- **Names and announcements**: the preview image has a text alternative describing the output ("Shelf label, 50 by 25 mm, barcode 0041288, price 3.99"), and it updates when settings change. Icon buttons are named "Zoom out", "Zoom in", "Previous label", "Next label". Job status changes are announced politely; failures and holds assertively ([patterns 6.54](../../patterns/06-accessibility.md)). Units are in the labels and the values ([patterns 3.45](../../patterns/03-controls-interaction.md)).
- **Never colour alone**: printer and job statuses are words with icons; the Meter states its threshold in words ([patterns 10.85](../../patterns/10-data-display.md)).

## Usage

- Use when the screen's job is printing. Where printing is one action among many on a record, keep it as an action that opens this screen or a short sheet.
- The preview is the focal element; settings are secondary and sit beside it, never over it ([patterns 1.141](../../patterns/01-screen-composition.md)).
- Don't declare success before the printer reports it ([patterns 2.54](../../patterns/02-navigation-flow.md), [patterns 4.24](../../patterns/04-states-feedback.md)); print waits for its result instead of showing it optimistically.
- Use the printer's own words for its conditions, with its code beside the plain explanation ([patterns 7.111](../../patterns/07-content-copy.md)).
- Draft components, whose measurements are placeholders: List Item, Meter, Commit Bar, Skeleton. The preview surface is not a design-system component.

Prototypes using this template: none yet.
