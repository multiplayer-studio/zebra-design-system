import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox";
import { Icon } from "../icon/Icon.js";
import "./checkbox.css";
/**
 * A square control for turning a single option on or off, with an optional
 * label beside it. Checked carries three values rather than two, so a
 * checkbox that summarises a set of others can say indeterminate instead of
 * guessing between on and off. Reach for it wherever options are independent
 * of each other, and reach for Radio where exactly one of a set has to win.
 *
 * Behaviour — the `checkbox` role, checked and indeterminate state
 * (`aria-checked="mixed"`), keyboard, disabled semantics, the hidden form
 * input — comes from Base UI's Checkbox. The spec's one Checked axis maps to
 * `checked` + `indeterminate`; indeterminate wins and is set from the
 * children, never chosen. Everything visual comes from the token layer via
 * `checkbox.css`, keyed off Base UI's `[data-checked]` /
 * `[data-indeterminate]` / `[data-disabled]` and our `data-size`. The mark is
 * mounted only when checked or indeterminate.
 *
 * Kept in step with packages/web-components `<zds-checkbox>`.
 *
 * @spec specs/checkbox/checkbox.spec.md
 */
export const Checkbox = React.forwardRef(function Checkbox({ size = "large", label, className, ...rest }, ref) {
    // The mark is a font glyph sized to the box less its stroke, set in CSS.
    const markStyle = { width: "var(--zds-checkbox-mark)", height: "var(--zds-checkbox-mark)", fontSize: "var(--zds-checkbox-mark)" };
    return (_jsxs("label", { className: ["zds-checkbox", className].filter(Boolean).join(" "), "data-size": size, children: [_jsx("span", { className: "zds-checkbox__target", children: _jsx(BaseCheckbox.Root, { ref: ref, ...rest, className: "zds-checkbox__box", children: _jsx(BaseCheckbox.Indicator, { className: "zds-checkbox__mark", children: _jsx(Icon, { name: rest.indeterminate ? "remove" : "check-mark", iconStyle: "rounded", style: markStyle }) }) }) }), label != null && label !== "" ? _jsx("span", { className: "zds-checkbox__label", children: label }) : null] }));
});
