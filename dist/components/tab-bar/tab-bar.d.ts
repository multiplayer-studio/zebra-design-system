import { LitElement, type PropertyValues } from "lit";
import "./tab-item.js";
/**
 * How the tabs share the row. Spec values are "full width" and "condensed";
 * the space becomes a hyphen so the value works as an attribute.
 */
export type TabBarFlavour = "full-width" | "condensed";
/**
 * A row of tabs for switching between views at the same level.
 *
 * The host is the `role="tablist"`; each slotted `<zds-tab-item>` is a
 * `role="tab"`. Matching the React package's Base UI Tabs: one tab stop on
 * the selected tab (roving tabindex), Left/Right move with wrap-around
 * (mirrored in RTL), Home/End jump to the ends, and focus selects as it
 * moves. Show the matching view yourself from `value`; the bar has no panels
 * (spec: tabs only).
 *
 * @slot - The tabs: `<zds-tab-item>` elements. Four is what Figma draws, not a limit.
 * @fires zds-value-change - The user chose another tab. `detail.value` is the new value.
 *
 * @spec specs/tab-bar/tab-bar.spec.json
 */
export declare class ZdsTabBar extends LitElement {
    #private;
    static styles: import("lit").CSSResult;
    /** `full-width` divides the row evenly; `condensed` lets each tab hug its content. */
    flavour: TabBarFlavour;
    /** The selected tab's value. Empty, or one naming no enabled tab, falls back to the first enabled tab. */
    value: string;
    /** Accessible name of the tab list, e.g. "Connection type". */
    label: string | null;
    connectedCallback(): void;
    disconnectedCallback(): void;
    protected updated(changed: PropertyValues<this>): void;
    protected render(): import("lit").TemplateResult<1>;
    private get tabs();
}
declare global {
    interface HTMLElementTagNameMap {
        "zds-tab-bar": ZdsTabBar;
    }
}
//# sourceMappingURL=tab-bar.d.ts.map