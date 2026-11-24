import { LitElement } from "lit";
export type CardShape = "sharp" | "rounded";
/**
 * The empty card shell: three stacked slots inside a bordered surface. It
 * decides the surface, the border, the corner treatment and clipping, and
 * nothing else — every inset comes from whatever fills the slots
 * (`zds-card-heading`, `zds-card-body`, `zds-card-image`, `zds-card-footer`,
 * or anything else).
 *
 * Header and footer can each be switched off; the body has no toggle. Width
 * is not fixed here — the spec's own 330px is a Figma canvas artifact, not a
 * constraint ("whoever places it decides the width"), so this shell sizes to
 * its container.
 *
 * @slot header - The header slot, hidden by has-header.
 * @slot - The body slot. Always present.
 * @slot footer - The footer slot, hidden by has-footer.
 * @part header - The header wrapper.
 * @part body - The body wrapper.
 * @part footer - The footer wrapper.
 *
 * @spec specs/card/card.spec.json
 */
export declare class ZdsCard extends LitElement {
    static styles: import("lit").CSSResult;
    /** Corner treatment. Content clips to it, so a full-bleed image follows the curve. */
    shape: CardShape;
    /** Shows the header slot above the body. */
    hasHeader: boolean;
    /** Shows the footer slot below the body. */
    hasFooter: boolean;
    protected render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "zds-card": ZdsCard;
    }
}
//# sourceMappingURL=card.d.ts.map