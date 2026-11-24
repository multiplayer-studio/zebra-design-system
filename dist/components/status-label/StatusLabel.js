import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Button as BaseButton } from "@base-ui/react/button";
import { Icon } from "../icon/Icon.js";
import { textOf } from "../chip/chip.js";
import "./status-label.css";
const GLYPH = { neutral: "info", info: "info", positive: "check-circle", warning: "warning", negative: "error" };
/**
 * Reports a read-only state on an item, such as Active or Overdue. Status
 * sets the fill, the border and the leading element together while the
 * label text holds one colour throughout. Discardable adds the one control
 * in the badge family: a dismiss that removes the label, never a select.
 *
 * The label is a span; only the discard control is interactive, and it
 * wraps Base UI's Button for focus and keyboard. The children are the label
 * and the accessible name; the dot and icon are decorative.
 *
 * Kept in step with packages/web-components `<zds-status-label>`.
 *
 * @spec specs/badges/status-label.spec.md
 */
export const StatusLabel = React.forwardRef(function StatusLabel({ status = "neutral", leading = "indicator", shape = "rounded", discardable, onDiscard, discardLabel, className, children, ...rest }, ref) {
    const text = textOf(children);
    const canDiscard = discardable ?? onDiscard !== undefined;
    const onKeyDown = (e) => {
        if (e.key === "Backspace" || e.key === "Delete") {
            e.preventDefault();
            onDiscard?.(e);
        }
    };
    return (_jsx("span", { ref: ref, ...rest, className: ["zds-status-label", className].filter(Boolean).join(" "), "data-status": status, "data-leading": leading, "data-shape": shape, children: _jsxs("span", { className: "zds-status-label__root", children: [leading === "indicator" ? _jsx("span", { className: "zds-status-label__lead", children: _jsx("span", { className: "zds-status-label__dot" }) }) : null, leading === "icon" ? _jsx(Icon, { className: "zds-status-label__lead", name: GLYPH[status] ?? "info", size: "small", iconStyle: "rounded" }) : null, _jsx("span", { className: "zds-status-label__label", children: children }), canDiscard ? (_jsx(BaseButton, { className: "zds-status-label__discard", "aria-label": discardLabel ?? (text ? `Remove ${text}` : "Remove"), onClick: (e) => onDiscard?.(e), onKeyDown: onKeyDown, children: _jsx(Icon, { name: "close", size: "small", iconStyle: "rounded" }) })) : null] }) }));
});
