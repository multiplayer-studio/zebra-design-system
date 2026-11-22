var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./collapsible-card.styles.js";
import "../icon/icon.js";
/**
 * A card whose body opens and closes behind a header that is always
 * visible. The header carries a title, a description, and a leading chevron
 * that flips with the expanded state.
 *
 * Figma's own file doesn't actually wire the chevron to State (spec issue —
 * the nested header instance is identical between collapsed and expanded in
 * every variant); this element implements the metadata's stated intent
 * instead of that gap, since a chevron that doesn't move defeats the
 * disclosure affordance.
 *
 * The toggle target, its focus handling and its keyboard behaviour are this
 * element's own responsibility (a native `button`), since Figma models none
 * of them. `expanded` reflects, so it can be set or read like a native
 * `<details>` element; toggling fires a bubbling, composed `toggle` event.
 *
 * @slot - The body, revealed only while expanded.
 * @fires toggle - The expanded state changed.
 * @part header - The header button.
 * @part body - The body wrapper.
 *
 * @spec specs/card/card.spec.json
 */
let ZdsCollapsibleCard = class ZdsCollapsibleCard extends LitElement {
    constructor() {
        super(...arguments);
        /** Corner treatment. */
        this.shape = "sharp";
        /** Plain, or outlined with the brand gradient to draw the eye. Use gradient for at most one card in a group. */
        this.flavor = "default";
        /** The title, always visible in the header. */
        this.heading = null;
        /** Marks the heading as required with a trailing asterisk. */
        this.required = true;
        /**
         * Supporting text under the heading. Figma's header now has a real
         * `showDescription` toggle (default true) for this — this element derives
         * the same thing from whether `description` was set, rather than adding a
         * second property to keep in sync with it.
         */
        this.description = null;
        /** Whether the body is revealed. Reflects, so it can be read or set like `<details open>`. */
        this.expanded = false;
    }
    toggle() {
        this.expanded = !this.expanded;
        this.dispatchEvent(new CustomEvent("toggle", { detail: { expanded: this.expanded }, bubbles: true, composed: true }));
    }
    render() {
        // The icon follows the card's shape, matching Button's own convention.
        const iconStyle = this.shape === "sharp" ? "sharp" : "rounded";
        return html `
      <button type="button" part="header" class="header" aria-expanded=${this.expanded} @click=${this.toggle}>
        <!-- expand-more's own glyph sits high in its box with dead space
             below, which reads as top-aligned no matter how the box itself
             is centered; chevron-right is optically centered, so it's
             rotated instead of swapping glyphs on toggle. -->
        <zds-icon class="chevron" name="chevron-right" .iconStyle=${iconStyle} size="large" ?expanded=${this.expanded}></zds-icon>
        <span class="text">
          <span class="heading"
            >${this.heading}${this.required ? html `<span class="required" aria-hidden="true"> *</span>` : nothing}</span
          >
          ${this.description ? html `<span class="description">${this.description}</span>` : nothing}
        </span>
      </button>
      ${this.expanded ? html `<div part="body" class="body"><slot></slot></div>` : nothing}
    `;
    }
};
ZdsCollapsibleCard.styles = styles;
__decorate([
    property({ type: String, reflect: true })
], ZdsCollapsibleCard.prototype, "shape", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZdsCollapsibleCard.prototype, "flavor", void 0);
__decorate([
    property({ type: String })
], ZdsCollapsibleCard.prototype, "heading", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZdsCollapsibleCard.prototype, "required", void 0);
__decorate([
    property({ type: String })
], ZdsCollapsibleCard.prototype, "description", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZdsCollapsibleCard.prototype, "expanded", void 0);
ZdsCollapsibleCard = __decorate([
    customElement("zds-collapsible-card")
], ZdsCollapsibleCard);
export { ZdsCollapsibleCard };
