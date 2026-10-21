import * as React from "react";
import { NavigationMenu } from "@base-ui/react/navigation-menu";
import { Divider } from "../divider/Divider.js";
import { NavigationBarContext } from "./context.js";
import "./navigation-bar.css";

/**
 * How the items are arranged across the bar's width. Renames Figma's
 * `shrinkItems`, whose name describes neither mode:
 * - `start` (shrinkItems=true): items keep their natural width and pack from
 *   the start; a NavigationBarSpacer pushes the next group to the end.
 * - `space-between` (shrinkItems=false): the item row fills the width and
 *   distributes free space BETWEEN items — the end items touch the bar's
 *   edges. It is Figma's actual behaviour, not equal-width items or an even
 *   spread (spec note).
 */
export type NavigationBarDistribution = "start" | "space-between";

export interface NavigationBarProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "className"> {
  /** Accessible name of the `<nav>` landmark. Name it when a page has more than one. */
  label?: string;
  /** How the items are arranged across the width. */
  distribution?: NavigationBarDistribution;
  /**
   * A call to action at the end of the bar that is not a destination —
   * normally one Button. Replaces Figma's `showActionSlot` + Action Slot.
   */
  action?: React.ReactNode;
  /**
   * A vertical rule before the action. Figma draws it only in the
   * spacer + showDivider variant and never documents it (spec issue); in code
   * it is independent.
   */
  actionDivider?: boolean;
  /** NavigationItem children, optionally split into groups by NavigationBarSpacer. */
  children?: React.ReactNode;
  className?: string;
}

/**
 * A horizontal bar of top-level destinations, pinned to one edge of a view.
 *
 * Built on Base UI's NavigationMenu: Root renders the `<nav>`, List the
 * `<ul>`, and each NavigationItem a NavigationMenu.Item + Link, so the active
 * item carries `aria-current="page"`. Every item stays in the Tab order (they
 * are links, not toolbar buttons, so roving tabindex would hide destinations
 * from Tab users); the List's composite handling adds Left/Right arrow
 * movement on top, which the web component mirrors.
 *
 * It has no fill — only a top border — so it takes the surface behind it.
 *
 * @spec specs/navigation-bar/navigation-bar.spec.md
 */
export const NavigationBar = React.forwardRef<HTMLElement, NavigationBarProps>(function NavigationBar(
  { label = "Main", distribution = "start", action, actionDivider = false, className, children, ...rest },
  ref,
) {
  const hasAction = action !== undefined && action !== null && action !== false;
  return (
    <NavigationMenu.Root
      ref={ref}
      {...(rest as Omit<React.ComponentPropsWithoutRef<typeof NavigationMenu.Root>, "className">)}
      aria-label={label}
      className={["zds-navigation-bar", className].filter(Boolean).join(" ")}
      data-distribution={distribution}
    >
      <NavigationMenu.List className="zds-navigation-bar__list">
        <NavigationBarContext.Provider value={true}>{children}</NavigationBarContext.Provider>
      </NavigationMenu.List>
      {hasAction && actionDivider ? (
        <div className="zds-navigation-bar__divider-section" aria-hidden="true">
          <Divider orientation="vertical" />
        </div>
      ) : null}
      {hasAction ? <div className="zds-navigation-bar__action">{action}</div> : null}
    </NavigationMenu.Root>
  );
});

export interface NavigationBarSpacerProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "className" | "children"> {
  /**
   * Draws a vertical rule in the gap. Figma's Spacer has this boolean but it
   * is wired to nothing, so its divider always shows (spec issue) — wired
   * here. Defaults to false to match the bar's own `showDivider` default.
   */
  showDivider?: boolean;
  className?: string;
}

/**
 * Splits a Navigation Bar's items into groups: with `distribution="start"`
 * it takes all free space, pushing the items after it to the end. Replaces
 * Figma's `spacer` variant + Right Slot (and its `showDivider` axis) with one
 * part placed where the split goes, so any number of groups works.
 *
 * Decorative: inside the bar it is an `aria-hidden` list item.
 *
 * @spec specs/navigation-bar/navigation-bar.spec.md
 */
export const NavigationBarSpacer = React.forwardRef<HTMLElement, NavigationBarSpacerProps>(
  function NavigationBarSpacer({ showDivider = false, className, ...rest }, ref) {
    const inBar = React.useContext(NavigationBarContext);
    const props = {
      ...rest,
      "aria-hidden": true as const,
      className: ["zds-navigation-bar-spacer", className].filter(Boolean).join(" "),
      "data-divider": showDivider ? "" : undefined,
    };
    const line = showDivider ? <Divider orientation="vertical" /> : null;
    return inBar ? (
      <li ref={ref as React.Ref<HTMLLIElement>} {...props}>{line}</li>
    ) : (
      <div ref={ref as React.Ref<HTMLDivElement>} {...props}>{line}</div>
    );
  },
);
