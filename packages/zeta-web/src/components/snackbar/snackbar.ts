import { html, LitElement, nothing, type PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import styles from "./snackbar.styles.js";
import "../icon/icon.js";
import "../button/button.js";
import "../button/icon-button/icon-button.js";
import { Interactive } from "../../mixins/interactive.js";
import { ContourableThree } from "../../mixins/contourable-three.js";
import { type ZetaIconName } from "../../icons.js";

export type ZetaSnackbarStatus = "default" | "action" | "positive" | "info" | "warning" | "negative" | "deletion" | "view";
/** @deprecated Use `ZetaSnackbarStatus`; `error` is now `negative`. */
export type ZetaSnackbarFlavor = Exclude<ZetaSnackbarStatus, "negative"> | "error";
export type ZetaSnackbarCloseReason = "dismiss" | "timeout" | "action";

/* What each contextual status carries: a glyph, a default action and its Button flavour, a close, and whether it is
   a dark bar. */
const STATUSES: Record<ZetaSnackbarStatus, { icon?: ZetaIconName; action?: string; close: boolean; actionFlavor: "subtle" | "outline-subtle"; dark?: boolean }> =
  {
    info: { icon: "info", close: true, actionFlavor: "subtle" },
    positive: { icon: "check_circle", close: true, actionFlavor: "subtle" },
    warning: { icon: "warning", close: true, actionFlavor: "subtle" },
    negative: { icon: "error", close: true, actionFlavor: "subtle" },
    deletion: { icon: "delete", action: "Undo", close: true, actionFlavor: "subtle" },
    view: { icon: "open_in_new_window", action: "View", close: false, actionFlavor: "subtle" },
    action: { action: "Action", close: false, actionFlavor: "outline-subtle", dark: true },
    default: { close: true, actionFlavor: "subtle", dark: true }
  };

const showCloseConverter = {
  fromAttribute: (v: string | null) => (v === null ? null : v !== "false"),
  toAttribute: (v: boolean | null) => (v === null ? null : String(v))
};

/** A brief message about something the app just did, carrying at most one action. `variant` chooses a contextual pill,
 * where `status` sets the tint, the glyph and the controls together, or a plain dark standard bar.
 *
 * It sits in the page by default, as Zeta's snackbar always has. `floating` lifts it into the top layer, centred above
 * the bottom of the viewport, sliding in over 300ms and out over 200ms (a fade only with reduced motion). With
 * `duration` it closes itself, pausing while the pointer or focus is inside. It announces itself politely (negative
 * interrupts). The dark bars carry their own colour mode, so on a dark page they invert to light.
 *
 * @slot - The message: one short line, which ends in an ellipsis where it runs out of room.
 * @slot icon - A leading icon, for the statuses without a glyph of their own (default, action and standard).
 * @part surface - The bar.
 * @event action - The action button was pressed. The snackbar then closes.
 * @event close - It closed; `detail.reason` is "dismiss", "timeout" or "action".
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6551-170
 * @storybook ?path=/docs/components-snackbar--docs
 */
@customElement("zeta-snackbar")
export class ZetaSnackbar extends ContourableThree(Interactive(LitElement)) {
  /** The contextual pill, or the plain dark standard bar. */
  @property({ type: String, reflect: true }) variant: "contextual" | "standard" = "contextual";

  /** Contextual only: the glyph, the tint and the controls, picked for what happened (spec: status). */
  @property({ type: String, reflect: true }) status: ZetaSnackbarStatus = "default";

  /** @deprecated Use `status`; `error` maps to `negative`. */
  @property({ type: String }) flavor?: ZetaSnackbarFlavor;

  /** Shows it. On by default, so a snackbar placed in the page shows as it always has. */
  @property({ type: Boolean, reflect: true }) open = true;

  /** Floats it in the top layer, centred above the bottom of the viewport, with its motion. */
  @property({ type: Boolean, reflect: true }) floating = false;

  /** Closes it after this many ms. 0 keeps it until dismissed. */
  @property({ type: Number }) duration = 0;

  /** The action's text. Defaults per status (Undo, View, Action); "" removes it. */
  @property({ type: String }) actionLabel?: string;

  /** Called when the action is pressed, as well as the `action` event. */
  @property({ attribute: false }) actionClick?: () => void;

  /** Shows the close. Unset, it follows the status; `show-close="false"` turns it off. */
  @property({ attribute: "show-close", converter: showCloseConverter }) showClose: boolean | null = null;

  /** The legacy switch for the close. */
  @property({ type: Boolean }) hasCloseAction = false;

  /** The close's glyph. */
  @property({ type: String }) closeActionIcon?: ZetaIconName;

  /** Accessible name of the close. */
  @property({ type: String, attribute: "close-label" }) closeLabel = "Dismiss";

  @state() private leaving = false;
  @state() private slottedIcon = false;

  private internals = this.attachInternals();
  private timer?: ReturnType<typeof setTimeout>;
  private paused = false;

  private get contextual() {
    return this.variant !== "standard";
  }

  private get action() {
    if (this.actionLabel !== undefined) return this.actionLabel;
    return this.contextual ? (STATUSES[this.status]?.action ?? "") : "Action";
  }

  private get close() {
    if (this.showClose !== null) return this.showClose;
    if (this.hasCloseAction) return true;
    return this.contextual ? (STATUSES[this.status]?.close ?? true) : true;
  }

  private get dark() {
    return this.contextual ? !!STATUSES[this.status]?.dark : true;
  }

  /** The page's mode at the bar: the nearest data-theme above it, else the OS preference. */
  private pageIsDark() {
    let n: Element | null = this.parentElement ?? ((this.getRootNode() as ShadowRoot).host || null);
    while (n) {
      const theme = n.getAttribute("data-theme");
      if (theme) return theme === "dark";
      n = n.parentElement ?? ((n.getRootNode() as ShadowRoot).host || null);
    }
    return matchMedia("(prefers-color-scheme: dark)").matches;
  }

  /** Dark bars take the opposite of the page's mode; tinted bars follow the page. */
  private syncMode() {
    if (this.dark) this.setAttribute("data-theme", this.pageIsDark() ? "light" : "dark");
    else this.removeAttribute("data-theme");
  }

  connectedCallback() {
    super.connectedCallback?.();
    this.syncMode();
  }

  disconnectedCallback() {
    super.disconnectedCallback?.();
    clearTimeout(this.timer);
  }

  protected willUpdate(changed: PropertyValues<this>) {
    if (changed.has("flavor") && this.flavor) this.status = this.flavor === "error" ? "negative" : this.flavor;
    if (changed.has("shape") && this.shape === "full") this.shape = "rounded";
    if (changed.has("variant") || changed.has("status") || (changed.has("open") && this.open)) this.syncMode();
    if (changed.has("open") && !this.open && changed.get("open") === true && this.floating) this.leaving = true;
    this.toggleAttribute("data-shown", this.open || this.leaving);
  }

  protected updated(changed: PropertyValues<this>) {
    this.internals.role = this.contextual && this.status === "negative" ? "alert" : "status";
    if (changed.has("floating")) {
      if (this.floating) this.popover = "manual";
      else if (this.popover) {
        if (this.matches(":popover-open")) this.hidePopover();
        this.removeAttribute("popover");
      }
    }
    if (changed.has("open") || changed.has("floating")) {
      if (this.open) this.enter();
      else if (this.leaving) void this.exit();
    }
    if (changed.has("open") || changed.has("duration")) this.arm();
  }

  private get reducedMotion() {
    return matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  private enter() {
    if (!this.floating) return;
    if (!this.matches(":popover-open")) this.showPopover();
    const bar = this.renderRoot.querySelector(".snackbar-root");
    bar?.getAnimations().forEach(a => a.cancel());
    bar?.animate(
      this.reducedMotion
        ? [{ opacity: 0 }, { opacity: 1 }]
        : [
            { opacity: 0, transform: "translateY(100%)" },
            { opacity: 1, transform: "none" }
          ],
      { duration: this.reducedMotion ? 150 : 300, easing: "cubic-bezier(0.2, 0, 0, 1)" }
    );
  }

  private async exit() {
    const bar = this.renderRoot.querySelector(".snackbar-root");
    if (bar) {
      const anim = bar.animate(
        this.reducedMotion
          ? [{ opacity: 1 }, { opacity: 0 }]
          : [
              { opacity: 1, transform: "none" },
              { opacity: 0, transform: "translateY(-50%)" }
            ],
        { duration: this.reducedMotion ? 150 : 200, easing: "cubic-bezier(0.3, 0, 1, 1)", fill: "forwards" }
      );
      await anim.finished.catch(() => undefined);
    }
    if (this.open) return;
    this.leaving = false;
    if (this.matches(":popover-open")) this.hidePopover();
  }

  /** Closes it, as the close button does. */
  hide(reason: ZetaSnackbarCloseReason = "dismiss") {
    if (!this.open) return;
    this.open = false;
    clearTimeout(this.timer);
    this.dispatchEvent(new CustomEvent("close", { detail: { reason }, bubbles: true, composed: true }));
  }

  private arm() {
    clearTimeout(this.timer);
    if (this.open && this.duration > 0 && !this.paused) this.timer = setTimeout(() => this.hide("timeout"), this.duration);
  }

  private pause = () => {
    this.paused = true;
    clearTimeout(this.timer);
  };

  private resume = (e: Event) => {
    if (e instanceof FocusEvent && this.renderRoot.contains(e.relatedTarget as Node)) return;
    this.paused = false;
    this.arm();
  };

  private onAction = () => {
    this.actionClick?.();
    this.dispatchEvent(new Event("action", { bubbles: true, composed: true }));
    this.hide("action");
  };

  private onIconSlot = (e: Event) => {
    this.slottedIcon = (e.target as HTMLSlotElement).assignedNodes({ flatten: true }).length > 0;
  };

  render() {
    if (!this.open && !this.leaving) return nothing;
    const icon = this.contextual ? STATUSES[this.status]?.icon : undefined;
    const action = this.action;
    const actionFlavor = this.contextual ? (STATUSES[this.status]?.actionFlavor ?? "subtle") : "subtle";
    const shape = this.shape === "sharp" ? "sharp" : this.contextual ? "full" : "rounded";
    return html`<div
      part="surface"
      class="snackbar-root"
      ?data-end=${!!action || this.close}
      @pointerenter=${this.pause}
      @pointerleave=${this.resume}
      @focusin=${this.pause}
      @focusout=${this.resume}
    >
      ${
        icon
          ? html`<zeta-icon class="lead" aria-hidden="true" .rounded=${this.shape !== "sharp"}>${icon}</zeta-icon>`
          : html`<span class="lead" ?hidden=${!this.slottedIcon}><slot name="icon" @slotchange=${this.onIconSlot}></slot></span>`
      }
      <span class="message"><slot></slot></span>
      ${
        action || this.close
          ? html`<span class="controls">
              ${
              action
                ? html`<zeta-button id="action" class="action" flavor=${actionFlavor} size="medium" shape=${shape} @click=${this.onAction}
                    >${action}</zeta-button
                  >`
                : nothing
            }
              ${
              this.close
                ? html`<zeta-icon-button
                    id="closeButton"
                    class="close"
                    flavor="subtle"
                    size="medium"
                    shape=${shape}
                    aria-label=${this.closeLabel}
                    @click=${() => this.hide("dismiss")}
                    >${this.closeActionIcon ?? "close"}</zeta-icon-button
                  >`
                : nothing
            }
            </span>`
          : nothing
      }
    </div>`;
  }

  static styles = [super.styles ?? [], styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-snackbar": ZetaSnackbar;
  }
}
