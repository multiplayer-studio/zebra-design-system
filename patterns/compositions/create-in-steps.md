# Create in steps

Making something new, one step at a time, ending in a review.

## Job

Give everything a new thing needs, in an order that makes sense, then confirm it.

**Signals**
- A list or count of steps shows where the person is.
- Back and Next sit together at the bottom.
- The last step shows everything entered.

## Choose this when

- The thing takes more inputs than a short task holds.
- Later answers depend on earlier ones.

| Instead, when | Use |
|---|---|
| it is one short decision or a few inputs | [act on one object](act-on-one.md) |
| the steps are the same handling repeated on many items | [work through many](work-through-many.md) |

## Regions

| # | Region | Present | Filled by | Rules |
|---|---|---|---|---|
| 1 | Header | always | [page header](organisms.md#page-header) | 1.50 |
| 2 | Step list | always | [step list](organisms.md#step-list) | 1.120 |
| 3 | Step content | always | [field group](organisms.md#field-group) | 1.123, 1.125 |
| 4 | Review | when on the last step | [review block](organisms.md#review-block) | 1.29 |
| 5 | Footer | always | [step footer](organisms.md#step-footer) | 1.121 |

## Variations

| When | Then | Rules |
|---|---|---|
| expanded width | the step list sits at the leading side; the form keeps a capped width | 1.120, 1.107 |
| compact width | the step list is a short "Step 2 of 5" label with the step's name | 1.120 |
| the step before the review | Next reads "Review" | 1.121 |
| the review | Next becomes the finishing action, named for what it does | 1.121 |
| a choice has consequences | options are shown with a short description of each | 1.122 |
| submitting fails | an error summary appears above the form's heading | 1.65 |
| leaving with unsaved input | it asks first | 1.127 |

## Space and emphasis

**Focal:** Step content

| Between | Step |
|---|---|
| Header and Step content | section |
| one field group and the next | group |
| a group heading and its fields | heading |
| fields in a group | related |
| Step content and Footer | section |

## Checks

- Does every step keep the same frame, with only the content changing? (1.40)
- Is the footer laid out the same on every step? (1.121)
- Is each step's title its heading? (1.120)
- Is the form one column, with a capped width? (1.123, 1.107)
- Does the review show answers in the order and layout they were entered in, each with a way to change it? (1.29)
