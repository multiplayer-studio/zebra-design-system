import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../src/components/checkbox/checkbox.js";

const SIZES = ["large", "medium"] as const;

const meta: Meta = {
  title: "Components/Checkbox",
  component: "zds-checkbox",
  tags: ["autodocs"],
  parameters: {
    docs: { description: { component: "Checked is one axis in the spec (false, true, indeterminate); here `checked` + `indeterminate`, never shown together. Indeterminate is set from a mixed set of children, never chosen." } },
  },
  argTypes: {
    size: { control: "inline-radio", options: SIZES },
    checked: { control: "boolean" },
    indeterminate: { control: "boolean" },
    disabled: { control: "boolean" },
    label: { control: "text" },
  },
  args: { size: "large", checked: true, indeterminate: false, disabled: false, label: "Email me updates" },
  render: (a) => html`<zds-checkbox size=${a.size} ?checked=${a.checked} ?indeterminate=${a.indeterminate} ?disabled=${a.disabled}>${a.label}</zds-checkbox>`,
};
export default meta;
type Story = StoryObj;

export const Playground: Story = {};

const caption = (t: string) => html`<span style="font:500 12px/1.4 system-ui;opacity:.7">${t}</span>`;
const grid = (c: unknown) => html`<div style="display:grid;grid-template-columns:repeat(4,auto);gap:8px 24px;justify-content:start;align-items:center">${c}</div>`;

/** The box changes size; the 40 by 40 touch target and the label's type do not. */
export const Sizes: Story = {
  render: () => grid(SIZES.map((s) => html`
    ${caption(s)}
    <zds-checkbox size=${s} checked>Checked</zds-checkbox>
    <zds-checkbox size=${s} indeterminate>Indeterminate</zds-checkbox>
    <zds-checkbox size=${s}>Unchecked</zds-checkbox>`)),
};

/** Every value, enabled and disabled. Hover a row or Tab through for the interactive states. */
export const States: Story = {
  render: () => grid(["enabled", "disabled"].map((st) => html`
    ${caption(st)}
    <zds-checkbox checked ?disabled=${st === "disabled"}>Checked</zds-checkbox>
    <zds-checkbox indeterminate ?disabled=${st === "disabled"}>Indeterminate</zds-checkbox>
    <zds-checkbox ?disabled=${st === "disabled"}>Unchecked</zds-checkbox>`)),
};

/** A parent box that reflects its children: indeterminate when some are checked. */
export const ParentAndChildren: Story = {
  render: () => {
    const sync = (e: Event) => {
      const root = (e.currentTarget as HTMLElement);
      const parent = root.querySelector<HTMLElement & { checked: boolean; indeterminate: boolean }>("[data-parent]")!;
      const kids = [...root.querySelectorAll<HTMLElement & { checked: boolean }>("[data-child]")];
      if (e.target === parent) kids.forEach((k) => (k.checked = parent.checked));
      const n = kids.filter((k) => k.checked).length;
      parent.checked = n === kids.length;
      parent.indeterminate = n > 0 && n < kids.length;
    };
    return html`<div @change=${sync} style="display:flex;flex-direction:column;align-items:flex-start">
      <zds-checkbox data-parent indeterminate>All toppings</zds-checkbox>
      <div style="display:flex;flex-direction:column;align-items:flex-start;padding-inline-start:var(--space-xl)">
        <zds-checkbox data-child checked>Cheese</zds-checkbox>
        <zds-checkbox data-child>Olives</zds-checkbox>
        <zds-checkbox data-child>Peppers</zds-checkbox>
      </div>
    </div>`;
  },
};

/** No label: the control alone, at its 40 by 40 target. Name it another way. */
export const WithoutLabel: Story = {
  render: () => html`<zds-checkbox checked aria-label="Select row"></zds-checkbox>`,
};

/** Inside a form: submits value under name when checked; required blocks submit; Reset restores. */
export const InAForm: Story = {
  render: () => html`
    <form
      style="display:grid;gap:4px;justify-items:start;font:14px/1.4 system-ui;color:var(--foreground-primary)"
      @submit=${(e: SubmitEvent) => { e.preventDefault(); const f = e.currentTarget as HTMLFormElement; f.querySelector("output")!.textContent = JSON.stringify([...new FormData(f)]); }}
    >
      <zds-checkbox name="updates" value="yes" checked>Email me updates</zds-checkbox>
      <zds-checkbox name="extras" value="sms">Text me too</zds-checkbox>
      <zds-checkbox name="terms" required>I accept the terms (required)</zds-checkbox>
      <div style="display:flex;gap:8px;margin-top:8px"><button type="submit">Submit</button><button type="reset">Reset</button></div>
      <output></output>
    </form>`,
};

/** Theming is a class, at any level. */
export const ThemingCascade: Story = {
  render: () => html`<div style="display:grid;gap:12px;grid-template-columns:repeat(auto-fit,minmax(220px,1fr))">
    ${["", "mode-dark", "ext-companion", "ext-companion mode-dark"].map((cls) => html`
      <div class=${cls} style="padding:16px;border-radius:8px;background:var(--surface-page);color:var(--foreground-primary);border:1px solid var(--border-default);display:flex;flex-direction:column;align-items:flex-start">
        <div style="font:500 12px/1.4 system-ui;margin-bottom:8px;opacity:.7">${cls || "base / light"}</div>
        <zds-checkbox checked>Checked</zds-checkbox>
        <zds-checkbox indeterminate>Indeterminate</zds-checkbox>
        <zds-checkbox>Unchecked</zds-checkbox>
        <zds-checkbox checked disabled>Disabled checked</zds-checkbox>
      </div>`)}
  </div>`,
};
