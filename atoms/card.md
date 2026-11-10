---
name: Card
level: atom
status: stable
composes: [../atoms/icon-button.md, ../atoms/button.md, ../atoms/avatar.md, ../atoms/icon.md]
tokens:
  card-container-radius-rounded: '{rounded.radius-minimal}'
  card-container-radius-sharp: '{rounded.radius-none}'
  card-container-border-width: '{border.border-size-small}'
  card-container-border-color: '{colors.border-default}'
  card-header-padding-y: '{spacing.spacing-small}'
  card-header-padding-x: '{spacing.spacing-large}'
  card-header-gap: '{spacing.spacing-medium}'
  card-header-headline-font: '{typography.title-medium}'
  card-header-subheadline-font: '{typography.body-small}'
  card-header-icon-foreground: '{colors.main-default}'
  card-body-padding-y: '{spacing.spacing-medium}'
  card-body-padding-x: '{spacing.spacing-large}'
  card-body-font: '{typography.body-small}'
  card-body-foreground: '{colors.main-subtle}'
  card-footer-padding: '{spacing.spacing-large}'
  card-footer-gap: '{spacing.spacing-medium}'
  # sectioned (card container)
  card-sectioned-frame-border-width: '{border.border-size-medium}'
  card-sectioned-frame-border-color: '{card.card-container-border-color}'
  card-sectioned-frame-radius: '{spacing.spacing-medium}'
  card-sectioned-container-radius-inset: '{border.border-size-small}'
  card-sectioned-container-background: '{colors.surface-default}'
  card-sectioned-title-font: '{typography.title-large}'
  card-sectioned-title-foreground: '{colors.main-default}'
  card-sectioned-subtitle-font: '{typography.title-medium}'
  card-sectioned-subtitle-foreground: '{colors.main-subtle}'
  card-sectioned-required-foreground: '{colors.main-negative}'
  card-sectioned-content-padding: '{spacing.spacing-2xl}'
  card-sectioned-header-background-hover: '{colors.surface-hover}'
  card-sectioned-ai-frame-gradient-start: '{dimensions.dim-card-container-ai-gradient-start}'
  card-sectioned-ai-frame-gradient-end: '{dimensions.dim-card-container-ai-gradient-end}'
  card-sectioned-ai-frame-gradient-end-stop: '{dimensions.dim-card-container-ai-gradient-end-stop}'
  card-sectioned-content-duration: '{motion.motion-slow}'
  card-sectioned-content-easing: '{motion.easing-standard}'
---

# Card

> Cards are surfaces that display content and actions on a single topic. They help group related information and make it easier to scan, compare, and take action.

## Anatomy
1. Card — outlined surface stacking the parts below.
2. Header — row: leading content (e.g. [avatar](../atoms/avatar.md)/icon) + headline / sub-headline, and trailing actions: [Icon Button](../atoms/icon-button.md), flavor text, size medium (e.g. `more_vertical`). Its tokens govern the button; the card keeps one context override, `--card-header-icon-foreground`, which draws the icon in the default dark colour instead of the text flavor's primary colour so header actions stay neutral.
3. Media (optional) — e.g. an image block.
4. Body — supporting text.
5. Footer — action row of [Buttons](../atoms/button.md), size medium (`--button-container-height-medium`); the main action is flavor primary.

## Variants
| Shape | Card radius |
|---|---|
| rounded (default) | `--card-container-radius-rounded` |
| sharp | `--card-container-radius-sharp` |

**Card container** (sectioned variant, a richer container): `--card-sectioned-frame-border-width` outer frame in `--card-sectioned-frame-border-color` (the card's border colour; radius `--card-sectioned-frame-radius`) around an inner card with radius `--card-sectioned-frame-radius` − `--card-sectioned-container-radius-inset` and `--card-sectioned-container-background` background; title `--card-sectioned-title-font` in `--card-sectioned-title-foreground`, subtitle `--card-sectioned-subtitle-font` in `--card-sectioned-subtitle-foreground`, optional required asterisk `--card-sectioned-required-foreground`; header/content padding `--card-sectioned-content-padding` − `--card-sectioned-frame-border-width`. It can be collapsible: a chevron [Icon](../atoms/icon.md) at the default `--icon-size` turns to point sideways when collapsed, and the header tints to `--card-sectioned-header-background-hover` on hover. The AI variant gives the frame a gradient from `--card-sectioned-ai-frame-gradient-start` to `--card-sectioned-ai-frame-gradient-end` (stop at `--card-sectioned-ai-frame-gradient-end-stop`). Expand/collapse animates over `--card-sectioned-content-duration` `--card-sectioned-content-easing`.

## States
The base card is static; interactivity lives in its children (icon button, buttons). A collapsible card container header tints to `--card-sectioned-header-background-hover` on hover.

## Spacing & Sizing
| Part | Property | Token |
|---|---|---|
| Card | border | `--card-container-border-width` solid `--card-container-border-color` |
| Header | padding | `--card-header-padding-y` / `--card-header-padding-x` |
| Header | gap | `--card-header-gap` |
| Header | headline | `--card-header-headline-font` |
| Header | sub-headline | `--card-header-subheadline-font` |
| Header | trailing icon button | [Icon Button](../atoms/icon-button.md) text flavor, medium; icon override `--card-header-icon-foreground` |
| Body | padding | `--card-body-padding-y` / `--card-body-padding-x` |
| Body | text | `--card-body-font`, `--card-body-foreground` |
| Footer | padding | `--card-footer-padding` |
| Footer | gap | `--card-footer-gap` |
| Footer | non-text buttons | share the row width equally |

## Properties
| Property | Options | Default |
|---|---|---|
| Rounded | on / off | on |
| Headline | text | — |
| Sub-headline | text | — |
| Leading content | avatar, icon | none |
| Trailing actions | icon buttons | none |
| Body | text | — |
| Footer actions | buttons | none |

## Usage
- One topic per card; keep header text short and put the primary action in the footer.
- Text-flavor footer buttons keep their natural width; other flavors stretch to fill the row.
- Cards in a grid should share widths and structure so they are easy to compare.
- Don't make the whole card a click target if it also contains buttons; keep each action separately focusable.

## Stitch Prompt
Draw a Zebra card: a white rectangle with a `--card-container-border-width` light-grey (`--card-container-border-color`) border and `--card-container-radius-rounded` corners. At the top, a header row with `--card-header-padding-y` vertical and `--card-header-padding-x` horizontal padding containing a `--card-header-headline-font` headline above a `--card-header-subheadline-font` sub-headline, and a dark vertical "more" icon button on the right. Below, an optional full-width image area, then a body paragraph in `--card-body-font` grey (`--card-body-foreground`) text with `--card-body-padding-y`/`--card-body-padding-x` padding, and finally a footer with `--card-footer-padding` padding holding a full-width blue primary button (`--button-primary-container-background-enabled`, `--button-container-height-medium` tall).
