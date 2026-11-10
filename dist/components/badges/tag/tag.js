var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, LitElement, svg } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import styles from "./tag.styles.js";
import { Contourable } from "../../../mixins/mixins.js";
import { makeIntegerWidth } from "../../../utils/utils.js";
import { ifDefined } from "lit/directives/if-defined.js";
/** Tags are used to draw attention to a specific area or information. The arrow shape helps direct the users attention to the desired place.
 *
 * @slot - The text to display in the tag.
 *
 * @figma https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=22000-13170
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-badges--docs
 */
let ZetaTag = class ZetaTag extends Contourable(LitElement) {
    constructor() {
        super(...arguments);
        /** Direction of the tag point.  */
        this.direction = "right";
    }
    static { this.styles = [styles, super.styles ?? []]; }
    render() {
        const point = html ` <svg class="point" xmlns="http://www.w3.org/2000/svg" width="12" height="32" viewBox="0 0 12 32" fill="none">
      ${this.rounded ? svg `<path d="M11.1 14.8 0 0v32l11.1-14.8a2 2 0 0 0 0-2.4Z"/>` : svg `<path d="M12 16L0 0V32L12 16Z" />`}
    </svg>`;
        return html `
      <div class="tag" role="note" aria-label=${ifDefined(this.label)}>
        <span class="text">${this.label ?? html `<slot></slot>`}</span>
        ${point}
      </div>
    `;
    }
    updated() {
        if (this.textSpan) {
            makeIntegerWidth(this.textSpan);
        }
    }
};
__decorate([
    property({ type: String })
], ZetaTag.prototype, "label", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZetaTag.prototype, "direction", void 0);
__decorate([
    query(".text")
], ZetaTag.prototype, "textSpan", void 0);
ZetaTag = __decorate([
    customElement("zeta-tag")
], ZetaTag);
export { ZetaTag };
//# sourceMappingURL=tag.js.map