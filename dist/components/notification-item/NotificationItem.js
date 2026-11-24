import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Icon } from "../icon/Icon.js";
import { NotificationIndicator } from "../notification-indicator/NotificationIndicator.js";
import { IconIndicator } from "../icon-indicator/IconIndicator.js";
import { NotificationLeadingVisual } from "./NotificationLeadingVisual.js";
import "./notification-item.css";
/**
 * A single entry in a notification list: who or what it came from, a heading
 * and message, an optional attachment and an action slot.
 *
 * Read (spec issue "Metadata vs extracted"): Figma's Read=true also switches
 * the title from label/large to body/medium and drops the group bar, against
 * the metadata's "nothing else changes". We follow Figma — the title weight is
 * the second, non-colour unread signal — identically in `<zds-notification-item>`.
 *
 * Not interactive itself (spec: "no hover, focus, pressed or disabled state");
 * the actions are the interactive parts. It is an `article` named by its
 * heading and read state, ready to sit in a `role="feed"` or list; pass
 * `tabIndex` if the feed needs entries focusable. No Base UI primitive fits a
 * static article, so none is wrapped.
 *
 * Reuses Avatar, NotificationIndicator (unread dot, recoloured to
 * interactive/primary through its className), IconIndicator (urgency, via its
 * own `icon`/`fill` props) and Icon.
 *
 * Kept in step with packages/web-components `<zds-notification-item>`.
 *
 * @spec specs/notification-item/notification-item.spec.md
 */
export const NotificationItem = React.forwardRef(function NotificationItem({ read = false, group = false, heading = "Urgent Message", timestamp = "Just now", message, attachment, actions, urgent = false, urgentLabel = "Urgent", leading = "avatar", src, initials, icon = "verified", className, children, ...rest }, ref) {
    const has = (n) => n != null && n !== false && n !== "";
    const label = [heading, read ? "read" : "unread", urgent ? urgentLabel.toLowerCase() : ""].filter(Boolean).join(", ");
    return (_jsxs("div", { role: "article", "aria-label": label, ref: ref, ...rest, className: ["zds-notification-item", className].filter(Boolean).join(" "), "data-read": read ? "" : undefined, "data-group": group ? "" : undefined, children: [_jsx(NotificationLeadingVisual, { flavour: leading, src: src, initials: initials, icon: icon }), _jsxs("div", { className: "zds-notification-item__content", children: [_jsxs("div", { className: "zds-notification-item__message", children: [_jsxs("div", { className: "zds-notification-item__header", children: [read ? null : (_jsx("span", { className: "zds-notification-item__dot-wrap", "aria-hidden": "true", children: _jsx(NotificationIndicator, { className: "zds-notification-item__dot", size: "small" }) })), _jsx("span", { className: "zds-notification-item__title", children: heading }), _jsxs("span", { className: "zds-notification-item__meta", children: [_jsx("span", { className: "zds-notification-item__timestamp", children: timestamp }), urgent ? (_jsx(IconIndicator, { size: "small", icon: "important-notification", fill: "--interactive-destructive-background-default", label: urgentLabel })) : null] })] }), has(message) || has(children) ? _jsxs("div", { className: "zds-notification-item__body", children: [message, children] }) : null] }), attachment ? (_jsxs("div", { className: "zds-notification-item__attachment", children: [_jsx(Icon, { name: "attachment", size: "small", iconStyle: "rounded" }), _jsx("span", { className: "zds-notification-item__filename", children: attachment })] })) : null, has(actions) ? _jsx("div", { className: "zds-notification-item__actions", children: actions }) : null] }), group && !read ? _jsx("span", { className: "zds-notification-item__group", "aria-hidden": "true" }) : null] }));
});
