# Data display

How data is shown inside a collection, a record or a chart: choosing the form, table anatomy, list items, key–value records, status in data, numbers in data, cells, charts, live data, comparisons and maps.

Not covered here: where collections sit and what surrounds them (search, filters, sort, saved views, paging), narrow-screen behaviour, and the formats for dates, numbers and units. This file decides only how they behave in a column or on an axis.

**When principles conflict.** Accessibility minimums come first. A product's own shell and established patterns come next, and win over the defaults here. A more specific principle wins over a general one. Where two files disagree, the one whose subject it is wins.

**Terms used here**
- **Collection:** a set of items shown together as a list, table, card grid or feed.
- **Identifier:** the name or number people use to recognise an item.
- **Leading, trailing:** the start and end of a line in the reading direction (left and right in left-to-right languages).
- **Compact, medium, expanded:** window widths. Compact is phones and rugged handhelds in portrait, medium is small tablets and handhelds in landscape, and expanded is large tablets and desktop. Layout follows width, never the type of device.
- **Floors:** accessibility minimums (contrast, target size, text size, reflow). They're minimums, never design values.

---

## 1. Choosing the form
10.1. **The question people bring decides the form:**
    - Looking up exact values, or ranking: a table.
    - The message is in the shape of the data (a trend, a pattern, an exception), or whole sets are compared: a chart.
    - Both: a chart with its table.
10.2. **A chart is used only where it has a message.** Data people only need to read goes in a list or table they can scroll, search and sort.
10.3. **Like items people scan, search or compare go in a list or table. Cards are for mixed items people browse.** Cards are never used to compare.
10.4. **Items compared across several attributes go in a table:** one row per item, one column per attribute. A single list of things to pick or open is a list.
10.5. **A key–value record describes one object. A table holds many.** A table is never used for layout.
10.6. **By default, a table's rows either open their item or are edited in place, not both.** Where a table needs both, editing happens in an explicit edit mode. A table for analysis can have rows that do nothing.
10.7. **A table whose cells are edited or acted on behaves as a grid.** It's one stop in focus order, with arrow keys between cells. A table only for reading keeps normal focus order.

## 2. Tables
10.8. **Columns run in order of importance after the identifier,** with columns that are compared side by side. If rows expand and can be selected, the expand control comes first, then selection, then the identifier.
10.9. **Fewer columns read better.** A table has more rows than columns where it can, and secondary columns are the first to go.
10.10. **One kind of data per column.**
10.11. **Quantities align to the trailing edge, and text to the leading edge. The header aligns with its data.** By default nothing is centred; short columns holding only an icon, mark or control may be. Identifiers, phone numbers and codes that look like numbers are text. Dates align to the leading edge by default; fixed-width exact timestamps compared down a column may align to the trailing edge.
10.12. **Figures in a column have equal widths and the same number of decimal places,** so place values line up.
10.13. **Status icons and words in a column align to the leading edge,** so the icons line up whatever the word length.
10.14. **Headers are short noun phrases that wrap to two lines before they truncate,** with the full text on hover and focus. A header holds its label, its sort control, and at most a select-all or column menu. No header is ever empty to assistive technology: a selection or actions column may show only its control, with a hidden label.
10.15. **The header of a sortable column is the sort control.** Choosing it sorts. Choosing it again reverses the order. Only sorted columns show a lasting direction arrow, and only they report their sort to assistive technology. On touch, which columns can sort is shown without hover.
10.16. **The default sort is by what matters most, not alphabetical.** When sorting by more than one column, each sorted column shows its direction and its order ("1", "2").
10.17. **Columns take the width their content needs.** Where the table fills its container, the extra width goes to the widest text column. On desktop, people can resize columns, and a resizable column may truncate where a fixed one wraps.
10.18. **The header row stays visible while the table scrolls.** When the table scrolls sideways, the identifier column stays fixed, and a cut-off column shows there's more.
10.19. **Everything around a table matches its row height:** header, toolbar, selection bar and paging. By default, taller rows are kept for content that wraps.
10.20. **Each row is easy to follow across.** Rows keep their dividers. Alternating row shading is usually added only for wide tables, or tables that scroll sideways.
10.21. **Rows show a hover state on pointer devices.** Rows that don't open anything show no press response.
10.22. **A selected row is marked by its control and a fill.** The fill is never the only sign. By default every row can be selected. A row that can't be (locked, no permission, not applicable to the action) says why on hover and focus.
10.23. **An expanded row holds extra detail for that row only,** and isn't expanded by default. Detail that's cramped there moves to a side panel or page. Hierarchical data uses an outline that expands, not a flat table.
10.24. **Row actions name their row to assistive technology** ("Edit Printer 3"). One or two show inline; more go into the row's overflow menu.
10.25. **Inline editing in a table is for narrow tables and values that change often.** A row being edited looks different from the others. After a row is deleted, focus moves to the next row.
10.26. **A row with a problem is marked on the row,** with an icon, a word and a way to resolve it.
10.27. **Totals sit in a distinct summary row, at the bottom of the table by default.** They're totals of what the table holds, never new calculations, and columns without a total stay empty. Where the table loads more as it scrolls, a total covers all rows, says so, and comes from the service, never from the loaded rows alone.
10.28. **While a table loads, skeleton rows sit under the real header.** Re-sorting or refiltering shows progress on the table, not a reload of the screen.
10.29. **An empty table keeps its header.** It says which kind of empty it is: nothing yet, nothing matches the filters, or nothing to see without filters set.
10.30. **People can show, hide and reorder columns, with a way that doesn't need dragging.** The table shows when columns are hidden. The column layout persists between sessions. The setting sits in the table's toolbar.

## 3. List items
10.31. **A list item has a label and optional leading and trailing slots.** The leading slot holds an icon, image or avatar. The trailing slot holds a short value (a count, a time), a status, an action or a selection control. Nothing sits in the middle of a row.
10.32. **Supporting text runs one to three lines under the label.** Each element sits in the same position on every item in the list.
10.33. **List text is short.** Long content opens in the detail.
10.34. **A trailing chevron means "opens a level deeper". An info control means "shows more about this item", and doesn't open a level.** On iOS, they're never combined with a side index.
10.35. **Groups in a list have headings and extra space between them.** Items in a contained list are separated by space. Dividers are used only where space isn't enough.

## 4. Key–value records
10.36. **Each row of a record is a key and its value,** with any action on that value at the row's trailing end. Row dividers tie each action to its row.
10.37. **A missing value keeps its row.** The value says it's missing, and offers a way to add it if the person can.
10.38. **Several objects of one kind each get a titled block with a unique title,** and the block's own actions are set apart from row actions.
10.39. **Keys and values sit side by side while both fit, and stack, key above value, when they don't.** The key column takes the width of its longest key, up to a limit, then keys wrap.

## 5. Status in data
10.40. **Status in data is a word with an icon shape.** Colour supports it. It's never colour alone. The word is short, ideally one word, and never truncates.
10.41. **Only states that need attention are marked.** The normal state (such as "Connected") is plain text, or no marker, so the exceptions stand out. That's different from a missing value (10.48) and from a column with nothing to total (10.27). One collection marks no more than about six kinds of status.
10.42. **Compact status marks suit dense tables and lists. Larger icon-and-word marks suit roomy layouts.** The shape always comes before the word.
10.43. **A rolled-up status takes the most severe status in the group.**
10.44. **A status (affects what to do), a tag (describes) and a badge (counts) are different things,** and never look alike.

## 6. Numbers in data
10.45. **Precision is the same down a column, and no greater than the decision needs.**
10.46. **Units appear wherever a value is read:** headers, axes, tooltips and annotations. A column of one unit puts it in the header. A column of mixed units puts each unit with its value.
10.47. **Numbers, dates and times follow the person's locale.** Times in data are relative up to about a day, with the exact time on hover and focus, then the date and time. History, audit and log columns are always exact, so rows can be compared.
10.48. **A missing value is never a blank cell.** It usually shows a dash that's quieter than the values but still meets the text contrast floor, and is announced as "No data" or "Not applicable", whichever is true. Unknown and not applicable are never shown the same way.
10.49. **Accessible labels avoid ambiguous short forms.** A date is spelled out ("6 June", not "6/6"). Units are spelled out ("60 minutes", not "60m").
10.50. **By default, each percentage is rounded on its own.** Where they don't add to 100, a note says so.

## 7. Text in cells
10.51. **By default, content cells wrap rather than truncate,** because truncated values that start the same become indistinguishable. Dense operational tables may truncate in columns people can resize, with the full value one step away (10.52).
10.52. **Where truncation is allowed, the full value is one step away,** on hover and focus. Identifiers, paths and file names that differ at the end truncate in the middle.
10.53. **Something that can't take focus never truncates,** because its full text could never be reached.

## 8. Charts
10.54. **The chart type follows the relationship being shown:**
    - change over time: a line, or columns when each value is a total;
    - ranking or comparing categories: ordered bars;
    - part of a whole: a stacked bar;
    - deviation from a reference: bars either side of it;
    - distribution: a histogram or box plot;
    - correlation: a scatter plot;
    - place: a map;
    - flow: a flow diagram.
10.55. **Common chart types are preferred.** An unfamiliar one explains itself the first time it's seen.
10.56. **Quantities are shown by length and position, not by area or angle.** By default, a part of a whole is a stacked bar and a used-of-total value, such as capacity, is a single meter. A share of two or three parts may use a donut where the product's precedent already has one.
10.57. **Series and categories are kept few.** Past a handful, the chart becomes small multiples, or the categories are grouped.
10.58. **On narrow screens, and wherever labels are long, category columns become horizontal bars.** Time series keep time along the horizontal axis.
10.59. **Bars and areas start at zero.** Where a narrower range is needed to show differences, points or a line are used instead. A broken axis shows a visible break.
10.60. **A fixed axis range is used for quantities with real limits,** such as 0 to 100%. A range that fits the data is used otherwise.
10.61. **A time axis keeps even intervals.** Gaps in the data are shown as gaps, never bridged. A new day, month or year is marked in the labels.
10.62. **By default, an axis has a few ticks at familiar steps, fewer on small screens.** Gridlines are absent or faint. Rotating labels is the last resort, after shortening them, thinning them and switching to horizontal bars.
10.63. **By default, the value axis sits at the leading edge.** A compact time series may put it at the trailing edge, next to the latest value. With positive and negative values, the axis line sits at zero.
10.64. **Data is labelled directly.** A legend is used only when direct labels won't fit, sits in the same place on every chart in a set, and is never used for one series.
10.65. **An explanatory chart's title states its main finding. A monitoring chart's title names the measure, its scope and its period,** because its finding changes with the data. Precise detail goes in the subtitle or notes.
10.66. **The palette follows the data:**
    - unrelated categories: distinct colours in a fixed order, differing in lightness as well as hue;
    - amount: one colour from closest to the background (low) to strongest contrast (high), in every theme;
    - above and below a midpoint: two colours meeting at a light neutral;
    - status: the status colours, and only for status.
10.67. **Colour is used only where it means something.** Grey carries context, and one highlight colour carries what matters. The action colour isn't used as one category among others. Red and green are never the only difference.
10.68. **The same category keeps the same colour on every chart in the product.**
10.69. **Touching areas of colour are separated by a thin gap.** Marks that carry meaning meet the contrast floor against their background.
10.70. **There are no decorative effects:** no 3-D, gradients, shadows or shine.
10.71. **A data tooltip repeats the point's values on both axes, with units.** It adds precision, and never holds the only copy of something critical. On touch, the whole plot is the target, and people slide across it to read values.
10.72. **Hovering a legend item dims the other series. Choosing it isolates that series,** with a way back to all.
10.73. **Every chart has a short text description of what it shows, and its data available as a visible table to everyone.** Labels for assistive technology describe what the data means in real values, not how it looks.
10.74. **Keyboard focus moves through a chart in a predictable order,** by point or by group. Changes to the data are announced, not only animated.
10.75. **By default, a chart's own empty, loading and error states sit inside the chart's frame, with the title kept.** An empty chart says why: no data for the period, or nothing matches.
10.76. **Small multiples are identical panels on one shared scale,** each showing one category, sorted by a meaningful value. They're used to show each category's shape. One combined chart is used when people compare values at a single point.
10.77. **A sparkline is a word-sized line, with no axes, beside the number it describes.** Its latest point is marked and tied to the number. It shows the shape of recent history, not values. Sparklines in a column each have their own scale, unless magnitude is being compared.

## 9. Live data
10.78. **Data that updates by itself can be paused.** On resume, it jumps to the latest data, and says it was paused.
10.79. **A live view shows when its data was last updated.** When a feed or sensor drops, its values are marked as out of date where they're shown, and gaps in a live chart stay visible.
10.80. **A live chart usually keeps a fixed time window that moves with the data,** so the newest value is always in the same place.
10.81. **Only conditions that need a response are flagged.** By default, two alert levels (error and warning) are used, and a critical flag on error where the product has one. Flashing and sound are kept for the most urgent conditions, with a way to silence them.
10.82. **A live value shows enough recent history to show where it's heading.**

## 10. Thresholds, targets and meters
10.83. **A measure people judge comes with its comparison:** a target, the previous period, or a normal range. A count that is itself the work ("14 left to count") stands alone.
10.84. **In a chart, a measure against a target is by default a bar along one scale from zero.** On a handheld, the number with its target in words is enough. The target is a short line across it, quieter than the measure. Two to three background ranges show poor to good as shades of one colour, darker for worse. The ranges reverse where low is good.
10.85. **A meter shows the used amount and the threshold, in words as well as the bar, and the total where the device reports one.** Crossing a threshold changes the meter's status (10.40), not just its colour.
10.86. **Reference lines sit only on value or time axes, never on category axes.** A line with a meaning (a limit) uses the status colour for that meaning. Small multiples repeat the reference line in every panel.

## 11. Comparing and differences
10.87. **A side-by-side comparison puts one item per column and one attribute per row.** It holds about five items at most, fewer on narrow screens. Item headers stay visible. People can hide the rows where every item is the same.
10.88. **A deviation from plan or from before is shown as bars either side of the reference,** or points when the scale doesn't start at zero.
10.89. **A change value shows its sign and an arrow.** Colour shows good or bad only where the direction has a meaning, never just because the value went up or down.
10.90. **A before-and-after view of a configuration lists only what changed, by default.** Each change is marked as added, removed or changed, in words and an icon. A changed value shows its old and new value side by side, and the unchanged rest is one step away.

## 12. Maps
10.91. **A map is used only when location or spatial pattern matters more than the values.** For exact comparison, a table or chart is used, or offered alongside.
10.92. **Shaded regions show rates. Markers show counts and located things.**
10.93. **A map of live assets keeps its list and its map in step.** Selecting a marker selects its row, and the reverse. By default, dense markers group into clusters that show their count; clustering stays off where each asset is tracked individually. Each marker shows its status (10.40) and when its position was last updated.
10.94. **A map's key shows the lowest, the highest and each class boundary,** and may sit over the map on a backing surface. A tooltip gives the place name and value.

## 13. Density
10.95. **Density comes from removing what isn't data, never from shrinking the data.** Supporting lines, borders and labels are muted or removed first.
10.96. **By default, a view is quick to scan, with detail on request.** Expert consoles may offer a denser setting.
10.97. **On a watch, data is a glance:** one value and its state. Exploring it moves to a larger device.

## 14. Fleets, schedules and live tables
10.98. **When a sorted or filtered table updates by itself, rows don't move while someone is pointing at, focusing on or selecting them.** New and changed rows wait behind a count ("12 updated") that applies them when chosen.
10.99. **A count of items by status shows every state in order of severity, with counts that add up to the total.** Each count opens the collection filtered to that state.
10.100. **A rollout across many devices shows how many succeeded, failed, are in progress and haven't started, against the total.** Failures come first and can be opened.
10.101. **Every total, average or chart in a view across tenants or sites says which tenant, sites and period it covers.**
10.102. **A value the person isn't allowed to see is marked as restricted, never shown as missing or zero.** Totals say when they leave out restricted items.
10.103. **A column of times uses one time zone, named in the header.** Where devices span time zones, the person chooses between their own zone and each site's local zone.
10.104. **Estimates from sensors (supply level, battery life, position) are marked as approximate,** and never shown more precisely than the device measures.
10.105. **By default, a count against its expected value shows both, plus the signed difference.** It's flagged only outside its tolerance, not for any difference.
10.106. **Comparing one setting across many devices groups the devices by value and shows how many differ from the baseline.** Each group opens its devices (10.90).
10.107. **Shifts and tasks are bars on a shared time axis, one row per person or resource.** Now is marked, and overlaps and gaps are visible.
10.108. **Intensity across two categories, such as hour by day, is a heatmap with its key** (10.54).
10.109. **Exporting a table includes every row that matches the current filters, not just the loaded ones,** in the visible columns and their order, and says what it includes.
