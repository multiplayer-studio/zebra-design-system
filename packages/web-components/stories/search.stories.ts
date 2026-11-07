import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../src/components/search/search.js";
import { iconNames } from "@zebra-design-system/icons/names";

const SHAPES = ["sharp", "rounded", "full"] as const;
const SIZES = ["small", "medium", "large"] as const;
const FLAVOURS = ["default", "gradient", "ghost"] as const;

const meta: Meta = {
  title: "Components/Form/Search",
  component: "zds-search",
  tags: ["autodocs"],
  argTypes: {
    shape: { control: "inline-radio", options: SHAPES },
    size: { control: "inline-radio", options: SIZES },
    flavour: { control: "inline-radio", options: FLAVOURS },
    disabled: { control: "boolean" },
    hideFocusOutline: { control: "boolean", description: "Ghost only: the container shows focus instead." },
    value: { control: "text" },
    placeholder: { control: "text" },
    leadingIcon: { control: "select", options: ["", ...iconNames], description: "The spec's hasLeading. Empty drops it." },
    trailingIcon: { control: "select", options: [null, ...iconNames], description: "The spec's hasTrailing. Give it a function and a trailing-label." },
  },
  args: { shape: "sharp", size: "large", flavour: "default", disabled: false, block: false, hideFocusOutline: false, value: "", placeholder: "Search", leadingIcon: "search", trailingIcon: "microphone" },
  render: (a) => html`
    <div style="max-width:320px">
      <zds-search
        shape=${a.shape}
        size=${a.size}
        flavour=${a.flavour}
        ?disabled=${a.disabled}
        ?hide-focus-outline=${a.hideFocusOutline}
        .value=${a.value}
        placeholder=${a.placeholder}
        leading-icon=${a.leadingIcon}
        trailing-icon=${a.trailingIcon ?? undefined}
        trailing-label="Search by voice"
        label="Search"
      ></zds-search>
    </div>
  `,
};
export default meta;
type Story = StoryObj;

export const Playground: Story = {};

const stack = (children: unknown) => html`<div style="display:grid;gap:16px;max-width:320px">${children}</div>`;
const labelled = (text: string, el: unknown) =>
  html`<div style="display:grid;gap:6px"><span style="font:500 12px/1.4 system-ui;opacity:.7">${text}</span>${el}</div>`;

/** Starts at 280 and narrows to fit its container. `block` fills the container. */
export const Block: Story = {
  render: () => html`<div style="display:grid;gap:16px;max-width:640px">
    ${labelled("default", html`<zds-search label="Default"></zds-search>`)}
    ${labelled("block", html`<zds-search block label="Block"></zds-search>`)}
    ${labelled("default, 200 container", html`<div style="inline-size:200px"><zds-search label="Narrow"></zds-search></div>`)}
  </div>`,
};

/** Height, text and icon size move together. Only small reduces the text. */
export const Sizes: Story = {
  render: () => stack(SIZES.map((s) => labelled(s, html`<zds-search size=${s} trailing-icon="microphone" trailing-label="Search by voice" label=${s}></zds-search>`))),
};

/** Shape changes nothing but the corners. Match the controls around the field. */
export const Shapes: Story = {
  render: () => stack(SHAPES.map((s) => labelled(s, html`<zds-search shape=${s} label=${s}></zds-search>`))),
};

/** Default in a form, ghost on a surface that already bounds it, gradient for a distinct interaction. */
export const Flavours: Story = {
  render: () => stack(FLAVOURS.map((f) => labelled(f, html`<zds-search flavour=${f} shape="rounded" trailing-icon="microphone" trailing-label="Search by voice" label=${f}></zds-search>`))),
};

/**
 * The State axis follows the field. Rest, filled and disabled are shown;
 * point at a field (hover), Tab into it (focus), click into it (selected) or
 * type (typing, which brings the clear control).
 */
export const States: Story = {
  render: () => stack(html`
    ${labelled("enabled — hover, Tab, click or type", html`<zds-search trailing-icon="microphone" trailing-label="Search by voice" label="Enabled"></zds-search>`)}
    ${labelled("filled", html`<zds-search .value=${"Warehouse scanners"} trailing-icon="microphone" trailing-label="Search by voice" label="Filled"></zds-search>`)}
    ${labelled("disabled", html`<zds-search disabled trailing-icon="microphone" trailing-label="Search by voice" label="Disabled"></zds-search>`)}
  `),
};

/** hasLeading and hasTrailing are the leading-icon and trailing-icon properties. */
export const LeadingAndTrailing: Story = {
  render: () => stack(html`
    ${labelled("both", html`<zds-search trailing-icon="microphone" trailing-label="Search by voice" label="Both"></zds-search>`)}
    ${labelled("leading only", html`<zds-search label="Leading only"></zds-search>`)}
    ${labelled("neither", html`<zds-search leading-icon="" label="Neither"></zds-search>`)}
  `),
};

/** Theming is a class, at any level. The fields are identical markup in every panel. */
export const ThemingCascade: Story = {
  render: () => {
    const panel = (cls: string, label: string) => html`
      <div class=${cls} style="padding:16px;border-radius:8px;background:var(--surface-page);color:var(--foreground-primary);border:1px solid var(--border-default)">
        <div style="font:500 12px/1.4 system-ui;margin-bottom:12px;opacity:.7">${label || "base / light"}</div>
        <div style="display:grid;gap:12px">
          <zds-search trailing-icon="microphone" trailing-label="Search by voice" label="Default"></zds-search>
          <zds-search flavour="gradient" shape="full" label="Gradient"></zds-search>
          <zds-search flavour="ghost" .value=${"Filled ghost"} label="Ghost"></zds-search>
        </div>
      </div>`;
    return html`<div style="display:grid;gap:12px;grid-template-columns:repeat(auto-fit,minmax(300px,1fr))">
      ${panel("", "")}
      ${panel("mode-dark", "mode-dark")}
      ${panel("ext-companion", "ext-companion")}
      ${panel("ext-companion mode-dark", "ext-companion mode-dark")}
    </div>`;
  },
};
