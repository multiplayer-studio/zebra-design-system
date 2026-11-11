import * as React from "react";
import "./scrim.css";

export type ScrimTone = "scrim" | "modal";

export interface ScrimProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "className"> {
  /** scrim dims the page behind; modal hides it completely. */
  tone?: ScrimTone;
  className?: string;
}

/**
 * The barrier between a raised surface and the page behind it. It fills its
 * nearest positioned ancestor edge to edge, with one fill and nothing else.
 *
 * Dialog, Lightbox and a modal Bottom Sheet render it as their backdrop, so
 * reach for it directly only under a custom overlay, one per open surface. It
 * is decorative (hidden from assistive technology, never focusable) and carries
 * no content. A click on it bubbles as usual, so the owner decides whether to
 * close.
 *
 * @spec specs/scrim/scrim.spec.md
 */
export const Scrim = React.forwardRef<HTMLDivElement, ScrimProps>(function Scrim(
  // Scrim has no content (spec), so children are dropped.
  { tone = "scrim", className, children: _children, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      aria-hidden="true"
      {...rest}
      data-tone={tone}
      className={["zds-scrim", className].filter(Boolean).join(" ")}
    />
  );
});
