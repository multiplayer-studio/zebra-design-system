import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../src/components/button/button.js";
import { iconNames } from "@zebra-design-system/icons/names";

const FLAVOURS = ["primary","positive","negative","subtle","text","outline-subtle","outline","gradient","text-gradient","contrast","outline-contrast"] as const;
const SIZES = ["small","medium","large"] as const;
const SHAPES = ["sharp","rounded","full"] as const;

const meta: Meta = {
  title: "Components/Buttons/Button",
  component: "zds-button",
  tags: ["autodocs"],
  argTypes: {
    flavour: { control: "select", options: FLAVOURS, description: "How much weight the action carries." },
    size: { control: "inline-radio", options: SIZES },
    shape: { control: "inline-radio", options: SHAPES },
    disabled: { control: "boolean" },
    leadingIcon: { control: "select", options: [null, ...iconNames], description: "Any of the 715 glyphs in the icon font." },
    trailingIcon: { control: "select", options: [null, ...iconNames], description: "Any of the 715 glyphs in the icon font." },
    label: { control: "text" },
  },
  args: { flavour: "primary", size: "medium", shape: "rounded", disabled: false, label: "Button", leadingIcon: null, trailingIcon: null },
  render: (a) => html`
    <zds-button
      flavour=${a.flavour}
      size=${a.size}
      shape=${a.shape}
      ?disabled=${a.disabled}
      leading-icon=${a.leadingIcon ?? undefined}
      trailing-icon=${a.trailingIcon ?? undefined}
    >${a.label}</zds-button>
  `,
};
export default meta;
type Story = StoryObj;

export const Playground: Story = {};

const row = (children: unknown) => html`<div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap">${children}</div>`;

/** Eleven flavours. Use one primary per view; everything else steps down. */
export const Flavours: Story = {
  render: () => html`<div style="display:grid;gap:12px">
    ${row(FLAVOURS.map((f) => html`<zds-button flavour=${f} shape="rounded">${f}</zds-button>`))}
  </div>`,
};

/** Height, padding, type ramp and icon size move together with size. */
export const Sizes: Story = {
  render: () => row(SIZES.map((s) => html`<zds-button size=${s} shape="rounded" leading-icon="check-mark">${s}</zds-button>`)),
};

/** Match the container. Don't mix shapes inside one group. */
export const Shapes: Story = {
  render: () => row(SHAPES.map((s) => html`<zds-button shape=${s}>${s}</zds-button>`)),
};

/** No flavour keeps its accent colour when disabled, so they look alike. */
export const Disabled: Story = {
  render: () => row(FLAVOURS.map((f) => html`<zds-button flavour=${f} shape="rounded" disabled>${f}</zds-button>`)),
};

/** The label is the only content a consumer writes; icons are variant choices. */
export const WithIcons: Story = {
  render: () => row(html`
    <zds-button shape="rounded" leading-icon="add">Leading</zds-button>
    <zds-button shape="rounded" trailing-icon="arrow-forward">Trailing</zds-button>
    <zds-button shape="rounded" leading-icon="add" trailing-icon="arrow-forward">Both</zds-button>
  `),
};

/**
 * Theming is a class, at any level. Each panel below sets `ext-*` / `mode-*`
 * on its own wrapper — the buttons inside are identical markup and are not
 * told anything about the theme.
 */
export const ThemingCascade: Story = {
  parameters: { docs: { description: { story: "The same markup under four different theme scopes, all on one page." } } },
  render: () => {
    const panel = (cls: string, label: string) => html`
      <div class=${cls} style="padding:16px;border-radius:8px;background:var(--surface-page);color:var(--foreground-primary);border:1px solid var(--border-default)">
        <div style="font:500 12px/1.4 system-ui;margin-bottom:8px;opacity:.7">${label || "base / light"}</div>
        ${row(html`
          <zds-button shape="rounded">Primary</zds-button>
          <zds-button flavour="outline" shape="rounded">Outline</zds-button>
          <zds-button flavour="text" shape="rounded">Text</zds-button>
        `)}
      </div>`;
    return html`<div style="display:grid;gap:12px;grid-template-columns:repeat(auto-fit,minmax(260px,1fr))">
      ${panel("", "")}
      ${panel("mode-dark", "mode-dark")}
      ${panel("ext-companion", "ext-companion")}
      ${panel("ext-companion mode-dark", "ext-companion mode-dark")}
      ${panel("ext-target", "ext-target")}
      ${panel("ext-target mode-dark", "ext-target mode-dark")}
    </div>`;
  },
};

/** A theme scope set on an ancestor reaches every descendant, including into shadow roots. */
export const NestedScopes: Story = {
  render: () => html`
    <div class="ext-target" style="padding:16px;background:var(--surface-page);color:var(--foreground-primary);border:1px solid var(--border-default);border-radius:8px">
      <div style="font:500 12px/1.4 system-ui;opacity:.7;margin-bottom:8px">ext-target (outer)</div>
      <zds-button shape="rounded">Inherits target</zds-button>
      <div class="mode-dark" style="margin-top:12px;padding:16px;background:var(--surface-page);color:var(--foreground-primary);border-radius:8px">
        <div style="font:500 12px/1.4 system-ui;opacity:.7;margin-bottom:8px">…mode-dark nested inside it</div>
        <zds-button shape="rounded">Target, dark</zds-button>
        <div class="ext-companion mode-light" style="margin-top:12px;padding:16px;background:var(--surface-page);color:var(--foreground-primary);border-radius:8px">
          <div style="font:500 12px/1.4 system-ui;opacity:.7;margin-bottom:8px">…switched again to ext-companion mode-light</div>
          <zds-button shape="rounded">Companion, light</zds-button>
        </div>
      </div>
    </div>`,
};

/** Plain HTML themes identically — the tokens are just CSS variables. */
export const PlainHtml: Story = {
  parameters: { docs: { description: { story: "No component involved: a bare <button> styled with the same semantic tokens." } } },
  render: () => html`
    <style>
      .demo-btn {
        height: var(--control-sm); padding: var(--space-2xs) var(--space-md);
        border: var(--stroke-base) solid var(--interactive-primary-border-default);
        border-radius: var(--radius-element-sm);
        background: var(--interactive-primary-background-default);
        color: var(--interactive-primary-foreground-default);
        font: 500 var(--label-medium-font-size)/var(--label-medium-line-height) var(--label-medium-font-family);
        cursor: pointer;
      }
    </style>
    ${row(html`
      <button class="demo-btn">Base</button>
      <span class="ext-companion mode-dark" style="padding:8px;background:var(--surface-page)">
        <button class="demo-btn ext-companion mode-dark">ext-companion mode-dark</button>
      </span>
      <button class="demo-btn ext-target">ext-target</button>
    `)}`,
};
