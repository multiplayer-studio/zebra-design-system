---
name: Timeout Warning
level: template
status: draft
composes: [../../organisms/dialog.md, ../../organisms/global-header.md, ../../organisms/top-app-bar.md, ../../molecules/empty-state.md, ../../atoms/button.md, ../../atoms/scrim.md]
---

# Timeout Warning

> Warn before a session ends from inactivity, with the time left, whether work will be kept, and one action to stay; then, if it times out, a screen that explains and offers sign-in.

Use it in any product whose session ends from inactivity for security or resource reasons, and for a kiosk's idle reset ([patterns 4.65–4.69](../../patterns/04-states-feedback.md), [2.82](../../patterns/02-navigation-flow.md)).

## Anatomy
1. **Page behind.** The screen the person was on, unchanged and recognisable behind a [Scrim](../../atoms/scrim.md) ([patterns 1.117](../../patterns/01-screen-composition.md)).
2. **Warning dialog.** [Dialog](../../organisms/dialog.md) flavour warning, Show Close off, Actions 2 ([patterns 4.66](../../patterns/04-states-feedback.md), [1.66](../../patterns/01-screen-composition.md)):
   1. Title: "You'll be signed out soon" ([patterns 7.24](../../patterns/07-content-copy.md)).
   2. Body: the time left, written as a countdown in minutes, then in 20-second steps in the last minute ("You'll be signed out in 2 minutes"), and whether work will be kept ("Your entries will be kept for when you sign back in.") ([patterns 4.66–4.67](../../patterns/04-states-feedback.md), [6.72](../../patterns/06-accessibility.md)). Where security sets an absolute session length, the body says when it ends.
   3. Actions: "Sign out" as the secondary (Button flavour outline-subtle) and "Stay signed in" as the primary (Button flavour primary), at the trailing end ([patterns 4.66](../../patterns/04-states-feedback.md)).
3. **Timed-out screen** (after the time runs out). The content area shows an [Empty State](../../molecules/empty-state.md) type Can't show: title "You've been signed out", body saying why and whether entries were kept, and a [Button](../../atoms/button.md) flavour primary "Sign in" ([patterns 4.68](../../patterns/04-states-feedback.md)). The header is the product's [Top App Bar](../../organisms/top-app-bar.md) at compact or [Global Header](../../organisms/global-header.md), Rounded off (sharp, full width; [Global Header Usage](../../organisms/global-header.md#usage)) from medium, with nothing of the previous person shown.
4. **Kiosk variant.** On a kiosk or shared counter, the dialog's title is "Do you need more time?", the actions are "Start over" (outline-subtle) and "I need more time" (primary), and the warning also plays a sound ([patterns 5.66](../../patterns/05-sizes-devices.md)). When it runs out, entries are cleared and the kiosk returns to its start screen with no timed-out screen ([patterns 2.82](../../patterns/02-navigation-flow.md), [1.135](../../patterns/01-screen-composition.md)).

**Behaviour.**
- The dialog appears at least two minutes before the timeout, near the end, never at the start ([patterns 4.66](../../patterns/04-states-feedback.md), [6.72](../../patterns/06-accessibility.md)).
- "Stay signed in" resets the timer; extending has no limit by default ([patterns 4.66](../../patterns/04-states-feedback.md), [6.71](../../patterns/06-accessibility.md)).
- What's been entered survives the timeout for the same person; on a shared device, signing out clears it from the screen ([patterns 6.75](../../patterns/06-accessibility.md)). The same person signing back in returns to the same place with input kept; anyone else starts from the neutral start screen ([patterns 4.68](../../patterns/04-states-feedback.md)).
- The product's own timeout never undercuts the device's sign-in ([patterns 4.69](../../patterns/04-states-feedback.md)).

The composed components govern their own colours, states, sizes, radius and focus rings. The template only places them.

## Layout
```
Warning (medium and up)                         Timed out (compact)
┌───────────────────────────────────────────┐   ┌──────────────────┐
│ 1 Page behind, under scrim                │   │ 3 Header         │
│     ┌───────────────────────────────┐     │   ├──────────────────┤
│     │ ⚠ 2.1 You'll be signed out    │     │   │                  │
│     │       soon                    │     │   │       🔒         │
│     │ 2.2 You'll be signed out in   │     │   │ You've been      │
│     │     2 minutes. Your entries … │     │   │ signed out       │
│     │ 2.3   [Sign out][Stay signed] │     │   │ body             │
│     └───────────────────────────────┘     │   │                  │
│                                           │   │ [Sign in]        │
└───────────────────────────────────────────┘   └──────────────────┘
```
- The dialog uses its own spacing and width; the template adds none.
- The timed-out screen follows [Outcome Screen](outcome-screen.md): the block centred in the upper part of the content area, `--space-xl` above the action.

## Responsiveness
- **Compact** (below `--breakpoint-medium-min`): the warning stays a dialog, because it's a short confirmation ([patterns 5.17](../../patterns/05-sizes-devices.md)); its buttons stack full width when they don't fit, "Stay signed in" on top. The timed-out screen's button is full width, margins `--space-page`.
- **Medium** (from `--breakpoint-medium-min`): the dialog is centred; buttons side by side. Margins `--grid-margin` on the timed-out screen.
- **Expanded** (from `--breakpoint-expanded-min`) and **Large** (from `--breakpoint-large-min`): as medium. Nothing grows.
- **Touch.** The dialog's size medium buttons are below `--control-target-min` and extend their hit area to it ([patterns 6.16](../../patterns/06-accessibility.md)); kiosk products use their larger target option.

## Accessibility
- **Landmarks and headings.** The dialog is a modal alert dialog labelled by its title and described by its body. The timed-out screen's title is the `h1` inside `main`.
- **Focus order.** When the dialog opens, focus moves to "Stay signed in" so one key press stays ([patterns 6.28](../../patterns/06-accessibility.md)). Staying closes the dialog and returns focus to where it was ([patterns 6.72](../../patterns/06-accessibility.md)). Focus is trapped in the dialog while it's open. On the timed-out screen focus goes to the heading.
- **Keyboard.** Enter or Space on the focused primary stays; Escape also stays, because it keeps everything ([patterns 2.23](../../patterns/02-navigation-flow.md)). Tab moves between the two buttons.
- **Announcements.** The dialog is announced on opening. The countdown is announced politely at intervals, by the minute, then every 20 seconds in the last minute, never every tick ([patterns 6.57](../../patterns/06-accessibility.md), [4.66](../../patterns/04-states-feedback.md)). The visible text updates on the same steps.
- **Never colour alone.** The warning glyph comes with the title's words; time left is written, never only a shrinking ring.
- The timeout itself respects the person's needs: it can be turned off, lengthened or extended with one action ([patterns 6.71](../../patterns/06-accessibility.md)).

## Usage
- Use a timeout only when security or resources require it ([patterns 4.65](../../patterns/04-states-feedback.md)). Views otherwise close by an explicit action, not a timer ([patterns 6.74](../../patterns/06-accessibility.md)).
- One action to stay; never a form or a password to stay signed in.
- Sign-in after a timeout uses [Sign-in on a Shared Device](sign-in-shared-device.md) or the product's own sign-in.
- Drafts: [Empty State](../../molecules/empty-state.md) is draft; its measurements are placeholders.

Prototypes using this template: none yet.
