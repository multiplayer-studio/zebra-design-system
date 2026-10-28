import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../src/components/icon/icon.js";
import { iconNames } from "@zebra-design-system/icons/names";

const SIZES = ["xsmall", "small", "medium", "large"] as const;
const STYLES = ["rounded", "sharp"] as const;

const meta: Meta = {
  title: "Components/Icon",
  component: "zds-icon",
  tags: ["autodocs"],
  argTypes: {
    name: { control: "select", options: iconNames, description: "Any of the 715 glyphs in the icon font." },
    iconStyle: { control: "inline-radio", options: STYLES },
    size: { control: "inline-radio", options: SIZES },
    framed: { control: "boolean" },
    label: { control: "text" },
  },
  args: { name: "verified", iconStyle: "rounded", size: "small", framed: false, label: "" },
  render: (a) => html`
    <zds-icon name=${a.name} .iconStyle=${a.iconStyle} size=${a.size} ?framed=${a.framed} label=${a.label || undefined}></zds-icon>
  `,
};
export default meta;
type Story = StoryObj;

export const Playground: Story = {};

const row = (children: unknown) =>
  html`<div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap">${children}</div>`;

/** 16 / 20 / 28px, always square — bound to control-icon-sm/md/lg. */
export const Sizes: Story = {
  render: () => row(SIZES.map((s) => html`<zds-icon name="verified" size=${s}></zds-icon>`)),
};

/** Pads to a fixed 40px touch target (control-target-min), glyph keeps its own size. Only for a standalone tappable icon — a control that already provides a target, like Button, leaves this off. */
export const Framed: Story = {
  render: () => row(SIZES.map((s) => html`<zds-icon name="verified" size=${s} framed></zds-icon>`)),
};

/** Same codepoints, different outline — a font-family swap, never a different glyph. */
export const Style: Story = {
  render: () => row(STYLES.map((s) => html`<zds-icon name="alarm" .iconStyle=${s} size="large"></zds-icon>`)),
};

/** Undecorated, it takes currentColor and follows whatever embeds it. */
export const InheritsColour: Story = {
  render: () => html`
    <div style="display:flex;gap:24px;color:var(--foreground-primary)">
      <span style="color:var(--foreground-success)"><zds-icon name="verified" size="large"></zds-icon></span>
      <span style="color:var(--foreground-error)"><zds-icon name="verified" size="large"></zds-icon></span>
      <span style="color:var(--foreground-link)"><zds-icon name="verified" size="large"></zds-icon></span>
    </div>
  `,
};
