var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./input-chip.styles.js";
import chipStyles from "../base-chips/chip.styles.js";
import "../../icon/icon.js";
import { BaseChip } from "../base-chips/base-chip.js";
import { ZetaCloseEvent } from "../../../events.js";
/** A value someone entered into a field, usually a name or a term, with a remove control that is always present. Put
 * a `zeta-avatar` at size xxxs in the `leading` slot when the value is a person, and leave it out for a tag or term.
 *
 * @slot - The value, as text.
 * @slot leading - An optional avatar for a person.
 * @event {CustomEvent<ZetaCloseEventDetail>} close - Fired when the remove control is clicked.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5125-3467
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-chips--docs
 */
let ZetaInputChip = class ZetaInputChip extends BaseChip {
    constructor() {
        super(...arguments);
        /** Accessible name for the remove control, saying what it removes. */
        this.removeLabel = "Remove";
    }
    static { this.styles = [super.styles ?? [], chipStyles, styles]; }
    render() {
        return html `<div class="chip">
      <slot name="leading"></slot>
      <span class="label"><slot></slot></span>
      <button
        class="remove"
        type="button"
        aria-label=${this.removeLabel}
        ?disabled=${this.disabled}
        @click=${() => this.dispatchEvent(new ZetaCloseEvent().toEvent())}
      >
        <zeta-icon .rounded=${this.rounded}>close</zeta-icon>
      </button>
    </div>`;
    }
};
__decorate([
    property({ type: String, attribute: "remove-label" })
], ZetaInputChip.prototype, "removeLabel", void 0);
ZetaInputChip = __decorate([
    customElement("zeta-input-chip")
], ZetaInputChip);
export { ZetaInputChip };
//# sourceMappingURL=input-chip.js.map