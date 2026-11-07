import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../src/components/icon-button/icon-button.js";

const FLAVOURS = ["primary", "positive", "negative", "subtle", "text", "outline-subtle", "outline", "gradient", "text-gradient", "contrast", "outline-contrast"] as const;

const meta: Meta = {
  title: "Components/Buttons/Icon Button",
  component: "zds-icon-button",
  tags: ["autodocs"],
  parameters: { docs: { description: { component: "A single glyph, no label: square at every size, with Button's eleven flavours, three shapes and four states. Every instance needs `label`, its accessible name. Spec: specs/icon-button." } } },
  argTypes: {
    flavour: { control: "select", options: FLAVOURS },
    size: { control: "inline-radio", options: ["small", "medium", "large"] },
    shape: { control: "inline-radio", options: ["sharp", "rounded", "full"] },
    disabled: { control: "boolean" },
  },
  args: { flavour: "primary", size: "medium", shape: "rounded", disabled: false, icon: "more-horizontal", label: "More options" },
  render: (a) => html`<zds-icon-button flavour=${a.flavour} size=${a.size} shape=${a.shape} ?disabled=${a.disabled} icon=${a.icon} label=${a.label}></zds-icon-button>`,
};
export default meta;
type Story = StoryObj;
const row = (c: unknown) => html`<div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap">${c}</div>`;

export const Playground: Story = {};
export const Flavour: Story = { render: () => row(FLAVOURS.map((f) => html`<zds-icon-button flavour=${f} size="medium" shape="full" icon="close" label=${f}></zds-icon-button>`)) };
export const Size: Story = { render: () => row((["small", "medium", "large"] as const).map((s) => html`<zds-icon-button size=${s} shape="full" icon="close" label=${s}></zds-icon-button>`)) };
export const Shape: Story = { render: () => row((["sharp", "rounded", "full"] as const).map((s) => html`<zds-icon-button size="medium" shape=${s} icon="close" label=${s}></zds-icon-button>`)) };

/** Disabled swaps background and glyph to the family's disabled tokens. */
export const Disabled: Story = { render: () => row(FLAVOURS.map((f) => html`<zds-icon-button flavour=${f} size="medium" shape="full" icon="close" label=${f} disabled></zds-icon-button>`)) };

export const ThemingCascade: Story = {
  render: () => html`<div style="display:grid;gap:12px;grid-template-columns:repeat(auto-fit,minmax(380px,1fr))">
    ${["", "mode-dark", "ext-companion", "ext-companion mode-dark"].map(
      (cls) => html`<div class=${cls} style="padding:16px;border-radius:8px;background:var(--surface-page);color:var(--foreground-primary);border:1px solid var(--border-default);display:grid;gap:8px">
        <div style="font:500 12px/1.4 system-ui;opacity:.7">${cls || "base / light"}</div>
        ${row(FLAVOURS.map((f) => html`<zds-icon-button flavour=${f} size="medium" shape="rounded" icon="close" label=${f}></zds-icon-button>`))}
      </div>`,
    )}
  </div>`,
};
