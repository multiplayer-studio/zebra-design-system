import { LitElement, html, nothing, type PropertyValues } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./checkbox.styles.js";
import "../icon/icon.js";

export type CheckboxSize = "medium" | "large";

/**
 * A square control for turning a single option on or off, with an optional
 * label beside it. Checked carries three values rather than two, so a
 * checkbox that summarises a set of others can say indeterminate instead of
 * guessing between on and off. Reach for it wherever options are independent
 * of each other, and reach for `<zds-radio>` where exactly one of a set has
 * to win.
 *
 * The spec's one Checked axis (false / true / indeterminate) maps to the
 * native-compatible pair `checked` + `indeterminate`; they never show at
 * once: indeterminate wins, and toggling clears it. Indeterminate is set
 * from the state of the children and read back, never chosen; it is exposed
 * as `aria-checked="mixed"`.
 *
 * The host is the control: `role="checkbox"` and `aria-checked` come through
 * ElementInternals, and it is form-associated, so it submits `value` under
 * `name` when checked, like a native checkbox. The whole 40 square target is
 * pressable, and the label extends it.
 *
 * @slot - The label (the spec's hasLabel / Label). Leave it empty only when
 *   the option is named another way, e.g. `aria-label`.
 * @fires change - The user toggled it. Read `checked`.
 * @fires input - Same moment as `change`, as on a native checkbox.
 * @csspart box - The box.
 *
 * @spec specs/checkbox/checkbox.spec.json
 */
@customElement("zds-checkbox")
export class ZdsCheckbox extends LitElement {
  static styles = styles;
  static formAssociated = true;

  /** On or off. */
  @property({ type: Boolean, reflect: true }) checked = false;

  /** Neither on nor off — a parent of a partly checked set. Cleared when the user toggles it. */
  @property({ type: Boolean, reflect: true }) indeterminate = false;

  /** Not interactive. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** Must be checked for the form to submit. */
  @property({ type: Boolean, reflect: true }) required = false;

  /** The box's size. The touch target and the label's type stay the same. */
  @property({ type: String, reflect: true }) size: CheckboxSize = "large";

  /** Field name submitted with a form. */
  @property({ type: String }) name: string | null = null;

  /** Value submitted when checked. */
  @property({ type: String }) value = "on";

  private readonly internals: ElementInternals;
  private defaultChecked = false;

  constructor() {
    super();
    this.internals = this.attachInternals();
    this.internals.role = "checkbox";
    this.addEventListener("click", () => this.toggle());
    this.addEventListener("keydown", (e) => {
      if (e.key === " ") e.preventDefault();
    });
    // Space acts on release, as on a native checkbox.
    this.addEventListener("keyup", (e) => {
      if (e.key === " ") this.toggle();
    });
  }

  connectedCallback() {
    super.connectedCallback();
    this.defaultChecked = this.checked;
  }

  protected updated(changed: PropertyValues<this>) {
    if (changed.has("checked") || changed.has("indeterminate")) {
      this.internals.ariaChecked = this.indeterminate ? "mixed" : String(this.checked);
    }
    if (changed.has("disabled")) {
      this.internals.ariaDisabled = this.disabled ? "true" : null;
      this.tabIndex = this.disabled ? -1 : 0;
    }
    if (changed.has("required")) this.internals.ariaRequired = this.required ? "true" : null;
    this.internals.setFormValue(this.checked ? this.value : null);
    this.internals.setValidity(
      this.required && !this.checked ? { valueMissing: true } : {},
      this.required && !this.checked ? "Check this box to continue." : "",
    );
  }

  /** Toggle, as the user would. */
  toggle() {
    if (this.disabled) return;
    this.checked = !this.checked;
    this.indeterminate = false;
    this.dispatchEvent(new Event("input", { bubbles: true, composed: true }));
    this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
  }

  formResetCallback() {
    this.checked = this.defaultChecked;
    this.indeterminate = false;
  }

  formDisabledCallback(disabled: boolean) {
    this.disabled = disabled;
  }

  protected render() {
    // The mark is drawn in the box's own pinned family (rounded); colour
    // comes from .box via currentColor.
    // The mark exists only when there is something to show (spec: present
    // only when Checked is true or indeterminate).
    const glyph = this.indeterminate ? "remove" : this.checked ? "check-mark" : null;
    const mark = glyph ? html`<zds-icon class="mark" name=${glyph} .iconStyle=${"rounded"}></zds-icon>` : nothing;
    return html`<span class="target"><span part="box" class="box">${mark}</span></span><span class="label"><slot></slot></span>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zds-checkbox": ZdsCheckbox;
  }
}
