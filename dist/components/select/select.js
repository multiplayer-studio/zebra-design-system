var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, nothing } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import inputFieldStyles from "../input-field/input-field.styles.js";
import inputStyles from "../input/input.styles.js";
import { inputHintStyles, renderInputHint } from "../input/input-hint.js";
import styles from "./select.styles.js";
import "../icon/icon.js";
import "../caret-indicator/caret-indicator.js";
// Matches Base UI's default collision padding in the React sibling.
const COLLISION_PADDING = 5;
// How long typed characters accumulate into one typeahead search.
const TYPEAHEAD_MS = 500;
let uid = 0;
/**
 * The full select assembly: a label above, a Select Field in the middle and a
 * hint below, stacked and spaced as one unit. Opening it reveals a Dropdown
 * Menu of the options, overlaid below the field.
 *
 * @cssprop --zds-select-field-min-inline-size - The field's minimum width; Input Field's by default.
 * @cssprop --zds-select-list-min-inline-size - The list's minimum width; it is otherwise as wide as the field.
 *
 * Built from the package's parts: the field reuses Input Field's styles
 * (size, shape, flavour, state), the label and hint Input's, and the list
 * draws Dropdown Menu's panel and Menu Item's rows from the same tokens.
 * The rows are not `<zds-menu-item>` elements: those carry `role="menuitem"`
 * and their own focus inside their own shadow roots, and a listbox needs
 * `role="option"` rows an `aria-activedescendant` can reach.
 *
 * Behaviour is the WAI-ARIA select-only combobox: a `<button
 * role="combobox">` with `aria-haspopup="listbox"`, `aria-expanded`,
 * `aria-controls` and `aria-activedescendant`, over a `role="listbox"` of
 * `role="option"` rows with `aria-selected`. Focus stays on the field, so it
 * is where it started when the list closes.
 * - Closed: Enter, Space, ArrowDown, ArrowUp, Alt+ArrowDown, Home, End or a
 *   typed character opens it.
 * - Open: arrows, Home, End, PageUp/PageDown and typeahead move; Enter,
 *   Space or Alt+ArrowUp choose and close; Escape and Tab close.
 * This satisfies both metadata keyboard descriptions (spec issue 7:
 * Select's "Space or Enter" and Select Field's "Alt+Down or Enter"), and
 * follows Select's, the fuller one — as Base UI does in the React sibling.
 *
 * The list is a manual popover in the top layer, clear of any `overflow:
 * hidden` ancestor and still inside the theme cascade (it stays in this
 * shadow tree). It is as wide as the field, sits `--space-2xs` below it and
 * flips above only when there is no room below (spec issue 13).
 *
 * Form-associated: submits `value` under `name`; a required label makes an
 * empty value invalid.
 *
 * Kept in step with React `<Select>`.
 *
 * @fires zds-value-change - An option was chosen. `detail: { value: string | null }`.
 * @fires zds-open-change - The list opened or closed. `detail: { open: boolean }`.
 * @csspart label - The label row.
 * @csspart field - The field (the combobox button).
 * @csspart list - The list panel.
 * @csspart hint - The hint row.
 *
 * @spec specs/select/select.spec.json
 */
let ZdsSelect = class ZdsSelect extends LitElement {
    constructor() {
        super();
        /** The choices, in order. Each row is a Menu Item. As an attribute, JSON. */
        this.options = [];
        /** The chosen option's `value`; `null` for none. */
        this.value = null;
        /** Whether the list is open — the spec's Open. */
        this.open = false;
        /** Shown in the field while nothing is chosen. Not a label. */
        this.placeholder = "Select an option";
        /** The field's name, shown above it. Empty hides the label (Show Label). */
        this.label = "";
        /** Marker after the name: none, an asterisk (`required`) or `(optional)`. Mark whichever is the exception. */
        this.labelType = "default";
        /** Adds an information icon after the name (the label's Show Information). */
        this.information = false;
        /** Accessible name of the information icon. */
        this.informationLabel = "More information";
        /** Supporting line under the name, read as part of the field's description. Empty hides it; needs a `label` (Show Sub Label). */
        this.subLabel = "";
        /** Supporting line below the field; carries the reason when `state` is invalid. Empty hides it (Show Hint). */
        this.hint = "";
        /** Icon ahead of the hint (the hint's Show Icon). */
        this.hintIcon = true;
        /** One state across label, field and hint (spec issue 8: code owns the assembly state, as on Input). */
        this.state = "default";
        /** The value is shown but cannot be changed. Stays legible and in the tab order. */
        this.readonly = false;
        /** Form field name. */
        this.name = null;
        /** Field height; only `small` also reduces the text. */
        this.size = "medium";
        /** Field corners, as Input Field. The list is always rounded (spec issue 14). */
        this.shape = "rounded";
        /** `default` inside a form, `ghost` on a surface that already bounds it, `gradient` for a distinct interaction. */
        this.flavour = "default";
        /** Opens the list on the compact Dropdown Menu: a space/xs inset and no gap between rows, for a cramped spot. */
        this.compact = false;
        /** Fills the container's width. Without it the Select is a tentative 280px wide and narrows to fit, as Input. Input's `:host([block])` rule applies. */
        this.block = false;
        /** Glyph at the field's leading edge (hasLeading). A chosen option's own `icon` replaces it. */
        this.leadingIcon = null;
        /** Accessible name when there is no visible `label`. */
        this.accessibleLabel = null;
        /** Index of the highlighted row (the active descendant). */
        this.active = -1;
        /** How the highlight got there: keyboard draws Menu Item's focus, pointer its hover. */
        this.activeByKeyboard = false;
        this.idBase = `zds-select-${++uid}`;
        this.defaultValue = null;
        this.typed = "";
        this.onFocusOut = (e) => {
            if (this.renderRoot.contains(e.relatedTarget))
                return;
            this.setOpen(false);
        };
        this.onDocumentPointerDown = (e) => {
            if (!e.composedPath().includes(this))
                this.setOpen(false);
        };
        this.tracking = false;
        this.place = () => {
            const field = this.fieldEl;
            const list = this.listEl;
            if (!field || !list)
                return;
            const a = field.getBoundingClientRect();
            // The 4 Px under the field is --space-2xs, read at the list's place in the
            // cascade so a theme scope that changes the token moves it.
            const px = parseFloat(getComputedStyle(list).getPropertyValue("--space-2xs"));
            const gap = Number.isFinite(px) ? px : 4;
            const vh = document.documentElement.clientHeight;
            const pad = COLLISION_PADDING;
            list.style.width = `${a.width}px`;
            list.style.maxHeight = "";
            const h = list.scrollHeight;
            const below = vh - a.bottom - gap - pad;
            const above = a.top - gap - pad;
            // Below unless it does not fit and above has more room (Base UI's flip).
            const side = h <= below || below >= above ? "bottom" : "top";
            const room = Math.max(0, side === "bottom" ? below : above);
            list.style.maxHeight = `${room}px`;
            const shownH = Math.min(h, room);
            list.style.left = `${a.left}px`;
            list.style.top = `${side === "bottom" ? a.bottom + gap : a.top - gap - shownH}px`;
            list.dataset.side = side;
        };
        this.internals = this.attachInternals();
    }
    connectedCallback() {
        super.connectedCallback();
        this.defaultValue = this.value;
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.stopTracking();
        clearTimeout(this.typedTimer);
    }
    willUpdate(changed) {
        if (changed.has("open") && this.open) {
            // Opening highlights the chosen row; with none chosen, the first
            // enabled row from the keyboard and nothing from a pointer (as Base UI).
            if (this.active < 0)
                this.active = this.selectedIndex >= 0 ? this.selectedIndex : this.activeByKeyboard ? this.first() : -1;
        }
        if (changed.has("open") && !this.open)
            this.active = -1;
    }
    updated(changed) {
        if (changed.has("value"))
            this.internals.setFormValue(this.value);
        if (changed.has("value") || changed.has("labelType") || changed.has("state")) {
            const missing = this.labelType === "required" && !this.value && this.state !== "disabled";
            this.internals.setValidity(missing ? { valueMissing: true } : {}, missing ? "Select an option." : "", this.fieldEl);
        }
        this.syncPopover();
        if (this.open && (changed.has("active") || changed.has("open")))
            this.scrollActiveIntoView();
    }
    formResetCallback() { this.value = this.defaultValue; }
    formDisabledCallback(disabled) { this.state = disabled ? "disabled" : "default"; }
    formStateRestoreCallback(state) { this.value = state; }
    // ---- derived ------------------------------------------------------------
    get disabled() { return this.state === "disabled"; }
    get selectedIndex() { return this.options.findIndex((o) => o.value === this.value); }
    get chosen() { return this.options[this.selectedIndex] ?? null; }
    /** Input / Select's State, as the spec names it. Open outranks invalid, as focus does on Input Field. */
    get fieldState() {
        if (this.disabled)
            return "disabled";
        if (this.open)
            return "open";
        if (this.state === "invalid")
            return "invalid";
        if (this.readonly)
            return "read-only";
        return this.chosen ? "filled" : "enabled";
    }
    optionId(i) { return `${this.idBase}-option-${i}`; }
    /** The next enabled row from `from` in direction `dir`, stopping at the ends. */
    step(from, dir, count = 1) {
        let found = from;
        let i = from;
        while (count > 0) {
            i += dir;
            if (i < 0 || i >= this.options.length)
                break;
            if (!this.options[i].disabled) {
                found = i;
                count--;
            }
        }
        return found;
    }
    first() { return this.step(-1, 1); }
    last() { return this.step(this.options.length, -1); }
    // ---- state changes ------------------------------------------------------
    setOpen(next) {
        if (next && (this.disabled || this.readonly))
            return;
        if (next === this.open)
            return;
        this.open = next;
        this.dispatchEvent(new CustomEvent("zds-open-change", { detail: { open: next }, bubbles: true, composed: true }));
    }
    choose(i) {
        const opt = this.options[i];
        if (!opt || opt.disabled)
            return;
        if (opt.value !== this.value) {
            this.value = opt.value;
            this.dispatchEvent(new CustomEvent("zds-value-change", { detail: { value: opt.value }, bubbles: true, composed: true }));
        }
        this.setOpen(false);
    }
    highlight(i, keyboard) {
        this.active = i;
        this.activeByKeyboard = keyboard;
    }
    /** Typeahead: rows whose label starts with what has been typed, searching on from the current row. */
    typeahead(char) {
        clearTimeout(this.typedTimer);
        this.typedTimer = setTimeout(() => { this.typed = ""; }, TYPEAHEAD_MS);
        this.typed += char.toLowerCase();
        // One repeated character cycles through the rows starting with it.
        const query = [...this.typed].every((c) => c === this.typed[0]) ? this.typed[0] : this.typed;
        const start = this.open ? this.active : this.selectedIndex;
        const n = this.options.length;
        // A new single character searches on from the next row; a longer string
        // first re-checks the current one.
        const begin = query.length === 1 ? start + 1 : Math.max(start, 0);
        for (let k = 0; k < n; k++) {
            const i = (begin + k) % n;
            const o = this.options[i];
            if (!o.disabled && (o.label ?? o.value).toLowerCase().startsWith(query))
                return i;
        }
        return -1;
    }
    // ---- interaction --------------------------------------------------------
    onFieldClick() {
        this.activeByKeyboard = false;
        this.setOpen(!this.open);
    }
    onKeydown(e) {
        if (this.disabled)
            return;
        const { key } = e;
        if (!this.open) {
            if (this.readonly)
                return;
            if (key === "Enter" || key === " " || key === "ArrowDown" || key === "ArrowUp" || key === "Home" || key === "End") {
                e.preventDefault();
                // Home / End open on the first / last row; the rest on the chosen one.
                const target = key === "Home" ? this.first() : key === "End" ? this.last() : -1;
                this.activeByKeyboard = true;
                if (target >= 0)
                    this.highlight(target, true);
                this.setOpen(true);
                return;
            }
            if (key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey && key !== " ") {
                const i = this.typeahead(key);
                this.setOpen(true);
                if (i >= 0)
                    this.highlight(i, true);
            }
            return;
        }
        switch (key) {
            case "ArrowDown":
                e.preventDefault();
                this.highlight(this.active < 0 ? this.first() : this.step(this.active, 1), true);
                return;
            case "ArrowUp":
                e.preventDefault();
                if (e.altKey) {
                    this.choose(this.active);
                    return;
                }
                this.highlight(this.active < 0 ? this.last() : this.step(this.active, -1), true);
                return;
            case "Home":
                e.preventDefault();
                this.highlight(this.first(), true);
                return;
            case "End":
                e.preventDefault();
                this.highlight(this.last(), true);
                return;
            case "PageDown":
                e.preventDefault();
                this.highlight(this.step(this.active, 1, 10), true);
                return;
            case "PageUp":
                e.preventDefault();
                this.highlight(this.step(this.active, -1, 10), true);
                return;
            case "Enter":
            case " ":
                e.preventDefault();
                if (key === " " && this.typed) {
                    this.typeahead(" ");
                    return;
                } // a space inside a typed label
                if (this.active < 0)
                    this.setOpen(false);
                else
                    this.choose(this.active);
                return;
            case "Escape":
                e.preventDefault();
                e.stopPropagation();
                this.setOpen(false);
                return;
            case "Tab":
                this.setOpen(false);
                return;
        }
        if (key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
            const i = this.typeahead(key);
            if (i >= 0)
                this.highlight(i, true);
        }
    }
    // ---- positioning --------------------------------------------------------
    syncPopover() {
        const list = this.listEl;
        if (!list?.showPopover)
            return;
        const shown = list.matches(":popover-open");
        if (this.open && !shown) {
            list.showPopover();
            this.startTracking();
        }
        else if (!this.open && shown) {
            list.hidePopover();
            this.stopTracking();
        }
        if (this.open)
            this.place();
    }
    startTracking() {
        if (this.tracking)
            return;
        this.tracking = true;
        window.addEventListener("scroll", this.place, { capture: true, passive: true });
        window.addEventListener("resize", this.place, { passive: true });
        document.addEventListener("pointerdown", this.onDocumentPointerDown, true);
    }
    stopTracking() {
        if (!this.tracking)
            return;
        this.tracking = false;
        window.removeEventListener("scroll", this.place, { capture: true });
        window.removeEventListener("resize", this.place);
        document.removeEventListener("pointerdown", this.onDocumentPointerDown, true);
    }
    scrollActiveIntoView() {
        const row = this.renderRoot.querySelector(`#${this.optionId(this.active)}`);
        row?.scrollIntoView({ block: "nearest" });
    }
    // ---- render -------------------------------------------------------------
    renderLabel() {
        if (!this.label)
            return nothing;
        const row = html `<div part="label" class="label ${this.disabled ? "disabled" : ""}">
      <span class="name" id="${this.idBase}-name">${this.label}</span>
      ${this.labelType === "required" ? html `<span class="required" aria-hidden="true">*</span>` : nothing}
      ${this.labelType === "optional" ? html `<span class="optional">(optional)</span>` : nothing}
      ${this.information ? html `<zds-icon class="information" name="info" size="medium" .iconStyle=${"rounded"} label=${this.informationLabel}></zds-icon>` : nothing}
    </div>`;
        if (!this.subLabel)
            return row;
        // Input Label's root: the label row, then the sub label, space/xs apart.
        return html `<div class="label-group">${row}<span part="sub-label" id="${this.idBase}-sub" class="sub-label ${this.disabled ? "disabled" : ""}">${this.subLabel}</span></div>`;
    }
    renderOption(o, i) {
        const selected = o.value === this.value;
        const active = i === this.active;
        return html `<div role="option" id=${this.optionId(i)}
      class=${classMap({ item: true, selected, highlighted: active && !this.activeByKeyboard, "focus-visible": active && this.activeByKeyboard, disabled: !!o.disabled })}
      aria-selected=${selected ? "true" : "false"} aria-disabled=${o.disabled ? "true" : nothing}
      @pointermove=${() => { if (!o.disabled && (this.active !== i || this.activeByKeyboard))
            this.highlight(i, false); }}
      @click=${() => this.choose(i)}
    >
      ${o.icon ? html `<zds-icon class="item-leading" name=${o.icon} size="small" aria-hidden="true"></zds-icon>` : nothing}
      <span class="item-label">${o.label ?? o.value}</span>
      ${selected ? html `<zds-icon class="item-check" name="check-mark" size="small" .iconStyle=${"rounded"} aria-hidden="true"></zds-icon>` : nothing}
    </div>`;
    }
    render() {
        const st = this.fieldState;
        const chosen = this.chosen;
        const iconSize = this.size === "small" ? "small" : "medium";
        const shownIcon = chosen?.icon ?? this.leadingIcon;
        const hintType = this.disabled ? "disabled" : this.state === "invalid" ? "error" : "default";
        const nameId = `${this.idBase}-name`;
        const valueId = `${this.idBase}-value`;
        const hintId = `${this.idBase}-hint`;
        const listId = `${this.idBase}-list`;
        return html `
      ${this.renderLabel()}
      <button part="field" type="button" role="combobox"
        class=${classMap({ field: true, [st]: true })}
        aria-haspopup="listbox" aria-expanded=${this.open ? "true" : "false"} aria-controls=${listId}
        aria-activedescendant=${ifDefined(this.open && this.active >= 0 ? this.optionId(this.active) : undefined)}
        aria-labelledby=${ifDefined(this.label ? `${nameId} ${valueId}` : undefined)}
        aria-label=${ifDefined(this.label ? undefined : this.accessibleLabel ?? undefined)}
        aria-describedby=${ifDefined([this.label && this.subLabel ? `${this.idBase}-sub` : "", this.hint ? hintId : ""].filter(Boolean).join(" ") || undefined)}
        aria-invalid=${this.state === "invalid" ? "true" : "false"}
        aria-required=${this.labelType === "required" ? "true" : "false"}
        aria-readonly=${this.readonly ? "true" : "false"}
        ?disabled=${this.disabled}
        @click=${this.onFieldClick} @keydown=${this.onKeydown} @focusout=${this.onFocusOut}
      >
        ${shownIcon ? html `<zds-icon class="icon" name=${shownIcon} size=${iconSize} .iconStyle=${"rounded"} aria-hidden="true"></zds-icon>` : nothing}
        <span id=${valueId} class=${classMap({ value: true, placeholder: !chosen })}>${chosen ? chosen.label ?? chosen.value : this.placeholder}</span>
        <!-- One glyph turned, in place of Figma's expand-more / expand-less
             swap (spec issue 12, owner decision): the shared Caret Indicator
             at the field's icon size, on the field's text colour. -->
        <zds-caret-indicator class="chevron" direction="vertical" ?open=${this.open} size=${iconSize}></zds-caret-indicator>
      </button>
      ${this.hint ? renderInputHint(hintType, this.hint, this.hintIcon, hintId) : nothing}
      <!-- Spec issue 14: the Dropdown Menu is always Rounded=true. Pressing
           a row must not take focus off the field. -->
      <div part="list" class="list" id=${listId} role="listbox" popover="manual" tabindex="-1"
        aria-labelledby=${ifDefined(this.label ? nameId : undefined)} aria-label=${ifDefined(this.label ? undefined : this.accessibleLabel ?? undefined)}
        @pointerdown=${(e) => e.preventDefault()}
      >${this.options.map((o, i) => this.renderOption(o, i))}</div>`;
    }
};
// Input Field's, then Input's styles: the field and the label/hint render
// here with the same classes those elements use. Input's `:host` (the
// column stack) overrides Input Field's.
ZdsSelect.styles = [inputFieldStyles, inputStyles, inputHintStyles, styles];
ZdsSelect.formAssociated = true;
ZdsSelect.shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };
__decorate([
    property({ type: Array })
], ZdsSelect.prototype, "options", void 0);
__decorate([
    property({ type: String })
], ZdsSelect.prototype, "value", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZdsSelect.prototype, "open", void 0);
__decorate([
    property({ type: String })
], ZdsSelect.prototype, "placeholder", void 0);
__decorate([
    property({ type: String })
], ZdsSelect.prototype, "label", void 0);
__decorate([
    property({ type: String, reflect: true, attribute: "label-type" })
], ZdsSelect.prototype, "labelType", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZdsSelect.prototype, "information", void 0);
__decorate([
    property({ type: String, attribute: "information-label" })
], ZdsSelect.prototype, "informationLabel", void 0);
__decorate([
    property({ type: String, attribute: "sub-label" })
], ZdsSelect.prototype, "subLabel", void 0);
__decorate([
    property({ type: String })
], ZdsSelect.prototype, "hint", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: "hint-icon" })
], ZdsSelect.prototype, "hintIcon", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZdsSelect.prototype, "state", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZdsSelect.prototype, "readonly", void 0);
__decorate([
    property({ type: String })
], ZdsSelect.prototype, "name", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZdsSelect.prototype, "size", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZdsSelect.prototype, "shape", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZdsSelect.prototype, "flavour", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZdsSelect.prototype, "compact", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZdsSelect.prototype, "block", void 0);
__decorate([
    property({ type: String, attribute: "leading-icon" })
], ZdsSelect.prototype, "leadingIcon", void 0);
__decorate([
    property({ type: String, attribute: "accessible-label" })
], ZdsSelect.prototype, "accessibleLabel", void 0);
__decorate([
    state()
], ZdsSelect.prototype, "active", void 0);
__decorate([
    state()
], ZdsSelect.prototype, "activeByKeyboard", void 0);
__decorate([
    query(".field")
], ZdsSelect.prototype, "fieldEl", void 0);
__decorate([
    query(".list")
], ZdsSelect.prototype, "listEl", void 0);
ZdsSelect = __decorate([
    customElement("zds-select")
], ZdsSelect);
export { ZdsSelect };
