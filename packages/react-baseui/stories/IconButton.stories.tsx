import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { IconButton } from "../src/index.js";

const FLAVOURS = ["primary", "positive", "negative", "subtle", "text", "outline-subtle", "outline", "gradient", "text-gradient", "contrast", "outline-contrast"] as const;

const meta: Meta<typeof IconButton> = {
  title: "Components/Buttons/Icon Button",
  component: IconButton,
  tags: ["autodocs"],
  parameters: { docs: { description: { component: "A single glyph, no label: square at every size, with Button's eleven flavours, three shapes and four states. Every instance needs `label`, its accessible name. Spec: specs/icon-button." } } },
  argTypes: {
    flavour: { control: "select", options: FLAVOURS },
    size: { control: "inline-radio", options: ["small", "medium", "large"] },
    shape: { control: "inline-radio", options: ["sharp", "rounded", "full"] },
    disabled: { control: "boolean" },
  },
  args: { flavour: "primary", size: "small", shape: "sharp", disabled: false, icon: "more-horizontal", label: "More options" },
};
export default meta;
type Story = StoryObj<typeof IconButton>;

const Row = ({ children }: { children: React.ReactNode }) => <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>{children}</div>;

export const Playground: Story = {};
export const Flavour: Story = { render: () => <Row>{FLAVOURS.map((f) => <IconButton key={f} flavour={f} size="medium" shape="full" icon="close" label={f} />)}</Row> };
export const Size: Story = { render: () => <Row>{(["small", "medium", "large"] as const).map((s) => <IconButton key={s} size={s} shape="full" icon="close" label={s} />)}</Row> };
export const Shape: Story = { render: () => <Row>{(["sharp", "rounded", "full"] as const).map((s) => <IconButton key={s} size="medium" shape={s} icon="close" label={s} />)}</Row> };
/** Disabled swaps background and glyph to the family's disabled tokens. */
export const Disabled: Story = { render: () => <Row>{FLAVOURS.map((f) => <IconButton key={f} flavour={f} size="medium" shape="full" icon="close" label={f} disabled />)}</Row> };

export const ThemingCascade: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit,minmax(380px,1fr))" }}>
      {["", "mode-dark", "ext-companion", "ext-companion mode-dark"].map((cls) => (
        <div key={cls} className={cls} style={{ padding: 16, borderRadius: 8, background: "var(--surface-page)", color: "var(--foreground-primary)", border: "1px solid var(--border-default)", display: "grid", gap: 8 }}>
          <div style={{ font: "500 12px/1.4 system-ui", opacity: 0.7 }}>{cls || "base / light"}</div>
          <Row>{FLAVOURS.map((f) => <IconButton key={f} flavour={f} size="medium" shape="rounded" icon="close" label={f} />)}</Row>
        </div>
      ))}
    </div>
  ),
};
