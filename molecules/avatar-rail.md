---
name: Avatar Rail
level: molecule
status: stable
composes: [../atoms/avatar.md]
tokens:
  # overlap
  avatar-rail-avatar-overlap-ratio: '{component-sizes.size-avatar-rail-overlap-ratio}'
  # cut-out stroke around each avatar
  avatar-rail-avatar-border-color: '{colors.color-line-inverse}'
  avatar-rail-avatar-border-width-xxxsmall: '{stroke.stroke-thin}'
  avatar-rail-avatar-border-width: '{stroke.stroke-thick}'
  # overflow counter
  avatar-rail-overflow-background: '{colors.color-status-neutral-faint}'
  avatar-rail-overflow-border-color: '{colors.color-line-default}'
  avatar-rail-overflow-radius: '{radius.radius-pill}'
  avatar-rail-overflow-label-foreground: '{colors.color-ink-high}'
  avatar-rail-overflow-label-font: '{typography.type-label-large}'
---

# Avatar Rail

> Shows a group of people as overlapping avatars, with a counter standing in for everyone who didn't fit.

## Anatomy
1. Avatar 1 and 2 — [Avatar](../atoms/avatar.md) positions that are always present. The rail never shows fewer than two people.
2. Avatar 3 and 4 (optional) — two more Avatar positions, each shown on its own, so a rail carries two, three or four people.
3. Overlap — each avatar covers `--avatar-rail-avatar-overlap-ratio` of the one beside it (a quarter of the diameter). A `--avatar-rail-avatar-border-color` stroke around each avatar cuts it away from the one beneath.
4. Overflow (optional) — a counter at the end, drawn by the rail rather than taken in as an Avatar, so it carries no person, photo or presence. It is a `--avatar-rail-overflow-radius` circle the size of an avatar, filled with `--avatar-rail-overflow-background` and edged in `--avatar-rail-overflow-border-color`. Its count ("+2") is in `--avatar-rail-overflow-label-foreground`.

The rail owns its avatars' appearance. It turns off every avatar's ring, close badge and status badge, and sets their size. Each avatar only chooses the person (photo, initials or icon, and swatch).

## Variants
**Stacking** changes only the paint order. Positions, diameters and the overlap all hold.

| Stacking | Paint order |
|---|---|
| start (default) | each avatar sits above the one after it, so the first person is shown whole and the group reads left to right |
| end | each avatar sits above the one before it, so the last position is shown whole and the counter sits on top of the stack |

## States
| State | Visual | Notes |
|---|---|---|
| static | as configured | the rail and its avatars have no hover, focus or pressed states |

Changing size, stacking or the people shown is a static swap with no transition.

## Spacing & Sizing
| Size | Avatar and overflow diameter | Stroke |
|---|---|---|
| xxxsmall | `--avatar-container-size-xxxsmall` | `--avatar-rail-avatar-border-width-xxxsmall` |
| xxsmall | `--avatar-container-size-xxsmall` | `--avatar-rail-avatar-border-width` |
| xsmall | `--avatar-container-size-xsmall` | `--avatar-rail-avatar-border-width` |
| small | `--avatar-container-size-small` | `--avatar-rail-avatar-border-width` |
| medium | `--avatar-container-size-medium` | `--avatar-rail-avatar-border-width` |
| large | `--avatar-container-size-large` | `--avatar-rail-avatar-border-width` |
| xlarge | `--avatar-container-size-xlarge` | `--avatar-rail-avatar-border-width` |
| xxlarge | `--avatar-container-size-xxlarge` | `--avatar-rail-avatar-border-width` |
| xxxlarge | `--avatar-container-size-xxxlarge` | `--avatar-rail-avatar-border-width` |

Every avatar in the rail takes the same diameter, so size is a decision about the group, not about any one person. The overlap scales with the diameter, so the rail reads the same at every size. The overflow's stroke follows the avatars' stroke step.

- Width hugs the content. The first position adds a full diameter, and each later one adds three quarters of a diameter. A full rail (four avatars and the counter) is four diameters wide, so dropping a position gives back exactly three quarters of one.
- The counter's text uses `--avatar-rail-overflow-label-font`, scaled with the diameter by the avatar's `--avatar-label-size-ratio`. The circle doesn't grow with its text, so keep the count short.

## Properties
| Property | Options | Default |
|---|---|---|
| Size | xxxsmall, xxsmall, xsmall, small, medium, large, xlarge, xxlarge, xxxlarge | xxxsmall |
| Stacking | start, end | start |
| Show Overflow | on / off | on |
| Max (code) | 2, 3, 4 | 4 |
| Avatars (code) | list of people | — |
| Show Avatar 3 / Show Avatar 4 (Figma) | on / off | on |
| Overflow Count (Figma) | text, e.g. +2 | +2 |

In code, Max sets how many avatars show. Everyone past Max is counted into the overflow, which shows the remainder, not the total: six people at Max 4 read +2, and at Max 3 read +3. The counter appears only when there are more people than Max. Figma sets the same things by hand with Show Avatar 3, Show Avatar 4 and Overflow Count.

## Usage
- Use the rail where the group matters more than the individuals. Where one person is the subject, use a single [Avatar](../atoms/avatar.md).
- Don't use the rail for one person. A group too big for four belongs in the counter, not in a longer rail.
- Keep Show Overflow on whenever the group is larger than the rail shows. Without the counter, a trimmed group reads as complete.
- Let Size move the whole rail. Don't size the avatars inside it individually.
- Keep the overlap. Spacing the avatars apart turns a group into a list of individuals.
- At xxxlarge the rail grows quickly. Check it still fits its column.

## Accessibility
- Give the rail one accessible name that states the whole group, counter included (e.g. "Crew on Route 7: Dana Moreno, Rosa Tan, Kofi Owusu, Lena Braun and 2 more"). A reader who gets only the avatars gets a smaller group than the real one.
- The counter is a bare number. Something has to say what it counts, because "+2" alone doesn't say two more people.
- Each avatar is part-covered by a quarter. Check initials still read at xxxsmall.
- The rail turns presence off on every avatar, so nothing can rely on presence here.
- Nothing in the rail is focusable or announces itself. Where people join or leave while someone is on the page, the surrounding structure has to report it.

## Stitch Prompt
Draw a Zebra avatar rail: four `--avatar-container-size-medium` circular avatars in a row, each overlapping the next by a quarter of its diameter, separated by a crisp white stroke (`--avatar-rail-avatar-border-color`, `--avatar-rail-avatar-border-width`). Some show photos and some show white initials on vivid swatches (purple `--avatar-purple-container-background`, blue, teal, coral), with no rings or badges. The first avatar sits on top of the second, and so on along the row. The rail ends with a same-sized overflow circle in very pale grey-blue (`--avatar-rail-overflow-background`) with a thin light-grey outline (`--avatar-rail-overflow-border-color`) and a dark "+2" (`--avatar-rail-overflow-label-foreground`) in medium-weight `--avatar-rail-overflow-label-font`.
