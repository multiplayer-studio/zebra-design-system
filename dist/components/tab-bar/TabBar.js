import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Tabs } from "@base-ui/react/tabs";
import { Icon } from "../icon/Icon.js";
import { NotificationIndicator } from "../notification-indicator/NotificationIndicator.js";
import "./tab-bar.css";
/**
 * A row of tabs for switching between views at the same level.
 *
 * Behaviour comes from Base UI's Tabs: `role="tablist"` / `role="tab"`,
 * `aria-selected`, one tab stop on the selected tab, and arrow keys (plus
 * Home/End) that move between tabs and select as they go. Pass `value` and
 * `onValueChange` to control it, or `defaultValue`. Show the matching view
 * yourself from the value; the bar has no panels (spec: tabs only).
 *
 * @spec specs/tab-bar/tab-bar.spec.md
 */
export const TabBar = React.forwardRef(function TabBar({ flavour = "full-width", label, children, className, ...rest }, ref) {
    return (_jsx(Tabs.Root, { ref: ref, ...rest, className: ["zds-tab-bar", className].filter(Boolean).join(" "), "data-flavour": flavour, children: _jsx(Tabs.List, { className: "zds-tab-bar__list", activateOnFocus: true, "aria-label": label, children: children }) }));
});
function badgeParts(badge) {
    if (badge === true)
        return { size: "small" };
    if (badge === false || badge === null || badge === undefined || badge === "" || badge === 0)
        return null;
    const value = typeof badge === "number" && badge > 99 ? "99+" : String(badge);
    return { size: value.length > 1 ? "large" : "medium", value };
}
/**
 * One tab in a Tab Bar: an optional icon, a label and an optional badge.
 * Selected and disabled come from Base UI (`data-active`, `data-disabled`);
 * Figma's separate State, Selected and Disabled axes collapse into those
 * (spec issue).
 *
 * @spec specs/tab-bar/tab-bar.spec.md
 */
export const TabItem = React.forwardRef(function TabItem({ label, icon, badge = null, badgeLabel, className, ...rest }, ref) {
    const b = badgeParts(badge);
    const srText = b ? (badgeLabel ?? b.value) : undefined;
    return (_jsxs(Tabs.Tab, { ref: ref, ...rest, className: ["zds-tab-item", className].filter(Boolean).join(" "), children: [icon ? _jsx(Icon, { className: "zds-tab-item__icon", name: icon, size: "medium" }) : null, _jsx("span", { className: "zds-tab-item__label", children: label }), b ? _jsx(NotificationIndicator, { className: "zds-tab-item__badge", size: b.size, value: b.value, "aria-hidden": "true" }) : null, srText ? _jsx("span", { className: "zds-tab-item__sr", children: `, ${srText}` }) : null] }));
});
