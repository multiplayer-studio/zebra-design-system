---
name: Card
level: molecule
status: stable
composes: [../atoms/button.md, ../atoms/caret-indicator.md, ../atoms/avatar.md, ../atoms/icon-button.md, ../atoms/icon.md]
tokens:
  # surface (both types)
  card-container-background: '{colors.color-fill-default}'
  card-container-border-color: '{colors.color-line-default}'
  card-container-border-width: '{stroke.stroke-thin}'
  card-container-radius-sharp: '{radius.radius-none}'
  card-container-radius-rounded: '{radius.radius-sm}'
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
  card-collapsible-required-foreground: '{colors.color-status-error-default}'
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
4. Footer slot (optional) — the actions that close the card: [Buttons](../atoms/button.md) at size small in a row, padding `--card-footer-padding`, gap `--card-footer-gap`.

**Collapsible card**
1. Container — as above, with no border at the default flavour.
2. Header (always visible, not a slot) — background `--card-collapsible-header-background`; a leading [Caret Indicator](../atoms/caret-indicator.md) at `--card-collapsible-caret-size` (Icon large, unframed), then the heading block: a title row (`--card-collapsible-title-font` `--card-collapsible-title-foreground`, with an optional required asterisk in `--card-collapsible-required-foreground`, `--card-collapsible-title-gap` apart) above a description in `--card-collapsible-description-font` `--card-collapsible-description-foreground`, `--card-collapsible-heading-gap` between them.
3. Body (expanded only) — a slot holding any card parts, inset `--card-collapsible-body-padding` left, right and bottom, with nothing on top so it sits tight under the header.

## Variants
| Type | What it is |
|---|---|
| standard (default) | the shell with header, body and footer slots; static |
| collapsible | built-in header plus a body that opens and closes; no header or footer slot of its own |

Shape (both types): rounded (default) → `--card-container-radius-rounded`, with content clipped to the curve; sharp → `--card-container-radius-sharp`. Figma defaults to sharp; the system default is rounded. In the AAA modes the component is always sharp (DESIGN.md §5).

Collapsible flavour:
| Flavour | Outline |
|---|---|
| default | none; the card sits on its fill alone |
| gradient | `--card-collapsible-gradient-border-width` 129° linear gradient `--card-collapsible-gradient-border-start` → `--card-collapsible-gradient-border-end` on all four edges, drawn outside the content so the card grows by twice the width |

Standard layouts (ready-made templates):
| Layout | Header | Body | Footer |
|---|---|---|---|
| text (default) | heading with avatar and icon button | body text | one Button |
| media inset | heading with avatar and icon button | image, second heading, body text | actions |
| media | off | image, heading, body text | actions |

Footer actions:
| Actions | Contents |
|---|---|
| 1 (default) | one primary Button |
| 2 | an outline Button then a primary Button, `--card-footer-gap` apart |
| custom | a slot for any arrangement, items `--card-footer-gap` apart |

## States
| State | Applies to | What changes |
|---|---|---|
| static | standard | nothing; hover, focus and selection belong to the parts in the slots |
| collapsed | collapsible | header only; the caret shows its closed direction |
| expanded | collapsible | the body appears under the header and the caret flips; the header is unchanged |
| header hover | collapsible | header background → `--card-collapsible-header-background-hover` |
| header focused | collapsible | `--card-collapsible-focus-ring-width` `--card-collapsible-focus-ring-color` ring inside the header (a code note: Figma doesn't model the header's focus) |

Expanding and collapsing animate the body height and the caret rotation together over `--card-collapsible-transition-duration` `--card-collapsible-transition-easing`. Expanding roughly triples the card's height and everything below it moves, so lay a column out against the expanded height. Showing or hiding a standard card's header or footer is a property change, not an animation.

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

Width is fixed and set by the layout that places the card (drawn at 330 for the shell, 360 for the text and media inset templates, 394 for media, 385 for collapsible); height always hugs the content, so a card grows downward and never sideways. Long unbroken strings are clipped at the edge rather than widening the card. The gradient outline adds its width on every side, so a gradient collapsible card is slightly taller than a default one. No shadow: the border (standard) separates the card from the page.

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
| Required asterisk (collapsible) | on / off | off |
| Leading caret (collapsible) | on / off | on |

Each slot keeps its content when Shape changes. On a collapsible card the body content is held per expanded variant, so fill the variant you ship.

## Usage
- One topic per card. Put the title in the heading and the closing actions in the footer.
- Switch the header off for a media-led card so the image meets the top edge.
- Turn the footer off when the card is purely informational; there is no body toggle, so a card always reserves its body.
- Let cards grow downward. Cards in a grid should share width and structure so they compare easily.
- Use the gradient flavour on at most one card in a group; it exists to single one out.
- Use the collapsible type only when the body can genuinely be hidden; content that is always visible belongs in a standard card with a real footer.
- Don't make the whole card a click target if it also holds buttons; keep each action separately focusable.

## Accessibility
- The shell announces nothing; meaning comes from the parts in its slots. If the whole card is a link, that target and its focus treatment have to be built in code.
- Content is clipped at the card's edge, so check long strings at the fixed width.
- On a standard card the border is the only thing separating it from the page; check `--card-container-border-color` against the surface behind it.
- The collapsible header is the toggle: build it as a button with `aria-expanded` and `aria-controls`, give it the `--card-collapsible-focus-ring-width` `--card-collapsible-focus-ring-color` ring, and don't rely on the caret direction alone.
- Collapsed content must be hidden from assistive technology (not just visually) and available again when expanded.
- The gradient outline is decorative; it must not be the only marker of importance.
- Media layouts lead with an image that carries no text; give it alternative text or let the heading below describe it.

## Claude Prompt
Draw a Zebra card: a white (`--card-container-background`) rectangle with a `--card-container-border-width` light-grey (`--card-container-border-color`) border and softly rounded corners (`--card-container-radius-rounded`; square `--card-container-radius-sharp` when sharp), no shadow. At the top a heading row with `--card-heading-padding` padding: a small circular avatar, then a `--card-heading-title-font` near-black title over a `--card-heading-subtitle-font` grey subtitle, and a vertical "more" icon button on the right. Below, an optional full-width image, then a paragraph in `--card-body-font` grey (`--card-body-foreground`) with `--card-body-padding` padding, and a footer with `--card-footer-padding` padding holding a small blue primary button (`--button-primary-container-background-enabled`). A collapsible card instead shows a header with a large chevron on the left, a `--card-collapsible-title-font` title and a `--card-collapsible-description-font` grey description; when expanded the body slides open beneath it. The gradient version outlines the card with a `--card-collapsible-gradient-border-width` deep purple-to-navy gradient (`--card-collapsible-gradient-border-start` → `--card-collapsible-gradient-border-end`).
