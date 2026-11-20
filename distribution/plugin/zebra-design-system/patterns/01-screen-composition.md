# Screen composition

Where each part of a screen goes, how it relates to what's around it, and how it changes with the size of the screen. These principles describe roles (a filter, a system notification, a primary action), not a particular component, so they hold in any product and any design system. If a product doesn't have a role, the principles for it don't apply.

**When principles conflict.** Accessibility minimums come first. A product's own shell and established patterns come next, and win over the defaults here. A more specific principle wins over a general one. Where two files disagree, the one whose subject it is wins.

**Terms used here**
- **Compact, medium, expanded:** window widths. Compact is phones and rugged handhelds in portrait, medium is small tablets and handhelds in landscape, and expanded is large tablets and desktop. Layout follows width, never the type of device.
- **Leading, trailing:** the start and end of a line in the reading direction (left and right in left-to-right languages).
- **Pinned:** stays in place while the rest scrolls.
- **Shell:** what stays the same on every screen of a product: the header, global navigation, and any device or session context. Everything inside it is the content area.
- **Region:** a major area of a screen, such as the header, navigation, content area, a pane or a pinned bar. A **pane** is a column in the content area.
- **Organism:** a distinct section composed from smaller parts for one job, such as a composer, a summary tile or a commit bar.

---

## 1. Composing the screen

A screen is not a set of components placed in a layout. It is built from its job outward: the primary interaction first, then what supports it, then everything else. These principles come before every section that follows.

### Starting from the job
1.1. **Before choosing any component, decide what kind of screen this is from the person's job.** Most screens are one of: find one item, act on one object, work through many, monitor, create step by step, converse, or capture. A screen that fits none is composed for its job (1.5). The page type fixes the frame. Components come after.
1.2. **The primary interaction is the screen's focal element.** It's the most visually dominant element, by size, contrast or position: at the top or leading edge, or pinned where it must always be reachable. By default, at most one other element on the screen competes with it.
1.3. **The primary interaction is a purpose-built organism, composed for that job from the system's parts.** When the primary interaction has more than one part (input plus context, scan plus result), it's a composed organism, never a lone stock atom. A single Save or Scan button can be the whole primary. If the screen's job is asking an AI, the input is a composer with its own slots and states, not a text field. If the job is scanning, the scan target and its result are one organism. If the job is completing a task, the commit area is.
1.4. **A purpose-built organism follows the product's own precedent for that kind of interaction,** with the same anatomy and placement as its siblings elsewhere in the product. It's built only from the system's atoms and tokens. When the same organism appears in a second product, it becomes a proposal for the system.
1.5. **When the task fits a standard page type, use it. When the main workflow fits none, compose one.** Build it on the product's page frame, from system parts. A composed screen is expected, not a deviation.
1.6. **Each organism does one job, and every part inside it has a single purpose.** Its slots are fixed, so the same organism reads the same way wherever it appears.

### Grouping and containers
1.7. **Grouping is done with space first.** Items that belong together sit closer to each other than to anything else. A divider is added only when space isn't enough. A container is added only when a divider isn't enough.
1.8. **A container exists only for a real unit.** That means:
    - elements of different types that must travel together as one object
    - chrome that must be separated from content
    - one of many different items people browse

    A container is never decoration.
1.9. **A container's boundary is the boundary of its meaning.** Everything inside is about one object, one step or one moment, and anything else sits outside it. Controls that change a set of data sit in the same container as that data. The page's identity and its create action sit outside it.
1.10. **Nesting means "part of".** A container inside another container is a component of it, never just a neighbour. A card never sits inside another card.
1.11. **Distance encodes relationship, on one spacing scale.** Space inside a component is smaller than space between related components. That's smaller than space between groups, which is smaller than space between regions. By default, a page keeps one density throughout; a data-dense region may be tighter than the page around it.
1.12. **An action never sits inside a group it doesn't belong to.** If it does, it's read as part of that group, or missed.
1.13. **Things that act the same look the same.** Things of different importance differ in at least one of size, weight, colour or position.
1.14. **Items in a region share one leading edge.** Aligned items read as related, and indented items read as subordinate.

### Hierarchy
1.15. **By default, a screen uses about three sizes of text and three levels of contrast.** A data-heavy screen may add one display size for key values. When the screen is blurred, the primary interaction is still the most visible thing on it.
1.16. **Content runs in order of importance, from the top and leading edge.** Clear headings let people scan section by section.
1.17. **The screen has one primary action.** A region's leading action uses the next level of emphasis down.

### Organisms by job
1.18. **A screen that acts on one object opens with that object's identity, as a composed block,** before any controls. The block holds its image or type mark, its name, its status and the fact that tells it apart (serial, address, location).
1.19. **A row or card in a collection has three slots.**
    - Leading slot: shows what kind of thing it is (type mark, photo, connection or alert glyph).
    - Middle slot: says which one it is (name plus one or two lines).
    - Trailing slot: holds a single status, value or affordance.

    The whole row or card is the target for opening it, except where it carries its own controls (selection, trailing actions), which are separate targets.
1.20. **The same object has the same anatomy on every screen.** The list, the home screen and the calendar change the container around it, never the object itself.
1.21. **A detail screen runs in this order:** identity, then a summary of key facts or counts, then sections grouped by kind of fact (what it is, what it's doing, who made or changed it, what it's linked to). Facts are a grid of label and value pairs. Each action sits at the end of the section it acts on.
1.22. **A commit bar spans exactly the scope of what it commits.** That's the whole page, one pane, or one sheet. The way out or the destructive action sits at its leading end. The commit group sits at its trailing end, with the commit last in that group, at the very trailing end.
1.23. **A dashboard is built in this order:**
    - one row of summary tiles for the few measures that matter most, top and leading;
    - then chart and list cards in order of importance;
    - then the least important material last.

    It shows what is happening. Why it's happening belongs on the screen each tile or card opens.
1.24. **A summary tile is an organism, not a number.** It holds a label, the value and a comparison (target, previous period or normal range), plus a trend where history matters. It includes a comparison where one exists. A count that is itself the alert ("3 printers offline") stands alone. Colour on tiles marks exceptions only.
1.25. **Every chart card in a set shares one internal layout:** title, then legend in the same place, then the chart, then a footer link to its detail.
1.26. **Items in a comparison set (tiles, options, plans) are equal in size and anatomy.** Anything the person must act on is lifted out of the set, above it.
1.27. **An exception or alert item is one line of meaning.** It has a status mark, a title with its reason, and the action or value at the trailing end.
1.28. **Settings with depth are laid out in space, not hidden in layers.**
    - On expanded screens, categories sit in a column at the leading side. On compact screens, the categories are a list, and each opens its settings on its own screen.
    - The selected category's settings sit beside them, in groups.
    - Each setting is label, description, then control.
    - A search for a setting by name skips the hierarchy.
    - The frame keeps its shape when a category holds only one setting.
1.29. **A review step mirrors the steps it reviews.** Each step's answers appear in the same order and the same layout they were entered in, with Change on each section. Position in the review matches position on entry.
1.30. **Spatial and document work pairs a large canvas with a narrower panel.** The canvas is a map, document or camera view, and it takes the larger share. The panel lists what to do about it. Each panel item is linked to its region in the canvas, and selecting either one highlights the other.
1.31. **A multi-phase operation stays on one screen.** The object stays in view, and only the phase name and progress change, unless the platform takes over (a device restart, the system's pairing).
1.32. **AI output outside a conversation is a decision card placed next to what it refers to,** not a chat transcript. The card has an AI label, a headline stating the finding, the reason, the evidence, and one primary action.

### The AI composer
1.33. **When AI is the product, the composer is the screen's focal organism.** It's always reachable: pinned to the bottom on compact screens, and, before a conversation starts, the most prominent block of the column on wider ones. Once there's a conversation, the answers lead (1.133). On an empty conversation, a greeting and suggestions sit directly above it.
1.34. **The composer is built from slots, not styled from a text field.** Its slots, as the product needs them, are:
    - the input
    - context and attachments
    - the scope it acts on, with a clear default
    - a mode, where the product has several (the model itself is rarely shown to frontline workers)
    - controls grouped by function, each with a label
    - submit, which becomes stop while generating
    - a few suggestions next to it
1.35. **Every mode of the composer happens inside the same box.** That covers empty with suggestions, typing, attached, listening, generating with stop, an error or limit with a way forward, and follow-up. The person's eyes and hand stay in one place whatever the mode.
1.36. **The narrower the task, the more of the prompt becomes controls.** A blank text field is the last resort, not the default.
1.37. **Suggestions that send a message look different from suggestions that start an action.** One "says", the other "does", and the person can tell which before tapping.

### Overlays, slots and flow
1.38. **The kind of overlay is chosen by how long it lives and what it blocks.**
    - A brief confirmation is a toast.
    - A quick choice about the current object is a menu or sheet.
    - A decision that blocks progress is a dialog.
    - An activity that must persist across screens is a floating element.
    - An emergency is a takeover.
1.39. **Space for messages about one element is reserved where they appear.** A notice slot sits above the thing it describes, appearing only when used on compact screens. States switch content in place rather than rearranging the screen.
1.40. **Every task screen has a clear way in and one way forward.** Hubs and dashboards offer several. The primary action leads to the next step of the person's task. Screens in the same flow keep the same frame, and only their content changes.

---

## 2. The shell

1.41. **The shell is the same on every screen of a product.** That means the header, navigation, and any device or session context. New work goes inside the content area. It never adds a second header or a second navigation layer.
1.42. **The header runs the full width at the top.** Navigation and the page's place in the product sit at its leading end. Global utilities (search, notifications, account, product switcher) sit at its trailing end, in that order, ending with account or switcher.
1.43. **The header holds one or two actions at most.** Anything more moves to a toolbar in the content or to an overflow menu at the trailing end, and only the least-used actions go into overflow.
1.44. **The header stays when content scrolls, but it shrinks.** A large title collapses to a single line, and on compact screens the header may slide away on scroll down and return on the first scroll up. The title and the way back stay reachable at all times. Global navigation never hides with it.
1.45. **Global navigation sits along the bottom on compact screens, and on the leading edge from medium up.** A screen never shows two forms of global navigation at once.
1.46. **On compact screens, up to five destinations show in the bottom bar.** Beyond five, the most-used stay in the bar and the rest go under a final "More".
1.47. **Navigation moves people between places; it never performs actions.** Actions on the current screen go in that screen's header, toolbar or content.
1.48. **Side navigation is at most two levels deep.** Deeper structures get a list column between the navigation and the content, never a third indented level.
1.49. **Navigation inside one object is local to it.** The settings, history and files of one printer, for example, sit inside that object's own screen as tabs or a section list. They are never added to global navigation.
1.50. **Every screen below the top level has a way back at the leading end of the header.** Back steps out one level, or one step in a flow, and returns to the same place, with scroll position and selection kept. Close leaves a whole task or overlay. The two are never used for the same thing on one screen.
1.51. **Breadcrumbs sit above the page title on expanded screens.** Long trails collapse their middle links into an overflow. On compact screens, breadcrumbs are replaced by back.
1.52. **The page title sits at the top of the content, at its leading edge.** It wraps to two lines, then truncates with the full title available. An object's status sits immediately after its title.
1.53. **Page-level actions sit on the same row as the page title, at the trailing end.**
1.54. **The current organisation, site or tenant is always visible in the header** when a person can belong to more than one. Switching happens from that same spot, and all content on the screen rescopes. Switching never changes the screen the person is on, unless that screen doesn't exist in the new scope.
1.55. **On a shared handheld, the signed-in person is shown in the header area on every screen.** Signing in, out and switching users belong to the device's sign-in layer when it has one. Screens show who is signed in, but they don't rebuild the sign-in itself.
1.56. **Global search sits in the header at the trailing end, before account.** On compact screens it's an icon that opens search full screen.

## 3. Messages and status

1.57. **Each kind of message has one home, chosen by what it's about.**
    - A system condition (connectivity, sync, maintenance, licence) is a banner at the top of the content.
    - A condition of one page or section is a notice inside that page or section.
    - A field problem is an error at the field.
    - Confirmation of something just done is a toast.
    - A decision that must happen now is a dialog.

    A message never appears in a home that belongs to another kind.
1.58. **A system banner spans the content area's full width, directly below the header.** It never sits above or over global navigation. It pushes content down rather than covering it. It never disables the content's own controls, unless the condition makes them unusable.
1.59. **Only one system banner shows at a time,** in the slot in 1.58. The one that most limits what the person can do shows first. It can be dismissed unless it's critical, and it returns while the condition remains.
1.60. **A notice about a page sits at the top of that page's content, below the page title.** A notice about a section sits inside that section, below its heading. A notice about one element sits directly above or below that element. It moves with the content and stays until it's resolved.
1.61. **A message has at most one action,** and errors and warnings always have one: what to do next.
1.62. **Information people need to do the task goes in the content, not in a banner.** People often miss banners at the edge of the screen.
1.63. **Toasts appear at the bottom of the content area, one at a time.** A newer toast replaces the older one. A toast sits above pinned actions, the bottom navigation and any floating action button, and never covers them.
1.64. **A field error sits directly at the field, between the hint and the input.** It uses an icon and words as well as colour. It says how to fix the problem. The field keeps what the person entered.
1.65. **When a form fails to submit, an error summary appears at the top of the form,** above its heading, and focus moves to it. Each item names the field in the same words as its error and links to it. The summary appears even for a single error.
1.66. **A dialog interrupts only for a decision that must happen now.** Examples: an irreversible action, input needed to continue something the person started, or a condition that blocks all work. A dialog never just informs, and appears on launch only when the product can't work without the answer (consent, choosing a site on a shared device).
1.67. **A problem that isn't about input gets its own explanation in the content area,** not a field error or a toast. Examples: no permission, not eligible, service down, device unreachable.
1.68. **An object's status sits directly next to its name, in the same position on every screen that shows that object.** It's always in words, with colour and icon as support. The same status uses the same words and treatment everywhere in the product.
1.69. **A badge sits on the navigation destination or control it refers to, and only for something that needs attention.** It's a dot for "something new" and a number for a count.
1.70. **When an action is unavailable, it stays visible and says why.** The reason sits next to the control or appears on focus and hover. A control is hidden only when the person can never use it.
1.71. **Help that explains a field or control sits next to its label.** Essential information is never only in a tooltip.

## 4. Actions

1.72. **Each screen has one primary action.** All other actions have less emphasis. If several actions are equally important, none of them is styled as primary.
1.73. **Actions sit with what they affect.**
    - Actions on the whole object (Edit, Delete, Share) go in the page header.
    - Actions on one section go in that section's toolbar.
    - Actions on one item go on that item.
    - Actions on one field go in that field.
1.74. **Actions that finish a task (Save, Submit, Done) go at the end of the content they finish.** For a form, that means after the last field. On long screens they're pinned in a footer bar so they stay in view.
1.75. **A pinned footer bar appears only while there's something to finish.** It shows on create, edit and selection, not on a read-only screen. It spans the content's width, with its buttons grouped at the trailing end.
1.76. **The order inside a group of buttons follows one rule across the whole product.** The group sits at the trailing end of its container. The primary action is last in the group, at its trailing end (the right in left-to-right languages), with Cancel or the safe choice before it. The primary never moves into overflow. The order mirrors in right-to-left languages.
1.77. **On compact screens, a group of buttons that no longer fits stacks vertically, full width, all at once.** It doesn't wrap one button at a time. The primary sits on top.
1.78. **The most-used actions stay visible and the rest go into an overflow menu at the trailing end.** As space shrinks, the least-used visible action is the first to move into overflow. Actions of equal weight in a toolbar share one form; a single primary may be text among icons.
1.79. **Tapping an item opens it. Actions on an item sit at its trailing end.** One or two actions show as icons. Three or more go into the item's overflow menu. On touch, item actions are always visible, never revealed only by hover. Every swipe or long-press action is also available on screen.
1.80. **Selecting items replaces the screen's header actions with a selection bar,** at the top of the collection. It shows the count selected and the actions that apply to all of them. Item-level actions turn off while the bar is showing. The bar always has a clear way out: Cancel, or deselect all.
1.81. **A destructive action is never the primary or default action.** It sits after the other actions in its group and is styled as destructive. If it can be reversed, it acts at once and offers Undo. If not, it asks first.
1.82. **A floating action button is used only for a screen's main creating action, and only one per screen.** It sits at the trailing bottom corner, above the bottom navigation. It never carries a destructive or minor action. On expanded screens it moves into the navigation rail or the page header, following the platform.
1.83. **A content toolbar sits directly above the content it acts on.** It holds only actions for that content: refresh, columns, export, view options. Its height matches the content's density.

## 5. Finding things

1.84. **Search sits at the top of the content it searches,** directly under the title when finding things is the main task. Otherwise it's at the leading end of the content toolbar. It searches everything by default, and filters narrow it.
1.85. **Before typing, search shows recent and suggested searches. Results start as the person types when they come back quickly; otherwise on submit.** On compact screens, search opens full screen. On wider screens, results open below the field.
1.86. **Filters sit directly above the results they affect.** On expanded screens with many filter types, they move to a column on the leading side. A horizontal filter bar holds a few filter types, roughly six to eight at most. The rest open from a "More filters" control at its trailing end.
1.87. **On compact screens, filters collapse behind one control that shows how many are active.** Opening it shows all filters in a full-screen sheet with an Apply button.
1.88. **Active filters always show as removable chips next to the results, with "Clear all".** On compact screens they're a single row that scrolls sideways, with the cut-off chip clearly partly visible. Removing a chip updates the results in place.
1.89. **Filters apply as soon as they're chosen when results come back quickly.** They apply together with an Apply button when several are set at once or results are slow. While results update, the results area dims and shows progress. It doesn't jump to the top.
1.90. **Sort sits at the trailing end of the filter row and always shows the current sort.**
1.91. **The result count sits between the filters and the first result** and updates whenever filters or search change.
1.92. **Saved views sit at the top of the collection, above its filters,** as tabs or a view selector. A saved view stores the filters, sort and columns under a name.
1.93. **By default, long lists on handhelds load more as the person scrolls, and data tables in consoles page.** Paging is used when people need to come back to a specific place, or share it. When paging is used, its controls sit at the bottom of the collection.
1.94. **A column picker sits at the trailing end of the table's toolbar.** The item's identifier column can never be hidden.

## 6. Content

1.95. **Lists and tables put the identifier first.** That's the name or number people use to recognise the item, followed by its status, then the values people compare. The identifier never truncates without a way to see it in full.
1.96. **Tables are for comparing many items across several attributes, on medium and expanded screens.** On compact screens, a table becomes a list of rows; cards are used only when the items differ in kind (1.8). Each row has the identifier as its title, the status, and the two or three values people need most. The full record opens on its own screen.
1.97. **When a table must keep its columns on a narrow screen, it scrolls sideways inside its own area.** The identifier column stays locked. The page around it doesn't scroll sideways.
1.98. **List and detail sit side by side on expanded screens.** The list stays visible, with the selected item marked. On compact and medium screens, opening an item replaces the list, and back returns to the same scroll position and selection.
1.99. **Supporting information sits beside the main content, on the trailing side, at about a third of the width.** Supporting information means things people use now and then, for context. On narrower screens it moves below the main content, or into a tab or sheet.
1.100. **A detail page's header holds the object's identifier, status and key facts, plus the actions on the whole object.** It collapses to one line on scroll. A section navigator (tabs or anchors) is pinned below it when the page has more than one section.
1.101. **Viewing and editing an object use the same layout.** Editing changes the fields, not where things are.
1.102. **A dashboard opens with the few figures that need attention first.** They go in a single row of summary tiles at the top, followed by detail cards. Each tile and card opens the list or detail behind it. Tiles and cards in one group share one size (1.23, 1.26).
1.103. **Card grids change the number of columns with width.** That's one column on compact, then more as space allows. Cards keep a readable width rather than stretching.
1.104. **A chart is never the only place a value lives.** On compact screens, a chart that can't be read becomes its key figure plus a list.
1.105. **Tabs within content split one object or topic into parallel views.** They sit directly below the header they belong to. With more tabs than fit, they scroll sideways. On compact screens with many sections, they become a selector. Tabs are never used for steps in a sequence.
1.106. **Accordions are for long content on compact screens where sections are independent.** They aren't used when people need most of the content, when there's little content, or for anything critical. Accordions and tabs are never used to hide information inside a dialog or panel.
1.107. **By default, reading text and forms have a capped width.** On expanded screens, extra width stays empty or holds a supporting pane. It's never filled by stretched text or fields.
1.108. **Read-only details show as label and value pairs,** with the value more prominent than its label. Groups have headings. On compact screens, the label sits above its value.
1.109. **Activity and history are listed newest first.** Each entry shows what happened, who did it and when. History is a section or tab of the object it belongs to.

## 7. Overlays

1.110. **Only one modal surface is open at a time.** A further step inside it replaces its content. Menus and pickers may open from it. A discard confirmation replaces it rather than stacking on top.
1.111. **A dialog is for one short decision or a short task of a few inputs.** Anything longer, with several steps or many inputs, is a full screen or a page.
1.112. **Dialogs are centred on medium and expanded screens. On compact screens they become a bottom sheet or a full screen.** A bottom sheet is for short choices. A full screen is for more than one or two inputs.
1.113. **A dialog's buttons sit at its bottom, in the product's button order, and the dialog always has a clear way out.** It has at most three buttons, and usually two. If closing would lose unsaved input, it asks first.
1.114. **A side panel opens from the trailing edge, for detail or editing that needs the page behind it visible.** On compact screens it becomes a full screen with back.
1.115. **A bottom sheet is for short, contextual choices or details on compact screens.** It's never used for a flow of several screens. A modal sheet dims what's behind it. A sheet pulled to full height shows a Close at its top, and system back closes it. Sheets never stack.
1.116. **A menu or popover opens next to the control that opened it,** never in a distant sheet, and closes when its choice is made.
1.117. **An overlay always opens over the screen it came from,** which stays recognisable behind it. It never covers the information the person needs in order to answer it.
1.118. **A full-screen takeover is used only for work that must hold the whole screen.** Examples: a camera capture, a live call, a guided physical task, a setup flow. It always shows how to leave it, and leaving returns the person to where they were.
1.119. **Something that must stay available while the person moves around the app floats above all screens as a small, movable element.** An active call or a recording, for example. It expands back to full view in one tap and never covers the primary action of the screen beneath it.

## 8. Flows

1.120. **A wizard's step list sits at the leading side on expanded screens. On compact screens it's a short "Step 2 of 5" label with the step name.** It shows completed, current and upcoming steps. Each step's title is the step's heading.
1.121. **A wizard's footer always has the same layout.**
    - Cancel or Discard sits at the leading end.
    - Back and Next sit together at the trailing end, in the product's button order: Back, then Next, the primary, at the very trailing end.
    - On the step before the review, Next reads "Review". On the review, it becomes the finishing action ("Create rule", "Deploy").
1.122. **A choice with consequences is usually shown as options with a short description of each,** rather than a bare list of names.

## 9. Forms

1.123. **Forms are one column by default.** On expanded consoles, independent groups of fields may sit in columns. Only short fields that belong together share a row on wider screens, such as first and last name, or city and postcode. A sequence is never split across columns.
1.124. **Each field reads in this order: label, hint, error, input.** The label sits above the input. The hint is one short sentence. Placeholder text is never used as the label or for essential information.
1.125. **Related fields are grouped under short section headings.** The gap before a group heading is larger than the gaps between fields within it.
1.126. **Repeating rows (add another) end with an "Add" control below the last row.** Each row has its own remove control at its trailing end.
1.127. **A form's unsaved-changes notice sits next to its submit.** Leaving with unsaved changes asks first.

## 10. Empty, loading, error and offline

1.128. **Empty, loading and error states take the place of the content, not the screen.** The header, navigation, filters and actions stay where they are, so the person can still act. For a table, that includes its column headers.

## 11. Field work on handhelds

1.129. **A screen read on the move shows the current task and its next step at a glance.** The thing to look at and the thing to do are the two most prominent elements. Everything else is secondary.
1.130. **On a scan-driven screen, the instruction for what to scan sits at the top of the content.** The scanned result appears directly below it. Typing the value instead is always reachable on the same screen in one step, and visible by default. It's never buried in a menu, unless the process requires a scan as proof, in which case the screen says so.
1.131. **A camera capture screen gives the viewfinder the whole screen.** Guidance sits over the top of the image, and the capture control sits at the bottom. Results appear in a sheet over the captured image, which stays visible behind them.
1.132. **Dangerous or irreversible actions are kept apart from frequent ones on touch screens.** They have extra space around them, and are never placed where a frequent control is expected.

## 12. AI

1.133. **In a conversation, the input sits at the bottom, the latest message sits directly above it, and the history scrolls above that.** Follow-up suggestions sit between the latest answer and the input. Feedback controls sit on each answer, and show on the latest.

## 13. Other devices

1.134. **A vehicle-mounted screen shows only what's safe while moving.** Anything that needs more than a brief glance waits until the vehicle stops.
1.135. **A kiosk or shared counter screen starts every session from the same home.** Each session leaves nothing behind for the next person.

## 14. Across the whole screen

1.136. **What matters most sits at the top and the leading edge.** Order on the screen follows the order people read and act in.

## 15. Zebra screen types
1.137. **A screen that works through many items keeps the current item as its focal point, its position in the run beside it, and the next item one action away.** The facts being checked (location, quantity) sit with the item. "Can't complete" sits apart from the commit.
1.138. **On a monitoring screen, the normal state is visually quiet.** Only exceptions take colour and the top position, ordered by severity, then age.
1.139. **A status summary above a fleet collection doubles as its first filter.** Choosing a status count filters the list below in place.
1.140. **An action that commits across many objects or sites states its scope (how many, which tenant or site) inside the commit area, next to the commit.**
1.141. **When the screen's job is printing, a true-proportion preview of the output is the focal element,** with its settings beside it. Changing a setting updates the preview in place.
1.142. **By default, a device discovery list shows the connected device first, then nearby devices, and never re-sorts while the person is choosing.** Searching again happens in place.
1.143. **On a push-to-talk screen, the talk control is the focal organism, reachable without looking,** with the active channel and who's speaking directly above it.
1.144. **A schedule lays people or resources along one axis and time along the other, opens on now, and opens a shift's detail in a side panel that keeps the grid visible.**
1.145. **A wrist or head-worn screen shows one item and one action at a time; the item's status is its largest element.**
1.146. **A printer's own display opens on the printer's status,** with menus as a single focused list, one item highlighted at a time.
1.147. **By default, when a hardware key does the screen's primary action, the on-screen primary sits in the same position on every screen of the flow,** so the screen and the key reinforce each other.
