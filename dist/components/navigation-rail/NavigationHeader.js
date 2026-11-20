import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Avatar } from "../avatar/Avatar.js";
import { Icon } from "../icon/Icon.js";
import { IconButton } from "../icon-button/IconButton.js";
import { NavigationRailContext } from "./context.js";
import "./navigation-rail.css";
/**
 * The top of a Navigation Rail: an avatar or logo mark, and in the wide form
 * a title and a settings action.
 *
 * @spec specs/navigation-rail/navigation-rail.spec.md (subcomponents › Navigation Header)
 */
export const NavigationHeader = React.forwardRef(function NavigationHeader({ type = "avatar", expanded: expandedProp = true, heading = "Title", showTitle = true, showIconButton = true, actionLabel = "Settings", actionIcon = "settings", onAction, shape: shapeProp = "rounded", avatarInitials = "ZB", avatarSrc, className, ...rest }, ref) {
    const rail = React.useContext(NavigationRailContext);
    const expanded = rail ? rail.expanded : expandedProp;
    const shape = rail ? rail.shape : shapeProp;
    return (_jsxs("div", { ref: ref, ...rest, className: ["zds-navigation-header", className].filter(Boolean).join(" "), "data-type": type, "data-expanded": expanded ? "" : undefined, children: [_jsxs("div", { className: "zds-navigation-header__brand", children: [type === "avatar" ? (
                    // Avatar Size=small, status on, ring and close off (spec).
                    _jsx(Avatar, { size: "small", type: avatarSrc ? "photo" : "initials", src: avatarSrc, initials: avatarInitials, alt: heading, showStatus: true, showRing: false, showClose: false })) : (
                    // Icon Size=large, Framed (spec: height control/target-min).
                    _jsx(Icon, { className: "zds-navigation-header__logo", name: "zebra", size: "large", framed: true, label: expanded ? undefined : heading })), expanded && showTitle ? _jsx("span", { className: "zds-navigation-header__title", children: heading }) : null] }), expanded && showIconButton ? (
            // Figma pins Shape=sharp; the rail's shape sets it (owner decision).
            _jsx(IconButton, { flavour: "subtle", size: "small", shape: shape, icon: actionIcon, label: actionLabel, onClick: onAction })) : null] }));
});
