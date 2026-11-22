import { LitElement, type PropertyValues } from "lit";
import type { IconName } from "@zebra-design-system/icons/names";
import "../icon/icon.js";
import "../notification-indicator/notification-indicator.js";
/**
 * `true` shows a dot; a number or string shows that count. `false`, `0`,
 * `""` and `null` show nothing. As an attribute: bare `badge` is the dot,
 * `badge="3"` a count.
 */
export type TabItemBadge = boolean | number | string | null;
/**
 * One tab in a Tab Bar: an optional icon, a label and an optional badge.
 *
 * The host is the tab: it carries `role="tab"` and `aria-selected`, and the
 * surrounding `<zds-tab-bar>` sets `selected` and the roving `tabindex`.
 * Figma's separate State, Selected and Disabled axes collapse into the
 * `selected` and `disabled` properties (spec issue).
 *
 * @part label - The label text.
 *
 * @spec specs/tab-bar/tab-bar.spec.json
 */
export declare class ZdsTabItem extends LitElement {
    static styles: import("lit").CSSResult;
    /** The value the bar reports when this tab is chosen. Unique within the bar. */
    value: string;
    /** The tab's name: one or two real words. Figma has no text property for it (spec note). */
    label: string;
    /** Leading glyph. Omit for a label-only tab (Figma's Show Leading Icon off). */
    icon: IconName | null;
    /** Whether this is the chosen tab. Set by `<zds-tab-bar>` from its `value`. */
    selected: boolean;
    /** The tab cannot be chosen. The surface holds; the label carries it alone (spec). */
    disabled: boolean;
    /**
     * A Notification Indicator after the label. `true` (bare attribute) is a
     * dot; a count shows the number, capped at "99+" (spec issue: Figma pins a
     * large count while the metadata describes a dot, so both are offered).
     */
    badge: TabItemBadge;
    /** Text equivalent of the badge, read after the label, e.g. "3 new". Defaults to the count. */
    badgeLabel: string | null;
    connectedCallback(): void;
    protected updated(changed: PropertyValues<this>): void;
    protected render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "zds-tab-item": ZdsTabItem;
    }
}
//# sourceMappingURL=tab-item.d.ts.map