import * as React from "react";
import { Icon, type IconSize } from "../icon/Icon.js";
import "./caret-indicator.css";

export type CaretIndicatorDirection = "vertical" | "horizontal";
export type CaretIndicatorSize = IconSize;

export interface CaretIndicatorProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "className" | "children"> {
  /** Whether the thing it marks is open. Turns the glyph; it never swaps it. */
  open?: boolean;
  /**
   * vertical: `expand-more`, turned 180° when open (a list that drops down).
   * horizontal: `chevron-right`, turned 90° when open (a row that opens a level).
   */
  direction?: CaretIndicatorDirection;
  /** The glyph's own box: 16 / 20 / 28px, the nested Icon's sizes. */
  size?: CaretIndicatorSize;
  className?: string;
}

const GLYPH = { vertical: "expand-more", horizontal: "chevron-right" } as const;

/**
 * The caret that marks something as able to open, and turns when it does.
 *
 * Decorative (`aria-hidden`): the control it sits in carries `aria-expanded`.
 * Figma swaps glyphs per state (expand-more → expand-less, chevron-right →
 * expand-more); here it is ONE glyph rotated with Switch's motion — owner
 * decision. The colour is currentColor, so it follows the row's label.
 *
 * Shared by SubMenuItem, CollapsibleMenuItem and anything else with a
 * disclosure caret. Kept in step with `<zds-caret-indicator>`.
 *
 * @spec specs/navigation-rail/navigation-rail.spec.md (subcomponents › Caret Indicator)
 */
export const CaretIndicator = React.forwardRef<HTMLSpanElement, CaretIndicatorProps>(function CaretIndicator(
  { open = false, direction = "vertical", size = "small", className, ...rest },
  ref,
) {
  return (
    <span
      ref={ref}
      aria-hidden="true"
      {...rest}
      className={["zds-caret-indicator", className].filter(Boolean).join(" ")}
      data-direction={direction}
      data-open={open ? "" : undefined}
    >
      {/* Rounded family, Framed off (spec). */}
      <Icon className="zds-caret-indicator__glyph" name={GLYPH[direction]} size={size} />
    </span>
  );
});
