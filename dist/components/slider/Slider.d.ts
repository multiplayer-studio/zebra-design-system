import * as React from "react";
import { Slider as BaseSlider } from "@base-ui/react/slider";
import "./slider.css";
export type SliderShape = "rounded" | "sharp";
export interface SliderProps extends Omit<React.ComponentPropsWithoutRef<typeof BaseSlider.Root>, "className" | "children" | "value" | "defaultValue" | "onValueChange" | "onValueCommitted"> {
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
export declare const Slider: React.ForwardRefExoticComponent<SliderProps & React.RefAttributes<HTMLDivElement>>;
