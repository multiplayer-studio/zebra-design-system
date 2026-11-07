import { html, LitElement, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Contourable, Interactive } from "../../mixins/mixins.js";
import styles from "./collapsible-menu-item.styles.js";
import type { ZetaSubMenuItem } from "./sub-menu-item.js";
import "./caret-indicator.js";
import "./sub-menu-item.js";

/**
 * A group in the Navigation Rail's sub menu: a header row that opens to show nested Sub Menu Items on surface/subtle.
 * The header carries `aria-expanded`; the rows reveal on animations/smooth, off under reduced motion. Slotted
 * `zeta-sub-menu-item`s are set to `nested` and follow the group's `rounded`.
 *
 * @slot - The nested rows: `zeta-sub-menu-item`s.
 * @slot heading - The group's name.
 * @slot {zeta-icon} icon - The header's leading glyph.
 * @event toggle - Fired when the header opens or closes the group; `detail.open` is the new state.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=3453-54352
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-navigation-rail--docs
 */
@customElement("zeta-collapsible-menu-item")
export class ZetaCollapsibleMenuItem extends Contourable(Interactive(LitElement)) {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: "open",
    delegatesFocus: true
  };

  /** Whether the group's rows show. */
  @property({ type: Boolean, reflect: true }) open = false;

  /** Shows the header's leading glyph. */
  @property({ type: Boolean, attribute: "show-leading-icon" }) showLeadingIcon = true;

  protected updated() {
    this.nestRows();
  }

  private nestRows = () => {
    const slot = this.renderRoot.querySelector<HTMLSlotElement>("slot:not([name])");
    for (const el of slot?.assignedElements() ?? []) {
      if (el.localName !== "zeta-sub-menu-item") continue;
      (el as ZetaSubMenuItem).nested = true;
      (el as ZetaSubMenuItem).rounded = this.rounded;
    }
  };

  private toggle = () => {
    if (this.disabled) return;
    this.open = !this.open;
    this.dispatchEvent(new CustomEvent("toggle", { detail: { open: this.open }, bubbles: true, composed: true }));
  };

  protected render() {
    return html`<button
        id="header"
        class="header interactive-target"
        type="button"
        aria-expanded=${String(this.open)}
        aria-controls="panel"
        ?disabled=${this.disabled}
        @click=${this.toggle}
      >
        <span class="lead">
          ${this.showLeadingIcon ? html`<span class="icon" aria-hidden="true"><slot name="icon"></slot></span>` : nothing}
          <span class="label"><slot name="heading"></slot></span>
        </span>
        <zeta-caret-indicator class="caret" direction="vertical" ?open=${this.open} .rounded=${this.rounded}></zeta-caret-indicator>
      </button>
      <div id="panel" class="panel" role="region" aria-labelledby="header">
        <div class="clip">
          <div class="children"><slot @slotchange=${this.nestRows}></slot></div>
        </div>
      </div>`;
  }

  static styles = [styles, super.styles || []];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-collapsible-menu-item": ZetaCollapsibleMenuItem;
  }
}
