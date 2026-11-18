---
name: Push To Talk Screen
level: template
status: draft
composes: [../../organisms/bottom-sheet.md, ../../organisms/navigation-bar.md, ../../organisms/navigation-rail.md, ../../organisms/top-app-bar.md, ../../molecules/inline-banner.md, ../../molecules/list-item.md, ../../molecules/menu-item.md, ../../molecules/push-to-talk.md, ../../atoms/icon-button.md]
---

# Push To Talk Screen

> A handheld screen for talking on a channel: the talk control as the focal organism, reachable without looking, with the active channel and who's speaking directly above it.

It embodies the push-to-talk screen type ([patterns 1.143](../../patterns/01-screen-composition.md)), the hold-to-talk control ([patterns 3.131](../../patterns/03-controls-interaction.md)) and its states ([patterns 4.95](../../patterns/04-states-feedback.md)). Used for walkie-talkie style group voice on handhelds and wearables.

## Anatomy

1. **Shell**: at compact, [Top App Bar](../../organisms/top-app-bar.md) type centered, title "Talk", its one trailing [Icon Button](../../atoms/icon-button.md) `volume_up` (volume); [Navigation Bar](../../organisms/navigation-bar.md) below with Talk as a destination. From medium up, the product's [Navigation Rail](../../organisms/navigation-rail.md).
2. **Recent** (optional): the last few transmissions as [List Item](../../molecules/list-item.md)s, Lines two, Action open (replay), Leading avatar, label the speaker, supporting text the time ([patterns 7.60](../../patterns/07-content-copy.md)), newest first. It sits above the talk group and scrolls.
3. **Talk group** (focal): the [Push To Talk](../../molecules/push-to-talk.md) control, low on the screen within the thumb's reach ([patterns 1.143](../../patterns/01-screen-composition.md)). It carries, top to bottom, the active channel with its member count and the Change channel icon button (Show Change channel on), who is speaking now, the talk control, its state in words, and the latch (Show Latch on, for hands-busy work) ([patterns 3.131](../../patterns/03-controls-interaction.md)). Its State follows the channel: ready, talking, receiving, busy, refused, or disabled with the reason ([patterns 4.95](../../patterns/04-states-feedback.md)). Change channel opens a [Bottom Sheet](../../organisms/bottom-sheet.md) content type list of [Menu Item](../../molecules/menu-item.md)s, the current channel selected.
4. **Hardware key hint**: one line under the talk group naming the device button that also talks ("Or hold the side PTT button"), on the edge nearest that button where the layout allows ([patterns 3.119](../../patterns/03-controls-interaction.md)).

States:
- **Can't connect**: the state reads "Not connected", with the reason and "Try again" as an [Inline Banner](../../molecules/inline-banner.md) appearance subtle, status error, at the top of the content; the talk control is State disabled and says why ([patterns 1.70](../../patterns/01-screen-composition.md)).
- **Incoming while elsewhere**: on other screens, an incoming transmission is a notice, not a takeover ([patterns 2.84](../../patterns/02-navigation-flow.md)); push-to-talk stays reachable from its hardware key and the system's ongoing notification ([patterns 2.63](../../patterns/02-navigation-flow.md)).

The composed components govern their own colours, states, sizes, radius and focus rings. The template only places them.

## Layout

```
┌──────────────────────────────────┐
│ 1 ≡       Talk             (vol) │
├──────────────────────────────────┤
│ 2 Recent (optional)              │
│   ◯ Sam  10:42                   │
│                                  │
│ 3    Dock team · 14 members  (⇄) │
│        ◯ Sam is speaking         │
│            ╭──────────╮          │
│            │   ptt    │          │
│            ╰──────────╯          │
│             Receiving            │
│           Latch  [ o]            │
│ 4   Or hold the side PTT button  │
├──────────────────────────────────┤
│ 1 Navigation Bar                 │
└──────────────────────────────────┘
```

- One column. The talk group sits at the bottom of the content, above the navigation, where the thumb rests; the channel and speaker are directly above the control inside it. Margins `--space-page`.
- The hardware key hint sits `--space-lg` below the talk group; the group sits at least `--space-2xl` from anything above it, so the control has clear space and nothing else is pressed by mistake ([patterns 5.82](../../patterns/05-sizes-devices.md)).
- The talk group stays put while the recent list scrolls above it. In a short window it joins the scroll, the last pinned region to give way ([patterns 5.52](../../patterns/05-sizes-devices.md)).

## Responsiveness

- **Compact** (below `--breakpoint-medium-min`): as above. In a short landscape window the header gives way first and the talk group last, joining the scroll rather than covering the list ([patterns 5.52](../../patterns/05-sizes-devices.md)).
- **Medium** (from `--breakpoint-medium-min`): margins `--grid-margin`, rail navigation. Two columns: recent on the leading side; the talk group on the trailing side, nearest the hand that holds the device ([patterns 5.63](../../patterns/05-sizes-devices.md)).
- **Expanded** (from `--breakpoint-expanded-min`): as medium, the talk column capped in width; extra width is empty.
- **Large** (from `--breakpoint-large-min`): as expanded. Push-to-talk on a console is rare; where it exists the talk control keeps its size and doesn't stretch.
- **Wearables**: see [Wearable Screen](wearable-screen.md); the talk control is the one action.
- **Touch**: the talk control is far above `--control-target-min` ([patterns 6.16](../../patterns/06-accessibility.md)); the Top App Bar's small icon buttons extend their hit area to it. Gloved products use `--control-target-gloved` for every other control on the screen.

## Accessibility

- **Landmarks and headings**: `header`, `main`, `nav`. One h1, "Talk": the Top App Bar's title at compact, the page heading from medium up. The channel name is the h2.
- **Focus order**: recent, then the talk group in its own order (change channel, talk control, latch). On arrival, focus goes to the talk control, where nearly everyone begins ([patterns 6.26](../../patterns/06-accessibility.md)).
- **Keyboard and assistive technology**: holding is a gesture with a duration, so the control also works as a toggle for assistive technology and keyboards: Space or Enter starts, and again stops ([patterns 6.84](../../patterns/06-accessibility.md)). The hardware key always does exactly what the on-screen control does ([patterns 2.77](../../patterns/02-navigation-flow.md)).
- **Names and announcements**: the control is named "Talk" with its state ("Talk, ready", "Talking, latched"); the channel icon button is named "Change channel". State changes are announced politely; refused and busy assertively. Every state has its own sound and haptic as well as the screen state, never sound alone ([patterns 6.70](../../patterns/06-accessibility.md), [patterns 4.95](../../patterns/04-states-feedback.md)).
- **Never colour alone**: states are words with icons; transmitting also changes the control's shape or label, not only its colour.

## Usage

- Use for a screen whose job is talking on a channel. A push-to-talk call that must persist while the person works elsewhere floats as a small element or lives on the hardware key ([patterns 1.119](../../patterns/01-screen-composition.md), [patterns 2.63](../../patterns/02-navigation-flow.md)).
- Always show whether the person can talk ([patterns 4.95](../../patterns/04-states-feedback.md)).
- Keep only one primary: the talk control. Channel switching and volume are secondary.
- Don't put anything frequently used next to the talk control; keep destructive actions (leave channel) out of the talk group, in the channel's details.
- Draft components, whose measurements are placeholders: Push To Talk, List Item.

Prototypes using this template: none yet.
