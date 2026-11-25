import * as React from "react";
import { type IconStyle } from "@zebra-design-system/icons/codepoints.js";
import type { IconName } from "@zebra-design-system/icons/names";
export type { IconName, IconStyle };
export type IconSize = "xsmall" | "small" | "medium" | "large";
export interface IconProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {
    /** Glyph name, e.g. `alarm`. 724 available. Required: there is no default glyph. */
    name: IconName;
    /** Which family to draw from. Same codepoints, different outlines (the spec's Style axis, exposed in code). */
    iconStyle?: IconStyle;
    /** The glyph's own box — 12 / 16 / 20 / 28px. */
    size?: IconSize;
    /**
     * Pads the glyph to a fixed box: 40px (a touch target) at small, medium and
     * large, 24px at xsmall. Only for a standalone tappable icon — wrong inside
     * a control that already provides one.
     */
    framed?: boolean;
    /**
     * Accessible name. Leave unset for a decorative icon that repeats adjacent
     * text — which is the case inside a Button, where the label already says it.
     */
    label?: string;
}
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
export declare const Icon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<HTMLSpanElement>>;
