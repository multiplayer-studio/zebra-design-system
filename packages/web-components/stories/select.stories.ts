import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { iconNames } from "@zebra-design-system/icons/names";
import "../src/components/select/select.js";
import type { SelectOption } from "../src/components/select/select.js";

const SIZES = ["small", "medium", "large"] as const;
const SHAPES = ["sharp", "rounded", "full"] as const;
const FLAVOURS = ["default", "gradient", "ghost"] as const;

const COUNTRIES: SelectOption[] = [
  { value: "gb", label: "United Kingdom" },
  { value: "ie", label: "Ireland" },
  { value: "fr", label: "France" },
  { value: "de", label: "Germany", disabled: true },
  { value: "es", label: "Spain" },
];
const CHANNELS: SelectOption[] = [
  { value: "email", label: "Email", icon: "email" },
  { value: "phone", label: "Phone", icon: "phone" },
  { value: "chat", label: "Chat", icon: "chat" },
];

const meta: Meta = {
  title: "Components/Select",
  component: "zds-select",
  tags: ["autodocs"],
  parameters: {
    docs: { description: { component: "A label, a Select Field and a hint as one unit; opening it overlays a Dropdown Menu of the options below the field. WAI-ARIA select-only combobox over a listbox, form-associated." } },
  },
  argTypes: {
    size: { control: "inline-radio", options: SIZES },
    shape: { control: "inline-radio", options: SHAPES },
    flavour: { control: "inline-radio", options: FLAVOURS },
    state: { control: "inline-radio", options: ["default", "invalid", "disabled"] },
    labelType: { control: "inline-radio", options: ["default", "required", "optional"] },
    leadingIcon: { control: "select", options: [null, ...iconNames] },
  },
  args: {
    label: "Country", hint: "Where the order ships to", placeholder: "Select an option",
    labelType: "default", information: false, hintIcon: true, leadingIcon: null,
    size: "medium", shape: "rounded", flavour: "default", state: "default", readonly: false, open: false,
  },
  render: (a) => html`<div style="max-inline-size:320px;min-block-size:120px">
    <zds-select .options=${COUNTRIES} label=${a.label} label-type=${a.labelType} ?information=${a.information}
      hint=${a.hint} .hintIcon=${a.hintIcon} placeholder=${a.placeholder} state=${a.state} ?readonly=${a.readonly}
      .leadingIcon=${a.leadingIcon} ?open=${a.open}
      size=${a.size} shape=${a.shape} flavour=${a.flavour}></zds-select></div>`,
};
export default meta;
type Story = StoryObj;

const cap = (t: string) => html`<span style="font:500 12px/1.4 system-ui;opacity:.7;color:var(--foreground-primary)">${t}</span>`;
const grid = (c: unknown, cols = "max-content minmax(260px, 320px)") =>
  html`<div style="display:grid;grid-template-columns:${cols};gap:16px 24px;align-items:center">${c}</div>`;
const row = (c: unknown, cols = "repeat(auto-fit, minmax(240px, 300px))") =>
  html`<div style="display:grid;grid-template-columns:${cols};gap:24px;align-items:start">${c}</div>`;

export const Playground: Story = {};

/** Open: the list overlays whatever is below — the hint included — and the assembly's height does not change. */
export const Open: Story = {
  render: () => html`<div style="min-block-size:300px">${row(html`
    <zds-select label="Closed" hint="Where the order ships to" .options=${COUNTRIES}></zds-select>
    <zds-select label="Open" hint="Where the order ships to" .options=${COUNTRIES} value="ie" open></zds-select>`, "repeat(2, minmax(240px, 300px))")}</div>`,
};

/** Show Label / Show Hint: an empty label or hint removes its row and the stack shortens. */
export const Parts: Story = {
  render: () => row(html`
    <zds-select label="Label and hint" hint="Default hint message" .options=${COUNTRIES}></zds-select>
    <zds-select label="Label only" .options=${COUNTRIES}></zds-select>
    <zds-select accessible-label="Hint only" hint="Hint only (named another way)" .options=${COUNTRIES}></zds-select>
    <zds-select label="Hint without icon" hint="Message only" .hintIcon=${false} .options=${COUNTRIES}></zds-select>`),
};

/** Mark whichever of required or optional is the exception; the information icon names extra context. */
export const LabelTypes: Story = {
  render: () => row(html`
    <zds-select label="Country" .options=${COUNTRIES}></zds-select>
    <zds-select label="Country" label-type="required" .options=${COUNTRIES}></zds-select>
    <zds-select label="Country" label-type="optional" .options=${COUNTRIES}></zds-select>
    <zds-select label="Country" information information-label="Why we ask" .options=${COUNTRIES}></zds-select>`),
};

export const Sizes: Story = {
  render: () => grid(SIZES.map((s) => html`${cap(s)}<zds-select accessible-label=${s} size=${s} .options=${COUNTRIES}></zds-select>`)),
};

/** Field corners. The list is always the rounded Dropdown Menu. */
export const Shapes: Story = {
  render: () => grid(SHAPES.map((s) => html`${cap(s)}<zds-select accessible-label=${s} shape=${s} .options=${COUNTRIES}></zds-select>`)),
};

/** Every field state that is a property, per flavour. Hover, focus and open are interaction: try the enabled and filled rows. */
export const States: Story = {
  render: () => grid(html`${cap("")}${FLAVOURS.map((f) => cap(f))}
    ${(["enabled", "filled", "invalid", "read-only", "disabled"] as const).map((st) => html`${cap(st)}${FLAVOURS.map((f) => html`
      <zds-select accessible-label="${st} ${f}" flavour=${f} .options=${COUNTRIES} .value=${st === "enabled" ? null : "fr"}
        ?readonly=${st === "read-only"} state=${st === "invalid" ? "invalid" : st === "disabled" ? "disabled" : "default"}></zds-select>`)}`)}`,
    "max-content repeat(3, minmax(200px, 260px))"),
};

/** The assembly state: invalid pairs the error border with an error hint; disabled dims all three parts. */
export const AssemblyStates: Story = {
  render: () => row(html`
    <zds-select label="Contact by" label-type="required" hint="We only use this for order updates" .options=${CHANNELS}></zds-select>
    <zds-select label="Contact by" label-type="required" hint="Choose how we should reach you" state="invalid" .options=${CHANNELS}></zds-select>
    <zds-select label="Contact by" hint="Unavailable for this account" state="disabled" .options=${CHANNELS} value="email"></zds-select>`),
};

export const Flavours: Story = {
  render: () => grid(FLAVOURS.map((f) => html`${cap(f)}<zds-select accessible-label=${f} flavour=${f} .options=${COUNTRIES}></zds-select>`)),
};

/** hasLeading: a leading icon, replaced by the chosen option's own icon. */
export const LeadingIcon: Story = {
  render: () => row(html`
    <zds-select label="Contact by" leading-icon="email" .options=${CHANNELS}></zds-select>
    <zds-select label="Contact by" .options=${CHANNELS} value="phone"></zds-select>`, "repeat(2, minmax(240px, 300px))"),
};

/** The list is never taller than the room left in the viewport, and scrolls. */
export const LongList: Story = {
  render: () => html`<div style="max-inline-size:320px">
    <zds-select label="Quantity" .options=${Array.from({ length: 40 }, (_, i) => ({ value: String(i + 1), label: `${i + 1}` }))}></zds-select></div>`,
};

/** Submits under its name; required blocks an empty submit; Reset restores. */
export const InAForm: Story = {
  render: () => html`<form style="display:grid;gap:16px;max-inline-size:320px;font:14px/1.4 system-ui;color:var(--foreground-primary)"
      @submit=${(e: SubmitEvent) => { e.preventDefault(); const f = e.currentTarget as HTMLFormElement; f.querySelector("output")!.textContent = JSON.stringify([...new FormData(f)]); }}>
      <zds-select name="country" label="Country" label-type="required" .options=${COUNTRIES} hint="Required"></zds-select>
      <zds-select name="channel" label="Contact by" .options=${CHANNELS} value="chat"></zds-select>
      <div style="display:flex;gap:8px"><button type="submit">Submit</button><button type="reset">Reset</button></div>
      <output></output>
    </form>`,
};

export const ThemingCascade: Story = {
  render: () => html`<div style="display:grid;gap:12px;grid-template-columns:repeat(auto-fit,minmax(260px,1fr))">
    ${["", "mode-dark", "ext-companion", "ext-companion mode-dark"].map((cls) => html`
      <div class=${cls} style="padding:16px;border-radius:8px;background:var(--surface-page);color:var(--foreground-primary);border:1px solid var(--border-default);display:grid;gap:16px;align-content:start;min-block-size:400px">
        <div style="font:500 12px/1.4 system-ui;opacity:.7">${cls || "base / light"}</div>
        <zds-select label="Country" label-type="optional" information hint="Default hint message" .options=${COUNTRIES}></zds-select>
        <zds-select label="Country" label-type="required" state="invalid" value="fr" hint="Something went wrong" .options=${COUNTRIES}></zds-select>
        <zds-select label="Country" state="disabled" value="fr" hint="Not available" .options=${COUNTRIES}></zds-select>
        <zds-select label="Country" flavour="gradient" hint="Open" value="ie" open .options=${COUNTRIES}></zds-select>
      </div>`)}
  </div>`,
};
