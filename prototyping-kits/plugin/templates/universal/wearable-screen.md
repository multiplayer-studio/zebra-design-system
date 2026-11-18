---
name: Wearable Screen
level: template
status: draft
composes: [../../atoms/button.md, ../../atoms/icon.md]
---

# Wearable Screen

> A screen for a wrist- or head-worn device: one item and one action at a time, with the item's status as its largest element, read in a glance and acted on with one tap or one key.

It embodies the wearable screen type ([patterns 1.145](../../patterns/01-screen-composition.md)), the round smartwatch rules ([patterns 5.64](../../patterns/05-sizes-devices.md)), the wrist-mounted computer ([patterns 5.77](../../patterns/05-sizes-devices.md)) and data as a glance ([patterns 10.97](../../patterns/10-data-display.md)). Used for task alerts, pick confirmations, push-to-talk and status checks on smartwatches, wrist-mounted computers and head-worn displays.

## Anatomy

1. **Time** (smartwatch): the time at the top of every screen except brief overlays ([patterns 5.64](../../patterns/05-sizes-devices.md)).
2. **Status** (largest element) ([patterns 1.145](../../patterns/01-screen-composition.md)): an [Icon](../../atoms/icon.md) size large for the state (`check_circle`, `warning`, `error`, `info`) and the status word in the screen's largest type role ("Ready", "Low battery", "Pick now"). The word always shows with the icon; colour supports them.
3. **Item**: the one thing the screen is about, its name on one or two lines and one fact ("Aisle 4, bin 3", "Qty 6"). Codes in the Key Value List mono value style.
4. **Action**: one [Button](../../atoms/button.md) flavour primary, size large, with icon and label ("Confirm"). A screen that asks for a decision shows the question first, with its two choices directly beneath it: [Button](../../atoms/button.md) flavour outline then primary, side by side on a round watch, never more than two text buttons in a row ([patterns 5.64](../../patterns/05-sizes-devices.md)). An irreversible choice confirms on the paired handheld instead ([patterns 2.67](../../patterns/02-navigation-flow.md)).
5. **More** (optional, below the action, reached by scrolling): one [Button](../../atoms/button.md) flavour text, "Open on handheld", which hands off to a larger device with the person's place kept ([patterns 5.4](../../patterns/05-sizes-devices.md), [patterns 2.67](../../patterns/02-navigation-flow.md)).

States:
- **Waiting for work**: the status reads "No tasks" and the screen is otherwise empty; nothing invents a task to show.
- **Incoming item**: a new item replaces the screen only when the current one is done or is safety-related; otherwise it waits as a count on the status ("2 waiting") ([patterns 2.84](../../patterns/02-navigation-flow.md)).
- **Disconnected from the handheld**: the status reads "Not connected" with the reason, and actions that need the connection are unavailable with that reason ([patterns 4.72](../../patterns/04-states-feedback.md)).

The composed components govern their own colours, states, sizes, radius and focus rings. The template only places them.

## Layout

```
Round smartwatch               Wrist-mounted (short, wide)
      ╭──────────╮             ┌───────────────────────────────┐
    ╭─┤  10:42   ├─╮           │ 2 ✓ Pick now     3 Aisle 4·B3 │
   │  2 ⚠          │           │     (largest)       Qty 6     │
   │  Low battery  │           │                   4 [Confirm] │
   │ 3 Scanner 044 │           └───────────────────────────────┘
   │ 4 [ Confirm ] │
    ╰─────────────╯
```

- **Round smartwatch**: one column, centred, scrolling vertically only ([patterns 5.64](../../patterns/05-sizes-devices.md)). The outer margin is a share of the screen so content clears the curve; the gap between elements stays fixed at `--space-sm` ([patterns 5.58](../../patterns/05-sizes-devices.md)). The status and action fit on the first screen without scrolling; anything else is below.
- **Wrist-mounted computer** (a short, wide window): two columns. Status and item on the leading side; the action on the trailing side within reach of the other hand's thumb, mirrored when the device is worn on the other arm ([patterns 5.77](../../patterns/05-sizes-devices.md)). Margins `--space-page`, columns `--space-xl` apart.
- **Head-worn display**: the status and item only, at the edge of view; the action is a key or voice command shown in words beside it.

## Responsiveness

These are fixed screens, not size classes; each is designed for its own screen.

- **Round smartwatch**: designed for the smallest round screen first, with one size step for the larger watch ([patterns 5.64](../../patterns/05-sizes-devices.md)). The larger watch shows more of the same column, never a second column.
- **Wrist-mounted computer**: the same layout in either wearing arm, mirrored so the action stays on the side of the free hand ([patterns 5.77](../../patterns/05-sizes-devices.md)); the screen keeps its orientation when the arm turns to scan ([patterns 5.44](../../patterns/05-sizes-devices.md)).
- **Head-worn display**: one fixed layout at the edge of view.
- **Larger screens**: this template doesn't scale up. The same task on a handheld uses [Work Through Items](work-through-items.md) or the product's own screen; the wearable hands off to it with the person's place kept ([patterns 5.4](../../patterns/05-sizes-devices.md)).
- **Touch**: every target meets `--control-target-min`; on gloved wrist-mounted products, `--control-target-gloved` ([patterns 6.16](../../patterns/06-accessibility.md), [patterns 6.19](../../patterns/06-accessibility.md)). Buttons sit far enough apart that one smeared touch can't hit two ([patterns 5.82](../../patterns/05-sizes-devices.md)).
- **Input**: a paired ring scanner is the wrist-mounted computer's main input; a scan completes the step the instruction names ([patterns 3.112](../../patterns/03-controls-interaction.md)). Every key action has its on-screen control ([patterns 6.86](../../patterns/06-accessibility.md)), and on devices without touch every destination is reachable with the keys, in screen order ([patterns 2.89](../../patterns/02-navigation-flow.md)).

## Accessibility

- **Headings**: the status word is the screen's heading.
- **Focus order**: status, item, action, more. On arrival, focus goes to the action, where nearly everyone begins ([patterns 6.26](../../patterns/06-accessibility.md)).
- **Names and announcements**: the action is named for what it does ("Confirm pick"). A new item or status change is announced politely; safety items assertively ([patterns 6.54](../../patterns/06-accessibility.md)).
- **Never haptic or sound alone**: every alert pairs a haptic with the visual change and the words ([patterns 5.64](../../patterns/05-sizes-devices.md), [patterns 6.70](../../patterns/06-accessibility.md)); never colour alone.
- **Time and text size**: nothing times out while the person reads it ([patterns 6.74](../../patterns/06-accessibility.md)); text follows the device's text setting at its largest.

## Usage

- Use for one or two tasks each done in seconds ([patterns 5.64](../../patterns/05-sizes-devices.md)). Exploring, editing and setup move to a larger device ([patterns 2.67](../../patterns/02-navigation-flow.md)).
- One item and one action per screen ([patterns 1.145](../../patterns/01-screen-composition.md)). Never a list of actions; never a form.
- Show data as one value and its state ([patterns 10.97](../../patterns/10-data-display.md)); charts and tables belong on the handheld or console.
- On a vehicle-mounted or moving context, follow the safe-while-moving rule ([patterns 1.134](../../patterns/01-screen-composition.md)).
- No draft components.

Prototypes using this template: none yet.
