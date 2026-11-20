# Act on one object

A screen about one thing: what it is, how it is doing, and what can be done to it.

## Job

Understand one object, then change it or act on it.

**Signals**
- One object's name is the page title.
- Its status sits beside its name.
- The content is facts about it, in groups.

## Choose this when

- The person has already chosen the object.
- The object has more to show than a row can hold.

| Instead, when | Use |
|---|---|
| the object doesn't exist yet and takes several steps to make | [create in steps](create-in-steps.md) |
| the person is handling many objects in a row, the same way each time | [work through many](work-through-many.md) |
| the object is a group of other objects to look through | [find one item](find-one.md) |

## Regions

| # | Region | Present | Filled by | Rules |
|---|---|---|---|---|
| 1 | Header | always | [page header](organisms.md#page-header) | 1.100, 1.53 |
| 2 | Identity | always | [identity block](organisms.md#identity-block) | 1.18 |
| 3 | Key facts | always | [fact grid](organisms.md#fact-grid) | 1.21 |
| 4 | Section navigator | when the page has more than one section | [section navigator](organisms.md#section-navigator) | 1.100 |
| 5 | Sections | always | [fact grid](organisms.md#fact-grid) | 1.21, 1.108 |
| 6 | Supporting pane | optional | | 1.99 |
| 7 | Commit bar | when editing | [commit bar](organisms.md#commit-bar) | 1.22, 1.75 |

## Variations

| When | Then | Rules |
|---|---|---|
| editing | fields replace values in place; the layout stays as it is | 1.101 |
| compact width | each label sits above its value; the supporting pane moves below, or into a tab or sheet | 1.108, 1.99 |
| compact width and many sections | the section navigator becomes a selector | 1.105 |
| expanded width | reading content keeps a capped width; the supporting pane takes about a third on the trailing side | 1.107, 1.99 |
| the object has history | history is a section or tab, newest first | 1.109 |
| AI has a finding about the object | a decision card sits next to what it refers to | 1.32 |
| the object can't be loaded, or the person may not see it | a state block takes the place of the sections | 1.128, 1.67 |

## Space and emphasis

**Focal:** Identity

| Between | Step |
|---|---|
| Header and Identity | group |
| Identity and Key facts | group |
| Key facts and Sections | section |
| one section and the next | section |
| a section heading and its facts | heading |
| pairs in a fact grid | related |

## Checks

- Does the screen open with the object's identity, before any controls? (1.18)
- Is the status directly next to the name, in words? (1.68)
- Do the sections run in order of importance? (1.16)
- Does each action sit at the end of the section it acts on, with whole-object actions in the header? (1.21, 1.73)
- Is there one primary action at most? (1.72)
- Do viewing and editing share one layout? (1.101)
