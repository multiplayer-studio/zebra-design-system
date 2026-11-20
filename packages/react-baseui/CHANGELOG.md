# @zebra-design-system/react-baseui

## 0.6.2

### Patch Changes

- Skills: a build from a Figma reference brings the design's pictures with it. Photos of products, faces and places are saved as their original files in the build's assets, brand logos and illustrations come in as inline SVG that can be changed, and none is replaced by an icon or a placeholder.

## 0.6.1

### Patch Changes

- Skills: a prototype or build with a Figma reference now matches the design's variants, spacing and text styles, asks the designer about obvious deviations, and is compared by measurement. `zebra-prototype` opens an empty folder with a start dialog: Free exploration, Figma reference or From a repo. A prototype is now composed to a spacing ladder and gets a visual review after the build, for cramped areas, balance, alignment and consistency, with fixes before hand-over. Screens are composed from the patterns' recipes, and an audit compares each screen with its recipe and offers suggestions.
- Updated dependencies
  - @zebra-design-system/patterns@0.2.0

## 0.6.0

No changes in this release.

## 0.5.1

### Patch Changes

- Ship the UX patterns. The libraries now depend on `@zebra-design-system/patterns`, the component-agnostic rules for how screens are composed and behave, and carry two more skills: `zebra-ux-patterns` (apply) and `zebra-ux-audit` (audit). The three existing skills read the pattern files a task needs, and DESIGN.md §5 indexes the ten patterns. A sixth skill, `zebra-onboard-project`, walks a designer through a short setup and saves the project's context in a committed `zebra-context/` folder; `zebra-prototype` reads it first and `zebra-ux-audit` respects it.

## 0.5.0

### Minor Changes

- Message Input gains the Reply Bar (the spec's Show Reply), and Chat Message
  gets two small additions.
  
  - **Message Input**: set `replyTo` (and `replyText`) to show who and what is
    being answered above the body; web-components uses `reply-to` and
    `reply-text`. The whole bar is one button that cancels the reply: it calls
    `onCancelReply` in react-baseui and fires `zds-cancel-reply` in
    web-components. It is not shown while speaking or disabled. Two new strings,
    `replyingTo` and `cancelReply`.
  - **Chat Message**: the avatar takes a `swatchColor`, and paragraphs in a
    message sit one line apart while line breaks inside a paragraph stay tight.

## 0.4.0

### Minor Changes

- Chat Message, Message Input and File Upload ship as spec-built components.
  
  - **Chat Message** (`specs/chat-message`): the message with its Bubble,
    Controls, Loading Indicator, Timestamp, Thread, Photos and Attachment parts.
    web-components gains the `zds-chat-*` elements with the same API.
  - **Message Input** (`specs/message-input`): in react-baseui it graduates from
    `/experimental` to the main entry; web-components gains
    `<zds-message-input>`, which shows image attachments as a file chip without
    React's thumbnail.
  - **File Upload** (`specs/file-upload`): File Upload, File Upload Item and File
    Indicator. In react-baseui it graduates from `/experimental`.
  
  The earlier experimental `Chat*` exports are removed from
  `@zebra-design-system/react-baseui/experimental`, which is now empty (the
  experimental surface carried no SemVer promise). Import Message Input and File
  Upload from the package root.

### Patch Changes

- Companion follows the Companion token set, and the Target extension is removed.
  
  - **Companion** now overrides 41 palette tokens. Info status is purple, gradients
    run violet to blue, status fills use Companion's bold steps, and surfaces and
    neutrals follow Companion's values.
  - **Companion in AAA Light and AAA Dark** is purple; both modes previously fell
    back to Zebra blue.
  - **Target is gone** (removed from Figma on 17 November 2026): `.ext-target` and
    `data-brand="target"` no longer exist in the token CSS. This is a token removal,
    shipped as a 0.x minor.
- Updated dependencies
  - @zebra-design-system/icons@0.2.0

## 0.3.0

### Minor Changes

- Navigation Drawer ships from its new spec (`specs/navigation-drawer`). In
  react-baseui `NavigationDrawer` graduates from `/experimental` to the main
  entry; web-components gains `<zds-navigation-drawer>` with the same API. It is
  built from the Navigation Rail family (header, Sub Menu Item rows, Collapsible
  Menu Item groups, Divider). Modal (default) slides in over a Scrim and closes on
  Escape, a scrim click, the header's close button (`showClose`, on by default)
  or a chosen destination; `modal={false}` sits in the layout. Only the header is
  sticky; the footer follows the menu.
- Scrim ships as a spec-built component (`specs/scrim`): `Scrim` / `<zds-scrim>`
  with `tone` scrim (overlay/scrim) or modal (overlay/modal). Dialog, Lightbox
  and a modal Bottom Sheet now draw it as their backdrop, using the token alone
  (the spec drops Figma's extra 0.6 opacity).
- Snackbar follows Figma's rename: `status` replaces `flavour`, and `negative`
  replaces `error`. `flavour` stays as a deprecated alias that maps `error` to
  `negative`, so existing code keeps working.

## 0.2.1

### Patch Changes

- Updated dependencies
  - @zebra-design-system/icons@0.1.1

## 0.2.0

### Minor Changes

- 8c901ec: Lightbox ships as a spec-built component everywhere. In react-baseui it
  graduates from `/experimental` to the main entry (`@spec specs/lightbox`);
  web-components gains `<zds-lightbox>` with the same API, built on the native
  `<dialog>` as `zds-dialog`. Per the spec: the stage fills with surface/subtle,
  the panel springs in from the bottom (animations/spring) with the stage
  already at the first frame's height — height animates only on paging — and
  paging slides a mounted track (400ms) while offscreen videos pause.
  Importing Lightbox from `/experimental` no longer works; import it from the
  package root (the experimental surface carried no SemVer promise).
- dbb2763: Ship the `zebra-prototype` consumer skill: build a shareable prototype as a
  Claude artifact from the installed web components, with the system's tokens
  and icon font bundled into the page. Installed alongside the other skills by
  `npx zebra-skills`; also carried by the Claude Code plugin (0.2.0).

### Patch Changes

- b9c86b2: Consumer skills now state the registry-free install path: when the packages
  are missing, install from the repo's `dist/<pkg>` branches (pin with
  `#<pkg>-v<version>`), per DISTRIBUTION.md §Git distribution.
