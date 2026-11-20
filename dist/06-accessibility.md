# Accessibility

The floors every other principle sits on, and how the interface behaves for screen readers, keyboards, switch and voice control, magnification, and people working in hard conditions. These principles come before every other principle. Ratios and sizes below are minimums, not design values. The system's tokens supply the values, and every value must clear these floors in every theme.

Not covered here: wording, where things sit, and how controls respond. This file sets only what must be spoken, shown or reachable.

**When principles conflict.** Accessibility minimums come first. A product's own shell and established patterns come next, and win over the defaults here. A more specific principle wins over a general one. Where two files disagree, the one whose subject it is wins.

**Terms used here**
- **Compact, medium, expanded:** window widths. Compact is phones and rugged handhelds in portrait, medium is small tablets and handhelds in landscape, and expanded is large tablets and desktop. Layout follows width, never the type of device.
- **Pinned:** stays in place while the rest scrolls.
- **Region:** a major area of a screen, such as the header, navigation, content area, a pane or a pinned bar. A **pane** is a column in the content area.
- **Shared device:** one device used by several people in turn, who sign in at the device.

---

## 1. Contrast
6.1. **Text keeps at least 4.5:1 against what's directly behind it. Large text keeps at least 3:1.** "Large" follows the platform's definition. The floor isn't rounded, and it applies to placeholder text, hint text, text shown on hover or focus, and the reason shown beside an unavailable control.
6.2. **Everything needed to find or operate a control keeps at least 3:1 against what's next to it.** That includes a field's edge where nothing else marks it as a field, a checkbox's box and check, a switch's track and thumb, a slider's thumb, and any icon that carries meaning. A control with clear text or a contrasting icon doesn't also need a contrasting edge.
6.3. **Every state keeps 3:1 against its surroundings:** selected, checked, current, focused and error. Two states may differ from each other by less than 3:1 only if something other than colour also changes. Hover is extra, and never lowers a control's contrast.
6.4. **By default, controls clustered together each keep 3:1 between their container and the background,** so each can be told apart. Controls with clear text labels don't need it (6.2).
6.5. **Text over an image, gradient or translucent surface meets the floor at its weakest point.**
6.6. **Unavailable controls are exempt from contrast, but their reason isn't.** An unavailable control still reads as a control, and its reason is ordinary text at 4.5:1.
6.7. **By default, thin and light font weights aren't used at small sizes.**
6.8. **Every theme meets every floor on its own.**
6.9. **The product offers a higher-contrast scheme, turned on by the system's increase-contrast setting and from within the product.**
6.10. **In forced-colour mode, nothing important disappears.** Every edge that matters is a real border, not a shadow. Selected, current and hover states that are only a tint also change a border, weight, icon or text. Focus doesn't depend on a custom colour.

## 2. Never colour alone
6.11. **Colour is never the only way to show meaning, state, an action or a prompt.** Shape, icon, text, pattern or position always comes with it. A pair of colours that look alike to colour-blind people (red and green, blue and orange) also differs by icon and word.
6.12. **Required fields and errors are marked by text and icon, not by colour alone.**
6.13. **Links in running text are underlined (a house decision, stricter than WCAG 1.4.1).** Where they aren't, they keep 3:1 against the surrounding text and gain a cue on focus and hover.
6.14. **Instructions never refer to colour alone** ("press the green button").
6.15. **Charts label their series directly or by pattern,** and their text alternative says what the colours mean.

## 3. Targets
6.16. **Every target meets the platform's default size, not just the minimum the standard allows.** On touch that's the platform's own default. The hit area may be larger than what's drawn. By default, important and frequent controls go beyond it. Zooming doesn't count toward the size.
6.17. **Spacing counts as much as size.** A target below the minimum passes only if a circle of the minimum size centred on it overlaps no other target, and no other small target's circle.
6.18. **A pointer-only product (a desktop console) may be denser than a touch product,** but never below the standard's minimum. A product used on both meets the touch size.
6.19. **Where gloves are used, the product's larger target option is used on every surface gloved people touch.** By default, targets near the screen's edges and corners are larger than those in the middle.
6.20. **Small targets whose position carries meaning (map pins, dense chart points) have another way in,** such as a list.
6.21. **Links inside a sentence are exempt from target size. Standalone controls never are.**

## 4. Focus
6.22. **Focus follows reading order, and keeps related things together.** The order is fixed by fixing the structure, never by overriding the tab order.
6.23. **Focus is always visible, and the indicator keeps 3:1 against what's next to it, on every background it can land on.** By default it's at least as large as a 2-pixel outline around the control and changes those pixels by 3:1. The default indicator is only replaced by a stronger one.
6.24. **Focus and selection look different.** Focus is a single moving point. Selection stays when focus leaves.
6.25. **The focused item is never fully covered by a pinned header, footer, banner or panel.** Content scrolls so it's clear, together with its context.
6.26. **On arrival, focus starts where nearly everyone begins.** If a screen has no single main task, nothing is focused in advance.
6.27. **By default on web, after moving to a new screen within the product, focus goes to its main heading and the new title is announced.** Native apps leave this to the platform, which already moves the screen reader to the new screen.
6.28. **When an overlay opens, focus moves into it:**
    - to the first control, normally;
    - to the title or first paragraph, when the content is long;
    - to the least destructive action, when it confirms something that can't be undone.

    Tab stays inside it, Escape closes it, and what's behind it can't be reached.
6.29. **When an overlay closes, focus returns to the control that opened it.** If that control is gone, focus goes to the next sensible place. If the overlay's task leads straight into a next step, focus goes there (after adding a row, to that row).
6.30. **A popover, menu or inline panel comes straight after its trigger in focus order.** When it closes, focus continues from the trigger.
6.31. **When the focused item is removed (deleted, collapsed, filtered out), focus moves on purpose,** to the next item or back to the trigger. It never falls to the top of the page.
6.32. **After a failed submit, focus moves to the error summary.**
6.33. **After a step changes, focus moves to the start of the new step.** After an action that keeps its context, such as Apply, focus stays on the control.
6.34. **An unavailable control whose existence or reason matters stays focusable, and announces itself as unavailable.** That includes Next and Submit while a form is incomplete, menu items, tabs and toolbar actions. Only controls that can be inferred from their neighbours drop out of the order.
6.35. **A group such as tabs, a toolbar, a menu, radios, a grid or a tree is one stop.** Arrow keys move inside it. Coming back lands on the selected item (tabs, radios), the last cell used (grids) or the first item (toolbars, menus).
6.36. **Content that describes one thing is reached and read as one unit.** A row whose image, name and details describe one item has one main action. Any secondary controls inside it are separate stops after it.

## 5. Keyboard and other input
6.37. **Everything that works by pointer also works by keyboard, and focus never gets stuck.**
6.38. **Standard keys do standard things.** Enter follows a link. Enter or Space presses a button. Space checks a checkbox. Arrow keys move between options and tabs and adjust a slider. Home and End go to the ends. Escape closes an overlay or menu.
6.39. **On web, a long page lets people skip the repeated parts,** by default with a skip link as its first stop. Landmarks and headings also serve.
6.40. **Keyboard shortcuts only speed up what's already reachable.** A single-key shortcut works only while its area has focus, or can be changed or turned off, because voice users fire them by accident.
6.41. **Devices without touch (hardware keyboards, D-pads, rotary controls) move focus both by Tab and by arrow keys in two dimensions.**
6.42. **Everything can be reached by voice control and switch access.** Where a control shows text, saying that text operates it.

## 6. Names, roles and structure
6.43. **Every control has a short name that says what it does, not what it looks like.** The role is never part of the name.
6.44. **A visible label is the name, or starts the name,** so what people see is what they can say.
6.45. **Repeated controls carry their item's identity in their name** ("Delete Printer 3", not five "Delete"s).
6.46. **The same function has the same name and icon everywhere.**
6.47. **Placeholder text is never a name. Format rules and hints are read after the name,** as its description.
6.48. **Every control exposes its role and current state:** on or off, checked, mixed, expanded, selected, current, busy. Long-press and swipe actions have spoken names ("Open menu").
6.49. **Decorative images and icons inside a named control are hidden from assistive technology.** Meaningful images are described by what they convey, not by what the caption already says.
6.50. **Every screen and every distinct pane has a unique title that describes it.** Generic titles aren't reused across screens.
6.51. **Headings are structure, not styling.** One top heading names the screen and matches its title. By default, levels nest without skipping, and every visual section has a heading. On a screen that asks one question, the question is both the heading and the label, so it's heard once.
6.52. **On web, by default, every part of the screen sits in a landmark:** one header, one main, one footer, plus navigation, search and labelled regions as needed. Landmarks of the same kind have distinct labels that don't repeat the role. Lists are marked as lists, and key–value pairs as description lists.

## 7. Announcements
6.53. **Status changes are announced without moving focus.** That includes result counts, "Added", "Saved", progress and error counts.
6.54. **The urgency of an announcement matches its importance.** Routine success and progress wait until the reader finishes. Only important, time-sensitive errors and warnings interrupt. Interrupting for routine news is never done.
6.55. **A toast is announced politely, never takes or traps focus, and can be reached by a documented key if it has an action.** The control that triggered it also shows the result in place ("Saved").
6.56. **Changes the person caused, outside where they're focused, are reported,** so their mental map stays accurate (urgency: 6.54).
6.57. **A countdown is announced at intervals, not every tick:** by the minute, then more often in the last minute.
6.58. **Content that updates by itself (a live feed, a dashboard, a moving count) can be paused, or its rate reduced.** On resume, it jumps to current data.
6.59. **By default, streaming or long-running output (AI replies, live logs) announces when it starts and when it finishes.** It doesn't read out each fragment, and the person reads the result themselves, at their own pace.

## 8. Text size and reflow
6.60. **Text can grow to at least twice its size with nothing clipped, cut off, overlapped or lost.** Containers and controls grow with their text. Fixed heights never assume a text size. Where a label must truncate, the full text is available on focus, and there's a cue that more exists.
6.61. **At large text sizes, the layout changes rather than crushing the text.** Side-by-side items stack. Columns reduce. Text takes as many lines as it needs. The main content stays at the top. Meaningful icons grow with the text. Chrome such as tab labels may grow less than content.
6.62. **Content reflows to one column at a width of 320 CSS pixels (WCAG 1.4.10) with no scrolling in two directions.** Only content that needs two dimensions scrolls both ways: data tables, maps, diagrams. The exception applies to that region alone. Pinned headers and footers become static or collapsible at small sizes.
6.63. **Text survives people's own spacing overrides** (line height, paragraph, letter and word spacing) without clipping or overlap.
6.64. **Screens work in portrait and landscape,** unless one orientation is essential. A product never asks the person to rotate the device. This matters on mounted devices with a fixed orientation.

## 9. Motion, flashing and sound
6.65. **Nothing flashes more than three times in any second.**
6.66. **With reduced motion on, slides, zooms and depth become fades.** Automatic and repeating animation stops, springs lose their bounce, and blur doesn't animate. Any remaining motion follows the person's gesture directly. Changes of colour and opacity stay.
6.67. **Anything that moves, blinks or scrolls by itself for more than five seconds, next to other content, can be paused, stopped or hidden.**
6.68. **Audio and video never play without controls to stop them.** Players offer pause, volume and captions.
6.69. **Recorded video with sound has captions. Recorded audio has a transcript.** Spoken AI replies show a text version wherever there's a screen, and can be replayed.
6.70. **Sound is never the only signal.** Every chime, tone or alert comes with a visual cue, and with haptics on handhelds. Haptics are never the only signal on a wearable either.

## 10. Time limits
6.71. **Every time limit the product sets can be turned off, lengthened, or extended with one simple action before it runs out.** Exceptions are real-time events, and limits that extending would break.
6.72. **The timeout warning is given near the end, not at the start.** It says the time left and whether work will be kept, and offers one action to stay. Staying returns focus to where it was.
6.73. **Anything that disappears by itself stays at least as long as the person's system accessibility timeout asks for.** That's longer for content with controls than for text alone.
6.74. **Views close by an explicit action, not by timer, wherever possible.**
6.75. **What's been entered survives a timeout, for the same person.** On a shared device, signing out clears it.

## 11. Input help
6.76. **When the product knows how to fix an error, it says how.**
6.77. **Changing a value never submits, moves the person elsewhere, opens a window or moves focus by itself,** unless the screen says so beforehand.
6.78. **After a failed submit, everything entered is kept,** including the rejected value, so the person corrects rather than retypes.
6.79. **Fields have visible labels, and instructions come before the field that needs them.**
6.80. **Nothing given earlier in a process is asked for again.** It's filled in or offered, and stays editable. Confirming a new password is the exception.
6.81. **By default, the person never has to remember or calculate something the product already knows.**

## 12. Alternatives to gestures and hardware
6.82. **Anything done by a gesture with a path or several fingers can also be done with single taps or clicks.**
6.83. **Anything done by dragging can also be done without dragging,** and the alternative isn't another swipe.
6.84. **Swipe, drag and long-press actions are also offered as named actions to assistive technology,** so the same flow can be completed with a screen reader, voice or switch.
6.85. **Anything triggered by moving the device (shake, tilt) also has a control on screen, and that response can be turned off.**
6.86. **By default, anything triggered by a physical key also has a control on screen.** The system's own keys (power, volume, the accessibility shortcut) are exempt. A protected action keeps its protection in the alternative: a confirmation step, never a single tap.

## 13. Clear and consistent
6.87. **Help appears in the same order relative to the rest of the screen, everywhere it's offered.** That includes an assistant.
6.88. **Repeated controls keep the same name, icon and relative position across screens.**
6.89. **By default, critical paths are short, and interruptions are few.**
6.90. **Multi-step work shows where the person is, lets them go back, and states consequences before anything is committed.**

## 14. Signing in
6.91. **Signing in never depends only on remembering, transcribing or solving something.** At least one way in doesn't: a password manager, paste, a passkey, a biometric, a badge or a confirmation on another device. This applies to every step, including recovery.
6.92. **Paste and autofill are never blocked.** A code split into one box per character accepts a full paste into the first box. People are never asked for selected characters of a password.
6.93. **Password fields have a show control.**

## 15. Field conditions
6.94. **Cold, gloves, walking, glare and noise act like disabilities, and the floors above serve them.** Products used in those conditions go beyond the floors:
    - larger targets, especially near edges and corners (6.19);
    - the higher-contrast scheme (6.9);
    - no thin text;
    - every sound paired with a visual cue and haptics (6.70);
    - little typing.
6.95. **The person chooses the field adjustments (glove targets, contrast, text size), and the product remembers them.** By default, the product may suggest one when it detects the condition, but doesn't switch by itself. An administrator may set an adjustment for a managed fleet, such as glove targets for a cold-store team.
6.96. **Tasks done in the cold or on the move keep the time a person's hands are exposed short.** Fewer steps, fewer fields, scanning instead of typing.

## 16. Also required
6.97. **A tap acts when the finger lifts, not when it lands, and sliding off the control before lifting cancels it** (controls that act while held are the exception).
6.98. **Content that appears on hover or focus can be dismissed without moving the pointer, can itself be hovered, and stays until dismissed or no longer relevant.**
6.99. **Every data cell is announced with its column and row headers, and the sort state is exposed on the sorted header.**
6.100. **Every screen declares its language, and a passage in another language declares its own,** so speech switches voice. Right-to-left languages mirror reading and focus order.
6.101. **Serial numbers, SKUs, network addresses and barcode data are spoken one character at a time,** not as numbers or words.
6.102. **Every value that can be scanned can also be typed or picked.** A scan's result is both spoken and shown. Any automatic move after a scan is the same every time, and the screen says so.
6.103. **Remapping a hardware key never takes a key or combination that assistive technology uses,** such as the volume-key accessibility shortcut or keyboard navigation.
6.104. **Accessibility adjustments follow the person who signs in, not the device.** When they sign out, the next person starts from their own settings (6.95).
6.105. **A device people can't add their own assistive technology to gives its own spoken or alternative output.** Printer status is never shown only by a light's colour or blink pattern, and the same status can be read in the companion app.
6.106. **Two-way voice offers a text equivalent in both directions,** so a person who can't hear or speak can take part.
6.107. **Recorded video whose pictures carry meaning, such as training video, has audio description or a full text alternative.**
6.108. **On web, fields that ask about the person declare their purpose, so they can be filled in automatically.**
