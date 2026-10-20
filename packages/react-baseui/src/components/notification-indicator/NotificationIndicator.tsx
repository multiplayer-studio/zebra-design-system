import * as React from "react";
import "./notification-indicator.css";

export type NotificationIndicatorSize = "small" | "medium" | "large";

export interface NotificationIndicatorProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "className"> {
  /**
   * Fits the badge to its context. Figma's own default is the largest
   * option (spec issue — most size axes in this file default to the
   * smallest); kept as extracted rather than silently switched.
   */
  size?: NotificationIndicatorSize;
  /**
   * The count or short label shown inside the badge. Only rendered at
   * medium and large — small is a plain dot with no label part at all.
   */
  value?: string;
  className?: string;
}

/**
 * A small badge that flags unread or pending activity on an icon or
 * navigation item.
 *
 * No Component Metadata frame exists for this component in Figma (spec
 * issue) — states, behaviour, content and accessibility guidance are not
 * modeled there. Since its whole purpose is to flag unread/pending
 * activity, a consumer should expose the count to assistive tech
 * themselves, e.g. an `aria-label` on whatever it's attached to.
 *
 * @spec specs/notification-indicator/notification-indicator.spec.md
 */
export const NotificationIndicator = React.forwardRef<HTMLSpanElement, NotificationIndicatorProps>(
  function NotificationIndicator({ size = "large", value = "2", className, ...rest }, ref) {
    return (
      <span
        ref={ref}
        {...rest}
        className={["zds-notification-indicator", className].filter(Boolean).join(" ")}
        data-size={size}
      >
        {size !== "small" ? (
          <span className="zds-notification-indicator__label">{value}</span>
        ) : null}
      </span>
    );
  },
);
