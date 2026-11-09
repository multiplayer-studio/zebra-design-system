var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Contourable } from "../../mixins/mixins.js";
import styles from "./accordion.styles.js";
/**
 * A vertical stack of Accordion Items, each a header that opens and closes its own content. By default one item is
 * open at a time; `expandMultiple` lets several stay open. The container has no fill of its own. In a card (`inCard`)
 * it takes a thin border and divides its items; `rounded` curves the card's corners.
 *
 * @slot - children should be `zeta-accordion-item` elements.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5529-33
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-accordion--docs
 */
let ZetaAccordion = class ZetaAccordion extends Contourable(LitElement) {
    constructor() {
        super(...arguments);
        /** Determines if the ZetaAccordion should be in a card container. */
        this.inCard = false;
        /** Determines if multiple items can be open at the same time.
        When `false`, only one accordion item can be open at a time. */
        this.expandMultiple = false;
        /** Determines if multiple accordion items can be selected. */
        this.selectMultiple = false;
        this.handleItemExpanded = (event) => {
            const customEvent = event;
            if (!this.expandMultiple) {
                const expandedItem = customEvent.target;
                const items = this.getAccordionItems();
                items.forEach(item => {
                    if (item !== expandedItem && item.expanded) {
                        item.expanded = false;
                    }
                });
            }
        };
        this.handleItemSelected = (event) => {
            const customEvent = event;
            if (!this.selectMultiple) {
                const selectedItem = customEvent.target;
                const items = this.getAccordionItems();
                items.forEach(item => {
                    if (item !== selectedItem && item.selected) {
                        item.selected = false;
                    }
                });
            }
        };
    }
    firstUpdated(_changedProperties) {
        super.firstUpdated(_changedProperties);
        this.addEventListener("item-expanded", this.handleItemExpanded);
        this.addEventListener("item-selected", this.handleItemSelected);
    }
    disconnectedCallback() {
        this.removeEventListener("item-expanded", this.handleItemExpanded);
        this.removeEventListener("item-selected", this.handleItemSelected);
        // @ts-expect-error-next-line
        if (super.disconnectedCallback)
            super.disconnectedCallback();
    }
    getAccordionItems() {
        const slot = this.shadowRoot?.querySelector("slot");
        if (!slot)
            return [];
        return slot.assignedElements({ flatten: true }).filter(element => element.tagName.toLowerCase() === "zeta-accordion-item");
    }
    render() {
        return html `<div class="accordion contourable-target">
      <slot> </slot>
    </div>`;
    }
    static { this.styles = [styles, super.styles || []]; }
};
__decorate([
    property({ type: Boolean, reflect: true })
], ZetaAccordion.prototype, "inCard", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZetaAccordion.prototype, "expandMultiple", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZetaAccordion.prototype, "selectMultiple", void 0);
ZetaAccordion = __decorate([
    customElement("zeta-accordion")
], ZetaAccordion);
export { ZetaAccordion };
//# sourceMappingURL=accordion.js.map