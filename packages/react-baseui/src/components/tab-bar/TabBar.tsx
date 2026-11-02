import * as React from "react";
import { Tabs } from "@base-ui/react/tabs";
import { Icon, type IconName } from "../icon/Icon.js";
import { NotificationIndicator, type NotificationIndicatorSize } from "../notification-indicator/NotificationIndicator.js";
import "./tab-bar.css";

/**
 * How the tabs share the row. Spec values are "full width" and "condensed";
 * the space becomes a hyphen so the value works as an attribute.
 */
export type TabBarFlavour = "full-width" | "condensed";

export interface TabBarProps
  extends Omit<React.ComponentPropsWithoutRef<typeof Tabs.Root>, "className" | "children"> {
  /** `full-width` divides the row evenly; `condensed` lets each tab hug its content. */
  flavour?: TabBarFlavour;
  /** Accessible name of the tab list, e.g. "Connection type". */
  label?: string;
  /** The tabs: TabItem elements. Four is what Figma draws, not a limit. */
  children?: React.ReactNode;
  className?: string;
}

/**
 * A row of tabs for switching between views at the same level.
 *
 * Behaviour comes from Base UI's Tabs: `role="tablist"` / `role="tab"`,
 * `aria-selected`, one tab stop on the selected tab, and arrow keys (plus
 * Home/End) that move between tabs and select as they go. Pass `value` and
 * `onValueChange` to control it, or `defaultValue`. Show the matching view
 * yourself from the value; the bar has no panels (spec: tabs only).
 *
 * @spec specs/tab-bar/tab-bar.spec.md
 */
export const TabBar = React.forwardRef<HTMLDivElement, TabBarProps>(function TabBar(
  { flavour = "full-width", label, children, className, ...rest },
  ref,
) {
  return (
    <Tabs.Root ref={ref} {...rest} className={["zds-tab-bar", className].filter(Boolean).join(" ")} data-flavour={flavour}>
      {/* Automatic activation: the views a tab bar switches are already there,
          so focus and selection move together (spec: "Arrow keys should move
          between tabs with the selected one as the tab stop"). */}
      <Tabs.List className="zds-tab-bar__list" activateOnFocus aria-label={label}>
        {children}
      </Tabs.List>
    </Tabs.Root>
  );
});

/**
 * `true` shows a dot; a number or string shows that count. `false`, `0`,
 * `""` and `null` show nothing.
 */
export type TabItemBadge = boolean | number | string | null;

function badgeParts(badge: TabItemBadge | undefined): { size: NotificationIndicatorSize; value?: string } | null {
  if (badge === true) return { size: "small" };
  if (badge === false || badge === null || badge === undefined || badge === "" || badge === 0) return null;
  const value = typeof badge === "number" && badge > 99 ? "99+" : String(badge);
  return { size: value.length > 1 ? "large" : "medium", value };
}

export interface TabItemProps
  extends Omit<React.ComponentPropsWithoutRef<typeof Tabs.Tab>, "className" | "children"> {
  /** The tab's name: one or two real words. Figma has no text property for it (spec note). */
  label: string;
  /** Leading glyph. Omit for a label-only tab (Figma's Show Leading Icon off). */
  icon?: IconName;
  /**
   * A Notification Indicator after the label. `true` is a dot; a count shows
   * the number, capped at "99+" (spec issue: Figma pins a large count while
   * the metadata describes a dot, so both are offered).
   */
  badge?: TabItemBadge;
  /** Text equivalent of the badge, read after the label, e.g. "3 new". Defaults to the count. */
  badgeLabel?: string;
  className?: string;
}

/**
 * One tab in a Tab Bar: an optional icon, a label and an optional badge.
 * Selected and disabled come from Base UI (`data-active`, `data-disabled`);
 * Figma's separate State, Selected and Disabled axes collapse into those
 * (spec issue).
 *
 * @spec specs/tab-bar/tab-bar.spec.md
 */
export const TabItem = React.forwardRef<HTMLElement, TabItemProps>(function TabItem(
  { label, icon, badge = null, badgeLabel, className, ...rest },
  ref,
) {
  const b = badgeParts(badge);
  const srText = b ? (badgeLabel ?? b.value) : undefined;
  return (
    <Tabs.Tab ref={ref} {...rest} className={["zds-tab-item", className].filter(Boolean).join(" ")}>
      {/* Icon pinned to Size=medium, Framed off (spec); colour is currentColor, so it follows the label. */}
      {icon ? <Icon className="zds-tab-item__icon" name={icon} size="medium" /> : null}
      <span className="zds-tab-item__label">{label}</span>
      {b ? <NotificationIndicator className="zds-tab-item__badge" size={b.size} value={b.value} aria-hidden="true" /> : null}
      {srText ? <span className="zds-tab-item__sr">{`, ${srText}`}</span> : null}
    </Tabs.Tab>
  );
});
