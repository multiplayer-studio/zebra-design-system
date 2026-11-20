# Converse

Asking in words and getting an answer, with a person or an AI assistant.

## Job

Ask, read the answer, and ask again.

**Signals**
- A composer is pinned to the bottom, or leads an empty screen.
- Messages run above it, newest at the bottom.

## Choose this when

- The person can't know in advance what they will ask.
- The answer is read, then followed up.

| Instead, when | Use |
|---|---|
| the task is narrow enough to be controls | [act on one object](act-on-one.md) |
| AI is reporting a finding about something on another screen | [act on one object](act-on-one.md) |

## Regions

| # | Region | Present | Filled by | Rules |
|---|---|---|---|---|
| 1 | Header | always | [page header](organisms.md#page-header) | 1.50 |
| 2 | Greeting | when the conversation is empty | | 1.33 |
| 3 | Messages | when there is a conversation | [message list](organisms.md#message-list) | 1.133 |
| 4 | Composer | always | [composer](organisms.md#composer) | 1.33, 1.34 |

## Variations

| When | Then | Rules |
|---|---|---|
| the conversation is empty | the composer is the most prominent block, with a greeting and suggestions directly above it | 1.33 |
| there is a conversation | the answers lead; the composer stays pinned at the bottom | 1.33, 1.133 |
| compact width | the composer is pinned to the bottom | 1.33 |
| generating | submit becomes stop, in the same box | 1.34, 1.35 |
| an error or a limit | it shows inside the composer, with a way forward | 1.35 |
| the task is narrow | more of the prompt becomes controls | 1.36 |
| a suggestion starts an action rather than sending a message | it looks different from one that sends | 1.37 |

## Space and emphasis

**Focal:** Composer

| Between | Step |
|---|---|
| one message and the next | group |
| the latest answer and its follow-ups | related |
| Messages and Composer | group |
| Greeting and Composer | group |

## Checks

- Is the composer always reachable? (1.33)
- Is the latest message directly above the input? (1.133)
- Does every mode of the composer happen inside the same box? (1.35)
- Does reading text keep a capped width on wide screens? (1.107)
- Can the person tell a suggestion that "says" from one that "does" before choosing it? (1.37)
