import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { PHONE_COUNTRIES, PhoneInput, type PhoneCountry, type PhoneInputDetail } from "../src/index.js";

const STATES = ["default", "invalid", "disabled"] as const;
const SIZES = ["small", "medium", "large"] as const;
const SHAPES = ["rounded", "sharp", "full"] as const;
const FLAVOURS = ["default", "gradient", "ghost"] as const;

const meta: Meta<typeof PhoneInput> = {
  title: "Components/Phone Input",
  component: PhoneInput,
  tags: ["autodocs"],
  argTypes: {
    state: { control: "inline-radio", options: STATES },
    size: { control: "inline-radio", options: SIZES },
    shape: { control: "inline-radio", options: SHAPES },
    flavour: { control: "inline-radio", options: FLAVOURS },
    labelType: { control: "inline-radio", options: ["default", "required", "optional"] },
  },
  args: { label: "Phone number", hint: "We only use this for delivery updates", state: "default", size: "medium", shape: "rounded", flavour: "default", defaultCountry: "US", defaultValue: "8006535350" },
};
export default meta;
type Story = StoryObj<typeof PhoneInput>;

const row = { display: "flex", flexWrap: "wrap", gap: 32, alignItems: "start" } as const;
const stack = { display: "grid", gap: 32 } as const;
const hintFor = (state: (typeof STATES)[number]) => (state === "invalid" ? "Enter a valid phone number" : "We only use this for delivery updates");

export const Playground: Story = {};

/** One state across every part. */
export const States: Story = {
  render: (args) => <div style={row}>{STATES.map((state) => <PhoneInput key={state} {...args} state={state} hint={hintFor(state)} />)}</div>,
};

/** Height follows size. Only small also reduces the text. */
export const Sizes: Story = {
  render: (args) => <div style={row}>{SIZES.map((size) => <PhoneInput key={size} {...args} size={size} />)}</div>,
};

/** The country control's start and the number's end share the corner. */
export const Shapes: Story = {
  render: (args) => <div style={row}>{SHAPES.map((shape) => <PhoneInput key={shape} {...args} shape={shape} />)}</div>,
};

/** `default` in a form, `gradient` for a distinct interaction, `ghost` on a surface that already bounds it. */
export const Flavours: Story = {
  render: (args) => (
    <div style={stack}>
      {FLAVOURS.map((flavour) => (
        <div key={flavour} style={row}>{STATES.map((state) => <PhoneInput key={state} {...args} flavour={flavour} state={state} hint={hintFor(state)} />)}</div>
      ))}
    </div>
  ),
};

/** Each country brings its dial code and grouping. Picking one reformats the digits. */
export const Countries: Story = {
  render: (args) => <div style={row}>{["GB", "NG", "DE"].map((code) => <PhoneInput key={code} {...args} defaultCountry={code} defaultValue="8031234567" />)}</div>,
};

const stripes = (...colours: string[]) => (
  <svg viewBox="0 0 3 2" role="presentation">{colours.map((fill, i) => <rect key={fill + i} x={i} width="1" height="2" fill={fill} />)}</svg>
);
const ARTWORK: Record<string, React.ReactNode> = { IE: stripes("#169b62", "#fff", "#ff883e"), NG: stripes("#008751", "#fff", "#008751"), FR: stripes("#0055a4", "#fff", "#ef4135") };
const WITH_ARTWORK: PhoneCountry[] = PHONE_COUNTRIES.filter((c) => c.code in ARTWORK).map((c) => ({ ...c, flag: ARTWORK[c.code] }));

/** `flag` takes real artwork, an `<img>` or `<svg>`. It replaces the emoji in the control and the menu, on every platform. */
export const Flags: Story = { args: { countries: WITH_ARTWORK, defaultCountry: "NG", defaultValue: "8031234567" } };

/** The value is the national digits. The whole number arrives in E.164, and a `name` submits it. */
export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = React.useState("8006535350");
    const [detail, setDetail] = React.useState<PhoneInputDetail | null>(null);
    return (
      <div style={stack}>
        <PhoneInput {...args} value={value} onValueChange={(next, d) => { setValue(next); setDetail(d); }} />
        <output style={{ color: "var(--foreground-secondary)" }}>{detail ? detail.e164 || "empty" : "Type to see the E.164 value"}</output>
      </div>
    );
  },
};

/** Fills the container's width. */
export const Block: Story = { args: { block: true }, render: (args) => <div style={{ inlineSize: 480 }}><PhoneInput {...args} /></div> };
