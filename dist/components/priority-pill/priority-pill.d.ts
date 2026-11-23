import { LitElement } from "lit";
import "../icon/icon.js";
export type PriorityLevel = "low" | "medium" | "high" | "urgent";
export type PriorityVariant = "lozenge" | "badge";
export type PrioritySize = "small" | "large";
export type PriorityLeading = "icon" | "number";
/**
 * Shows where an item sits on a four step scale, from low to urgent. Level
 * sets the fill, the circle and the glyph together, Variant decides whether
 * the name appears beside the circle or the circle stands alone, and Leading
 * swaps the glyph for a rank number. Reach for it where items compete for
 * attention and the order between them is the point.
 *
 * Not interactive. On `badge` the label is not drawn; it is kept as a
 * visually hidden accessible name so the level still reaches assistive
 * technology (the spec asks for a name from the surrounding structure).
 *
 * @slot - The priority name (Label). Defaults to the level's name.
 * @csspart root - The pill.
 *
 * @spec specs/badges/priority-pill.spec.json
 */
export declare class ZdsPriorityPill extends LitElement {
    static styles: import("lit").CSSResult;
    /** Fill, circle, label colour and glyph move together. */
    level: PriorityLevel;
    /** lozenge: circle and label. badge: the circle alone. */
    variant: PriorityVariant;
    size: PrioritySize;
    /** A direction glyph, or the rank number. */
    leading: PriorityLeading;
    /** The rank shown when `leading="number"`. One or two characters. Defaults to the level's rank (urgent 1 … low 4). */
    priorityNumber: string | null;
    protected render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "zds-priority-pill": ZdsPriorityPill;
    }
}
//# sourceMappingURL=priority-pill.d.ts.map