import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Field } from "@base-ui/react/field";
import { InputField } from "../input-field/InputField.js";
import { InputHint } from "./InputHint.js";
import { InputLabel } from "./InputLabel.js";
import "./input.css";
/**
 * The full field assembly, a label above, the field itself and a hint below,
 * stacked and spaced as one unit.
 *
 * Behaviour — the label and hint wired to the input, disabled and invalid
 * semantics, form name — comes from Base UI's Field. In code the assembly
 * surfaces its parts' properties itself (spec decision), including one
 * general `state`: `invalid` makes the field invalid and the hint an error;
 * `disabled` disables the field and dims the label and hint. A required label
 * carries the asterisk and makes the field required.
 *
 * Defaults are the size and shape an Input arrives with: medium, rounded.
 * Kept in step with packages/web-components `<zds-input>`.
 *
 * @spec specs/input/input.spec.md
 */
export const Input = React.forwardRef(function Input({ label, labelType = "default", information = false, informationLabel = "More information", subLabel, hint, hintIcon = true, state = "default", size = "medium", shape = "rounded", block = false, name, className, ...fieldProps }, ref) {
    const disabled = state === "disabled";
    const invalid = state === "invalid";
    const hintType = disabled ? "disabled" : invalid ? "error" : "default";
    return (_jsxs(Field.Root, { className: ["zds-input", className].filter(Boolean).join(" "), name: name, disabled: disabled, invalid: invalid, "data-state": state, "data-block": block ? "" : undefined, children: [label ? (_jsx(InputLabel, { type: labelType, information: information, informationLabel: informationLabel, subLabel: subLabel, children: label })) : null, _jsx(InputField, { ref: ref, ...fieldProps, block: true, size: size, shape: shape, name: name, disabled: disabled, invalid: invalid, required: labelType === "required" }), hint ? _jsx(InputHint, { type: hintType, icon: hintIcon, children: hint }) : null] }));
});
