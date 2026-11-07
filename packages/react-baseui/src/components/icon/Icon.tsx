import * as React from "react";
import { iconGlyphs, iconFamily, type IconStyle } from "@zebra-design-system/icons/codepoints.js";
import type { IconName } from "@zebra-design-system/icons/names";

export type { IconName, IconStyle };
export type IconSize = "xsmall" | "small" | "medium" | "large";

const BOX: Record<IconSize, string> = {
  xsmall: "var(--control-icon-xs)",
  small: "var(--control-icon-sm)",
  medium: "var(--control-icon-md)",
  large: "var(--control-icon-lg)",
};

// The framed box: a 40px touch target, except xsmall's 24px (control/xs), as Figma draws it.
const FRAME: Record<IconSize, string> = {
  xsmall: "var(--control-xs)",
  small: "var(--control-target-min)",
  medium: "var(--control-target-min)",
  large: "var(--control-target-min)",
};

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
export const Icon = React.forwardRef<HTMLSpanElement, IconProps>(function Icon(
  { name, iconStyle = "rounded", size = "small", framed = false, label, style, ...rest },
  ref,
) {
  const glyph = iconGlyphs[name];
  if (!glyph) {
    // A typo renders an invisible glyph, which is hard to spot; say so.
    console.warn(`<Icon>: unknown icon "${name}"`);
  }
  const box = BOX[size];
  return (
    <span
      ref={ref}
      {...rest}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      style={{
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
      }}
    >
      {glyph ?? ""}
    </span>
  );
});
