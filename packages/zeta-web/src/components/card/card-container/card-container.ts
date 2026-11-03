import { html, LitElement, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import styles from "./card-container.styles.js";
import { Contourable } from "../../../mixins/contour.js";
import "../../icon/icon.js";

/** A card whose body opens and closes behind a header that is always visible (spec: Collapsible Card). The header
 * carries a title, an optional required mark and a description; when `collapsible`, it is a button that opens and
 * closes the body, led by a chevron that turns as it opens. `ai` outlines the card with the brand gradient (spec:
 * flavor=gradient), for the one card in a group that should draw the eye.
 *
 * Without `collapsible` it is a plain titled card whose content is always shown.
 *
 * @slot - The main content of the card. If `collapsible` is true, this content will be hidden when the card is collapsed.
 * @part content - The content area of the card where slotted content is rendered.
 * @part header - The header area of the card.
 *
 * @figma - https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=3007-796
 * @storybook - https://design.zebra.com/web/storybook/index.html/?path=/story/components-cards--container
 */
@customElement("zeta-card-container")
export class ZetaCardContainer extends Contourable(LitElement) {
  /** The title of the card, displayed in the header. */
  @property({ type: String }) title: string;

  /** Description of the card, displayed in the header. */
  @property({ type: String }) description: string;

  /** Whether the card is collapsible.
   *
   * Slotted content *must* be provided for the collapsible functionality to work. */
  @property({ type: Boolean, reflect: true }) collapsible = false;

  /** Whether the card is expanded or collapsed.
   *
   * If `collapsible` is true, this property controls the initial state of the card. */
  @property({ type: Boolean, reflect: true }) expanded = false;

  /** Whether the card is required, indicated by a red asterisk (*) in the header.*/
  @property({ type: Boolean }) required = false;

  /** Outlines the card with the brand gradient (spec: flavor=gradient). Use it on one card in a group at most. */
  @property({ type: Boolean, reflect: true }) ai = false;

  /** Internal state to track if slot has content */
  @state() private hasSlotContent = false;

  protected override render() {
    return html`
      <div class="border">
        <div class="card ${this.hasSlotContent ? "slot-populated" : ""}">
          ${
            this.collapsible
              ? html`<button
                  part="header"
                  class="card-header"
                  type="button"
                  aria-expanded=${this.expanded ? "true" : "false"}
                  @click=${() => (this.expanded = !this.expanded)}
                >
                  <zeta-icon class="chevron" .rounded=${false}>chevron_right</zeta-icon>
                  ${this.renderHeading()}
                </button>`
              : html`<div part="header" class="card-header">${this.renderHeading()}</div>`
          }
          <div class="card-content-wrapper">
            <div part="content" class="card-content" ?inert=${this.collapsible && !this.expanded}>
              <slot
                @slotchange=${(e: Event) => {
                  const slot = e.target as HTMLSlotElement;
                  const assignedNodes = slot.assignedNodes({ flatten: true });
                  this.hasSlotContent = assignedNodes.some(
                    node => node.nodeType === Node.ELEMENT_NODE || (node.nodeType === Node.TEXT_NODE && node.textContent?.trim())
                  );
                }}
              ></slot>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  private renderHeading() {
    return html`<div class="header-content">
      <div class="title-container">
        <h4 class="card-title">${this.title}</h4>
        ${this.required ? html`<span class="required" aria-hidden="true">&nbsp;*</span>` : nothing}
      </div>
      <h5 class="card-description">${this.description}</h5>
    </div>`;
  }

  static styles = [super.styles ?? [], styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-card-container": ZetaCardContainer;
  }
}
