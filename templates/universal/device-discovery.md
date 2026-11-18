---
name: Device Discovery
level: template
status: draft
composes: [../../organisms/bottom-sheet.md, ../../organisms/camera-scan-view.md, ../../organisms/dialog.md, ../../organisms/right-drawer-panel.md, ../../organisms/screen-header-bar.md, ../../molecules/empty-state.md, ../../molecules/inline-banner.md, ../../molecules/input.md, ../../molecules/list-item.md, ../../molecules/progress-circle.md, ../../atoms/button.md]
---

# Device Discovery

> A screen for finding and connecting a nearby device (printer, scanner, headset, sled): the connected device first, then nearby devices in a list that never re-sorts while the person chooses, connecting in named steps on the same row.

It embodies the discovery rule ([patterns 1.142](../../patterns/01-screen-composition.md)), connecting steps ([patterns 4.74](../../patterns/04-states-feedback.md), [patterns 4.75](../../patterns/04-states-feedback.md)) and device states ([patterns 4.70](../../patterns/04-states-feedback.md)). Used for Bluetooth and network pairing of printers, ring scanners, headsets and accessories, and for choosing a printer to print to.

## Anatomy

1. **Header**: [Screen Header Bar](../../organisms/screen-header-bar.md), leading icon on, Title "Connect a printer", Action Slot empty.
2. **Precondition** (only when it applies): an [Inline Banner](../../molecules/inline-banner.md) appearance subtle, status warning, for a condition of this screen ("Bluetooth is off"), with one action ("Turn on") ([patterns 1.60](../../patterns/01-screen-composition.md), [patterns 1.61](../../patterns/01-screen-composition.md)).
3. **Connected** (when there is one): section heading "Connected", then a [List Item](../../molecules/list-item.md), Lines two, Action open, Leading icon (`printer`, `scanner` or `headset`), label the device name, supporting text its serial in the Key Value List mono value style and location, Trailing value "Connected" as plain text ([patterns 10.41](../../patterns/10-data-display.md)). Opening it shows its details and Disconnect.
4. **Nearby**: section heading "Nearby" with, at its trailing end, the search state: a [Progress Circle](../../molecules/progress-circle.md) size xsmall, indeterminate, and "Searching", which becomes a [Button](../../atoms/button.md) flavour text, leading icon `refresh`, "Search again" when the search ends ([patterns 1.142](../../patterns/01-screen-composition.md)). Then a [List Item](../../molecules/list-item.md) per device, Lines two, Action open, Leading icon by type, label the name, supporting text the serial and signal ("Strong signal"), Trailing chevron. The whole row connects ([patterns 1.19](../../patterns/01-screen-composition.md)).
5. **Connecting** (in the chosen row): the row's supporting text names the step and counts it ("Pairing, step 1 of 3"), says what the device should be doing ("The printer's light flashes blue"), and a [Progress Circle](../../molecules/progress-circle.md) size xsmall replaces the chevron ([patterns 4.74](../../patterns/04-states-feedback.md)). A [Button](../../atoms/button.md) flavour text "Cancel" sits in the row while it's safe to stop ([patterns 4.21](../../patterns/04-states-feedback.md)). On success the row moves to Connected, and the screen returns to where it was opened from with the result there ([patterns 2.47](../../patterns/02-navigation-flow.md)).
6. **Other ways in**: below the list, [Button](../../atoms/button.md)s flavour outline-subtle: "Scan device barcode" (leading icon `barcode`, opens a [Camera Scan View](../../organisms/camera-scan-view.md) Mode barcode, Type instead on, or uses the scanner) and "Enter serial number" (opens an [Input](../../molecules/input.md) type text with the scan trailing control ([patterns 3.46](../../patterns/03-controls-interaction.md))).

States:
- **Nothing found**: an [Empty State](../../molecules/empty-state.md) type No results in place of the nearby list, with help ("Turn the printer on and hold it near") and "Search again" as its action; the other ways in stay ([patterns 1.128](../../patterns/01-screen-composition.md)).
- **Pairing failed**: the row shows an error line with icon and words, what went wrong and what to do, and Retry, which resumes from the step that failed ([patterns 4.75](../../patterns/04-states-feedback.md), [patterns 4.22](../../patterns/04-states-feedback.md)).
- **Device busy or needs attention**: its row says so in words, with the cause ([patterns 4.71](../../patterns/04-states-feedback.md), [patterns 4.73](../../patterns/04-states-feedback.md)).

The composed components govern their own colours, states, sizes, radius and focus rings. The template only places them.

## Layout

```
┌──────────────────────────────────┐
│ 1 ‹  Connect a printer           │
├──────────────────────────────────┤
│ 2 (Bluetooth is off  [Turn on])  │
│ 3 Connected                      │
│   ▮ ZQ630 Dock 2   Connected     │
│ 4 Nearby           ◌ Searching   │
│   ▮ ZQ521 0042  Strong signal  › │
│   ▮ ZQ521 0107  Pairing 1 of 3 ◌ │
│   ▮ ZD421 0311  Weak signal    › │
│ 6 [Scan device barcode]          │
│   [Enter serial number]          │
└──────────────────────────────────┘
```

- One column; margins `--space-page` at compact, `--grid-margin` from medium. Sections sit `--space-xl` apart; a section's heading sits `--space-sm` above its rows; rows in a list sit with no gap, divided.
- The whole content scrolls under the header. There is no Commit Bar: choosing a row is the action.
- New devices found during a search are added at the end of the list; existing rows never move, so a row never jumps under a finger ([patterns 1.142](../../patterns/01-screen-composition.md), [patterns 3.130](../../patterns/03-controls-interaction.md)).

## Responsiveness

- **Compact** (below `--breakpoint-medium-min`): as above. Full-screen on handhelds; from a print flow it may be a [Bottom Sheet](../../organisms/bottom-sheet.md) content type generic, Height behaviour expandable, holding regions 3 to 6.
- **Medium** (from `--breakpoint-medium-min`): margins `--grid-margin`; the list caps at a readable width and centres ([patterns 5.11](../../patterns/05-sizes-devices.md)).
- **Expanded** (from `--breakpoint-expanded-min`): when opened from another screen, it's a [Dialog](../../organisms/dialog.md) or a [Right Drawer Panel](../../organisms/right-drawer-panel.md) variant modal holding regions 2 to 6, over the screen it came from ([patterns 1.117](../../patterns/01-screen-composition.md)). As a page of its own, it's one capped column.
- **Large** (from `--breakpoint-large-min`): as expanded.
- **Touch**: rows are at least `--control-target-min` tall ([patterns 6.16](../../patterns/06-accessibility.md)); gloved products use `--control-target-gloved`. The in-row Cancel is a separate target after the row ([patterns 6.36](../../patterns/06-accessibility.md)).

## Accessibility

- **Landmarks and headings**: header, `main`. One h1, the title; "Connected" and "Nearby" are h2.
- **Focus order**: banner action, connected device, nearby list, other ways in. When a connection starts, focus stays on the row; when it succeeds, focus moves to the Connected row, or back to the control that opened discovery ([patterns 6.29](../../patterns/06-accessibility.md)).
- **Keyboard**: rows open with Enter; arrows move between rows on devices with keys ([patterns 3.129](../../patterns/03-controls-interaction.md)).
- **Names and announcements**: "Searching" and "Search finished, 3 devices found" are announced politely ([patterns 6.53](../../patterns/06-accessibility.md)). Each step of connecting is announced; failure is announced assertively. Newly found devices are announced as a count, not one by one.
- **Never colour alone**: signal is in words; states are words with icons.

## Usage

- Use for finding and connecting a device nearby. For managing many devices already enrolled, use [Fleet Overview](fleet-overview.md).
- The connected device comes first, then nearby devices; don't sort by signal strength live ([patterns 1.142](../../patterns/01-screen-composition.md)).
- A connection that is a multi-phase operation stays on this screen; only the step and progress change ([patterns 1.31](../../patterns/01-screen-composition.md)). Where the platform takes over (the system's pairing dialog), say so before it does.
- An administrator-configured device is never asked to be discovered again ([patterns 2.72](../../patterns/02-navigation-flow.md)); a known device reconnects by itself ([patterns 4.75](../../patterns/04-states-feedback.md)).
- Serial numbers can be selected and copied ([patterns 3.136](../../patterns/03-controls-interaction.md)).
- Draft components, whose measurements are placeholders: List Item, Camera Scan View, Empty State, Right Drawer Panel.

Prototypes using this template: none yet.
