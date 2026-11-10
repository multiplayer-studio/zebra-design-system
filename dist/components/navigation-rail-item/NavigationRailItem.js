import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
import { Icon } from "../icon/Icon.js";
import { NotificationIndicator } from "../notification-indicator/NotificationIndicator.js";
import { NavigationRailContext } from "../navigation-rail/context.js";
import "./navigation-rail-item.css";
/**
 * A single destination in a Navigation Rail: a glyph in a square target, or
 * glyph and label on one row in the wide form.
 *
 * A plain `<a>` / `<button>` — the rail is a list of links, not a composite
 * widget, so there is no Base UI primitive to wrap (see NavigationRail).
 * Hover and pressed scrims are the ghost tokens alone (spec warn "Double
 * alpha": Figma stacks a paint opacity on already-translucent tokens).
 * Figma's `Collapsible` boolean is wired to nothing and has no caret — it is
 * dropped; a group that expands is a CollapsibleMenuItem.
 *
 * Kept in step with `<zds-navigation-rail-item>`.
 *
 * @spec specs/navigation-rail-item/navigation-rail-item.spec.md
 */
export const NavigationRailItem = React.forwardRef(function NavigationRailItem({ label = "Label", icon = "star", selected = false, disabled = false, expanded: expandedProp = false, showLabel: showLabelProp = false, showIcon = true, shape: shapeProp = "rounded", badge = false, badgeLabel, href, target, rel, className, ...rest }, ref) {
    const rail = React.useContext(NavigationRailContext);
    const expanded = rail ? rail.expanded : expandedProp;
    const showLabel = rail ? rail.showLabels : showLabelProp;
    const shape = rail ? rail.shape : shapeProp;
    const isSelected = selected && !disabled;
    const captionVisible = expanded || showLabel;
    const content = (_jsxs(_Fragment, { children: [showIcon ? (_jsxs("span", { className: "zds-navigation-rail-item__icon", "aria-hidden": "true", children: [_jsx(Icon, { name: icon, size: "small" }), badge ? _jsx(NotificationIndicator, { className: "zds-navigation-rail-item__badge", size: "small" }) : null] })) : null, _jsx("span", { className: captionVisible ? "zds-navigation-rail-item__label" : "zds-navigation-rail-item__sr", children: label }), badge && badgeLabel ? _jsx("span", { className: "zds-navigation-rail-item__sr", children: `, ${badgeLabel}` }) : null] }));
    const shared = {
        ...rest,
        className: ["zds-navigation-rail-item", className].filter(Boolean).join(" "),
        title: captionVisible ? undefined : label,
        "data-expanded": expanded ? "" : undefined,
        "data-show-label": showLabel ? "" : undefined,
        "data-shape": shape,
        "data-selected": isSelected ? "" : undefined,
        "data-disabled": disabled ? "" : undefined,
        "aria-current": isSelected ? "page" : undefined,
    };
    return href !== undefined ? (_jsx("a", { ref: ref, ...shared, href: disabled ? undefined : href, target: target, rel: rel, "aria-disabled": disabled || undefined, children: content })) : (_jsx("button", { ref: ref, type: "button", ...shared, disabled: disabled, children: content }));
});
