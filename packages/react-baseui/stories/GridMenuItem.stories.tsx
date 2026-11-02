import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { GridMenuItem } from "../src/index.js";

const meta: Meta<typeof GridMenuItem> = {
  title: "Components/Bottom Sheet/Grid Menu Item",
  component: GridMenuItem,
  tags: ["autodocs"],
  args: { label: "Camera", icon: "camera", active: false, disabled: false, rounded: true, showBadge: false },
  render: (args) => <div style={{ width: 104 }}><GridMenuItem {...args} /></div>,
};
export default meta;
type Story = StoryObj<typeof GridMenuItem>;

export const Playground: Story = {};

/** Default, active, disabled, badge and square corners. Hover and press come from the pointer. */
export const States: Story = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 104px)", gap: 12 }}>
      <GridMenuItem label="Camera" icon="camera" />
      <GridMenuItem label="Gallery" icon="image" active />
      <GridMenuItem label="Document" icon="document" disabled />
      <GridMenuItem label="Contacts" icon="contacts" showBadge />
      <GridMenuItem label="Location" icon="location" rounded={false} />
    </div>
  ),
};
