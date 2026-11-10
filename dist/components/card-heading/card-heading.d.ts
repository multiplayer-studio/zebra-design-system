import { LitElement } from "lit";
/**
 * A title row: optional leading content, a heading and subheading, optional
 * trailing content. Built for `zds-card`'s header slot (and reused inside the
 * body slot of media layouts), but not exclusive to it.
 *
 * Figma exposes `hasLeading`/`hasTrailing` as separate boolean properties;
 * this element derives visibility from whether the `leading`/`trailing`
 * slots have assigned content, since a consumer would otherwise have to keep
 * a slot and a boolean in sync for one decision.
 *
 * @slot leading - Leading content, e.g. an avatar.
 * @slot trailing - Trailing content, e.g. an icon button.
 * @part heading - The heading text.
 * @part subheading - The subheading text.
 *
 * @spec specs/card/card.spec.json
 */
export declare class ZdsCardHeading extends LitElement {
    static styles: import("lit").CSSResult;
    /** The title. */
    heading: string | null;
    /** Supporting text under the heading. */
    subheading: string | null;
    private hasLeading;
    private hasTrailing;
    private onLeadingSlotChange;
    private onTrailingSlotChange;
    protected render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "zds-card-heading": ZdsCardHeading;
    }
}
//# sourceMappingURL=card-heading.d.ts.map