import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Field } from "@base-ui/react/field";
import { NumberField } from "@base-ui/react/number-field";
import { IconButton } from "../icon-button/IconButton.js";
import { InputHint } from "../input/InputHint.js";
import "../input-field/input-field.css";
import "./stepper-input.css";
const clamp = (v, min, max) => Math.min(max ?? Infinity, Math.max(min ?? -Infinity, v));
const decimals = (n) => (String(n).split(".")[1] ?? "").length;
/**
 * A numeric value with a button on either side to decrease or increase it,
 * and an optional hint below.
 *
 * Behaviour comes from Base UI's NumberField: typing a value, the buttons
 * disabling at `min` / `max`, press-and-hold repeat, ArrowUp / ArrowDown
 * (Shift for `largeStep`) and Home / End. Two things it lacks are added here,
 * matching `<zds-stepper-input>`: PageUp / PageDown move by `largeStep`, and
 * the input carries spinbutton semantics (role, aria-valuenow / min / max).
 *
 * Reuses rather than redraws: the buttons are IconButton (outline-subtle,
 * `remove` / `add`), the value box is InputField's styling (`.zds-input-field`
 * classes and data attributes), the hint is Input Hint, so all three keep
 * their own hover, focus, disabled and invalid states.
 *
 * Kept in step with packages/web-components `<zds-stepper-input>`.
 *
 * @spec specs/stepper-input/stepper-input.spec.md
 */
export const StepperInput = React.forwardRef(function StepperInput({ value: valueProp, defaultValue, onValueChange, min, max, step = 1, largeStep = 10, size = "medium", shape = "sharp", disabled = false, invalid = false, hint, label, decrementLabel = "Decrease", incrementLabel = "Increase", name, className, }, ref) {
    const [inner, setInner] = React.useState(() => defaultValue ?? clamp(0, min, max));
    const value = valueProp !== undefined ? valueProp : inner;
    const setValue = (v) => {
        if (valueProp === undefined)
            setInner(v);
        onValueChange?.(v);
    };
    // InputField's State, derived as InputField derives it: pointer focus vs
    // keyboard focus, tracked from pointerdown.
    const pointerPressed = React.useRef(false);
    const [focused, setFocused] = React.useState(false);
    const [keyboardFocus, setKeyboardFocus] = React.useState(false);
    const fieldState = disabled ? "disabled"
        : focused ? (value != null ? "typing" : keyboardFocus ? "focus" : "selected")
            : invalid ? "invalid" : value != null ? "filled" : "enabled";
    // Base UI has no PageUp / PageDown (1.8): step by largeStep, as the spec's
    // spinbutton keyboard asks and as <zds-stepper-input> does.
    const onKeyDown = (e) => {
        if (e.key !== "PageUp" && e.key !== "PageDown")
            return;
        e.preventDefault();
        const from = value ?? clamp(0, min, max);
        const next = from + (e.key === "PageUp" ? largeStep : -largeStep);
        setValue(clamp(Number(next.toFixed(Math.max(decimals(step), decimals(largeStep), decimals(from)))), min, max));
    };
    // Value width: Figma's fixed 72px has no token. The box fits the widest
    // bound as formatted (in ch of the value's font), and never narrows below
    // 2 × control/sm (72px at desktop, the Figma width). The character count is
    // the one inline value, a measurement rather than a themed one.
    const fmt = new Intl.NumberFormat();
    const chars = Math.max(fmt.format(max ?? 999).length, fmt.format(min ?? 0).length);
    // Corners: the spec metadata says the value stays square while the buttons
    // round; Figma rounds the value too (spec issue "The value rounds too"). We
    // follow the metadata intent: InputField is always `sharp` here.
    const buttonShape = shape === "rounded" ? "rounded" : "sharp";
    // Disabled keeps the buttons' outline-subtle flavour with its disabled
    // tokens; Figma's switch to primary is not copied (spec note).
    const stepButton = (icon, buttonLabel) => (_jsx(IconButton, { label: buttonLabel, icon: icon, flavour: "outline-subtle", size: size, shape: buttonShape }));
    return (_jsxs(Field.Root, { className: ["zds-stepper-input", className].filter(Boolean).join(" "), disabled: disabled, invalid: invalid, "data-size": size, "data-shape": shape, children: [_jsx(NumberField.Root, { className: "zds-stepper-input__root", value: value, onValueChange: (v) => setValue(v), min: min, max: max, step: step, largeStep: largeStep, disabled: disabled, name: name, children: _jsxs(NumberField.Group, { className: "zds-stepper-input__control", children: [_jsx(NumberField.Decrement, { className: "zds-stepper-input__decrement", "aria-label": decrementLabel, render: stepButton("remove", decrementLabel) }), _jsx("div", { className: "zds-input-field zds-stepper-input__value", "data-type": "text", "data-size": size, "data-shape": "sharp", "data-flavour": "default", "data-state": fieldState, style: { "--zds-stepper-input-chars": chars }, onPointerDown: () => { pointerPressed.current = true; }, children: _jsx(NumberField.Input, { ref: ref, className: "zds-input-field__input", "aria-label": label, role: "spinbutton", "aria-valuenow": value ?? undefined, "aria-valuemin": min, "aria-valuemax": max, onKeyDown: onKeyDown, onFocus: () => { setFocused(true); setKeyboardFocus(!pointerPressed.current); pointerPressed.current = false; }, onBlur: () => { setFocused(false); setKeyboardFocus(false); pointerPressed.current = false; } }) }), _jsx(NumberField.Increment, { className: "zds-stepper-input__increment", "aria-label": incrementLabel, render: stepButton("add", incrementLabel) })] }) }), hint ? _jsx(InputHint, { type: disabled ? "disabled" : invalid ? "error" : "default", children: hint }) : null] }));
});
