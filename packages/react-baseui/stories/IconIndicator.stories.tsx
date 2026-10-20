import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { IconIndicator } from "../src/index.js";

const meta: Meta<typeof IconIndicator> = {
  title: "Components/Icon Indicator", component: IconIndicator, tags: ["autodocs"],
  parameters: { docs: { description: { component: "Clock on foreground/secondary by default (spec). The host can set icon, fill and foreground (owner decision)." } } },
  argTypes: { size: { control: "inline-radio", options: ["small", "medium", "large"] } },
  args: { size: "small", label: "Pending" },
};
export default meta;
type Story = StoryObj<typeof IconIndicator>;

export const Playground: Story = {};
/** The circle and the glyph scale together: 16 / 20 / 28 with a 12 / 16 / 24 glyph. */
export const Size: Story = { render: () => <div style={{ display: "flex", gap: 16, alignItems: "center" }}>{(["small", "medium", "large"] as const).map((s) => <IconIndicator key={s} size={s} />)}</div> };
/** Beyond the spec: host-set glyph and colours. */
export const HostColours: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
      <IconIndicator size="large" icon="check-mark" fill="--feedback-success-background-strong" foreground="--foreground-on-strong" />
      <IconIndicator size="large" icon="priority" fill="--feedback-error-background-strong" foreground="--foreground-on-strong" />
    </div>
  ),
};
