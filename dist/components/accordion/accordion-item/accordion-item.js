var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, LitElement, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Contourable } from "../../../mixins/mixins.js";
import styles from "./accordion-item.styles.js";
import "../../icon/icon.js";
import "../../button/icon-button/icon-button.js";
/**
 * One disclosure row in an Accordion. The header names the section it opens; the content sits below it while
 * expanded. A plain row is one target that opens and closes it, with the caret trailing the title. A selectable row
 * splits its targets: a leading control opens and closes it, and the rest of the row selects it, with a check mark
 * trailing the title while selected. Navigation rows have no content and the whole row is the target.
 *
 * Both targets are real buttons (`aria-expanded`, `aria-pressed`) inside the row's heading, so the row works from the
 * keyboard and announces its state.
 *
 * @slot - content displayed when the accordion item is expanded.
 * @slot header - content displayed in the header of the accordion item.
 *
 * @part item-header - The header of the accordion item.
 * @part item-content - The content area of the accordion item.
 * @part header-content - The content area of the accordion item header.
 *
 * @fires item-expanded - Dispatched when the accordion item is expanded or collapsed.
 * @fires item-selected - Dispatched when the accordion item is selected or deselected.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5529-33
 * @storybook ?path=/docs/components-accordion--docs
 */
let ZetaAccordionItem = class ZetaAccordionItem extends Contourable(LitElement) {
    constructor() {
        super(...arguments);
        /** Whether the accordion item is initially open. */
        this.expanded = false;
        /** Whether the accordion item is initially selected. */
        this.selected = false;
        /** Whether the item is selectable */
        this.selectable = false;
        /** Whether the accordion item is a navigation item. */
        this.navigation = false;
        this.hasDefaultSlot = false;
    }
    firstUpdated() {
        const slot = this.shadowRoot?.querySelector("slot:not([name])");
        if (slot) {
            const updateHasDefaultSlot = () => {
                this.hasDefaultSlot = slot.assignedElements({ flatten: true }).length > 0;
                this.requestUpdate();
            };
            updateHasDefaultSlot();
            slot.addEventListener("slotchange", updateHasDefaultSlot);
        }
    }
    toggle() {
        this.expanded = !this.expanded;
        this.requestUpdate();
        // Dispatch event to parent accordion
        if (this.expanded) {
            this.dispatchEvent(new CustomEvent("item-expanded", { bubbles: true, detail: { item: this } }));
        }
    }
    toggleSelection() {
        this.selected = !this.selected;
        this.requestUpdate();
        // Dispatch event to parent accordion
        if (this.selected) {
            this.dispatchEvent(new CustomEvent("item-selected", { bubbles: true, detail: { item: this } }));
        }
    }
    render() {
        const hasContent = this.hasDefaultSlot && !this.navigation;
        // The family follows the row's contour, as on Icon Button.
        const rounded = this.rounded !== false;
        const title = html `<span class="title">${this.title}</span>`;
        let row;
        if (this.selectable && hasContent) {
            // Split targets (spec: Accordion Header, selectable). The leading control is a real Icon Button (subtle, medium)
            // with its own states; the rest of the row selects.
            row = html `<zeta-icon-button
          class="chevron-wrapper chevron"
          flavor="subtle"
          size="medium"
          shape=${rounded ? "rounded" : "sharp"}
          .ariaExpanded=${this.expanded ? "true" : "false"}
          aria-label=${`${this.title ?? ""} details`}
          @click=${() => this.toggle()}
          >chevron_right</zeta-icon-button
        >
        <button class="title-wrapper" type="button" aria-pressed=${this.selected ? "true" : "false"} @click=${() => this.toggleSelection()}>
          ${title} ${this.selected ? html `<zeta-icon class="check trailing" size="medium" framed>check_mark</zeta-icon>` : nothing}
        </button>`;
        }
        else if (this.selectable) {
            // Selectable without content: the whole row selects.
            row = html `<button class="title-wrapper" type="button" aria-pressed=${this.selected ? "true" : "false"} @click=${() => this.toggleSelection()}>
        ${title} ${this.selected ? html `<zeta-icon class="check trailing" size="medium" framed>check_mark</zeta-icon>` : nothing}
      </button>`;
        }
        else if (this.navigation) {
            row = html `<button class="title-wrapper" type="button">${title}<zeta-icon class="navigation trailing" size="medium">chevron_right</zeta-icon></button>`;
        }
        else {
            // Plain row: the whole row is one target that opens and closes it.
            row = html `<button
        class="title-wrapper"
        type="button"
        aria-expanded=${hasContent ? (this.expanded ? "true" : "false") : nothing}
        @click=${() => this.toggle()}
      >
        ${title} ${hasContent ? html `<zeta-icon class="expand trailing" size="medium">expand_more</zeta-icon>` : nothing}
      </button>`;
        }
        return html `<div>
      <div class="accordion-item-header" part="item-header">
        <h4 class="row">${row}</h4>
        <div class="header-slot" part="header-content">
          <slot name="header"></slot>
        </div>
      </div>
      <div class="body" part="item-content" .hidden=${!this.expanded}>
        <div class="body-content">
          <slot></slot>
        </div>
      </div>
    </div>`;
    }
    static { this.styles = [styles, super.styles || []]; }
};
__decorate([
    property({ type: String })
], ZetaAccordionItem.prototype, "title", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZetaAccordionItem.prototype, "expanded", void 0);
__decorate([
    property({ type: Boolean })
], ZetaAccordionItem.prototype, "selected", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZetaAccordionItem.prototype, "selectable", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZetaAccordionItem.prototype, "navigation", void 0);
ZetaAccordionItem = __decorate([
    customElement("zeta-accordion-item")
], ZetaAccordionItem);
export { ZetaAccordionItem };
//# sourceMappingURL=accordion-item.js.map