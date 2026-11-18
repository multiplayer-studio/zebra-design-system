---
name: AI Suggestion
level: molecule
status: draft
composes: [../atoms/ai-mark.md, ../atoms/button.md, ../atoms/icon-button.md, ../atoms/icon.md, ../atoms/skeleton.md]
tokens:
  # container
  ai-suggestion-container-background: '{colors.color-fill-default}'
  ai-suggestion-container-border-color: '{colors.color-gradient-subtle-start}'
  ai-suggestion-container-border-width: '{stroke.stroke-thin}'
  ai-suggestion-container-radius-rounded: '{radius.radius-element-md}'
  ai-suggestion-container-radius-sharp: '{radius.radius-none}'
  # header
  ai-suggestion-version-font: '{typography.type-label-small}'
  ai-suggestion-version-foreground: '{colors.color-ink-medium}'
  # body
  ai-suggestion-value-font: '{typography.type-body-medium}'
  ai-suggestion-value-foreground: '{colors.color-ink-high}'
  ai-suggestion-reason-font: '{typography.type-body-small}'
  ai-suggestion-reason-foreground: '{colors.color-ink-medium}'
  # applied
  ai-suggestion-applied-font: '{typography.type-body-small}'
  ai-suggestion-applied-foreground: '{colors.color-ink-high}'
  ai-suggestion-applied-icon-foreground: '{colors.color-status-success-default}'
  ai-suggestion-icon-size: '{icon.icon-size-small}'
  # sizes
  ai-suggestion-container-padding: '{space.space-md}'
  ai-suggestion-container-gap: '{space.space-sm}'
  ai-suggestion-header-gap: '{space.space-sm}'
  ai-suggestion-text-gap: '{space.space-2xs}'
  ai-suggestion-actions-gap: '{space.space-sm}'
---

# AI Suggestion

> A value the AI proposes, shown apart from what it would change, with Accept and Reject on the suggestion itself and Undo once it is applied.

## Anatomy
1. Container — a `--ai-suggestion-container-background` box with a `--ai-suggestion-container-border-width` `--ai-suggestion-container-border-color` border, padded `--ai-suggestion-container-padding`, stacking the header, body and actions `--ai-suggestion-container-gap` apart. It sits next to what it would change (under the field, beside the value), never on top of it ([patterns 9.10](../patterns/09-ai.md)).
2. Header — a row, `--ai-suggestion-header-gap` apart:
   - AI mark — an [AI Mark](../atoms/ai-mark.md), Type ai, labelled with what the AI did ("Suggested", "Drafted"). It opens the explanation.
   - Versions (only with more than one version) — a subtle small [Icon Button](../atoms/icon-button.md) `chevron_left`, the position ("2 of 3") in `--ai-suggestion-version-font` `--ai-suggestion-version-foreground`, and a subtle small Icon Button `chevron_right`, at the trailing end ([patterns 9.18](../patterns/09-ai.md)).
3. Body — stacked `--ai-suggestion-text-gap` apart:
   - Value — the proposed value or text in `--ai-suggestion-value-font` `--ai-suggestion-value-foreground`. Long text wraps; it never truncates.
   - Reason (optional) — why the AI chose it, in `--ai-suggestion-reason-font` `--ai-suggestion-reason-foreground` ("Matches the last 3 orders from this site"). Required when the AI chose a value for the person, such as an owner, category or priority ([patterns 9.14](../patterns/09-ai.md)).
4. Actions — a row of small [Buttons](../atoms/button.md) `--ai-suggestion-actions-gap` apart: Accept (outline), Reject (outline-subtle), and optionally Refine or Regenerate (text-gradient). Accept and Reject are the same size, side by side. Small buttons and icon buttons are below the touch minimum, so extend their hit area to `--control-target-min` on touch, as [Button](../atoms/button.md) does ([patterns 6.16](../patterns/06-accessibility.md)).
5. Applied line (applied state) — replaces the body and actions: an [Icon](../atoms/icon.md) `check_circle` at `--ai-suggestion-icon-size` in `--ai-suggestion-applied-icon-foreground`, the confirmation in `--ai-suggestion-applied-font` `--ai-suggestion-applied-foreground` ("Applied"), and a small text Button "Undo".

## Variants
None. Shape: rounded (default) → `--ai-suggestion-container-radius-rounded`; sharp → `--ai-suggestion-container-radius-sharp`, and the buttons, icon buttons and AI mark take the same shape. In the AAA modes the component is always sharp (DESIGN.md §5).

## States
| State | What shows |
|---|---|
| proposed (default) | header, value, reason when shown, Accept / Reject, Refine when shown |
| generating | header; the body is [Skeleton](../atoms/skeleton.md) text lines; actions hidden. A new version is being made, and the previous one stays reachable through Versions |
| applied | header and the applied line with Undo; the value now sits in the field, applied by Accept, so the field's [AI Mark](../atoms/ai-mark.md) is removed (Undo restores the previous value) ([patterns 9.13](../patterns/09-ai.md)) |
| unavailable | header and one line saying the suggestion can't be made now and why; the person finishes the task without it ([patterns 9.9](../patterns/09-ai.md)) |

Rejecting removes the suggestion; the field is unchanged. Undo returns the field to what it held before and the suggestion to proposed. The container has no hover or pressed state; interaction lives on the buttons, icon buttons and mark, which keep their own states and focus rings. It appears and goes with no motion of its own.

## Spacing & Sizing
| Part | Token |
|---|---|
| Padding | `--ai-suggestion-container-padding` |
| Header → body → actions | `--ai-suggestion-container-gap` |
| Within the header | `--ai-suggestion-header-gap` |
| Value → reason | `--ai-suggestion-text-gap` |
| Between actions | `--ai-suggestion-actions-gap` |
| Border | `--ai-suggestion-container-border-width` |

Width follows what it sits beside: the field's width, or its container's. Height follows content. These measurements are draft placeholders from the nearest existing steps; confirm them in Figma.

## Properties
| Property | Options | Default |
|---|---|---|
| State | proposed, generating, applied, unavailable | proposed |
| Mark label | text, a verb | Suggested |
| Value | text or slot | — |
| Reason | text | — |
| Show Reason | on / off; on whenever the AI chose the value ([patterns 9.14](../patterns/09-ai.md)) | on |
| Show Refine | on / off | off |
| Versions | count and current position | 1 |
| Shape | rounded, sharp | rounded |

## Usage
- Show the suggestion as a proposal before it takes effect, next to what it would change. Never overwrite anything a person wrote without their say ([patterns 9.10](../patterns/09-ai.md)).
- Keep Accept and Reject on the suggestion, equally easy ([patterns 9.11](../patterns/09-ai.md)). Neither is primary: the screen's primary action stays the screen's.
- Accepting applies the value in place and confirms it, with Undo right there ([patterns 9.12](../patterns/09-ai.md)).
- When there are several options, keep them few and different, most likely first ([patterns 9.16](../patterns/09-ai.md)); show each as its own suggestion or as versions.
- Regenerating adds a new version beside the last, never silently replacing it ([patterns 9.18](../patterns/09-ai.md)).
- For a fill across many records, check it on a few first ([patterns 9.17](../patterns/09-ai.md)); corrections are fine-grained and take effect at once ([patterns 9.15](../patterns/09-ai.md)).
- Use it only for AI output. A suggestion from a fixed rule is ordinary helper text.

## Accessibility
- The container is a group named by the AI mark and what it suggests ("Suggested value for Priority").
- Accept and Reject say what they act on in their accessible names ("Accept suggested priority"). The version buttons are named "Previous version" and "Next version", and the position is read with them.
- Arriving suggestions and the applied confirmation are announced politely; they never take focus. After Accept or Reject, focus moves to the field the suggestion was for; after Undo, back to Accept.
- The AI colour on the border only reinforces the mark; the AI mark's icon and words carry it ([patterns 6.11](../patterns/06-accessibility.md)).

## Claude Prompt
Draw a Zebra AI suggestion under a form field: a white box (`--ai-suggestion-container-background`) with a thin purple border (`--ai-suggestion-container-border-color`) and `--ai-suggestion-container-radius-rounded` corners, padded `--ai-suggestion-container-padding`. At the top an AI mark: a small purple sparkle icon and the grey word "Suggested"; at the top right, when there are several versions, small ‹ and › icon buttons around "2 of 3". Below, the proposed value in `--ai-suggestion-value-font` and a grey reason line (`--ai-suggestion-reason-foreground`). At the bottom, two small buttons side by side: an outlined "Accept" and a grey-outlined "Reject". Once accepted the box shows a green check icon, "Applied" and a text "Undo" button.
