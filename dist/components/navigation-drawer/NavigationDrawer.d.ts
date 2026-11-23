import * as React from "react";
import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import type { IconName } from "../icon/Icon.js";
import { type NavigationRailShape } from "../navigation-rail/context.js";
import "./navigation-drawer.css";
/** Which edge the drawer comes from. `start` is the left edge in a left-to-right page. */
export type NavigationDrawerSide = "start" | "end";
/** Why the drawer opened or closed. `navigate` is a destination being chosen. */
export type NavigationDrawerOpenChangeReason = "trigger" | "close" | "escape" | "backdrop" | "navigate" | "other";
export interface NavigationDrawerProps {
    /**
     * `true` (default): the drawer slides over the page on a Scrim, traps
     * focus and closes on Escape, a scrim click or a chosen destination.
     * `false`: a standard drawer that sits in the layout beside the content
     * and pushes it, opening and closing in place.
     */
    modal?: boolean;
    /** Controlled open state. */
    open?: boolean;
    /** Initial open state when uncontrolled. */
    defaultOpen?: boolean;
    /** Called whenever the drawer opens or closes, with why. */
    onOpenChange?: (open: boolean, reason: NavigationDrawerOpenChangeReason) => void;
    /** The edge it comes from. */
    side?: NavigationDrawerSide;
    /** Escape and a scrim click close a modal drawer. */
    dismissible?: boolean;
    /** Choosing a destination (a link or button in the menu or footer) closes a modal drawer. */
    closeOnNavigate?: boolean;
    /**
     * Turns the NavigationHeader's trailing Icon Button into the close button
     * (the `close` glyph and `closeLabel`), replacing its usual action. There is
     * no separate close control: without a NavigationHeader in `header`, nothing
     * is added.
     */
    showClose?: boolean;
    /** Accessible name of the close button. */
    closeLabel?: string;
    /** The element that opens a modal drawer, usually the header's menu IconButton. Focus returns to it on close. */
    trigger?: React.ReactElement;
    /** Accessible name of the `<nav>` landmark, and of the modal drawer. */
    navLabel?: string;
    /** Top of the drawer: normally a NavigationHeader. */
    header?: React.ReactNode;
    /** A full-width primary Button under the header, for a create or compose entry point. Unset, there is none. */
    actionLabel?: string;
    /** The action's glyph. */
    actionIcon?: IconName;
    /** Called when the action is pressed. */
    onAction?: () => void;
    /** The menu: SubMenuItems, CollapsibleMenuItems and Dividers. Never scrolls on its own. */
    children?: React.ReactNode;
    /** SubMenuItems after the menu (settings, help, sign out). Not frozen: it scrolls with the menu, and sits at the bottom only when the content is short. */
    footer?: React.ReactNode;
    /** Corner shape of every item, group and button inside. The drawer itself is never rounded. */
    shape?: NavigationRailShape;
    /** The drawer's width: a CSS length or a number in px. 320px by default, never wider than the viewport less a strip of page. */
    width?: number | string;
    /** Where a modal drawer mounts. Defaults to `document.body`; pass the themed root when theme classes sit below `<body>`. */
    portalContainer?: React.ComponentPropsWithoutRef<typeof BaseDialog.Portal>["container"];
    className?: string;
    style?: React.CSSProperties;
}
/**
 * The app's destinations in a tall panel at the edge of the screen, opened
 * from a menu button.
 *
 * Built from the Navigation Rail family rather than new parts: put a
 * NavigationHeader at the top, then SubMenuItems for destinations,
 * CollapsibleMenuItems for groups and Dividers in the menu and footer. The
 * drawer has no collapsed form, so every row is a SubMenuItem (a group's
 * header is one too) and glyphs, labels and heights line up; use
 * NavigationRailItem in the rail, not here (owner decision). The drawer
 * hands its `shape` down through the rail's context. Unlike the rail, the
 * drawer follows the page's colour mode; it is not locked to dark.
 *
 * Modal (default): Base UI's Dialog provides the focus trap, initial focus,
 * focus return to the trigger, Escape and outside-click dismissal, scroll
 * lock and the portal. The backdrop is the Scrim component (tone scrim). The
 * drawer slides in from its edge with animations/smooth, and not at all
 * under reduced motion. Choosing a destination closes it.
 *
 * Standard (`modal={false}`): a plain `<nav>` in the layout. Closed, it
 * narrows to nothing and is inert, so the content beside it takes the space.
 *
 * Scrolling (owner decision): only the header is frozen, sticky at the top.
 * The menu never scrolls on its own and the footer is never pinned; it
 * follows the menu. A standard drawer grows with its content and the page
 * scrolls it; a modal drawer scrolls as one surface with no scrollbar.
 *
 * Surface: the modal drawer is raised like Dialog (surface/overlay,
 * shadow/large); the standard one sits on surface/section like the rail.
 * No width token exists, so the 320px default is a literal named once in
 * the CSS.
 *
 * @spec specs/navigation-drawer/navigation-drawer.spec.md
 */
export declare const NavigationDrawer: React.ForwardRefExoticComponent<NavigationDrawerProps & React.RefAttributes<HTMLElement>>;
