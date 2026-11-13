---
name: Zebra Design System
version: '2.2611.0'
icons: "Zebra Icons 1.9.8 (zeta-icons-round / zeta-icons-sharp), package @zebra-fed/zeta-icons"
# ── TOKEN ARCHITECTURE ──────────────────────────────────────────────────────────
# Three layers (mirrors the Figma variable collections):
#   1. primitives ........................... raw colours (color-*) and the size scale (scale-*).
#      Colours are referenced only by the semantic groups. Components may reference a scale-* step
#      only for a fixed measurement that matches it exactly (e.g. '{primitives.scale-9}' for 24px).
#   2. semantic groups (this frontmatter) ... colors (+ colors-dark, colors-aaa, colors-aaa-dark:
#      same keys per mode, the Figma 'palette'), space, control, radius, stroke, container,
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
colors:  # Figma 'palette' semantic colours, light, AA (default). Same keys in all four modes
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
colors-dark:  # Figma 'palette' semantic colours, dark, AA. Same keys in all four modes
  color-brand-primary-default: '{primitives.color-brand-main-60}'
  color-brand-primary-faint: '{primitives.color-brand-main-100}'
  color-brand-primary-subtle: '{primitives.color-brand-main-50}'
  color-brand-primary-strong: '{primitives.color-brand-main-70}'
  color-brand-primary-deep: '{primitives.color-brand-main-80}'
  color-brand-primary-muted: '{primitives.color-brand-main-90}'
  color-brand-primary-on: '{primitives.color-pure-white}'
  color-brand-secondary-default: '{primitives.color-brand-alternative-50}'
  color-brand-secondary-faint: '{primitives.color-brand-alternative-100}'
  color-brand-secondary-subtle: '{primitives.color-brand-alternative-60}'
  color-brand-secondary-strong: '{primitives.color-brand-alternative-70}'
  color-brand-secondary-deep: '{primitives.color-brand-alternative-80}'
  color-brand-secondary-on: '{primitives.color-pure-white}'
  color-brand-tertiary-default: '{primitives.color-accent-5-50}'
  color-brand-tertiary-faint: '{primitives.color-accent-5-100}'
  color-brand-tertiary-subtle: '{primitives.color-accent-5-50}'
  color-brand-tertiary-strong: '{primitives.color-accent-5-70}'
  color-brand-tertiary-deep: '{primitives.color-accent-5-80}'
  color-brand-tertiary-on: '{primitives.color-pure-white}'
  color-fill-canvas: '{primitives.color-neutral-cool-90}'
  color-fill-default: '{primitives.color-neutral-cool-100}'
  color-fill-elevated: '{primitives.color-neutral-cool-100}'
  color-fill-overlay: '{primitives.color-neutral-cool-80}'
  color-fill-inverse: '{primitives.color-neutral-cool-20}'
  color-fill-sunken: '{primitives.color-neutral-cool-80}'
  color-fill-faint: '{primitives.color-neutral-cool-90}'
  color-fill-scrim: '{primitives.color-alpha-dark-60}'
  color-fill-selection: '{primitives.color-brand-main-90}'
  color-fill-hover: '{primitives.color-neutral-cool-40}'
  color-fill-inverse-sunken: '{primitives.color-neutral-cool-30}'
  color-fill-inverse-elevated: '{primitives.color-neutral-cool-10}'
  color-fill-disabled: '{primitives.color-neutral-cool-80}'
  color-fill-transparent-emphasis: '{primitives.color-alpha-light-5}'
  color-fill-transparent-elevate: '{primitives.color-alpha-light-10}'
  color-fill-transparent-obsure: '{primitives.color-alpha-light-30}'
  color-fill-transparent: '{primitives.color-alpha-light-0}'
  color-ink-high: '{primitives.color-pure-white}'
  color-ink-medium: '{primitives.color-neutral-cool-40}'
  color-ink-low: '{primitives.color-neutral-cool-50}'
  color-ink-disabled: '{primitives.color-neutral-cool-60}'
  color-ink-inverse: '{primitives.color-neutral-cool-100}'
  color-ink-link: '{primitives.color-brand-main-50}'
  color-ink-brand: '{primitives.color-brand-main-40}'
  color-ink-selection: '{primitives.color-neutral-cool-10}'
  color-ink-always-white: '{primitives.color-pure-white}'
  color-ink-always-blank: '{primitives.color-neutral-cool-100}'
  color-status-success-default: '{primitives.color-system-positive-60}'
  color-status-success-faint: '{primitives.color-system-positive-100}'
  color-status-success-deep: '{primitives.color-system-positive-80}'
  color-status-success-strong: '{primitives.color-system-positive-70}'
  color-status-success-subtle: '{primitives.color-system-positive-70}'
  color-status-warning-default: '{primitives.color-system-warning-50}'
  color-status-warning-faint: '{primitives.color-system-warning-100}'
  color-status-warning-deep: '{primitives.color-system-warning-40}'
  color-status-warning-strong: '{primitives.color-system-warning-40}'
  color-status-warning-subtle: '{primitives.color-system-warning-70}'
  color-status-error-default: '{primitives.color-system-negative-60}'
  color-status-error-faint: '{primitives.color-system-negative-100}'
  color-status-error-deep: '{primitives.color-system-negative-80}'
  color-status-error-subtle: '{primitives.color-system-negative-50}'
  color-status-error-strong: '{primitives.color-system-negative-70}'
  color-status-info-default: '{primitives.color-system-info-60}'
  color-status-info-faint: '{primitives.color-system-info-100}'
  color-status-info-deep: '{primitives.color-system-info-80}'
  color-status-info-subtle: '{primitives.color-system-info-60}'
  color-status-info-strong: '{primitives.color-system-info-70}'
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
  color-gradient-default-start: '{primitives.color-accent-1-60}'
  color-gradient-default-end: '{primitives.color-extend-4-60}'
  color-gradient-strong-start: '{primitives.color-accent-1-40}'
  color-gradient-strong-end: '{primitives.color-extend-4-40}'
  color-gradient-subtle-start: '{primitives.color-accent-1-70}'
  color-gradient-subtle-end: '{primitives.color-extend-4-80}'
colors-aaa:  # Figma 'palette' semantic colours, light, AAA contrast. Same keys in all four modes
  color-brand-primary-default: '{primitives.color-brand-main-80}'
  color-brand-primary-faint: '{primitives.color-brand-main-10}'
  color-brand-primary-subtle: '{primitives.color-brand-main-30}'
  color-brand-primary-strong: '{primitives.color-brand-main-90}'
  color-brand-primary-deep: '{primitives.color-brand-main-100}'
  color-brand-primary-muted: '{primitives.color-brand-main-20}'
  color-brand-primary-on: '{primitives.color-pure-white}'
  color-brand-secondary-default: '{primitives.color-brand-alternative-90}'
  color-brand-secondary-faint: '{primitives.color-brand-alternative-10}'
  color-brand-secondary-subtle: '{primitives.color-brand-alternative-30}'
  color-brand-secondary-strong: '{primitives.color-brand-alternative-100}'
  color-brand-secondary-deep: '{primitives.color-brand-alternative-100}'
  color-brand-secondary-on: '{primitives.color-pure-white}'
  color-brand-tertiary-default: '{primitives.color-accent-5-90}'
  color-brand-tertiary-faint: '{primitives.color-accent-5-10}'
  color-brand-tertiary-subtle: '{primitives.color-accent-5-30}'
  color-brand-tertiary-strong: '{primitives.color-accent-5-100}'
  color-brand-tertiary-deep: '{primitives.color-accent-5-100}'
  color-brand-tertiary-on: '{primitives.color-pure-white}'
  color-fill-canvas: '{primitives.color-neutral-cool-20}'
  color-fill-default: '{primitives.color-pure-white}'
  color-fill-elevated: '{primitives.color-pure-white}'
  color-fill-overlay: '{primitives.color-pure-white}'
  color-fill-inverse: '{primitives.color-neutral-cool-90}'
  color-fill-sunken: '{primitives.color-neutral-cool-20}'
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
  color-ink-medium: '{primitives.color-neutral-cool-80}'
  color-ink-low: '{primitives.color-neutral-cool-80}'
  color-ink-disabled: '{primitives.color-neutral-cool-80}'
  color-ink-inverse: '{primitives.color-pure-white}'
  color-ink-link: '{primitives.color-brand-main-90}'
  color-ink-brand: '{primitives.color-brand-main-90}'
  color-ink-selection: '{primitives.color-neutral-cool-100}'
  color-ink-always-white: '{primitives.color-pure-white}'
  color-ink-always-blank: '{primitives.color-neutral-cool-100}'
  color-status-success-default: '{primitives.color-system-positive-80}'
  color-status-success-faint: '{primitives.color-system-positive-10}'
  color-status-success-deep: '{primitives.color-system-positive-100}'
  color-status-success-strong: '{primitives.color-system-positive-90}'
  color-status-success-subtle: '{primitives.color-system-positive-30}'
  color-status-warning-default: '{primitives.color-system-warning-80}'
  color-status-warning-faint: '{primitives.color-system-warning-10}'
  color-status-warning-deep: '{primitives.color-system-warning-100}'
  color-status-warning-strong: '{primitives.color-system-warning-90}'
  color-status-warning-subtle: '{primitives.color-system-warning-30}'
  color-status-error-default: '{primitives.color-system-negative-80}'
  color-status-error-faint: '{primitives.color-system-negative-10}'
  color-status-error-deep: '{primitives.color-system-negative-100}'
  color-status-error-subtle: '{primitives.color-system-negative-30}'
  color-status-error-strong: '{primitives.color-system-negative-90}'
  color-status-info-default: '{primitives.color-system-info-80}'
  color-status-info-faint: '{primitives.color-system-info-10}'
  color-status-info-deep: '{primitives.color-system-info-100}'
  color-status-info-subtle: '{primitives.color-system-info-30}'
  color-status-info-strong: '{primitives.color-system-info-90}'
  color-status-ghost-default: '{primitives.color-alpha-dark-0}'
  color-status-ghost-faint: '{primitives.color-alpha-dark-5}'
  color-status-ghost-deep: '{primitives.color-alpha-dark-10}'
  color-status-ghost-subtle: '{primitives.color-alpha-dark-0}'
  color-status-ghost-strong: '{primitives.color-alpha-dark-20}'
  color-status-ghost-tint: 'rgba(0,63,189,0.1)'
  color-status-neutral-default: '{primitives.color-neutral-cool-80}'
  color-status-neutral-faint: '{primitives.color-neutral-cool-10}'
  color-status-neutral-deep: '{primitives.color-neutral-cool-100}'
  color-status-neutral-subtle: '{primitives.color-neutral-cool-50}'
  color-status-neutral-strong: '{primitives.color-neutral-cool-90}'
  color-line-selection: '{primitives.color-brand-main-80}'
  color-line-focus: '{primitives.color-brand-main-80}'
  color-line-default: '{primitives.color-neutral-cool-60}'
  color-line-subtle: '{primitives.color-neutral-cool-50}'
  color-line-inverse: '{primitives.color-pure-white}'
  color-line-strong: '{primitives.color-neutral-cool-70}'
  color-line-stronger: '{primitives.color-neutral-cool-80}'
  color-data-1: '{primitives.color-brand-main-80}'
  color-data-2: '{primitives.color-brand-alternative-90}'
  color-data-3: '{primitives.color-accent-5-90}'
  color-data-4: '{primitives.color-accent-1-80}'
  color-data-5: '{primitives.color-accent-4-80}'
  color-data-6: '{primitives.color-accent-3-80}'
  color-data-7: '{primitives.color-accent-2-90}'
  color-data-8: '{primitives.color-extend-3-90}'
  color-data-9: '{primitives.color-extend-4-80}'
  color-data-10: '{primitives.color-extend-2-80}'
  color-data-11: '{primitives.color-system-negative-80}'
  color-data-12: '{primitives.color-extend-1-80}'
  color-data-neutral: '{primitives.color-neutral-cool-80}'
  color-gradient-default-start: '{primitives.color-accent-1-80}'
  color-gradient-default-end: '{primitives.color-extend-4-80}'
  color-gradient-strong-start: '{primitives.color-accent-1-80}'
  color-gradient-strong-end: '{primitives.color-extend-4-80}'
  color-gradient-subtle-start: '{primitives.color-accent-1-50}'
  color-gradient-subtle-end: '{primitives.color-extend-4-40}'
colors-aaa-dark:  # Figma 'palette' semantic colours, dark, AAA contrast. Same keys in all four modes
  color-brand-primary-default: '{primitives.color-brand-main-30}'
  color-brand-primary-faint: '{primitives.color-brand-main-100}'
  color-brand-primary-subtle: '{primitives.color-brand-main-90}'
  color-brand-primary-strong: '{primitives.color-brand-main-20}'
  color-brand-primary-deep: '{primitives.color-brand-main-10}'
  color-brand-primary-muted: '{primitives.color-brand-main-90}'
  color-brand-primary-on: '{primitives.color-neutral-cool-100}'
  color-brand-secondary-default: '{primitives.color-brand-alternative-30}'
  color-brand-secondary-faint: '{primitives.color-brand-alternative-100}'
  color-brand-secondary-subtle: '{primitives.color-brand-alternative-90}'
  color-brand-secondary-strong: '{primitives.color-brand-alternative-20}'
  color-brand-secondary-deep: '{primitives.color-brand-alternative-10}'
  color-brand-secondary-on: '{primitives.color-neutral-cool-100}'
  color-brand-tertiary-default: '{primitives.color-accent-5-40}'
  color-brand-tertiary-faint: '{primitives.color-accent-5-100}'
  color-brand-tertiary-subtle: '{primitives.color-accent-5-90}'
  color-brand-tertiary-strong: '{primitives.color-accent-5-30}'
  color-brand-tertiary-deep: '{primitives.color-accent-5-20}'
  color-brand-tertiary-on: '{primitives.color-neutral-cool-100}'
  color-fill-canvas: '{primitives.color-neutral-cool-90}'
  color-fill-default: '{primitives.color-neutral-cool-100}'
  color-fill-elevated: '{primitives.color-neutral-cool-100}'
  color-fill-overlay: '{primitives.color-neutral-cool-90}'
  color-fill-inverse: '{primitives.color-neutral-cool-20}'
  color-fill-sunken: '{primitives.color-neutral-cool-90}'
  color-fill-faint: '{primitives.color-neutral-cool-90}'
  color-fill-scrim: '{primitives.color-alpha-dark-60}'
  color-fill-selection: '{primitives.color-brand-main-90}'
  color-fill-hover: '{primitives.color-neutral-cool-40}'
  color-fill-inverse-sunken: '{primitives.color-neutral-cool-30}'
  color-fill-inverse-elevated: '{primitives.color-neutral-cool-10}'
  color-fill-disabled: '{primitives.color-neutral-cool-80}'
  color-fill-transparent-emphasis: '{primitives.color-alpha-light-5}'
  color-fill-transparent-elevate: '{primitives.color-alpha-light-10}'
  color-fill-transparent-obsure: '{primitives.color-alpha-light-30}'
  color-fill-transparent: '{primitives.color-alpha-light-0}'
  color-ink-high: '{primitives.color-pure-white}'
  color-ink-medium: '{primitives.color-neutral-cool-30}'
  color-ink-low: '{primitives.color-neutral-cool-40}'
  color-ink-disabled: '{primitives.color-neutral-cool-40}'
  color-ink-inverse: '{primitives.color-neutral-cool-100}'
  color-ink-link: '{primitives.color-brand-main-20}'
  color-ink-brand: '{primitives.color-brand-main-20}'
  color-ink-selection: '{primitives.color-neutral-cool-10}'
  color-ink-always-white: '{primitives.color-neutral-cool-100}'
  color-ink-always-blank: '{primitives.color-neutral-cool-100}'
  color-status-success-default: '{primitives.color-system-positive-30}'
  color-status-success-faint: '{primitives.color-system-positive-100}'
  color-status-success-deep: '{primitives.color-system-positive-10}'
  color-status-success-strong: '{primitives.color-system-positive-20}'
  color-status-success-subtle: '{primitives.color-system-positive-40}'
  color-status-warning-default: '{primitives.color-system-warning-30}'
  color-status-warning-faint: '{primitives.color-system-warning-100}'
  color-status-warning-deep: '{primitives.color-system-warning-10}'
  color-status-warning-strong: '{primitives.color-system-warning-20}'
  color-status-warning-subtle: '{primitives.color-system-warning-40}'
  color-status-error-default: '{primitives.color-system-negative-30}'
  color-status-error-faint: '{primitives.color-system-negative-100}'
  color-status-error-deep: '{primitives.color-system-negative-10}'
  color-status-error-subtle: '{primitives.color-system-negative-40}'
  color-status-error-strong: '{primitives.color-system-negative-20}'
  color-status-info-default: '{primitives.color-system-info-30}'
  color-status-info-faint: '{primitives.color-system-info-100}'
  color-status-info-deep: '{primitives.color-system-info-10}'
  color-status-info-subtle: '{primitives.color-system-info-40}'
  color-status-info-strong: '{primitives.color-system-info-20}'
  color-status-ghost-default: '{primitives.color-alpha-light-0}'
  color-status-ghost-faint: '{primitives.color-alpha-light-5}'
  color-status-ghost-deep: '{primitives.color-alpha-light-10}'
  color-status-ghost-subtle: '{primitives.color-alpha-light-0}'
  color-status-ghost-strong: '{primitives.color-alpha-light-20}'
  color-status-ghost-tint: 'rgba(141,192,255,0.1)'
  color-status-neutral-default: '{primitives.color-neutral-warm-40}'
  color-status-neutral-faint: '{primitives.color-neutral-warm-100}'
  color-status-neutral-deep: '{primitives.color-neutral-warm-20}'
  color-status-neutral-subtle: '{primitives.color-neutral-warm-50}'
  color-status-neutral-strong: '{primitives.color-neutral-warm-30}'
  color-line-selection: '{primitives.color-brand-main-30}'
  color-line-focus: '{primitives.color-brand-main-30}'
  color-line-default: '{primitives.color-neutral-cool-50}'
  color-line-subtle: '{primitives.color-neutral-cool-60}'
  color-line-inverse: '{primitives.color-pure-black}'
  color-line-strong: '{primitives.color-neutral-cool-40}'
  color-line-stronger: '{primitives.color-neutral-cool-30}'
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
  color-gradient-default-end: '{primitives.color-extend-4-40}'
  color-gradient-strong-start: '{primitives.color-accent-1-30}'
  color-gradient-strong-end: '{primitives.color-extend-4-30}'
  color-gradient-subtle-start: '{primitives.color-accent-1-70}'
  color-gradient-subtle-end: '{primitives.color-extend-4-80}'
space:
  space-page: '{primitives.scale-7}'
  space-section: '{primitives.scale-9}'
  space-card: '{primitives.scale-6}'
  space-gutter: '{primitives.scale-7}'
  space-3xs: '{primitives.scale-2}'
  space-2xs: '{primitives.scale-3}'
  space-xs: '{primitives.scale-4}'
  space-sm: '{primitives.scale-5}'
  space-md: '{primitives.scale-6}'
  space-lg: '{primitives.scale-7}'
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
control:
  control-target-min: '{primitives.scale-13}'
  control-xs: '{primitives.scale-9}'
  control-sm: '{primitives.scale-12}'
  control-md: '{primitives.scale-13}'
  control-lg: '{primitives.scale-15}'
  control-icon-xxs: '{primitives.scale-5}'
  control-icon-xs: '{primitives.scale-6}'
  control-icon-sm: '{primitives.scale-7}'
  control-icon-md: '{primitives.scale-8}'
  control-icon-lg: '{primitives.scale-10}'
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
  type-heading-medium: { fontFamily: IBM Plex Sans, fontSize: 28px, fontWeight: '400', lineHeight: 32px, letterSpacing: 0px }
  type-heading-small: { fontFamily: IBM Plex Sans, fontSize: 24px, fontWeight: '400', lineHeight: 28px, letterSpacing: 0px }
  type-title-large: { fontFamily: IBM Plex Sans, fontSize: 20px, fontWeight: '500', lineHeight: 24px, letterSpacing: 0px }
  type-title-medium: { fontFamily: IBM Plex Sans, fontSize: 16px, fontWeight: '500', lineHeight: 20px, letterSpacing: 0px }
  type-title-small: { fontFamily: IBM Plex Sans, fontSize: 12px, fontWeight: '500', lineHeight: 16px, letterSpacing: 0px }
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
font-family:
  font-family-regular: "'IBM Plex Sans', sans-serif"
  icon-family-round: zeta-icons-round
  icon-family-sharp: zeta-icons-sharp
font-weight:
  font-weight-light: '300'
  font-weight-regular: '400'
  font-weight-medium: '500'
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
layout:
  grid-unit: 4px
  grid-columns: '12'
  grid-margin: 24px
  breakpoint-mobile-max: 1024px
  aspect-ratios: '1:1, 2:1, 2:3, 3:2, 4:3, 16:9'
opacity:
  opacity-hover-tint: '10%'
component-sizes:  # fixed component measurements Figma hard-codes and no scale-* step matches; each notes its owner
  size-assist-chip-height: 34px  # atoms/assist-chip.md
  size-avatar-badge-large: 18px  # atoms/avatar.md
  size-avatar-badge-xxsmall: 10px  # atoms/avatar.md
  size-avatar-close-icon: 5px  # atoms/avatar.md
  size-avatar-icon-ratio: '0.5'  # atoms/avatar.md (content icon ÷ diameter)
  size-avatar-label-ratio: '0.333'  # atoms/avatar.md (initials font size ÷ diameter; label-large at medium)
  size-avatar-rail-overlap-ratio: '0.25'  # molecules/avatar-rail.md (overlap ÷ diameter)
  size-avatar-status-icon-ratio: '0.42'  # atoms/avatar.md (status glyph ÷ badge)
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

> **Token rule:** every value in this document is a token reference written as `--<key>`. Raw values live only in the frontmatter above. To read a value, look up `<key>` in the relevant group (`colors`, `space`, `control`, `radius`, `stroke`, `container`, `shadow`, `typography`, `font-weight`, `motion`, `layout`, `opacity`). Dark and AAA values share the same key in `colors-dark`, `colors-aaa` and `colors-aaa-dark`. Component tokens (e.g. `--dialog-container-width`) are defined in the `tokens:` block of their component file. See §2 Token Architecture.

The Zebra Design System is an **enterprise utility language**. It is calm, precise and built for frontline workers who scan screens quickly, often on rugged handheld devices, with gloves on or in bad light. Components sit on pure white (`--color-fill-default`) over a faintly blue-tinted cool-grey canvas (`--color-fill-canvas`). Ink is a near-black graphite (`--color-ink-high`), never pure black. A single confident **Zebra Blue** (`--color-brand-primary-default`) carries every primary action and selection. Colour is spent "sparingly … as a means to employ meaning and discretion". Most screens are monochrome greys plus one blue, and red, green, amber and the secondary orange appear only when they mean something.

The geometry is strict and quiet. Everything snaps to the 4px-based size scale. Every component is rounded by default: controls take `--radius-element-sm` corners and containers `--radius-container`; each can switch to fully sharp (`--radius-none`) or, where offered, to full pills (`--radius-pill`). The AAA modes are always sharp. Depth is low: hairline strokes (`--stroke-thin`) and soft cool shadows (`--shadow-xsmall` … `--shadow-large`) only on floating layers. Type is **IBM Plex Sans** (`--font-family-regular`), a humanist-grotesque with an engineered feel. Display sizes use the light weight for an airy look, headings use regular, and all UI labels and titles use medium. The overall impression is *trustworthy industrial software*: dense enough for data, generous enough for touch, and accessible in all four theme modes (light, dark, AAA light, AAA dark).

**Key characteristics**
- Cool-neutral greys with a single saturated blue accent; a gradient (`--color-gradient-default-start` → `--color-gradient-default-end`) reserved for one promotional moment per screen
- A 4px-based size scale for spacing, control heights, radii and strokes
- Rounded is the default shape for every component, with sharp / rounded / full switching; AAA modes are always sharp
- Hairline strokes over shadows; shadows appear only on floating layers
- Status colour is always paired with an icon and text, never colour alone
- Components are theme-agnostic: they only reference semantic tokens, so dark and AAA modes come for free

---

## 2. Token Architecture

Zebra Design System tokens form three layers that mirror the Figma variable collections. Each layer may only reference the layer directly beneath it.

| Layer | Lives in | Holds | Example |
|---|---|---|---|
| **1. Primitives** | frontmatter `primitives` (Figma *primitives*) | Raw colour ramps (`color-brand-main-10` … `-100`, neutrals, system, accent, extend, alpha) and the size scale (`scale-0` … `scale-21`, `scale-neg-*`, `scale-container-*`) | `--color-brand-main-70` |
| **2. Semantic** | frontmatter `colors` (+ `colors-dark`, `colors-aaa`, `colors-aaa-dark`; Figma *palette*), `space`, `control`, `radius`, `stroke`, `container`, `shadow` (Figma *size*), `typography` (Figma *typography*), `font-family`, `font-weight`, `motion`, `layout`, `opacity`, `component-sizes` | Purpose-named decisions shared by the whole system. `component-sizes` holds the few fixed component measurements no scale step matches (`size-…`). | `--color-brand-primary-strong` |
| **3. Component** | `tokens:` block in each `atoms/`, `molecules/` and `organisms/` file | Each component's own named decisions. They are references only, never raw values. | `--button-primary-container-background-hover` |

Every semantic key carries its layer prefix (`color-`, `space-`, `control-`, `radius-`, `stroke-`, `shadow-`, `type-`, `motion-`, `size-`), so a semantic CSS name never collides with a component token.

### Reference syntax
A component token's value is a single reference to a semantic key, written `'{group.key}'`:
- `button-primary-container-background-hover: '{colors.color-brand-primary-strong}'`
- `button-container-padding-x-medium: '{space.space-md}'`
- `button-label-font-medium: '{typography.type-label-large}'`
- `button-container-height-medium: '{control.control-md}'`

Component tokens never reference `roles`, `colors-dark`, `colors-aaa`, `colors-aaa-dark` or colour primitives. The one primitive they may use is a `scale-*` step, and only for a fixed measurement that matches it exactly (e.g. `'{primitives.scale-9}'` for a 24px avatar). `scripts/tokens-css.py` enforces all of this and fails on an undefined reference.

**Composition (reuse, not restatement):** a component may also reference the tokens of components listed in its `composes`, written `'{child.token}'` (e.g. `button-icon-size-small: '{icon.icon-size-small}'`). A composite never restates a child's styling. It says which child, variant and size it uses ("[Icon Button](atoms/icon-button.md), subtle, medium"), and the child's own tokens govern its colours, states and radius. The composite defines its own tokens only for:
- **its own parts:** container, layout, gap, dividers, header;
- **context overrides:** a decision that deliberately differs from the child in this context. These point at a semantic key or at another child token.

References may chain (organism → molecule → atom), but every chain must end at a semantic token. Components may only reference children they compose, never siblings.

### Naming
`<component>-[<variant>-]<part>-<property>[-<state>|-<size>]`. The prefix is always the component's file name.
- **Parts:** `container`, `label`, `icon`, `track`, `thumb`, `indicator`, `divider`, `focus-ring`, …
- **Properties:** `background`, `foreground`, `border-color`, `border-width`, `outline-color`, `outline-width`, `radius`, `padding-x`, `padding-y`, `margin`, `gap`, `offset`, `inset`, `travel`, `height`, `width`, `size`, `min-height`, `min-width`, `max-height`, `max-width`, `font`, `font-weight`, `line-height`, `opacity`, `scale`, `shadow`, `transition`, `duration`, `easing`; gradients split into `-start` / `-end`
- **States:** `enabled` (Figma *default*), `hover`, `pressed`, `focused`, `disabled`, `selected`, `error`. Component-specific states: `on` / `off` (switch), `open`, `filled` (has a value), `active`, `typing`, `read-only`.

### Rules
- **Strict layering:** a component file's text and tables cite only its own component tokens and those of the components it composes. They never cite semantic tokens directly. This document's prose cites semantic tokens, plus a component's tokens where it describes that component.
- **Changes propagate:** restyling an atom (e.g. the icon button's hover) automatically restyles every molecule and organism that composes it, unless that composite has a deliberate context override.
- **Theming flows through:** semantic keys are identical in every mode, so `colors-dark`, `colors-aaa` and `colors-aaa-dark` re-theme every component automatically.
- **Re-theming one component** means pointing its component token at a different semantic key. Nothing else changes.

### Worked example: primary button hover
`--color-brand-main-70` (primitive) → `--color-brand-primary-strong` (semantic, `colors`) → `--button-primary-container-background-hover` (component, `atoms/button.md`).
In dark mode the same chain resolves through `colors-dark.color-brand-primary-strong`, which points at a lighter step of the same ramp.

---

## 3. Color Palette & Roles

The Zebra Design System uses a **two-tier colour model**, taken from the Figma *primitives* and *palette* collections:
1. **Primitives** (frontmatter `primitives`, `color-*`): ramps of 10 steps (10 lightest → 100 darkest) for the cool and warm neutrals, the brand main (blue) and alternative (orange), the four system hues (positive, negative, warning, info), five accents and four extended hues, plus `color-pure-white` / `-black` and the `color-alpha-dark-*` / `color-alpha-light-*` transparencies. Primitives are never used by components.
2. **Palette** (frontmatter `colors`): role tokens that point at primitive steps, in seven families. The same keys exist in all four modes.

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
| `--color-fill-inverse` (+ `-sunken`, `-elevated`) | Inverse surfaces: tooltips, contrast buttons, default snackbars |
| `--color-fill-scrim` | Modal barrier |
| `--color-fill-transparent`, `--color-fill-transparent-emphasis` / `-elevate` / `-obsure` | Transparent and see-through tints |

### Ink — text and icons
| Token | Role |
|---|---|
| `--color-ink-high` / `--color-ink-medium` / `--color-ink-low` | High, medium and low emphasis text and icons |
| `--color-ink-disabled` | Disabled text and icons |
| `--color-ink-inverse` | Text on inverse surfaces |
| `--color-ink-link` / `--color-ink-brand` | Text links / ghost-button text and input cursors |
| `--color-ink-selection` | Text inside a selection |
| `--color-ink-always-white` / `--color-ink-always-blank` | White / near-black that never change with mode |

### Line — borders
| Token | Role |
|---|---|
| `--color-line-default` | Input outlines, card borders, outline-subtle buttons |
| `--color-line-subtle` | Dividers, list separators, disabled outlines |
| `--color-line-strong` / `--color-line-stronger` | Hovered / pressed outlines |
| `--color-line-selection` | Borders of selected items |
| `--color-line-focus` | **Focus ring** (`--stroke-thick`, solid) |
| `--color-line-inverse` | Borders on inverse surfaces |

### Status — `--color-status-<family>-<step>`
Every status has the steps `faint` (tinted container), `subtle`, `default` (text, borders, bold banners), `strong` and `deep` (emphasis, hover / pressed).
| Family | Character | Use |
|---|---|---|
| `success` | Evergreen | Positive outcomes, positive buttons |
| `warning` | Amber Ochre | Warnings |
| `error` | Alarm Red | Errors, destructive buttons |
| `info` | Electric Blue | Information |
| `neutral` | Graphite | Neutral status |
| `ghost` | Transparent tints | Ghost buttons: `default` at rest, `faint` on hover, `deep` when pressed, `tint` when selected |

### Data and gradient
- **Data:** `--color-data-1` … `--color-data-12` plus `--color-data-neutral`, for chart series and avatar swatches. Never use them for text, because they may not meet contrast.
- **Gradient:** `--color-gradient-<default|strong|subtle>-<start|end>`, the purple-to-blue promotional gradient (gradient buttons, AI cards, gradient text).

### Theme modes
- **Dark** (`colors-dark`, `[data-theme="dark"]`): the palette points at different primitive steps. Fills become near-black, ink becomes near-white, and brand and status steps move lighter so they keep their contrast.
- **AAA** (`colors-aaa`, `[data-contrast="aaa"]`) and **AAA dark** (`colors-aaa-dark`, both attributes): the palette shifts to stronger steps so text, borders and fills meet WCAG AAA contrast, and every component turns **sharp** (see §5 Shape).

---

## 4. Typography Rules

**Typeface:** IBM Plex Sans (`--font-family-regular`), "clean, distinctive and designed for digital world use cases", free and multilingual for localisation. **Icon fonts:** `--icon-family-round` (default) and `--icon-family-sharp` (used when a component is `sharp`).

### Hierarchy & Weights
| Role | Tokens | Weight | HTML default | Use |
|---|---|---|---|---|
| Display | `--type-display-large` · `--type-display-medium` · `--type-display-small` | `--font-weight-light` | n/a | Hero numbers, splash, marketing |
| Heading | `--type-heading-large` · `--type-heading-medium` · `--type-heading-small` | `--font-weight-regular` | h1 / h2 / h3 | Page and section titles |
| Title | `--type-title-large` · `--type-title-medium` · `--type-title-small` | `--font-weight-medium` | h4 / h5 / h6 | Card, dialog and list headers |
| Body | `--type-body-large` · `--type-body-medium` · `--type-body-small` · `--type-body-xsmall` | `--font-weight-regular` | p = `--type-body-medium` | Reading text, descriptions, hints |
| Label | `--type-label-large` · `--type-label-medium` · `--type-label-small` | `--font-weight-medium` | n/a | Buttons, chips, tabs, field labels |
| Indicator | `--type-indicator-medium` · `--type-indicator-small` | medium · regular | n/a | Notification counts in indicators |

`--type-h1` … `--type-h6` alias heading-large … title-small.

### Spacing Principles
- **One scale:** sizes and line-heights follow the 4px-based scale. `--type-body-small` and `--type-label-medium` are documented exceptions that break the grid rhythm.
- **Weight contrast instead of size jumps:** UI uses three weights (light, regular, medium); `--font-weight-bold` exists in the primitives but no text style uses it. Hierarchy comes from medium versus regular at similar sizes.
- **Light for big, medium for small:** display text is light to stay elegant, and interactive labels are medium to stay legible at small sizes.
- **Letter-spacing:** every style uses the default tracking (0); there is no uppercase-tracked eyebrow style.
- **Principles:** optimise for readability, create visual harmony, and contextualise for different users and operating systems.

---

## 5. Component Stylings

Shared mechanics that apply to every component below:
- **Shape:** sharp (`--radius-none`), rounded (`--radius-element-sm`) and, for buttons, chips and fields, full (`--radius-pill`). **Rounded is the default for every component.** Containers use `--radius-container`. Sharp components use sharp icons.
- **AAA is sharp:** under `[data-contrast="aaa"]` every component renders sharp, whatever its Shape setting, and its icons switch to the sharp set. `scripts/tokens-css.py` does this centrally (tokens.css block 8): every shape-variant radius token (`*-radius-rounded`, `*-radius-round`, `*-radius-full`) and every plain corner radius resolves to `--radius-none`. **Meaningful circles stay round**: a radio ring, switch track, avatar, indicator and stepper dots, the scrollbar handle. They reference `--radius-pill` under a non-shape token name, so a component that needs a true circle names its token `<component>-<part>-radius` and points it at `radius-pill`.
- **Flavours:** primary, positive, negative, contrast, gradient, outline, outline-subtle, outline-contrast, text, text-gradient and subtle (see [Button](atoms/button.md)).
  - Filled flavours step their own fill: `default` → `strong` on hover → `deep` on press, with `--color-brand-primary-on` text.
  - Outline flavours keep their stroke and shift a neutral fill underneath (`--color-fill-faint` / `--color-fill-sunken`). Ghost flavours raise a transparent tint (`--color-status-ghost-faint` / `--color-status-ghost-deep`).
- **Focus:** a `--stroke-thick` solid ring in `--color-line-focus`, drawn outside the control and always visible on `:focus-visible`.
- **Disabled:** `--color-fill-disabled` fill (or transparent for ghost flavours), `--color-ink-disabled` text and a not-allowed cursor.
- **Sizes:** most controls ship small, medium (default) and large, at the control heights `--control-sm`, `--control-md` and `--control-lg`. Icons inside controls use `--control-icon-sm` at small and `--control-icon-md` otherwise.
- **Motion:** short and functional: colour tints over `--motion-smooth`, springy movement over `--motion-spring`, and the durations `--motion-instant` … `--motion-slower` with `--easing-standard` / `--easing-out`. There is no decorative animation.

### Buttons → [atoms/button.md](atoms/button.md), [atoms/icon-button.md](atoms/icon-button.md), [atoms/fab.md](atoms/fab.md), [molecules/button-group.md](molecules/button-group.md), [molecules/segmented-control.md](molecules/segmented-control.md)
Buttons are crisp rectangles with `--radius-element-sm` corners, set in `--type-label-large`, with optional leading and trailing icons. Primary is solid `--color-brand-primary-default` with `--color-brand-primary-on` text. Outline uses a thin `--color-brand-primary-default` stroke on white. Text buttons have no container. Contrast is near-black on light pages and near-white on dark; gradient carries the promotional gradient. Icon buttons are the square, label-less version; FABs float as circles or extended pills.

### Cards & Containers → [molecules/card.md](molecules/card.md), [molecules/accordion.md](molecules/accordion.md), [organisms/dialog.md](organisms/dialog.md), [organisms/bottom-sheet.md](organisms/bottom-sheet.md), [organisms/lightbox.md](organisms/lightbox.md)
Cards are `--color-fill-default` panels with a `--stroke-thin` `--color-line-default` hairline and `--radius-container` corners, divided into header, body and footer; a collapsible card adds an expand caret and an optional gradient border. They are flat by default. Shadows (`--shadow-small` … `--shadow-large`) appear only on floating layers: menus, tooltips, dialogs, sheets and drawers. Dialogs and sheets sit over the `--color-fill-scrim` barrier (see [Scrim](atoms/scrim.md)).

### Navigation → [organisms/global-header.md](organisms/global-header.md), [organisms/top-app-bar.md](organisms/top-app-bar.md), [organisms/screen-header-bar.md](organisms/screen-header-bar.md), [organisms/navigation-rail.md](organisms/navigation-rail.md), [organisms/navigation-drawer.md](organisms/navigation-drawer.md), [organisms/navigation-bar.md](organisms/navigation-bar.md), [molecules/tab-bar.md](molecules/tab-bar.md), [molecules/breadcrumb.md](molecules/breadcrumb.md), [molecules/pagination.md](molecules/pagination.md)
- **Global Header** and **Navigation Rail** are locked to dark mode (they always render with the `colors-dark` values).
- **Top App Bar:** the in-screen bar, with a leading control, a title and trailing actions.
- **Tab Bar:** the selected tab gets a `--stroke-thick` `--color-line-selection` underline.
- **Navigation Bar:** the bottom bar of icon-and-label destinations on handhelds; **Navigation Drawer** slides in from the side.

### Inputs & Forms → [molecules/input.md](molecules/input.md) (text, number, password, date and time types), [molecules/select.md](molecules/select.md), [molecules/phone-input.md](molecules/phone-input.md), [molecules/search.md](molecules/search.md), [molecules/stepper-input.md](molecules/stepper-input.md), [atoms/checkbox.md](atoms/checkbox.md), [atoms/radio-button.md](atoms/radio-button.md), [atoms/switch.md](atoms/switch.md), [atoms/slider.md](atoms/slider.md)
Fields are `--color-fill-default` boxes with a `--stroke-thin` `--color-line-default` outline and `--radius-element-sm` corners.
- An [Input Label](atoms/input-label.md) sits above the field and an [Input Hint](atoms/input-hint.md) below; in the error state the hint becomes `--color-status-error-default` text.
- Hover strengthens the outline to `--color-line-strong`, and focus adds the `--color-line-focus` ring.
- Checkbox, radio and switch take on `--color-brand-primary-default` when on.

### Feedback & Status → [molecules/snackbar.md](molecules/snackbar.md), [molecules/inline-banner.md](molecules/inline-banner.md), [molecules/system-banner.md](molecules/system-banner.md), [atoms/status-label.md](atoms/status-label.md), [atoms/label.md](atoms/label.md), [atoms/notification-indicator.md](atoms/notification-indicator.md), [atoms/icon-indicator.md](atoms/icon-indicator.md), [atoms/progress-bar.md](atoms/progress-bar.md), [molecules/progress-circle.md](molecules/progress-circle.md), [molecules/empty-state.md](molecules/empty-state.md)
Status always uses the token family: a tinted `faint` fill, a coloured `default` stroke and a coloured icon plus text.
- **Inline banners** sit inside the page, one at a time.
- **System banners** are full-width solid strips in the status's `default` fill with always-white text (dark text on warning).
- **Snackbars** sit at the bottom of the screen: an inverse toast by default, tinted for statuses.
- **Indicators** are small counts (99+ cap) or icons pinned to avatars and icons.

### Domain-specific (Zebra frontline) → [molecules/comms-buttons.md](molecules/comms-buttons.md), [organisms/dial-pad.md](organisms/dial-pad.md), [organisms/voice-call-popup.md](organisms/voice-call-popup.md), [molecules/message-input.md](molecules/message-input.md), [atoms/priority-pill.md](atoms/priority-pill.md), [organisms/gantt-view.md](organisms/gantt-view.md)
These cover push-to-talk and voice workflows: round comms buttons (call, video, mute), a dial pad with a quick-dial security action, voice recording inside the message input and call pop-ups. Task priority uses pills with a level index. Shift and task scheduling uses a Gantt view.

---

## 6. Layout Principles

### Grid & Structure
- **4px base:** all boxes, margins, padding, icon sizes and line-heights come from the `scale-*` steps through the size tokens; the base unit is `--grid-unit`.
- **Column grid** of `--grid-columns` columns, fluid, sized in `fr` units, inside a `--container-default` maximum width.
- **Outer margins** are `--space-page` on handhelds and `--grid-margin` on large screens, fixed within a breakpoint even when columns are fluid; `--space-gutter` separates columns.
- **Sizing scale:** fixed sizes are size tokens (`--control-*`, `--space-*`) and fluid sizes are column widths. Boxes are often hybrid: a fixed height with a fluid width.
- **Aspect ratios:** only the set listed in `--aspect-ratios`.

### Whitespace Strategy
- The spacing scale runs from `--space-3xs` to `--space-5xl`, with role tokens `--space-card` (inside cards), `--space-section` (between sections) and `--space-page`. Component internals mostly use `--space-2xs` to `--space-lg`, and sections use `--space-xl` to `--space-4xl`. Negative steps (`--space-neg-xs` … `--space-neg-xl`) overlap elements such as avatar stacks.
- Vertical rhythm is built by adding fixed-scale margins to the top or bottom of boxes.
- Density is moderate: comfortable for touch, but tight enough for operational tables and lists.

### Alignment & Visual Balance
- Content is left-aligned (start-aligned) by default. Centring is an opt-in for app bars, banners, sheet headers and dialogs.
- Leading and trailing regions are a universal pattern (menu items, app bars, inputs, buttons).
- Icons and marks inside a container (checkbox marks, icon-button glyphs, avatar and indicator content) are perfectly centred in it, horizontally and vertically (see `atoms/icon.md`).
- Monochrome layouts with one blue focal point per view.

### Responsive Behavior & Touch
- **Touch targets:** a minimum of `--control-target-min`. Hit areas are enforced with min-height and min-width rather than padding alone; controls smaller than the minimum (small buttons, small icon buttons) need surrounding hit area on touch UIs.
- **Breakpoint:** the documented mobile breakpoint is `--breakpoint-mobile-max`.
- **Contrast:** the palette meets WCAG AA in the default modes and AAA in the AAA modes. Don't add opacity to text.
- **Focus** is never suppressed. Icon-only controls need an accessible label.
- **Adaptive navigation:** the global header and navigation rail are used on large screens, the top app bar, navigation bar and bottom sheet on handhelds.

---

## 7. Design System Notes for Stitch Generation

### Language to Use
"Clean enterprise UI on a crisp white canvas with cool blue-grey neutrals; graphite text in IBM Plex Sans; a single vivid Zebra-blue accent for primary actions; lightly rounded rectangles with hairline grey borders; soft shadows only on floating layers; strict 4px grid; calm, functional, accessible; status shown with tinted surfaces plus coloured icon and label."

### Color References
Resolve each token from the frontmatter `colors` group (then its primitive):
- Zebra Blue `--color-brand-primary-default` (primary action, selection) → hover `--color-brand-primary-strong` → pressed `--color-brand-primary-deep`
- Paper White `--color-fill-default` components · Frost canvas `--color-fill-canvas` · Mist `--color-fill-faint` hover
- Graphite `--color-ink-high` text · Slate `--color-ink-medium` secondary · Pewter `--color-ink-disabled` disabled
- Border Grey `--color-line-default` · Divider `--color-line-subtle`
- Night Ink `--color-fill-inverse` for tooltips, contrast buttons and snackbars
- Evergreen `--color-status-success-default` · Amber Ochre `--color-status-warning-default` · Alarm Red `--color-status-error-default` · Electric Blue `--color-status-info-default`

### Component Prompts
Substitute the frontmatter values when sending these prompts to Stitch.
1. *"A dark global header bar on `--color-fill-default` (dark mode). On the left: the Zebra logo, the platform name and four text menu items in `--color-ink-high` `--type-label-medium`. On the right: a search field, three icon buttons, and a small circular avatar with initials and the user's name."*
2. *"A form card on `--color-fill-default` with a `--stroke-thin` `--color-line-default` border, `--radius-container` corners and `--space-card` padding. A 'Site details' title in `--type-title-large` `--color-ink-high`, then three stacked medium inputs, each with a label above, an outlined field and a `--type-body-xsmall` `--color-ink-medium` hint below. One field shows the error state with a `--color-status-error-default` border and hint. Footer: a right-aligned 'Cancel' outline button and a 'Save' solid `--color-brand-primary-default` button."*
3. *"A dense task list. Each row has a medium avatar on the left, a `--type-title-medium` title and a `--type-body-small` `--color-ink-medium` subtitle. On the right of each row: a priority pill and a chevron. Rows are separated by `--color-line-subtle` dividers and hover to `--color-fill-faint`."*

### Incremental Iteration
- Start monochrome (white, greys, graphite), then add blue **only** to the one primary action or selected state per region.
- When adding status, use the `faint` tint as the background, the coloured `default` hairline and a coloured icon, and keep the text `--color-ink-high`.
- Keep every control radius at `--radius-element-sm` and containers at `--radius-container`, unless the element is a pill (chips, avatars, full buttons → `--radius-pill`).
- If something looks heavy, remove shadows before removing borders; the system prefers hairlines.
- For the dark and AAA themes, swap to the `colors-dark` / `colors-aaa` / `colors-aaa-dark` values of the same tokens. Don't invent new hues.

---

## 8. Component Index (atomic)

Each file contains a `tokens:` block (its component tokens, see §2) followed by anatomy, variants, states, spacing & sizing, properties, usage, accessibility and a Stitch prompt. Files marked † are **draft** (`status: draft`): their purpose, anatomy and composition are defined, but their measurements are still to be confirmed. Most drafts have no Figma source yet; the rest have only a thin one.

### Atoms: [`atoms/`](atoms/)
| Group | Components |
|---|---|
| Actions | [button](atoms/button.md) · [icon-button](atoms/icon-button.md) · [fab](atoms/fab.md)† |
| Selection | [checkbox](atoms/checkbox.md) · [radio-button](atoms/radio-button.md) · [switch](atoms/switch.md) · [slider](atoms/slider.md) · [assist-chip](atoms/assist-chip.md) · [filter-chip](atoms/filter-chip.md) |
| Identity & marks | [icon](atoms/icon.md) · [avatar](atoms/avatar.md) · [notification-indicator](atoms/notification-indicator.md) · [icon-indicator](atoms/icon-indicator.md) · [caret-indicator](atoms/caret-indicator.md)† |
| Status | [label](atoms/label.md) · [status-label](atoms/status-label.md) · [priority-pill](atoms/priority-pill.md) · [tag](atoms/tag.md)† · [progress-bar](atoms/progress-bar.md) · [tooltip](atoms/tooltip.md) |
| Form parts | [input-label](atoms/input-label.md)† · [input-hint](atoms/input-hint.md)† |
| Structure | [divider](atoms/divider.md) · [scrim](atoms/scrim.md) · [scrollbar](atoms/scrollbar.md) |

### Molecules: [`molecules/`](molecules/)
| Group | Components |
|---|---|
| Actions | [button-group](molecules/button-group.md) · [segmented-control](molecules/segmented-control.md) · [dropdown-menu](molecules/dropdown-menu.md) · [menu-item](molecules/menu-item.md) · [comms-buttons](molecules/comms-buttons.md)† |
| Inputs | [input](molecules/input.md) · [select](molecules/select.md) · [phone-input](molecules/phone-input.md) · [search](molecules/search.md) · [stepper-input](molecules/stepper-input.md) · [slider-input-field](molecules/slider-input-field.md)† · [input-chip](molecules/input-chip.md) · [message-input](molecules/message-input.md) |
| Navigation | [tab-bar](molecules/tab-bar.md) · [breadcrumb](molecules/breadcrumb.md) · [pagination](molecules/pagination.md) · [navigation-header](molecules/navigation-header.md)† · [sub-menu-item](molecules/sub-menu-item.md) |
| Containers | [card](molecules/card.md) · [accordion](molecules/accordion.md) |
| Lists | [notification-item](molecules/notification-item.md) · [upload-item](molecules/upload-item.md)† · [avatar-rail](molecules/avatar-rail.md) · [chat-list-item](molecules/chat-list-item.md)† · [contact-list-item](molecules/contact-list-item.md)† |
| Feedback | [snackbar](molecules/snackbar.md) · [inline-banner](molecules/inline-banner.md) · [system-banner](molecules/system-banner.md) · [progress-circle](molecules/progress-circle.md) · [empty-state](molecules/empty-state.md)† · [filter-selection-bar](molecules/filter-selection-bar.md)† |

### Organisms: [`organisms/`](organisms/)
| Group | Components |
|---|---|
| Overlays | [dialog](organisms/dialog.md) · [bottom-sheet](organisms/bottom-sheet.md) · [lightbox](organisms/lightbox.md) · [file-upload](organisms/file-upload.md)† · [right-drawer-panel](organisms/right-drawer-panel.md)† · [voice-call-popup](organisms/voice-call-popup.md)† |
| App chrome | [global-header](organisms/global-header.md) · [top-app-bar](organisms/top-app-bar.md) · [screen-header-bar](organisms/screen-header-bar.md) · [navigation-rail](organisms/navigation-rail.md) · [navigation-drawer](organisms/navigation-drawer.md) · [navigation-bar](organisms/navigation-bar.md) |
| Data & flow | [table](organisms/table.md) · [stepper](organisms/stepper.md) · [gantt-view](organisms/gantt-view.md)† · [date-picker](organisms/date-picker.md)† · [vertical-speed-scroller](organisms/vertical-speed-scroller.md)† |
| Communication | [chat](organisms/chat.md)† · [dial-pad](organisms/dial-pad.md)† |

---

## 9. Governance
- **Tokens are the source of truth.** Every visual value is defined once in this file's frontmatter, converted from the Figma *primitives*, *palette*, *size* and *typography* collections. Components and screens reference tokens by name and never restate raw values.
- **Never hard-code** colour, spacing, radius, shadow or typography values. Use semantic tokens (`--color-fill-*`, `--color-ink-*`, `--color-line-*`, `--color-brand-*`, `--color-status-*`, `--space-*`, `--control-*`, `--radius-*`, `--stroke-*`, and typography tokens such as `--type-label-large`). Hard-coded values break light/dark and AA/AAA theming.
- **Shape:** rounded is the default for every component; the AAA modes are always sharp (§5). Don't override a component's radius to keep it rounded in AAA.
- **Primitives are never used directly** in screens. Components use them only for an exact `scale-*` measurement (see §2).
- **New design requests** are reviewed with three questions: does a component already exist, does it meet the requirements, and is it extensible beyond this project? The outcome is either a project "snowflake", a modification of an existing component, or a new design-system component.
- **Draft components** (†) must have their measurements confirmed (in Figma, then as component tokens) before they are used in production designs.
- **Icons** come from the Zebra Icons library (see `icons` in the frontmatter and [atoms/icon.md](atoms/icon.md)).
