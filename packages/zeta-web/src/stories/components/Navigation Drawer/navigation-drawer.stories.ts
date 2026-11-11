import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { ZetaNavigationDrawer } from "../../../components/navigation-drawer/navigation-drawer.js";
import "../../../components/navigation-rail/navigation-header.js";
import "../../../components/navigation-rail/sub-menu-item.js";
import "../../../components/navigation-rail/collapsible-menu-item.js";
import "../../../components/divider/divider.js";
import "../../../components/icon/icon.js";
import "../../../components/avatar/avatar.js";
import "../../../components/button/button.js";

/** Rows are Sub Menu Items and groups Collapsible Menu Items (spec usage). */
const group = (heading: string, icon: string, rows: string[]) =>
  html`<zeta-collapsible-menu-item>
    <zeta-icon slot="icon">${icon}</zeta-icon><span slot="heading">${heading}</span>
    ${rows.map(r => html`<zeta-sub-menu-item href="#${r.toLowerCase()}">${r}</zeta-sub-menu-item>`)}
  </zeta-collapsible-menu-item>`;
const row = (label: string, icon: string, extra = {} as { selected?: boolean; badge?: number; slot?: string }) =>
  html`<zeta-sub-menu-item
    href="#${label.toLowerCase()}"
    slot=${extra.slot ?? ""}
    ?selected=${!!extra.selected}
    ?show-badge=${!!extra.badge}
    badge-value=${extra.badge ?? 1}
    ><zeta-icon slot="icon">${icon}</zeta-icon>${label}</zeta-sub-menu-item
  >`;
const content = html`
  <zeta-navigation-header slot="header" headline="Workcloud"
    ><zeta-avatar slot="mark" size="s">WC</zeta-avatar></zeta-navigation-header
  >
  ${row("Home", "home", { selected: true })} ${row("Inbox", "inbox", { badge: 3 })} ${row("Schedule", "calendar")}
  ${group("Documents", "folder", ["Recent", "Shared with me"])}
  <zeta-divider></zeta-divider>
  ${group("Reports", "chart_bar", ["Daily", "Weekly", "Monthly"])} ${group("Team", "group", ["Members", "Roles"])}
  ${row("Settings", "settings", { slot: "footer" })} ${row("Help", "help", { slot: "footer" })}
`;

const meta: Meta<ZetaNavigationDrawer> = {
  component: "zeta-navigation-drawer",
  title: "Components/Navigation Drawer",
  args: {
    anchor: "left",
    rounded: true,
    showClose: true,
    dismissible: true,
    closeOnNavigate: true,
    showAnimation: true,
    actionLabel: ""
  },
  argTypes: {
    anchor: { options: ["left", "right"], control: { type: "inline-radio" } },
    open: { table: { disable: true } },
    initialOpen: { table: { disable: true } },
    returnValue: { table: { disable: true } },
    closeOnBarrierClicked: { table: { disable: true } }
  },
  parameters: {
    design: { url: "https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=8255-1584" },
    status: { type: "ready" }
  }
};

export default meta;

const modal = (args: ZetaNavigationDrawer) =>
  html`<div style="min-height: 560px">
    <zeta-button
      @click=${(e: Event) => void ((e.currentTarget as HTMLElement).nextElementSibling as ZetaNavigationDrawer).show()}
      >Open drawer</zeta-button
    >
    <zeta-navigation-drawer
      anchor=${args.anchor}
      .rounded=${args.rounded}
      .showClose=${args.showClose}
      .dismissible=${args.dismissible}
      .closeOnNavigate=${args.closeOnNavigate}
      ?showAnimation=${args.showAnimation}
      .actionLabel=${args.actionLabel || undefined}
      >${content}</zeta-navigation-drawer
    >
  </div>`;

export const NavigationDrawer: StoryObj<ZetaNavigationDrawer> = { render: args => modal(args) };

export const WithAction: StoryObj<ZetaNavigationDrawer> = {
  args: { actionLabel: "New task" },
  render: args => modal(args)
};

export const Right: StoryObj<ZetaNavigationDrawer> = { args: { anchor: "right" }, render: args => modal(args) };

export const Standard: StoryObj<ZetaNavigationDrawer> = {
  render: args =>
    html`<div style="display: flex; min-height: 560px; background: var(--surface-page)">
      <zeta-navigation-drawer .modal=${false} .rounded=${args.rounded} .showClose=${false}
        >${content}</zeta-navigation-drawer
      >
      <div style="flex: 1; padding: var(--space-md)">
        <zeta-button
          flavor="subtle"
          @click=${(e: Event) => {
            const d = (e.currentTarget as HTMLElement).closest("div")!.previousElementSibling as ZetaNavigationDrawer;
            void (d.open ? d.hide() : d.show());
          }}
          >Toggle navigation</zeta-button
        >
      </div>
    </div>`
};
