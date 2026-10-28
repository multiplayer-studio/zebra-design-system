import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../src/components/status-label/status-label.js";

const STATUSES = ["neutral", "info", "positive", "warning", "negative"] as const;
const title = (s: string) => s[0].toUpperCase() + s.slice(1);

const meta: Meta = {
  title: "Components/Badges/Status Label",
  component: "zds-status-label",
  tags: ["autodocs"],
  argTypes: {
    status: { control: "select", options: STATUSES },
    leading: { control: "inline-radio", options: ["indicator", "icon", "none"] },
    shape: { control: "inline-radio", options: ["rounded", "sharp"] },
    discardable: { control: "boolean" },
  },
  args: { status: "info", leading: "indicator", shape: "rounded", discardable: false, label: "Ongoing" },
  render: (a) => html`<zds-status-label status=${a.status} leading=${a.leading} shape=${a.shape} ?discardable=${a.discardable}>${a.label}</zds-status-label>`,
};
export default meta;
type Story = StoryObj;

const row = (c: unknown) => html`<div style="display:flex;flex-wrap:wrap;gap:12px;align-items:center">${c}</div>`;

export const Playground: Story = {};

/** Fill, border and the leading element follow Status; the label holds foreground/primary. */
export const Status: Story = { render: () => row(STATUSES.map((s) => html`<zds-status-label status=${s}>${title(s)}</zds-status-label>`)) };

/** A dot, a glyph fixed per status (survives greyscale), or nothing. */
export const Leading: Story = {
  render: () => html`<div style="display:grid;gap:12px">${(["indicator", "icon", "none"] as const).map((l) => row(STATUSES.map((s) => html`<zds-status-label status=${s} leading=${l}>${title(s)}</zds-status-label>`)))}</div>`,
};

export const Shape: Story = {
  render: () => html`<div style="display:grid;gap:12px">${(["rounded", "sharp"] as const).map((sh) => row(STATUSES.map((s) => html`<zds-status-label status=${s} shape=${sh}>${title(s)}</zds-status-label>`)))}</div>`,
};

/** Adds a dismiss after the label, the one control in the badge family. It fires zds-discard; removing the element is the caller's job. */
export const Discardable: Story = {
  render: () => row(STATUSES.map((s) => html`<zds-status-label status=${s} discardable @zds-discard=${(e: Event) => (e.currentTarget as HTMLElement).remove()}>${title(s)}</zds-status-label>`)),
};

export const ThemingCascade: Story = {
  render: () => html`<div style="display:grid;gap:12px;grid-template-columns:repeat(auto-fit,minmax(300px,1fr))">
    ${["", "mode-dark", "ext-companion", "ext-companion mode-dark"].map((cls) => html`
      <div class=${cls} style="padding:16px;border-radius:8px;background:var(--surface-page);color:var(--foreground-primary);border:1px solid var(--border-default);display:grid;gap:8px">
        <div style="font:500 12px/1.4 system-ui;opacity:.7">${cls || "base / light"}</div>
        ${row(STATUSES.map((s) => html`<zds-status-label status=${s} leading="icon">${title(s)}</zds-status-label>`))}
      </div>`)}
  </div>`,
};
