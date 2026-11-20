var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { defaultTrue } from "../chip/chip.js";
import styles from "./accordion.styles.js";
import { ZdsAccordionItem } from "./accordion-item.js";
const NAV_KEYS = new Set(["ArrowDown", "ArrowUp", "Home", "End"]);
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
let ZdsAccordion = class ZdsAccordion extends LitElement {
    constructor() {
        super();
        /**
         * Rows carry a selection as well as disclosure: a leading control opens and
         * closes the row and the rest of the row toggles its selection. Off, the
         * whole row is one target that opens and closes it. `selectable="false"`
         * turns it off.
         */
        this.selectable = true;
        /** radius/lg on the container's four corners, and rounded leading controls. */
        this.rounded = false;
        /**
         * Treat the list as one bounded object: an outline, and a divider under
         * every row but the last. `in-card="false"` turns it off.
         */
        this.inCard = true;
        /** Allow more than one row open at a time. Off by default: "only one item can have the open state at a time" (spec metadata). */
        this.multiple = false;
        /** Disables every row. */
        this.disabled = false;
        /** The values of the open rows. Set as a property, or as a JSON array in the attribute. */
        this.value = [];
        this.onToggle = (e) => {
            const item = e.target;
            if (item.parentElement !== this)
                return;
            e.stopPropagation();
            const v = e.detail.value;
            const isOpen = this.value.includes(v);
            const next = isOpen
                ? this.value.filter((x) => x !== v)
                : this.multiple
                    ? [...this.value, v]
                    : [v];
            this.value = next;
            this.dispatchEvent(new CustomEvent("zds-value-change", { detail: { value: next }, bubbles: true, composed: true }));
        };
        this.onKeyDown = (e) => {
            if (!NAV_KEYS.has(e.key))
                return;
            const item = e.target;
            if (!(item instanceof ZdsAccordionItem) || item.parentElement !== this)
                return;
            // Only from the row's own disclosure button, never from its content.
            const origin = e.composedPath()[0];
            if (!(origin instanceof HTMLElement) || !origin.matches(".zds-accordion__trigger, .zds-accordion__control"))
                return;
            const enabled = this.items.filter((i) => !i.isDisabled);
            const idx = enabled.indexOf(item);
            const last = enabled.length - 1;
            const next = e.key === "Home" ? 0 : e.key === "End" ? last : e.key === "ArrowDown" ? (idx + 1 > last ? 0 : idx + 1) : idx - 1 < 0 ? last : idx - 1;
            e.preventDefault();
            enabled[next]?.focusTrigger();
        };
        this.addEventListener("zds-accordion-toggle", this.onToggle);
        this.addEventListener("keydown", this.onKeyDown);
    }
    get items() {
        return [...this.children].filter((c) => c instanceof ZdsAccordionItem);
    }
    /** Push the accordion's state down to its rows. */
    sync() {
        const open = new Set(this.value);
        for (const item of this.items) {
            item.selectable = this.selectable;
            item.rounded = this.rounded;
            item.inCard = this.inCard;
            item.groupDisabled = this.disabled;
            item.open = open.has(item.value);
        }
    }
    updated() {
        this.sync();
    }
    render() {
        return html `<div
      part="container"
      class="zds-accordion"
      ?data-selectable=${this.selectable}
      ?data-rounded=${this.rounded}
      ?data-in-card=${this.inCard}
    >
      <slot @slotchange=${() => this.sync()}></slot>
    </div>`;
    }
};
ZdsAccordion.styles = styles;
__decorate([
    property({ type: Boolean, reflect: true, converter: defaultTrue })
], ZdsAccordion.prototype, "selectable", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZdsAccordion.prototype, "rounded", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: "in-card", converter: defaultTrue })
], ZdsAccordion.prototype, "inCard", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZdsAccordion.prototype, "multiple", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZdsAccordion.prototype, "disabled", void 0);
__decorate([
    property({ type: Array })
], ZdsAccordion.prototype, "value", void 0);
ZdsAccordion = __decorate([
    customElement("zds-accordion")
], ZdsAccordion);
export { ZdsAccordion };
