import type { Meta, StoryObj } from "@storybook/web-components";
import { html, type TemplateResult } from "lit";
import { ZetaIconNameList } from "@zebra-fed/zeta-icons";
import { action } from "@storybook/addon-actions";
import { ZetaBottomSheet } from "../../../components/bottom-sheets/bottom-sheet";
import "../../../components/button/button";
import "../../../components/dropdown/menu-item/dropdown-menu-item";
import "../../../components/grid-menu-item/grid-menu-item";
import "../../../components/icon/icon";

const meta: Meta<ZetaBottomSheet> = {
  component: "zeta-bottom-sheet",
  title: "Components/Bottom Sheet",
  args: {
    headerText: "Attach",
    headerIcon: "arrow_back",
    leadingLabel: "Back",
    headerAlignment: "start",
    isExpanded: true
  },
  argTypes: {
    headerText: { control: { type: "text" } },
    headerIcon: { options: ZetaIconNameList, control: { type: "select" } },
    leadingLabel: { control: { type: "text" } },
    headerAlignment: {
      options: ["start", "center"],
      control: { type: "inline-radio" }
    },
    contentType: {
      options: [undefined, "list", "grid", "generic"],
      control: { type: "select" }
    },
    isGrid: { table: { disable: true } },
    isGenericContent: { table: { disable: true } }
  },
  parameters: {
    design: {
      url: "https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5207-3343"
    },
    status: {
      type: "ready"
    }
  }
};

export default meta;

const rows = [
  { label: "Share", icon: "share" },
  { label: "Edit", icon: "edit" },
  { label: "Copy link", icon: "link" },
  { label: "Download", icon: "download" },
  { label: "Add to favourites", icon: "star" },
  { label: "Delete", icon: "delete" }
];

const tiles = [
  { label: "Camera", icon: "camera" },
  { label: "Gallery", icon: "image" },
  { label: "Document", icon: "document" },
  { label: "Location", icon: "location" },
  { label: "Contacts", icon: "contacts" },
  { label: "Audio", icon: "microphone" }
];

const sheet = (args: ZetaBottomSheet, content: TemplateResult) =>
  html`<div style="max-width:360px">
    <zeta-bottom-sheet
      .headerText=${args.headerText}
      .headerIcon=${args.headerIcon}
      .leadingLabel=${args.leadingLabel}
      .headerAlignment=${args.headerAlignment}
      .contentType=${args.contentType}
      .isExpanded=${args.isExpanded}
      @leading-click=${action("leading-click")}
    >
      ${content}
      <zeta-button slot="actions" flavor="outline" size="small">Cancel</zeta-button>
      <zeta-button slot="actions" size="small">Apply</zeta-button>
    </zeta-bottom-sheet>
  </div>`;

/** A run of labelled actions a person reads down. */
export const BottomSheetList: StoryObj<ZetaBottomSheet> = {
  args: { headerText: "Options" },
  render: args =>
    sheet(
      args,
      html`${rows.map(row => html`<zeta-dropdown-menu-item .rounded=${false}><zeta-icon slot="icon">${row.icon}</zeta-icon>${row.label}</zeta-dropdown-menu-item>`)}`
    )
};

/** Options recognised by their icon, three to a row. */
export const BottomSheetGrid: StoryObj<ZetaBottomSheet> = {
  render: args =>
    sheet(
      args,
      html`${tiles.map(
        (tile, index) =>
          html`<zeta-grid-menu-item ?active=${index === 0} .notificationValue=${index === 1} ?disabled=${index === 5}>
            <zeta-icon slot="icon">${tile.icon}</zeta-icon>${tile.label}
          </zeta-grid-menu-item>`
      )}`
    )
};

/** Anything else. Spacing between items is the consumer's. */
export const BottomSheetGenericContent: StoryObj<ZetaBottomSheet> = {
  args: { headerText: "Share location" },
  render: args =>
    sheet(
      args,
      html`<p style="margin:0;font:var(--text-body-medium);color:var(--foreground-primary)">Share your live location with this conversation for one hour.</p>`
    )
};

/** modal: the sheet presents itself over a zeta-scrim, rising from the bottom edge. Escape or a scrim click closes it. */
export const BottomSheetModal: StoryObj<ZetaBottomSheet> = {
  args: { headerText: "Options" },
  render: args => {
    const find = (e: Event) => (e.currentTarget as HTMLElement).closest("[data-sheet-demo]")!.querySelector("zeta-bottom-sheet")!;
    return html`<div data-sheet-demo>
      <zeta-button @click=${(e: Event) => find(e).show()}>Open sheet</zeta-button>
      <zeta-bottom-sheet modal open headerText=${args.headerText}>
        ${rows.map(row => html`<zeta-dropdown-menu-item .rounded=${false}><zeta-icon slot="icon">${row.icon}</zeta-icon>${row.label}</zeta-dropdown-menu-item>`)}
        <zeta-button slot="actions" flavor="outline" size="small" @click=${(e: Event) => find(e).hide()}>Cancel</zeta-button>
        <zeta-button slot="actions" size="small" @click=${(e: Event) => find(e).hide()}>Apply</zeta-button>
      </zeta-bottom-sheet>
    </div>`;
  }
};
