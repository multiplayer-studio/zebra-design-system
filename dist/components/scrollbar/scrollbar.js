var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./scrollbar.styles.js";
const clamp01 = (n) => Math.min(1, Math.max(0, n));
/**
 * The scroll indicator for a region that clips its content. A padded gutter holds a pill handle whose position and
 * length mirror the scroll offset; hovering raises a track scrim so the grab target reads. The scrolling region, not
 * the bar, owns the behaviour: the element is presentational, takes no focus and fires no events — expose scrolling
 * through the region itself.
 *
 * `value` and `size` are code inputs the spec leaves to the implementation (Figma draws one sample). Size the bar to
 * the region's edge with `--scrollbar-length` (typically `100%`); unset, it draws at the sample length.
 *
 * @cssproperty --scrollbar-length - The bar's length along its axis. Defaults to the drawn sample (200px); set it to the scrolling region's edge.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6057-11947
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-scrollbar--docs
 */
let ZetaScrollbar = class ZetaScrollbar extends LitElement {
    constructor() {
        super();
        /** The axis the region scrolls. Vertical stands against the trailing edge; horizontal lies along the bottom. */
        this.orientation = "vertical";
        /** Where the handle sits: 0 is the start of the content, 1 the end. Code-only — Figma draws one sample. */
        this.value = 0;
        /** The handle's length as the viewport's share of the content, 0–1. Code-only; defaults to the drawn sample. */
        this.size = 0.32;
        this.internals = this.attachInternals();
        // Presentational: assistive technology reaches scrolling through the region, not the bar.
        this.internals.role = "none";
    }
    connectedCallback() {
        super.connectedCallback?.();
        // Not in the constructor: a custom element must not gain attributes there.
        this.setAttribute("aria-hidden", "true");
    }
    willUpdate(changed) {
        if (changed.has("value"))
            this.style.setProperty("--_value", String(clamp01(this.value)));
        if (changed.has("size"))
            this.style.setProperty("--_size", String(clamp01(this.size)));
    }
    render() {
        return html `<span class="track"></span><span class="rail"><span class="handle"></span></span>`;
    }
    static { this.styles = styles; }
};
__decorate([
    property({ type: String, reflect: true })
], ZetaScrollbar.prototype, "orientation", void 0);
__decorate([
    property({ type: Number })
], ZetaScrollbar.prototype, "value", void 0);
__decorate([
    property({ type: Number })
], ZetaScrollbar.prototype, "size", void 0);
ZetaScrollbar = __decorate([
    customElement("zeta-scrollbar")
], ZetaScrollbar);
export { ZetaScrollbar };
//# sourceMappingURL=scrollbar.js.map