import * as React from "react";
import { Icon, type IconName } from "../icon/Icon.js";
import "./priority-pill.css";

export type PriorityLevel = "low" | "medium" | "high" | "urgent";
export type PriorityVariant = "lozenge" | "badge";
export type PrioritySize = "small" | "large";
export type PriorityLeading = "icon" | "number";

const LEVELS: Record<PriorityLevel, { glyph: IconName; rank: string; text: string }> = {
  low: { glyph: "arrow-down", rank: "4", text: "Low" },
  medium: { glyph: "remove", rank: "3", text: "Medium" },
  high: { glyph: "arrow-up", rank: "2", text: "High" },
  urgent: { glyph: "priority", rank: "1", text: "Urgent" },
};

export interface PriorityPillProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "className"> {
  /** Fill, circle, label colour and glyph move together. */
  level?: PriorityLevel;
  /** lozenge: circle and label. badge: the circle alone. */
  variant?: PriorityVariant;
  size?: PrioritySize;
  /** A direction glyph, or the rank number. */
  leading?: PriorityLeading;
  /** The rank when `leading="number"`. Defaults to the level's rank (urgent 1 … low 4). */
  priorityNumber?: string;
  className?: string;
}

/**
 * Shows where an item sits on a four step scale, from low to urgent. The
 * children are the priority name (defaulting to the level's); on `badge` it
 * is kept visually hidden as the accessible name.
 *
 * Static and not interactive, so there is no Base UI primitive to wrap.
 * Kept in step with packages/web-components `<zds-priority-pill>`.
 *
 * @spec specs/badges/priority-pill.spec.md
 */
export const PriorityPill = React.forwardRef<HTMLSpanElement, PriorityPillProps>(function PriorityPill(
  { level = "low", variant = "lozenge", size = "large", leading = "icon", priorityNumber, className, children, ...rest },
  ref,
) {
  const l = LEVELS[level] ?? LEVELS.low;
  const glyph = { width: "var(--zds-glyph)", height: "var(--zds-glyph)", fontSize: "var(--zds-glyph)" };
  return (
    <span ref={ref} {...rest} className={["zds-priority-pill", className].filter(Boolean).join(" ")}
      data-level={level} data-variant={variant} data-size={size} data-leading={leading}>
      <span className="zds-priority-pill__root">
        <span className="zds-priority-pill__circle" aria-hidden="true">
          {leading === "number" ? <span className="zds-priority-pill__rank">{priorityNumber ?? l.rank}</span>
            : <Icon name={l.glyph} iconStyle="rounded" style={glyph} />}
        </span>
        <span className="zds-priority-pill__label">{children ?? l.text}</span>
      </span>
    </span>
  );
});
