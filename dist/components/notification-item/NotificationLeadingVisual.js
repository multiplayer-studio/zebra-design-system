import { jsx as _jsx } from "react/jsx-runtime";
import { Avatar } from "../avatar/Avatar.js";
import { Icon } from "../icon/Icon.js";
/**
 * The private `_Leading Visual` part of Notification Item: a circular
 * control/sm slot holding an Avatar, an image or an Icon. Not exported from
 * the package — the flavour is chosen through NotificationItem's `leading`.
 *
 * Decorative in all three flavours (spec accessibility: it carries no text),
 * so the item's heading has to name the source.
 *
 * @spec specs/notification-item/notification-item.spec.md (Subcomponents)
 */
export function NotificationLeadingVisual({ flavour, src, initials, icon }) {
    return (_jsx("span", { className: "zds-notification-leading-visual", "data-flavour": flavour, "aria-hidden": "true", 
        // The artwork is the slot's own background (spec: "a background rather
        // than a separate element"). A content URL, not a themed value.
        style: flavour === "image" && src ? { backgroundImage: `url("${src}")` } : undefined, children: flavour === "avatar" ? (_jsx(Avatar, { size: "xxsmall", type: src ? "photo" : "initials", src: src, initials: initials, alt: "", showStatus: false, showRing: false, showClose: false })) : flavour === "icon" ? (
        // Family pinned to rounded: the `shape` token is a string no
        // component can read from CSS yet (same as IconIndicator).
        _jsx(Icon, { name: icon, size: "medium", iconStyle: "rounded" })) : null }));
}
