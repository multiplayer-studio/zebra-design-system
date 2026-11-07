import { fixture, html, expect } from "@open-wc/testing";
import type { ZetaTableLegacy, ZetaTableLegacyColumn, ZetaTableLegacyRow } from "../../components/table-legacy/table-legacy.js";
import "../../components/table-legacy/table-legacy.js";
import "../../index.css";
import { getCssVarColorValue } from "../utils.js";

const v = (el: Element, name: string) => getComputedStyle(el).getPropertyValue(name).trim();
const columns: ZetaTableLegacyColumn[] = [
  { field: "name", title: "Name", width: 200 },
  { field: "age", title: "Age", width: 100 }
];
const data: ZetaTableLegacyRow[] = Array.from({ length: 12 }, (_, i) => ({ id: i + 1, name: `Person ${i + 1}`, age: 20 + i }));

async function make(overrides: Partial<ZetaTableLegacy> = {}) {
  const el = await fixture<ZetaTableLegacy>(html`<zeta-table-legacy></zeta-table-legacy>`);
  Object.assign(el, { columns, data, tableTitle: "People", paginationType: "numbered", pageSize: 5, ...overrides });
  await el.updateComplete;
  return el;
}

describe("zeta-table-legacy (spec)", () => {
  describe("Content", () => {
    it("drops the controls bar with hasControl and the footer with hasFooter", async () => {
      const el = await make();
      expect(el.querySelector(".zeta-table-header-bar")).to.exist;
      expect(el.querySelector(".zeta-table-footer")).to.exist;
      el.hasControl = false;
      el.hasFooter = false;
      await el.updateComplete;
      expect(el.querySelector(".zeta-table-header-bar")).to.not.exist;
      expect(el.querySelector(".zeta-table-footer")).to.not.exist;
    });
    it("builds the bars and cells from Zeta components", async () => {
      const el = await make({ selectable: true, selectAll: true, onTableSearch: () => {}, onRefresh: () => {}, exportable: true, columnConfigure: true });
      expect(el.querySelector(".zeta-table-header-bar zeta-search")).to.exist;
      await expect(el.querySelectorAll(".zeta-table-header-bar zeta-icon-button").length).to.equal(3);
      for (const b of el.querySelectorAll(".zeta-table-header-bar zeta-icon-button")) await expect(b.getAttribute("flavor")).to.equal("outline-subtle");
      expect(el.querySelector(".zeta-table-header-row zeta-checkbox")).to.exist;
      expect(el.querySelector(".zeta-table-tbody zeta-checkbox")).to.exist;
      expect(el.querySelector(".zeta-table-footer zeta-pagination[outline][show-controls]")).to.exist;
      expect(el.querySelector(".zeta-table-footer zeta-select-input")).to.exist;
    });

    it("passes the shape to every control inside", async () => {
      const el = await make({ selectable: true, onTableSearch: () => {}, onRefresh: () => {} });
      el.rounded = false;
      await el.updateComplete;
      await expect(el.querySelector("zeta-search")?.getAttribute("shape")).to.equal("sharp");
      await expect(el.querySelector(".zeta-table-header-bar zeta-icon-button")?.getAttribute("shape")).to.equal("sharp");
      await expect((el.querySelector(".zeta-table-tbody zeta-checkbox") as HTMLElement & { rounded: boolean }).rounded).to.equal(false);
      await expect((el.querySelector("zeta-pagination") as HTMLElement & { rounded: boolean }).rounded).to.equal(false);
    });
  });

  describe("Dimensions", () => {
    it("pads the bars space/lg by space/md and the cells space/lg by space/md", async () => {
      const el = await make();
      const bar = el.querySelector(".zeta-table-header-bar") as HTMLElement;
      await expect(getComputedStyle(bar).paddingLeft).to.equal(v(el, "--space-lg"));
      await expect(getComputedStyle(bar).paddingTop).to.equal(v(el, "--space-md"));
      const cell = el.querySelector(".zeta-table-tbody .zeta-table-cell-inner") as HTMLElement;
      await expect(getComputedStyle(cell).paddingLeft).to.equal(v(el, "--space-lg"));
    });

    it("rounds to radius/element-md, and squares when not rounded", async () => {
      const el = await make();
      const wrapper = el.querySelector(".zeta-table-wrapper") as HTMLElement;
      await expect(getComputedStyle(wrapper).borderTopLeftRadius).to.equal(v(el, "--radius-element-md"));
      el.rounded = false;
      await el.updateComplete;
      await expect(getComputedStyle(wrapper).borderTopLeftRadius).to.equal("0px");
    });
    it("makes data rows 60 tall and puts the sort carets right after the label", async () => {
      const el = await make();
      const inner = el.querySelector(".zeta-table-tbody .zeta-table-cell-inner") as HTMLElement;
      await expect(inner.getBoundingClientRect().height).to.equal(60);
      const title = el.querySelector(".zeta-table-header-title") as HTMLElement;
      const sort = el.querySelector(".zeta-table-sort-btn") as HTMLElement;
      await expect(Math.round(sort.getBoundingClientRect().left - title.getBoundingClientRect().right)).to.equal(parseFloat(v(el, "--space-2xs")));
    });

    it("keeps the filter glyph hidden until the header cell is hovered or filtered", async () => {
      const el = await make({ onColumnFilter: () => {} });
      const btn = el.querySelector(".zeta-table-header-icon-btn") as HTMLElement;
      await expect(getComputedStyle(btn).visibility).to.equal("hidden");
      btn.classList.add("zeta-table-header-icon-btn--active");
      await expect(getComputedStyle(btn).visibility).to.equal("visible");
    });
  });

  describe("Styling", () => {
    it("puts the bars on surface/section and the cells on the neutral tokens", async () => {
      const el = await make();
      await expect(getComputedStyle(el.querySelector(".zeta-table-header-bar")!).backgroundColor).to.equal(getCssVarColorValue(el, "--surface-section"));
      await expect(getComputedStyle(el.querySelector(".zeta-table-footer")!).backgroundColor).to.equal(getCssVarColorValue(el, "--surface-section"));
      const th = el.querySelector(".zeta-table-th") as HTMLElement;
      await expect(getComputedStyle(th).color).to.equal(getCssVarColorValue(el, "--foreground-primary"));
      await expect(getComputedStyle(th).fontSize).to.equal(v(el, "--label-medium-font-size"));
      await expect(getComputedStyle(th).textTransform).to.equal("none");
      const td = el.querySelector(".zeta-table-tbody .zeta-table-td") as HTMLElement;
      await expect(getComputedStyle(td).backgroundColor).to.equal(getCssVarColorValue(el, "--interactive-neutral-background-default"));
      await expect(getComputedStyle(td).borderBottomColor).to.equal(getCssVarColorValue(el, "--zebra-border-subtle"));
    });

    it("sets the page summary on body/small in foreground/secondary", async () => {
      const el = await make();
      const footer = el.querySelector(".zeta-table-footer") as HTMLElement;
      await expect(getComputedStyle(footer).color).to.equal(getCssVarColorValue(el, "--foreground-secondary"));
      await expect(getComputedStyle(footer).fontSize).to.equal(v(el, "--body-small-font-size"));
    });
  });
});
