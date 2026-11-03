import { html, LitElement, nothing, type PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import styles from "./system-banner.styles.js";
import { Contourable } from "../../mixins/mixins.js";
import "../icon/icon.js";
import "../button/icon-button/icon-button.js";
import type { ZetaIconName } from "@zebra-fed/zeta-icons";

export type ZetaSystemBannerStatus = "default" | "positive" | "negative" | "warning" | "info";

/* Desktop's glyph follows Status; positive is the legacy name for the success colour. */
const STATUS_ICON: Record<ZetaSystemBannerStatus, ZetaIconName> = {
  default: "check_circle",
  positive: "check_circle",
  negative: "error",
  warning: "warning",
  info: "info"
};

/* Slotted actions whose shape the banner sets. */
const SHAPED = new Set(["ZETA-BUTTON", "ZETA-ICON-BUTTON"]);

/* In, the height opens from nothing while the row slides down, pushing what is below; out reverses it. 400ms, easing
   out in and in out (no motion token yet); reduced motion fades. Resolves true when it finished. */
function slide(banner: HTMLElement, row: HTMLElement, direction: "in" | "out"): Promise<boolean> {
  if (typeof banner.animate !== "function") return Promise.resolve(true);
  banner.getAnimations().forEach(a => a.cancel());
  row.getAnimations().forEach(a => a.cancel());
  const into = direction === "in";
  const settle = (a: Animation) =>
    a.finished.then(
      () => true,
      () => false
    );
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const fade = [{ opacity: 0 }, { opacity: 1 }];
    return settle(banner.animate(into ? fade : fade.reverse(), { duration: 200, easing: "ease-out", fill: into ? "none" : "forwards" }));
  }
  const height = banner.getBoundingClientRect().height;
  const timing: KeyframeAnimationOptions = into
    ? { duration: 400, easing: "cubic-bezier(0.2, 0, 0, 1)" }
    : { duration: 400, easing: "cubic-bezier(0.3, 0, 1, 1)", fill: "forwards" };
  const open = [{ height: "0px" }, { height: `${height}px` }];
  const drop = [{ transform: "translateY(-100%)" }, { transform: "none" }];
  banner.style.overflow = "hidden";
  const anim = banner.animate(into ? open : open.reverse(), timing);
  row.animate(into ? drop : drop.reverse(), timing);
  return settle(anim).then(done => {
    if (done && into) banner.style.overflow = "";
    return done;
  });
}

/** A full-width message pinned to the top of a screen or view: a status colour, a title, an optional description and
 * optional actions. It spans its container and stays until something clears it. `layout` picks the desktop banner or
 * the mobile one.
 *
 * It is locked to Dark, whatever the page's mode, so the white text and the controls hold on the strong status
 * colours. The banner stays square; `rounded` sets the shape of the dismiss and every Button or Icon Button in the
 * actions. `status="negative"` never shows a dismiss and interrupts assistive technology; the others announce politely.
 * It reveals by sliding down and pushing the content below; the dismiss or `open=false` plays that in reverse.
 *
 * @slot - The title, when `heading` is not set (the legacy way to give the text).
 * @slot actions - The controls the message needs, typically one small outline-contrast zeta-button.
 * @slot {zeta-icon} leadingIcon - A leading icon in place of the status glyph (legacy).
 * @slot {zeta-icon} trailingIcon - An icon at the trailing end (legacy).
 * @part row - The message row.
 * @event close - The dismiss was pressed. The banner plays its exit and hides first.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5255-2146
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-system-banner--docs
 */
@customElement("zeta-system-banner")
export class ZetaSystemBanner extends Contourable(LitElement) {
  /** The status colour. `default` is the success colour, despite the name; `positive` is its legacy name. */
  @property({ type: String, reflect: true }) status: ZetaSystemBannerStatus = "default";

  /** The desktop view banner or the mobile screen banner. */
  @property({ type: String, reflect: true }) layout: "desktop" | "mobile" = "desktop";

  /** The headline: what happened (spec: title). */
  @property({ type: String }) heading = "";

  /** The legacy name for `heading`. */
  @property({ type: String }) text?: string;

  /** The supporting line. On desktop it makes the banner multiline. */
  @property({ type: String }) description = "";

  /** Keeps the status glyph. */
  @property({ type: Boolean, reflect: true, attribute: "show-leading-icon" }) showLeadingIcon = true;

  /** Mobile only: the glyph, chosen per use. Desktop's follows `status`. */
  @property({ type: String }) icon: ZetaIconName = "verified";

  /** Lets the person dismiss the banner. Ignored on negative. */
  @property({ type: Boolean, reflect: true, attribute: "show-close" }) showClose = true;

  /** Accessible name of the dismiss. */
  @property({ type: String, attribute: "close-label" }) closeLabel = "Dismiss";

  /** Shows the banner; false plays the exit and hides it, true again replays the reveal. */
  @property({ type: Boolean }) open = true;

  /** Legacy: `center` centres the message in the row. */
  @property({ type: String, reflect: true }) align: "start" | "center" = "start";

  @state() private hasActions = false;
  @state() private hasLeading = false;
  @state() private hasTrailing = false;

  connectedCallback() {
    super.connectedCallback?.();
    // The Dark lock: every token inside, the controls' included, resolves dark.
    this.setAttribute("data-theme", "dark");
  }

  private get row() {
    return this.renderRoot.querySelector<HTMLElement>(".system-banner");
  }

  protected firstUpdated() {
    const row = this.row;
    if (!this.open) this.hidden = true;
    else if (row) void slide(this, row, "in");
  }

  protected updated(changed: PropertyValues<this>) {
    if (changed.has("rounded")) this.shapeActions();
    if (changed.has("open") && changed.get("open") !== undefined) {
      const row = this.row;
      if (this.open) {
        this.hidden = false;
        if (row) void slide(this, row, "in");
      } else if (row) {
        void slide(this, row, "out").then(done => {
          if (done) this.hidden = true;
        });
      } else this.hidden = true;
    }
  }

  private shapeActions = () => {
    const slot = this.renderRoot.querySelector<HTMLSlotElement>('slot[name="actions"]');
    for (const el of slot?.assignedElements({ flatten: true }) ?? []) {
      if (SHAPED.has(el.tagName)) (el as Element & { shape: string }).shape = this.rounded ? "rounded" : "sharp";
    }
  };

  private onActions = (e: Event) => {
    this.hasActions = (e.target as HTMLSlotElement).assignedElements().length > 0;
    this.shapeActions();
  };

  private dismiss = () => {
    const finish = () => {
      this.hidden = true;
      this.dispatchEvent(new CustomEvent("close", { bubbles: true, composed: true }));
    };
    const row = this.row;
    if (row) void slide(this, row, "out").then(done => done && finish());
    else finish();
  };

  protected render() {
    const mobile = this.layout === "mobile";
    const close = this.showClose && this.status !== "negative";
    const heading = this.heading || this.text;
    const glyph = this.showLeadingIcon
      ? html`<span class="glyph" ?hidden=${this.hasLeading}
          ><zeta-icon .rounded=${this.rounded}>${mobile ? this.icon : STATUS_ICON[this.status]}</zeta-icon></span
        >`
      : nothing;
    return html`
      <div class="system-banner" part="row" role=${this.status === "negative" ? "alert" : "status"} data-content=${this.description ? "multiline" : "single"}>
        <span class="glyph" ?hidden=${!this.hasLeading}>
          <slot name="leadingIcon" @slotchange=${(e: Event) => (this.hasLeading = (e.target as HTMLSlotElement).assignedElements().length > 0)}></slot>
        </span>
        ${glyph}
        <div class="content">
          <div class="text">
            <span class="title">${heading || html`<slot></slot>`}</span>
            ${this.description ? html`<span class="description">${this.description}</span>` : nothing}
          </div>
          <div class="actions" ?hidden=${!this.hasActions}><slot name="actions" @slotchange=${this.onActions}></slot></div>
        </div>
        <span class="trailing" ?hidden=${!this.hasTrailing}>
          <slot name="trailingIcon" @slotchange=${(e: Event) => (this.hasTrailing = (e.target as HTMLSlotElement).assignedElements().length > 0)}></slot>
        </span>
        ${
          close
            ? html`<zeta-icon-button
                class="dismiss"
                flavor="subtle"
                shape=${this.rounded ? "rounded" : "sharp"}
                size=${mobile ? "medium" : "small"}
                aria-label=${this.closeLabel}
                @click=${this.dismiss}
                >close</zeta-icon-button
              >`
            : nothing
        }
      </div>
    `;
  }

  static styles = [super.styles || [], styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-system-banner": ZetaSystemBanner;
  }
}
