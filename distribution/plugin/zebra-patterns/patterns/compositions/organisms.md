# Organisms

The blocks and areas that compositions are built from: a header area, a footer area, a card. Each does one job and has fixed slots, so it reads the same way wherever it appears (1.6). A slot's **Present** is `always`, `optional` or `when` followed by a condition. **Rules** gives the rules a block draws on.

## Dialog

Asks for one decision that must happen now, or a short task of a few inputs, and blocks the screen until it's answered.

| Slot | Holds | Present |
|---|---|---|
| title | the decision; for a confirmation, a question about this specific action | always |
| body | what the person needs in order to decide: the object, the consequence, and whether it can be undone | always |
| inputs | the few inputs of a short task | when it holds a task |
| check | the object's name or a stated word, typed to confirm | when the action is among the most dangerous |
| way out | Cancel beside an action it would call off; otherwise Close, or what happens next | always |
| outcomes | the confirm, repeating the action's verb, and at most one other outcome of the same decision, at the bottom in the product's button order | when it proposes an action |

Rules: 1.38, 1.57, 1.66, 1.106, 1.110, 1.111, 1.112, 1.113, 1.117, 1.150, 2.17, 2.23, 2.24, 2.27, 2.62, 3.50, 3.86, 3.88, 3.120, 3.135, 4.66, 4.67, 4.80, 5.6, 5.13, 5.17, 5.19, 5.23, 5.48, 6.28, 6.29, 6.50, 6.72, 7.10, 7.44, 7.45, 7.46, 7.47, 7.125, 8.6, 8.48, 8.54, 8.58, 8.113, 8.119

## Sheet

Holds short, contextual choices or details, anchored to the bottom edge.

| Slot | Holds | Present |
|---|---|---|
| close | a Close at its top | when it's pulled to full height |
| content | the choices or details, opened to their own height, up to about half the screen | always |
| apply | Apply, which puts the choices into effect together | when it holds choices that apply together, such as filters |

Rules: 1.38, 1.87, 1.99, 1.106, 1.110, 1.112, 1.115, 1.117, 1.131, 1.150, 1.151, 2.17, 2.25, 2.62, 3.50, 3.77, 3.120, 5.6, 5.13, 5.17, 5.18, 5.19, 5.25, 5.48, 6.28, 6.29, 6.50, 8.6, 8.48, 8.54, 8.58, 8.119, 9.74

## Side panel

Opens from the trailing edge for detail or editing that needs the page behind it visible.

| Slot | Holds | Present |
|---|---|---|
| title | the panel's title, which is also its name | always |
| close | a close control at the trailing end of its header | always |
| views | tabs for parallel views of one object | optional |
| body | the detail or the task; it scrolls while the header and footer stay put | always |
| commit bar | the actions that finish what it edits | when it holds editing |

Rules: 1.22, 1.106, 1.110, 1.114, 1.117, 1.144, 1.150, 2.17, 2.62, 3.50, 3.120, 5.2, 5.6, 5.17, 5.19, 5.21, 5.23, 5.48, 6.25, 6.28, 6.29, 6.50, 8.6, 8.48, 8.54, 8.58, 8.113, 8.119, 9.1, 10.23

## Toast

Confirms something the person just did, briefly, at the bottom of the content area.

| Slot | Holds | Present |
|---|---|---|
| message | what just happened, as the action and the object in the simple past, in one line, two at most on a handheld | always |
| action | one action named by a single verb, such as Undo or View, that is never the only way to do it | optional |

Rules: 1.38, 1.57, 1.63, 3.89, 4.30, 4.31, 4.45, 4.47, 4.76, 4.78, 4.98, 4.99, 4.100, 5.48, 6.25, 6.38, 6.55, 6.73, 7.48, 7.49, 7.84, 8.8, 9.40

## Notice

A message about one page, section or element, at its top, that stays until it's resolved.

| Slot | Holds | Present |
|---|---|---|
| status mark | the severity's icon and word, with its colour as support | always |
| message | what happened, then what to do | always |
| action | the one next step that fixes the problem or works around it | when it's an error or a warning |
| dismiss | a way to dismiss it | optional |

Rules: 1.39, 1.57, 1.60, 1.61, 1.62, 1.127, 2.61, 2.84, 4.3, 4.17, 4.34, 4.52, 4.55, 4.68, 4.76, 4.77, 4.78, 4.79, 4.80, 5.48, 7.2, 7.3, 7.33, 7.38, 9.80

## System banner

A message about a condition that affects the whole product, across the content area directly below the header.

| Slot | Holds | Present |
|---|---|---|
| status mark | the severity's icon and word, with its colour as support | always |
| message | the condition, what still works, and what happens to the person's work | always |
| action | the one next step that fixes the problem or works around it | when it's an error or a warning |
| dismiss | a way to dismiss it; it returns while the condition remains | when the condition isn't critical |

Rules: 1.57, 1.58, 1.59, 1.61, 1.62, 4.52, 4.55, 4.76, 4.77, 4.78, 4.79, 4.80, 5.48, 6.25, 7.2, 7.3, 7.33, 7.38

## Menu

A short list of actions or options, opened next to the control that opened it.

| Slot | Holds | Present |
|---|---|---|
| items | fewer than about ten, the most used first, nearest where it opens, grouped by dividers | always |
| check | a check on each item that can be chosen | when its items can be chosen |
| shortcut | the keyboard shortcut beside its command | when the command has one |
| destructive | destructive actions, last, after a divider | when there are any |

Rules: 1.38, 1.43, 1.78, 1.79, 1.110, 1.116, 1.150, 3.9, 3.37, 3.77, 3.78, 3.79, 3.80, 3.81, 3.82, 3.83, 3.84, 3.85, 3.101, 3.106, 3.109, 3.138, 5.17, 5.23, 5.24, 5.48, 6.28, 6.29, 6.30, 6.34, 6.35, 6.38, 7.9, 7.10, 7.13, 7.96, 8.48, 8.54, 8.114, 8.119, 10.24

## Error summary

Lists every error that stopped a form being submitted, at the top of the form, and takes focus.

| Slot | Holds | Present |
|---|---|---|
| items | one per error, naming the field in the words of its error and linking to it | always |

Rules: 1.65, 4.43, 6.32, 6.112, 7.37
