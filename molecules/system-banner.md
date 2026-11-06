---
name: System Banner
level: molecule
status: stable
composes: [../atoms/icon.md]
tokens:
  # status
  system-banner-default-container-background: '{colors.surface-primary}'
  system-banner-default-content-foreground: '{colors.main-inverse}'
  system-banner-positive-container-background: '{colors.surface-positive}'
  system-banner-positive-content-foreground: '{colors.main-inverse}'
  system-banner-warning-container-background: '{colors.surface-warning}'
  system-banner-warning-content-foreground: '{colors.main-default}'
  system-banner-negative-container-background: '{colors.surface-negative}'
  system-banner-negative-content-foreground: '{colors.main-inverse}'
  # shape and sizing
  system-banner-container-radius: '{rounded.radius-none}'
  system-banner-container-height: '{spacing.spacing-6xl}'
  system-banner-container-padding-y: '{spacing.spacing-small}'
  system-banner-container-padding-x: '{spacing.spacing-large}'
  system-banner-content-height: '{spacing.spacing-2xl}'
  system-banner-text-line-height: '{spacing.spacing-2xl}'
  system-banner-text-font: '{typography.title-medium}'
  system-banner-icon-size: '{icon.icon-size-medium}'
  system-banner-leading-icon-gap: '{spacing.spacing-small}'
  system-banner-trailing-icon-gap: '{spacing.spacing-small}'
---

# System Banner

> A banner displays an important, succinct message, and provides action for users to address. It draws the attention to the message by displaying it at the top in various colors.

## Anatomy
1. Bar – full-width, single-line strip with saturated status fill.
2. Leading icon (optional) – [Icon](../atoms/icon.md). Context overrides: icons are sized `--system-banner-icon-size` (smaller than the Icon default, to fit the single-line bar) and take the status content colour (`--system-banner-default-content-foreground` etc.) so they read on the saturated fill.
3. Text – banner message.
4. Trailing icon (optional) – [Icon](../atoms/icon.md), e.g. close / chevron, pinned right; same overrides as the leading icon.

## Variants
| Status | Background | Text & icons |
|---|---|---|
| default | `--system-banner-default-container-background` | `--system-banner-default-content-foreground` |
| positive | `--system-banner-positive-container-background` | `--system-banner-positive-content-foreground` |
| warning | `--system-banner-warning-container-background` | `--system-banner-warning-content-foreground` |
| negative | `--system-banner-negative-container-background` | `--system-banner-negative-content-foreground` |

| Align | Layout |
|---|---|
| start (default) | icon + text left-aligned |
| center | icon + text centred; trailing icon stays right |

Always square: `--system-banner-container-radius`.

## States
Static, non-interactive (interaction lives in the trailing icon/button).

## Spacing & Sizing
| Property | Value |
|---|---|
| Height | content `--system-banner-content-height` + padding = `--system-banner-container-height` |
| Padding | `--system-banner-container-padding-y` `--system-banner-container-padding-x` |
| Line height | `--system-banner-text-line-height`, no wrapping (overflow hidden) |
| Leading icon → text | `--system-banner-leading-icon-gap` |
| Text → trailing icon | `--system-banner-trailing-icon-gap` |
| Font | `--system-banner-text-font` |

## Properties
| Property | Options | Default |
|---|---|---|
| Status | default, positive, warning, negative | default |
| Align | start, center | start |
| Text | text | — |
| Leading icon | any icon | none |
| Trailing icon | any icon | none |

## Usage
- Place at the very top of the app for system-wide messages; one banner at a time.
- Keep text to one short line — it does not wrap.
- Include an icon so status is not communicated by colour alone.
- Make any trailing close/action icon keyboard accessible with a label.

## Stitch Prompt
Draw a full-width `--system-banner-container-height`-tall square-cornered banner across the top of the app with a solid blue (`--system-banner-default-container-background`) fill, `--system-banner-container-padding-x` horizontal padding, an off-white (`--system-banner-default-content-foreground`) `--system-banner-icon-size` info icon followed `--system-banner-leading-icon-gap` later by a single line of `--system-banner-text-font` off-white text, and an off-white close icon at the far right. Variants: green (`--system-banner-positive-container-background`) and red (`--system-banner-negative-container-background`) with off-white text (`--system-banner-positive-content-foreground`, `--system-banner-negative-content-foreground`), and amber (`--system-banner-warning-container-background`) with near-black text (`--system-banner-warning-content-foreground`).
