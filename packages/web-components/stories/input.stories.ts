import type { Meta, StoryObj } from "@storybook/web-components";
import { html, nothing } from "lit";
import "../src/components/input/input.js";

const meta: Meta = {
  title: "Components/Form/Input",
  component: "zds-input",
  tags: ["autodocs"],
  parameters: { docs: { description: { component: "Label, field and hint as one unit. `state` keeps the three parts in agreement; the field's own properties are set here too." } } },
  argTypes: {
    state: { control: "inline-radio", options: ["default", "invalid", "disabled"] },
    labelType: { control: "inline-radio", options: ["default", "required", "optional"] },
    type: { control: "select", options: ["text", "number", "password", "date", "time"] },
    size: { control: "inline-radio", options: ["small", "medium", "large"] },
    shape: { control: "inline-radio", options: ["sharp", "rounded", "full"] },
    flavour: { control: "inline-radio", options: ["default", "gradient", "ghost"] },
  },
  args: { label: "Field name", labelType: "optional", information: false, hint: "Default hint message", hintIcon: true, state: "default", type: "text", size: "medium", shape: "rounded", flavour: "default", placeholder: "Placeholder" },
  render: (a) => html`<div style="max-inline-size:320px">
    <zds-input label=${a.label} label-type=${a.labelType} ?information=${a.information} hint=${a.hint} ?hint-icon=${a.hintIcon} state=${a.state}
      type=${a.type} size=${a.size} shape=${a.shape} flavour=${a.flavour} placeholder=${a.placeholder}></zds-input></div>`,
};
export default meta;
type Story = StoryObj;

const row = (c: unknown) => html`<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,300px));gap:24px">${c}</div>`;

export const Playground: Story = {};

/** The general states, set once on the assembly and carried to all three parts. */
export const States: Story = {
  render: () => row((["default", "invalid", "disabled"] as const).map((st) => html`<zds-input label="Email" label-type="required" state=${st} value=${st === "default" ? "" : "name@company"}
    placeholder="name@company.com" leading-icon="email" hint=${st === "invalid" ? "Enter a valid email address" : "We'll only use this for receipts"}></zds-input>`)),
};

/** Mark whichever of required or optional is the exception in the form, not both. */
export const LabelTypes: Story = {
  render: () => row(html`
    <zds-input label="Default" placeholder="Placeholder"></zds-input>
    <zds-input label="Required" label-type="required" placeholder="Placeholder"></zds-input>
    <zds-input label="Optional" label-type="optional" placeholder="Placeholder"></zds-input>
    <zds-input label="With information" information information-label="About this field" placeholder="Placeholder"></zds-input>`),
};

/** Show Label / Show Hint: an empty label or hint removes its row, and the stack shortens. */
export const Parts: Story = {
  render: () => row(html`
    <zds-input label="Label and hint" hint="Hint" placeholder="Placeholder"></zds-input>
    <zds-input label="Label only" placeholder="Placeholder"></zds-input>
    <zds-input hint="Hint only (name it another way)" placeholder="Placeholder"></zds-input>
    <zds-input label="Hint without icon" hint="Message only" .hintIcon=${false} placeholder="Placeholder"></zds-input>`),
};

export const Types: Story = {
  render: () => row((["text", "number", "password", "date", "time"] as const).map((t) => html`<zds-input label=${t} type=${t} hint="Hint"
    placeholder=${t === "number" ? "0" : t === "password" ? "Password" : t === "text" ? "Placeholder" : nothing}></zds-input>`)),
};

/** The assembly submits under its name; required blocks submit; Reset restores. */
export const InAForm: Story = {
  render: () => html`<form style="display:grid;gap:16px;max-inline-size:320px;font:14px/1.4 system-ui;color:var(--foreground-primary)"
      @submit=${(e: SubmitEvent) => { e.preventDefault(); const f = e.currentTarget as HTMLFormElement; f.querySelector("output")!.textContent = JSON.stringify([...new FormData(f)]); }}>
      <zds-input name="email" label="Email" label-type="required" placeholder="name@company.com" hint="Required"></zds-input>
      <zds-input name="seats" label="Seats" type="number" value="2" hint="How many"></zds-input>
      <div style="display:flex;gap:8px"><button type="submit">Submit</button><button type="reset">Reset</button></div>
      <output></output>
    </form>`,
};

export const ThemingCascade: Story = {
  render: () => html`<div style="display:grid;gap:12px;grid-template-columns:repeat(auto-fit,minmax(260px,1fr))">
    ${["", "mode-dark", "ext-companion", "ext-companion mode-dark"].map((cls) => html`
      <div class=${cls} style="padding:16px;border-radius:8px;background:var(--surface-page);color:var(--foreground-primary);border:1px solid var(--border-default);display:grid;gap:16px">
        <div style="font:500 12px/1.4 system-ui;opacity:.7">${cls || "base / light"}</div>
        <zds-input label="Field name" label-type="optional" information hint="Default hint message" placeholder="Placeholder"></zds-input>
        <zds-input label="Field name" label-type="required" state="invalid" value="Value" hint="Something went wrong"></zds-input>
        <zds-input label="Field name" state="disabled" value="Value" hint="Not available"></zds-input>
      </div>`)}
  </div>`,
};
