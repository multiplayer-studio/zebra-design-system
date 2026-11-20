var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from "lit";
import styles from "./icon-indicator.styles.js";
import { customElement, property } from "lit/decorators.js";
import "../icon/icon.js";
/** `--some-token` → `var(--some-token)`; anything else is used as written. */
const toCss = (v) => (v.startsWith("--") ? `var(${v})` : v);
/**
 * A small circular marker carrying a glyph, sized to sit beside text or on
 * its own. Size moves the circle and the glyph together. It names nothing, so
 * whatever it refers to has to be named beside it (or given with `label`).
 *
 * Defaults are the spec's: the Clock glyph on foreground/secondary, size
 * small. Beyond the spec, the host can set the glyph (`icon`) and both
 * colours (`fill`, `foreground`, or the `--zds-icon-indicator-fill` /
 * `-foreground` custom properties) — the owner's decision, recorded against
 * the spec's "fixed meaning" warn. Property beats CSS beats default.
 *
 * Glyph colour defaults to foreground/inverse, which flips with the fill.
 * Figma binds foreground/on-strong; the spec warns it measures 1.51:1 in dark
 * mode and names foreground/inverse as the fix.
 *
 * Decorative unless given `label`, which becomes its accessible name.
 *
 * @spec specs/badges/icon-indicator.spec.json
 */
let ZdsIconIndicator = class ZdsIconIndicator extends LitElement {
    constructor() {
        super(...arguments);
        /** The glyph. */
        this.icon = "clock";
        /** Circle colour: a CSS colour or a `--token` name. */
        this.fill = null;
        /** Glyph colour: a CSS colour or a `--token` name. Defaults to foreground/inverse. */
        this.foreground = null;
        this.size = "small";
        /** Accessible name. Without it the indicator is hidden from assistive tech. */
        this.label = null;
        this.owned = new Set();
    }
    willUpdate(changed) {
        // Set on the host, so a property overrides any inherited CSS value.
        // Only ever remove what this element set itself: a host's own inline
        // --zds-icon-indicator-* must survive the first render.
        this.applyColour(changed, "fill", "--zds-icon-indicator-fill");
        this.applyColour(changed, "foreground", "--zds-icon-indicator-foreground");
    }
    applyColour(changed, key, prop) {
        if (!changed.has(key))
            return;
        const value = this[key];
        if (value) {
            this.style.setProperty(prop, toCss(value));
            this.owned.add(prop);
        }
        else if (this.owned.delete(prop)) {
            this.style.removeProperty(prop);
        }
    }
    render() {
        return html `<span part="root" class="root" role=${this.label ? "img" : "presentation"} aria-label=${this.label ?? ""} aria-hidden=${this.label ? "false" : "true"}
      ><zds-icon name=${this.icon}></zds-icon
    ></span>`;
    }
};
ZdsIconIndicator.styles = styles;
__decorate([
    property({ type: String })
], ZdsIconIndicator.prototype, "icon", void 0);
__decorate([
    property({ type: String })
], ZdsIconIndicator.prototype, "fill", void 0);
__decorate([
    property({ type: String })
], ZdsIconIndicator.prototype, "foreground", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZdsIconIndicator.prototype, "size", void 0);
__decorate([
    property({ type: String })
], ZdsIconIndicator.prototype, "label", void 0);
ZdsIconIndicator = __decorate([
    customElement("zds-icon-indicator")
], ZdsIconIndicator);
export { ZdsIconIndicator };
