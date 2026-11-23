import { LitElement, type TemplateResult } from "lit";
import type { IconName } from "@zebra-design-system/icons/names";
import type { NavigationRailShape } from "../navigation-rail/navigation-rail.js";
import "../icon/icon.js";
import "../notification-indicator/notification-indicator.js";
import "../caret-indicator/caret-indicator.js";
import "../tooltip/tooltip.js";
import type { CaretIndicatorDirection } from "../caret-indicator/caret-indicator.js";
/** A count. `0`, `""` and `null` show nothing; above 99 reads "99+". */
export type SubMenuItemBadge = number | string | null;
/** @internal The row's inside, shared with zds-collapsible-menu-item's header. */
export declare function subMenuRowContent(o: {
    label: string;
    icon: IconName;
    showLeadingIcon: boolean;
    badge: SubMenuItemBadge;
    badgeLabel: string | null;
    caret: CaretIndicatorDirection | null;
    open: boolean;
}): TemplateResult;
/**
 * @internal The full label of a row (or a zds-collapsible-menu-item header), in a
 * zds-tooltip after a 3s hover — only when the label is truncated (owner
 * decision). `canOpen` measures the label at hover start, when the delay
 * ends and on keyboard focus, so a resize or a label change is always
 * current. `no-describe`: the bubble repeats the row's own accessible name.
 * The bubble stays in this shadow tree, so it inherits the rail's mode.
 */
export declare function truncatedLabelTooltip(o: {
    anchorId: string;
    label: string;
    shape: NavigationRailShape;
    root: ShadowRoot | null;
}): TemplateResult;
/**
 * A row in the Navigation Rail's sub menu panel: leading glyph, label, an
 * optional counter badge and an optional caret.
 *
 * Renders an `<a>` when `href` is set, otherwise a `<button type="button">`;
 * `selected` sets `aria-current="page"`. Inside a zds-collapsible-menu-item
 * the group sets `nested`. A truncated label shows in full in a tooltip
 * after a 3s hover. Hover, pressed and selected fills are the ghost
 * tokens alone (spec warn "Double alpha"). Kept in step with React
 * `<SubMenuItem>`.
 *
 * @part item - The `<a>` / `<button>`.
 * @part label - The label text.
 *
 * @spec specs/sub-menu-item/sub-menu-item.spec.json
 */
export declare class ZdsSubMenuItem extends LitElement {
    #private;
    static styles: import("lit").CSSResult[];
    static shadowRootOptions: {
        delegatesFocus: boolean;
        clonable?: boolean;
        customElementRegistry?: CustomElementRegistry;
        mode: ShadowRootMode;
        serializable?: boolean;
        slotAssignment?: SlotAssignmentMode;
    };
    /** The row's name. One line; a long name is end-truncated. */
    label: string;
    /** Leading glyph. Figma ships a `verified` placeholder — swap it. */
    icon: IconName;
    /** Shows the leading glyph. Keep it on for every row in a list, or off for all. */
    showLeadingIcon: boolean;
    /** The row the user is on: `aria-current="page"`, the selected ghost fill and label colour. */
    selected: boolean;
    /** Unavailable. Disabled wins over `selected`. */
    disabled: boolean;
    /** A child row under a collapsible group: indented, quieter label, smaller type. Set by the group. */
    nested: boolean;
    /**
     * Corner shape: rounded (`radius/sm`) or sharp (`radius/none`). Inside a
     * zds-navigation-rail the rail's `shape` sets it, inside a
     * zds-collapsible-menu-item the group's.
     */
    shape: NavigationRailShape;
    /**
     * The Badges-page Notification Indicator counter, in the row's layout.
     * Its visibility depends on this alone (spec warn: Figma also hides it with
     * the leading icon). Not Figma's drifted copy (2837:1489).
     */
    badge: SubMenuItemBadge;
    /** Text equivalent of the badge in the accessible name. Defaults to the count. */
    badgeLabel: string | null;
    /**
     * Shows the trailing `chevron-right` caret: a row that opens a further
     * level. Figma defaults it on; here it defaults off, because the spec's own
     * usage says a caret on a row that opens nothing "promises a level that is
     * not there".
     */
    subMenu: boolean;
    /** Turns the caret (90°) while the level it opens is showing. */
    open: boolean;
    /** Renders an `<a>`. Without it the row is a `<button type="button">`. */
    href: string | null;
    target: string | null;
    rel: string | null;
    protected render(): TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "zds-sub-menu-item": ZdsSubMenuItem;
    }
}
//# sourceMappingURL=sub-menu-item.d.ts.map