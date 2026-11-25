import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
import { StepCardShapeContext, StepShowSubtitleContext } from "./context.js";
import "./stepper.css";
const cx = (...c) => c.filter(Boolean).join(" ");
/**
 * Shows where a person is in a fixed sequence of steps, in a row. A
 * navigation landmark holding an ordered list; the active step carries
 * `aria-current="step"`. Name it with `aria-label`.
 *
 * On compact the bar holds no text and is hidden from assistive tech, so the
 * count and title above it are what is announced.
 *
 * @spec specs/stepper/stepper.spec.md
 */
export const HorizontalStepper = React.forwardRef(function HorizontalStepper({ size = "default", children, currentStep, totalSteps, label, subtitle, showSubtitle = true, className, ...rest }, ref) {
    return (_jsx("nav", { "aria-label": "Progress", ref: ref, ...rest, className: cx("zds-stepper", className), "data-orientation": "horizontal", "data-size": size, children: size === "compact" ? (_jsxs(_Fragment, { children: [_jsxs("div", { className: "zds-stepper__summary", children: [_jsxs("p", { className: "zds-stepper__step-info", children: [_jsx("span", { children: "STEP" }), " ", _jsx("span", { children: currentStep }), " ", _jsx("span", { children: "OF" }), " ", _jsx("span", { children: totalSteps })] }), _jsxs("div", { className: "zds-stepper__heading", children: [_jsx("p", { className: "zds-stepper__title", children: label }), showSubtitle && subtitle != null ? _jsx("p", { className: "zds-stepper__subtitle", children: subtitle }) : null] })] }), _jsx("ol", { className: "zds-stepper__segments", "aria-hidden": "true", children: children })] })) : (_jsx(StepShowSubtitleContext.Provider, { value: showSubtitle, children: _jsx("ol", { className: "zds-stepper__steps", children: children }) })) }));
});
/**
 * Shows where a person is in a fixed sequence of steps, in a column: a rail,
 * or a column of cards. A navigation landmark holding an ordered list; the
 * active step carries `aria-current="step"`. Name it with `aria-label`.
 *
 * @spec specs/stepper/stepper.spec.md
 */
export const VerticalStepper = React.forwardRef(function VerticalStepper({ card = false, rounded = false, children, className, ...rest }, ref) {
    return (_jsx("nav", { "aria-label": "Progress", ref: ref, ...rest, className: cx("zds-stepper", className), "data-orientation": "vertical", "data-card": card ? "" : undefined, children: _jsx(StepCardShapeContext.Provider, { value: rounded ? "rounded" : "sharp", children: _jsx("ol", { className: "zds-stepper__steps", children: children }) }) }));
});
