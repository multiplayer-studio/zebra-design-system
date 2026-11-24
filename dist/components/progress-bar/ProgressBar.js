import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Progress } from "@base-ui/react/progress";
import "./progress-bar.css";
const clampPercent = (v, min, max) => max > min ? Math.min(100, Math.max(0, ((v - min) / (max - min)) * 100)) : 0;
/**
 * A horizontal track that fills to show how far an ongoing process has got,
 * with an indeterminate mode and a buffered band for when the extent is not
 * known, and an optional label row above it.
 *
 * Behaviour and ARIA (`role="progressbar"`, `aria-valuenow/min/max`,
 * `aria-valuetext`, the indicator width) come from Base UI's Progress. The
 * progressbar element is the bar itself, not the whole component, so an
 * interactive control in `trailing` is not swallowed by the progressbar
 * role's presentational children; the label row names it through
 * `aria-labelledby`. Indeterminate also sets `aria-busy`.
 *
 * Everything visual is in `progress-bar.css`, keyed off data attributes.
 * Kept in step with packages/web-components `<zds-progress-bar>`.
 *
 * @spec specs/progress-bar/progress-bar.spec.md
 */
export const ProgressBar = React.forwardRef(function ProgressBar({ value = 0, min = 0, max = 100, buffering: bufferingProp = false, buffer = null, label, showLabel = true, showTrack = true, shape = "rounded", size = "small", trailing, className, ...rest }, ref) {
    const labelId = React.useId();
    const determinate = value != null && Number.isFinite(value);
    // Indeterminate has no buffer (owner decision).
    const buffering = bufferingProp && determinate && buffer != null && Number.isFinite(buffer);
    // The value never runs past what has preloaded (owner decision).
    const shown = determinate && buffering ? Math.min(value, buffer) : value;
    const percent = determinate ? clampPercent(shown, min, max) : null;
    // The same default text Base UI's Progress.Value would render.
    const fallback = percent != null ? new Intl.NumberFormat(undefined, { style: "percent" }).format(percent / 100) : null;
    const text = label ?? fallback;
    const hasLabelRow = showLabel && (text != null || trailing != null);
    const hasVisibleText = showLabel && text != null;
    return (_jsxs("div", { ref: ref, className: ["zds-progress-bar", className].filter(Boolean).join(" "), "data-shape": shape, "data-size": size, "data-buffering": buffering ? "" : undefined, "data-show-track": showTrack ? "" : undefined, children: [hasLabelRow ? (_jsxs("div", { className: "zds-progress-bar__label-row", children: [text != null ? _jsx("span", { id: labelId, className: "zds-progress-bar__label", children: text }) : null, trailing != null ? _jsx("span", { className: "zds-progress-bar__trailing", children: trailing }) : null] })) : null, _jsxs(Progress.Root, { "aria-labelledby": hasVisibleText ? labelId : undefined, "aria-label": !hasVisibleText && typeof label === "string" ? label : undefined, "aria-busy": determinate ? undefined : true, ...rest, className: "zds-progress-bar__bar", value: determinate ? shown : null, min: min, max: max, children: [showTrack ? _jsx("div", { className: "zds-progress-bar__track" }) : null, buffering ? (_jsx("div", { className: "zds-progress-bar__buffer", style: { inlineSize: `${clampPercent(buffer, min, max)}%` } })) : null, _jsx(Progress.Indicator, { className: "zds-progress-bar__indicator" })] })] }));
});
