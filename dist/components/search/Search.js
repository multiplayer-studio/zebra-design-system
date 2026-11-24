import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Input as BaseInput } from "@base-ui/react/input";
import { Icon } from "../icon/Icon.js";
import { Divider } from "../divider/Divider.js";
import "./search.css";
/**
 * A single-line input for typing a query, with a magnifier leading it and a
 * trailing control that takes whatever icon and function the implementation
 * passes.
 *
 * Behaviour — the native input, disabled semantics, form participation —
 * comes from Base UI's Input. Everything visual comes from the token layer
 * via `search.css`, keyed off data attributes. The spec's State axis is not a
 * prop; it follows from the field and is reflected as `data-state`:
 * keyboard focus on an empty field is `focus` (the heaviest border), pointer
 * focus is `selected`, focus with text is `typing` (the clear control
 * appears), text without focus is `filled`.
 *
 * The field has no label of its own (spec accessibility): pass `aria-label`
 * or `aria-labelledby`. The spec's `Show Cancel` property is not built —
 * Figma wires it to nothing.
 *
 * Kept in step with packages/web-components `<zds-search>`.
 *
 * @spec specs/search/search.spec.md
 */
export const Search = React.forwardRef(function Search({ shape = "sharp", size = "large", flavour = "default", hideFocusOutline = false, block = false, value: valueProp, defaultValue = "", onValueChange, onSearch, onClear, leadingIcon = "search", trailingIcon, trailingLabel, onTrailingClick, clearLabel = "Clear search", disabled = false, placeholder = "Search", className, onFocus, onBlur, onKeyDown, 
// An <input> can't hold children; drop any that arrive at run time.
children: _children, ...rest }, forwardedRef) {
    const [inner, setInner] = React.useState(defaultValue);
    const value = valueProp ?? inner;
    const setValue = (v) => {
        if (valueProp === undefined)
            setInner(v);
        onValueChange?.(v);
    };
    const inputRef = React.useRef(null);
    const rootRef = React.useRef(null);
    const setRefs = (el) => {
        inputRef.current = el;
        if (typeof forwardedRef === "function")
            forwardedRef(el);
        else if (forwardedRef)
            forwardedRef.current = el;
    };
    // :focus-visible matches every focus on a text input, so it can't tell the
    // spec's keyboard `focus` from pointer `selected`. Track the modality.
    const pointerPressed = React.useRef(false);
    const [focused, setFocused] = React.useState(false);
    const [keyboardFocus, setKeyboardFocus] = React.useState(false);
    const state = disabled
        ? "disabled"
        : focused
            ? value.length > 0 ? "typing" : keyboardFocus ? "focus" : "selected"
            : value.length > 0 ? "filled" : "enabled";
    const leaveIfOutside = (e) => {
        // Focus moving to the clear or trailing control stays inside the field.
        if (rootRef.current?.contains(e.relatedTarget))
            return;
        setFocused(false);
        setKeyboardFocus(false);
        pointerPressed.current = false;
    };
    const clear = () => {
        setValue("");
        onClear?.();
        inputRef.current?.focus();
    };
    // Icon size is the nested Icon's own Size variant, pinned per field size;
    // every icon uses the Rounded family, as the spec pins. All small icons are
    // 16 here (spec warn "the small typing group's icons render 20").
    const iconSize = size === "small" ? "small" : "medium";
    const showClear = state === "typing";
    return (_jsxs("div", { ref: rootRef, className: ["zds-search", className].filter(Boolean).join(" "), "data-shape": shape, "data-size": size, "data-flavour": flavour, "data-state": state, "data-disabled": disabled ? "" : undefined, "data-hide-focus-outline": hideFocusOutline ? "" : undefined, "data-block": block ? "" : undefined, onPointerDown: () => { pointerPressed.current = true; }, children: [leadingIcon ? _jsx(Icon, { className: "zds-search__leading", name: leadingIcon, size: iconSize, iconStyle: "rounded" }) : null, _jsx(BaseInput, { ref: setRefs, ...rest, className: "zds-search__input", type: "search", value: value, placeholder: placeholder, disabled: disabled, enterKeyHint: "search", autoComplete: "off", onValueChange: (v) => setValue(v), onFocus: (e) => {
                    setFocused(true);
                    setKeyboardFocus(!pointerPressed.current);
                    pointerPressed.current = false;
                    onFocus?.(e);
                }, onBlur: (e) => { leaveIfOutside(e); onBlur?.(e); }, onKeyDown: (e) => { if (e.key === "Enter")
                    onSearch?.(value); onKeyDown?.(e); } }), showClear || trailingIcon ? (_jsxs("span", { className: "zds-search__trailing", children: [showClear ? (_jsx("button", { type: "button", className: "zds-search__control", "aria-label": clearLabel, onClick: clear, onBlur: leaveIfOutside, children: _jsx(Icon, { name: "cancel", size: iconSize, iconStyle: "rounded" }) })) : null, showClear && trailingIcon ? _jsx(Divider, { className: "zds-search__divider", orientation: "vertical", "aria-hidden": "true" }) : null, trailingIcon ? (_jsx("button", { type: "button", className: "zds-search__control", "aria-label": trailingLabel, disabled: disabled, onClick: onTrailingClick, onBlur: leaveIfOutside, children: _jsx(Icon, { name: trailingIcon, size: iconSize, iconStyle: "rounded" }) })) : null] })) : null] }));
});
