var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, nothing } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import styles from "./dialog.styles.js";
import "../icon/icon.js";
import "../icon-button/icon-button.js";
import "../button/button.js";
import { defaultTrue } from "../chip/chip.js";
// Flavour sets the header glyph and nothing else (spec: flavour.glyphByValue).
const GLYPH = {
    default: "block",
    error: "error",
    info: "info",
    success: "verified",
    warning: "warning",
};
const FOCUSABLE = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"]), [contenteditable=""], [contenteditable="true"]';
/** First focusable element in flat-tree order, through shadow roots and slots. */
function firstFocusable(nodes) {
    for (const node of nodes) {
        if (!(node instanceof HTMLElement))
            continue;
        if (node.hidden || node.getAttribute("aria-hidden") === "true")
            continue;
        if (node.matches(FOCUSABLE) && !node.disabled && node.getClientRects().length)
            return node;
        const children = node instanceof HTMLSlotElement
            ? (node.assignedNodes({ flatten: true }).length ? node.assignedNodes({ flatten: true }) : node.childNodes)
            : node.shadowRoot ? node.shadowRoot.childNodes : node.childNodes;
        const hit = firstFocusable(children);
        if (hit)
            return hit;
    }
    return null;
}
function deepActiveElement() {
    let el = document.activeElement;
    while (el?.shadowRoot?.activeElement)
        el = el.shadowRoot.activeElement;
    return el;
}
// Scroll lock shared by every open dialog: the page stops scrolling while any
// one is open, and is restored when the last closes.
let locks = 0;
let savedOverflow = "";
function lockScroll() {
    if (locks++ === 0) {
        savedOverflow = document.documentElement.style.overflow;
        document.documentElement.style.overflow = "hidden";
    }
}
function unlockScroll() {
    if (locks > 0 && --locks === 0)
        document.documentElement.style.overflow = savedOverflow;
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
 * Escape. On top of that: the backdrop click, `dismissible`, initial focus
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
let ZdsDialog = class ZdsDialog extends LitElement {
    constructor() {
        super(...arguments);
        /** Whether the dialog is open. Reflected. */
        this.open = false;
        /** The title in the header. Short; it names the dialog for assistive tech. */
        this.heading = "";
        /** Sets only the header's leading glyph: block, error, info, verified or warning. Never recolours anything. */
        this.flavour = "default";
        /** Corner radius, and the shape (and glyph family) of the header icon, close button and footer buttons. */
        this.shape = "rounded";
        /** Shows the footer. `show-footer="false"` removes it — only for a message with nothing to decide. */
        this.showFooter = true;
        /** Shows the close button in the header (spec Dev Deviation: hiding it is allowed). `show-close="false"` hides it. */
        this.showClose = true;
        /** Accessible name of the close button. */
        this.closeLabel = "Close";
        /** Label of the primary (filled) footer button. */
        this.primaryLabel = "";
        /** Label of the secondary (outline-subtle) footer button, beside the primary. */
        this.secondaryLabel = "";
        /** Label of the tertiary (text) footer button, on the opposite side. */
        this.tertiaryLabel = "";
        /** Keep the dialog open after a preset footer button is pressed (e.g. to validate first). By default it closes. */
        this.keepOpenOnAction = false;
        /** Escape and a click on the backdrop close the dialog. `dismissible="false"` when a decision is required. */
        this.dismissible = true;
        /**
         * Renders the panel in normal flow, always shown, with no backdrop, focus
         * trap or dismissal — the component exactly as the spec draws it, for
         * documentation and screenshots.
         */
        this.inline = false;
        this.returnFocus = null;
        this.locked = false;
        this.observer = new MutationObserver(() => this.requestUpdate());
        this.onTriggerClick = () => {
            if (!this.inline)
                this.setOpen(true, "trigger");
        };
        this.onKeydown = (e) => {
            if (e.key !== "Escape")
                return;
            // Handled here rather than by the native cancel/close so `dismissible`
            // can refuse it reliably (Chrome skips a prevented cancel on a repeat).
            e.preventDefault();
            e.stopPropagation();
            if (this.dismissible)
                this.setOpen(false, "escape");
        };
        this.onCancel = (e) => {
            e.preventDefault();
            if (this.dismissible)
                this.setOpen(false, "escape");
        };
        this.onNativeClose = () => {
            // The browser closed it anyway (e.g. a forced close request).
            if (!this.open)
                return;
            if (this.dismissible)
                this.setOpen(false, "escape");
            else
                this.syncDialog();
        };
        this.onDialogClick = (e) => {
            const dlg = this.dialogEl;
            if (!dlg || e.target !== dlg || !this.dismissible)
                return;
            // The ::backdrop hit-tests as the <dialog> itself; a click on the panel's
            // own padding does too, so test the point against the panel box.
            const r = dlg.getBoundingClientRect();
            const inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
            if (!inside)
                this.setOpen(false, "backdrop");
        };
    }
    connectedCallback() {
        super.connectedCallback();
        // Footer layout depends on which slots have content.
        this.observer.observe(this, { childList: true, attributes: true, attributeFilter: ["slot"], subtree: false });
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.observer.disconnect();
        if (this.locked) {
            unlockScroll();
            this.locked = false;
        }
    }
    /** Opens the dialog (same as `open = true`). */
    show() { this.open = true; }
    /** Closes the dialog (same as `open = false`). */
    close() { this.open = false; }
    hasSlotted(name) {
        return !!this.querySelector(`:scope > [slot="${name}"]`);
    }
    /** A user-originated change: update `open` and announce it. */
    setOpen(open, reason) {
        if (this.open === open)
            return;
        this.open = open;
        this.dispatchEvent(new CustomEvent("zds-open-change", { detail: { open, reason }, bubbles: true, composed: true }));
    }
    onAction(action) {
        this.dispatchEvent(new CustomEvent("zds-action", { detail: { action }, bubbles: true, composed: true }));
        if (!this.inline && !this.keepOpenOnAction)
            this.setOpen(false, "action");
    }
    updated(changed) {
        if (changed.has("open") || changed.has("inline"))
            this.syncDialog();
    }
    syncDialog() {
        const dlg = this.dialogEl;
        if (this.inline || !dlg) {
            if (this.locked) {
                unlockScroll();
                this.locked = false;
            }
            return;
        }
        if (this.open && !dlg.open) {
            this.returnFocus = deepActiveElement();
            dlg.showModal();
            if (!this.locked) {
                lockScroll();
                this.locked = true;
            }
            this.focusInitial(dlg);
        }
        else if (!this.open && dlg.open) {
            dlg.close();
            if (this.locked) {
                unlockScroll();
                this.locked = false;
            }
            const back = this.returnFocus;
            this.returnFocus = null;
            if (back?.isConnected)
                back.focus();
        }
    }
    focusInitial(dlg) {
        // A slotted [autofocus] wins; otherwise the first focusable in flat-tree
        // order (the close button when shown, then the body, then the footer);
        // otherwise the panel itself. Matches Base UI's default initial focus.
        const auto = this.querySelector(':scope > [autofocus]:not([slot="trigger"]), :scope > :not([slot="trigger"]) [autofocus]');
        const target = auto ?? firstFocusable(dlg.childNodes) ?? dlg;
        target.focus();
    }
    renderAction(which, label, flavour) {
        return html `<zds-button flavour=${flavour} size="medium" shape=${this.shape} @click=${() => this.onAction(which)}>${label}</zds-button>`;
    }
    render() {
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
        const header = html `
      <div class="header" part="header">
        <div class="title-group">
          <!-- spec issue "header icon drawn without Icon at 24px": zds-icon at
               medium (control/icon-md), the same size as the close glyph. -->
          <zds-icon class="icon" name=${GLYPH[this.flavour] ?? GLYPH.default} .iconStyle=${iconStyle} size="medium"></zds-icon>
          <h2 class="title" id="title">${this.heading}</h2>
        </div>
        ${this.showClose
            ? html `<!-- spec issue "The close control is a bare Icon": an icon
                 button with states, a hit area and an accessible name. -->
              <zds-icon-button class="close" flavour="subtle" size="medium" shape=${this.shape} icon="close"
                label=${this.closeLabel} @click=${() => !this.inline && this.setOpen(false, "close")}></zds-icon-button>`
            : nothing}
      </div>
    `;
        const footer = this.showFooter && hasFooterContent
            ? html `
        <div class="footer" part="footer" data-layout=${split ? "split" : "end"}>
          ${split
                ? html `<div class="footer-start">${custom
                    ? html `<slot name="footer-start"></slot>`
                    : this.renderAction("tertiary", this.tertiaryLabel, "text")}</div>`
                : nothing}
          <div class="footer-end">${custom
                ? html `<slot name="footer-end"></slot>`
                : html `${this.secondaryLabel ? this.renderAction("secondary", this.secondaryLabel, "outline-subtle") : nothing}${this.primaryLabel ? this.renderAction("primary", this.primaryLabel, "primary") : nothing}`}</div>
        </div>`
            : nothing;
        const content = html `${header}<div class="body" id="body" part="body"><slot></slot></div>${footer}`;
        return html `
      <slot name="trigger" @click=${this.onTriggerClick}></slot>
      ${this.inline
            ? html `<div class="panel inline" part="dialog" role="dialog" aria-labelledby="title" aria-describedby="body">${content}</div>`
            : html `<dialog class="panel" part="dialog" aria-labelledby="title" aria-describedby="body"
            @keydown=${this.onKeydown} @cancel=${this.onCancel} @close=${this.onNativeClose} @click=${this.onDialogClick}>${content}</dialog>`}
    `;
    }
};
ZdsDialog.styles = styles;
__decorate([
    property({ type: Boolean, reflect: true })
], ZdsDialog.prototype, "open", void 0);
__decorate([
    property({ type: String })
], ZdsDialog.prototype, "heading", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZdsDialog.prototype, "flavour", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZdsDialog.prototype, "shape", void 0);
__decorate([
    property({ type: Boolean, attribute: "show-footer", reflect: true, converter: defaultTrue })
], ZdsDialog.prototype, "showFooter", void 0);
__decorate([
    property({ type: Boolean, attribute: "show-close", reflect: true, converter: defaultTrue })
], ZdsDialog.prototype, "showClose", void 0);
__decorate([
    property({ type: String, attribute: "close-label" })
], ZdsDialog.prototype, "closeLabel", void 0);
__decorate([
    property({ type: String, attribute: "primary-label" })
], ZdsDialog.prototype, "primaryLabel", void 0);
__decorate([
    property({ type: String, attribute: "secondary-label" })
], ZdsDialog.prototype, "secondaryLabel", void 0);
__decorate([
    property({ type: String, attribute: "tertiary-label" })
], ZdsDialog.prototype, "tertiaryLabel", void 0);
__decorate([
    property({ type: Boolean, attribute: "keep-open-on-action" })
], ZdsDialog.prototype, "keepOpenOnAction", void 0);
__decorate([
    property({ type: Boolean, reflect: true, converter: defaultTrue })
], ZdsDialog.prototype, "dismissible", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZdsDialog.prototype, "inline", void 0);
__decorate([
    query("dialog")
], ZdsDialog.prototype, "dialogEl", void 0);
ZdsDialog = __decorate([
    customElement("zds-dialog")
], ZdsDialog);
export { ZdsDialog };
