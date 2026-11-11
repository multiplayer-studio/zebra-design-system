import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../src/components/navigation-drawer/navigation-drawer.js";
import "../src/components/navigation-rail/navigation-header.js";
import "../src/components/navigation-rail/collapsible-menu-item.js";
import "../src/components/sub-menu-item/sub-menu-item.js";
import "../src/components/divider/divider.js";
import "../src/components/top-app-bar/top-app-bar.js";
import "../src/components/icon-button/icon-button.js";
import type { ZdsNavigationDrawer } from "../src/components/navigation-drawer/navigation-drawer.js";

type Args = { side: "start" | "end"; shape: "rounded" | "sharp"; showClose: boolean; dismissible: boolean; closeOnNavigate: boolean; actionLabel: string };

/** Rows are Sub Menu Items, groups Collapsible Menu Items (spec usage). */
const group = (label: string, icon: string, rows: string[]) => html`
  <zds-collapsible-menu-item label=${label} icon=${icon}>
    ${rows.map((r) => html`<zds-sub-menu-item label=${r} href="#${r.toLowerCase()}"></zds-sub-menu-item>`)}
  </zds-collapsible-menu-item>`;
const content = html`
  <zds-navigation-header slot="header" type="logo" heading="Workcloud"></zds-navigation-header>
  <zds-sub-menu-item label="Home" icon="home" href="#home" selected></zds-sub-menu-item>
  <zds-sub-menu-item label="Inbox" icon="inbox" href="#inbox" badge="3" badge-label="3 unread"></zds-sub-menu-item>
  <zds-sub-menu-item label="Schedule" icon="calendar" href="#schedule"></zds-sub-menu-item>
  ${group("Documents", "folder", ["Recent", "Shared with me"])}
  <zds-divider></zds-divider>
  ${group("Reports", "chart-bar", ["Daily", "Weekly", "Monthly"])}
  ${group("Team", "group", ["Members", "Roles"])}
  <zds-sub-menu-item slot="footer" label="Settings" icon="settings" href="#settings"></zds-sub-menu-item>
  <zds-sub-menu-item slot="footer" label="Help" icon="help" href="#help"></zds-sub-menu-item>`;

const openDrawer = (e: Event) => {
  const d = (e.currentTarget as HTMLElement).parentElement?.querySelector<ZdsNavigationDrawer>("zds-navigation-drawer");
  if (d) d.open = true;
};

const modal = (a: Args) => html`
  <div style="max-inline-size:400px;block-size:560px;border:var(--stroke-thin) solid var(--border-default);background:var(--surface-page);color:var(--foreground-primary)">
    <zds-top-app-bar type="default" page-title="Home" @zds-leading-click=${openDrawer}></zds-top-app-bar>
    <p style="padding:var(--space-md);margin:0;font:var(--text-body-medium)">Press the menu button to open the drawer. Choosing a destination closes it.</p>
    <zds-navigation-drawer side=${a.side} shape=${a.shape} .showClose=${a.showClose} .dismissible=${a.dismissible}
      .closeOnNavigate=${a.closeOnNavigate} action-label=${a.actionLabel || ""}>${content}</zds-navigation-drawer>
  </div>`;

const meta: Meta<Args> = {
  title: "Components/Navigation Drawer",
  component: "zds-navigation-drawer",
  argTypes: {
    side: { control: "inline-radio", options: ["start", "end"] },
    shape: { control: "inline-radio", options: ["rounded", "sharp"] },
  },
  args: { side: "start", shape: "rounded", showClose: true, dismissible: true, closeOnNavigate: true, actionLabel: "" },
};
export default meta;
type Story = StoryObj<Args>;

export const Modal: Story = { render: (a) => modal(a) };
export const WithAction: Story = { name: "With action", args: { actionLabel: "New task" }, render: (a) => modal(a) };
export const EndSide: Story = { name: "From the end edge", args: { side: "end" }, render: (a) => modal(a) };
export const Sharp: Story = { args: { shape: "sharp" }, render: (a) => modal(a) };

export const Standard: Story = {
  name: "Standard (in the layout)",
  render: (a) => html`
    <div style="display:flex;min-block-size:560px;border:var(--stroke-thin) solid var(--border-default);background:var(--surface-page);color:var(--foreground-primary)">
      <zds-navigation-drawer id="std" .modal=${false} shape=${a.shape} .showClose=${false}>${content}</zds-navigation-drawer>
      <div style="flex:1;min-inline-size:0;padding:var(--space-md)">
        <zds-icon-button flavour="subtle" size="medium" icon="hamburger-menu" label="Toggle navigation"
          @click=${(e: Event) => { const d = (e.currentTarget as HTMLElement).closest("div")!.parentElement!.querySelector<ZdsNavigationDrawer>("#std")!; d.open = !d.open; }}></zds-icon-button>
      </div>
    </div>`,
};

export const Dark: Story = { render: (a) => html`<div class="mode-dark" style="padding:var(--space-md);background:var(--surface-page)">${modal(a)}</div>` };
