import { LitElement, nothing } from "lit";
import "../divider/divider.js";
/**
 * Splits a Navigation Bar's items into groups: with `distribution="start"`
 * the bar gives it all free space, pushing the items after it to the end.
 * Replaces Figma's `spacer` variant + Right Slot (and its `showDivider`
 * axis) with one part placed where the split goes, so any number of groups
 * works. Decorative: the bar hides it from assistive tech.
 *
 * @spec specs/navigation-bar/navigation-bar.spec.json
 */
export declare class ZdsNavigationBarSpacer extends LitElement {
    static styles: import("lit").CSSResult;
    /**
     * Draws a vertical rule in the gap. Figma's Spacer has this boolean but it
     * is wired to nothing, so its divider always shows (spec issue) — wired
     * here. Defaults to false to match the bar's own `showDivider` default.
     */
    showDivider: boolean;
    protected render(): typeof nothing | import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "zds-navigation-bar-spacer": ZdsNavigationBarSpacer;
    }
}
//# sourceMappingURL=navigation-bar-spacer.d.ts.map