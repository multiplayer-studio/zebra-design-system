import { LitElement } from "lit";
/**
 * A row of closing actions for `zds-card`'s footer slot — one button fills
 * the width, two sit side by side with a gap, or pass anything else entirely
 * (the spec's "custom" option). The count and arrangement are left to
 * whatever is slotted rather than a separate `actions` property.
 *
 * @slot - The footer actions.
 * @spec specs/card/card.spec.json
 */
export declare class ZdsCardFooter extends LitElement {
    static styles: import("lit").CSSResult;
    protected render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "zds-card-footer": ZdsCardFooter;
    }
}
//# sourceMappingURL=card-footer.d.ts.map