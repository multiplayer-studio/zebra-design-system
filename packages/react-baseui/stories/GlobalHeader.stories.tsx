import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button, GlobalHeader, IconButton, MenuItem } from "../src/index.js";

const meta: Meta<typeof GlobalHeader> = {
  title: "Components/Global Header",
  component: GlobalHeader,
  tags: ["autodocs"],
  argTypes: { mode: { control: "inline-radio", options: ["dark", "light"] } },
  args: {
    mode: "dark", rounded: false, anchored: true, showProfile: true, appSwitcher: true, searchBar: true, menuItems: false, actionMenu: false, dividers: false,
    platformName: "Platform Name", showPlatformName: true, showLogo: true, username: "Username", initials: "RK",
    menuItemsSlot: <><IconButton flavour="subtle" size="medium" icon="home" label="Home" /><Button flavour="subtle" size="medium">Nav Item</Button></>,
    actionMenuSlot: <><IconButton flavour="subtle" size="medium" icon="important-notification" label="Notifications" /><IconButton flavour="subtle" size="medium" icon="settings" label="Settings" /></>,
    accountMenu: <><MenuItem leadingIcon="settings">Settings</MenuItem><MenuItem leadingIcon="log-out">Sign out</MenuItem></>,
  },
};
export default meta;
type Story = StoryObj<typeof GlobalHeader>;

export const Playground: Story = {};

/** Every region on, with dividers. */
export const FullyLoaded: Story = { args: { menuItems: true, actionMenu: true, dividers: true } };

/** Rounded carries into every control. */
export const Rounded: Story = { args: { rounded: true, menuItems: true, actionMenu: true } };

/** Rounded and not anchored: the bar floats, so it rounds its own corners too. */
export const Floating: Story = { args: { rounded: true, anchored: false, menuItems: true, actionMenu: true } };

/** Frozen in dark by default. This is the override, set on the header itself. */
export const LightOverride: Story = { args: { mode: "light", menuItems: true, actionMenu: true } };

/** A bare branded bar. */
export const Bare: Story = { args: { appSwitcher: false, searchBar: false } };

/** The account avatar is a full Avatar: an icon on a swatch here. Any Avatar property goes in avatarProps. */
export const AccountAvatar: Story = {
  args: { username: "firstname.lastname@zebra.com", avatarProps: { type: "icon", icon: "verified", swatchColor: "purple" } },
};
