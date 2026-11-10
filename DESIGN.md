---
name: Zebra Design System
version: '2026-11-05'
icons: "Zebra Icons 1.9.8 (zeta-icons-round / zeta-icons-sharp), package @zebra-fed/zeta-icons"
# ── TOKEN ARCHITECTURE ──────────────────────────────────────────────────────────
# Three layers, strictly one-directional:
#   1. primitives / primitives-dark ......... raw colour ramps (only semantic colours use them)
#   2. semantic groups (this frontmatter) ... colors (+ colors-dark, colors-high-contrast: same
#      keys per mode), spacing, rounded, border, elevation, font-family, font-weight,
#      typography, motion, layout, opacity, plus `dimensions` (raw component measurements)
#   3. component tokens ..................... a `tokens:` block in each atoms/ molecules/
#      organisms/ file, holding references only: '{group.key}' (e.g. '{colors.state-primary-hover}')
#      or, for components listed in `composes`, '{child.token}' (e.g. '{icon-button.icon-button-…}')
# Raw values (hex, px, ms, %, weights) live ONLY in this frontmatter.
# In prose a token is written `--<key>`. A component file cites its own tokens and the tokens of
# the components it composes.
# ───────────────────────────────────────────────────────────────────────────────
roles:  # Material-style aliases for Stitch tooling → value of the named Zebra token
  background: '#ffffff'          # surface-default
  on-background: '#1d1e23'       # main-default
  primary: '#0073e6'             # state-primary-enabled
  on-primary: '#ffffff'          # state-default-enabled
  primary-container: '#f1f8ff'   # surface-primary-subtle
  secondary: '#8d7400'           # main-secondary
  error: '#d70015'               # main-negative
  error-container: '#fff0f1'     # surface-negative-subtle
  outline: '#ced2db'             # border-default
  outline-variant: '#e0e3e9'     # border-subtle
  inverse-surface: '#151519'     # surface-default-inverse
  inverse-on-surface: '#f3f6fa'  # main-inverse
colors:  # semantic colour tokens, light mode, standard contrast (use these names everywhere)
  main-default: '#1d1e23'
  main-subtle: '#545963'
  main-primary: '#0073e6'
  main-secondary: '#8d7400'
  main-positive: '#00864f'
  main-warning: '#ae6500'
  main-negative: '#d70015'
  main-info: '#7e0cff'
  main-disabled: '#8d95a3'
  main-light: '#e0e3e9'
  main-inverse: '#f3f6fa'
  border-default: '#ced2db'
  border-selected: '#1d1e23'
  border-hover: '#1d1e23'
  border-subtle: '#e0e3e9'
  border-disabled: '#f3f6fa'
  border-pure: '#fff'
  border-primary-main: '#0073e6'
  border-primary: '#599fe5'
  border-secondary: '#c2a728'
  border-positive: '#67b796'
  border-warning: '#d78d26'
  border-negative: '#f36170'
  border-info: '#9b71df'
  surface-default: '#fff'
  surface-default-inverse: '#151519'
  surface-hover: '#f3f6fa'
  surface-selected: '#f1f8ff'
  surface-selected-hover: '#e2f1ff'
  surface-disabled: '#e0e3e9'
  surface-cool: '#f8fbff'
  surface-warm: '#fafafa'
  surface-primary: '#0073e6'
  surface-primary-subtle: '#f1f8ff'
  surface-secondary: '#8d7400'
  surface-secondary-subtle: '#fff7d4'
  surface-positive: '#00864f'
  surface-positive-subtle: '#ecfff7'
  surface-warning: '#ae6500'
  surface-warning-subtle: '#fef2e2'
  surface-negative: '#d70015'
  surface-negative-subtle: '#fff0f1'
  surface-info: '#7e0cff'
  surface-info-subtle: '#f7f0ff'
  state-disabled-disabled: '#e0e3e9'
  state-default-enabled: '#fff'
  state-default-hover: '#f3f6fa'
  state-default-selected: '#f1f8ff'
  state-default-focus: '#fff'
  state-primary-enabled: '#0073e6'
  state-primary-hover: '#599fe5'
  state-primary-selected: '#0061c2'
  state-primary-focus: '#0073e6'
  state-negative-enabled: '#d70015'
  state-negative-hover: '#f36170'
  state-negative-selected: '#b50012'
  state-negative-focus: '#d70015'
  state-secondary-enabled: '#dbb91c'
  state-secondary-hover: '#f3d961'
  state-secondary-selected: '#c2a728'
  state-secondary-focus: '#dbb91c'
  state-info-enabled: '#7e0cff'
  state-info-hover: '#9b71df'
  state-info-selected: '#6400d6'
  state-info-focus: '#7e0cff'
  state-inverse-enabled: '#0c0d0e'
  state-inverse-hover: '#1d1e23'
  state-inverse-selected: '#0c0d0e'
  state-inverse-focus: '#0c0d0e'
  state-positive-enabled: '#00864f'
  state-positive-hover: '#67b796'
  state-positive-selected: '#006d3f'
  state-positive-focus: '#00864f'
  chart-1-primary: '#0073e6'
  chart-1-secondary: '#7ebeff'
  chart-2-primary: '#00864f'
  chart-2-secondary: '#84dab6'
  chart-3-primary: '#d78d26'
  chart-3-secondary: '#ffd292'
  chart-4-primary: '#d70015'
  chart-4-secondary: '#f98c97'
  chart-5-primary: '#7e0cff'
  chart-5-secondary: '#cea4ff'
  chart-6-primary: '#1a8080'
  chart-6-secondary: '#91e1e1'
  chart-7-primary: '#d30589'
  chart-7-secondary: '#ff94d8'
  chart-8-primary: '#1d1e23'
  chart-8-secondary: '#545963'
  avatar-blue: '#004d99'
  avatar-green: '#00864f'
  avatar-orange: '#d78d26'
  avatar-pink: '#840054'
  avatar-purple: '#43008f'
  avatar-teal: '#005b5b'
  avatar-yellow: '#c2a728'
  surface-overlay: 'rgba(0,0,0,.3)'
  surface-basic: 'transparent'
colors-dark:  # same semantic names resolved against the inverted dark primitives
  main-default: '#f3f6fa'
  main-subtle: '#bbc1cb'
  main-primary: '#599fe5'
  main-secondary: '#c2a728'
  main-positive: '#67b796'
  main-warning: '#d78d26'
  main-negative: '#f36170'
  main-info: '#9b71df'
  main-disabled: '#7a8190'
  main-light: '#2c2f36'
  main-inverse: '#1d1e23'
  border-default: '#545963'
  border-selected: '#f3f6fa'
  border-hover: '#f3f6fa'
  border-subtle: '#2c2f36'
  border-disabled: '#1d1e23'
  border-pure: '#151519'
  border-primary-main: '#599fe5'
  border-primary: '#0073e6'
  border-secondary: '#8d7400'
  border-positive: '#00864f'
  border-warning: '#ae6500'
  border-negative: '#d70015'
  border-info: '#7e0cff'
  surface-default: '#151519'
  surface-default-inverse: '#fafafa'
  surface-hover: '#1d1e23'
  surface-selected: '#101b25'
  surface-selected-hover: '#002c58'
  surface-disabled: '#2c2f36'
  surface-cool: '#0c0d0e'
  surface-warm: '#151519'
  surface-primary: '#599fe5'
  surface-primary-subtle: '#101b25'
  surface-secondary: '#c2a728'
  surface-secondary-subtle: '#181400'
  surface-positive: '#67b796'
  surface-positive-subtle: '#081711'
  surface-warning: '#d78d26'
  surface-warning-subtle: '#1e1100'
  surface-negative: '#f36170'
  surface-negative-subtle: '#220f11'
  surface-info: '#9b71df'
  surface-info-subtle: '#180f22'
  state-disabled-disabled: '#2c2f36'
  state-default-enabled: '#151519'
  state-default-hover: '#1d1e23'
  state-default-selected: '#101b25'
  state-default-focus: '#151519'
  state-primary-enabled: '#599fe5'
  state-primary-hover: '#0073e6'
  state-primary-selected: '#7ebeff'
  state-primary-focus: '#599fe5'
  state-negative-enabled: '#f36170'
  state-negative-hover: '#d70015'
  state-negative-selected: '#f98c97'
  state-negative-focus: '#f36170'
  state-secondary-enabled: '#766200'
  state-secondary-hover: '#564908'
  state-secondary-selected: '#8d7400'
  state-secondary-focus: '#766200'
  state-info-enabled: '#9b71df'
  state-info-hover: '#7e0cff'
  state-info-selected: '#cea4ff'
  state-info-focus: '#9b71df'
  state-inverse-enabled: '#f8fbff'
  state-inverse-hover: '#f3f6fa'
  state-inverse-selected: '#f8fbff'
  state-inverse-focus: '#f8fbff'
  state-positive-enabled: '#67b796'
  state-positive-hover: '#00864f'
  state-positive-selected: '#84dab6'
  state-positive-focus: '#67b796'
  chart-1-primary: '#599fe5'
  chart-1-secondary: '#0061c2'
  chart-2-primary: '#67b796'
  chart-2-secondary: '#006d3f'
  chart-3-primary: '#ae6500'
  chart-3-secondary: '#764502'
  chart-4-primary: '#f36170'
  chart-4-secondary: '#b50012'
  chart-5-primary: '#9b71df'
  chart-5-secondary: '#6400d6'
  chart-6-primary: '#65c4c4'
  chart-6-secondary: '#017474'
  chart-7-primary: '#ee78c3'
  chart-7-secondary: '#ab006d'
  chart-8-primary: '#f3f6fa'
  chart-8-secondary: '#bbc1cb'
  avatar-blue: '#b7dbff'
  avatar-green: '#67b796'
  avatar-orange: '#ae6500'
  avatar-pink: '#ffbee7'
  avatar-purple: '#dcc1fb'
  avatar-teal: '#bcfbfb'
  avatar-yellow: '#8d7400'
colors-high-contrast:  # high-contrast mode, light
  main-default: '#0c0d0e'
  main-subtle: '#1d1e23'
  main-primary: '#004d99'
  main-secondary: '#564908'
  main-positive: '#005f38'
  main-warning: '#764502'
  main-negative: '#8f000e'
  main-info: '#43008f'
  main-disabled: '#7a8190'
  main-light: '#fff'
  main-inverse: '#fff'
  border-default: '#0c0d0e'
  border-selected: '#1d1e23'
  border-hover: '#1d1e23'
  border-subtle: '#2c2f36'
  border-disabled: '#f3f6fa'
  border-pure: '#fff'
  border-primary-main: '#004d99'
  border-primary: '#0061c2'
  border-secondary: '#766200'
  border-positive: '#006d3f'
  border-warning: '#965802'
  border-negative: '#b50012'
  border-info: '#6400d6'
  surface-default: '#fff'
  surface-default-inverse: '#151519'
  surface-hover: '#f3f6fa'
  surface-selected: '#f1f8ff'
  surface-selected-hover: '#e2f1ff'
  surface-disabled: '#e0e3e9'
  surface-cool: '#f8fbff'
  surface-warm: '#fafafa'
  surface-primary: '#004d99'
  surface-primary-subtle: '#f1f8ff'
  surface-secondary: '#564908'
  surface-secondary-subtle: '#fff7d4'
  surface-positive: '#005f38'
  surface-positive-subtle: '#ecfff7'
  surface-warning: '#764502'
  surface-warning-subtle: '#fef2e2'
  surface-negative: '#8f000e'
  surface-negative-subtle: '#fff0f1'
  surface-info: '#43008f'
  surface-info-subtle: '#f7f0ff'
  state-disabled-disabled: '#e0e3e9'
  state-default-enabled: '#fff'
  state-default-hover: '#f3f6fa'
  state-default-selected: '#f1f8ff'
  state-default-focus: '#fff'
  state-primary-enabled: '#004d99'
  state-primary-hover: '#0061c2'
  state-primary-selected: '#002c58'
  state-primary-focus: '#004d99'
  state-negative-enabled: '#8f000e'
  state-negative-hover: '#b50012'
  state-negative-selected: '#520008'
  state-negative-focus: '#8f000e'
  state-secondary-enabled: '#564908'
  state-secondary-hover: '#766200'
  state-secondary-selected: '#352b00'
  state-secondary-focus: '#564908'
  state-info-enabled: '#43008f'
  state-info-hover: '#6400d6'
  state-info-selected: '#260052'
  state-info-focus: '#43008f'
  state-inverse-enabled: '#151519'
  state-inverse-hover: '#1d1e23'
  state-inverse-selected: '#151519'
  state-inverse-focus: '#151519'
  state-positive-enabled: '#005f38'
  state-positive-hover: '#006d3f'
  state-positive-selected: '#00331e'
  state-positive-focus: '#005f38'
  chart-1-primary: '#002c58'
  chart-1-secondary: '#0061c2'
  chart-2-primary: '#00331e'
  chart-2-secondary: '#006d3f'
  chart-3-primary: '#402600'
  chart-3-secondary: '#965802'
  chart-4-primary: '#520008'
  chart-4-secondary: '#b50012'
  chart-5-primary: '#260052'
  chart-5-secondary: '#6400d6'
  chart-6-primary: '#003535'
  chart-6-secondary: '#017474'
  chart-7-primary: '#640040'
  chart-7-secondary: '#ab006d'
  chart-8-primary: '#1d1e23'
  chart-8-secondary: '#545963'
  avatar-blue: '#004d99'
  avatar-green: '#00864f'
  avatar-orange: '#d78d26'
  avatar-pink: '#840054'
  avatar-purple: '#43008f'
  avatar-teal: '#005b5b'
  avatar-yellow: '#c2a728'
primitives:  # light-mode ramps; reference only — never use directly
  color-pure-0: '#fff'
  color-pure-500: '#151519'
  color-pure-1000: '#151519'
  color-cool-10: '#f8fbff'
  color-cool-20: '#f3f6fa'
  color-cool-30: '#e0e3e9'
  color-cool-40: '#ced2db'
  color-cool-50: '#8d95a3'
  color-cool-60: '#7a8190'
  color-cool-70: '#545963'
  color-cool-80: '#2c2f36'
  color-cool-90: '#1d1e23'
  color-cool-100: '#0c0d0e'
  color-warm-10: '#fafafa'
  color-warm-20: '#f6f6f6'
  color-warm-30: '#ececec'
  color-warm-40: '#dedede'
  color-warm-50: '#b9b9b9'
  color-warm-60: '#858585'
  color-warm-70: '#585858'
  color-warm-80: '#313131'
  color-warm-90: '#1d1e23'
  color-warm-100: '#151519'
  color-blue-10: '#f1f8ff'
  color-blue-20: '#e2f1ff'
  color-blue-30: '#b7dbff'
  color-blue-40: '#7ebeff'
  color-blue-50: '#599fe5'
  color-blue-60: '#0073e6'
  color-blue-70: '#0061c2'
  color-blue-80: '#004d99'
  color-blue-90: '#002c58'
  color-blue-100: '#101b25'
  color-green-10: '#ecfff7'
  color-green-20: '#d8ffef'
  color-green-30: '#beefdb'
  color-green-40: '#84dab6'
  color-green-50: '#67b796'
  color-green-60: '#00864f'
  color-green-70: '#006d3f'
  color-green-80: '#005f38'
  color-green-90: '#00331e'
  color-green-100: '#081711'
  color-red-10: '#fff0f1'
  color-red-20: '#ffe1e4'
  color-red-30: '#ffb3bb'
  color-red-40: '#f98c97'
  color-red-50: '#f36170'
  color-red-60: '#d70015'
  color-red-70: '#b50012'
  color-red-80: '#8f000e'
  color-red-90: '#520008'
  color-red-100: '#220f11'
  color-orange-10: '#fef2e2'
  color-orange-20: '#ffe7c6'
  color-orange-30: '#ffd292'
  color-orange-40: '#ffb348'
  color-orange-50: '#d78d26'
  color-orange-60: '#ae6500'
  color-orange-70: '#965802'
  color-orange-80: '#764502'
  color-orange-90: '#402600'
  color-orange-100: '#1e1100'
  color-purple-10: '#f7f0ff'
  color-purple-20: '#efe1ff'
  color-purple-30: '#dcc1fb'
  color-purple-40: '#cea4ff'
  color-purple-50: '#9b71df'
  color-purple-60: '#7e0cff'
  color-purple-70: '#6400d6'
  color-purple-80: '#43008f'
  color-purple-90: '#260052'
  color-purple-100: '#180f22'
  color-yellow-10: '#fff7d4'
  color-yellow-20: '#ffea89'
  color-yellow-30: '#f3d961'
  color-yellow-40: '#dbb91c'
  color-yellow-50: '#c2a728'
  color-yellow-60: '#8d7400'
  color-yellow-70: '#766200'
  color-yellow-80: '#564908'
  color-yellow-90: '#352b00'
  color-yellow-100: '#181400'
  color-teal-10: '#ecffff'
  color-teal-20: '#d9ffff'
  color-teal-30: '#bcfbfb'
  color-teal-40: '#91e1e1'
  color-teal-50: '#65c4c4'
  color-teal-60: '#1a8080'
  color-teal-70: '#017474'
  color-teal-80: '#005b5b'
  color-teal-90: '#003535'
  color-teal-100: '#0a1616'
  color-pink-10: '#fff7fc'
  color-pink-20: '#ffe3f5'
  color-pink-30: '#ffbee7'
  color-pink-40: '#ff94d8'
  color-pink-50: '#ee78c3'
  color-pink-60: '#d30589'
  color-pink-70: '#ab006d'
  color-pink-80: '#840054'
  color-pink-90: '#640040'
  color-pink-100: '#2e001e'
primitives-dark:
  color-pure-0: '#151519'
  color-pure-500: '#1d1e23'
  color-pure-1000: '#fff'
  color-cool-10: '#0c0d0e'
  color-cool-20: '#1d1e23'
  color-cool-30: '#2c2f36'
  color-cool-40: '#545963'
  color-cool-50: '#7a8190'
  color-cool-60: '#8d95a3'
  color-cool-70: '#bbc1cb'
  color-cool-80: '#e0e3e9'
  color-cool-90: '#f3f6fa'
  color-cool-100: '#f8fbff'
  color-warm-10: '#151519'
  color-warm-20: '#1d1e23'
  color-warm-30: '#313131'
  color-warm-40: '#585858'
  color-warm-50: '#858585'
  color-warm-60: '#b9b9b9'
  color-warm-70: '#dedede'
  color-warm-80: '#ececec'
  color-warm-90: '#f6f6f6'
  color-warm-100: '#fafafa'
  color-blue-10: '#101b25'
  color-blue-20: '#002c58'
  color-blue-30: '#004d99'
  color-blue-40: '#0061c2'
  color-blue-50: '#0073e6'
  color-blue-60: '#599fe5'
  color-blue-70: '#7ebeff'
  color-blue-80: '#b7dbff'
  color-blue-90: '#e2f1ff'
  color-blue-100: '#f1f8ff'
  color-green-10: '#081711'
  color-green-20: '#00331e'
  color-green-30: '#005f38'
  color-green-40: '#006d3f'
  color-green-50: '#00864f'
  color-green-60: '#67b796'
  color-green-70: '#84dab6'
  color-green-80: '#beefdb'
  color-green-90: '#d8ffef'
  color-green-100: '#ecfff7'
  color-red-10: '#220f11'
  color-red-20: '#520008'
  color-red-30: '#8f000e'
  color-red-40: '#b50012'
  color-red-50: '#d70015'
  color-red-60: '#f36170'
  color-red-70: '#f98c97'
  color-red-80: '#ffb3bb'
  color-red-90: '#ffe1e4'
  color-red-100: '#fff0f1'
  color-orange-10: '#1e1100'
  color-orange-20: '#402600'
  color-orange-30: '#764502'
  color-orange-40: '#965802'
  color-orange-50: '#ae6500'
  color-orange-60: '#d78d26'
  color-orange-70: '#ffb348'
  color-orange-80: '#ffd292'
  color-orange-90: '#ffe7c6'
  color-orange-100: '#fef2e2'
  color-purple-10: '#180f22'
  color-purple-20: '#260052'
  color-purple-30: '#43008f'
  color-purple-40: '#6400d6'
  color-purple-50: '#7e0cff'
  color-purple-60: '#9b71df'
  color-purple-70: '#cea4ff'
  color-purple-80: '#dcc1fb'
  color-purple-90: '#efe1ff'
  color-purple-100: '#f7f0ff'
  color-yellow-10: '#181400'
  color-yellow-20: '#352b00'
  color-yellow-30: '#564908'
  color-yellow-40: '#766200'
  color-yellow-50: '#8d7400'
  color-yellow-60: '#c2a728'
  color-yellow-70: '#dbb91c'
  color-yellow-80: '#f3d961'
  color-yellow-90: '#ffea89'
  color-yellow-100: '#fff7d4'
  color-teal-10: '#0a1616'
  color-teal-20: '#003535'
  color-teal-30: '#005b5b'
  color-teal-40: '#017474'
  color-teal-50: '#1a8080'
  color-teal-60: '#65c4c4'
  color-teal-70: '#91e1e1'
  color-teal-80: '#bcfbfb'
  color-teal-90: '#d9ffff'
  color-teal-100: '#ecffff'
  color-pink-10: '#2e001e'
  color-pink-20: '#640040'
  color-pink-30: '#840054'
  color-pink-40: '#ab006d'
  color-pink-50: '#d30589'
  color-pink-60: '#ee78c3'
  color-pink-70: '#ff94d8'
  color-pink-80: '#ffbee7'
  color-pink-90: '#ffe3f5'
  color-pink-100: '#fff7fc'
spacing:
  spacing-none: 0px
  spacing-minimum: 4px
  spacing-small: 8px
  spacing-medium: 12px
  spacing-large: 16px
  spacing-xl: 20px
  spacing-2xl: 24px
  spacing-3xl: 28px
  spacing-4xl: 32px
  spacing-5xl: 36px
  spacing-6xl: 40px
  spacing-7xl: 44px
  spacing-8xl: 48px
  spacing-9xl: 64px
  spacing-10xl: 80px
  spacing-11xl: 96px
  spacing-0-5: 2px  # half-step primitive
  spacing-1-5: 6px  # half-step primitive
  spacing-2-5: 10px  # half-step primitive
  spacing-3-5: 14px  # half-step primitive
  spacing-4-5: 18px  # half-step primitive
rounded:
  radius-none: 0px
  radius-minimal: 4px
  radius-rounded: 8px
  radius-large: 16px
  radius-xl: 24px
  radius-full: 360px
border:
  border-size-small: 1px
  border-size-medium: 2px
elevation:
  elevation-1: '0 .5px 2px 0 rgba(96,104,112,.16),0 0 1px 0 rgba(40,51,61,.08)'
  elevation-2: '0 2px 4px 0 rgba(96,104,112,.16),0 0 1px 0 rgba(40,51,61,.04)'
  elevation-3: '0 4px 8px 0 rgba(96,104,112,.16),0 0 2px 0 rgba(40,51,61,.04)'
  elevation-4: '0 8px 16px 0 rgba(96,104,112,.16),0 2px 4px 0 rgba(40,51,61,.04)'
  elevation-5: '0 16px 24px 0 rgba(96,104,112,.16),0 2px 8px 0 rgba(40,51,61,.04)'
  elevation-6: '0 20px 32px 0 rgba(96,104,112,.24),0 2px 8px 0 rgba(40,51,61,.08)'

font-family:
  type-family-regular: "'IBM Plex Sans', sans-serif"
  icon-family-round: zeta-icons-round
  icon-family-sharp: zeta-icons-sharp
font-weight:
  light: '300'
  regular: '400'
  medium: '500'
typography:  # h1=headline-large … h6=title-small, p=body-medium
  display-large: { fontFamily: IBM Plex Sans, fontSize: 52px, fontWeight: '300', lineHeight: 60px }
  display-medium: { fontFamily: IBM Plex Sans, fontSize: 44px, fontWeight: '300', lineHeight: 52px }
  display-small: { fontFamily: IBM Plex Sans, fontSize: 36px, fontWeight: '300', lineHeight: 40px }
  headline-large: { fontFamily: IBM Plex Sans, fontSize: 32px, fontWeight: '500', lineHeight: 36px }
  headline-medium: { fontFamily: IBM Plex Sans, fontSize: 28px, fontWeight: '500', lineHeight: 32px }
  headline-small: { fontFamily: IBM Plex Sans, fontSize: 24px, fontWeight: '500', lineHeight: 28px }
  title-large: { fontFamily: IBM Plex Sans, fontSize: 20px, fontWeight: '500', lineHeight: 24px }
  title-medium: { fontFamily: IBM Plex Sans, fontSize: 16px, fontWeight: '500', lineHeight: 20px }
  title-small: { fontFamily: IBM Plex Sans, fontSize: 12px, fontWeight: '500', lineHeight: 16px }
  body-large: { fontFamily: IBM Plex Sans, fontSize: 20px, fontWeight: '400', lineHeight: 24px }
  body-medium: { fontFamily: IBM Plex Sans, fontSize: 16px, fontWeight: '400', lineHeight: 24px }
  body-small: { fontFamily: IBM Plex Sans, fontSize: 14px, fontWeight: '400', lineHeight: 18px }
  body-x-small: { fontFamily: IBM Plex Sans, fontSize: 12px, fontWeight: '400', lineHeight: 16px }
  label-large: { fontFamily: IBM Plex Sans, fontSize: 16px, fontWeight: '500', lineHeight: 24px }
  label-medium: { fontFamily: IBM Plex Sans, fontSize: 14px, fontWeight: '500', lineHeight: 20px }
  label-small: { fontFamily: IBM Plex Sans, fontSize: 12px, fontWeight: '500', lineHeight: 16px }
  label-indicator: { fontFamily: IBM Plex Sans, fontSize: 12px, fontWeight: '500', lineHeight: 14px }
  h1: { alias: headline-large }
  h2: { alias: headline-medium }
  h3: { alias: headline-small }
  h4: { alias: title-large }
  h5: { alias: title-medium }
  h6: { alias: title-small }
motion:  # durations and easings for state changes and transitions
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
  touch-target-min: 24px
  touch-target-recommended: 48px
  touch-target-ios: 44px
  aspect-ratios: '1:1, 2:1, 2:3, 3:2, 4:3, 16:9'
opacity:
  opacity-hover-tint: '10%'
dimensions:  # raw component measurements; referenced ONLY by component tokens (in each component file)
  dim-accordion-header-height: 56px  # molecules/accordion.md
  dim-avatar-badge-border-scale: '2%'  # atoms/avatar.md
  dim-avatar-close-icon-scale: '30%'  # atoms/avatar.md
  dim-avatar-icon-scale: '50%'  # atoms/avatar.md
  dim-avatar-initials-scale: '40%'  # atoms/avatar.md
  dim-avatar-ring-scale: '5%'  # atoms/avatar.md
  dim-avatar-size-l: 64px  # atoms/avatar.md
  dim-avatar-size-m: 48px  # atoms/avatar.md
  dim-avatar-size-s: 40px  # atoms/avatar.md
  dim-avatar-size-xl: 80px  # atoms/avatar.md
  dim-avatar-size-xs: 36px  # atoms/avatar.md
  dim-avatar-size-xxl: 120px  # atoms/avatar.md
  dim-avatar-size-xxs: 32px  # atoms/avatar.md
  dim-avatar-size-xxxl: 200px  # atoms/avatar.md
  dim-avatar-size-xxxs: 24px  # atoms/avatar.md
  dim-bottom-sheet-grid-item-min-width: 46px  # organisms/bottom-sheet.md
  dim-bottom-sheet-max-height: 90vh  # organisms/bottom-sheet.md
  dim-button-group-item-height-large: 52px  # molecules/button-group.md
  dim-button-height-large: 48px  # atoms/button.md
  dim-button-height-medium: 40px  # atoms/button.md
  dim-button-height-small: 32px  # atoms/button.md
  dim-card-container-ai-gradient-end: '#ff40fc'  # atoms/card.md
  dim-card-container-ai-gradient-end-stop: '77%'  # atoms/card.md
  dim-card-container-ai-gradient-start: '#1f6aff'  # atoms/card.md
  dim-checkbox-radius: 2px  # atoms/checkbox.md
  dim-checkbox-size-large: 25px  # atoms/checkbox.md
  dim-checkbox-size-medium: 20px  # atoms/checkbox.md
  dim-checkbox-size-small: 15px  # atoms/checkbox.md
  dim-dialog-max-height: 80vh  # organisms/dialog.md
  dim-dialog-width: 480px  # organisms/dialog.md
  dim-empty-state-max-width: 375px  # molecules/empty-state.md
  dim-fab-height-extended: 40px  # atoms/fab.md
  dim-fab-size-large: 76px  # atoms/fab.md
  dim-fab-size-small: 48px  # atoms/fab.md
  dim-global-header-breakpoint-compact: 1440px  # organisms/global-header.md
  dim-global-header-height: 44px  # organisms/global-header.md
  dim-global-header-logo-height: 32px  # organisms/global-header.md
  dim-global-header-logo-svg-width: 76px  # organisms/global-header.md
  dim-global-header-logo-width: 80px  # organisms/global-header.md
  dim-list-item-height: 60px  # molecules/list-item.md
  dim-navigation-bar-item-width-shrink: 62px  # organisms/left-navigation-rail.md
  dim-navigation-drawer-max-width: 380px  # organisms/left-navigation-rail.md
  dim-navigation-drawer-min-width: 240px  # organisms/left-navigation-rail.md
  dim-navigation-drawer-width: '40%'  # organisms/left-navigation-rail.md
  dim-navigation-rail-item-max-width: 64px  # organisms/left-navigation-rail.md
  dim-pagination-page-height: 34px  # molecules/pagination.md
  dim-priority-pill-index-font-small: '500 10/14'  # atoms/priority-pill.md
  dim-priority-pill-text-font-small: '400 10/13'  # atoms/priority-pill.md
  dim-progress-bar-indeterminate-duration: 2s  # atoms/progress-bar.md
  dim-progress-bar-indeterminate-width: '30%'  # atoms/progress-bar.md
  dim-progress-circle-stroke-width: 3px  # atoms/progress-circle.md
  dim-radio-button-dot-size-large: 12px  # atoms/radio-button.md
  dim-radio-button-dot-size-medium: 10px  # atoms/radio-button.md
  dim-radio-button-dot-size-small: 6px  # atoms/radio-button.md
  dim-right-drawer-panel-max-width: 380px  # organisms/right-drawer-panel.md
  dim-right-drawer-panel-min-width: 240px  # organisms/right-drawer-panel.md
  dim-right-drawer-panel-width: '40%'  # organisms/right-drawer-panel.md
  dim-select-input-height-large: 50px  # molecules/select-input.md
  dim-select-input-height-medium: 42px  # molecules/select-input.md
  dim-select-input-height-small: 26px  # molecules/select-input.md
  dim-select-input-option-shadow: '0 2px 8px 0 rgba(99,99,99,.1)'  # molecules/select-input.md
  dim-slider-handle-hover-scale: 1.25  # molecules/range-selector.md, atoms/slider.md
  dim-slider-input-field-input-height: 48px  # molecules/range-selector.md
  dim-slider-input-field-input-width: 56px  # molecules/range-selector.md
  dim-status-label-dot-size: 8px  # atoms/status-label.md
  dim-status-label-height: 28px  # atoms/status-label.md
  dim-stepper-bar-height: 3px  # organisms/stepper.md
  dim-stepper-bar-vertical-width: 3px  # organisms/stepper.md
  dim-stepper-bar-width: 200px  # organisms/stepper.md
  dim-stepper-container-height: 92px  # organisms/stepper.md
  dim-stepper-edit-icon-ring-width: 6px  # organisms/stepper.md
  dim-stepper-input-field-width: 72px  # molecules/stepper-input.md
  dim-stepper-overflow-button-margin: 60px  # organisms/stepper.md
  dim-stepper-overflow-button-width: 50px  # organisms/stepper.md
  dim-stepper-partial-border-width: 3px  # organisms/stepper.md
  dim-stepper-title-width: 230px  # organisms/stepper.md
  dim-tag-height: 32px  # atoms/tag.md
  dim-tag-point-width: 12px  # atoms/tag.md
  dim-text-input-arrow-height: 5px  # molecules/text-input.md
  dim-text-input-arrow-press-scale: 0.75  # molecules/text-input.md
  dim-text-input-arrow-repeat-delay: 300ms  # molecules/text-input.md
  dim-text-input-arrow-repeat-interval: 50ms  # molecules/text-input.md
  dim-text-input-arrow-width: 7px  # molecules/text-input.md
  dim-text-input-arrows-height: 24px  # molecules/text-input.md
  dim-text-input-arrows-width: 16px  # molecules/text-input.md
  dim-text-input-height-large: 48px  # molecules/text-input.md
  dim-text-input-height-medium: 40px  # molecules/text-input.md
  dim-text-input-height-small: 34px  # molecules/text-input.md
  dim-tooltip-arrow-height: 4px  # atoms/tooltip.md
  dim-tooltip-arrow-offset-horizontal: -6px  # atoms/tooltip.md
  dim-tooltip-arrow-offset-vertical: -4px  # atoms/tooltip.md
  dim-tooltip-arrow-width: 8px  # atoms/tooltip.md
  dim-upload-item-min-height: 64px  # molecules/upload-item.md
  dim-upload-item-subtitle-font-size: 12px  # molecules/upload-item.md
  dim-upload-item-title-font-size: 14px  # molecules/upload-item.md
---

# Zebra Design System
This file is the **foundation layer**. It covers the tokens, the visual language and the rules. Components are documented atomically in three folders, and each file references the tokens defined here.

```
DESIGN.md        ← you are here: tokens, atmosphere, rules, index
atoms/           ← 22 indivisible controls & marks (button, icon, checkbox, chip, badge…)
molecules/       ← 31 small composites (text input, snackbar, tabs, list item…)
organisms/       ← 18 screen-level sections (dialog, global header, nav rail, data table…)
```

---

## 1. Visual Theme & Atmosphere

> **Token rule:** every value in this document is a token reference written as `--<key>`. Raw values live only in the frontmatter above. To read a value, look up `<key>` in the relevant group (`colors`, `spacing`, `rounded`, `border`, `elevation`, `typography`, `font-weight`, `motion`, `layout`, `opacity`). Dark and high-contrast values share the same key in `colors-dark` and `colors-high-contrast`. Component tokens (e.g. `--dialog-width`) are defined in the `tokens:` block of their component file. See §2 Token Architecture.

The Zebra Design System is an **enterprise utility language**. It is calm, precise and built for frontline workers who scan screens quickly, often on rugged handheld devices, with gloves on or in bad light. Surfaces are pure white (`--surface-default`) over faintly blue-tinted cool greys. Ink is a near-black graphite (`--main-default`), never pure black. A single confident **Zebra Blue** (`--state-primary-enabled`) carries every primary action and selection. Colour is spent "sparingly … as a means to employ meaning and discretion". Most screens are monochrome greys plus one blue, and red, green, orange and purple appear only when they mean something.

The geometry is strict and quiet. Everything snaps to the **mini-unit** grid (`--grid-unit`). Corners are barely softened by default (`--radius-minimal`), and every component can switch to fully sharp (`rounded=false`, `--radius-none`) or, for buttons and FABs, to full pills (`--radius-full`). Depth is low: hairline borders (`--border-size-small`) and very soft, cool-grey shadows (`--elevation-1` … `--elevation-6`) rather than dramatic layering. Type is **IBM Plex Sans** (`--type-family-regular`), a humanist-grotesque with an engineered feel. Display sizes use the `--light` weight for an airy look, and all UI labels and titles use `--medium`. The overall impression is *trustworthy industrial software*: dense enough for data, generous enough for touch, and accessible in all four theme modes (light, dark, high-contrast light, high-contrast dark).

**Key characteristics**
- Cool-neutral greys with a single saturated blue accent
- Mini-unit grid (`--grid-unit`) everywhere, including line-heights
- Default radius `--radius-minimal` with sharp/rounded/full shape switching
- Hairline borders over shadows; shadows are tinted cool grey, never black
- Status colour is always paired with an icon and text, never colour alone
- Components are theme-agnostic: they only reference semantic tokens, so dark and high-contrast modes come for free

---

## 2. Token Architecture

Zebra Design System tokens form three layers. Each layer may only reference the layer directly beneath it.

| Layer | Lives in | Holds | Example |
|---|---|---|---|
| **1. Primitives** | frontmatter `primitives`, `primitives-dark` | Raw colour ramps (`color-blue-10` … `color-blue-100`) | `--color-blue-50` |
| **2. Semantic** | frontmatter `colors` (+ `colors-dark`, `colors-high-contrast`), `spacing`, `rounded`, `border`, `elevation`, `font-family`, `font-weight`, `typography`, `motion`, `layout`, `opacity`, `dimensions` | Purpose-named decisions shared by the whole system. `dimensions` holds the raw component measurements (`dim-…`), which only component tokens may use. | `--state-primary-hover` |
| **3. Component** | `tokens:` block in each `atoms/`, `molecules/` and `organisms/` file | Each component's own named decisions. They are references only, never raw values. | `--button-primary-container-background-hover` |

### Reference syntax
A component token's value is a single reference to a semantic key, written `'{group.key}'`:
- `button-primary-container-background-hover: '{colors.state-primary-hover}'`
- `button-container-padding-x-medium: '{spacing.spacing-medium}'`
- `button-label-font-medium: '{typography.label-large}'`
- `button-container-height-medium: '{dimensions.dim-button-height-medium}'`

Component tokens never reference `primitives`, `roles`, `colors-dark` or `colors-high-contrast`.

**Composition (reuse, not restatement):** a component may also reference the tokens of components listed in its `composes`, written `'{child.token}'` (e.g. `stepper-input-button-size-medium: '{icon-button.icon-button-container-size-medium}'`). A composite never restates a child's styling. It says which child, variant and size it uses ("[Icon Button](atoms/icon-button.md), outline-subtle, medium"), and the child's own tokens govern its colours, states and radius. The composite defines its own tokens only for:
- **its own parts:** container, layout, gap, dividers, header;
- **context overrides:** a decision that deliberately differs from the child in this context. These point at a semantic key or at another child token.

References may chain (organism → molecule → atom), but every chain must end at a semantic token. Components may only reference children they compose, never siblings.

### Naming
`<component>-[<variant>-]<part>-<property>[-<state>|-<size>]`. The prefix is always the component's file name.
- **Parts:** `container`, `label`, `icon`, `track`, `thumb`, `indicator`, `divider`, …
- **Properties:** `background`, `foreground`, `border-color`, `border-width`, `outline-color`, `outline-width`, `radius`, `padding-x`, `padding-y`, `margin`, `gap`, `offset`, `inset`, `travel`, `height`, `width`, `size`, `min-height`, `min-width`, `max-height`, `max-width`, `font`, `font-weight`, `line-height`, `opacity`, `scale`, `elevation`, `duration`, `easing`
- **States:** `enabled`, `hover`, `pressed`, `focused`, `disabled`, `selected`, `error`. Component-specific states: `on` / `off` (switch), `open`, `filled` (has a value), `active`.

### Rules
- **Strict layering:** a component file's text and tables cite only its own component tokens and those of the components it composes. They never cite semantic tokens directly. This document's prose cites semantic tokens, plus a component's tokens where it describes that component.
- **Changes propagate:** restyling an atom (e.g. the icon button's hover) automatically restyles every molecule and organism that composes it, unless that composite has a deliberate context override.
- **Theming flows through:** semantic keys are identical in every mode, so `colors-dark` and `colors-high-contrast` re-theme every component automatically.
- **Re-theming one component** means pointing its component token at a different semantic key. Nothing else changes.

### Worked example: primary button hover
`--color-blue-50` (primitive) → `--state-primary-hover` (semantic, `colors`) → `--button-primary-container-background-hover` (component, `atoms/button.md`).
In dark mode the same chain resolves through `colors-dark.state-primary-hover`.

---

## 3. Color Palette & Roles

The Zebra Design System uses a **two-tier token model**:
1. **Primitives** (frontmatter `primitives`): 10 hue ramps (cool, warm, blue, green, red, orange, purple, yellow, teal, pink) × 10 steps, where 10 is the lightest and 100 the darkest in light mode, plus `--color-pure-0` / `--color-pure-1000`. A second set (`primitives-dark`) *inverts* every ramp for dark mode. Primitives are for reference only and are never used directly.
2. **Semantics** (frontmatter `colors`): role tokens (`main-*`, `surface-*`, `border-*`, `state-*`) that point at primitive steps. Products and components only use semantics, never raw values.

### Primary Foundation (surfaces)
| Name | Token | Role |
|---|---|---|
| **Paper White** | `--surface-default` | Page and component background |
| **Frost Tint** | `--surface-cool` | Cool alternate section background |
| **Soft Linen** | `--surface-warm` | Warm alternate background |
| **Mist Hover** | `--surface-hover` | Hover wash on neutral items |
| **Ice Blue Select** | `--surface-selected` | Selected row/item (hover: `--surface-selected-hover`) |
| **Disabled Fog** | `--surface-disabled` | Disabled fills |
| **Night Ink** | `--surface-default-inverse` | Inverse surfaces: global header, tooltips, default snackbars |
| **Scrim** | `--surface-overlay` | Modal barrier |

### Accent & Interactive
| Name | Token | Role |
|---|---|---|
| **Zebra Blue** | `--state-primary-enabled` / `--main-primary` | Primary buttons, links, active indicators, checked controls |
| **Sky Hover** | `--state-primary-hover` | Hover on primary fills; the same step as `--border-primary`, the focus-ring colour |
| **Deep Press Blue** | `--state-primary-selected` | Pressed/active primary |
| **Blue Whisper** | `--surface-primary-subtle` | Tinted primary containers |
| **Signal Gold** | `--state-secondary-enabled` | Secondary accent fill (text on it: `--main-secondary`) |
| **Inverse Ink** | `--state-inverse-enabled` | Inverse buttons/FAB (hover: `--state-inverse-hover`) |

### Typography & Text Hierarchy
| Name | Token | Role |
|---|---|---|
| **Graphite** | `--main-default` | Primary text and icons |
| **Slate** | `--main-subtle` | Secondary text, hints, captions |
| **Pewter** | `--main-disabled` | Disabled text and icons |
| **Silver Line** | `--main-light` | Very light foreground |
| **Snow Ink** | `--main-inverse` | Text on inverse surfaces |

### Borders
| Token | Role |
|---|---|
| `--border-default` | Input outlines, card borders, outline-subtle buttons |
| `--border-subtle` | Dividers, list separators |
| `--border-hover` / `--border-selected` | Hovered/selected input outline |
| `--border-disabled` | Disabled outline |
| `--border-primary-main` | Outline-button stroke |
| `--border-primary` | **Focus ring** (`--border-size-medium`, solid) and active tab underline |

### Functional States
Every status has a token family: **main** (text/icon), **surface** (solid fill), **surface-subtle** (tinted container), **border**, and for interactive statuses **state** tokens (enabled / hover / selected / focus).
| Status | Character | main | surface | subtle | border | hover / pressed |
|---|---|---|---|---|---|---|
| Positive | Evergreen | `--main-positive` | `--surface-positive` | `--surface-positive-subtle` | `--border-positive` | `--state-positive-hover` / `--state-positive-selected` |
| Warning | Amber Ochre | `--main-warning` | `--surface-warning` | `--surface-warning-subtle` | `--border-warning` | n/a |
| Negative | Alarm Red | `--main-negative` | `--surface-negative` | `--surface-negative-subtle` | `--border-negative` | `--state-negative-hover` / `--state-negative-selected` |
| Info | Electric Violet | `--main-info` | `--surface-info` | `--surface-info-subtle` | `--border-info` | `--state-info-hover` / `--state-info-selected` |
| Secondary | Signal Gold | `--main-secondary` | `--surface-secondary` | `--surface-secondary-subtle` | `--border-secondary` | `--state-secondary-hover` / `--state-secondary-selected` |

> Info is **purple**, not blue. Blue is reserved for primary interaction, so "informational" never reads as "clickable".

### Component-specific palettes
- **Avatar backgrounds:** `--avatar-blue`, `--avatar-green`, `--avatar-orange`, `--avatar-pink`, `--avatar-purple` (the default), `--avatar-teal`, `--avatar-yellow`. Use them for avatar fills only.
- **Charts:** eight series, each with a primary and a secondary step: `--chart-1-primary` / `--chart-1-secondary` … `--chart-8-primary` / `--chart-8-secondary`. The series hues are blue, green, orange, red, purple, teal, pink and graphite. Use the primary step for important series and the secondary for less important ones. Never use them for text, because they may not meet contrast.

### Theme modes
- **Dark** (`colors-dark`): the primitive ramps invert while the semantics keep the same pointers. Surfaces become near-black, text becomes near-white, and primary blue shifts one step lighter.
- **High contrast** (`colors-high-contrast`): the semantics shift about two steps darker for text, borders and primary fills.

---

## 4. Typography Rules

**Typeface:** IBM Plex Sans (`--type-family-regular`), "clean, distinctive and designed for digital world use cases", free and multilingual for localisation. **Icon fonts:** `--icon-family-round` (default) and `--icon-family-sharp` (used when a component is `sharp`).

### Hierarchy & Weights
| Role | Tokens | Weight | HTML default | Use |
|---|---|---|---|---|
| Display | `--display-large` · `--display-medium` · `--display-small` | `--light` | n/a | Hero numbers, splash, marketing |
| Headline | `--headline-large` · `--headline-medium` · `--headline-small` | `--medium` | h1 / h2 / h3 | Page and section titles |
| Title | `--title-large` · `--title-medium` · `--title-small` | `--medium` | h4 / h5 / h6 | Card, dialog and list headers |
| Body | `--body-large` · `--body-medium` · `--body-small` · `--body-x-small` | `--regular` | p = `--body-medium` | Reading text, descriptions, hints |
| Label | `--label-large` · `--label-medium` · `--label-small` | `--medium` | n/a | Buttons, chips, tabs, field labels |
| Indicator | `--label-indicator` | `--medium` | n/a | Notification counts in badges |

### Spacing Principles
- **One formula:** sizes start at the smallest step (`--body-x-small`) and grow on the mini-unit (`--grid-unit`), and line-heights follow the same grid ("Scale, style and vertical rhythm"). `--body-small`, `--label-medium` and `--label-small` are documented exceptions that break the grid rhythm.
- **Weight contrast instead of size jumps:** the system uses only three weights (`--light`, `--regular`, `--medium`), never bold. Hierarchy comes from medium versus regular at similar sizes.
- **Light for big, medium for small:** display text is light to stay elegant, and interactive labels are medium to stay legible at small sizes.
- **No letter-spacing tokens:** tracking stays at the font default, with no uppercase-tracked eyebrow style.
- **Principles:** optimise for readability, create visual harmony, and contextualise for different users and operating systems.

---

## 5. Component Stylings

Shared mechanics that apply to every component below:
- **Shape:** the `rounded` option gives `--radius-minimal` when true (the default) and `--radius-none` when false. Buttons and FABs add `shape="full"` for `--radius-full` pills.
- **Flavors:** primary, positive, negative, outline, outline-subtle, text, subtle, inverse, and custom.
  - Solid flavors: `--state-<flavor>-enabled` fill with `--state-default-enabled` text, `--state-<flavor>-hover` on hover and `--state-<flavor>-selected` on press.
  - Ghost flavors: `--surface-default` fill, `--surface-hover` on hover, `--surface-selected` on press. Outline draws a `--border-size-small` `--border-primary-main` *box-shadow* stroke; outline-subtle draws a `--border-default` stroke.
- **Focus:** a `--border-size-medium` solid outline in `--border-primary`, always visible on `:focus-visible`.
- **Disabled:** `--surface-disabled` fill, `--main-disabled` text and a not-allowed cursor.
- **Sizes:** most controls ship small, medium (default) and large. Medium button padding is `--spacing-small` × `--spacing-medium`; large is `--spacing-medium` × `--spacing-large`; small is `--spacing-small`. Icons use `--spacing-xl` (or `--spacing-large` at small size).
- **Motion:** short and functional. Durations run from `--motion-instant` to `--motion-slow`, with `--easing-standard` / `--easing-out`. There is no decorative animation.

### Buttons → [atoms/button.md](atoms/button.md), [atoms/icon-button.md](atoms/icon-button.md), [atoms/fab.md](atoms/fab.md), [molecules/tile-button.md](molecules/tile-button.md), [molecules/button-group.md](molecules/button-group.md)
Buttons are crisp rectangles with `--radius-minimal` corners, set in `--label-large`, with an optional leading or trailing icon and a `--spacing-small` gap. Primary is solid `--state-primary-enabled` with `--state-default-enabled` text. Outline uses a thin `--border-primary-main` stroke on white. Text buttons have no container. FABs float as circles (or extended pills) in primary blue or inverse (`--state-inverse-enabled`). Tile buttons stack a large icon above a label inside an outline-subtle frame for dashboard grids.

### Cards & Containers → [atoms/card.md](atoms/card.md), [organisms/dialog.md](organisms/dialog.md), [organisms/bottom-sheet.md](organisms/bottom-sheet.md)
Cards are `--surface-default` panels with a `--border-size-small` `--border-default` hairline and `--radius-minimal` corners, divided into header, body and footer. They are flat by default. Shadows appear only on dropdown menus and tooltips (`--elevation-3`), the navigation drawer (`--elevation-6`) and chart cards (`--elevation-2`).

Dialogs are flat `--surface-default` panels `--dialog-width` wide (capped at `--dialog-max-height`). They have `--radius-minimal` corners, `--spacing-2xl` padding, a status-coloured leading icon, a `--title-large` heading and footer buttons (confirm, cancel, other). They sit over the `--surface-overlay` scrim, which supplies the separation instead of a shadow.

### Navigation → [organisms/global-header.md](organisms/global-header.md), [organisms/top-app-bar.md](organisms/top-app-bar.md), [organisms/left-navigation-rail.md](organisms/left-navigation-rail.md), [molecules/tabs.md](molecules/tabs.md), [molecules/breadcrumb.md](molecules/breadcrumb.md), [molecules/pagination.md](molecules/pagination.md)
- **Global Header:** the persistent top bar. It is *dark by default* (it always renders with the `colors-dark` values) and holds the Zebra logo, a platform name, up to 6 menu items (left), an optional search bar and app switcher, up to 6 action icon-buttons (right) and an xxs avatar with the user's name.
- **Top App Bar:** the in-screen bar, with a leading control, a title (optionally centred, or extended onto a second row) and trailing actions.
- **Tabs:** the active tab gets a `--border-size-medium` `--border-primary` underline.
- **Navigation Rail:** a vertical icon-and-label column for mid-to-large screens.

### Inputs & Forms → [molecules/text-input.md](molecules/text-input.md) (+ password, date, time and phone variants), [molecules/select-input.md](molecules/select-input.md), [molecules/search-bar.md](molecules/search-bar.md), [atoms/checkbox.md](atoms/checkbox.md), [atoms/radio-button.md](atoms/radio-button.md), [atoms/switch.md](atoms/switch.md), [atoms/slider.md](atoms/slider.md)
Fields are `--surface-default` boxes with a `--border-size-small` `--border-default` outline and `--radius-minimal` corners, in small, medium and large heights (see text-input).
- A label sits above the field, and a `--body-x-small` `--main-subtle` hint with a small icon sits below. In the error state the hint becomes `--main-negative` error text.
- The field supports leading and trailing icons, prefix and suffix text, and an optional clear button.
- Hover darkens the border to `--border-hover`, and focus adds the `--border-primary` ring.
- Error tints the field `--surface-negative-subtle` with a `--border-size-medium` `--border-negative` border.
- Checkbox, radio and switch take on primary blue when on. Switches can carry on and off icons.

### Feedback & Status → [molecules/snackbar.md](molecules/snackbar.md), [molecules/in-page-banner.md](molecules/in-page-banner.md), [molecules/system-banner.md](molecules/system-banner.md), [atoms/status-label.md](atoms/status-label.md), [atoms/indicator.md](atoms/indicator.md), [atoms/progress-bar.md](atoms/progress-bar.md), [molecules/empty-state.md](molecules/empty-state.md)
Status always uses the token family: a tinted `*-subtle` surface, a coloured `--border-*` stroke and a coloured `--main-*` icon plus text.
- **In-page banners** sit below the top app bar, and only one is shown at a time. Default icons: positive uses check_circle, negative uses error, warning uses warning, and info/default use info.
- **System banners** are full-width, square-cornered solid strips set in `--title-medium`, with `--spacing-small` × `--spacing-large` padding around a `--spacing-2xl` line. The default fill is `--surface-primary`; positive, warning and negative use their solid surfaces. Text is `--main-inverse`, except on warning, which uses dark text.
- **Snackbars** sit at the bottom of the screen. The default status is an inverse toast on `--surface-default-inverse`; the positive, negative, warning, info and view statuses use the `*-subtle` tinted surfaces. An action and a close are optional.
- **Indicators** are small circular counts (99+ cap) or icons on avatars and icons.

### Domain-specific (Zebra frontline) → [molecules/comms-buttons.md](molecules/comms-buttons.md), [organisms/dial-pad.md](organisms/dial-pad.md), [organisms/voice-memo.md](organisms/voice-memo.md), [organisms/voice-call-popup.md](organisms/voice-call-popup.md), [atoms/priority-pill.md](atoms/priority-pill.md), [organisms/gantt-view.md](organisms/gantt-view.md)
These cover push-to-talk and voice workflows: round comms buttons (call, video, mute), a dial pad with a quick-dial security action, voice-memo recording sheets and call pop-ups. Task priority uses pills with a single-character index (urgent, high, medium, low). Shift and task scheduling uses a Gantt view.

---

## 6. Layout Principles

### Grid & Structure
- **Mini-unit base grid** (`--grid-unit`): all boxes, margins, padding, icon sizes and line-heights are multiples of it.
- **Column grid** of `--grid-columns` columns (a grid built from fours and threes), fluid, sized in `fr` units.
- **Outer margins** are fixed at `--grid-margin` within a breakpoint, even when columns are fluid.
- **Sizing scale:** fixed sizes are mini-unit multiples (the `spacing` group) and fluid sizes are column widths. Boxes are often hybrid: a fixed height with a fluid width.
- **Aspect ratios:** only the set listed in `--aspect-ratios`.

### Whitespace Strategy
- The semantic spacing scale runs from `--spacing-minimum` to `--spacing-11xl`. Component internals mostly use `--spacing-minimum` to `--spacing-large`, and sections use `--spacing-2xl` to `--spacing-8xl`.
- Vertical rhythm is built by adding fixed-scale margins to the top or bottom of boxes.
- Density is moderate: comfortable for touch, but tight enough for operational data tables and lists.

### Alignment & Visual Balance
- Content is left-aligned (start-aligned) by default. Centring is an opt-in for app bars, banners, bottom-sheet headers and dialogs (`centered`, `align="center"`, `headerAlignment="center"`).
- Leading and trailing regions are a universal pattern (list items, app bars, inputs, buttons).
- Icons and marks inside a container (checkbox marks, icon-button glyphs, avatar and badge content) are perfectly centred in it, horizontally and vertically (see `atoms/icon.md`).
- Monochrome layouts with one blue focal point per view.

### Responsive Behavior & Touch
- **Touch targets:** a minimum of `--touch-target-min` (WCAG 2.5.8 AA). The recommended size is `--touch-target-recommended` on Android and web, and `--touch-target-ios` on iOS. Hit areas are enforced with min-height and min-width rather than padding alone.
- **Breakpoint:** the documented mobile breakpoint is `--breakpoint-mobile-max`.
- **Contrast:** semantic tokens meet WCAG AA in all four modes. Don't add opacity to text.
- **Focus** is never suppressed. Icon-only controls need an accessible label.
- **Adaptive navigation:** the global header and left rail are used on large screens, the top app bar and bottom sheet on handhelds.

---

## 7. Design System Notes for Stitch Generation

### Language to Use
"Clean enterprise UI on a crisp white canvas with cool blue-grey neutrals; graphite text in IBM Plex Sans; a single vivid Zebra-blue accent for primary actions; lightly rounded rectangles with hairline grey borders; soft cool-grey shadows only on floating layers; strict mini-unit grid; calm, functional, accessible; status shown with tinted surfaces plus coloured icon and label."

### Color References
Resolve each token from the frontmatter `colors` group:
- Zebra Blue `--state-primary-enabled` (primary action, selection) → Sky Hover `--state-primary-hover` → Deep Press Blue `--state-primary-selected`
- Paper White `--surface-default` canvas · Frost Tint `--surface-cool` alternate · Mist Hover `--surface-hover`
- Graphite `--main-default` text · Slate `--main-subtle` secondary · Pewter `--main-disabled` disabled
- Border Grey `--border-default` · Divider `--border-subtle`
- Night Ink `--surface-default-inverse` for the inverse header and snackbars
- Evergreen `--main-positive` success · Amber Ochre `--main-warning` warning · Alarm Red `--main-negative` error · Electric Violet `--main-info` info

### Component Prompts
Substitute the frontmatter values when sending these prompts to Stitch.
1. *"A dark global header bar on `--surface-default-inverse`. On the left: the Zebra logo, the platform name and four text menu items in `--main-inverse` `--label-medium`. On the right: a search field, three icon buttons, and a small circular `--avatar-purple` avatar with initials and the user's name."*
2. *"A form card on `--surface-default` with a `--border-size-small` `--border-default` border, `--radius-minimal` corners and `--spacing-large` padding. A 'Site details' title in `--title-large` `--main-default`, then three stacked medium text inputs, each with a label above, an outlined field and a `--body-x-small` `--main-subtle` hint below. One field shows the error state with a `--border-negative` border and `--main-negative` hint. Footer: a right-aligned 'Cancel' outline button and a 'Save' solid `--state-primary-enabled` button."*
3. *"A dense task list. Each row has a medium avatar on the left, a `--title-medium` title and a `--body-small` `--main-subtle` subtitle. On the right of each row: a priority pill (a small index circle in `--main-primary` followed by the word 'Urgent' in `--main-negative`) and a chevron. Rows are separated by `--border-subtle` dividers and hover to `--surface-hover`."*

### Incremental Iteration
- Start monochrome (white, greys, graphite), then add blue **only** to the one primary action or selected state per region.
- When adding status, use the `*-subtle` tint as the background, the coloured `--border-*` hairline and a coloured icon, and keep the text `--main-default`.
- Keep every radius at `--radius-minimal` unless the element is a pill (chips, avatar, FAB "full" → `--radius-full`) or a sheet top (`--radius-large`).
- If something looks heavy, remove shadows before removing borders; the system prefers hairlines.
- For the dark theme, swap to the `colors-dark` values of the same tokens. Don't invent new hues.

---

## 8. Component Index (atomic)

Each file contains a `tokens:` block (its component tokens, see §2) followed by anatomy, variants, states, spacing, properties, usage rules and a Stitch prompt. Files marked † are **draft** (`status: draft`): their purpose, anatomy and composition are defined, but their measurements are still to be specified.

### Atoms: [`atoms/`](atoms/)
| Component | File | Component | File |
|---|---|---|---|
| Button | [button](atoms/button.md) | Label | [label](atoms/label.md) |
| Icon Button | [icon-button](atoms/icon-button.md) | Status Label | [status-label](atoms/status-label.md) |
| FAB | [fab](atoms/fab.md) | Priority Pill | [priority-pill](atoms/priority-pill.md) |
| Icon | [icon](atoms/icon.md) | Tag | [tag](atoms/tag.md) |
| Checkbox | [checkbox](atoms/checkbox.md) | Tooltip | [tooltip](atoms/tooltip.md) |
| Radio Button | [radio-button](atoms/radio-button.md) | Progress Bar | [progress-bar](atoms/progress-bar.md) |
| Switch | [switch](atoms/switch.md) | Progress Circle | [progress-circle](atoms/progress-circle.md) |
| Slider | [slider](atoms/slider.md) | Assist Chip | [assist-chip](atoms/assist-chip.md) |
| Avatar | [avatar](atoms/avatar.md) | Filter Chip | [filter-chip](atoms/filter-chip.md) |
| Indicator | [indicator](atoms/indicator.md) | Input Chip | [input-chip](atoms/input-chip.md) |
| Card | [card](atoms/card.md) | Status Chip | [status-chip](atoms/status-chip.md) |

### Molecules: [`molecules/`](molecules/)
| Group | Components |
|---|---|
| Actions | [tile-button](molecules/tile-button.md) · [button-group](molecules/button-group.md) · [dropdown-menu](molecules/dropdown-menu.md) · [comms-buttons](molecules/comms-buttons.md)† |
| Inputs | [text-input](molecules/text-input.md) · [password-input](molecules/password-input.md) · [date-input](molecules/date-input.md) · [time-input](molecules/time-input.md) · [phone-input](molecules/phone-input.md) · [search-bar](molecules/search-bar.md) · [select-input](molecules/select-input.md) · [stepper-input](molecules/stepper-input.md) · [slider-input-field](molecules/slider-input-field.md) · [range-selector](molecules/range-selector.md) · [message-input-field](molecules/message-input-field.md)† |
| Navigation | [segmented-control](molecules/segmented-control.md) · [tabs](molecules/tabs.md) · [breadcrumb](molecules/breadcrumb.md) · [pagination](molecules/pagination.md) · [accordion](molecules/accordion.md) |
| Lists | [list-item](molecules/list-item.md) · [upload-item](molecules/upload-item.md) · [avatar-rail](molecules/avatar-rail.md) · [chat-list-item](molecules/chat-list-item.md)† · [contact-list-item](molecules/contact-list-item.md)† · [notification-list-item](molecules/notification-list-item.md)† |
| Feedback | [status-badge](molecules/status-badge.md) · [snackbar](molecules/snackbar.md) · [system-banner](molecules/system-banner.md) · [in-page-banner](molecules/in-page-banner.md) · [empty-state](molecules/empty-state.md) |

### Organisms: [`organisms/`](organisms/)
| Group | Components |
|---|---|
| Overlays | [dialog](organisms/dialog.md) · [bottom-sheet](organisms/bottom-sheet.md) · [file-upload](organisms/file-upload.md) · [right-drawer-panel](organisms/right-drawer-panel.md)† · [voice-call-popup](organisms/voice-call-popup.md)† · [voice-memo](organisms/voice-memo.md)† |
| App chrome | [global-header](organisms/global-header.md) · [top-app-bar](organisms/top-app-bar.md) · [screen-header-bar](organisms/screen-header-bar.md)† · [left-navigation-rail](organisms/left-navigation-rail.md) |
| Data & flow | [stepper](organisms/stepper.md) · [data-table](organisms/data-table.md)† · [gantt-view](organisms/gantt-view.md)† · [date-picker](organisms/date-picker.md)† · [filter-selection-bar](organisms/filter-selection-bar.md)† · [vertical-speed-scroller](organisms/vertical-speed-scroller.md)† |
| Communication | [chat](organisms/chat.md)† · [dial-pad](organisms/dial-pad.md)† |

---

## 9. Governance
- **Tokens are the source of truth.** Every visual value is defined once in this file's frontmatter. Components and screens reference tokens by name and never restate raw values.
- **Never hard-code** colour, spacing, radius, elevation or typography values. Use semantic tokens (`--surface-*`, `--main-*`, `--border-*`, `--state-*`, `--spacing-*`, `--radius-*`, and typography tokens such as `--label-large`). Hard-coded values break light/dark and contrast theming.
- **Primitives are never used directly.** Only semantic tokens appear in components.
- **New design requests** are reviewed with three questions: does a component already exist, does it meet the requirements, and is it extensible beyond this project? The outcome is either a project "snowflake", a modification of an existing component, or a new design-system component.
- **Draft components** (†) must have their measurements defined as component tokens before they are used in production designs.
- **Icons** come from the Zebra Icons library (see `icons` in the frontmatter and [atoms/icon.md](atoms/icon.md)).
