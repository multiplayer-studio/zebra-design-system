import type { Meta, StoryObj } from "@storybook/web-components";
import { html, nothing } from "lit";
import { iconNames } from "@zebra-design-system/icons/names";
import "../src/components/notification-item/notification-item.js";
import "../src/components/button/button.js";

// A small inline SVG as sample artwork, so the image flavour needs no network.
const ART =
  "data:image/svg+xml," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f6a821"/><stop offset="1" stop-color="#d1315a"/></linearGradient></defs><rect width="36" height="36" fill="url(#g)"/><circle cx="24" cy="12" r="5" fill="#fff8"/></svg>',
  );
const MSG = "New urgent message from Phil Starr about the spring donation drive. Please review the attached plan before Friday's stand-up.";
const action = html`<zds-button slot="actions" size="small" shape="rounded" flavour="outline">Open</zds-button>`;

const list = (c: unknown) => html`<div role="feed" style="display:grid;gap:16px;width:360px">${c}</div>`;
const cap = (t: string) => html`<div style="font:500 12px/1.4 system-ui;opacity:.7">${t}</div>`;

const meta: Meta = {
  title: "Components/Notification Item",
  component: "zds-notification-item",
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
  render: (a) => list(html`<zds-notification-item
    ?read=${a.read}
    ?group=${a.group}
    ?urgent=${a.urgent}
    heading=${a.heading}
    timestamp=${a.timestamp}
    message=${a.message ?? nothing}
    attachment=${a.attachment || nothing}
    leading=${a.leading}
    initials=${a.initials ?? nothing}
    src=${a.leading === "image" ? ART : nothing}
    icon=${a.icon}
  >${action}</zds-notification-item>`),
};
export default meta;
type Story = StoryObj;

export const Playground: Story = {};

/** Spec \`read\`: unread carries the card surface, the primary dot and label/large; read sits flush with body/medium. */
export const Read: Story = {
  render: () => list(html`
    <zds-notification-item heading="Shift swap requested" timestamp="2m ago" initials="AK" message="Amara asked to swap Saturday's early shift for your Sunday late.">${action}</zds-notification-item>
    <zds-notification-item read heading="Shift swap requested" timestamp="2m ago" initials="AK" message="Amara asked to swap Saturday's early shift for your Sunday late.">${action}</zds-notification-item>
  `),
};

/** Spec \`group\`: a bar under the card marks a collapsed group. Unread only — the read entry shows none. */
export const Group: Story = {
  render: () => list(html`
    <zds-notification-item group heading="4 new replies in #store-ops" timestamp="10m ago" initials="SO" message="Jordan, Priya and 2 others replied to your thread."></zds-notification-item>
    <zds-notification-item group read heading="4 new replies in #store-ops" timestamp="10m ago" initials="SO" message="Jordan, Priya and 2 others replied to your thread."></zds-notification-item>
  `),
};

/** Spec \`showAttachment\`: the row follows \`attachment\`; without one the card shortens. */
export const Attachment: Story = {
  render: () => list(html`
    <zds-notification-item heading="Planogram updated" timestamp="1h ago" initials="MR" message="Aisle 7 has a new layout for the spring range." attachment="Aisle-7-planogram.pdf"></zds-notification-item>
    <zds-notification-item heading="Planogram updated" timestamp="1h ago" initials="MR" message="Aisle 7 has a new layout for the spring range."></zds-notification-item>
  `),
};

/** Spec \`showActions\`: the row follows the \`actions\` slot; without it the entry is read-only. */
export const Actions: Story = {
  render: () => list(html`
    <zds-notification-item heading="Delivery arriving early" timestamp="5m ago" leading="icon" icon="local-shipping" message="Truck 12 is 20 minutes ahead of schedule.">
      <zds-button slot="actions" size="small" shape="rounded" flavour="outline">Dismiss</zds-button>
      <zds-button slot="actions" size="small" shape="rounded" flavour="primary">Assign dock</zds-button>
    </zds-notification-item>
    <zds-notification-item heading="Delivery arriving early" timestamp="5m ago" leading="icon" icon="local-shipping" message="Truck 12 is 20 minutes ahead of schedule."></zds-notification-item>
  `),
};

/** Spec \`showUrgencyIndicator\` (wired here; inert in Figma). Default off — reserve it. */
export const Urgent: Story = {
  render: () => list(html`
    <zds-notification-item urgent heading="Freezer 3 above temperature" timestamp="Just now" leading="icon" icon="warning" message="Reading 2°C for 15 minutes. Move stock before it spoils.">${action}</zds-notification-item>
    <zds-notification-item heading="Weekly schedule published" timestamp="Yesterday" leading="icon" icon="calendar" message="Next week's rota is ready to view."></zds-notification-item>
  `),
};

/** The private _Leading Visual: avatar (initials or photo), image (artwork as the slot's background) and icon. */
export const LeadingVisual: Story = {
  render: () => list(html`
    <zds-notification-item leading="avatar" initials="PS" heading="Phil Starr mentioned you" timestamp="Just now" message="Can you cover the 3pm handover?"></zds-notification-item>
    <zds-notification-item leading="image" src=${ART} heading="Spring range is live" timestamp="3h ago" message="12 new products were added to your store's catalogue."></zds-notification-item>
    <zds-notification-item leading="icon" icon="verified" heading="Certification renewed" timestamp="Mon" message="Your food-safety certificate is valid until next October."></zds-notification-item>
  `),
};

export const ThemingCascade: Story = {
  render: () => html`<div style="display:grid;gap:12px;grid-template-columns:repeat(auto-fit,minmax(400px,1fr))">
    ${["", "mode-dark", "ext-companion", "ext-companion mode-dark"].map((cls) => html`
      <div class=${cls} style="padding:16px;background:var(--surface-page);color:var(--foreground-primary);display:grid;gap:8px">
        ${cap(cls || "base / light")}
        ${list(html`
          <zds-notification-item urgent group initials="PS" heading="Urgent Message" timestamp="Just now" message=${MSG} attachment="Spring-donation-drive.pdf">${action}</zds-notification-item>
          <zds-notification-item read leading="icon" icon="verified" heading="Certification renewed" timestamp="Mon" message="Valid until next October."></zds-notification-item>
        `)}
      </div>`)}
  </div>`,
};
