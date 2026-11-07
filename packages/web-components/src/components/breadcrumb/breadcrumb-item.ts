import { LitElement, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./breadcrumb-item.styles.js";
import "../icon/icon.js";
import type { IconName } from "@zebra-design-system/icons/names";

/**
 * One crumb in a `zds-breadcrumb`: an optional glyph, a label and the separator
 * after it. A link with `href`, otherwise a button for a click listener. The
 * breadcrumb sets `current` and `separator`, so neither needs setting by hand.
 *
 * @slot - The crumb's label.
 * @csspart crumb - The link, button or current page text.
 *
 * @spec specs/breadcrumb/breadcrumb.spec.json (subcomponents._Breadcrumb Item)
 */
@customElement("zds-breadcrumb-item")
export class ZdsBreadcrumbItem extends LitElement {
  static styles = styles;

  /** Where the crumb goes. Without one it is a button. */
  @property({ type: String }) href: string | null = null;

  /** A glyph before the label. */
  @property({ type: String }) icon: IconName | null = null;

  /** The page a person is on. It is text, not a link, even with an `href`. */
  @property({ type: Boolean, reflect: true }) current = false;

  /** Shows the chevron after the crumb. */
  @property({ type: Boolean, reflect: true }) separator = false;

  /** Activates the crumb, for the overflow menu's rows. */
  activate() {
    this.renderRoot.querySelector<HTMLElement>("a, button")?.click();
  }

  #content() {
    return html`${this.icon ? html`<zds-icon class="icon" name=${this.icon} size="small"></zds-icon>` : nothing}<span><slot></slot></span>`;
  }

  #crumb() {
    if (this.current) return html`<span part="crumb" class="crumb" aria-current="page">${this.#content()}</span>`;
    if (this.href) return html`<a part="crumb" class="crumb" href=${this.href}>${this.#content()}</a>`;
    return html`<button part="crumb" class="crumb" type="button">${this.#content()}</button>`;
  }

  protected render() {
    return html`${this.#crumb()}${this.separator ? html`<zds-icon class="separator" name="chevron-right" size="small"></zds-icon>` : nothing}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zds-breadcrumb-item": ZdsBreadcrumbItem;
  }
}
