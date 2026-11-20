# Compositions

How whole screens are put together. The numbered pattern files say what is true of any screen. These files turn those rules into recipes: for one kind of job, which regions a screen has, in what order, what fills each, how it changes, and how to tell it is right.

They are written to be walked, by a person or by a tool. A screen being built starts at the table below and follows one recipe down. A screen that already exists is matched to a recipe by its signals and compared with it, region by region.

Like the rule files, these are plain Markdown, edited by hand, in pattern words only. When the patterns are packaged, `graph.json` is written from them. Never write or edit it.

## Start from the job

| The person wants to | Recipe |
|---|---|
| find one item among many | [find-one.md](find-one.md) |
| see or change one object | [act-on-one.md](act-on-one.md) |
| get through a run of items, one after another | [work-through-many.md](work-through-many.md) |
| know whether things are all right | [monitor.md](monitor.md) |
| make something new, a step at a time | [create-in-steps.md](create-in-steps.md) |
| ask, and get an answer | [converse.md](converse.md) |
| take something in from the world: a scan, a photo, a reading | [capture.md](capture.md) |

A screen that fits none of these is composed for its job (1.5), from the blocks in [organisms.md](organisms.md) and the spacing in [spacing.md](spacing.md).

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
| **Checks** | Questions with a yes or no answer. A finished screen answers yes to each |

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
