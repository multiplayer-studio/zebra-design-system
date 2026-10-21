import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../src/components/status-chip/status-chip.js";

const STATUSES = [["default", "Draft"], ["success", "Shipped"], ["warning", "Delayed"], ["negative", "Overdue"], ["info", "In review"]] as const;
const row = (c: unknown) => html`<div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center">${c}</div>`;
const cap = (t: string) => html`<div style="font:500 12px/1.4 system-ui;opacity:.7">${t}</div>`;

const meta: Meta = {
  title: "Components/Chips/Status Chip",
  component: "zds-status-chip",
  tags: ["autodocs"],
  argTypes: { status: { control: "select", options: STATUSES.map(([s]) => s) }, shape: { control: "inline-radio", options: ["rounded", "sharp"] } },
  args: { label: "Shipped", status: "success", shape: "rounded" },
  render: (a) => html`<zds-status-chip status=${a.status} shape=${a.shape}>${a.label}</zds-status-chip>`,
};
export default meta;
type Story = StoryObj;

export const Playground: Story = {};

/** Only the fill changes; the label names the state. */
export const Status: Story = { render: () => row(STATUSES.map(([s, l]) => html`<zds-status-chip status=${s}>${l}</zds-status-chip>`)) };

/** Spec \`rounded\`: radius/element-sm (rounded) or square (sharp). */
export const Shape: Story = {
  render: () => html`<div style="display:grid;gap:12px">${(["rounded", "sharp"] as const).map((sh) =>
    row(STATUSES.map(([s, l]) => html`<zds-status-chip status=${s} shape=${sh}>${l}</zds-status-chip>`)))}</div>`,
};

export const ThemingCascade: Story = {
  render: () => html`<div style="display:grid;gap:12px;grid-template-columns:repeat(auto-fit,minmax(320px,1fr))">
    ${["", "mode-dark", "ext-companion", "ext-companion mode-dark"].map((cls) => html`
      <div class=${cls} style="padding:16px;background:var(--surface-page);color:var(--foreground-primary);display:grid;gap:8px">
        ${cap(cls || "base / light")}
        ${row(STATUSES.map(([s, l]) => html`<zds-status-chip status=${s}>${l}</zds-status-chip>`))}
      </div>`)}
  </div>`,
};
