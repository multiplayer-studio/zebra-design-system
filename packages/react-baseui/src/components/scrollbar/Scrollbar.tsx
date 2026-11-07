import * as React from "react";
import "./scrollbar.css";

export type ScrollbarOrientation = "vertical" | "horizontal";

export interface ScrollbarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "children"> {
  /** The axis the region scrolls. Vertical stands against the trailing edge; horizontal lies along the bottom. */
  orientation?: ScrollbarOrientation;
  /** Where the handle sits: 0 is the start of the content, 1 the end. Code-only — Figma draws one sample. */
  value?: number;
  /** The handle's length as the viewport's share of the content, 0–1. Code-only; defaults to the drawn sample. */
  size?: number;
  className?: string;
}

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

/**
 * The scroll indicator for a region that clips its content. A padded gutter
 * holds a pill handle whose position and length mirror the scroll offset;
 * hovering raises a track scrim so the grab target reads. The scrolling
 * region, not the bar, owns the behaviour: it is presentational
 * (aria-hidden), takes no focus and fires no events — expose scrolling
 * through the region itself.
 *
 * `value` and `size` are code inputs the spec leaves to the implementation
 * (Figma draws one sample). Size the bar to the region's edge with
 * `--zds-scrollbar-length` (typically `100%`); unset, it draws at the
 * sample length.
 *
 * No Base UI primitive is wrapped: the bar is a static indicator with no
 * behaviour or accessibility of its own to delegate.
 *
 * @spec specs/scrollbar/scrollbar.spec.md
 */
export const Scrollbar = React.forwardRef<HTMLDivElement, ScrollbarProps>(function Scrollbar(
  { orientation = "vertical", value = 0, size = 0.32, className, style, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      {...rest}
      aria-hidden
      className={["zds-scrollbar", className].filter(Boolean).join(" ")}
      data-orientation={orientation}
      style={{
        ...style,
        ["--zds-scrollbar-value" as string]: clamp01(value),
        ["--zds-scrollbar-size" as string]: clamp01(size),
      }}
    >
      <span className="zds-scrollbar__track" />
      <span className="zds-scrollbar__rail">
        <span className="zds-scrollbar__handle" />
      </span>
    </div>
  );
});
