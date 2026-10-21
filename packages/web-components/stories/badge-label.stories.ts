import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../src/components/badge-label/badge-label.js";

const VARIANTS = ["neutral", "info", "positive", "warning", "negative"] as const;
const title = (s: string) => s[0].toUpperCase() + s.slice(1);

const meta: Meta = {
  title: "Components/Badges/Badge Label",
  component: "zds-badge-label",
  tags: ["autodocs"],
  parameters: { docs: { description: { component: "Figma's \"Label\" badge: a fixed category in a word or two, solid fill." } } },
  argTypes: { variant: { control: "select", options: VARIANTS }, shape: { control: "inline-radio", options: ["rounded", "sharp"] } },
  args: { variant: "positive", shape: "rounded", label: "New" },
  render: (a) => html`<zds-badge-label variant=${a.variant} shape=${a.shape}>${a.label}</zds-badge-label>`,
};
export default meta;
type Story = StoryObj;

const row = (c: unknown) => html`<div style="display:flex;flex-wrap:wrap;gap:12px;align-items:center">${c}</div>`;

export const Playground: Story = {};

export const Variant: Story = { render: () => row(VARIANTS.map((v) => html`<zds-badge-label variant=${v}>${title(v)}</zds-badge-label>`)) };

export const Shape: Story = {
  render: () => html`<div style="display:grid;gap:12px">${(["rounded", "sharp"] as const).map((sh) => row(VARIANTS.map((v) => html`<zds-badge-label variant=${v} shape=${sh}>${title(v)}</zds-badge-label>`)))}</div>`,
};

export const ThemingCascade: Story = {
  render: () => html`<div style="display:grid;gap:12px;grid-template-columns:repeat(auto-fit,minmax(300px,1fr))">
    ${["", "mode-dark", "ext-companion", "ext-companion mode-dark"].map((cls) => html`
      <div class=${cls} style="padding:16px;border-radius:8px;background:var(--surface-page);color:var(--foreground-primary);border:1px solid var(--border-default);display:grid;gap:8px">
        <div style="font:500 12px/1.4 system-ui;opacity:.7">${cls || "base / light"}</div>
        ${row(VARIANTS.map((v) => html`<zds-badge-label variant=${v}>${title(v)}</zds-badge-label>`))}
      </div>`)}
  </div>`,
};
