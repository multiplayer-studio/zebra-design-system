---
name: Slider
level: atom
status: stable
composes: []
tokens:
  slider-container-height: '{spacing.spacing-large}'
  slider-container-inset: '{spacing.spacing-small}'
  slider-container-touch-target: '{layout.touch-target-ios}'
  slider-track-height: '{spacing.spacing-minimum}'
  slider-track-radius-rounded: '{rounded.radius-minimal}'
  slider-track-background-enabled: '{colors.surface-disabled}'
  slider-track-background-disabled: '{colors.surface-disabled}'
  slider-selected-background-enabled: '{colors.main-default}'
  slider-handle-size: '{spacing.spacing-large}'
  slider-handle-radius-rounded: '{rounded.radius-full}'
  slider-handle-background-enabled: '{colors.main-default}'
  slider-handle-background-disabled: '{colors.main-disabled}'
  slider-handle-scale-hover: '{dimensions.dim-slider-handle-hover-scale}'
  slider-handle-size-hover: '{spacing.spacing-xl}'
  slider-handle-duration: '{motion.motion-instant}'
  slider-step-dot-size: '{spacing.spacing-0-5}'
  slider-step-dot-background: '{colors.surface-default}'
---

# Slider

> Sliders allow users to make selections from a range of values.

## Anatomy
1. Track — full-width bar, clickable to jump.
2. Selected area — filled portion from start (default) or between handles (range).
3. Handle(s) — draggable square/circle; one for default, two for range.
4. Step dots (optional) — small dots on the track when a step is set.

## Variants
| Type | Handles | Selected area |
|---|---|---|
| default | 1 (initial value 50) | from min to handle |
| range | 2 (initial values 10 and 90) | between handles |

| Shape | Handle | Track / selected area |
|---|---|---|
| rounded (default) | circle (`--slider-handle-radius-rounded`) | `--slider-track-radius-rounded` ends |
| sharp | square | square ends |

## States
| State | Track | Selected area | Handle |
|---|---|---|---|
| enabled | `--slider-track-background-enabled` | `--slider-selected-background-enabled` | `--slider-handle-background-enabled` |
| hover (handle) | — | — | scales to `--slider-handle-scale-hover` (to `--slider-handle-size-hover`), `--slider-handle-duration` linear |
| dragging | — | — | normal scale |
| disabled | `--slider-track-background-disabled` | hidden | `--slider-handle-background-disabled`, not-allowed cursor |

Step dots: `--slider-step-dot-background`, on top of the track.

## Spacing & Sizing
| Part | Token |
|---|---|
| Handle | `--slider-handle-size` (square) |
| Track height | `--slider-track-height` |
| Component height | handle size (`--slider-container-height`) |
| Side inset | half the handle size each side (`--slider-container-inset`) |
| Step dot | `--slider-step-dot-size` circle |

## Properties
| Property | Options | Default |
|---|---|---|
| Type | default, range | default |
| Value | number (default type) | 50 |
| Lower / upper value | number (range type) | 10 / 90 |
| Min / max | number | 0 / 100 |
| Step | number (snaps and shows dots) | none |
| Disabled | on / off | off |
| Rounded | on / off | on |

## Usage
- Use for approximate values where the relative position matters; pair with a [slider input field](../molecules/slider-input-field.md) when exact entry is needed, or a [range selector](../molecules/range-selector.md) for labelled ranges.
- The `--slider-handle-size` handle is a small touch target — give the control generous vertical padding (≥ `--slider-container-touch-target` row) on touch UIs.
- Expose the current value in text; don't rely on handle position alone.

## Stitch Prompt
Draw a slider: a thin `--slider-track-height` `--slider-track-background-enabled` track with slightly rounded ends (`--slider-track-radius-rounded`), the filled portion in `--slider-selected-background-enabled`, and a `--slider-handle-size` `--slider-handle-background-enabled` circular handle at the current value. A range slider has two handles with the dark fill between them. When steps are enabled, tiny `--slider-step-dot-size` `--slider-step-dot-background` dots mark each step on the track. The handle grows slightly on hover (`--slider-handle-scale-hover`). Disabled sliders show only the `--slider-track-background-disabled` track with a `--slider-handle-background-disabled` handle.
