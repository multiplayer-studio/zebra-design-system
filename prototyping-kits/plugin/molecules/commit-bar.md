---
name: Commit Bar
level: molecule
status: draft
composes: [../atoms/button.md, ../atoms/icon.md]
tokens:
  # container
  commit-bar-container-background: '{colors.color-fill-default}'
  commit-bar-container-border-color: '{colors.color-line-default}'
  commit-bar-container-border-width: '{stroke.stroke-thin}'
  commit-bar-container-shadow: '{shadow.shadow-small}'
  # scope statement
  commit-bar-scope-font: '{typography.type-body-small}'
  commit-bar-scope-foreground: '{colors.color-ink-high}'
  commit-bar-scope-icon-size: '{icon.icon-size-small}'
  commit-bar-scope-icon-foreground: '{colors.color-ink-medium}'
  # sizes
  commit-bar-container-min-height: '{control.control-target-gloved}'
  commit-bar-container-padding-y: '{space.space-sm}'
  commit-bar-container-padding-x: '{space.space-page}'
  commit-bar-container-gap: '{space.space-md}'
  commit-bar-actions-gap: '{space.space-sm}'
  commit-bar-scope-gap: '{space.space-2xs}'
---

# Commit Bar

> A bar pinned to the bottom of what it commits (a page or a pane) that states the scope and holds Cancel and the primary commit at its trailing end.

## Anatomy
1. Container — a horizontal bar, at least `--commit-bar-container-min-height` tall, on `--commit-bar-container-background` with a `--commit-bar-container-border-width` `--commit-bar-container-border-color` top edge. It spans exactly the scope it commits: the whole page or one pane. Overlays such as dialogs, sheets and side panels keep their own footers ([patterns 1.22](../patterns/01-screen-composition.md)). Padded `--commit-bar-container-padding-y` / `--commit-bar-container-padding-x`; its groups sit `--commit-bar-container-gap` apart.
2. Leading slot (optional) — a destructive action ([Button](../atoms/button.md), negative flavour) or the way out when the bar has no Cancel ("Back").
3. Scope statement (optional) — what the commit will act on ("12 devices at Dock 3"), in `--commit-bar-scope-font` `--commit-bar-scope-foreground`, with an optional leading [Icon](../atoms/icon.md) at `--commit-bar-scope-icon-size` in `--commit-bar-scope-icon-foreground`, `--commit-bar-scope-gap` apart. It sits directly before the commit group. Required when the commit acts across many objects, a tenant or a site ([patterns 1.140](../patterns/01-screen-composition.md)).
4. Commit group — at the trailing end, `--commit-bar-actions-gap` apart: Cancel ([Button](../atoms/button.md), outline-subtle flavour), any secondary commit ("Save draft", outline), then the primary commit ([Button](../atoms/button.md), primary flavour) last, at the very trailing end ([patterns 1.22](../patterns/01-screen-composition.md)).

## Variants
**Scope**

| Scope | Spans | Padding (H) |
|---|---|---|
| page (default) | the content area's full width | `--commit-bar-container-padding-x`, matching the page margin |
| pane | one pane of a split screen; the other pane has none | `--commit-bar-container-padding-x` |

**Elevation**: flat (default) shows only the top edge. Raised adds `--commit-bar-container-shadow` while content scrolls under the bar; the top edge stays, so the boundary holds in forced colours.

## States
| State | What changes |
|---|---|
| hidden | nothing to commit: on a read-only screen the bar isn't shown ([patterns 1.75](../patterns/01-screen-composition.md)) |
| ready | the primary is enabled; it validates on press and moves focus to the first error if the form isn't valid |
| busy | the primary shows Button's busy state and can't be pressed again until the action ends ([patterns 3.3](../patterns/03-controls-interaction.md)) |
| unsaved | the scope statement slot says "Unsaved changes" next to the commit ([patterns 1.127](../patterns/01-screen-composition.md)) |

The bar's own colours don't change between states; its Buttons carry their states.

## Spacing & Sizing
| Property | Value |
|---|---|
| Min height | `--commit-bar-container-min-height` |
| Padding (V / H) | `--commit-bar-container-padding-y` / `--commit-bar-container-padding-x` |
| Leading slot ↔ scope ↔ commit group | `--commit-bar-container-gap` |
| Between buttons | `--commit-bar-actions-gap` |
| Scope icon ↔ text | `--commit-bar-scope-gap` |

Buttons are medium; large in a gloved product. When the buttons don't fit on one line (compact screens, long translations), the commit group stacks full width, primary on top, and the scope statement sits above it. The height is a minimum; `--commit-bar-container-min-height` is a draft placeholder, to be confirmed in Figma.

## Properties
| Property | Options | Default |
|---|---|---|
| Scope | page, pane | page |
| Elevation | flat, raised | flat |
| Leading action | none, destructive, back | none |
| Show Scope | on / off | off |
| Scope text | text | — |
| Secondary commit | on / off | off |
| Primary label | text | Save |

## Usage
- Use a Commit Bar on long create, edit and selection screens where the finishing actions would otherwise scroll away ([patterns 1.74](../patterns/01-screen-composition.md), [patterns 5.59](../patterns/05-sizes-devices.md)). On a short form, put the actions after the last field instead.
- The bar's primary is the screen's one primary action ([patterns 1.17](../patterns/01-screen-composition.md)).
- Label the primary with the outcome ("Assign 12 devices"), not "OK".
- State the scope next to the commit whenever it reaches beyond what's on screen: how many, which site or tenant ([patterns 1.140](../patterns/01-screen-composition.md)).
- Cancel discards, and asks first when there are unsaved changes ([patterns 1.127](../patterns/01-screen-composition.md)).
- Keep the primary enabled and validate on press; don't disable it until the form is valid ([patterns 4.43](../patterns/04-states-feedback.md)).
- With the on-screen keyboard open, the bar rides on top of the keyboard, and it's the last pinned region to give way in a short window ([patterns 5.52](../patterns/05-sizes-devices.md), [patterns 5.54](../patterns/05-sizes-devices.md)).
- A destructive action sits at the leading end, never in the commit group, and is never the default.
- Don't put a Commit Bar in an overlay: a [Dialog](../organisms/dialog.md), [Bottom Sheet](../organisms/bottom-sheet.md) or [Right Drawer Panel](../organisms/right-drawer-panel.md) keeps its own footer.

## Accessibility
- The bar never fully covers the focused element; content scrolls so a focused field stays clear of it ([patterns 5.53](../patterns/05-sizes-devices.md), [patterns 6.25](../patterns/06-accessibility.md)).
- In reading and focus order the bar comes after the content it commits.
- Give the bar a named `region` landmark ("Form actions") when the page has more than one.
- Announce the scope statement with the primary: point the primary's `aria-describedby` at it.
- When the busy state ends, announce the result (a toast or a status message), and move focus to where the screen now is.

## Claude Prompt
Draw a footer bar pinned to the bottom of a form, spanning its full width, at least `--commit-bar-container-min-height` tall, white (`--commit-bar-container-background`) with a thin grey top edge (`--commit-bar-container-border-color`) and `--commit-bar-container-padding-x` side padding. At the trailing end, `--commit-bar-actions-gap` apart: a near-black `--commit-bar-scope-font` line "12 devices at Dock 3" with a small `store` icon, an outline-subtle "Cancel" button, then a solid blue primary "Assign devices" button at the far right. On a narrow screen show the same bar with the buttons stacked full width, primary on top.
