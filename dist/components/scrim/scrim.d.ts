import { LitElement } from "lit";
export type ScrimTone = "scrim" | "modal";
/**
 * The barrier between a raised surface and the page behind it. It fills its
 * nearest positioned ancestor edge to edge, with one fill and nothing else.
 *
 * `<zds-dialog>`, `<zds-lightbox>` and a modal `<zds-bottom-sheet>` render it
 * as their backdrop. With the `popover` attribute it joins the top layer and
 * covers the viewport; the owner shows it just before its own modal. Use it
 * directly only under a custom overlay, one per open surface.
 * It is decorative (`aria-hidden`, never focusable) and renders no content.
 * A click on it bubbles as a normal `click`, so the owner decides whether to
 * close.
 *
 * @spec specs/scrim/scrim.spec.json
 */
export declare class ZdsScrim extends LitElement {
    static styles: import("lit").CSSResult;
    /** scrim dims the page behind; modal hides it completely. */
    tone: ScrimTone;
    connectedCallback(): void;
    protected render(): null;
}
/** Shows an owner's popover scrim in the top layer, if it isn't already. Call just before `showModal()`. */
export declare function raiseScrim(scrim: HTMLElement | null | undefined): void;
/** Hides an owner's popover scrim, if it is showing. */
export declare function lowerScrim(scrim: HTMLElement | null | undefined): void;
declare global {
    interface HTMLElementTagNameMap {
        "zds-scrim": ZdsScrim;
    }
}
//# sourceMappingURL=scrim.d.ts.map