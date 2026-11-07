import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { iconNames } from "@zebra-design-system/icons/names";
import "../src/components/tab-bar/tab-bar.js";

const cap = (t: string) => html`<div style="font:500 12px/1.4 system-ui;color:var(--foreground-secondary)">${t}</div>`;
const four = html`
  <zds-tab-item value="one" label="Tab Item" icon="star"></zds-tab-item>
  <zds-tab-item value="two" label="Tab Item" icon="star"></zds-tab-item>
  <zds-tab-item value="three" label="Tab Item" icon="star"></zds-tab-item>
  <zds-tab-item value="four" label="Tab Item" icon="star"></zds-tab-item>`;

const meta: Meta = {
  title: "Components/Tab Bar",
  component: "zds-tab-bar",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A row of tabs for switching between views at the same level. `flavour` sets whether the tabs divide the row or hug. The host is the tablist and each `<zds-tab-item>` a tab: one tab stop on the selected tab, Left/Right and Home/End move and select, `zds-value-change` reports the new value. Spec: specs/tab-bar.",
      },
    },
  },
  argTypes: {
    flavour: { control: "inline-radio", options: ["full-width", "condensed"] },
    icon: { control: "select", options: ["", ...iconNames] },
    badge: { control: "text", description: "Badge on the second tab: empty for none, `dot`, or a count." },
    disableLast: { control: "boolean" },
  },
  args: { flavour: "full-width", icon: "star", badge: "", disableLast: false },
  render: (a) => html`<div style="inline-size:708px">
    <zds-tab-bar flavour=${a.flavour} label="Sections" value="one" @zds-value-change=${(e: CustomEvent) => console.log(e.detail)}>
      <zds-tab-item value="one" label="Overview" .icon=${a.icon || null}></zds-tab-item>
      <zds-tab-item value="two" label="Activity" .icon=${a.icon || null} .badge=${a.badge === "dot" ? true : a.badge || null}></zds-tab-item>
      <zds-tab-item value="three" label="Settings" .icon=${a.icon || null}></zds-tab-item>
      <zds-tab-item value="four" label="Billing" .icon=${a.icon || null} ?disabled=${a.disableLast}></zds-tab-item>
    </zds-tab-bar>
  </div>`,
};
export default meta;
type Story = StoryObj;

export const Playground: Story = {};

/** Spec `flavour`: full width divides the row (177 each with four at 708); condensed hugs. */
export const Flavour: Story = {
  render: () => html`<div style="display:grid;gap:16px;inline-size:708px">
    ${cap("full-width")}
    <zds-tab-bar flavour="full-width" label="Full width" value="one">${four}</zds-tab-bar>
    ${cap("condensed")}
    <div><zds-tab-bar flavour="condensed" label="Condensed" value="one">${four}</zds-tab-bar></div>
  </div>`,
};

/** Tab Item states: default, selected and disabled (hover, pressed and focus are CSS states). */
export const States: Story = {
  render: () => html`<div><zds-tab-bar flavour="condensed" label="States" value="selected">
    <zds-tab-item value="default" label="Default" icon="star"></zds-tab-item>
    <zds-tab-item value="selected" label="Selected" icon="star"></zds-tab-item>
    <zds-tab-item value="disabled" label="Disabled" icon="star" disabled></zds-tab-item>
  </zds-tab-bar></div>`,
};

/** Tab Item content: icon on or off, and a dot or count badge. */
export const Content: Story = {
  render: () => html`<div><zds-tab-bar flavour="condensed" label="Content" value="a">
    <zds-tab-item value="a" label="Icon" icon="star"></zds-tab-item>
    <zds-tab-item value="b" label="No icon"></zds-tab-item>
    <zds-tab-item value="c" label="Dot" icon="star" badge badge-label="new activity"></zds-tab-item>
    <zds-tab-item value="d" label="Count" icon="star" badge="99+" badge-label="120 unread"></zds-tab-item>
  </zds-tab-bar></div>`,
};
