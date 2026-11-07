import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../src/components/bottom-sheet/bottom-sheet.js";
import "../src/components/button/button.js";
import "../src/components/grid-menu-item/grid-menu-item.js";
import "../src/components/menu-item/menu-item.js";

const actions = html`
  <zds-button slot="actions" flavour="outline" size="small" shape="rounded">Cancel</zds-button>
  <zds-button slot="actions" size="small" shape="rounded">Apply</zds-button>
`;
const screen = (c: unknown) => html`<div style="max-width:360px">${c}</div>`;
const rows = ["Share", "Edit", "Move", "Duplicate", "Archive", "Delete"];
const tiles = [
  { label: "Camera", icon: "camera" },
  { label: "Gallery", icon: "image" },
  { label: "Document", icon: "document" },
  { label: "Location", icon: "location" },
  { label: "Contacts", icon: "contacts" },
  { label: "Audio", icon: "microphone" },
] as const;

const meta: Meta = {
  title: "Components/Bottom Sheet",
  component: "zds-bottom-sheet",
  tags: ["autodocs"],
  argTypes: {
    contentType: { control: "inline-radio", options: ["list", "grid", "generic"] },
    headerAlignment: { control: "inline-radio", options: ["start", "center"] },
  },
  args: { contentType: "list", heading: "Sheet Title", showLeadingIcon: true, headerAlignment: "start" },
  render: (a) => screen(html`<zds-bottom-sheet content-type=${a.contentType} heading=${a.heading} .showLeadingIcon=${a.showLeadingIcon} header-alignment=${a.headerAlignment}>
    ${rows.map((r) => html`<zds-menu-item leading-icon="star">${r}</zds-menu-item>`)}
    ${actions}
  </zds-bottom-sheet>`),
};
export default meta;
type Story = StoryObj;

export const List: Story = {};

/** Three tiles to a row, each taking an equal share. */
export const Grid: Story = {
  render: () => screen(html`<zds-bottom-sheet content-type="grid" heading="Attach">
    ${tiles.map((t, i) => html`<zds-grid-menu-item label=${t.label} icon=${t.icon} ?active=${i === 0} ?show-badge=${i === 1} ?disabled=${i === 5}></zds-grid-menu-item>`)}
    ${actions}
  </zds-bottom-sheet>`),
};

/** Anything else. Spacing between items is the consumer's. */
export const Generic: Story = {
  render: () => screen(html`<zds-bottom-sheet content-type="generic">
    <p style="margin:0;color:var(--foreground-primary)">Any content the product supplies.</p>
    ${actions}
  </zds-bottom-sheet>`),
};

/** center centres the title and pins the icon to the leading edge. */
export const CenteredHeader: Story = {
  args: { headerAlignment: "center" },
};
