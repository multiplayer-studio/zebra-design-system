# Avatar Rail

> Shows a group of people as overlapping avatars, with an optional counter standing in for everyone who did not fit. Up to four avatars are carried, the first two always and the last two by choice, and Size moves the whole rail together rather than any single avatar. Reach for it where the group matters more than the individuals, and for a single Avatar where one person is the subject.

**Implementations:** `@zebra-design-system/react-baseui` · `@zebra-design-system/web-components` · `@zebra-fed/zeta-web` (`<zeta-avatar-rail>`)

## API

| Prop | Type | Default | Values | Notes |
|---|---|---|---|---|
| `size` | enum | `xxxsmall` | `xxxsmall` `xxsmall` `xsmall` `small` `medium` `large` `xlarge` `xxlarge` `xxxlarge` | Values listed by rendered width. Figma stores them in creation order (medium first). |
| `stacking` | enum | `start` | `start` `end` |  |
| `max` | number | `4` |  |  |
| `showOverflow` | boolean | `true` |  |  |
| `overflowCount` | string | `+2` |  |  |
| `showAvatar3` | boolean | `true` |  |  |
| `showAvatar4` | boolean | `true` |  |  |

## When and how to use

### Do

- Keep Show Overflow on whenever the group is larger than the rail shows. Without the counter a trimmed group reads as the whole group.
- Let Size move the whole rail. Every avatar takes the same diameter, so the step is a decision about the group and not about any one person in it.

### Don't

- Don't reach for the rail to show one person. A single Avatar is the component for that, and a rail of one has an overlap that never happens.

## States

| State | Trigger | What changes |
|---|---|---|
| Static | — |  |
| Stacking | The Stacking value |  |

## Behaviour

- **Motion** — No transition is defined. Changing Size or Stacking is a static swap.
- **Overlap** — The quarter diameter overlap is what makes the rail read as one group rather than a row of separate avatars. Spacing them apart turns the same content into a list of individuals.
- **Composition limits** — Four positions and a counter, with the first two always present. A group of one belongs in a single Avatar, and a group too large for four belongs in the counter rather than in a longer rail.

## Content

| Part | Kind | Guidance |
|---|---|---|
| Avatar slots | nested Avatar | Up to four positions, each an Avatar, the first two always present. In code Max sets how many show (2 to 4); in Figma, Show Avatar 3 and Show Avatar 4 do. |
| Avatar properties | parent owned | The rail turns off the ring and the dismiss badge on every avatar and surfaces none of Avatar's own properties except the status badge. The person shown is set on the nested avatar, and everything else is left to the rail so the group stays uniform. Avatar Metadata covers what an Avatar offers on its own terms. |
| Overflow | drawn | A circle at the end of the rail, drawn by the rail rather than taken in. It is not an Avatar, so it carries no person, no photo and no presence. |
| Overflow Count | text property (Figma only) | Figma only, typed by hand through Overflow Count. In code the count is generated from Max and the avatars passed in, so there is no count to set. Keep it short, because the circle holding it does not grow. |

## Layout & theming

| Property | Sizing | Guidance |
|---|---|---|
| Size | Fixed per Size | Nine steps, 24, 32, 36, 40, 48, 60, 80, 120 and 200 square. Every avatar in the rail takes the same diameter, so the step is a decision about the group rather than about any one person in it. |
| Overlap | Derived from Size | Each avatar sits over the one before it by a quarter of a diameter, from 6 at the smallest step to 50 at the largest. The overlap scales with the avatar rather than holding one fixed value, so the rail reads the same at every size. |
| Overall width | Hug | Four times the diameter when all five positions are filled, from 96 at the smallest to 800 at the largest. Each position after the first adds three quarters of a diameter, so dropping one takes exactly that much back. |
| Overflow | Fixed | A circle matching the avatar diameter, at radius/pill on feedback/neutral/background/subtle. It does not grow with its text, so a longer count has to fit the circle rather than widen it. |
| Count | Scales with Size | Centred in the overflow circle and scaling with the rail rather than holding one size across the nine steps. |
| Paint order | Per Stacking | start paints each avatar above the one after it and end reverses that. Nothing moves and nothing resizes, only which edge of each avatar is the covered one. |

## Accessibility

- The rail is a group and the counter at the end is part of what it says. A reader who gets only the avatars gets a smaller group than the real one.
- The counter is a bare number. Something has to say what it counts, because +2 on its own does not say two more people.
- Avatars overlap by a quarter, so part of each one is always covered. Check initials still read at the smallest step, where the diameter is 24.
- The rail turns the presence badge off on every avatar, so presence is not available here. Anything depending on it needs a different arrangement.
- Nothing in the rail is focusable and nothing announces itself. Where people join or leave the group while a person is on the page, the structure around it has to report that.

---
*Generated from `specs/avatar-rail` — do not edit by hand. Theming: put `mode-dark`, `ext-companion`, `ext-target` or `bp-*` classes on any ancestor (Zeta Web uses `data-theme`/`data-brand` attributes instead).*
