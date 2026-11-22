var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, LitElement, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import styles from "./chart-card.styles.js";
import { Contourable } from "../../mixins/contour.js";
import "../icon/icon.js";
/** A flexible card component specifically designed for dashboard charts and visualizations.
 *
 * @slot header - The header content of the chart card. If not provided, title and subtitle props will be used.
 * @slot - The main content of the card, typically containing chart visualizations.
 * @slot footer - Footer content, typically containing action buttons or additional information.
 *
 * @cssproperty --chart-card-border-color - The color of the card border
 * @cssproperty --chart-card-border-width - The width of the card border
 * @cssproperty --chart-card-background - The background color of the card
 * @cssproperty --chart-card-min-height - The minimum height of the card content area
 *
 * @figma https://www.figma.com/design/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=229-10&m=dev
 * @storybook ?path=/docs/components-chart-card--docs
 */
let ZetaChartCard = class ZetaChartCard extends Contourable(LitElement) {
    constructor() {
        super(...arguments);
        /** The title of the chart card, displayed in the header when no header slot is provided. */
        this.title = "";
        /** The subtitle of the chart card, displayed below the title in the header when no header slot is provided. */
        this.subtitle = "";
        /** Whether the card is clickable.
         *
         * When true, the card will have hover effects and can be clicked.
         * Use the `click` event to handle clicks.
         */
        this.clickable = false;
        this.hasHeaderSlot = false;
        this.hasFooterSlot = false;
        this.handleClick = (e) => {
            if (!this.clickable)
                return;
            e.stopImmediatePropagation();
            e.preventDefault();
            e.stopPropagation();
            this.dispatchEvent(new CustomEvent("click", {
                bubbles: true,
                composed: true,
                cancelable: true,
                detail: { originalEvent: e }
            }));
        };
        this.handleKeyDown = (e) => {
            if (!this.clickable)
                return;
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                this.handleClick(e);
            }
        };
        this.handleHeaderSlotChange = (e) => {
            const slot = e.target;
            const assignedNodes = slot.assignedNodes({ flatten: true });
            this.hasHeaderSlot = assignedNodes.some(node => node.nodeType === Node.ELEMENT_NODE || (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()));
            this.updateSlotStates();
        };
        this.handleFooterSlotChange = (e) => {
            const slot = e.target;
            const assignedNodes = slot.assignedNodes({ flatten: true });
            this.hasFooterSlot = assignedNodes.some(node => node.nodeType === Node.ELEMENT_NODE || (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()));
            this.updateSlotStates();
        };
        this.updateSlotStates = () => {
            this.hasHeaderSlot = !!this.querySelector('[slot="header"]');
            this.hasFooterSlot = !!this.querySelector('[slot="footer"]');
            this.requestUpdate();
        };
    }
    render() {
        return html `
      <div
        class="card"
        role="${this.clickable ? "button" : "article"}"
        tabindex="${this.clickable ? "0" : nothing}"
        @click=${this.clickable ? this.handleClick : nothing}
        @keydown=${this.clickable ? this.handleKeyDown : nothing}
      >
        ${this.renderHeader()}${this.renderContent()}${this.renderFooter()}
      </div>
    `;
    }
    renderHeader() {
        if (this.hasHeaderSlot) {
            return html `
        <div part="header" class="header">
          <slot name="header" @slotchange=${this.handleHeaderSlotChange}></slot>
        </div>
      `;
        }
        if (!this.title && !this.subtitle) {
            return nothing;
        }
        return html `
      <div part="header" class="header">
        <div class="header-left">
          ${this.title ? html `<div class="title">${this.title}</div>` : nothing} ${this.subtitle ? html `<div class="subtitle">${this.subtitle}</div>` : nothing}
        </div>
      </div>
    `;
    }
    renderContent() {
        return html `
      <div part="content" class="content">
        ${this.error
            ? html `<div class="error">
                <zeta-icon .rounded=${this.rounded}>warning</zeta-icon>
                <span>${this.error}</span>
              </div>`
            : html `<slot></slot>`}
      </div>
    `;
    }
    renderFooter() {
        if (!this.hasFooterSlot) {
            return nothing;
        }
        return html `
      <div part="footer" class="footer">
        <slot name="footer" @slotchange=${this.handleFooterSlotChange}></slot>
      </div>
    `;
    }
    connectedCallback() {
        super.connectedCallback?.();
        this.updateSlotStates();
        const slots = this.shadowRoot?.querySelectorAll("slot");
        slots?.forEach(slot => {
            slot.addEventListener("slotchange", this.updateSlotStates);
        });
    }
    disconnectedCallback() {
        super.disconnectedCallback?.();
        const slots = this.shadowRoot?.querySelectorAll("slot");
        slots?.forEach(slot => {
            slot.removeEventListener("slotchange", this.updateSlotStates);
        });
    }
    static { this.styles = [super.styles ?? [], styles]; }
};
__decorate([
    property({ type: String })
], ZetaChartCard.prototype, "title", void 0);
__decorate([
    property({ type: String })
], ZetaChartCard.prototype, "subtitle", void 0);
__decorate([
    property({ type: String })
], ZetaChartCard.prototype, "error", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZetaChartCard.prototype, "clickable", void 0);
__decorate([
    state()
], ZetaChartCard.prototype, "hasHeaderSlot", void 0);
__decorate([
    state()
], ZetaChartCard.prototype, "hasFooterSlot", void 0);
ZetaChartCard = __decorate([
    customElement("zeta-chart-card")
], ZetaChartCard);
export { ZetaChartCard };
//# sourceMappingURL=chart-card.js.map