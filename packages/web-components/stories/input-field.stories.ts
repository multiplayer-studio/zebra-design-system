import type { Meta, StoryObj } from "@storybook/web-components";
import { html, nothing } from "lit";
import "../src/components/input-field/input-field.js";

const TYPES = ["text", "number", "password", "date", "time"] as const;
const SIZES = ["small", "medium", "large"] as const;
const SHAPES = ["sharp", "rounded", "full"] as const;
const FLAVOURS = ["default", "gradient", "ghost"] as const;
const PLACEHOLDER = { text: "Placeholder", number: "0", password: "Password", date: "", time: "" } as const;
const VALUE = { text: "Value", number: "3", password: "secret12", date: "2026-10-14", time: "09:30" } as const;

const meta: Meta = {
  title: "Components/Input Field",
  component: "zds-input-field",
  tags: ["autodocs"],
  parameters: { docs: { description: { component: "The field alone. Use `<zds-input>` when it needs a label or hint. Hover, focus, selected and typing come from interaction; invalid, read-only and disabled from properties." } } },
  argTypes: {
    type: { control: "select", options: TYPES },
    size: { control: "inline-radio", options: SIZES },
    shape: { control: "inline-radio", options: SHAPES },
    flavour: { control: "inline-radio", options: FLAVOURS },
    leadingIcon: { control: "text" },
    trailingIcon: { control: "text" },
  },
  args: { type: "text", size: "medium", shape: "sharp", flavour: "default", invalid: false, readonly: false, disabled: false, leadingIcon: "", trailingIcon: "" },
  render: (a) => html`<div style="max-inline-size:320px">
    <zds-input-field label="Playground" type=${a.type} size=${a.size} shape=${a.shape} flavour=${a.flavour}
      placeholder=${PLACEHOLDER[a.type as keyof typeof PLACEHOLDER]} ?invalid=${a.invalid} ?readonly=${a.readonly} ?disabled=${a.disabled}
      leading-icon=${a.leadingIcon || nothing} trailing-icon=${a.trailingIcon || nothing}></zds-input-field></div>`,
};
export default meta;
type Story = StoryObj;

const cap = (t: string) => html`<span style="font:500 12px/1.4 system-ui;opacity:.7">${t}</span>`;
const grid = (c: unknown, cols = "max-content minmax(260px, 320px)") => html`<div style="display:grid;grid-template-columns:${cols};gap:12px 24px;align-items:center">${c}</div>`;

export const Playground: Story = {};

/** One field, five types: each brings its placeholder and trailing control. Type in one to see clear join (password, date, time) or replace (text, number) it. */
export const Types: Story = {
  render: () => grid(TYPES.map((t) => html`${cap(t)}<zds-input-field label=${t} type=${t} placeholder=${PLACEHOLDER[t]} leading-icon=${t === "text" || t === "number" || t === "password" ? "email" : nothing}></zds-input-field>`)),
};

/** Height is bound per size (control/sm, md, lg); only small reduces the text. */
export const Sizes: Story = {
  render: () => grid(SIZES.map((s) => html`${cap(s)}<zds-input-field label=${s} size=${s} placeholder="Placeholder" leading-icon="email" trailing-icon="info"></zds-input-field>`)),
};

export const Shapes: Story = {
  render: () => grid(SHAPES.map((s) => html`${cap(s)}<zds-input-field label=${s} shape=${s} placeholder="Placeholder"></zds-input-field>`)),
};

/** The set states, per flavour. Hover, focus, selected and typing: interact with the enabled and filled rows. */
export const States: Story = {
  render: () => grid(html`${cap("")}${FLAVOURS.map((f) => cap(f))}
    ${(["enabled", "filled", "invalid", "read-only", "disabled"] as const).map((st) => html`${cap(st)}${FLAVOURS.map((f) => html`<zds-input-field label=${st} flavour=${f} placeholder="Placeholder" leading-icon="email"
      value=${st === "enabled" ? "" : "Value"} ?invalid=${st === "invalid"} ?readonly=${st === "read-only"} ?disabled=${st === "disabled"}></zds-input-field>`)}`)}`,
    "max-content repeat(3, minmax(200px, 260px))"),
};

/** Every type, disabled: value, icons and controls all drop to foreground/disabled. */
export const Disabled: Story = {
  render: () => grid(TYPES.map((t) => html`${cap(t)}<zds-input-field label=${t} type=${t} value=${VALUE[t]} disabled leading-icon=${t === "text" || t === "number" || t === "password" ? "email" : nothing}></zds-input-field>`)),
};

export const ThemingCascade: Story = {
  render: () => html`<div style="display:grid;gap:12px;grid-template-columns:repeat(auto-fit,minmax(260px,1fr))">
    ${["", "mode-dark", "ext-companion", "ext-companion mode-dark"].map((cls) => html`
      <div class=${cls} style="padding:16px;border-radius:8px;background:var(--surface-page);color:var(--foreground-primary);border:1px solid var(--border-default);display:grid;gap:8px">
        <div style="font:500 12px/1.4 system-ui;opacity:.7">${cls || "base / light"}</div>
        ${FLAVOURS.map((f) => html`<zds-input-field label=${f} flavour=${f} placeholder=${f} leading-icon="email"></zds-input-field>`)}
        <zds-input-field label="invalid" invalid value="Value"></zds-input-field>
        <zds-input-field label="disabled" type="password" disabled value="secret12"></zds-input-field>
      </div>`)}
  </div>`,
};
