import { LitElement } from "lit";
import "../card-footer/card-footer.js";
import "../icon-button/icon-button.js";
import type { IconName } from "@zebra-design-system/icons/names";
export type BottomSheetContentType = "list" | "grid" | "generic";
export type BottomSheetHeaderAlignment = "start" | "center";
/**
 * A surface anchored to the bottom edge of the screen, holding supplementary
 * content or a short set of actions. `content-type` lays out `zds-menu-item`
 * rows, `zds-grid-menu-item` tiles or anything else.
 *
 * It only draws the surface. Presenting it, the scrim, moving focus in and
 * dismissing it all belong to the screen, and Figma defines no motion, shadow
 * or height cap.
 *
 * Departures from Figma, each a spec issue:
 * - `heading`, `header-icon`, `show-leading-icon`, `header-alignment` and the
 *   `actions` slot are inputs, because Figma sets them on nested instances.
 * - The sheet fills its container (Figma ships a fixed 360).
 *
 * @slot - The items, laid out by `content-type`.
 * @slot actions - The footer actions, usually an outline and a primary `zds-button` at size small.
 * @csspart surface - The sheet.
 * @csspart handle - The drag affordance. It has no control behind it.
 * @fires zds-leading-click - The leading button was activated.
 * @csspart header - The title row.
 * @csspart content - The region holding the items.
 * @csspart footer - The `zds-card-footer`.
 *
 * @spec specs/bottom-sheet/bottom-sheet.spec.json
 */
export declare class ZdsBottomSheet extends LitElement {
    #private;
    static styles: import("lit").CSSResult;
    /** How the items are arranged. */
    contentType: BottomSheetContentType;
    /** The sheet's title and accessible name. Use a short noun phrase. */
    heading: string;
    /** Glyph before the title. */
    headerIcon: IconName;
    /** Show the glyph before the title. */
    showLeadingIcon: boolean;
    /** Accessible name of the leading button (spec issue: Figma has none). */
    leadingLabel: string;
    /** `center` centres the title and pins the icon to the leading edge. */
    headerAlignment: BottomSheetHeaderAlignment;
    private hasActions;
    protected render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "zds-bottom-sheet": ZdsBottomSheet;
    }
}
//# sourceMappingURL=bottom-sheet.d.ts.map