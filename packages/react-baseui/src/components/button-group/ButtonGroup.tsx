import * as React from "react";
import { Divider } from "../divider/Divider.js";
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
export const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(function ButtonGroup(
  { size = "medium", shape = "sharp", label, children, className, ...rest },
  ref,
) {
  const items = React.Children.toArray(children);
  return (
    <div
      ref={ref}
      role="group"
      aria-label={label}
      {...rest}
      className={["zds-button-group", className].filter(Boolean).join(" ")}
      data-size={size}
      data-shape={shape}
    >
      {items.map((child, i) => (
        <React.Fragment key={React.isValidElement(child) && child.key != null ? child.key : i}>
          {/* Spec issue: Figma drops the divider after item 1 on medium/rounded
              (an "end" wrapper in first place). Here every pair gets one. */}
          {i > 0 ? <Divider orientation="vertical" className="zds-button-group__divider" /> : null}
          {React.isValidElement<{ size?: string; flavour?: string; shape?: string }>(child)
            ? React.cloneElement(child, { size, flavour: "subtle", shape: "sharp" })
            : child}
        </React.Fragment>
      ))}
    </div>
  );
});
