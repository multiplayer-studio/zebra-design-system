# Sizes and devices

What changes with the space available, the input used and the kind of device: size classes, grids, how each kind of component changes, overflow, text growth and translation, orientation, density, pinned regions and the keyboard, safe areas, form factors, input modes and viewing conditions. Where a rule needs a width, margin or target size, it names the Zebra token that holds it.

Not covered here: the screen structure that results, movement between places, and exactly how a table or chart reduces.

**When rules conflict.** Accessibility minimums come first; a more specific rule wins over a general one; where two files disagree, the one whose subject it is wins. A rule or sentence that starts "By default" is a default a project may override, recording why in its `CHANGES.md`; defaults in 06 may only be made stricter, and every other rule is strict ([precedence](README.md#precedence)).

**Terms used here**
- **Compact, medium, expanded, large:** size classes by window width, never by type of device ([Terms](README.md#terms), [DESIGN.md §6](../DESIGN.md)).
- **Leading, trailing:** the start and end of a line in the reading direction (left and right in left-to-right languages).
- **Pinned:** stays in place while the rest scrolls.
- **Region:** a major area of a screen, such as the header, navigation, content area, a pane or a pinned bar. A **pane** is a column in the content area.
- **Sheet, side panel:** a sheet rises from the bottom edge on compact widths; a side panel opens from the trailing edge and keeps the page behind it visible.
- **Identifier:** the name or number people use to recognise an item.
- **Floors:** accessibility minimums (contrast, target size, text size, reflow). They're minimums, never design values.

---

## 1. Size classes
5.1. **Layout structure follows the space the window actually has, not the device type or its orientation.** The device sets the input, the density and the viewing distance on top of that. Width is the main measure. Height matters only when it's short, as on a phone held sideways. No layout assumes an aspect ratio.
5.2. **By default, the page layout follows the window's size, and a component placed in a pane or panel follows the space it's given.** A form or table in a narrow side panel behaves as it would on a narrow screen, even on a wide monitor.
5.3. **By default, crossing a size class changes the structure, not just the scale.** The choices are what to reveal, divide, resize, reposition or swap. Scaling up alone is kept for collections read item by item (5.14) and for viewing distance (5.71).
5.4. **By default, functions are the same at every size, and only how much shows at once changes.** A function may sit one step further away on a narrow screen. A task that genuinely needs a larger screen hands off with the person's place kept, and says so.
5.5. **A component is swapped only for one that does the same job.** A button is never swapped for a control with a different job, such as a chip. Overflowing actions may move into a menu (5.23–5.24). A list and cards are swapped only with care, because their roles differ.
5.6. **Resizing happens live and keeps state.** Rotating, folding, docking, splitting the screen or dragging the window keeps the scroll position, entries, selection, the open overlay and the keyboard.
5.7. **By default, the narrowest size is designed first.** A desktop-first console or fixed-size product still states how it behaves at its narrowest supported window and at high zoom, because docking, split screen, display scaling and text size will reach it.

## 2. Grids and widths
5.8. **Margins grow with width.** The narrowest size has the smallest margin, and wider sizes step up once or twice. One product uses one set of margins on every screen. Compact uses `--space-page`; medium and wider use `--grid-margin`.
5.9. **Column count steps up with width:** `--grid-columns-compact`, `--grid-columns-medium`, then `--grid-columns-expanded`. By default, only top-level containers align to columns. Elements inside a card, table or form, and overlays, use the spacing scale instead. Content never runs into margins or gutters.
5.10. **Pane count follows width:** one pane on narrow screens, two from expanded (`--breakpoint-expanded-min`), and at most three in the large class (`--breakpoint-large-min`). A medium screen shows two panes only for light content, such as settings.
5.11. **Forms and reading pages have a maximum width, and centre in wider windows.** Dashboards, dense tables, boards, canvases and maps may run the full width. Each kind of page has one cap across the product.
5.12. **Reading text keeps a comfortable line length at every width,** by adjusting margins or columns. Lists may run longer lines with more line spacing.
5.13. **Larger elements stop stretching on wide screens.** Sheets, buttons, fields and dialogs take a maximum width instead of the full width.
5.14. **For each collection, the product decides whether width brings more items or bigger items.** People comparing many items get more columns of fixed-size items. People reading each item get bigger items in a fixed number of columns.

## 3. How components change
5.15. **Navigation changes form with width:** a bottom bar on compact screens, a rail from medium (`--breakpoint-medium-min`), and an expanded rail with labels in the large class (`--breakpoint-large-min`). It may collapse again on deep screens, as long as Back reaches the top. Sorting, filtering and local navigation sit in the pane, never in global navigation.
5.16. **A collapsed side navigation can still be peeked at,** and keeps the width the person gave it.
5.17. **An overlay changes form with width:**
    - a dialog that holds a task or form becomes full screen on narrow screens; a short confirmation stays a dialog;
    - a long menu of extra choices may become a sheet from the bottom on narrow screens; short menus stay next to their trigger;
    - a side panel is an overlay below `--breakpoint-expanded-min` and sits beside the content from expanded up (5.10).
5.18. **A sheet from the bottom opens to its content's height, and has one of two height behaviours.** A capped sheet stops at its limit and scrolls inside. An expandable sheet opens part-way, about half the screen, and pulls up to full height, where it shows a close control.
5.19. **An overlay's body scrolls while its header and footer stay put.** If the body scrolls a lot, the next size of overlay is used, then a full page.
5.20. **A table on a narrow screen keeps each row's identifier first, always:**
    - Where people read one record at a time, the other columns leave the row in priority order and reappear beneath it as label and value pairs.
    - Where people compare across rows, the table keeps its columns and scrolls sideways inside its own area. Its header and identifier column stay pinned, and a cut-off column shows there's more.

    Either way the page itself never scrolls sideways, and the table's title, search, filters and paging still reflow.
5.21. **A table is never put in a container narrower than its identifier and its first priority column.** When an expanded row gets cramped, its content moves to a side panel or page.
5.22. **Tabs share the width equally while they fit. When they don't, they scroll, sized to their labels, with the first offset so more are clearly there.** On compact screens with more sections than can comfortably scroll, they become a selector. Tab labels never truncate.
5.23. **By default, a button group moves as one line and never wraps.** When any label no longer fits, the whole group stacks at once, primary on top. In a narrow overlay or panel, the buttons share its width equally. More than three actions become a menu.
5.24. **A toolbar that runs out of room moves its least important actions into a "more" menu at its trailing end.** They come back as space returns. Actions marked as essential never move. Grouped actions move together. In the menu, icon-only actions gain their labels.
5.25. **Filters show in full on wide screens, collapse on medium ones, and sit behind one control on narrow screens.** That control opens them in a sheet or full-screen overlay. Wherever filters are hidden, the control shows how many are applied, with a way to clear them.
5.26. **By default, forms stay in one column at every width for entering data.** Only short fields that belong together share a row. A read-only record may use more columns on wide screens, with labels beside values where there's room and above them where there isn't.
5.27. **A chart that narrows thins its guides first:** fewer ticks and labels, then aggregation, then stacking small multiples. A chart never forces the page to scroll sideways.
5.28. **Images keep their proportions.** They scale and crop to fit, and are never stretched. Decorative images shrink or disappear on narrow screens when they compete with data. A camera view keeps its proportions and orientation through any size change.

## 4. Overflow
5.29. **Labels, button text, errors and validation messages never truncate.** Their component grows, or its group stacks. Headings and notifications (toasts and banners) wrap rather than truncate. A title made from a name someone created (a printer, a tenant) may truncate in the header bar, with the full name on the page.
5.30. **Where truncation is allowed, the full text is always one step away:** on hover and focus, by expanding, or on the item's own page. Truncation is allowed for long names people or systems create, descriptions, breadcrumbs, web addresses and paths.
5.31. **The truncation point matches the content.** Names and prose cut at the end. Identifiers and serial numbers that share beginnings or endings cut in the middle, so both ends stay readable.
5.32. **Short text wraps to a set number of lines before it truncates,** and each component states its number. A table header wraps to two lines.
5.33. **By default, long content is opened with an explicit "Show more",** not a fade or a scrolling box. An overlay's body is the exception (5.19).
5.34. **Only content that needs two dimensions may scroll both ways:** tables, maps, diagrams, canvases. It scrolls inside its own region, never the page.
5.35. **Text is never cut short to fit.** Only the standard abbreviations from the content rules are used, with their full form available.

## 5. Text size, translation and direction
5.36. **Layouts meet the text-size floor by changing shape.** Side-by-side items stack, with text above secondary items like icons and times. Columns drop. Labels take more lines. Icons that carry meaning grow with the text. The main content stays at the top. Content grows more than chrome.
5.37. **No height is fixed around text.** Rows, buttons, chips and headers grow with their text, their font weight and the device's text setting.
5.38. **Every layout allows for the longest language.** Short strings grow most in translation: a one-word label can triple. Long compound words can't be relied on to break. Some scripts need more height. Buttons, tabs, labels beside fields and fixed-height rows are where this breaks first, so those are designed with room.
5.39. **In right-to-left languages, the layout mirrors:**
    - navigation, panes, toolbars, badges, button order and back and forward;
    - by default, linear progress, sliders, steps and icons that show direction. A locale's own convention can keep progress left to right.
5.40. **Some things never mirror:** the digits of a number, phone, card and serial numbers, email addresses, clocks, circular progress, media controls, logos, the check mark, photographs, and anything that means a real-world direction.
5.41. **Paragraphs of three or more lines align to their own language. Shorter text follows the interface's direction.** Items in one list share one alignment.

## 6. Orientation
5.42. **Every screen works in both orientations, unless the device is locked (5.44) or one orientation is essential, and rotating is handled as a size change.** A phone on its side is usually a short window: pinned regions give way, and two panes aren't used.
5.43. **A product never asks people to rotate the device to see more.**
5.44. **On managed devices, orientation may be locked by the administrator.** Every screen therefore works in the orientation it's locked to. A device pointed down to scan never flips its screen by accident.

## 7. Density
5.45. **Density is set for the product, and everything on it follows that setting.** The only exceptions are listed in 5.46 and 5.48. In Zebra a density is a product-wide choice of existing component sizes ([DESIGN.md §6](../DESIGN.md)); a switch between them is the product's own.
5.46. **Density follows input and preference, never width.** On a shared device, it follows the signed-in person and resets to the site default at sign-out. Touch products use the comfortable setting. Desktop consoles used with a mouse and keyboard for dense data may default to compact. The person can switch either way, and the choice persists. The control that switches density always stays at the comfortable size.
5.47. **A denser setting reduces space and row height, never text size or the touch floor** (`--control-target-min`).
5.48. **Some things never get denser:** messages that alert (toasts, overlays, banners) and focused choices such as menus. A menu's compact size is a placement exception, not a density: it's used only where the menu opens from a cramped spot (a rail, a table footer, a breadcrumb overflow).
5.49. **Everything around a table matches its row size:** header, toolbar, selection bar and paging.
5.50. **The gloved setting is a density of its own:** larger targets (`--control-target-gloved`) and more space on every surface gloved people touch, while text stays the same size.

## 8. Pinned regions and the keyboard
5.51. **By default, pinned regions take a bounded share of the height, and the rest scrolls.** On a handheld, the header, any pinned filter or tab bar, and any pinned action bar together leave the content the larger share of the screen. When they wouldn't, the least important one scrolls away and returns on scroll-up.
5.52. **In a short window (zoomed, held sideways, or with the keyboard open), pinned regions give way first.** They become part of the scrolling content rather than covering the reading area. The pinned action bar is the last to give way.
5.53. **A pinned region never fully covers the focused element.**
5.54. **When the on-screen keyboard opens, the layout shrinks to fit above it rather than being covered.** The focused field stays visible, and a pinned action bar rides on top of the keyboard. Anything shown above the keyboard relates to the current task.
5.55. **By default on a handheld, where the keyboard takes about half the height, a screen built around typing keeps its field and its commit action together near the keyboard,** and shows only what's needed to type correctly.

## 9. Safe areas and system bars
5.56. **Backgrounds run edge to edge. Controls and list items sit clear of the system bars, cut-outs, rounded corners and system-gesture areas.** Nothing that swipes sits in a system-gesture area.
5.57. **The operating system draws its own status bar and navigation.** The product never imitates them, and keeps their space consistent from screen to screen.
5.58. **On round screens, the outer margin is a share of the screen,** so content clears the curve. Space between elements stays fixed.
5.59. **In a short desktop window, critical actions stay visible in a pinned footer rather than scrolling away.**
5.60. **In kiosk or locked mode, where the system hides its own bars, the product supplies what the person still needs:** status, the time if it matters, and a way to get help.

## 10. Form factors
5.61. **Handheld (rugged, narrow, used in short bursts):**
    - designed at its narrowest width first;
    - comfortable density, with the gloved setting where gloves are used;
    - the main task and its next step readable at a glance;
    - scanning preferred over typing;
    - works in the orientation the administrator locks it to (5.44) and with the device's text setting at its largest.
5.62. **A handheld docked as a desktop lays out for the window it gets, with the same state.** When the screen is only mirrored, it stays as it was.
5.63. **Tablet:** touch-first, comfortable density, mostly one pane at medium width. Held sideways, frequent controls sit near where the hands hold it, and rarely used ones go elsewhere.
5.64. **Round smartwatch:**
    - One or two tasks, each done in seconds. Anything more hands off to a larger device with the person's place.
    - Vertical scrolling only.
    - The time at the top of every screen except brief overlays.
    - Actions inline, with icon and label.
    - At most two text buttons or three icon buttons in a row.
    - Designed for the smallest round screen first, with one size step.
    - A screen that asks for a decision shows it first, with its two choices directly beneath.
    - Never a haptic alone.
5.65. **Vehicle mount:**
    - While moving, the screen shows only what the site allows. Where the device blanks or locks the screen, the task resumes exactly where it was left.
    - Where the screen stays on, nothing needs more than a brief glance, and passenger-car limits (about two seconds a glance, about twelve seconds a task) are the ceiling.
    - While moving, video, scrolling text, typing and long reading are locked. A locked function says why, and that it opens when stopped.
    - Short flows, with defaults and saved items first. Voice is offered only where the noise allows it.
    - List rows carry at most two lines while moving, with what must be read first.
    - Large, well-spaced targets.
    - Every task survives interruption: partial input is kept, and returning shows where the task was left.
    - The most needed information sits nearest the driver's line of sight.
5.66. **Kiosk and shared counter:**
    - Text readable without zoom from where people stand.
    - Controls within a seated or standing reach.
    - One-handed operation.
    - Speech output where there's no other way to read the screen.
    - A timed response asks for more time with both a visual and a sound.
    - Every session starts from the same home and leaves nothing behind.
5.67. **Large desktop and wall display:** structured content caps its width (5.11). Extra width becomes a second or third pane, or an expanded rail, never stretched content. A wall display read from across a room uses larger type roles and fewer, bigger elements, and shows only what can be read at that distance.
5.68. **Split screen and resizable windows:** every screen works at any size it's given, keeps updating when not focused, and gives the camera or microphone back to the focused app.

## 11. Input modes
5.69. **Each input gets its own affordances, on the same screen:**
    - Pointer: hover states and right-click menus.
    - Keyboard: Tab and arrow movement through main flows, standard shortcuts, Enter to submit only where a scan's Enter can't submit by accident, Escape to close or cancel.
    - Touch: comfortable targets and visible actions.
    - Stylus: handwriting into fields without the keyboard appearing.
    - Scanner: scans go where they belong.
    - D-pad or rotary: the same focus movement as a keyboard.

    Switching between inputs never needs a restart.
5.70. **A product used by touch and pointer meets the touch size** (`--control-target-min`), and adds pointer affordances on top.

## 12. Viewing conditions
5.71. **By default, text and controls are sized for how far away the person will be.** A handheld is close. A vehicle mount is at arm's length. A kiosk is at standing distance. A wall display is across a room. A product used further away uses larger type roles, not a separate design.
5.72. **Products used outdoors or in bright light use regular or heavier weights, avoid thin strokes, and offer the higher-contrast scheme.** Brightness and anti-glare are left to the hardware.
5.73. **By default, information read at a glance sits where the eye already is:** the top of a handheld screen, and the part of a vehicle screen nearest the line of sight.

## 13. Zebra form factors and scale
5.74. **Barcodes, QR codes and label previews keep their true proportions and orientation at every size and in every direction.** They never mirror, stretch or crop, and are never shown smaller than they can be scanned. A label preview shows the label's physical proportions.
5.75. **Display scaling and browser zoom shrink the window, and layouts follow that effective width.** A console designed at a large width runs much narrower on a laptop with scaling on.
5.76. **The on-screen keyboard, system bars and insets change the space available, but never the size class.** The layout doesn't switch structure when the keyboard opens.
5.77. **A wrist-mounted computer is a short, wide window.** It shows one task per screen, keeps the primary action within reach of the other hand's thumb, and treats a paired ring scanner as its main input.
5.78. **A tiny display built into a device shows one item and one action at a time, within its fixed character count,** and is moved through with its keys. Longer content and setup move to the companion app.
5.79. **When a hardware keypad or keyboard is present, the on-screen keyboard doesn't appear and no space is kept for it.** Focus moves with the keys (5.69).
5.80. **Fixed-size desktop windows, such as installers and setup wizards, still scale with display scaling and text size.** Their content scrolls rather than clipping as the text grows.
5.81. **The console header holds the longest tenant name and any shape of logo,** truncating the name (5.30) rather than pushing global controls out.
5.82. **A screen used wet or gloved keeps its targets far enough apart that one smeared touch can't hit two,** and every swipe-only action has a tap alternative.
