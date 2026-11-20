import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Icon } from "../icon/Icon.js";
import { StepCardShapeContext, StepShowSubtitleContext } from "./context.js";
import "./step.css";
const STATUS_TEXT = {
    default: "not started", complete: "complete", active: "current step", partial: "in progress", error: "failed", disabled: "unavailable",
};
const cx = (...c) => c.filter(Boolean).join(" ");
/** The numbered circle. Its fill, its border and number-or-glyph all come from `status`. */
function Indicator({ status, stepNumber }) {
    return (_jsx("span", { className: "zds-step__indicator", "aria-hidden": "true", children: status === "complete" ? _jsx(Icon, { name: "check-mark", size: "small" })
            : status === "error" ? _jsx(Icon, { name: "priority", size: "small" })
                : _jsx("span", { className: "zds-step__number", "data-auto": stepNumber == null ? "" : undefined, children: stepNumber }) }));
}
/** The label, the optional subtitle and the status in words for assistive tech. A button when `onSelect` is set. */
function StepText({ status, label, subtitle, showSubtitle, onSelect }) {
    const stepperShows = React.useContext(StepShowSubtitleContext);
    const content = (_jsxs(_Fragment, { children: [_jsx("span", { className: "zds-step__label", children: label }), stepperShows && (showSubtitle ?? subtitle != null) && subtitle != null ? _jsx("span", { className: "zds-step__subtitle", children: subtitle }) : null, _jsx("span", { className: "zds-step__sr", children: `, ${STATUS_TEXT[status]}` })] }));
    return onSelect && status !== "disabled"
        ? _jsx("button", { type: "button", className: "zds-step__text", onClick: onSelect, children: content })
        : _jsx("span", { className: "zds-step__text", children: content });
}
function rootProps(kind, status, className) {
    return {
        className: cx("zds-step", className),
        "data-kind": kind,
        "data-status": status,
        "aria-current": status === "active" ? "step" : undefined,
    };
}
/**
 * One step of Horizontal Stepper: the label centred under its indicator, and
 * the connector running on to the next step.
 *
 * @spec specs/stepper/stepper.spec.md
 */
export const StepHorizontal = React.forwardRef(function StepHorizontal({ status = "default", label, subtitle, showSubtitle, stepNumber, showLine, onSelect, className, ...rest }, ref) {
    return (_jsxs("li", { ref: ref, ...rest, ...rootProps("horizontal", status, className), "data-line": showLine === undefined ? "auto" : showLine ? "on" : "off", children: [_jsxs("span", { className: "zds-step__head", children: [_jsx(Indicator, { status: status, stepNumber: stepNumber }), _jsx(StepText, { status: status, label: label, subtitle: subtitle, showSubtitle: showSubtitle, onSelect: onSelect })] }), _jsx("span", { className: "zds-step__track", "aria-hidden": "true", children: _jsx("span", { className: "zds-step__line" }) })] }));
});
/**
 * One step of Vertical Stepper's rail: the label beside its indicator, and
 * the connector dropping to the next step.
 *
 * @spec specs/stepper/stepper.spec.md
 */
export const StepVertical = React.forwardRef(function StepVertical({ status = "default", label, subtitle, showSubtitle, stepNumber, showLine, onSelect, className, ...rest }, ref) {
    return (_jsxs("li", { ref: ref, ...rest, ...rootProps("vertical", status, className), "data-line": showLine === undefined ? "auto" : showLine ? "on" : "off", children: [_jsxs("span", { className: "zds-step__rail", children: [_jsx(Indicator, { status: status, stepNumber: stepNumber }), _jsx("span", { className: "zds-step__line", "aria-hidden": "true" })] }), _jsx(StepText, { status: status, label: label, subtitle: subtitle, showSubtitle: showSubtitle, onSelect: onSelect })] }));
});
/**
 * One step of the cards arrangement: a bordered surface carrying the
 * indicator and the label side by side, with no connector.
 *
 * @spec specs/stepper/stepper.spec.md
 */
export const StepCard = React.forwardRef(function StepCard({ status = "default", label, subtitle, showSubtitle, stepNumber, shape: shapeProp, onSelect, className, ...rest }, ref) {
    const inherited = React.useContext(StepCardShapeContext);
    return (_jsxs("li", { ref: ref, ...rest, ...rootProps("card", status, className), "data-shape": shapeProp ?? inherited, children: [_jsx(Indicator, { status: status, stepNumber: stepNumber }), _jsx(StepText, { status: status, label: label, subtitle: subtitle, showSubtitle: showSubtitle, onSelect: onSelect })] }));
});
/**
 * One division of the compact Horizontal Stepper's bar. It carries no text:
 * the summary above the bar does the naming. Never interactive.
 *
 * @spec specs/stepper/stepper.spec.md
 */
export const StepSegment = React.forwardRef(function StepSegment({ status = "default", className, ...rest }, ref) {
    return _jsx("li", { ref: ref, ...rest, className: cx("zds-step-segment", className), "data-status": status });
});
