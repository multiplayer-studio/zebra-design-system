import * as React from "react";
import { Slider as BaseSlider } from "@base-ui/react/slider";
import "./slider.css";

export type SliderShape = "rounded" | "sharp";

/** Above this many stops the dots would crowd into a solid line, so none are drawn. */
const MAX_DOTS = 101;

export interface SliderProps
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseSlider.Root>, "className" | "children" | "value" | "defaultValue" | "onValueChange" | "onValueCommitted"> {
  /** Corner treatment of the track and thumb together. Match the controls around it; it carries no meaning. */
  shape?: SliderShape;
  /** Only certain values can be chosen: draws a dot at every valid stop. Use with a coarse `step`. */
  stepped?: boolean;
  /** The value (controlled). An array of two makes a range: the spec's `range`. */
  value?: number | readonly number[];
  /** The initial value (uncontrolled). An array of two makes a range. */
  defaultValue?: number | readonly number[];
  /** Called while the value changes. */
  onValueChange?: (value: number | number[]) => void;
  /** Called when a change is committed (pointer up, key press). */
  onValueCommitted?: (value: number | number[]) => void;
  /** Accessible name — of the end thumb in a range. */
  label?: string;
  /** Accessible name of the start thumb in a range. */
  startLabel?: string;
  className?: string;
}

/**
 * A control for choosing a value along a range by dragging a thumb.
 *
 * Behaviour — pointer dragging, arrow / Page / Home / End keys, the `slider`
 * role with its value, minimum and maximum, the hidden form inputs, range
 * ordering — comes from Base UI's Slider. Everything visual comes from the
 * token layer via `slider.css`, keyed off Base UI's own `[data-dragging]` /
 * `[data-disabled]` and our `data-shape`.
 *
 * State follows the spec's designer clarifications: the larger thumb size
 * goes only to the thumb under the pointer or being dragged; `selected` —
 * the fill and both thumbs in the selected foreground — comes from a drag or
 * from keyboard focus, and the focused thumb also takes a focus ring.
 *
 * Built to the metadata's intent where the Figma structure can't express it:
 * value/min/max/step exist (spec blocker); dots derive from min, max and step
 * and sit at their values across the whole track; in a range the fill runs
 * between the two thumbs (spec warns).
 *
 * Kept in step with packages/web-components `<zds-slider>`.
 *
 * @spec specs/slider/slider.spec.md
 */
export const Slider = React.forwardRef<HTMLDivElement, SliderProps>(function Slider(
  {
    shape = "rounded",
    stepped = false,
    value,
    defaultValue = 50,
    onValueChange,
    onValueCommitted,
    min = 0,
    max = 100,
    step = 1,
    label,
    startLabel,
    className,
    ...rest
  },
  ref,
) {
  const sample = value ?? defaultValue;
  const isRange = Array.isArray(sample);

  const dots: number[] = [];
  if (stepped && step > 0) {
    const count = Math.floor((max - min) / step) + 1;
    if (count >= 2 && count <= MAX_DOTS) {
      for (let i = 0; i < count; i++) dots.push(((i * step) / (max - min)) * 100);
    }
  }

  return (
    <BaseSlider.Root
      ref={ref}
      {...rest}
      className={["zds-slider", className].filter(Boolean).join(" ")}
      data-shape={shape}
      value={value as number | number[] | undefined}
      defaultValue={value === undefined ? (defaultValue as number | number[]) : undefined}
      onValueChange={onValueChange ? (v) => onValueChange(v as number | number[]) : undefined}
      onValueCommitted={onValueCommitted ? (v) => onValueCommitted(v as number | number[]) : undefined}
      min={min}
      max={max}
      step={step}
      thumbAlignment="center"
    >
      <BaseSlider.Control className="zds-slider__control">
        <BaseSlider.Track className="zds-slider__track">
          <BaseSlider.Indicator className="zds-slider__fill" />
          {dots.length ? (
            <span className="zds-slider__dots" aria-hidden="true">
              {dots.map((pos) => (
                <span key={pos} className="zds-slider__dot" style={{ insetInlineStart: `${pos}%` }} />
              ))}
            </span>
          ) : null}
          {isRange ? (
            <>
              <BaseSlider.Thumb className="zds-slider__thumb" index={0} aria-label={startLabel} />
              <BaseSlider.Thumb className="zds-slider__thumb" index={1} aria-label={label} />
            </>
          ) : (
            <BaseSlider.Thumb className="zds-slider__thumb" aria-label={label} />
          )}
        </BaseSlider.Track>
      </BaseSlider.Control>
    </BaseSlider.Root>
  );
});
