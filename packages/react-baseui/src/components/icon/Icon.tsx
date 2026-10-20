import * as React from "react";
import { iconGlyphs, iconFamily, type IconStyle } from "@zebra-design-system/icons/codepoints.js";
import type { IconName } from "@zebra-design-system/icons/names";

export type { IconName, IconStyle };
export type IconSize = "small" | "medium" | "large";

const BOX: Record<IconSize, string> = {
  small: "var(--control-icon-sm)",
  medium: "var(--control-icon-md)",
  large: "var(--control-icon-lg)",
};

export interface IconProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {
  /** Glyph name, e.g. `alarm`. 715 available. */
  name: IconName;
  /** Which family to draw from. Same codepoints, different outlines. */
  iconStyle?: IconStyle;
  /** The glyph's own box — 16 / 20 / 28px. */
  size?: IconSize;
  /**
   * Pads the glyph to a fixed 40px touch target. Only for a standalone
   * tappable icon — wrong inside a control that already provides one.
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
 * (`control-icon-sm/md/lg`); `framed` pads it to a fixed 40px
 * (`control-target-min`) touch target for a standalone tappable icon. A
 * component that already provides its own target area, like Button, locks
 * both rather than leaving them open to the consumer.
 *
 * Load `@zebra-design-system/icons/icons.css` once for the `@font-face` blocks.
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
        width: framed ? "var(--control-target-min)" : box,
        height: framed ? "var(--control-target-min)" : box,
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
