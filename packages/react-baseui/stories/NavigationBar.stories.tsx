import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button, NavigationBar, NavigationBarSpacer, NavigationItem, type NavigationBarProps } from "../src/index.js";

const Stack = ({ children }: { children: React.ReactNode }) => <div style={{ display: "grid", gap: 16, maxWidth: 640 }}>{children}</div>;
const Cap = ({ children }: { children: React.ReactNode }) => <div style={{ font: "500 12px/1.4 system-ui", opacity: 0.7 }}>{children}</div>;
/** The bar has no fill: show it on the page surface it would sit on. */
const Screen = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: "var(--surface-page)", border: "1px dashed var(--border-subtle)" }}>{children}</div>
);

const Primary = () => (
  <>
    <NavigationItem label="Home" icon="home" href="#home" active />
    <NavigationItem label="Tasks" icon="list" href="#tasks" />
    <NavigationItem label="Inbox" icon="inbox" href="#inbox" badge={3} badgeLabel="3 unread" />
    <NavigationItem label="Map" icon="map" href="#map" />
  </>
);
const Secondary = () => (
  <>
    <NavigationItem label="Profile" icon="user-circle" href="#profile" />
    <NavigationItem label="Settings" icon="settings" href="#settings" />
  </>
);
const Action = <Button size="small" leadingIcon="barcode">Scan</Button>;

type Args = NavigationBarProps & { showAction?: boolean; spacer?: boolean; showDivider?: boolean };

const meta: Meta<Args> = {
  title: "Components/Navigation Bar",
  component: NavigationBar,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A horizontal bar of top-level destinations: a `<nav>` landmark holding NavigationItem children, optionally split into groups by NavigationBarSpacer, with one call to action in `action`. No fill, a top border only. Built on Base UI NavigationMenu. Figma `shrinkItems` is `distribution` (`start` | `space-between`). Spec: specs/navigation-bar.",
      },
    },
  },
  argTypes: {
    distribution: { control: "inline-radio", options: ["start", "space-between"] },
  },
  args: { label: "Main", distribution: "start", spacer: false, showDivider: false, showAction: false, actionDivider: false },
  render: ({ showAction, spacer, showDivider, ...args }) => (
    <div style={{ maxWidth: 640 }}>
      <Screen>
        <NavigationBar {...args} action={showAction ? Action : undefined}>
          <Primary />
          {spacer ? <><NavigationBarSpacer showDivider={showDivider} /><Secondary /></> : null}
        </NavigationBar>
      </Screen>
    </div>
  ),
};
export default meta;
type Story = StoryObj<Args>;

export const Playground: Story = {};

/** Spec `shrinkItems`, renamed `distribution`. `start`: items hug and pack. `space-between`: free space goes between items, so the end items touch the edges. */
export const Distribution: Story = {
  render: () => (
    <Stack>
      <Cap>start (shrinkItems=true)</Cap>
      <Screen><NavigationBar><Primary /></NavigationBar></Screen>
      <Cap>space-between (shrinkItems=false)</Cap>
      <Screen><NavigationBar distribution="space-between"><Primary /></NavigationBar></Screen>
    </Stack>
  ),
};

/** Spec `spacer` + Right Slot: a NavigationBarSpacer between two groups pushes the second to the end. */
export const Spacer: Story = {
  render: () => (
    <Stack>
      <Cap>no spacer</Cap>
      <Screen><NavigationBar><Primary /><Secondary /></NavigationBar></Screen>
      <Cap>spacer</Cap>
      <Screen><NavigationBar><Primary /><NavigationBarSpacer /><Secondary /></NavigationBar></Screen>
    </Stack>
  ),
};

/** Spec `showDivider` (group divider) — and the Spacer's own `showDivider`, unwired in Figma, wired here. */
export const ShowDivider: Story = {
  render: () => (
    <Stack>
      <Cap>false</Cap>
      <Screen><NavigationBar><Primary /><NavigationBarSpacer /><Secondary /></NavigationBar></Screen>
      <Cap>true</Cap>
      <Screen><NavigationBar><Primary /><NavigationBarSpacer showDivider /><Secondary /></NavigationBar></Screen>
    </Stack>
  ),
};

/** Spec `showActionSlot`: one action at the end, not a destination. `actionDivider` is Figma's undocumented second divider. */
export const ActionSlot: Story = {
  render: () => (
    <Stack>
      <Cap>no action</Cap>
      <Screen><NavigationBar><Primary /></NavigationBar></Screen>
      <Cap>action</Cap>
      <Screen><NavigationBar action={Action}><Primary /></NavigationBar></Screen>
      <Cap>spacer + dividers + action (actionDivider)</Cap>
      <Screen>
        <NavigationBar action={Action} actionDivider>
          <NavigationItem label="Home" icon="home" href="#home" active />
          <NavigationItem label="Inbox" icon="inbox" href="#inbox" badge />
          <NavigationBarSpacer showDivider />
          <Secondary />
        </NavigationBar>
      </Screen>
    </Stack>
  ),
};

/** Combinations Figma does not draw (spacer and divider under space-between, action with space-between) — they just work. */
export const OtherCombinations: Story = {
  render: () => (
    <Stack>
      <Cap>space-between + spacer with divider</Cap>
      <Screen><NavigationBar distribution="space-between"><Primary /><NavigationBarSpacer showDivider /><Secondary /></NavigationBar></Screen>
      <Cap>space-between + action</Cap>
      <Screen><NavigationBar distribution="space-between" action={Action}><Primary /></NavigationBar></Screen>
    </Stack>
  ),
};

export const ThemingCascade: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(560px, 1fr))" }}>
      {["", "mode-dark", "ext-companion", "ext-companion mode-dark"].map((cls) => (
        <div key={cls} className={cls} style={{ padding: 16, background: "var(--surface-page)", color: "var(--foreground-primary)", display: "grid", gap: 8 }}>
          <Cap>{cls || "base / light"}</Cap>
          <NavigationBar action={Action}>
            <NavigationItem label="Home" icon="home" href="#home" active />
            <NavigationItem label="Inbox" icon="inbox" href="#inbox" badge={3} />
            <NavigationItem label="Reports" icon="dashboard" href="#reports" disabled />
            <NavigationBarSpacer showDivider />
            <NavigationItem label="Profile" icon="user-circle" href="#profile" />
          </NavigationBar>
        </div>
      ))}
    </div>
  ),
};
