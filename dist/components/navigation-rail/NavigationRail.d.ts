import * as React from "react";
import type { IconName } from "../icon/Icon.js";
import { type NavigationRailShape } from "./context.js";
import "./navigation-rail.css";
export interface NavigationRailProps extends Omit<React.HTMLAttributes<HTMLElement>, "className" | "children"> {
    /** The wide rail (labels beside glyphs) — controlled. */
    expanded?: boolean;
    /** The wide rail at first — uncontrolled. */
    defaultExpanded?: boolean;
    /** Called when the toggle item is pressed, with the next `expanded`. */
    onExpandedChange?: (expanded: boolean) => void;
    /**
     * Captions under the glyphs in the narrow rail (Figma's `Label`). With
     * `expanded` the labels show beside the glyphs anyway, so the combination
     * Figma never built simply works.
     */
    showLabels?: boolean;
    /**
     * The last footer item, which moves between narrow and wide. Only hide it
     * when something outside the rail controls `expanded`.
     */
    showToggleItem?: boolean;
    /**
     * The divider down the rail's trailing edge, between the rail and the
     * page. Hide it when the rail's neighbour already draws that edge.
     */
    showDivider?: boolean;
    /** Toggle label in the narrow rail. */
    expandLabel?: string;
    /** Toggle label in the wide rail. */
    collapseLabel?: string;
    /**
     * The corner shape of everything nested in the rail: slot items, Collapsible
     * Menu Items, the header action, and the Buttons and Icon Buttons inside
     * Navigation Header and Sub Menu Header (including the back button).
     * rounded = `radius/sm`, sharp = `radius/none`. The rail itself has no
     * corners and is unaffected. Code-only — Figma has no counterpart.
     */
    shape?: NavigationRailShape;
    /**
     * The rail follows the page's mode. `inverse` shows it in the opposite
     * shade instead: dark on a light page, light on a dark one. The contrast
     * level (AA or AAA) still follows the page, and everything inside the rail
     * follows the rail. Code-only.
     */
    inverse?: boolean;
    /**
     * Keeps the rail in one mode whatever the page's mode: dark, or light with
     * `inverse`. The contrast level (AA or AAA) still follows the page.
     * Code-only.
     */
    locked?: boolean;
    /**
     * The wide rail's width. 200px by default (Figma's measure); the project
     * sets its own as a CSS length or a number in px, or `"fill"` to take the
     * width of the rail's container. The narrow icon rail is unaffected.
     */
    railWidth?: number | string;
    /**
     * Caps the wide rail's width; the narrow icon rail is unaffected. A CSS
     * length, or a number in px. Wide labels truncate.
     */
    railMaxWidth?: number | string;
    /**
     * Caps the sub menu panel's width. The panel still hugs its list, up to
     * this width; longer rows truncate (full label in a tooltip after a 3s
     * hover). A cap below 240px also lowers the 240px minimum. A CSS length,
     * or a number in px.
     */
    subMenuMaxWidth?: number | string;
    /** Accessible name of the `<nav>` landmark. */
    navLabel?: string;
    /** Top of the rail: normally a NavigationHeader (it follows `expanded`). */
    header?: React.ReactNode;
    /**
     * The header action's label — a create/compose entry point, not a
     * destination. Icon Button in the narrow rail, Button in the wide one.
     * Unset, there is no action (Figma's showHeaderAction).
     */
    actionLabel?: string;
    /** The header action's glyph. */
    actionIcon?: IconName;
    /** Called when the header action is pressed. */
    onAction?: () => void;
    /** The menu: NavigationRailItems (and Dividers). Absorbs the free height. */
    children?: React.ReactNode;
    /** Destinations pinned to the bottom, above the toggle item. */
    footer?: React.ReactNode;
    /** The sub menu panel's title bar: normally a SubMenuHeader. */
    subMenuHeader?: React.ReactNode;
    /**
     * The sub menu panel's rows: SubMenuItems and CollapsibleMenuItems. The
     * panel shows when this or `subMenuHeader` is set (Figma's showSubMenu).
     */
    subMenu?: React.ReactNode;
    className?: string;
}
/**
 * A vertical navigation column for the edge of a desktop view: a narrow icon
 * rail or a wide labelled one, and an optional sub menu panel beside it.
 *
 * Follows the page's mode by default. `inverse` shows the opposite shade,
 * and `locked` keeps the rail dark (light with `inverse`) whatever the page
 * does. For either, the root carries the token layer's `mode-*` class, so
 * the whole subtree follows it. No part of the rail family portals; a popup
 * you slot in that does can read `useNavigationRailModeClass()` to keep the
 * rail's mode.
 *
 * Regions are slots (header, menu, footer, sub menu header, sub menu); the
 * rail hands its width form and shape down to the items through context. It owns the
 * toggle item and wires it to `expanded` (spec: "Behaviour code must own").
 *
 * No Base UI primitive: NavigationMenu models a menubar whose Triggers open
 * Content in a positioned Viewport popup — not a vertical list whose groups
 * expand in place. So the rail is a plain `<nav>` of links, and groups are
 * Base UI Collapsibles (CollapsibleMenuItem). Every destination stays in the
 * Tab order, as on NavigationBar.
 *
 * Figma's Show Header (wired to nothing) is dropped — the header shows when
 * given. Its per-Label Menu Slots and orphan Menu Slot#3200:20 are one
 * `children`; Rail Item 1–3 / Footer Rail Item are sample content, not parts;
 * moreRailItems / moreFooterItems / showHeaderAction / showSubMenu become
 * "is the slot filled".
 *
 * Kept in step with `<zds-navigation-rail>`.
 *
 * @spec specs/navigation-rail/navigation-rail.spec.md
 */
export declare const NavigationRail: React.ForwardRefExoticComponent<NavigationRailProps & React.RefAttributes<HTMLElement>>;
