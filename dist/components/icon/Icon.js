import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { iconGlyphs, iconFamily } from "@zebra-design-system/icons/codepoints.js";
const BOX = {
    xsmall: "var(--control-icon-xs)",
    small: "var(--control-icon-sm)",
    medium: "var(--control-icon-md)",
    large: "var(--control-icon-lg)",
};
// The framed box: a 40px touch target, except xsmall's 24px (control/xs), as Figma draws it.
const FRAME = {
    xsmall: "var(--control-xs)",
    small: "var(--control-target-min)",
    medium: "var(--control-target-min)",
    large: "var(--control-target-min)",
};
/**
 * A glyph from the Zebra icon font.
 *
 * Renders the character rather than an SVG, so it takes `currentColor` from
 * its context — an icon inside a Button picks up that button's colour with no
 * per-flavour wiring. `size` binds the glyph's own dimension token
 * (`control-icon-xs/sm/md/lg`) on both axes; `framed` pads it to a fixed
 * box, `control-target-min` (40px), or `control-xs` (24px) at xsmall. A
 * component that already provides its own target area, like Button, locks
 * both rather than leaving them open to the consumer.
 *
 * Load `@zebra-design-system/icons/icons.css` once for the `@font-face` blocks.
 *
 * @spec specs/icon/icon.spec.md
 */
export const Icon = React.forwardRef(function Icon({ name, iconStyle = "rounded", size = "small", framed = false, label, style, ...rest }, ref) {
    const glyph = iconGlyphs[name];
    if (!glyph) {
        // A typo renders an invisible glyph, which is hard to spot; say so.
        console.warn(`<Icon>: unknown icon "${name}"`);
    }
    const box = BOX[size];
    return (_jsx("span", { ref: ref, ...rest, role: label ? "img" : undefined, "aria-label": label, "aria-hidden": label ? undefined : true, style: {
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            // Bound to the same token on both axes (never an unbound width), so
            // the box is square by construction.
            width: framed ? FRAME[size] : box,
            height: framed ? FRAME[size] : box,
            fontFamily: `"${iconFamily[iconStyle] ?? iconFamily.rounded}", sans-serif`,
            fontWeight: "normal",
            fontStyle: "normal",
            fontSize: box,
            lineHeight: 1,
            letterSpacing: "normal",
            textTransform: "none",
            whiteSpace: "nowrap",
            direction: "ltr",
            WebkitFontSmoothing: "antialiased",
            userSelect: "none",
            ...style,
        }, children: glyph ?? "" }));
});
