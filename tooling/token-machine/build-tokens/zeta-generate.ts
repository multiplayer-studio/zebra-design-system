// Generates Dart source matching zeta_flutter_theme's actual token API shape
// (ZetaPrimitives / ZetaPalette / ZetaColors / ZetaSpacing / ZetaRadius /
// ZetaSemantics + a ZetaGeneratedTextStyles typography mixin) from the DTCG
// token files in tokens/dtcg-tokens/. Output lands in
// packages/design-system-tokens/dist/flutter-zeta/, additive to the existing
// generic dist/flutter/ output -- see tooling/token-machine/README.md for the
// hand-off step that copies these into zeta_flutter's repo.
//
// This intentionally resolves DTCG alias chains directly (read JSON, follow
// `{a.b.c}` strings) rather than through Style Dictionary's format/filter
// machinery: the zeta target's per-getter resolution rules (named-swatch
// back-mapping, dark-shade reversal, frozen fallbacks) don't fit the
// one-file-per-format model the existing flutter/flat-* formats use, and a
// small hand-rolled resolver is easier to verify directly than to bend SD to
// this shape.

import * as fs from 'fs';
import * as path from 'path';
import { TOKEN_DIR } from './constants.ts';
import { dashToCamel } from './dart-helpers.ts';
import {
  PRIMITIVE_SWATCH_MAP,
  RAMP_TO_SWATCH,
  SPACING_SCALE_INDEX_MAP,
  RADIUS_MAP,
  SEMANTIC_COLOR_MAP,
  TYPOGRAPHY_GROUP_MAP,
} from './zeta-name-map.ts';

const ZETA_OUTPUT_DIR = '../../packages/design-system-tokens/dist/flutter-zeta';
const SHADES = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

// ---------------------------------------------------------------------------
// DTCG loading + alias resolution
// ---------------------------------------------------------------------------

function loadJson(filename: string): any {
  const p = path.join(TOKEN_DIR, `${filename}.json`);
  return JSON.parse(fs.readFileSync(p, 'utf-8'));
}

function getByPath(root: any, dotPath: string): any {
  if (!dotPath) return root;
  return dotPath.split('.').reduce((node, seg) => node?.[seg], root);
}

function toPx(raw: unknown): number {
  const m = String(raw).match(/^(-?[\d.]+)px$/);
  if (!m) throw new Error(`zeta-generate: expected px value, got '${raw}'`);
  return parseFloat(m[1]);
}

function dartColorLiteral(raw: string): string {
  const hex = raw.trim().replace(/^#/, '');
  if (hex.length === 6) return `Color(0xFF${hex.toUpperCase()})`;
  if (hex.length === 8) {
    const rgb = hex.slice(0, 6);
    const a = hex.slice(6, 8);
    return `Color(0x${a.toUpperCase()}${rgb.toUpperCase()})`;
  }
  throw new Error(`zeta-generate: unexpected hex length in '${raw}'`);
}

function memberName(pathSegments: string[]): string {
  return dashToCamel(pathSegments.join('-'));
}

type Leaf = { path: string[]; node: any };

function collectLeaves(node: any, prefix: string[] = []): Leaf[] {
  const out: Leaf[] = [];
  if (node && typeof node === 'object') {
    if ('$value' in node) {
      out.push({ path: prefix, node });
    } else {
      for (const key of Object.keys(node)) {
        out.push(...collectLeaves(node[key], [...prefix, key]));
      }
    }
  }
  return out;
}

function buildSwatchHex(primitivesRoot: any, rampPath: string, brightness: 'light' | 'dark'): Record<number, string> {
  const rampNode = getByPath(primitivesRoot, `color.${rampPath}`);
  if (!rampNode) throw new Error(`zeta-generate: ramp not found 'color.${rampPath}'`);
  const out: Record<number, string> = {};
  for (const shade of SHADES) {
    const sourceShade = brightness === 'dark' ? 110 - shade : shade;
    out[shade] = rampNode[String(sourceShade)].$value;
  }
  return out;
}

// Resolves a palette leaf's `{primitives.color.X.N}` alias to either a
// `primitives.<swatch>.shadeN` expression (named swatch) or a baked literal
// Color (no corresponding named swatch, e.g. brand.main, extend.*).
function resolvePaletteGetterExpr(leafNode: any, primitivesRoot: any): string {
  const raw = leafNode.$value;
  if (typeof raw !== 'string') throw new Error('zeta-generate: expected string $value for palette leaf');
  const m = raw.match(/^\{primitives\.color\.([^}]+)\}$/);
  if (!m) return dartColorLiteral(raw);
  const fullPath = m[1];
  const lastDot = fullPath.lastIndexOf('.');
  const rampPath = fullPath.slice(0, lastDot);
  const shade = fullPath.slice(lastDot + 1);
  const swatch = RAMP_TO_SWATCH[rampPath];
  if (swatch) return `primitives.${swatch}.shade${shade}`;
  const rampNode = getByPath(primitivesRoot, `color.${rampPath}`);
  const shadeNode = rampNode?.[shade];
  if (!shadeNode) throw new Error(`zeta-generate: cannot resolve primitives.color.${fullPath}`);
  return dartColorLiteral(shadeNode.$value);
}

// ---------------------------------------------------------------------------
// primitives.g.dart
// ---------------------------------------------------------------------------

const PRIMITIVES_INTERFACE = `/// Interface used for zeta color primitives
abstract interface class ZetaPrimitives {
  const ZetaPrimitives({
    ZetaColorSwatch? primary,
    ZetaColorSwatch? secondary,
    required this.brightness,
  })  : _primary = primary,
        _secondary = secondary;

  final ZetaColorSwatch? _primary;

  final ZetaColorSwatch? _secondary;

  /// Primary color
  ZetaColorSwatch get primary => _primary ?? blue;

  /// Secondary color
  ZetaColorSwatch get secondary => _secondary ?? yellow;

  /// The brightness of the primitives
  final Brightness brightness;

  /// Blue
  ZetaColorSwatch get blue;

  /// Cool
  ZetaColorSwatch get cool;

  /// Green
  ZetaColorSwatch get green;

  /// Orange
  ZetaColorSwatch get orange;

  /// Pink
  ZetaColorSwatch get pink;

  /// Pure
  ZetaPureColorSwatch get pure;

  /// Purple
  ZetaColorSwatch get purple;

  /// Red
  ZetaColorSwatch get red;

  /// Teal
  ZetaColorSwatch get teal;

  /// Warm
  ZetaColorSwatch get warm;

  /// Yellow
  ZetaColorSwatch get yellow;

  /// 0dp space
  double get x0;

  /// 4dp space
  double get x1;

  /// 8dp space
  double get x2;

  /// 12dp space
  double get x3;

  /// 16dp space
  double get x4;

  /// 20dp space
  double get x5;

  /// 24dp space
  double get x6;

  /// 28dp space
  double get x7;

  /// 32dp space
  double get x8;

  /// 36dp space
  double get x9;

  /// 40dp space
  double get x10;

  /// 44dp space
  double get x11;

  /// 48dp space
  double get x12;

  /// 64dp space
  double get x13;

  /// 80dp space
  double get x14;

  /// 96dp space
  double get x15;

  /// 0dp radius
  Radius get r_0;

  /// 4dp radius
  Radius get s;

  /// 8dp radius
  Radius get m;

  /// 16dp radius
  Radius get l;

  /// 24dp radius
  Radius get xl;

  /// 32dp radius
  Radius get xl_2;

  /// 128dp radius
  Radius get xl_3;

  /// Fully rounded radius
  Radius get xl_4;
}`;

// 'pure' has no clean upstream equivalent (primitives.color.pure is a 2-stop
// white/black pair, and dark mode isn't a simple reversal of light mode
// either) -- frozen verbatim from the current zeta_flutter_theme file.
const PURE_SWATCH: Record<'light' | 'dark', string> = {
  light: `  @override
  ZetaPureColorSwatch get pure => const ZetaPureColorSwatch(
        swatch: {
          0: Color(0xFFffffff),
          500: Color(0xFF151519),
          1000: Color(0xFF151519),
        },
        primary: 0xFF151519,
      );
`,
  dark: `  @override
  ZetaPureColorSwatch get pure => const ZetaPureColorSwatch(
        swatch: {
          0: Color(0xFF151519),
          500: Color(0xFF1d1e23),
          1000: Color(0xFFffffff),
        },
        primary: 0xFF1d1e23,
      );
`,
};

function emitPrimitivesConcreteClass(primitivesRoot: any, brightness: 'light' | 'dark'): string {
  const className = brightness === 'light' ? 'ZetaPrimitivesLight' : 'ZetaPrimitivesDark';
  let code = `/// ${brightness === 'light' ? 'Light' : 'Dark'} primitives\n`;
  code += `final class ${className} extends ZetaPrimitives {\n`;
  code += `  /// Constructs a new ${className} instance with the (optional) primary and secondary colors.\n`;
  code += `  const ${className}({super.primary, super.secondary}) : super(brightness: Brightness.${brightness});\n`;

  for (const [name, rampPath] of Object.entries(PRIMITIVE_SWATCH_MAP)) {
    const hexes = buildSwatchHex(primitivesRoot, rampPath, brightness);
    code += `  @override\n  ZetaColorSwatch get ${name} => const ZetaColorSwatch(\n    swatch: {\n`;
    for (const shade of SHADES) {
      code += `      ${shade}: ${dartColorLiteral(hexes[shade])},\n`;
    }
    code += `    },\n    primary: 0xFF${hexes[60].replace('#', '').toUpperCase()},\n  );\n`;
  }

  code += PURE_SWATCH[brightness];

  for (const [oldName, scaleIndex] of Object.entries(SPACING_SCALE_INDEX_MAP)) {
    const px = toPx(getByPath(primitivesRoot, `scale.${scaleIndex}`).$value);
    code += `  @override\n  double get ${oldName} => ${px};\n`;
  }

  for (const [oldName, mapping] of Object.entries(RADIUS_MAP)) {
    const px = 'freeze' in mapping ? mapping.freeze : toPx(getByPath(primitivesRoot, `scale.${mapping.scaleIndex}`).$value);
    code += `  @override\n  Radius get ${oldName} => ${px === 0 ? 'Radius.zero' : `const Radius.circular(${px})`};\n`;
  }

  code += `}\n`;
  return code;
}

function emitPrimitivesFile(): string {
  const primitivesRoot = loadJson('primitives-value').primitives;
  let code = `// GENERATED by tooling/token-machine (zeta-generate.ts). DO NOT MODIFY.\n\n`;
  code += `import 'package:flutter/material.dart';\n`;
  code += `// ignore: prefer_relative_imports\n`;
  code += `import 'package:zeta_flutter_theme/zeta_flutter_theme.dart';\n\n`;
  code += `${PRIMITIVES_INTERFACE}\n\n`;
  code += `${emitPrimitivesConcreteClass(primitivesRoot, 'dark')}\n`;
  code += `${emitPrimitivesConcreteClass(primitivesRoot, 'light')}\n`;
  code += `/// All primitives\nMap<String, Type> allPrimitives = {\n  'dark': ZetaPrimitivesDark,\n  'light': ZetaPrimitivesLight,\n};\n`;
  return code;
}

// ---------------------------------------------------------------------------
// palette.g.dart
// ---------------------------------------------------------------------------

const PALETTE_VARIANTS: Array<{ suffix: string; paletteFile: string; primitivesFile: string }> = [
  { suffix: 'DefaultLight', paletteFile: 'palette-light', primitivesFile: 'primitives-value' },
  { suffix: 'DefaultDark', paletteFile: 'palette-dark', primitivesFile: 'primitives-value' },
  { suffix: 'CompanionLight', paletteFile: 'palette-companion-light', primitivesFile: 'primitives-value' },
  { suffix: 'CompanionDark', paletteFile: 'palette-companion-dark', primitivesFile: 'primitives-value' },
  { suffix: 'TargetLight', paletteFile: 'palette-target-light', primitivesFile: 'primitives-target-value' },
  { suffix: 'TargetDark', paletteFile: 'palette-target-dark', primitivesFile: 'primitives-target-value' },
];

function emitPaletteFile(): string {
  const leaves = collectLeaves(loadJson('palette-light').palette);

  let code = `// GENERATED by tooling/token-machine (zeta-generate.ts). DO NOT MODIFY.\n\n`;
  code += `import 'package:flutter/material.dart';\n\n`;
  code += `import 'primitives.g.dart';\n\n`;
  code += `/// The brand/brightness-variant palette tier, sitting between primitives and semantics.\n`;
  code += `abstract interface class ZetaPalette {\n`;
  code += `  /// Constructor for [ZetaPalette].\n`;
  code += `  const ZetaPalette({required this.primitives});\n\n`;
  code += `  /// Primitives used to construct this palette.\n`;
  code += `  final ZetaPrimitives primitives;\n\n`;
  for (const leaf of leaves) {
    code += `  /// ${leaf.path.join('/')}\n  Color get ${memberName(leaf.path)};\n\n`;
  }
  code += `}\n\n`;

  for (const variant of PALETTE_VARIANTS) {
    const paletteRoot = loadJson(variant.paletteFile).palette;
    const primitivesRoot = loadJson(variant.primitivesFile).primitives;
    const className = `ZetaPalette${variant.suffix}`;
    code += `/// ${variant.suffix} palette.\n`;
    code += `final class ${className} extends ZetaPalette {\n`;
    code += `  /// Constructor for [${className}].\n`;
    code += `  const ${className}({required super.primitives});\n\n`;
    for (const leaf of leaves) {
      const node = getByPath(paletteRoot, leaf.path.join('.'));
      const expr = resolvePaletteGetterExpr(node, primitivesRoot);
      code += `  @override\n  Color get ${memberName(leaf.path)} => ${expr};\n`;
    }
    code += `}\n\n`;
  }
  return code;
}

// ---------------------------------------------------------------------------
// semantics.g.dart
// ---------------------------------------------------------------------------

// ZetaSpacing / ZetaRadius are unaffected by the palette tier (they only ever
// reference primitives.x*/r_0.../xl_4, which already carry the new values via
// primitives.g.dart) -- their interfaces and AA bodies are unchanged, kept
// verbatim rather than regenerated.
const SPACING_RADIUS_BLOCK = `/// The semantic tokens for spacing
abstract interface class ZetaSpacing {
  /// Primitives used to construct semantic spacing
  ZetaPrimitives get primitives;

  /// spacing/none
  double get none;

  /// spacing/minimum
  double get minimum;

  /// spacing/small
  double get small;

  /// spacing/medium
  double get medium;

  /// spacing/large
  double get large;

  /// spacing/xl
  double get xl;

  /// spacing/2xl
  double get xl_2;

  /// spacing/3xl
  double get xl_3;

  /// spacing/4xl
  double get xl_4;

  /// spacing/5xl
  double get xl_5;

  /// spacing/6xl
  double get xl_6;

  /// spacing/7xl
  double get xl_7;

  /// spacing/8xl
  double get xl_8;

  /// spacing/9xl
  double get xl_9;

  /// spacing/10xl
  double get xl_10;

  /// spacing/11xl
  double get xl_11;
}

/// The semantic tokens for radius
abstract interface class ZetaRadius {
  /// Primitives used to construct semantic radius
  ZetaPrimitives get primitives;

  /// radius/none
  Radius get none;

  /// radius/minimal
  Radius get minimal;

  /// radius/rounded
  Radius get rounded;

  /// radius/large
  Radius get large;

  /// radius/xl
  Radius get xl;

  /// radius/full
  Radius get full;
}

/// The semantic spacing for AA
class ZetaSpacingAA extends Equatable implements ZetaSpacing {
  /// Constructor for [ZetaSpacingAA]
  const ZetaSpacingAA({required this.primitives});
  @override
  final ZetaPrimitives primitives;
  @override
  double get none => primitives.x0;
  @override
  double get minimum => primitives.x1;
  @override
  double get small => primitives.x2;
  @override
  double get medium => primitives.x3;
  @override
  double get large => primitives.x4;
  @override
  double get xl => primitives.x5;
  @override
  double get xl_2 => primitives.x6;
  @override
  double get xl_3 => primitives.x7;
  @override
  double get xl_4 => primitives.x8;
  @override
  double get xl_5 => primitives.x9;
  @override
  double get xl_6 => primitives.x10;
  @override
  double get xl_7 => primitives.x11;
  @override
  double get xl_8 => primitives.x12;
  @override
  double get xl_9 => primitives.x13;
  @override
  double get xl_10 => primitives.x14;
  @override
  double get xl_11 => primitives.x15;
  @override
  List<Object?> get props => [
        none,
        minimum,
        small,
        medium,
        large,
        xl,
        xl_2,
        xl_3,
        xl_4,
        xl_5,
        xl_6,
        xl_7,
        xl_8,
        xl_9,
        xl_10,
        xl_11,
      ];
}

/// The semantic radius for AA
class ZetaRadiusAA extends Equatable implements ZetaRadius {
  /// Constructor for [ZetaRadiusAA]
  const ZetaRadiusAA({required this.primitives});
  @override
  final ZetaPrimitives primitives;
  @override
  Radius get none => primitives.r_0;
  @override
  Radius get minimal => primitives.s;
  @override
  Radius get rounded => primitives.m;
  @override
  Radius get large => primitives.l;
  @override
  Radius get xl => primitives.xl;
  @override
  Radius get full => primitives.xl_4;
  @override
  List<Object?> get props => [
        none,
        minimal,
        rounded,
        large,
        xl,
        full,
      ];
}`;

function paletteExprFor(mapping: { palette: string } | { freeze: string }): string {
  if ('freeze' in mapping) return mapping.freeze;
  return `palette.${memberName(mapping.palette.split('.'))}`;
}

function emitColorsInterfaceAndImpl(): string {
  const names = Object.keys(SEMANTIC_COLOR_MAP);

  let code = `/// The semantic tokens for colors\nabstract interface class ZetaColors {\n`;
  code += `  /// Primitives used to construct semantic colors\n  ZetaPrimitives get primitives;\n\n`;
  code += `  /// Palette used to construct semantic colors\n  ZetaPalette get palette;\n\n`;
  for (const name of names) {
    code += `  /// ${name}\n  Color get ${name};\n\n`;
  }
  code += `}\n\n`;

  code += `/// The semantic colors for AA\nclass ZetaColorsAA extends Equatable implements ZetaColors {\n`;
  code += `  /// Constructor for [ZetaColorsAA]\n  const ZetaColorsAA({required this.primitives, required this.palette});\n`;
  code += `  @override\n  final ZetaPrimitives primitives;\n`;
  code += `  @override\n  final ZetaPalette palette;\n`;
  for (const name of names) {
    const expr = paletteExprFor(SEMANTIC_COLOR_MAP[name]);
    code += `  @override\n  Color get ${name} => ${expr};\n`;
  }
  code += `  @override\n  List<Object?> get props => [\n`;
  for (const name of names) code += `        ${name},\n`;
  code += `      ];\n}\n\n`;

  return code;
}

function emitSemanticsFile(): string {
  let code = `// GENERATED by tooling/token-machine (zeta-generate.ts). DO NOT MODIFY.\n\n`;
  code += `// ignore_for_file: use_named_constants\n\n`;
  code += `import 'package:equatable/equatable.dart';\nimport 'package:flutter/material.dart';\n`;
  code += `// ignore: prefer_relative_imports\nimport 'package:zeta_flutter_theme/zeta_flutter_theme.dart';\n\n`;
  code += emitColorsInterfaceAndImpl();
  code += `${SPACING_RADIUS_BLOCK}\n\n`;
  code += `/// The semantic tokens for Zeta\nabstract interface class ZetaSemantics {\n`;
  code += `  /// Semantic colors\n  ZetaColors get colors;\n\n`;
  code += `  /// Semantic sizes\n  ZetaSpacing get spacing;\n\n`;
  code += `  /// Semantic Radius\n  ZetaRadius get radius;\n\n`;
  code += `  /// Primitives for this semantics\n  ZetaPrimitives get primitives;\n\n`;
  code += `  /// Palette for this semantics\n  ZetaPalette get palette;\n}\n\n`;
  code += `/// The semantic tokens for AA\nclass ZetaSemanticsAA implements ZetaSemantics {\n`;
  code += `  /// Constructor for [ZetaSemanticsAA]\n`;
  code += `  ZetaSemanticsAA({required this.primitives, required this.palette})\n`;
  code += `      : colors = ZetaColorsAA(primitives: primitives, palette: palette),\n`;
  code += `        spacing = ZetaSpacingAA(primitives: primitives),\n`;
  code += `        radius = ZetaRadiusAA(primitives: primitives);\n\n`;
  code += `  @override\n  final ZetaPrimitives primitives;\n`;
  code += `  @override\n  final ZetaPalette palette;\n`;
  code += `  @override\n  final ZetaColors colors;\n`;
  code += `  @override\n  final ZetaSpacing spacing;\n`;
  code += `  @override\n  final ZetaRadius radius;\n}\n`;
  return code;
}

// ---------------------------------------------------------------------------
// typography.g.dart (ZetaGeneratedTextStyles mixin)
// ---------------------------------------------------------------------------

function emitTypographyFile(): string {
  const typographyRoot = loadJson('typography-mobile').typography;
  const primitivesRoot = loadJson('primitives-value').primitives;

  function resolveTextRef(raw: string): string | number {
    const m = String(raw).match(/^\{primitives\.text\.([^}]+)\}$/);
    if (!m) throw new Error(`zeta-generate: expected primitives.text.* alias, got '${raw}'`);
    const node = getByPath(primitivesRoot, `text.${m[1]}`);
    return node.$value;
  }

  const groups: Record<string, Record<string, any>> = {};
  for (const leaf of collectLeaves(typographyRoot)) {
    const groupKey = leaf.path.slice(0, -1).join('.');
    const propKey = leaf.path.at(-1)!;
    (groups[groupKey] ??= {})[propKey] = leaf.node;
  }

  let code = `// GENERATED by tooling/token-machine (zeta-generate.ts). DO NOT MODIFY.\n\n`;
  code += `import 'package:flutter/material.dart';\n\n`;
  code += `/// Typography getters generated from the mobile breakpoint. Mixed into\n`;
  code += `/// [ZetaTextStyle], which supplies [fontFamily] and [textColor].\n`;
  code += `mixin ZetaGeneratedTextStyles {\n`;
  code += `  /// Font family applied to every generated style.\n  String get fontFamily;\n\n`;
  code += `  /// Text color applied to every generated style.\n  Color? get textColor;\n\n`;

  for (const [groupKey, props] of Object.entries(groups)) {
    const memberNameStr = TYPOGRAPHY_GROUP_MAP[groupKey];
    if (!memberNameStr) throw new Error(`zeta-generate: unmapped typography group '${groupKey}'`);
    const fontSizeRaw = resolveTextRef(props['font-size'].$value);
    const lineHeightRaw = resolveTextRef(props['line-height'].$value);
    const fontWeight = resolveTextRef(props['font-weight'].$value);
    const letterSpacingRaw = resolveTextRef(props['letter-spacing'].$value);
    const fontSize = toPx(fontSizeRaw);
    const lineHeight = toPx(lineHeightRaw);
    const letterSpacing = toPx(letterSpacingRaw);

    code += `  /// ${groupKey}\n  TextStyle get ${memberNameStr} => TextStyle(\n`;
    code += `        fontSize: ${fontSize},\n`;
    code += `        fontWeight: FontWeight.w${fontWeight},\n`;
    code += `        height: ${lineHeight} / ${fontSize},\n`;
    code += `        fontFamily: fontFamily,\n`;
    code += `        color: textColor,\n`;
    if (letterSpacing !== 0) code += `        letterSpacing: ${letterSpacing},\n`;
    code += `      );\n\n`;
  }

  code += `}\n`;
  return code;
}

// ---------------------------------------------------------------------------
// orchestration
// ---------------------------------------------------------------------------

export async function compileZetaTarget() {
  console.log('  - Compiling zeta_flutter target...');
  fs.mkdirSync(path.join(ZETA_OUTPUT_DIR, 'lib', 'generated', 'tokens'), { recursive: true });
  const outDir = path.join(ZETA_OUTPUT_DIR, 'lib', 'generated', 'tokens');

  fs.writeFileSync(path.join(outDir, 'primitives.g.dart'), emitPrimitivesFile(), 'utf-8');
  fs.writeFileSync(path.join(outDir, 'palette.g.dart'), emitPaletteFile(), 'utf-8');
  fs.writeFileSync(path.join(outDir, 'semantics.g.dart'), emitSemanticsFile(), 'utf-8');
  fs.writeFileSync(path.join(outDir, 'typography.g.dart'), emitTypographyFile(), 'utf-8');

  console.log(`    - Wrote primitives.g.dart, palette.g.dart, semantics.g.dart, typography.g.dart to ${outDir}`);
}
