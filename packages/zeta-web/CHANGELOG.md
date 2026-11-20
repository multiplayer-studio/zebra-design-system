# @zebra-design-system/zeta-web

## 0.6.0

### Minor Changes

- Zeta Web draws its icons from the Zebra icon set. It now depends on `@zebra-design-system/icons`, the package the React and web component libraries use, and no longer on `@zebra-fed/zeta-icons`. Every icon name keeps working: `<zeta-icon>` takes the set's kebab-case names (`expand-more`) and the same names with underscores (`expand_more`). The icon font families are now `ZdsIcons-Rounded` and `ZdsIcons-Sharp`, so glyph outlines follow the Zebra set. `ZetaIconName`, `ZetaIconNameList` and `zetaIconGlyph` are exported from the package. The icon element still loads its own font stylesheet, now `@zebra-design-system/icons/icons.css`, so apps need no extra import.

## 0.5.1

### Major Changes

- Renamed from `@zebra-fed/zeta-web` and re-versioned to match the React and web component libraries. Change the package name in installs and imports: `@zebra-fed/zeta-web` becomes `@zebra-design-system/zeta-web`. The elements, exports and styles are the same as `@zebra-fed/zeta-web` 1.7.0. The default `basePath` of `zeta-illustration` follows the new name.
- Versioned and released with the other Zebra Design System packages from now on, always at the same version as `@zebra-design-system/react-baseui` and `@zebra-design-system/web-components`.

Earlier releases were published as `@zebra-fed/zeta-web` 1.x.
