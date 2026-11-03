import { fixture, html, expect, elementUpdated } from "@open-wc/testing";
import type { ZetaCard } from "../../components/card/card.js";
import "../../components/card/card.js";
import "../../components/button/button.js";
import "../../index.css";
import { contrastTest } from "../accessibility-utils/accessibility-test-runner.js";
import { getCssVarColorValue } from "../utils.js";

const v = (el: Element, name: string) => getComputedStyle(el).getPropertyValue(name).trim();

describe("zeta-card", () => {
  let card: ZetaCard;
  const shell = () => card.shadowRoot?.querySelector(".card") as HTMLElement;
  const part = (tag: string, sel: string) => card.querySelector(tag)?.shadowRoot?.querySelector(sel) as HTMLElement;

  beforeEach(async () => {
    card = await fixture<ZetaCard>(
      html`<zeta-card style="width: 330px">
        <zeta-card-header headline="Heading" subHeadline="Subheading"></zeta-card-header>
        <zeta-card-body>Body text</zeta-card-body>
        <zeta-card-footer><zeta-button flavor="outline" size="small">Cancel</zeta-button><zeta-button size="small">Save</zeta-button></zeta-card-footer>
      </zeta-card>`
    );
    await Promise.all(["zeta-card-header", "zeta-card-body", "zeta-card-footer"].map(t => (card.querySelector(t) as ZetaCard).updateComplete));
  });

  describe("Accessibility", () => {
    it("meets aria requirements", async () => {
      await expect(card).to.be.accessible();
    });

    it("meets contrast requirements for heading, subheading and body", async () => {
      await contrastTest("Card heading", part("zeta-card-header", "h1"), shell(), { highContrast: false });
      await contrastTest("Card subheading", part("zeta-card-header", "h2"), shell(), { highContrast: false });
      await contrastTest("Card body", part("zeta-card-body", ".card-body"), shell(), { highContrast: false });
    });
  });

  describe("Content", () => {
    it("renders the heading and subheading", async () => {
      await expect(part("zeta-card-header", "h1").textContent?.trim()).to.equal("Heading");
      await expect(part("zeta-card-header", "h2").textContent?.trim()).to.equal("Subheading");
    });
  });

  describe("Dimensions", () => {
    it("insets the heading, body and footer by space/lg", async () => {
      const lg = v(card, "--space-lg");
      await expect(getComputedStyle(part("zeta-card-header", ".card-header")).paddingLeft).to.equal(lg);
      await expect(getComputedStyle(part("zeta-card-body", ".card-body")).paddingTop).to.equal(lg);
      await expect(getComputedStyle(part("zeta-card-footer", ".card-footer")).paddingBottom).to.equal(lg);
    });

    it("shares the footer row between buttons, space/sm apart", async () => {
      const [a, b] = Array.from(card.querySelectorAll("zeta-button")).map(x => x.getBoundingClientRect());
      expect(Math.abs(a.width - b.width)).to.be.lessThan(1);
      await expect(`${b.left - a.right}px`).to.equal(v(card, "--space-sm"));
    });
  });

  describe("Styling", () => {
    it("draws the surface/card shell with a stroke/thin border/default border", async () => {
      const style = getComputedStyle(shell());
      await expect(style.backgroundColor).to.equal(getCssVarColorValue(card, "--surface-card"));
      await expect(style.borderTopWidth).to.equal(v(card, "--stroke-thin"));
      await expect(style.borderTopColor).to.equal(getCssVarColorValue(card, "--zebra-border-default"));
      await expect(style.overflow).to.equal("hidden");
    });

    it("rounds by radius/sm and squares when not rounded", async () => {
      await expect(getComputedStyle(shell()).borderTopLeftRadius).to.equal(v(card, "--radius-sm"));
      card.rounded = false;
      await elementUpdated(card);
      await expect(getComputedStyle(shell()).borderTopLeftRadius).to.equal("0px");
    });

    it("sets the heading in title/medium and the body in body/small secondary", async () => {
      await expect(getComputedStyle(part("zeta-card-header", "h1")).fontSize).to.equal(v(card, "--title-medium-font-size"));
      const body = getComputedStyle(part("zeta-card-body", ".card-body"));
      await expect(body.fontSize).to.equal(v(card, "--body-small-font-size"));
      await expect(body.color).to.equal(getCssVarColorValue(card, "--foreground-secondary"));
    });
  });
});
