import * as React from "react";
import "./priority-pill.css";
export type PriorityLevel = "low" | "medium" | "high" | "urgent";
export type PriorityVariant = "lozenge" | "badge";
export type PrioritySize = "small" | "large";
export type PriorityLeading = "icon" | "number";
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
export declare const PriorityPill: React.ForwardRefExoticComponent<PriorityPillProps & React.RefAttributes<HTMLSpanElement>>;
