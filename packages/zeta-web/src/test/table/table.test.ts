import { fixture, html, expect, elementUpdated, oneEvent } from "@open-wc/testing";
import type { ZetaTable, ZetaTableAction, ZetaTableColumn, ZetaTableRow } from "../../components/table/table.js";
import "../../components/table/table.js";
import { sendMouse, resetMouse } from "@web/test-runner-commands";
import "../../components/checkbox/checkbox.js";
import "../../components/button/button.js";
import "../../index.css";
import { getCssVarColorValue } from "../utils.js";

const v = (el: Element, name: string) => getComputedStyle(el).getPropertyValue(name).trim();
const all = (el: ZetaTable, selector: string) => Array.from(el.shadowRoot!.querySelectorAll<HTMLElement>(selector));
const one = (el: ZetaTable, selector: string) => el.shadowRoot!.querySelector<HTMLElement>(selector)!;

const columns: ZetaTableColumn[] = [
  { key: "pick", header: "Select" },
  { key: "name", header: "Name", sortable: true, filterable: true, width: 200 },
  { key: "role", header: "Role", sortable: true }
];
const rows: ZetaTableRow[] = [
  { key: "a", cells: { name: { title: "Ada", subtitle: "Ops", avatar: { initials: "AL" } }, role: "Lead" } },
  { key: "b", cells: { name: { title: "Ben" }, role: "Analyst" }, selected: true },
  { key: "c", cells: { name: { title: "Cy" }, role: "Intern" }, disabled: true }
];

const table = async () => {
  const el = await fixture<ZetaTable>(
    html`<zeta-table caption="People" page-details="Showing 1-3 of 21" page-count="7" .columns=${columns} .rows=${rows}>
      <zeta-checkbox slot="cell-a-pick" aria-label="Select Ada"></zeta-checkbox>
    </zeta-table>`
  );
  await elementUpdated(el);
  return el;
};

const selectable = async (more: Partial<ZetaTable> = {}) => {
  const el = await fixture<ZetaTable>(
    html`<zeta-table selectable caption="People" frozen-columns=${more.frozenColumns ?? 0} .columns=${columns.slice(1)} .rows=${rows}></zeta-table>`
  );
  await elementUpdated(el);
  return el;
};
const boxes = (el: ZetaTable) =>
  all(el, "zeta-checkbox") as (HTMLElement & { checked: boolean; indeterminate: boolean; disabled: boolean; input: HTMLInputElement })[];
const toggle = async (el: ZetaTable, i: number) => {
  boxes(el)[i].input.click();
  await elementUpdated(el);
};

const actions: ZetaTableAction[] = [
  { key: "view", label: "View", icon: "visibility" },
  { key: "edit", label: "Edit", icon: "edit" },
  { key: "delete", label: "Delete", icon: "delete", disabled: true }
];
const withActions = async (onRowAction: ZetaTable["onRowAction"] = null) => {
  const own: ZetaTableRow[] = [rows[0], { ...rows[1], actions: [{ key: "share", label: "Share" }] }, { ...rows[2], actions: null }];
  const el = await fixture<ZetaTable>(
    html`<zeta-table caption="People" .columns=${columns.slice(1)} .rows=${own} .rowActions=${actions} .onRowAction=${onRowAction}></zeta-table>`
  );
  await elementUpdated(el);
  return el;
};
const triggers = (el: ZetaTable) => all(el, "td.actions zeta-icon-button");
const openMenu = async (el: ZetaTable, i = 0) => {
  triggers(el)[i].click();
  await elementUpdated(el);
  await new Promise(r => setTimeout(r, 0));
  return one(el, ".menu");
};
const items = (el: ZetaTable) => all(el, ".menu zeta-dropdown-menu-item");
const labels = (el: ZetaTable) => items(el).map(i => i.textContent?.replace(i.querySelector("zeta-icon")?.textContent ?? "", "").trim());

const people: ZetaTableRow[] = Array.from({ length: 12 }, (_, i) => ({
  key: `p${i + 1}`,
  cells: { name: { title: `Person ${i + 1}`, subtitle: i % 2 ? "Night" : "Day" }, role: ["Lead", "Analyst", "Intern"][i % 3] }
}));
const client = async (more = "") => {
  const el = await fixture<ZetaTable>(
    html`<zeta-table client-side page-size="5" caption="People" .columns=${columns.slice(1).map(c => ({ ...c, filterable: true }))} .rows=${people}
      >${more}</zeta-table
    >`
  );
  await elementUpdated(el);
  return el;
};
const shown = (el: ZetaTable) => all(el, "tbody tr .title").map(t => t.textContent);
const filterMenu = async (el: ZetaTable, col: number) => {
  all(el, ".filter")[col].click();
  await elementUpdated(el);
  await new Promise(r => setTimeout(r, 0));
};

const resizable = async () => {
  const cols: ZetaTableColumn[] = [
    { key: "name", header: "Name", width: 200 },
    { key: "role", header: "Role", width: 160, resizable: false },
    { key: "team", header: "Team", width: 160 }
  ];
  const el = await fixture<ZetaTable>(html`<zeta-table resizable caption="People" .columns=${cols} .rows=${rows} style="width: 900px"></zeta-table>`);
  await elementUpdated(el);
  return el;
};
const thWidth = (el: ZetaTable, i: number) => all(el, "thead th")[i].getBoundingClientRect().width;
const centre = (n: Element) => {
  const r = n.getBoundingClientRect();
  return [Math.round(r.x + r.width / 2), Math.round(r.y + r.height / 2)] as [number, number];
};

const configurable = async () => {
  const cols: ZetaTableColumn[] = [
    { key: "name", header: "Name", hideable: false },
    { key: "role", header: "Role" },
    { key: "team", header: "Team" }
  ];
  const data: ZetaTableRow[] = [{ key: "a", cells: { name: "Ada", role: "Lead", team: "Ops" } }];
  const el = await fixture<ZetaTable>(html`<zeta-table column-configure caption="People" .columns=${cols} .rows=${data}></zeta-table>`);
  await elementUpdated(el);
  return el;
};
const openSettings = async (el: ZetaTable) => {
  one(el, ".column-settings").click();
  await elementUpdated(el);
  await new Promise(r => setTimeout(r, 0));
};
const settingsItems = (el: ZetaTable, type: string) => all(el, `.menu zeta-dropdown-menu-item[type="${type}"]`);
const headers = (el: ZetaTable) => all(el, "thead th").map(th => th.querySelector(".label")?.textContent);

const narrow = async (more: Partial<ZetaTableColumn> = {}) => {
  const cols: ZetaTableColumn[] = [
    { key: "name", header: "Name", width: 200, ...more },
    { key: "role", header: "Role", width: 160 }
  ];
  const data: ZetaTableRow[] = [{ key: "a", cells: { name: { title: "Ada Lovelace-Byron of Ockham", subtitle: "Ops" }, role: "Lead" } }];
  const el = await fixture<ZetaTable>(html`<zeta-table resizable tooltip-delay="0" caption="People" .columns=${cols} .rows=${data}></zeta-table>`);
  await elementUpdated(el);
  return el;
};
const hoverFor = async (el: ZetaTable, target: Element) => {
  await sendMouse({ type: "move", position: centre(target) });
  await new Promise(r => setTimeout(r, 50));
  await elementUpdated(el);
  return one(el, ".cell-tip");
};

describe("zeta-table", () => {
  describe("Accessibility", () => {
    it("opens the filter options as a named menu, and passes axe with it open", async () => {
      const el = await client();
      await filterMenu(el, 1);
      const menu = one(el, ".menu");
      await expect(menu.getAttribute("role")).to.equal("menu");
      await expect(menu.getAttribute("aria-label")).to.equal("Filter Role");
      await expect(el).shadowDom.to.be.accessible({ ignoredRules: ["color-contrast"] });
    });

    it("names the column settings button, reports it open, and passes axe with the panel open", async () => {
      const el = await configurable();
      const button = one(el, ".column-settings") as HTMLElement & { ariaExpanded: string };
      await expect(button.getAttribute("aria-label")).to.equal("Columns");
      await openSettings(el);
      await expect(button.ariaExpanded).to.equal("true");
      await expect(el).shadowDom.to.be.accessible({ ignoredRules: ["color-contrast"] });
    });

    it("gives each resizable column a named, focusable vertical separator, and passes axe", async () => {
      const el = await resizable();
      const grips = all(el, ".resizer");
      await expect(grips.length).to.equal(2);
      await expect(grips[0].getAttribute("role")).to.equal("separator");
      await expect(grips[0].getAttribute("aria-orientation")).to.equal("vertical");
      await expect(grips[0].getAttribute("aria-label")).to.equal("Resize Name");
      await expect(grips[0].getAttribute("tabindex")).to.equal("0");
      await expect(el).shadowDom.to.be.accessible({ ignoredRules: ["color-contrast"] });
    });

    it("names the actions column and each row's more button, and passes axe with the menu open", async () => {
      const el = await withActions();
      await expect(one(el, "th.actions").textContent?.trim()).to.equal("Actions");
      await expect(triggers(el).map(t => t.getAttribute("aria-label"))).to.deep.equal(["Actions: Ada", "Actions: Ben"]);
      await openMenu(el);
      await expect((triggers(el)[0] as HTMLElement & { ariaExpanded: string }).ariaExpanded).to.equal("true");
      await expect(el).shadowDom.to.be.accessible({ ignoredRules: ["color-contrast"] });
    });

    it("names the select-all and row checkboxes, and passes axe when selectable", async () => {
      const el = await selectable();
      const names = boxes(el).map(b => b.textContent?.trim());
      await expect(names).to.deep.equal(["Select all rows", "Select row: Ada", "Select row: Ben", "Select row: Cy"]);
      await expect(el).shadowDom.to.be.accessible({ ignoredRules: ["color-contrast"] });
    });

    it("is a captioned table with column headers and aria-sort on sortable columns", async () => {
      const el = await table();
      await expect(one(el, "caption").textContent?.trim()).to.equal("People");
      const ths = all(el, "thead th");
      await expect(ths.every(th => th.getAttribute("scope") === "col")).to.equal(true);
      await expect(ths.map(th => th.getAttribute("aria-sort"))).to.deep.equal([null, "none", "none"]);
      await expect(one(el, ".filter").getAttribute("aria-label")).to.equal("Filter Name");
      // Checked on the table's own markup; labelling slotted cell content belongs to that component.
      const plain = await fixture<ZetaTable>(html`<zeta-table caption="People" page-count="7" .columns=${columns} .rows=${rows}></zeta-table>`);
      await expect(plain).shadowDom.to.be.accessible({ ignoredRules: ["color-contrast"] });
    });
  });

  describe("Content", () => {
    it("renders text and avatar-and-text cells, and slots any other content into a cell", async () => {
      const el = await table();
      await expect(one(el, ".avatar-text .title").textContent).to.equal("Ada");
      await expect(one(el, ".avatar-text .subtitle").textContent).to.equal("Ops");
      expect(one(el, ".avatar-text zeta-avatar")).to.exist;
      const slot = one(el, 'slot[name="cell-a-pick"]') as HTMLSlotElement;
      await expect(slot.assignedElements()[0].localName).to.equal("zeta-checkbox");
    });

    it("marks selected and disabled rows", async () => {
      const el = await table();
      const trs = all(el, "tbody tr");
      await expect(trs[1].getAttribute("aria-selected")).to.equal("true");
      await expect(trs[2].getAttribute("aria-disabled")).to.equal("true");
    });

    it("drops the controls bar, search and footer with their switches, and the pagination at one page", async () => {
      const el = await table();
      expect(one(el, ".controls zeta-search")).to.exist;
      expect(one(el, ".footer zeta-pagination[outline][show-controls]")).to.exist;
      el.pageCount = 1;
      el.showSearch = false;
      await elementUpdated(el);
      expect(el.shadowRoot!.querySelector("zeta-pagination")).to.not.exist;
      expect(el.shadowRoot!.querySelector("zeta-search")).to.not.exist;
      el.hasControl = false;
      el.hasFooter = false;
      await elementUpdated(el);
      expect(el.shadowRoot!.querySelector(".controls")).to.not.exist;
      expect(el.shadowRoot!.querySelector(".footer")).to.not.exist;
    });
  });

  describe("Dimensions", () => {
    it("freezes the checkbox column ahead of the frozen columns", async () => {
      const el = await selectable({ frozenColumns: 1 });
      await elementUpdated(el);
      const [sel, name] = all(el, "thead th");
      await expect(sel.classList.contains("frozen")).to.equal(true);
      expect(parseFloat(name.style.insetInlineStart)).to.be.closeTo(sel.getBoundingClientRect().width, 1);
    });

    it("pads bars and cells space/lg by space/md and pins a set column width", async () => {
      const el = await table();
      await expect(getComputedStyle(one(el, ".controls")).paddingLeft).to.equal(v(el, "--space-lg"));
      await expect(getComputedStyle(one(el, ".footer")).paddingTop).to.equal(v(el, "--space-md"));
      await expect(getComputedStyle(one(el, "td")).paddingLeft).to.equal(v(el, "--space-lg"));
      await expect(all(el, "thead th")[1].getBoundingClientRect().width).to.equal(200);
    });

    it("pins frozen columns at their measured offsets", async () => {
      const el = await table();
      el.frozenColumns = 2;
      await elementUpdated(el);
      await elementUpdated(el);
      const ths = all(el, "thead th");
      await expect(ths[1].classList.contains("frozen-last")).to.equal(true);
      expect(parseFloat(ths[1].style.insetInlineStart)).to.be.closeTo(ths[0].getBoundingClientRect().width, 0.5);
    });
  });

  describe("Styling", () => {
    it("draws headers and cells on the spec tokens and rounds the table", async () => {
      const el = await table();
      const th = all(el, "thead th")[1];
      await expect(getComputedStyle(th).borderTopColor).to.equal(getCssVarColorValue(el, "--zebra-border-default"));
      await expect(getComputedStyle(one(el, ".label")).fontSize).to.equal(v(el, "--label-medium-font-size"));
      await expect(getComputedStyle(one(el, "td")).borderBottomColor).to.equal(getCssVarColorValue(el, "--zebra-border-subtle"));
      await expect(getComputedStyle(all(el, "tbody tr")[1].querySelector("td")!).backgroundColor).to.equal(
        getCssVarColorValue(el, "--interactive-neutral-background-selected")
      );
      await expect(getComputedStyle(one(el, ".controls")).backgroundColor).to.equal(getCssVarColorValue(el, "--surface-section"));
      await expect(getComputedStyle(el).borderTopLeftRadius).to.equal(v(el, "--radius-element-md"));
      await expect(getComputedStyle(one(el, ".controls")).borderTopLeftRadius).to.equal("0px");
    });
  });

  describe("Interaction", () => {
    it("cycles a sortable header none, ascending, descending, none and fires sort-change", async () => {
      const el = await table();
      const sort = all(el, ".sort")[0];
      setTimeout(() => sort.click());
      const e1 = await oneEvent<CustomEvent<{ sort: unknown }>>(el, "sort-change");
      await expect(e1.detail.sort).to.deep.equal({ key: "name", direction: "ascending" });
      sort.click();
      await elementUpdated(el);
      await expect(all(el, "thead th")[1].getAttribute("aria-sort")).to.equal("descending");
      sort.click();
      await elementUpdated(el);
      await expect(el.sort).to.equal(null);
    });

    it("fires filter, search-change, page-change and row-click (not for disabled rows)", async () => {
      const el = await table();
      setTimeout(() => one(el, ".filter").click());
      await expect((await oneEvent<CustomEvent<{ key: string }>>(el, "filter")).detail.key).to.equal("name");
      const search = one(el, "zeta-search") as HTMLInputElement;
      setTimeout(() => {
        search.value = "ad";
        search.dispatchEvent(new Event("input", { bubbles: true, composed: true }));
      });
      await expect((await oneEvent<CustomEvent<{ value: string }>>(el, "search-change")).detail.value).to.equal("ad");
      const pager = one(el, "zeta-pagination");
      await (pager as HTMLElement & { updateComplete: Promise<boolean> }).updateComplete;
      setTimeout(() => pager.shadowRoot!.querySelector<HTMLElement>('[aria-label="Next page"]')!.click());
      await expect((await oneEvent<CustomEvent<{ page: number }>>(el, "page-change")).detail.page).to.equal(2);
      let clicks = 0;
      el.addEventListener("row-click", () => clicks++);
      await expect(el.hasAttribute("data-clickable")).to.equal(true);
      all(el, "tbody tr")[0].click();
      all(el, "tbody tr")[2].click();
      await expect(clicks).to.equal(1);
    });

    it("seeds selectedRows from each row's selected flag and marks those rows", async () => {
      const el = await selectable();
      await expect(el.selectedRows).to.deep.equal(["b"]);
      await expect(all(el, "tbody tr").map(tr => tr.getAttribute("aria-selected"))).to.deep.equal([null, "true", null]);
      await expect(boxes(el).map(b => b.checked)).to.deep.equal([false, false, true, false]);
      await expect(boxes(el)[0].indeterminate).to.equal(true);
      await expect(boxes(el)[3].disabled).to.equal(true);
    });

    it("toggles a row and fires selection-change without firing row-click", async () => {
      const el = await selectable();
      let clicks = 0;
      el.addEventListener("row-click", () => clicks++);
      setTimeout(() => boxes(el)[1].input.click());
      const ev: CustomEvent<{ selectedRows: string[]; rows: ZetaTableRow[]; selected: boolean }> = await oneEvent(el, "selection-change");
      expect(ev.detail.selectedRows).to.have.members(["a", "b"]);
      await expect(ev.detail.rows.map(r => r.key)).to.deep.equal(["a"]);
      await expect(ev.detail.selected).to.equal(true);
      await expect(clicks).to.equal(0);
      await elementUpdated(el);
      await expect(boxes(el)[0].checked).to.equal(true);
      await expect(boxes(el)[0].indeterminate).to.equal(false);
    });

    it("select-all covers the enabled rows shown, then clears them, keeping keys from other pages", async () => {
      const el = await selectable();
      el.selectedRows = ["b", "elsewhere"];
      await elementUpdated(el);
      await toggle(el, 0);
      expect(el.selectedRows).to.have.members(["a", "b", "elsewhere"]);
      await toggle(el, 0);
      await expect(el.selectedRows).to.deep.equal(["elsewhere"]);
    });

    it("keeps a set selectedRows when rows change", async () => {
      const el = await selectable();
      el.selectedRows = ["a"];
      await elementUpdated(el);
      el.rows = [...rows];
      await elementUpdated(el);
      await expect(el.selectedRows).to.deep.equal(["a"]);
    });

    it("adds a trailing actions column; a row's own actions replace rowActions and null hides them", async () => {
      const el = await withActions();
      const lastCells = all(el, "tbody tr").map(tr => tr.lastElementChild!);
      await expect(lastCells.every(td => td.classList.contains("actions"))).to.equal(true);
      await expect(lastCells.map(td => !!td.querySelector("zeta-icon-button"))).to.deep.equal([true, true, false]);
      await openMenu(el, 1);
      await expect(labels(el)).to.deep.equal(["Share"]);
    });

    it("opens a compact menu in the top layer and focuses its first item", async () => {
      const el = await withActions();
      const menu = await openMenu(el);
      await expect(menu.hasAttribute("compact")).to.equal(true);
      await expect(menu.matches(":popover-open")).to.equal(true);
      await expect(labels(el)).to.deep.equal(["View", "Edit", "Delete"]);
      await expect(items(el)[2].hasAttribute("disabled")).to.equal(true);
      expect(items(el)[0].shadowRoot!.activeElement).to.exist;
    });

    it("runs a chosen action: calls onRowAction, fires row-action, closes and skips row-click", async () => {
      const calls: [string, string, number][] = [];
      const el = await withActions((key, row, i) => calls.push([key, row.key, i]));
      let clicks = 0;
      el.addEventListener("row-click", () => clicks++);
      await openMenu(el);
      setTimeout(() => items(el)[1].click());
      const ev: CustomEvent<{ action: string; row: ZetaTableRow; rowIndex: number }> = await oneEvent(el, "row-action");
      await expect(ev.detail.action).to.equal("edit");
      await expect(ev.detail.rowIndex).to.equal(0);
      await expect(calls).to.deep.equal([["edit", "a", 0]]);
      await expect(clicks).to.equal(0);
      await elementUpdated(el);
      await expect(one(el, ".menu").matches(":popover-open")).to.equal(false);
    });

    it("ignores a disabled action", async () => {
      let fired = 0;
      const el = await withActions(() => fired++);
      await openMenu(el);
      items(el)[2].click();
      await elementUpdated(el);
      await expect(fired).to.equal(0);
    });

    it("moves with the arrow keys and closes on Escape and outside clicks, returning focus to the button", async () => {
      const el = await withActions();
      const menu = await openMenu(el);
      const press = (key: string) => items(el)[0].dispatchEvent(new KeyboardEvent("keydown", { key, bubbles: true, composed: true }));
      press("ArrowDown");
      expect(items(el)[1].shadowRoot!.activeElement).to.exist;
      press("Escape");
      await elementUpdated(el);
      await expect(menu.matches(":popover-open")).to.equal(false);
      await expect(el.shadowRoot!.activeElement).to.equal(triggers(el)[0]);
      await openMenu(el);
      document.body.click();
      await elementUpdated(el);
      await expect(menu.matches(":popover-open")).to.equal(false);
    });

    it("client-side: pages the rows itself and works out the page count and summary", async () => {
      const el = await client();
      await expect(shown(el)).to.deep.equal(["Person 1", "Person 2", "Person 3", "Person 4", "Person 5"]);
      await expect(one(el, ".page-details").textContent).to.equal("Showing 1-5 of 12");
      await expect((one(el, "zeta-pagination") as HTMLElement & { totalPages: number }).totalPages).to.equal(3);
      el.page = 3;
      await elementUpdated(el);
      await expect(shown(el)).to.deep.equal(["Person 11", "Person 12"]);
      await expect(one(el, ".page-details").textContent).to.equal("Showing 11-12 of 12");
    });

    it("client-side: sorts by the header, numbers by value, and returns to page 1", async () => {
      const el = await client();
      el.page = 2;
      await elementUpdated(el);
      const sort = all(el, ".sort")[0];
      sort.click();
      sort.click();
      await elementUpdated(el);
      await expect(el.sort).to.deep.equal({ key: "name", direction: "descending" });
      await expect(el.page).to.equal(1);
      await expect(shown(el)).to.deep.equal(["Person 12", "Person 11", "Person 10", "Person 9", "Person 8"]);
    });

    it("client-side: a column's compare orders its rows", async () => {
      const el = await client();
      el.columns = [{ key: "name", header: "Name", sortable: true, compare: (a, b) => b.key.localeCompare(a.key, undefined, { numeric: true }) }];
      el.sort = { key: "name", direction: "ascending" };
      await elementUpdated(el);
      await expect(shown(el)[0]).to.equal("Person 12");
    });

    it("client-side: searches every cell's text, subtitles included", async () => {
      const el = await client();
      el.searchValue = "night";
      await elementUpdated(el);
      await expect(one(el, ".page-details").textContent).to.equal("Showing 1-5 of 6");
      el.searchValue = "intern";
      await elementUpdated(el);
      await expect(shown(el)).to.deep.equal(["Person 3", "Person 6", "Person 9", "Person 12"]);
    });

    it("client-side: filters from a checkbox menu of the column's values and fires filter-change", async () => {
      const el = await client();
      await filterMenu(el, 1);
      const opts = items(el);
      await expect(opts.map(o => o.textContent?.trim())).to.deep.equal(["Analyst", "Intern", "Lead"]);
      await expect(opts.every(o => o.getAttribute("type") === "checkbox")).to.equal(true);
      setTimeout(() => opts[2].click());
      const ev: CustomEvent<{ filters: Record<string, string[]>; key: string }> = await oneEvent(el, "filter-change");
      expect(ev.detail.filters).to.deep.equal({ role: ["Lead"] });
      await elementUpdated(el);
      await expect(shown(el)).to.deep.equal(["Person 1", "Person 4", "Person 7", "Person 10"]);
      await expect(all(el, ".filter")[1].classList.contains("active")).to.equal(true);
      // The menu stays open for more choices, and offers to clear the filter.
      await expect(one(el, ".menu").matches(":popover-open")).to.equal(true);
      await expect(labels(el).at(-1)).to.equal("Clear filter");
    });

    it("client-side: clearing a filter shows every row again and closes the menu", async () => {
      const el = await client();
      el.filters = { role: ["Lead"] };
      await elementUpdated(el);
      await filterMenu(el, 1);
      items(el).at(-1)!.click();
      await elementUpdated(el);
      await expect(el.filters).to.deep.equal({});
      await expect(one(el, ".page-details").textContent).to.equal("Showing 1-5 of 12");
      await expect(one(el, ".menu").matches(":popover-open")).to.equal(false);
    });

    it("shows the empty label when nothing matches, and select-all covers only the rows shown", async () => {
      const el = await client();
      el.selectable = true;
      await elementUpdated(el);
      await toggle(el, 0);
      await expect(el.selectedRows).to.deep.equal(["p1", "p2", "p3", "p4", "p5"]);
      el.searchValue = "nobody";
      await elementUpdated(el);
      await expect(one(el, "tr.empty td").textContent?.trim()).to.equal("No results");
      await expect(one(el, "tr.empty td").getAttribute("colspan")).to.equal("3");
      await expect(one(el, ".page-details").textContent).to.equal("Showing 0-0 of 0");
      el.pageSize = 0;
      await elementUpdated(el);
      await expect(one(el, ".page-details").textContent).to.equal("Showing 0-0 of 0");
    });

    it("leaves rows alone when not client-side: sorting and filtering only fire events", async () => {
      const el = await table();
      let filtered = "";
      el.addEventListener("filter", e => (filtered = (e as CustomEvent<{ key: string }>).detail.key));
      all(el, ".sort")[0].click();
      one(el, ".filter").click();
      await elementUpdated(el);
      await expect(filtered).to.equal("name");
      await expect(all(el, "tbody tr .title").map(t => t.textContent)).to.deep.equal(["Ada", "Ben", "Cy"]);
      await expect(one(el, ".menu").matches(":popover-open")).to.equal(false);
    });

    it("offers rows per page in a narrow small Select Input named by its label", async () => {
      const el = await client();
      expect(one(el, ".page-size")).to.not.exist;
      el.pageSizeOptions = [5, 10, 20];
      await elementUpdated(el);
      const select = one(el, ".page-size zeta-select-input") as HTMLElement & { value: string; placeholder: string; size: string };
      await expect(one(el, ".page-size-label").textContent).to.equal("Rows per page");
      await expect(select.placeholder).to.equal("Rows per page");
      await expect(select.value).to.equal("5");
      await expect(select.getAttribute("size")).to.equal("small");
      await expect(select.hasAttribute("compact")).to.equal(true);
      await expect(Array.from(select.querySelectorAll("zeta-option")).map(o => o.textContent)).to.deep.equal(["5", "10", "20"]);
      // Only as wide as two digits and its chevron need, well under Input Field's minimum width.
      expect(select.getBoundingClientRect().width).to.be.lessThan(100);
    });

    it("choosing a size sets pageSize, returns to page 1, fires page-size-change and re-pages client-side", async () => {
      const el = await client();
      el.pageSizeOptions = [5, 10, 20];
      el.page = 2;
      await elementUpdated(el);
      const option = el.shadowRoot!.querySelectorAll<HTMLElement>(".page-size zeta-option")[1];
      setTimeout(() => option.shadowRoot!.querySelector<HTMLElement>(".option")!.click());
      const ev: CustomEvent<{ pageSize: number }> = await oneEvent(el, "page-size-change");
      await expect(ev.detail.pageSize).to.equal(10);
      await elementUpdated(el);
      await expect(el.pageSize).to.equal(10);
      await expect(el.page).to.equal(1);
      await expect(all(el, "tbody tr").length).to.equal(10);
      await expect(one(el, ".page-details").textContent).to.equal("Showing 1-10 of 12");
    });

    it("has no resize grips unless resizable, and a column can opt out", async () => {
      const el = await table();
      await expect(all(el, ".resizer").length).to.equal(0);
      const on = await resizable();
      await expect(all(on, "thead th").map(th => !!th.querySelector(".resizer"))).to.deep.equal([true, false, true]);
      // A column with no resizable column to trade width with gets no grip.
      on.columns = on.columns.slice(0, 2);
      await elementUpdated(on);
      await expect(all(on, ".resizer").length).to.equal(0);
    });

    it("shows the neutral hover border down the full header cell when the edge is hovered", async () => {
      const el = await resizable();
      const grip = one(el, ".resizer");
      const th = all(el, "thead th")[0];
      await expect(grip.getBoundingClientRect().height).to.equal(th.getBoundingClientRect().height);
      await sendMouse({ type: "move", position: centre(grip) });
      const line = getComputedStyle(grip, "::after");
      await expect(line.backgroundColor).to.equal(getCssVarColorValue(el, "--interactive-neutral-border-hover"));
      await expect(line.width).to.equal(v(el, "--stroke-thick"));
      await expect(getComputedStyle(grip).cursor).to.equal("col-resize");
      await resetMouse();
    });

    it("drags a column wider by taking width from the next resizable one, never changing the table's width", async () => {
      const el = await resizable();
      const sizes: Record<string, number>[] = [];
      el.addEventListener("column-resize", e => sizes.push((e as CustomEvent<{ widths: Record<string, number> }>).detail.widths));
      const table = one(el, "table");
      const tableWidth = table.getBoundingClientRect().width;
      const [name, role, team] = [0, 1, 2].map(i => thWidth(el, i));
      const [x, y] = centre(one(el, ".resizer"));
      await sendMouse({ type: "move", position: [x, y] });
      await sendMouse({ type: "down" });
      await sendMouse({ type: "move", position: [x + 60, y] });
      await sendMouse({ type: "up" });
      await elementUpdated(el);
      expect(thWidth(el, 0)).to.be.closeTo(name + 60, 1);
      // Role opts out, so Team gives the width.
      expect(thWidth(el, 1)).to.be.closeTo(role, 1);
      expect(thWidth(el, 2)).to.be.closeTo(team - 60, 1);
      expect(table.getBoundingClientRect().width).to.be.closeTo(tableWidth, 1);
      expect(sizes.at(-1)!.team).to.be.closeTo(team - 60, 1);
      await resetMouse();
    });

    it("stops growing once its neighbours reach minColumnWidth, and the last column trades with those before it", async () => {
      const el = await resizable();
      const tableWidth = one(el, "table").getBoundingClientRect().width;
      const [name, , team] = [0, 1, 2].map(i => thWidth(el, i));
      const grip = (i: number) => all(el, ".resizer")[i];
      const key = (i: number, k: string, shiftKey = false) =>
        grip(i).dispatchEvent(new KeyboardEvent("keydown", { key: k, shiftKey, bubbles: true, composed: true }));
      for (let n = 0; n < 20; n++) key(0, "ArrowRight", true);
      await elementUpdated(el);
      expect(thWidth(el, 2)).to.be.closeTo(80, 1);
      expect(thWidth(el, 0)).to.be.closeTo(name + team - 80, 1);
      // Team is last: growing it takes back from Name.
      key(1, "ArrowRight");
      await elementUpdated(el);
      expect(thWidth(el, 2)).to.be.closeTo(96, 1);
      expect(thWidth(el, 0)).to.be.closeTo(name + team - 96, 1);
      expect(one(el, "table").getBoundingClientRect().width).to.be.closeTo(tableWidth, 1);
    });

    it("steps with the arrow keys, holds minColumnWidth, and Escape or a double-click restores the declared width", async () => {
      const el = await resizable();
      const grip = one(el, ".resizer");
      const key = (k: string) => grip.dispatchEvent(new KeyboardEvent("keydown", { key: k, bubbles: true, composed: true }));
      const start = thWidth(el, 0);
      const startTeam = thWidth(el, 2);
      key("ArrowRight");
      await elementUpdated(el);
      expect(thWidth(el, 0)).to.be.closeTo(start + 16, 1);
      key("Home");
      await elementUpdated(el);
      expect(thWidth(el, 0)).to.be.closeTo(80, 1);
      await expect(grip.getAttribute("aria-valuenow")).to.equal("80");
      key("Escape");
      await elementUpdated(el);
      expect(thWidth(el, 0)).to.be.closeTo(200, 1);
      expect(thWidth(el, 0) + thWidth(el, 2)).to.be.closeTo(start + startTeam, 1);
      key("ArrowLeft");
      await elementUpdated(el);
      grip.dispatchEvent(new MouseEvent("dblclick", { bubbles: true, composed: true }));
      await elementUpdated(el);
      expect(thWidth(el, 0)).to.be.closeTo(200, 1);
    });

    it("has no settings button unless column-configure", async () => {
      const el = await table();
      expect(one(el, ".column-settings")).to.not.exist;
    });

    it("lists every column to show or hide, and every showing column to freeze up to, in the compact menu", async () => {
      const el = await configurable();
      await openSettings(el);
      const menu = one(el, ".menu");
      await expect(menu.hasAttribute("compact")).to.equal(true);
      await expect(all(el, ".menu-heading").map(h => h.textContent)).to.deep.equal(["Show columns", "Freeze up to"]);
      const boxes = settingsItems(el, "checkbox") as (HTMLElement & { selected: boolean; disabled: boolean })[];
      await expect(boxes.map(b => b.textContent?.trim())).to.deep.equal(["Name", "Role", "Team"]);
      await expect(boxes.map(b => b.selected)).to.deep.equal([true, true, true]);
      // hideable: false keeps Name showing.
      await expect(boxes[0].disabled).to.equal(true);
      await expect(settingsItems(el, "radio").map(r => r.textContent?.trim())).to.deep.equal(["None", "Name", "Role", "Team"]);
    });

    it("hides and shows a column from the panel and fires column-settings-change", async () => {
      const el = await configurable();
      await openSettings(el);
      setTimeout(() => settingsItems(el, "checkbox")[1].click());
      const ev: CustomEvent<{ hiddenColumns: string[]; frozenColumns: number }> = await oneEvent(el, "column-settings-change");
      expect(ev.detail.hiddenColumns).to.deep.equal(["role"]);
      await elementUpdated(el);
      await expect(headers(el)).to.deep.equal(["Name", "Team"]);
      await expect(all(el, "tbody td").map(td => td.textContent?.trim())).to.deep.equal(["Ada", "Ops"]);
      // The panel stays open, and Role can come back.
      settingsItems(el, "checkbox")[1].click();
      await elementUpdated(el);
      await expect(headers(el)).to.deep.equal(["Name", "Role", "Team"]);
    });

    it("never hides the last column showing", async () => {
      const el = await configurable();
      el.columns = el.columns.map(c => ({ ...c, hideable: true }));
      el.hiddenColumns = ["role", "team"];
      await elementUpdated(el);
      await openSettings(el);
      const boxes = settingsItems(el, "checkbox") as (HTMLElement & { disabled: boolean })[];
      await expect(boxes.map(b => b.disabled)).to.deep.equal([true, false, false]);
    });

    it("freezes up to the chosen column, and freezing shrinks with the columns showing", async () => {
      const el = await configurable();
      await openSettings(el);
      settingsItems(el, "radio")[2].click();
      await elementUpdated(el);
      await expect(el.frozenColumns).to.equal(2);
      await expect(all(el, "thead th").map(th => th.classList.contains("frozen"))).to.deep.equal([true, true, false]);
      settingsItems(el, "checkbox")[2].click();
      settingsItems(el, "checkbox")[1].click();
      await elementUpdated(el);
      await expect(el.frozenColumns).to.equal(1);
      await expect((settingsItems(el, "radio")[1] as HTMLElement & { selected: boolean }).selected).to.equal(true);
    });

    it("shows cut-off text in full in a tooltip above it, hidden from assistive technology", async () => {
      const el = await narrow();
      one(el, ".resizer").dispatchEvent(new KeyboardEvent("keydown", { key: "Home", bubbles: true, composed: true }));
      await elementUpdated(el);
      const title = one(el, ".title");
      expect(title.scrollWidth).to.be.greaterThan(title.clientWidth);
      const tip = (await hoverFor(el, title)) as HTMLElement & { point: string };
      await expect(tip.matches(":popover-open")).to.equal(true);
      await expect(tip.textContent?.trim()).to.equal("Ada Lovelace-Byron of Ockham");
      await expect(tip.getAttribute("aria-hidden")).to.equal("true");
      await expect(tip.point).to.equal("bottom");
      expect(tip.getBoundingClientRect().bottom).to.be.at.most(title.getBoundingClientRect().top);
      await sendMouse({ type: "move", position: [0, 0] });
      await elementUpdated(el);
      await expect(tip.matches(":popover-open")).to.equal(false);
      await resetMouse();
    });

    it("shows no tooltip on text that fits, unless the column's tooltip asks for one; tooltipOnEllipsisOnly false never", async () => {
      const el = await narrow();
      await expect((await hoverFor(el, one(el, ".subtitle"))).matches(":popover-open")).to.equal(false);
      const always = await narrow({ tooltip: true });
      await expect((await hoverFor(always, one(always, ".subtitle"))).matches(":popover-open")).to.equal(true);
      const off = await narrow({ tooltipOnEllipsisOnly: false });
      one(off, ".resizer").dispatchEvent(new KeyboardEvent("keydown", { key: "Home", bubbles: true, composed: true }));
      await elementUpdated(off);
      await expect((await hoverFor(off, one(off, ".title"))).matches(":popover-open")).to.equal(false);
      await resetMouse();
    });

    it("disables rows listed in disabledRows: no selection, clicks or actions, and select-all passes them by", async () => {
      const el = await fixture<ZetaTable>(
        html`<zeta-table selectable caption="People" .disabledRows=${["a"]} .columns=${columns.slice(1)} .rows=${rows} .rowActions=${actions}></zeta-table>`
      );
      await elementUpdated(el);
      let clicks = 0;
      el.addEventListener("row-click", () => clicks++);
      await expect(all(el, "tbody tr").map(tr => tr.getAttribute("aria-disabled"))).to.deep.equal(["true", null, "true"]);
      await expect(boxes(el)[1].disabled).to.equal(true);
      await expect((triggers(el)[0] as HTMLElement & { disabled: boolean }).disabled).to.equal(true);
      all(el, "tbody tr")[0].click();
      await expect(clicks).to.equal(0);
      await toggle(el, 0);
      await expect(el.selectedRows).to.deep.equal([]);
    });

    it("allowDisabledSelection lets disabled rows be selected, clicked and opened for actions, still marked disabled", async () => {
      const el = await fixture<ZetaTable>(
        html`<zeta-table
          selectable
          allow-disabled-selection
          caption="People"
          .disabledRows=${["a"]}
          .columns=${columns.slice(1)}
          .rows=${rows}
          .rowActions=${actions}
        ></zeta-table>`
      );
      await elementUpdated(el);
      let clicks = 0;
      el.addEventListener("row-click", () => clicks++);
      await expect(boxes(el)[1].disabled).to.equal(false);
      await expect((triggers(el)[0] as HTMLElement & { disabled: boolean }).disabled).to.equal(false);
      all(el, "tbody tr")[0].click();
      await expect(clicks).to.equal(1);
      await toggle(el, 0);
      expect(el.selectedRows).to.have.members(["a", "b", "c"]);
      await expect(all(el, "tbody tr")[0].getAttribute("aria-disabled")).to.equal("true");
    });

    it("draws a disabled row as one state: the same fill in every cell, frozen ones too, and every element dimmed", async () => {
      const el = await fixture<ZetaTable>(
        html`<zeta-table selectable frozen-columns="1" caption="People" .disabledRows=${["a"]} .columns=${columns.slice(1)} .rows=${rows}>
          <zeta-button slot="cell-a-role">Open</zeta-button>
        </zeta-table>`
      );
      await elementUpdated(el);
      const cells = Array.from(all(el, "tbody tr")[0].querySelectorAll("td"));
      await expect(new Set(cells.map(td => getComputedStyle(td).backgroundColor)).size).to.equal(1);
      await expect(getComputedStyle(cells[1]).backgroundColor).to.equal(getCssVarColorValue(el, "--interactive-neutral-background-default"));
      await expect(getComputedStyle(cells[1]).color).to.equal(getCssVarColorValue(el, "--foreground-disabled"));
      const slotted = el.querySelector("zeta-button")!;
      await expect(getComputedStyle(slotted).opacity).to.equal("0.5");
      await expect(getComputedStyle(slotted).pointerEvents).to.equal("none");
      await expect(getComputedStyle(one(el, "tbody tr zeta-avatar")).opacity).to.equal("0.5");
      el.allowDisabledSelection = true;
      await elementUpdated(el);
      await expect(getComputedStyle(slotted).pointerEvents).to.equal("auto");
    });

    it("caps the content at maxHeight and scrolls the rows vertically under a header that sticks to the top", async () => {
      const el = await fixture<ZetaTable>(
        html`<zeta-table max-height="200" frozen-columns="1" caption="People" .columns=${columns.slice(1)} .rows=${people}></zeta-table>`
      );
      await elementUpdated(el);
      await expect(el.maxHeight).to.equal(200);
      const scroller = one(el, ".scroller");
      expect(scroller.getBoundingClientRect().height).to.be.closeTo(200, 1);
      await expect(getComputedStyle(scroller).overflowY).to.equal("auto");
      const [frozenTh, th] = all(el, "thead th");
      const top = th.getBoundingClientRect().top;
      scroller.scrollTop = 300;
      await new Promise(r => requestAnimationFrame(r));
      expect(th.getBoundingClientRect().top).to.be.closeTo(top, 1);
      // The frozen header corner sits above both the header and the frozen body cells.
      expect(Number(getComputedStyle(frozenTh).zIndex)).to.be.greaterThan(Number(getComputedStyle(th).zIndex));
      expect(Number(getComputedStyle(th).zIndex)).to.be.greaterThan(Number(getComputedStyle(one(el, "tbody td.frozen")).zIndex));
    });

    it("grows with its rows when maxHeight is unset, and takes any CSS length", async () => {
      const el = await client();
      await expect(one(el, ".scroller").hasAttribute("data-capped")).to.equal(false);
      await expect(getComputedStyle(all(el, "thead th")[0]).position).to.not.equal("sticky");
      el.maxHeight = "12rem";
      await elementUpdated(el);
      await expect(one(el, ".scroller").style.maxHeight).to.equal("12rem");
    });

    it("keeps the truncation tooltip out of sight while it is closed", async () => {
      const el = await table();
      await expect(getComputedStyle(one(el, ".cell-tip")).display).to.equal("none");
    });

    it("counts the selected rows in an info Label at the start of the controls bar, announced as it changes", async () => {
      const el = await selectable();
      const region = one(el, ".controls .selected-count");
      await expect(region.getAttribute("role")).to.equal("status");
      await expect(one(el, ".controls").firstElementChild).to.equal(region);
      const label = region.querySelector("zeta-label")!;
      await expect(label.getAttribute("status")).to.equal("info");
      await expect(label.textContent?.trim()).to.equal("1 selected");
      await toggle(el, 1);
      await expect(region.querySelector("zeta-label")!.textContent?.trim()).to.equal("2 selected");
      el.selectedRows = [];
      el.selectedCountFormat = "{count} rows";
      await elementUpdated(el);
      expect(region.querySelector("zeta-label")).to.not.exist;
      el.selectedRows = ["a", "b", "elsewhere"];
      await elementUpdated(el);
      await expect(region.querySelector("zeta-label")!.textContent?.trim()).to.equal("3 rows");
      await expect(el).shadowDom.to.be.accessible({ ignoredRules: ["color-contrast"] });
    });

    it("shows no count without selectable", async () => {
      const el = await table();
      expect(one(el, ".selected-count")).to.not.exist;
    });
  });
});
