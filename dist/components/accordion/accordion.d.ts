import { LitElement } from "lit";
/**
 * A vertically stacked list of disclosure rows sharing one container, for a
 * page that has more sections than it has room to show at once. Holds
 * `<zds-accordion-item>` rows.
 *
 * The same semantics as the React package's Base UI Accordion, built
 * natively: each row's header is a heading holding a `button` with
 * `aria-expanded` / `aria-controls`, its panel a `region` labelled by that
 * button; one row open at a time unless `multiple`; Up / Down / Home / End
 * move focus between this accordion's own headers (wrapping), Enter / Space
 * open and close. The panel height animates with Switch's spring, and not at
 * all under reduced motion.
 *
 * Built apart from `<zds-collapsible-card>` (spec analysis): that is one card
 * that folds, this is a list of rows with one shared outline.
 *
 * @slot - `<zds-accordion-item>` rows.
 * @fires zds-value-change - A row opened or closed. `detail.value` is every open row's value.
 * @csspart container - The outer frame (border, radius, stacking).
 *
 * @spec specs/accordion/accordion.spec.json
 */
export declare class ZdsAccordion extends LitElement {
    static styles: import("lit").CSSResult;
    /**
     * Rows carry a selection as well as disclosure: a leading control opens and
     * closes the row and the rest of the row toggles its selection. Off, the
     * whole row is one target that opens and closes it. `selectable="false"`
     * turns it off.
     */
    selectable: boolean;
    /** radius/lg on the container's four corners, and rounded leading controls. */
    rounded: boolean;
    /**
     * Treat the list as one bounded object: an outline, and a divider under
     * every row but the last. `in-card="false"` turns it off.
     */
    inCard: boolean;
    /** Allow more than one row open at a time. Off by default: "only one item can have the open state at a time" (spec metadata). */
    multiple: boolean;
    /** Disables every row. */
    disabled: boolean;
    /** The values of the open rows. Set as a property, or as a JSON array in the attribute. */
    value: string[];
    constructor();
    private get items();
    /** Push the accordion's state down to its rows. */
    private sync;
    protected updated(): void;
    private onToggle;
    private onKeyDown;
    protected render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "zds-accordion": ZdsAccordion;
    }
}
//# sourceMappingURL=accordion.d.ts.map