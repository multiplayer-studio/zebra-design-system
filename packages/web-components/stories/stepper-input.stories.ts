import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import "../src/components/stepper-input/stepper-input.js";

const stack = (c: unknown) => html`<div style="display:grid;gap:16px;justify-items:start">${c}</div>`;
const cap = (t: string) => html`<div style="font:500 12px/1.4 system-ui;opacity:.7">${t}</div>`;

const meta: Meta = {
  title: "Components/Form/Stepper Input",
  component: "zds-stepper-input",
  tags: ["autodocs"],
  argTypes: {
    size: { control: "inline-radio", options: ["medium", "large"] },
    shape: { control: "inline-radio", options: ["sharp", "rounded"] },
  },
  args: { label: "Guests", value: 2, min: 1, max: 12, step: 1, size: "medium", shape: "sharp", disabled: false, invalid: false, hint: "" },
  render: (a) => html`<zds-stepper-input label=${a.label} value=${a.value} min=${ifDefined(a.min)} max=${ifDefined(a.max)} step=${a.step}
    size=${a.size} shape=${a.shape} ?disabled=${a.disabled} ?invalid=${a.invalid} hint=${a.hint}></zds-stepper-input>`,
};
export default meta;
type Story = StoryObj;

export const Playground: Story = {};

/** Spec \`size\`: only the buttons and the value's height grow; the value's width and text hold. */
export const Size: Story = {
  render: () => stack((["medium", "large"] as const).map((s) => html`${cap(s)}<zds-stepper-input label="Guests, ${s}" size=${s} value="2" min="1" max="12"></zds-stepper-input>`)),
};

/** Spec \`rounded\` (false | true), as the library's \`shape\`: the buttons round, the value stays square (metadata intent). */
export const Shape: Story = {
  render: () => stack((["sharp", "rounded"] as const).map((s) => html`${cap(s)}<zds-stepper-input label="Guests, ${s}" shape=${s} value="2" min="1" max="12"></zds-stepper-input>`)),
};

/** Spec \`disabled\`: the whole control dims; buttons keep outline-subtle; the hint stays, dimmed. */
export const Disabled: Story = {
  render: () => stack(html`
    ${cap("enabled")}<zds-stepper-input label="Guests" value="2" min="1" max="12" hint="Up to 12 guests per booking"></zds-stepper-input>
    ${cap("disabled")}<zds-stepper-input label="Guests" value="2" min="1" max="12" hint="Up to 12 guests per booking" disabled></zds-stepper-input>`),
};

/** Spec \`showHint\`: a hint explains a constraint. \`invalid\` wires the error hint Figma has but never places. */
export const Hint: Story = {
  render: () => stack(html`
    ${cap("no hint")}<zds-stepper-input label="Copies" value="1" min="1" max="99"></zds-stepper-input>
    ${cap("hint")}<zds-stepper-input label="Copies" value="1" min="1" max="99" hint="Between 1 and 99 copies"></zds-stepper-input>
    ${cap("invalid")}<zds-stepper-input label="Copies" value="0" min="0" max="99" invalid hint="Print at least one copy"></zds-stepper-input>`),
};

/** The number model: bounds disable the matching button, press-and-hold repeats, ArrowUp/Down (Shift ×large-step), PageUp/Down, Home/End; a typed value is kept. Width follows the widest bound. */
export const Value: Story = {
  render: () => stack(html`
    ${cap("at min (0–5)")}<zds-stepper-input label="Bags" value="0" min="0" max="5"></zds-stepper-input>
    ${cap("at max (0–5)")}<zds-stepper-input label="Bags" value="5" min="0" max="5"></zds-stepper-input>
    ${cap("step 0.5, 0–10")}<zds-stepper-input label="Hours" value="1.5" min="0" max="10" step="0.5" large-step="2"></zds-stepper-input>
    ${cap("wide range, 0–100,000 (step 100)")}<zds-stepper-input label="Budget" value="2500" min="0" max="100000" step="100" large-step="1000"></zds-stepper-input>
    ${cap("controlled, -10–10")}
    <zds-stepper-input label="Offset" value="0" min="-10" max="10"
      @zds-value-change=${(e: CustomEvent<{ value: number | null }>) => {
        const out = (e.target as HTMLElement).nextElementSibling;
        if (out) out.textContent = `value: ${e.detail.value}`;
      }}></zds-stepper-input>
    <div style="font:500 12px/1.4 system-ui;opacity:.7">value: 0</div>`),
};

export const ThemingCascade: Story = {
  render: () => html`<div style="display:grid;gap:12px;grid-template-columns:repeat(auto-fit,minmax(320px,1fr))">
    ${["", "mode-dark", "ext-companion", "ext-companion mode-dark"].map((cls) => html`
      <div class=${cls} style="padding:16px;background:var(--surface-page);color:var(--foreground-primary);display:grid;gap:12px;justify-items:start">
        ${cap(cls || "base / light")}
        <zds-stepper-input label="Guests" value="2" min="1" max="12" hint="Up to 12 guests"></zds-stepper-input>
        <zds-stepper-input label="Guests" value="1" min="1" max="12" shape="rounded" size="large"></zds-stepper-input>
        <zds-stepper-input label="Copies" value="0" min="0" max="99" invalid hint="Print at least one copy"></zds-stepper-input>
        <zds-stepper-input label="Guests" value="2" min="1" max="12" disabled hint="Booking closed"></zds-stepper-input>
      </div>`)}
  </div>`,
};
