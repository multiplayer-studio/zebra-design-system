import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { StepperInput } from "../src/index.js";

const Stack = ({ children }: { children: React.ReactNode }) => <div style={{ display: "grid", gap: 16, justifyItems: "start" }}>{children}</div>;
const Cap = ({ children }: { children: React.ReactNode }) => <div style={{ font: "500 12px/1.4 system-ui", opacity: 0.7 }}>{children}</div>;

const meta: Meta<typeof StepperInput> = {
  title: "Components/Stepper Input", component: StepperInput, tags: ["autodocs"],
  argTypes: {
    size: { control: "inline-radio", options: ["medium", "large"] },
    shape: { control: "inline-radio", options: ["sharp", "rounded"] },
    onValueChange: { action: "valueChange" },
  },
  args: { label: "Guests", defaultValue: 2, min: 1, max: 12, step: 1, size: "medium", shape: "sharp", disabled: false, invalid: false, hint: "" },
};
export default meta;
type Story = StoryObj<typeof StepperInput>;

export const Playground: Story = {};

/** Spec `size`: only the buttons and the value's height grow; the value's width and text hold. */
export const Size: Story = {
  render: () => (
    <Stack>
      {(["medium", "large"] as const).map((s) => (
        <React.Fragment key={s}><Cap>{s}</Cap><StepperInput label={`Guests, ${s}`} size={s} defaultValue={2} min={1} max={12} /></React.Fragment>
      ))}
    </Stack>
  ),
};

/** Spec `rounded` (false | true), as the library's `shape`: the buttons round, the value stays square (metadata intent). */
export const Shape: Story = {
  render: () => (
    <Stack>
      {(["sharp", "rounded"] as const).map((s) => (
        <React.Fragment key={s}><Cap>{s}</Cap><StepperInput label={`Guests, ${s}`} shape={s} defaultValue={2} min={1} max={12} /></React.Fragment>
      ))}
    </Stack>
  ),
};

/** Spec `disabled`: the whole control dims; buttons keep outline-subtle; the hint stays, dimmed. */
export const Disabled: Story = {
  render: () => (
    <Stack>
      <Cap>enabled</Cap><StepperInput label="Guests" defaultValue={2} min={1} max={12} hint="Up to 12 guests per booking" />
      <Cap>disabled</Cap><StepperInput label="Guests" defaultValue={2} min={1} max={12} hint="Up to 12 guests per booking" disabled />
    </Stack>
  ),
};

/** Spec `showHint`: a hint explains a constraint. `invalid` wires the error hint Figma has but never places. */
export const Hint: Story = {
  render: () => (
    <Stack>
      <Cap>no hint</Cap><StepperInput label="Copies" defaultValue={1} min={1} max={99} />
      <Cap>hint</Cap><StepperInput label="Copies" defaultValue={1} min={1} max={99} hint="Between 1 and 99 copies" />
      <Cap>invalid</Cap><StepperInput label="Copies" defaultValue={0} min={0} max={99} invalid hint="Print at least one copy" />
    </Stack>
  ),
};

/** The number model: bounds disable the matching button, press-and-hold repeats, ArrowUp/Down (Shift ×largeStep), PageUp/Down, Home/End; a typed value is kept. Width follows the widest bound. */
export const Value: Story = {
  render: function Value() {
    const [value, setValue] = React.useState<number | null>(0);
    return (
      <Stack>
        <Cap>at min (0–5)</Cap><StepperInput label="Bags" defaultValue={0} min={0} max={5} />
        <Cap>at max (0–5)</Cap><StepperInput label="Bags" defaultValue={5} min={0} max={5} />
        <Cap>step 0.5, 0–10</Cap><StepperInput label="Hours" defaultValue={1.5} min={0} max={10} step={0.5} largeStep={2} />
        <Cap>wide range, 0–100,000 (step 100)</Cap><StepperInput label="Budget" defaultValue={2500} min={0} max={100000} step={100} largeStep={1000} />
        <Cap>controlled, -10–10</Cap>
        <StepperInput label="Offset" value={value} onValueChange={setValue} min={-10} max={10} />
        <Cap>value: {String(value)}</Cap>
      </Stack>
    );
  },
};

export const ThemingCascade: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" }}>
      {["", "mode-dark", "ext-companion", "ext-companion mode-dark"].map((cls) => (
        <div key={cls} className={cls} style={{ padding: 16, background: "var(--surface-page)", color: "var(--foreground-primary)", display: "grid", gap: 12, justifyItems: "start" }}>
          <Cap>{cls || "base / light"}</Cap>
          <StepperInput label="Guests" defaultValue={2} min={1} max={12} hint="Up to 12 guests" />
          <StepperInput label="Guests" defaultValue={1} min={1} max={12} shape="rounded" size="large" />
          <StepperInput label="Copies" defaultValue={0} min={0} max={99} invalid hint="Print at least one copy" />
          <StepperInput label="Guests" defaultValue={2} min={1} max={12} disabled hint="Booking closed" />
        </div>
      ))}
    </div>
  ),
};
