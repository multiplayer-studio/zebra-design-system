import * as React from "react";
import { Tabs } from "@base-ui/react/tabs";
import { type IconName } from "../icon/Icon.js";
import "./tab-bar.css";
/**
 * How the tabs share the row. Spec values are "full width" and "condensed";
 * the space becomes a hyphen so the value works as an attribute.
 */
export type TabBarFlavour = "full-width" | "condensed";
export interface TabBarProps extends Omit<React.ComponentPropsWithoutRef<typeof Tabs.Root>, "className" | "children"> {
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
export declare const TabBar: React.ForwardRefExoticComponent<TabBarProps & React.RefAttributes<HTMLDivElement>>;
/**
 * `true` shows a dot; a number or string shows that count. `false`, `0`,
 * `""` and `null` show nothing.
 */
export type TabItemBadge = boolean | number | string | null;
export interface TabItemProps extends Omit<React.ComponentPropsWithoutRef<typeof Tabs.Tab>, "className" | "children"> {
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
export declare const TabItem: React.ForwardRefExoticComponent<TabItemProps & React.RefAttributes<HTMLElement>>;
