import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaGlobalHeader } from "../../components/global-header/global-header.js";
import { html, nothing } from "lit";
import { keyed } from "lit/directives/keyed.js";
import { action } from "@storybook/addon-actions";
import "../../components/global-header/global-header";
import "../../components/action-menu/action-menu-button";

const meta: Meta<ZetaGlobalHeader & { "data-theme": string; customLogo: string; logo: string }> = {
  component: "zeta-global-header",
  tags: ["autodocs"],
  title: "Components/Global Header",
  args: {
    platformName: "Platform Name",
    name: "Name",
    initials: "RK",
    appSwitcher: true,
    searchbar: true,
    rounded: false,
    anchored: true,
    showProfile: true,
    showPlatformName: true,
    showLogo: true,
    dividers: false,
    customLogo: "",
    theme: "dark"
  },
  argTypes: {
    platformName: { control: "text" },
    name: { control: "text" },
    initials: { control: "text" },
    appSwitcher: { control: "boolean" },
    searchbar: { control: "boolean" },
    rounded: { control: "boolean" },
    anchored: { control: "boolean" },
    showProfile: { control: "boolean" },
    showPlatformName: { control: "boolean" },
    showLogo: { control: "boolean" },
    dividers: { control: "boolean" },
    theme: { control: "inline-radio", options: ["light", "dark"] },
    customLogo: { control: "text" },
    logo: { table: { disable: true } },
    "data-theme": { table: { disable: true } }
  },
  parameters: {
    design: {
      url: "https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=2356-5644"
    },
    status: {
      type: "ready"
    }
  }
};
export default meta;

export const GlobalHeader: StoryObj = {
  argTypes: {
    menuPosition: {
      table: {
        disable: true
      }
    }
  },
  render: args => {
    return html`${keyed(
      args.customLogo,
      html`<zeta-global-header
        platformName=${args.platformName}
        .name=${args.name}
        .initials=${args.initials}
        .appSwitcher=${args.appSwitcher}
        .searchbar=${args.searchbar}
        .rounded=${args.rounded}
        .anchored=${args.anchored}
        .showProfile=${args.showProfile}
        .showPlatformName=${args.showPlatformName}
        .showLogo=${args.showLogo}
        .dividers=${args.dividers}
        .theme=${args.theme}
        @user-info-click=${action("user-info-click")}
        @hamburger-menu-click=${action("hamburger-menu-click")}
        @app-switcher-click=${action("app-switcher-click")}
      >
        ${args.customLogo ? html`<span slot="logo">${args.customLogo}</span>` : nothing}
        <!-- Menu items -->
        <zeta-dropdown-menu-button
          .rounded=${args.rounded}
          slot="menu-items"
          flavor="subtle"
          defaultText="Nav Item"
          .matchParentWidth=${false}
          .items=${[{ label: "Menu Item" }, { label: "Menu Item" }, { label: "Menu Item" }]}
        ></zeta-dropdown-menu-button>
        <zeta-button shape=${args.rounded ? "rounded" : "sharp"} slot="menu-items" flavor="subtle">Nav Item</zeta-button>

        <!-- Action items -->
        <zeta-action-menu-button
          shape=${args.rounded ? "rounded" : "sharp"}
          slot="action-items"
          icon="more_horizontal"
          flavor="subtle"
          .items=${[{ label: "Menu Item" }, { label: "Menu Item" }, { label: "Menu Item" }]}
        ></zeta-action-menu-button>
        <zeta-icon-button shape=${args.rounded ? "rounded" : "sharp"} slot="action-items" flavor="subtle">star</zeta-icon-button>

        <!--Zeta avatar-->
        <zeta-avatar id="avatar" slot="user-avatar" size="xxs" .showClose=${false} .showRing=${false}>${args.initials}</zeta-avatar>
      </zeta-global-header>`
    )}`;
  }
};
