// Hand-verified correspondence tables between zeta_flutter's existing token API
// (packages/zeta_flutter_theme/lib/src/generated/tokens/*.g.dart) and the new
// DTCG token source in tokens/dtcg-tokens/. These are the actual design content
// of the zeta Flutter target — see zeta-generate.ts for how they're consumed.

// Zeta named color-swatch getter -> DTCG primitive ramp path (under primitives.color.*).
// Verified by hex-diffing every shade (10..100) against the current
// zeta_flutter_theme primitives.g.dart — all 9 entries below are exact matches in
// both light mode and the dark-mode shade-reversal (dark.shadeN = light.shade(110-N)).
// 'warm' is a near-exact match (3 of 10 shades differ slightly, a genuine minor
// design refresh, not a mapping error).
export const PRIMITIVE_SWATCH_MAP: Record<string, string> = {
  blue: 'system.info',
  cool: 'neutral.cool',
  green: 'system.positive',
  orange: 'system.warning',
  pink: 'accent.4',
  purple: 'accent.1',
  red: 'system.negative',
  teal: 'accent.3',
  warm: 'neutral.warm',
  yellow: 'accent.2',
};

export const RAMP_TO_SWATCH: Record<string, string> = Object.fromEntries(
  Object.entries(PRIMITIVE_SWATCH_MAP).map(([swatch, ramp]) => [ramp, swatch]),
);

// 'pure' (ZetaPureColorSwatch, shades 0/500/1000) has no clean upstream equivalent:
// primitives.color.pure only has {white, black} (2 stops, not 3), and the current
// dark-mode swatch isn't a simple reversal of light mode either. Frozen verbatim in
// zeta-generate.ts rather than derived.

// Zeta primitives spacing scale (x0..x15) -> DTCG primitives.scale.{index}.
// Old and new index numbers diverge (new scale has 22 steps vs old 16's 16 steps)
// but every one of the 16 old values exists exactly in the new scale. Complete, no gaps.
export const SPACING_SCALE_INDEX_MAP: Record<string, number> = {
  x0: 0,
  x1: 3,
  x2: 5,
  x3: 6,
  x4: 7,
  x5: 8,
  x6: 9,
  x7: 10,
  x8: 11,
  x9: 12,
  x10: 13,
  x11: 14,
  x12: 15,
  x13: 17,
  x14: 18,
  x15: 19,
};

// Zeta primitives radius scale (r_0, s, m, l, xl, xl_2, xl_3, xl_4) -> either a
// DTCG primitives.scale.{index} (verified exact px match against size-mobile.json's
// radius group) or a frozen literal px value where no upstream match exists.
export type RadiusMapping = { scaleIndex: number } | { freeze: number };
export const RADIUS_MAP: Record<string, RadiusMapping> = {
  r_0: { scaleIndex: 0 }, // 0 -- matches size.radius.none
  s: { scaleIndex: 3 }, // 4 -- matches size.radius.sm
  m: { scaleIndex: 5 }, // 8 -- matches size.radius.md
  l: { scaleIndex: 7 }, // 16 -- matches size.radius.xl (name differs, value matches)
  xl: { freeze: 24 }, // no upstream radius step between 16 and 9999 (pill)
  xl_2: { freeze: 32 }, // same gap
  xl_3: { freeze: 128 }, // same gap
  xl_4: { freeze: 9999 }, // adopts size.radius.pill's literal (was 360); visually
  // identical "fully rounded" result since Flutter clamps radius to box size.
};

// Zeta ZetaColors getter -> either a ZetaPalette member (dot-path into a
// palette-*.json tree, e.g. 'ink.high' -> ZetaPalette.inkHigh) or a frozen literal
// Dart expression (kept byte-identical to today's semantics.g.dart).
//
// This table is the actual design-content deliverable: semantics-base.json's
// vocabulary (surface/foreground/border/interactive/overlay/feedback/focus/chart/
// selection/shadow) is not a renamed version of ZetaColors's (main/border/surface/
// state/chart/avatar) -- there is no mechanical string transform between them.
// Every 'freeze' below was checked against semantics-base.json and has either (a)
// no plausible upstream role at all (avatar, state/info, chart secondaries, the
// primary/secondary customization pointers), or (b) a same-shade upstream value
// that isn't worth routing through an extra indirection. Every non-frozen entry
// was checked for a same-or-adjacent shade-index match against the documented
// hex values in the current semantics.g.dart.
export type SemanticColorMapping = { palette: string } | { freeze: string };
export const SEMANTIC_COLOR_MAP: Record<string, SemanticColorMapping> = {
  // main
  mainDefault: { palette: 'ink.high' },
  mainSubtle: { palette: 'ink.medium' },
  mainPrimary: { freeze: 'primitives.primary.shade60' },
  mainSecondary: { freeze: 'primitives.secondary.shade60' },
  mainPositive: { palette: 'status.success.default' },
  mainWarning: { palette: 'status.warning.default' },
  mainNegative: { palette: 'status.error.default' },
  mainInfo: { palette: 'status.info.default' },
  mainDisabled: { palette: 'ink.disabled' },
  mainLight: { freeze: 'primitives.cool.shade30' },
  mainInverse: { palette: 'ink.inverse' },

  // border
  borderDefault: { palette: 'line.default' },
  borderSelected: { palette: 'line.selection' },
  borderHover: { palette: 'line.strong' },
  borderSubtle: { palette: 'line.subtle' },
  borderDisabled: { freeze: 'primitives.cool.shade20' },
  borderPure: { freeze: 'primitives.pure.shade0' },
  borderPrimaryMain: { freeze: 'primitives.primary.shade60' },
  borderPrimary: { freeze: 'primitives.primary.shade50' },
  borderSecondary: { freeze: 'primitives.secondary.shade50' },
  borderPositive: { palette: 'status.success.subtle' },
  borderWarning: { palette: 'status.warning.subtle' },
  borderNegative: { palette: 'status.error.subtle' },
  borderInfo: { palette: 'status.info.subtle' },

  // surface
  surfaceDefault: { palette: 'fill.default' },
  surfaceDefaultInverse: { palette: 'fill.inverse' },
  surfaceHover: { freeze: 'primitives.cool.shade20' },
  surfaceSelected: { palette: 'fill.selection' },
  surfaceSelectedHover: { freeze: 'primitives.blue.shade20' },
  surfaceDisabled: { freeze: 'primitives.cool.shade30' },
  surfaceCool: { freeze: 'primitives.cool.shade10' },
  surfaceWarm: { freeze: 'primitives.warm.shade10' },
  surfacePrimary: { freeze: 'primitives.primary.shade60' },
  surfacePrimarySubtle: { freeze: 'primitives.primary.shade10' },
  surfaceSecondary: { freeze: 'primitives.secondary.shade60' },
  surfaceSecondarySubtle: { freeze: 'primitives.secondary.shade10' },
  surfacePositive: { freeze: 'primitives.green.shade60' },
  surfacePositiveSubtle: { palette: 'status.success.faint' },
  surfaceWarning: { freeze: 'primitives.orange.shade60' },
  surfaceWarningSubtle: { palette: 'status.warning.faint' },
  surfaceNegative: { freeze: 'primitives.red.shade60' },
  surfaceNegativeSubtle: { palette: 'status.error.faint' },
  surfaceInfo: { freeze: 'primitives.purple.shade60' },
  surfaceInfoSubtle: { palette: 'status.info.faint' },

  // state
  stateDisabledDisabled: { freeze: 'primitives.cool.shade30' },
  stateDefaultEnabled: { palette: 'fill.default' },
  stateDefaultHover: { palette: 'fill.canvas' },
  stateDefaultSelected: { freeze: 'primitives.blue.shade10' },
  stateDefaultFocus: { palette: 'fill.default' },
  statePrimaryEnabled: { freeze: 'primitives.primary.shade60' },
  statePrimaryHover: { freeze: 'primitives.primary.shade50' },
  statePrimarySelected: { freeze: 'primitives.primary.shade70' },
  statePrimaryFocus: { freeze: 'primitives.primary.shade60' },
  stateNegativeEnabled: { palette: 'status.error.default' },
  stateNegativeHover: { palette: 'status.error.subtle' },
  stateNegativeSelected: { palette: 'status.error.deep' },
  stateNegativeFocus: { palette: 'status.error.default' },
  stateSecondaryEnabled: { freeze: 'primitives.secondary.shade40' },
  stateSecondaryHover: { freeze: 'primitives.secondary.shade30' },
  stateSecondarySelected: { freeze: 'primitives.secondary.shade50' },
  stateSecondaryFocus: { freeze: 'primitives.secondary.shade40' },
  stateInfoEnabled: { freeze: 'primitives.purple.shade60' },
  stateInfoHover: { freeze: 'primitives.purple.shade50' },
  stateInfoSelected: { freeze: 'primitives.purple.shade70' },
  stateInfoFocus: { freeze: 'primitives.purple.shade60' },
  stateInverseEnabled: { palette: 'fill.inverse' },
  stateInverseHover: { palette: 'fill.inversehover' },
  stateInverseSelected: { palette: 'fill.inversepressed' },
  stateInverseFocus: { palette: 'fill.inverse' },
  statePositiveEnabled: { palette: 'status.success.default' },
  statePositiveHover: { palette: 'status.success.subtle' },
  statePositiveSelected: { palette: 'status.success.deep' },
  statePositiveFocus: { palette: 'status.success.default' },

  // chart -- frozen wholesale: the new palette.data.1..12 categorical cycle is an
  // arbitrary designer-chosen sequence (brand/accent/extend based) with no positional
  // or hue correspondence to the old chart1..8 (explicitly green/orange/red/purple/
  // teal/pink/cool based) getters. Mapping by position would silently swap hues
  // (e.g. chart2 currently reliably green would become orange-red) -- a real visual
  // regression, not a safe migration. Needs a design decision, not a guess.
  chart1Primary: { freeze: 'primitives.primary.shade60' },
  chart1Secondary: { freeze: 'primitives.blue.shade40' },
  chart2Primary: { freeze: 'primitives.green.shade60' },
  chart2Secondary: { freeze: 'primitives.green.shade40' },
  chart3Primary: { freeze: 'primitives.orange.shade50' },
  chart3Secondary: { freeze: 'primitives.orange.shade30' },
  chart4Primary: { freeze: 'primitives.red.shade60' },
  chart4Secondary: { freeze: 'primitives.red.shade40' },
  chart5Primary: { freeze: 'primitives.purple.shade60' },
  chart5Secondary: { freeze: 'primitives.purple.shade40' },
  chart6Primary: { freeze: 'primitives.teal.shade60' },
  chart6Secondary: { freeze: 'primitives.teal.shade40' },
  chart7Primary: { freeze: 'primitives.pink.shade60' },
  chart7Secondary: { freeze: 'primitives.pink.shade40' },
  chart8Primary: { freeze: 'primitives.cool.shade90' },
  chart8Secondary: { freeze: 'primitives.cool.shade70' },

  // avatar -- no upstream concept at all.
  avatarBlue: { freeze: 'primitives.blue.shade80' },
  avatarGreen: { freeze: 'primitives.green.shade60' },
  avatarOrange: { freeze: 'primitives.orange.shade50' },
  avatarPink: { freeze: 'primitives.pink.shade80' },
  avatarPurple: { freeze: 'primitives.purple.shade80' },
  avatarTeal: { freeze: 'primitives.teal.shade80' },
  avatarYellow: { freeze: 'primitives.yellow.shade50' },
};

// Typography group name (in typography-mobile.json) -> ZetaTextStyle getter name.
export const TYPOGRAPHY_GROUP_MAP: Record<string, string> = {
  'display.large': 'displayLarge',
  'display.medium': 'displayMedium',
  'display.small': 'displaySmall',
  'heading.large': 'heading1',
  'heading.medium': 'heading2',
  'heading.small': 'heading3',
  'title.large': 'titleLarge',
  'title.medium': 'titleMedium',
  'title.small': 'titleSmall',
  'body.large': 'bodyLarge',
  'body.medium': 'bodyMedium',
  'body.small': 'bodySmall',
  'body.xsmall': 'bodyXSmall',
  'label.large': 'labelLarge',
  'label.medium': 'labelMedium',
  'label.small': 'labelSmall',
  'label.indicator': 'labelIndicator',
};
