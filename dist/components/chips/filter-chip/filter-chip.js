var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./filter-chip.styles.js";
import chipStyles from "../base-chips/chip.styles.js";
import "../../icon/icon.js";
import { BaseChip } from "../base-chips/base-chip.js";
/** A switch for one filter criterion. `active` is the real switch: it adds a check mark and flips the chip to the
 * inverse palette, so the on state reads without colour. Name the criterion, not the result.
 *
 * @event {Event} change - Fired when the filter chip is selected/deselected
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5126-3677
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-chips--docs
 */
let ZetaFilterChip = class ZetaFilterChip extends BaseChip {
    static { this.styles = [super.styles ?? [], chipStyles, styles]; }
    getIcon() {
        return this.active ? html `<zeta-icon class="icon" .rounded=${this.rounded}>check_mark</zeta-icon>` : nothing;
    }
    clickHandler() {
        this.active = !this.active;
        this.dispatchEvent(new Event("change"));
    }
    render() {
        return html `<button
      class="chip interactive-target"
      aria-pressed=${this.active ? "true" : "false"}
      @click=${() => this.clickHandler()}
      ?disabled=${this.disabled}
    >
      ${this.getIcon()}<slot></slot>
    </button>`;
    }
};
__decorate([
    property({ type: Boolean, reflect: true })
], ZetaFilterChip.prototype, "active", void 0);
ZetaFilterChip = __decorate([
    customElement("zeta-filter-chip")
], ZetaFilterChip);
export { ZetaFilterChip };
//# sourceMappingURL=filter-chip.js.map