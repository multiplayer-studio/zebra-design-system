import { LitElement, css, html, type PropertyValues } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./radio.styles.js";

export type RadioSize = "medium" | "large";

/**
 * One option in a set where exactly one can be chosen. Use inside
 * `<zds-radio-group>`, which owns the value, the form name and the keyboard
 * model; a native radio can't group across shadow roots, so the group
 * element does it.
 *
 * The host is the control: `role="radio"` and `aria-checked` come through
 * ElementInternals. The label is the default slot — leave it empty (the
 * spec's hasLabel=false) only when the option is named another way, e.g.
 * `aria-label`.
 *
 * Built to the spec's intent where Figma can't express it: a disabled option
 * shows whether it is chosen (spec blocker), and focus is one outline (spec
 * warn "the focus ring is built two ways").
 *
 * @slot - The option's label.
 * @fires change - This option was chosen by the user.
 * @csspart ring - The ring.
 *
 * @spec specs/radio-button/radio-button.spec.json
 */
@customElement("zds-radio")
export class ZdsRadio extends LitElement {
  static styles = styles;

  /** Value submitted by the group when this option is chosen. */
  @property({ type: String }) value = "";

  /** Whether this option is the one chosen. Set by the group; set it directly only outside a group. */
  @property({ type: Boolean, reflect: true }) checked = false;

  /** Not interactive. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** The ring's size. The touch target and the label's type stay the same. */
  @property({ type: String, reflect: true }) size: RadioSize = "large";

  private readonly internals: ElementInternals;

  constructor() {
    super();
    this.internals = this.attachInternals();
    this.internals.role = "radio";
    this.addEventListener("click", () => this.choose());
    this.addEventListener("keydown", (e) => {
      if (e.key === " ") { e.preventDefault(); this.choose(); }
    });
  }

  connectedCallback() {
    super.connectedCallback();
    // Outside a group, the radio is its own tab stop.
    if (!this.closest("zds-radio-group") && !this.hasAttribute("tabindex")) this.tabIndex = this.disabled ? -1 : 0;
  }

  protected updated(changed: PropertyValues<this>) {
    if (changed.has("checked")) this.internals.ariaChecked = String(this.checked);
    if (changed.has("disabled")) this.internals.ariaDisabled = this.disabled ? "true" : null;
  }

  /** Choose this option, as the user would. */
  choose() {
    if (this.disabled || this.checked) return;
    this.checked = true;
    this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
  }

  protected render() {
    return html`<span class="target"><span part="ring" class="ring"><span class="dot"></span></span></span><span class="label"><slot></slot></span>`;
  }
}

/**
 * The group that makes exactly one `<zds-radio>` selectable: `role=
 * "radiogroup"`, one tab stop (the chosen option, or the first enabled one),
 * arrow keys move and select with wrap-around, and the chosen value is
 * submitted with a form under `name`. Grouping is "carried by whatever groups
 * the instances in code" (spec accessibility) — this is that. Name it with
 * `label` or `aria-labelledby`.
 *
 * @slot - The `<zds-radio>` options.
 * @fires change - The chosen value changed. Read `value`.
 */
@customElement("zds-radio-group")
export class ZdsRadioGroup extends LitElement {
  static formAssociated = true;

  /** The chosen option's value; empty for none. */
  @property({ type: String }) value = "";

  /** Field name submitted with a form. */
  @property({ type: String }) name: string | null = null;

  /** Disables every option. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** Accessible name of the group. */
  @property({ type: String }) label: string | null = null;

  private readonly internals: ElementInternals;
  private defaultValue = "";

  constructor() {
    super();
    this.internals = this.attachInternals();
    this.internals.role = "radiogroup";
    this.addEventListener("change", (e) => {
      const radio = e.target as ZdsRadio;
      if (radio === (this as unknown) || !(radio instanceof ZdsRadio)) return;
      e.stopPropagation();
      this.value = radio.value;
      this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
    });
    this.addEventListener("keydown", (e) => this.onKeyDown(e));
  }

  connectedCallback() {
    super.connectedCallback();
    this.defaultValue = this.value || this.radios.find((r) => r.checked)?.value || "";
    if (!this.value) this.value = this.defaultValue;
  }

  private get radios(): ZdsRadio[] {
    return [...this.querySelectorAll("zds-radio")] as ZdsRadio[];
  }

  private sync() {
    const radios = this.radios;
    for (const r of radios) {
      r.checked = r.value === this.value && this.value !== "";
      if (this.disabled) r.disabled = true;
    }
    // Roving tabindex: one stop, on the chosen option or the first enabled one.
    const stop = radios.find((r) => r.checked && !r.disabled) ?? radios.find((r) => !r.disabled);
    for (const r of radios) r.tabIndex = r === stop ? 0 : -1;
    this.internals.setFormValue(this.value || null);
  }

  protected updated(changed: PropertyValues<this>) {
    if (changed.has("label")) this.internals.ariaLabel = this.label;
    if (changed.has("disabled")) this.internals.ariaDisabled = this.disabled ? "true" : null;
    this.sync();
  }

  private onKeyDown(e: KeyboardEvent) {
    const keys: Record<string, number> = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
    if (!(e.key in keys)) return;
    const enabled = this.radios.filter((r) => !r.disabled);
    if (!enabled.length) return;
    e.preventDefault();
    const rtl = getComputedStyle(this).direction === "rtl" && (e.key === "ArrowLeft" || e.key === "ArrowRight");
    const step = keys[e.key] * (rtl ? -1 : 1);
    const current = enabled.indexOf(e.target as ZdsRadio);
    const next = enabled[(current + step + enabled.length) % enabled.length];
    next.focus();
    next.choose();
  }

  formResetCallback() {
    this.value = this.defaultValue;
  }

  formDisabledCallback(disabled: boolean) {
    this.disabled = disabled;
  }

  protected render() {
    return html`<slot @slotchange=${() => this.sync()}></slot>`;
  }

  static styles = css`
    :host { display: flex; flex-direction: column; align-items: flex-start; }
    :host([hidden]) { display: none; }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "zds-radio": ZdsRadio;
    "zds-radio-group": ZdsRadioGroup;
  }
}
