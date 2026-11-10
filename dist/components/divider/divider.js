var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./divider.styles.js";
/**
 * A thin line that separates content into sections or groups, such as list rows, cards or menu items. Orientation
 * matches the direction it divides: horizontal between stacked content, vertical between side-by-side content.
 *
 * It fills its container along its length and has no padding of its own, so space it with the layout's gap rather than
 * margins. Assistive technology hears it as a separator.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=2152-8795
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-divider--docs
 */
let ZetaDivider = class ZetaDivider extends LitElement {
    constructor() {
        super();
        /** The direction the line runs. Vertical fills the height of its container, so give that container a height. */
        this.orientation = "horizontal";
        this.internals = this.attachInternals();
        this.internals.role = "separator";
    }
    updated(changed) {
        if (changed.has("orientation"))
            this.internals.ariaOrientation = this.orientation === "vertical" ? "vertical" : null;
    }
    static { this.styles = styles; }
};
__decorate([
    property({ type: String, reflect: true })
], ZetaDivider.prototype, "orientation", void 0);
ZetaDivider = __decorate([
    customElement("zeta-divider")
], ZetaDivider);
export { ZetaDivider };
//# sourceMappingURL=divider.js.map