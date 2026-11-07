import { html, LitElement, nothing, type PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import styles from "./in-page-banner.styles.js";
import { Contourable } from "../../mixins/mixins.js";
import "../icon/icon.js";
import "../button/icon-button/icon-button.js";
import { ZetaCloseEvent } from "../../events.js";
import type { ZetaIconName } from "@zebra-fed/zeta-icons";

/* `default` is the legacy name for neutral. */
export type ZetaInPageBannerStatus = "neutral" | "info" | "positive" | "warning" | "negative" | "default";
export type ZetaInPageBannerAppearance = "subtle" | "solid";

/* The glyph follows Status (spec: anatomy statusIcon). */
const STATUS_ICON: Record<ZetaInPageBannerStatus, ZetaIconName> = {
  neutral: "lightbulb",
  default: "lightbulb",
  info: "info",
  positive: "check_circle",
  warning: "warning",
  negative: "error"
};

/* Slotted actions whose shape the banner sets. */
const SHAPED = new Set(["ZETA-BUTTON", "ZETA-ICON-BUTTON"]);

/* Marks a slotted action the banner moved into Dark, so it only ever clears its own attribute. */
const DARK_MARK = "data-zeta-banner-dark";

/** A status message placed inside the content it is about: a form, a card, a panel. It sits in the flow at its
 * container's width. `status` sets the colour and glyph; `appearance` sets how loud it is. Solid interrupts, for the
 * one message on a view that must be seen now. Subtle informs, for context and guidance, and several can share a page.
 *
 * On solid the controls draw light on any fill: slotted actions take `data-theme="dark"`, and the dismiss maps its
 * foreground to foreground/on-strong (Figma pins palette Dark on both). The text keeps a 16rem minimum before the
 * actions wrap beneath it. `status="negative"` interrupts assistive technology; the others announce politely.
 *
 * @slot - The supporting line, when `description` is not set (the legacy way to give the body).
 * @slot actions - The controls the message needs, normally one small zeta-button: outline-subtle on subtle,
 * outline-contrast on solid. The banner sets their shape.
 * @slot action - The legacy name for `actions`.
 *
 * @part banner - The banner surface.
 * @part icon - The container holding the status glyph.
 * @part header - The title.
 * @part body - The supporting line.
 * @part footer - The actions.
 *
 * @event {CustomEvent<ZetaCloseEventDetail>} close - The dismiss was pressed. The product removes the banner.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=8051-4995
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-in-page-banner--docs
 */
@customElement("zeta-in-page-banner")
export class ZetaInPageBanner extends Contourable(LitElement) {
  /** The status colour and glyph. `default` is the legacy name for neutral. */
  @property({ type: String, reflect: true }) status: ZetaInPageBannerStatus = "info";

  /** `solid` interrupts; `subtle` informs. */
  @property({ type: String, reflect: true }) appearance: ZetaInPageBannerAppearance = "subtle";

  /** The headline: what happened (spec: title). */
  @property({ type: String }) heading = "";

  /** The legacy name for `heading`. */
  @property({ type: String }) title: string = "";

  /** The supporting line: why, and what to do next. Shown when set. */
  @property({ type: String }) description = "";

  /** Keeps the status glyph so the banner survives greyscale. */
  @property({ type: Boolean, attribute: "show-icon" }) showIcon: boolean = true;

  /** Replaces the status glyph. */
  @property({ type: String }) icon?: ZetaIconName;

  /** Shows the dismiss. */
  @property({ type: Boolean, reflect: true, attribute: "show-close" }) showClose = false;

  /** The legacy name for `showClose`. */
  @property({ type: Boolean }) canClose: boolean = false;

  /** Accessible name of the dismiss. */
  @property({ type: String, attribute: "close-label" }) closeLabel = "Dismiss";

  @state() private hasActions = false;

  close() {
    this.dispatchEvent(new ZetaCloseEvent().toEvent());
  }

  protected updated(changed: PropertyValues<this>) {
    if (changed.has("rounded") || changed.has("appearance")) this.syncActions();
  }

  private syncActions = () => {
    const solid = this.appearance === "solid";
    for (const slot of this.renderRoot.querySelectorAll<HTMLSlotElement>("slot[name]")) {
      for (const el of slot.assignedElements({ flatten: true })) {
        if (solid && !el.hasAttribute("data-theme")) {
          el.setAttribute("data-theme", "dark");
          el.setAttribute(DARK_MARK, "");
        }
        if (!solid && el.hasAttribute(DARK_MARK)) {
          el.removeAttribute("data-theme");
          el.removeAttribute(DARK_MARK);
        }
        if (SHAPED.has(el.tagName)) (el as Element & { shape: string }).shape = this.rounded ? "rounded" : "sharp";
      }
    }
  };

  private onActions = () => {
    const slots = this.renderRoot.querySelectorAll<HTMLSlotElement>("slot[name]");
    this.hasActions = [...slots].some(s => s.assignedElements().length > 0);
    this.syncActions();
  };

  protected render() {
    const heading = this.heading || this.title;
    const closable = this.showClose || this.canClose;
    return html`
      <div class="banner" part="banner" role=${this.status === "negative" ? "alert" : "status"}>
        ${
          this.showIcon
            ? html`<span class="glyph" part="icon"><zeta-icon .rounded=${this.rounded}>${this.icon ?? STATUS_ICON[this.status]}</zeta-icon></span>`
            : nothing
        }
        <div class="content">
          <div class="text">
            ${heading ? html`<span class="title" part="header">${heading}</span>` : nothing}
            <span class="description" part="body">${this.description || html`<slot></slot>`}</span>
          </div>
          <div class="actions" part="footer" ?hidden=${!this.hasActions}>
            <slot name="actions" @slotchange=${this.onActions}></slot><slot name="action" @slotchange=${this.onActions}></slot>
          </div>
        </div>
        ${
          closable
            ? html`<zeta-icon-button
                class="dismiss"
                flavor="subtle"
                size="small"
                shape=${this.rounded ? "rounded" : "sharp"}
                aria-label=${this.closeLabel}
                @click=${() => this.close()}
                >close</zeta-icon-button
              >`
            : nothing
        }
      </div>
    `;
  }

  static styles = [super.styles ?? [], styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-in-page-banner": ZetaInPageBanner;
  }
}
