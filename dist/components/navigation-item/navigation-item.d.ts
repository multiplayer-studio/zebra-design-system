import { LitElement } from "lit";
import type { IconName } from "@zebra-design-system/icons/names";
import "../icon/icon.js";
import "../notification-indicator/notification-indicator.js";
/**
 * `true` shows a dot; a number or string shows that count. `false`, `0`,
 * `""` and `null` show nothing — a zero count means nothing is waiting.
 * As an attribute: bare `badge` is the dot, `badge="3"` a count.
 */
export type NavigationItemBadge = boolean | number | string | null;
/**
 * A single destination inside a Navigation Bar: an icon above a label, with
 * an optional badge.
 *
 * Renders an `<a>` when `href` is set, otherwise a `<button type="button">`;
 * `active` sets `aria-current="page"`. Focus is delegated to that element, so
 * `item.focus()` and Tab land on it. Inside `<zds-navigation-bar>` the bar
 * gives the host `role="listitem"`.
 *
 * Hover, pressed and focus are not in Figma (spec issue); they come from the
 * ghost interactive tokens, like a ghost Button. The icon takes the label's
 * colour via currentColor in every state (spec issue: Figma's icon bindings
 * disagree with the label's).
 *
 * @part item - The `<a>` / `<button>`.
 * @part label - The label text.
 *
 * @spec specs/navigation-item/navigation-item.spec.json
 */
export declare class ZdsNavigationItem extends LitElement {
    #private;
    static styles: import("lit").CSSResult;
    static shadowRootOptions: {
        delegatesFocus: boolean;
        clonable?: boolean;
        customElementRegistry?: CustomElementRegistry;
        mode: ShadowRootMode;
        serializable?: boolean;
        slotAssignment?: SlotAssignmentMode;
    };
    /** The destination's name, and the only text on the item. One or two words. */
    label: string;
    /** Glyph above the label. Figma ships a `star` placeholder — swap it on every item. */
    icon: IconName;
    /**
     * The destination the user is on: sets `aria-current="page"`. Exactly one
     * item in a bar should carry it; nothing enforces that.
     */
    active: boolean;
    /**
     * The destination is unavailable. A link loses its `href` and gets
     * `aria-disabled`; a button gets the native `disabled`. Figma offers it on
     * inactive items only — when both are set, disabled wins and `active` is
     * ignored (spec issue: no active+disabled variant).
     */
    disabled: boolean;
    /**
     * A Notification Indicator over the icon's top-right corner. `true` (bare
     * attribute) is the dot, Figma's pinned Size=small; a count shows the
     * number — medium for one character, large for more, capped at "99+".
     */
    badge: NavigationItemBadge;
    /**
     * Text equivalent of the badge, appended (visually hidden) to the item's
     * accessible name, e.g. "3 unread". Defaults to the count itself; a dot
     * badge has none unless you give one.
     */
    badgeLabel: string | null;
    /** Renders an `<a>`. Without it the item is a `<button type="button">`. */
    href: string | null;
    /** Link target, when `href` is set. */
    target: string | null;
    /** Link rel, when `href` is set. */
    rel: string | null;
    protected render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "zds-navigation-item": ZdsNavigationItem;
    }
}
//# sourceMappingURL=navigation-item.d.ts.map