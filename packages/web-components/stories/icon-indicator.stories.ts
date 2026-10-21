import type { Meta, StoryObj } from "@storybook/web-components";
import { html, nothing } from "lit";
import "../src/components/icon-indicator/icon-indicator.js";

const meta: Meta = {
  title: "Components/Badges/Icon Indicator",
  component: "zds-icon-indicator",
  tags: ["autodocs"],
  parameters: { docs: { description: { component: "Clock on foreground/secondary by default (spec). The host can set icon, fill and foreground (owner decision)." } } },
  argTypes: { size: { control: "inline-radio", options: ["small", "medium", "large"] }, icon: { control: "text" }, fill: { control: "text" }, foreground: { control: "text" } },
  args: { size: "small", icon: "clock", fill: "", foreground: "", label: "Pending" },
  render: (a) => html`<zds-icon-indicator size=${a.size} icon=${a.icon} fill=${a.fill || nothing} foreground=${a.foreground || nothing} label=${a.label}></zds-icon-indicator>`,
};
export default meta;
type Story = StoryObj;

const row = (c: unknown) => html`<div style="display:flex;gap:16px;align-items:center">${c}</div>`;

export const Playground: Story = {};

/** The circle and the glyph scale together: 16 / 20 / 28 with a 12 / 16 / 24 glyph. */
export const Size: Story = { render: () => row((["small", "medium", "large"] as const).map((s) => html`<zds-icon-indicator size=${s}></zds-icon-indicator>`)) };

/** Beyond the spec: host-set glyph and colours. */
export const HostColours: Story = {
  render: () => row(html`
    <zds-icon-indicator size="large" icon="check-mark" fill="--feedback-success-background-strong" foreground="--foreground-on-strong"></zds-icon-indicator>
    <zds-icon-indicator size="large" icon="priority" fill="--feedback-error-background-strong" foreground="--foreground-on-strong"></zds-icon-indicator>
    <zds-icon-indicator size="large" icon="flag" style="--zds-icon-indicator-fill:var(--feedback-warning-background-subtle);--zds-icon-indicator-foreground:var(--foreground-warning)"></zds-icon-indicator>`),
};

export const ThemingCascade: Story = {
  render: () => html`<div style="display:grid;gap:12px;grid-template-columns:repeat(auto-fit,minmax(220px,1fr))">
    ${["", "mode-dark", "ext-companion", "ext-companion mode-dark"].map((cls) => html`
      <div class=${cls} style="padding:16px;border-radius:8px;background:var(--surface-page);color:var(--foreground-primary);border:1px solid var(--border-default);display:grid;gap:8px">
        <div style="font:500 12px/1.4 system-ui;opacity:.7">${cls || "base / light"}</div>
        ${row((["small", "medium", "large"] as const).map((s) => html`<zds-icon-indicator size=${s}></zds-icon-indicator>`))}
      </div>`)}
  </div>`,
};
