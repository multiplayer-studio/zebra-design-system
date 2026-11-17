---
name: Dialog
level: organism
status: stable
composes: [../atoms/button.md, ../atoms/icon-button.md, ../atoms/icon.md, ../atoms/scrim.md]
tokens:
  # container
  dialog-container-background: '{colors.color-fill-overlay}'
  dialog-container-border-color: '{colors.color-line-default}'
  dialog-container-border-width: '{stroke.stroke-thin}'
  dialog-container-radius-round: '{radius.radius-element-md}'
  dialog-container-radius-sharp: '{radius.radius-none}'
  dialog-container-padding: '{space.space-md}'
  dialog-container-shadow: '{shadow.shadow-large}'
  dialog-content-width: '{component-sizes.size-dialog-width}'
  # header
  dialog-header-height: '{control.control-lg}'
  dialog-header-padding: '{space.space-md}'
  dialog-header-gap: '{space.space-sm}'
  dialog-header-icon-foreground: '{colors.color-ink-high}'
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
1. Container — the raised panel: `--dialog-container-background` fill, `--dialog-container-border-width` `--dialog-container-border-color` border, `--dialog-container-shadow`, radius from Shape, and `--dialog-container-padding` on every side. Header, body and footer stack inside it with no gap.
2. Header — fixed in every variant, `--dialog-header-height` tall with `--dialog-header-padding` padding and `--dialog-header-gap` between its parts:
   - Leading icon — [Icon](../atoms/icon.md) at `--dialog-header-icon-size` in `--dialog-header-icon-foreground`. Its glyph follows Flavour; its colour never does.
   - Title — one line in `--dialog-title-font`, `--dialog-title-foreground`; truncates with an ellipsis.
   - Close — always shown. In code it is an [Icon Button](../atoms/icon-button.md) (subtle, small) whose glyph is `close` in `--dialog-close-foreground`.
3. Body — an open content slot with no fixed structure: `--dialog-body-padding` on three sides and `--dialog-body-padding-bottom` below, text in `--dialog-body-font` `--dialog-body-foreground`.
4. Footer (optional) — [Buttons](../atoms/button.md) at medium size (`--dialog-footer-button-height`), `--dialog-footer-padding` on every side, its content pushed to the two ends. Removed entirely when Show footer is off.
5. Backdrop — a [Scrim](../atoms/scrim.md) in `--dialog-scrim-background` behind the dialog.

## Variants
Flavour changes only the header icon's glyph. The icon, the title and the footer keep their colours in every flavour.

| Flavour | Header glyph | When |
|---|---|---|
| default | `help` | confirmations and messages that warn about nothing |
| info | `info` | something to read, with no decision or urgency |
| success | `check_circle` | confirms an action that already completed |
| warning | `warning` | the user can proceed but should know a consequence first |
| error | `error` | something failed or blocks the user from continuing |

Footer actions (fixed presets; each sets its buttons' roles and positions). Actions is set on the footer part, not on the dialog as a whole:

| Actions | Start | End |
|---|---|---|
| 3 (default) | tertiary: [Button](../atoms/button.md) text | secondary: Button outline-subtle, then primary: Button primary, `--dialog-footer-gap` apart |
| 2 | — | secondary (outline-subtle) and primary, `--dialog-footer-gap` apart |
| 1 | — | primary |
| custom | Left action slot | Right action slot; each slot spaces its own content `--dialog-footer-gap` apart |

Shape: round (default) → `--dialog-container-radius-round`, footer buttons rounded; sharp → `--dialog-container-radius-sharp`, footer buttons sharp, sharp icons. One shape per dialog: the container and its buttons can't be mixed. In the AAA modes the component is always sharp (DESIGN.md §5).

## States
| State | Notes |
|---|---|
| closed | not rendered |
| open | modal; the backdrop sits behind it, focus moves into the dialog and stays there |
| dismissed | close, Escape or a footer action closes it; focus returns to the control that opened it |

No transition is defined for the dialog's header, body or footer in any variant. Interaction states (hover, pressed, focus, disabled) belong to the close Icon Button and the footer Buttons.

## Spacing & Sizing
| Part | Size | Padding | Gap |
|---|---|---|---|
| Container | hugs; header, body and footer are `--dialog-content-width` wide | `--dialog-container-padding` | none |
| Header | `--dialog-header-height` tall | `--dialog-header-padding` | `--dialog-header-gap` |
| Body | hugs its content | `--dialog-body-padding` top and sides, `--dialog-body-padding-bottom` bottom | — |
| Footer | `--dialog-content-width` wide, fixed; buttons `--dialog-footer-button-height` | `--dialog-footer-padding` | content at both ends; `--dialog-footer-gap` within each group |

The dialog hugs its content: with the default content it is `--dialog-content-width` plus `--dialog-container-padding` on each side. Turning the footer off shrinks it by the footer's height. The extra space under the body keeps the footer's buttons clear of the last line of content. On a viewport too short for the content, the body scrolls and the header and footer stay put.

## Properties
| Property | Options | Default |
|---|---|---|
| Flavour | default, info, success, warning, error | default |
| Shape | round, sharp | round |
| Show footer | on / off | on |
| Actions (set on the footer) | 1, 2, 3, custom | 3 |
| Title | text | — |
| Body | slot, any content | — |
| Left / Right action | slots (Actions = custom only) | — |

The header icon and the close are always shown; neither is a property.

## Usage
- Use a dialog only for something the user must respond to before continuing. Anything they can ignore belongs in a [Snackbar](../molecules/snackbar.md) or a banner.
- Keep the footer to one action when only one response is needed; the Actions = 1 preset exists for this.
- Turn the footer off only for a message with nothing to decide. The footer is removed, not left as an empty bar.
- Write the primary button as the verb being confirmed (Discard, Start shift), not OK.
- Don't rely on Flavour to recolour anything: only the glyph changes. Say the severity in the title and body.
- Don't use custom Actions for a plain one, two or three button footer; the presets already set each button's role and position. Use the slots for content that doesn't fit them, such as a negative confirm or a checkbox.

## Accessibility
- The dialog is modal: trap focus inside it while open, close it on Escape, and return focus to the control that opened it. Figma models none of this, so it is built in code (a native `<dialog>` opened with `showModal()` gives all three).
- Label the dialog with its title (`aria-labelledby`) and, where the body is a short message, describe it with the body (`aria-describedby`).
- The close is drawn as a bare icon but must be a real button with an accessible name ("Close"). Its glyph is small; keep the Icon Button's target.
- The header glyph is the only flavour signal and is decorative; the title and body carry the meaning.
- Footer buttons keep the Button focus ring (`--button-focus-ring-width` `--button-focus-ring-color`).

## Claude Prompt
Draw a centred white modal panel (`--dialog-container-background`) with a thin light grey `--dialog-container-border-color` border, `--dialog-container-radius-round` corners and a soft large shadow, over a dark translucent scrim (`--dialog-scrim-background`). Inside `--dialog-container-padding` padding, a `--dialog-header-height` header row holds a near-black `--dialog-header-icon-size` status icon, a single-line `--dialog-title-font` title and a close icon at the far right. Below, `--dialog-body-font` body text, with extra space underneath. The footer row puts a blue text button on the left and, on the right, a light-grey outlined Cancel button beside a solid blue primary button (`--button-primary-container-background-enabled`), each `--dialog-footer-button-height` tall and `--dialog-footer-gap` apart.
