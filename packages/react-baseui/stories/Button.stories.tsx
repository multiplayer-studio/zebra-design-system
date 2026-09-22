import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../src/index.js";
import { iconNames } from "@zebra-design-system/icons/names";

const FLAVOURS = ["primary","positive","negative","subtle","text","outline-subtle","outline","gradient","text-gradient"] as const;
const SIZES = ["small","medium","large"] as const;
const SHAPES = ["sharp","rounded","full"] as const;

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    docs: { description: { component: "Behaviour from Base UI's Button primitive; everything visual from the shared token layer." } },
  },
  argTypes: {
    flavour: { control: "select", options: FLAVOURS },
    size: { control: "inline-radio", options: SIZES },
    shape: { control: "inline-radio", options: SHAPES },
    disabled: { control: "boolean" },
    leadingIcon: { control: "select", options: [undefined, ...iconNames] },
    trailingIcon: { control: "select", options: [undefined, ...iconNames] },
  },
  args: { flavour: "primary", size: "small", shape: "sharp", disabled: false, children: "Button" },
};
export default meta;
type Story = StoryObj<typeof Button>;

const Row = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>{children}</div>
);

export const Playground: Story = {};

/** Nine flavours. Use one primary per view; everything else steps down. */
export const Flavours: Story = {
  render: () => <Row>{FLAVOURS.map((f) => <Button key={f} flavour={f} shape="rounded">{f}</Button>)}</Row>,
};

/** Height, padding, type ramp and icon size move together. */
export const Sizes: Story = {
  render: () => <Row>{SIZES.map((s) => <Button key={s} size={s} shape="rounded" leadingIcon="check-mark">{s}</Button>)}</Row>,
};

export const Shapes: Story = {
  render: () => <Row>{SHAPES.map((s) => <Button key={s} shape={s}>{s}</Button>)}</Row>,
};

/** No flavour keeps its accent colour when disabled, so they look alike. */
export const Disabled: Story = {
  render: () => <Row>{FLAVOURS.map((f) => <Button key={f} flavour={f} shape="rounded" disabled>{f}</Button>)}</Row>,
};

/** Icons are font glyphs, so they inherit the button's colour and scale. */
export const WithIcons: Story = {
  render: () => (
    <Row>
      <Button shape="rounded" leadingIcon="add">Leading</Button>
      <Button shape="rounded" trailingIcon="arrow-forward">Trailing</Button>
      <Button shape="rounded" leadingIcon="add" trailingIcon="arrow-forward">Both</Button>
      <Button shape="sharp" leadingIcon="add">Sharp family</Button>
    </Row>
  ),
};

/**
 * Base UI's `render` prop: the same component, a different element. Behaviour
 * and styling are preserved — this is what we get from the primitive rather
 * than hand-rolling.
 */
export const AsLink: Story = {
  render: () => (
    <Row>
      <Button shape="rounded" render={<a href="https://design.zebra.com" />} trailingIcon="arrow-forward">
        Renders an anchor
      </Button>
      <Button shape="rounded" flavour="outline" nativeButton={false} render={<div />}>
        Renders a div, still a button to AT
      </Button>
    </Row>
  ),
};

/** Theming is a class, at any level, cascading to everything inside. */
export const ThemingCascade: Story = {
  render: () => {
    const Panel = ({ cls, label }: { cls: string; label: string }) => (
      <div className={cls} style={{ padding: 16, borderRadius: 8, background: "var(--surface-page)", color: "var(--foreground-primary)", border: "1px solid var(--border-default)" }}>
        <div style={{ font: "500 12px/1.4 system-ui", marginBottom: 8, opacity: 0.7 }}>{label || "base / light"}</div>
        <Row>
          <Button shape="rounded">Primary</Button>
          <Button shape="rounded" flavour="outline">Outline</Button>
          <Button shape="rounded" flavour="text">Text</Button>
        </Row>
      </div>
    );
    return (
      <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))" }}>
        <Panel cls="" label="" />
        <Panel cls="mode-dark" label="mode-dark" />
        <Panel cls="ext-companion" label="ext-companion" />
        <Panel cls="ext-companion mode-dark" label="ext-companion mode-dark" />
        <Panel cls="ext-target" label="ext-target" />
        <Panel cls="ext-target mode-dark" label="ext-target mode-dark" />
      </div>
    );
  },
};
