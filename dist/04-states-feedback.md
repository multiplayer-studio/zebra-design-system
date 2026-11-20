# States, feedback and recovery

What happens in each state, and how messages behave over time: loading, empty, error, success, offline, sync, permissions, sessions, device states, message lifetime and severity.

Not covered here: where a message or state sits on screen, and the words.

**When principles conflict.** Accessibility minimums come first. A product's own shell and established patterns come next, and win over the defaults here. A more specific principle wins over a general one. Where two files disagree, the one whose subject it is wins.

**Terms used here**
- **Shell:** what stays the same on every screen of a product: the header, global navigation, and any device or session context. Everything inside it is the content area.
- **Region:** a major area of a screen, such as the header, navigation, content area, a pane or a pinned bar. A **pane** is a column in the content area.
- **System banner, notice, toast:** a system banner is a full-width message below the header about a condition affecting the whole product; a notice is about one page, section or element and sits at its top; a toast briefly confirms something the person just did, and never carries an error.
- **Floors:** accessibility minimums (contrast, target size, text size, reflow). They're minimums, never design values.
- **Shared device:** one device used by several people in turn, who sign in at the device.

---

## 1. How states combine
4.1. **A region's content is loading, content, empty or error.** Partial and stale content count as content, marked as such (4.4). "Empty" appears only after loading has finished. A region never shows "nothing here" while it's still loading.
4.2. **Connectivity, sync, permission and lock are separate from the content state, and can hold at the same time as it.** Content can be showing while the app is offline, one item waits to sync, and another is locked by someone else. Each condition shows in its own place.
4.3. **Refreshing, a message, and the content itself can coexist.** A refresh shows over existing content without replacing it. A message never clears the content it's about.
4.4. **When several conditions affect the same region, it shows the one that most limits what the person can do, and keeps the others reachable.** By default, the order is:
    1. can't show at all (no permission, or a fatal error)
    2. offline with no local data
    3. stale or partial data
    4. busy or syncing

    A group of statuses rolls up to its most severe. A product whose main task depends on freshness may rank staleness higher.
4.5. **Whatever has loaded is usable while the rest loads.** Controls that work are active straight away. A control is inactive only if acting before loading finishes would be wrong.

## 2. Empty
4.6. **An empty state replaces the empty content in place.** The header, navigation, filters and actions stay.
4.7. **No results keeps the active search and filters visible next to it, with a way to clear them.** It's clear that the search ran and genuinely found nothing.
4.8. **A first-use empty state links straight into the task** with a create action, not a sentence telling the person to create something.
4.9. **Having finished everything is its own empty state,** and it's positive.
4.10. **Having no permission is an empty state that says why and how to get access,** not a generic error.
4.11. **When data exists but can't be shown, it's an error state, not an empty one.**
4.12. **When several small areas on one screen are empty at once,** they use text only and a low-emphasis action. Each one doesn't repeat an illustration and a primary button.

## 3. Loading
4.13. **Under about a second, no loading indicator shows.** From about a second to about 5 seconds, an indicator shows that work is happening. Past about 5 seconds, measured progress shows where the amount of work is known, and named steps where it isn't (4.28). A way to stop is offered where stopping is safe (4.21). This lower cut-off is used because field networks make timing unpredictable.
4.14. **Once an indicator appears, it stays for at least about half a second,** so it doesn't flicker.
4.15. **The control that was pressed responds immediately.** It shows in progress and turns off while its action runs, so it can't be pressed twice. Controls whose result depends on the running action are also inactive; everything else stays usable (4.5).
4.16. **The indicator matches the scope of what's loading.**
    - **A whole screen:** a skeleton of the real layout.
    - **One region:** an indicator centred in that region.
    - **One action:** an indicator in its control.
    - **Loading more items:** an indicator where the new items will appear.

    There's only ever one indicator per loading scope.
4.17. **A skeleton shows only what will actually appear,** in the real layout. If the number of items is unknown, it fills the visible area by default.
4.18. **Progress is measured whenever the amount of work is known.** An indicator switches from unmeasured to measured as soon as it can, keeping the same shape.
4.19. **Measured progress only moves forward.** Multi-step work is one continuous bar whose label changes with each phase. It never restarts for each step.
4.20. **Progress names the specific work and counts items or steps ("Updating 3 of 50 devices").** A count is used rather than a time estimate where possible.
4.21. **A long operation offers Cancel, or Pause where cancelling would lose work.** If stopping has a consequence, it says so. Work with a point of no return, such as writing firmware, offers Cancel until that point, which the progress marks. After it, Cancel goes, and the screen says why and shows elapsed progress.
4.22. **Progress that fails stays on screen and says what went wrong, in place.** It never just disappears.
4.23. **The whole screen is blocked only for work that must not be interrupted.**
4.24. **By default, where success is the usual outcome and the action can be reversed, the screen shows the result straight away and reverts if the action fails.** Commands with physical or irreversible effects (print, wipe, unlock) wait for their result instead. Offline, the item shows as waiting to send, not reverted (4.53). When it reverts, the item returns to its earlier state, and an inline message at that item says what didn't happen. If the item is no longer on screen, the failure goes to the shared activity place (4.26).

## 4. Background and long-running work
4.25. **Long work runs in the background while the person carries on in the app.** Leaving the screen never cancels it.
4.26. **Running work shows its status where it was started,** in the row or object it affects. It also shows in one shared place for activity across the app.
4.27. **Background work that finishes is announced, and the announcement stays until the person has seen it.** It says what ran, its result, what it skipped or failed, and links to the result.
4.28. **Where a time estimate isn't reliable, a list of completed and remaining steps replaces the percentage.**
4.29. **Sync and long jobs carry on when the app is in the background, where the platform allows.** If the system pauses them, their status says so on return.

## 5. Success
4.30. **Routine success is quiet.** The visible change is the confirmation: the item appears in the list, or the button reads "Saved". A message is used only when the result isn't visible or matters.
4.31. **A message confirming success is a toast, and it times out.** A flow that commits something significant ends on a confirmation instead.
4.32. **Success is announced to assistive technology without moving focus,** and it's never shown by colour alone.
4.33. **On a scan-driven screen, the device's own sound, vibration and light confirm the scan.** The screen shows what was captured and what happens next.

## 6. Errors and recovery
4.34. **An error appears at the scope it affects.**
    - A field error sits at the field.
    - A section error sits in the section, with its own retry, and the rest of the screen keeps working.
    - A screen error replaces the content area.
    - A failure of the whole service gets its own page in online-only products. A product that works offline drops to offline working instead (4.49).
4.35. **An error says whose side the problem is on:** the person's input, their connection, a device, or the service.
4.36. **Retry is offered only when retrying could work.** It's never offered for a lack of permission, or for an action known to fail.
4.37. **Automatic retries back off and stop after a limit.** While retrying, the area shows that it's retrying, not that it has failed. Queued work sends itself when the connection returns.
4.38. **Retrying resumes from the point of failure where the work allows it.** Otherwise it starts again with everything the person entered kept.
4.39. **By default, after the same action fails again, the message changes.** The first failure offers retry. After repeated failures, it gives more detail, a different way to get the job done, and how to reach help, all inside the flow.
4.40. **A whole-service failure page says:**
    - to try again later
    - what happened to the person's work
    - another way to get the job done

    If the outage will last, it becomes a service-unavailable page saying when the service returns.

## 7. Validation
4.41. **By default, a field is checked when the person leaves it, not while they're typing it for the first time.** The service checks it again on submit, which is how a valid-looking form can still fail (4.43). Fixed-length values are checked once they reach their full length.
4.42. **Once an error shows, it clears the moment the input becomes valid,** keystroke by keystroke. Fields that depend on each other are rechecked together.
4.43. **Next and Submit stay disabled until the step or form is valid, with the reason shown next to them.** If a submit still fails, for example on the server, the form returns with every entry kept, errors at each field and the summary at the top.

## 8. Partial and batch results
4.44. **Where eligibility is known in advance, items that can't take the action are counted before acting,** and the person chooses whether to go ahead with the rest. If none can take it, the action is disabled, with each item's state showing why. Where eligibility is only known at the device, ineligible items are reported in the results instead.
4.45. **The result of a batch depends on its outcome.**
    - **All succeeded:** a toast with the count.
    - **None succeeded:** a summary listing each failure and why.
    - **Some succeeded:** a summary led by the success count, then each failure.
4.46. **By default, after a batch action, failed items stay selected, with a way to retry only them.** Failures can be filtered to on their own.
4.47. **A partial or batch failure never appears only in a toast.**
4.48. **A long operation across many items or devices shows the result for each one as it lands.** Results are grouped by outcome (done, waiting, failed) with counts. Its overall status shows progress against a completion threshold, with the long tail (devices offline for days) counted separately, so one absent device never keeps a large job open forever.

## 9. Offline and sync
4.49. **In a product that works offline, being offline is a condition the app works in, not an error.** Local data shows immediately, and only what truly needs the network stops working.
4.50. **A product that works offline has one connection and sync indicator in the shell.** It stays quiet while connected and in sync, and shows one of:
    - connected
    - offline
    - syncing
    - waiting to send, with a count
    - sync problem

    Opening it shows what's waiting, when the last sync happened, and Sync now.
4.51. **Features that don't work offline say so at the feature, in words.** Greying out alone is never used, because grey already means disabled.
4.52. **The offline notice says what still works and what will happen to the person's work.** It doesn't just say "Offline".
4.53. **Work done offline is saved locally and marked "waiting to send" until it's sent,** clearly distinct from work that has been sent.
4.54. **Actions that must happen online now are disabled while offline, with the reason.** They're never queued silently.
4.55. **Losing the connection mid-task shows an immediate, non-blocking notice and lets the task continue offline where it can.** When the connection returns, waiting work sends itself quietly. The person is told only about failures, or about work they were told was waiting.
4.56. **When an offline change conflicts with a newer change from elsewhere, the person's change is never silently lost.** By default, the record is flagged for someone who can resolve it, with both versions available. Counts and other values that add together merge by adding the changes. Records that can be merged field by field are merged, and the merge is shown.

## 10. Freshness
4.57. **Data that changes over time shows when it was last updated.**
4.58. **Where freshness matters to safety or decisions, data updates automatically.** Elsewhere, new data is announced and applied when the person chooses, so they don't lose their place.
4.59. **By default, a manual refresh is available, and its indicator stays until the refresh finishes.** Data pushed live may leave it out.
4.60. **Data older than the product's freshness limit is marked as out of date where it's shown, not just timestamped.** The product sets that limit for each kind of data.

## 11. Permissions and locks
4.61. **By default, an operating-system permission is requested when the person first uses the feature that needs it.** A permission the product's core job can't work without (the camera in a scanning app) may be asked for up front, with one screen saying why. On managed devices, permissions an administrator has granted are never asked for again.
4.62. **After a permission is denied, the app keeps working.** The feature that needs it shows, where its result would be, which feature is unavailable and how to enable it. It doesn't nag.
4.63. **By default, a control locked by an administrator or policy stays visible, read-only, with a lock and the words "Managed by your organisation" (or the product's equivalent).** The control's value is still shown. A policy may hide a feature entirely instead.
4.64. **An object locked by another person shows that as its status.** Opening the status shows who holds the lock and since when. Editing is refused with the reason. A stale lock can be taken over, with a warning that the other person's unsaved changes will be lost.

## 12. Sessions and timeouts
4.65. **A session ends from inactivity only when security or resources require it.**
4.66. **At least two minutes before a timeout, a dialog warns the person.**
    - Its primary button continues and resets the timer.
    - Its secondary button signs out.
    - Extending has no limit by default. Where security sets an absolute session length, the warning says when it ends.
    - The countdown runs in minutes, then in 20-second steps in the last minute.
    - The countdown is announced politely to assistive technology.
4.67. **The warning says whether work will be kept.**
4.68. **After a timeout, a screen explains what happened and offers sign-in.** When the same person signs back in, they return to the same place with their input kept. Anyone else starts from the neutral start screen (4.69).
4.69. **On a shared device, a change of user ends the previous person's session in the app.** Nothing they entered or viewed is shown to the next person. The app's own timeout never undercuts the device's sign-in.

## 13. Device and hardware states
4.70. **A device shows its connection and its condition separately, each from one fixed set across the product,** rolled up by 4.4 where space allows only one. A printer can be connected and need attention at once. Each status has a word, an icon and a colour (see 4.79). The set is:
    - connected
    - connecting
    - busy
    - needs attention
    - updating
    - offline
    - error
4.71. **A device's status sits with the device wherever it's shown,** not in a separate alert. "Needs attention" names the physical cause and its fix.
4.72. **By default, when a device is unreachable, actions that need it are disabled with the reason.** Actions that can wait are queued, marked as waiting for the device, and sent when it returns.
4.73. **By default, a busy device accepts nothing new that would interrupt it.** Its actions say it's busy and show what it's doing. Commands that can safely wait are queued.
4.74. **Connecting names each step ("Pairing", "Checking settings"), counts its steps (4.20), and says what the device should be doing** (lights, sounds).
4.75. **A disconnected device is detected by the product itself.** A known device reconnects automatically using its stored pairing. If the pairing is lost, setup resumes from the step that failed.

## 14. Message lifetime and stacking
4.76. **How long a message stays depends on whether it needs action, not on its colour.**
    - Messages that need action stay until acted on.
    - Messages that need none may time out.
    - Errors that need action now (4.80) never time out.
    - A timed message pauses while it's hovered or focused, and respects the device's accessibility timeout setting.
4.77. **A validation message clears only when its problem is fixed.** A notice clears when it's resolved or dismissed. A system banner can be dismissed unless it's critical, and returns while its condition remains.
4.78. **A newer message about the same thing replaces the older one.** The same message isn't sent again if it was ignored. Messages that can be dismissed and messages that can't never share a stack.

## 15. Severity
4.79. **There are four levels of severity, each with one fixed meaning, colour, icon shape and word, used identically in every component:**
    - **Error:** something has failed. It blocks progress when it's in the person's path.
    - **Warning:** something may go wrong, and the person can continue.
    - **Success:** done as expected.
    - **Information:** nothing needs doing.

    A warning is about a risk or a condition that needs attention, such as low media. An error is about something that failed.
4.80. **Severity sets how intrusive a message is.**
    - Information and success are passive.
    - Warnings sit inline or in a banner with a remedy.
    - Errors sit at their source with a remedy.
    - Only an error that needs action now interrupts, as a dialog.
4.81. **Neutral states that aren't severities (draft, not started, inactive) use a neutral treatment.** They never borrow a severity colour.

## 16. Notification centre
4.82. **A notification centre holds system messages so they can be read later.** It opens from one entry point in the shell, lists the newest first, and can be grouped by source or urgency.
4.83. **Each item makes sense on its own.** It says what happened, to what and when, and links to it.
4.84. **Items are unread until opened. "Mark all as read" is available.** The badge on the entry point counts items not yet seen, and clears when the centre is opened.
4.85. **Urgency is represented accurately and sparingly.** Only what needs action now interrupts. Everything else waits in the centre.

## 17. Field and fleet realities
4.86. **When the product can't tell whether something it sent arrived, the item shows "Checking", not "Failed".** Retrying never creates a duplicate.
4.87. **Work waiting to send stays with the person who did it.** It survives sign-out, a change of user and an expired sign-in. It sends once anyone signs in, and the next person never sees what's in it.
4.88. **After the system closes the app, a battery swap or a restart, the app reopens to the task in progress,** with its entries and queue intact.
4.89. **A scan the product rejects (wrong item, duplicate, unreadable) gets its own sound and vibration, different from a good read,** because the person is looking at the shelf, not the screen.
4.90. **A print job has its own status, separate from the printer's:** queued, printing, held, failed or done. "Sent" is never shown as "printed". A held job resumes once its physical cause is cleared.
4.91. **A physical condition clears itself.** When a printer reports its cover is closed or its media is loaded, the attention status and its message clear without anyone dismissing them.
4.92. **An interrupted update leaves the device on its last working version, and the product says which version that is,** and offers to try again.
4.93. **Many devices with the same problem become one alert with a count.** A condition that flips on and off is held back until it's stable. "Acknowledged" and "resolved" are different states.
4.94. **A deployment shows the devices it hasn't reached yet as waiting, with when each was last seen.** Cancelling stops only the devices still waiting, and says how many have already changed.
4.95. **Push-to-talk always shows whether the person can talk.** Talking, receiving, channel busy and request refused each have their own sound and screen state.
4.96. **Low storage or battery warns before offline work can no longer be saved,** and says how much waiting work is at risk.
4.97. **Every notification names the tenant or site it belongs to.** Acting on it switches to that context first.
