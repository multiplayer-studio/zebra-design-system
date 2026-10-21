import type { Meta, StoryObj } from "@storybook/web-components";
import { html, nothing } from "lit";
import { iconNames } from "@zebra-design-system/icons/names";
import "../src/components/navigation-item/navigation-item.js";

const row = (c: unknown) => html`<div style="display:flex;gap:16px;align-items:flex-end;flex-wrap:wrap">${c}</div>`;
const cell = (cap: string, c: unknown) =>
  html`<div style="display:grid;gap:4px;justify-items:center">${c}<div style="font:500 12px/1.4 system-ui;opacity:.7">${cap}</div></div>`;

const meta: Meta = {
  title: "Components/Navigation Item",
  component: "zds-navigation-item",
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
  },
  args: { label: "Inbox", icon: "inbox", active: false, disabled: false, badge: "" },
  render: (a) => html`<zds-navigation-item
    label=${a.label}
    icon=${a.icon}
    ?active=${a.active}
    ?disabled=${a.disabled}
    .badge=${a.badge === "" || a.badge == null ? null : a.badge === "true" ? true : a.badge}
    @click=${() => console.log("click")}
  ></zds-navigation-item>`,
};
export default meta;
type Story = StoryObj;

export const Playground: Story = {};

/** Spec \`active\`: colour alone in Figma; \`aria-current="page"\` in code. */
export const Active: Story = {
  render: () => row(html`
    ${cell("false", html`<zds-navigation-item label="Home" icon="home"></zds-navigation-item>`)}
    ${cell("true", html`<zds-navigation-item label="Home" icon="home" active></zds-navigation-item>`)}
  `),
};

/** Spec \`disabled\`: offered on inactive items. A link loses its href; a button is natively disabled. */
export const Disabled: Story = {
  render: () => row(html`
    ${cell("false", html`<zds-navigation-item label="Reports" icon="dashboard"></zds-navigation-item>`)}
    ${cell("true (button)", html`<zds-navigation-item label="Reports" icon="dashboard" disabled></zds-navigation-item>`)}
    ${cell("true (link)", html`<zds-navigation-item label="Reports" icon="dashboard" href="#reports" disabled></zds-navigation-item>`)}
  `),
};

/** Spec \`showBadge\`, widened to a count: bare \`badge\` is Figma's dot; a number reuses the Notification Indicator's medium/large sizes. */
export const Badge: Story = {
  render: () => row(html`
    ${cell("none", html`<zds-navigation-item label="Inbox" icon="inbox"></zds-navigation-item>`)}
    ${cell("true (dot)", html`<zds-navigation-item label="Inbox" icon="inbox" badge badge-label="new messages"></zds-navigation-item>`)}
    ${cell("3", html`<zds-navigation-item label="Inbox" icon="inbox" badge="3" badge-label="3 unread"></zds-navigation-item>`)}
    ${cell("12", html`<zds-navigation-item label="Inbox" icon="inbox" .badge=${12}></zds-navigation-item>`)}
    ${cell("140 → 99+", html`<zds-navigation-item label="Inbox" icon="inbox" .badge=${140}></zds-navigation-item>`)}
    ${cell("active + dot", html`<zds-navigation-item label="Inbox" icon="inbox" badge active></zds-navigation-item>`)}
  `),
};

/** Spec \`label\`: one or two words; the item hugs it, never wraps or truncates. */
export const Label: Story = {
  render: () => row(html`
    ${cell("short", html`<zds-navigation-item label="Map" icon="map"></zds-navigation-item>`)}
    ${cell("two words", html`<zds-navigation-item label="My tasks" icon="list"></zds-navigation-item>`)}
    ${cell("too long", html`<zds-navigation-item label="Shift handover notes" icon="history"></zds-navigation-item>`)}
  `),
};

/** Not in Figma: hover, pressed and focus (Tab to see the ring) from the ghost interactive tokens. */
export const InteractionStates: Story = {
  render: () => row(html`
    ${cell("link", html`<zds-navigation-item label="Home" icon="home" href="#home"></zds-navigation-item>`)}
    ${cell("button", html`<zds-navigation-item label="Search" icon="search"></zds-navigation-item>`)}
    ${cell("active link", html`<zds-navigation-item label="Profile" icon="user-circle" href="#profile" active></zds-navigation-item>`)}
  `),
};

export const ThemingCascade: Story = {
  render: () => html`<div style="display:grid;gap:12px;grid-template-columns:repeat(auto-fit,minmax(320px,1fr))">
    ${["", "mode-dark", "ext-companion", "ext-companion mode-dark"].map((cls) => html`
      <div class=${cls || nothing} style="padding:16px;background:var(--surface-page);color:var(--foreground-primary);display:grid;gap:8px">
        <div style="font:500 12px/1.4 system-ui;opacity:.7">${cls || "base / light"}</div>
        ${row(html`
          <zds-navigation-item label="Home" icon="home" active></zds-navigation-item>
          <zds-navigation-item label="Inbox" icon="inbox" badge="3"></zds-navigation-item>
          <zds-navigation-item label="Reports" icon="dashboard" disabled></zds-navigation-item>
        `)}
      </div>`)}
  </div>`,
};
