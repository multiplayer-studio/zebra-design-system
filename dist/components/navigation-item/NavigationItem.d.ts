import * as React from "react";
import { type IconName } from "../icon/Icon.js";
import "./navigation-item.css";
/**
 * `true` shows a dot; a number or string shows that count. `false`, `0`,
 * `""` and `null` show nothing — a zero count means nothing is waiting.
 */
export type NavigationItemBadge = boolean | number | string | null;
export interface NavigationItemProps extends Omit<React.HTMLAttributes<HTMLElement>, "className" | "children"> {
    /** The destination's name, and the only text on the item. One or two words. */
    label?: string;
    /** Glyph above the label. Figma ships a `star` placeholder — swap it on every item. */
    icon?: IconName;
    /**
     * The destination the user is on: sets `aria-current="page"`. Exactly one
     * item in a bar should carry it; nothing enforces that.
     */
    active?: boolean;
    /**
     * The destination is unavailable. A link loses its `href` and gets
     * `aria-disabled`; a button gets the native `disabled`. Figma offers it on
     * inactive items only — when both are set, disabled wins and `active` is
     * ignored (spec issue: no active+disabled variant).
     */
    disabled?: boolean;
    /**
     * A Notification Indicator over the icon's top-right corner. `true` is the
     * dot (Figma's pinned Size=small); a count shows the number — medium for
     * one character, large for more, capped at "99+".
     */
    badge?: NavigationItemBadge;
    /**
     * Text equivalent of the badge, appended (visually hidden) to the item's
     * accessible name, e.g. "3 unread". Defaults to the count itself; a dot
     * badge has none unless you give one — it is colour-only otherwise.
     */
    badgeLabel?: string;
    /** Renders an `<a>`. Without it the item is a `<button type="button">`. */
    href?: string;
    /** Link target, when `href` is set. */
    target?: React.AnchorHTMLAttributes<HTMLAnchorElement>["target"];
    /** Link rel, when `href` is set. */
    rel?: string;
    className?: string;
}
/**
 * A single destination inside a Navigation Bar: an icon above a label, with
 * an optional badge.
 *
 * Inside a NavigationBar it renders Base UI's NavigationMenu.Item (`<li>`)
 * and NavigationMenu.Link, which sets `aria-current="page"` from `active` and
 * joins the bar's composite keyboard handling. Standalone it renders a plain
 * `<a>` / `<button>` with the same visuals and `aria-current`.
 *
 * Hover, pressed and focus are not in Figma (spec issue); they come from the
 * ghost interactive tokens, like a ghost Button. The icon takes the label's
 * colour via currentColor in every state (spec issue: Figma's icon bindings
 * disagree with the label's).
 *
 * @spec specs/navigation-item/navigation-item.spec.md
 */
export declare const NavigationItem: React.ForwardRefExoticComponent<NavigationItemProps & React.RefAttributes<HTMLElement>>;
