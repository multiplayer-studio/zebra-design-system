var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, LitElement } from "lit";
import { Contourable } from "../../mixins/contour.js";
import { customElement, property } from "lit/decorators.js";
import styles from "./segmented.item.styles.js";
/** A segmented control is a linear set of two or more segments, each of which functions as a mutually exclusive button. Like buttons, segments can contain text or images. Segmented controls are often used to display different views.
 *
 * A segment is a radio in its control's group. Give an icon-only segment an `aria-label`.
 *
 * @slot - The content of the item: a `zeta-icon`, a label, or both.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5757-774
 * @storybook ?path=/docs/components-segmented-control--docs
 */
let ZetaSegmentedItem = class ZetaSegmentedItem extends Contourable(LitElement) {
    constructor() {
        super(...arguments);
        /**
         * Whether the item is active.
         */
        this.active = false;
        /** Set by the control: icon and label, the label alone, or the icon alone. */
        this.flavor = "default";
    }
    connectedCallback() {
        super.connectedCallback?.();
        this.setAttribute("role", "radio");
    }
    updated(changed) {
        if (changed.has("active")) {
            this.setAttribute("aria-checked", String(this.active));
            this.tabIndex = this.active ? 0 : -1;
        }
    }
    render() {
        return html `<div class="segment"><slot></slot></div>`;
    }
    static { this.styles = [super.styles ?? [], styles]; }
};
__decorate([
    property({ type: Boolean, reflect: true })
], ZetaSegmentedItem.prototype, "active", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZetaSegmentedItem.prototype, "flavor", void 0);
ZetaSegmentedItem = __decorate([
    customElement("zeta-segmented-item")
], ZetaSegmentedItem);
export { ZetaSegmentedItem };
//# sourceMappingURL=segmented-item.js.map