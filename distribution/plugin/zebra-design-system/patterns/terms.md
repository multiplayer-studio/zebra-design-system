# Terms

What each pattern word means, in one place. Each rule file also defines the terms it uses at its top; where the two differ, the rule file is right. Rule files use these words and nothing more specific, so the rules apply to any component system. [zebra.md](zebra.md) maps each word onto the Zebra Design System's components and tokens.

## Parts of a screen

| Word | Meaning |
|---|---|
| shell | What stays the same on every screen of a product: the header, the global navigation, and any device or session context. |
| header | The bar at the top of the shell or of a screen. It names where the person is. |
| content area | Everything inside the shell. |
| region | A major area of a screen: the header, the navigation, the content area, a pane, a pinned bar. |
| pane | One column of the content area. |
| pinned bar | A bar fixed to an edge of the screen or of a pane, which stays while content scrolls. |
| primary action | The one action a screen most wants taken. |
| commit bar | The bar that holds the actions finishing a task (Save, Submit, Done) and its way out, at the end of what it finishes, and pinned there on long screens. |

## Navigation

| Word | Meaning |
|---|---|
| bottom bar | A bar of top-level destinations along the bottom edge. |
| rail | A narrow vertical column of top-level destinations along the side edge. |
| drawer | A tall panel of destinations at the side edge. It is either fixed beside the content or opened over it. |
| tabs | A row that switches between views at the same level. |
| breadcrumb | A trail that shows where a screen sits in the structure and links to each level above. |
| stepper | A marker of where the person is in a fixed sequence of steps. |
| Up | Goes to the screen one level higher in the product's structure (its parent), whichever way the person arrived. From a printer's detail screen, Up goes to the printer list even if the person came from a search or a notification. Back and Up are the same when the person got there by moving down the structure. In the header, one control does either job, shown as a back arrow. |
| peers | Screens or items at the same level of one set, such as tabs, top-level destinations, or the items in a sequence. |
| transition | The motion that replaces one screen, or one part of a screen, with another. |

## Messages

| Word | Meaning |
|---|---|
| system banner | A full-width message under the header about a condition that affects the whole product. |
| notice | A message about one page, section or element, placed at its top. |
| toast | A brief message confirming something the person just did. It carries at most one action and never carries an error. |
| dialog | A message or small task that blocks the screen until the person answers. |
| tooltip | A short label that appears on hover or focus and names or describes one control. |
| error summary | A list at the top of a form of every error that stopped it being submitted. Each item names its field in the words of its error and links to it. |

## Surfaces

| Word | Meaning |
|---|---|
| overlay | Any surface that sits above the screen: a dialog, a sheet, a side panel, a menu. |
| sheet | A surface anchored to the bottom edge, holding a short set of actions or supporting content. |
| side panel | A surface anchored to the side edge, holding detail or a task related to the screen behind it. |
| menu | A list of actions or options opened from a control. |
| scrim | The dimmed layer between a blocking overlay and the screen behind it. |
| card | A bordered or raised container for one item or one topic. |

## Small parts

| Word | Meaning |
|---|---|
| tag | A short label that states a category or a status. |
| badge | A count or dot attached to another element, showing that something is new or waiting. |
| chip | A compact control for a filter, a suggestion or an entered value. |
| skeleton | A placeholder in the shape of content that is still loading. |
| composer | The input where a person writes a message to another person or to an AI assistant. |
| AI mark | The one mark a product uses to show that content was produced by AI. |
| split button | One button in two parts: the main part does an action's common form, and an arrow part opens a menu of its variants. |
| floating action | A button that sits above the content at the trailing bottom corner, apart from any bar, and stays while the content scrolls. A screen has at most one, for its main creating action. |

## Sizes

The patterns state sizes as relationships. The product's own design system supplies the values.

| Word | Meaning |
|---|---|
| compact | A window width: phones and rugged handhelds in portrait. |
| medium | A window width: small tablets and handhelds in landscape. |
| expanded | A window width: large tablets and desktop. |
| comfortable (density) | The standard control and row sizes. Touch products use it. |
| compact (density) | Less space and shorter rows, for desktop consoles that show dense data. Text and the touch size never shrink. |
| gloved (density) | Larger targets and more space on every surface gloved people touch. |
| floors | The accessibility minimums for contrast, target size, text size and reflow. They are minimums, never design values. |
| leading, trailing | The start and end of a line in the reading direction. |
| pinned | Stays in place while the rest scrolls. |

Layout follows width, never the type of device. "Compact" names both a width and a density; the rule files say which each time.

## Severity

| Word | Meaning |
|---|---|
| info | Something worth knowing. Nothing is wrong. |
| success | Something the person started has finished as intended. |
| warning | Something may go wrong, or needs attention soon. The person can continue. |
| error | Something failed, or blocks the person until it is fixed. |
