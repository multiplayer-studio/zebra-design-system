---
name: Dialog
level: organism
status: stable
composes: [../atoms/button.md, ../atoms/icon-button.md, ../atoms/icon.md, ../atoms/scrim.md]
tokens:
  # container
  dialog-container-background: '{colors.color-fill-overlay}'
  dialog-container-border-color: '{colors.color-fill-transparent}'
  dialog-container-border-width: '{stroke.stroke-thin}'
  dialog-container-radius-round: '{radius.radius-container}'
  dialog-container-radius-sharp: '{radius.radius-none}'
  dialog-container-padding: '{space.space-md}'
  dialog-container-shadow: '{shadow.shadow-large}'
  dialog-content-width: '{component-sizes.size-dialog-width}'
  # header
  dialog-header-height: '{control.control-lg}'
  dialog-header-padding: '{space.space-md}'
  dialog-header-gap: '{space.space-sm}'
  dialog-header-icon-foreground: '{colors.color-ink-high}'
  dialog-header-icon-foreground-info: '{colors.color-status-info-default}'
  dialog-header-icon-foreground-warning: '{colors.color-status-warning-default}'
  dialog-header-icon-foreground-error: '{colors.color-status-error-default}'
  dialog-header-icon-size: '{icon.icon-size-medium}'
  dialog-title-foreground: '{colors.color-ink-high}'
  dialog-title-font: '{typography.type-title-large}'
  dialog-close-foreground: '{colors.color-ink-high}'
  # body
  dialog-body-padding: '{space.space-md}'
  dialog-body-padding-bottom: '{space.space-xl}'
  dialog-body-foreground: '{colors.color-ink-high}'
  dialog-body-font: '{typography.type-body-medium}'
  # footer
  dialog-footer-padding: '{space.space-md}'
  dialog-footer-gap: '{space.space-sm}'
  dialog-footer-button-height: '{button.button-container-height-medium}'
  # scrim
  dialog-scrim-background: '{colors.color-fill-scrim}'
---

# Dialog

> A modal message that interrupts the current task until the user responds or dismisses it.

## Anatomy
1. Container — the raised panel: `--dialog-container-background` fill, a `--dialog-container-border-width` border in `--dialog-container-border-color` (transparent, so the edge shows in forced colours where the shadow disappears, [patterns 6.10](../patterns/06-accessibility.md)), `--dialog-container-shadow`, radius from Shape, and `--dialog-container-padding` on every side. Header, body and footer stack inside it with no gap.
2. Header — at least `--dialog-header-height` tall, growing as the title wraps, with `--dialog-header-padding` padding and `--dialog-header-gap` between its parts:
   - Leading icon — [Icon](../atoms/icon.md) at `--dialog-header-icon-size`. Its glyph and colour follow Flavour: `--dialog-header-icon-foreground` for default, `--dialog-header-icon-foreground-info|warning|error` for the severities.
   - Title — `--dialog-title-font`, `--dialog-title-foreground`; wraps onto as many lines as it needs and never truncates ([patterns 5.29](../patterns/05-sizes-devices.md)).
   - Close (optional, Show Close) — an [Icon Button](../atoms/icon-button.md) (subtle, small) whose glyph is `close` in `--dialog-close-foreground`.
3. Body — an open content slot with no fixed structure: `--dialog-body-padding` on three sides and `--dialog-body-padding-bottom` below, text in `--dialog-body-font` `--dialog-body-foreground`.
4. Footer (optional) — [Buttons](../atoms/button.md) at medium size (`--dialog-footer-button-height`), `--dialog-footer-padding` on every side, its content pushed to the two ends. When any label no longer fits on one line, the whole footer stacks at once, full width, primary on top ([patterns 5.23](../patterns/05-sizes-devices.md)). Removed entirely when Show footer is off.
5. Backdrop — a [Scrim](../atoms/scrim.md) in `--dialog-scrim-background` behind the dialog.

## Variants
Flavour changes only the header icon: its glyph and its colour. The title, body and footer keep their colours in every flavour. Every flavour asks for a decision: a dialog never just informs ([patterns 1.66](../patterns/01-screen-composition.md)). Severity names, glyphs and colours are the system's ([patterns 4.79](../patterns/04-states-feedback.md)).

| Flavour | Header glyph | Glyph colour | When |
|---|---|---|---|
| default | `help` | `--dialog-header-icon-foreground` | a confirmation that warns about nothing |
| info | `info` | `--dialog-header-icon-foreground-info` | a decision the person needs some information to make, with no risk |
| warning | `warning` | `--dialog-header-icon-foreground-warning` | the person can proceed but should know a consequence first |
| error | `error` | `--dialog-header-icon-foreground-error` | something failed or blocks the person, and they must choose what to do |

There is no success flavour: a completed action is confirmed with a [Snackbar](../molecules/snackbar.md) or in place, never a dialog.

Footer actions (fixed presets; each sets its buttons' roles and positions). Actions is set on the footer part, not on the dialog as a whole:

| Actions | Start | End |
|---|---|---|
| 3 (default) | tertiary: [Button](../atoms/button.md) text | secondary: Button outline-subtle, then primary: Button primary, `--dialog-footer-gap` apart |
| 2 | — | secondary (outline-subtle) and primary, `--dialog-footer-gap` apart |
| 1 | — | primary |
| custom | Left action slot | Right action slot; each slot spaces its own content `--dialog-footer-gap` apart |

Shape: round (default) → `--dialog-container-radius-round` (the large-surface radius role), footer buttons rounded; sharp → `--dialog-container-radius-sharp`, footer buttons sharp, sharp icons. One shape per dialog: the container and its buttons can't be mixed. In the AAA modes the component is always sharp (DESIGN.md §5).

Full screen: below `--breakpoint-medium-min` (compact), a dialog that holds a task or form of more than one or two inputs fills the window, `--dialog-container-radius-sharp` corners, no shadow, header pinned at the top and footer at the bottom. A short confirmation stays a centred dialog ([patterns 5.17](../patterns/05-sizes-devices.md), [1.112](../patterns/01-screen-composition.md)).

## States
| State | Notes |
|---|---|
| closed | not rendered |
| open | modal; the backdrop sits behind it, focus moves into the dialog and stays there |
| dismissed | closed by a footer action, or by ✕, the scrim, Escape or the system Back ([patterns 2.17](../patterns/02-navigation-flow.md), [2.18](../patterns/02-navigation-flow.md)); focus returns to the control that opened it |

✕, the scrim, Escape and system Back close the dialog and keep what was entered, so reopening it restores the entries ([patterns 2.62](../patterns/02-navigation-flow.md)). Cancel abandons the task and discards; if anything was entered it first asks, naming what will be lost ("Discard changes", "Keep editing"). That confirmation replaces the dialog rather than stacking on it ([patterns 2.23](../patterns/02-navigation-flow.md), [2.24](../patterns/02-navigation-flow.md), [1.110](../patterns/01-screen-composition.md)).

No transition is defined for the dialog's header, body or footer in any variant. Interaction states (hover, pressed, focus, disabled) belong to the close Icon Button and the footer Buttons.

## Spacing & Sizing
| Part | Size | Padding | Gap |
|---|---|---|---|
| Container | hugs; header, body and footer are `--dialog-content-width` wide | `--dialog-container-padding` | none |
| Header | at least `--dialog-header-height` tall; grows as the title wraps | `--dialog-header-padding` | `--dialog-header-gap` |
| Body | hugs its content | `--dialog-body-padding` top and sides, `--dialog-body-padding-bottom` bottom | — |
| Footer | `--dialog-content-width` wide, fixed; buttons at least `--dialog-footer-button-height` | `--dialog-footer-padding` | content at both ends; `--dialog-footer-gap` within each group, and between rows when stacked |

The dialog hugs its content: with the default content it is `--dialog-content-width` plus `--dialog-container-padding` on each side. Turning the footer off shrinks it by the footer's height. The extra space under the body keeps the footer's buttons clear of the last line of content. On a viewport too short for the content, the body scrolls and the header and footer stay put.

## Properties
| Property | Options | Default |
|---|---|---|
| Flavour | default, info, warning, error | default |
| Shape | round, sharp | round |
| Show Close | on / off | on |
| Show footer | on / off | on |
| Actions (set on the footer) | 1, 2, 3, custom | 3 |
| Title | text | — |
| Body | slot, any content | — |
| Left / Right action | slots (Actions = custom only) | — |

The header icon is always shown. Turn Show Close off when Cancel already offers the only way out and closing would mean the same as cancelling; a dialog always keeps a clear way out ([patterns 1.113](../patterns/01-screen-composition.md)).

## Usage
- Use a dialog only for a decision that must happen now ([patterns 1.66](../patterns/01-screen-composition.md)), or a short task of a few inputs ([1.111](../patterns/01-screen-composition.md)). Anything the person can ignore belongs in a [Snackbar](../molecules/snackbar.md) or a banner; anything longer is a full screen or page.
- Keep the footer to one action when only one response is needed; the Actions = 1 preset exists for this.
- Turn the footer off only when the body holds the choices themselves (a short list of options that each close the dialog). The footer is removed, not left as an empty bar.
- Button labels and the confirmation title follow the copy rules ([patterns 7.44](../patterns/07-content-copy.md), [7.46](../patterns/07-content-copy.md)).
- A destructive action is never the primary or default action: it uses a negative Button, and focus opens on the least destructive action ([patterns 1.81](../patterns/01-screen-composition.md), [3.6](../patterns/03-controls-interaction.md), [6.28](../patterns/06-accessibility.md)).
- Flavour colours only the glyph; say the severity in the title and body too ([patterns 6.11](../patterns/06-accessibility.md)).
- Don't use custom Actions for a plain one, two or three button footer; the presets already set each button's role and position. Use the slots for content that doesn't fit them, such as a negative confirm or a checkbox.

## Accessibility
- The dialog is modal and follows the overlay focus rules ([patterns 6.28](../patterns/06-accessibility.md), [6.29](../patterns/06-accessibility.md)). Figma models none of this, so it is built in code (a native `<dialog>` opened with `showModal()` gives the focus trap, Escape and focus return). System Back closes it like Escape.
- Label the dialog with its title (`aria-labelledby`) and, where the body is a short message, describe it with the body (`aria-describedby`).
- The close is drawn as a bare icon but must be a real button with an accessible name ("Close"). Its glyph is small; keep the Icon Button's target.
- The header glyph is decorative; the title and body carry the severity in words.
- Footer buttons keep the Button focus ring (`--button-focus-ring-width` `--button-focus-ring-color`).

## Claude Prompt
Draw a centred white modal panel (`--dialog-container-background`) with a transparent thin border, `--dialog-container-radius-round` corners and a soft large shadow, over a dark translucent scrim (`--dialog-scrim-background`). Inside `--dialog-container-padding` padding, a header row at least `--dialog-header-height` tall holds a `--dialog-header-icon-size` icon (near-black for default, the status colour for info, warning or error), a `--dialog-title-font` title that wraps, and a close icon at the far right. Below, `--dialog-body-font` body text, with extra space underneath. The footer row puts a blue text button on the left and, on the right, a light-grey outlined Cancel button beside a solid blue primary button (`--button-primary-container-background-enabled`), each `--dialog-footer-button-height` tall and `--dialog-footer-gap` apart.
