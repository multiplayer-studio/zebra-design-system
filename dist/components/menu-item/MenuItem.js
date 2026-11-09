import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Menu } from "@base-ui/react/menu";
import { Icon } from "../icon/Icon.js";
import "../checkbox/checkbox.css";
import "../radio/radio.css";
import "./menu-item.css";
/**
 * The nearest enclosing `DropdownMenu`'s own `rounded`, so a `MenuItem`
 * defaults to matching its panel without every row having to say so. Not
 * exported — it's plumbing between `DropdownMenu` and `MenuItem`, not a
 * public theming context (see the skill's "no React context" rule, which is
 * about theming; this carries a structural default, not a theme).
 *
 * @spec specs/dropdown/dropdown.spec.md — "Rounded propagation"
 */
export const MenuItemRoundedContext = React.createContext(false);
/**
 * A single row inside a Dropdown Menu: a leading element, a label and an
 * optional trailing icon.
 *
 * Behaviour — roving highlight, keyboard navigation, `[data-disabled]` —
 * comes from Base UI's `Menu.Item`. Hover/keyboard-highlight is Base UI's own
 * `data-highlighted`; keyboard focus is real DOM focus, styled with
 * `:focus-visible` rather than a hand-rolled focus state. `selected` is the
 * one state this component adds itself (see the prop's doc). Everything
 * visual comes from the token layer via `menu-item.css`.
 *
 * @spec specs/dropdown/dropdown.spec.md
 */
/*
 * The leading Checkbox / Radio only shows the row's state. The row is the
 * interactive element, and Base UI's controls render a <button> (and Radio
 * needs a RadioGroup), so this draws the same markup their stylesheets key
 * off, inert and hidden from assistive technology. Figma leaves the control
 * unchecked in every state (spec warn); code follows the row.
 */
function MenuItemControl({ type, checked, disabled }) {
    const state = { "data-checked": checked ? "" : undefined, "data-unchecked": checked ? undefined : "", "data-disabled": disabled ? "" : undefined };
    if (type === "checkbox") {
        const markStyle = { width: "var(--zds-checkbox-mark)", height: "var(--zds-checkbox-mark)", fontSize: "var(--zds-checkbox-mark)" };
        return (_jsx("span", { className: "zds-checkbox zds-menu-item__control", "data-size": "medium", "aria-hidden": "true", children: _jsx("span", { className: "zds-checkbox__target", children: _jsx("span", { className: "zds-checkbox__box", ...state, children: checked ? (_jsx("span", { className: "zds-checkbox__mark", children: _jsx(Icon, { name: "check-mark", iconStyle: "rounded", style: markStyle }) })) : null }) }) }));
    }
    return (_jsx("span", { className: "zds-radio zds-menu-item__control", "data-size": "medium", "aria-hidden": "true", children: _jsx("span", { className: "zds-radio__target", children: _jsx("span", { className: "zds-radio__ring", ...state, children: _jsx("span", { className: "zds-radio__dot", ...state }) }) }) }));
}
export const MenuItem = React.forwardRef(function MenuItem({ type = "icon", leadingIcon, trailingIcon, leadingSlot, rounded, selected: selectedProp, defaultSelected = false, onSelectedChange, closeOnClick, onClick, className, children, ...rest }, ref) {
    const inheritedRounded = React.useContext(MenuItemRoundedContext);
    const isRounded = rounded ?? inheritedRounded;
    const choice = type === "checkbox" || type === "radio";
    const [ownSelected, setOwnSelected] = React.useState(defaultSelected);
    const selected = selectedProp ?? ownSelected;
    const activate = (event) => {
        onClick?.(event);
        if (!choice || rest.disabled || event.defaultPrevented)
            return;
        const next = type === "checkbox" ? !selected : true;
        if (next === selected)
            return;
        if (selectedProp === undefined)
            setOwnSelected(next);
        onSelectedChange?.(next);
    };
    const leading = type === "custom" ? leadingSlot ?? null
        : choice ? _jsx(MenuItemControl, { type: type, checked: selected, disabled: Boolean(rest.disabled) })
            : leadingIcon ? _jsx(Icon, { name: leadingIcon }) : null;
    return (_jsxs(Menu.Item, { ref: ref, ...rest, className: ["zds-menu-item", className].filter(Boolean).join(" "), "data-type": type, "data-rounded": isRounded, 
        // A choice keeps the menu open, so several options can be set in one go.
        closeOnClick: closeOnClick ?? !choice, onClick: activate, "data-selected": selected || undefined, role: choice ? (type === "checkbox" ? "menuitemcheckbox" : "menuitemradio") : undefined, "aria-checked": choice ? selected : undefined, children: [leading ? _jsx("span", { className: "zds-menu-item__leading", children: leading }) : null, _jsx("span", { className: "zds-menu-item__label", children: children }), trailingIcon ? (_jsx(Icon, { className: "zds-menu-item__trailing", name: trailingIcon })) : null] }));
});
