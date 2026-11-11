import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import "./scrollbar.css";
const clamp01 = (n) => Math.min(1, Math.max(0, n));
/**
 * The scroll indicator for a region that clips its content. A padded gutter
 * holds a pill handle whose position and length mirror the scroll offset;
 * hovering raises a track scrim so the grab target reads. The scrolling
 * region, not the bar, owns the behaviour: it is presentational
 * (aria-hidden), takes no focus and fires no events — expose scrolling
 * through the region itself.
 *
 * `value` and `size` are code inputs the spec leaves to the implementation
 * (Figma draws one sample). Size the bar to the region's edge with
 * `--zds-scrollbar-length` (typically `100%`); unset, it draws at the
 * sample length.
 *
 * No Base UI primitive is wrapped: the bar is a static indicator with no
 * behaviour or accessibility of its own to delegate.
 *
 * @spec specs/scrollbar/scrollbar.spec.md
 */
export const Scrollbar = React.forwardRef(function Scrollbar({ orientation = "vertical", value = 0, size = 0.32, className, style, ...rest }, ref) {
    return (_jsxs("div", { ref: ref, ...rest, "aria-hidden": true, className: ["zds-scrollbar", className].filter(Boolean).join(" "), "data-orientation": orientation, style: {
            ...style,
            ["--zds-scrollbar-value"]: clamp01(value),
            ["--zds-scrollbar-size"]: clamp01(size),
        }, children: [_jsx("span", { className: "zds-scrollbar__track" }), _jsx("span", { className: "zds-scrollbar__rail", children: _jsx("span", { className: "zds-scrollbar__handle" }) })] }));
});
