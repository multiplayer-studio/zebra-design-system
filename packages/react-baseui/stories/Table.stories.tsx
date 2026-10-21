import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Table, IconButton, useTableShape, type TableColumn, type TableRow, type TableSort } from "../src/index.js";

const COLUMNS: TableColumn[] = [
  { key: "name", header: "Name", width: 240, sortable: true },
  { key: "role", header: "Role", sortable: true, filterable: true },
  { key: "site", header: "Site", filterable: true },
  { key: "device", header: "Device" },
  { key: "lastSeen", header: "Last seen", sortable: true },
];

const PEOPLE: TableRow[] = [
  { key: "1", cells: { name: { title: "Amara Okafor", subtitle: "amara.okafor@example.com", avatar: { initials: "AO" } }, role: "Store manager", site: "Leeds", device: "TC58", lastSeen: "2 min ago" } },
  { key: "2", cells: { name: { title: "Jonas Weber", subtitle: "jonas.weber@example.com", avatar: { initials: "JW" } }, role: "Picker", site: "Leeds", device: "TC22", lastSeen: "14 min ago" } },
  { key: "3", cells: { name: { title: "Priya Raman", subtitle: "priya.raman@example.com", avatar: { initials: "PR" } }, role: "Shift lead", site: "Manchester", device: "MC9400", lastSeen: "1 h ago" } },
  { key: "4", cells: { name: { title: "Tomás García", subtitle: "tomas.garcia@example.com", avatar: { initials: "TG" } }, role: "Picker", site: "Manchester", device: "TC22", lastSeen: "Yesterday" } },
  { key: "5", cells: { name: { title: "Mei Lin", subtitle: "mei.lin@example.com", avatar: { initials: "ML" } }, role: "Driver", site: "Bristol", device: "ET40", lastSeen: "3 days ago" } },
];

// Slotted content matches the table's shape through useTableShape().
const useShape = () => (useTableShape() === "rounded" ? "rounded" : "sharp");
const Controls = () => {
  const shape = useShape();
  return (
  <>
    <IconButton flavour="outline-subtle" size="small" shape={shape} icon="filter" label="Filters" />
    <IconButton flavour="outline-subtle" size="small" shape={shape} icon="download" label="Export" />
    <IconButton flavour="outline-subtle" size="small" shape={shape} icon="more-vertical" label="More" />
  </>
  );
};

const meta: Meta<typeof Table> = {
  title: "Components/Table",
  component: Table,
  tags: ["autodocs"],
  parameters: { docs: { description: { component: "A data table framed by an optional controls bar and a pagination footer. Semantic, row-major `<table>`; sorting, filtering, selected and disabled rows, avatar cells and frozen columns. The footer's Pagination follows the table's shape; pass `pagination` to replace it." } } },
  argTypes: { shape: { control: "inline-radio", options: ["rounded", "sharp"] } },
  args: { columns: COLUMNS, rows: PEOPLE, shape: "rounded", pageCount: 5, hasControl: true, hasFooter: true, showSearch: true, pageDetails: "Showing 1-5 of 21", caption: "Team members" },
  render: function Render(a) {
    const [page, setPage] = React.useState(1);
    return <Table {...a} page={page} onPageChange={setPage} controls={<Controls />} />;
  },
};
export default meta;
type Story = StoryObj<typeof Table>;

export const Playground: Story = {};

/** rounded rounds the table's corners and its Search; slotted controls and pagination match through useTableShape(). */
export const Shape: Story = {
  render: (a) => (
    <div style={{ display: "grid", gap: 32 }}>
      {(["rounded", "sharp"] as const).map((shape) => (
        <div key={shape} style={{ display: "grid", gap: 8 }}>
          <span style={{ font: "500 12px/1.4 system-ui", opacity: 0.7 }}>shape={shape}</span>
          <Table {...a} rows={PEOPLE.slice(0, 3)} shape={shape} controls={<Controls />} />
        </div>
      ))}
    </div>
  ),
};

/** The spec's two props: each bar removes on its own. */
export const ControlsAndFooter: Story = {
  render: (a) => (
    <div style={{ display: "grid", gap: 32 }}>
      {([[true, true], [false, true], [true, false], [false, false]] as const).map(([c, f]) => (
        <div key={`${c}${f}`} style={{ display: "grid", gap: 8 }}>
          <span style={{ font: "500 12px/1.4 system-ui", opacity: 0.7 }}>hasControl={String(c)} · hasFooter={String(f)}</span>
          <Table {...a} rows={PEOPLE.slice(0, 2)} hasControl={c} hasFooter={f} controls={<Controls />} />
        </div>
      ))}
    </div>
  ),
};

/** Click a sortable header: none → ascending → descending → none. */
export const Sorting: Story = {
  render: function Render(a) {
    const [sort, setSort] = React.useState<TableSort | null>({ key: "name", direction: "ascending" });
    const text = (r: TableRow, k: string) => { const v = r.cells[k]; return typeof v === "string" ? v : v.title; };
    const rows = sort ? [...PEOPLE].sort((x, y) => text(x, sort.key).localeCompare(text(y, sort.key)) * (sort.direction === "ascending" ? 1 : -1)) : PEOPLE;
    return <Table {...a} rows={rows} sort={sort} onSortChange={setSort} hasControl={false} hasFooter={false} />;
  },
};

/** Filter controls appear on header hover and keyboard focus. */
export const Filterable: Story = {
  render: function Render(a) {
    const [last, setLast] = React.useState<string | null>(null);
    return (
      <div style={{ display: "grid", gap: 8 }}>
        <Table {...a} hasFooter={false} hasControl={false} onFilter={setLast} />
        <span style={{ font: "12px system-ui" }}>Last filter: {last ?? "—"}</span>
      </div>
    );
  },
};

/** Selected and disabled rows. Hover a row to see the hover fill. Disabled content dims (Figma doesn't). */
export const RowStates: Story = {
  args: {
    rows: PEOPLE.map((r, i) => ({ ...r, selected: i === 1, disabled: i === 3 })),
    hasControl: false, hasFooter: false,
  },
  render: (a) => <Table {...a} onRowClick={() => {}} />,
};

/** Text cells and avatar-and-text cells, with and without subtitle. */
export const CellContent: Story = {
  args: {
    columns: [{ key: "a", header: "Avatar + title + subtitle" }, { key: "b", header: "Avatar + title" }, { key: "c", header: "Text" }],
    rows: [
      { key: "1", cells: { a: { title: "Amara Okafor", subtitle: "Store manager", avatar: { initials: "AO" } }, b: { title: "Leeds", avatar: { initials: "L" } }, c: "TC58" } },
      { key: "2", cells: { a: { title: "Jonas Weber", subtitle: "Picker", avatar: { initials: "JW" } }, b: { title: "Bristol", avatar: { initials: "B" } }, c: "TC22" } },
    ],
    hasControl: false, hasFooter: false,
  },
};

/** The first two columns stay put; scroll sideways to see the frozen edge's shadow. */
export const FrozenColumns: Story = {
  args: {
    frozenColumns: 2,
    columns: [
      { key: "name", header: "Name", width: 240, sortable: true },
      { key: "role", header: "Role", width: 160 },
      ...["site", "device", "lastSeen"].map((k) => ({ key: k, header: k === "lastSeen" ? "Last seen" : k[0].toUpperCase() + k.slice(1), width: 220 })),
      { key: "serial", header: "Serial", width: 220 },
      { key: "battery", header: "Battery", width: 160 },
    ],
    rows: PEOPLE.map((r, i) => ({ ...r, cells: { ...r.cells, serial: `S2${4000 + i * 137}`, battery: `${92 - i * 11}%` } })),
  },
  render: (a) => <div style={{ maxInlineSize: 640 }}><Table {...a} controls={<Controls />} /></div>,
};

export const ThemingCascade: Story = {
  render: (a) => (
    <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit, minmax(560px, 1fr))" }}>
      {["", "mode-dark", "ext-companion", "ext-companion mode-dark"].map((cls) => (
        <div key={cls} className={cls} style={{ padding: 16, background: "var(--surface-page)", color: "var(--foreground-primary)", display: "grid", gap: 8 }}>
          <div style={{ font: "500 12px/1.4 system-ui", opacity: 0.7 }}>{cls || "base / light"}</div>
          <Table {...a} rows={PEOPLE.slice(0, 3).map((r, i) => ({ ...r, selected: i === 1 }))} sort={{ key: "name", direction: "ascending" }}
            controls={<Controls />} />
        </div>
      ))}
    </div>
  ),
};
