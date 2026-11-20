import { html, LitElement, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./breadcrumb-item.styles.js";
import "../../icon/icon.js";
import { Contourable, Navigate } from "../../../mixins/mixins.js";
import { ifDefined } from "lit/directives/if-defined.js";

/**
 * One crumb in a `zeta-breadcrumb`: an optional glyph, a label and the separator after it. Inside a breadcrumb, the
 * parent sets `current` and `separator`, so neither needs setting by hand.
 *
 * @slot - The crumb's label.
 * @slot icon - A `zeta-icon` before the label.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=7665-138
 * @storybook ?path=/docs/components-breadcrumb--docs
 */
@customElement("zeta-breadcrumb-item")
export class ZetaBreadcrumbItem extends Contourable(Navigate(LitElement)) {
  static styles = [super.styles ?? [], styles];

  /** The page a person is on. It is text, not a link, even with an `href`. */
  @property({ type: Boolean, reflect: true }) current: boolean = false;

  /** Shows the chevron after the crumb. */
  @property({ type: Boolean, reflect: true }) separator: boolean = false;

  /** A crumb with no `href` still has to be reachable, for a click listener on it. */
  private handleKey = (event: KeyboardEvent) => {
    if (event.key === "Enter" && !this.href) (event.currentTarget as HTMLElement).click();
  };

  private renderCrumb() {
    const content = html`<slot name="icon"></slot><span><slot></slot></span>`;
    if (this.current) return html`<span class="crumb" aria-current="page">${content}</span>`;
    return html`<a
      class="crumb"
      href=${ifDefined(this.href)}
      role=${ifDefined(this.href ? undefined : "link")}
      tabindex=${ifDefined(this.href ? undefined : 0)}
      @keydown=${this.handleKey}
      >${content}</a
    >`;
  }

  protected override render() {
    return html`
      ${this.renderCrumb()}
      ${this.separator ? html`<zeta-icon class="separator" aria-hidden="true" .rounded=${this.rounded}>chevron_right</zeta-icon>` : nothing}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-breadcrumb-item": ZetaBreadcrumbItem;
  }
}
