import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Radio as BaseRadio } from "@base-ui/react/radio";
import { RadioGroup as BaseRadioGroup } from "@base-ui/react/radio-group";
import "./radio.css";
/**
 * One option in a set where exactly one can be chosen. Use inside a
 * `RadioGroup`, which owns the selected value, the shared name and the
 * keyboard model (one tab stop, arrow keys move the selection).
 *
 * Behaviour — the `radio` role, checked state, keyboard, disabled semantics,
 * the hidden form input — comes from Base UI's Radio and RadioGroup.
 * Everything visual comes from the token layer via `radio.css`, keyed off
 * Base UI's `[data-checked]` / `[data-unchecked]` / `[data-disabled]` and our
 * `data-size`.
 *
 * Built to the spec's intent where Figma can't express it: a disabled option
 * shows whether it is chosen (spec blocker "a disabled radio can't show
 * whether it's chosen"), and focus is one outline (spec warn "the focus ring
 * is built two ways").
 *
 * Kept in step with packages/web-components `<zds-radio>`.
 *
 * @spec specs/radio-button/radio-button.spec.md
 */
export const Radio = React.forwardRef(function Radio({ size = "large", label, className, ...rest }, ref) {
    return (_jsxs("label", { className: ["zds-radio", className].filter(Boolean).join(" "), "data-size": size, children: [_jsx("span", { className: "zds-radio__target", children: _jsx(BaseRadio.Root, { ref: ref, ...rest, className: "zds-radio__ring", children: _jsx(BaseRadio.Indicator, { className: "zds-radio__dot", keepMounted: true }) }) }), label != null && label !== "" ? _jsx("span", { className: "zds-radio__label", children: label }) : null] }));
});
/**
 * The group that makes exactly one Radio selectable: owns the value, the
 * form name and the keyboard model. Grouping is "carried by whatever groups
 * the instances in code" (spec accessibility) — this is that. Give it an
 * accessible name with `aria-label` or `aria-labelledby`.
 */
export const RadioGroup = React.forwardRef(function RadioGroup({ className, ...rest }, ref) {
    return _jsx(BaseRadioGroup, { ref: ref, ...rest, className: ["zds-radio-group", className].filter(Boolean).join(" ") });
});
