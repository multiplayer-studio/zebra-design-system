import { LitElement } from "lit";
import type { PropertyValues } from "lit";
/**
 * The floating panel a `zds-dropdown` opens onto — a menu surface with its
 * own elevation, holding a list of `zds-menu-item` rows.
 *
 * The spec models this panel as two fixed built-in rows above a slot that
 * takes "the rest", with each `rounded` variant storing that slot's content
 * separately in Figma (spec issue: "Each Rounded variant stores this slot's
 * content separately, so switching Rounded leaves behind whatever was placed
 * in it"). That split is a Figma-authoring artifact — a component in code has
 * no reason to distinguish "the first two rows" from "the rest" — so this
 * element just slots everything through one default slot rather than
 * reproducing a built-in/more-items distinction that would only exist to
 * mirror how the design file happens to be organised.
 *
 * The panel has no interaction states of its own (spec: "Hover, selection,
 * focus and disabled all live on the Menu Item rows inside it"), so this
 * element carries no `state` property — only `rounded`, which the panel and
 * its rows should agree on, and `compact`, which tightens the panel's inset.
 *
 * "Should agree on" is enforced, not just documented (spec: "Rounded
 * propagation" behavior, added alongside Menu Item's own "match the panel"
 * guidance). Every slotted `zds-menu-item` that doesn't carry an explicit
 * `rounded` attribute of its own is kept in sync with this panel's `rounded`
 * — on slot assignment and whenever this panel's `rounded` changes. A row
 * that *does* set its own `rounded` in markup is left alone, so a consumer
 * can still override a single row on purpose.
 *
 * @slot - The menu's rows, typically `zds-menu-item` elements.
 * @part menu - The panel element.
 *
 * @spec specs/dropdown/dropdown.spec.json (Dropdown Menu subcomponent)
 */
export declare class ZdsDropdownMenu extends LitElement {
    static styles: import("lit").CSSResult;
    /** Corner treatment. The rows inherit this so the panel and its contents stay in agreement. */
    rounded: boolean;
    /** Tightens the inset (`space/xs` instead of `space/card`) for a menu with little room to spare. Rows keep their size. */
    compact: boolean;
    private readonly _autoRounded;
    private readonly _handleSlotChange;
    private _syncRoundedToRows;
    protected updated(changed: PropertyValues): void;
    protected render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "zds-dropdown-menu": ZdsDropdownMenu;
    }
}
//# sourceMappingURL=dropdown-menu.d.ts.map