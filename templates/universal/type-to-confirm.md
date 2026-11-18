---
name: Type To Confirm
level: template
status: draft
composes: [../../organisms/dialog.md, ../../molecules/input.md, ../../molecules/key-value-list.md, ../../atoms/button.md]
---

# Type To Confirm

> A confirmation for the rarest and most dangerous actions: it names the action, the object and the consequence with specifics, and asks the person to type the object's name or a stated word before the destructive button acts.

It embodies the step that can't happen out of habit ([patterns 3.88](../../patterns/03-controls-interaction.md), [patterns 7.47](../../patterns/07-content-copy.md)) and the confirmation copy rules ([patterns 7.44](../../patterns/07-content-copy.md), [patterns 7.45](../../patterns/07-content-copy.md), [patterns 7.46](../../patterns/07-content-copy.md)). Used for deleting a site, tenant or fleet group, wiping devices, rolling back a whole fleet, and anything irreversible that reaches many people or devices.

## Anatomy

1. **Dialog**: a [Dialog](../../organisms/dialog.md) flavour warning, Show Close on, over the screen it came from ([patterns 1.117](../../patterns/01-screen-composition.md)).
2. **Title**: a question about this specific action, with the object and count ("Delete site Dock 4?", "Wipe 48 devices at Site 4?") ([patterns 7.44](../../patterns/07-content-copy.md)). Never "Are you sure?".
3. **Body**: what will happen, with specifics (names, counts, who's affected), and that it can't be undone ([patterns 7.45](../../patterns/07-content-copy.md)). Where the action reaches many objects, the count and scope, and that offline devices will be queued ([patterns 3.135](../../patterns/03-controls-interaction.md)). Optionally, a [Key Value List](../../molecules/key-value-list.md) of what goes with it ("Devices 48", "Users 112", "Open tasks 9").
4. **Typed confirmation**: an [Input](../../molecules/input.md) type text, size medium, label "Type Dock 4 to confirm", hint "Type the name as shown". The stated text is the object's name, or a stated word or count for many objects ("Type 48"). It shows the text to type in full, never truncated.
5. **Footer**: Actions custom. Right action slot: [Button](../../atoms/button.md) flavour outline-subtle "Cancel", then [Button](../../atoms/button.md) flavour negative repeating the action verb ("Delete site", "Wipe 48 devices") ([patterns 7.46](../../patterns/07-content-copy.md), [patterns 1.81](../../patterns/01-screen-composition.md)).
6. **Error** (on pressing the destructive button without the right text): the field shows an error line with icon and words, between hint and input: "Type Dock 4 exactly to confirm" ([patterns 1.64](../../patterns/01-screen-composition.md)). The button stays enabled and validates on press, so it's never a dead control.
7. **Busy and result**: once confirmed, the destructive button shows its busy state until the result is known ([patterns 4.15](../../patterns/04-states-feedback.md)); the result follows [Batch Result](batch-result.md) for many objects, or returns to the parent screen with the object gone and a message saying so ([patterns 4.30](../../patterns/04-states-feedback.md)).

The composed components govern their own colours, states, sizes, radius and focus rings. The template only places them.

## Layout

```
┌──────────────────────────────────────────┐
│ 1 ⚠  Delete site Dock 4?             (✕) │
│ 3 Deleting Dock 4 removes 48 devices,    │
│   112 users and 9 open tasks from it.    │
│   This can't be undone.                  │
│   Devices 48 · Users 112 · Tasks 9       │
│ 4 Type Dock 4 to confirm                 │
│   Type the name as shown                 │
│   [                                  ]   │
│ 5               [Cancel] [Delete site]   │
└──────────────────────────────────────────┘
```

- The dialog's own padding and footer layout apply. Inside the body, the paragraph, the Key Value List and the field sit `--space-lg` apart.
- The destructive button stays apart from Cancel by the footer's own gap and is never the default button ([patterns 1.81](../../patterns/01-screen-composition.md)).

## Responsiveness

- **Compact** (below `--breakpoint-medium-min`): the dialog becomes a full screen with its title at the top and the footer pinned to the bottom, stacked full width with the primary on top ([patterns 1.112](../../patterns/01-screen-composition.md), [patterns 1.77](../../patterns/01-screen-composition.md)). When the keyboard opens, the field and the footer stay together above it ([patterns 5.55](../../patterns/05-sizes-devices.md)).
- **Medium** (from `--breakpoint-medium-min`): a centred dialog ([patterns 1.112](../../patterns/01-screen-composition.md)).
- **Expanded** (from `--breakpoint-expanded-min`): a centred dialog, never wider than its own maximum.
- **Large** (from `--breakpoint-large-min`): as expanded.
- **Touch**: every target meets `--control-target-min` ([patterns 6.16](../../patterns/06-accessibility.md)). The size medium field and buttons and the ✕ are drawn smaller and extend their hit area to it ([Button](../../atoms/button.md)); gloved products use `--control-target-gloved`.

## Accessibility

- **Structure**: a modal dialog; its title is its accessible name and the body is its description.
- **Focus**: on open, focus goes to the field. It can't commit anything by itself, so focus still never starts on the destructive action ([patterns 6.28](../../patterns/06-accessibility.md)), and Enter in the field doesn't press the destructive button, which is never the default ([patterns 1.81](../../patterns/01-screen-composition.md)). Tab stays inside the dialog; Escape and ✕ close it and keep anything typed, Cancel discards ([patterns 6.28](../../patterns/06-accessibility.md)). On close, focus returns to the control that opened it ([patterns 6.29](../../patterns/06-accessibility.md)).
- **Input**: matching ignores case and spaces at either end; paste isn't blocked. Autocorrect is off ([patterns 3.40](../../patterns/03-controls-interaction.md)).
- **Names and announcements**: ✕ is named "Close". The error is announced when it appears and is tied to the field. The busy state and the result are announced politely ([patterns 6.53](../../patterns/06-accessibility.md)).
- **Never colour alone**: the warning flavour has its glyph and the title says what will happen; the error has its icon and words; the destructive button names its action.
- **Assistive technology**: the step is the same for everyone; nothing in it depends on sight, timing or a gesture.

## Usage

- Use only for the rarest, most dangerous actions ([patterns 3.88](../../patterns/03-controls-interaction.md)); if people see it often, it stops working. A reversible action acts at once with Undo instead, and an ordinary irreversible one uses a plain confirmation dialog ([patterns 3.86](../../patterns/03-controls-interaction.md)).
- A safety action that must not trigger by accident uses a hold, not typing ([patterns 3.91](../../patterns/03-controls-interaction.md)).
- The title, body and button all name the same action and object; the body doesn't explain the buttons ([patterns 7.46](../../patterns/07-content-copy.md)).
- No draft components other than Key Value List, whose measurements are placeholders.

Prototypes using this template: none yet.
