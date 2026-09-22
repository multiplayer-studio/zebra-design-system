import * as React from "react";
import { iconGlyphs, iconFamily, type IconStyle } from "@zebra-design-system/icons/codepoints.js";
import type { IconName } from "@zebra-design-system/icons/names";

export type { IconName, IconStyle };

export interface IconProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {
  /** Glyph name, e.g. `alarm`. 715 available. */
  name: IconName;
  /** Which family to draw from. Same codepoints, different outlines. */
  iconStyle?: IconStyle;
  /**
   * Accessible name. Leave unset for a decorative icon that repeats adjacent
   * text — which is the case inside a Button, where the label already says it.
   */
  label?: string;
}

/**
 * A glyph from the Zebra icon font.
 *
 * Renders the character rather than an SVG, so it inherits `color` and
 * `font-size` from its context — an icon inside a Button picks up that
 * button's colour and scale with no per-flavour wiring.
 *
 * Load `@zebra-design-system/icons/icons.css` once for the `@font-face` blocks.
 */
export const Icon = React.forwardRef<HTMLSpanElement, IconProps>(function Icon(
  { name, iconStyle = "rounded", label, style, ...rest },
  ref,
) {
  const glyph = iconGlyphs[name];
  if (!glyph) {
    // A typo renders an invisible glyph, which is hard to spot; say so.
    console.warn(`<Icon>: unknown icon "${name}"`);
  }
  return (
    <span
      ref={ref}
      {...rest}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      style={{
        fontFamily: `"${iconFamily[iconStyle] ?? iconFamily.rounded}", sans-serif`,
        fontWeight: "normal",
        fontStyle: "normal",
        lineHeight: 1,
        letterSpacing: "normal",
        textTransform: "none",
        whiteSpace: "nowrap",
        direction: "ltr",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        WebkitFontSmoothing: "antialiased",
        userSelect: "none",
        ...style,
      }}
    >
      {glyph ?? ""}
    </span>
  );
});
