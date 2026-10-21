import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { iconNames } from "@zebra-design-system/icons/names";
import { NavigationRailItem, type NavigationRailItemProps } from "../src/index.js";

const Cap = ({ children }: { children: React.ReactNode }) => <div style={{ font: "500 12px/1.4 system-ui", opacity: 0.7 }}>{children}</div>;
/** Items paint no surface of their own: show them on the rail's. */
const Surface = ({ children, width }: { children: React.ReactNode; width?: number }) => (
  <div style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: 12, background: "var(--surface-section)", color: "var(--foreground-primary)", width: width ?? "fit-content" }}>{children}</div>
);
const Col = ({ cap, children }: { cap: string; children: React.ReactNode }) => (
  <div style={{ display: "grid", gap: 4, justifyItems: "start" }}><Cap>{cap}</Cap>{children}</div>
);

const meta: Meta<NavigationRailItemProps> = {
  title: "Components/NavigationRailItem",
  component: NavigationRailItem,
  tags: ["autodocs"],
  args: { label: "Inbox", icon: "inbox", selected: false, disabled: false, expanded: false, showLabel: false, showIcon: true, badge: false, shape: "rounded" },
  argTypes: { icon: { control: "select", options: iconNames }, shape: { control: "inline-radio", options: ["rounded", "sharp"] } },
};
export default meta;
type Story = StoryObj<NavigationRailItemProps>;

export const Playground: Story = {
  render: (args) => (
    <Surface width={args.expanded ? 200 : undefined}>
      <NavigationRailItem {...args} />
    </Surface>
  ),
};

/** state: default and selected are props-driven; hover and active (pressed) are CSS — hover the items. */
export const States: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 12 }}>
      {[false, true].map((e) => (
        <Surface key={String(e)}>
          <Col cap="default"><div style={{ width: e ? 176 : "auto" }}><NavigationRailItem label="Inbox" icon="inbox" expanded={e} /></div></Col>
          <Col cap="selected"><div style={{ width: e ? 176 : "auto" }}><NavigationRailItem label="Inbox" icon="inbox" expanded={e} selected /></div></Col>
          <Col cap="disabled"><div style={{ width: e ? 176 : "auto" }}><NavigationRailItem label="Inbox" icon="inbox" expanded={e} disabled /></div></Col>
        </Surface>
      ))}
    </div>
  ),
};

/** expanded: the narrow square target vs the wide row. */
export const Expanded: Story = {
  render: () => (
    <Surface>
      <Col cap="expanded=false"><NavigationRailItem label="Reports" icon="dashboard" /></Col>
      <Col cap="expanded=true"><div style={{ width: 176 }}><NavigationRailItem label="Reports" icon="dashboard" expanded /></div></Col>
    </Surface>
  ),
};

/** showLabel: the narrow caption. One line, end-truncated (Figma), so keep it to a short word. */
export const ShowLabel: Story = {
  render: () => (
    <Surface>
      <Col cap="showLabel=false"><NavigationRailItem label="Map" icon="map" /></Col>
      <Col cap="showLabel=true"><NavigationRailItem label="Map" icon="map" showLabel /></Col>
      <Col cap="long label, truncated"><div style={{ width: 48 }}><NavigationRailItem label="Calendar" icon="calendar" showLabel /></div></Col>
    </Surface>
  ),
};

/** showIcon: only turn it off in the wide form. */
export const ShowIcon: Story = {
  render: () => (
    <Surface>
      <Col cap="showIcon=true"><div style={{ width: 176 }}><NavigationRailItem label="Settings" icon="settings" expanded /></div></Col>
      <Col cap="showIcon=false"><div style={{ width: 176 }}><NavigationRailItem label="Settings" icon="settings" expanded showIcon={false} /></div></Col>
    </Surface>
  ),
};

/** showBadge (badge): the Badges-page dot, overhanging the glyph, outside the layout. */
export const Badge: Story = {
  render: () => (
    <Surface>
      <Col cap="badge=false"><NavigationRailItem label="Inbox" icon="inbox" /></Col>
      <Col cap="badge=true"><NavigationRailItem label="Inbox" icon="inbox" badge badgeLabel="New messages" /></Col>
      <Col cap="badge, expanded"><div style={{ width: 176 }}><NavigationRailItem label="Inbox" icon="inbox" badge expanded /></div></Col>
    </Surface>
  ),
};

export const ThemingCascade: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(480px, 1fr))" }}>
      {["", "mode-dark", "ext-companion", "ext-companion mode-dark"].map((cls) => (
        <div key={cls} className={cls} style={{ padding: 16, background: "var(--surface-page)", color: "var(--foreground-primary)", display: "grid", gap: 8 }}>
          <Cap>{cls || "base / light"}</Cap>
          <Surface>
            <NavigationRailItem label="Home" icon="home" selected />
            <NavigationRailItem label="Inbox" icon="inbox" badge />
            <NavigationRailItem label="Map" icon="map" showLabel />
            <NavigationRailItem label="Stores" icon="store" disabled />
            <div style={{ width: 176 }}><NavigationRailItem label="Reports" icon="dashboard" expanded selected /></div>
          </Surface>
        </div>
      ))}
    </div>
  ),
};
