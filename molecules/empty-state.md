---
name: Empty State
level: molecule
status: draft
composes: [../atoms/button.md]
tokens:
  # colour
  empty-state-title-foreground: '{colors.color-ink-high}'
  empty-state-description-foreground: '{colors.color-ink-medium}'
  # type
  empty-state-title-font: '{typography.type-title-large}'
  empty-state-description-font: '{typography.type-body-small}'
  # sizes
  empty-state-container-max-width: '{component-sizes.size-empty-state-max-width}'
  empty-state-illustration-height: '{primitives.scale-19}'
  empty-state-illustration-margin-y: '{space.space-xl}'
  empty-state-content-margin-top: '{space.space-lg}'
  empty-state-title-margin-top: '{space.space-3xl}'
  empty-state-title-margin-bottom: '{space.space-sm}'
  empty-state-actions-margin-top: '{space.space-lg}'
  empty-state-actions-gap: '{space.space-sm}'
---

# Empty State

> Empty states tell the user that no data is available to display, and what to do next. Types include No results, First use, No data and User cleared.

## Anatomy
1. Container — a centred column, at most `--empty-state-container-max-width` wide, text centred.
2. Illustration — a line illustration from the Zebra illustration set (e.g. a disconnected server), `--empty-state-illustration-height` tall, scaled to fit.
3. Title — a short heading, `--empty-state-title-font` `--empty-state-title-foreground`.
4. Description — one or two sentences, `--empty-state-description-font` `--empty-state-description-foreground`.
5. Actions — a secondary then a primary [Button](../atoms/button.md) (flavours outline and primary, size medium; shape follows the Rounded property), side by side and centred. The buttons' own tokens govern their colours, states and radius.

## Variants
| Type | When |
|---|---|
| No results | A search or filter returned nothing |
| First use | Nothing has been created yet |
| No data | The source has no data |
| User cleared | The user removed every item |

All types share one layout; they differ by illustration and copy. Per-type illustrations are still to be defined.

## States
Static. The actions follow the Button's own states; the empty state adds no motion.

## Spacing & Sizing
| Property | Token |
|---|---|
| Max width | `--empty-state-container-max-width` |
| Illustration | height `--empty-state-illustration-height`, margin `--empty-state-illustration-margin-y` above and below |
| Content block top margin | `--empty-state-content-margin-top` |
| Title | margin-top `--empty-state-title-margin-top`, margin-bottom `--empty-state-title-margin-bottom` |
| Actions | margin-top `--empty-state-actions-margin-top`, gap `--empty-state-actions-gap`; they wrap onto two lines when narrow |

The block centres itself in the empty area. Measurements are provisional: there is no Figma source yet.

In the AAA modes the component is always sharp (DESIGN.md §5).

## Properties
| Property | Options | Default |
|---|---|---|
| Type | no results, first use, no data, user cleared | — |
| Illustration | any illustration from the set | — |
| Title | text | none |
| Description | text | none |
| Primary action | button | none |
| Secondary action | button | none |
| Rounded | on / off | on |

## Usage
- Explain why the area is empty and what to do next; offer at most one primary and one secondary action.
- Keep the title short and the description to one or two sentences.
- For No results, echo the query and suggest a way out (clear filters, check spelling).
- Don't use an empty state for errors that need attention; use a banner.

## Accessibility
- Make the title a real heading at the right level for the page, so screen-reader users can find it.
- Give the illustration meaningful alt text, or mark it decorative when the title already says it all.
- `--empty-state-description-foreground` on the page background meets AA for body text.
- Button labels must make sense on their own ("Clear filters", not "OK").

## Stitch Prompt
Draw a centred empty-state block no wider than `--empty-state-container-max-width`: a `--empty-state-illustration-height`-tall line illustration (e.g. a disconnected server), then a `--empty-state-title-font` near-black heading "No results found", `--empty-state-title-margin-bottom` below it a `--empty-state-description-font` grey (`--empty-state-description-foreground`) centred description, and `--empty-state-actions-margin-top` below that two buttons side by side `--empty-state-actions-gap` apart — a secondary outline button and a primary blue button, both with gently rounded corners.
