import { LitElement } from "lit";
import "../divider/divider.js";
/**
 * How the items are arranged across the bar's width. Renames Figma's
 * `shrinkItems`, whose name describes neither mode:
 * - `start` (shrinkItems=true): items keep their natural width and pack from
 *   the start; a `<zds-navigation-bar-spacer>` pushes the next group to the end.
 * - `space-between` (shrinkItems=false): the item row fills the width and
 *   distributes free space BETWEEN items — the end items touch the bar's
 *   edges. It is Figma's actual behaviour, not equal-width items or an even
 *   spread (spec note).
 */
export type NavigationBarDistribution = "start" | "space-between";
/**
 * A horizontal bar of top-level destinations, pinned to one edge of a view.
 *
 * Renders a `<nav>` landmark holding a list: each slotted
 * `<zds-navigation-item>` gets `role="listitem"`, each
 * `<zds-navigation-bar-spacer>` is hidden from assistive tech. Every item
 * stays in the Tab order (they are links, not toolbar buttons, so roving
 * tabindex would hide destinations from Tab users); Left/Right arrows also
 * move between items, without wrapping, matching the React package's Base UI
 * NavigationMenu.
 *
 * It has no fill — only a top border — so it takes the surface behind it.
 *
 * @slot - NavigationItem elements, optionally split into groups by `zds-navigation-bar-spacer`.
 * @slot action - A call to action at the end that is not a destination — normally one `zds-button`. Replaces Figma's `showActionSlot`.
 * @part nav - The `<nav>` element.
 * @part list - The item row (`role="list"`).
 * @part action - The action slot's wrapper.
 *
 * @spec specs/navigation-bar/navigation-bar.spec.json
 */
export declare class ZdsNavigationBar extends LitElement {
    #private;
    static styles: import("lit").CSSResult;
    /** Accessible name of the `<nav>` landmark. Name it when a page has more than one. */
    label: string;
    /** How the items are arranged across the width. */
    distribution: NavigationBarDistribution;
    /**
     * A vertical rule before the action. Figma draws it only in the
     * spacer + showDivider variant and never documents it (spec issue); in
     * code it is independent.
     */
    actionDivider: boolean;
    private hasAction;
    protected render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "zds-navigation-bar": ZdsNavigationBar;
    }
}
//# sourceMappingURL=navigation-bar.d.ts.map