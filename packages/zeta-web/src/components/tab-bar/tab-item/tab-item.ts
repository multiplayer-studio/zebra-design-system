import { html, LitElement, nothing, type PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import styles from "./tab-item.styles.js";
import { Contourable, Interactive } from "../../../mixins/mixins.js";
import "../../badges/indicators/indicators.js";

/** One tab in a zeta-tab-bar: an optional icon, a label and an optional badge. The tab bar sets which tab is selected
 * and moves keyboard focus between them; set `selected` on the tab that shows the current view.
 *
 * @slot - The label. Use real words: it is the tab's name.
 * @slot icon - A leading zeta-icon.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=3607-237
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-tab-bar--docs
 */
@customElement("zeta-tab-item")
export class ZetaTabItem extends Contourable(Interactive(LitElement)) {
  /** The tab shows the current view. */
  @property({ type: Boolean, reflect: true }) selected: boolean = false;

  /** The legacy name for `selected`. */
  @property({ type: Boolean, reflect: true }) active: boolean = false;

  /** Shows the slotted icon. */
  @property({ type: Boolean, reflect: true, attribute: "show-leading-icon" }) showLeadingIcon = true;

  /** Shows a Notification Indicator after the label. */
  @property({ type: Boolean, reflect: true, attribute: "show-badge" }) showBadge = false;

  /** The badge's count. */
  @property({ type: Number, attribute: "badge-value" }) badgeValue?: number;

  /** What the badge stands for, read after the label. */
  @property({ type: String, attribute: "badge-label" }) badgeLabel?: string;

  @state() private hasIcon = false;

  private internals = this.attachInternals();

  constructor() {
    super();
    this.internals.role = "tab";
  }

  /** Selected, by either name. */
  get isSelected() {
    return this.selected || this.active;
  }

  protected updated(changed: PropertyValues<this>) {
    if (changed.has("selected") || changed.has("active")) this.internals.ariaSelected = String(this.isSelected);
    // On the element itself, where checkers read it (disabled text is exempt from contrast).
    if (changed.has("disabled")) {
      if (this.disabled) this.setAttribute("aria-disabled", "true");
      else this.removeAttribute("aria-disabled");
    }
    // Interactive keeps tabIndex as a property; the tab bar's roving tab stop needs the attribute.
    if (changed.has("tabIndex")) this.setAttribute("tabindex", String(this.tabIndex));
  }

  protected override render() {
    return html`<span class="icon" ?hidden=${!this.showLeadingIcon || !this.hasIcon}
        ><slot name="icon" @slotchange=${(e: Event) => (this.hasIcon = (e.target as HTMLSlotElement).assignedElements().length > 0)}></slot></span
      ><slot></slot>${
        this.showBadge
          ? html`<zeta-notification-indicator size="large" .value=${this.badgeValue} aria-hidden="true"></zeta-notification-indicator>${
                this.badgeLabel ? html`<span class="sr">, ${this.badgeLabel}</span>` : nothing
              }`
          : nothing
      }`;
  }

  static styles = [super.styles ?? [], styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-tab-item": ZetaTabItem;
  }
}
