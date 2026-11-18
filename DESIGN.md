---
name: Zebra Design System
version: '4.2611.0-alpha'
icons: "Zebra Icons 1.9.8 (zeta-icons-round / zeta-icons-sharp), package @zebra-fed/zeta-icons"
# ── TOKEN ARCHITECTURE ──────────────────────────────────────────────────────────
# Three layers (mirrors the Figma variable collections):
#   1. primitives ........................... raw colours (color-*) and the size scale (scale-*).
#      Colours are referenced only by the semantic groups. Components may reference a scale-* step
#      only for a fixed measurement that matches it exactly (e.g. '{primitives.scale-9}' for 24px).
#   2. semantic groups (this frontmatter) ... colors (the Figma 'palette', full set) + the theme modes
#      colors-dark, colors-aaa, colors-aaa-dark and colors-companion(-dark, -aaa, -aaa-dark), each listing
#      only the keys it overrides (see §3 Theme modes), space, control, radius, stroke, container,
#      shadow, typography, font-family, font-weight, motion, layout, opacity, plus component-sizes
#      (fixed measurements with no scale step, e.g. a dialog width)
#   3. component tokens ..................... a `tokens:` block in each atoms/ molecules/
#      organisms/ file, holding references only: '{group.key}' (e.g. '{colors.color-brand-primary-strong}')
#      or, for components listed in `composes`, '{child.token}' (e.g. '{icon.icon-size-small}')
# Every key carries its layer prefix (color-, space-, control-, radius-, stroke-, shadow-, type-…), so the
# CSS name `--<key>` never collides with a component token.
# Raw values (hex, px, ms, %, weights) live ONLY in this frontmatter.
# In prose a token is written `--<key>`. A component file cites its own tokens and the tokens of
# the components it composes.
# ───────────────────────────────────────────────────────────────────────────────
roles:  # Material-style aliases for Stitch tooling → light value of the named Zebra token
  background: '#ffffff'          # color-fill-default
  on-background: '#0c0d0e'       # color-ink-high
  primary: '#1f69ff'             # color-brand-primary-default
  on-primary: '#ffffff'          # color-brand-primary-on
  primary-container: '#e0f0ff'   # color-brand-primary-faint
  secondary: '#ff4d00'           # color-brand-secondary-default
  error: '#d70015'               # color-status-error-default
  error-container: '#fff0f1'     # color-status-error-faint
  outline: '#ced2db'             # color-line-default
  outline-variant: '#e0e3e9'     # color-line-subtle
  inverse-surface: '#1d1e23'     # color-fill-inverse
  inverse-on-surface: '#ffffff'  # color-ink-inverse
primitives:  # raw values from Figma 'primitives'; referenced ONLY by the semantic groups below, never by components
  scale-0: 0px
  scale-1: 1px
  scale-2: 2px
  scale-3: 4px
  scale-4: 6px
  scale-5: 8px
  scale-6: 12px
  scale-7: 16px
  scale-8: 20px
  scale-9: 24px
  scale-10: 28px
  scale-11: 32px
  scale-12: 36px
  scale-13: 40px
  scale-14: 44px
  scale-15: 48px
  scale-16: 56px
  scale-17: 64px
  scale-18: 80px
  scale-19: 96px
  scale-20: 128px
  scale-21: 160px
  scale-neg-1: -1px
  scale-neg-2: -2px
  scale-neg-3: -4px
  scale-neg-4: -6px
  scale-neg-5: -8px
  scale-neg-6: -12px
  scale-container-0: 240px
  scale-container-1: 600px
  scale-container-2: 840px
  scale-container-3: 1200px
  color-neutral-cool-10: '#f8fbff'
  color-neutral-cool-20: '#f3f6fa'
  color-neutral-cool-30: '#e0e3e9'
  color-neutral-cool-40: '#ced2db'
  color-neutral-cool-50: '#8d95a3'
  color-neutral-cool-60: '#7a8190'
  color-neutral-cool-70: '#545963'
  color-neutral-cool-80: '#2c2f36'
  color-neutral-cool-90: '#1d1e23'
  color-neutral-cool-100: '#0c0d0e'
  color-neutral-warm-10: '#fafafa'
  color-neutral-warm-20: '#f7f7f7'
  color-neutral-warm-30: '#ededed'
  color-neutral-warm-40: '#dedede'
  color-neutral-warm-50: '#b9b9b9'
  color-neutral-warm-60: '#858585'
  color-neutral-warm-70: '#585858'
  color-neutral-warm-80: '#313131'
  color-neutral-warm-90: '#202020'
  color-neutral-warm-100: '#151519'
  color-brand-main-10: '#e0f0ff'
  color-brand-main-20: '#b9daff'
  color-brand-main-30: '#8dc0ff'
  color-brand-main-40: '#5ea2ff'
  color-brand-main-50: '#3886ff'
  color-brand-main-60: '#1f69ff'
  color-brand-main-70: '#0e53e5'
  color-brand-main-80: '#003fbd'
  color-brand-main-90: '#002775'
  color-brand-main-100: '#00143a'
  color-brand-alternative-10: '#ffece5'
  color-brand-alternative-20: '#ffd9cc'
  color-brand-alternative-30: '#ffbfa6'
  color-brand-alternative-40: '#ff9f75'
  color-brand-alternative-50: '#ff7a40'
  color-brand-alternative-60: '#ff4d00'
  color-brand-alternative-70: '#f34300'
  color-brand-alternative-80: '#d13f00'
  color-brand-alternative-90: '#8a2900'
  color-brand-alternative-100: '#4a1600'
  color-system-positive-10: '#ecfff7'
  color-system-positive-20: '#d8ffef'
  color-system-positive-30: '#beefdb'
  color-system-positive-40: '#84dab6'
  color-system-positive-50: '#67b796'
  color-system-positive-60: '#00864f'
  color-system-positive-70: '#006d3f'
  color-system-positive-80: '#005f38'
  color-system-positive-90: '#00331e'
  color-system-positive-100: '#081711'
  color-system-negative-10: '#fff0f1'
  color-system-negative-20: '#ffe1e4'
  color-system-negative-30: '#ffb3bb'
  color-system-negative-40: '#f98c97'
  color-system-negative-50: '#f36170'
  color-system-negative-60: '#d70015'
  color-system-negative-70: '#b50012'
  color-system-negative-80: '#8f000e'
  color-system-negative-90: '#520008'
  color-system-negative-100: '#220f11'
  color-system-warning-10: '#fef2e2'
  color-system-warning-20: '#ffe7c6'
  color-system-warning-30: '#ffd292'
  color-system-warning-40: '#ffb348'
  color-system-warning-50: '#d78d26'
  color-system-warning-60: '#ae6500'
  color-system-warning-70: '#965802'
  color-system-warning-80: '#764502'
  color-system-warning-90: '#402600'
  color-system-warning-100: '#1e1100'
  color-system-info-10: '#f1f8ff'
  color-system-info-20: '#e2f1ff'
  color-system-info-30: '#b7dbff'
  color-system-info-40: '#7ebeff'
  color-system-info-50: '#599fe5'
  color-system-info-60: '#0073e6'
  color-system-info-70: '#0061c2'
  color-system-info-80: '#004d99'
  color-system-info-90: '#002c58'
  color-system-info-100: '#101b25'
  color-accent-1-10: '#f7f0ff'
  color-accent-1-20: '#efe1ff'
  color-accent-1-30: '#dcc1fb'
  color-accent-1-40: '#cea4ff'
  color-accent-1-50: '#9b71df'
  color-accent-1-60: '#7e0cff'
  color-accent-1-70: '#6400d6'
  color-accent-1-80: '#43008f'
  color-accent-1-90: '#260052'
  color-accent-1-100: '#180f22'
  color-accent-2-10: '#fff7d4'
  color-accent-2-20: '#ffea89'
  color-accent-2-30: '#f3d961'
  color-accent-2-40: '#dbb91c'
  color-accent-2-50: '#c2a728'
  color-accent-2-60: '#8d7400'
  color-accent-2-70: '#766200'
  color-accent-2-80: '#564908'
  color-accent-2-90: '#352b00'
  color-accent-2-100: '#181400'
  color-accent-3-10: '#ecffff'
  color-accent-3-20: '#d9ffff'
  color-accent-3-30: '#bcfbfb'
  color-accent-3-40: '#91e1e1'
  color-accent-3-50: '#65c4c4'
  color-accent-3-60: '#1a8080'
  color-accent-3-70: '#017474'
  color-accent-3-80: '#005b5b'
  color-accent-3-90: '#003535'
  color-accent-3-100: '#0a1616'
  color-accent-4-10: '#fff7fc'
  color-accent-4-20: '#ffe3f5'
  color-accent-4-30: '#ffbee7'
  color-accent-4-40: '#ff94d8'
  color-accent-4-50: '#ee78c3'
  color-accent-4-60: '#d30589'
  color-accent-4-70: '#ab006d'
  color-accent-4-80: '#840054'
  color-accent-4-90: '#640040'
  color-accent-4-100: '#2e001e'
  color-accent-5-10: '#e2ffb6'
  color-accent-5-20: '#d1ff91'
  color-accent-5-30: '#c4ff6b'
  color-accent-5-40: '#b6ff4a'
  color-accent-5-50: '#a8f931'
  color-accent-5-60: '#8fd820'
  color-accent-5-70: '#6faf13'
  color-accent-5-80: '#528406'
  color-accent-5-90: '#335106'
  color-accent-5-100: '#192b03'
  color-extend-1-10: '#f2f2f2'
  color-extend-1-20: '#e6e6e6'
  color-extend-1-30: '#bdbdbd'
  color-extend-1-40: '#9e9e9e'
  color-extend-1-50: '#878787'
  color-extend-1-60: '#757575'
  color-extend-1-70: '#666666'
  color-extend-1-80: '#565656'
  color-extend-1-90: '#303030'
  color-extend-1-100: '#141414'
  color-extend-2-10: '#fdf5ff'
  color-extend-2-20: '#f8dfff'
  color-extend-2-30: '#f18ffb'
  color-extend-2-40: '#ea7ff6'
  color-extend-2-50: '#d540f2'
  color-extend-2-60: '#c300ed'
  color-extend-2-70: '#9c00c2'
  color-extend-2-80: '#750091'
  color-extend-2-90: '#4f0061'
  color-extend-2-100: '#270030'
  color-extend-3-10: '#fdf7f0'
  color-extend-3-20: '#f6e5d3'
  color-extend-3-30: '#e5a66a'
  color-extend-3-40: '#e8b985'
  color-extend-3-50: '#e8af79'
  color-extend-3-60: '#d7965a'
  color-extend-3-70: '#b87438'
  color-extend-3-80: '#874d17'
  color-extend-3-90: '#714113'
  color-extend-3-100: '#3b2109'
  color-extend-4-10: '#f2f4ff'
  color-extend-4-20: '#dce0ff'
  color-extend-4-30: '#b9c0ff'
  color-extend-4-40: '#95a1ff'
  color-extend-4-50: '#7281fe'
  color-extend-4-60: '#4f62fe'
  color-extend-4-70: '#3441aa'
  color-extend-4-80: '#1a2154'
  color-extend-4-90: '#101433'
  color-extend-4-100: '#080a1a'
  color-pure-white: '#ffffff'
  color-pure-black: '#000000'
  color-alpha-dark-0: 'rgba(12,13,14,0)'
  color-alpha-dark-5: 'rgba(12,13,14,0.05)'
  color-alpha-dark-10: 'rgba(12,13,14,0.1)'
  color-alpha-dark-20: 'rgba(12,13,14,0.2)'
  color-alpha-dark-30: 'rgba(12,13,14,0.3)'
  color-alpha-dark-40: 'rgba(12,13,14,0.4)'
  color-alpha-dark-50: 'rgba(12,13,14,0.5)'
  color-alpha-dark-60: 'rgba(12,13,14,0.6)'
  color-alpha-dark-70: 'rgba(12,13,14,0.7)'
  color-alpha-dark-80: 'rgba(12,13,14,0.8)'
  color-alpha-dark-90: 'rgba(12,13,14,0.9)'
  color-alpha-light-0: 'rgba(214,220,226,0)'
  color-alpha-light-5: 'rgba(212,221,230,0.05)'
  color-alpha-light-10: 'rgba(212,221,230,0.1)'
  color-alpha-light-20: 'rgba(212,221,230,0.2)'
  color-alpha-light-30: 'rgba(212,221,230,0.3)'
  color-alpha-light-40: 'rgba(212,221,230,0.4)'
  color-alpha-light-50: 'rgba(212,221,230,0.5)'
  color-alpha-light-60: 'rgba(212,221,230,0.6)'
  color-alpha-light-70: 'rgba(212,221,230,0.7)'
  color-alpha-light-80: 'rgba(212,221,230,0.8)'
  color-alpha-light-90: 'rgba(212,221,230,0.9)'
colors:  # Figma 'palette' semantic colours, light, AA (default). The full set; every other mode lists only overrides
  color-brand-primary-default: '{primitives.color-brand-main-60}'
  color-brand-primary-faint: '{primitives.color-brand-main-10}'
  color-brand-primary-subtle: '{primitives.color-brand-main-50}'
  color-brand-primary-strong: '{primitives.color-brand-main-70}'
  color-brand-primary-deep: '{primitives.color-brand-main-80}'
  color-brand-primary-muted: '{primitives.color-brand-main-20}'
  color-brand-primary-on: '{primitives.color-pure-white}'
  color-brand-secondary-default: '{primitives.color-brand-alternative-60}'
  color-brand-secondary-faint: '{primitives.color-brand-alternative-10}'
  color-brand-secondary-subtle: '{primitives.color-brand-alternative-50}'
  color-brand-secondary-strong: '{primitives.color-brand-alternative-70}'
  color-brand-secondary-deep: '{primitives.color-brand-alternative-80}'
  color-brand-secondary-on: '{primitives.color-pure-white}'
  color-brand-tertiary-default: '{primitives.color-accent-5-60}'
  color-brand-tertiary-faint: '{primitives.color-accent-5-10}'
  color-brand-tertiary-subtle: '{primitives.color-accent-5-50}'
  color-brand-tertiary-strong: '{primitives.color-accent-5-70}'
  color-brand-tertiary-deep: '{primitives.color-accent-5-80}'
  color-brand-tertiary-on: '{primitives.color-pure-white}'
  color-fill-canvas: '{primitives.color-neutral-cool-20}'
  color-fill-default: '{primitives.color-pure-white}'
  color-fill-elevated: '{primitives.color-pure-white}'
  color-fill-overlay: '{primitives.color-pure-white}'
  color-fill-inverse: '{primitives.color-neutral-cool-90}'
  color-fill-sunken: '{primitives.color-neutral-cool-30}'
  color-fill-faint: '{primitives.color-neutral-cool-20}'
  color-fill-scrim: '{primitives.color-alpha-dark-60}'
  color-fill-selection: '{primitives.color-brand-main-20}'
  color-fill-hover: '{primitives.color-neutral-cool-70}'
  color-fill-inverse-sunken: '{primitives.color-neutral-cool-80}'
  color-fill-inverse-elevated: '{primitives.color-neutral-cool-100}'
  color-fill-disabled: '{primitives.color-neutral-cool-30}'
  color-fill-transparent-emphasis: '{primitives.color-alpha-dark-5}'
  color-fill-transparent-elevate: '{primitives.color-alpha-dark-10}'
  color-fill-transparent-obsure: '{primitives.color-alpha-dark-30}'
  color-fill-transparent: '{primitives.color-alpha-light-0}'
  color-ink-high: '{primitives.color-neutral-cool-100}'
  color-ink-medium: '{primitives.color-neutral-cool-70}'
  color-ink-low: '{primitives.color-neutral-cool-60}'
  color-ink-disabled: '{primitives.color-neutral-cool-50}'
  color-ink-inverse: '{primitives.color-pure-white}'
  color-ink-link: '{primitives.color-brand-main-60}'
  color-ink-brand: '{primitives.color-brand-main-70}'
  color-ink-selection: '{primitives.color-neutral-cool-100}'
  color-ink-always-white: '{primitives.color-pure-white}'
  color-ink-always-blank: '{primitives.color-neutral-cool-100}'
  color-status-success-default: '{primitives.color-system-positive-60}'
  color-status-success-faint: '{primitives.color-system-positive-10}'
  color-status-success-deep: '{primitives.color-system-positive-80}'
  color-status-success-strong: '{primitives.color-system-positive-70}'
  color-status-success-subtle: '{primitives.color-system-positive-50}'
  color-status-warning-default: '{primitives.color-system-warning-60}'
  color-status-warning-faint: '{primitives.color-system-warning-10}'
  color-status-warning-deep: '{primitives.color-system-warning-80}'
  color-status-warning-strong: '{primitives.color-system-warning-70}'
  color-status-warning-subtle: '{primitives.color-system-warning-50}'
  color-status-error-default: '{primitives.color-system-negative-60}'
  color-status-error-faint: '{primitives.color-system-negative-10}'
  color-status-error-deep: '{primitives.color-system-negative-80}'
  color-status-error-subtle: '{primitives.color-system-negative-50}'
  color-status-error-strong: '{primitives.color-system-negative-70}'
  color-status-info-default: '{primitives.color-system-info-60}'
  color-status-info-faint: '{primitives.color-system-info-10}'
  color-status-info-deep: '{primitives.color-system-info-80}'
  color-status-info-subtle: '{primitives.color-system-info-50}'
  color-status-info-strong: '{primitives.color-system-info-70}'
  color-status-ghost-default: '{primitives.color-alpha-dark-0}'
  color-status-ghost-faint: '{primitives.color-alpha-dark-5}'
  color-status-ghost-deep: '{primitives.color-alpha-dark-10}'
  color-status-ghost-subtle: '{primitives.color-alpha-dark-0}'
  color-status-ghost-strong: '{primitives.color-alpha-dark-20}'
  color-status-ghost-tint: 'rgba(31,105,255,0.1)'
  color-status-neutral-default: '{primitives.color-neutral-cool-60}'
  color-status-neutral-faint: '{primitives.color-neutral-cool-10}'
  color-status-neutral-deep: '{primitives.color-neutral-cool-80}'
  color-status-neutral-subtle: '{primitives.color-neutral-cool-50}'
  color-status-neutral-strong: '{primitives.color-neutral-cool-70}'
  color-line-selection: '{primitives.color-brand-main-60}'
  color-line-focus: '{primitives.color-brand-main-50}'
  color-line-default: '{primitives.color-neutral-cool-40}'
  color-line-subtle: '{primitives.color-neutral-cool-30}'
  color-line-inverse: '{primitives.color-pure-white}'
  color-line-strong: '{primitives.color-neutral-cool-60}'
  color-line-stronger: '{primitives.color-neutral-cool-70}'
  color-line-contrast: '{primitives.color-alpha-light-0}'
  color-line-contrast-brand: '{primitives.color-alpha-light-0}'
  color-data-1: '{primitives.color-brand-main-60}'
  color-data-2: '{primitives.color-brand-alternative-60}'
  color-data-3: '{primitives.color-accent-5-60}'
  color-data-4: '{primitives.color-accent-1-60}'
  color-data-5: '{primitives.color-accent-4-80}'
  color-data-6: '{primitives.color-accent-3-60}'
  color-data-7: '{primitives.color-accent-2-40}'
  color-data-8: '{primitives.color-extend-3-60}'
  color-data-9: '{primitives.color-extend-4-60}'
  color-data-10: '{primitives.color-extend-2-60}'
  color-data-11: '{primitives.color-system-negative-50}'
  color-data-12: '{primitives.color-extend-1-50}'
  color-data-neutral: '{primitives.color-neutral-cool-50}'
  color-gradient-default-start: '{primitives.color-accent-1-60}'
  color-gradient-default-end: '{primitives.color-extend-4-60}'
  color-gradient-strong-start: '{primitives.color-accent-1-80}'
  color-gradient-strong-end: '{primitives.color-extend-4-80}'
  color-gradient-subtle-start: '{primitives.color-accent-1-50}'
  color-gradient-subtle-end: '{primitives.color-extend-4-40}'
colors-dark:  # Figma 'palette' semantic colours, dark, AA. Overrides colors
  color-brand-primary-faint: '{primitives.color-brand-main-100}'
  color-brand-primary-muted: '{primitives.color-brand-main-90}'
  color-brand-secondary-default: '{primitives.color-brand-alternative-50}'
  color-brand-secondary-faint: '{primitives.color-brand-alternative-100}'
  color-brand-secondary-subtle: '{primitives.color-brand-alternative-60}'
  color-brand-tertiary-default: '{primitives.color-accent-5-50}'
  color-brand-tertiary-faint: '{primitives.color-accent-5-100}'
  color-fill-canvas: '{primitives.color-neutral-cool-100}'
  color-fill-default: '{primitives.color-neutral-cool-90}'
  color-fill-elevated: '{primitives.color-neutral-cool-80}'
  color-fill-overlay: '{primitives.color-neutral-cool-80}'
  color-fill-inverse: '{primitives.color-neutral-cool-20}'
  color-fill-sunken: '{primitives.color-neutral-cool-80}'
  color-fill-faint: '{primitives.color-neutral-cool-90}'
  color-fill-selection: '{primitives.color-brand-main-90}'
  color-fill-hover: '{primitives.color-neutral-cool-40}'
  color-fill-inverse-sunken: '{primitives.color-neutral-cool-30}'
  color-fill-inverse-elevated: '{primitives.color-neutral-cool-10}'
  color-fill-disabled: '{primitives.color-neutral-cool-80}'
  color-fill-transparent-emphasis: '{primitives.color-alpha-light-5}'
  color-fill-transparent-elevate: '{primitives.color-alpha-light-10}'
  color-fill-transparent-obsure: '{primitives.color-alpha-light-30}'
  color-ink-high: '{primitives.color-pure-white}'
  color-ink-medium: '{primitives.color-neutral-cool-40}'
  color-ink-low: '{primitives.color-neutral-cool-50}'
  color-ink-disabled: '{primitives.color-neutral-cool-60}'
  color-ink-inverse: '{primitives.color-neutral-cool-100}'
  color-ink-link: '{primitives.color-brand-main-50}'
  color-ink-brand: '{primitives.color-brand-main-40}'
  color-ink-selection: '{primitives.color-neutral-cool-10}'
  color-status-success-faint: '{primitives.color-system-positive-100}'
  color-status-success-subtle: '{primitives.color-system-positive-70}'
  color-status-warning-default: '{primitives.color-system-warning-50}'
  color-status-warning-faint: '{primitives.color-system-warning-100}'
  color-status-warning-deep: '{primitives.color-system-warning-40}'
  color-status-warning-strong: '{primitives.color-system-warning-40}'
  color-status-warning-subtle: '{primitives.color-system-warning-70}'
  color-status-error-faint: '{primitives.color-system-negative-100}'
  color-status-info-faint: '{primitives.color-system-info-100}'
  color-status-info-subtle: '{primitives.color-system-info-60}'
  color-status-ghost-default: '{primitives.color-alpha-light-0}'
  color-status-ghost-faint: '{primitives.color-alpha-light-5}'
  color-status-ghost-deep: '{primitives.color-alpha-light-10}'
  color-status-ghost-subtle: '{primitives.color-alpha-light-0}'
  color-status-ghost-strong: '{primitives.color-alpha-light-20}'
  color-status-ghost-tint: 'rgba(141,192,255,0.1)'
  color-status-neutral-default: '{primitives.color-neutral-warm-60}'
  color-status-neutral-faint: '{primitives.color-neutral-warm-100}'
  color-status-neutral-deep: '{primitives.color-neutral-warm-30}'
  color-status-neutral-subtle: '{primitives.color-neutral-warm-60}'
  color-status-neutral-strong: '{primitives.color-neutral-warm-40}'
  color-line-selection: '{primitives.color-brand-main-50}'
  color-line-focus: '{primitives.color-brand-main-60}'
  color-line-default: '{primitives.color-neutral-cool-70}'
  color-line-subtle: '{primitives.color-neutral-cool-80}'
  color-line-inverse: '{primitives.color-pure-black}'
  color-line-strong: '{primitives.color-neutral-cool-50}'
  color-line-stronger: '{primitives.color-neutral-cool-30}'
  color-data-1: '{primitives.color-brand-main-50}'
  color-data-2: '{primitives.color-brand-alternative-50}'
  color-data-3: '{primitives.color-accent-5-50}'
  color-data-4: '{primitives.color-accent-1-40}'
  color-data-5: '{primitives.color-accent-4-50}'
  color-data-6: '{primitives.color-accent-3-50}'
  color-data-7: '{primitives.color-accent-2-70}'
  color-data-8: '{primitives.color-extend-3-50}'
  color-data-9: '{primitives.color-extend-4-50}'
  color-data-10: '{primitives.color-extend-2-40}'
  color-data-11: '{primitives.color-system-negative-60}'
  color-data-12: '{primitives.color-extend-1-60}'
  color-data-neutral: '{primitives.color-neutral-cool-60}'
  color-gradient-strong-start: '{primitives.color-accent-1-40}'
  color-gradient-strong-end: '{primitives.color-extend-4-40}'
  color-gradient-subtle-start: '{primitives.color-accent-1-70}'
  color-gradient-subtle-end: '{primitives.color-extend-4-80}'
colors-aaa:  # Figma 'palette' semantic colours, light, AAA contrast. Overrides colors
  color-brand-primary-default: '{primitives.color-brand-main-80}'
  color-brand-primary-subtle: '{primitives.color-brand-main-30}'
  color-brand-primary-strong: '{primitives.color-brand-main-90}'
  color-brand-primary-deep: '{primitives.color-brand-main-100}'
  color-brand-secondary-default: '{primitives.color-brand-alternative-90}'
  color-brand-secondary-subtle: '{primitives.color-brand-alternative-30}'
  color-brand-secondary-strong: '{primitives.color-brand-alternative-100}'
  color-brand-secondary-deep: '{primitives.color-brand-alternative-100}'
  color-brand-tertiary-default: '{primitives.color-accent-5-90}'
  color-brand-tertiary-subtle: '{primitives.color-accent-5-30}'
  color-brand-tertiary-strong: '{primitives.color-accent-5-100}'
  color-brand-tertiary-deep: '{primitives.color-accent-5-100}'
  color-fill-sunken: '{primitives.color-neutral-cool-20}'
  color-ink-medium: '{primitives.color-neutral-cool-80}'
  color-ink-low: '{primitives.color-neutral-cool-80}'
  color-ink-disabled: '{primitives.color-neutral-cool-80}'
  color-ink-link: '{primitives.color-brand-main-90}'
  color-ink-brand: '{primitives.color-brand-main-90}'
  color-status-success-default: '{primitives.color-system-positive-80}'
  color-status-success-deep: '{primitives.color-system-positive-100}'
  color-status-success-strong: '{primitives.color-system-positive-90}'
  color-status-success-subtle: '{primitives.color-system-positive-30}'
  color-status-warning-default: '{primitives.color-system-warning-80}'
  color-status-warning-deep: '{primitives.color-system-warning-100}'
  color-status-warning-strong: '{primitives.color-system-warning-90}'
  color-status-warning-subtle: '{primitives.color-system-warning-30}'
  color-status-error-default: '{primitives.color-system-negative-80}'
  color-status-error-deep: '{primitives.color-system-negative-100}'
  color-status-error-subtle: '{primitives.color-system-negative-30}'
  color-status-error-strong: '{primitives.color-system-negative-90}'
  color-status-info-default: '{primitives.color-system-info-80}'
  color-status-info-deep: '{primitives.color-system-info-100}'
  color-status-info-subtle: '{primitives.color-system-info-30}'
  color-status-info-strong: '{primitives.color-system-info-90}'
  color-status-ghost-tint: 'rgba(0,63,189,0.1)'
  color-status-neutral-default: '{primitives.color-neutral-cool-80}'
  color-status-neutral-deep: '{primitives.color-neutral-cool-100}'
  color-status-neutral-strong: '{primitives.color-neutral-cool-90}'
  color-line-selection: '{primitives.color-brand-main-80}'
  color-line-focus: '{primitives.color-brand-main-80}'
  color-line-default: '{primitives.color-neutral-cool-60}'
  color-line-subtle: '{primitives.color-neutral-cool-50}'
  color-line-strong: '{primitives.color-neutral-cool-70}'
  color-line-stronger: '{primitives.color-neutral-cool-80}'
  color-line-contrast: '{primitives.color-neutral-cool-70}'
  color-line-contrast-brand: '{primitives.color-brand-main-80}'
  color-data-1: '{primitives.color-brand-main-80}'
  color-data-2: '{primitives.color-brand-alternative-90}'
  color-data-3: '{primitives.color-accent-5-90}'
  color-data-4: '{primitives.color-accent-1-80}'
  color-data-6: '{primitives.color-accent-3-80}'
  color-data-7: '{primitives.color-accent-2-90}'
  color-data-8: '{primitives.color-extend-3-90}'
  color-data-9: '{primitives.color-extend-4-80}'
  color-data-10: '{primitives.color-extend-2-80}'
  color-data-11: '{primitives.color-system-negative-80}'
  color-data-12: '{primitives.color-extend-1-80}'
  color-data-neutral: '{primitives.color-neutral-cool-80}'
  color-gradient-default-start: '{primitives.color-accent-1-80}'
  color-gradient-default-end: '{primitives.color-accent-1-80}'
  color-gradient-strong-end: '{primitives.color-accent-1-80}'
  color-gradient-subtle-end: '{primitives.color-accent-1-50}'
colors-aaa-dark:  # Figma 'palette' semantic colours, dark, AAA contrast. Overrides colors-dark
  color-brand-primary-default: '{primitives.color-brand-main-30}'
  color-brand-primary-subtle: '{primitives.color-brand-main-90}'
  color-brand-primary-strong: '{primitives.color-brand-main-20}'
  color-brand-primary-deep: '{primitives.color-brand-main-10}'
  color-brand-primary-on: '{primitives.color-neutral-cool-100}'
  color-brand-secondary-default: '{primitives.color-brand-alternative-30}'
  color-brand-secondary-subtle: '{primitives.color-brand-alternative-90}'
  color-brand-secondary-strong: '{primitives.color-brand-alternative-20}'
  color-brand-secondary-deep: '{primitives.color-brand-alternative-10}'
  color-brand-secondary-on: '{primitives.color-neutral-cool-100}'
  color-brand-tertiary-default: '{primitives.color-accent-5-40}'
  color-brand-tertiary-subtle: '{primitives.color-accent-5-90}'
  color-brand-tertiary-strong: '{primitives.color-accent-5-30}'
  color-brand-tertiary-deep: '{primitives.color-accent-5-20}'
  color-brand-tertiary-on: '{primitives.color-neutral-cool-100}'
  color-fill-overlay: '{primitives.color-neutral-cool-90}'
  color-fill-sunken: '{primitives.color-neutral-cool-90}'
  color-ink-medium: '{primitives.color-neutral-cool-30}'
  color-ink-low: '{primitives.color-neutral-cool-40}'
  color-ink-disabled: '{primitives.color-neutral-cool-40}'
  color-ink-link: '{primitives.color-brand-main-20}'
  color-ink-brand: '{primitives.color-brand-main-20}'
  color-ink-always-white: '{primitives.color-neutral-cool-100}'
  color-status-success-default: '{primitives.color-system-positive-30}'
  color-status-success-deep: '{primitives.color-system-positive-10}'
  color-status-success-strong: '{primitives.color-system-positive-20}'
  color-status-success-subtle: '{primitives.color-system-positive-40}'
  color-status-warning-default: '{primitives.color-system-warning-30}'
  color-status-warning-deep: '{primitives.color-system-warning-10}'
  color-status-warning-strong: '{primitives.color-system-warning-20}'
  color-status-warning-subtle: '{primitives.color-system-warning-40}'
  color-status-error-default: '{primitives.color-system-negative-30}'
  color-status-error-deep: '{primitives.color-system-negative-10}'
  color-status-error-subtle: '{primitives.color-system-negative-40}'
  color-status-error-strong: '{primitives.color-system-negative-20}'
  color-status-info-default: '{primitives.color-system-info-30}'
  color-status-info-deep: '{primitives.color-system-info-10}'
  color-status-info-subtle: '{primitives.color-system-info-40}'
  color-status-info-strong: '{primitives.color-system-info-20}'
  color-status-neutral-default: '{primitives.color-neutral-warm-40}'
  color-status-neutral-deep: '{primitives.color-neutral-warm-20}'
  color-status-neutral-subtle: '{primitives.color-neutral-warm-50}'
  color-status-neutral-strong: '{primitives.color-neutral-warm-30}'
  color-line-selection: '{primitives.color-brand-main-30}'
  color-line-focus: '{primitives.color-brand-main-30}'
  color-line-default: '{primitives.color-neutral-cool-50}'
  color-line-subtle: '{primitives.color-neutral-cool-60}'
  color-line-strong: '{primitives.color-neutral-cool-40}'
  color-line-contrast: '{primitives.color-neutral-cool-40}'
  color-line-contrast-brand: '{primitives.color-brand-main-30}'
  color-data-1: '{primitives.color-brand-main-30}'
  color-data-2: '{primitives.color-brand-alternative-30}'
  color-data-3: '{primitives.color-accent-5-40}'
  color-data-4: '{primitives.color-accent-1-30}'
  color-data-5: '{primitives.color-accent-4-30}'
  color-data-6: '{primitives.color-accent-3-30}'
  color-data-7: '{primitives.color-accent-2-30}'
  color-data-8: '{primitives.color-extend-3-30}'
  color-data-9: '{primitives.color-extend-4-30}'
  color-data-10: '{primitives.color-extend-2-30}'
  color-data-11: '{primitives.color-system-negative-30}'
  color-data-12: '{primitives.color-extend-1-30}'
  color-data-neutral: '{primitives.color-neutral-cool-40}'
  color-gradient-default-start: '{primitives.color-accent-1-40}'
  color-gradient-default-end: '{primitives.color-accent-1-40}'
  color-gradient-strong-start: '{primitives.color-accent-1-30}'
  color-gradient-strong-end: '{primitives.color-accent-1-30}'
  color-gradient-subtle-end: '{primitives.color-accent-1-70}'
colors-companion:  # Companion brand, light, AA. Overrides colors
  color-brand-primary-default: '{primitives.color-accent-1-60}'
  color-brand-primary-faint: '{primitives.color-accent-1-10}'
  color-brand-primary-subtle: '{primitives.color-accent-1-50}'
  color-brand-primary-strong: '{primitives.color-accent-1-70}'
  color-brand-primary-deep: '{primitives.color-accent-1-80}'
  color-brand-primary-muted: '{primitives.color-accent-1-20}'
  color-fill-canvas: '{primitives.color-neutral-cool-10}'
  color-fill-overlay: '{primitives.color-neutral-cool-10}'
  color-fill-selection: '{primitives.color-accent-1-20}'
  color-ink-link: '{primitives.color-accent-1-60}'
  color-ink-brand: '{primitives.color-accent-1-60}'
  color-status-success-default: '{primitives.color-system-positive-70}'
  color-status-warning-default: '{primitives.color-system-warning-70}'
  color-status-error-default: '{primitives.color-system-negative-70}'
  color-status-neutral-default: '{primitives.color-neutral-cool-70}'
  color-line-selection: '{primitives.color-accent-1-60}'
  color-gradient-default-start: '{primitives.color-extend-2-60}'
  color-gradient-strong-start: '{primitives.color-extend-2-60}'
  color-gradient-strong-end: '{primitives.color-extend-4-60}'
colors-companion-dark:  # Companion brand, dark, AA. Overrides colors-dark
  color-brand-primary-default: '{primitives.color-accent-1-60}'
  color-brand-primary-faint: '{primitives.color-accent-1-100}'
  color-brand-primary-subtle: '{primitives.color-accent-1-50}'
  color-brand-primary-strong: '{primitives.color-accent-1-70}'
  color-brand-primary-deep: '{primitives.color-accent-1-80}'
  color-brand-primary-muted: '{primitives.color-accent-1-90}'
  color-fill-inverse: '{primitives.color-pure-white}'
  color-fill-selection: '{primitives.color-accent-1-90}'
  color-ink-medium: '{primitives.color-neutral-cool-50}'
  color-ink-link: '{primitives.color-accent-1-50}'
  color-ink-brand: '{primitives.color-accent-1-50}'
  color-status-success-default: '{primitives.color-system-positive-30}'
  color-status-success-faint: '{primitives.color-system-positive-90}'
  color-status-warning-default: '{primitives.color-system-warning-30}'
  color-status-warning-faint: '{primitives.color-system-warning-90}'
  color-status-error-default: '{primitives.color-system-negative-30}'
  color-status-error-faint: '{primitives.color-system-negative-90}'
  color-status-ghost-tint: 'rgba(31,105,255,0.1)'
  color-status-neutral-default: '{primitives.color-neutral-cool-30}'
  color-status-neutral-faint: '{primitives.color-neutral-cool-70}'
  color-line-selection: '{primitives.color-accent-1-60}'
  color-line-strong: '{primitives.color-neutral-cool-60}'
  color-gradient-default-start: '{primitives.color-extend-2-50}'
  color-gradient-default-end: '{primitives.color-extend-4-50}'
  color-gradient-strong-start: '{primitives.color-extend-2-50}'
  color-gradient-strong-end: '{primitives.color-extend-4-50}'
colors-companion-aaa:  # Companion brand, light, AAA contrast. Overrides colors-aaa
  color-brand-primary-default: '{primitives.color-accent-1-70}'
  color-brand-primary-faint: '{primitives.color-accent-1-10}'
  color-brand-primary-subtle: '{primitives.color-accent-1-30}'
  color-brand-primary-strong: '{primitives.color-accent-1-80}'
  color-brand-primary-deep: '{primitives.color-accent-1-90}'
  color-brand-primary-muted: '{primitives.color-accent-1-20}'
  color-fill-canvas: '{primitives.color-pure-white}'
  color-fill-overlay: '{primitives.color-neutral-cool-10}'
  color-fill-inverse: '{primitives.color-neutral-cool-100}'
  color-fill-sunken: '{primitives.color-neutral-cool-30}'
  color-fill-faint: '{primitives.color-neutral-cool-10}'
  color-fill-scrim: '{primitives.color-alpha-dark-80}'
  color-fill-selection: '{primitives.color-accent-1-20}'
  color-fill-disabled: '{primitives.color-neutral-cool-40}'
  color-ink-disabled: '{primitives.color-neutral-cool-60}'
  color-ink-link: '{primitives.color-accent-1-80}'
  color-ink-brand: '{primitives.color-accent-1-80}'
  color-status-success-default: '{primitives.color-system-positive-90}'
  color-status-warning-default: '{primitives.color-system-warning-90}'
  color-status-error-default: '{primitives.color-system-negative-90}'
  color-status-ghost-tint: 'rgba(31,105,255,0.1)'
  color-status-neutral-default: '{primitives.color-neutral-cool-90}'
  color-line-selection: '{primitives.color-accent-1-80}'
  color-line-contrast-brand: '{primitives.color-accent-1-70}'
  color-line-strong: '{primitives.color-neutral-cool-80}'
  color-gradient-default-start: '{primitives.color-extend-2-70}'
  color-gradient-default-end: '{primitives.color-extend-2-70}'
  color-gradient-strong-start: '{primitives.color-extend-2-70}'
  color-gradient-strong-end: '{primitives.color-extend-2-70}'
  color-gradient-subtle-end: '{primitives.color-accent-1-50}'
colors-companion-aaa-dark:  # Companion brand, dark, AAA contrast. Overrides colors-aaa-dark
  color-brand-primary-default: '{primitives.color-accent-1-30}'
  color-brand-primary-faint: '{primitives.color-accent-1-100}'
  color-brand-primary-subtle: '{primitives.color-accent-1-90}'
  color-brand-primary-strong: '{primitives.color-accent-1-20}'
  color-brand-primary-deep: '{primitives.color-accent-1-10}'
  color-brand-primary-muted: '{primitives.color-accent-1-90}'
  color-fill-selection: '{primitives.color-accent-1-90}'
  color-ink-link: '{primitives.color-accent-1-20}'
  color-ink-brand: '{primitives.color-accent-1-20}'
  color-status-ghost-tint: 'rgba(31,105,255,0.1)'
  color-line-selection: '{primitives.color-accent-1-30}'
  color-line-contrast-brand: '{primitives.color-accent-1-30}'
  color-gradient-default-start: '{primitives.color-extend-2-40}'
  color-gradient-strong-start: '{primitives.color-extend-2-30}'
  color-gradient-default-end: '{primitives.color-extend-2-40}'
  color-gradient-strong-end: '{primitives.color-extend-2-30}'
  color-gradient-subtle-end: '{primitives.color-accent-1-70}'
space:
  space-page: '{primitives.scale-7}'
  space-section: '{primitives.scale-11}'
  space-card: '{primitives.scale-7}'
  space-gutter: '{primitives.scale-7}'
  space-3xs: '{primitives.scale-2}'
  space-2xs: '{primitives.scale-3}'
  space-xs: '{primitives.scale-4}'
  space-sm: '{primitives.scale-5}'
  space-md: '{primitives.scale-6}'
  space-lg: '{primitives.scale-7}'
  space-lg-plus: '{primitives.scale-8}'
  space-xl: '{primitives.scale-9}'
  space-2xl: '{primitives.scale-11}'
  space-3xl: '{primitives.scale-13}'
  space-4xl: '{primitives.scale-15}'
  space-5xl: '{primitives.scale-17}'
  space-none: '{primitives.scale-0}'
  space-neg-xs: '{primitives.scale-neg-1}'
  space-neg-sm: '{primitives.scale-neg-2}'
  space-neg-md: '{primitives.scale-neg-3}'
  space-neg-lg: '{primitives.scale-neg-5}'
  space-neg-xl: '{primitives.scale-neg-6}'
control:  # control-target-min = touch minimum (patterns 6.16); -pointer-min for pointer-only products (6.18); -gloved for gloved or large-target products (6.19)
  control-target-min: '{primitives.scale-15}'
  control-xs: '{primitives.scale-9}'
  control-sm: '{primitives.scale-12}'
  control-md: '{primitives.scale-13}'
  control-lg: '{primitives.scale-15}'
  control-icon-xxs: '{primitives.scale-5}'
  control-icon-xs: '{primitives.scale-6}'
  control-icon-sm: '{primitives.scale-7}'
  control-icon-md: '{primitives.scale-8}'
  control-icon-lg: '{primitives.scale-10}'
  control-target-pointer-min: '{primitives.scale-13}'
  control-target-gloved: '{primitives.scale-16}'
radius:
  radius-none: '{primitives.scale-0}'
  radius-xs: '{primitives.scale-2}'
  radius-sm: '{primitives.scale-3}'
  radius-md: '{primitives.scale-5}'
  radius-lg: '{primitives.scale-6}'
  radius-xl: '{primitives.scale-7}'
  radius-element-sm: '{primitives.scale-3}'
  radius-element-md: '{primitives.scale-4}'
  radius-container: '{primitives.scale-6}'
  radius-pill: 9999px
stroke:
  stroke-base: '{primitives.scale-0}'
  stroke-thin: '{primitives.scale-1}'
  stroke-thick: '{primitives.scale-2}'
  stroke-heavy: '{primitives.scale-3}'
container:
  container-default: '{primitives.scale-container-3}'
  container-reading: '{primitives.scale-container-1}'
shadow:  # Figma size/shadow x, y, blur; colour is primitives color-alpha-dark-10
  shadow-xsmall: '0px 1px 1px 0 rgba(12,13,14,.1)'
  shadow-small: '0px 2px 6px 0 rgba(12,13,14,.1)'
  shadow-medium: '0px 8px 16px 0 rgba(12,13,14,.1)'
  shadow-large: '0px 20px 32px 0 rgba(12,13,14,.1)'
typography:  # Figma 'typography' text styles, IBM Plex Sans; h1=heading-large … h6=title-small, p=body-medium
  type-display-large: { fontFamily: IBM Plex Sans, fontSize: 52px, fontWeight: '300', lineHeight: 60px, letterSpacing: 0px }
  type-display-medium: { fontFamily: IBM Plex Sans, fontSize: 44px, fontWeight: '300', lineHeight: 52px, letterSpacing: 0px }
  type-display-small: { fontFamily: IBM Plex Sans, fontSize: 36px, fontWeight: '300', lineHeight: 40px, letterSpacing: 0px }
  type-heading-large: { fontFamily: IBM Plex Sans, fontSize: 32px, fontWeight: '400', lineHeight: 36px, letterSpacing: 0px }
  type-heading-large-bold: { fontFamily: IBM Plex Sans, fontSize: 32px, fontWeight: '700', lineHeight: 36px, letterSpacing: 0px }
  type-heading-medium: { fontFamily: IBM Plex Sans, fontSize: 28px, fontWeight: '400', lineHeight: 32px, letterSpacing: 0px }
  type-heading-medium-bold: { fontFamily: IBM Plex Sans, fontSize: 28px, fontWeight: '700', lineHeight: 32px, letterSpacing: 0px }
  type-heading-small: { fontFamily: IBM Plex Sans, fontSize: 24px, fontWeight: '400', lineHeight: 28px, letterSpacing: 0px }
  type-heading-small-bold: { fontFamily: IBM Plex Sans, fontSize: 24px, fontWeight: '700', lineHeight: 28px, letterSpacing: 0px }
  type-title-large: { fontFamily: IBM Plex Sans, fontSize: 20px, fontWeight: '500', lineHeight: 24px, letterSpacing: 0px }
  type-title-large-bold: { fontFamily: IBM Plex Sans, fontSize: 20px, fontWeight: '600', lineHeight: 24px, letterSpacing: 0px }
  type-title-medium: { fontFamily: IBM Plex Sans, fontSize: 16px, fontWeight: '500', lineHeight: 20px, letterSpacing: 0px }
  type-title-medium-bold: { fontFamily: IBM Plex Sans, fontSize: 16px, fontWeight: '600', lineHeight: 20px, letterSpacing: 0px }
  type-title-small: { fontFamily: IBM Plex Sans, fontSize: 12px, fontWeight: '500', lineHeight: 16px, letterSpacing: 0px }
  type-title-small-bold: { fontFamily: IBM Plex Sans, fontSize: 12px, fontWeight: '600', lineHeight: 16px, letterSpacing: 0px }
  type-body-large: { fontFamily: IBM Plex Sans, fontSize: 20px, fontWeight: '400', lineHeight: 24px, letterSpacing: 0px }
  type-body-medium: { fontFamily: IBM Plex Sans, fontSize: 16px, fontWeight: '400', lineHeight: 24px, letterSpacing: 0px }
  type-body-small: { fontFamily: IBM Plex Sans, fontSize: 14px, fontWeight: '400', lineHeight: 18px, letterSpacing: 0px }
  type-body-xsmall: { fontFamily: IBM Plex Sans, fontSize: 12px, fontWeight: '400', lineHeight: 16px, letterSpacing: 0px }
  type-indicator-medium: { fontFamily: IBM Plex Sans, fontSize: 12px, fontWeight: '500', lineHeight: 14px, letterSpacing: 0px }
  type-indicator-small: { fontFamily: IBM Plex Sans, fontSize: 10px, fontWeight: '400', lineHeight: 12px, letterSpacing: 0px }
  type-label-large: { fontFamily: IBM Plex Sans, fontSize: 16px, fontWeight: '500', lineHeight: 24px, letterSpacing: 0px }
  type-label-medium: { fontFamily: IBM Plex Sans, fontSize: 14px, fontWeight: '500', lineHeight: 20px, letterSpacing: 0px }
  type-label-small: { fontFamily: IBM Plex Sans, fontSize: 12px, fontWeight: '500', lineHeight: 16px, letterSpacing: 0px }
  type-h1: { alias: type-heading-large }
  type-h2: { alias: type-heading-medium }
  type-h3: { alias: type-heading-small }
  type-h4: { alias: type-title-large }
  type-h5: { alias: type-title-medium }
  type-h6: { alias: type-title-small }
  type-code: { fontFamily: IBM Plex Mono, fontSize: 14px, fontWeight: '400', lineHeight: 20px, letterSpacing: 0px }
font-family:
  font-family-regular: "'IBM Plex Sans', sans-serif"
  icon-family-round: zeta-icons-round
  icon-family-sharp: zeta-icons-sharp
  font-family-mono: "'IBM Plex Mono', monospace"
font-weight:
  font-weight-light: '300'
  font-weight-regular: '400'
  font-weight-medium: '500'
  font-weight-semibold: '600'
  font-weight-bold: '700'
motion:  # motion-spring / motion-smooth are the Figma animations; the durations and easings have no Figma equivalent
  motion-spring: 250ms cubic-bezier(0.34, 1.36, 0.64, 1)
  motion-smooth: 250ms ease-in-out
  motion-instant: 100ms
  motion-fast: 200ms
  motion-medium: 250ms
  motion-slow: 300ms
  motion-slower: 500ms
  motion-spin: 1.5s
  easing-standard: ease-in-out
  easing-out: ease-out
  motion-feedback: 100ms ease-out  # press, toggle, check feedback (patterns 3.120)
  easing-in: ease-in  # leaving elements accelerate (patterns 3.122)
  motion-timeout-toast: 5s  # minimum; pauses on hover/focus, extends with the device accessibility timeout
layout:
  grid-unit: 4px
  grid-columns: '12'
  grid-margin: 24px
  breakpoint-mobile-max: 1024px  # DEPRECATED: use the size-class breakpoints; removed at the next breaking release
  aspect-ratios: '1:1, 2:1, 2:3, 3:2, 4:3, 16:9'
  frame-handheld-width: 360px  # Zebra TC-series 6" handheld, 1080 × 2160 at 3×; prototype device frame
  frame-handheld-height: 720px
  frame-status-bar-height: 24px  # Android status bar; prototype device frame
  breakpoint-medium-min: 600px  # compact below, medium from here (= scale-container-1)
  breakpoint-expanded-min: 840px  # expanded from here (= scale-container-2)
  breakpoint-large-min: 1200px  # large, the widest class (= scale-container-3)
  grid-columns-compact: '4'
  grid-columns-medium: '8'
  grid-columns-expanded: '12'
opacity:
  opacity-hover-tint: '10%'
component-sizes:  # fixed component measurements Figma hard-codes and no scale-* step matches; each notes its owner
  size-assist-chip-height: 34px  # atoms/assist-chip.md
  size-avatar-badge-large: 18px  # atoms/avatar.md
  size-avatar-badge-xxsmall: 10px  # atoms/avatar.md
  size-avatar-icon-ratio: '0.5'  # atoms/avatar.md (content icon ÷ diameter)
  size-avatar-label-ratio: '0.333'  # atoms/avatar.md (initials font size ÷ diameter; label-large at medium)
  size-avatar-rail-overlap-ratio: '0.25'  # molecules/avatar-rail.md (overlap ÷ diameter)
  size-avatar-status-icon-ratio: '0.6'  # atoms/avatar.md (status and close glyph ÷ badge)
  size-avatar-xxlarge: 120px  # atoms/avatar.md
  size-avatar-xxxlarge: 200px  # atoms/avatar.md
  size-bottom-sheet-grid-item-width: 92px  # organisms/bottom-sheet.md
  size-bottom-sheet-width: 360px  # organisms/bottom-sheet.md
  size-chat-message-max-width: 85%  # organisms/chat.md
  size-date-picker-field-width: 192px  # organisms/date-picker.md
  size-dialog-width: 480px  # organisms/dialog.md
  size-empty-state-max-width: 375px  # molecules/empty-state.md
  size-fab-large: 76px  # atoms/fab.md
  size-global-header-search-max-width: 280px  # organisms/global-header.md
  size-input-width: 280px  # molecules/input.md
  size-lightbox-media-max-height: 70vh  # organisms/lightbox.md
  size-lightbox-paging-transition: 400ms cubic-bezier(0.33, 1, 0.68, 1)  # organisms/lightbox.md (paging slide + stage height; no motion token matches)
  size-lightbox-stage-min-height: 288px  # organisms/lightbox.md (control-lg × 6)
  size-lightbox-width: 768px  # organisms/lightbox.md (control-lg × 16)
  size-message-input-orb: 152px  # molecules/message-input.md (derived: 276 speaking height − padding, gaps, caption and Stop speaking)
  size-message-input-width: 440px  # molecules/message-input.md
  size-navigation-bar-item-height: 72px  # organisms/navigation-bar.md
  size-navigation-drawer-width: 320px  # organisms/navigation-drawer.md
  size-navigation-rail-width-expanded: 200px  # organisms/navigation-rail.md
  size-progress-bar-details-gap: 10px  # atoms/progress-bar.md
  size-progress-bar-indeterminate-width: 35%  # atoms/progress-bar.md
  size-right-drawer-panel-max-width: 380px  # organisms/right-drawer-panel.md
  size-right-drawer-panel-width: 40%  # organisms/right-drawer-panel.md
  size-search-width: 280px  # molecules/search.md
  size-stepper-input-field-width: 72px  # molecules/stepper-input.md
  size-table-content-max-height: 351px  # organisms/table.md
---

## 1. Visual Theme & Atmosphere

> **Token rule:** every value in this document is a token reference written as `--<key>`. Raw values live only in the frontmatter above. To read a value, look up `<key>` in the relevant group (`colors`, `space`, `control`, `radius`, `stroke`, `container`, `shadow`, `typography`, `font-weight`, `motion`, `layout`, `opacity`). Other theme modes override some of those keys, under the same names (§3 Theme modes). Component tokens (e.g. `--dialog-content-width`) are defined in the `tokens:` block of their component file. See §2 Token Architecture.

The Zebra Design System is an **enterprise utility language**. It is calm, precise and built for frontline workers who scan screens quickly, often on rugged handheld devices, with gloves on or in bad light. Components sit on pure white (`--color-fill-default`) over a faintly blue-tinted cool-grey canvas (`--color-fill-canvas`). Ink is a near-black graphite (`--color-ink-high`), never pure black. A single confident **Zebra Blue** (`--color-brand-primary-default`) carries every primary action and selection. Colour is spent "sparingly … as a means to employ meaning and discretion". Most screens are monochrome greys plus one blue, and red, green, amber and the secondary orange appear only when they mean something.

The geometry is strict and quiet. Everything snaps to the 4px-based size scale. Every component is rounded by default, with the radius set by its role (§5 Shape): controls take `--radius-element-sm`, containers `--radius-element-md` and large surfaces `--radius-container`; each can switch to fully sharp (`--radius-none`) or, where offered, to full pills (`--radius-pill`). The AAA modes are always sharp. Depth is low: hairline strokes (`--stroke-thin`) and soft cool shadows (`--shadow-xsmall` … `--shadow-large`) only on overlays and dragged items. Type is **IBM Plex Sans** (`--font-family-regular`), a humanist-grotesque with an engineered feel. Display sizes use the light weight and are kept for splash and welcome screens, headings use regular, and all UI labels and titles use medium. The overall impression is *trustworthy industrial software*: dense enough for data, generous enough for touch, and accessible in every theme mode (light, dark, AAA light, AAA dark, and Companion in each of those four).

**Key characteristics**
- Cool-neutral greys with a single saturated blue accent; a gradient (`--color-gradient-default-start` → `--color-gradient-default-end`) reserved for AI
- A 4px-based size scale for spacing, control heights, radii and strokes
- Rounded is the default shape for every component, with sharp / rounded / full switching; AAA modes are always sharp
- Hairline strokes over shadows; shadows appear only on overlays and dragged items
- Status colour is always paired with an icon and text ([patterns 6.11](patterns/06-accessibility.md))
- Components are theme-agnostic: they only reference semantic tokens, so dark and AAA modes come for free

**Behaviour lives in [`patterns/`](patterns/README.md).** This file says how Zebra looks. How screens are composed and behave (layout, navigation, controls, states, sizes, accessibility, copy, AI and data) is in the pattern files, which are binding like this file. Before building, read the pattern files the task touches (the routing table in [patterns/README.md](patterns/README.md)). Rules are cited as `patterns 6.11`, linked to their file.

---

## 2. Token Architecture

Zebra Design System tokens form three layers that mirror the Figma variable collections. Each layer may only reference the layer directly beneath it.

| Layer | Lives in | Holds | Example |
|---|---|---|---|
| **1. Primitives** | frontmatter `primitives` (Figma *primitives*) | Raw colour ramps (`color-brand-main-10` … `-100`, neutrals, system, accent, extend, alpha) and the size scale (`scale-0` … `scale-21`, `scale-neg-*`, `scale-container-*`) | `--color-brand-main-70` |
| **2. Semantic** | frontmatter `colors` (+ the theme-mode overrides `colors-dark`, `colors-aaa`, `colors-aaa-dark`, `colors-companion`, `colors-companion-dark`, `colors-companion-aaa`, `colors-companion-aaa-dark`; Figma *palette*), `space`, `control`, `radius`, `stroke`, `container`, `shadow` (Figma *size*), `typography` (Figma *typography*), `font-family`, `font-weight`, `motion`, `layout`, `opacity`, `component-sizes` | Purpose-named decisions shared by the whole system. `component-sizes` holds the few fixed component measurements no scale step matches (`size-…`). | `--color-brand-primary-strong` |
| **3. Component** | `tokens:` block in each `atoms/`, `molecules/` and `organisms/` file | Each component's own named decisions. They are references only, never raw values. | `--button-primary-container-background-hover` |

Every semantic key carries its layer prefix (`color-`, `space-`, `control-`, `radius-`, `stroke-`, `shadow-`, `type-`, `motion-`, `size-`), so a semantic CSS name never collides with a component token.

### Reference syntax
A component token's value is a single reference to a semantic key, written `'{group.key}'`:
- `button-primary-container-background-hover: '{colors.color-brand-primary-strong}'`
- `button-container-padding-x-medium: '{space.space-md}'`
- `button-label-font-medium: '{typography.type-label-large}'`
- `button-container-height-medium: '{control.control-md}'`

Component tokens never reference `roles`, a theme-mode group (`colors-dark`, `colors-aaa`, …) or colour primitives. The one primitive they may use is a `scale-*` step, and only for a fixed measurement that matches it exactly (e.g. `'{primitives.scale-9}'` for a 24px avatar). `scripts/tokens-css.py` enforces all of this and fails on an undefined reference.

**Composition (reuse, not restatement):** a component may also reference the tokens of components listed in its `composes`, written `'{child.token}'` (e.g. `button-icon-size-small: '{icon.icon-size-small}'`). A composite never restates a child's styling. It says which child, variant and size it uses ("[Icon Button](atoms/icon-button.md), subtle, medium"), and the child's own tokens govern its colours, states and radius. The composite defines its own tokens only for:
- **its own parts:** container, layout, gap, dividers, header;
- **context overrides:** a decision that deliberately differs from the child in this context. These point at a semantic key or at another child token.

References may chain (organism → molecule → atom), but every chain must end at a semantic token. Components may only reference children they compose, never siblings.

### Naming
`<component>-[<variant>-]<part>-<property>[-<state>|-<size>]`. The prefix is always the component's file name.
- **Parts:** `container`, `label`, `icon`, `track`, `thumb`, `indicator`, `divider`, `focus-ring`, …
- **Properties:** `background`, `foreground`, `border-color`, `border-width`, `outline-color`, `outline-width`, `radius`, `padding-x`, `padding-y`, `margin`, `gap`, `offset`, `inset`, `travel`, `height`, `width`, `size`, `min-height`, `min-width`, `max-height`, `max-width`, `font`, `font-weight`, `line-height`, `opacity`, `scale`, `shadow`, `transition`, `duration`, `easing`; gradients split into `-start` / `-end`
- **States:** `enabled` (Figma *default*), `hover`, `pressed`, `focused`, `disabled`, `selected`, `error`. Component-specific states: `on` / `off` (switch), `open`, `filled` (has a value), `active`, `typing`, `read-only`.
- **Names describe use, never a colour:** category, then property, then role, then state (`color-line-focus`, not `color-blue`). Two names break this and are renamed at the next breaking release: `--color-ink-always-white` / `--color-ink-always-blank`, and the `ghost` status family, which holds button tints rather than a status.

### Rules
- **Strict layering:** a component file's text and tables cite only its own component tokens and those of the components it composes. They never cite semantic tokens directly. This document's prose cites semantic tokens, plus a component's tokens where it describes that component.
- **Changes propagate:** restyling an atom (e.g. the icon button's hover) automatically restyles every molecule and organism that composes it, unless that composite has a deliberate context override.
- **Theming flows through:** a theme mode only overrides `colors` keys, never adds new ones, so every mode re-themes every component automatically.
- **Re-theming one component** means pointing its component token at a different semantic key. Nothing else changes.
- **Roles keep their meaning:** a theme or product changes values, never a role's name or meaning. `--color-status-error-*` stays error and `--color-brand-primary-*` stays action, whatever their values. A product theme overrides the default's values; it never forks the palette (§3 Theme modes).
- **No colour is set directly** anywhere a theme must reach. That is how dark and AAA modes break (§9).
- **Platforms share the names:** a platform (web, Flutter, Android) may adapt values such as size and density, but uses the same token names.

### Worked example: primary button hover
`--color-brand-main-70` (primitive) → `--color-brand-primary-strong` (semantic, `colors`) → `--button-primary-container-background-hover` (component, `atoms/button.md`).
`colors-dark` doesn't override `color-brand-primary-strong`, so dark mode resolves the same chain. `colors-companion` does, pointing it at `--color-accent-1-70`, so under `[data-brand="companion"]` the hover turns purple.

---

## 3. Color Palette & Roles

The Zebra Design System uses a **two-tier colour model**, taken from the Figma *primitives* and *palette* collections:
1. **Primitives** (frontmatter `primitives`, `color-*`): ramps of 10 steps (10 lightest → 100 darkest) for the cool and warm neutrals, the brand main (blue) and alternative (orange), the four system hues (positive, negative, warning, info), five accents and four extended hues, plus `color-pure-white` / `-black` and the `color-alpha-dark-*` / `color-alpha-light-*` transparencies. Primitives are never used by components.
2. **Palette** (frontmatter `colors`): role tokens that point at primitive steps, in seven families. Theme modes override some of these keys (see Theme modes below).

**Choosing a colour**
- **By role, never by look.** Every colour names its purpose (surface, text, border, action, selected, focus or a status), and the token is chosen because its role matches. A colour picked because it looks right breaks in the other modes.
- **Colours come in pairs.** Text and icons on a coloured fill use that fill's partner: `--color-brand-primary-on` on brand primary, success and error fills, `--color-ink-inverse` on `--color-fill-inverse`, the `--color-ink-*` roles on neutral fills. A fill token is never used for text.
- **Mostly neutral.** Neutrals carry backgrounds, surfaces, default text and secondary controls, which is what makes coloured things stand out.
- **One action colour.** `--color-brand-primary-*` marks the primary action, links, interactive accents and the selected marker, so saturated colour on controls and text means "can be acted on" or "needs attention". The only other colour is labelling accents (avatars, categories), illustration and the AI gradient. Brand secondary and tertiary are accents of that kind, never a second action colour.
- **One meaning everywhere.** The brand primary doesn't appear on text that can't be acted on, except the selected or current marker. A status colour never decorates.
- **Labelling accents are interchangeable.** Swapping one avatar or category colour for another changes nothing, and they never stand in for a status.

### Brand — `--color-brand-<primary|secondary|tertiary>-<step>`
| Step | Primary (Zebra Blue) | Role |
|---|---|---|
| `default` | `--color-brand-primary-default` | Primary buttons, links, checked controls, selection |
| `strong` / `deep` | `--color-brand-primary-strong` / `--color-brand-primary-deep` | Hover / pressed on primary fills |
| `subtle` | `--color-brand-primary-subtle` | Soft brand accents |
| `muted` / `faint` | `--color-brand-primary-muted` / `--color-brand-primary-faint` | Tinted brand containers |
| `on` | `--color-brand-primary-on` | Text and icons on primary, positive and destructive fills |

Secondary (orange, `--color-brand-secondary-*`) and tertiary (`--color-brand-tertiary-*`) follow the same steps (without `muted`).

### Fill — surfaces
| Token | Role |
|---|---|
| `--color-fill-canvas` | App / page base |
| `--color-fill-default` | Component and card background |
| `--color-fill-elevated` / `--color-fill-overlay` | Raised surfaces / popover and modal panels |
| `--color-fill-faint` / `--color-fill-sunken` | Neutral hover / pressed, recessed wells and tracks |
| `--color-fill-selection` | Selected item background |
| `--color-fill-disabled` | Disabled fills |
| `--color-fill-inverse` (+ `-sunken`, `-elevated`) | Inverse surfaces: tooltips, contrast buttons, standard snackbars |
| `--color-fill-scrim` | Modal barrier |
| `--color-fill-transparent`, `--color-fill-transparent-emphasis` / `-elevate` / `-obsure` | Transparent and see-through tints |

- **Surfaces form a ladder:** the page on `--color-fill-canvas`, cards and panels on `--color-fill-default`, and what floats on `--color-fill-elevated` / `--color-fill-overlay`. Overlapping containers use different steps. Zebra products are used in bright light and on rugged screens, so surfaces that must be told apart also keep a `--stroke-thin` hairline, rather than relying on tone alone.
- **Inverse surfaces** (the opposite tone to the mode) are for passing overlays (tooltips, snackbars) and the contrast flavour. They never spotlight one item.

### Ink — text and icons
| Token | Role |
|---|---|
| `--color-ink-high` / `--color-ink-medium` | High and medium emphasis text and icons; `--color-ink-medium` is also placeholder text |
| `--color-ink-low` | Decorative icons and non-text marks only. **Never text:** it is below 4.5:1 on light surfaces ([patterns 6.1](patterns/06-accessibility.md)) |
| `--color-ink-disabled` | Disabled text and icons |
| `--color-ink-inverse` | Text on inverse surfaces |
| `--color-ink-link` / `--color-ink-brand` | Text links (underlined in running text, [patterns 6.13](patterns/06-accessibility.md)) / ghost-button text and input cursors |
| `--color-ink-selection` | Text inside a selection |
| `--color-ink-always-white` / `--color-ink-always-blank` | White / near-black that never change with mode |

### Line — borders
| Token | Role |
|---|---|
| `--color-line-default` | Card borders, outline-subtle buttons. Never the only boundary of a control (about 1.5:1 on white) |
| `--color-line-subtle` | Dividers, list separators, disabled outlines |
| `--color-line-strong` / `--color-line-stronger` | Field outlines and the edges of controls / hovered and pressed outlines |
| `--color-line-contrast` | A border only the high-contrast (AAA) modes draw: transparent in every other mode |
| `--color-line-contrast-brand` | The brand-primary border only the high-contrast (AAA) modes draw, at the component's normal width (e.g. a ghost field's outline): transparent in every other mode. Theme modes change colours, never widths |
| `--color-line-selection` | Borders and marks of selected items |
| `--color-line-focus` | **Focus ring** (`--stroke-thick`, solid) |
| `--color-line-inverse` | Borders on inverse surfaces |

- **The edge of something interactive is stronger than a divider.** A field's outline is a real boundary (`--color-line-strong`); a divider is lighter and never defines a target.
- **Focus has its own colour,** `--color-line-focus`, used for nothing else. Selection has its own roles (`--color-fill-selection`, `--color-line-selection`) plus a mark that isn't colour (§5 States), and never uses the focus, link or action colour on its own.

### Status — `--color-status-<family>-<step>`
Every status has the steps `faint` (tinted container), `subtle`, `default` (text, borders, bold banners), `strong` and `deep` (emphasis, hover / pressed). The severities are **success, warning, error and info**, plus **neutral**; every component that expresses severity uses these names.
| Family | Character | Means |
|---|---|---|
| `success` | Evergreen | Done, with nothing to do. Also the positive button flavour |
| `warning` | Amber Ochre | Needs attention, but isn't blocked. There is one warning level |
| `error` | Alarm Red | Blocked or failed. Also the negative (destructive) button flavour |
| `info` | Electric Blue | Helpful and not urgent |
| `neutral` | Graphite | Draft, not started, inactive |
| `ghost` | Transparent tints | Ghost buttons: `default` at rest, `faint` on hover, `deep` when pressed, `tint` when selected (a button tint, not a status; see §2 Naming) |

- **Never colour alone:** a status always comes with its icon and a word ([patterns 6.11](patterns/06-accessibility.md)). Each severity has one glyph everywhere ([Icon](atoms/icon.md)); neutral uses `lightbulb`.
- **A group shows its most severe member's colour** (a list header, a summary, a navigation badge).
- **Statuses stay fixed when the brand changes.** No theme mode re-colours success, warning, error or info; a mode may move a status to another step of its own hue to keep contrast.
- **Priority is not status.** Priority (urgent, high, normal, low) is its own scale, shown by position, a word, an index and an icon. [Priority Pill](atoms/priority-pill.md) uses neutral fills and never borrows status colours.

### Data and gradient
- **Data:** `--color-data-1` … `--color-data-12` plus `--color-data-neutral`, for chart series and avatar swatches. Never use them for text, because they may not meet contrast. `--color-data-1` (the brand blue) and `--color-data-11` (the error red family) are left out of categorical use, so a series never reads as an action or an error. Chart rules: [patterns 10](patterns/10-data-display.md) and [Chart](organisms/chart.md).
- **Gradient:** `--color-gradient-<default|strong|subtle>-<start|end>`, the purple-to-blue AI gradient, carried by the gradient flavours (gradient and text-gradient buttons and icon buttons, gradient fields, the gradient card).
  - **It marks AI and nothing else:** an AI assistant, content AI produced, chose or ranked, or an action that runs AI ([patterns 9.8](patterns/09-ai.md)). It is never decoration, never a "new" signal and never for promotion or emphasis. Long-established recognition (barcode decoding, spell check, speech-to-text) isn't marked.
  - **Never the only marker.** The AI marker is always the `ai_stars` icon and a word, opening an explanation ([AI Mark](atoms/ai-mark.md)). The gradient may reinforce it; in the AAA modes it is a solid colour.
  - **An AI action ranks like any action** ([patterns 9.3](patterns/09-ai.md)): it takes the gradient flavour as the primary only when AI is the screen's main purpose, and is otherwise secondary with the AI mark.
  - **A variant, not a different component.** A gradient component behaves like its normal flavour. Once a person changes AI-produced content, it returns to the normal style, keeping a way back to the AI version.
  - **The AI gradient is its own role.** It never shows data, and it keeps the contrast floors wherever text or a boundary sits on it.

### Theme modes
`colors` is the only full palette. **Every theme mode lists only its overrides:** the keys whose value differs from its base, never a key `colors` lacks. Light modes override `colors` and dark modes override `colors-dark`; each group's frontmatter comment names its base. A key a mode doesn't list keeps its base's value, and `scripts/tokens-css.py` merges each mode onto its base. To change a mode, add, change or remove an override; never copy the base's keys into it. A mode changes values, never roles: every role has a value in every mode, so components switch without changes.

| Mode | Group | Overrides | Switched on by |
|---|---|---|---|
| Light (default) | `colors` | (full set) | nothing, or `[data-theme="light"]` inside a dark area |
| Dark | `colors-dark` | `colors` | `[data-theme="dark"]` |
| AAA (high contrast) | `colors-aaa` | `colors` | `[data-contrast="aaa"]`, set from `prefers-contrast: more` and from an in-product setting |
| AAA dark | `colors-aaa-dark` | `colors-dark` | both |
| Companion | `colors-companion` | `colors` | `[data-brand="companion"]` |
| Companion dark | `colors-companion-dark` | `colors-dark` | `[data-brand="companion"]` with `[data-theme="dark"]` |
| Companion AAA | `colors-companion-aaa` | `colors-aaa` | `[data-brand="companion"]` with `[data-contrast="aaa"]` |
| Companion AAA dark | `colors-companion-aaa-dark` | `colors-aaa-dark` | all three |

- **Choosing a mode:** light is the default for reading and working, and dark is a full mode, not an afterthought. Products used in low light (in-cab, night shift) default to dark and never dazzle a driver. A product follows the device's appearance setting by default; products on shared or managed devices also offer an in-product choice, so one worker's need doesn't depend on the device's setting.
- **Dark** (`colors-dark`, `[data-theme="dark"]`): re-tuned for dark, not inverted. Fills become near-black graphite rather than pure black, ink becomes near-white, saturated colours soften, and brand and status steps move lighter so they keep their contrast. **Nearer surfaces are lighter:** `--color-fill-canvas` is the darkest, `--color-fill-default` (cards) is lighter and `--color-fill-elevated` lighter still, because shadows are hard to see on dark. Shadows stay, but nothing relies on them. Large surfaces stay dark, and the brand colour sits only on a few key elements. Images and icons get dark versions where the light one fails; true content (photos, label previews, documents, customer logos) is never altered ([patterns 8.102](patterns/08-visual-theming.md)).
- **AAA** (`colors-aaa`, `[data-contrast="aaa"]`) and **AAA dark** (`colors-aaa-dark`, both attributes) are Zebra's **high-contrast** modes, their own modes rather than dark mode ([patterns 6.9](patterns/06-accessibility.md)). The palette shifts to stronger steps so text, borders and fills meet WCAG AAA contrast; gradients become solid; decoration goes; borders appear wherever two surfaces of the same tone meet, and every edge that matters is a real line; and every component turns **sharp** (see §5 Shape). Turn them on from `prefers-contrast: more` and from an in-product setting. Theme modes change colours, never widths: a border that only high contrast needs (a plain Label, a Notification Indicator, a Notification Item) is drawn at `--stroke-thin` in `--color-line-contrast`, which is transparent outside the AAA modes and a visible line inside them.
- **Companion** (`[data-brand="companion"]`, in all four of light, dark, AAA and AAA dark): the brand primary turns purple (`--color-accent-1-*`), along with the selection fill and line and the link and brand ink. The AI gradient shifts to magenta-to-blue (`--color-extend-2-*` → `--color-extend-4-*`). Some surfaces, ink and status steps shift too; each `colors-companion*` group in the frontmatter lists exactly which. Companion never re-colours a status's hue or the focus ring. Everything else keeps its base mode's value. Companion AAA is sharp like every AAA mode. Like `data-theme`, `data-brand` works on `<html>` or on any container.
- **Theme and mode are independent.** Every mode exists for every theme (Companion has all four), high contrast is always offered, and each combination is checked on its own. A single-mode product, such as a monochrome printer panel, has only that mode.

---

## 4. Typography Rules

**Typeface:** IBM Plex Sans (`--font-family-regular`), "clean, distinctive and designed for digital world use cases", free and multilingual for localisation. **Monospace:** IBM Plex Mono (`--font-family-mono`), only through `--type-code`. **Icon fonts:** `--icon-family-round` (default) and `--icon-family-sharp` (used when a component is `sharp`).

### Hierarchy & Weights
| Role | Tokens | Weight | HTML default | Use |
|---|---|---|---|---|
| Display | `--type-display-large` · `--type-display-medium` · `--type-display-small` | `--font-weight-light` | n/a | Splash and welcome screens only; never in a working screen |
| Heading | `--type-heading-large` · `--type-heading-medium` · `--type-heading-small` | `--font-weight-regular` | h1 / h2 / h3 | Page and section titles; a single key metric |
| Title | `--type-title-large` · `--type-title-medium` · `--type-title-small` | `--font-weight-medium` | h4 / h5 / h6 | Card, dialog and list headers |
| Body | `--type-body-large` · `--type-body-medium` · `--type-body-small` · `--type-body-xsmall` | `--font-weight-regular` | p = `--type-body-medium` | Reading text, descriptions, hints |
| Label | `--type-label-large` · `--type-label-medium` · `--type-label-small` | `--font-weight-medium` | n/a | Buttons, chips, tabs, field labels |
| Indicator | `--type-indicator-medium` · `--type-indicator-small` | medium · regular | n/a | Notification counts in indicators |
| Code | `--type-code` | `--font-weight-regular` | code | Codes and identifiers: serial numbers, IDs, network addresses, barcode data, printer command code |
| Bold | `--type-heading-<size>-bold` · `--type-title-<size>-bold` | `--font-weight-bold` (headings) · `--font-weight-semibold` (titles) | n/a | A heavier heading or title where the design calls for one; same size and line height as the base style |

`--type-h1` … `--type-h6` alias heading-large … title-small. These styles are the whole set: no size is used outside it, and working screens use only this product scale (no larger marketing scale).

### Choosing a style
Choose a style by the text's role, not by how big it should feel.

| Role | Token |
|---|---|
| Page title on desktop | `--type-heading-large` |
| Screen title on handheld, or a page section on desktop | `--type-heading-small` |
| Section or card-group title | `--type-title-large` |
| Card or list-item title | `--type-title-medium` |
| A single key metric (a dashboard figure, a count) | `--type-heading-large` or `--type-heading-medium`, regular weight; never a display style |
| Body text | `--type-body-medium` |
| Supporting text, descriptions, helper text | `--type-body-small` |
| Metadata, timestamps, captions | `--type-body-xsmall` |
| Codes and identifiers shown as code | `--type-code` (it keeps 0 and O, and 1, l and I, clearly apart) |
| Text inside controls | the component's own `--type-label-*`; never restyle it |

- **Few styles:** at most four text styles on one screen; three is better.
- **One heading-level style per screen.** If two things both look like the title, one of them is wrong.
- **Headings mark sections,** in order, never bold body text.
- **The biggest styles are for short text and numbers** only.
- **Floor:** text the person must read to finish the task is 14px or larger on every device. 12px is for metadata only.
- **Weight comes from the token.** Don't add weight to a style; use its `-bold` variant. Use either a role's base style or its bold variant across a screen, not both.
- **Line length:** running text holds 45 to 75 characters a line; cap its column at `--container-reading`.
- **Line spacing comes from the token:** large styles are set tighter and body and label text looser. Don't override it; three or more lines are never set tight.
- **Numbers compared in columns** (tables, metrics, timers) use figures of equal width: CSS `font-variant-numeric: tabular-nums` (there is no token for it).
- **Text follows the person's text-size setting,** and the hierarchy holds as it grows: no height is fixed around text ([patterns 5.37](patterns/05-sizes-devices.md)).
- **Every script the product ships in** uses a face designed for it (the IBM Plex family covers the main scripts), with taller line spacing for tall scripts (Thai, Devanagari, Arabic). Italics, all caps and synthetic bold aren't relied on where a script has none.

### Spacing Principles
- **One scale:** sizes and line-heights follow the 4px-based scale. `--type-body-small` and `--type-label-medium` are documented exceptions that break the grid rhythm.
- **One clear step per level:** move between levels of hierarchy by changing one property clearly: a weight step (regular to medium, or a style to its `-bold` variant), a full type step, or a colour role (`--color-ink-high` to `--color-ink-medium`). Never a 1–2px size change. Weight and size trade off: a larger regular style can outrank a smaller bold one.
- **Few weights:** regular for reading, medium for labels, titles and emphasis; semibold and bold appear only in the `-bold` variants and are rare. Light appears only at display sizes, on splash and welcome screens; no light or thin text in working screens.
- **De-emphasis** uses `--color-ink-medium`. `--color-ink-low` is never used for text.
- **Emphasis without caps:** emphasis comes from weight, size or colour, never all caps. Acronyms, unit codes and product identifiers keep their own case. Italics are kept for titles, terms and captions.
- **Letter-spacing:** every style uses the default tracking (0); there is no uppercase-tracked eyebrow style.
- **Principles:** optimise for readability, create visual harmony, and contextualise for different users and operating systems.

---

## 5. Component Stylings

Shared mechanics that apply to every component below:
- **Shape:** sharp (`--radius-none`), rounded and, for buttons, chips and fields, full (`--radius-pill`). **Rounded is the default for every component**, and its radius is set by role, the same role always taking the same radius:

  | Role | Examples | Radius |
  |---|---|---|
  | Small detail | badges, checkboxes | `--radius-xs` |
  | Control | buttons, fields, navigation items | `--radius-element-sm` |
  | Container | cards, menus, popovers, floating panels | `--radius-element-md` |
  | Large surface | dialogs, sheets, drawers | `--radius-container` |
  | Person | avatars | `--radius-pill` |

  - Nested corners are concentric: an inner corner is the outer corner minus the padding between them. A focus ring's radius is its control's radius plus the ring's offset.
  - An edge that reaches the screen edge isn't rounded (a bottom sheet rounds only its top corners; a drawer or side panel only the corners away from the screen edge; a [Global Header](organisms/global-header.md) that spans the full width is sharp, rounded only when it floats inset with a margin). The parts of one control (a split button, a segmented control) share one outer shape, with no gaps.
  - Dense, information-heavy containers are only modestly rounded; stroke weight grows with the element's size.
  - On native mobile, system UI (system dialogs, pickers, the keyboard) keeps the platform's shapes; Zebra components keep these. Sharp components use sharp icons.
- **AAA is sharp:** under `[data-contrast="aaa"]` every component renders sharp, whatever its Shape setting, and its icons switch to the sharp set. `scripts/tokens-css.py` does this centrally (tokens.css block 8): every shape-variant radius token (`*-radius-rounded`, `*-radius-round`, `*-radius-full`) and every plain corner radius resolves to `--radius-none`. **Meaningful circles stay round**: a radio ring, switch track, avatar, indicator and stepper dots, the scrollbar handle. They reference `--radius-pill` under a non-shape token name, so a component that needs a true circle names its token `<component>-<part>-radius` and points it at `radius-pill`.
- **Flavours:** primary, positive, negative, contrast, gradient, outline, outline-subtle, outline-contrast, text, text-gradient and subtle (see [Button](atoms/button.md)).
  - Filled flavours step their own fill: `default` → `strong` on hover → `deep` on press, with `--color-brand-primary-on` text.
  - Outline flavours keep their stroke and shift a neutral fill underneath (`--color-fill-faint` / `--color-fill-sunken`). Ghost flavours raise a transparent tint (`--color-status-ghost-faint` / `--color-status-ghost-deep`).
  - Positive and negative are action styles, not severities. Negative marks **every** destructive action: a reversible one acts at once and offers Undo, an irreversible one asks to confirm.
- **States:** derived from the resting colour by the one fixed relationship above, never chosen per component, so the same state looks the same everywhere. Hover is the smallest change and pressed a stronger one.
  - Hover and pressed are temporary and sit on top of selected: something selected and hovered still reads as selected, and selected and focused keeps both.
  - **Selection is shown by shape too,** never colour alone: a check, a `--stroke-thick` `--color-line-selection` underline or border, a filled icon or a change of shape ([patterns 6.3](patterns/06-accessibility.md)).
  - An icon button shows its state on a background behind the icon, not by recolouring the icon.
  - No state lowers a control's contrast with its surroundings, or the contrast of its focus or selection.
- **Focus:** a `--stroke-thick` solid ring in `--color-line-focus`, drawn outside the control, one step out and following its shape ([patterns 6.23](patterns/06-accessibility.md)). The control's own colour doesn't change, and only one thing on a screen has focus.
- **Disabled:** `--color-fill-disabled` fill (or transparent for ghost flavours), `--color-ink-disabled` text, no elevation, no hover response and a not-allowed cursor. It still looks like the control it is.
  - Only actions, choices and inputs can be disabled; containers never are. An unavailable floating action button is removed, not greyed. Steps not yet reachable and features locked by licence or permission show as locked, with the reason.
  - A control whose existence or reason matters stays focusable (`aria-disabled`) with its reason visible beside it. Dimming is allowed as the state when it is announced and the reason is shown ([patterns 6.11](patterns/06-accessibility.md)). Submit and Next stay enabled and check the form when pressed ([patterns 4.43](patterns/04-states-feedback.md)).
- **Forced colours:** nothing important disappears ([patterns 6.10](patterns/06-accessibility.md)). Floating layers (menus, popovers, tooltips, dialogs, sheets, drawers, snackbars) carry a transparent `--stroke-thin` border, so their edge shows when shadows are dropped. A state shown only by a tint also changes a border, weight, icon or text.
- **Sizes:** most controls ship small, medium (default) and large, at the control heights `--control-sm`, `--control-md` and `--control-lg`. Icons inside controls use `--control-icon-sm` at small and `--control-icon-md` otherwise. **Every control and row height is a minimum:** product copy (titles, navigation labels, menu items, buttons, chips) wraps and the control grows ([patterns 5.37](patterns/05-sizes-devices.md)). Only user or data content may truncate, file names and IDs in the middle, with the full text on hover and focus.
- **Elevation:** a few levels, each tied to a kind of surface: sunken (`--color-fill-sunken`, a well for grouping), default (the page and its cards, flat), raised (an item being dragged) and overlay (menus, popovers, dialogs, sheets, drawers, floating bars).
  - Most surfaces are flat: tone and Zebra's hairlines separate layers, and shadow is the exception (space first, then a divider, then a container; §6).
  - Shadow size means distance: `--shadow-xsmall` and `--shadow-small` are close, `--shadow-medium` and `--shadow-large` far. Light comes from one direction (above) across the whole product.
  - Shadows appear only on overlays, on an item being dragged (it rises to the overlay level and returns when dropped) and to protect elements over busy content such as a camera view. Hover never lifts anything.
  - A modal sits over `--color-fill-scrim` ([Scrim](atoms/scrim.md)), one fixed role.
  - Content scrolled under a pinned header or footer is shown by a `--color-line-subtle` border; a shadow only where a border wouldn't be noticed. Coloured surfaces (brand and status fills) take no neutral shadow.
  - Controls and navigation form a layer above content. A translucent or glass treatment, where the platform uses one, stays in that layer and never appears in content.
- **Icons:** one style, sized to the text beside it, outlined for available and filled for selected; see [Icon](atoms/icon.md).
- **Motion:** short and functional, with two registers. Quick, quiet motion is the default; fuller motion (`--motion-slow`) is kept for rare, significant moments, and `--motion-slower` only for motion nobody triggered. There is no decorative animation.
  - **Feedback** on a control (press, toggle, check) uses `--motion-feedback`. Larger colour changes use `--motion-smooth`; springy movement uses `--motion-spring` (the switch thumb keeps its spring).
  - **Easing:** entering elements slow into place with `--easing-out`, leaving elements speed up out with `--easing-in`, and elements that stay or will return use `--easing-standard`. Constant motion is only for things that run at a constant rate, such as a spinner (`--motion-spin`).
  - **Duration** grows with distance and size, from `--motion-instant` to `--motion-slow`, and exits are quicker than entrances (e.g. enter over `--motion-fast`, exit over `--motion-instant`).
  - **Toasts** stay at least `--motion-timeout-toast`, pause on hover and focus, and extend with the device's accessibility timeout.
  - **Reduced motion** (`prefers-reduced-motion: reduce`) is a mode the system carries, not a per-component exception: slides, zooms and depth become fades, automatic and repeating motion stops, springs lose their bounce, and colour and opacity changes stay ([patterns 6.66](patterns/06-accessibility.md)).

### Buttons → [atoms/button.md](atoms/button.md), [atoms/icon-button.md](atoms/icon-button.md), [atoms/fab.md](atoms/fab.md), [molecules/button-group.md](molecules/button-group.md), [molecules/segmented-control.md](molecules/segmented-control.md)
Buttons are crisp rectangles with `--radius-element-sm` corners, set in `--type-label-large`, with optional leading and trailing icons. Primary is solid `--color-brand-primary-default` with `--color-brand-primary-on` text; a screen has one primary button ([patterns 1.72](patterns/01-screen-composition.md)). Outline uses a thin `--color-brand-primary-default` stroke on white. Text buttons have no container. Contrast is near-black on light pages and near-white on dark; gradient carries the AI gradient. Icon buttons are the square, label-less version; FABs float as circles or extended pills, one per screen for its main creating action.

### Cards & Containers → [molecules/card.md](molecules/card.md), [molecules/accordion.md](molecules/accordion.md), [organisms/dialog.md](organisms/dialog.md), [organisms/bottom-sheet.md](organisms/bottom-sheet.md), [organisms/lightbox.md](organisms/lightbox.md)
Cards are `--color-fill-default` panels with a `--stroke-thin` `--color-line-default` hairline and `--radius-element-md` corners, divided into header, body and footer; a collapsible card adds an expand caret and an optional gradient border. They are flat. A whole card opens its object, and its own controls are separate targets; cards are never used for comparison (use [Table](organisms/table.md)). Dialogs, sheets and drawers are large surfaces with `--radius-container` corners and an overlay shadow, over the `--color-fill-scrim` barrier (see [Scrim](atoms/scrim.md)).

### Navigation → [organisms/global-header.md](organisms/global-header.md), [organisms/top-app-bar.md](organisms/top-app-bar.md), [organisms/screen-header-bar.md](organisms/screen-header-bar.md), [organisms/navigation-rail.md](organisms/navigation-rail.md), [organisms/navigation-drawer.md](organisms/navigation-drawer.md), [organisms/navigation-bar.md](organisms/navigation-bar.md), [molecules/tab-bar.md](molecules/tab-bar.md), [molecules/breadcrumb.md](molecules/breadcrumb.md), [molecules/pagination.md](molecules/pagination.md), [molecules/site-switcher.md](molecules/site-switcher.md)
- **Global Header** and **Navigation Rail** are locked to dark mode (they always render with the `colors-dark` values).
- **Global navigation follows width** (§6 Grid & Structure). The primary navigation may hold the product's one main create action ([patterns 2.14](patterns/02-navigation-flow.md)).
- **Top App Bar:** the in-screen bar, with a leading control, a title and trailing actions.
- **Tab Bar:** the selected tab gets a `--stroke-thick` `--color-line-selection` underline.
- **Navigation Bar:** the bottom bar of icon-and-label destinations; **Navigation Drawer** slides in from the side.

### Inputs & Forms → [molecules/input.md](molecules/input.md) (text, number, password, date and time types), [molecules/select.md](molecules/select.md), [molecules/combobox.md](molecules/combobox.md), [molecules/phone-input.md](molecules/phone-input.md), [molecules/search.md](molecules/search.md), [molecules/stepper-input.md](molecules/stepper-input.md), [atoms/checkbox.md](atoms/checkbox.md), [atoms/radio-button.md](atoms/radio-button.md), [atoms/switch.md](atoms/switch.md), [atoms/slider.md](atoms/slider.md)
Fields are `--color-fill-default` boxes with a `--stroke-thin` `--color-line-strong` outline (the field's real boundary) and `--radius-element-sm` corners. Placeholder text is `--color-ink-medium` and never replaces the label.
- **Each field reads label, hint, error, input** ([patterns 1.124, 1.64](patterns/01-screen-composition.md)): the [Input Label](atoms/input-label.md) on top; the [Input Hint](atoms/input-hint.md) under it, above the input, which stays visible when an error shows; the error, when there is one, on its own line between hint and input, with an icon and `--color-status-error-default` words that say how to fix it; then the input. This holds for Input, Select, Combobox, Phone Input, Stepper Input, Slider Input Field, Search where it has a hint, and the Date Picker's field.
- **Required and optional:** mark whichever is the minority in words after the label, "(required)" or "(optional)", never with an asterisk alone ([patterns 7.31](patterns/07-content-copy.md)).
- Hover strengthens the outline, focus adds the `--color-line-focus` ring, and the error state turns the outline `--color-status-error-default`.
- Checkbox, radio and switch take on `--color-brand-primary-default` when on.

### Feedback & Status → [molecules/snackbar.md](molecules/snackbar.md), [molecules/inline-banner.md](molecules/inline-banner.md), [molecules/system-banner.md](molecules/system-banner.md), [atoms/status-label.md](atoms/status-label.md), [atoms/label.md](atoms/label.md), [atoms/notification-indicator.md](atoms/notification-indicator.md), [atoms/icon-indicator.md](atoms/icon-indicator.md), [atoms/progress-bar.md](atoms/progress-bar.md), [molecules/progress-circle.md](molecules/progress-circle.md), [atoms/skeleton.md](atoms/skeleton.md), [atoms/meter.md](atoms/meter.md), [molecules/connection-status.md](molecules/connection-status.md), [molecules/empty-state.md](molecules/empty-state.md)
Status uses the severities success, warning, error and info (plus neutral) from the token family: a tinted `faint` fill, a coloured `default` stroke and a coloured icon plus text. Each message kind has one home ([patterns 1.57](patterns/01-screen-composition.md)).
- **Inline banners** sit in the content, at the top of the page, section or element they're about ([patterns 1.60](patterns/01-screen-composition.md)).
- **System banners** are full-width solid strips in the status's `default` fill with always-white text (dark text on warning), directly below the header, one at a time ([patterns 1.58–1.59](patterns/01-screen-composition.md)).
- **Snackbars** are toasts at the bottom of the content area, one at a time, a newer one replacing the older ([patterns 1.63](patterns/01-screen-composition.md)). They confirm and inform; a snackbar never carries an error or a warning ([patterns 4.31](patterns/04-states-feedback.md)).
- **Status Label** leads with the status icon by default; **Label** is for categories only and never shows a status.
- **Indicators** are small counts (99+ cap) or icons pinned to avatars and icons.

### Domain-specific (Zebra frontline) → [molecules/comms-buttons.md](molecules/comms-buttons.md), [molecules/push-to-talk.md](molecules/push-to-talk.md), [organisms/dial-pad.md](organisms/dial-pad.md), [organisms/voice-call-popup.md](organisms/voice-call-popup.md), [molecules/message-input.md](molecules/message-input.md), [atoms/priority-pill.md](atoms/priority-pill.md), [organisms/gantt-view.md](organisms/gantt-view.md)
These cover voice and messaging workflows: round comms buttons (call, video, mute), the [Push To Talk](molecules/push-to-talk.md) hold-to-talk control, a dial pad with a quick-dial security action, voice recording inside the message input and call pop-ups (an ongoing call minimises to a floating element). Task priority uses neutral pills with a level index and icon. Shift and task scheduling uses a Gantt view.

---

## 6. Layout Principles

### Grid & Structure
- **4px base:** all boxes, margins, padding, icon sizes and line-heights come from the `scale-*` steps through the size tokens; the base unit is `--grid-unit`. Every space is a step on that scale; in-between values exist only to align icons with text.
- **Size classes:** layout follows the width the window actually has, never the device type or its orientation ([patterns 5.1](patterns/05-sizes-devices.md)). Design the narrowest class first. Crossing a class changes the structure (panes, navigation, overlays), not just the scale ([patterns 5.3–5.17](patterns/05-sizes-devices.md)).

  | Class | Width | Columns | Outer margin | Global navigation | Panes |
  |---|---|---|---|---|---|
  | Compact | below `--breakpoint-medium-min` | `--grid-columns-compact` | `--space-page` | [Navigation Bar](organisms/navigation-bar.md) | one |
  | Medium | from `--breakpoint-medium-min` | `--grid-columns-medium` | `--grid-margin` | [Navigation Rail](organisms/navigation-rail.md) | one (two only for light content) |
  | Expanded | from `--breakpoint-expanded-min` | `--grid-columns-expanded` | `--grid-margin` | Navigation Rail | up to two |
  | Large | from `--breakpoint-large-min` | `--grid-columns-expanded` | `--grid-margin` | Navigation Rail, expanded (with labels) | up to three |

  Media queries can't read CSS variables, so a query writes the breakpoint's frontmatter value and names the token in a comment. `--breakpoint-mobile-max` is **deprecated**: don't use it; it is removed at the next breaking release.
- **Column grid:** fluid columns sized in `fr` units, inside a `--container-default` maximum width; `--space-gutter` separates them. Only top-level containers align to columns; elements inside a card, table, form or overlay use the spacing scale.
- **Outer margins** are fixed within a class even when columns are fluid, and one product uses one set of margins on every screen.
- **Sizing scale:** fixed sizes are size tokens (`--control-*`, `--space-*`) and fluid sizes are column widths. Boxes are often hybrid: a fixed **minimum** height with a fluid width; nothing has a fixed height around text ([patterns 5.37](patterns/05-sizes-devices.md)).
- **Aspect ratios:** only the set listed in `--aspect-ratios`.

### Whitespace Strategy
- The spacing scale runs from `--space-3xs` to `--space-5xl`, with role tokens `--space-card` (inside cards), `--space-section` (between sections) and `--space-page`. Component internals mostly use `--space-2xs` to `--space-lg`, and sections use `--space-xl` to `--space-4xl`. Negative steps (`--space-neg-xs` … `--space-neg-xl`) overlap elements such as avatar stacks. Spacing is a theme dimension: a density or platform may swap the values, while the names stay.
- **Gap, not margins:** space between siblings is the container's `gap` (flex or grid). Don't put margins on elements.
- **Space shows grouping** ([patterns 1.7, 1.11](patterns/01-screen-composition.md)): more space means a weaker relationship. The gap inside a group is smaller than the gap between groups, stepping up at least one token at each level outward:

| Relationship | Gap |
|---|---|
| Icon and its label | `--space-2xs` |
| Title and its subtitle; label and its field | `--space-sm` |
| Items in a tight list; controls in a row | `--space-md` |
| Fields in a form; card padding | `--space-lg` (`--space-card`) |
| Between groups | `--space-xl` |
| Between sections | `--space-section` |

- **A heading belongs to what follows it:** put it in the group below it, so the space above it (between groups) is larger than the space below it ([patterns 1.125](patterns/01-screen-composition.md)).
- **Padding is at least the inner gap:** a container's padding is never smaller than the gap between its children.
- **Same rank, same space:** equal things get equal gaps on every screen, and gutters don't change between screens.
- **Separate with space first,** then a [Divider](atoms/divider.md), then a surface ([patterns 1.7–1.10](patterns/01-screen-composition.md)). Shadows stay on overlays (§5 Elevation).
- **Few edges:** items in a region share one leading edge ([patterns 1.14](patterns/01-screen-composition.md)).
- **Don't stretch:** forms and reading text cap at `--container-reading`, and larger elements stop stretching on wide screens ([patterns 1.107](patterns/01-screen-composition.md), [5.11–5.13](patterns/05-sizes-devices.md)). When a screen feels crowded, remove content or borders before removing space.
- **Density** is a product-wide choice of the existing component sizes (small, medium, large), never mixed on one page and never chosen by width. A denser setting reduces space and row height, never text size or the touch target. The gloved setting is its own density, with `--control-target-gloved` targets on every surface gloved people touch ([patterns 5.45–5.50](patterns/05-sizes-devices.md)).

### Hierarchy
Screen hierarchy is set by [patterns 01](patterns/01-screen-composition.md) (1.13–1.17, 1.72, 1.136); in token terms:
- **One primary thing per screen:** the content the person came for gets the screen's largest text style, and the action they came to do its only primary button (see [Button](atoms/button.md) Usage for how the other actions step down).
- **At most three levels of emphasis in a region:** the title or value, body text in `--color-ink-high`, and supporting text in `--color-ink-medium`. Step between them as §4 describes.
- **Quieten before you shout:** to make something stand out, first drop what surrounds it to `--color-ink-medium` or a smaller style; enlarge it only if that isn't enough.
- **Values outrank their labels** ([patterns 1.108](patterns/01-screen-composition.md)).
- **Colour is for meaning:** the brand colour marks actions and selection, status colours mark status (§3).

### Alignment & Visual Balance
- Content is start-aligned by default. Centring is an opt-in for app bars, banners, sheet headers and dialogs.
- Leading and trailing regions are a universal pattern (menu items, app bars, inputs, buttons).
- Icons and marks inside a container (checkbox marks, icon-button glyphs, avatar and indicator content) are perfectly centred in it, horizontally and vertically (see `atoms/icon.md`).
- Monochrome layouts with one blue focal point per screen.
- **Right-to-left:** in right-to-left languages the layout mirrors, so lay out with logical properties (`inline-start` / `inline-end`), never left and right. Digits, phone and serial numbers, clocks, circular progress, media controls, logos, the check mark and photographs never mirror; paragraphs of three or more lines align to their own language ([patterns 5.39–5.41](patterns/05-sizes-devices.md)).

### Responsive Behavior & Touch
- **Targets** ([patterns 6.16–6.19](patterns/06-accessibility.md)): every touch target is at least `--control-target-min`, enforced with min-height and min-width rather than padding alone; controls drawn smaller (small buttons, small icon buttons) get the surrounding hit area. A pointer-only product (a desktop console) may go down to `--control-target-pointer-min`, never below; a product used with gloves uses `--control-target-gloved`. Keep at least `--space-sm` between neighbouring targets.
- **Navigation by width** follows the size-class table in Grid & Structure ([patterns 5.15](patterns/05-sizes-devices.md)). The Global Header is used from medium up; the Top App Bar and Bottom Sheet are the compact forms.
- **Contrast:** the light and dark modes are built for WCAG AA and the AAA modes for AAA, but not every pair of tokens passes, so check a pair before relying on it ([patterns 6.1–6.3](patterns/06-accessibility.md)). Known limits: `--color-ink-low` and the `--color-data-*` colours are never text, and `--color-line-default` is never the only boundary of a control. Don't add opacity to text.
- **Focus** is never suppressed (§5 Focus). Icon-only controls need an accessible label.

---

## 7. Design System Notes for Claude Generation

This section describes the generic Zebra look, for work with no reference design. When a reference exists (a Figma frame or a screenshot), match the reference instead.

### Language to Use
"Clean enterprise UI on a crisp white canvas with cool blue-grey neutrals; graphite text in IBM Plex Sans; a single vivid Zebra-blue accent for primary actions; lightly rounded rectangles with hairline grey borders; soft shadows only on overlays; strict 4px grid; calm, functional, accessible; status shown with tinted surfaces plus coloured icon and label."

### Color References
Resolve each token from the frontmatter `colors` group (then its primitive):
- Zebra Blue `--color-brand-primary-default` (primary action, selection) → hover `--color-brand-primary-strong` → pressed `--color-brand-primary-deep`
- Paper White `--color-fill-default` components · Frost canvas `--color-fill-canvas` · Mist `--color-fill-faint` hover
- Graphite `--color-ink-high` text · Slate `--color-ink-medium` secondary · Pewter `--color-ink-disabled` disabled
- Border Grey `--color-line-default` (cards) · Field Edge `--color-line-strong` (field outlines) · Divider `--color-line-subtle`
- Night Ink `--color-fill-inverse` for tooltips, contrast buttons and snackbars
- Evergreen `--color-status-success-default` · Amber Ochre `--color-status-warning-default` · Alarm Red `--color-status-error-default` · Electric Blue `--color-status-info-default`

### Component Prompts
Substitute the frontmatter values when sending these prompts to Claude.
1. *"A dark global header bar on `--color-fill-default` (dark mode). On the left: the Zebra logo, the platform name and four text menu items in `--color-ink-high` `--type-label-medium`. On the right: a search field, three icon buttons, and a small circular avatar with initials and the user's name."*
2. *"A form card on `--color-fill-default` with a `--stroke-thin` `--color-line-default` border, `--radius-element-md` corners and `--space-card` padding. A 'Site details' title in `--type-title-large` `--color-ink-high`, then three stacked medium inputs, each reading label, hint, input: the label on top, a `--type-body-xsmall` `--color-ink-medium` hint under it, then a field with a `--stroke-thin` `--color-line-strong` outline. One field shows the error state: an error line with an icon and `--color-status-error-default` words between its hint and its field, which takes a `--color-status-error-default` outline. Footer, at the trailing end: a 'Cancel' outline button, then a 'Save' solid `--color-brand-primary-default` button, the screen's only primary."*
3. *"A dense task list. Each row has a medium avatar on the left, a `--type-title-medium` title and a `--type-body-small` `--color-ink-medium` subtitle. On the right of each row: a priority pill and a chevron. Rows are separated by `--color-line-subtle` dividers and hover to `--color-fill-faint`."*

### Incremental Iteration
- Start monochrome (white, greys, graphite), then add blue **only** to the screen's one primary action and to selected states.
- When adding status, use the `faint` tint as the background, the coloured `default` hairline and a coloured icon, and keep the text `--color-ink-high`.
- Keep each radius to its role (§5 Shape): details `--radius-xs`, controls `--radius-element-sm`, containers `--radius-element-md`, large surfaces `--radius-container`, and pills (chips, avatars, full buttons) `--radius-pill`.
- If something looks heavy, remove shadows first, then any border that space alone can replace (§6). Where an edge is needed, it's a hairline.
- For another theme mode, swap to its override of the same token where it has one (`colors-dark`, `colors-aaa`, `colors-aaa-dark`, `colors-companion`, `colors-companion-dark`, `colors-companion-aaa`, `colors-companion-aaa-dark`), and its base's value where it doesn't (§3 Theme modes). Don't invent new hues.

---

## 8. Component Index (atomic)

Each file contains a `tokens:` block (its component tokens, see §2) followed by anatomy, variants, states, spacing & sizing, properties, usage, accessibility and a Claude prompt. Files marked † are **draft** (`status: draft`): their purpose, anatomy and composition are defined, but their measurements are still to be confirmed. Most drafts have no Figma source yet; the rest have only a thin one.

### Atoms: [`atoms/`](atoms/)
| Group | Components |
|---|---|
| Actions | [button](atoms/button.md) · [icon-button](atoms/icon-button.md) · [fab](atoms/fab.md)† |
| Selection | [checkbox](atoms/checkbox.md) · [radio-button](atoms/radio-button.md) · [switch](atoms/switch.md) · [slider](atoms/slider.md) · [assist-chip](atoms/assist-chip.md) · [filter-chip](atoms/filter-chip.md) |
| Identity & marks | [icon](atoms/icon.md) · [avatar](atoms/avatar.md) · [notification-indicator](atoms/notification-indicator.md) · [icon-indicator](atoms/icon-indicator.md) · [caret-indicator](atoms/caret-indicator.md)† · [ai-mark](atoms/ai-mark.md)† |
| Status & labels | [label](atoms/label.md) · [status-label](atoms/status-label.md) · [priority-pill](atoms/priority-pill.md) · [tag](atoms/tag.md)† · [progress-bar](atoms/progress-bar.md) · [tooltip](atoms/tooltip.md) · [skeleton](atoms/skeleton.md)† · [meter](atoms/meter.md)† · [sparkline](atoms/sparkline.md)† |
| Form parts | [input-label](atoms/input-label.md)† · [input-hint](atoms/input-hint.md)† |
| Structure | [divider](atoms/divider.md) · [scrim](atoms/scrim.md) · [scrollbar](atoms/scrollbar.md) · [drag-handle](atoms/drag-handle.md)† |

### Molecules: [`molecules/`](molecules/)
| Group | Components |
|---|---|
| Actions | [button-group](molecules/button-group.md) · [segmented-control](molecules/segmented-control.md) · [dropdown-menu](molecules/dropdown-menu.md) · [menu-item](molecules/menu-item.md) · [comms-buttons](molecules/comms-buttons.md)† · [push-to-talk](molecules/push-to-talk.md)† · [commit-bar](molecules/commit-bar.md)† |
| Inputs | [input](molecules/input.md) · [select](molecules/select.md) · [phone-input](molecules/phone-input.md) · [search](molecules/search.md) · [stepper-input](molecules/stepper-input.md) · [slider-input-field](molecules/slider-input-field.md)† · [input-chip](molecules/input-chip.md) · [message-input](molecules/message-input.md) · [combobox](molecules/combobox.md)† · [ai-suggestion](molecules/ai-suggestion.md)† |
| Navigation | [tab-bar](molecules/tab-bar.md) · [breadcrumb](molecules/breadcrumb.md) · [pagination](molecules/pagination.md) · [navigation-header](molecules/navigation-header.md)† · [sub-menu-item](molecules/sub-menu-item.md) · [site-switcher](molecules/site-switcher.md)† |
| Containers | [card](molecules/card.md) · [accordion](molecules/accordion.md) |
| Lists | [notification-item](molecules/notification-item.md) · [upload-item](molecules/upload-item.md)† · [avatar-rail](molecules/avatar-rail.md) · [chat-list-item](molecules/chat-list-item.md)† · [contact-list-item](molecules/contact-list-item.md)† · [list-item](molecules/list-item.md)† · [key-value-list](molecules/key-value-list.md)† · [task-list](molecules/task-list.md)† |
| Feedback | [snackbar](molecules/snackbar.md) · [inline-banner](molecules/inline-banner.md) · [system-banner](molecules/system-banner.md) · [progress-circle](molecules/progress-circle.md) · [empty-state](molecules/empty-state.md)† · [filter-selection-bar](molecules/filter-selection-bar.md)† · [connection-status](molecules/connection-status.md)† |

### Organisms: [`organisms/`](organisms/)
| Group | Components |
|---|---|
| Overlays | [dialog](organisms/dialog.md) · [bottom-sheet](organisms/bottom-sheet.md) · [lightbox](organisms/lightbox.md) · [file-upload](organisms/file-upload.md)† · [right-drawer-panel](organisms/right-drawer-panel.md)† · [voice-call-popup](organisms/voice-call-popup.md)† |
| App chrome | [global-header](organisms/global-header.md) · [top-app-bar](organisms/top-app-bar.md) · [screen-header-bar](organisms/screen-header-bar.md) · [navigation-rail](organisms/navigation-rail.md) · [navigation-drawer](organisms/navigation-drawer.md) · [navigation-bar](organisms/navigation-bar.md) |
| Data & flow | [table](organisms/table.md) · [stepper](organisms/stepper.md) · [gantt-view](organisms/gantt-view.md)† · [date-picker](organisms/date-picker.md)† · [vertical-speed-scroller](organisms/vertical-speed-scroller.md)† · [chart](organisms/chart.md)† · [map-view](organisms/map-view.md)† · [compare-view](organisms/compare-view.md)† · [camera-scan-view](organisms/camera-scan-view.md)† |
| Communication | [chat](organisms/chat.md)† · [dial-pad](organisms/dial-pad.md)† · [notification-centre](organisms/notification-centre.md)† |

---

## 9. Governance
- **Tokens are the source of truth.** Every visual value is defined once in this file's frontmatter, converted from the Figma *primitives*, *palette*, *size* and *typography* collections. Components and screens reference tokens by name and never restate raw values.
- **Never hard-code** colour, spacing, radius, shadow or typography values. Use semantic tokens (`--color-fill-*`, `--color-ink-*`, `--color-line-*`, `--color-brand-*`, `--color-status-*`, `--space-*`, `--control-*`, `--radius-*`, `--stroke-*`, and typography tokens such as `--type-label-large`). Hard-coded values break light/dark and AA/AAA theming.
- **Shape:** rounded is the default for every component; the AAA modes are always sharp (§5). Don't override a component's radius to keep it rounded in AAA.
- **Primitives are never used directly** in screens. Components use them only for an exact `scale-*` measurement (see §2).
- **New design requests** are reviewed with three questions: does a component already exist, does it meet the requirements, and is it extensible beyond this project? The outcome is either a project "snowflake", a modification of an existing component, or a new design-system component.
- **Pattern defaults:** a rule or sentence in [patterns](patterns/README.md) that starts "By default" may be overridden by a project; it records the override and its reason in its `CHANGES.md` (Type: pattern override), so the sprint reconcile reviews it. Every other pattern rule changes only here, upstream.
- **Draft components** (†) must have their measurements confirmed (in Figma, then as component tokens) before they are used in production designs.
- **Icons** come from the Zebra Icons library (see `icons` in the frontmatter and [atoms/icon.md](atoms/icon.md)).
