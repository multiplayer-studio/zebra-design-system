var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement, property } from "lit/decorators.js";
import "../../icon/icon.js";
import { html, nothing } from "lit";
import { BaseChip } from "../base-chips/base-chip.js";
import { ZetaCloseEvent } from "../../../events.js";
import chipStyles from "../base-chips/chip.styles.js";
import styles from "./assist-chip.styles.js";
/** A compact action, phrased as a verb, with an optional leading glyph naming its domain. `color` marks a state or a
 * kind of item through the border and text; `discardable` adds a remove control for an item someone can discard,
 * such as an attached file.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5161-4423
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-chips--docs
 *
 * @slot - The content of the chip.
 * @cssproperty --assist-chip-foreground - Overrides the label, icon and remove colour.
 * @cssproperty --assist-chip-background - Overrides the fill.
 * @cssproperty --assist-chip-border - Overrides the border colour.
 * @event {CustomEvent<ZetaCloseEventDetail>} close - Fired when the remove control is clicked.
 */
let ZetaAssistChip = class ZetaAssistChip extends BaseChip {
    constructor() {
        super(...arguments);
        /** Marks a state or a kind of item through the border and the text. The fill stays neutral. */
        this.color = "neutral";
        /** Adds a remove control after the label. */
        this.discardable = false;
        /** Accessible name for the remove control, saying what it removes. */
        this.discardLabel = "Remove";
    }
    static { this.styles = [super.styles || [], chipStyles, styles]; }
    getIcon() {
        return this.icon ? html `<zeta-icon class="icon" .rounded=${this.rounded}>${this.icon}</zeta-icon>` : nothing;
    }
    render() {
        return html `<span class="chip">
      <button class="action interactive-target" ?disabled=${this.disabled}>
        ${this.getIcon()}<span class="label"><slot></slot></span>
      </button>
      ${this.discardable
            ? html `<button
              class="remove"
              type="button"
              aria-label=${this.discardLabel}
              ?disabled=${this.disabled}
              @click=${() => this.dispatchEvent(new ZetaCloseEvent().toEvent())}
            >
              <zeta-icon .rounded=${this.rounded}>close</zeta-icon>
            </button>`
            : nothing}
    </span>`;
    }
};
__decorate([
    property({ type: String })
], ZetaAssistChip.prototype, "icon", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZetaAssistChip.prototype, "color", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZetaAssistChip.prototype, "discardable", void 0);
__decorate([
    property({ type: String, attribute: "discard-label" })
], ZetaAssistChip.prototype, "discardLabel", void 0);
ZetaAssistChip = __decorate([
    customElement("zeta-assist-chip")
], ZetaAssistChip);
export { ZetaAssistChip };
//# sourceMappingURL=assist-chip.js.map