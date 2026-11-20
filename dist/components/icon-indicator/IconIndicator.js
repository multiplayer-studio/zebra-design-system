import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { Icon } from "../icon/Icon.js";
import "./icon-indicator.css";
const toCss = (v) => (v.startsWith("--") ? `var(${v})` : v);
/**
 * A small circular marker carrying a glyph. Defaults are the spec's (Clock on
 * foreground/secondary, size small); beyond the spec the host can set the
 * glyph and both colours (owner decision), by props or the
 * `--zds-icon-indicator-fill` / `-foreground` custom properties. The glyph
 * defaults to foreground/inverse: Figma's foreground/on-strong fails in dark
 * mode (spec warn).
 *
 * Static and not interactive, so there is no Base UI primitive to wrap.
 * Kept in step with packages/web-components `<zds-icon-indicator>`.
 *
 * @spec specs/badges/icon-indicator.spec.md
 */
export const IconIndicator = React.forwardRef(function IconIndicator({ icon = "clock", fill, foreground, size = "small", label, className, style, ...rest }, ref) {
    const vars = {};
    if (fill)
        vars["--zds-icon-indicator-fill"] = toCss(fill);
    if (foreground)
        vars["--zds-icon-indicator-foreground"] = toCss(foreground);
    const glyph = { width: "var(--zds-glyph)", height: "var(--zds-glyph)", fontSize: "var(--zds-glyph)" };
    return (_jsx("span", { ref: ref, ...rest, className: ["zds-icon-indicator", className].filter(Boolean).join(" "), "data-size": size, style: { ...vars, ...style }, children: _jsx("span", { className: "zds-icon-indicator__root", role: label ? "img" : undefined, "aria-label": label, "aria-hidden": label ? undefined : true, children: _jsx(Icon, { className: "zds-icon-indicator__glyph", name: icon, iconStyle: "rounded", style: glyph }) }) }));
});
