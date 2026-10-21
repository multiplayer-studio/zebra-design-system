import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { iconNames } from "@zebra-design-system/icons/names";
import "../src/components/assist-chip/assist-chip.js";

const ACTIONS = [["calendar", "Add to calendar"], ["share", "Share"], ["star", "Save"], ["location", "Get directions"]] as const;
const row = (c: unknown) => html`<div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center">${c}</div>`;
const cap = (t: string) => html`<div style="font:500 12px/1.4 system-ui;opacity:.7">${t}</div>`;

const meta: Meta = {
  title: "Components/Assist Chip",
  component: "zds-assist-chip",
  tags: ["autodocs"],
  argTypes: { icon: { control: "select", options: iconNames }, shape: { control: "inline-radio", options: ["rounded", "sharp"] } },
  args: { label: "Add to calendar", icon: "calendar", showLeadingIcon: true, disabled: false, shape: "rounded" },
  render: (a) => html`<zds-assist-chip icon=${a.icon} .showLeadingIcon=${a.showLeadingIcon} ?disabled=${a.disabled} shape=${a.shape}>${a.label}</zds-assist-chip>`,
};
export default meta;
type Story = StoryObj;

export const Playground: Story = {};

/** The glyph names the action's domain. Keep it consistent across a row. */
export const ShowLeadingIcon: Story = {
  render: () => html`<div style="display:grid;gap:12px">
    ${row(ACTIONS.map(([i, l]) => html`<zds-assist-chip icon=${i}>${l}</zds-assist-chip>`))}
    ${row(ACTIONS.map(([i, l]) => html`<zds-assist-chip icon=${i} show-leading-icon="false">${l}</zds-assist-chip>`))}
  </div>`,
};

/** Hover and focus come from interaction. 32px tall in every state. */
export const State: Story = { render: () => row(ACTIONS.map(([i, l]) => html`<zds-assist-chip icon=${i}>${l}</zds-assist-chip>`)) };

/** Unavailable: greyed and borderless, same height. Say why nearby. */
export const Disabled: Story = {
  render: () => row(html`<zds-assist-chip icon="calendar">Add to calendar</zds-assist-chip><zds-assist-chip icon="calendar" disabled>Add to calendar</zds-assist-chip>`),
};

/** Spec \`rounded\`: pill (rounded) or square (sharp). */
export const Shape: Story = {
  render: () => html`<div style="display:grid;gap:12px">${(["rounded", "sharp"] as const).map((s) =>
    row(ACTIONS.map(([i, l]) => html`<zds-assist-chip icon=${i} shape=${s}>${l}</zds-assist-chip>`)))}</div>`,
};

export const ThemingCascade: Story = {
  render: () => html`<div style="display:grid;gap:12px;grid-template-columns:repeat(auto-fit,minmax(320px,1fr))">
    ${["", "mode-dark", "ext-companion", "ext-companion mode-dark"].map((cls) => html`
      <div class=${cls} style="padding:16px;background:var(--surface-page);color:var(--foreground-primary);display:grid;gap:8px">
        ${cap(cls || "base / light")}
        ${row(html`<zds-assist-chip icon="calendar">Add to calendar</zds-assist-chip><zds-assist-chip icon="share">Share</zds-assist-chip>
          <zds-assist-chip icon="calendar" disabled>Book</zds-assist-chip>`)}
      </div>`)}
  </div>`,
};
