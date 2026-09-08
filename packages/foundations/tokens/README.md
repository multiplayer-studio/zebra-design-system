# @zebra-design-system/tokens

Zebra Design tokens exported to multiple platforms, generated from Figma.

## Platform support

| Platform | Format | Status |
|---|---|---|
| Web (CSS) | CSS custom properties | ✅ Available (this package) |
| Web (JS) | JS/TS token objects | ✅ Available (this package) |
| Android | Kotlin/XML resources | 🚧 Planned, not yet implemented |
| Flutter | Dart constants | ✅ Available (this package) |

## Install

```bash
npm install @zebra-design-system/tokens
```

## Quick start: default theme

For the common case — one resolved theme, light/dark handled automatically — import three files:

```ts
import '@zebra-design-system/tokens/css/colors';
import '@zebra-design-system/tokens/css/sizes';
import '@zebra-design-system/tokens/css/typography';
```

or via `<link>` tags:

```html
<link rel="stylesheet" href="node_modules/@zebra-design-system/tokens/dist/css/colors.css">
<link rel="stylesheet" href="node_modules/@zebra-design-system/tokens/dist/css/sizes.css">
<link rel="stylesheet" href="node_modules/@zebra-design-system/tokens/dist/css/typography.css">
```

Then use the variables in your CSS:

```css
.card {
  background: var(--surface-card);
  padding: var(--space-card);
  font: var(--body-medium-fontsize) var(--body-medium-lineheight) var(--body-medium-fontfamily);
  letter-spacing: var(--body-medium-letterspacing);
}
```

- `colors.css` — semantic color variables (`--surface-page`, `--interactive-primary-background-default`, etc.), fully resolved to hex values. Dark values apply automatically via `@media (prefers-color-scheme: dark)`, or force it with a `.dark-mode` class anywhere up the tree.
- `sizes.css` — spacing/radius/control-size variables (`--space-md`, `--control-sm`, etc.), fully resolved to px values. Values are mobile-first, with tablet/desktop/desktop-compact breakpoints layered in via `@media (min-width: ...)`.
- `typography.css` — typography variables grouped by style (e.g. `--body-medium-fontsize`, `--body-medium-lineheight`, `--body-medium-fontfamily`, `--body-medium-letterspacing`), fully resolved to concrete values. Values are mobile-first, with tablet/desktop/desktop-compact breakpoints available via `@media (min-width: ...)`.

Every variable name is stable regardless of theme or viewport — you never need to branch your CSS/component code on breakpoint or color scheme.

## Quick start: JavaScript/TypeScript

Import token objects directly as JavaScript:

```ts
import colors from '@zebra-design-system/tokens/js/colors';
import sizes from '@zebra-design-system/tokens/js/sizes';
import typography from '@zebra-design-system/tokens/js/typography';

// Access light theme (automatic in browsers, explicit in Node)
const bgColor = colors.light.surfacePage;
const padding = sizes.light.spaceMd;

// Access dark theme
const darkBg = colors.dark.surfacePage;
```

Or use the building-block approach for custom theme mixes:

```ts
import primitives from '@zebra-design-system/tokens/js/primitives/default';
import palette from '@zebra-design-system/tokens/js/palette/default';
import sizes from '@zebra-design-system/tokens/js/size/default';
import semantics from '@zebra-design-system/tokens/js/semantics';

const myTokens = {
  colors: semantics(palette),
  sizes: sizes,
  primitives: primitives,
};
```

Token objects use camelCase naming (e.g. `surfacePage`, `bodyMediumFontSize`) and are fully resolved to concrete values (hex colors, pixel measurements, font families, etc.). Reference the `dist/js/` directory to see available files for each theme.

## Quick start: Flutter (Dart)

Add the tokens as a Flutter dependency:

```yaml
dependencies:
  zebra_design_system_tokens:
    path: ../@zebra-design-system/tokens
```

Import and use token constants:

```dart
import 'package:zebra_design_system_tokens/colors_light.dart';
import 'package:zebra_design_system_tokens/sizes_mobile.dart';
import 'package:zebra_design_system_tokens/typographys_mobile.dart';

Container(
  color: LightColors.surface_page,
  padding: EdgeInsets.all(SizesMobile.space_md.toDouble()),
  child: Text(
    'Hello',
    style: TextStyle(
      fontSize: TypographysMobile.body_medium_fontsize.toDouble(),
      fontFamily: TypographysMobile.body_medium_fontfamily,
    ),
  ),
)
```

For dark theme, use the `*_dark.dart` files:

```dart
import 'package:zebra_design_system_tokens/colors_dark.dart';
```

Token constants are organized by theme and breakpoint:
- **Colors:** `colors_light.dart`, `colors_dark.dart` (automatically handle light/dark modes)
- **Sizes:** `sizes_mobile.dart`, `sizes_tablet.dart`, `sizes_desktop.dart`, `sizes_desktop_compact.dart` (choose the appropriate breakpoint)
- **Typography:** `typographys_mobile.dart`, `typographys_tablet.dart`, `typographys_desktop.dart`, `typographys_desktop_compact.dart` (choose the appropriate breakpoint)

Use the `building_blocks/` directory for custom theme mixes (combining different palettes, primitives, or typography across themes).

### Using a different theme

`default` isn't the only resolved theme — any theme with its own primitives/palette/size/typography override (e.g. `target`, `companion`) ships its own resolved files for both CSS and JS.

**For CSS:**

Resolved theme files are named `{theme}-colors.css` / `{theme}-sizes.css` / `{theme}-typography.css`. Swap the imports:

```ts
import '@zebra-design-system/tokens/css/target-colors';
import '@zebra-design-system/tokens/css/target-sizes';
import '@zebra-design-system/tokens/css/target-typography';
```

Same variable names (`--surface-page`, `--space-md`, `--body-medium-fontsize`, etc.) either way — only the import path changes. Check `dist/css/` for which theme files actually exist; a theme only gets a file if it overrides that layer.

**For JavaScript:**

Swap the theme name in imports:

```ts
import colors from '@zebra-design-system/tokens/js/target-colors';
import sizes from '@zebra-design-system/tokens/js/target-sizes';
import typography from '@zebra-design-system/tokens/js/target-typography';
```

Same token names (`surfacePage`, `spaceMd`, `bodyMediumFontSize`, etc.) regardless of theme — only the import path changes. Check `dist/js/` for which theme files exist.

**For Flutter:**

Import different theme files by filename:

```dart
import 'package:zebra_design_system_tokens/target_colors_light.dart';
import 'package:zebra_design_system_tokens/target_sizes_mobile.dart';
```

Same constant naming convention applies across themes — class and constant names adapt to the theme (e.g., `TargetColorsLight`, `TargetSizesMobile`).

## Mixing themes: building-block files

The default theme above bundles one primitives set + one palette + one typography. To mix a different primitives/palette/size/typography pairing (e.g. a different brand's palette on top of the same primitive scale, or a custom typography scale), import the layers separately instead:

```html
<link rel="stylesheet" href="node_modules/@zebra-design-system/tokens/dist/css/primitives/default.css">
<link rel="stylesheet" href="node_modules/@zebra-design-system/tokens/dist/css/palette/default.css">
<link rel="stylesheet" href="node_modules/@zebra-design-system/tokens/dist/css/size/default.css">
<link rel="stylesheet" href="node_modules/@zebra-design-system/tokens/dist/css/typography/default.css">
<link rel="stylesheet" href="node_modules/@zebra-design-system/tokens/dist/css/semantics.css">
```

or the equivalent package imports (`@zebra-design-system/tokens/css/primitives/default`, `.../css/palette/default`, `.../css/size/default`, `.../css/typography/default`, `.../css/semantics`). Swap `default` for another theme name (e.g. `target`, `companion`) in any layer independently — `semantics.css` is always the same single file.

Rules:
- Load **exactly one** `primitives/*.css`, **exactly one** `palette/*.css`, **exactly one** `size/*.css`, and **exactly one** `typography/*.css` per page — these are `:root`-scoped, so loading two of the same layer silently collides (last one in source order wins).
- Reference tokens the same way either path — `var(--surface-page)`, `var(--space-md)`, `var(--body-medium-fontsize)` — your component code doesn't change based on which layer files you loaded.

