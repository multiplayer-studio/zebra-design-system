import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Avatar } from "../avatar/Avatar.js";
import "./avatar-rail.css";
/** Four positions, the first two always present (spec: composition limits). */
const MIN = 2;
const POSITIONS = 4;
/**
 * Shows a group of people as overlapping avatars, with an optional counter
 * standing in for everyone who did not fit. Size moves the whole rail
 * together rather than any single avatar.
 *
 * The children are `<Avatar>` elements. The rail owns their presentation
 * (spec: "parent owned"): it sets each one's `size` and turns off its ring,
 * dismiss badge and presence badge, so the person shown is the only thing
 * set per avatar. `max` sets how many show (2 to 4, the spec's four
 * positions with the first two always present); Figma does the same with
 * Show Avatar 3/4. Avatars past `max` are not rendered and the counter is
 * generated from them: "+" and the children passed in less `max`, a
 * remainder rather than a total (owner decision, 2026-10-18). It shows while
 * `showOverflow` is on and there is a remainder.
 *
 * Static and not interactive, so there is no Base UI primitive to wrap.
 * Kept in step with packages/web-components `<zds-avatar-rail>`.
 *
 * @spec specs/avatar-rail/avatar-rail.spec.md
 */
export const AvatarRail = React.forwardRef(function AvatarRail({ size = "xxxsmall", stacking = "start", max = POSITIONS, showOverflow = true, label, overflowLabel = "{count} more", className, children, ...rest }, ref) {
    const avatars = React.Children.toArray(children).filter((c) => React.isValidElement(c) && c.type === Avatar);
    const m = Math.floor(Number(max));
    const visible = Number.isFinite(m) ? Math.min(POSITIONS, Math.max(MIN, m)) : POSITIONS;
    const shown = avatars.slice(0, visible);
    const hidden = avatars.length - shown.length;
    const text = hidden > 0 ? `+${hidden}` : "";
    return (_jsxs("div", { ref: ref, role: "group", "aria-label": label, ...rest, className: ["zds-avatar-rail", className].filter(Boolean).join(" "), "data-size": size, "data-stacking": stacking, children: [shown.map((a, i) => React.cloneElement(a, {
                size,
                showRing: false,
                showClose: false,
                showStatus: false,
                // Paint order is the only thing Stacking changes (spec).
                style: { ...a.props.style, zIndex: stacking === "start" ? shown.length - i : i + 1 },
            })), showOverflow && text ? (_jsx("span", { className: "zds-avatar-rail__overflow", role: "img", "aria-label": overflowLabel.replace("{count}", text.replace(/^\+/, "")), style: { zIndex: stacking === "end" ? POSITIONS + 1 : 0 }, children: _jsx("span", { className: "zds-avatar-rail__count", "aria-hidden": "true", children: text }) })) : null] }));
});
