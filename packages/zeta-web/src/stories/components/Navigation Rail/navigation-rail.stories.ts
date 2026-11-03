import type { Meta, StoryObj } from "@storybook/web-components";
import type { ZetaNavigationRail } from "../../../components/navigation-rail/navigation-rail";
import { html } from "lit";
import "../../../components/navigation-rail/navigation-rail";
import "../../../components/navigation-rail/navigation-rail-item";
import "../../../components/icon/icon";
import "../../../components/navigation-rail/navigation-header";
import "../../../components/navigation-rail/sub-menu-header";
import "../../../components/navigation-rail/sub-menu-item";
import "../../../components/navigation-rail/collapsible-menu-item";
import "../../../components/avatar/avatar";
import "../../../components/button/button";

const meta: Meta<ZetaNavigationRail> = {
  title: "Components/Navigation Rail",
  component: "zeta-navigation-rail",
  args: {
    rounded: true,
    expanded: false,
    showLabels: false,
    showHeaderAction: true,
    showToggleItem: true,
    inverse: false
  },
  parameters: {
    design: {
      url: "https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=3453-54061"
    },
    status: {
      type: "ready"
    }
  }
};

export default meta;

export const NavigationRail: StoryObj<ZetaNavigationRail> = {
  argTypes: {
    slot: { table: { disable: true } }
  },
  render: args => html`
    <zeta-navigation-rail .rounded=${args.rounded}>
      <zeta-navigation-rail-item selected tabIndex="1"><zeta-icon slot="icon">star</zeta-icon>Item</zeta-navigation-rail-item>
      <zeta-navigation-rail-item tabIndex="1"><zeta-icon slot="icon">star</zeta-icon>Item</zeta-navigation-rail-item>
      <zeta-navigation-rail-item tabIndex="1"><zeta-icon slot="icon">star</zeta-icon>Item</zeta-navigation-rail-item>
    </zeta-navigation-rail>
  `
};

export const NavigationRailWithNavigation: StoryObj<ZetaNavigationRail> = {
  argTypes: {
    slot: { table: { disable: true } }
  },
  render: args => {
    const items = [];
    const baseUrl = `${document.location.origin}?path=/story/navigation-rail--navigation-rail-with-navigation`;
    const searchParams = new URLSearchParams(document.location.search);
    for (let i = 0; i < 3; i++) {
      items.push(
        html`<zeta-navigation-rail-item href="${baseUrl}&index=${i}" tabIndex="1" ?selected=${i.toString() === searchParams.get("index")}
          ><zeta-icon slot="icon">star</zeta-icon>Item</zeta-navigation-rail-item
        >`
      );
    }
    return html` <zeta-navigation-rail .rounded=${args.rounded}> ${items} </zeta-navigation-rail> `;
  }
};

/** The full rail: header, header action, menu, footer, toggle and the sub menu panel with a collapsible group. */
export const NavigationRailFull: StoryObj<ZetaNavigationRail> = {
  argTypes: {
    slot: { table: { disable: true } }
  },
  render: args => html`
    <div style="height: 640px; display: flex;">
      <zeta-navigation-rail
        .rounded=${args.rounded}
        ?expanded=${args.expanded}
        ?show-labels=${args.showLabels}
        ?show-header-action=${args.showHeaderAction}
        ?show-toggle-item=${args.showToggleItem}
        ?inverse=${args.inverse}
      >
        <zeta-navigation-header slot="header" headline="Zebra"><zeta-avatar slot="mark" size="s">ZD</zeta-avatar></zeta-navigation-header>
        <zeta-navigation-rail-item selected><zeta-icon slot="icon">home</zeta-icon>Home</zeta-navigation-rail-item>
        <zeta-navigation-rail-item show-badge badge-label="New orders"><zeta-icon slot="icon">inbox</zeta-icon>Orders</zeta-navigation-rail-item>
        <zeta-navigation-rail-item><zeta-icon slot="icon">chart_bar</zeta-icon>Reports</zeta-navigation-rail-item>
        <zeta-navigation-rail-item disabled><zeta-icon slot="icon">lock</zeta-icon>Admin</zeta-navigation-rail-item>
        <zeta-navigation-rail-item slot="footer"><zeta-icon slot="icon">help</zeta-icon>Help</zeta-navigation-rail-item>
        <zeta-sub-menu-header slot="sub-menu-header" type="sub-page" headline="Home"
          ><zeta-button slot="actions" size="small" flavor="text">Edit</zeta-button></zeta-sub-menu-header
        >
        <zeta-collapsible-menu-item slot="sub-menu" open>
          <zeta-icon slot="icon">folder</zeta-icon><span slot="heading">Projects</span>
          <zeta-sub-menu-item selected>Warehouse rollout</zeta-sub-menu-item>
          <zeta-sub-menu-item>Store refresh</zeta-sub-menu-item>
        </zeta-collapsible-menu-item>
        <zeta-sub-menu-item slot="sub-menu" show-badge badge-value="3"><zeta-icon slot="icon">alert</zeta-icon>Alerts</zeta-sub-menu-item>
        <zeta-sub-menu-item slot="sub-menu" sub-menu><zeta-icon slot="icon">settings</zeta-icon>Settings</zeta-sub-menu-item>
        <zeta-sub-menu-item slot="sub-menu" disabled><zeta-icon slot="icon">lock</zeta-icon>Archive</zeta-sub-menu-item>
      </zeta-navigation-rail>
    </div>
  `
};
