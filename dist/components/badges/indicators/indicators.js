var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./indicators.styles.js";
import {} from "@zebra-fed/zeta-icons";
import { Contourable, Size } from "../../../mixins/mixins.js";
import "../../icon/icon.js";
/** Indicators are used to show the status of a user or any messages/notifications they might have.
 *
 * @slot - Value to be displayed inside the indicator.
 *         If the `type` is set to `notification`, this should be the number or text shown inside the indicator.
 *         If the `type` is set to `icon`, this should be an icon or any other content you want to display.
 *         There is first class support for the `zeta-icon` component, which can be used to display icons inside the indicator.
 *
 * @figma https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=22000-10045&mode=design&t=6mhOcUUr3tgxxFdd-0
 * @figma https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=22000-10072&mode=design&t=6mhOcUUr3tgxxFdd-0
 *
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-badges--docs
 */
let ZetaIndicator = class ZetaIndicator extends Size(Contourable(LitElement)) {
    constructor() {
        super(...arguments);
        /** Whether to render as a notification or icon indicator. */
        this.type = "notification";
    }
    static { this.styles = [super.styles ?? [], styles]; }
    getBody(value) {
        if (this.type == "icon") {
            // Spec: specs/badges/icon-indicator fixes the glyph to clock; `icon` stays as a Zeta override.
            return html `<zeta-icon .rounded=${this.rounded}>${this.icon ?? "clock"}</zeta-icon> `;
        }
        else if (this.type === "notification" && value) {
            return html `<span>${String(value).slice(0, 3)}</span>`;
        }
        return html `<slot></slot>`;
    }
    render() {
        let enforcedSize = this.size;
        let value = this.value;
        if (this.type === "notification" && this.value && !isNaN(Number(this.value))) {
            const num = Math.abs(this.value);
            if (num > 99) {
                value = "99+";
            }
            if (num > 9) {
                enforcedSize = "large";
            }
        }
        // The icon type carries its glyph at every size, small included (spec: icon-indicator).
        const showBody = this.size !== "small" || this.type === "icon";
        return html `<div class="container ${enforcedSize}">${showBody ? this.getBody(value) : ""}</div> `;
    }
};
__decorate([
    property({ type: String })
], ZetaIndicator.prototype, "icon", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZetaIndicator.prototype, "type", void 0);
__decorate([
    property({ type: Number, reflect: true })
], ZetaIndicator.prototype, "value", void 0);
ZetaIndicator = __decorate([
    customElement("zeta-indicator")
], ZetaIndicator);
export { ZetaIndicator };
/** A small circular marker carrying a fixed clock glyph, sized to sit beside text or on its own. Size moves the circle
 * and the glyph together. It names nothing, so whatever it refers to has to be named beside it.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6407-416
 */
let ZetaIconIndicator = class ZetaIconIndicator extends ZetaIndicator {
    constructor() {
        super();
        this.type = "icon";
    }
};
ZetaIconIndicator = __decorate([
    customElement("zeta-icon-indicator")
], ZetaIconIndicator);
export { ZetaIconIndicator };
/** Marks that something is waiting on whatever it is pinned to, optionally with a count. Size decides whether the
 * count shows: large hugs a count of any length, medium is a 16 square for one digit, and small is a plain dot that
 * says only that something is new. A count above 9 moves to large, above 99 reads 99+, and nothing runs past 3 characters. Remove the indicator for
 * a count of zero rather than showing 0.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=3719-6256
 */
let ZetaNotificationIndicator = class ZetaNotificationIndicator extends ZetaIndicator {
    constructor() {
        super();
        this.type = "notification";
    }
};
ZetaNotificationIndicator = __decorate([
    customElement("zeta-notification-indicator")
], ZetaNotificationIndicator);
export { ZetaNotificationIndicator };
//# sourceMappingURL=indicators.js.map