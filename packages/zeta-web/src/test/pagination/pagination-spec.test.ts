import { fixture, html, expect, elementUpdated } from "@open-wc/testing";
import { emulateMedia, sendMouse, resetMouse } from "@web/test-runner-commands";
import type { ZetaPagination } from "../../components/pagination/pagination.js";
import "../../components/pagination/pagination.js";
import "../../index.css";

const v = (el: Element, name: string) => getComputedStyle(el).getPropertyValue(name).trim();
const all = (el: Element, selector: string) => Array.from(el.shadowRoot?.querySelectorAll<HTMLElement>(selector) ?? []);
const one = (el: Element, selector: string) => el.shadowRoot?.querySelector(selector) as HTMLElement;

describe("zeta-pagination (spec)", () => {
  beforeEach(async () => {
    await emulateMedia({ reducedMotion: "reduce" });
  });
  afterEach(async () => {
    await resetMouse();
  });

  describe("Accessibility", () => {
    it("names the landmark and every control, and marks the current page", async () => {
      const el = await fixture<ZetaPagination>(html`<zeta-pagination currentPage="2"></zeta-pagination>`);
      await expect(one(el, "nav").getAttribute("aria-label")).to.equal("Pagination");
      await expect(one(el, ".chevron_right").getAttribute("aria-label")).to.equal("Next page");
      await expect(one(el, ".page.selected").getAttribute("aria-current")).to.equal("page");
      await expect(el).shadowDom.to.be.accessible();
    });
  });

  describe("Content", () => {
    it("hides the four jump controls with showControls", async () => {
      const el = await fixture<ZetaPagination>(html`<zeta-pagination></zeta-pagination>`);
      await expect(all(el, "button.control").length).to.equal(4);
      el.showControls = false;
      await elementUpdated(el);
      await expect(all(el, "button.control").length).to.equal(0);
    });

    it("drops the overflow and the pinned end pages with showMore off", async () => {
      const el = await fixture<ZetaPagination>(html`<zeta-pagination totalPages="20" currentPage="10" siblingCount="1"></zeta-pagination>`);
      await expect(all(el, ".more").length).to.equal(2);
      el.showMore = false;
      await elementUpdated(el);
      await expect(all(el, ".more").length).to.equal(0);
      await expect(all(el, ".page").map(p => p.textContent?.trim())).to.deep.equal(["9", "10", "11"]);
    });
  });

  describe("Dimensions", () => {
    it("draws control/sm squares space/sm apart", async () => {
      const el = await fixture<ZetaPagination>(html`<zeta-pagination></zeta-pagination>`);
      const page = one(el, ".page");
      await expect(`${page.getBoundingClientRect().width}px`).to.equal(v(el, "--control-sm"));
      await expect(`${page.getBoundingClientRect().height}px`).to.equal(v(el, "--control-sm"));
      await expect(getComputedStyle(one(el, "nav")).columnGap).to.equal(v(el, "--space-sm"));
    });
  });

  describe("Styling", () => {
    it("gives every control stroke/thin with outline, radius/sm with rounded", async () => {
      const el = await fixture<ZetaPagination>(html`<zeta-pagination outline .rounded=${false}></zeta-pagination>`);
      await expect(v(one(el, ".page"), "--_border-width")).to.equal(v(el, "--stroke-thin"));
      await expect(getComputedStyle(one(el, ".page")).borderTopLeftRadius).to.equal("0px");
      el.rounded = true;
      await elementUpdated(el);
      await expect(getComputedStyle(one(el, ".page")).borderTopLeftRadius).to.equal(v(el, "--radius-sm"));
    });

    it("fills the selected page inverse with no border", async () => {
      const el = await fixture<ZetaPagination>(html`<zeta-pagination outline></zeta-pagination>`);
      const selected = one(el, ".page.selected");
      await expect(v(selected, "--_bg")).to.equal(v(selected, "--interactive-inverse-background-selected"));
      await expect(v(selected, "--_border")).to.equal("transparent");
    });

    it("draws disabled controls on the neutral disabled tokens", async () => {
      const el = await fixture<ZetaPagination>(html`<zeta-pagination></zeta-pagination>`);
      const first = one(el, ".first_page");
      await expect(v(first, "--_bg")).to.equal(v(first, "--interactive-neutral-background-disabled"));
    });
  });

  describe("Interaction", () => {
    it("fills a hovered page, and its border too when outlined", async () => {
      const el = await fixture<ZetaPagination>(html`<zeta-pagination outline></zeta-pagination>`);
      const page = all(el, ".page")[1];
      const r = page.getBoundingClientRect();
      await sendMouse({ type: "move", position: [Math.round(r.x + r.width / 2), Math.round(r.y + r.height / 2)] });
      await expect(v(page, "--_bg")).to.equal(v(page, "--interactive-neutral-background-hover"));
      await expect(v(page, "--_border")).to.equal(v(page, "--interactive-neutral-border-hover"));
    });
  });
});
