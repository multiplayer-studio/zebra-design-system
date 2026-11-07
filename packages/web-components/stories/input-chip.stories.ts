import type { Meta, StoryObj } from "@storybook/web-components";
import { html, nothing } from "lit";
import "../src/components/input-chip/input-chip.js";

const PHOTO = "https://i.pravatar.cc/200?img=47";
const PEOPLE = ["Ada Alden", "Grace Hopper", "Alan Turing"];
const row = (c: unknown) => html`<div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center">${c}</div>`;
const cap = (t: string) => html`<div style="font:500 12px/1.4 system-ui;opacity:.7">${t}</div>`;

const meta: Meta = {
  title: "Components/Chips/Input Chip",
  component: "zds-input-chip",
  tags: ["autodocs"],
  argTypes: { shape: { control: "inline-radio", options: ["rounded", "sharp"] } },
  args: { label: "Ada Alden", showAvatar: true, avatarSrc: PHOTO, disabled: false, shape: "rounded", removable: true },
  render: (a) => html`<zds-input-chip .showAvatar=${a.showAvatar} avatar-src=${a.avatarSrc || nothing} ?disabled=${a.disabled}
    shape=${a.shape} ?removable=${a.removable}>${a.label}</zds-input-chip>`,
};
export default meta;
type Story = StoryObj;

export const Playground: Story = {};

/** A face or initials for people; off for tags and typed terms. */
export const ShowAvatar: Story = {
  render: () => html`<div style="display:grid;gap:12px">
    ${row(html`<zds-input-chip avatar-src=${PHOTO} removable>Ada Alden</zds-input-chip><zds-input-chip removable>Grace Hopper</zds-input-chip>`)}
    ${row(html`<zds-input-chip avatar-color="chart/series/1" removable>Store Associate</zds-input-chip><zds-input-chip avatar-color="yellow" removable>French Wine SME</zds-input-chip><zds-input-chip avatar-color="#8a1538" removable>New York Store D</zds-input-chip>`)}
    ${row(html`<zds-input-chip show-avatar="false" removable>invoices-2026</zds-input-chip><zds-input-chip show-avatar="false" removable>Urgent</zds-input-chip>`)}
  </div>`,
};

/** Hover and focus come from interaction, not a property: point at a chip, or Tab to its remove control. */
export const State: Story = { render: () => row(PEOPLE.map((p) => html`<zds-input-chip removable>${p}</zds-input-chip>`)) };

/** A fixed value: greyed, borderless, and the remove control is hidden. */
export const Disabled: Story = {
  render: () => row(html`<zds-input-chip removable>Grace Hopper</zds-input-chip><zds-input-chip disabled removable>Grace Hopper</zds-input-chip>
    <zds-input-chip show-avatar="false" disabled>Finance team</zds-input-chip>`),
};

/** Spec \`rounded\`: pill (rounded) or square (sharp). */
export const Shape: Story = {
  render: () => html`<div style="display:grid;gap:12px">${(["rounded", "sharp"] as const).map((s) =>
    row(PEOPLE.map((p) => html`<zds-input-chip shape=${s} removable>${p}</zds-input-chip>`)))}</div>`,
};

/** The remove control: named "Remove <label>", activated by click, Enter/Space or Backspace/Delete; fires zds-remove. The field removes the chip and announces it. */
export const Removable: Story = {
  render: () => {
    const onRemove = (e: CustomEvent<{ label: string }>) => {
      (e.target as HTMLElement).remove();
      const status = document.getElementById("input-chip-status");
      if (status) status.textContent = `${e.detail.label} removed`;
    };
    return html`<div style="display:grid;gap:8px" @zds-remove=${onRemove}>
      ${row(PEOPLE.map((p) => html`<zds-input-chip removable>${p}</zds-input-chip>`))}
      <div id="input-chip-status" role="status" aria-live="polite" style="font:12px system-ui;opacity:.7"></div>
    </div>`;
  },
};

export const ThemingCascade: Story = {
  render: () => html`<div style="display:grid;gap:12px;grid-template-columns:repeat(auto-fit,minmax(320px,1fr))">
    ${["", "mode-dark", "ext-companion", "ext-companion mode-dark"].map((cls) => html`
      <div class=${cls} style="padding:16px;background:var(--surface-page);color:var(--foreground-primary);display:grid;gap:8px">
        ${cap(cls || "base / light")}
        ${row(html`<zds-input-chip avatar-src=${PHOTO} removable>Ada Alden</zds-input-chip><zds-input-chip removable>Grace Hopper</zds-input-chip>
          <zds-input-chip show-avatar="false" removable>Urgent</zds-input-chip><zds-input-chip disabled>Alan Turing</zds-input-chip>`)}
      </div>`)}
  </div>`,
};
