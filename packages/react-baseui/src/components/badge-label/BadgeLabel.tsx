import * as React from "react";
import "./badge-label.css";

export type BadgeLabelVariant = "neutral" | "info" | "positive" | "warning" | "negative";
export type BadgeLabelShape = "rounded" | "sharp";

export interface BadgeLabelProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "className"> {
  /** The standing of the category; fill, border and text move together. */
  variant?: BadgeLabelVariant;
  /** Softly rounded (radius/element-sm) or square (radius/none). */
  shape?: BadgeLabelShape;
  /** Solid fill with knocked-out text, the strongest form. Turn off for a tinted fill. */
  bold?: boolean;
  /** Adds a 1px border to the tinted fill. Only applies while `bold` is false. */
  outlined?: boolean;
  className?: string;
}

/**
 * Figma's "Label" badge. Names a category on an item in a word or two.
 * Variant carries the standing of that category, and Bold and Outlined
 * decide how hard it pushes: bold (solid), outlined (tint with an edge) or
 * plain (tint with none). Named BadgeLabel so it does not read as a form
 * label.
 *
 * Bold and Outlined together are not built in Figma, so bold wins.
 *
 * Static and not interactive, so there is no Base UI primitive to wrap. The
 * children are the category and its accessible name.
 *
 * Kept in step with packages/web-components `<zds-badge-label>`.
 *
 * @spec specs/badges/label.spec.md
 */
export const BadgeLabel = React.forwardRef<HTMLSpanElement, BadgeLabelProps>(function BadgeLabel(
  { variant = "neutral", shape = "rounded", bold = true, outlined = false, className, children, ...rest },
  ref,
) {
  const emphasis = bold ? "bold" : outlined ? "outlined" : "plain";
  return (
    <span
      ref={ref}
      {...rest}
      className={["zds-badge-label", className].filter(Boolean).join(" ")}
      data-variant={variant}
      data-shape={shape}
      data-emphasis={emphasis}
    >
      <span className="zds-badge-label__root">{children}</span>
    </span>
  );
});
