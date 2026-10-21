import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { iconNames } from "@zebra-design-system/icons/names";
import { NotificationItem, Button } from "../src/index.js";

// A small inline SVG as sample artwork, so the image flavour needs no network.
const ART =
  "data:image/svg+xml," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f6a821"/><stop offset="1" stop-color="#d1315a"/></linearGradient></defs><rect width="36" height="36" fill="url(#g)"/><circle cx="24" cy="12" r="5" fill="#fff8"/></svg>',
  );
const MSG = "New urgent message from Phil Starr about the spring donation drive. Please review the attached plan before Friday's stand-up.";
const action = <Button size="small" shape="rounded" flavour="outline">Open</Button>;

const List = ({ children }: { children: React.ReactNode }) => (
  <div role="feed" style={{ display: "grid", gap: 16, width: 360 }}>{children}</div>
);
const Cap = ({ children }: { children: React.ReactNode }) => <div style={{ font: "500 12px/1.4 system-ui", opacity: 0.7 }}>{children}</div>;

const meta: Meta<typeof NotificationItem> = {
  title: "Components/Notification Item",
  component: NotificationItem,
  tags: ["autodocs"],
  argTypes: {
    leading: { control: "inline-radio", options: ["avatar", "image", "icon"] },
    icon: { control: "select", options: iconNames },
  },
  args: {
    read: false,
    group: false,
    urgent: false,
    heading: "Urgent Message",
    timestamp: "Just now",
    message: MSG,
    attachment: "Spring-donation-drive.pdf",
    leading: "avatar",
    initials: "PS",
    icon: "verified",
  },
  render: (a) => (
    <List>
      <NotificationItem {...a} actions={action} />
    </List>
  ),
};
export default meta;
type Story = StoryObj<typeof NotificationItem>;

export const Playground: Story = {};

/** Spec `read`: unread carries the card surface, the primary dot and label/large; read sits flush with body/medium. */
export const Read: Story = {
  render: () => (
    <List>
      <NotificationItem heading="Shift swap requested" timestamp="2m ago" initials="AK" message="Amara asked to swap Saturday's early shift for your Sunday late." actions={action} />
      <NotificationItem read heading="Shift swap requested" timestamp="2m ago" initials="AK" message="Amara asked to swap Saturday's early shift for your Sunday late." actions={action} />
    </List>
  ),
};

/** Spec `group`: a bar under the card marks a collapsed group. Unread only — the read entry shows none. */
export const Group: Story = {
  render: () => (
    <List>
      <NotificationItem group heading="4 new replies in #store-ops" timestamp="10m ago" initials="SO" message="Jordan, Priya and 2 others replied to your thread." />
      <NotificationItem group read heading="4 new replies in #store-ops" timestamp="10m ago" initials="SO" message="Jordan, Priya and 2 others replied to your thread." />
    </List>
  ),
};

/** Spec `showAttachment`: the row follows `attachment`; without one the card shortens. */
export const Attachment: Story = {
  render: () => (
    <List>
      <NotificationItem heading="Planogram updated" timestamp="1h ago" initials="MR" message="Aisle 7 has a new layout for the spring range." attachment="Aisle-7-planogram.pdf" />
      <NotificationItem heading="Planogram updated" timestamp="1h ago" initials="MR" message="Aisle 7 has a new layout for the spring range." />
    </List>
  ),
};

/** Spec `showActions`: the row follows `actions`; without it the entry is read-only. */
export const Actions: Story = {
  render: () => (
    <List>
      <NotificationItem heading="Delivery arriving early" timestamp="5m ago" leading="icon" icon="local-shipping" message="Truck 12 is 20 minutes ahead of schedule." actions={<><Button size="small" shape="rounded" flavour="outline">Dismiss</Button><Button size="small" shape="rounded" flavour="primary">Assign dock</Button></>} />
      <NotificationItem heading="Delivery arriving early" timestamp="5m ago" leading="icon" icon="local-shipping" message="Truck 12 is 20 minutes ahead of schedule." />
    </List>
  ),
};

/** Spec `showUrgencyIndicator` (wired here; inert in Figma). Default off — reserve it. */
export const Urgent: Story = {
  render: () => (
    <List>
      <NotificationItem urgent heading="Freezer 3 above temperature" timestamp="Just now" leading="icon" icon="warning" message="Reading 2°C for 15 minutes. Move stock before it spoils." actions={action} />
      <NotificationItem heading="Weekly schedule published" timestamp="Yesterday" leading="icon" icon="calendar" message="Next week's rota is ready to view." />
    </List>
  ),
};

/** The private _Leading Visual: avatar (initials or photo), image (artwork as the slot's background) and icon. */
export const LeadingVisual: Story = {
  render: () => (
    <List>
      <NotificationItem leading="avatar" initials="PS" heading="Phil Starr mentioned you" timestamp="Just now" message="Can you cover the 3pm handover?" />
      <NotificationItem leading="image" src={ART} heading="Spring range is live" timestamp="3h ago" message="12 new products were added to your store's catalogue." />
      <NotificationItem leading="icon" icon="verified" heading="Certification renewed" timestamp="Mon" message="Your food-safety certificate is valid until next October." />
    </List>
  ),
};

export const ThemingCascade: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))" }}>
      {["", "mode-dark", "ext-companion", "ext-companion mode-dark"].map((cls) => (
        <div key={cls} className={cls} style={{ padding: 16, background: "var(--surface-page)", color: "var(--foreground-primary)", display: "grid", gap: 8 }}>
          <Cap>{cls || "base / light"}</Cap>
          <List>
            <NotificationItem urgent group initials="PS" heading="Urgent Message" timestamp="Just now" message={MSG} attachment="Spring-donation-drive.pdf" actions={action} />
            <NotificationItem read leading="icon" icon="verified" heading="Certification renewed" timestamp="Mon" message="Valid until next October." />
          </List>
        </div>
      ))}
    </div>
  ),
};
