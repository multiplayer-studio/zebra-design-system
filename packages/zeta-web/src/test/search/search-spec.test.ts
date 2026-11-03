import { fixture, html, expect, elementUpdated } from "@open-wc/testing";
import { emulateMedia, sendMouse, resetMouse } from "@web/test-runner-commands";
import type { ZetaSearch } from "../../components/search/search.js";
import "../../components/search/search.js";
import "../../index.css";

const v = (el: Element, name: string) => getComputedStyle(el).getPropertyValue(name).trim();
const form = (el: Element) => el.shadowRoot?.querySelector("form") as HTMLElement;
const colorOf = (host: Element, token: string) => {
  const probe = document.createElement("div");
  probe.style.color = `var(${token})`;
  host.shadowRoot!.append(probe);
  const c = getComputedStyle(probe).color;
  probe.remove();
  return c;
};

describe("zeta-search (spec)", () => {
  beforeEach(async () => {
    await emulateMedia({ reducedMotion: "reduce" });
  });
  afterEach(async () => {
    await resetMouse();
  });

  describe("Accessibility", () => {
    it("names the clear button", async () => {
      const el = await fixture<ZetaSearch>(html`<zeta-search aria-label="Search" value="shoes"></zeta-search>`);
      await expect(el.shadowRoot?.querySelector(".clear")?.getAttribute("aria-label")).to.equal("Clear search");
    });
  });

  describe("Content", () => {
    it("drops the magnifier with hasLeading off", async () => {
      const el = await fixture<ZetaSearch>(html`<zeta-search></zeta-search>`);
      el.hasLeading = false;
      await elementUpdated(el);
      expect(el.shadowRoot?.querySelector("#search-icon")).to.not.exist;
    });
  });

  describe("Dimensions", () => {
    it("fills its container when block is set", async () => {
      const wrap = await fixture<HTMLDivElement>(html`<div style="width: 600px"><zeta-search block></zeta-search></div>`);
      const el = wrap.firstElementChild!;
      await expect(el.getBoundingClientRect().width).to.equal(600);
      await expect(form(el).getBoundingClientRect().width).to.equal(600);
    });

    it("shrinks to a container narrower than its default width, and keeps that width otherwise", async () => {
      const wide = await fixture<HTMLDivElement>(html`<div style="width: 600px"><zeta-search></zeta-search></div>`);
      const natural = form(wide.firstElementChild!).getBoundingClientRect().width;
      expect(natural).to.be.below(600);
      const narrow = await fixture<HTMLDivElement>(html`<div style="width: 120px"><zeta-search></zeta-search></div>`);
      const el = narrow.firstElementChild!;
      await expect(el.getBoundingClientRect().width).to.equal(120);
      await expect(form(el).getBoundingClientRect().width).to.equal(120);
      const flexRow = await fixture<HTMLDivElement>(html`<div style="display: flex; width: 120px"><zeta-search></zeta-search></div>`);
      await expect(form(flexRow.firstElementChild!).getBoundingClientRect().width).to.equal(120);
    });

    it("sizes the field from control/sm, control/md and control/lg", async () => {
      const el = await fixture<ZetaSearch>(html`<zeta-search size="small"></zeta-search>`);
      await expect(`${form(el).getBoundingClientRect().height}px`).to.equal(v(el, "--control-sm"));
      el.size = "medium";
      await elementUpdated(el);
      await expect(`${form(el).getBoundingClientRect().height}px`).to.equal(v(el, "--control-md"));
      el.size = "large";
      await elementUpdated(el);
      await expect(`${form(el).getBoundingClientRect().height}px`).to.equal(v(el, "--control-lg"));
      await expect(getComputedStyle(form(el)).paddingLeft).to.equal(v(el, "--space-md"));
    });

    it("rounds the field to a pill with shape full", async () => {
      const el = await fixture<ZetaSearch>(html`<zeta-search shape="full"></zeta-search>`);
      await expect(getComputedStyle(form(el)).borderTopLeftRadius).to.equal(v(el, "--radius-pill"));
    });
  });

  describe("Styling", () => {
    it("borders the default field on the neutral tokens, and drops the border on ghost", async () => {
      const el = await fixture<ZetaSearch>(html`<zeta-search></zeta-search>`);
      await expect(v(form(el), "--_border")).to.equal(v(el, "--interactive-neutral-border-default"));
      el.flavor = "ghost";
      await elementUpdated(el);
      await expect(v(form(el), "--_border-width")).to.equal(v(el, "--stroke-base"));
    });

    it("rings an empty focused field in stroke/thick border/focus, and a typed one in stroke/thin", async () => {
      const el = await fixture<ZetaSearch>(html`<zeta-search></zeta-search>`);
      el.focus();
      await elementUpdated(el);
      await expect(getComputedStyle(form(el)).outlineWidth).to.equal(v(el, "--stroke-thick"));
      await expect(getComputedStyle(form(el)).outlineColor).to.equal(colorOf(el, "--border-focus"));
      el.value = "shoes";
      await elementUpdated(el);
      await expect(getComputedStyle(form(el)).outlineStyle).to.equal("none");
      await expect(v(form(el), "--_border")).to.equal(v(el, "--border-focus"));
    });

    it("keeps icons on foreground/primary, and foreground/disabled when disabled", async () => {
      const el = await fixture<ZetaSearch>(html`<zeta-search value="shoes"></zeta-search>`);
      const clear = el.shadowRoot?.querySelector(".clear zeta-icon") as HTMLElement;
      await expect(getComputedStyle(clear).color).to.equal(colorOf(el, "--foreground-primary"));
      el.disabled = true;
      await elementUpdated(el);
      await expect(getComputedStyle(clear).color).to.equal(colorOf(el, "--foreground-disabled"));
    });
  });

  describe("Interaction", () => {
    it("answers hover with the border alone", async () => {
      const el = await fixture<ZetaSearch>(html`<zeta-search></zeta-search>`);
      const r = form(el).getBoundingClientRect();
      await sendMouse({ type: "move", position: [Math.round(r.x + r.width / 2), Math.round(r.y + r.height / 2)] });
      await expect(v(form(el), "--_border")).to.equal(v(el, "--interactive-neutral-border-hover"));
    });
  });
});
