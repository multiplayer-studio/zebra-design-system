import { LitElement, type PropertyValues } from "lit";
import "../icon/icon.js";
import "../divider/divider.js";
/**
 * One row of an Accordion: a header holding the title and its disclosure
 * control, and the content it reveals. Use inside `<zds-accordion>`, which
 * opens and closes it and decides whether it is selectable, its divider and
 * its control's shape.
 *
 * The disclosure control is a native `button` with `aria-expanded` /
 * `aria-controls` in this row's shadow root, next to the `region` panel it
 * controls. On a selectable row it is drawn with Icon Button's subtle /
 * medium tokens rather than nesting `<zds-icon-button>`: that element's
 * button sits in its own shadow root, where `aria-expanded` and
 * `aria-controls` can't reach it or the panel. The rest of a selectable row
 * is a toggle button with `aria-pressed`. A disabled row's disclosure button
 * stays focusable with `aria-disabled` (as Base UI's trigger does in React);
 * its selection button is natively disabled (as Base UI's Toggle is).
 *
 * @slot - What the row reveals when open. Any content; it fills the row's width.
 * @fires zds-selected-change - The row body was pressed on a selectable accordion. `detail` is `{ value, selected }`.
 * @csspart header - The header row (a heading element).
 * @csspart panel - The content region.
 *
 * @spec specs/accordion/accordion.spec.json (subcomponents › Accordion Item, Accordion Header)
 */
export declare class ZdsAccordionItem extends LitElement {
    static styles: import("lit").CSSResult;
    /** Identifies the row in the accordion's `value`. Unique within the accordion; generated when left empty. */
    value: string;
    /**
     * The row's label (the spec's Title). Name the section it opens — the caret
     * says a row opens, never what is inside. Called `heading`, not `title`, so
     * it can't turn into the native tooltip over the whole row.
     */
    heading: string;
    /** Whether the row is chosen. Only meaningful on a selectable accordion. */
    selected: boolean;
    /** This one row cannot be opened, closed or selected. */
    disabled: boolean;
    /** Open state. Set by `<zds-accordion>` from its `value`; change that instead. */
    open: boolean;
    /** Set by `<zds-accordion>`. */
    selectable: boolean;
    /** Set by `<zds-accordion>`. */
    rounded: boolean;
    /** Set by `<zds-accordion>`. */
    inCard: boolean;
    /** Set by `<zds-accordion>` from its own `disabled`. */
    groupDisabled: boolean;
    private panel;
    private readonly ids;
    private animation;
    /** Open changes in the first frame (the accordion's initial sync) jump rather than animate, as in Base UI. */
    private settled;
    get isDisabled(): boolean;
    connectedCallback(): void;
    /** Move focus to this row's disclosure button. */
    focusTrigger(): void;
    private toggle;
    private toggleSelected;
    protected firstUpdated(): void;
    protected updated(changed: PropertyValues<this>): void;
    private animatePanel;
    protected render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "zds-accordion-item": ZdsAccordionItem;
    }
}
//# sourceMappingURL=accordion-item.d.ts.map