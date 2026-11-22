# Compositions

Reference ideas for how a screen, or an area of one, can be put together. The numbered pattern files say what is true of any screen. These files show one good way of applying them: for one kind of job, which regions a screen has, in what order, what fills each, how it changes, and questions to look it over with.

**A composition is a reference idea, never a rule.** It is a starting point to draw from, adapt or set aside. Only the numbered rules are meant to be followed. A screen that differs from a composition has broken nothing, and where a composition and a rule disagree, the rule is right.

They are written to be walked, by a person or by a tool. A screen being built can start at the table below and follow one recipe down, changing whatever the product needs. A screen that already exists can be matched to a recipe by its signals, to see what ideas it offers.

Like the rule files, these are plain Markdown, in pattern words only. In the repository the `zebra-pattern-ingest` skill adds to them, from a description or from a design; they can also be edited by hand. When the patterns are packaged, `graph.json` is written from them. Never write or edit it.

## Start from the job

| The person wants to | Recipe |
|---|---|

There are no compositions yet. Until there are, a screen is composed for its job (1.5) from the numbered rules, with the spacing in [spacing.md](spacing.md).

## Supporting files

| File | Holds |
|---|---|
| [organisms.md](organisms.md) | The blocks recipes are built from, each with its slots |
| [spacing.md](spacing.md) | The steps of space between things, by how closely they are related |

## How a recipe is laid out

Every recipe has the same six headings, in this order.

| Heading | Holds |
|---|---|
| **Job** | The person's job in a sentence, then **Signals**: what a screen doing this job looks like |
| **Choose this when** | The conditions for this recipe, then a table of when a neighbour fits better |
| **Regions** | The screen's regions in order. **Present** is `always`, `optional` or `when` followed by a condition. **Filled by** links to an organism |
| **Variations** | When a condition is true, what changes |
| **Space and emphasis** | **Focal** names the region the eye lands on. The table gives the spacing step between regions |
| **Checks** | Questions with a yes or no answer, to look a screen over with. A "no" is worth a look, not a failure, unless it breaks the rule the check names |

The **Rules** column gives the pattern rules a line comes from. A line with none is this recipe's own, and is marked (suggested) when it sets a number the rules don't.

## Editing

- **Change a recipe:** edit its tables.
- **Add a recipe:** add a file with the six headings, and a row to the first table above.
- **Add an organism or a spacing step:** add it to its file. A project built with Zebra also gets a row in [../zebra.md](../zebra.md).
- **Remove one:** delete it, and the rows and links that point at it. Packaging names any that are left.

## Checks at packaging

| Guard rail | It stops |
|---|---|
| Shape | A recipe missing one of the six headings, with no regions, or with a Present value that isn't `always`, `optional` or `when …` |
| Links | A region filled by an organism that doesn't exist; a neighbour that doesn't exist; a recipe the first table doesn't list |
| Steps | A spacing step that isn't in spacing.md; a Focal that isn't one of the recipe's regions |
| Rules | A rule number that doesn't exist |
| Names | A Zebra token, class, element or component in these files |

It warns when a spacing step or an organism has no row in zebra.md.
