# Controls and interaction

How each control responds when it's used: buttons, links, choices, text and number entry, dates, selection, menus, gestures, keys, saving, undo, inline editing, scanning, hardware input and the motion tied to all of these.

Not covered here: where controls sit, the order of buttons in a group, loading timing, how long messages last, wording, target sizes and focus, and how controls change with width.

**When principles conflict.** Accessibility minimums come first. A product's own shell and established patterns come next, and win over the defaults here. A more specific principle wins over a general one. Where two files disagree, the one whose subject it is wins.

**Terms used here**
- **Compact, medium, expanded:** window widths. Compact is phones and rugged handhelds in portrait, medium is small tablets and handhelds in landscape, and expanded is large tablets and desktop. Layout follows width, never the type of device.
- **Leading, trailing:** the start and end of a line in the reading direction (left and right in left-to-right languages).
- **Shared device:** one device used by several people in turn, who sign in at the device.

---

## 1. Buttons
3.1. **Every button has visible rest, pressed, focused and unavailable states, plus hover where a pointer exists.** Pressed shows the moment a finger or pointer goes down, so the person knows the input registered.
3.2. **By default, a button acts when it's released, not when it's pressed,** and sliding off before lifting cancels it. Controls that act while held (talk, repeat, hold to confirm, the scan trigger) start on press and stop on release.
3.3. **A button whose action takes time shows that in the button itself, and can't be pressed again until the action ends.** After success, the button shows the result briefly ("Saved"), then the screen moves on: the overlay closes, the form resets or the data refreshes. After a failure, the button returns to rest and the error shows where it belongs.
3.4. **A second press on a submitting button does nothing, and the service also rejects the duplicate.** The guard in the interface is never the only one.
3.5. **By default, peers in a group are the same size, and the preferred one is set apart by style, not size.** A stacked layout on a narrow screen may make the primary full width.
3.6. **A destructive action is never the default action,** the one Enter or a confirming hardware key would trigger. That holds even when it's the likely choice.
3.7. **An icon-only button shows its name on hover and on focus.** The name is never the only place its meaning lives where a visible label would fit.
3.8. **By default, a toggle button keeps the same label and icon in both states,** and its state shows as filled versus outlined, and as pressed. Where the label changes instead (play and pause, mute and unmute), it names the action it will take, and there's no pressed state.
3.9. **A button that opens something before acting says so.** On desktop, a trailing ellipsis means the action continues in a window that follows.
3.10. **An unavailable button stays visible, with its reason beside it.** The short disable while an action runs (3.3) needs no reason.

## 2. Links and buttons
3.11. **A link takes the person somewhere. A button does something.** Each looks like what it does.
3.12. **A step forward in a task stays a button, even though it moves to a new screen.** Examples are Next, Start and Review.
3.13. **Minor commands can be text links. Primary commands are always buttons.** A command link may carry a line of explanation beneath it, which a button can't.
3.14. **The lowest-emphasis button is never underlined.** Underlining is kept for links in text.

## 3. Choosing the right choice control
3.15. **The choice decides the control:**
    - One setting that takes effect at once: a switch.
    - One opt-in, or any number of independent choices including none: checkboxes.
    - Exactly one from a small set that should stay visible: radios.
    - Switching views of the same content, or picking one of two to five closely related short options: a segmented control.
    - Exactly one from a long, known list: a list people can type to filter (3.33).
3.16. **The number of options decides between visible and collapsed.** Five or fewer stay visible. From six to fifteen, they stay visible unless space is short. Past fifteen, they go in a list people can filter. Two options are never collapsed into a dropdown.
3.17. **A value people can type or scan faster is never a list.** A known date or a code is typed. Quantities follow 3.57–3.58.
3.18. **By default, one list's options don't depend on another's.** Where a hierarchy is natural (site, then building, then zone), the dependent list is unavailable until its parent is chosen, and is cleared, with a message, when the parent changes. Options never silently come and go.
3.19. **Options are ordered the way people expect to find them.** That means a natural order where one exists (sizes, days, steps), otherwise alphabetical. Order by frequency is usually kept for action menus (3.79).

## 4. Switches, checkboxes, radios and segmented controls
3.20. **A switch acts the moment it's flipped.** It never waits for Save, never asks for confirmation, and never stands in for a button. Anything that needs either is a checkbox in a form, or a button.
3.21. **A switch whose setting must reach a device or service shows that it's pending until the result comes back.** If the setting fails, the switch returns to its earlier position, and the reason shows beside it. Settings that depend on each other, or that must change together, go in a form with Apply instead.
3.22. **A switch's state never shows by colour alone.** The thumb's position always shows it, and by default a mark inside the thumb (a check when on) does too. A checkbox shows a check, and a mixed state shows a dash.
3.23. **A switch can stand anywhere a single setting applies immediately, not only in a list.**
3.24. **A parent checkbox over a group shows a mixed state when its children differ.** Choosing it when mixed selects all of them. Children are indented under it.
3.25. **A "None" option in a checkbox list sits last, after a divider.** Choosing it clears the others, and choosing any other clears it.
3.26. **An opt-in checkbox starts unchecked.**
3.27. **By default, a question the person must answer has no option chosen in advance. A setting or view switch always shows its current value.**
3.28. **Radios stack one per line.** Only two short options may sit side by side, and they stack again when space is short.
3.29. **The label of a switch, checkbox or radio is part of what can be tapped.** In a list, the whole row is the target.
3.30. **A segmented control has two to five options of equal width, all text or all icons.** It never wraps, always has one option chosen, and never holds an action. When its labels don't fit, as in a longer language, it becomes a list of choices.

## 5. Lists that collapse, and typeahead
3.31. **A collapsed list for one choice closes once the choice is made. A collapsed list for several choices stays open until dismissed.** Its closed field shows how many are chosen, with a way to clear them.
3.32. **A collapsed list never scrolls the page behind it,** and focus and selection inside it look different (3.70).
3.33. **A long, known list is filtered by typing.** Suggestions appear under the field and update with each keystroke. Focus stays in the field while arrow keys move through them. Enter accepts a suggestion; Escape closes the list and keeps what was typed.
3.34. **A field that must match a known item (a site, a device, a user) commits only a choice from the list.** A field that allows any value keeps what was typed unless a suggestion is chosen.
3.35. **In a suggestion, the part the person hasn't typed yet is the emphasised part.** Every suggestion leads to a result; one that returns nothing is never offered.
3.36. **On compact screens, suggestions are plain text rows.** Richer previews are kept for wide screens.
3.37. **Plain lists and menus also jump to the next item that starts with a typed letter.**

## 6. Text entry
3.38. **Every text field declares what it holds, so the on-screen keyboard matches.** Digits bring up a number pad, email brings up @, phone brings up a phone pad, and web addresses bring up /. Whole numbers use a plain field with a number pad, never a spinner. Negative and decimal numbers use the number pad with a minus sign and the locale's decimal separator; where the platform has none, the full keyboard is used.
3.39. **The keyboard's action key says what happens next:** Next between fields, Done on the last, Search in a search field, Send in a composer.
3.40. **Autocorrect and spellcheck are off for codes, IDs, serial numbers, names and email.** Automatic capitals are off for codes and email; names capitalise each word, and the person can change it. All three are on for prose.
3.41. **Fields about the person declare their purpose so the device can fill them in.**
3.42. **A field's width suggests the length of what goes in it.**
3.43. **A field accepts what people naturally type.** By default, spaces, dashes, brackets and a typed unit or prefix are accepted and cleaned up silently, and no input mask is used. Case is kept wherever the value is case-sensitive (keys, tokens, some serials). No maximum length blocks normal formatting.
3.44. **A long code is shown back in spaced groups so it can be checked by eye.**
3.45. **A unit or currency sits outside the field as a prefix or suffix, and is also in the label.**
3.46. **The trailing end of a field holds its clear control, or its show control for a secret value.** A field that accepts scanning carries a scan or camera control there too, ahead of clear. A secret value (a password, a key) is hidden by default. The leading end holds only an icon for the field's purpose.
3.47. **Focus never jumps to the next field by itself as characters are typed,** unless the screen says it will before the first field. Scanning (3.112) is the exception.
3.48. **A character limit never stops typing.** A count appears as the person nears it, and shows how far over they are.
3.49. **The field being typed in, and the button that commits it, stay visible above the on-screen keyboard.**
3.50. **Only one field per screen or overlay is focused on arrival,** and only where entering text is the screen's whole purpose (a search screen, an overlay that asks for one value, a scan step). Elsewhere, nothing opens the keyboard until the person chooses a field.

## 7. Dates and times
3.51. **A date can always be typed, whatever else is offered.** A date people know or can look up is typed. A calendar is offered for dates near today, or where the day of the week matters. Separate day, month and year lists are never used.
3.52. **The calendar:**
    - It opens next to its field on wide screens, and as an overlay on compact ones. A range opens full screen on compact screens.
    - It marks today.
    - Dates that can't be chosen are shown but unavailable. The end of a range can't fall before its start.
    - A range is picked in one calendar, start then end, and the calendar closes after the end is picked.
    - It spells out month names, and accepts typed month names.
    - It doesn't grow on bigger screens.
3.53. **A short fixed set of dates (about ten or fewer) is a list of those dates, not a calendar,** because every date in it is a real option.
3.54. **A time can always be typed.** A dial or wheel switches to typing in one tap. Minutes may be offered in coarse steps where finer precision doesn't matter. The 12- or 24-hour format follows the device.
3.55. **A time that people in several time zones will read carries its zone.**
3.56. **If one part of a typed date or time is wrong, only that part is marked.**

## 8. Numbers: steppers and sliders
3.57. **A stepper is for small changes around a common value,** like a quantity or a number of copies. It starts on the most common value where that's a safe default, and empty otherwise (3.27), changes by one unit each press, and its value can be typed directly. Minus and plus sit on either side, as large, well-spaced targets. The button at a limit becomes unavailable there. Holding a button repeats the step. The unit and limits are stated.
3.58. **A stepper is never used for a wide or continuous range.** Price, distance, temperature and time are typed.
3.59. **A slider is for an approximate value whose effect matters more than its number.** It applies as it moves. Where the exact value matters, a linked number field sits beside it, stays in sync, and comes straight after it in focus order.
3.60. **A slider runs from minimum at the leading end to maximum at the trailing end.** Its labels and current value sit above or beside the track, never below where the finger hides them. The value shows while the thumb is held. A discrete slider snaps to a few visible stops. Tapping the track moves the thumb there.
3.61. **By default, sliders aren't used where people work on the move or one-handed,** including scanning and gloved work. A stepper, a field or a set of choices is used instead.

## 9. Applying and saving
3.62. **Controls that act at once never share a form with controls that wait for Save.** A form with Save uses checkboxes, radios, lists and fields. Switches and sliders sit outside it.
3.63. **In a form with Save, nothing applies until Save.** Cancel restores the saved values. A form with unsaved changes says so near its submit. Leaving asks first.
3.64. **Changing a value never moves the person elsewhere, submits, or opens a window.** A choice may reveal related questions in place.
3.65. **Questions revealed by a choice appear directly under the option that revealed them.** They're only simple questions. Anything complex moves to the next step. A follow-up is never revealed from two side-by-side yes/no options. Fields that may never apply aren't shown in advance as unavailable.
3.66. **Repeating rows add one row at a time, from an Add control below the last row.** Each row has its own Remove control. Removing a row with entries in it can be undone.
3.67. **A long edit of a stored object keeps a draft as it goes.** The draft is marked "Draft". Leaving offers to save, keep the draft or discard it. A never-saved object is discarded with "Discard". A saved one is removed with "Delete".
3.68. **Something that applies at once but can't easily be reversed is never a switch.** It's a button that confirms (3.86).
3.69. **Pre-filled and detected values show as editable fields, not static text.**

## 10. Selection
3.70. **Focus and selection always look different.** Moving to an item never selects it, unless showing the selection is instant and changes nothing else.
3.71. **One choice in a list uses radios. Several choices use checkboxes. A row that only opens something has no selected state.**
3.72. **A row's checkbox is its own target. Tapping anywhere else on the row opens the item.** In selection mode, tapping anywhere on the row selects or clears it.
3.73. **Select-all sits at the head of the selection column, and has three states: none, some and all.** Choosing it when some or none are selected selects everything loaded (3.74). Choosing it again clears them. It's left out where all and none would mean the same thing, as in a filter.
3.74. **Select-all chooses what's loaded, then offers to extend to everything that matches, with its count.** For example, "50 selected. Select all 1,240 matching". The selection persists through scrolling and loading more. Changing the filter or search clears it, and says so.
3.75. **On desktop, Shift extends a selection as a range, and Ctrl or Cmd with A selects everything.** Space selects the focused item without moving.
3.76. **By default on touch, a long press on an item in a collection that supports selection selects it, and starts selection mode.** Selection mode shows the count and a clear way out, and turns off row actions until it ends.

## 11. Menus
3.77. **A menu opens next to its trigger, toward the side with room,** and moves rather than being cut off. On compact screens, a menu too long for the space becomes a sheet from the bottom.
3.78. **A menu is short:** fewer than about ten items with no scrolling. A menu button holds fewer than about five. Items are grouped by dividers, with a few groups at most. Submenus go at most one level deep.
3.79. **Action menus list the most-used actions first, nearest where the menu opens.** Destructive actions come last, after a divider, in the destructive style.
3.80. **An item's menu holds only actions on that item.** Actions on the screen or product never go in it. Related commands stay together.
3.81. **What's in a menu opened by long press or right-click is also reachable from a visible control.** A "more" menu already is that visible route.
3.82. **By default, an unavailable menu item stays in place, unavailable, and says why when focused or pressed.**
3.83. **The trigger for an item's menu is a "more" icon or a down-arrow, never a gear or a menu icon.** It looks the same after a choice.
3.84. **Menu items never contain other controls.** An item that can be chosen shows a check. Choosing a multi-select item keeps the menu open; choosing a single-choice item closes it (3.31).
3.85. **Opening a menu by keyboard moves focus to its first item.** Arrow keys move through it, Enter acts and closes, and Escape closes and returns focus to the trigger.

## 12. Confirming, undoing and protecting
3.86. **Common actions that can be reversed act at once and offer undo. Rare actions that can't be reversed ask first.** The confirmation names the action and its result, its buttons name the outcomes, and neither is a default "Yes". Confirmations stay rare, so they're read.
3.87. **An action whose effect leaves the product (a command to a device, a message sent) is held back for the undo period where it can wait.** Where it can't wait, it's confirmed first instead. An effect already sent is never offered as undoable.
3.88. **The most dangerous actions need a step that can't happen out of habit,** such as typing the object's name. These are used rarely enough to stay deliberate.
3.89. **Undo names what it undoes ("Undo delete").** After undo or redo, what changed is scrolled into view. Undo stays visible until it's used or the moment passes.
3.90. **Editing surfaces (builders, canvases, editors) keep several levels of undo and redo.** Small changes to one property count as one step. Their undo and redo controls sit in the surface's toolbar, with the standard shortcuts. Other screens don't show standing undo and redo controls; they offer undo after an action (3.89).
3.91. **A safety action that must not trigger by accident starts with a hold, not a tap.** Progress fills visibly while it's held. Releasing early cancels it. Assistive technology reaches it through a confirmation step instead. The same action is never also on a gesture that could fire by accident.

## 13. Inline editing
3.92. **By default, inline editing is for values on a detail view that change often,** not inside a form.
3.93. **The read and edit views share one style and alignment,** so nothing jumps when editing starts.
3.94. **Confirm and cancel sit at the end of the field while editing.** Enter saves and Escape cancels. With a pointer, leaving a short value saves it. On touch, the edit waits for confirm, so an accidental tap away doesn't save half an edit. Long text stays in edit mode when focus leaves, so unfinished text is neither saved nor lost.
3.95. **An inline edit that fails validation stays in edit mode, with the error under the field.** The saved value doesn't change until the edit is valid.
3.96. **Editing in a table cell opens the cell in place for one value.** Several values, or a value that needs explanation, open the row's detail instead.

## 14. Gestures and drag
3.97. **Every gesture is a shortcut for something also reachable by a visible control:**
    - Swipe to delete has an Edit or "more" route.
    - Swipe to dismiss has a close control.
    - Pinch has zoom controls.
    - Swipe between items has previous and next controls.
3.98. **Standard gestures keep their standard meaning,** and nothing competes with the system's edge gestures.
3.99. **A gesture responds as it happens and shows how far it has to go.** It can be reversed before it completes.
3.100. **A swipe on a list item usually reveals at most two actions beside the item, with the item still readable.** A swipe means the same thing on every item of that kind. A full swipe acts only when the action can be undone.
3.101. **A long press means one thing per kind of item.** By default, in a collection that supports selection it selects; elsewhere it opens the same menu as the item's "more" control. A long press is never overloaded with a second meaning.
3.102. **Anything done by dragging can also be done by tapping.** For example, "Move to", or Move up and Move down. A keyboard route alone isn't enough.
3.103. **A draggable item has a grab handle that looks unlike a menu icon,** with space around it on touch. A drag starts at once from the handle. Without a handle, a held item drags only where long press isn't already used for selection (3.76). The item visibly lifts.
3.104. **While dragging, other items move aside before the drop.** A drop target highlights only while it can take what's over it. Dropping at the start, or outside a target, cancels the move and the item visibly returns. A drop can be undone; one that can't is confirmed first.
3.105. **A long list scrolls when a dragged item nears its edge.** Several selected items drag together, with a count.

## 15. Hover and keyboard shortcuts
3.106. **Hover never holds anything essential.** Anything shown on hover also shows on focus and is reached by tap on touch. Controls revealed on hover always appear on touch, or in the item's menu. Hover feedback never moves or resizes anything.
3.107. **Content shown on hover or focus can be dismissed with Escape, and the pointer can move onto it without it closing.**
3.108. **Keyboard shortcuts only speed up what's already reachable.** They're few, and kept for the most frequent commands. Standard shortcuts keep their standard meaning (copy, paste, undo, redo, save, find). They avoid the keys the operating system and assistive technology use. A single-key shortcut works only while its area has focus, or can be turned off.
3.109. **A shortcut is shown beside its command** in menus and in the control's hover name.

## 16. Scanning and hardware input
These assume what the device already does. The scanner reports each read with its own sound, vibration and light. Scanned data arrives as typed keystrokes into the focused field, or is delivered to the product directly without a focused field. Administrators can remap physical keys.
3.110. **A screen that expects a scan accepts it without the person first choosing a field.** The scan lands in the field or step it belongs to, never in whatever happens to have focus.
3.111. **A field that accepts a scan also accepts typing,** with the same validation either way. Typing stays visible on the same screen as the scan.
3.112. **By default, a scan on a scan step completes that step and moves on by itself, where the instruction says so ("Scan the bin label").** In a form with several fields, a scan fills its field and moves to the next, and never submits the form. A key the scanner sends after the data (Enter or Tab) moves to the next field and never triggers submit.
3.113. **A scan that doesn't fit the current step is never silently accepted or discarded.** The screen says what was scanned and what was expected, in the field or step, and the person scans again or types.
3.114. **Scanning the same item twice is caught at the item.** Where a count is expected, the count goes up and says so. Where it isn't, the screen says it was already scanned.
3.115. **On a scan-first screen, the on-screen keyboard stays closed until the person chooses to type.**
3.116. **Repeated or continuous reads (RFID, multiple barcodes in one trigger) count up live against what's expected ("18 of 24").** Each item appears once, however many times it's read. The read ends the way the device's trigger is configured (release, or a second press), or on "Done".
3.117. **The screen confirms a scan by showing what was captured and what happens next.** It doesn't repeat the device's own read signal. A scan the product rejects adds its own distinct sound and vibration, because the device's beep means only that a code was read.
3.118. **Physical keys and triggers do what the screen already offers.** The scan trigger scans. A confirming key does the screen's primary action. Every hardware action has a control on screen. The product never depends on which key does what, because administrators can remap them.
3.119. **Where a device's physical buttons have assigned jobs (push to talk, duress, a programmable key), the screen shows what each one does,** by default on the edge nearest that button. Where that can't hold (rotation, vehicle mounts, different models), each job is listed with the button's name.

## 17. Motion and haptics tied to interaction
3.120. **Feedback on a control (press, toggle, check) is the shortest motion,** about a tenth of a second. A small expansion takes a little longer. Larger surfaces entering (an overlay, a sheet, a side panel) take longer again. Nothing that responds to a person reaches half a second.
3.121. **Duration grows with distance and size. Exits are quicker than entrances.**
3.122. **Entering elements slow into place. Leaving elements speed up out. Elements that stay, or will return, use the standard curve.** Nothing that travels moves at a constant speed. Continuous indicators, such as spinners, are the exception.
3.123. **What people do constantly gets the least motion, or none.** Noticeable motion is kept for rare, significant moments.
3.124. **Motion never blocks input.** People can act before an animation ends, and motion driven by a gesture follows the finger and can be reversed.
3.125. **Motion matches the gesture.** Something that came in from the bottom leaves downward.
3.126. **Motion is never the only signal.** Every change of state also shows when still.
3.127. **Haptics follow importance and frequency.** Frequent events are barely felt or not at all. Commits are stronger than a toggle. Haptics are crisp, never a long buzz, and are timed with the visual and sound feedback. The same kind of interaction always feels the same.

## 18. Field devices and fleets
3.128. **Camera scanning shows what it's reading before accepting it.** With several codes in view, the person taps the one they want. A light control and a way to type the code stay on the scan view.
3.129. **On devices with physical keys, every control works with the arrow keys and Enter alone.** Arrows move between items, Enter acts and Back leaves. A numbered menu accepts the digit.
3.130. **By default, a control that appears under a finger during a transition ignores taps until it has settled,** so a quick double tap never acts on the next screen.
3.131. **A talk control transmits only while held, and stops on release.** A latch option exists for hands-busy work. Transmitting is unmistakable, both on screen and on the hardware key.
3.132. **While a character is still being composed (as in many Asian-language keyboards), Enter confirms the character, never the form.** Typeahead waits until composing ends.
3.133. **Filtering ignores case and accents. Number fields accept the locale's decimal separator and grouping.**
3.134. **On a shared device, fields never offer values another person entered.** Saved entries clear when the session ends (3.41).
3.135. **A confirmation for an action on many devices or people states the count and the scope** ("Restart 1,240 devices at Site 4"). Devices that are offline are said to be queued, not done.
3.136. **Serial numbers, network addresses and keys can be selected, with a copy control that confirms in place.**
3.137. **By default, on a small display driven by a few buttons, each button's current meaning shows next to it, and Back always goes up one level.**
