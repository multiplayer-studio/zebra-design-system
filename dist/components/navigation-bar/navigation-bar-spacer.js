var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./navigation-bar-spacer.styles.js";
import "../divider/divider.js";
/**
 * Splits a Navigation Bar's items into groups: with `distribution="start"`
 * the bar gives it all free space, pushing the items after it to the end.
 * Replaces Figma's `spacer` variant + Right Slot (and its `showDivider`
 * axis) with one part placed where the split goes, so any number of groups
 * works. Decorative: the bar hides it from assistive tech.
 *
 * @spec specs/navigation-bar/navigation-bar.spec.json
 */
let ZdsNavigationBarSpacer = class ZdsNavigationBarSpacer extends LitElement {
    constructor() {
        super(...arguments);
        /**
         * Draws a vertical rule in the gap. Figma's Spacer has this boolean but it
         * is wired to nothing, so its divider always shows (spec issue) — wired
         * here. Defaults to false to match the bar's own `showDivider` default.
         */
        this.showDivider = false;
    }
    render() {
        return this.showDivider ? html `<zds-divider orientation="vertical"></zds-divider>` : nothing;
    }
};
ZdsNavigationBarSpacer.styles = styles;
__decorate([
    property({ type: Boolean, reflect: true, attribute: "show-divider" })
], ZdsNavigationBarSpacer.prototype, "showDivider", void 0);
ZdsNavigationBarSpacer = __decorate([
    customElement("zds-navigation-bar-spacer")
], ZdsNavigationBarSpacer);
export { ZdsNavigationBarSpacer };
