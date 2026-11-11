import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Icon } from "../icon/Icon.js";
import { IconButton } from "../icon-button/IconButton.js";
import { NavigationRailContext } from "./context.js";
import "./navigation-rail.css";
/**
 * The title bar of a Navigation Rail's sub menu panel.
 *
 * Type=sub-page leads with a back Icon Button and sits it `space/sm` from the
 * title; Type=default leads with a glyph at `space/md`. `showLeadingIcon`
 * hides either (Figma wires it in default only — spec warn).
 *
 * @spec specs/navigation-rail/navigation-rail.spec.md (subcomponents › Sub Menu Header)
 */
export const SubMenuHeader = React.forwardRef(function SubMenuHeader({ type = "default", heading = "Sub Header", icon = "verified", showLeadingIcon = true, backLabel = "Back", onBack, shape: shapeProp = "rounded", actions, headingLevel = 2, className, ...rest }, ref) {
    const rail = React.useContext(NavigationRailContext);
    const shape = rail ? rail.shape : shapeProp;
    const H = `h${headingLevel}`;
    return (_jsxs("div", { ref: ref, ...rest, className: ["zds-sub-menu-header", className].filter(Boolean).join(" "), "data-type": type, children: [_jsxs("div", { className: "zds-sub-menu-header__lead", children: [showLeadingIcon ? (type === "sub-page" ? (
                    // Icon Button Size=small, Flavour=subtle (spec, changed 2026-10-21);
                    // Figma pins Shape=sharp, the rail's shape sets it (owner decision).
                    _jsx(IconButton, { className: "zds-sub-menu-header__back", size: "small", flavour: "subtle", shape: shape, icon: "arrow-back", label: backLabel, onClick: onBack })) : (_jsx(Icon, { className: "zds-sub-menu-header__icon", name: icon, size: "medium" }))) : null, _jsx(H, { className: "zds-sub-menu-header__title", children: heading })] }), actions ? _jsx("div", { className: "zds-sub-menu-header__actions", children: actions }) : null] }));
});
