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
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-accordion--docs
 */
@customElement("zeta-accordion-item")
export class ZetaAccordionItem extends Contourable(LitElement) {
  /**  Title of the accordion item. */
  @property({ type: String }) title: string;

  /** Whether the accordion item is initially open. */
  @property({ type: Boolean, reflect: true }) expanded = false;

  /** Whether the accordion item is initially selected. */
  @property({ type: Boolean }) selected = false;

  /** Whether the item is selectable */
  @property({ type: Boolean, reflect: true }) selectable = false;

  /** Whether the accordion item is a navigation item. */
  @property({ type: Boolean, reflect: true }) navigation = false;

  protected hasDefaultSlot = false;

  protected firstUpdated() {
    const slot = this.shadowRoot?.querySelector("slot:not([name])") as HTMLSlotElement | null;

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

  private toggleSelection() {
    this.selected = !this.selected;
    this.requestUpdate();

    // Dispatch event to parent accordion
    if (this.selected) {
      this.dispatchEvent(new CustomEvent("item-selected", { bubbles: true, detail: { item: this } }));
    }
  }

  protected render() {
    const hasContent = this.hasDefaultSlot && !this.navigation;
    // The family follows the row's contour, as on Icon Button.
    const rounded = this.rounded !== false;
    const title = html`<span class="title">${this.title}</span>`;

    let row;
    if (this.selectable && hasContent) {
      // Split targets (spec: Accordion Header, selectable). The leading control is a real Icon Button (subtle, medium)
      // with its own states; the rest of the row selects.
      row = html`<zeta-icon-button
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
          ${title} ${this.selected ? html`<zeta-icon class="check trailing" size="medium" framed>check_mark</zeta-icon>` : nothing}
        </button>`;
    } else if (this.selectable) {
      // Selectable without content: the whole row selects.
      row = html`<button class="title-wrapper" type="button" aria-pressed=${this.selected ? "true" : "false"} @click=${() => this.toggleSelection()}>
        ${title} ${this.selected ? html`<zeta-icon class="check trailing" size="medium" framed>check_mark</zeta-icon>` : nothing}
      </button>`;
    } else if (this.navigation) {
      row = html`<button class="title-wrapper" type="button">${title}<zeta-icon class="navigation trailing" size="medium">chevron_right</zeta-icon></button>`;
    } else {
      // Plain row: the whole row is one target that opens and closes it.
      row = html`<button
        class="title-wrapper"
        type="button"
        aria-expanded=${hasContent ? (this.expanded ? "true" : "false") : nothing}
        @click=${() => this.toggle()}
      >
        ${title} ${hasContent ? html`<zeta-icon class="expand trailing" size="medium">expand_more</zeta-icon>` : nothing}
      </button>`;
    }

    return html`<div>
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

  static styles = [styles, super.styles || []];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-accordion-item": ZetaAccordionItem;
  }
}
