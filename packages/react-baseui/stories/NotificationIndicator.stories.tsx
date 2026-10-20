import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { NotificationIndicator } from "../src/index.js";

const SIZES = ["small", "medium", "large"] as const;

const meta: Meta<typeof NotificationIndicator> = {
  title: "Components/Notification Indicator",
  component: NotificationIndicator,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "A small badge that flags unread or pending activity on an icon or navigation item.",
      },
    },
  },
  argTypes: {
    size: { control: "inline-radio", options: SIZES },
  },
  args: {
    size: "large",
    value: "2",
  },
};
export default meta;
type Story = StoryObj<typeof NotificationIndicator>;

export const Playground: Story = {};

/** Small is a plain dot with no label part at all — medium and large render `value`. */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
      {SIZES.map((size) => (
        <NotificationIndicator key={size} size={size} value="2" />
      ))}
    </div>
  ),
};

/** Truncates with an ending ellipsis past 1 line (medium) or 3 lines (large). */
export const LongValue: Story = {
  args: { size: "large", value: "99+" },
};

/** Pinned to the corner of an icon or nav item — its usual placement. */
export const OnAnIcon: Story = {
  render: () => (
    <div style={{ position: "relative", display: "inline-flex", width: 40, height: 40, alignItems: "center", justifyContent: "center", background: "var(--surface-card)", borderRadius: "var(--radius-sm)" }}>
      <span style={{ fontSize: 20 }}>🔔</span>
      <div style={{ position: "absolute", top: -4, right: -4 }}>
        <NotificationIndicator size="small" aria-label="3 unread notifications" />
      </div>
    </div>
  ),
};

/** A class on any ancestor re-themes the badge's colours with no re-render. */
export const ThemingCascade: Story = {
  render: () => {
    const panel = (cls: string, label: string) => (
      <div className={cls} style={{ padding: 16, borderRadius: 8, background: "var(--surface-page)", color: "var(--foreground-primary)" }}>
        <div style={{ font: "500 12px/1.4 system-ui", marginBottom: 8, opacity: 0.7 }}>{label || "base / light"}</div>
        <NotificationIndicator size="large" value="2" />
      </div>
    );
    return (
      <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
        {panel("", "")}
        {panel("mode-dark", "mode-dark")}
        {panel("ext-companion", "ext-companion")}
      </div>
    );
  },
};
