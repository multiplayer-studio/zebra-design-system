# Known component gaps

Things Figma does with a library component that the React component can't,
whatever the page. Plan the workaround up front. Add a row each time a build
finds a new one, and remove a row when the component gains the option.

| Component | Figma does | React can't | Page workaround |
|---|---|---|---|
| Dialog | Turns off the header's leading icon (`showLeadingIcon` on the nested header) | Always draws the flavour icon, inline-styled | `.xx-dialog .zds-dialog__icon{display:none!important}` |
| Global Header | Turns off User Profile | Always draws the account group | `.xx-header .zds-global-header__account-group{display:none}` |
| Global Header | Draws a bottom border | Has no bottom border | `.xx-header{border-block-end:var(--stroke-thin) solid var(--border-default)}` |
| Global Header | 52px tall | 57px (medium icon button plus padding) | None; ~5px taller |
| Status Label | Swaps the leading icon for another glyph | Icon fixed per status (spec says fixed) | None; shows the status icon |
| Snackbar | Turns off the icon (Show Icon) | Always draws the status icon on contextual variants, inline-styled | `.xx .zds-snackbar__lead{display:none!important}` |
| Snackbar | Hugs the message | Fixed width | `.xx .zds-snackbar{inline-size:auto}` |
| Input (password) | Shows visibility-off while hidden | Shows visibility while hidden | None |
| Bottom Sheet | Handle opens and closes the sheet | Handle is decorative | Page makes it a button through the DOM |
| Tooltip | Rich help popover: a title and paragraphs, white card (Asset Dialog Header + Body) | Takes one short line in a dark bubble | Compose a Card in a portal under the label, opened by an Icon Button |
| Input, Select | Label at Titles/H5 (16/20) and the description between label and field | Label 14/20; hint 12/16 below the field | None; component sizes |
| Sub Menu Item (nested) | Nested rows at Label/Medium 14/20 | Nested rows are smaller | None |
| Select | Field fills its container | No `block` (Input has one); 280px start width | `.xx .zds-select{inline-size:100%}` |
| Navigation Rail (sub menu) | Sub Menu draws a right border (`border/default`) | The sub menu panel has no right edge | `<Divider orientation="vertical" />` after the rail |

Closed: Navigation Rail width (`railWidth`, a length or `fill`), Navigation
Header icon (`actionIcon`), Global Header avatar (`avatarProps`, or an
`avatar` slot in web components) and Input Chip avatar colour
(`avatarColor`). Avatar's `swatchColor` takes any token name or colour.
