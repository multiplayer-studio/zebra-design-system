---
version: 1.0.0
name: Zebra Companion Design System
description: Multi-tier adaptive token identity. Color-agnostic design systems logic.

# 1. Global Spectrum Palette (Primitives)
primitives:
  color:
    brand-blue:
      "10": "#F2F4FF"
      "100": "#080A1A"
      "20": "#DCE0FF"
      "30": "#B9C0FF"
      "40": "#95A1FF"
      "50": "#7281FE"
      "60": "#4F62FE"
      "70": "#3441AA"
      "80": "#1A2154"
      "90": "#101433"
    brand-violet:
      "10": "#FDF5FF"
      "100": "#270030"
      "20": "#F8DFFF"
      "30": "#F18FFB"
      "40": "#EA7FF6"
      "50": "#D540F2"
      "60": "#C300ED"
      "70": "#9C00C2"
      "80": "#750091"
      "90": "#4F0061"
    green:
      "10": "#ECFFF7"
      "100": "#081711"
      "20": "#D8FFEF"
      "30": "#BEEFDB"
      "40": "#84DAB6"
      "50": "#67B796"
      "60": "#00864F"
      "70": "#006D3F"
      "80": "#005F38"
      "90": "#00331E"
    neutral:
      "10": "#F8FBFF"
      "100": "#0C0D0E"
      "20": "#F3F6FA"
      "25": "#EAEDF2"
      "30": "#E0E3E9"
      "40": "#CED2DB"
      "50": "#8D95A3"
      "60": "#7A8190"
      "70": "#545963"
      "80": "#2C2F36"
      "90": "#1D1E23"
    orange:
      "10": "#FEF2E2"
      "100": "#1E1100"
      "20": "#FFE7C6"
      "30": "#FFD292"
      "40": "#FFB348"
      "50": "#F5A230"
      "60": "#AE6500"
      "70": "#965802"
      "80": "#764502"
      "90": "#402600"
    pure:
      black: "#000000"
      white: "#FFFFFF"
    purple:
      "10": "#F7F0FF"
      "100": "#180F22"
      "20": "#EFE1FF"
      "30": "#DCC1FB"
      "40": "#CEA4FF"
      "50": "#9B71DF"
      "60": "#7E0CFF"
      "70": "#6400D6"
      "80": "#43008F"
      "90": "#260052"
    red:
      "10": "#FFF0F1"
      "100": "#220F11"
      "20": "#FFE1E4"
      "30": "#FFB3BB"
      "40": "#F98C97"
      "50": "#F36170"
      "60": "#D70015"
      "70": "#B50012"
      "80": "#8F000E"
      "90": "#520008"
    yellow:
      "10": "#FFF7D4"
      "100": "#181400"
      "20": "#FFEA89"
      "30": "#F3D961"
      "40": "#DBB91C"
      "50": "#C2A728"
      "60": "#8D7400"
      "70": "#766200"
      "80": "#564908"
      "90": "#352B00"
  dimension:
    "-025": "-1px"
    "-05": "-2px"
    "-1": "-4px"
    "0": "0px"
    "05": "2px"
    "1": "4px"
    "10": "40px"
    "12": "48px"
    "2": "8px"
    "20": "80px"
    "24": "96px"
    "3": "12px"
    "4": "16px"
    "5": "20px"
    "6": "24px"
    "7": "28px"
    "8": "32px"
    "9": "36px"
    full: "999px"
  font:
    family:
      primary: "IBM Plex Sans"
      secondary: "Zebra Sans"
    size:
      "12": "12px"
      "14": "14px"
      "16": "16px"
      "20": "20px"
      "24": "24px"
      "28": "28px"
      "32": "32px"
      "36": "36px"
      "40": "40px"
      "60": "60px"
      "64": "64px"
    weight:
      bold: "700px"
      medium: "500px"
      regular: "400px"
      semibold: "600px"
  neutral:
    warm:
      "10": "#FAFAFA"
      "100": "#151519"
      "20": "#F7F7F7"
      "30": "#EDEDED"
      "40": "#DEDEDE"
      "50": "#B9B9B9"
      "60": "#858585"
      "70": "#585858"
      "80": "#313131"
      "90": "#1D1E23"
# 2. Semantic Mapping Roles (Semantics)
colors:
  background:
    brand: "{primitives.color.purple.60}"
    brand-hover: "{primitives.color.purple.70}"
    brand-pressed: "{primitives.color.purple.80}"
    disabled: "{primitives.color.neutral.30}"
    gradient:
      end: "{primitives.color.brand-blue.60}"
      start: "{primitives.color.brand-violet.60}"
    hover: "{primitives.color.neutral.20}"
    inverse: "{primitives.color.neutral.80}"
    overlay: "{primitives.color.neutral.10}"
    primary: "{primitives.color.pure.white}"
    scrim-cool-100: "#0C0D0E99"
    secondary: "{primitives.color.neutral.50}"
    subtle: "{primitives.color.neutral.25}"
  border:
    bold: "{primitives.color.neutral.60}"
    brand: "{primitives.color.purple.60}"
    gradient:
      end: "{primitives.color.brand-blue.60}"
      start: "{primitives.color.brand-violet.60}"
    primary: "{primitives.color.neutral.40}"
    subtle: "{primitives.color.neutral.30}"
  foreground:
    brand: "{primitives.color.purple.60}"
    disabled: "{primitives.color.neutral.50}"
    gradient:
      end: "{primitives.color.brand-blue.60}"
      start: "{primitives.color.brand-violet.60}"
    info: "{primitives.color.purple.60}"
    inverse: "{primitives.color.pure.white}"
    negative: "{primitives.color.red.60}"
    positive: "{primitives.color.green.60}"
    primary: "{primitives.color.neutral.100}"
    secondary: "{primitives.color.neutral.70}"
    warning: "{primitives.color.orange.60}"
  status:
    default:
      bold: "{primitives.color.neutral.70}"
      subtle: "{primitives.color.neutral.10}"
    info:
      bold: "{primitives.color.purple.70}"
      subtle: "{primitives.color.purple.10}"
    negative:
      bold: "{primitives.color.red.70}"
      subtle: "{primitives.color.red.10}"
    positive:
      bold: "{primitives.color.green.70}"
      subtle: "{primitives.color.green.10}"
    warning:
      bold: "{primitives.color.orange.70}"
      subtle: "{primitives.color.orange.10}"
  surface:
    inverse: "{primitives.color.neutral.90}"
    primary: "{primitives.color.neutral.10}"
    subtle: "{primitives.color.neutral.20}"
typography:
  body:
    large:
      font-family: "{primitives.font.family.primary}"
      font-size: "{primitives.font.size.20}"
      font-weight: "{primitives.font.weight.regular}"
      line-height: "{primitives.font.size.24}"
    medium:
      font-family: "{primitives.font.family.primary}"
      font-size: "{primitives.font.size.16}"
      font-weight: "{primitives.font.weight.regular}"
      line-height: "{primitives.font.size.24}"
    small:
      font-family: "{primitives.font.family.primary}"
      font-size: "{primitives.font.size.14}"
      font-weight: "{primitives.font.weight.regular}"
      line-height: "{primitives.font.size.20}"
    x-small:
      font-family: "{primitives.font.family.primary}"
      font-size: "{primitives.font.size.12}"
      font-weight: "{primitives.font.weight.regular}"
      line-height: "{primitives.font.size.16}"
  display:
    large:
      font-family: "{primitives.font.family.primary}"
      font-size: "{primitives.font.size.60}"
      font-weight: "{primitives.font.weight.bold}"
      line-height: "{primitives.font.size.64}"
    small:
      font-family: "{primitives.font.family.primary}"
      font-size: "{primitives.font.size.36}"
      font-weight: "{primitives.font.weight.bold}"
      line-height: "{primitives.font.size.40}"
  heading:
    large:
      font-family: "{primitives.font.family.primary}"
      font-size: "{primitives.font.size.32}"
      font-weight: "{primitives.font.weight.bold}"
      line-height: "{primitives.font.size.36}"
    medium:
      font-family: "{primitives.font.family.primary}"
      font-size: "{primitives.font.size.28}"
      font-weight: "{primitives.font.weight.semibold}"
      line-height: "{primitives.font.size.32}"
    small:
      font-family: "{primitives.font.family.primary}"
      font-size: "{primitives.font.size.24}"
      font-weight: "{primitives.font.weight.semibold}"
      line-height: "{primitives.font.size.28}"
  label:
    indicator:
      font-family: "{primitives.font.family.primary}"
      font-size: "{primitives.font.size.12}"
      font-weight: "{primitives.font.weight.medium}"
      line-height: "{primitives.font.size.12}"
    large:
      font-family: "{primitives.font.family.primary}"
      font-size: "{primitives.font.size.16}"
      font-weight: "{primitives.font.weight.medium}"
      line-height: "{primitives.font.size.24}"
    medium:
      font-family: "{primitives.font.family.primary}"
      font-size: "{primitives.font.size.14}"
      font-weight: "{primitives.font.weight.medium}"
      line-height: "{primitives.font.size.20}"
    small:
      font-family: "{primitives.font.family.primary}"
      font-size: "{primitives.font.size.12}"
      font-weight: "{primitives.font.weight.regular}"
      line-height: "{primitives.font.size.16}"
  title:
    large:
      font-family: "{primitives.font.family.primary}"
      font-size: "{primitives.font.size.20}"
      font-weight: "{primitives.font.weight.semibold}"
      line-height: "{primitives.font.size.24}"
    medium:
      font-family: "{primitives.font.family.primary}"
      font-size: "{primitives.font.size.16}"
      font-weight: "{primitives.font.weight.semibold}"
      line-height: "{primitives.font.size.24}"
    small:
      font-family: "{primitives.font.family.primary}"
      font-size: "{primitives.font.size.14}"
      font-weight: "{primitives.font.weight.semibold}"
      line-height: "{primitives.font.size.20}"
layout:
  -lg: "{primitives.dimension.-1}"
  -md: "{primitives.dimension.-05}"
  -sm: "{primitives.dimension.-025}"
  10xl: "{primitives.dimension.24}"
  2xl: "{primitives.dimension.5}"
  3xl: "{primitives.dimension.6}"
  4xl: "{primitives.dimension.7}"
  5xl: "{primitives.dimension.8}"
  6xl: "{primitives.dimension.9}"
  7xl: "{primitives.dimension.10}"
  8xl: "{primitives.dimension.12}"
  9xl: "{primitives.dimension.20}"
  large: "{primitives.dimension.3}"
  medium: "{primitives.dimension.2}"
  minimum: "{primitives.dimension.05}"
  none: "{primitives.dimension.0}"
  small: "{primitives.dimension.1}"
  target: "48px"
  xl: "{primitives.dimension.4}"
shapes:
  2xl: "{primitives.dimension.5}"
  3xl: "{primitives.dimension.6}"
  full: "{primitives.dimension.full}"
  large: "{primitives.dimension.3}"
  medium: "{primitives.dimension.2}"
  minimum: "{primitives.dimension.05}"
  none: "{primitives.dimension.0}"
  small: "{primitives.dimension.1}"
  xl: "{primitives.dimension.4}"
# 3. Component Map
components:
  _animated_loader: "./components/_animated_loader.md"
  _image_backup: "./components/_image_backup.md"
  _list_icon: "./components/_list_icon.md"
  _listen_animated: "./components/_listen_animated.md"
  _pointer: "./components/_pointer.md"
  _voice_animated: "./components/_voice_animated.md"
  accordion: "./components/accordion.md"
  animated_companion_icon: "./components/animated_companion_icon.md"
  app_icon: "./components/app_icon.md"
  avatar: "./components/avatar.md"
  avatar_photos: "./components/avatar_photos.md"
  button: "./components/button.md"
  card_base: "./components/card_base.md"
  carousel: "./components/carousel.md"
  checkbox: "./components/checkbox.md"
  chip: "./components/chip.md"
  companion_card: "./components/companion_card.md"
  companion_combination_mark: "./components/companion_combination_mark.md"
  companion_logomark: "./components/companion_logomark.md"
  compound: "./components/compound.md"
  dialog: "./components/dialog.md"
  dot: "./components/dot.md"
  drawer: "./components/drawer.md"
  file_types: "./components/file_types.md"
  icon_button: "./components/icon_button.md"
  image: "./components/image.md"
  input: "./components/input.md"
  input_base: "./components/input_base.md"
  keyboards: "./components/keyboards.md"
  link: "./components/link.md"
  list_item: "./components/list_item.md"
  listen: "./components/listen.md"
  loader: "./components/loader.md"
  menu_item: "./components/menu_item.md"
  message_bubble__desktop_: "./components/message_bubble__desktop_.md"
  message_bubble__mobile_: "./components/message_bubble__mobile_.md"
  message_status: "./components/message_status.md"
  mobile_header: "./components/mobile_header.md"
  option_stack: "./components/option_stack.md"
  popover: "./components/popover.md"
  product_card: "./components/product_card.md"
  profilt_icons: "./components/profilt_icons.md"
  prompt_input__desktop_: "./components/prompt_input__desktop_.md"
  prompt_input__mobile_: "./components/prompt_input__mobile_.md"
  radio: "./components/radio.md"
  select: "./components/select.md"
  select_base: "./components/select_base.md"
  simple: "./components/simple.md"
  switch: "./components/switch.md"
  tab_item: "./components/tab_item.md"
  tag: "./components/tag.md"
  task_card: "./components/task_card.md"
  video: "./components/video.md"
  voice: "./components/voice.md"
---

## Overview

Utilitarian, Professional, and Adaptive.
This is an enterprise-grade design system. The tone is serious but enabling—focused strictly on clarity, efficiency, and robustness over decorative flair. It must feel like a high-performance, reliable tool.

Frontline Workers and Enterprise Operators.
Users are often operating in fast-paced, physically demanding, or mission-critical environments (e.g., retail floors, warehouses, field services). They require immediate access to actionable data with zero cognitive friction.

The UI must evoke confidence, focus, and clarity. It should feel completely frictionless, allowing the user to trust the system implicitly. It should never feel playful, overly stylized, or distracting.

## Colors

*Theme-agnostic semantic color variables. Automatically injected from Figma.*

- **Background:**
  - **Brand (`color.background.brand`)**
  - **Brand Hover (`color.background.brand-hover`)**
  - **Brand Pressed (`color.background.brand-pressed`)**
  - **Disabled (`color.background.disabled`)**
  - **Gradient:**
    - **End (`color.background.gradient.end`)**
    - **Start (`color.background.gradient.start`)**
  - **Hover (`color.background.hover`)**
  - **Inverse (`color.background.inverse`)**
  - **Overlay (`color.background.overlay`)**
  - **Primary (`color.background.primary`)**
  - **Scrim Cool 100 (`color.background.scrim-cool-100`)**
  - **Secondary (`color.background.secondary`)**
  - **Subtle (`color.background.subtle`)**
- **Border:**
  - **Bold (`color.border.bold`)**
  - **Brand (`color.border.brand`)**
  - **Gradient:**
    - **End (`color.border.gradient.end`)**
    - **Start (`color.border.gradient.start`)**
  - **Primary (`color.border.primary`)**
  - **Subtle (`color.border.subtle`)**
- **Foreground:**
  - **Brand (`color.foreground.brand`)**
  - **Disabled (`color.foreground.disabled`)**
  - **Gradient:**
    - **End (`color.foreground.gradient.end`)**
    - **Start (`color.foreground.gradient.start`)**
  - **Info (`color.foreground.info`)**
  - **Inverse (`color.foreground.inverse`)**
  - **Negative (`color.foreground.negative`)**
  - **Positive (`color.foreground.positive`)**
  - **Primary (`color.foreground.primary`)**
  - **Secondary (`color.foreground.secondary`)**
  - **Warning (`color.foreground.warning`)**
- **Status:**
  - **Default:**
    - **Bold (`color.status.default.bold`)**
    - **Subtle (`color.status.default.subtle`)**
  - **Info:**
    - **Bold (`color.status.info.bold`)**
    - **Subtle (`color.status.info.subtle`)**
  - **Negative:**
    - **Bold (`color.status.negative.bold`)**
    - **Subtle (`color.status.negative.subtle`)**
  - **Positive:**
    - **Bold (`color.status.positive.bold`)**
    - **Subtle (`color.status.positive.subtle`)**
  - **Warning:**
    - **Bold (`color.status.warning.bold`)**
    - **Subtle (`color.status.warning.subtle`)**
- **Surface:**
  - **Inverse (`color.surface.inverse`)**
  - **Primary (`color.surface.primary`)**
  - **Subtle (`color.surface.subtle`)**

## Typography

*Semantic typography variables. Automatically injected from Figma.*

- **Body:**
  - **Large:**
    - **Font Family (`type.body.large.font-family`)**
    - **Font Size (`type.body.large.font-size`)**
    - **Font Weight (`type.body.large.font-weight`)**
    - **Line Height (`type.body.large.line-height`)**
  - **Medium:**
    - **Font Family (`type.body.medium.font-family`)**
    - **Font Size (`type.body.medium.font-size`)**
    - **Font Weight (`type.body.medium.font-weight`)**
    - **Line Height (`type.body.medium.line-height`)**
  - **Small:**
    - **Font Family (`type.body.small.font-family`)**
    - **Font Size (`type.body.small.font-size`)**
    - **Font Weight (`type.body.small.font-weight`)**
    - **Line Height (`type.body.small.line-height`)**
  - **X Small:**
    - **Font Family (`type.body.x-small.font-family`)**
    - **Font Size (`type.body.x-small.font-size`)**
    - **Font Weight (`type.body.x-small.font-weight`)**
    - **Line Height (`type.body.x-small.line-height`)**
- **Display:**
  - **Large:**
    - **Font Family (`type.display.large.font-family`)**
    - **Font Size (`type.display.large.font-size`)**
    - **Font Weight (`type.display.large.font-weight`)**
    - **Line Height (`type.display.large.line-height`)**
  - **Small:**
    - **Font Family (`type.display.small.font-family`)**
    - **Font Size (`type.display.small.font-size`)**
    - **Font Weight (`type.display.small.font-weight`)**
    - **Line Height (`type.display.small.line-height`)**
- **Heading:**
  - **Large:**
    - **Font Family (`type.heading.large.font-family`)**
    - **Font Size (`type.heading.large.font-size`)**
    - **Font Weight (`type.heading.large.font-weight`)**
    - **Line Height (`type.heading.large.line-height`)**
  - **Medium:**
    - **Font Family (`type.heading.medium.font-family`)**
    - **Font Size (`type.heading.medium.font-size`)**
    - **Font Weight (`type.heading.medium.font-weight`)**
    - **Line Height (`type.heading.medium.line-height`)**
  - **Small:**
    - **Font Family (`type.heading.small.font-family`)**
    - **Font Size (`type.heading.small.font-size`)**
    - **Font Weight (`type.heading.small.font-weight`)**
    - **Line Height (`type.heading.small.line-height`)**
- **Label:**
  - **Indicator:**
    - **Font Family (`type.label.indicator.font-family`)**
    - **Font Size (`type.label.indicator.font-size`)**
    - **Font Weight (`type.label.indicator.font-weight`)**
    - **Line Height (`type.label.indicator.line-height`)**
  - **Large:**
    - **Font Family (`type.label.large.font-family`)**
    - **Font Size (`type.label.large.font-size`)**
    - **Font Weight (`type.label.large.font-weight`)**
    - **Line Height (`type.label.large.line-height`)**
  - **Medium:**
    - **Font Family (`type.label.medium.font-family`)**
    - **Font Size (`type.label.medium.font-size`)**
    - **Font Weight (`type.label.medium.font-weight`)**
    - **Line Height (`type.label.medium.line-height`)**
  - **Small:**
    - **Font Family (`type.label.small.font-family`)**
    - **Font Size (`type.label.small.font-size`)**
    - **Font Weight (`type.label.small.font-weight`)**
    - **Line Height (`type.label.small.line-height`)**
- **Title:**
  - **Large:**
    - **Font Family (`type.title.large.font-family`)**
    - **Font Size (`type.title.large.font-size`)**
    - **Font Weight (`type.title.large.font-weight`)**
    - **Line Height (`type.title.large.line-height`)**
  - **Medium:**
    - **Font Family (`type.title.medium.font-family`)**
    - **Font Size (`type.title.medium.font-size`)**
    - **Font Weight (`type.title.medium.font-weight`)**
    - **Line Height (`type.title.medium.line-height`)**
  - **Small:**
    - **Font Family (`type.title.small.font-family`)**
    - **Font Size (`type.title.small.font-size`)**
    - **Font Weight (`type.title.small.font-weight`)**
    - **Line Height (`type.title.small.line-height`)**

## Layout & Spacing

*Structural sizing and spacing variables. Automatically injected from Figma.*

- **Target (`size.target`)**
- **10xl (`spacing.10xl`)**
- **2xl (`spacing.2xl`)**
- **3xl (`spacing.3xl`)**
- **4xl (`spacing.4xl`)**
- **5xl (`spacing.5xl`)**
- **6xl (`spacing.6xl`)**
- **7xl (`spacing.7xl`)**
- **8xl (`spacing.8xl`)**
- **9xl (`spacing.9xl`)**
- **Large (`spacing.large`)**
- **Medium (`spacing.medium`)**
- **Minimum (`spacing.minimum`)**
- **Negative:**
  - **Lg (`spacing.negative.lg`)**
  - **Md (`spacing.negative.md`)**
  - **Sm (`spacing.negative.sm`)**
- **None (`spacing.none`)**
- **Small (`spacing.small`)**
- **Xl (`spacing.xl`)**

## Elevation & Depth

*(Define elevation layers, shadows, and z-indexes here)*

## Shapes

*Corner radii variables mapped to their structural semantics. Automatically injected from Figma.*

- **2xl (`radius.2xl`)**
- **3xl (`radius.3xl`)**
- **Full (`radius.full`)**
- **Large (`radius.large`)**
- **Medium (`radius.medium`)**
- **Minimum (`radius.minimum`)**
- **None (`radius.none`)**
- **Small (`radius.small`)**
- **Xl (`radius.xl`)**

## Components

*(Map component specifications here, e.g., `- button: ./components/button.md`)*

- [Button](./components/button.md)
- [Checkbox](./components/checkbox.md)
- [Radio](./components/radio.md)
- [Switch](./components/switch.md)
- [ Voice Animated](./components/_voice_animated.md)
- [Voice](./components/voice.md)
- [ Listen Animated](./components/_listen_animated.md)
- [Listen](./components/listen.md)
- [Select Base](./components/select_base.md)
- [Select](./components/select.md)
- [Icon Button](./components/icon_button.md)
- [Input Base](./components/input_base.md)
- [Input](./components/input.md)
- [Input Base](./components/input_base.md)
- [Loader](./components/loader.md)
- [ Animated Loader](./components/_animated_loader.md)
- [Message Bubble  Desktop ](./components/message_bubble__desktop_.md)
- [Message Bubble  Mobile ](./components/message_bubble__mobile_.md)
- [Message Status](./components/message_status.md)
- [Animated Companion Icon](./components/animated_companion_icon.md)
- [Chip](./components/chip.md)
- [Tag](./components/tag.md)
- [Link](./components/link.md)
- [Companion Logomark](./components/companion_logomark.md)
- [App Icon](./components/app_icon.md)
- [Companion Combination Mark](./components/companion_combination_mark.md)
- [Avatar](./components/avatar.md)
- [Avatar Photos](./components/avatar_photos.md)
- [Profilt Icons](./components/profilt_icons.md)
- [Tab Item](./components/tab_item.md)
- [Menu Item](./components/menu_item.md)
- [Popover](./components/popover.md)
- [Dialog](./components/dialog.md)
- [Card Base](./components/card_base.md)
- [Companion Card](./components/companion_card.md)
- [Image](./components/image.md)
- [Video](./components/video.md)
- [Product Card](./components/product_card.md)
- [Task Card](./components/task_card.md)
- [ Image Backup](./components/_image_backup.md)
- [Option Stack](./components/option_stack.md)
- [Mobile Header](./components/mobile_header.md)
- [Drawer](./components/drawer.md)
- [Prompt Input  Desktop ](./components/prompt_input__desktop_.md)
- [Prompt Input  Mobile ](./components/prompt_input__mobile_.md)
- [Keyboards](./components/keyboards.md)
- [Dot](./components/dot.md)
- [Carousel](./components/carousel.md)
- [List Item](./components/list_item.md)
- [ List Icon](./components/_list_icon.md)
- [File Types](./components/file_types.md)
- [Simple](./components/simple.md)
- [Compound](./components/compound.md)
- [Accordion](./components/accordion.md)
- [ Pointer](./components/_pointer.md)

## Do's and Don'ts

- **Do:** 
- **Don't:**

