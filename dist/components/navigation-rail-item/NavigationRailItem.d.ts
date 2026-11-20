import * as React from "react";
import { type IconName } from "../icon/Icon.js";
import { type NavigationRailShape } from "../navigation-rail/context.js";
import "./navigation-rail-item.css";
export interface NavigationRailItemProps extends Omit<React.HTMLAttributes<HTMLElement>, "className" | "children"> {
    /**
     * The destination's name. Always the accessible name; shown beside the
     * glyph in the wide form and under it in the narrow form when `showLabel`.
     */
    label?: string;
    /** The glyph. Figma ships a `star` placeholder — swap it on every item. */
    icon?: IconName;
    /**
     * The destination the user is on: sets `aria-current="page"` and recolours
     * glyph and label (no scrim). Figma's State=selected. Exactly one item
     * across the rail and its panel should carry it; nothing enforces that.
     */
    selected?: boolean;
    /**
     * Unavailable. A link loses its `href` and gets `aria-disabled`; a button
     * gets `disabled`. Figma offers it on the resting state only, so when both
     * are set disabled wins and `selected` is ignored.
     */
    disabled?: boolean;
    /**
     * The wide form: glyph and label on one row. Inside a NavigationRail the
     * rail sets it and this prop is ignored.
     */
    expanded?: boolean;
    /**
     * Caption under the glyph in the narrow form. No effect in the wide form,
     * where the label always shows. Inside a rail, the rail's `showLabels` sets it.
     */
    showLabel?: boolean;
    /**
     * Corner shape: rounded (`radius/sm`) or sharp (`radius/none`). Inside a
     * NavigationRail the rail's `shape` sets it and this prop is ignored.
     */
    shape?: NavigationRailShape;
    /** Shows the glyph (and the badge anchored to it). Keep it on in the narrow form. */
    showIcon?: boolean;
    /** The Badges-page Notification Indicator dot (Size=small) over the glyph's top-right corner. */
    badge?: boolean;
    /** Text equivalent of the badge, appended (visually hidden) to the accessible name, e.g. "New messages". */
    badgeLabel?: string;
    /** Renders an `<a>`. Without it the item is a `<button type="button">`. */
    href?: string;
    target?: React.AnchorHTMLAttributes<HTMLAnchorElement>["target"];
    rel?: string;
    className?: string;
}
/**
 * A single destination in a Navigation Rail: a glyph in a square target, or
 * glyph and label on one row in the wide form.
 *
 * A plain `<a>` / `<button>` — the rail is a list of links, not a composite
 * widget, so there is no Base UI primitive to wrap (see NavigationRail).
 * Hover and pressed scrims are the ghost tokens alone (spec warn "Double
 * alpha": Figma stacks a paint opacity on already-translucent tokens).
 * Figma's `Collapsible` boolean is wired to nothing and has no caret — it is
 * dropped; a group that expands is a CollapsibleMenuItem.
 *
 * Kept in step with `<zds-navigation-rail-item>`.
 *
 * @spec specs/navigation-rail-item/navigation-rail-item.spec.md
 */
export declare const NavigationRailItem: React.ForwardRefExoticComponent<NavigationRailItemProps & React.RefAttributes<HTMLElement>>;
