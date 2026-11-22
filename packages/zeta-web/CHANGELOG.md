# @zebra-design-system/zeta-web

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
