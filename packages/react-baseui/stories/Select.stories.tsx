import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { iconNames } from "@zebra-design-system/icons/names";
import { Select, type SelectOption } from "../src/index.js";

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

const meta: Meta<typeof Select> = {
  title: "Components/Form/Select",
  component: Select,
  tags: ["autodocs"],
  parameters: {
    docs: { description: { component: "A label, a Select Field and a hint as one unit; opening it overlays a Dropdown Menu of the options below the field. Built on Base UI's Select (listbox semantics, typeahead, keyboard, form participation)." } },
  },
  argTypes: {
    size: { control: "inline-radio", options: SIZES },
    shape: { control: "inline-radio", options: SHAPES },
    flavour: { control: "inline-radio", options: FLAVOURS },
    state: { control: "inline-radio", options: ["default", "invalid", "disabled"] },
    labelType: { control: "inline-radio", options: ["default", "required", "optional"] },
    leadingIcon: { control: "select", options: [undefined, ...iconNames] },
  },
  args: {
    options: COUNTRIES, label: "Country", hint: "Where the order ships to", placeholder: "Select an option",
    labelType: "default", information: false, hintIcon: true,
    size: "medium", shape: "rounded", flavour: "default", state: "default", readOnly: false,
  },
  render: (a) => <div style={{ maxInlineSize: 320, minBlockSize: 120 }}><Select {...a} /></div>,
};
export default meta;
type Story = StoryObj<typeof Select>;

const Cap = ({ children }: { children: React.ReactNode }) => <span style={{ font: "500 12px/1.4 system-ui", opacity: 0.7, color: "var(--foreground-primary)" }}>{children}</span>;
const Grid = ({ children, cols = "max-content minmax(260px, 320px)" }: { children: React.ReactNode; cols?: string }) => (
  <div style={{ display: "grid", gridTemplateColumns: cols, gap: "16px 24px", alignItems: "center" }}>{children}</div>
);

export const Playground: Story = {};

/** Open: the list overlays whatever is below — the hint included — and the assembly's height does not change. */
export const Open: Story = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(240px, 300px))", gap: 24, minBlockSize: 300, alignItems: "start" }}>
      <Select label="Closed" hint="Where the order ships to" options={COUNTRIES} />
      <Select label="Open" hint="Where the order ships to" options={COUNTRIES} defaultValue="ie" defaultOpen />
    </div>
  ),
};

/** Show Label / Show Hint: an empty label or hint removes its row and the stack shortens. */
export const Parts: Story = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 300px))", gap: 24, alignItems: "start" }}>
      <Select label="Label and hint" hint="Default hint message" options={COUNTRIES} />
      <Select label="Label only" options={COUNTRIES} />
      <Select aria-label="Hint only" hint="Hint only (named another way)" options={COUNTRIES} />
      <Select label="Hint without icon" hint="Message only" hintIcon={false} options={COUNTRIES} />
    </div>
  ),
};

/** Mark whichever of required or optional is the exception; the information icon names extra context. */
export const LabelTypes: Story = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 300px))", gap: 24, alignItems: "start" }}>
      <Select label="Country" options={COUNTRIES} />
      <Select label="Country" labelType="required" options={COUNTRIES} />
      <Select label="Country" labelType="optional" options={COUNTRIES} />
      <Select label="Country" information informationLabel="Why we ask" options={COUNTRIES} />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => <Grid>{SIZES.map((s) => <React.Fragment key={s}><Cap>{s}</Cap><Select aria-label={s} size={s} options={COUNTRIES} /></React.Fragment>)}</Grid>,
};

/** Field corners. The list is always the rounded Dropdown Menu. */
export const Shapes: Story = {
  render: () => <Grid>{SHAPES.map((s) => <React.Fragment key={s}><Cap>{s}</Cap><Select aria-label={s} shape={s} options={COUNTRIES} /></React.Fragment>)}</Grid>,
};

/** Every field state that is a prop, per flavour. Hover, focus and open are interaction: try the enabled and filled rows. */
export const States: Story = {
  render: () => (
    <Grid cols="max-content repeat(3, minmax(200px, 260px))">
      <Cap>{""}</Cap>{FLAVOURS.map((f) => <Cap key={f}>{f}</Cap>)}
      {(["enabled", "filled", "invalid", "read-only", "disabled"] as const).map((st) => (
        <React.Fragment key={st}>
          <Cap>{st}</Cap>
          {FLAVOURS.map((f) => (
            <Select key={f} aria-label={`${st} ${f}`} flavour={f} options={COUNTRIES}
              defaultValue={st === "enabled" ? null : "fr"} readOnly={st === "read-only"}
              state={st === "invalid" ? "invalid" : st === "disabled" ? "disabled" : "default"} />
          ))}
        </React.Fragment>
      ))}
    </Grid>
  ),
};

/** The assembly state: invalid pairs the error border with an error hint; disabled dims all three parts. */
export const AssemblyStates: Story = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 300px))", gap: 24, alignItems: "start" }}>
      <Select label="Contact by" labelType="required" hint="We only use this for order updates" options={CHANNELS} />
      <Select label="Contact by" labelType="required" hint="Choose how we should reach you" state="invalid" options={CHANNELS} />
      <Select label="Contact by" hint="Unavailable for this account" state="disabled" options={CHANNELS} defaultValue="email" />
    </div>
  ),
};

export const Flavours: Story = {
  render: () => <Grid>{FLAVOURS.map((f) => <React.Fragment key={f}><Cap>{f}</Cap><Select aria-label={f} flavour={f} options={COUNTRIES} /></React.Fragment>)}</Grid>,
};

/** hasLeading: a leading icon, replaced by the chosen option's own icon. */
export const LeadingIcon: Story = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(240px, 300px))", gap: 24 }}>
      <Select label="Contact by" leadingIcon="email" options={CHANNELS} />
      <Select label="Contact by" options={CHANNELS} defaultValue="phone" />
    </div>
  ),
};

/** The list is never taller than the room left in the viewport, and scrolls. */
export const LongList: Story = {
  render: () => (
    <div style={{ maxInlineSize: 320 }}>
      <Select label="Quantity" options={Array.from({ length: 40 }, (_, i) => ({ value: String(i + 1), label: `${i + 1}` }))} />
    </div>
  ),
};

/** Submits under its name; required blocks an empty submit. */
export const InAForm: Story = {
  render: function InAFormStory() {
    const [out, setOut] = React.useState("");
    return (
      <form style={{ display: "grid", gap: 16, maxInlineSize: 320, font: "14px/1.4 system-ui", color: "var(--foreground-primary)" }}
        onSubmit={(e) => { e.preventDefault(); setOut(JSON.stringify([...new FormData(e.currentTarget)])); }}>
        <Select name="country" label="Country" labelType="required" options={COUNTRIES} hint="Required" />
        <Select name="channel" label="Contact by" options={CHANNELS} defaultValue="chat" />
        <div><button type="submit">Submit</button></div>
        <output>{out}</output>
      </form>
    );
  },
};

export const ThemingCascade: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))" }}>
      {["", "mode-dark", "ext-companion", "ext-companion mode-dark"].map((cls) => (
        <div key={cls} className={cls} style={{ padding: 16, borderRadius: 8, background: "var(--surface-page)", color: "var(--foreground-primary)", border: "1px solid var(--border-default)", display: "grid", gap: 16, alignContent: "start", minBlockSize: 400 }}>
          <div style={{ font: "500 12px/1.4 system-ui", opacity: 0.7 }}>{cls || "base / light"}</div>
          <Select label="Country" labelType="optional" information hint="Default hint message" options={COUNTRIES} />
          <Select label="Country" labelType="required" state="invalid" defaultValue="fr" hint="Something went wrong" options={COUNTRIES} />
          <Select label="Country" state="disabled" defaultValue="fr" hint="Not available" options={COUNTRIES} />
          <Select label="Country" flavour="gradient" hint="Open" defaultValue="ie" defaultOpen options={COUNTRIES} />
        </div>
      ))}
    </div>
  ),
};
