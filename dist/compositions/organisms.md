# Organisms

The blocks recipes are built from. Each does one job and has fixed slots, so it reads the same way wherever it appears (1.6). A slot's **Present** is `always`, `optional` or `when` followed by a condition.

## Page header

Says which screen this is and holds the actions on the whole of it.

| Slot | Holds | Present |
|---|---|---|
| way back | back, at the leading end | when the screen is below the top level |
| title | the page title, at the leading edge | always |
| status | the object's status, directly after the title | when the screen is about one object |
| actions | page-level actions, at the trailing end | optional |

Rules: 1.50, 1.52, 1.53, 1.43

## Identity block

Says which object this is, before any controls.

| Slot | Holds | Present |
|---|---|---|
| mark | an image or a mark for the type of thing | optional |
| name | the name people know it by | always |
| status | its status in words | when the object has a status |
| telling fact | the fact that tells it apart: serial, address, location | always |

Rules: 1.18, 1.68, 1.20

## Fact grid

Read-only facts about one object, as pairs.

| Slot | Holds | Present |
|---|---|---|
| heading | the kind of fact this group holds | when there is more than one group |
| pairs | label and value, the value more prominent | always |
| action | the action on this group, at its end | optional |

Rules: 1.21, 1.108

## Section navigator

Moves between parallel sections of one object.

| Slot | Holds | Present |
|---|---|---|
| sections | one entry per section, the current one marked | always |

Rules: 1.100, 1.105, 1.49

## Commit bar

Finishes what the person is doing, across exactly what it commits.

| Slot | Holds | Present |
|---|---|---|
| way out | cancel, discard or the destructive action, at the leading end | always |
| scope | how many and which it applies to | when it commits across many objects or sites |
| commit group | the safe choice, then the commit last, at the trailing end | always |

Rules: 1.22, 1.74, 1.75, 1.76, 1.140

## Search field

Finds by typing.

| Slot | Holds | Present |
|---|---|---|
| input | the field, saying what it searches | always |
| suggestions | recent and suggested searches, before typing | optional |

Rules: 1.84, 1.85

## Filter bar

Narrows the results directly below it.

| Slot | Holds | Present |
|---|---|---|
| saved views | named sets of filters, sort and columns | optional |
| filters | a few filter types, then "More filters" | always |
| sort | the current sort, at the trailing end | when the results can be reordered |
| active filters | removable chips with "Clear all" | when a filter is set |
| count | how many results | always |

Rules: 1.86, 1.88, 1.90, 1.91, 1.92

## Collection row

One item among many.

| Slot | Holds | Present |
|---|---|---|
| leading | what kind of thing it is | optional |
| middle | which one it is: the identifier, then one or two lines | always |
| trailing | one status, value or affordance | optional |

Rules: 1.19, 1.95, 1.79

## Selection bar

Replaces the header actions while items are selected.

| Slot | Holds | Present |
|---|---|---|
| count | how many are selected | always |
| actions | the actions that apply to all of them | always |
| way out | cancel, or deselect all | always |

Rules: 1.80

## Summary tile

One measure that matters, with what to compare it to.

| Slot | Holds | Present |
|---|---|---|
| label | what is measured | always |
| value | the figure | always |
| comparison | target, previous period or normal range | when one exists |
| trend | direction over time | when history matters |

Rules: 1.24, 1.26

## Chart card

One chart, laid out like every other chart card in its set.

| Slot | Holds | Present |
|---|---|---|
| title | what the chart shows | always |
| legend | the series, in the same place on every card | when there is more than one series |
| chart | the chart | always |
| link | a link to the detail behind it | always |

Rules: 1.25, 1.104

## Exception item

One thing that needs attention, in one line.

| Slot | Holds | Present |
|---|---|---|
| status mark | how severe it is | always |
| title | what it is, with the reason | always |
| trailing | the action or the value | always |

Rules: 1.27

## Current item

The one item being worked on, in a run of many.

| Slot | Holds | Present |
|---|---|---|
| item | the item's identity | always |
| facts | the facts being checked: location, quantity | always |
| position | where this is in the run | always |

Rules: 1.137, 1.129

## Step list

Where the person is in a fixed sequence.

| Slot | Holds | Present |
|---|---|---|
| steps | completed, current and upcoming steps | always |

Rules: 1.120

## Step footer

Moves through a sequence, with the same layout on every step.

| Slot | Holds | Present |
|---|---|---|
| way out | cancel or discard, at the leading end | always |
| back | the step before | when there is one |
| next | the primary, at the very trailing end | always |

Rules: 1.121

## Field group

Related fields under one short heading.

| Slot | Holds | Present |
|---|---|---|
| heading | what the group is about | when the form has more than one group |
| fields | each one as label, hint, error, input | always |

Rules: 1.123, 1.124, 1.125

## Review block

One step's answers, as they were entered.

| Slot | Holds | Present |
|---|---|---|
| heading | the step's title | always |
| answers | in the order and layout they were entered in | always |
| change | a way back to that step | always |

Rules: 1.29

## Message list

A conversation, newest at the bottom.

| Slot | Holds | Present |
|---|---|---|
| history | earlier messages, scrolling above | when there are any |
| latest | the latest answer, with its feedback controls | when there is one |
| follow-ups | suggested next questions | optional |

Rules: 1.133

## Composer

Where a person writes to another person or to an AI assistant.

| Slot | Holds | Present |
|---|---|---|
| input | the text being written | always |
| context | attachments and what is in view | optional |
| scope | what it acts on, with a clear default | when there is more than one scope |
| mode | the kind of answer wanted | when the product has several |
| submit | send, which becomes stop while generating | always |
| suggestions | a few starting points, next to it | optional |

Rules: 1.33, 1.34, 1.35, 1.37

## Scan target

What to scan, and what was scanned.

| Slot | Holds | Present |
|---|---|---|
| instruction | what to scan, at the top | always |
| result | the scanned value, directly below | when something has been scanned |
| type instead | a way to type the value | always |

Rules: 1.130

## Viewfinder

A camera view that holds the whole screen.

| Slot | Holds | Present |
|---|---|---|
| view | the camera image | always |
| guidance | what to line up, over the top of the image | always |
| capture | the capture control, at the bottom | always |
| way out | how to leave | always |

Rules: 1.131, 1.118

## Decision card

AI output outside a conversation, next to what it refers to.

| Slot | Holds | Present |
|---|---|---|
| label | that this came from AI | always |
| headline | the finding | always |
| reason | why, with the evidence | always |
| action | one primary action | always |

Rules: 1.32

## State block

Stands in for content that is empty, loading or failed.

| Slot | Holds | Present |
|---|---|---|
| message | what is happening, or what went wrong | always |
| action | the way forward | when there is one |

Rules: 1.128, 1.67
