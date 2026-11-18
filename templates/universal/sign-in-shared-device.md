---
name: Sign-in on a Shared Device
level: template
status: draft
composes: [../../organisms/dialog.md, ../../organisms/global-header.md, ../../organisms/top-app-bar.md, ../../molecules/combobox.md, ../../molecules/dropdown-menu.md, ../../molecules/inline-banner.md, ../../molecules/input.md, ../../molecules/menu-item.md, ../../molecules/site-switcher.md, ../../atoms/avatar.md, ../../atoms/button.md, ../../atoms/input-hint.md, ../../atoms/input-label.md, ../../atoms/radio-button.md]
---

# Sign-in on a Shared Device

> Sign a worker in to a device used by several people in turn: identity first (badge scan or user ID), then the step that identity needs, then the site if there's a choice, and the signed-in person shown on every screen afterwards.

Use it for shift handhelds, shared tablets and counter devices. Where the device has its own sign-in layer, the product doesn't rebuild it: it picks up the current person and only shows who is signed in (part 6 below) ([patterns 1.55](../../patterns/01-screen-composition.md), [2.75](../../patterns/02-navigation-flow.md)).

## Anatomy
1. **Header.** [Top App Bar](../../organisms/top-app-bar.md) type centered at compact, title the product's name, no leading control; [Global Header](../../organisms/global-header.md), Rounded off (sharp, full width; [Global Header Usage](../../organisms/global-header.md#usage)) from medium with navigation and account regions off. Sign-in is separate from the product's navigation, so there is none ([patterns 2.73](../../patterns/02-navigation-flow.md)).
2. **Identity step.**
   1. Heading as the question: "Who's signing in?" ([patterns 7.26](../../patterns/07-content-copy.md)).
   2. Field: [Input](../../molecules/input.md) type text, size large, with its [Input Label](../../atoms/input-label.md) "User ID" and [Input Hint](../../atoms/input-hint.md) "Scan your badge or enter your user ID" above it ([patterns 7.32](../../patterns/07-content-copy.md)), and the scan trailing control. Scanning a badge fills it and continues at once, the same way every time ([patterns 6.102](../../patterns/06-accessibility.md)).
   3. [Button](../../atoms/button.md) flavour primary, size large, "Continue".
3. **Credential step** (only what this identity needs) ([patterns 2.74](../../patterns/02-navigation-flow.md)).
   - Password: [Input](../../molecules/input.md) type password, size large, with its show control ([patterns 6.93](../../patterns/06-accessibility.md)); paste and autofill work ([patterns 6.92](../../patterns/06-accessibility.md)). [Button](../../atoms/button.md) flavour primary "Sign in".
   - Single sign-on or a confirmation on another device: the step says where the person is going and why, then hands off and returns here ([patterns 2.65](../../patterns/02-navigation-flow.md)).
   - Under the primary, a [Button](../../atoms/button.md) flavour text "Not you?" returns to the identity step.
   At least one way in never depends on remembering or transcribing: the badge, a passkey or a confirmation on another device ([patterns 6.91](../../patterns/06-accessibility.md)).
4. **Sign-in error.** [Inline Banner](../../molecules/inline-banner.md) status error above the step heading, which never reveals which part was wrong ("That user ID and password don't match. Check them and try again.") ([patterns 2.74](../../patterns/02-navigation-flow.md), [7.33](../../patterns/07-content-copy.md)). After repeated failures it says how to get help from a supervisor ([patterns 4.39](../../patterns/04-states-feedback.md)).
5. **Site choice** (only when the person belongs to more than one site and the device isn't assigned to one). [Dialog](../../organisms/dialog.md) flavour default, Actions 1, "Choose a site" ([patterns 1.66](../../patterns/01-screen-composition.md)): [Radio Button](../../atoms/radio-button.md)s size large for five or fewer sites, a [Combobox](../../molecules/combobox.md) for more ([patterns 3.16](../../patterns/03-controls-interaction.md)). The last site used is preselected. Skipped entirely on a managed device configured for one site ([patterns 2.72](../../patterns/02-navigation-flow.md)).
6. **Signed-in person** (on every screen afterwards). In the header: an [Avatar](../../atoms/avatar.md) size xxsmall with initials and the person's name, opening a [Dropdown Menu](../../molecules/dropdown-menu.md) of [Menu Item](../../molecules/menu-item.md)s: "Switch user", "Sign out". Where the person belongs to more than one site, the [Site Switcher](../../molecules/site-switcher.md) sits beside it ([patterns 1.54–1.55](../../patterns/01-screen-composition.md)).
7. **Unsent work notice** (signing in after someone else). Where work is waiting to send from an earlier person, it sends once anyone is signed in; the next person never sees what's in it ([patterns 4.87](../../patterns/04-states-feedback.md)). Only the person whose work it is sees an [Inline Banner](../../molecules/inline-banner.md) status info about it after signing back in.

**States.**
- Checking: the pressed button shows its busy state; the field stays as entered ([patterns 4.15](../../patterns/04-states-feedback.md)).
- Offline: where the device can sign in offline with cached credentials, it does and says so; otherwise the step says sign-in needs a connection and what to do ([patterns 4.51–4.52](../../patterns/04-states-feedback.md)).
- Sign out: asks first only when unsent work or a draft would be lost, then lands on the identity step ([patterns 2.76](../../patterns/02-navigation-flow.md)). After a change of person, nothing the previous person entered or viewed is shown ([patterns 4.69](../../patterns/04-states-feedback.md)).
- Returning: the same person signing back in after a timeout returns to the same place; anyone else starts from the neutral start screen ([patterns 2.76](../../patterns/02-navigation-flow.md), [4.68](../../patterns/04-states-feedback.md)).

The composed components govern their own colours, states, sizes, radius and focus rings. The template only places them.

## Layout
```
Compact                         Expanded and large
┌──────────────────┐            ┌──────────────────────────────────────────┐
│ 1 Product name   │            │ 1 Header (brand only)                    │
├──────────────────┤            ├──────────────────────────────────────────┤
│ 4 Error (opt.)   │            │                                          │
│ 2.1 Who's        │            │          4 Error (optional)              │
│ signing in?      │            │          2.1 Who's signing in?           │
│ 2.2 User ID      │            │          2.2 User ID                     │
│ Scan your badge… │            │              Scan your badge…            │
│ [           ⌗ ]  │            │              [                     ⌗ ]   │
│                  │            │          2.3 [Continue]                  │
│                  │            │                                          │
├──────────────────┤            │                                          │
│ 2.3 [Continue]   │            │                                          │
└──────────────────┘            └──────────────────────────────────────────┘
```
- One narrow column, capped at `--container-reading` and centred in wider windows ([patterns 5.11](../../patterns/05-sizes-devices.md)).
- Heading, field and button stack: `--space-xl` from heading to field, `--space-lg` from field to button.
- Nothing scrolls unless text size or a short window requires it.

## Responsiveness
- **Compact** (below `--breakpoint-medium-min`): margins `--space-page`. The primary button is full width and pinned to the bottom, riding on the keyboard when it opens, so the field and the button stay together ([patterns 5.55](../../patterns/05-sizes-devices.md)). With a hardware keypad, no space is kept for the on-screen keyboard ([patterns 5.79](../../patterns/05-sizes-devices.md)). The site [Dialog](../../organisms/dialog.md) becomes full screen ([patterns 5.17](../../patterns/05-sizes-devices.md)).
- **Medium** (from `--breakpoint-medium-min`): margins `--grid-margin`; the column centres and the button sits under the field.
- **Expanded** (from `--breakpoint-expanded-min`): as medium; the dialog is centred.
- **Large** (from `--breakpoint-large-min`): as expanded. Nothing grows.
- **Touch.** Size large fields and buttons meet `--control-target-min` ([patterns 6.16](../../patterns/06-accessibility.md)); any smaller control, such as the signed-in person's control in the header, extends its hit area to it; on gloved products they use `--control-target-gloved` ([patterns 6.19](../../patterns/06-accessibility.md)).

## Accessibility
- **Landmarks and headings.** `header` and `main`, no `nav`. The step's question is the `h1` and also the field's label where the step asks one thing ([patterns 6.51](../../patterns/06-accessibility.md)).
- **Focus order.** On arrival, focus is in the identity field ([patterns 6.26](../../patterns/06-accessibility.md)). When the step changes, focus moves to the new step's field; after a failed attempt, to the error banner. When the site dialog opens, focus moves into it; after choosing, focus goes to the product's start screen heading.
- **Keyboard and scanner.** A scan's Enter continues only from the identity field; elsewhere Enter doesn't submit by accident ([patterns 5.69](../../patterns/05-sizes-devices.md)).
- **Names and announcements.** The scan control is "Scan badge"; the show control is "Show password". The scanned ID is spoken one character at a time ([patterns 6.101](../../patterns/06-accessibility.md)). Errors are announced assertively; the busy state politely. The user ID field declares its purpose as a username for autofill ([patterns 6.108](../../patterns/06-accessibility.md)).
- **Never colour alone.** The error has its icon and words.
- Accessibility settings follow the person who signs in, not the device ([patterns 6.104](../../patterns/06-accessibility.md)).

## Usage
- Use it only where the work needs sign-in and the device has no sign-in layer of its own ([patterns 2.73](../../patterns/02-navigation-flow.md)). Sign-in interrupts the destination, then continues to it, and is taken out of history ([patterns 2.16](../../patterns/02-navigation-flow.md)).
- Ask for nothing an administrator has already configured ([patterns 2.72](../../patterns/02-navigation-flow.md)).
- Unfinished work belongs to the person, not the device ([patterns 2.85](../../patterns/02-navigation-flow.md)).
- Session timeouts use [Timeout Warning](timeout-warning.md).
- Setup the product can't start without follows sign-in as a [First Run](first-run.md); a rare, ordered setup task is a [Wizard](wizard.md).
- Drafts: [Combobox](../../molecules/combobox.md), [Site Switcher](../../molecules/site-switcher.md), [Input Label](../../atoms/input-label.md) and [Input Hint](../../atoms/input-hint.md) are draft; their measurements are placeholders.

Prototypes using this template: none yet.
