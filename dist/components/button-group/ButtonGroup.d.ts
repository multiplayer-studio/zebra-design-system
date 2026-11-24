import * as React from "react";
import type { ButtonSize } from "../button/Button.js";
import "../button/button.css";
import "./button-group.css";
export type ButtonGroupSize = ButtonSize;
export type ButtonGroupShape = "sharp" | "rounded";
export interface ButtonGroupProps extends Omit<React.ComponentPropsWithoutRef<"div">, "className"> {
    /** Row height and the size of every item. The group's call, never set per item. */
    size?: ButtonGroupSize;
    /** Rounds the group's outline and the outer ends of its first and last item only. */
    shape?: ButtonGroupShape;
    /** The accessible name: what the actions have in common. Same as `aria-label`. */
    label?: string;
    /** The actions: `Button` and/or `IconButton` elements, as direct children (the group sets props on them, so don't wrap them in another component or a fragment). */
    children?: React.ReactNode;
    className?: string;
}
/**
 * A row of related actions sharing one bordered surface, where each carries
 * equal weight rather than one leading. Reach for a single Button when one
 * action is clearly the primary one.
 *
 * An item is the package's own `Button` or `IconButton`; the group passes its
 * `size` down, pins `flavour="subtle"` and `shape="sharp"` (spec: size, shape
 * and flavour belong to the group, never set per item) and draws a vertical
 * `Divider` between every pair. Figma's per-size, per-position wrapper sets
 * are an authoring arrangement and are not reproduced: position comes from
 * the item's index.
 *
 * Semantics: a plain `role="group"` container, each item its own tab stop.
 * Base UI's Toolbar was considered and not used — its roving tabindex makes
 * the row one tab stop with arrow keys between items, which suits a toolbar
 * of many controls, but the spec asks for a group role, a group of two or
 * three peer actions reads better as ordinary buttons, and a group is often
 * placed inside a toolbar, where a nested toolbar is invalid ARIA. The web
 * component matches without hand-rolling roving focus.
 *
 * @spec specs/button-group/button-group.spec.md
 */
export declare const ButtonGroup: React.ForwardRefExoticComponent<ButtonGroupProps & React.RefAttributes<HTMLDivElement>>;
