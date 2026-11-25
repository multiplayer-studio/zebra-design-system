import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip";
import "./tooltip.css";
// spec issue "Point is the pointer edge, not the placement": point=bottom
// puts the bubble ABOVE the trigger, i.e. Base UI's side="top".
const POINT_TO_SIDE = {
    bottom: "top",
    top: "bottom",
    left: "right",
    right: "left",
};
// The gap between trigger and bubble: the pointer's depth (--space-2xs) plus
// the same again as clearance, so the tip stops short of the trigger.
// `sideOffset` only takes a number, so the token is read at the positioner's
// own position in the cascade — a condensed or nested theme scope moves it.
function readOffset(el) {
    if (!el)
        return 8; // 2 x --space-2xs's shipped 4px, fallback only (SSR / unmounted)
    const px = parseFloat(getComputedStyle(el).getPropertyValue("--space-2xs"));
    return 2 * (Number.isFinite(px) ? px : 4);
}
function classes(...c) {
    return c.filter(Boolean).join(" ");
}
/**
 * A short floating message that names what an adjacent control does.
 *
 * Behaviour — hover delay, opening on keyboard focus, Escape and click
 * dismissal, keeping the bubble open while the pointer moves onto it,
 * collision flipping and the pointer's cross-axis placement — comes from Base
 * UI's Tooltip (Root/Trigger/Portal/Positioner/Popup/Arrow). Base UI marks the
 * popup up with no role and no `aria-describedby`; this adds both, keeping the
 * popup mounted while closed so the description is there before the bubble
 * is. Everything visual comes from the token layer via `tooltip.css`.
 *
 * With no `trigger` it renders the static bubble only.
 *
 * @spec specs/tooltip/tooltip.spec.md
 */
export const Tooltip = React.forwardRef(function Tooltip({ children, point = "bottom", shape = "rounded", trigger, open, defaultOpen, onOpenChange, delay = 600, closeDelay = 0, describe = true, portalContainer, className, }, ref) {
    const id = React.useId();
    const side = POINT_TO_SIDE[point];
    const positionerRef = React.useRef(null);
    const sideOffset = React.useCallback(() => readOffset(positionerRef.current), []);
    if (!trigger) {
        return (_jsxs("div", { ref: ref, role: "tooltip", className: classes("zds-tooltip", "zds-tooltip--static", className), "data-point": point, "data-shape": shape, "data-side": side, children: [_jsx("span", { className: "zds-tooltip__pointer", "data-side": side, "aria-hidden": "true" }), _jsx("span", { className: "zds-tooltip__label", children: children })] }));
    }
    return (_jsxs(BaseTooltip.Root, { open: open, defaultOpen: defaultOpen, onOpenChange: onOpenChange ? (next) => onOpenChange(next) : undefined, children: [_jsx(BaseTooltip.Trigger, { render: trigger, delay: delay, closeDelay: closeDelay, "aria-describedby": describe ? id : undefined }), _jsx(BaseTooltip.Portal, { container: portalContainer, keepMounted: describe, children: _jsx(BaseTooltip.Positioner, { ref: positionerRef, className: "zds-tooltip__positioner", side: side, sideOffset: sideOffset, children: _jsxs(BaseTooltip.Popup, { ref: ref, id: id, role: "tooltip", className: classes("zds-tooltip", className), "data-point": point, "data-shape": shape, children: [_jsx(BaseTooltip.Arrow, { className: "zds-tooltip__pointer" }), _jsx("span", { className: "zds-tooltip__label", children: children })] }) }) })] }));
});
