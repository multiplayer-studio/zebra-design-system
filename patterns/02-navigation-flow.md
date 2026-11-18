# Navigation and flow

How people move between places and through steps: structure, global and local navigation, back and exit, deep links, wizards, question flows, task loops, interruption, handoff, onboarding and sign-in.

Not covered here: where navigation sits on screen, how it changes with width, wording, and session timeouts.

**When rules conflict.** Accessibility minimums come first; a more specific rule wins over a general one; where two files disagree, the one whose subject it is wins. A rule or sentence that starts "By default" is a default a project may override, recording why in its `CHANGES.md`; defaults in 06 may only be made stricter, and every other rule is strict ([precedence](README.md#precedence)).

**Terms used here**
- **Compact, medium, expanded, large:** size classes by window width, never by type of device ([Terms](README.md#terms), [DESIGN.md §6](../DESIGN.md)).
- **Leading, trailing:** the start and end of a line in the reading direction (left and right in left-to-right languages).
- **Shared device:** one device used by several people in turn, who sign in at the device.

---

## 1. Structure
2.1. **The structure prefers broad and shallow.** A level is added when there are too many peers to show at once, or when the choices at the next level need grouping to make sense. On small screens and in gloved use, fewer choices per level can justify one extra level.
2.2. **A deep structure always has a second way in.** That means a search, an index or a "most used" list, plus a visible sense of where the person is.
2.3. **Top-level areas are flat, with a hierarchy inside each area.** By default, side navigation shows at most two levels. A group heading in the navigation isn't a level. A third level moves into the content, for example as a list column beside it, or as tabs.
2.4. **Each screen has one home in the structure, however many ways lead to it.** A view needed from several places links to that home, or opens as an overlay over each place. It's never copied into the structure twice.
2.5. **A product built around one object type (a printer, a device, a site) gives each object its own hub.** The hub opens with the object's identity and current state, then links to that object's local areas. Global navigation is usually not added for one object.
2.6. **A product with one clear end-to-end job usually has no global navigation.** It leads people through the job, using a task list where the job spans sessions (2.36). Settings, help and sign-out stay reachable from the header.

## 2. Global and local navigation
2.7. **Global navigation reaches every top-level area, and only top-level areas.** Its entries are equally important peers. Single tasks aren't in it. Settings may close the list where the product has many of them.
2.8. **Global destinations keep fixed positions and the same order on every screen.** They never reorder or disappear. A long side navigation may scroll inside its own area. A destination with nothing in it stays, and explains when opened.
2.9. **By default, each destination keeps its own place.** Switching away and back returns to where the person was, with the same scroll, tab and filters. Selecting the destination the person is already on returns it to its top. After a long absence or a change of person, it may reset (2.61, 2.75).
2.10. **By default, global navigation stays visible on every top-level screen while content scrolls.** Only a temporary overlay, or a full-screen task the person entered on purpose with its own way out, covers it. A product whose platform hides bars on scroll may do so on long reading screens, as long as the first scroll up brings it back.
2.11. **Local navigation shows the current area's siblings and children,** marks the current one, and is visibly quieter than global navigation. It never reorders by usage, and differs only by what the person's role can reach.
2.12. **Local navigation inside a destination never switches the destination.**
2.13. **In a layout with several panes, the current selection stays marked in every pane that leads to what's shown.**
2.14. **By default, navigation doesn't perform actions.** Actions sit with what they affect. The product's primary navigation (rail, drawer or bottom bar) may hold its one main create action.

## 3. Back, up, close and cancel
2.15. **Back returns to the previous screen exactly as it was left:** scroll position, entries and selection. If that earlier state can no longer be shown, the screen says so on return.
2.16. **By default, Back moves one step at a time.** It never restarts a flow. A finished flow and a completed sign-in are taken out of history, so Back skips them.
2.17. **Back closes whatever is layered on top first,** whether an overlay, sheet, expanded panel or extra pane, before it changes screens.
2.18. **System back is always handled.** It may be held while it explains why (2.27, 2.64), but it's never silently ignored. Screens below the top level show a back or up control at the leading end of the header by default (2.19).
2.19. **Up goes to the parent screen and never leaves the product.** The start screen has no Up.
2.20. **The start screen is fixed.** It's the bottom of history and where Up ends, even when the product resumes somewhere else (2.26, 2.59). Sign-in and one-time setup are steps people pass through, never the start screen.
2.21. **Changes made in place don't add to history.** That includes switching tabs within a page, selecting an item beside its detail, filtering, sorting, moving between view and edit, and stepping to the next or previous item from a detail, which replaces the current step (2.56). Opening a new screen adds one.
2.22. **Back never repeats a one-time action.** After a submission, going back shows a screen explaining that it's done, not the form ready to send again.
2.23. **Cancel abandons a task and may discard its changes. Close dismisses a view and keeps its changes.** By default, a bare ✕ appears only where closing keeps everything. Where the platform's full-screen dialog uses ✕ to discard, leaving with changes still asks first (2.24).
2.24. **Leaving with unsaved input asks first, naming what will be lost.** The buttons name the outcomes ("Discard changes", "Keep editing"), and neither is a default "Yes". Leaving with nothing unsaved never asks.
2.25. **Inside a sheet or step-by-step overlay, Back is a step and never dismisses.** Cancel and Done dismiss. Outside a step-by-step overlay, Cancel, Done and Back don't appear together. Inside one, Back, Next and Cancel do (2.41).
2.26. **Back from the product's start screen leaves the product with its state intact.** Coming back resumes where the person was.
2.27. **While an operation runs that can't safely be interrupted, Back explains that it's in progress.** Examples are pairing, a firmware update or a deployment step. Back doesn't abandon the operation silently.

## 4. Deep links, notifications and return paths
2.28. **A link into the product lands on its target with the product's normal structure under it.** Back and Up walk up to the start screen. If the person arrived from another app, Up stays in this product, and system Back returns to that app.
2.29. **A link restores everything it describes:** the object, the selection, the search and the tab. A target that no longer exists, or that the person can't see, shows a message in the place the target would have been.
2.30. **A link that needs sign-in signs the person in, then continues to the target.** Declining lands somewhere that doesn't need sign-in, and the product doesn't ask again in a loop.
2.31. **A link into something with an unsaved draft asks whether to continue the draft or view the saved version.**
2.32. **Opening a notification goes to the specific thing it announced,** with the product's normal structure beneath it. If the thing has changed, been completed by someone else or been removed since, the destination says so.
2.33. **Dismissing a notification doesn't complete the work it was about.** That work still shows in the product.
2.34. **A link that expires says why, and offers a new one or says who can issue one.**

## 5. Wizards and task lists
2.35. **A wizard is for a short task whose steps must happen in order, which people do rarely.** Very short tasks, daily routines, steps that can happen in any order and repetitive entry don't use one. People who do the task often get an editable form or object page instead, and their earlier answers become defaults next time.
2.36. **Long work done across several sessions uses a task list instead of a wizard.** Tasks are named with verbs and can be done in any order where possible. Each has a status, and "Done" is shown quietly so unfinished tasks stand out. Tasks that can't start yet aren't links. The list shows at the start and on every return.
2.37. **A wizard's title names the task and the object, and stays the same on every step.**
2.38. **By default, the step list shows completed, current and upcoming steps.** Completed steps can be revisited from it. Upcoming steps can't be jumped to while creating. When editing something that already exists, any step can be opened. Where later steps depend on answers, the list shows that more steps follow instead of a fixed total. Only steps that apply are ever shown. Optional steps say so.
2.39. **Each step is complete in itself.** Help sits beside it, not over it. Nothing given earlier in the flow is asked for again; it's filled in or offered.
2.40. **Next checks only the current step.** The final action checks everything. Focus moves to the start of each step shown, including when it's reached from Change on the review.
2.41. **From step two onward, Back appears beside Next.** On the step before the review, Next reads "Review". On the review, it names the finishing action. Cancel or Discard stays in the same place throughout.
2.42. **Changing an earlier answer that later steps depend on warns before those steps' entries are discarded.**
2.43. **A step that waits on a device or a long operation shows that progress inside the step.** Next stays unavailable until it finishes, with the reason shown. Back and Cancel say what happens to the operation if used.
2.44. **The review step comes before anything is committed.** It shows each step's answers in the same order and layout they were entered in, each section with Change. Change returns to the review afterwards, unless the change needs new answers. Those are asked first. A step that must act on a device during the flow (pairing, joining a network) says so on the step, and the review marks it as already applied.
2.45. **A wizard keeps a draft as it goes.** Leaving and returning restores the exact step and entries. Opening a task that already has a draft says so, and offers to continue or start again. Secrets (passwords, network keys, certificates) are never kept in a draft, and a draft belongs to the person, not the device.
2.46. **Cancel returns to the screen that started the wizard.** It asks first only if something was entered. A draft with no changes is dropped without asking.
2.47. **Finishing a wizard also returns to the screen that started it,** with the result visible there, or ends on a confirmation (2.50).
2.48. **A wizard inside an overlay is best kept for short tasks tied to the screen behind it.** Longer or standalone tasks are usually full screen. Like any overlay, it never opens another overlay ([1.110](01-screen-composition.md)). The leave confirmation (2.24) is the exception: it replaces the overlay rather than stacking on it.

## 6. Question flows and outcomes
2.49. **A flow that asks things of the person asks what decides eligibility first.** An answer that rules the person out goes straight to a screen saying why and what to do instead.
2.50. **A flow that commits something significant ends on a confirmation.** It holds:
    - the result and its reference
    - what happens next and when
    - how to get help
    - the likely next task

    The confirmation stays valid if revisited.
2.51. **An interruption screen pauses a flow only for an unusual, probably mistaken or irreversible answer,** or for a conflict with known data. It holds one heading, short text, Continue, and a way back to change the answer. It's used rarely, because it loses its effect when seen often.
2.52. **The start of a long flow says what it does, what it needs, and roughly how long it takes.** One button names the action, and returning people can continue where they left off.
2.53. **By default, where a recommended path exists, the flow starts on it.** Alternatives are offered at the same point, and taking one never costs more steps than needed.
2.54. **When the outcome can't be confirmed yet, the flow says so.** For example, a device was sent a change but hasn't reported back. The outcome is never declared successful before its result is known.

## 7. Repeated work
2.55. **By default, repeated work runs as a loop with a running count and a clear end.** Examples are scanning items into a count, or checking a series of bays. Each scan or entry is confirmed in place, and the screen is immediately ready for the next. The last entry can be undone in one step while it hasn't been sent. The loop ends with an explicit "Finish", which shows a summary. A blind count hides the expected quantity on purpose. Continuous work with no natural end shows the running count only.
2.56. **Moving to the next or previous item from a detail replaces the current history step rather than adding one.** Back then leaves the run instead of rewinding through every item.
2.57. **Saving one item in a run offers "Save and next" beside "Save",** so the run continues without returning to the list.
2.58. **Adding a few typed items of one kind loops through a summary of what's been added.** Scanned items follow 2.55. Each item has Change and Remove, and "Add another" is asked each time.

## 8. Interruption and resume
2.59. **The product saves the person's place continuously, and restores it exactly on return.** That covers screen, step, scroll, entries and selection.
2.60. **Work that needs no input finishes while the person is away, where the platform allows; otherwise it pauses and says so on return.** On return, what needs attention is flagged where the work was started.
2.61. **After a long absence, the product may return to its start screen,** on the assumption the person is starting something new. Any unfinished draft is offered there.
2.62. **An overlay closed by accident keeps what was entered, and is easy to reopen.**
2.63. **An activity that must continue while the person moves around the product stays reachable from every screen,** by default as a floating element, such as an active call or a recording. Push-to-talk may live on its hardware key and the system's ongoing notification instead. It returns to full view in one tap.
2.64. **A safety or duress action is reachable in one action from every screen.** It takes a deliberate second step to start. Once started, it holds the screen until it's resolved or cancelled.

## 9. Handing off and coming back
2.65. **A step handed to another app or device says where it's going and why,** and what the person will do there. The person returns to the same place, and the screen updates with the result.
2.66. **A step that sends the person elsewhere shows a waiting screen.** Examples are scanning a code on a handheld, or confirming by email. The waiting screen says where to go, offers to resend or try another way, and moves on by itself when the step is done.
2.67. **On a device poor at entering data, sign-up and lengthy entry are offered on another device.** Examples are a wearable, a vehicle mount or a kiosk.

## 10. Search as a way in
2.68. **Global search is one clearly identified place to find anything.** It searches everything by default. A search inside an area filters that area.
2.69. **From a search result, Back returns to the results, and Up goes to the item's real parent.**

## 11. First run and sign-in
2.70. **The product starts straight into its work, with sensible defaults.** Teaching happens in context, when a feature first matters. Any first-run guidance is brief, can be skipped, never repeats once skipped, and stays findable in help.
2.71. **Setup questions at first run are only those the product can't work without,** on one screen if possible.
2.72. **A product that an administrator has set up on a managed device asks the worker nothing that was already configured.**
2.73. **Sign-in is required only where the work needs it,** and is separate from the product's navigation. It interrupts the destination, then continues to it.
2.74. **Sign-in asks for the identity first, then the password or single sign-on step that identity needs.** A sign-in error never reveals which part was wrong.
2.75. **On a shared device, the device handles who is signed in.** The product picks up the current person automatically, and returns to a neutral start screen when the person changes.
2.76. **Signing out asks first only when unsent work or a draft would be lost, then lands on sign-in.** When the same person signs back in after a timeout, they return to the same place; anyone else starts from the start screen.

## 12. Navigating with hardware
2.77. **Hardware keys move people only in the ways the screen already shows.** A key that confirms or advances does exactly what the on-screen primary action does. A key that goes back does what Back does. No movement is possible only by a hardware key.

## 13. Structure across roles, tenants and devices
2.78. **Breadcrumbs follow the structure, not the path the person took.** The current page is last and isn't a link. Each crumb opens its level as it was left.
2.79. **In a web console, every place and view has its own address.** The browser's Back and Forward match the product's history. Refreshing keeps the place, and links open in a new tab like any link.
2.80. **Navigation shows only what the person's role can use.** A destination they can't reach is left out, not shown unavailable. A link to one lands on the no-access state.
2.81. **History doesn't cross a switch of tenant or site.** After switching, Back stays in the new scope. A link to an object in another scope switches to it and says so.
2.82. **A kiosk or single-app product has no way out except an administrator's.** After an idle period it warns, then clears what was entered and returns to its start screen.
2.83. **Scanning an item, location or device label opens that thing from any screen that isn't expecting a different scan,** with the product's normal structure beneath it, as a link would (2.28).
2.84. **Something arriving mid-task, such as a push-to-talk call or a reassigned job, doesn't take over the screen unless it's about safety.** It appears as a notice, and the task resumes exactly where it was.
2.85. **Unfinished work belongs to the person, not the device.** The next person on a shared device never inherits it. The first person can pick it up on any device, or hand it on explicitly.
2.86. **A worker's home is their assigned work, in the order it's due.** Finishing one item returns to the list with the next one ready to start.
2.87. **By default, a printer's own small display keeps its menu one or two levels deep.** One known key always returns home, and idle time returns it to the ready screen.
2.88. **Changing language keeps the person on the same screen with their entries intact,** including when a shared device switches to the next person's language.
2.89. **A wearable or keypad device without touch reaches every destination with its keys,** in the order shown on screen.
