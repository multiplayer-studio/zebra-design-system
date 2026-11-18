---
name: AI Mark
level: atom
status: draft
composes: [../atoms/icon.md]
tokens:
  # container
  ai-mark-container-background-enabled: '{colors.color-status-ghost-default}'
  ai-mark-container-background-hover: '{colors.color-status-ghost-faint}'
  ai-mark-container-background-pressed: '{colors.color-status-ghost-deep}'
  ai-mark-container-radius-rounded: '{radius.radius-element-sm}'
  ai-mark-container-radius-sharp: '{radius.radius-none}'
  # icon
  ai-mark-icon-size: '{icon.icon-size-small}'
  ai-mark-icon-foreground: '{colors.color-gradient-strong-start}'
  ai-mark-edited-icon-foreground: '{colors.color-ink-medium}'
  # label
  ai-mark-label-font: '{typography.type-label-small}'
  ai-mark-label-foreground: '{colors.color-ink-medium}'
  ai-mark-label-foreground-hover: '{colors.color-ink-high}'
  # focus
  ai-mark-focus-ring-width: '{stroke.stroke-thick}'
  ai-mark-focus-ring-color: '{colors.color-line-focus}'
  # sizes
  ai-mark-container-min-height: '{control.control-xs}'
  ai-mark-touch-target-size-minimum: '{control.control-target-min}'
  ai-mark-container-padding-x: '{space.space-2xs}'
  ai-mark-container-gap: '{space.space-2xs}'
---

# AI Mark

> Marks something as AI-produced with an icon and a verb that names what the AI did, and opens an explanation of how.

## Anatomy
1. Container — a pressable row at least `--ai-mark-container-min-height` tall, padded `--ai-mark-container-padding-x` either side, with its children `--ai-mark-container-gap` apart. It has no fill at rest; hover and press raise a transparent tint. In code it is a button.
2. Icon — an [Icon](../atoms/icon.md) at `--ai-mark-icon-size`. The glyph follows Type: `ai_stars` on ai, `history` on edited. It is not a slot: the same glyph marks AI everywhere ([patterns 7.79](../patterns/07-content-copy.md)). This is a context override: on ai the icon takes `--ai-mark-icon-foreground`, the AI colour, instead of the text colour.
3. Label — the verb, in `--ai-mark-label-font` `--ai-mark-label-foreground`: what the AI did ("Drafted", "Suggested", "Summarised", "Ranked by AI"). On edited it is the way back ("AI version"). The text hugs and wraps; it never truncates.

## Variants
| Type | Glyph | Icon colour | Label | Pressing opens |
|---|---|---|---|---|
| ai (default) | `ai_stars` | `--ai-mark-icon-foreground` | the verb ("Drafted") | the explanation: what the AI did and why, then details, sources and data used |
| edited | `history` | `--ai-mark-edited-icon-foreground` | "AI version" | the AI value, with a way to restore it |

A person's edit turns ai into edited: the content goes back to its normal style and keeps a way back to what the AI produced ([patterns 9.13](../patterns/09-ai.md), [DESIGN.md §3 Data and gradient](../DESIGN.md)).

Shape: rounded (default) → `--ai-mark-container-radius-rounded`; sharp → `--ai-mark-container-radius-sharp`. In the AAA modes the component is always sharp (DESIGN.md §5), and the AI colour resolves to a solid step, so the icon and the words carry the mark on their own ([DESIGN.md §3 Data and gradient](../DESIGN.md)).

## States
| State | Container | Label |
|---|---|---|
| enabled | `--ai-mark-container-background-enabled` | `--ai-mark-label-foreground` |
| hover | `--ai-mark-container-background-hover` | `--ai-mark-label-foreground-hover` |
| pressed | `--ai-mark-container-background-pressed` | `--ai-mark-label-foreground-hover` |
| focused | `--ai-mark-focus-ring-width` `--ai-mark-focus-ring-color` ring outside the container | unchanged |

Tints change at once; there is no motion. The mark has no disabled state: while the content it marks is shown, its explanation is reachable.

## Spacing & Sizing
| Property | Token |
|---|---|
| Min height | `--ai-mark-container-min-height` |
| Padding (H) | `--ai-mark-container-padding-x` |
| Icon ↔ label | `--ai-mark-container-gap` |
| Icon | `--ai-mark-icon-size` |
| Font | `--ai-mark-label-font` |

Width hugs the icon and the label. The visible mark is below `--ai-mark-touch-target-size-minimum`, so extend its hit area to it on touch ([patterns 6.16](../patterns/06-accessibility.md)). Measurements are draft placeholders taken from the nearest existing steps; confirm them in Figma.

## Properties
| Property | Options | Default |
|---|---|---|
| Type | ai, edited | ai |
| Label | text, a verb for what the AI did | Suggested |
| Shape | rounded, sharp | rounded |

## Usage
- Mark AI output wherever it appears, at the smallest unit that holds all of it: a field, a message, a card or a section. Where a whole column or collection is AI-produced, mark it once at its heading ([patterns 9.19](../patterns/09-ai.md)).
- The label names what the AI did, so the person knows what to check ([patterns 9.20](../patterns/09-ai.md)). "AI" alone is not a label.
- Pressing opens a layered explanation: a few short sentences first, then details, sources and data; the deepest layer stays reachable for high-stakes output ([patterns 9.21](../patterns/09-ai.md)). The explanation surface is the product's (a popover on pointer devices, a [Bottom Sheet](../organisms/bottom-sheet.md) on handhelds).
- Mark AI entry points and output only ([patterns 9.8](../patterns/09-ai.md)). Never use the mark as decoration or a "new" badge ([DESIGN.md §3 Data and gradient](../DESIGN.md)), and don't mark long-established recognition such as barcode decoding or speech-to-text.
- Keep the mark on earlier messages after a person joins a conversation ([patterns 9.22](../patterns/09-ai.md)).
- Never mark AI with colour alone: the icon and the words are the mark, and any AI colour only reinforces it ([DESIGN.md §3 Data and gradient](../DESIGN.md)).

## Accessibility
- It is a button. Its accessible name is the label plus what it marks ("Drafted by AI: reply"), so it reads sensibly out of context.
- The icon is decorative (`aria-hidden`); the words carry the meaning, so the mark survives greyscale, forced colours and high contrast ([patterns 6.11](../patterns/06-accessibility.md)).
- It shows `--ai-mark-focus-ring-width` `--ai-mark-focus-ring-color` when focused, and the explanation it opens returns focus to it when closed.

## Claude Prompt
Draw a Zebra AI mark: a small, borderless inline tag `--ai-mark-container-min-height` tall with a `--ai-mark-icon-size` sparkle icon (`ai_stars`) in purple (`--ai-mark-icon-foreground`) followed `--ai-mark-container-gap` later by a short grey verb in `--ai-mark-label-font` (`--ai-mark-label-foreground`), such as "Drafted" or "Suggested". It sits beside the heading of the field, message or card it marks. On hover a faint tint (`--ai-mark-container-background-hover`) appears behind it. After a person edits the content it becomes a grey history icon with "AI version".
