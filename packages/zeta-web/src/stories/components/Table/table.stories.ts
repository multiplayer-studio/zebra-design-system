import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import type { ZetaTable, ZetaTableAction, ZetaTableColumn, ZetaTableRow } from "../../../components/table/table.js";
import "../../../components/table/table.js";
import "../../../components/badges/status-label/status-label.js";
import "../../../components/button/button.js";
import "../../../components/button/icon-button/icon-button.js";

const columns: ZetaTableColumn[] = [
  { key: "name", header: "Name", sortable: true, width: 220 },
  { key: "status", header: "Status", sortable: true, filterable: true, width: 226 },
  { key: "team", header: "Team", sortable: true, filterable: true, width: 226 },
  { key: "action", header: "Action", width: 200 }
];

const first = ["Ada", "Ben", "Cy", "Dee", "Eli", "Fay", "Gus"];
const last = ["Lovelace", "Okafor", "Tran"];
const people = Array.from({ length: 21 }, (_, i) => `${first[i % 7]} ${last[i % 3]}`);
const teams = ["Operations", "Sales", "Finance", "Engineering", "Support"];
const statuses = ["Active", "Pending", "Active", "Inactive", "Active"];
const tones = { Active: "positive", Pending: "warning", Inactive: "neutral" } as const;
const rows: ZetaTableRow[] = people.map((name, i) => ({
  key: `r${i}`,
  cells: {
    name: {
      title: name,
      subtitle: teams[i % 5],
      avatar: {
        initials: name
          .split(" ")
          .map(p => p[0])
          .join("")
      }
    },
    status: statuses[i % 5],
    team: teams[i % 5]
  },
  selected: i === 1
}));

/** A compact menu of a few options on every row; Ben's row can't be deleted. */
const rowActions: ZetaTableAction[] = [
  { key: "view", label: "View", icon: "visibility" },
  { key: "edit", label: "Edit", icon: "edit" },
  { key: "share", label: "Share", icon: "share" },
  { key: "delete", label: "Delete", icon: "delete" }
];
rows[1].actions = rowActions.map(a => (a.key === "delete" ? { ...a, disabled: true } : a));

const meta: Meta<ZetaTable> = {
  title: "Components/Table",
  component: "zeta-table",
  args: {
    rounded: true,
    maxHeight: null,
    allowDisabledSelection: false,
    columnConfigure: true,
    resizable: true,
    clientSide: true,
    pageSize: 5,
    selectable: true,
    hasControl: true,
    hasFooter: true,
    showSearch: true,
    frozenColumns: 0
  },
  parameters: {
    design: { url: "https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6717-3146" },
    status: { type: "ready" }
  }
};
export default meta;

/** The Figma sample: a checkbox, avatar and text, a Status Label, text and an outline Button per row. `selectable`
 * draws the checkbox column and `rowActions` the trailing menu; `client-side` sorts, searches, filters (Status, Team) and
 * pages the 21 rows itself, 5, 10 or 20 per page; `resizable` lets every column be resized from its header edge; `column-configure` adds the settings panel to show, hide
 * and freeze columns; `disabled-rows` disables Dee's row, and `allowDisabledSelection` lets it be selected anyway;
 * resize a column narrow and hover cut-off text for its tooltip; the Status Label and Button are slotted. */
export const Table: StoryObj<ZetaTable> = {
  render: args => {
    const shape = args.rounded ? "rounded" : "sharp";
    return html`
      <zeta-table
        caption="Team members"
        .columns=${columns}
        .rows=${rows}
        .rounded=${args.rounded}
        .hasControl=${args.hasControl}
        .hasFooter=${args.hasFooter}
        .showSearch=${args.showSearch}
        .frozenColumns=${args.frozenColumns}
        .maxHeight=${args.maxHeight}
        .resizable=${args.resizable}
        .columnConfigure=${args.columnConfigure}
        .disabledRows=${["r3"]}
        .allowDisabledSelection=${args.allowDisabledSelection}
        .clientSide=${args.clientSide}
        .pageSize=${args.pageSize}
        .pageSizeOptions=${[5, 10, 20]}
        .selectable=${args.selectable}
        .rowActions=${rowActions}
        .onRowAction=${(key: string, row: ZetaTableRow) => console.log(`${key}: ${row.key}`)}
      >
        <zeta-icon-button slot="controls" size="small" flavor="outline-subtle" shape=${shape} aria-label="Refresh">refresh</zeta-icon-button>
        <zeta-icon-button slot="controls" size="small" flavor="outline-subtle" shape=${shape} aria-label="Download">download</zeta-icon-button>
        <zeta-icon-button slot="controls" size="small" flavor="outline-subtle" shape=${shape} aria-label="More">more_vertical</zeta-icon-button>
        ${rows.map(
          r => html`
            <zeta-status-label slot="cell-${r.key}-status" status=${tones[r.cells.status as keyof typeof tones]} .rounded=${args.rounded}
              >${r.cells.status as string}</zeta-status-label
            >
            <zeta-button slot="cell-${r.key}-action" size="small" flavor="outline" shape=${shape}>Button</zeta-button>
          `
        )}
      </zeta-table>
    `;
  }
};

/** `max-height` caps the content: 20 rows per page scroll under a sticky header, with the first column frozen, so the
 * header and the frozen corner hold whichever way the content scrolls. */
export const StickyHeader: StoryObj<ZetaTable> = {
  ...Table,
  args: { maxHeight: 360, pageSize: 20, frozenColumns: 1 }
};
