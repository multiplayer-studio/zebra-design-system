---
name: Empty State
level: molecule
status: stable
composes: [../atoms/button.md]
tokens:
  empty-state-container-max-width: '{dimensions.dim-empty-state-max-width}'
  empty-state-illustration-height: '{spacing.spacing-11xl}'
  empty-state-illustration-margin-y: '{spacing.spacing-2xl}'
  empty-state-content-margin-top: '{spacing.spacing-large}'
  empty-state-title-font: '{typography.title-large}'
  empty-state-title-margin-top: '{spacing.spacing-6xl}'
  empty-state-title-margin-bottom: '{spacing.spacing-small}'
  empty-state-description-font: '{typography.body-small}'
  empty-state-description-foreground: '{colors.main-subtle}'
  empty-state-actions-margin-top: '{spacing.spacing-large}'
  empty-state-actions-gap: '{spacing.spacing-small}'
---

# Empty State

> Empty states are used to convey there is no data is available for display. Types include No results, First use, No Data, User Cleared.

## Anatomy
1. Container – centred column, max width `--empty-state-container-max-width`.
2. Illustration – a line illustration from the Zebra illustration set (e.g. server disconnect).
3. Title – short heading.
4. Description – one or two sentences.
5. Actions – secondary then primary [Button](../atoms/button.md) (flavors outline and primary, size medium; shape follows the Rounded property), side by side, centred. The buttons' own tokens govern their colours, states and radius.

## Variants
| Type | Notes |
|---|---|
| No results | Search / filter returned nothing |
| First use | Nothing created yet |
| No data | Source has no data |
| User cleared | User removed all items |

All types share one layout; they differ by illustration and copy. Per-type illustrations: to be defined.

## States
Static. Actions follow the Button's own states (e.g. primary `--button-primary-container-background-enabled` → hover `--button-primary-container-background-hover` → pressed `--button-primary-container-background-pressed`).

## Spacing & Sizing
| Property | Value |
|---|---|
| Max width | `--empty-state-container-max-width` |
| Illustration | height `--empty-state-illustration-height`, margin `--empty-state-illustration-margin-y` top/bottom, scaled to fit |
| Content block top margin | `--empty-state-content-margin-top` |
| Title | `--empty-state-title-font`, centred, margin-top `--empty-state-title-margin-top`, margin-bottom `--empty-state-title-margin-bottom` |
| Description | `--empty-state-description-font`, `--empty-state-description-foreground`, centred |
| Actions | margin-top `--empty-state-actions-margin-top`, gap `--empty-state-actions-gap`, centred |

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
- Give the illustration meaningful alt text or mark it decorative.

## Stitch Prompt
Draw a centred empty-state block no wider than `--empty-state-container-max-width`: a `--empty-state-illustration-height`-tall line illustration (e.g. a disconnected server), then a `--empty-state-title-font` near-black heading "No results found", `--empty-state-title-margin-bottom` below it a `--empty-state-description-font` grey (`--empty-state-description-foreground`) centred description, and `--empty-state-actions-margin-top` below that two buttons side by side `--empty-state-actions-gap` apart — a secondary outline button and a primary blue (`--button-primary-container-background-enabled`) button with `--button-container-radius-rounded` corners.
