import type { Meta, StoryObj } from "@storybook/web-components";
import { html, render } from "lit";
import "../src/components/table/table.js";
import "../src/components/icon-button/icon-button.js";
import type { TableColumn, TableRow, TableSort, ZdsTable } from "../src/components/table/table.js";

// ---- sample data -----------------------------------------------------------

const PEOPLE_COLUMNS: TableColumn[] = [
  { key: "name", header: "Name", width: 260, sortable: true },
  { key: "role", header: "Role", width: 200, sortable: true, filterable: true },
  { key: "team", header: "Team", width: 160, filterable: true },
  { key: "location", header: "Location", width: 160 },
  { key: "lastActive", header: "Last active", width: 140, sortable: true },
];

const PEOPLE_ROWS: TableRow[] = [
  { key: "p1", cells: { name: { title: "Amara Okafor", subtitle: "amara.okafor@example.com", avatar: { initials: "AO" } }, role: "Store Manager", team: "Retail Ops", location: "Lagos", lastActive: "2 min ago" } },
  { key: "p2", cells: { name: { title: "Ben Hartley", subtitle: "ben.hartley@example.com", avatar: { src: "https://i.pravatar.cc/80?img=12" } }, role: "Warehouse Associate", team: "Fulfilment", location: "Leeds", lastActive: "1 hr ago" } },
  { key: "p3", cells: { name: { title: "Chen Wei", subtitle: "chen.wei@example.com", avatar: { initials: "CW" } }, role: "Field Technician", team: "Service", location: "Shenzhen", lastActive: "Yesterday" } },
  { key: "p4", cells: { name: { title: "Dolores Ruiz", subtitle: "dolores.ruiz@example.com", avatar: { src: "https://i.pravatar.cc/80?img=47" } }, role: "Shift Supervisor", team: "Fulfilment", location: "Madrid", lastActive: "3 days ago" } },
  { key: "p5", cells: { name: { title: "Emeka Nwosu", subtitle: "emeka.nwosu@example.com", avatar: { initials: "EN" } }, role: "Inventory Analyst", team: "Retail Ops", location: "Abuja", lastActive: "Last week" } },
];

const ORDER_COLUMNS: TableColumn[] = [
  { key: "order", header: "Order", width: 140, sortable: true },
  { key: "customer", header: "Customer", width: 200, sortable: true },
  { key: "items", header: "Items", width: 100, sortable: true },
  { key: "total", header: "Total", width: 120, sortable: true },
  { key: "status", header: "Status", width: 140 },
];

const ORDER_ROWS: TableRow[] = [
  { key: "o1", cells: { order: "#10482", customer: "Northwind Grocers", items: "12", total: "$1,284.00", status: "Shipped" } },
  { key: "o2", cells: { order: "#10483", customer: "Bluebell Pharmacy", items: "3", total: "$96.50", status: "Packing" } },
  { key: "o3", cells: { order: "#10484", customer: "Atlas Hardware", items: "27", total: "$4,310.75", status: "Delivered" } },
  { key: "o4", cells: { order: "#10485", customer: "Cedar Street Books", items: "8", total: "$212.40", status: "Awaiting payment" } },
  { key: "o5", cells: { order: "#10486", customer: "Harbour Fresh Market", items: "19", total: "$2,045.10", status: "Shipped" } },
];

const DEVICE_COLUMNS: TableColumn[] = [
  { key: "serial", header: "Serial", width: 160, sortable: true },
  { key: "model", header: "Model", width: 160 },
  { key: "assignee", header: "Assigned to", width: 220 },
  { key: "site", header: "Site", width: 180, filterable: true },
  { key: "battery", header: "Battery", width: 120, sortable: true },
  { key: "os", header: "OS version", width: 140 },
  { key: "lastSync", header: "Last sync", width: 160, sortable: true },
  { key: "warranty", header: "Warranty ends", width: 160 },
];

const DEVICE_ROWS: TableRow[] = [
  { key: "d1", cells: { serial: "TC58-21044", model: "TC58 Mobile", assignee: { title: "Amara Okafor", subtitle: "Retail Ops", avatar: { initials: "AO" } }, site: "Lagos Ikeja", battery: "86%", os: "Android 14", lastSync: "09:42 today", warranty: "Mar 2027" } },
  { key: "d2", cells: { serial: "ZQ620-8817", model: "ZQ620 Printer", assignee: { title: "Ben Hartley", subtitle: "Fulfilment", avatar: { initials: "BH" } }, site: "Leeds DC", battery: "41%", os: "Link-OS 7", lastSync: "08:15 today", warranty: "Nov 2026" } },
  { key: "d3", cells: { serial: "MC93-5521", model: "MC9300 Scanner", assignee: { title: "Chen Wei", subtitle: "Service", avatar: { initials: "CW" } }, site: "Shenzhen Hub", battery: "12%", os: "Android 13", lastSync: "Yesterday", warranty: "Jan 2028" } },
  { key: "d4", cells: { serial: "ET45-0093", model: "ET45 Tablet", assignee: { title: "Dolores Ruiz", subtitle: "Fulfilment", avatar: { initials: "DR" } }, site: "Madrid Norte", battery: "100%", os: "Android 14", lastSync: "10:03 today", warranty: "Jun 2027" }, disabled: true },
  { key: "d5", cells: { serial: "TC22-7730", model: "TC22 Mobile", assignee: { title: "Emeka Nwosu", subtitle: "Retail Ops", avatar: { initials: "EN" } }, site: "Abuja Central", battery: "64%", os: "Android 14", lastSync: "2 days ago", warranty: "Sep 2027" } },
];

const controls = html`
  <zds-icon-button slot="controls" flavour="outline-subtle" icon="refresh" label="Refresh"></zds-icon-button>
  <zds-icon-button slot="controls" flavour="outline-subtle" icon="download" label="Export"></zds-icon-button>
  <zds-icon-button slot="controls" flavour="outline-subtle" icon="more-vertical" label="More actions"></zds-icon-button>
`;

// Slotted controls match the table's shape themselves (the table reflects
// it); the built-in pagination follows it on its own.
const shaped = (shape: "rounded" | "sharp") => html`
  <zds-icon-button slot="controls" flavour="outline-subtle" shape=${shape} icon="refresh" label="Refresh"></zds-icon-button>
  <zds-icon-button slot="controls" flavour="outline-subtle" shape=${shape} icon="download" label="Export"></zds-icon-button>
`;

// The footer's pagination is built in, driven by page / pageCount. The table
// and its pager already follow a click; this listener is the consumer's side:
// it keeps `page` and the summary in step (a real one would fetch the page).
const details = (page: number, perPage: number, total: number) =>
  `Showing ${(page - 1) * perPage + 1}-${Math.min(page * perPage, total)} of ${total}`;
const onPage = (perPage: number, total: number) => (e: CustomEvent<{ page: number }>) => {
  const t = e.currentTarget as ZdsTable;
  t.page = e.detail.page;
  t.pageDetails = details(e.detail.page, perPage, total);
};

// ---- meta ------------------------------------------------------------------

const meta: Meta = {
  title: "Components/Table",
  component: "zds-table",
  tags: ["autodocs"],
  argTypes: {
    hasControl: { control: "boolean" },
    hasFooter: { control: "boolean" },
    showSearch: { control: "boolean" },
    searchPlaceholder: { control: "text" },
    pageDetails: { control: "text" },
    frozenColumns: { control: { type: "range", min: 0, max: 3 } },
    page: { control: { type: "number", min: 1 } },
    pageCount: { control: { type: "number", min: 0 } },
    shape: { control: "inline-radio", options: ["rounded", "sharp"] },
  },
  args: { hasControl: true, hasFooter: true, showSearch: true, searchPlaceholder: "Search people", pageDetails: "Showing 1-5 of 21", frozenColumns: 0, page: 1, pageCount: 5, shape: "rounded" },
  render: (a) => html`<zds-table
    .columns=${PEOPLE_COLUMNS}
    .rows=${PEOPLE_ROWS}
    .hasControl=${a.hasControl}
    .hasFooter=${a.hasFooter}
    .showSearch=${a.showSearch}
    search-placeholder=${a.searchPlaceholder}
    page-details=${a.pageDetails}
    frozen-columns=${a.frozenColumns}
    shape=${a.shape}
    .page=${a.page}
    .pageCount=${a.pageCount}
    caption="Team members"
    @zds-page-change=${onPage(5, 21)}
    >${shaped(a.shape)}</zds-table
  >`,
};
export default meta;
type Story = StoryObj;

const col = (c: unknown) => html`<div style="display:grid;gap:32px">${c}</div>`;
const note = (t: string) => html`<p style="margin:0 0 8px;font:var(--body-small-font-size)/1.4 var(--body-small-font-family);color:var(--foreground-secondary)">${t}</p>`;

export const Playground: Story = {};

/** rounded rounds the table's corners, its Search and its built-in pagination (outline, rounded); sharp keeps all three square. Slotted controls match it themselves. */
export const Shape: Story = {
  render: () => col((["rounded", "sharp"] as const).map((shape) => html`<div>
    ${note(`shape=${shape}`)}
    <zds-table .columns=${ORDER_COLUMNS} .rows=${ORDER_ROWS.slice(0, 3)} shape=${shape} page-details="Showing 1-3 of 21" page-count="7" caption="Orders" @zds-page-change=${onPage(3, 21)}>
      ${shaped(shape)}
    </zds-table>
  </div>`)),
};

/** The spec's two properties: each bar toggles whole, independently of the other. */
export const WithoutControlsOrFooter: Story = {
  render: () => col(
    ([[true, true], [false, true], [true, false], [false, false]] as const).map(([c, f]) => html`<div>
      ${note(`hasControl=${c} · hasFooter=${f}`)}
      <zds-table .columns=${ORDER_COLUMNS} .rows=${ORDER_ROWS.slice(0, 3)} .hasControl=${c} .hasFooter=${f} page-details="Showing 1-3 of 21" page-count="7" caption="Orders" @zds-page-change=${onPage(3, 21)}>
        ${controls}
      </zds-table>
    </div>`),
  ),
};

/** Sortable headers cycle none → ascending → descending. The table only reports the sort; the story reorders the rows. */
export const Sorting: Story = {
  render: () => {
    const host = document.createElement("div");
    const sortRows = (sort: TableSort | null) => {
      if (!sort) return ORDER_ROWS;
      const num = (v: string) => Number(v.replace(/[^0-9.]/g, ""));
      const k = sort.key;
      return [...ORDER_ROWS].sort((a, b) => {
        const x = a.cells[k] as string, y = b.cells[k] as string;
        const r = k === "items" || k === "total" ? num(x) - num(y) : x.localeCompare(y);
        return sort.direction === "ascending" ? r : -r;
      });
    };
    const initial: TableSort = { key: "total", direction: "descending" };
    render(html`<zds-table
      .columns=${ORDER_COLUMNS}
      .rows=${sortRows(initial)}
      .sort=${initial}
      page-details="Showing 1-5 of 5"
      caption="Orders"
      @zds-sort-change=${(e: CustomEvent<{ sort: TableSort | null }>) => {
        (e.currentTarget as ZdsTable).rows = sortRows(e.detail.sort);
      }}
    ></zds-table>`, host);
    return host;
  },
};

/** Filterable headers show their filter glyph on hover and keyboard focus; the glyph is always in the accessibility tree. */
export const Filterable: Story = {
  render: () => html`${note("Hover or Tab to a header: Role and Team carry a filter control (fires zds-filter).")}
    <zds-table
      .columns=${PEOPLE_COLUMNS}
      .rows=${PEOPLE_ROWS}
      page-details="Showing 1-5 of 21"
      caption="Team members"
      @zds-filter=${(e: CustomEvent<{ key: string }>) => console.log("zds-filter", e.detail.key)}
    >${controls}</zds-table>`,
};

/** Selected and disabled rows. Hover a row for the hover fill; disabled rows take no fill, dim their content and don't fire zds-row-click. */
export const RowStates: Story = {
  render: () => {
    const rows: TableRow[] = PEOPLE_ROWS.map((r, i) => ({ ...r, selected: i === 1, disabled: i === 3 }));
    return html`${note("Row 2 selected, row 4 disabled. Rows are clickable (a zds-row-click listener is attached): hover for the hover fill.")}
      <zds-table
        .columns=${PEOPLE_COLUMNS}
        .rows=${rows}
        .hasControl=${false}
        page-details="Showing 1-5 of 21"
        caption="Team members"
        @zds-row-click=${(e: CustomEvent<{ row: TableRow }>) => console.log("zds-row-click", e.detail.row.key)}
      ></zds-table>`;
  },
};

/** Object cell values render the spec's _Avatar and text cell: photo or initials, title, optional subtitle. One cell replaced through its named slot. */
export const AvatarCells: Story = {
  render: () => html`<zds-table .columns=${PEOPLE_COLUMNS.slice(0, 3)} .rows=${PEOPLE_ROWS} .hasFooter=${false} .showSearch=${false} caption="Team members">
    ${controls}
    <span slot="cell-p3-team" style="color:var(--foreground-link)">Service (slotted)</span>
  </zds-table>`,
};

/** Two frozen columns in a narrow container. Scroll sideways: the frozen columns stay and cast a horizontal shadow. */
export const FrozenColumns: Story = {
  render: () => html`<div style="max-width:640px">
    <zds-table .columns=${DEVICE_COLUMNS} .rows=${DEVICE_ROWS} frozen-columns="2" page-details="Showing 1-5 of 148" page-count="30" caption="Devices" @zds-page-change=${onPage(5, 148)}>
      ${controls}
    </zds-table>
  </div>`,
};

/** The same table under each theme scope; every cell, bar and glyph follows. */
export const ThemingCascade: Story = {
  render: () => html`<div style="display:grid;gap:16px">
    ${["", "mode-dark", "ext-companion", "ext-companion mode-dark"].map(
      (cls) => html`<div class=${cls} style="padding:16px;background:var(--surface-page);color:var(--foreground-primary)">
        ${note(cls || "base (light)")}
        <zds-table
          .columns=${PEOPLE_COLUMNS.slice(0, 4)}
          .rows=${PEOPLE_ROWS.slice(0, 3).map((r, i) => ({ ...r, selected: i === 1, disabled: i === 2 }))}
          .sort=${{ key: "name", direction: "ascending" }}
          page-details="Showing 4-6 of 21"
          page="2"
          page-count="7"
          caption="Team members"
          @zds-page-change=${onPage(3, 21)}
        >${controls}</zds-table>
      </div>`,
    )}
  </div>`,
};
