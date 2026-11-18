---
name: Connection Status
level: molecule
status: draft
composes: [../atoms/icon.md, ../atoms/button.md]
tokens:
  # container
  connection-status-container-background-enabled: '{colors.color-status-ghost-default}'
  connection-status-container-background-hover: '{colors.color-status-ghost-faint}'
  connection-status-container-background-pressed: '{colors.color-status-ghost-deep}'
  connection-status-container-radius-rounded: '{radius.radius-element-sm}'
  connection-status-container-radius-sharp: '{radius.radius-none}'
  # text
  connection-status-label-font: '{typography.type-label-medium}'
  connection-status-label-foreground: '{colors.color-ink-high}'
  connection-status-detail-font: '{typography.type-body-xsmall}'
  connection-status-detail-foreground: '{colors.color-ink-medium}'
  # icon per status
  connection-status-icon-size: '{icon.icon-size-medium}'
  connection-status-connected-icon-foreground: '{colors.color-ink-medium}'
  connection-status-offline-icon-foreground: '{colors.color-status-neutral-strong}'
  connection-status-syncing-icon-foreground: '{colors.color-status-info-default}'
  connection-status-waiting-icon-foreground: '{colors.color-status-info-default}'
  connection-status-problem-icon-foreground: '{colors.color-status-error-default}'
  # focus
  connection-status-focus-ring-width: '{stroke.stroke-thick}'
  connection-status-focus-ring-color: '{colors.color-line-focus}'
  # sizes
  connection-status-container-min-height: '{control.control-md}'
  connection-status-touch-target-size-minimum: '{control.control-target-min}'
  connection-status-container-padding-x: '{space.space-sm}'
  connection-status-container-gap: '{space.space-xs}'
  connection-status-text-gap: '{space.space-none}'
  # motion
  connection-status-container-transition: '{motion.motion-feedback}'
  connection-status-icon-duration-syncing: '{motion.motion-spin}'
---

# Connection Status

> The one connection and sync indicator in a product's shell: quiet while connected and in sync, it says in words when the product is offline, syncing, waiting to send or has a sync problem.

## Anatomy
1. Container — a pressable row at least `--connection-status-container-min-height` tall, padded `--connection-status-container-padding-x` either side, children `--connection-status-container-gap` apart, with no fill at rest. In code it is a button that opens the details.
2. Icon — an [Icon](../atoms/icon.md) at `--connection-status-icon-size`, fixed per status, in the status's icon colour. This is a context override: the icon takes the status colour instead of the text colour.
3. Text — stacked `--connection-status-text-gap` apart:
   - Label — the status in words, in `--connection-status-label-font` `--connection-status-label-foreground` ("Offline", "3 waiting to send").
   - Detail (optional) — the last sync time in `--connection-status-detail-font` `--connection-status-detail-foreground` ("Last synced 5 min ago", or "Not synced") ([patterns 7.61](../patterns/07-content-copy.md)).
4. Details (opened) — the product's popover on pointer devices or [Bottom Sheet](../organisms/bottom-sheet.md) on handhelds, showing what's waiting, when the last sync happened, and a [Button](../atoms/button.md) "Sync now" ([patterns 4.50](../patterns/04-states-feedback.md)). Its surface belongs to the overlay, not this component.

## Variants
| Status | Glyph | Icon colour | Label |
|---|---|---|---|
| connected (default) | `cloud_done` | `--connection-status-connected-icon-foreground` | none: icon only, or hidden (see Usage) |
| offline | `cloud_off` | `--connection-status-offline-icon-foreground` | "Offline" |
| syncing | `cloud_sync` | `--connection-status-syncing-icon-foreground` | "Syncing" |
| waiting to send | `cloud_upload` | `--connection-status-waiting-icon-foreground` | "N waiting to send" |
| sync problem | `sync_disabled` | `--connection-status-problem-icon-foreground` | "Sync problem" |

Offline is neutral, not an error: the product keeps working, and only what truly needs the network stops ([patterns 4.49](../patterns/04-states-feedback.md)). Only sync problem uses the error colour.

| Layout | Shows | Where |
|---|---|---|
| full (default) | icon, label and detail | the shell on expanded screens, the details header |
| compact | icon and label | a narrow header or app bar |

Shape: rounded (default) → `--connection-status-container-radius-rounded`; sharp → `--connection-status-container-radius-sharp`. In the AAA modes the component is always sharp (DESIGN.md §5).

## States
| State | Container |
|---|---|
| enabled | `--connection-status-container-background-enabled` |
| hover | `--connection-status-container-background-hover` |
| pressed | `--connection-status-container-background-pressed` |
| focused | `--connection-status-focus-ring-width` `--connection-status-focus-ring-color` ring outside the container |

Tints change over `--connection-status-container-transition`. While syncing, the icon turns once every `--connection-status-icon-duration-syncing`; under reduced motion it holds still and the word "Syncing" carries the state ([patterns 6.66](../patterns/06-accessibility.md)). A status change swaps the icon, colour and words together. A sync that finishes quietly returns to connected without a message ([patterns 4.55](../patterns/04-states-feedback.md)).

## Spacing & Sizing
| Property | Token |
|---|---|
| Min height | `--connection-status-container-min-height` |
| Padding (H) | `--connection-status-container-padding-x` |
| Icon ↔ text | `--connection-status-container-gap` |
| Label → detail | `--connection-status-text-gap` |
| Icon | `--connection-status-icon-size` |

Width hugs the content; the label wraps rather than truncating. It is below `--connection-status-touch-target-size-minimum`, so extend its hit area to it on touch ([patterns 6.16](../patterns/06-accessibility.md)). These measurements are draft placeholders from the nearest existing steps; confirm them in Figma.

## Properties
| Property | Options | Default |
|---|---|---|
| Status | connected, offline, syncing, waiting to send, sync problem | connected |
| Waiting count | number | 0 |
| Last synced | time | — |
| Layout | full, compact | full |
| Show when connected | icon, hidden | icon |
| Shape | rounded, sharp | rounded |

## Usage
- Use it only in a product that works offline, once, in the shell: the [Global Header](../organisms/global-header.md)'s connection slot, or the app bar on handhelds ([patterns 4.50](../patterns/04-states-feedback.md)).
- Keep it quiet while connected and in sync: icon only, or hidden where the shell is tight.
- Features that don't work offline say so at the feature, in words; this indicator doesn't replace that ([patterns 4.51](../patterns/04-states-feedback.md)). Online-only actions stay visible with the reason ([patterns 4.54](../patterns/04-states-feedback.md)).
- The details say what still works and what will happen to the person's work, not just "Offline" ([patterns 4.52](../patterns/04-states-feedback.md)). Work done offline is listed as waiting to send until it's sent ([patterns 4.53](../patterns/04-states-feedback.md)).
- Use the product's fixed status words ([patterns 7.51](../patterns/07-content-copy.md)) and relative time for the last sync up to about a day ([patterns 7.60](../patterns/07-content-copy.md)).
- For a connection notice that interrupts mid-task, use a [Snackbar](../molecules/snackbar.md) or [System Banner](../molecules/system-banner.md) alongside it ([patterns 4.55](../patterns/04-states-feedback.md)).

## Accessibility
- It is a button whose name includes the status and the last sync ("Offline. Last synced 5 min ago. Show sync details"), and it says it opens a popup.
- The icon is decorative; the words carry the status, so it is never colour or glyph alone ([patterns 6.11](../patterns/06-accessibility.md)). Connected icon-only still has a name ("Connected, in sync").
- Status changes are announced politely (`role="status"` on a live region in the shell), except routine syncing that ends in sync.
- It shows `--connection-status-focus-ring-width` `--connection-status-focus-ring-color` when focused; focus returns to it when the details close.

## Claude Prompt
Draw a Zebra connection status in an app header: a borderless pressable row with a `--connection-status-icon-size` cloud icon followed by the status in `--connection-status-label-font` and, under it, a small grey "Last synced 5 min ago" (`--connection-status-detail-foreground`). Offline shows a grey crossed-out cloud and "Offline"; syncing a blue cloud-sync icon and "Syncing"; waiting to send a blue upload cloud and "3 waiting to send"; sync problem a red icon (`--connection-status-problem-icon-foreground`) and "Sync problem". When connected and in sync it is just a small grey cloud-done icon.
