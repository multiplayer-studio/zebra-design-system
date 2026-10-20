import { LitElement, html, nothing, type PropertyValues } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./switch.styles.js";
import "../icon/icon.js";
import type { IconName } from "@zebra-design-system/icons/names";

/**
 * A single on or off toggle, a track with a thumb slider that switches
 * between its two ends.
 *
 * The host element *is* the control: it carries `role="switch"` and
 * `aria-checked` through ElementInternals and is form-associated, so a native
 * `<label for>` names it ("[label], switch, on") and clicking that label
 * toggles it — exactly as it would a checkbox. Space and Enter toggle it from
 * the keyboard.
 *
 * Mapping from the spec's Figma API:
 * - `Switch` on/off → `checked`. A two-value enum is a boolean in code (spec
 *   note on `api`).
 * - `State` → not a property. `disabled` is `disabled`; `focus` comes from
 *   keyboard focus (`:focus-visible`), never from an attribute.
 * - `hasIcons` → whether any glyph is set. The icon slots are swap-only in
 *   Figma (spec `internalVariations`); here they are `onIcon` (the start
 *   slot, uncovered while checked) and `offIcon` (the end slot, uncovered
 *   while unchecked). Leave both unset for a plain track and thumb.
 *
 * Theming: every colour is a semantic token, so an `.ext-*` / `.mode-*` class
 * on any ancestor re-themes the switch with no JavaScript.
 *
 * @fires input - The user toggled the switch. Fires before `change`, as on a native checkbox.
 * @fires change - The user toggled the switch. Read `checked` for the new value.
 * @csspart track - The track behind the thumb.
 * @csspart thumb - The sliding thumb.
 *
 * @spec specs/switch/switch.spec.json
 */
@customElement("zds-switch")
export class ZdsSwitch extends LitElement {
  static styles = styles;
  static formAssociated = true;

  /** On or off. Reflects, so `:host([checked])` drives the styles. */
  @property({ type: Boolean, reflect: true }) checked = false;

  /** The switch can't be toggled. Say why nearby when it isn't obvious. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** Glyph in the start slot, shown while the switch is on. Pair it with `offIcon` so the two communicate the state. */
  @property({ type: String, attribute: "on-icon" }) onIcon: IconName | null = null;

  /** Glyph in the end slot, shown while the switch is off. */
  @property({ type: String, attribute: "off-icon" }) offIcon: IconName | null = null;

  /** Field name submitted with a form. */
  @property({ type: String }) name: string | null = null;

  /** Value submitted with a form while checked. Nothing is submitted while unchecked, as with a checkbox. */
  @property({ type: String }) value = "on";

  /**
   * Accessible name, for when no `<label for>` or `aria-labelledby` points at
   * the switch. Switch has no visible label part of its own.
   */
  @property({ type: String }) label: string | null = null;

  private readonly internals: ElementInternals;
  private defaultChecked = false;
  /** Set on the first user toggle so the initial render never animates. */
  private interacted = false;

  constructor() {
    super();
    this.internals = this.attachInternals();
    this.internals.role = "switch";
    this.addEventListener("click", this.onClick);
    this.addEventListener("keydown", this.onKeyDown);
  }

  connectedCallback() {
    super.connectedCallback();
    this.defaultChecked = this.checked;
  }

  protected updated(changed: PropertyValues<this>) {
    if (changed.has("checked") || changed.has("value") || changed.has("name")) {
      this.internals.ariaChecked = String(this.checked);
      this.internals.setFormValue(this.checked ? this.value : null);
    }
    if (changed.has("disabled")) {
      this.internals.ariaDisabled = this.disabled ? "true" : null;
      if (this.disabled) this.removeAttribute("tabindex");
      else this.tabIndex = 0;
    }
    if (changed.has("label")) this.internals.ariaLabel = this.label;
  }

  /** Called by the browser when a containing `<form>` resets. */
  formResetCallback() {
    this.checked = this.defaultChecked;
  }

  /** Called by the browser when a containing `<fieldset disabled>` changes. */
  formDisabledCallback(disabled: boolean) {
    this.disabled = disabled;
  }

  private toggle() {
    if (this.disabled) return;
    this.interacted = true;
    this.checked = !this.checked;
    this.dispatchEvent(new Event("input", { bubbles: true, composed: true }));
    this.dispatchEvent(new Event("change", { bubbles: true }));
  }

  private readonly onClick = () => this.toggle();

  private readonly onKeyDown = (e: KeyboardEvent) => {
    // Space toggles; Enter may also toggle (spec accessibility guidelines).
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      this.toggle();
    }
  };

  protected render() {
    // Rounded is the family the spec pins (Style=rounded on both slots). Size
    // is the nested Icon's own medium variant, also pinned — never a token on
    // Switch. Colour is inherited from .icons (currentColor).
    return html`
      <span part="track" class="track ${this.interacted ? "animated" : ""}">
        ${this.onIcon || this.offIcon
          ? html`<span class="icons">
              <span class="slot">${this.onIcon
                ? html`<zds-icon name=${this.onIcon} size="medium" .iconStyle=${"rounded"}></zds-icon>`
                : nothing}</span>
              <span class="slot">${this.offIcon
                ? html`<zds-icon name=${this.offIcon} size="medium" .iconStyle=${"rounded"}></zds-icon>`
                : nothing}</span>
            </span>`
          : nothing}
        <span part="thumb" class="thumb"></span>
        <span class="ring"></span>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zds-switch": ZdsSwitch;
  }
}
