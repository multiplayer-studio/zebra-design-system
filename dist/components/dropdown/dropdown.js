var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import styles from "./dropdown.styles.js";
import "../dropdown-menu/dropdown-menu.js";
/**
 * A pattern, not a single visual component: a trigger paired with a
 * `zds-dropdown-menu` positioned relative to it. `open` shows or hides the
 * menu, `position` picks which side it opens on, and `align` pins which pair
 * of edges line up (spec: "Align pins opposite edges together" — with
 * Position bottom/top the menu's left/right edge lines up with the
 * trigger's, with Position left/right its top/bottom edge does).
 *
 * Composition: the spec's own anatomy nests the Dropdown Menu instance
 * *inside* the template, pinned to `Rounded=true` and exposed so its slot is
 * reachable from outside ("Menu content goes into the nested menu's slot,
 * not the template"). This element mirrors that rather than asking a
 * consumer to place a `zds-dropdown-menu` themselves: the trigger goes in the
 * named `trigger` slot, and everything else — `zds-menu-item` rows — goes in
 * the default slot, which this element forwards into its own internal
 * `zds-dropdown-menu`. `rounded` is exposed here (defaulting `true`, matching
 * the spec's pinned value) so a consumer can still opt into square corners
 * without reaching into the panel directly.
 *
 * Positioning is pure CSS: `.panel` is `position: absolute` against `:host`
 * (`position: relative`, already hugging just the trigger per the spec), with
 * one rule per `position` value setting the matching offset (`top: 100%` for
 * `bottom`, cleared by `--space-sm` — 8px, matching the spec's stated fixed
 * gap) and one rule per applicable `position`×`align` pair pinning the
 * cross-axis edge — see dropdown.styles.ts. No `getBoundingClientRect`, no
 * resize/scroll listeners, no `position: fixed` viewport math.
 *
 * An earlier version used `position: fixed` plus JS-computed `top`/`left` in
 * viewport coordinates, recomputed on open/resize/scroll. That broke
 * specifically on Storybook's Docs page: Docs wraps each embedded story in a
 * zoomable/scaled preview frame, and `position: fixed` resolves against
 * whichever ancestor introduces a `transform` (the zoom's scale), not the
 * viewport — so JS math done in true viewport coordinates landed the panel
 * somewhere that transformed frame never painted it, and the menu appeared
 * not to open at all there even though the same story rendered correctly in
 * Canvas (no transformed ancestor). Anchoring to `:host` with plain CSS
 * offsets has no viewport coordinate to get wrong in the first place, so the
 * whole bug class doesn't apply.
 *
 * No collision detection: the spec itself says flipping `position` near a
 * viewport edge is the implementation's job ("nothing here stops it opening
 * off-screen... is the implementation's job"), and this is an intentional,
 * documented scope reduction versus the React sibling package's Base UI Menu
 * (which gets that for free from floating-ui) rather than an oversight.
 *
 * @slot trigger - The control the menu opens from (a `zds-button` by
 *   default per the spec, but anything focusable works).
 * @slot - The menu's rows, forwarded into the internal `zds-dropdown-menu`.
 * @fires open-change - The open state changed, `{ open: boolean }`.
 * @part panel - The internal `zds-dropdown-menu`.
 *
 * @spec specs/dropdown/dropdown.spec.json
 */
let ZdsDropdown = class ZdsDropdown extends LitElement {
    constructor() {
        super(...arguments);
        /** Shows or hides the menu. The menu stays in the DOM either way, so slotted content is kept. */
        this.open = false;
        /** Which side of the trigger the menu opens on. */
        this.position = "bottom";
        /** Which pair of edges line up between the trigger and the menu. Only meaningful for the axis `position` doesn't already fix. */
        this.align = "left";
        /** Corner treatment of the internal panel. Matches the spec's pinned `Rounded=true`. */
        this.rounded = true;
        /** Tightens the internal panel's inset for a cramped rail. */
        this.compact = false;
        this.onDocumentPointerDown = (e) => {
            if (!this.open)
                return;
            if (e.composedPath().includes(this))
                return;
            this.close();
        };
        this.onDocumentKeydown = (e) => {
            if (!this.open)
                return;
            if (e.key === "Escape") {
                e.stopPropagation();
                this.close();
            }
        };
        // Lit's `updated()` fires on the very first render too, with every
        // property present in `changed` (since each transitioned from "unset").
        // Without this flag, mounting with the default `open=false` would fire a
        // spurious `open-change` event before anything actually happened.
        this.hasRenderedOnce = false;
        this.onTriggerClick = () => {
            this.open = !this.open;
        };
    }
    connectedCallback() {
        super.connectedCallback();
        // Click-outside and Escape only need to matter while open, but they're
        // cheap to keep attached for the component's whole lifetime and it
        // avoids an add/remove dance every time `open` flips.
        document.addEventListener("pointerdown", this.onDocumentPointerDown, true);
        document.addEventListener("keydown", this.onDocumentKeydown, true);
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        document.removeEventListener("pointerdown", this.onDocumentPointerDown, true);
        document.removeEventListener("keydown", this.onDocumentKeydown, true);
    }
    updated(changed) {
        const isFirstRender = !this.hasRenderedOnce;
        this.hasRenderedOnce = true;
        if (!changed.has("open") || isFirstRender)
            return;
        this.dispatchEvent(new CustomEvent("open-change", { detail: { open: this.open }, bubbles: true, composed: true }));
        if (!this.open)
            this.returnFocusToTrigger();
    }
    getTrigger() {
        const assigned = this.triggerSlotEl?.assignedElements({ flatten: true });
        return assigned?.[0] ?? null;
    }
    returnFocusToTrigger() {
        this.getTrigger()?.focus?.();
    }
    close() {
        this.open = false;
    }
    render() {
        return html `
      <span class="trigger" @click=${this.onTriggerClick}>
        <slot name="trigger"></slot>
      </span>
      <zds-dropdown-menu part="panel" class="panel" ?rounded=${this.rounded} ?compact=${this.compact} ?hidden=${!this.open}>
        <slot></slot>
      </zds-dropdown-menu>
    `;
    }
};
ZdsDropdown.styles = styles;
__decorate([
    property({ type: Boolean, reflect: true })
], ZdsDropdown.prototype, "open", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZdsDropdown.prototype, "position", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZdsDropdown.prototype, "align", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZdsDropdown.prototype, "rounded", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZdsDropdown.prototype, "compact", void 0);
__decorate([
    query("slot[name='trigger']")
], ZdsDropdown.prototype, "triggerSlotEl", void 0);
ZdsDropdown = __decorate([
    customElement("zds-dropdown")
], ZdsDropdown);
export { ZdsDropdown };
