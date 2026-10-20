import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../src/components/menu-item/menu-item.js";
import { iconNames } from "@zebra-design-system/icons/names";

const TYPES = ["icon", "checkbox", "radio", "custom"] as const;

const meta: Meta = {
  title: "Components/MenuItem",
  component: "zds-menu-item",
  tags: ["autodocs"],
  argTypes: {
    type: { control: "inline-radio", options: TYPES, description: "Names the row's role. Icon/checkbox/radio share one anatomy — only the ARIA role and the glyph differ." },
    rounded: { control: "boolean" },
    disabled: { control: "boolean" },
    selected: { control: "boolean" },
    leadingIcon: { control: "select", options: [null, ...iconNames] },
    trailingIcon: { control: "select", options: [null, ...iconNames] },
    label: { control: "text" },
  },
  args: { type: "icon", rounded: false, disabled: false, selected: false, leadingIcon: "check-mark", trailingIcon: null, label: "Menu Item" },
  render: (a) => html`
    <div style="width:221px">
      <zds-menu-item
        type=${a.type}
        ?rounded=${a.rounded}
        ?disabled=${a.disabled}
        ?selected=${a.selected}
        leading-icon=${a.leadingIcon ?? undefined}
        trailing-icon=${a.trailingIcon ?? undefined}
      >${a.label}</zds-menu-item>
    </div>
  `,
};
export default meta;
type Story = StoryObj;

export const Playground: Story = {};

const stack = (children: unknown) => html`<div style="display:flex;flex-direction:column;width:221px;gap:2px">${children}</div>`;

/** Icon, checkbox and radio are the same anatomy — Figma models no drawn control, only the glyph and the ARIA role differ. Custom swaps in the leading slot instead. */
export const Types: Story = {
  render: () => stack(TYPES.map((t) => {
    if (t === "custom") {
      return html`<zds-menu-item type=${t}><span slot="leading" style="width:16px;height:16px;border-radius:50%;background:var(--interactive-primary-background-default);display:inline-block"></span>${t}</zds-menu-item>`;
    }
    return html`<zds-menu-item type=${t} leading-icon="check-mark">${t}</zds-menu-item>`;
  })),
};

/** Mostly CSS: hover and focus are real :hover / :focus-visible. Selected and disabled are the two properties a consumer sets directly. */
export const States: Story = {
  render: () => stack(html`
    <zds-menu-item leading-icon="check-mark">Default</zds-menu-item>
    <zds-menu-item leading-icon="check-mark" selected>Selected</zds-menu-item>
    <zds-menu-item leading-icon="check-mark" disabled>Disabled</zds-menu-item>
  `),
};

/** Square corners for a panel sitting flush with square surfaces; rounded to agree with a floating, rounded panel. */
export const Rounded: Story = {
  render: () => stack(html`
    <zds-menu-item leading-icon="check-mark">Square</zds-menu-item>
    <zds-menu-item leading-icon="check-mark" rounded>Rounded</zds-menu-item>
  `),
};

/** Leading and trailing icons are independent toggles; a null leading-icon shifts the label to the leading edge. */
export const Icons: Story = {
  render: () => stack(html`
    <zds-menu-item>No leading icon</zds-menu-item>
    <zds-menu-item leading-icon="check-mark">Leading only</zds-menu-item>
    <zds-menu-item trailing-icon="chevron-right">Trailing only</zds-menu-item>
    <zds-menu-item leading-icon="check-mark" trailing-icon="chevron-right">Both</zds-menu-item>
  `),
};
