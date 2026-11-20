import type { Meta, StoryObj } from "@storybook/web-components";
import type { ZetaNavigationRail } from "../../../components/navigation-rail/navigation-rail";
import { html, nothing } from "lit";
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
    showDivider: true,
    inverse: false,
    locked: false
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
        ?show-divider=${args.showDivider}
        ?inverse=${args.inverse}
        ?locked=${args.locked}
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

/** rail-width: 200px by default, a project width, or "fill" to take the container's width; and the header action's icon. */
export const RailWidthAndHeaderAction: StoryObj<ZetaNavigationRail> = {
  argTypes: {
    slot: { table: { disable: true } }
  },
  render: () => html`
    <div style="display: flex; gap: 24px; height: 360px;">
      ${([["200px (default)", undefined, 240], ["255", "255", 280], ["fill (320px column)", "fill", 320]] as const).map(
        ([label, width, column]) => html`<div style="display: grid; grid-template-rows: auto 1fr; gap: 8px; width: ${column}px;">
          <span>${label}</span>
          <div style="display: flex; min-height: 0;">
            <zeta-navigation-rail expanded rail-width=${width ?? nothing} ?show-toggle-item=${false}>
              <zeta-navigation-header slot="header" headline="ACME" action-icon="home" action-label="Home"
                ><zeta-avatar slot="mark" size="s">AC</zeta-avatar></zeta-navigation-header
              >
              <zeta-navigation-rail-item selected><zeta-icon slot="icon">home</zeta-icon>Home</zeta-navigation-rail-item>
              <zeta-navigation-rail-item><zeta-icon slot="icon">chart_bar</zeta-icon>System Notifications</zeta-navigation-rail-item>
            </zeta-navigation-rail>
          </div>
        </div>`
      )}
    </div>
  `
};

/**
 * Modes and the divider. The rail follows the page's mode. `inverse` shows the opposite shade, and `locked` keeps it
 * dark (light with `inverse`) whatever the page does. `show-divider` draws the divider on the rail's trailing edge.
 */
export const ModesAndDivider: StoryObj<ZetaNavigationRail> = {
  argTypes: {
    slot: { table: { disable: true } }
  },
  render: () => html`
    <div style="display: grid; grid-template-columns: repeat(4, max-content); gap: 16px;">
      ${(
        [
          ["light page", "light", false, false],
          ["light page, inverse", "light", true, false],
          ["light page, locked", "light", false, true],
          ["light page, locked + inverse", "light", true, true],
          ["dark page", "dark", false, false],
          ["dark page, inverse", "dark", true, false],
          ["dark page, locked", "dark", false, true],
          ["dark page, locked + inverse", "dark", true, true]
        ] as const
      ).map(
        ([label, theme, inverse, locked]) => html`<div
          data-theme=${theme}
          style="display: grid; grid-template-rows: auto 1fr; gap: 8px; padding: 16px; height: 300px; background: var(--surface-page); color: var(--foreground-primary);"
        >
          <span>${label}</span>
          <div style="display: flex; min-height: 0;">
            <zeta-navigation-rail expanded show-divider ?inverse=${inverse} ?locked=${locked}>
              <zeta-navigation-header slot="header" headline="ACME"><zeta-avatar slot="mark" size="s">AC</zeta-avatar></zeta-navigation-header>
              <zeta-navigation-rail-item selected><zeta-icon slot="icon">home</zeta-icon>Home</zeta-navigation-rail-item>
              <zeta-navigation-rail-item><zeta-icon slot="icon">chart_bar</zeta-icon>Reports</zeta-navigation-rail-item>
            </zeta-navigation-rail>
          </div>
        </div>`
      )}
    </div>
  `
};
