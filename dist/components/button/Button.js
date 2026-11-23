import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Button as BaseButton } from "@base-ui/react/button";
import { Icon } from "../icon/Icon.js";
import "./button.css";
/**
 * Triggers an action from a text label, with optional icons on either side.
 *
 * Behaviour — focus handling, the disabled semantics, `render` polymorphism —
 * comes from Base UI's Button. Everything visual comes from the token layer via
 * `button.css`, keyed off data attributes, so an `.ext-*` / `.mode-*` class on
 * any ancestor re-themes it with no re-render.
 *
 * @spec specs/button/button.spec.md
 */
export const Button = React.forwardRef(function Button({ flavour = "primary", size = "medium", shape = "rounded", leadingIcon, trailingIcon, className, children, ...rest }, ref) {
    // The icon follows the button's shape: only shape="sharp" takes the sharp
    // family. Button pins this rather than exposing it.
    const iconStyle = shape === "sharp" ? "sharp" : "rounded";
    // Icon's size axis has no "large" consumer here: medium and large buttons
    // both use the medium icon (see the icon spec's own size note).
    const iconSize = size === "small" ? "small" : "medium";
    return (_jsxs(BaseButton, { ref: ref, ...rest, className: ["zds-button", className].filter(Boolean).join(" "), "data-flavour": flavour, "data-size": size, "data-shape": shape, children: [leadingIcon ? (_jsx(Icon, { className: "zds-button__icon", name: leadingIcon, iconStyle: iconStyle, size: iconSize })) : null, _jsx("span", { className: "zds-button__label", children: children }), trailingIcon ? (_jsx(Icon, { className: "zds-button__icon", name: trailingIcon, iconStyle: iconStyle, size: iconSize })) : null] }));
});
