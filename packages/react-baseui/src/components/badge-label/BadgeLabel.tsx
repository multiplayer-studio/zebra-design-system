import * as React from "react";
import "./badge-label.css";

export type BadgeLabelVariant = "neutral" | "info" | "positive" | "warning" | "negative";
export type BadgeLabelShape = "rounded" | "sharp";

export interface BadgeLabelProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "className"> {
  /** The standing of the category; fill, border and text move together. */
  variant?: BadgeLabelVariant;
  /** Softly rounded (radius/element-sm) or square (radius/none). */
  shape?: BadgeLabelShape;
  className?: string;
}

/**
 * Figma's "Label" badge. Names a category on an item in a word or two,
 * filled solid in one of five colours. Named BadgeLabel so it does not read
 * as a form label.
 *
 * Static and not interactive, so there is no Base UI primitive to wrap. The
 * children are the category and its accessible name.
 *
 * Kept in step with packages/web-components `<zds-badge-label>`.
 *
 * @spec specs/badges/label.spec.md
 */
export const BadgeLabel = React.forwardRef<HTMLSpanElement, BadgeLabelProps>(function BadgeLabel(
  { variant = "neutral", shape = "rounded", className, children, ...rest },
  ref,
) {
  return (
    <span ref={ref} {...rest} className={["zds-badge-label", className].filter(Boolean).join(" ")} data-variant={variant} data-shape={shape}>
      <span className="zds-badge-label__root">{children}</span>
    </span>
  );
});
