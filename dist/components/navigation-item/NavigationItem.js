import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
import { NavigationMenu } from "@base-ui/react/navigation-menu";
import { Icon } from "../icon/Icon.js";
import { NotificationIndicator, } from "../notification-indicator/NotificationIndicator.js";
import { NavigationBarContext } from "../navigation-bar/context.js";
import "./navigation-item.css";
function badgeParts(badge) {
    if (badge === true)
        return { size: "small" };
    if (badge === false || badge === null || badge === undefined || badge === "" || badge === 0)
        return null;
    const value = typeof badge === "number" && badge > 99 ? "99+" : String(badge);
    return { size: value.length > 1 ? "large" : "medium", value };
}
/**
 * A single destination inside a Navigation Bar: an icon above a label, with
 * an optional badge.
 *
 * Inside a NavigationBar it renders Base UI's NavigationMenu.Item (`<li>`)
 * and NavigationMenu.Link, which sets `aria-current="page"` from `active` and
 * joins the bar's composite keyboard handling. Standalone it renders a plain
 * `<a>` / `<button>` with the same visuals and `aria-current`.
 *
 * Hover, pressed and focus are not in Figma (spec issue); they come from the
 * ghost interactive tokens, like a ghost Button. The icon takes the label's
 * colour via currentColor in every state (spec issue: Figma's icon bindings
 * disagree with the label's).
 *
 * @spec specs/navigation-item/navigation-item.spec.md
 */
export const NavigationItem = React.forwardRef(function NavigationItem({ label = "Label", icon = "star", active = false, disabled = false, badge = null, badgeLabel, href, target, rel, className, ...rest }, ref) {
    const inBar = React.useContext(NavigationBarContext);
    const isActive = active && !disabled;
    const b = badgeParts(badge);
    const srText = b ? (badgeLabel ?? b.value) : undefined;
    const content = (_jsxs(_Fragment, { children: [_jsxs("span", { className: "zds-navigation-item__icon", "aria-hidden": "true", children: [_jsx(Icon, { name: icon, size: "medium" }), b ? _jsx(NotificationIndicator, { className: "zds-navigation-item__badge", size: b.size, value: b.value }) : null] }), _jsx("span", { className: "zds-navigation-item__label", children: label }), srText ? _jsx("span", { className: "zds-navigation-item__sr", children: `, ${srText}` }) : null] }));
    const shared = {
        ...rest,
        className: ["zds-navigation-item", className].filter(Boolean).join(" "),
        "data-active": isActive ? "" : undefined,
        "data-disabled": disabled ? "" : undefined,
    };
    const isLink = href !== undefined;
    const linkProps = { href: disabled ? undefined : href, target, rel, "aria-disabled": disabled || undefined };
    if (inBar) {
        return (_jsx(NavigationMenu.Item, { className: "zds-navigation-bar__item", children: _jsx(NavigationMenu.Link, { ref: ref, ...shared, ...(isLink ? linkProps : {}), active: isActive, render: isLink ? undefined : _jsx("button", { type: "button", disabled: disabled }), children: content }) }));
    }
    return isLink ? (_jsx("a", { ref: ref, ...shared, ...linkProps, "aria-current": isActive ? "page" : undefined, children: content })) : (_jsx("button", { ref: ref, type: "button", ...shared, disabled: disabled, "aria-current": isActive ? "page" : undefined, children: content }));
});
