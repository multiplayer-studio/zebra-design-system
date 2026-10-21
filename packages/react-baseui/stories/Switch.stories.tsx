import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "../src/index.js";
import { iconNames } from "@zebra-design-system/icons/names";

const meta: Meta<typeof Switch> = {
  title: "Components/Form/Switch",
  component: Switch,
  tags: ["autodocs"],
  parameters: {
    docs: { description: { component: "Behaviour from Base UI's Switch primitive; everything visual from the shared token layer." } },
  },
  argTypes: {
    defaultChecked: { control: "boolean", description: "The spec's Switch axis: off / on." },
    disabled: { control: "boolean" },
    onIcon: { control: "select", options: [undefined, ...iconNames], description: "Start slot, uncovered while on." },
    offIcon: { control: "select", options: [undefined, ...iconNames], description: "End slot, uncovered while off." },
  },
  args: { defaultChecked: false, disabled: false, onIcon: "microphone", offIcon: "microphone-off", "aria-label": "Microphone" },
};
export default meta;
type Story = StoryObj<typeof Switch>;

const Row = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>{children}</div>
);
const Caption = ({ children }: { children: React.ReactNode }) => (
  <span style={{ font: "500 12px/1.4 system-ui", opacity: 0.7, minWidth: 72 }}>{children}</span>
);

export const Playground: Story = {};

/**
 * The spec's Switch axis. Only the track changes colour; the thumb keeps its
 * colour and moves. Click any of them to see the motion.
 */
export const OnOff: Story = {
  render: () => (
    <Row>
      <Caption>off</Caption><Switch aria-label="Off" />
      <Caption>on</Caption><Switch defaultChecked aria-label="On" />
    </Row>
  ),
};

/**
 * The spec's State axis, against both Switch values. Focus is not a prop: tab
 * into the first row to see the ring, which is drawn inside the footprint.
 */
export const States: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 12 }}>
      <Row><Caption>enabled</Caption><Switch aria-label="Enabled, off" /><Switch defaultChecked aria-label="Enabled, on" /></Row>
      <Row><Caption>disabled</Caption><Switch disabled aria-label="Disabled, off" /><Switch disabled defaultChecked aria-label="Disabled, on" /></Row>
    </div>
  ),
};

/**
 * The icon slots, as in the spec's sample: a state-communicating pair. Leave
 * both unset (the spec's hasIcons=false) for a plain track and thumb.
 */
export const Icons: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 12 }}>
      <Row>
        <Caption>paired</Caption>
        <Switch onIcon="microphone" offIcon="microphone-off" aria-label="Microphone" />
        <Switch defaultChecked onIcon="microphone" offIcon="microphone-off" aria-label="Microphone" />
        <Switch disabled onIcon="microphone" offIcon="microphone-off" aria-label="Microphone" />
      </Row>
      <Row>
        <Caption>no icons</Caption>
        <Switch aria-label="Plain" />
        <Switch defaultChecked aria-label="Plain" />
      </Row>
    </div>
  ),
};

/** A native label names the switch and toggles it; inside a form it submits like a checkbox. */
export const WithLabelAndForm: Story = {
  render: function Render() {
    const [out, setOut] = React.useState("");
    return (
      <form
        style={{ display: "grid", gap: 12, font: "14px/1.4 system-ui", color: "var(--foreground-primary)" }}
        onSubmit={(e) => {
          e.preventDefault();
          setOut(JSON.stringify(Object.fromEntries(new FormData(e.currentTarget))));
        }}
      >
        <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <Switch name="wifi" defaultChecked /> Wi-Fi
        </label>
        <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <Switch name="bluetooth" /> Bluetooth
        </label>
        <div style={{ display: "flex", gap: 8 }}>
          <button type="submit">Submit</button><button type="reset">Reset</button>
        </div>
        <output>{out}</output>
      </form>
    );
  },
};

/** The thumb is positioned by logical edges, so it starts and travels from the inline-start side in RTL. */
export const RightToLeft: Story = {
  render: () => (
    <div dir="rtl">
      <Row>
        <Switch onIcon="microphone" offIcon="microphone-off" aria-label="Off" />
        <Switch defaultChecked onIcon="microphone" offIcon="microphone-off" aria-label="On" />
      </Row>
    </div>
  ),
};

/** Theming is a class, at any level. The switches are identical markup in every panel. */
export const ThemingCascade: Story = {
  render: () => {
    const Panel = ({ cls, label }: { cls: string; label: string }) => (
      <div
        className={cls}
        style={{ padding: 16, borderRadius: 8, background: "var(--surface-page)", color: "var(--foreground-primary)", border: "1px solid var(--border-default)" }}
      >
        <div style={{ font: "500 12px/1.4 system-ui", marginBottom: 8, opacity: 0.7 }}>{label || "base / light"}</div>
        <Row>
          <Switch onIcon="microphone" offIcon="microphone-off" aria-label="Off" />
          <Switch defaultChecked onIcon="microphone" offIcon="microphone-off" aria-label="On" />
          <Switch disabled defaultChecked aria-label="Disabled" />
        </Row>
      </div>
    );
    return (
      <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))" }}>
        {["", "mode-dark", "ext-companion", "ext-companion mode-dark", "ext-target", "ext-target mode-dark"].map((c) => (
          <Panel key={c} cls={c} label={c} />
        ))}
      </div>
    );
  },
};
