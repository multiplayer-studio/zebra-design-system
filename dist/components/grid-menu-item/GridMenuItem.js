import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Button as BaseButton } from "@base-ui/react/button";
import { Icon } from "../icon/Icon.js";
import { NotificationIndicator } from "../notification-indicator/NotificationIndicator.js";
import "./grid-menu-item.css";
/**
 * One tile of the grid arrangement inside a bottom sheet: an icon above a
 * short label. Hover and press come from the pointer. Figma draws `active`
 * and `disabled` at the default state only, so neither takes pointer feedback.
 *
 * Kept in step with packages/web-components `<zds-grid-menu-item>`.
 *
 * @spec specs/bottom-sheet/bottom-sheet.spec.md
 */
export const GridMenuItem = React.forwardRef(function GridMenuItem({ label = "Label", icon = "star", active = false, disabled = false, rounded = true, showBadge = false, className, ...rest }, ref) {
    return (_jsxs(BaseButton, { ref: ref, ...rest, disabled: disabled, "aria-current": active ? "true" : undefined, className: ["zds-grid-menu-item", className].filter(Boolean).join(" "), "data-active": active ? "" : undefined, "data-rounded": rounded ? "" : undefined, children: [_jsxs("span", { className: "zds-grid-menu-item__indicator", children: [_jsx(Icon, { name: icon, size: "large" }), showBadge ? _jsx(NotificationIndicator, { className: "zds-grid-menu-item__badge", size: "small" }) : null] }), _jsx("span", { className: "zds-grid-menu-item__label", children: label })] }));
});
