# File Upload

A drop zone with a Select files button, and the list of chosen files beneath it. The component never uploads anything. It hands the files over and shows whatever state the product sets on each row, while State reports what the zone itself is doing, from resting through a drag to a refusal.

Source: https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=8286-923 (page "File Upload") · extracted 2026-11-17

Values are token names; they resolve in [tokens/](../../tokens/). Literals are measurements (suffixed Px) and the exceptions in Issues.

## API

| Prop | Type | Values | Default | Controls |
|---|---|---|---|---|
| state | enum | default, dragging, error, disabled | default | variant |
| shape | enum | rounded, sharp | rounded | variant |
| showCaption | boolean | | true | caption |
| caption | string | | Supports PDF, PNG and JPG. Max file size 10 MB. | caption |
| files | slot | File Upload Item | | files |

- **state default**: The resting zone. Leave it here while files upload. The state describes the drop target, not the queue.
- **state dragging**: Driven by the drag, not by the product. If set it by hand, the zone will look live with nothing over it.
- **state error**: use for a refusal the zone caused, such as a batch over the count. A single bad file belongs on its own row.
- **state disabled**: For when files cannot be accepted at all. It blocks drops as well as presses, so do not use it to mean busy.
- **shape rounded**: The default. Shape reaches the zone and the file rows and everything within.
- **shape sharp**: Match the host surface. All components within are squared throughout.
- **showCaption true**: The default. States the accepted types and the size limit before anyone picks, which cuts refusals.
- **showCaption false**: For when the limits are stated nearby. The product still checks them, so refusals arrive unexplained.

## Internal variations & content inputs

**Headline.** Parent owned: "Drop files here to upload", and "Release to upload" while dragging.

**Error message.** Parent owned, on the error state only. Sample: "notes.exe isn't a supported file type."

**Files.** The default variants hold three sample rows (uploading, complete, error); the others hold one.

## Anatomy

1. **Zone** — The drop target. A dashed outline on border/default over surface/card, with its content centred. Vertical, gap space/sm, padding space/xl top and bottom, space/lg at the sides, fills width. Radius radius/md; stroke stroke/thin, inside, dashed (see Issues).
2. **Action** — The title/medium headline, the body/xsmall or, and the primary Select files button that opens the picker. Headline title/medium on foreground/primary. "or" body/xsmall on foreground/secondary. Button Size=small, Flavour=primary.
3. **Caption** — The body/small line under the button naming what is accepted. Show Caption turns it off, and the zone tightens to suit. body/small on foreground/secondary. Shown when `showCaption`.
   - **Error row** (error state only): the `error` glyph and the message at body/small on foreground/error, gap space/xs.
4. **Files** — The list slot. File Upload Item rows, space/sm apart, starting space/md under the zone. Vertical, fills width, hugs.

Root: vertical, gap space/md, no padding. Measured 480Px wide in Figma; it fills its container.

## Variants

| state | zone fill | zone stroke | other |
|---|---|---|---|
| default (base) | surface/card | border/default, dashed | headline "Drop files here to upload" |
| dragging | surface/info | border/focus, solid | headline "Release to upload" |
| error | surface/card | border/error, dashed | error row shown |
| disabled | surface/subtle | border/default, dashed | headline, or and caption foreground/disabled; Button Disabled=true |

| shape | zone radius | Select files | rows |
|---|---|---|---|
| rounded (base) | radius/md | Shape=rounded (radius/element-sm) | Shape=rounded |
| sharp | radius/none | Shape=sharp (radius/none) | Shape=sharp |

## Subcomponents

### File Upload Item

One file in a File Upload list: the file indicator with its extension badge, the name and a meta line beside it, and a progress readout. Status is set by the product rather than derived, and Indicator chooses between a bar under the meta line and a ring at the row's end.

| Prop | Type | Values | Default | Controls |
|---|---|---|---|---|
| status | enum | waiting, uploading, complete, error | waiting | variant |
| indicator | enum | bar, ring | bar | variant |
| shape | enum | rounded, sharp | rounded | variant |
| showDismiss | boolean | | true | dismiss; both ring-row buttons |
| fileName | string | | Delivery manifest.pdf | name |
| extension | string | | PDF | nothing (see Issues) |

- **status waiting**: Queued, not started. Keeps a cancel in reach.
- **status uploading**: The only status with progress. Hold it until the transfer is acknowledged, not until the last byte is sent.
- **status complete**: Confirmed and stored. The trailing control turns to delete, so do not reach it before the file is safe.
- **status error**: Failed, with a retry offered. Take the row off the list instead when a retry cannot succeed and notify the user using a snack bar.
- **indicator bar**: The default. Best for short lists. It makes the row taller, so a long queue pushes the form out of view.
- **indicator ring**: Best for long lists. Every row keeps one height at any status, but progress is harder to read.
- **shape rounded**: Follow the File Upload the row sits in.
- **shape sharp**: Squares the row and the trailing control.
- **showDismiss true**: The default. Cancel while the file is in flight, delete once it has landed.
- **showDismiss false**: For lists that must not be edited. A ring row turns off cancel inside the circle, a bar row loses it.

**Anatomy**

1. **File indicator** — A surface/shade tile at radius/sm carrying the extension badge at body/xsmall on foreground/secondary. It also offers an unknown type and an icon type. File Indicator, Type=extension, exposed.
2. **Body** — The name at body/small on foreground/primary, then the meta line: the byte count and, where there is one, the status at body/xsmall on foreground/secondary. Vertical, gap space/xs, fills width; top padding space/2xs on bar rows. The name is one line, ellipsised. The meta line: gap space/sm; the status group has gap space/xs, padding space/sm at the start and a stroke/thin border/default rule on its start edge.
3. **Progress** — A Progress Bar with its percentage under the meta line, or on a ring row a Progress Circle at the row's end with cancel inside it. Bar: Progress Bar Size=small without its label, fills width, then the percentage at body/xsmall on foreground/primary; gap space/md, top padding space/xs. Ring: Progress Circle Size=medium, Upload on, with its stop (cancel) shown.
4. **Dismiss** — The trailing subtle Icon Button at small. Close to cancel, delete to remove. Bar rows: Size=small (control/sm), out of flow, inset space/sm from the top and end edges; the body runs full width with space/sm end padding, so the percentage ends at the glyph's edge and the name stops short of the button. Ring rows: Size=large (control/lg), in an Actions group with gap space/2xs. Shown when `showDismiss`.
   - **Try again**: on a failed bar row, a text Button Size=small with the `refresh` glyph, under the meta line. On a failed ring row, a `refresh` Icon Button beside delete.

Root: horizontal, gap space/md, padding space/md, surface/card, stroke/thin border/subtle inside, radius/md. Content aligns to the top on bar rows and centres on ring rows. Measured 480Px wide in Figma; it fills the list.

**Variants**

| status | status glyph and label | progress | trailing | measured height bar / ring |
|---|---|---|---|---|
| waiting (base) | `schedule`, Waiting, foreground/tertiary | none | `close` | 74Px / 74Px |
| uploading | bar: none, the byte count alone ("1.9 MB of 3.8 MB"); ring: "1.9 MB of 3.8 MB · 50%" | bar: Progress Bar + percent; ring: Progress Circle with cancel | bar: `close`; ring: cancel in the circle | 98Px / 74Px |
| complete | `check-circle`, Complete, foreground/success | none | `delete-outline` | 74Px / 74Px |
| error | `error`, Failed, foreground/error; root stroke border/error | none | Try again + `delete-outline` | 112Px / 74Px |

| indicator | alignment | trailing control |
|---|---|---|
| bar (base) | top | Icon Button Size=small |
| ring | centre | Icon Button Size=large; Shape=full when rounded (radius/pill) |

| shape | row radius | file indicator radius | controls |
|---|---|---|---|
| rounded (base) | radius/md | radius/sm | rounded (bar), full (ring) |
| sharp | radius/none | radius/none | sharp |

**States & triggers**

| State | Trigger | Duration | What changes |
|---|---|---|---|
| cancel | Close pressed while waiting or uploading | — | Stops the file. The product removes the row or marks it failed. On a ring row the control lives inside the circle. |
| retry | “Try again” pressed on a failed row | — | The product restarts the upload and the row returns to uploading. |
| remove | Delete pressed on a complete or failed row | — | Takes the file off the list. |
| announce | Status changes | — | The row announces its name and status politely, on changes of state rather than on every percent. |
| enter | The row is added to the list | animations/smooth | The row fades in and settles down from space/xs above. Off under reduced motion. |

**Behavior & motion**

- **Motion:** Rows ease in on animations/smooth as they are added, and the border colour eases when a row fails. Colour and position only, with no change of scale.
- **Progress:** 0 to 100, clamped and rounded. Complete always reads 100 whatever was passed.
- **Meta line:** Size first, then status. An uploading bar row drops the status label and shows the byte count alone, while a ring row carries the byte count and the percentage together.
- **Controls:** The dismiss control follows the status. Close while waiting or uploading, delete once complete or failed. A failed row also offers Try again.
- **File indicator:** The extension badges a surface/shade tile, four letters at most. File Indicator also offers an unknown type showing a question mark, and an icon type carrying a glyph instead.

**Content & slots**

| Property | Type | Description |
|---|---|---|
| File Name | text property | Set through File Name. One line at body/small on foreground/primary, ellipsised when long, with the full name kept available. |
| Extension | text property | Set through Extension and surfaced from File Indicator. Four letters at most, at body/xsmall on foreground/secondary. |
| Size | parent owned | The byte count on the meta line at body/xsmall. It sits on the node rather than being passed in, and its wording differs per status. |
| Error reason | parent owned | The status label on a failed row reads Failed. Replacing it with a reason is done on the node, there is no property for it. |
| Close/Delete Icon | Upload state owned | The close [x] icon indicates discarding the action or process, the delete icon [trash] removes the uploaded file. |

**Usage**

- Do: Give every row a real size, so the meta line and a ring row's byte count read truthfully.
- Do: Put the reason in the error, Connection lost rather than just Failed, and offer Try again.
- Don't: Don't leave a finished row uploading. Move it to complete or error as soon as the product knows.
- Don't: Don't mix bar and ring rows in one list. They stand at different heights, 98 against 74, so the list loses its rhythm.

**Accessibility**

Status changes are announced politely as the name and the status, never each percent. The percentage is the only number on the row, so a ring row needs it on the meta line to stay readable. Failed is carried by the colour and the glyph together, which is what keeps it legible for anyone who cannot rely on hue. The trailing control changes meaning with the status, from cancel to delete, so its accessible name has to change with it rather than staying generic.

**Layout & theming**

| Property | Type | Description |
|---|---|---|
| Size | Fills width, fixed height | The row takes the list's width and the name truncates. A ring row stands 74 tall at every status, while a bar row grows to 98, and to 112 on error. |
| Padding | Fixed | space/md around the row and between the indicator, the body and the controls. space/xs between the name and the meta line. |
| Radius | Per Shape | radius/md on the row when rounded and radius/none when sharp. The file indicator stays radius/sm and its badge radius/xs in both. |
| Border | Per Status | 1 wide on border/subtle, turning border/error when the row has failed. |
| Colour | Theming | surface/card row on a surface/shade indicator tile. Status reads foreground/tertiary waiting, foreground/success complete and foreground/error failed. |
| Typography | Fixed | body/small name, with the meta line, the byte count and the percentage all at body/xsmall. |

### File Indicator

No description or metadata frame of its own; File Upload Item's metadata describes it.

| Prop | Type | Values | Default | Controls |
|---|---|---|---|---|
| type | enum | extension, unknown, icon | extension | variant |
| extension | string | | PDF | badge label (extension type only) |

Anatomy: a control/lg square at radius/sm, filled surface/shade at a literal 0.1 paint opacity, content centred, 3Px padding top and bottom. The badge hugs its content, with padding space/xs at the sides and radius/xs. Its label is body/xsmall on foreground/secondary, centred.

| type | badge |
|---|---|
| extension (base) | the extension text |
| unknown | a fixed "?" |
| icon | an Icon Size=small glyph instead of text; default `video-play`, swappable |

## Tokens & theming

- **Color:** surface/card, surface/info, surface/subtle, surface/shade, border/default, border/subtle, border/focus, border/error, foreground/primary, foreground/secondary, foreground/tertiary, foreground/success, foreground/error, foreground/disabled
- **Dimension:** space/2xs, space/xs, space/sm, space/md, space/lg, space/xl, radius/xs, radius/sm, radius/md, radius/none, stroke/thin, control/lg
- **Typography:** title/medium, body/small, body/xsmall
- **Motion:** animations/smooth
- **Glyphs:** error, schedule, check-circle, close, delete-outline, refresh, video-play. All are font glyphs: the rounded family when Shape=rounded, sharp when sharp. They take currentColor.
- **Theme axes:** palette (Light, Dark, AAA Light, AAA Dark), size (Desktop, Mobile, Tablet, Desktop Compact) and every brand extension.
- **Dependencies:** Button, Icon Button, Icon, Progress Bar, Progress Circle (with its _Upload part).

## States, behavior & motion

| State | Trigger | Duration | What changes |
|---|---|---|---|
| dragging | Files dragged over the zone | animations/smooth | The border turns solid border/focus and the fill surface/info. The headline swaps to Release to upload. |
| drop | Files released on the zone | — | Each file is checked against the accepted types, the size limit and the count, in that order. Accepted files join the list, refused ones raise the error. |
| pick | Select files pressed | — | Opens the system picker, filtered to the accepted types. |
| error | A refusal, or an error the product sets | — | The border takes border/error and the message row appears under the caption, in foreground/error at body/small. |
| disabled | Disabled set | — | Drops and picks are ignored. The zone greys to surface/subtle with foreground/disabled text and a disabled button. |

- **Motion:** The zone's border and fill ease as dragging starts and stops. Colour only, with no change of scale or elevation.
- **Drag tracking:** Only real files highlight the zone. Dragged text or links are ignored.
- **Validation:** Accepted types, maximum size and maximum count are checked per file, in that order. The first failure is what the message reports.
- **No uploading:** The component never uploads. It hands the chosen files over and shows whatever state the product sets on each row.
- **Localisation:** Every string the component shows or announces is replaceable. Sizes, types and counts are the product's to phrase.

## Content & slots

| Property | Type | Description |
|---|---|---|
| Caption | text property | Set through Caption and drawn only when Show Caption is on. It names what is accepted, for example Supports PDF, PNG and JPG. Max file size 10 MB. |
| Headline | parent owned | Drop files here to upload, swapping to Release to upload while files are over the zone. It follows State and is not exposed as an input. |
| Error message | parent owned | Appears on the error state only, in foreground/error at body/small. The wording sits on the node rather than being passed in. |
| Files | slot | File Upload Item rows, listed under the zone space/sm apart, in the order they were added. |

## Usage (do / don't)

- Do: Say what is accepted in the caption, the types and the size limit, so refusals stay rare.
- Do: Move each row through waiting, uploading and complete yourself, as the upload really progresses.
- Don't: Don't rely on drag and drop alone. The Select files button is the accessible path, so keep it visible.
- Don't: Don't stack zone errors. The error row shows one message, either the product's error or the first refusal.

## Accessibility

The Select files button is the keyboard path. It is described by the headline and the caption, so both should read as instruction rather than decoration. The zone itself takes no focus, which is why the button has to stay visible and reachable rather than being treated as a fallback. The error message is the only place a refusal is named, so announce it when it appears rather than leaving the border colour to carry it alone.

## Layout & theming intents

| Property | Type | Description |
|---|---|---|
| Width | Fills container | The zone and the rows take the container's width. The zone centres its content. |
| Padding | Fixed | space/xl above and below and space/lg at the sides inside the zone, with space/sm between its parts. space/md between the zone and the list. |
| Radius | Per Shape | radius/md on the zone and the file rows when rounded, radius/none when sharp. The Select files button carries Button's own radius/element-sm. |
| Border | Per State | 1 wide, dashed on border/default. It turns solid border/focus while dragging, and dashed border/error on error. |
| Colour | Theming | surface/card zone, surface/info while dragging, surface/subtle when disabled. Text runs foreground/primary, foreground/secondary and foreground/disabled. |
| Typography | Fixed | title/medium headline, body/xsmall or, body/small caption and error message. |

## Visual reference

- Page: https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=8286-923
- File Upload: https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=8289-840
- File Upload Item: https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=8288-545
- File Indicator: https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=8416-636
- Per-variant links are in the JSON.

## Issues

**Warn**
- File Upload Item's Extension property is bound to nothing. The extension is set on the exposed File Indicator instead.
- On a failed ring row, the retry Icon Button is named Dismiss and bound to Show Dismiss. Turning dismiss off also removes retry.
- The metadata says Show Dismiss false turns off a ring row's cancel. Show Dismiss is not bound to the ring's cancel, which stays on.
- Rounded ring rows mix shapes: complete uses a sharp Icon Button, and error a sharp delete beside a full retry. The others are full.
- The Files slot has no preferred components. The metadata expects File Upload Item rows.
- The zone's dash pattern (4, 4) has no token.
- File Indicator's vertical padding is a raw 3Px.
- File Indicator's fill is surface/shade at a literal paint opacity of 0.1.

**Note**
- The metadata calls Dismiss a small Icon Button. Ring rows use a large one.
- The body's top padding (space/2xs) is bound in bar rows only.
- Headline, error message, byte count and the error reason are parent owned. None is a property.
- Progress shows fixed samples (50%, 100%), and the ring row's byte count is sample text. Progress is a 0–100 input.
- Every File Upload Item variant shows the same sample file name.
- drop and pick are behaviours with no variant.
- File Indicator has no description or metadata frame.
- File Indicator's unknown type shows a fixed "?", not bound to Extension.
- Status and error glyphs carry their status colour in Figma. As font glyphs they take currentColor from the label beside them.
- Both components are 480Px wide in Figma. The metadata says they fill their container.
