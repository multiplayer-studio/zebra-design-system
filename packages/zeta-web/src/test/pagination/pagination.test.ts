import { assert, expect, fixture, html } from "@open-wc/testing";
import { ZetaPagination } from "../../components/pagination/pagination.js";
import "../../components/pagination/pagination.js";
import "../../index.css";
import { getCssVarColorValue } from "../utils.js";

describe("zeta-pagination", () => {
  // describe("Accessibility", () => {});

  describe("Content", () => {
    it("creates from document.createElement", function () {
      const el = document.createElement("zeta-pagination");
      assert.equal("ZETA-PAGINATION", el.nodeName);
    });

    it("creates from constructor", function () {
      const el = new ZetaPagination();
      assert.equal("ZETA-PAGINATION", el.nodeName);
    });

    it("should disable left controls", async () => {
      const el = await fixture(html`<zeta-pagination></zeta-pagination>`);
      const prevButton = el.shadowRoot?.querySelector("zeta-icon-button.chevron_left") as HTMLElement;
      const startButton = el.shadowRoot?.querySelector("zeta-icon-button.first_page") as HTMLElement;
      expect(prevButton).to.have.attribute("disabled");
      expect(startButton).to.have.attribute("disabled");
    });

    it("should disable right controls", async () => {
      const el = await fixture(html`<zeta-pagination currentPage="10"></zeta-pagination>`);
      const nextButton = el.shadowRoot?.querySelector("zeta-icon-button.chevron_right") as HTMLElement;
      const endButton = el.shadowRoot?.querySelector("zeta-icon-button.last_page") as HTMLElement;
      expect(nextButton).to.have.attribute("disabled");
      expect(endButton).to.have.attribute("disabled");
    });

    it("should not set invalid page", async () => {
      // prettier-ignore
      const el = await fixture<ZetaPagination>(html`<zeta-pagination totalPages="10" currentPage="15"></zeta-pagination>`);
      assert.equal(el.currentPage, 10);
    });

    it("should not set invalid page", async () => {
      // prettier-ignore
      const el = await fixture<ZetaPagination>(html`<zeta-pagination totalPages="10" currentPage="-1"></zeta-pagination>`);
      assert.equal(el.currentPage, 1);
    });

    it("should show left and right dots", async () => {
      // prettier-ignore
      const el = await fixture<ZetaPagination>(html`<zeta-pagination totalPages="10" currentPage="4"></zeta-pagination>`);
      const dots = el.shadowRoot?.querySelectorAll("zeta-icon.more");
      assert.equal(dots?.length, 2);
    });

    it("should not show any dots", async () => {
      // prettier-ignore
      const el = await fixture<ZetaPagination>(html`<zeta-pagination totalPages="5"></zeta-pagination>`);
      const dots = el.shadowRoot?.querySelectorAll("zeta-icon.more");
      assert.equal(dots?.length, 0);
    });
  });

  // describe("Dimensions", () => {});

  describe("Styling", () => {
    it("should apply the shape to page indicators, not just pagination controls", async () => {
      // prettier-ignore
      const el = await fixture<ZetaPagination>(html`<zeta-pagination rounded></zeta-pagination>`);
      const page = el.shadowRoot?.querySelector(".page") as HTMLElement;
      const style = window.getComputedStyle(page);
      assert.notEqual(style.borderRadius, "0px");
    });

    it("should have no border on page indicators and controls by default", async () => {
      const el = await fixture<ZetaPagination>(html`<zeta-pagination></zeta-pagination>`);
      const page = el.shadowRoot?.querySelector(".page") as HTMLElement;
      const style = window.getComputedStyle(page);
      assert.equal(style.borderWidth, "0px");
    });

    it("should show an outline on page indicators and controls when outline is set", async () => {
      // prettier-ignore
      const el = await fixture<ZetaPagination>(html`<zeta-pagination outline></zeta-pagination>`);
      const page = el.shadowRoot?.querySelector(".page") as HTMLElement;
      const control = el.shadowRoot?.querySelector("zeta-icon-button.chevron_right") as HTMLElement;
      const style = window.getComputedStyle(page);
      assert.notEqual(style.borderWidth, "0px");
      expect(control).to.have.attribute("flavor", "outline-subtle");
    });

    it("should use flavor 'subtle' on controls when outline is not set", async () => {
      const el = await fixture<ZetaPagination>(html`<zeta-pagination></zeta-pagination>`);
      const control = el.shadowRoot?.querySelector("zeta-icon-button.chevron_right") as HTMLElement;
      expect(control).to.have.attribute("flavor", "subtle");
    });

    it("should use a neutral, inverse background and text colour for the selected page", async () => {
      const el = await fixture<ZetaPagination>(html`<zeta-pagination currentPage="1"></zeta-pagination>`);
      const selected = el.shadowRoot?.querySelector(".page.selected") as HTMLElement;
      const style = window.getComputedStyle(selected);
      expect(style.backgroundColor).to.equal(getCssVarColorValue(selected, "--interactive-inverse-background-selected"));
      expect(style.color).to.equal(getCssVarColorValue(selected, "--foreground-inverse"));
    });
  });

  describe("Interaction", () => {
    it("should increment page", async () => {
      // prettier-ignore
      const el = await fixture<ZetaPagination>(html`<zeta-pagination></zeta-pagination>`);
      const next = el.shadowRoot?.querySelector("zeta-icon-button.chevron_right") as HTMLElement;
      next.click();
      await el.updateComplete;
      assert.equal(el.currentPage, 2);
    });

    it("should decrement page", async () => {
      // prettier-ignore
      const el = await fixture<ZetaPagination>(html`<zeta-pagination currentPage="3"></zeta-pagination>`);
      const prev = el.shadowRoot?.querySelector("zeta-icon-button.chevron_left") as HTMLElement;
      prev.click();
      await el.updateComplete;
      assert.equal(el.currentPage, 2);
    });
  });

  // describe("Golden", () => {});

  // describe("Performance", () => {});
});
