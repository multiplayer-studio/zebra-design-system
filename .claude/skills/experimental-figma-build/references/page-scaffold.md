# The component page scaffold

How a Zebra library component page is laid out, as observed on the Input,
Dropdown and Input Select pages. **Always re-read the reference page with
`discover-scaffold.js`** — layer names drift; this file says what to look
for, the script says what's actually there.

## A page

```
<Page: component name>
├── <Board: Component>          FRAME, one per public component
│   ├── Component Details       the details card (left)
│   ├── Component Label         "Master Component" heading + icon
│   └── <Component set>         placed under the label
├── <Board: Subcomponent>       same structure, one per subcomponent
└── <Name> Metadata             optional, one per board, beside it
```

Boards are plain frames (no auto layout); children are placed by x/y, so a
set dropped in needs explicit coordinates under the Component Label and
must fit inside the board's bounds.

## The details card

| Layer (as named on the page) | Holds | Write |
|---|---|---|
| `Hero Status / Title` | "COMPONENT" | leave |
| `_Component Status` (instance) | status pill, a `Status` variant | the in-progress option the set offers |
| `Component Name` | component name | the code name, in title case |
| `Details / Description` | one paragraph | what it's for, when to use it — rule 6 |
| platform rows (Web, Flutter, Android) | build status per platform | "Pending development" unless the code ships there |
| `Timeline / Time Stamp` ×2 | Created / Updated | today's date in the existing format |
| `Change Log / Log items` | `_Log item` instances | one new row: author, date, "Created" |
| `Footer` | wordmark + logo | leave |

## Subcomponent boards

A subcomponent gets its own board when it has its own props and could be
used on its own (Input Label, Input Hint, Menu Item). It's named for the
part, and its details card describes the part's role inside the parent.

## Metadata frames

Named `<Component> Metadata`, built from the **Button Metadata** template.
Sections are frames whose heading is a text layer named `Component Name`;
tables are frames named `Table` with a header row; prose is grouped by
parent layer (a "Do" label stays with its text). Usual sections, in order:

1. What it does
2. Property breakdown (table: property, values, default, description)
3. States
4. Behavior
5. Content & slots
6. Anatomy
7. How to use (do / don't)
8. Accessibility
9. Layout & theming

`zebra-figma-component-spec/scripts/read-metadata.js` parses one into
sections, tables and blocks — use it to read the clone before rewriting.

## Reuse decisions seen so far

| Built | Reused | How |
|---|---|---|
| Input / Select (field) | Input / Text | cloned the 243-variant set, dropped `typing`, renamed `selected`→`open`, fixed trailing chevron, removed caret |
| Select (assembly) | Input Label, Input Hint, Dropdown Menu, Menu Item | instances; menu absolute below the field, as Template/Dropdown places it |
