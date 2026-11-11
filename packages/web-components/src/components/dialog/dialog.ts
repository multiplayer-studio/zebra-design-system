import { LitElement, html, nothing, type PropertyValues } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import styles from "./dialog.styles.js";
import "../icon/icon.js";
import "../icon-button/icon-button.js";
import "../button/button.js";
import { raiseScrim, lowerScrim } from "../scrim/scrim.js";
import { defaultTrue } from "../chip/chip.js";
import type { IconName } from "@zebra-design-system/icons/names";

export type DialogFlavour = "default" | "error" | "info" | "success" | "warning";
/**
 * Figma names the values `round` / `sharp`; exposed as `rounded` / `sharp`
 * so the dialog takes the same word as Button, Tooltip and the chips.
 */
export type DialogShape = "rounded" | "sharp";
/** Which preset footer button was pressed. */
export type DialogAction = "primary" | "secondary" | "tertiary";
/** Why the open state changed. */
export type DialogOpenChangeReason = "trigger" | "close" | "escape" | "backdrop" | "action" | "other";

// Flavour sets the header glyph and nothing else (spec: flavour.glyphByValue).
const GLYPH: Record<DialogFlavour, IconName> = {
  default: "block",
  error: "error",
  info: "info",
  success: "verified",
  warning: "warning",
};

const FOCUSABLE =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"]), [contenteditable=""], [contenteditable="true"]';

/** First focusable element in flat-tree order, through shadow roots and slots. */
export function firstFocusable(nodes: Iterable<Node>): HTMLElement | null {
  for (const node of nodes) {
    if (!(node instanceof HTMLElement)) continue;
    if (node.hidden || node.getAttribute("aria-hidden") === "true") continue;
    if (node.matches(FOCUSABLE) && !(node as HTMLButtonElement).disabled && node.getClientRects().length) return node;
    const children: Iterable<Node> =
      node instanceof HTMLSlotElement
        ? (node.assignedNodes({ flatten: true }).length ? node.assignedNodes({ flatten: true }) : node.childNodes)
        : node.shadowRoot ? node.shadowRoot.childNodes : node.childNodes;
    const hit = firstFocusable(children);
    if (hit) return hit;
  }
  return null;
}

export function deepActiveElement(): HTMLElement | null {
  let el = document.activeElement;
  while (el?.shadowRoot?.activeElement) el = el.shadowRoot.activeElement;
  return el as HTMLElement | null;
}

// Scroll lock shared by every open dialog (and the lightbox): the page stops
// scrolling while any one is open, and is restored when the last closes.
let locks = 0;
let savedOverflow = "";
export function lockScroll() {
  if (locks++ === 0) {
    savedOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
  }
}
export function unlockScroll() {
  if (locks > 0 && --locks === 0) document.documentElement.style.overflow = savedOverflow;
}

/**
 * A modal message that interrupts the current task until the user responds
 * or dismisses it. A header carries the flavour glyph, the title and a close
 * button; the body (default slot) holds the message; an optional footer
 * offers one to three preset buttons — primary; secondary + primary;
 * tertiary | secondary + primary, following which labels are set — or the
 * `footer-start` / `footer-end` slots for custom content.
 *
 * Modal behaviour comes from the native `<dialog>` and `showModal()`: the top
 * layer (above every page stacking context), the inert page behind it, and
 * Escape. The backdrop is a `<zds-scrim>` (tone scrim), shown in the top layer
 * just before the dialog so it sits directly beneath. On top of that: the backdrop click, `dismissible`, initial focus
 * (the first focusable — the close button when shown), focus returned to
 * whatever had it (the trigger) on close, and page scroll lock. An element in
 * the `trigger` slot opens it on click.
 *
 * Kept in step with packages/react-baseui `<Dialog>`, which gets the same
 * behaviour from Base UI's Dialog.
 *
 * @slot - The body. Any content; long content scrolls inside the body.
 * @slot trigger - An element (usually a zds-button) that opens the dialog on click.
 * @slot footer-start - Custom footer content, start side. Replaces the preset buttons.
 * @slot footer-end - Custom footer content, end side. Replaces the preset buttons.
 * @part dialog - The panel.
 * @fires zds-open-change - `{ open, reason }` when the trigger, close button, Escape, the backdrop or a footer action opens or closes it. Not fired for a programmatic `open` change.
 * @fires zds-action - `{ action: "primary" | "secondary" | "tertiary" }` when a preset footer button is pressed.
 *
 * @spec specs/dialog/dialog.spec.json
 */
@customElement("zds-dialog")
export class ZdsDialog extends LitElement {
  static styles = styles;

  /** Whether the dialog is open. Reflected. */
  @property({ type: Boolean, reflect: true }) open = false;

  /** The title in the header. Short; it names the dialog for assistive tech. */
  @property({ type: String }) heading = "";

  /** Sets only the header's leading glyph: block, error, info, verified or warning. Never recolours anything. */
  @property({ type: String, reflect: true }) flavour: DialogFlavour = "default";

  /** Corner radius, and the shape (and glyph family) of the header icon, close button and footer buttons. */
  @property({ type: String, reflect: true }) shape: DialogShape = "rounded";

  /** Shows the footer. `show-footer="false"` removes it — only for a message with nothing to decide. */
  @property({ type: Boolean, attribute: "show-footer", reflect: true, converter: defaultTrue }) showFooter = true;

  /** Shows the close button in the header (spec Dev Deviation: hiding it is allowed). `show-close="false"` hides it. */
  @property({ type: Boolean, attribute: "show-close", reflect: true, converter: defaultTrue }) showClose = true;

  /** Accessible name of the close button. */
  @property({ type: String, attribute: "close-label" }) closeLabel = "Close";

  /** Label of the primary (filled) footer button. */
  @property({ type: String, attribute: "primary-label" }) primaryLabel = "";

  /** Label of the secondary (outline-subtle) footer button, beside the primary. */
  @property({ type: String, attribute: "secondary-label" }) secondaryLabel = "";

  /** Label of the tertiary (text) footer button, on the opposite side. */
  @property({ type: String, attribute: "tertiary-label" }) tertiaryLabel = "";

  /** Keep the dialog open after a preset footer button is pressed (e.g. to validate first). By default it closes. */
  @property({ type: Boolean, attribute: "keep-open-on-action" }) keepOpenOnAction = false;

  /** Escape and a click on the backdrop close the dialog. `dismissible="false"` when a decision is required. */
  @property({ type: Boolean, reflect: true, converter: defaultTrue }) dismissible = true;

  /**
   * Renders the panel in normal flow, always shown, with no backdrop, focus
   * trap or dismissal — the component exactly as the spec draws it, for
   * documentation and screenshots.
   */
  @property({ type: Boolean, reflect: true }) inline = false;

  @query("dialog") private dialogEl?: HTMLDialogElement;
  @query("zds-scrim") private scrimEl?: HTMLElement;

  private returnFocus: HTMLElement | null = null;
  private locked = false;
  private observer = new MutationObserver(() => this.requestUpdate());

  connectedCallback() {
    super.connectedCallback();
    // Footer layout depends on which slots have content.
    this.observer.observe(this, { childList: true, attributes: true, attributeFilter: ["slot"], subtree: false });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.observer.disconnect();
    if (this.locked) { unlockScroll(); this.locked = false; }
  }

  /** Opens the dialog (same as `open = true`). */
  show() { this.open = true; }

  /** Closes the dialog (same as `open = false`). */
  close() { this.open = false; }

  private hasSlotted(name: string) {
    return !!this.querySelector(`:scope > [slot="${name}"]`);
  }

  /** A user-originated change: update `open` and announce it. */
  private setOpen(open: boolean, reason: DialogOpenChangeReason) {
    if (this.open === open) return;
    this.open = open;
    this.dispatchEvent(new CustomEvent("zds-open-change", { detail: { open, reason }, bubbles: true, composed: true }));
  }

  private onAction(action: DialogAction) {
    this.dispatchEvent(new CustomEvent("zds-action", { detail: { action }, bubbles: true, composed: true }));
    if (!this.inline && !this.keepOpenOnAction) this.setOpen(false, "action");
  }

  private onTriggerClick = () => {
    if (!this.inline) this.setOpen(true, "trigger");
  };

  private onKeydown = (e: KeyboardEvent) => {
    if (e.key !== "Escape") return;
    // Handled here rather than by the native cancel/close so `dismissible`
    // can refuse it reliably (Chrome skips a prevented cancel on a repeat).
    e.preventDefault();
    e.stopPropagation();
    if (this.dismissible) this.setOpen(false, "escape");
  };

  private onCancel = (e: Event) => {
    e.preventDefault();
    if (this.dismissible) this.setOpen(false, "escape");
  };

  private onNativeClose = () => {
    // The browser closed it anyway (e.g. a forced close request).
    if (!this.open) return;
    if (this.dismissible) this.setOpen(false, "escape");
    else this.syncDialog();
  };

  private onDialogClick = (e: MouseEvent) => {
    const dlg = this.dialogEl;
    if (!dlg || e.target !== dlg || !this.dismissible) return;
    // The ::backdrop hit-tests as the <dialog> itself; a click on the panel's
    // own padding does too, so test the point against the panel box.
    const r = dlg.getBoundingClientRect();
    const inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
    if (!inside) this.setOpen(false, "backdrop");
  };

  protected updated(changed: PropertyValues<this>) {
    if (changed.has("open") || changed.has("inline")) this.syncDialog();
  }

  private syncDialog() {
    const dlg = this.dialogEl;
    if (this.inline || !dlg) {
      if (this.locked) { unlockScroll(); this.locked = false; }
      return;
    }
    if (!this.open) lowerScrim(this.scrimEl);
    if (this.open && !dlg.open) {
      this.returnFocus = deepActiveElement();
      raiseScrim(this.scrimEl);
      dlg.showModal();
      if (!this.locked) { lockScroll(); this.locked = true; }
      this.focusInitial(dlg);
    } else if (!this.open && dlg.open) {
      dlg.close();
      if (this.locked) { unlockScroll(); this.locked = false; }
      const back = this.returnFocus;
      this.returnFocus = null;
      if (back?.isConnected) back.focus();
    }
  }

  private focusInitial(dlg: HTMLDialogElement) {
    // A slotted [autofocus] wins; otherwise the first focusable in flat-tree
    // order (the close button when shown, then the body, then the footer);
    // otherwise the panel itself. Matches Base UI's default initial focus.
    const auto = this.querySelector<HTMLElement>(':scope > [autofocus]:not([slot="trigger"]), :scope > :not([slot="trigger"]) [autofocus]');
    const target = auto ?? firstFocusable(dlg.childNodes) ?? dlg;
    target.focus();
  }

  private renderAction(which: DialogAction, label: string, flavour: "primary" | "outline-subtle" | "text") {
    return html`<zds-button flavour=${flavour} size="medium" shape=${this.shape} @click=${() => this.onAction(which)}>${label}</zds-button>`;
  }

  protected render() {
    // Shape is one decision for the whole dialog (spec: "the two cannot be
    // mixed"): footer and close button shape, and the glyph family. spec
    // issue "Shape misses the close glyph": Figma leaves the close glyph
    // rounded in sharp dialogs; here it follows shape like the rest.
    const iconStyle = this.shape === "sharp" ? "sharp" : "rounded";

    // spec issue "Footer presets aren't exposed": the 1 / 2 / 3 layouts
    // follow from which labels are set; footer-start / footer-end slots are
    // the custom preset and replace them.
    const custom = this.hasSlotted("footer-start") || this.hasSlotted("footer-end");
    const hasFooterContent = custom || !!(this.primaryLabel || this.secondaryLabel || this.tertiaryLabel);
    const split = custom || !!this.tertiaryLabel;

    const header = html`
      <div class="header" part="header">
        <div class="title-group">
          <!-- spec issue "header icon drawn without Icon at 24px": zds-icon at
               medium (control/icon-md), the same size as the close glyph. -->
          <zds-icon class="icon" name=${GLYPH[this.flavour] ?? GLYPH.default} .iconStyle=${iconStyle} size="medium"></zds-icon>
          <h2 class="title" id="title">${this.heading}</h2>
        </div>
        ${this.showClose
          ? html`<!-- spec issue "The close control is a bare Icon": an icon
                 button with states, a hit area and an accessible name. -->
              <zds-icon-button class="close" flavour="subtle" size="medium" shape=${this.shape} icon="close"
                label=${this.closeLabel} @click=${() => !this.inline && this.setOpen(false, "close")}></zds-icon-button>`
          : nothing}
      </div>
    `;

    const footer = this.showFooter && hasFooterContent
      ? html`
        <div class="footer" part="footer" data-layout=${split ? "split" : "end"}>
          ${split
            ? html`<div class="footer-start">${custom
                ? html`<slot name="footer-start"></slot>`
                : this.renderAction("tertiary", this.tertiaryLabel, "text")}</div>`
            : nothing}
          <div class="footer-end">${custom
            ? html`<slot name="footer-end"></slot>`
            : html`${this.secondaryLabel ? this.renderAction("secondary", this.secondaryLabel, "outline-subtle") : nothing}${this.primaryLabel ? this.renderAction("primary", this.primaryLabel, "primary") : nothing}`}</div>
        </div>`
      : nothing;

    const content = html`${header}<div class="body" id="body" part="body"><slot></slot></div>${footer}`;

    return html`
      <slot name="trigger" @click=${this.onTriggerClick}></slot>
      ${this.inline
        ? html`<div class="panel inline" part="dialog" role="dialog" aria-labelledby="title" aria-describedby="body">${content}</div>`
        : html`<zds-scrim popover="manual" tone="scrim"></zds-scrim><dialog class="panel" part="dialog" aria-labelledby="title" aria-describedby="body"
            @keydown=${this.onKeydown} @cancel=${this.onCancel} @close=${this.onNativeClose} @click=${this.onDialogClick}>${content}</dialog>`}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zds-dialog": ZdsDialog;
  }
  interface HTMLElementEventMap {
    "zds-open-change": CustomEvent<{ open: boolean; reason: DialogOpenChangeReason }>;
    "zds-action": CustomEvent<{ action: DialogAction }>;
  }
}
