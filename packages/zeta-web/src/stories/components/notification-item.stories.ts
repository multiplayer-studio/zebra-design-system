import type { Meta, StoryObj } from "@storybook/web-components";
import type { ZetaNotificationItem } from "../../components/notification-item/notification-item.js";
import { html } from "lit";
import "../../components/notification-item/notification-item.js";
import "../../components/avatar/avatar.js";
import "../../components/button/button.js";
import "../../components/icon/icon.js";

const meta: Meta<ZetaNotificationItem> = {
  title: "Components/Notification Item",
  component: "zeta-notification-item",
  args: {
    read: false,
    group: false,
    showAttachment: true,
    showActions: true,
    showUrgencyIndicator: true,
    headline: "Urgent Message",
    timestamp: "Just now",
    attachment: "Spring-donation-drive.pdf"
  },
  parameters: {
    design: {
      url: "https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6020-1488"
    },
    status: {
      type: "ready"
    }
  }
};

export default meta;

export const NotificationItem: StoryObj<ZetaNotificationItem> = {
  render: args => html`
    <zeta-notification-item
      ?read=${args.read}
      ?group=${args.group}
      ?show-attachment=${args.showAttachment}
      ?show-actions=${args.showActions}
      ?show-urgency-indicator=${args.showUrgencyIndicator}
      headline=${args.headline}
      timestamp=${args.timestamp}
      attachment=${args.attachment}
    >
      <zeta-avatar slot="leading" size="xxs">PS</zeta-avatar>
      New urgent message from Phil Starr about the spring donation drive and what still needs doing before Friday.
      <zeta-button slot="action" size="small" flavor="outline" shape="rounded">User Action</zeta-button>
    </zeta-notification-item>
  `
};

/** Unread with a group bar, read, and the three leading flavours: avatar, image and icon. */
export const NotificationItemList: StoryObj<ZetaNotificationItem> = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: var(--space-md);">
      <zeta-notification-item group attachment="Spring-donation-drive.pdf">
        <zeta-avatar slot="leading" size="xxs">PS</zeta-avatar>
        New urgent message from Phil Starr.
        <zeta-button slot="action" size="small" flavor="outline" shape="rounded">User Action</zeta-button>
      </zeta-notification-item>
      <zeta-notification-item read headline="Order shipped" timestamp="2h ago" .showUrgencyIndicator=${false} .showActions=${false}>
        <img
          slot="leading"
          alt=""
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Crect width='1' height='1' fill='%231f69ff'/%3E%3C/svg%3E"
        />
        Your order is on its way.
      </zeta-notification-item>
      <zeta-notification-item read headline="System update" timestamp="Yesterday" .showUrgencyIndicator=${false} .showActions=${false}>
        <zeta-icon slot="leading">verified</zeta-icon>
        The app was updated to the latest version.
      </zeta-notification-item>
    </div>
  `
};
