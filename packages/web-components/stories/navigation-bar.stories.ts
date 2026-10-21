import type { Meta, StoryObj } from "@storybook/web-components";
import { html, nothing } from "lit";
import "../src/components/navigation-bar/navigation-bar.js";
import "../src/components/navigation-bar/navigation-bar-spacer.js";
import "../src/components/navigation-item/navigation-item.js";
import "../src/components/button/button.js";

const stack = (c: unknown) => html`<div style="display:grid;gap:16px;max-width:640px">${c}</div>`;
const cap = (t: string) => html`<div style="font:500 12px/1.4 system-ui;opacity:.7">${t}</div>`;
/** The bar has no fill: show it on the page surface it would sit on. */
const screen = (c: unknown) => html`<div style="background:var(--surface-page);border:1px dashed var(--border-subtle)">${c}</div>`;

const primary = html`
  <zds-navigation-item label="Home" icon="home" href="#home" active></zds-navigation-item>
  <zds-navigation-item label="Tasks" icon="list" href="#tasks"></zds-navigation-item>
  <zds-navigation-item label="Inbox" icon="inbox" href="#inbox" badge="3" badge-label="3 unread"></zds-navigation-item>
  <zds-navigation-item label="Map" icon="map" href="#map"></zds-navigation-item>`;
const secondary = html`
  <zds-navigation-item label="Profile" icon="user-circle" href="#profile"></zds-navigation-item>
  <zds-navigation-item label="Settings" icon="settings" href="#settings"></zds-navigation-item>`;
const action = html`<zds-button slot="action" size="small" leading-icon="barcode">Scan</zds-button>`;

const meta: Meta = {
  title: "Components/Navigation Bar",
  component: "zds-navigation-bar",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A horizontal bar of top-level destinations: a `<nav>` landmark holding `zds-navigation-item` children, optionally split into groups by `zds-navigation-bar-spacer`, with one call to action in `slot=\"action\"`. No fill, a top border only. Figma `shrinkItems` is `distribution` (`start` | `space-between`). Spec: specs/navigation-bar.",
      },
    },
  },
  argTypes: {
    distribution: { control: "inline-radio", options: ["start", "space-between"] },
  },
  args: { label: "Main", distribution: "start", spacer: false, showDivider: false, showAction: false, actionDivider: false },
  render: (a) => html`<div style="max-width:640px">${screen(html`
    <zds-navigation-bar label=${a.label} distribution=${a.distribution} ?action-divider=${a.actionDivider}>
      ${primary}
      ${a.spacer ? html`<zds-navigation-bar-spacer ?show-divider=${a.showDivider}></zds-navigation-bar-spacer>${secondary}` : nothing}
      ${a.showAction ? action : nothing}
    </zds-navigation-bar>`)}</div>`,
};
export default meta;
type Story = StoryObj;

export const Playground: Story = {};

/** Spec \`shrinkItems\`, renamed \`distribution\`. \`start\`: items hug and pack. \`space-between\`: free space goes between items, so the end items touch the edges. */
export const Distribution: Story = {
  render: () => stack(html`
    ${cap("start (shrinkItems=true)")}
    ${screen(html`<zds-navigation-bar>${primary}</zds-navigation-bar>`)}
    ${cap("space-between (shrinkItems=false)")}
    ${screen(html`<zds-navigation-bar distribution="space-between">${primary}</zds-navigation-bar>`)}
  `),
};

/** Spec \`spacer\` + Right Slot: a spacer between two groups pushes the second to the end. */
export const Spacer: Story = {
  render: () => stack(html`
    ${cap("no spacer")}
    ${screen(html`<zds-navigation-bar>${primary}${secondary}</zds-navigation-bar>`)}
    ${cap("spacer")}
    ${screen(html`<zds-navigation-bar>${primary}<zds-navigation-bar-spacer></zds-navigation-bar-spacer>${secondary}</zds-navigation-bar>`)}
  `),
};

/** Spec \`showDivider\` (group divider) — and the Spacer's own \`showDivider\`, unwired in Figma, wired here. */
export const ShowDivider: Story = {
  render: () => stack(html`
    ${cap("false")}
    ${screen(html`<zds-navigation-bar>${primary}<zds-navigation-bar-spacer></zds-navigation-bar-spacer>${secondary}</zds-navigation-bar>`)}
    ${cap("true")}
    ${screen(html`<zds-navigation-bar>${primary}<zds-navigation-bar-spacer show-divider></zds-navigation-bar-spacer>${secondary}</zds-navigation-bar>`)}
  `),
};

/** Spec \`showActionSlot\`: one action at the end, not a destination. \`action-divider\` is Figma's undocumented second divider. */
export const ActionSlot: Story = {
  render: () => stack(html`
    ${cap("no action")}
    ${screen(html`<zds-navigation-bar>${primary}</zds-navigation-bar>`)}
    ${cap("action")}
    ${screen(html`<zds-navigation-bar>${primary}${action}</zds-navigation-bar>`)}
    ${cap("spacer + dividers + action (action-divider)")}
    ${screen(html`<zds-navigation-bar action-divider>
      <zds-navigation-item label="Home" icon="home" href="#home" active></zds-navigation-item>
      <zds-navigation-item label="Inbox" icon="inbox" href="#inbox" badge></zds-navigation-item>
      <zds-navigation-bar-spacer show-divider></zds-navigation-bar-spacer>
      ${secondary}${action}
    </zds-navigation-bar>`)}
  `),
};

/** Combinations Figma does not draw (spacer and divider under space-between, action with space-between) — they just work. */
export const OtherCombinations: Story = {
  render: () => stack(html`
    ${cap("space-between + spacer with divider")}
    ${screen(html`<zds-navigation-bar distribution="space-between">${primary}<zds-navigation-bar-spacer show-divider></zds-navigation-bar-spacer>${secondary}</zds-navigation-bar>`)}
    ${cap("space-between + action")}
    ${screen(html`<zds-navigation-bar distribution="space-between">${primary}${action}</zds-navigation-bar>`)}
  `),
};

export const ThemingCascade: Story = {
  render: () => html`<div style="display:grid;gap:12px;grid-template-columns:repeat(auto-fit,minmax(560px,1fr))">
    ${["", "mode-dark", "ext-companion", "ext-companion mode-dark"].map((cls) => html`
      <div class=${cls || nothing} style="padding:16px;background:var(--surface-page);color:var(--foreground-primary);display:grid;gap:8px">
        ${cap(cls || "base / light")}
        <zds-navigation-bar>
          <zds-navigation-item label="Home" icon="home" href="#home" active></zds-navigation-item>
          <zds-navigation-item label="Inbox" icon="inbox" href="#inbox" badge="3"></zds-navigation-item>
          <zds-navigation-item label="Reports" icon="dashboard" href="#reports" disabled></zds-navigation-item>
          <zds-navigation-bar-spacer show-divider></zds-navigation-bar-spacer>
          <zds-navigation-item label="Profile" icon="user-circle" href="#profile"></zds-navigation-item>
          ${action}
        </zds-navigation-bar>
      </div>`)}
  </div>`,
};
