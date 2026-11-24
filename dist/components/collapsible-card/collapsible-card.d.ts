import { LitElement } from "lit";
import "../icon/icon.js";
export type CollapsibleCardShape = "sharp" | "rounded";
export type CollapsibleCardFlavor = "default" | "gradient";
/**
 * A card whose body opens and closes behind a header that is always
 * visible. The header carries a title, a description, and a leading chevron
 * that flips with the expanded state.
 *
 * Figma's own file doesn't actually wire the chevron to State (spec issue —
 * the nested header instance is identical between collapsed and expanded in
 * every variant); this element implements the metadata's stated intent
 * instead of that gap, since a chevron that doesn't move defeats the
 * disclosure affordance.
 *
 * The toggle target, its focus handling and its keyboard behaviour are this
 * element's own responsibility (a native `button`), since Figma models none
 * of them. `expanded` reflects, so it can be set or read like a native
 * `<details>` element; toggling fires a bubbling, composed `toggle` event.
 *
 * @slot - The body, revealed only while expanded.
 * @fires toggle - The expanded state changed.
 * @part header - The header button.
 * @part body - The body wrapper.
 *
 * @spec specs/card/card.spec.json
 */
export declare class ZdsCollapsibleCard extends LitElement {
    static styles: import("lit").CSSResult;
    /** Corner treatment. */
    shape: CollapsibleCardShape;
    /** Plain, or outlined with the brand gradient to draw the eye. Use gradient for at most one card in a group. */
    flavor: CollapsibleCardFlavor;
    /** The title, always visible in the header. */
    heading: string | null;
    /** Marks the heading as required with a trailing asterisk. */
    required: boolean;
    /**
     * Supporting text under the heading. Figma's header now has a real
     * `showDescription` toggle (default true) for this — this element derives
     * the same thing from whether `description` was set, rather than adding a
     * second property to keep in sync with it.
     */
    description: string | null;
    /** Whether the body is revealed. Reflects, so it can be read or set like `<details open>`. */
    expanded: boolean;
    private toggle;
    protected render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "zds-collapsible-card": ZdsCollapsibleCard;
    }
}
//# sourceMappingURL=collapsible-card.d.ts.map