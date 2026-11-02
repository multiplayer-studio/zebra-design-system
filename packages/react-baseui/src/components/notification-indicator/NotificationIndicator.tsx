import * as React from "react";
import "./notification-indicator.css";

export type NotificationIndicatorSize = "small" | "medium" | "large";

export interface NotificationIndicatorProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "className"> {
  /**
   * Fits the badge to its context. Defaults to large, as Figma does.
   */
  size?: NotificationIndicatorSize;
  /**
   * The count or short label shown inside the badge. Only rendered at
   * medium and large — small is a plain dot with no label part at all.
   * It holds 3 characters at most, and anything above 99 reads 99+.
   */
  value?: string;
  className?: string;
}

/**
 * A small badge that flags unread or pending activity on an icon or
 * navigation item.
 *
 * Marks that something is waiting on whatever it is pinned to, optionally
 * with a count; small is a plain dot. It carries one fixed colour, so it
 * reports how many and never what kind. The count is its only text, so what
 * it refers to has to be named by whatever it is pinned to.
 *
 * @spec specs/notification-indicator/notification-indicator.spec.md
 */
export const NotificationIndicator = React.forwardRef<HTMLSpanElement, NotificationIndicatorProps>(
  function NotificationIndicator({ size = "large", value = "2", className, ...rest }, ref) {
    const count = Number(value) > 99 ? "99+" : value.slice(0, 3);
    return (
      <span
        ref={ref}
        {...rest}
        className={["zds-notification-indicator", className].filter(Boolean).join(" ")}
        data-size={size}
      >
        {size !== "small" ? (
          <span className="zds-notification-indicator__label">{count}</span>
        ) : null}
      </span>
    );
  },
);
