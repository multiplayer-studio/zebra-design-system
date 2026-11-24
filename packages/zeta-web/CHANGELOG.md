# @zebra-design-system/zeta-web

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

## 0.7.6

### Patch Changes

- Onboarding from a design or a codebase is faster. A survey script reads a codebase in one run, the match question comes straight after it, and the review covers only the theme, the shell and the screens being built; the rest is reviewed when a prototype first builds it. The parity check saves the source's measurements once and a script lists every gap in one run.

## 0.7.5

No changes in this release.

## 0.7.4

No changes in this release.

## 0.7.3

No changes in this release.

## 0.7.2

No changes in this release.

## 0.7.1

### Patch Changes

- Updated dependencies
  - @zebra-design-system/icons@0.2.1

## 0.7.0

### Minor Changes

- Navigation Rail: `showDivider` turns the divider on the rail's trailing edge on or off. It is on by default in react-baseui and web-components, as in Figma, so the rail is 1px wider. In zeta-web it is `show-divider`, off by default.
  
  Navigation Rail: the rail is no longer locked to dark. It follows the page's mode by default; `inverse` shows the opposite shade of the page; a new `locked` keeps it dark, or light with `inverse`. AA or AAA follows the page in every case. **Breaking:** a rail on a light page is now light. Add `locked` to keep the old look (`locked inverse` for the old `inverse`).
  
  Global Header: `anchored` (default true) and `showProfile` (default true). **Breaking:** a rounded header's bar now has square corners unless `anchored` is false; its controls still round. `showProfile` false hides the account control. A floating header (rounded, not anchored) also takes the medium shadow.

## 0.6.2

No changes in this release.

## 0.6.1

No changes in this release.

## 0.6.0

### Minor Changes

- Zeta Web draws its icons from the Zebra icon set. It now depends on `@zebra-design-system/icons`, the package the React and web component libraries use, and no longer on `@zebra-fed/zeta-icons`. Every icon name keeps working: `<zeta-icon>` takes the set's kebab-case names (`expand-more`) and the same names with underscores (`expand_more`). The icon font families are now `ZdsIcons-Rounded` and `ZdsIcons-Sharp`, so glyph outlines follow the Zebra set. `ZetaIconName`, `ZetaIconNameList` and `zetaIconGlyph` are exported from the package. The icon element still loads its own font stylesheet, now `@zebra-design-system/icons/icons.css`, so apps need no extra import.

## 0.5.1

### Major Changes

- Renamed from `@zebra-fed/zeta-web` and re-versioned to match the React and web component libraries. Change the package name in installs and imports: `@zebra-fed/zeta-web` becomes `@zebra-design-system/zeta-web`. The elements, exports and styles are the same as `@zebra-fed/zeta-web` 1.7.0. The default `basePath` of `zeta-illustration` follows the new name.
- Versioned and released with the other Zebra Design System packages from now on, always at the same version as `@zebra-design-system/react-baseui` and `@zebra-design-system/web-components`.

Earlier releases were published as `@zebra-fed/zeta-web` 1.x.
