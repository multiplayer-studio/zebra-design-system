import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Icon } from "../src/index.js";
import { iconNames } from "@zebra-design-system/icons/names";

const SIZES = ["small", "medium", "large"] as const;
const STYLES = ["rounded", "sharp"] as const;

const meta: Meta<typeof Icon> = {
  title: "Components/Icon",
  component: Icon,
  tags: ["autodocs"],
  parameters: {
    docs: { description: { component: "A single glyph from the icon font, sized and framed to match the icon spec." } },
  },
  argTypes: {
    name: { control: "select", options: iconNames },
    iconStyle: { control: "inline-radio", options: STYLES },
    size: { control: "inline-radio", options: SIZES },
    framed: { control: "boolean" },
    label: { control: "text" },
  },
  args: { name: "verified", iconStyle: "rounded", size: "small", framed: false },
};
export default meta;
type Story = StoryObj<typeof Icon>;

const Row = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>{children}</div>
);

export const Playground: Story = {};

/** 16 / 20 / 28px, always square — bound to control-icon-sm/md/lg. */
export const Sizes: Story = {
  render: () => <Row>{SIZES.map((s) => <Icon key={s} name="verified" size={s} />)}</Row>,
};

/** Pads to a fixed 40px touch target (control-target-min), glyph keeps its own size. Only for a standalone tappable icon — a control that already provides a target, like Button, leaves this off. */
export const Framed: Story = {
  render: () => <Row>{SIZES.map((s) => <Icon key={s} name="verified" size={s} framed />)}</Row>,
};

/** Same codepoints, different outline — a font-family swap, never a different glyph. */
export const Style: Story = {
  render: () => <Row>{STYLES.map((s) => <Icon key={s} name="alarm" iconStyle={s} size="large" />)}</Row>,
};

/** Undecorated, it takes currentColor and follows whatever embeds it. */
export const InheritsColour: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 24 }}>
      <span style={{ color: "var(--foreground-success)" }}><Icon name="verified" size="large" /></span>
      <span style={{ color: "var(--foreground-error)" }}><Icon name="verified" size="large" /></span>
      <span style={{ color: "var(--foreground-link)" }}><Icon name="verified" size="large" /></span>
    </div>
  ),
};
