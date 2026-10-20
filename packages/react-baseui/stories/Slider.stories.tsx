import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Slider } from "../src/index.js";

const SHAPES = ["rounded", "sharp"] as const;

const meta: Meta<typeof Slider> = {
  title: "Components/Slider",
  component: Slider,
  tags: ["autodocs"],
  parameters: {
    docs: { description: { component: "Behaviour from Base UI's Slider primitive; everything visual from the shared token layer." } },
  },
  argTypes: {
    shape: { control: "inline-radio", options: SHAPES },
    disabled: { control: "boolean" },
    stepped: { control: "boolean", description: "Only certain values can be chosen: a dot at every stop. Use with a coarse step." },
    min: { control: "number" },
    max: { control: "number" },
    step: { control: "number" },
  },
  args: { shape: "rounded", disabled: false, stepped: true, min: 0, max: 100, step: 25, defaultValue: 50, label: "Volume" },
  decorators: [(Story) => <div style={{ maxWidth: 400 }}><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof Slider>;

const Stack = ({ children }: { children: React.ReactNode }) => <div style={{ display: "grid", gap: 24, maxWidth: 400 }}>{children}</div>;
const Labelled = ({ text, children }: { text: string; children: React.ReactNode }) => (
  <div style={{ display: "grid", gap: 8 }}><span style={{ font: "500 12px/1.4 system-ui", opacity: 0.7 }}>{text}</span>{children}</div>
);

export const Playground: Story = {};

/** Corner treatment of the track and thumb together. It carries no meaning. */
export const Shapes: Story = {
  render: () => <Stack>{SHAPES.map((s) => <Labelled key={s} text={s}><Slider shape={s} defaultValue={60} label={s} /></Labelled>)}</Stack>,
};

/**
 * Default and disabled are shown. Hover a thumb (only that thumb grows), drag
 * one (the fill and both thumbs turn to the selected colour), or Tab in
 * (selected colour, plus a ring on the focused thumb).
 */
export const States: Story = {
  render: () => (
    <Stack>
      <Labelled text="default — hover, drag or Tab into it"><Slider defaultValue={[20, 70]} startLabel="Minimum" label="Maximum" /></Labelled>
      <Labelled text="disabled"><Slider disabled defaultValue={40} label="Disabled" /></Labelled>
    </Stack>
  ),
};

/** One dot per valid stop, derived from min, max and step. */
export const Stepped: Story = {
  render: () => (
    <Stack>
      <Labelled text="step 25"><Slider stepped step={25} defaultValue={50} label="Step 25" /></Labelled>
      <Labelled text="step 10"><Slider stepped step={10} defaultValue={30} label="Step 10" /></Labelled>
      <Labelled text="continuous"><Slider defaultValue={30} label="Continuous" /></Labelled>
    </Stack>
  ),
};

/** A span rather than a value: pass two values. Each thumb has its own name. */
export const Range: Story = {
  render: () => (
    <Stack>
      <Labelled text="range"><Slider defaultValue={[20, 70]} startLabel="Minimum" label="Maximum" /></Labelled>
      <Labelled text="range with steps"><Slider stepped step={10} defaultValue={[30, 60]} startLabel="Minimum" label="Maximum" /></Labelled>
      <Labelled text="range, disabled"><Slider disabled defaultValue={[20, 70]} startLabel="Minimum" label="Maximum" /></Labelled>
    </Stack>
  ),
};

/** Theming is a class, at any level. */
export const ThemingCascade: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))" }}>
      {["", "mode-dark", "ext-companion", "ext-companion mode-dark"].map((cls) => (
        <div key={cls} className={cls} style={{ padding: 16, borderRadius: 8, background: "var(--surface-page)", color: "var(--foreground-primary)", border: "1px solid var(--border-default)" }}>
          <div style={{ font: "500 12px/1.4 system-ui", marginBottom: 12, opacity: 0.7 }}>{cls || "base / light"}</div>
          <div style={{ display: "grid", gap: 20 }}>
            <Slider stepped step={25} defaultValue={50} label="Default" />
            <Slider defaultValue={[20, 70]} startLabel="Minimum" label="Maximum" />
            <Slider disabled defaultValue={50} label="Disabled" />
          </div>
        </div>
      ))}
    </div>
  ),
};
