import { LitElement } from "lit";
/**
 * A full-bleed image for `zds-card`'s body slot. Fills the width and clips to
 * the card's own corner radius (via the card's `overflow: hidden`); height is
 * left to the consumer — the spec's own 259px is an unbound, authored canvas
 * value, not a real constraint.
 *
 * @part image - The image element.
 * @spec specs/card/card.spec.json
 */
export declare class ZdsCardImage extends LitElement {
    static styles: import("lit").CSSResult;
    /** Image source. */
    src: string | null;
    /** Accessible text for the image. */
    alt: string | null;
    protected render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "zds-card-image": ZdsCardImage;
    }
}
//# sourceMappingURL=card-image.d.ts.map