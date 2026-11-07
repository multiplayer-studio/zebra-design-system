import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Icon } from "../src/index.js";
import { iconNames } from "@zebra-design-system/icons/names";

const SIZES = ["xsmall", "small", "medium", "large"] as const;
const STYLES = ["rounded", "sharp"] as const;
const PX = { xsmall: 12, small: 16, medium: 20, large: 28 } as const;

const meta: Meta<typeof Icon> = {
  title: "Components/Icon",
  component: Icon,
  tags: ["autodocs"],
  parameters: {
    design: { type: "figma", url: "https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=2046-15004" },
    docs: { description: { component: "A single glyph from the icon font, sized and framed to match the icon spec. It takes its colour from whatever embeds it." } },
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

const Cap = ({ children }: { children: React.ReactNode }) => (
  <span style={{ font: "500 12px/1.4 system-ui", opacity: 0.7, color: "var(--foreground-primary)" }}>{children}</span>
);
const Cell = ({ caption, children }: { caption: string; children: React.ReactNode }) => (
  <div style={{ display: "grid", justifyItems: "center", gap: 8 }}>{children}<Cap>{caption}</Cap></div>
);
const Row = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: "flex", gap: 24, alignItems: "end", flexWrap: "wrap" }}>{children}</div>
);
// Outlines the framed box so the padding shows; the component itself draws nothing.
const OUTLINE: React.CSSProperties = { outline: "1px dashed var(--border-default)" };

export const Playground: Story = {};

/** 12 / 16 / 20 / 28px, always square — bound to control-icon-xs/sm/md/lg on both axes. */
export const Sizes: Story = {
  render: () => <Row>{SIZES.map((s) => <Cell key={s} caption={`${s} · ${PX[s]}px`}><Icon name="verified" size={s} /></Cell>)}</Row>,
};

/** Pads to a fixed box, glyph keeps its own size: 40px (control-target-min), or 24px (control-xs) at xsmall. Only for a standalone tappable icon — a control that already provides a target, like Button, leaves this off. The dashed outline is the story's, not the component's. */
export const Framed: Story = {
  render: () => (
    <Row>{SIZES.map((s) => <Cell key={s} caption={`${s} · ${s === "xsmall" ? 24 : 40}px box`}><Icon name="verified" size={s} framed style={OUTLINE} /></Cell>)}</Row>
  ),
};

/** Same codepoints, different outline — a font-family swap, never a different glyph. */
export const Style: Story = {
  render: () => <Row>{STYLES.map((s) => <Cell key={s} caption={s}><Icon name="alarm" iconStyle={s} size="large" /></Cell>)}</Row>,
};

/** Undecorated, it takes currentColor and follows whatever embeds it. */
export const InheritsColour: Story = {
  render: () => (
    <Row>
      {(["success", "error", "link"] as const).map((c) => (
        <Cell key={c} caption={`foreground/${c}`}><span style={{ color: `var(--foreground-${c})` }}><Icon name="verified" size="large" /></span></Cell>
      ))}
    </Row>
  ),
};

/** Without a label an icon is hidden from assistive technology; with one it is announced as an image with that name. */
export const AccessibleName: Story = {
  render: () => (
    <Row>
      <Cell caption="decorative (aria-hidden)"><Icon name="verified" size="medium" /></Cell>
      <Cell caption='label="Verified" (role img)'><Icon name="verified" size="medium" label="Verified" /></Cell>
    </Row>
  ),
};
