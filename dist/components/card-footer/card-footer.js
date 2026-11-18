var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import styles from "./card-footer.styles.js";
/**
 * A row of closing actions for `zds-card`'s footer slot — one button fills
 * the width, two sit side by side with a gap, or pass anything else entirely
 * (the spec's "custom" option). The count and arrangement are left to
 * whatever is slotted rather than a separate `actions` property.
 *
 * @slot - The footer actions.
 * @spec specs/card/card.spec.json
 */
let ZdsCardFooter = class ZdsCardFooter extends LitElement {
    render() {
        return html `<slot></slot>`;
    }
};
ZdsCardFooter.styles = styles;
ZdsCardFooter = __decorate([
    customElement("zds-card-footer")
], ZdsCardFooter);
export { ZdsCardFooter };
