import { customElement, property, state } from "lit/decorators.js";
import { LitElement, html, nothing } from "lit";
import styles from "./navigation-bar.styles.js";

export * from "../grid-menu-item/grid-menu-item.js";

/**
 * A bottom bar of an app's primary destinations, built from `zeta-grid-menu-item`s. A second group in the `right`
 * slot sits at the far end, for account or utility entries, with an optional rule between the two (`showDivider`).
 * The `action` slot holds a single button for a call to action that is not a destination.
 *
 * @slot - The main group of destinations: `zeta-grid-menu-item`s.
 * @slot right - A second group at the far end (spec: spacer).
 * @slot action - A single action at the end of the bar, such as a zeta-button.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=2835-796
 * @storybook ?path=/docs/components-navigation-bar--docs
 */
@customElement("zeta-navigation-bar")
export class ZetaNavigationBar extends LitElement {
  /** Items keep their natural width and the groups sit against the ends. Off, the items share the width evenly. */
  @property({ type: Boolean, reflect: true }) shrinkItems: boolean = false;

  /** Draws a vertical rule between the main and the `right` group. */
  @property({ type: Boolean, reflect: true }) showDivider: boolean = false;

  @state() private hasRight = false;
  @state() private hasAction = false;

  connectedCallback() {
    super.connectedCallback?.();
    if (!this.hasAttribute("role")) this.setAttribute("role", "navigation");
  }

  private filled(e: Event) {
    return (e.target as HTMLSlotElement).assignedElements({ flatten: true }).length > 0;
  }

  protected render() {
    return html`<div class="group main"><slot></slot></div>
      ${this.showDivider && this.hasRight ? html`<span class="divider" aria-hidden="true"></span>` : nothing}
      <div class="group right" ?hidden=${!this.hasRight}><slot name="right" @slotchange=${(e: Event) => (this.hasRight = this.filled(e))}></slot></div>
      <div class="action" ?hidden=${!this.hasAction}><slot name="action" @slotchange=${(e: Event) => (this.hasAction = this.filled(e))}></slot></div>`;
  }

  static styles = [styles, super.styles || []];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-navigation-bar": ZetaNavigationBar;
  }
}
