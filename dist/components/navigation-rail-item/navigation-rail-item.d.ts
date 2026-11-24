import { LitElement } from "lit";
import type { IconName } from "@zebra-design-system/icons/names";
import type { NavigationRailShape } from "../navigation-rail/navigation-rail.js";
import "../icon/icon.js";
import "../notification-indicator/notification-indicator.js";
/**
 * A single destination in a Navigation Rail: a glyph in a square target, or
 * glyph and label on one row in the wide form.
 *
 * Renders an `<a>` when `href` is set, otherwise a `<button type="button">`;
 * `selected` sets `aria-current="page"`. Focus is delegated to that element.
 * Inside `<zds-navigation-rail>` the rail sets `expanded`, `show-label` and
 * `shape`.
 *
 * Hover and pressed scrims are the ghost tokens alone (spec warn "Double
 * alpha": Figma stacks a paint opacity on already-translucent tokens).
 * Figma's `Collapsible` boolean is wired to nothing and has no caret — it is
 * dropped; a group that expands is a zds-collapsible-menu-item.
 *
 * Kept in step with React `<NavigationRailItem>`.
 *
 * @part item - The `<a>` / `<button>`.
 * @part label - The label text.
 *
 * @spec specs/navigation-rail-item/navigation-rail-item.spec.json
 */
export declare class ZdsNavigationRailItem extends LitElement {
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
    /**
     * The destination's name. Always the accessible name; shown beside the
     * glyph in the wide form and under it in the narrow form when `show-label`.
     */
    label: string;
    /** The glyph. Figma ships a `star` placeholder — swap it on every item. */
    icon: IconName;
    /**
     * The destination the user is on: sets `aria-current="page"` and recolours
     * glyph and label (no scrim). Figma's State=selected. Exactly one item
     * across the rail and its panel should carry it; nothing enforces that.
     */
    selected: boolean;
    /**
     * Unavailable. A link loses its `href` and gets `aria-disabled`; a button
     * gets `disabled`. Disabled wins over `selected`.
     */
    disabled: boolean;
    /** The wide form: glyph and label on one row. Inside a rail, the rail sets it. */
    expanded: boolean;
    /** Caption under the glyph in the narrow form. Inside a rail, the rail's `show-labels` sets it. */
    showLabel: boolean;
    /**
     * Corner shape: rounded (`radius/sm`) or sharp (`radius/none`). Inside a
     * zds-navigation-rail the rail's `shape` sets it.
     */
    shape: NavigationRailShape;
    /** Shows the glyph (and the badge anchored to it). Keep it on in the narrow form. */
    showIcon: boolean;
    /** The Badges-page Notification Indicator dot (Size=small) over the glyph's top-right corner. */
    badge: boolean;
    /** Text equivalent of the badge, appended (visually hidden) to the accessible name. */
    badgeLabel: string | null;
    /**
     * Makes the item a disclosure toggle: its button carries `aria-expanded`
     * with this value. The rail's own toggle item uses it.
     */
    toggleExpanded: boolean | null;
    /** Renders an `<a>`. Without it the item is a `<button type="button">`. */
    href: string | null;
    target: string | null;
    rel: string | null;
    protected render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "zds-navigation-rail-item": ZdsNavigationRailItem;
    }
}
//# sourceMappingURL=navigation-rail-item.d.ts.map