import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { iconGlyphs, iconFamily } from "@zebra-design-system/icons/codepoints.js";
import "./avatar.css";
const SWATCHES = ["purple", "blue", "sea", "yellow", "orange", "green", "burgundy"];
/**
 * A swatch that isn't one of the seven named ones: a token name
 * (`chart/series/2`), a custom property (`--brand-accent`) or any CSS colour.
 */
export const swatchFill = (color) => color.startsWith("--") ? `var(${color})`
    : /^[a-z][\w-]*(\/[\w-]+)+$/i.test(color) ? `var(--${color.replace(/\//g, "-")})`
        : color;
// Every state but "icon" has its own verified glyph in the icon font,
// confirmed by resolving each status's icon swap to its parent component set
// (not just the swap's own variant name — see the spec's extraction-method
// issue). Close's Figma swap currently points at Offline's glyph, which reads
// as an authoring bug there; the dismiss badge below uses "close" instead.
const STATUS_GLYPH = {
    available: "available",
    away: "away",
    busy: "busy",
    dnd: "dnd",
    "on-shift": "on-shift",
    offline: "offline",
};
function Glyph({ name, className }) {
    const glyph = iconGlyphs[name];
    if (!glyph) {
        // A typo renders an invisible glyph, which is hard to spot; say so.
        console.warn(`<Avatar>: unknown icon "${name}"`);
    }
    return (_jsx("span", { className: className, "aria-hidden": "true", style: { fontFamily: `"${iconFamily.rounded}", sans-serif`, lineHeight: 1 }, children: glyph ?? "" }));
}
/**
 * A visual representation of a user or entity, shown as a photo, initials,
 * or icon, with an optional status indicator.
 *
 * Nine sizes step from xxxsmall to xxxlarge with medium as the base; only
 * medium's width, ring weight and initials font size are bound to real
 * tokens (`control-lg`, `stroke-thick`, `label-large/font-size`) — every
 * other step is an authored value carried over from Figma as-is (spec
 * issue). Badge size and initials font size are otherwise unbound and are
 * implemented here as exactly one third of the avatar's own size, matching
 * the ratio measured across all nine Figma variants. The ring is drawn
 * outside the avatar's content circle rather than inset over it.
 *
 * Content type, swatch colour, presence status and the custom status icon
 * are all swap-only in Figma, not exposed component properties there — this
 * component exposes them as real props because a consumer has to set them
 * somehow (see the spec's `internalVariations`).
 *
 * @spec specs/avatar/avatar.spec.md
 */
export const Avatar = React.forwardRef(function Avatar({ size = "xxxsmall", type = "initials", initials, swatchColor = "purple", src, alt, icon, showClose = true, onClose, closeLabel, showStatus = true, status = "available", statusIcon, statusLabel, showRing = true, className, ...rest }, ref) {
    return (_jsxs("div", { ref: ref, ...rest, className: ["zds-avatar", className].filter(Boolean).join(" "), "data-size": size, children: [_jsx("span", { className: "zds-avatar__content", "data-type": type, children: type === "photo" ? (_jsx("img", { className: "zds-avatar__photo", src: src, alt: alt ?? "" })) : (_jsx("span", { className: "zds-avatar__swatch", "data-swatch-color": SWATCHES.includes(swatchColor) ? swatchColor : "custom", style: SWATCHES.includes(swatchColor) ? undefined : { background: swatchFill(swatchColor) }, children: type === "initials" ? (_jsx("span", { className: "zds-avatar__initials", children: initials })) : icon ? (_jsx(Glyph, { className: "zds-avatar__content-icon", name: icon })) : null })) }), showRing ? _jsx("span", { className: "zds-avatar__ring", "aria-hidden": "true" }) : null, showClose ? (_jsx("button", { type: "button", className: "zds-avatar__badge zds-avatar__badge--close", onClick: onClose, "aria-label": closeLabel ?? (alt ? `Remove ${alt}` : "Remove"), children: _jsx(Glyph, { className: "zds-avatar__badge-icon", name: "close" }) })) : null, showStatus ? (_jsx("span", { className: "zds-avatar__badge zds-avatar__badge--status", "data-status": status, role: statusLabel ? "img" : undefined, "aria-label": statusLabel, "aria-hidden": statusLabel ? undefined : true, children: status === "icon"
                    ? statusIcon
                        ? _jsx(Glyph, { className: "zds-avatar__badge-icon", name: statusIcon })
                        : null
                    : _jsx(Glyph, { className: "zds-avatar__badge-icon", name: STATUS_GLYPH[status] }) })) : null] }));
});
