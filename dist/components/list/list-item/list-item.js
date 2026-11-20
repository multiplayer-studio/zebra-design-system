var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement, property } from "lit/decorators.js";
import { LitElement, html } from "lit";
import styles from "./list-item.styles.js";
/** An item in a list comprised of a single row, typically containing some text as well as leading or trailing widgets.
 *
 * @slot leading - Content placed before the headline
 * @slot trailing - Content placed after the headline
 *
 * @figma https://www.figma.com/design/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=229-17&node-type=canvas&m=dev
 * @storybook ?path=/docs/components-list--docs
 */
let ZetaListItem = class ZetaListItem extends LitElement {
    render() {
        return html `
      <div class="list-item">
        <div class="leading">
          <slot name="leading"></slot>
          <h1>${this.headline}</h1>
        </div>
        <div class="trailing">
          <slot name="trailing"></slot>
        </div>
      </div>
    `;
    }
    static { this.styles = [styles]; }
};
__decorate([
    property({ type: String })
], ZetaListItem.prototype, "headline", void 0);
ZetaListItem = __decorate([
    customElement("zeta-list-item")
], ZetaListItem);
export { ZetaListItem };
//# sourceMappingURL=list-item.js.map