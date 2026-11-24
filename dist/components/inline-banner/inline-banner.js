var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import styles from "./inline-banner.styles.js";
import "../icon/icon.js";
import "../icon-button/icon-button.js";
/** Slotted actions whose `shape` the banner sets. Anything else is slotted as-is. */
const SHAPED_TAGS = new Set(["ZDS-BUTTON", "ZDS-ICON-BUTTON"]);
/** The glyph follows Status (spec: anatomy statusIcon). */
const STATUS_ICON = {
    neutral: "lightbulb",
    info: "info",
    positive: "check-circle",
    warning: "warning",
    negative: "error",
};
/** Marks a slotted action the banner put into the Dark scope, so it only ever removes its own class. */
const DARK_MARK = "data-zds-inline-banner-dark";
/** A boolean attribute that defaults to true: present or "true" is on, "false" is off. */
const onUnlessFalse = { fromAttribute: (v) => v !== "false", toAttribute: (v) => String(v) };
/**
 * A status message placed inside the content it is about (a form, a card, a
 * panel), not pinned to the screen like `<zds-system-banner>`. It sits in the
 * flow at the width of its container.
 *
 * Five statuses, each in two appearances. solid: the strong feedback fill with
 * foreground/on-strong text, for the one message on a view that must be seen
 * now. subtle: the faint feedback tint with a status border and the status
 * colour on the glyph only, for context and guidance.
 *
 * On solid, Figma pins palette=Dark on the action slot and the dismiss so they
 * draw light on any fill. Slotted actions live in the light DOM, so the banner
 * puts `.mode-dark` on them. The dismiss lives in the shadow root, where the
 * document's mode classes can't reach, so on solid it maps its foreground to
 * foreground/on-strong instead; its hover scrim follows the page mode.
 *
 * The text keeps a 16rem minimum before the actions wrap beneath it (spec
 * gap: no size token). The description and the actions render when they are
 * set, which is the spec's showDescription and showActions. The title is
 * `heading` (a `title` attribute would also show the browser's tooltip).
 *
 * Announced politely (role=status); negative interrupts (role=alert).
 *
 * Kept in step with packages/react-baseui `InlineBanner`.
 *
 * @slot actions - The controls the message needs, normally one small `<zds-button>`: outline-subtle on subtle, outline-contrast on solid. The banner sets its shape.
 * @fires close - The dismiss was pressed. The product removes the banner.
 * @csspart banner - The banner surface.
 *
 * @spec specs/inline-banner/inline-banner.spec.json
 */
let ZdsInlineBanner = class ZdsInlineBanner extends LitElement {
    constructor() {
        super(...arguments);
        /** The status colour and glyph. */
        this.status = "info";
        /** solid interrupts; subtle informs. */
        this.appearance = "subtle";
        /** Corner shape. The actions and the dismiss take it too. */
        this.shape = "rounded";
        /** The headline: what happened. */
        this.heading = "";
        /** The supporting line: why, and what to do next. Shown when set. */
        this.description = "";
        /** Keeps the status glyph. `show-icon="false"` drops it. */
        this.showIcon = true;
        /** Shows the dismiss. */
        this.showClose = false;
        /** Accessible name for the dismiss control. */
        this.closeLabel = "Dismiss";
        this.hasActions = false;
    }
    onSlotChange(e) {
        this.hasActions = e.target.assignedElements().length > 0;
        this.syncActions();
    }
    updated(changed) {
        if (changed.has("shape") || changed.has("appearance"))
            this.syncActions();
    }
    syncActions() {
        const slot = this.renderRoot.querySelector('slot[name="actions"]');
        const solid = this.appearance === "solid";
        for (const el of slot?.assignedElements({ flatten: true }) ?? []) {
            if (solid && !el.classList.contains("mode-dark")) {
                el.classList.add("mode-dark");
                el.setAttribute(DARK_MARK, "");
            }
            if (!solid && el.hasAttribute(DARK_MARK)) {
                el.classList.remove("mode-dark");
                el.removeAttribute(DARK_MARK);
            }
            if (!SHAPED_TAGS.has(el.tagName))
                continue;
            const item = el;
            if (item.shape !== this.shape)
                item.shape = this.shape;
        }
    }
    dismiss() {
        this.dispatchEvent(new CustomEvent("close", { bubbles: true, composed: true }));
    }
    render() {
        return html `
      <div class="banner" part="banner" role=${this.status === "negative" ? "alert" : "status"}>
        ${this.showIcon ? html `<span class="glyph"><zds-icon name=${this.icon ?? STATUS_ICON[this.status]} size="medium"></zds-icon></span>` : nothing}
        <div class="content">
          <div class="text">
            <span class="title">${this.heading}</span>
            ${this.description ? html `<span class="description">${this.description}</span>` : nothing}
          </div>
          <div class="actions" ?hidden=${!this.hasActions}><slot name="actions" @slotchange=${this.onSlotChange}></slot></div>
        </div>
        ${this.showClose
            ? html `<zds-icon-button class="dismiss" flavour="subtle" shape=${this.shape} size="small" icon="close" label=${this.closeLabel} @click=${this.dismiss}></zds-icon-button>`
            : nothing}
      </div>
    `;
    }
};
ZdsInlineBanner.styles = styles;
__decorate([
    property({ type: String, reflect: true })
], ZdsInlineBanner.prototype, "status", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZdsInlineBanner.prototype, "appearance", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZdsInlineBanner.prototype, "shape", void 0);
__decorate([
    property({ type: String })
], ZdsInlineBanner.prototype, "heading", void 0);
__decorate([
    property({ type: String })
], ZdsInlineBanner.prototype, "description", void 0);
__decorate([
    property({ attribute: "show-icon", converter: onUnlessFalse })
], ZdsInlineBanner.prototype, "showIcon", void 0);
__decorate([
    property({ type: String })
], ZdsInlineBanner.prototype, "icon", void 0);
__decorate([
    property({ type: Boolean, attribute: "show-close" })
], ZdsInlineBanner.prototype, "showClose", void 0);
__decorate([
    property({ type: String, attribute: "close-label" })
], ZdsInlineBanner.prototype, "closeLabel", void 0);
__decorate([
    state()
], ZdsInlineBanner.prototype, "hasActions", void 0);
ZdsInlineBanner = __decorate([
    customElement("zds-inline-banner")
], ZdsInlineBanner);
export { ZdsInlineBanner };
