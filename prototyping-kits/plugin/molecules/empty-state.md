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
  # compact
  empty-state-compact-title-font: '{typography.type-title-small}'
  empty-state-compact-title-margin-top: '{space.space-none}'
  empty-state-compact-actions-margin-top: '{space.space-sm}'
---

# Empty State

> Replaces empty content in place, saying why it is empty and what to do next. Types: First use, No results, All done, Can't show and No permission.

## Anatomy
1. Container — a centred column, at most `--empty-state-container-max-width` wide, text centred.
2. Illustration — a line illustration from the Zebra illustration set (e.g. a disconnected server), `--empty-state-illustration-height` tall, scaled to fit.
3. Title — a short heading, `--empty-state-title-font` `--empty-state-title-foreground`.
4. Description — one or two sentences, `--empty-state-description-font` `--empty-state-description-foreground`.
5. Actions — a secondary then a primary [Button](../atoms/button.md) (flavours outline and primary, size medium; shape follows the Rounded property), side by side and centred. The buttons' own tokens govern their colours, states and radius. The primary counts toward the screen's one primary; where the screen already has one, use outline only.

## Variants
| Type | When | Says and offers ([patterns 7.42](../patterns/07-content-copy.md)) |
|---|---|---|
| First use | Nothing has been created yet | What this area is for, and the create action itself ([patterns 4.8](../patterns/04-states-feedback.md)) |
| No results | A search or filter found nothing | Names the search or filter that found nothing, with a way to clear it. The search and filters stay visible beside it ([patterns 4.7](../patterns/04-states-feedback.md)) |
| All done | Everything has been finished | Acknowledges the finished work; a positive state ([patterns 4.9](../patterns/04-states-feedback.md)) |
| Can't show | Data exists but can't be shown (an error) | Why, and who can help, with a Retry action where retrying could work ([patterns 4.11, 4.36](../patterns/04-states-feedback.md)) |
| No permission | The person can't see this content | Why, and how to get access; never a generic error, and never Retry ([patterns 4.10](../patterns/04-states-feedback.md), [7.40](../patterns/07-content-copy.md)) |

All types share one layout; they differ by illustration and copy. Per-type illustrations are still to be defined.

Compact (on) is for small areas, several of which may be empty at once: text only, no illustration, the title in `--empty-state-compact-title-font` with `--empty-state-compact-title-margin-top` above it, and at most one low-emphasis action (Button text or outline, small) `--empty-state-compact-actions-margin-top` below ([patterns 4.12](../patterns/04-states-feedback.md)).

## States
Static. The actions follow the Button's own states; the empty state adds no motion. It appears only after loading has finished, never while the area is still loading ([patterns 4.1](../patterns/04-states-feedback.md)).

## Spacing & Sizing
| Property | Token |
|---|---|
| Max width | `--empty-state-container-max-width` |
| Illustration | height `--empty-state-illustration-height`, margin `--empty-state-illustration-margin-y` above and below |
| Content block top margin | `--empty-state-content-margin-top` |
| Title | margin-top `--empty-state-title-margin-top`, margin-bottom `--empty-state-title-margin-bottom` |
| Actions | margin-top `--empty-state-actions-margin-top`, gap `--empty-state-actions-gap`; they wrap onto two lines when narrow |
| Compact | no illustration; title `--empty-state-compact-title-font`, margin-top `--empty-state-compact-title-margin-top`; one action, margin-top `--empty-state-compact-actions-margin-top` |

The block centres itself in the empty area. Measurements are provisional: there is no Figma source yet.

In the AAA modes the component is always sharp (DESIGN.md §5).

## Properties
| Property | Options | Default |
|---|---|---|
| Type | first use, no results, all done, can't show, no permission | — |
| Illustration | any illustration from the set | — |
| Title | text | none |
| Description | text | none |
| Primary action | button | none |
| Secondary action | button | none |
| Compact | on / off | off |
| Rounded | on / off | on |

## Usage
- It replaces the empty content in place; the header, navigation, search, filters and actions stay ([patterns 4.6](../patterns/04-states-feedback.md)).
- Say why the area is empty and what to do next, as a button where one exists ([patterns 7.41](../patterns/07-content-copy.md)). Offer at most one primary and one secondary action.
- Title, body and action wording follow [patterns 7.43](../patterns/07-content-copy.md): a short sentence-case title, one or two sentences, a one- or two-word verb.
- No results names the query (No results for "Zebra ZT411") and offers Clear filters.
- Data that exists but can't be shown is Can't show, never an empty type such as No results. A problem with one page or section that leaves content showing is an [Inline Banner](inline-banner.md).
- Use Compact wherever several small areas could be empty at once, so each doesn't repeat an illustration and a primary button.

## Accessibility
- Make the title a real heading at the right level for the page, so screen-reader users can find it.
- Give the illustration meaningful alt text, or mark it decorative when the title already says it all.
- `--empty-state-description-foreground` on the page background meets AA for body text.
- Button labels must make sense on their own ("Clear filters", not "OK").
- A No results count or a Can't show that replaces content after a search or refresh is announced without moving focus ([patterns 6.53](../patterns/06-accessibility.md)).

## Claude Prompt
Draw a centred empty-state block no wider than `--empty-state-container-max-width`: a `--empty-state-illustration-height`-tall line illustration (e.g. a disconnected server), then a `--empty-state-title-font` near-black heading No results for "ZT411", `--empty-state-title-margin-bottom` below it a `--empty-state-description-font` grey (`--empty-state-description-foreground`) centred description, and `--empty-state-actions-margin-top` below that two buttons side by side `--empty-state-actions-gap` apart — a secondary outline button and a primary blue button, both with gently rounded corners. A compact version has no illustration, a smaller `--empty-state-compact-title-font` title and one small text button.
