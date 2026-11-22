import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Slider as BaseSlider } from "@base-ui/react/slider";
import "./slider.css";
/** Above this many stops the dots would crowd into a solid line, so none are drawn. */
const MAX_DOTS = 101;
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
export const Slider = React.forwardRef(function Slider({ shape = "rounded", stepped = false, value, defaultValue = 50, onValueChange, onValueCommitted, min = 0, max = 100, step = 1, label, startLabel, className, ...rest }, ref) {
    const sample = value ?? defaultValue;
    const isRange = Array.isArray(sample);
    const dots = [];
    if (stepped && step > 0) {
        const count = Math.floor((max - min) / step) + 1;
        if (count >= 2 && count <= MAX_DOTS) {
            for (let i = 0; i < count; i++)
                dots.push(((i * step) / (max - min)) * 100);
        }
    }
    return (_jsx(BaseSlider.Root, { ref: ref, ...rest, className: ["zds-slider", className].filter(Boolean).join(" "), "data-shape": shape, value: value, defaultValue: value === undefined ? defaultValue : undefined, onValueChange: onValueChange ? (v) => onValueChange(v) : undefined, onValueCommitted: onValueCommitted ? (v) => onValueCommitted(v) : undefined, min: min, max: max, step: step, thumbAlignment: "center", children: _jsx(BaseSlider.Control, { className: "zds-slider__control", children: _jsxs(BaseSlider.Track, { className: "zds-slider__track", children: [_jsx(BaseSlider.Indicator, { className: "zds-slider__fill" }), dots.length ? (_jsx("span", { className: "zds-slider__dots", "aria-hidden": "true", children: dots.map((pos) => (_jsx("span", { className: "zds-slider__dot", style: { insetInlineStart: `${pos}%` } }, pos))) })) : null, isRange ? (_jsxs(_Fragment, { children: [_jsx(BaseSlider.Thumb, { className: "zds-slider__thumb", index: 0, "aria-label": startLabel }), _jsx(BaseSlider.Thumb, { className: "zds-slider__thumb", index: 1, "aria-label": label })] })) : (_jsx(BaseSlider.Thumb, { className: "zds-slider__thumb", "aria-label": label }))] }) }) }));
});
