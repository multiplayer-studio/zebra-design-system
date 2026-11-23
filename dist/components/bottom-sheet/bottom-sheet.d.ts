import { LitElement, type PropertyValues } from "lit";
import "../card-footer/card-footer.js";
import "../icon-button/icon-button.js";
import type { IconName } from "@zebra-design-system/icons/names";
export type BottomSheetContentType = "list" | "grid" | "generic";
export type BottomSheetHeaderAlignment = "start" | "center";
/** Why a modal sheet closed. */
export type BottomSheetOpenChangeReason = "escape" | "backdrop" | "other";
/**
 * A surface anchored to the bottom edge of the screen, holding supplementary
 * content or a short set of actions. `content-type` lays out `zds-menu-item`
 * rows, `zds-grid-menu-item` tiles or anything else.
 *
 * By default it only draws the surface, and the screen presents it. With
 * `modal`, it presents itself: a native `<dialog>` anchored to the bottom of
 * the viewport over a `<zds-scrim>` (tone scrim), focus moved in and returned,
 * page scroll locked, and Escape or a scrim click closing it when
 * `dismissible`. It rises from the bottom edge (animations/smooth; none under
 * reduced motion). Figma defines no motion, so that is a code decision.
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
 * @fires zds-open-change - `{ open, reason }` when Escape or a scrim click closes a modal sheet. Not fired for a programmatic `open` change.
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
    /** Present the sheet at the bottom of the viewport over a scrim, with focus inside. Code only. */
    modal: boolean;
    /** Whether a modal sheet is shown. Reflected. */
    open: boolean;
    /** Escape and a scrim click close a modal sheet. `dismissible="false"` when the sheet needs a decision. */
    dismissible: boolean;
    private hasActions;
    private dialogEl?;
    private scrimEl?;
    private returnFocus;
    private locked;
    disconnectedCallback(): void;
    /** Opens a modal sheet (same as `open = true`). */
    show(): void;
    /** Closes a modal sheet (same as `open = false`). */
    close(): void;
    private setOpen;
    private onKeydown;
    private onCancel;
    private onDialogClick;
    protected updated(changed: PropertyValues<this>): void;
    private syncDialog;
    protected render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "zds-bottom-sheet": ZdsBottomSheet;
    }
}
//# sourceMappingURL=bottom-sheet.d.ts.map