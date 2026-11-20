import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { NavigationMenu } from "@base-ui/react/navigation-menu";
import { Divider } from "../divider/Divider.js";
import { NavigationBarContext } from "./context.js";
import "./navigation-bar.css";
/**
 * A horizontal bar of top-level destinations, pinned to one edge of a view.
 *
 * Built on Base UI's NavigationMenu: Root renders the `<nav>`, List the
 * `<ul>`, and each NavigationItem a NavigationMenu.Item + Link, so the active
 * item carries `aria-current="page"`. Every item stays in the Tab order (they
 * are links, not toolbar buttons, so roving tabindex would hide destinations
 * from Tab users); the List's composite handling adds Left/Right arrow
 * movement on top, which the web component mirrors.
 *
 * It has no fill — only a top border — so it takes the surface behind it.
 *
 * @spec specs/navigation-bar/navigation-bar.spec.md
 */
export const NavigationBar = React.forwardRef(function NavigationBar({ label = "Main", distribution = "start", action, actionDivider = false, className, children, ...rest }, ref) {
    const hasAction = action !== undefined && action !== null && action !== false;
    return (_jsxs(NavigationMenu.Root, { ref: ref, ...rest, "aria-label": label, className: ["zds-navigation-bar", className].filter(Boolean).join(" "), "data-distribution": distribution, children: [_jsx(NavigationMenu.List, { className: "zds-navigation-bar__list", children: _jsx(NavigationBarContext.Provider, { value: true, children: children }) }), hasAction && actionDivider ? (_jsx("div", { className: "zds-navigation-bar__divider-section", "aria-hidden": "true", children: _jsx(Divider, { orientation: "vertical" }) })) : null, hasAction ? _jsx("div", { className: "zds-navigation-bar__action", children: action }) : null] }));
});
/**
 * Splits a Navigation Bar's items into groups: with `distribution="start"`
 * it takes all free space, pushing the items after it to the end. Replaces
 * Figma's `spacer` variant + Right Slot (and its `showDivider` axis) with one
 * part placed where the split goes, so any number of groups works.
 *
 * Decorative: inside the bar it is an `aria-hidden` list item.
 *
 * @spec specs/navigation-bar/navigation-bar.spec.md
 */
export const NavigationBarSpacer = React.forwardRef(function NavigationBarSpacer({ showDivider = false, className, ...rest }, ref) {
    const inBar = React.useContext(NavigationBarContext);
    const props = {
        ...rest,
        "aria-hidden": true,
        className: ["zds-navigation-bar-spacer", className].filter(Boolean).join(" "),
        "data-divider": showDivider ? "" : undefined,
    };
    const line = showDivider ? _jsx(Divider, { orientation: "vertical" }) : null;
    return inBar ? (_jsx("li", { ref: ref, ...props, children: line })) : (_jsx("div", { ref: ref, ...props, children: line }));
});
