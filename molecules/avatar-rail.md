---
name: Avatar Rail
level: molecule
status: stable
composes: [../atoms/avatar.md]
tokens:
  avatar-rail-container-gap: '{spacing.spacing-small}'
---

# Avatar Rail

> A rail containing 0 or more Avatars that can be scrolled horizontally.

## Anatomy
1. Rail – horizontal row, scrolls sideways when wider than its container.
2. Avatars – [Avatar](../atoms/avatar.md) items only; the avatar governs size, colour, content and close badge.
3. Close badge (optional) – each avatar's own close badge, shown when close is on.

## Variants
The rail size is passed to every avatar (Avatar size property) unless an avatar sets its own.

| Size | Avatar diameter |
|---|---|
| xxxs | `--avatar-container-size-xxxs` |
| xxs | `--avatar-container-size-xxs` |
| xs | `--avatar-container-size-xs` |
| s | `--avatar-container-size-s` |
| m | `--avatar-container-size-m` |
| l | `--avatar-container-size-l` |
| xl | `--avatar-container-size-xl` |
| xxl | `--avatar-container-size-xxl` |
| xxxl | `--avatar-container-size-xxxl` |

## States
| State | Appearance |
|---|---|
| default | avatars only |
| show close | Avatar close badge on each avatar (Avatar "Close badge" on) |

Avatar fill and initials follow the Avatar defaults (`--avatar-purple-container-background`, `--avatar-content-foreground`).

## Spacing & Sizing
| Property | Value |
|---|---|
| Gap between avatars | `--avatar-rail-container-gap` |
| Width | fits content, max full container width (overflow scrolls horizontally) |
| Height | avatar size |

## Properties
| Property | Options | Default |
|---|---|---|
| Size | xxxs, xxs, xs, s, m, l, xl, xxl, xxxl | each avatar's own size |
| Show close | on / off | off |

## Usage
- Use to show a set of selected people (e.g. recipients) that can be removed.
- Individual avatars can override the rail size / show close.
- Close buttons need accessible names (e.g. "Remove <name>"); avoid sizes below `--avatar-container-size-s` when close is the main interaction on touch.

## Stitch Prompt
Draw a horizontally scrolling row of `--avatar-container-size-m` circular avatars spaced `--avatar-rail-container-gap` apart, some with profile photos and some deep purple (`--avatar-purple-container-background`) with off-white (`--avatar-content-foreground`) uppercase initials. Each avatar has a small grey (`--avatar-close-badge-background`) circular close badge with a white "x" overlapping its top-right edge, outlined in white (`--avatar-close-badge-border-color`).
