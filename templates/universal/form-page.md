---
name: Form Page
level: template
status: draft
composes: [../../organisms/dialog.md, ../../organisms/global-header.md, ../../organisms/navigation-bar.md, ../../organisms/navigation-rail.md, ../../organisms/screen-header-bar.md, ../../molecules/breadcrumb.md, ../../molecules/combobox.md, ../../molecules/commit-bar.md, ../../molecules/inline-banner.md, ../../molecules/input.md, ../../molecules/phone-input.md, ../../molecules/select.md, ../../molecules/snackbar.md, ../../atoms/button.md, ../../atoms/checkbox.md, ../../atoms/icon-button.md, ../../atoms/input-hint.md, ../../atoms/input-label.md, ../../atoms/radio-button.md]
---

# Form Page

> Create or edit one object on its own page: a capped, single-column form of grouped fields, with the commit at the end of the form and pinned while there's something to save.

Use it for "New device profile", "Edit user", "Add site" and any form too long for a dialog ([patterns 1.111](../../patterns/01-screen-composition.md)).

## Anatomy
1. **Header.** At compact, [Screen Header Bar](../../organisms/screen-header-bar.md) with its leading icon on and an empty Action Slot (the commit lives in the commit bar); from medium, [Global Header](../../organisms/global-header.md), Rounded off (sharp, full width; [Global Header Usage](../../organisms/global-header.md#usage)).
2. **Global navigation** (from medium). [Navigation Rail](../../organisms/navigation-rail.md). At compact a form is a task the person entered on purpose, so the [Navigation Bar](../../organisms/navigation-bar.md) is hidden ([patterns 2.10](../../patterns/02-navigation-flow.md)).
3. **Breadcrumb** (expanded and up). [Breadcrumb](../../molecules/breadcrumb.md) above the page title ([patterns 1.51](../../patterns/01-screen-composition.md)).
4. **Error summary** (after a failed submit only). [Inline Banner](../../molecules/inline-banner.md) status error, at the top of the form above its heading, titled with the number of problems; its description lists each problem in the field's own error words, each linking to its field ([patterns 1.65](../../patterns/01-screen-composition.md), [7.37](../../patterns/07-content-copy.md)). It appears even for one error.
5. **Page title.** The task and object ("New device profile", "Edit ZT411-10022"). When editing, the object's status follows the title.
6. **Form notice** (optional). [Inline Banner](../../molecules/inline-banner.md) status info or warning below the title for a condition of the whole form ([patterns 1.60](../../patterns/01-screen-composition.md)).
7. **Field groups.** A short section heading per group, then its fields ([patterns 1.125](../../patterns/01-screen-composition.md)). Each field reads label, hint, error, input ([patterns 1.124](../../patterns/01-screen-composition.md), [1.64](../../patterns/01-screen-composition.md)): an [Input Label](../../atoms/input-label.md), an [Input Hint](../../atoms/input-hint.md) type default when help is needed, an Input Hint type error only while the field has an error, then the control. Required or optional fields carry the word "(required)" or "(optional)" in the label, whichever is the minority ([patterns 7.31](../../patterns/07-content-copy.md)). Controls, all size medium:
   - free text, numbers, dates: [Input](../../molecules/input.md) of the matching type; a scannable value uses its scan trailing control ([patterns 6.102](../../patterns/06-accessibility.md));
   - phone numbers: [Phone Input](../../molecules/phone-input.md);
   - one of five or fewer: [Radio Button](../../atoms/radio-button.md)s size large; one of six to fifteen: [Select](../../molecules/select.md); a long or known list: [Combobox](../../molecules/combobox.md) ([patterns 3.15–3.16](../../patterns/03-controls-interaction.md));
   - an opt-in or several independent choices: [Checkbox](../../atoms/checkbox.md)es size large.
   Questions revealed by a choice appear directly under that option ([patterns 3.65](../../patterns/03-controls-interaction.md)).
8. **Repeating rows** (optional). Each row ends with an [Icon Button](../../atoms/icon-button.md) `delete`, flavour subtle, size medium; a [Button](../../atoms/button.md) flavour text, leading icon `add`, "Add another" sits below the last row ([patterns 1.126](../../patterns/01-screen-composition.md)).
9. **Commit bar.** [Commit Bar](../../molecules/commit-bar.md) at the end of the form, pinned to the bottom of the content while the form has something to save ([patterns 1.74–1.75](../../patterns/01-screen-composition.md)). Cancel ([Button](../../atoms/button.md) flavour outline-subtle) then the commit ([Button](../../atoms/button.md) flavour primary, a verb: "Create profile", "Save changes") at its trailing end ([patterns 1.76](../../patterns/01-screen-composition.md)). The unsaved-changes notice sits next to the commit ([patterns 1.127](../../patterns/01-screen-composition.md)). Delete, on an edit form, sits at the bar's leading end as a Button flavour negative ([patterns 1.22](../../patterns/01-screen-composition.md)).
10. **Leave confirmation** (when leaving with unsaved input). [Dialog](../../organisms/dialog.md), Actions 2: "Keep editing" and "Discard changes", naming what will be lost ([patterns 2.24](../../patterns/02-navigation-flow.md)).

**States.**
- Field error: shown when the person leaves the field, cleared the moment the input becomes valid ([patterns 4.41–4.42](../../patterns/04-states-feedback.md)). The field keeps what was entered.
- Submitting: the commit button shows its busy state; other fields stay as they are ([patterns 4.15](../../patterns/04-states-feedback.md)).
- Submit failed: every entry kept, errors at each field and the summary at the top ([patterns 4.43](../../patterns/04-states-feedback.md), [6.78](../../patterns/06-accessibility.md)).
- Saved: the page returns to where the form was opened with the result visible there, or a [Snackbar](../../molecules/snackbar.md) "Profile created" with View when the result isn't visible ([patterns 7.48–7.49](../../patterns/07-content-copy.md)).

The composed components govern their own colours, states, sizes, radius and focus rings. The template only places them.

## Layout
```
Expanded and large                                    Compact
┌────────────────────────────────────────────────┐    ┌──────────────────┐
│ 1 Header                                       │    │ 1 ← New profile  │
├───┬────────────────────────────────────────────┤    ├──────────────────┤
│ 2 │ 3 Breadcrumb                               │    │ 4 Error summary  │
│   │ 4 Error summary (after failed submit)      │    │ 7 Group heading  │
│   │ 5 Page title                               │    │   Label          │
│   │ 6 Notice                                   │    │   Hint           │
│   │ 7 Group heading                            │    │   Error          │
│   │   Label / Hint / Error / [Input      ]     │    │   [Input       ] │
│   │   Label / [Select ▾ ]                      │    │ 8 Rows  [+ Add]  │
│   │ 8 Rows                         ← capped →  │    │                  │
│   ├────────────────────────────────────────────┤    ├──────────────────┤
│   │ 9 [Delete]          unsaved [Cancel][Save] │    │ 9 Commit bar     │
└───┴────────────────────────────────────────────┘    └──────────────────┘
```
- One column ([patterns 1.123](../../patterns/01-screen-composition.md)), capped at `--container-reading` and aligned to the leading edge of the content; extra width stays empty ([patterns 1.107](../../patterns/01-screen-composition.md)). The commit bar spans the content's width; its buttons align to the form's trailing edge where the form is capped.
- Fields in a group sit `--space-lg` apart; groups sit `--space-xl` apart, the heading belonging to the group below it. The gap from title to first group is `--space-section`.
- The content scrolls; the header and the commit bar stay put.

## Responsiveness
- **Compact** (below `--breakpoint-medium-min`): full screen with back, margins `--space-page`, no navigation bar. The commit bar spans the screen; when its buttons don't fit on one line they stack full width, primary on top ([patterns 1.77](../../patterns/01-screen-composition.md)). With the keyboard open, the layout shrinks above it and the commit bar rides on the keyboard ([patterns 5.54](../../patterns/05-sizes-devices.md)); in a short window the commit bar is the last pinned region to give way ([patterns 5.52](../../patterns/05-sizes-devices.md)).
- **Medium** (from `--breakpoint-medium-min`): margins `--grid-margin`; the [Navigation Rail](../../organisms/navigation-rail.md) Expanded false is visible. Short fields that belong together (first and last name, city and postcode) may share a row.
- **Expanded** (from `--breakpoint-expanded-min`): breadcrumb shown. The form stays capped. On a console, independent groups may sit in two columns; a sequence is never split ([patterns 1.123](../../patterns/01-screen-composition.md)).
- **Large** (from `--breakpoint-large-min`): the rail is Expanded true. Nothing in the form stretches.
- **Touch.** Inputs and buttons at size medium are below `--control-target-min` and extend their hit area to it ([patterns 6.16](../../patterns/06-accessibility.md)); the repeating row's delete icon button needs a hit area of `--control-target-min` and space from the next row.

## Accessibility
- **Landmarks and headings.** `header`, `nav`, `main` for the form, and the commit bar inside `main` after the last field. The page title is the `h1`; group headings are `h2`. Groups of radios or checkboxes are a `fieldset` with the question as `legend`.
- **Focus order.** Fields in reading order, then the commit bar. After a failed submit, focus moves to the error summary ([patterns 6.32](../../patterns/06-accessibility.md)); each summary link moves focus to its field. After Add another, focus goes to the new row's first field; after removing a row, to the next row or the Add control ([patterns 6.29](../../patterns/06-accessibility.md), [6.31](../../patterns/06-accessibility.md)).
- **Keyboard.** Standard keys throughout; Enter in a field doesn't submit where a scan's Enter could submit by accident ([patterns 5.69](../../patterns/05-sizes-devices.md)).
- **Names and announcements.** Each control is named by its label; the hint and error are read after it as its description ([patterns 6.47](../../patterns/06-accessibility.md)). Remove buttons carry their row ("Remove contact 2"). Error count on submit is announced; a field's error is announced when it appears. The commit button stays enabled and validates on press ([patterns 4.43](../../patterns/04-states-feedback.md)).
- **Never colour alone.** Errors have an icon and words; whichever of required or optional fields is the minority is marked in words, "(required)" or "(optional)", never by an asterisk alone ([patterns 6.12](../../patterns/06-accessibility.md), [patterns 7.31](../../patterns/07-content-copy.md)).

## Usage
- Use it for a form of more than a few inputs. A short task of one to three inputs is a [Dialog](../../organisms/dialog.md); a task whose steps must happen in order is a [Wizard](wizard.md).
- Viewing and editing the same object use the same layout ([patterns 1.101](../../patterns/01-screen-composition.md)); see [Record Detail](record-detail.md).
- Nothing applies until the commit. Switches and sliders don't belong in a form with Save ([patterns 3.62–3.63](../../patterns/03-controls-interaction.md)).
- Placeholder text is never the label or essential information ([patterns 1.124](../../patterns/01-screen-composition.md)). Error words follow [patterns 7.36](../../patterns/07-content-copy.md).
- A long edit of a stored object keeps a draft as it goes ([patterns 3.67](../../patterns/03-controls-interaction.md)).
- Drafts: [Combobox](../../molecules/combobox.md), [Commit Bar](../../molecules/commit-bar.md), [Input Label](../../atoms/input-label.md) and [Input Hint](../../atoms/input-hint.md) are draft; their measurements are placeholders.

Prototypes using this template: none yet.
