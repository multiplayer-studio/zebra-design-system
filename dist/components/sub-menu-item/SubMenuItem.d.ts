import * as React from "react";
import { type IconName } from "../icon/Icon.js";
import { type CaretIndicatorDirection } from "../caret-indicator/CaretIndicator.js";
import { type NavigationRailShape } from "../navigation-rail/context.js";
import "./sub-menu-item.css";
/** A count. `0`, `""`, `null` and `undefined` show nothing; above 99 reads "99+". */
export type SubMenuItemBadge = number | string | null;
export interface SubMenuItemProps extends Omit<React.HTMLAttributes<HTMLElement>, "className" | "children"> {
    /** The row's name. One line; a long name is end-truncated. */
    label?: string;
    /** Leading glyph. Figma ships a `verified` placeholder — swap it. */
    icon?: IconName;
    /** Shows the leading glyph. Keep it on for every row in a list, or off for all. */
    showLeadingIcon?: boolean;
    /**
     * The row the user is on: `aria-current="page"`, the selected ghost fill
     * and label colour. Exactly one destination across rail and panel.
     */
    selected?: boolean;
    /** Unavailable. Disabled wins over `selected` (Figma has no selected+disabled). */
    disabled?: boolean;
    /**
     * A child row under a collapsible group: indented, quieter label, smaller
     * type. Inside a CollapsibleMenuItem it is set for you.
     */
    nested?: boolean;
    /**
     * Corner shape: rounded (`radius/sm`) or sharp (`radius/none`). Inside a
     * NavigationRail the rail's `shape` sets it, inside a CollapsibleMenuItem
     * the group's; this prop applies only on a row standing alone.
     */
    shape?: NavigationRailShape;
    /**
     * The Badges-page Notification Indicator counter, in the row's layout
     * between label and caret. Its visibility depends on this alone (spec warn:
     * Figma also hides it with the leading icon). Medium for one character,
     * large for more. Not Figma's drifted copy (2837:1489).
     */
    badge?: SubMenuItemBadge;
    /** Text equivalent of the badge in the accessible name, e.g. "2 unread". Defaults to the count. */
    badgeLabel?: string;
    /**
     * Shows the trailing `chevron-right` caret: a row that opens a further
     * level. Figma defaults it on; here it defaults off, because the spec's own
     * usage says a caret on a row that opens nothing "promises a level that is
     * not there", and most rows navigate straight to a destination.
     */
    subMenu?: boolean;
    /** Turns the caret (90°) while the level it opens is showing. Set `aria-expanded` yourself if it controls one. */
    open?: boolean;
    /** Renders an `<a>`. Without it the row is a `<button type="button">`. */
    href?: string;
    target?: React.AnchorHTMLAttributes<HTMLAnchorElement>["target"];
    rel?: string;
    className?: string;
}
/** @internal The row's inside, shared with CollapsibleMenuItem's header. */
export declare function SubMenuRowContent({ label, icon, showLeadingIcon, badge, badgeLabel, caret, open, labelRef, }: {
    labelRef?: React.Ref<HTMLSpanElement>;
    label: string;
    icon: IconName;
    showLeadingIcon: boolean;
    badge: SubMenuItemBadge | undefined;
    badgeLabel?: string;
    caret: CaretIndicatorDirection | null;
    open: boolean;
}): React.JSX.Element;
/**
 * @internal The full label of a row (or a Collapsible Menu Item header), in a
 * Tooltip after a 3s hover — only when the label is truncated (owner
 * decision). Controlled: Base UI asks to open after the delay (or at once on
 * keyboard focus) and the label is measured then, so a resize or a label
 * change is always current; the row is never remounted. `describe={false}`:
 * the bubble repeats the row's own accessible name. The popup portals to
 * `body`, so it carries the rail's mode class to stay in the rail's mode.
 */
export declare function TruncatedLabelTooltip({ label, labelRef, shape, trigger, }: {
    label: string;
    labelRef: React.RefObject<HTMLSpanElement | null>;
    shape: NavigationRailShape;
    trigger: React.ReactElement;
}): React.JSX.Element;
/**
 * A row in the Navigation Rail's sub menu panel: leading glyph, label, an
 * optional counter badge and an optional caret.
 *
 * A plain `<a>` / `<button>`; inside a CollapsibleMenuItem it renders nested.
 * A truncated label shows in full in a tooltip after a 3s hover.
 * Hover, pressed and selected fills are the ghost tokens alone (spec warn
 * "Double alpha"). Kept in step with `<zds-sub-menu-item>`.
 *
 * @spec specs/sub-menu-item/sub-menu-item.spec.md
 */
export declare const SubMenuItem: React.ForwardRefExoticComponent<SubMenuItemProps & React.RefAttributes<HTMLElement>>;
