import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../src/components/notification-indicator/notification-indicator.js";

const SIZES = ["small", "medium", "large"] as const;

const meta: Meta = {
  title: "Components/Notification Indicator",
  component: "zds-notification-indicator",
  tags: ["autodocs"],
  argTypes: {
    size: { control: "inline-radio", options: SIZES },
  },
  args: { size: "large", value: "2" },
  render: (a) => html`<zds-notification-indicator size=${a.size} .value=${a.value}></zds-notification-indicator>`,
};
export default meta;
type Story = StoryObj;

export const Playground: Story = {};

/** Small is a plain dot with no label part at all — medium and large render `value`. */
export const Sizes: Story = {
  render: () => html`
    <div style="display:flex;gap:24px;align-items:center">
      ${SIZES.map((size) => html`<zds-notification-indicator size=${size} value="2"></zds-notification-indicator>`)}
    </div>
  `,
};

/** Truncates with an ending ellipsis past 1 line (medium) or 3 lines (large). */
export const LongValue: Story = {
  args: { size: "large", value: "99+" },
};

/** Pinned to the corner of an icon or nav item — its usual placement. */
export const OnAnIcon: Story = {
  render: () => html`
    <div style="position:relative;display:inline-flex;width:40px;height:40px;align-items:center;justify-content:center;background:var(--surface-card);border-radius:var(--radius-sm)">
      <span style="font-size:20px">🔔</span>
      <div style="position:absolute;top:-4px;right:-4px">
        <zds-notification-indicator size="small" aria-label="3 unread notifications"></zds-notification-indicator>
      </div>
    </div>
  `,
};

/** A class on any ancestor re-themes the badge's colours with no re-render. */
export const ThemingCascade: Story = {
  render: () => {
    const panel = (cls: string, label: string) => html`
      <div class=${cls} style="padding:16px;border-radius:8px;background:var(--surface-page);color:var(--foreground-primary)">
        <div style="font:500 12px/1.4 system-ui;margin-bottom:8px;opacity:.7">${label || "base / light"}</div>
        <zds-notification-indicator size="large" value="2"></zds-notification-indicator>
      </div>`;
    return html`<div style="display:grid;gap:12px;grid-template-columns:repeat(auto-fit,minmax(200px,1fr))">
      ${panel("", "")}
      ${panel("mode-dark", "mode-dark")}
      ${panel("ext-companion", "ext-companion")}
    </div>`;
  },
};
