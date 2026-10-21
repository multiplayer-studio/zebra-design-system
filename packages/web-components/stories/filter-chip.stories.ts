import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../src/components/filter-chip/filter-chip.js";

const FILTERS = ["In stock", "On sale", "Free delivery", "Rated 4+"];
const row = (c: unknown) => html`<div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center">${c}</div>`;
const cap = (t: string) => html`<div style="font:500 12px/1.4 system-ui;opacity:.7">${t}</div>`;

const meta: Meta = {
  title: "Components/Filter Chip",
  component: "zds-filter-chip",
  tags: ["autodocs"],
  argTypes: { shape: { control: "inline-radio", options: ["rounded", "sharp"] } },
  args: { label: "In stock", active: false, disabled: false, shape: "rounded" },
  render: (a) => html`<zds-filter-chip .active=${a.active} ?disabled=${a.disabled} shape=${a.shape}>${a.label}</zds-filter-chip>`,
};
export default meta;
type Story = StoryObj;

export const Playground: Story = {};

/** The real switch: inverse palette plus a check mark, which keeps the on state readable without colour. */
export const Active: Story = { render: () => row(html`<zds-filter-chip>In stock</zds-filter-chip><zds-filter-chip active>In stock</zds-filter-chip>`) };

/** Hover and focus come from interaction. A group where more than one can be on: click to switch. */
export const State: Story = { render: () => row(FILTERS.map((f, i) => html`<zds-filter-chip ?active=${i < 2}>${f}</zds-filter-chip>`)) };

/** Locked, inactive and active. Say why nearby. */
export const Disabled: Story = { render: () => row(html`<zds-filter-chip disabled>On sale</zds-filter-chip><zds-filter-chip disabled active>In stock</zds-filter-chip>`) };

/** Spec \`rounded\`: pill (rounded) or square (sharp). */
export const Shape: Story = {
  render: () => html`<div style="display:grid;gap:12px">${(["rounded", "sharp"] as const).map((s) =>
    row(FILTERS.map((f, i) => html`<zds-filter-chip shape=${s} ?active=${i === 0}>${f}</zds-filter-chip>`)))}</div>`,
};

export const ThemingCascade: Story = {
  render: () => html`<div style="display:grid;gap:12px;grid-template-columns:repeat(auto-fit,minmax(320px,1fr))">
    ${["", "mode-dark", "ext-companion", "ext-companion mode-dark"].map((cls) => html`
      <div class=${cls} style="padding:16px;background:var(--surface-page);color:var(--foreground-primary);display:grid;gap:8px">
        ${cap(cls || "base / light")}
        ${row(html`<zds-filter-chip active>In stock</zds-filter-chip><zds-filter-chip>On sale</zds-filter-chip><zds-filter-chip disabled>Free delivery</zds-filter-chip>`)}
      </div>`)}
  </div>`,
};
