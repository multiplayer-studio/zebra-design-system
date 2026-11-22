import { LitElement } from "lit";
import type { IconName } from "@zebra-design-system/icons/names";
import "../icon/icon.js";
import "../icon-button/icon-button.js";
import type { NavigationRailShape } from "./navigation-rail.js";
export type SubMenuHeaderType = "default" | "sub-page";
/**
 * The title bar of a Navigation Rail's sub menu panel.
 *
 * Type=sub-page leads with a back Icon Button and sits it `space/sm` from the
 * title; Type=default leads with a glyph at `space/md`. `show-leading-icon`
 * hides either (Figma wires it in default only — spec warn). Inside
 * zds-navigation-rail the rail sets `shape`; slotted actions are yours —
 * read `this.closest("zds-navigation-rail")?.shape` to match.
 *
 * @slot actions - Trailing actions — zds-button or zds-icon-button. Replaces Figma's showTrailingActions + slot.
 * @fires zds-back - The back button was pressed (type="sub-page").
 *
 * @spec specs/navigation-rail/navigation-rail.spec.json (subcomponents › Sub Menu Header)
 */
export declare class ZdsSubMenuHeader extends LitElement {
    #private;
    static styles: import("lit").CSSResult;
    /** default: a leading glyph. sub-page: a back Icon Button (`arrow-back`). */
    type: SubMenuHeaderType;
    /** The panel's title (called `heading`, since `title` is the native tooltip). */
    heading: string;
    /** Leading glyph in type=default. Figma ships a `verified` placeholder. */
    icon: IconName;
    /**
     * Shows the leading glyph / back button. Figma wires it in type=default
     * only (spec warn); here it works in both.
     */
    showLeadingIcon: boolean;
    /** Accessible name of the back button. */
    backLabel: string;
    /** The back Icon Button's shape. Inside a zds-navigation-rail the rail's `shape` sets it. */
    shape: NavigationRailShape;
    /** Heading level of the title. */
    headingLevel: 2 | 3 | 4 | 5 | 6;
    private hasActions;
    protected render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "zds-sub-menu-header": ZdsSubMenuHeader;
    }
}
//# sourceMappingURL=sub-menu-header.d.ts.map