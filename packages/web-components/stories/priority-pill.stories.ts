import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../src/components/priority-pill/priority-pill.js";

const LEVELS = ["low", "medium", "high", "urgent"] as const;

const meta: Meta = {
  title: "Components/Priority Pill",
  component: "zds-priority-pill",
  tags: ["autodocs"],
  argTypes: {
    level: { control: "inline-radio", options: LEVELS },
    variant: { control: "inline-radio", options: ["lozenge", "badge"] },
    size: { control: "inline-radio", options: ["large", "small"] },
    leading: { control: "inline-radio", options: ["icon", "number"] },
  },
  args: { level: "high", variant: "lozenge", size: "large", leading: "icon" },
  render: (a) => html`<zds-priority-pill level=${a.level} variant=${a.variant} size=${a.size} leading=${a.leading}></zds-priority-pill>`,
};
export default meta;
type Story = StoryObj;

const row = (c: unknown) => html`<div style="display:flex;flex-wrap:wrap;gap:12px;align-items:center">${c}</div>`;
const cap = (t: string) => html`<span style="font:500 12px/1.4 system-ui;opacity:.7;min-inline-size:110px">${t}</span>`;

export const Playground: Story = {};

/** The level fixes glyph, rank and colour. */
export const Level: Story = { render: () => row(LEVELS.map((l) => html`<zds-priority-pill level=${l}></zds-priority-pill>`)) };

/** Every size × variant × leading. */
export const Matrix: Story = {
  render: () => html`<div style="display:grid;gap:12px">${(["large", "small"] as const).flatMap((sz) => (["icon", "number"] as const).map((ld) =>
    row(html`${cap(`${sz} · ${ld}`)}${LEVELS.map((l) => html`<zds-priority-pill level=${l} size=${sz} leading=${ld}></zds-priority-pill>`)}
      ${LEVELS.map((l) => html`<zds-priority-pill variant="badge" level=${l} size=${sz} leading=${ld}></zds-priority-pill>`)}`)))}</div>`,
};

export const ThemingCascade: Story = {
  render: () => html`<div style="display:grid;gap:12px;grid-template-columns:repeat(auto-fit,minmax(320px,1fr))">
    ${["", "mode-dark", "ext-companion", "ext-companion mode-dark"].map((cls) => html`
      <div class=${cls} style="padding:16px;border-radius:8px;background:var(--surface-page);color:var(--foreground-primary);border:1px solid var(--border-default);display:grid;gap:8px">
        <div style="font:500 12px/1.4 system-ui;opacity:.7">${cls || "base / light"}</div>
        ${row(LEVELS.map((l) => html`<zds-priority-pill level=${l}></zds-priority-pill>`))}
        ${row(LEVELS.map((l) => html`<zds-priority-pill level=${l} size="small" leading="number"></zds-priority-pill>`))}
      </div>`)}
  </div>`,
};
