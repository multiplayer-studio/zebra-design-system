var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./list.styles.js";
export * from "./list-item/list-item.js";
/**
 * Lists display lists of list items.
 *
 * @slot - The list items. Should be a collection of `zeta-list-item`s.
 *
 * @figma https://www.figma.com/design/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=229-17&node-type=canvas&m=dev
 * @storybook ?path=/docs/components-list--docs
 */
let ZetaList = class ZetaList extends LitElement {
    constructor() {
        super(...arguments);
        /** Adds dividers in between the list items.*/
        this.divide = false;
    }
    render() {
        return html ` <div class="list"><slot></slot></div> `;
    }
    static { this.styles = [styles]; }
};
__decorate([
    property({ type: Boolean, reflect: true })
], ZetaList.prototype, "divide", void 0);
ZetaList = __decorate([
    customElement("zeta-list")
], ZetaList);
export { ZetaList };
//# sourceMappingURL=list.js.map