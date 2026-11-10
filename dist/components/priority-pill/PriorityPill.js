import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Icon } from "../icon/Icon.js";
import "./priority-pill.css";
const LEVELS = {
    low: { glyph: "arrow-down", rank: "4", text: "Low" },
    medium: { glyph: "remove", rank: "3", text: "Medium" },
    high: { glyph: "arrow-up", rank: "2", text: "High" },
    urgent: { glyph: "priority", rank: "1", text: "Urgent" },
};
/**
 * Shows where an item sits on a four step scale, from low to urgent. The
 * children are the priority name (defaulting to the level's); on `badge` it
 * is kept visually hidden as the accessible name.
 *
 * Static and not interactive, so there is no Base UI primitive to wrap.
 * Kept in step with packages/web-components `<zds-priority-pill>`.
 *
 * @spec specs/badges/priority-pill.spec.md
 */
export const PriorityPill = React.forwardRef(function PriorityPill({ level = "low", variant = "lozenge", size = "large", leading = "icon", priorityNumber, className, children, ...rest }, ref) {
    const l = LEVELS[level] ?? LEVELS.low;
    const glyph = { width: "var(--zds-glyph)", height: "var(--zds-glyph)", fontSize: "var(--zds-glyph)" };
    return (_jsx("span", { ref: ref, ...rest, className: ["zds-priority-pill", className].filter(Boolean).join(" "), "data-level": level, "data-variant": variant, "data-size": size, "data-leading": leading, children: _jsxs("span", { className: "zds-priority-pill__root", children: [_jsx("span", { className: "zds-priority-pill__circle", "aria-hidden": "true", children: leading === "number" ? _jsx("span", { className: "zds-priority-pill__rank", children: priorityNumber ?? l.rank })
                        : _jsx(Icon, { name: l.glyph, iconStyle: "rounded", style: glyph }) }), _jsx("span", { className: "zds-priority-pill__label", children: children ?? l.text })] }) }));
});
