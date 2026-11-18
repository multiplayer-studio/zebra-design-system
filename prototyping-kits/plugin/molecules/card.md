---
name: Card
level: molecule
status: stable
composes: [../atoms/button.md, ../atoms/caret-indicator.md, ../atoms/avatar.md, ../atoms/icon-button.md, ../atoms/icon.md, ../atoms/ai-mark.md]
tokens:
  # surface (both types)
  card-container-background: '{colors.color-fill-default}'
  card-container-border-color: '{colors.color-line-default}'
  card-container-border-width: '{stroke.stroke-thin}'
  card-container-radius-sharp: '{radius.radius-none}'
  card-container-radius-rounded: '{radius.radius-element-md}'
  # heading part (standard header slot, and second heading in media layouts)
  card-heading-padding: '{space.space-lg}'
  card-heading-gap: '{space.space-lg}'
  card-heading-leading-gap: '{space.space-sm}'
  card-heading-title-font: '{typography.type-title-medium}'
  card-heading-title-foreground: '{colors.color-ink-high}'
  card-heading-subtitle-font: '{typography.type-body-small}'
  card-heading-subtitle-foreground: '{colors.color-ink-medium}'
  # body part
  card-body-padding: '{space.space-lg}'
  card-body-font: '{typography.type-body-small}'
  card-body-foreground: '{colors.color-ink-medium}'
  # image part
  # footer part
  card-footer-padding: '{space.space-lg}'
  card-footer-gap: '{space.space-sm}'
  # collapsible header
  card-collapsible-header-background: '{colors.color-status-ghost-default}'
  card-collapsible-header-background-hover: '{colors.color-status-ghost-faint}'
  card-collapsible-header-padding: '{space.space-lg}'
  card-collapsible-header-gap: '{space.space-sm}'
  card-collapsible-heading-gap: '{space.space-3xs}'
  card-collapsible-title-gap: '{space.space-2xs}'
  card-collapsible-title-font: '{typography.type-title-large}'
  card-collapsible-title-foreground: '{colors.color-ink-high}'
  card-collapsible-required-foreground: '{colors.color-ink-medium}'
  card-collapsible-description-font: '{typography.type-title-medium}'
  card-collapsible-description-foreground: '{colors.color-ink-medium}'
  card-collapsible-caret-size: '{icon.icon-size-large}'
  card-collapsible-focus-ring-width: '{stroke.stroke-thick}'
  card-collapsible-focus-ring-color: '{colors.color-line-focus}'
  # collapsible body
  card-collapsible-body-padding: '{space.space-lg}'
  # collapsible gradient flavour
  card-collapsible-gradient-border-width: '{stroke.stroke-thick}'
  card-collapsible-gradient-border-start: '{colors.color-gradient-strong-start}'
  card-collapsible-gradient-border-end: '{colors.color-gradient-strong-end}'
  # motion
  card-collapsible-transition-duration: '{motion.motion-fast}'
  card-collapsible-transition-easing: '{motion.easing-standard}'
---

# Card

> Cards group the content and actions for a single topic on one bordered surface; the collapsible type hides its body behind a header that is always visible.

## Anatomy
**Standard card** — a shell of three stacked slots, each filled with one of the card parts below.
1. Container — fixed width, height hugs the slots. Carries `--card-container-background`, a `--card-container-border-width` `--card-container-border-color` border on all four edges and the shape radius, and clips everything inside it, so a full-bleed image follows the corner. No padding and no gap: every inset comes from the parts.
2. Header slot (optional) — a heading part: a leading content slot (an [Avatar](../atoms/avatar.md) or [Icon](../atoms/icon.md); items `--card-heading-leading-gap` apart), a title in `--card-heading-title-font` `--card-heading-title-foreground` over a subtitle in `--card-heading-subtitle-font` `--card-heading-subtitle-foreground`, and a trailing content slot (usually an [Icon Button](../atoms/icon-button.md) such as `more_vertical`). Padding `--card-heading-padding`, gap `--card-heading-gap`.
3. Body slot (always present) — the main content, stacked from these parts:
   - Body text — `--card-body-font` in `--card-body-foreground`, padding `--card-body-padding`.
   - Image — a full-bleed picture with no padding.
   - Heading — a second heading part (media layouts).
4. Footer slot (optional) — the actions that close the card: [Buttons](../atoms/button.md) at size small in a row, padding `--card-footer-padding`, gap `--card-footer-gap`. They're separate targets from the card itself.

Where the card opens its item, the whole card is the target, and the buttons and icon buttons inside it stay separate targets ([patterns 1.19](../patterns/01-screen-composition.md)). An AI-produced card carries an [AI Mark](../atoms/ai-mark.md) in its header ([patterns 9.19](../patterns/09-ai.md)).

**Collapsible card**
1. Container — as above, with no border at the default flavour.
2. Header (always visible, not a slot) — background `--card-collapsible-header-background`; a leading [Caret Indicator](../atoms/caret-indicator.md) at `--card-collapsible-caret-size` (Icon large, unframed), then the heading block: a title row (`--card-collapsible-title-font` `--card-collapsible-title-foreground`, with an optional "(required)" marker in `--card-collapsible-required-foreground`, `--card-collapsible-title-gap` apart; never an asterisk alone, [patterns 7.31](../patterns/07-content-copy.md)) above a description in `--card-collapsible-description-font` `--card-collapsible-description-foreground`, `--card-collapsible-heading-gap` between them.
3. Body (expanded only) — a slot holding any card parts, inset `--card-collapsible-body-padding` left, right and bottom, with nothing on top so it sits tight under the header.

## Variants
| Type | What it is |
|---|---|
| standard (default) | the shell with header, body and footer slots; static, or opening its item as a whole |
| collapsible | built-in header plus a body that opens and closes; no header or footer slot of its own |

Shape (both types): rounded (default) → `--card-container-radius-rounded`, with content clipped to the curve; sharp → `--card-container-radius-sharp`. Figma defaults to sharp; the system default is rounded. In the AAA modes the component is always sharp (DESIGN.md §5).

Collapsible flavour:
| Flavour | Outline |
|---|---|
| default | none; the card sits on its fill alone |
| gradient | for a section the AI produced, always with an [AI Mark](../atoms/ai-mark.md) in the header ([DESIGN.md §3 Data and gradient](../DESIGN.md)); `--card-collapsible-gradient-border-width` 129° linear gradient `--card-collapsible-gradient-border-start` → `--card-collapsible-gradient-border-end` on all four edges, drawn outside the content so the card grows by twice the width |

Standard layouts (ready-made templates):
| Layout | Header | Body | Footer |
|---|---|---|---|
| text (default) | heading with avatar and icon button | body text | one outline Button |
| media inset | heading with avatar and icon button | image, second heading, body text | actions |
| media | off | image, heading, body text | actions |

Footer actions:
| Actions | Contents |
|---|---|
| 1 (default) | one outline Button |
| 2 | a text Button then an outline Button, `--card-footer-gap` apart |

The screen has one primary action ([patterns 1.17](../patterns/01-screen-composition.md)), so a card's footer is outline by default. Use primary only where the card holds that one action, and never on cards repeated in a collection.
| custom | a slot for any arrangement, items `--card-footer-gap` apart |

## States
| State | Applies to | What changes |
|---|---|---|
| static | standard | nothing; hover, focus and selection belong to the parts in the slots |
| hover, pressed, focused | standard that opens its item | the card's hover and pressed tints and focus ring are built in code (Figma models none); the focus ring follows the card's radius one step out |
| collapsed | collapsible | header only; the caret shows its closed direction |
| expanded | collapsible | the body appears under the header and the caret flips; the header is unchanged |
| header hover | collapsible | header background → `--card-collapsible-header-background-hover` |
| header focused | collapsible | `--card-collapsible-focus-ring-width` `--card-collapsible-focus-ring-color` ring inside the header (a code note: Figma doesn't model the header's focus) |

Expanding and collapsing animate the body height and the caret rotation together over `--card-collapsible-transition-duration` `--card-collapsible-transition-easing`; under reduced motion the body fades instead ([patterns 6.66](../patterns/06-accessibility.md)). Expanding roughly triples the card's height and everything below it moves, so lay a column out against the expanded height. Showing or hiding a standard card's header or footer is a property change, not an animation.

## Spacing & Sizing
| Part | Padding | Gap |
|---|---|---|
| Container | none | none |
| Heading | `--card-heading-padding` | `--card-heading-gap` (leading items `--card-heading-leading-gap`) |
| Body text | `--card-body-padding` | — |
| Image | none (full bleed) | — |
| Footer | `--card-footer-padding` | `--card-footer-gap` |
| Collapsible header | `--card-collapsible-header-padding` | `--card-collapsible-header-gap` |
| Collapsible body | `--card-collapsible-body-padding` left, right, bottom; none on top | — |

Width is fixed and set by the layout that places the card (drawn at 330 for the shell, 360 for the text and media inset templates, 394 for media, 385 for collapsible); height always hugs the content, so a card grows downward and never sideways. Titles and text wrap; long unbroken strings break onto the next line rather than widening or clipping the card ([patterns 5.29](../patterns/05-sizes-devices.md)). The gradient outline adds its width on every side, so a gradient collapsible card is slightly taller than a default one. No shadow: the border (standard) separates the card from the page.

## Properties
| Property | Options | Default |
|---|---|---|
| Type | standard, collapsible | standard |
| Shape | sharp, rounded | rounded |
| Header (standard) | on / off | on |
| Footer (standard) | on / off | on |
| Layout (standard template) | text, media inset, media | text |
| Footer actions | 1, 2, custom | 1 |
| Heading title / subtitle | text | — |
| Heading leading / trailing content | slot (avatar, icon / icon button) | — |
| State (collapsible) | collapsed, expanded | collapsed |
| Flavour (collapsible) | default, gradient | default |
| Collapsible title / description | text | — |
| Required marker (collapsible) | on / off, shows "(required)" | off |
| Opens item (standard) | on / off | off |
| AI Mark | on / off | off |
| Leading caret (collapsible) | on / off | on |

Each slot keeps its content when Shape changes. On a collapsible card the body content is held per expanded variant, so fill the variant you ship.

## Usage
- One topic per card. Put the title in the heading and the closing actions in the footer.
- Switch the header off for a media-led card so the image meets the top edge.
- Turn the footer off when the card is purely informational; there is no body toggle, so a card always reserves its body.
- Let cards grow downward. Cards in a grid share width and structure.
- Use cards for mixed items people browse. Like items people scan or compare go in a list or [Table](../organisms/table.md); cards are never used to compare ([patterns 10.3](../patterns/10-data-display.md)).
- Mark every card the AI produced with an [AI Mark](../atoms/ai-mark.md) in its header ([patterns 9.19](../patterns/09-ai.md)). The gradient flavour may reinforce it, never replace it.
- Use the collapsible type only when the body can genuinely be hidden; content that is always visible belongs in a standard card with a real footer.
- Let the whole card open its item, and keep each button inside it a separate target ([patterns 1.19](../patterns/01-screen-composition.md)).

## Accessibility
- The shell announces nothing; meaning comes from the parts in its slots. Where the whole card opens its item, build it as one link on the title stretched over the card, with the buttons above it in their own tab stops, and draw the card's focus ring in code.
- Check long strings at the fixed width and at twice the text size; nothing is clipped ([patterns 6.60](../patterns/06-accessibility.md)).
- On a standard card the border is the only thing separating it from the page; check `--card-container-border-color` against the surface behind it.
- The collapsible header is the toggle: build it as a button with `aria-expanded` and `aria-controls`, give it the `--card-collapsible-focus-ring-width` `--card-collapsible-focus-ring-color` ring, and don't rely on the caret direction alone.
- Collapsed content must be hidden from assistive technology (not just visually) and available again when expanded.
- The gradient outline is decorative; the AI Mark carries the meaning ([DESIGN.md §3 Data and gradient](../DESIGN.md)).
- Media layouts lead with an image that carries no text; give it alternative text or let the heading below describe it.

## Claude Prompt
Draw a Zebra card: a white (`--card-container-background`) rectangle with a `--card-container-border-width` light-grey (`--card-container-border-color`) border and softly rounded corners (`--card-container-radius-rounded`; square `--card-container-radius-sharp` when sharp), no shadow. At the top a heading row with `--card-heading-padding` padding: a small circular avatar, then a `--card-heading-title-font` near-black title over a `--card-heading-subtitle-font` grey subtitle, and a vertical "more" icon button on the right. Below, an optional full-width image, then a paragraph in `--card-body-font` grey (`--card-body-foreground`) with `--card-body-padding` padding, and a footer with `--card-footer-padding` padding holding a small outline button with a blue border and blue text. A collapsible card instead shows a header with a large chevron on the left, a `--card-collapsible-title-font` title and a `--card-collapsible-description-font` grey description; when expanded the body slides open beneath it. The gradient version outlines the card with a `--card-collapsible-gradient-border-width` deep purple-to-navy gradient (`--card-collapsible-gradient-border-start` → `--card-collapsible-gradient-border-end`).
