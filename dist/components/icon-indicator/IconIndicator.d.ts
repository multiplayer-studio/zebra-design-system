import * as React from "react";
import { type IconName } from "../icon/Icon.js";
import "./icon-indicator.css";
export type IconIndicatorSize = "small" | "medium" | "large";
export interface IconIndicatorProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "className"> {
    /** The glyph. Default Clock (spec). */
    icon?: IconName;
    /** Circle colour: a CSS colour or a `--token` name. Default foreground/secondary. */
    fill?: string;
    /** Glyph colour: a CSS colour or a `--token` name. Default foreground/inverse. */
    foreground?: string;
    size?: IconIndicatorSize;
    /** Accessible name. Without it the indicator is decorative. */
    label?: string;
    className?: string;
}
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
export declare const IconIndicator: React.ForwardRefExoticComponent<IconIndicatorProps & React.RefAttributes<HTMLSpanElement>>;
