var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./tab-bar.styles.js";
export * from "./tab-item/tab-item.js";
/** A row of tabs for switching between views at the same level. `flavor="full-width"` divides the row between the
 * tabs; `condensed` hugs them, for a bar that shares a row with other content.
 *
 * Choosing a tab selects it and fires `change`; exactly one tab is selected. The selected tab is the tab stop, and the
 * arrow keys, Home and End move between tabs and select as they go.
 *
 * @cssproperty --tab-bar-background The background colour of the tab bar.
 * @slot - The zeta-tab-items.
 * @event change - A tab was chosen; `detail.index` is its position and `detail.tab` the element.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=3607-237
 * @storybook ?path=/docs/components-tab-bar--docs
 */
let ZetaTabBar = class ZetaTabBar extends LitElement {
    constructor() {
        super();
        /** Full width divides the row; condensed hugs the tabs (spec: flavour). */
        this.flavor = "full-width";
        this.internals = this.attachInternals();
        /** Makes the selected tab (or the first enabled one) the only tab stop. */
        this.syncTabStops = () => {
            const tabs = this.tabs;
            const current = tabs.find(t => t.isSelected && !t.disabled) ?? this.enabled[0];
            for (const t of tabs)
                t.tabIndex = t === current ? 0 : -1;
        };
        this.onClick = (e) => {
            const tab = e.target.closest?.("zeta-tab-item");
            if (tab && tab.parentElement === this)
                this.select(tab);
        };
        this.onKeyDown = (e) => {
            const tabs = this.enabled;
            const i = tabs.indexOf(e.target);
            if (i < 0)
                return;
            const next = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: tabs.length - 1 };
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                this.select(tabs[i]);
                return;
            }
            if (!(e.key in next))
                return;
            e.preventDefault();
            const n = (next[e.key] + tabs.length) % tabs.length;
            this.select(tabs[n], true);
        };
        this.internals.role = "tablist";
        this.addEventListener("click", this.onClick);
        this.addEventListener("keydown", this.onKeyDown);
    }
    get tabs() {
        return Array.from(this.querySelectorAll(":scope > zeta-tab-item"));
    }
    get enabled() {
        return this.tabs.filter(t => !t.disabled);
    }
    select(tab, focus = false) {
        if (tab.disabled)
            return;
        const was = tab.isSelected;
        for (const t of this.tabs) {
            t.selected = t === tab;
            t.active = false;
        }
        this.syncTabStops();
        if (focus)
            tab.focus();
        if (!was)
            this.dispatchEvent(new CustomEvent("change", { detail: { index: this.tabs.indexOf(tab), tab }, bubbles: true, composed: true }));
    }
    firstUpdated(_changed) {
        this.syncTabStops();
    }
    render() {
        return html `<slot @slotchange=${this.syncTabStops}></slot>`;
    }
    static { this.styles = [super.styles ?? [], styles]; }
};
__decorate([
    property({ type: String, reflect: true })
], ZetaTabBar.prototype, "flavor", void 0);
ZetaTabBar = __decorate([
    customElement("zeta-tab-bar")
], ZetaTabBar);
export { ZetaTabBar };
//# sourceMappingURL=tab-bar.js.map