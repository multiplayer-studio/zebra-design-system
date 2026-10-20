import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Select, type SelectOption } from "../src/index.js";

const SIZES = ["small", "medium", "large"] as const;
const SHAPES = ["sharp", "rounded", "full"] as const;
const FLAVOURS = ["default", "gradient", "ghost"] as const;
const STATES = ["default", "invalid", "disabled"] as const;

const FRUIT: SelectOption[] = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
  { value: "durian", label: "Durian", disabled: true },
  { value: "elderberry", label: "Elderberry" },
];
const CHANNELS: SelectOption[] = [
  { value: "email", label: "Email", icon: "email" },
  { value: "phone", label: "Phone", icon: "phone" },
  { value: "chat", label: "Chat", icon: "chat" },
];

const meta: Meta<typeof Select> = {
  title: "Experimental/Select",
  component: Select,
  tags: ["autodocs"],
  parameters: {
    docs: { description: { component: "**Experimental — no Figma spec.** An Input Field-shaped trigger that opens a Dropdown Menu of Menu Item rows, on Base UI's Select. Visuals are borrowed from those components; only the chevron, placeholder and list sizing are its own." } },
  },
  argTypes: {
    size: { control: "inline-radio", options: SIZES },
    shape: { control: "inline-radio", options: SHAPES },
    flavour: { control: "inline-radio", options: FLAVOURS },
    state: { control: "inline-radio", options: STATES },
    labelType: { control: "inline-radio", options: ["default", "required", "optional"] },
  },
  args: { options: FRUIT, label: "Favourite fruit", hint: "Pick one", placeholder: "Select a fruit", size: "medium", shape: "rounded", flavour: "default", state: "default", readOnly: false },
  render: (a) => <div style={{ maxInlineSize: 320 }}><Select {...a} /></div>,
};
export default meta;
type Story = StoryObj<typeof Select>;

const Cap = ({ children }: { children: React.ReactNode }) => <span style={{ font: "500 12px/1.4 system-ui", opacity: 0.7 }}>{children}</span>;
const Grid = ({ children, cols = "max-content minmax(260px, 320px)" }: { children: React.ReactNode; cols?: string }) => (
  <div style={{ display: "grid", gridTemplateColumns: cols, gap: "12px 24px", alignItems: "center" }}>{children}</div>
);

export const Playground: Story = {};

export const Sizes: Story = {
  render: () => <Grid>{SIZES.map((s) => <React.Fragment key={s}><Cap>{s}</Cap><Select aria-label={s} size={s} options={FRUIT} placeholder="Select a fruit" /></React.Fragment>)}</Grid>,
};

/** Sharp fields open a sharp list; rounded and full open a rounded one. */
export const Shapes: Story = {
  render: () => <Grid>{SHAPES.map((s) => <React.Fragment key={s}><Cap>{s}</Cap><Select aria-label={s} shape={s} options={FRUIT} placeholder="Select a fruit" /></React.Fragment>)}</Grid>,
};

/** Set states per flavour. Open, hover and keyboard focus: interact with the empty and filled rows. */
export const States: Story = {
  render: () => (
    <Grid cols="max-content repeat(3, minmax(200px, 260px))">
      <Cap>{""}</Cap>{FLAVOURS.map((f) => <Cap key={f}>{f}</Cap>)}
      {(["empty", "filled", "invalid", "read-only", "disabled"] as const).map((st) => (
        <React.Fragment key={st}>
          <Cap>{st}</Cap>
          {FLAVOURS.map((f) => (
            <Select key={f} aria-label={`${st} ${f}`} flavour={f} options={FRUIT} placeholder="Select a fruit"
              defaultValue={st === "empty" ? null : "banana"} readOnly={st === "read-only"}
              state={st === "invalid" ? "invalid" : st === "disabled" ? "disabled" : "default"} />
          ))}
        </React.Fragment>
      ))}
    </Grid>
  ),
};

/** Label and hint come from Input; the hint turns to an error with state=invalid. */
export const WithLabelAndHint: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 24, maxInlineSize: 320 }}>
      <Select label="Contact by" labelType="required" hint="We only use this for order updates" options={CHANNELS} leadingIcon="info" />
      <Select label="Contact by" hint="Choose a channel" state="invalid" options={CHANNELS} />
      <Select label="Contact by" labelType="optional" hint="Unavailable for this account" state="disabled" options={CHANNELS} defaultValue="email" />
    </div>
  ),
};

/** Option icons show in the row and replace the trigger's leading icon once chosen. */
export const WithIcons: Story = {
  render: () => <div style={{ maxInlineSize: 320 }}><Select aria-label="Channel" options={CHANNELS} defaultValue="phone" /></div>,
};

/** The list is never taller than the room left in the viewport, and scrolls. */
export const LongList: Story = {
  render: () => (
    <div style={{ maxInlineSize: 320 }}>
      <Select aria-label="Number" options={Array.from({ length: 40 }, (_, i) => ({ value: String(i + 1), label: `Option ${i + 1}` }))} />
    </div>
  ),
};

/** Opened by default so the list shows without interaction (and in screenshots). */
export const Open: Story = {
  render: () => <div style={{ maxInlineSize: 320, minBlockSize: 280 }}><Select aria-label="Fruit" options={FRUIT} defaultValue="cherry" defaultOpen /></div>,
};

export const ThemingCascade: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))" }}>
      {["", "mode-dark", "ext-companion", "ext-companion mode-dark"].map((cls) => (
        <div key={cls} className={cls} style={{ padding: 16, borderRadius: 8, background: "var(--surface-page)", color: "var(--foreground-primary)", border: "1px solid var(--border-default)", display: "grid", gap: 8 }}>
          <div style={{ font: "500 12px/1.4 system-ui", opacity: 0.7 }}>{cls || "base / light"}</div>
          {FLAVOURS.map((f) => <Select key={f} aria-label={f} flavour={f} options={FRUIT} placeholder={f} />)}
        </div>
      ))}
    </div>
  ),
};
