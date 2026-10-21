import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { iconNames } from "@zebra-design-system/icons/names";
import { NavigationItem } from "../src/index.js";

const Row = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: "flex", gap: 16, alignItems: "flex-end", flexWrap: "wrap" }}>{children}</div>
);
const Cell = ({ cap, children }: { cap: string; children: React.ReactNode }) => (
  <div style={{ display: "grid", gap: 4, justifyItems: "center" }}>
    {children}
    <div style={{ font: "500 12px/1.4 system-ui", opacity: 0.7 }}>{cap}</div>
  </div>
);

const meta: Meta<typeof NavigationItem> = {
  title: "Components/Navigation Item",
  component: NavigationItem,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A single destination in a Navigation Bar: icon above label, optional badge. `href` renders a link, otherwise a button. `active` sets `aria-current=\"page\"`. Hover, pressed and focus come from the ghost interactive tokens (not in Figma). Spec: specs/navigation-item.",
      },
    },
  },
  argTypes: {
    icon: { control: "select", options: iconNames },
    badge: { control: "text" },
    onClick: { action: "click" },
  },
  args: { label: "Inbox", icon: "inbox", active: false, disabled: false, badge: null },
};
export default meta;
type Story = StoryObj<typeof NavigationItem>;

export const Playground: Story = {};

/** Spec `active`: colour alone in Figma; `aria-current="page"` in code. */
export const Active: Story = {
  render: () => (
    <Row>
      <Cell cap="false"><NavigationItem label="Home" icon="home" /></Cell>
      <Cell cap="true"><NavigationItem label="Home" icon="home" active /></Cell>
    </Row>
  ),
};

/** Spec `disabled`: offered on inactive items. A link loses its href; a button is natively disabled. */
export const Disabled: Story = {
  render: () => (
    <Row>
      <Cell cap="false"><NavigationItem label="Reports" icon="dashboard" /></Cell>
      <Cell cap="true (button)"><NavigationItem label="Reports" icon="dashboard" disabled /></Cell>
      <Cell cap="true (link)"><NavigationItem label="Reports" icon="dashboard" href="#reports" disabled /></Cell>
    </Row>
  ),
};

/** Spec `showBadge`, widened to a count: `true` is Figma's dot; a number reuses the Notification Indicator's medium/large sizes. */
export const Badge: Story = {
  render: () => (
    <Row>
      <Cell cap="none"><NavigationItem label="Inbox" icon="inbox" /></Cell>
      <Cell cap="true (dot)"><NavigationItem label="Inbox" icon="inbox" badge badgeLabel="new messages" /></Cell>
      <Cell cap="3"><NavigationItem label="Inbox" icon="inbox" badge={3} badgeLabel="3 unread" /></Cell>
      <Cell cap="12"><NavigationItem label="Inbox" icon="inbox" badge={12} /></Cell>
      <Cell cap="140 → 99+"><NavigationItem label="Inbox" icon="inbox" badge={140} /></Cell>
      <Cell cap="active + dot"><NavigationItem label="Inbox" icon="inbox" badge active /></Cell>
    </Row>
  ),
};

/** Spec `label`: one or two words; the item hugs it, never wraps or truncates. */
export const Label: Story = {
  render: () => (
    <Row>
      <Cell cap="short"><NavigationItem label="Map" icon="map" /></Cell>
      <Cell cap="two words"><NavigationItem label="My tasks" icon="list" /></Cell>
      <Cell cap="too long"><NavigationItem label="Shift handover notes" icon="history" /></Cell>
    </Row>
  ),
};

/** Not in Figma: hover, pressed and focus (Tab to see the ring) from the ghost interactive tokens. */
export const InteractionStates: Story = {
  render: () => (
    <Row>
      <Cell cap="link"><NavigationItem label="Home" icon="home" href="#home" /></Cell>
      <Cell cap="button"><NavigationItem label="Search" icon="search" /></Cell>
      <Cell cap="active link"><NavigationItem label="Profile" icon="user-circle" href="#profile" active /></Cell>
    </Row>
  ),
};

export const ThemingCascade: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" }}>
      {["", "mode-dark", "ext-companion", "ext-companion mode-dark"].map((cls) => (
        <div key={cls} className={cls} style={{ padding: 16, background: "var(--surface-page)", color: "var(--foreground-primary)", display: "grid", gap: 8 }}>
          <div style={{ font: "500 12px/1.4 system-ui", opacity: 0.7 }}>{cls || "base / light"}</div>
          <Row>
            <NavigationItem label="Home" icon="home" active />
            <NavigationItem label="Inbox" icon="inbox" badge={3} />
            <NavigationItem label="Reports" icon="dashboard" disabled />
          </Row>
        </div>
      ))}
    </div>
  ),
};
