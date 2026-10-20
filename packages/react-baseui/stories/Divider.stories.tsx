import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Divider } from "../src/index.js";

const ORIENTATIONS = ["horizontal", "vertical"] as const;

const meta: Meta<typeof Divider> = {
  title: "Components/Divider",
  component: Divider,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A thin line used to visually separate content into distinct sections or groups, such as list rows, cards, or menu items.",
      },
    },
  },
  argTypes: {
    orientation: { control: "inline-radio", options: ORIENTATIONS },
  },
  args: {
    orientation: "horizontal",
  },
  render: (a) => (
    <div style={{ width: a.orientation === "vertical" ? undefined : 320, height: a.orientation === "vertical" ? 40 : undefined }}>
      <Divider {...a} />
    </div>
  ),
};
export default meta;
type Story = StoryObj<typeof Divider>;

export const Playground: Story = {};

/** Horizontal separates stacked content; vertical separates side-by-side content. */
export const Orientations: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
      <div style={{ width: 320 }}>
        <Divider orientation="horizontal" />
      </div>
      <div style={{ height: 40, display: "flex" }}>
        <Divider orientation="vertical" />
      </div>
    </div>
  ),
};

/** The line stretches with its container — not fixed at the default 320×1 (or 1×40) size. */
export const FillsContainer: Story = {
  render: () => (
    <div style={{ width: 480 }}>
      <Divider orientation="horizontal" />
    </div>
  ),
};

/** A class on any ancestor re-themes border/default with no re-render. */
export const ThemingCascade: Story = {
  render: () => {
    const panel = (cls: string, label: string) => (
      <div className={cls} style={{ padding: 16, borderRadius: 8, background: "var(--surface-page)", color: "var(--foreground-primary)" }}>
        <div style={{ font: "500 12px/1.4 system-ui", marginBottom: 8, opacity: 0.7 }}>{label || "base / light"}</div>
        <div style={{ width: 240 }}>
          <Divider orientation="horizontal" />
        </div>
      </div>
    );
    return (
      <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
        {panel("", "")}
        {panel("mode-dark", "mode-dark")}
        {panel("ext-companion", "ext-companion")}
      </div>
    );
  },
};
