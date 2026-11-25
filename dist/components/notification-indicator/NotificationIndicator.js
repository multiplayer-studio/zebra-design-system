import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import "./notification-indicator.css";
/**
 * A small badge that flags unread or pending activity on an icon or
 * navigation item.
 *
 * Marks that something is waiting on whatever it is pinned to, optionally
 * with a count; small is a plain dot. It carries one fixed colour, so it
 * reports how many and never what kind. The count is its only text, so what
 * it refers to has to be named by whatever it is pinned to.
 *
 * @spec specs/notification-indicator/notification-indicator.spec.md
 */
export const NotificationIndicator = React.forwardRef(function NotificationIndicator({ size = "large", value = "2", className, ...rest }, ref) {
    const count = Number(value) > 99 ? "99+" : value.slice(0, 3);
    return (_jsx("span", { ref: ref, ...rest, className: ["zds-notification-indicator", className].filter(Boolean).join(" "), "data-size": size, children: size !== "small" ? (_jsx("span", { className: "zds-notification-indicator__label", children: count })) : null }));
});
