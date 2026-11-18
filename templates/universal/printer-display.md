---
name: Printer Display
level: template
status: draft
composes: [../../molecules/menu-item.md, ../../atoms/icon.md, ../../atoms/meter.md, ../../atoms/progress-bar.md]
---

# Printer Display

> The screens on a printer's own small display: a ready screen that opens on the printer's status, and menus as a single focused list moved through with the printer's keys, never more than two levels deep.

It embodies the printer display screen type ([patterns 1.146](../../patterns/01-screen-composition.md)), small key-driven displays ([patterns 3.137](../../patterns/03-controls-interaction.md), [patterns 5.78](../../patterns/05-sizes-devices.md)), printer menu depth ([patterns 2.87](../../patterns/02-navigation-flow.md)) and text on the device itself ([patterns 7.110](../../patterns/07-content-copy.md), [patterns 7.111](../../patterns/07-content-copy.md)). Used for the built-in colour or monochrome displays of desktop, mobile and industrial printers, and for software that mirrors them.

## Anatomy

**Ready screen** (home):

1. **Status** (largest element) ([patterns 1.146](../../patterns/01-screen-composition.md)): an [Icon](../../atoms/icon.md) size large and the status word in the display's largest type role: "Ready", "Printing", "Paused", or the attention cause ("Media out"). Device states use the product's fixed words ([patterns 4.70](../../patterns/04-states-feedback.md), [patterns 7.51](../../patterns/07-content-copy.md)).
2. **Attention detail** (only when the printer needs attention): the physical cause and its fix in one or two lines ("Load labels and close the cover"), with the printer's own code beside the plain words ("E1103") ([patterns 4.71](../../patterns/04-states-feedback.md), [patterns 7.111](../../patterns/07-content-copy.md)). It clears by itself when the condition clears ([patterns 4.91](../../patterns/04-states-feedback.md)).
3. **Job** (while printing or held): the job's status in words (Printing, Held, Failed) ([patterns 4.90](../../patterns/04-states-feedback.md)) and a [Progress Bar](../../atoms/progress-bar.md) size small, Show Label on, Label "Label 4 of 12" ([patterns 4.20](../../patterns/04-states-feedback.md)).
4. **Consumables and connections**: a [Meter](../../atoms/meter.md) for media and one for ribbon, Direction low is bad, Shape sharp, each with the amount in words ([patterns 10.85](../../patterns/10-data-display.md)); connection [Icon](../../atoms/icon.md)s size small (`wifi`, `bluetooth`), each with a one-word label when there's room.
5. **Soft key legend**: each physical button's current meaning shown next to it ("Menu", "Pause", "Feed") ([patterns 3.137](../../patterns/03-controls-interaction.md)). It changes with the screen, never with the key's position.

**Menu screens**:

6. **Menu title**: the menu's name, with the path when one level down ("Settings › Darkness").
7. **Menu list**: a single list of [Menu Item](../../molecules/menu-item.md)s, Type icon, Rounded off, Divided on, one highlighted at a time by focus ([patterns 1.146](../../patterns/01-screen-composition.md)). A setting's current value sits at the trailing end of its row. Choosing a value marks it as State selected. Items that can't be used say why on focus ([patterns 1.70](../../patterns/01-screen-composition.md)).
8. **Value edit** (for a number): the value and its unit in large text, with the keys' meanings ("Up", "Down", "Save") in the soft key legend. Longer entry and setup move to the companion app ([patterns 5.78](../../patterns/05-sizes-devices.md)).

The composed components govern their own colours, states, sizes, radius and focus rings. The template only places them.

## Layout

```
Ready screen                         Menu screen
┌───────────────────────────────┐    ┌───────────────────────────────┐
│ 1  ✓  Ready                   │    │ 6 Settings › Darkness         │
│ 3  Printing  ███████░░  4/12  │    │ 7 ▸ Darkness            20    │
│ 4  Media ▮▮▮▮▯  Ribbon ▮▮▯▯▯  │    │     Print speed         4 ips │
│    wifi  bluetooth            │    │     Media type          Gap   │
├───────────────────────────────┤    ├───────────────────────────────┤
│ 5  Menu     Pause     Feed    │    │ 5  Back     Select    Home    │
└───────────────────────────────┘    └───────────────────────────────┘
```

- The display is a fixed screen. The status sits at the top; the soft key legend is pinned along the edge nearest the keys, and each label sits directly by its key ([patterns 3.119](../../patterns/03-controls-interaction.md)).
- Gaps use `--space-xs` between rows and `--space-sm` between groups; the content is inset `--space-sm` from the display's edge. Text fits the display's fixed character count, identifying word first ([patterns 7.110](../../patterns/07-content-copy.md)); anything longer moves to the companion app rather than truncating a setting's name.
- Menus never scroll horizontally. A list longer than the display scrolls one row at a time with the focus, and shows that there's more.

## Responsiveness

This is a fixed screen, not a size class.

- **Per printer model**: each model's display is designed on its own, at its own character count and line count. A smaller display drops region 4 to its own menu item, then shortens the soft key labels to the printer's documented abbreviations; it never drops the status.
- **Monochrome displays**: status relies on the icon and word, never colour; Meters keep their threshold marks.
- **Mirrored in software** (a remote view in a console or app): the same screens at their true proportions, with on-screen controls for every key ([patterns 6.86](../../patterns/06-accessibility.md)). The console's own layout follows its size classes around it.
- **Touch**: where the display is a touch screen, every target meets `--control-target-min` ([patterns 6.16](../../patterns/06-accessibility.md)); gloved industrial printers use `--control-target-gloved` ([patterns 6.19](../../patterns/06-accessibility.md)).

## Accessibility

- **Keys**: every screen works with the arrow keys and Enter (Select) alone; Back always goes up one level; one known key (Home) always returns to the ready screen ([patterns 3.129](../../patterns/03-controls-interaction.md), [patterns 3.137](../../patterns/03-controls-interaction.md), [patterns 2.87](../../patterns/02-navigation-flow.md)). A numbered menu accepts the digit.
- **Focus**: exactly one item is highlighted at a time; the highlight is visible by shape (a marker or inverse row), not colour alone ([patterns 6.24](../../patterns/06-accessibility.md)). Opening a menu highlights its first item; going back highlights the item you came from.
- **Idle**: after the idle time, the display returns to the ready screen; an unsaved value edit is not saved ([patterns 2.87](../../patterns/02-navigation-flow.md)).
- **Sound and light**: any alert tone pairs with the status on screen and the printer's lights, never sound alone ([patterns 6.70](../../patterns/06-accessibility.md)).
- **Never colour alone**: status, job and consumables each show words with their icon.

## Usage

- Use for a printer's own display. A phone or console app that configures the printer uses the product's normal screens and names the same settings with the same words ([patterns 7.110](../../patterns/07-content-copy.md)).
- Keep menus one or two levels deep ([patterns 2.87](../../patterns/02-navigation-flow.md)). Anything deeper belongs in the companion app.
- Open on the printer's status, never on a menu ([patterns 1.146](../../patterns/01-screen-composition.md)).
- "Sent" is never "printed": the job's status comes from the printer ([patterns 4.90](../../patterns/04-states-feedback.md)).
- Draft components, whose measurements are placeholders: Meter.

Prototypes using this template: none yet.
