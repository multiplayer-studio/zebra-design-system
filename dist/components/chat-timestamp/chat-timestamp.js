var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import styles from "./chat-timestamp.styles.js";
/**
 * The send time, formatted by the product.
 *
 * @slot - The time.
 * @spec specs/chat-message/chat-message.spec.json
 */
let ZdsChatTimestamp = class ZdsChatTimestamp extends LitElement {
    render() { return html `<slot></slot>`; }
};
ZdsChatTimestamp.styles = styles;
ZdsChatTimestamp = __decorate([
    customElement("zds-chat-timestamp")
], ZdsChatTimestamp);
export { ZdsChatTimestamp };
