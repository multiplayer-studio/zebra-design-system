import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../src/components/button/button.js";
import "../src/components/global-header/global-header.js";
import "../src/components/icon-button/icon-button.js";
import "../src/components/menu-item/menu-item.js";

const header = (a: Record<string, unknown>) => html`<zds-global-header
  mode=${a.mode}
  ?rounded=${a.rounded}
  .appSwitcher=${a.appSwitcher}
  .searchBar=${a.searchBar}
  .menuItems=${a.menuItems}
  .actionMenu=${a.actionMenu}
  ?dividers=${a.dividers}
  platform-name=${a.platformName}
  .showPlatformName=${a.showPlatformName}
  .showLogo=${a.showLogo}
  username=${a.username}
  initials="RK"
>
  <zds-icon-button slot="menu-items" flavour="subtle" size="medium" icon="home" label="Home"></zds-icon-button>
  <zds-button slot="menu-items" flavour="subtle" size="medium">Nav Item</zds-button>
  <zds-icon-button slot="actions" flavour="subtle" size="medium" icon="important-notification" label="Notifications"></zds-icon-button>
  <zds-icon-button slot="actions" flavour="subtle" size="medium" icon="settings" label="Settings"></zds-icon-button>
  <zds-menu-item slot="account-menu" leading-icon="settings">Settings</zds-menu-item>
  <zds-menu-item slot="account-menu" leading-icon="log-out">Sign out</zds-menu-item>
</zds-global-header>`;

const meta: Meta = {
  title: "Components/Global Header",
  component: "zds-global-header",
  tags: ["autodocs"],
  argTypes: { mode: { control: "inline-radio", options: ["dark", "light"] } },
  args: { mode: "dark", rounded: false, appSwitcher: true, searchBar: true, menuItems: false, actionMenu: false, dividers: false, platformName: "Platform Name", showPlatformName: true, showLogo: true, username: "Username" },
  render: (a) => header(a),
};
export default meta;
type Story = StoryObj;

export const Playground: Story = {};

/** Every region on, with dividers. */
export const FullyLoaded: Story = {
  args: { menuItems: true, actionMenu: true, dividers: true },
};

/** Rounded carries into every control. */
export const Rounded: Story = {
  args: { rounded: true, menuItems: true, actionMenu: true },
};

/** Frozen in dark by default. This is the override, set on the header itself. */
export const LightOverride: Story = {
  args: { mode: "light", menuItems: true, actionMenu: true },
};

/** A bare branded bar. */
export const Bare: Story = {
  args: { appSwitcher: false, searchBar: false },
};

/** The account avatar is a full zds-avatar: slot one in (an icon on a swatch here) with any avatar property. */
export const AccountAvatar: Story = {
  render: () => html`<zds-global-header username="firstname.lastname@zebra.com">
    <zds-avatar slot="avatar" type="icon" icon="verified" swatch-color="purple" .showStatus=${false} .showClose=${false} .showRing=${false}></zds-avatar>
  </zds-global-header>`,
};
