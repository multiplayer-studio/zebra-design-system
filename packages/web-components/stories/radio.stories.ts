import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../src/components/radio/radio.js";

const SIZES = ["large", "medium"] as const;

const meta: Meta = {
  title: "Components/Form/Radio",
  component: "zds-radio",
  tags: ["autodocs"],
  parameters: {
    docs: { description: { component: "Always used inside <zds-radio-group>, which owns the value, the form name and the keyboard model (one tab stop, arrow keys)." } },
  },
  argTypes: {
    size: { control: "inline-radio", options: SIZES },
    disabled: { control: "boolean" },
    label: { control: "text" },
  },
  args: { size: "large", disabled: false, label: "Option" },
  render: (a) => html`
    <zds-radio-group value="a" label="Playground" name="playground">
      ${["a", "b", "c"].map((v) => html`<zds-radio value=${v} size=${a.size} ?disabled=${a.disabled}>${a.label} ${v.toUpperCase()}</zds-radio>`)}
    </zds-radio-group>
  `,
};
export default meta;
type Story = StoryObj;

export const Playground: Story = {};

const caption = (t: string) => html`<span style="font:500 12px/1.4 system-ui;opacity:.7">${t}</span>`;
const grid = (c: unknown) => html`<div style="display:grid;grid-template-columns:repeat(2,auto);gap:8px 32px;justify-content:start;align-items:center">${c}</div>`;
const row = "flex-direction:row";

/** The ring changes size; the 40 by 40 touch target and the label's type do not. */
export const Sizes: Story = {
  render: () => grid(SIZES.map((s) => html`
    ${caption(s)}
    <zds-radio-group value="on" label=${s} style=${row}>
      <zds-radio size=${s} value="on">Checked</zds-radio>
      <zds-radio size=${s} value="off">Unchecked</zds-radio>
    </zds-radio-group>`)),
};

/**
 * Checked and unchecked, enabled and disabled. Hover a row, or Tab into the
 * first group and use the arrow keys, for the interactive states. A disabled
 * option shows whether it is chosen (spec blocker: Figma ships only an
 * unchecked disabled variant, drawn with the dot).
 */
export const States: Story = {
  render: () => grid(html`
    ${caption("enabled")}
    <zds-radio-group value="on" label="Enabled" style=${row}>
      <zds-radio value="on">Checked</zds-radio>
      <zds-radio value="off">Unchecked</zds-radio>
    </zds-radio-group>
    ${caption("disabled")}
    <zds-radio-group value="on" label="Disabled" disabled style=${row}>
      <zds-radio value="on">Checked</zds-radio>
      <zds-radio value="off">Unchecked</zds-radio>
    </zds-radio-group>
    ${caption("one option disabled")}
    <zds-radio-group value="a" label="Mixed" style=${row}>
      <zds-radio value="a">Available</zds-radio>
      <zds-radio value="b" disabled>Sold out</zds-radio>
    </zds-radio-group>
  `),
};

/** hasLabel = false: the control alone, at its 40 by 40 target. Name it another way. */
export const WithoutLabel: Story = {
  render: () => html`
    <zds-radio-group value="a" label="Rating" style=${row}>
      ${["a", "b", "c", "d", "e"].map((v, i) => html`<zds-radio value=${v} aria-label=${`${i + 1} stars`}></zds-radio>`)}
    </zds-radio-group>`,
};

/** Inside a form: the group submits the chosen value under its name; Reset restores it. */
export const InAForm: Story = {
  render: () => html`
    <form
      style="display:grid;gap:12px;font:14px/1.4 system-ui;color:var(--foreground-primary)"
      @submit=${(e: SubmitEvent) => { e.preventDefault(); const f = e.currentTarget as HTMLFormElement; f.querySelector("output")!.textContent = JSON.stringify(Object.fromEntries(new FormData(f))); }}
    >
      <zds-radio-group name="shipping" value="standard" label="Shipping">
        <zds-radio value="standard">Standard</zds-radio>
        <zds-radio value="express">Express</zds-radio>
        <zds-radio value="pickup">Store pickup</zds-radio>
      </zds-radio-group>
      <div style="display:flex;gap:8px"><button type="submit">Submit</button><button type="reset">Reset</button></div>
      <output></output>
    </form>`,
};

/** Theming is a class, at any level. */
export const ThemingCascade: Story = {
  render: () => html`<div style="display:grid;gap:12px;grid-template-columns:repeat(auto-fit,minmax(220px,1fr))">
    ${["", "mode-dark", "ext-companion", "ext-companion mode-dark"].map((cls) => html`
      <div class=${cls} style="padding:16px;border-radius:8px;background:var(--surface-page);color:var(--foreground-primary);border:1px solid var(--border-default)">
        <div style="font:500 12px/1.4 system-ui;margin-bottom:8px;opacity:.7">${cls || "base / light"}</div>
        <zds-radio-group value="a" label=${cls || "base"}>
          <zds-radio value="a">Checked</zds-radio>
          <zds-radio value="b">Unchecked</zds-radio>
          <zds-radio value="c" disabled>Disabled</zds-radio>
        </zds-radio-group>
      </div>`)}
  </div>`,
};
