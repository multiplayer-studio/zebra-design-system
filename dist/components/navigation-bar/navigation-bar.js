var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _ZdsNavigationBar_onItemsChange, _ZdsNavigationBar_onActionChange, _ZdsNavigationBar_onKeydown;
import { LitElement, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import styles from "./navigation-bar.styles.js";
import "../divider/divider.js";
/**
 * A horizontal bar of top-level destinations, pinned to one edge of a view.
 *
 * Renders a `<nav>` landmark holding a list: each slotted
 * `<zds-navigation-item>` gets `role="listitem"`, each
 * `<zds-navigation-bar-spacer>` is hidden from assistive tech. Every item
 * stays in the Tab order (they are links, not toolbar buttons, so roving
 * tabindex would hide destinations from Tab users); Left/Right arrows also
 * move between items, without wrapping, matching the React package's Base UI
 * NavigationMenu.
 *
 * It has no fill — only a top border — so it takes the surface behind it.
 *
 * @slot - NavigationItem elements, optionally split into groups by `zds-navigation-bar-spacer`.
 * @slot action - A call to action at the end that is not a destination — normally one `zds-button`. Replaces Figma's `showActionSlot`.
 * @part nav - The `<nav>` element.
 * @part list - The item row (`role="list"`).
 * @part action - The action slot's wrapper.
 *
 * @spec specs/navigation-bar/navigation-bar.spec.json
 */
let ZdsNavigationBar = class ZdsNavigationBar extends LitElement {
    constructor() {
        super(...arguments);
        /** Accessible name of the `<nav>` landmark. Name it when a page has more than one. */
        this.label = "Main";
        /** How the items are arranged across the width. */
        this.distribution = "start";
        /**
         * A vertical rule before the action. Figma draws it only in the
         * spacer + showDivider variant and never documents it (spec issue); in
         * code it is independent.
         */
        this.actionDivider = false;
        this.hasAction = false;
        _ZdsNavigationBar_onItemsChange.set(this, (e) => {
            for (const el of e.target.assignedElements()) {
                if (el.localName === "zds-navigation-item")
                    el.setAttribute("role", "listitem");
                else if (el.localName === "zds-navigation-bar-spacer")
                    el.setAttribute("aria-hidden", "true");
            }
        });
        _ZdsNavigationBar_onActionChange.set(this, (e) => {
            this.hasAction = e.target.assignedNodes({ flatten: true }).some((n) => n.nodeType === Node.ELEMENT_NODE || (n.textContent ?? "").trim() !== "");
        });
        /** Left/Right move focus between enabled items, without wrapping (mirrors Base UI's composite list). */
        _ZdsNavigationBar_onKeydown.set(this, (e) => {
            if (e.key !== "ArrowLeft" && e.key !== "ArrowRight")
                return;
            const slot = this.renderRoot.querySelector("slot:not([name])");
            const items = (slot?.assignedElements() ?? []).filter((el) => el.localName === "zds-navigation-item" && !el.disabled);
            const current = items.findIndex((el) => e.composedPath().includes(el));
            if (current < 0)
                return;
            const rtl = getComputedStyle(this).direction === "rtl";
            const step = (e.key === "ArrowRight") !== rtl ? 1 : -1;
            const next = items[current + step];
            e.preventDefault();
            next?.focus();
        });
    }
    render() {
        return html `<nav part="nav" class="nav" aria-label=${this.label}>
      <div part="list" class="list" role="list" @keydown=${__classPrivateFieldGet(this, _ZdsNavigationBar_onKeydown, "f")}>
        <slot @slotchange=${__classPrivateFieldGet(this, _ZdsNavigationBar_onItemsChange, "f")}></slot>
      </div>
      ${this.hasAction && this.actionDivider
            ? html `<div class="divider-section" aria-hidden="true"><zds-divider orientation="vertical"></zds-divider></div>`
            : nothing}
      <div part="action" class="action" ?hidden=${!this.hasAction}>
        <slot name="action" @slotchange=${__classPrivateFieldGet(this, _ZdsNavigationBar_onActionChange, "f")}></slot>
      </div>
    </nav>`;
    }
};
_ZdsNavigationBar_onItemsChange = new WeakMap();
_ZdsNavigationBar_onActionChange = new WeakMap();
_ZdsNavigationBar_onKeydown = new WeakMap();
ZdsNavigationBar.styles = styles;
__decorate([
    property({ type: String })
], ZdsNavigationBar.prototype, "label", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZdsNavigationBar.prototype, "distribution", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: "action-divider" })
], ZdsNavigationBar.prototype, "actionDivider", void 0);
__decorate([
    state()
], ZdsNavigationBar.prototype, "hasAction", void 0);
ZdsNavigationBar = __decorate([
    customElement("zds-navigation-bar")
], ZdsNavigationBar);
export { ZdsNavigationBar };
