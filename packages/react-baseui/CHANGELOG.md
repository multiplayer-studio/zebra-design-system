# @zebra-design-system/react-baseui

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
