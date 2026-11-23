import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
import { Icon } from "../icon/Icon.js";
import { NotificationIndicator, } from "../notification-indicator/NotificationIndicator.js";
import { CaretIndicator } from "../caret-indicator/CaretIndicator.js";
import { Tooltip } from "../tooltip/Tooltip.js";
import { NavigationRailContext, NestedMenuContext, useNavigationRailModeClass, } from "../navigation-rail/context.js";
import "./sub-menu-item.css";
function badgeParts(badge) {
    if (badge === null || badge === undefined || badge === "" || badge === 0)
        return null;
    const value = typeof badge === "number" && badge > 99 ? "99+" : String(badge);
    return { size: value.length > 1 ? "large" : "medium", value };
}
/** @internal The row's inside, shared with CollapsibleMenuItem's header. */
export function SubMenuRowContent({ label, icon, showLeadingIcon, badge, badgeLabel, caret, open, labelRef, }) {
    const b = badgeParts(badge);
    const sr = b ? (badgeLabel ?? b.value) : undefined;
    return (_jsxs(_Fragment, { children: [_jsxs("span", { className: "zds-sub-menu-item__lead", children: [showLeadingIcon ? _jsx(Icon, { className: "zds-sub-menu-item__icon", name: icon, size: "small" }) : null, _jsx("span", { ref: labelRef, className: "zds-sub-menu-item__label", children: label })] }), b ? _jsx(NotificationIndicator, { className: "zds-sub-menu-item__badge", size: b.size, value: b.value, "aria-hidden": "true" }) : null, sr ? _jsx("span", { className: "zds-sub-menu-item__sr", children: `, ${sr}` }) : null, caret ? _jsx(CaretIndicator, { className: "zds-sub-menu-item__caret", direction: caret, open: open, size: "small" }) : null] }));
}
/** A label actually cut off by its ellipsis. Measured when asked, never observed. */
function isTruncated(el) {
    return !!el && el.scrollWidth > el.clientWidth;
}
/**
 * @internal The full label of a row (or a Collapsible Menu Item header), in a
 * Tooltip after a 3s hover — only when the label is truncated (owner
 * decision). Controlled: Base UI asks to open after the delay (or at once on
 * keyboard focus) and the label is measured then, so a resize or a label
 * change is always current; the row is never remounted. `describe={false}`:
 * the bubble repeats the row's own accessible name. The popup portals to
 * `body`, so it carries the rail's mode class to stay in the rail's mode.
 */
export function TruncatedLabelTooltip({ label, labelRef, shape, trigger, }) {
    const modeClass = useNavigationRailModeClass();
    const [open, setOpen] = React.useState(false);
    return (_jsx(Tooltip, { trigger: trigger, open: open, onOpenChange: (next) => setOpen(next && isTruncated(labelRef.current)), delay: 3000, point: "left", shape: shape, describe: false, className: modeClass ?? undefined, children: label }));
}
/**
 * A row in the Navigation Rail's sub menu panel: leading glyph, label, an
 * optional counter badge and an optional caret.
 *
 * A plain `<a>` / `<button>`; inside a CollapsibleMenuItem it renders nested.
 * A truncated label shows in full in a tooltip after a 3s hover.
 * Hover, pressed and selected fills are the ghost tokens alone (spec warn
 * "Double alpha"). Kept in step with `<zds-sub-menu-item>`.
 *
 * @spec specs/sub-menu-item/sub-menu-item.spec.md
 */
export const SubMenuItem = React.forwardRef(function SubMenuItem({ label = "Label", icon = "verified", showLeadingIcon = true, selected = false, disabled = false, nested: nestedProp = false, shape: shapeProp = "rounded", badge = null, badgeLabel, subMenu = false, open = false, href, target, rel, className, ...rest }, ref) {
    const rail = React.useContext(NavigationRailContext);
    const groupShape = React.useContext(NestedMenuContext);
    const nested = groupShape !== null || nestedProp;
    const shape = rail ? rail.shape : (groupShape ?? shapeProp);
    const isSelected = selected && !disabled;
    const labelRef = React.useRef(null);
    const shared = {
        ...rest,
        className: ["zds-sub-menu-item", className].filter(Boolean).join(" "),
        "data-nested": nested ? "" : undefined,
        "data-shape": shape,
        "data-selected": isSelected ? "" : undefined,
        "data-disabled": disabled ? "" : undefined,
        "aria-current": isSelected ? "page" : undefined,
    };
    const content = (_jsx(SubMenuRowContent, { label: label, icon: icon, showLeadingIcon: showLeadingIcon, badge: badge, badgeLabel: badgeLabel, caret: subMenu ? "horizontal" : null, open: open, labelRef: labelRef }));
    const row = href !== undefined ? (_jsx("a", { ref: ref, ...shared, href: disabled ? undefined : href, target: target, rel: rel, "aria-disabled": disabled || undefined, children: content })) : (_jsx("button", { ref: ref, type: "button", ...shared, disabled: disabled, children: content }));
    // Every row gets the truncation tooltip: it opens only while the label is
    // actually cut off (a group's width, or the rail's subMenuMaxWidth).
    return _jsx(TruncatedLabelTooltip, { label: label, labelRef: labelRef, shape: shape, trigger: row });
});
