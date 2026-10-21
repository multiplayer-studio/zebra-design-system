import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { iconNames } from "@zebra-design-system/icons/names";
import { SubMenuItem, type SubMenuItemProps } from "../src/index.js";

const Cap = ({ children }: { children: React.ReactNode }) => <div style={{ font: "500 12px/1.4 system-ui", opacity: 0.7 }}>{children}</div>;
/** The panel's own width and inset: 240px, space/sm. */
const Panel = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: "grid", gap: 4, width: 224, padding: 8, background: "var(--surface-section)", color: "var(--foreground-primary)" }}>{children}</div>
);
const Grid = ({ children }: { children: React.ReactNode }) => <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "flex-start" }}>{children}</div>;
const Col = ({ cap, children }: { cap: string; children: React.ReactNode }) => (
  <div style={{ display: "grid", gap: 4 }}><Cap>{cap}</Cap><Panel>{children}</Panel></div>
);

const meta: Meta<SubMenuItemProps> = {
  title: "Components/Navigation Rail/Sub Menu Item",
  component: SubMenuItem,
  tags: ["autodocs"],
  args: { label: "Analytics", icon: "analytics", showLeadingIcon: true, selected: false, disabled: false, nested: false, badge: null, subMenu: false, open: false, shape: "rounded" },
  argTypes: {
    icon: { control: "select", options: iconNames },
    shape: { control: "inline-radio", options: ["rounded", "sharp"] },
    badge: { control: "text" },
  },
};
export default meta;
type Story = StoryObj<SubMenuItemProps>;

export const Playground: Story = {
  render: (args) => (
    <Panel>
      <SubMenuItem {...args} />
    </Panel>
  ),
};

/** state × nested: default and selected are props; hover and active (pressed) are CSS. */
export const States: Story = {
  render: () => (
    <Grid>
      {[false, true].map((n) => (
        <Col key={String(n)} cap={`nested=${n}`}>
          <SubMenuItem label="Default" icon="analytics" nested={n} />
          <SubMenuItem label="Selected" icon="analytics" nested={n} selected />
          <SubMenuItem label="Disabled" icon="analytics" nested={n} disabled />
        </Col>
      ))}
    </Grid>
  ),
};

/** nested: indent, quieter label, smaller type. */
export const Nested: Story = {
  render: () => (
    <Grid>
      <Col cap="nested=false"><SubMenuItem label="Open orders" icon="list" /></Col>
      <Col cap="nested=true"><SubMenuItem label="Open orders" icon="list" nested /></Col>
    </Grid>
  ),
};

/** showLeadingIcon. */
export const LeadingIcon: Story = {
  render: () => (
    <Grid>
      <Col cap="showLeadingIcon=true"><SubMenuItem label="Schedule" icon="schedule" /></Col>
      <Col cap="showLeadingIcon=false"><SubMenuItem label="Schedule" icon="schedule" showLeadingIcon={false} /></Col>
    </Grid>
  ),
};

/** showBadge (badge): a counter in the layout. Visible whenever badge is set — with or without the icon (spec fix). */
export const Badge: Story = {
  render: () => (
    <Grid>
      <Col cap="badge=2"><SubMenuItem label="Schedule" icon="schedule" badge={2} /></Col>
      <Col cap="badge=12, no icon"><SubMenuItem label="Schedule" showLeadingIcon={false} badge={12} /></Col>
      <Col cap="long label + badge + caret"><SubMenuItem label="Warehouse transfers awaiting review" icon="store" badge={140} subMenu /></Col>
    </Grid>
  ),
};

/** subMenu: the trailing chevron-right caret; `open` turns it 90°. */
export const SubMenu: Story = {
  render: () => (
    <Grid>
      <Col cap="subMenu=false"><SubMenuItem label="Teams" icon="group" /></Col>
      <Col cap="subMenu=true"><SubMenuItem label="Teams" icon="group" subMenu /></Col>
      <Col cap="subMenu=true, open"><SubMenuItem label="Teams" icon="group" subMenu open /></Col>
    </Grid>
  ),
};

export const ThemingCascade: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
      {["", "mode-dark", "ext-companion", "ext-companion mode-dark"].map((cls) => (
        <div key={cls} className={cls} style={{ padding: 16, background: "var(--surface-page)", color: "var(--foreground-primary)", display: "grid", gap: 8 }}>
          <Cap>{cls || "base / light"}</Cap>
          <Panel>
            <SubMenuItem label="Analytics" icon="analytics" selected />
            <SubMenuItem label="Schedule" icon="schedule" badge={2} />
            <SubMenuItem label="Teams" icon="group" subMenu />
            <SubMenuItem label="Open orders" icon="list" nested />
            <SubMenuItem label="Files" icon="folder" disabled />
          </Panel>
        </div>
      ))}
    </div>
  ),
};
