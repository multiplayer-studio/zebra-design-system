import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Divider } from "../divider/Divider.js";
import "../button/button.css";
import "./button-group.css";
/**
 * A row of related actions sharing one bordered surface, where each carries
 * equal weight rather than one leading. Reach for a single Button when one
 * action is clearly the primary one.
 *
 * An item is the package's own `Button` or `IconButton`; the group passes its
 * `size` down, pins `flavour="subtle"` and `shape="sharp"` (spec: size, shape
 * and flavour belong to the group, never set per item) and draws a vertical
 * `Divider` between every pair. Figma's per-size, per-position wrapper sets
 * are an authoring arrangement and are not reproduced: position comes from
 * the item's index.
 *
 * Semantics: a plain `role="group"` container, each item its own tab stop.
 * Base UI's Toolbar was considered and not used — its roving tabindex makes
 * the row one tab stop with arrow keys between items, which suits a toolbar
 * of many controls, but the spec asks for a group role, a group of two or
 * three peer actions reads better as ordinary buttons, and a group is often
 * placed inside a toolbar, where a nested toolbar is invalid ARIA. The web
 * component matches without hand-rolling roving focus.
 *
 * @spec specs/button-group/button-group.spec.md
 */
export const ButtonGroup = React.forwardRef(function ButtonGroup({ size = "medium", shape = "sharp", label, children, className, ...rest }, ref) {
    const items = React.Children.toArray(children);
    return (_jsx("div", { ref: ref, role: "group", "aria-label": label, ...rest, className: ["zds-button-group", className].filter(Boolean).join(" "), "data-size": size, "data-shape": shape, children: items.map((child, i) => (_jsxs(React.Fragment, { children: [i > 0 ? _jsx(Divider, { orientation: "vertical", className: "zds-button-group__divider" }) : null, React.isValidElement(child)
                    ? React.cloneElement(child, { size, flavour: "subtle", shape: "sharp" })
                    : child] }, React.isValidElement(child) && child.key != null ? child.key : i))) }));
});
