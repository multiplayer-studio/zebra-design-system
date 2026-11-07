import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../src/components/grid-menu-item/grid-menu-item.js";

const meta: Meta = {
  title: "Components/Bottom Sheet/Grid Menu Item",
  component: "zds-grid-menu-item",
  tags: ["autodocs"],
  args: { label: "Camera", icon: "camera", active: false, disabled: false, rounded: true, showBadge: false },
  render: (a) => html`<zds-grid-menu-item style="width:104px" label=${a.label} icon=${a.icon} ?active=${a.active} ?disabled=${a.disabled} .rounded=${a.rounded} ?show-badge=${a.showBadge}></zds-grid-menu-item>`,
};
export default meta;
type Story = StoryObj;

export const Playground: Story = {};

/** Default, active, disabled, badge and square corners. Hover and press come from the pointer. */
export const States: Story = {
  render: () => html`<div style="display:grid;grid-template-columns:repeat(5,104px);gap:12px">
    <zds-grid-menu-item label="Camera" icon="camera"></zds-grid-menu-item>
    <zds-grid-menu-item label="Gallery" icon="image" active></zds-grid-menu-item>
    <zds-grid-menu-item label="Document" icon="document" disabled></zds-grid-menu-item>
    <zds-grid-menu-item label="Contacts" icon="contacts" show-badge></zds-grid-menu-item>
    <zds-grid-menu-item label="Location" icon="location" .rounded=${false}></zds-grid-menu-item>
  </div>`,
};
