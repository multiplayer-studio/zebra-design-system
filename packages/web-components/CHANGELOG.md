# @zebra-design-system/web-components

## 0.8.2

### Patch Changes

- Dialog: the 480px width is now a max width. The dialog follows the page width up to it; set `--zds-dialog-max-width` (`--dialog-max-width` in Zeta Web) to change it. The older width names still work. Zeta Web's dialog no longer overflows a narrow page.
  
  Button: a disabled `zds-button` no longer takes the hover or pressed look.

## 0.8.1

### Patch Changes

- Dialog follows the updated Figma component: it holds a fixed 480px width with its padding and border included (it was 506px), and the footer fills that width. The spec also records the body as a slot.

## 0.8.0

### Minor Changes

- The skills are renamed for who they are for. Designer skills: `designer-prototype`, `designer-project-onboarding`, `designer-theme`, `designer-handoff`. Builder skills: `builder-figma-to-code`, `builder-ui`. Shared skills: `shared-ux-patterns`, `shared-ux-audit`. The old `zebra-*` names no longer work. Running `npx zebra-skills` (or `npx zebra-patterns-skills`) again installs the new names and removes the old copies.

### Patch Changes

- Updated dependencies
  - @zebra-design-system/patterns@0.4.0

## 0.7.6

### Patch Changes

- Onboarding from a design or a codebase is faster. A survey script reads a codebase in one run, the match question comes straight after it, and the review covers only the theme, the shell and the screens being built; the rest is reviewed when a prototype first builds it. The parity check saves the source's measurements once and a script lists every gap in one run.

## 0.7.5

### Patch Changes

- Matching a source is now one to one and asks nothing on the way. When a designer chooses to match a project's look, the build puts parity with the source, in look and in structure, ahead of using the Design System's parts: a part that doesn't reproduce the source exactly is changed or built for the project, and the 20% limit on custom parts is gone. After building, the skill checks parity against the source, a Figma design or a codebase alike, lists the gaps and fixes them itself until none is left. The setup questions, the final confirmation and the question after the first build no longer follow a choice to match; the build ends with a report instead. The one remaining question is whether to make up data for a screen that needs live data.

## 0.7.4

### Patch Changes

- Onboarding from a Figma design or a codebase now asks, straight after the review, whether prototypes should match the look of the project as it is. On yes, the build matches its look and feel as closely as possible and keeps the style changes it takes in `zebra-context/overrides.css`, scoped to the project, so every prototype starts from the same look. On no, it builds from the Design System's parts as they come. The answer is saved as `look` in `PROJECT.md`.

## 0.7.3

### Patch Changes

- New `zebra-theme` skill, installed by `npx zebra-skills`: gives a project its own brand colour, neutrals or font as a generated theme, checked for contrast in every mode. It finds the `zebra-theme` tool in the project's packages, or uses the copy that now ships with the Claude Code plugin, so theming works for someone who has the plugin and no packages installed.

## 0.7.2

### Patch Changes

- Compositions are reference ideas, never rules, and the set starts again from empty. The seven screen recipes and the organisms drafted in 0.2.0 are removed, with their rows in `zebra.md`; `graph.json` ships with no recipes until new compositions are added. The spacing steps stay. The `zebra-ux-patterns`, `zebra-ux-audit` and `zebra-prototype` skills use a composition as a starting point to adapt when there is one, and compose from the numbered rules when there is none. An audit never reports a difference from a composition as a finding.
- Updated dependencies
- Updated dependencies
  - @zebra-design-system/patterns@0.3.0

## 0.7.1

### Patch Changes

- Onboarding and prototyping from a source. A project that starts from a Figma
  design or a codebase is first built to match it strictly: its spacing, fonts,
  components and words, with a style change or a custom component kept in the
  project where the Design System can't match, and custom components kept under
  20%. Nothing is made up: no extra functionality or data, and the skill asks
  before inventing data for a screen that needs live data. After the first
  build it lists the adjusted parts and asks whether to switch them to the
  Design System's own versions. Companion and AI use are read from the source,
  not asked. The skills now speak to designers in plain words, call the system
  "the Design System", and keep each question's summary inside its dialog.
- 23f7c6a: New `zebra-handoff` skill, installed by `npx zebra-skills`: hands a finished
  prototype to developers as a build spec. It compares the page in
  `prototypes/<name>/` with its last handoff (a copy kept in its `handoff/marks/`),
  confirms the changes with the designer in one dialog, and writes a spec that
  names each `zds-*` element as the app's library names it, with its props,
  semantic tokens (with their value in each mode), states, behaviour, surfaces
  and copy. The first handoff saves which library the app is built with in
  `zebra-context/PROJECT.md`. `zebra-prototype` now keeps its page in
  `prototypes/<name>/` so it can be handed off.
- Updated dependencies
  - @zebra-design-system/icons@0.2.1

## 0.7.0

### Minor Changes

- Navigation Rail: `showDivider` turns the divider on the rail's trailing edge on or off. It is on by default in react-baseui and web-components, as in Figma, so the rail is 1px wider. In zeta-web it is `show-divider`, off by default.
  
  Navigation Rail: the rail is no longer locked to dark. It follows the page's mode by default; `inverse` shows the opposite shade of the page; a new `locked` keeps it dark, or light with `inverse`. AA or AAA follows the page in every case. **Breaking:** a rail on a light page is now light. Add `locked` to keep the old look (`locked inverse` for the old `inverse`).
  
  Global Header: `anchored` (default true) and `showProfile` (default true). **Breaking:** a rounded header's bar now has square corners unless `anchored` is false; its controls still round. `showProfile` false hides the account control. A floating header (rounded, not anchored) also takes the medium shadow.

### Patch Changes

- Skills: icons are never imported from Figma. A build uses the icon set's glyph, or the closest one by meaning, and reports the replacement. An illustration is defined as a complex vector picture with several groups, colours and shapes.

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
