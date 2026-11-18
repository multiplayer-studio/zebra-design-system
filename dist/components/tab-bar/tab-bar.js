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
var _ZdsTabBar_instances, _ZdsTabBar_sync, _ZdsTabBar_choose, _ZdsTabBar_onClick, _ZdsTabBar_onKeydown;
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./tab-bar.styles.js";
import "./tab-item.js";
const ARROWS = { ArrowRight: 1, ArrowLeft: -1 };
/**
 * A row of tabs for switching between views at the same level.
 *
 * The host is the `role="tablist"`; each slotted `<zds-tab-item>` is a
 * `role="tab"`. Matching the React package's Base UI Tabs: one tab stop on
 * the selected tab (roving tabindex), Left/Right move with wrap-around
 * (mirrored in RTL), Home/End jump to the ends, and focus selects as it
 * moves. Show the matching view yourself from `value`; the bar has no panels
 * (spec: tabs only).
 *
 * @slot - The tabs: `<zds-tab-item>` elements. Four is what Figma draws, not a limit.
 * @fires zds-value-change - The user chose another tab. `detail.value` is the new value.
 *
 * @spec specs/tab-bar/tab-bar.spec.json
 */
let ZdsTabBar = class ZdsTabBar extends LitElement {
    constructor() {
        super(...arguments);
        _ZdsTabBar_instances.add(this);
        /** `full-width` divides the row evenly; `condensed` lets each tab hug its content. */
        this.flavour = "full-width";
        /** The selected tab's value. Empty, or one naming no enabled tab, falls back to the first enabled tab. */
        this.value = "";
        /** Accessible name of the tab list, e.g. "Connection type". */
        this.label = null;
        /** Marks the selected tab and gives it the one tab stop. */
        _ZdsTabBar_sync.set(this, () => {
            const tabs = this.tabs;
            const enabled = tabs.filter((t) => !t.disabled);
            const chosen = enabled.find((t) => t.value === this.value) ?? enabled[0];
            if (chosen && chosen.value !== this.value)
                this.value = chosen.value;
            for (const t of tabs) {
                t.selected = t === chosen;
                t.tabIndex = t === chosen ? 0 : -1;
            }
        });
        _ZdsTabBar_onClick.set(this, (e) => {
            const tab = this.tabs.find((t) => e.composedPath().includes(t));
            if (tab)
                __classPrivateFieldGet(this, _ZdsTabBar_instances, "m", _ZdsTabBar_choose).call(this, tab);
        });
        _ZdsTabBar_onKeydown.set(this, (e) => {
            const tabs = this.tabs;
            const current = tabs.findIndex((t) => e.composedPath().includes(t));
            if (current < 0)
                return;
            let next;
            if (e.key === "Home")
                next = tabs.find((t) => !t.disabled);
            else if (e.key === "End")
                next = [...tabs].reverse().find((t) => !t.disabled);
            else if (e.key in ARROWS) {
                const rtl = getComputedStyle(this).direction === "rtl";
                const step = ARROWS[e.key] * (rtl ? -1 : 1);
                const n = tabs.length;
                for (let i = 1; i <= n && !next; i++) {
                    const t = tabs[(current + step * i + n * n) % n];
                    if (!t.disabled)
                        next = t;
                }
            }
            else if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                __classPrivateFieldGet(this, _ZdsTabBar_instances, "m", _ZdsTabBar_choose).call(this, tabs[current]);
                return;
            }
            else
                return;
            e.preventDefault();
            if (!next)
                return;
            next.focus();
            __classPrivateFieldGet(this, _ZdsTabBar_instances, "m", _ZdsTabBar_choose).call(this, next);
        });
    }
    connectedCallback() {
        super.connectedCallback();
        this.setAttribute("role", "tablist");
        this.addEventListener("click", __classPrivateFieldGet(this, _ZdsTabBar_onClick, "f"));
        this.addEventListener("keydown", __classPrivateFieldGet(this, _ZdsTabBar_onKeydown, "f"));
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener("click", __classPrivateFieldGet(this, _ZdsTabBar_onClick, "f"));
        this.removeEventListener("keydown", __classPrivateFieldGet(this, _ZdsTabBar_onKeydown, "f"));
    }
    updated(changed) {
        if (changed.has("label")) {
            if (this.label)
                this.setAttribute("aria-label", this.label);
            else
                this.removeAttribute("aria-label");
        }
        if (changed.has("value"))
            __classPrivateFieldGet(this, _ZdsTabBar_sync, "f").call(this);
    }
    render() {
        return html `<slot @slotchange=${__classPrivateFieldGet(this, _ZdsTabBar_sync, "f")}></slot>`;
    }
    get tabs() {
        return [...this.children].filter((el) => el.localName === "zds-tab-item");
    }
};
_ZdsTabBar_sync = new WeakMap();
_ZdsTabBar_onClick = new WeakMap();
_ZdsTabBar_onKeydown = new WeakMap();
_ZdsTabBar_instances = new WeakSet();
_ZdsTabBar_choose = function _ZdsTabBar_choose(tab) {
    if (tab.disabled || tab.value === this.value)
        return;
    this.value = tab.value;
    this.dispatchEvent(new CustomEvent("zds-value-change", { detail: { value: tab.value }, bubbles: true, composed: true }));
};
ZdsTabBar.styles = styles;
__decorate([
    property({ type: String, reflect: true })
], ZdsTabBar.prototype, "flavour", void 0);
__decorate([
    property({ type: String })
], ZdsTabBar.prototype, "value", void 0);
__decorate([
    property({ type: String })
], ZdsTabBar.prototype, "label", void 0);
ZdsTabBar = __decorate([
    customElement("zds-tab-bar")
], ZdsTabBar);
export { ZdsTabBar };
