import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Input as BaseInput } from "@base-ui/react/input";
import { Icon } from "../icon/Icon.js";
import { Divider } from "../divider/Divider.js";
import "./input-field.css";
/**
 * The text entry control on its own, without a label or hint around it. One
 * model covers five input types, Text, Number, Password, Date and Time, which
 * share the same Size, Shape, State and Flavour and differ only in their
 * placeholder and in the control sitting at the trailing edge.
 *
 * Behaviour — the native input, disabled semantics, form participation, and
 * labelling when it sits in a Base UI Field — comes from Base UI's Input.
 * Everything visual comes from the token layer via `input-field.css`, keyed
 * off data attributes. The spec's State is derived and reflected as
 * `data-state`: keyboard focus on an empty field `focus`, pointer focus
 * `selected`, focus with a value `typing` (clear appears), a value at rest
 * `filled`; `invalid`, `readOnly` and `disabled` come from props.
 *
 * Kept in step with packages/web-components `<zds-input-field>`.
 *
 * @spec specs/input/input.spec.md
 */
export const InputField = React.forwardRef(function InputField({ type = "text", size = "medium", shape = "rounded", flavour = "default", invalid = false, block = false, value: valueProp, defaultValue = "", onValueChange, onClear, leadingIcon = null, leadingContent, trailingIcon, clearLabel = "Clear", inputMode, autoComplete, disabled = false, readOnly = false, className, onFocus, onBlur, children: _children, ...rest }, forwardedRef) {
    const [inner, setInner] = React.useState(defaultValue);
    const value = valueProp ?? inner;
    const setValue = (v) => { if (valueProp === undefined)
        setInner(v); onValueChange?.(v); };
    const inputRef = React.useRef(null);
    const rootRef = React.useRef(null);
    const setRefs = (el) => {
        inputRef.current = el;
        if (typeof forwardedRef === "function")
            forwardedRef(el);
        else if (forwardedRef)
            forwardedRef.current = el;
    };
    // :focus-visible can't separate keyboard from pointer focus on a text input.
    const pointerPressed = React.useRef(false);
    const [focused, setFocused] = React.useState(false);
    const [keyboardFocus, setKeyboardFocus] = React.useState(false);
    const [revealed, setRevealed] = React.useState(false);
    const state = disabled ? "disabled"
        : focused ? (value ? "typing" : keyboardFocus ? "focus" : "selected")
            : invalid ? "invalid" : readOnly ? "read-only" : value ? "filled" : "enabled";
    const leaveIfOutside = (e) => {
        if (rootRef.current?.contains(e.relatedTarget))
            return;
        setFocused(false);
        setKeyboardFocus(false);
        pointerPressed.current = false;
    };
    const clear = () => { setValue(""); onClear?.(); inputRef.current?.focus(); };
    const openPicker = () => {
        if (disabled || readOnly)
            return;
        inputRef.current?.focus();
        try {
            inputRef.current?.showPicker?.();
        }
        catch { /* needs a user gesture */ }
    };
    const iconSize = size === "small" ? "small" : "medium";
    const control = (icon, label, onClick, pressed) => (_jsx("button", { type: "button", className: "zds-input-field__control", "aria-label": label, "aria-pressed": pressed, disabled: disabled || readOnly, onPointerDown: (e) => e.preventDefault(), onClick: onClick, onBlur: leaveIfOutside, children: _jsx(Icon, { name: icon, size: iconSize, iconStyle: "rounded" }) }));
    const typing = state === "typing" && !readOnly;
    const clearControl = control("cancel", clearLabel, clear);
    const typeControl = type === "password" ? control(revealed ? "visibility-off" : "visibility", revealed ? "Hide password" : "Show password", () => setRevealed((r) => !r), revealed)
        : type === "date" ? control("calendar-3-day", "Choose date", openPicker)
            : type === "time" ? control("clock-outline", "Choose time", openPicker)
                : null;
    const decorative = trailingIcon === null ? null : trailingIcon ?? (type === "number" ? "dialpad" : null);
    let trailing = null;
    if (typeControl)
        trailing = typing ? _jsxs(_Fragment, { children: [clearControl, _jsx(Divider, { className: "zds-input-field__divider", orientation: "vertical", "aria-hidden": "true" }), typeControl] }) : typeControl;
    else if (typing)
        trailing = clearControl;
    else if (decorative)
        trailing = _jsx(Icon, { className: "zds-input-field__icon", name: decorative, size: iconSize, iconStyle: "rounded" });
    const showLeading = !!leadingIcon && type !== "date" && type !== "time";
    return (_jsxs("div", { ref: rootRef, className: ["zds-input-field", className].filter(Boolean).join(" "), "data-type": type, "data-size": size, "data-shape": shape, "data-flavour": flavour, "data-state": state, "data-block": block ? "" : undefined, onPointerDown: () => { pointerPressed.current = true; }, children: [showLeading ? _jsx(Icon, { className: "zds-input-field__icon", name: leadingIcon, size: iconSize, iconStyle: "rounded" }) : null, leadingContent ? _jsx("span", { className: "zds-input-field__leading-content", children: leadingContent }) : null, _jsx(BaseInput, { ref: setRefs, ...rest, className: "zds-input-field__input", type: type === "password" && revealed ? "text" : type, value: value, disabled: disabled, readOnly: readOnly, inputMode: inputMode ?? (type === "number" ? "decimal" : undefined), "aria-invalid": invalid || undefined, autoComplete: autoComplete ?? (type === "password" ? "current-password" : "off"), onValueChange: (v) => setValue(v), onFocus: (e) => { setFocused(true); setKeyboardFocus(!pointerPressed.current); pointerPressed.current = false; onFocus?.(e); }, onBlur: (e) => { leaveIfOutside(e); onBlur?.(e); } }), trailing ? _jsx("span", { className: "zds-input-field__trailing", children: trailing }) : null] }));
});
